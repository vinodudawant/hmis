<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Accession Track Status</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->	

<!-- include js for development -->
	<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
	<!-- JQUERY -->
	<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
	<!-- JQUERY UI-->
	<script src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
	<!-- BOOTSTRAP -->
	<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
		
	<!-- JQUERY UI-->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/themes/default.css" id="skin-switcher" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/responsive.css" >
	<link href="ehat-design/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<!-- DATE RANGE PICKER -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
	<!-- SELECT2 -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
	<!-- TYPEAHEAD -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/typeahead/typeahead.css" />
	<!-- UNIFORM -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/uniform/css/uniform.default.min.css" />
	<!-- DATA TABLES -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />

<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>


<!-- include js for development -->
<script type="text/javascript" src="js/diagnostic_patient.js"></script>
<script type="text/javascript" src="js/pathology_phelbotomy.js"></script>
<script type="text/javascript" src="js/ehat_pathology_outsource.js"></script>
<script type="text/javascript" src="js/new_phlebotomy.js"></script>

<style>
#radioBtn .notActive{
    color: #3276b1;
    background-color: #fff;
}
</style>

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
		<%@include file="left_menu_pathologyNew.jsp"%>
			<!-- /SIDEBAR -->
			<div id="main-content">

				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><a href="pathology_dashboard.jsp">LIS</a></li>
											<li><i class="fa fa-home"></i> <a href="pathology_accession_Trackstatus.jsp">Track Status</a></li>

										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-12">
									<div class="col-md-1">
										<label for="inlineFold" class="control-label">Search By : </label>
									</div>

									<div class="col-md-2">
										<div class="input-group" id="documentByName">
											<label for="inlineFold" class="control-label">Patient
												Type:</label> <select id="patSearchType"
												class="form-control input-SmallText">
												<option value="0">---Select---</option>
												<option value="1">Patient Name</option>
												<option value="2">Patient Id</option>
												<option value="3">Barcode</option>
												<option value="4">Patient Mobile</option>
											</select>
										</div>
									</div>
									<div class="col-md-2">
										<div class="input-group" id="divbyName"
											style="margin-top: 18px">
											<label for="inlineFold" class="control-label"></label> <input
												class="form-control" id="byName" style="width: 100%"
												type="text" placeholder="Enter Search Text"
												onkeyup="phelbotomyPatientAutoSuggestion(this.id, 'accessionTrackStatusAutoSugg');">
										</div>
									</div>

									<div class="col-md-2">
										<div class="input-group" id="customerTypes">
											<label for="inlineFold" class="control-label">Customer Type:</label> 
											<!-- <select id="custTypeForSearch" onchange="fetchCustomerNames('accessionTrackStatusSearchBtn')"
												class="form-control input-SmallText">
												<option value="0">--Select Type--</option>
												<option value="1">Inhouse Lab</option>
												<option value="2">Customer Lab</option>
												<option value="3">Customer Hospital</option>
												<option value="4">Customer Clinic</option>
												<option value="5">Collection Center</option>
											</select> -->
											<select
												onchange="getAllCustomers(this.id,'custNameForSearch')"
												style="width: 150px" id="custTypeForSearch">

											</select>
										</div>
									</div>

									<div class="col-md-2">
										<div class="input-group" id="customerNames">
											<label for="inlineFold" class="control-label">Customer Name:</label> 
											<!-- <select id="custNameForSearch"
												class="form-control input-SmallText">
												<option value="0">--Select Customer--</option>
											</select> -->
											<select style="width: 150px" id="custNameForSearch">
												<option value="6">--Select Customer--</option>
											</select>
										</div>
									</div>
									
									<div class="col-md-1">
										<span class="input-group-btn"> <label for="inlineFold"
											class="control-label">From Date : </label> <input type="text"
											class="form-control input-SmallText"
											onclick="displayCalendar(document.getElementById('txtFdate'),'dd/mm/yyyy',this)"
											readonly="readonly" id="txtFdate" placeholder="Date">
										</span>
									</div>
									<div class="col-md-1">
										<span class="input-group-btn"> <label for="inlineFold"
											class="control-label">To Date : </label> <input type="text"
											class="form-control input-SmallText"
											onclick="displayCalendar(document.getElementById('txtTdate'),'dd/mm/yyyy',this)"
											readonly="readonly" id="txtTdate" placeholder="Date">
										</span>
									</div>
									<div class=" col-md-1">
										<input type="button" value="Search"
											class="btn btn-xs btn-primary"
											onclick="searchLabTestPatient('accessionTrackStatusSearchBtn');"
											style="margin-top: 20px;" />
									</div>
								</div>
								<div class="col-md-12" style="margin-top: 1%;">
									<div class="col-md-1">
										<label for="inlineFold" class="control-label">Emergency : </label>
									</div>
									<div class="col-md-3">
										<div class="input-group" id="documentByName">
											<div id="radioBtn" class="btn-group">
											<a class="btn btn-danger btn-xs notActive"
												data-toggle="emergencyFlag" id="labAvailableSwitchYes"
												data-title="Y" onclick="toggleSwitch(this.id,'trackStatus')">Yes</a>
											<a class="btn btn-primary btn-xs active"
												data-toggle="emergencyFlag" id="labAvailableSwitchBoth"
												data-title="All" onclick="toggleSwitch(this.id,'trackStatus')">All</a>
											<a class="btn btn-success btn-xs notActive"
												data-toggle="emergencyFlag" id="labAvailableSwitchNo"
												data-title="N" onclick="toggleSwitch(this.id,'trackStatus')">No</a>
										</div>
										<input type="hidden" name="emergencyFlag" id="emergencyFlag"
											value="All">
										</div>
									</div>
								</div>
							</div>

							<div class=" col-md-12 ">
								<div class="form-inline col-md-10"
									style="margin-left: 7%; margin-top: 2%"></div>
							</div>
							
							<div id="processAreaRecordTab" class="tab-pane fade in"
								style="margin-top: 0%">


								<div class="panel-group" id="accordion">
									<div class="panel">
										<div class="panel-body" style="overflow: auto; height: 460px">
																														
											<table id="ehatTable" class="datatable table  table-bordered" style="margin-top:0%">
												<thead id="ehatTHead">
													<tr style="background-color: lightblue">
														<th class="col-md-1 center">Reg Date</th>
														<th class="col-md-1 center">Patient Name</th>
														<th class="col-md-1 center">Patient ID</th>
													<!-- <th class="col-md-1 center">Center Name</th> -->
														<th class="col-md-1 center">Refered By</th>
														<th class="col-md-1 center">Barcode</th>
														<th class="col-md-1 center">Collection Date Time</th>
														<th class="col-md-1 center">Test Name</th>
														<th class="col-md-1 center">Status</th>
														<th class="col-md-1 center">Sample</th>														
														<th class="col-md-1 center">Action</th>
													</tr>
												</thead>

												<tbody id="trackRecordTableBody">
												</tbody>
											</table>
										</div>
									</div>
								</div>
								
								<!--    Starting pagination    -->
								<div style="margin-top: -2%">
									<div class="pull-right">
										<ul class="pagination pagination-blue margin-bottom-10"
											id="jumpToPage">
										</ul>
										<ul class="pagination pagination-blue margin-bottom-10"
											id="accessionTrackStatusPagination">
										</ul>
										<ul class="pagination pagination-blue margin-bottom-10"
											id="accessionTrackStatusNumberOfPages">
										</ul>
									</div>
								</div>
								<!--   Ending  pagination -->
								
							</div>

							<div class="modal fade" id="trackStatusPopup" tabindex="-1">
								<div class="modal-dialog modal-dialog-centered"
									style="width: 85%; margin-top: 10%">

									<div class="modal-body">
										<div class="row">
											<div class="col-md-12">
												<div class="container">
													<div class="panel">
														<div class="panel-body" style="overflow: auto;">
															<div class="col-md-1"
																style="margin-top: 0%; margin-left: 91%">
																<input type="button" value="close"
																	class="btn btn-xs btn-danger " data-toggle="tooltip"
																	data-placement="bottom" title="close"
																	onclick="hidePopupTrackStatus()" />
															</div>

															<div class="panel-heading" id="divEhatContent"></div>

															<div class="col-md-12"
																style="font-weight: bold; overflow: auto;">

																<div style="font-weight: bold; overflow: auto;">

																	<table border="1"
																		class="table table-bordered table-hover table-responsive"
																		id="trackStatusTable" style="overflow: auto;">
																			<thead id="ehatTHead">
																				<tr style="background-color: lightblue">
																					<th class="col-md-1 center" colspan="2">Phlebotomy</th>
																					<th class="col-md-1 center" colspan="3">Accession</th>
																					<th class="col-md-1 center" colspan="2">Processing</th>
																					<th class="col-md-1 center" colspan="2">Authorized</th>																				
																					<th class="col-md-1 center" colspan="2">Reporting</th>
																					<th class="col-md-1 center" colspan="3">Out Sourced</th>
																				</tr>
																				<tr style="background-color: lightcyan">
																					<th class="col-md-1 center">By</th>
																					<th class="col-md-1 center">Date</th>
																					
																					<th class="col-md-1 center">Status</th>
																					<th class="col-md-1 center">By</th>
																					<th class="col-md-1 center">Date</th>
																					
																					<th class="col-md-1 center">By</th>
																					<th class="col-md-1 center">Date</th>
																					
																					<th class="col-md-1 center">By</th>
																					<th class="col-md-1 center">Date</th>
																					
																					<th class="col-md-1 center">By</th>
																					<th class="col-md-1 center">Date</th>
																					
																					<th class="col-md-1 center">Status</th>
																					<th class="col-md-1 center">By</th>
																					<th class="col-md-1 center">Date</th>
																				</tr>
																			</thead>
																		<tbody
																			style="overflow: auto; border: 1px solid #436a9d;"
																			id="trackStatusTableBody"></tbody>
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
					<!-- /CONTENT-->
				</div>
			</div>			
			<%@include file="footer_nobel.jsp"%>		
		</div></section>
	<script src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
	<!-- SLIMSCROLL -->
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	
	<!-- BLOCK UI -->
	<script type="text/javascript" src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>	
	<script type="text/javascript" src="ehat-design/js/autosize/jquery.autosize.min.js"></script>	
	<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
	<!-- TYPEHEAD -->
	<script type="text/javascript" src="ehat-design/js/typeahead/typeahead.min.js"></script>	
	<!-- UNIFORM -->
	<script type="text/javascript" src="ehat-design/js/uniform/jquery.uniform.min.js"></script>		
	<!-- DATA TABLES -->
	<script type="text/javascript" src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
	
	<!-- COOKIE -->
	<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>

	<script src="auto/jquery.mockjax.js"></script>
	<script src="auto/bootstrap-typeahead.js"></script>
	<!-- CUSTOM SCRIPT -->

	<input type='hidden' id="custTypeId" value="0"/>
	<input type="hidden" id="custNameId" value="0"/>
	<input type='hidden' id="fromDate" value=""/>
	<input type="hidden" id="toDate" value=""/>
	<input type='hidden' id="searchBy" value="byAll"/>

	<script>
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			$('#emergencyFlag').val("All");
			//getAccessionTrackRecord('all');
			<%-- setCustName("<%=session.getAttribute("userType")%>", "<%=session.getAttribute("userCustomerType")%>", "<%=session.getAttribute("userCustomerId")%>"); --%>
			getAllCustomerType('custTypeForSearch');
		});
	</script>
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>