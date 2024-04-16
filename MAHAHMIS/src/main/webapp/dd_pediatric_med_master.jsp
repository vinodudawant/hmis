<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Pediatric Medication Master</title>
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

<!-- include js for development -->
<script type="text/javascript" src="js/dd_pediatric_med.js"></script>
</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%>
		</header>
		<!--/HEADER -->

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->

			<%@include file="dd_menu_DoctorDesk.jsp"%>
			<!-- /SIDEBAR -->
			<div id="main-content">

				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header" style="height: 92%;">
										<!-- STYLER -->

										<!-- /STYLER -->
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a
												href="dd_opdDashBoard.jsp">Home</a></li>
											<li><i class="fa fa-home"></i> <a
												href="dd_pediatric_med_master.jsp">Pediatric Medicine
													Master</a></li>
											<li class="pull-right">

												<button class="btn btn-xs btn-success pull-right"
													type="button" onclick="onloadData()" data-toggle="modal"
													data-target="#md1">
													<i class="fa fa-plus"></i> Add Medication
												</button>


											</li>
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row form-group">

								<div class="col-md-12 form-group">
									<div class="col-sm-1">
										<label for="inlineFold" class="control-label">Search
											By</label>
									</div>

									<div class="col-md-2 form-group" id="medByName">
										<input type="text" placeholder="Name" id="searchMedicine"
											name="name" class="typeahead form-control form-control-sm"
											onkeypress="getMediList(this.id,'medication');" />
									</div>



									<div class="col-md-1 form-group">
										<button class="btn btn-primary btn-xs" onclick="searchInst()">search</button>
									</div>

								</div>
							</div>

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-primary">
										<div class="panel-heading">Pediatric Medicine Master</div>
										<div class="panel-body">



											<div class="modal" id="md1" tabindex="-1" role="dialog">
												<div class="modal-dialog" role="document">
													<div class="modal-content">

														<div class="modal-body">

															<div class="panel panel-primary">
																<div class="panel-heading">Add Pediatric
																	Medication Master:</div>
																<div class="panel-body">
																	<form class="col-md-12">
																		<div class="form-row align-items-center">
																			<div class="col-md-6">
																				<label class="TextFont">Company Name<b
																					style="color: red; padding-left: 3px;">*</b>
																				</label> <select id="comName"
																					class="form-control form-control-sm" name="comName"></select>
																			</div>
																			
																			<div class="col-md-5">
																				<label class="TextFont">MO<b style="color: red; padding-left: 3px;"></b></label> 
																			    <input type="checkbox" id="MO" onclick="getFrequencyCount('mo')">
																			    <label class="TextFont">AN<b style="color: red; padding-left: 3px;"></b></label> 
																			    <input type="checkbox" id="AN" onclick="getFrequencyCount('an')">
																			    <label class="TextFont">EV<b style="color: red; padding-left: 3px;"></b></label> 
																			    <input type="checkbox" id="EV" onclick="getFrequencyCount('ev')">
																			    <label class="TextFont">NT<b style="color: red; padding-left: 3px;"></b></label> 
																			    <input type="checkbox" id="NT" onclick="getFrequencyCount('nt')">
																			</div>
																			
																			
																			<div class="col-md-3">
																				<label class="TextFont">Frequency<b
																					style="color: red; padding-left: 3px;">*</b>
																				</label> <input id="freqency" name="freqency" value="0" disabled="disabled"  type="text"
																					placeholder="Freqency"
																					class="form-control form-control-sm">
																			</div>
																			<div class="col-md-3">
																				<label class="TextFont">No of Days<b
																					style="color: red; padding-left: 3px;">*</b>
																				</label> <input id="days" name="days" type="number"
																					placeholder="No of Days"
																					class="form-control form-control-sm">
																			</div>

																			<div class="col-md-6 form-group">
																				<label class="TextFont">Preparation Name<b
																					style="color: red; padding-left: 3px;">*</b>
																				</label> <select id="prepName"
																					class="form-control form-control-sm"></select>
																			</div>

																			<div class="col-md-6 form-group" id="itemByName">
																				<label class="TextFont">Medicine Name<b
																					style="color: red; padding-left: 3px;">*</b>
																				</label> <input type="text" placeholder="Name" id="medname"
																					name="name"
																					class="typeahead form-control form-control-sm"
																					onkeypress="getMedicineName(this.id,'medication');" />
																			</div>

																			<div class="col-md-6">
																				<label class="TextFont">Instruction </label> <select
																					id="instName" class="form-control form-control-sm"
																					name="instruction"></select>
																			</div>

																			<div class="col-md-5 form-group">
																				<label class="TextFont">Others </label> <input
																					type="text" placeholder="Name" id="other"
																					name="name" class="form-control form-control-sm" />
																			</div>


																			<div class="col-md-4 form-group">

																				<label class="TextFont">Strength (mg/ml)<b
																					style="color: red; padding-left: 3px;">*</b>
																				</label> <input id="strength" name="strength" type="number"
																					placeholder="Strength(mg/ml)"
																					class="form-control form-control-sm">
																			</div>

																			<div class="col-md-4 form-group">
																				<label class="TextFont">Capacity </label> <input
																					id="capacity" type="text" placeholder="capacity"
																					class="form-control form-control-sm">
																			</div>


																			<div class="col-md-4 form-group">
																				<label class="TextFont" for="Last Name">Unit
																					<b style="color: red; padding-left: 3px;">*</b>
																				</label> <select class="form-control form-control-sm"
																					id="uomName" name="unit"></select>
																			</div>





																			<div class="col-md-6">
																				<label class="TextFont">Dose in mg/kg/day<b
																					style="color: red; padding-left: 3px;">*</b>
																				</label> <input id="dosePerDay" name="dosePerDay"
																					type="text" placeholder="Dose/Day/Kg"
																					class="form-control form-control-sm" />
																			</div>

																			<div class="col-md-6 form-group">
																				<label class="TextFont">Fixed Dose<b
																					style="color: red; padding-left: 3px;">*</b>
																				</label><input id="fixedDose" name="fixedDose" type="text"
																					placeholder="Fixed Dose"
																					class="form-control form-control-sm">
																			</div>

																			<div class="col-md-12 form-group">
																				<label class="TextFont"> Used For </label> <label
																					class="radio-inline"> <input type="radio"
																					name="userfor" value="both" checked>Both
																				</label> <label class="radio-inline"> <input
																					type="radio" value="ipd" name="userfor">IPD
																				</label> <label class="radio-inline"> <input
																					type="radio" value="opd" name="userfor">OPD
																				</label>
																			</div>



																		</div>
																	</form>
																</div>
															</div>


														</div>
														<div class="modal-footer">
															<button type="button" class="btn btn-success btn-sm"
																onclick="saveMedication()">save</button>
															<button type="button" class="btn btn-danger btn-sm"
																data-dismiss="modal">Close</button>
														</div>
													</div>
												</div>
											</div>


											<div style="overflow: auto;">
												<table
													class="table table-bordered table-responsive table-striped">
													<thead>
														<tr>
															<th class="col-md-1 center">#</th>
															<th class="col-md-2 center">Company Name</th>
															<th class="col-md-3 center">Medicine Name</th>
															<th class="col-md-1 center">Fixed Dose</th>
															<th class="col-md-1 center">Dose in Day</th>
															<th class="col-md-1 center">Frequency</th>
															<th class="col-md-1 center">No.Of Days</th>
															<th class="col-md-1 center">Strength</th>
															<th class="col-md-1 center">Edit</th>
															<th class="col-md-1 center">Delete</th>
														</tr>
													</thead>
													<tbody id="medicationList">
													</tbody>
												</table>
											</div>




										</div>
									</div>
								</div>
							</div>
							<!-- /NEW ORDERS -->

						</div>

						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
							</span>
						</div>

					</div>
					<!-- /CONTENT-->
				</div>
			</div>
			<div id="pleaseWait" style="text-align: center; display: none;">
				<img style="margin-top: 250px;" height="43px"
					src="images/loading_black.gif" />
				<div style="margin-top: 10px; color: white">
					<b>Please wait...</b>
				</div>
			</div>
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

		<script src="auto/jquery.mockjax.js"></script>
		<script src="auto/bootstrap-typeahead.js"></script>
		<!-- CUSTOM SCRIPT -->

		<script>
			jQuery(document).ready(function() {
				App.setPage("wizards_validations"); //Set current page 
				App.init(); //Initialise plugins and elements  
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});
				//	$("#addNewRecords").hide();
				getMedicationList();
			});
		</script>
		<input type="hidden" id="medId" value="0">
		<input type="hidden" id="medIdForSearch" value="0">
		<input type="hidden" id="medicineId" value="0">
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