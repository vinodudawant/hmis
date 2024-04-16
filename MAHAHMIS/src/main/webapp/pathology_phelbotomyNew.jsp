<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Phlebotomy</title>
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

<link rel="stylesheet" type="text/css" href="css/bootstrap-toggle.min.css" />
<script src="js/bootstrap-toggle.min.js"></script>


<style>
#radioBtn .notActive{
    color: #3276b1;
    background-color: #fff;
}
.toggle.ios, .toggle-on.ios, .toggle-off.ios { border-radius: 20px; }
  .toggle.ios .toggle-handle { border-radius: 50px; }

</style>

<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());

	java.text.SimpleDateFormat formatterr = new java.text.SimpleDateFormat("dd/MM/yyyy");
	String todays_datee = formatterr.format(currentDate.getTime());
	
	java.text.SimpleDateFormat formatterrr = new java.text.SimpleDateFormat("HH:mm");
	String todays_time = formatterrr.format(currentDate.getTime());
	
	 ResourceBundle resourceBundle = ResourceBundle.getBundle("Ehat"); 
	 String meeshaFlow = resourceBundle.getObject("meesha").toString();
	 
	 ResourceBundle resourceBundleHospital = ResourceBundle.getBundle("hospitalaccess"); 
	 String hospitalname = resourceBundleHospital.getObject("hospitalname").toString();
	
%>

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
											<li><i class="fa fa-home"></i> <a href="">Phlebotomy</a></li>

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
												class="form-control input-SmallText"
												onchange="setPatientSearchType()">
												<option value="0">---Select---</option>
												<option value="1">Patient Name</option>
												<option value="2">UHID</option>
												<option value="3">Barcode Search From Machine</option>
												<option value="4">Patient Mobile</option>
												<option value="5">Barcode</option>
											</select>
										</div>
									</div>
									<div class="col-md-2">
										<div class="input-group" id="divbyName"
											style="margin-top: 18px">
											<label for="inlineFold" class="control-label"></label> <input
												class="form-control" id="byName" style="width: 100%"
												type="text" placeholder="Enter Search Text"
												onkeyup="phelbotomyPatientAutoSuggestion(this.id, 'phelbotomyAutoSugg');"autocomplete="off">
										</div>
									</div>
									
									<div class="col-md-2" style="display:none">
										<div class="input-group" id="customerTypes">
											<label for="inlineFold" class="control-label">Customer Type:</label> 
											<!-- <select id="custTypeForSearch" onchange="fetchCustomerNames('authorizationSearchBtn')"
												class="form-control input-SmallText">
												<option value="0">--Select Type--</option>
												<option value="1">Inhouse Lab</option>
												<option value="2">Customer Lab</option>
												<option value="3">Customer Hospital</option>
												<option value="4">Customer Clinic</option>
												<option value="5">Collection Center</option>
											</select> -->
											<!-- <select
												onchange="getAllCustomers(this.id,'custNameForSearch')"
												style="width: 150px" id="custTypeForSearch">
											</select> -->
											<select	style="width: 150px" id="custTypeForSearch">
												<option value="0">--Select Type--</option>
											</select>
										</div>
									</div>

									<div class="col-md-2" style="display:none">
										<div class="input-group" id="customerNames">
											<label for="inlineFold" class="control-label">Customer Name:</label> 
											<!-- <select id="custNameForSearch"
												class="form-control input-SmallText">
												<option value="0">--Select Customer--</option>
											</select> -->
											<select style="width: 150px" id="custNameForSearch">
												<option value="0">--Select Customer--</option>
											</select>
										</div>
									</div>
									
									<div class="col-md-1">
										<span class="input-group-btn"> <label for="inlineFold"
											class="control-label">From Date : </label> <input type="text"
											class="form-control input-SmallText"
											onclick="displayCalendar(document.getElementById('txtFdate'),'dd/mm/yyyy',this)"
											readonly="readonly" id="txtFdate" placeholder="Date" value="<%=todays_datee%>">
										</span>
									</div>
									<div class="col-md-1">
										<span class="input-group-btn"> <label for="inlineFold"
											class="control-label">To Date : </label> <input type="text"
											class="form-control input-SmallText"
											onclick="displayCalendar(document.getElementById('txtTdate'),'dd/mm/yyyy',this)"
											readonly="readonly" id="txtTdate" placeholder="Date" value="<%=todays_datee%>">
										</span>
									</div>
									<div class=" col-md-1">
										<input type="button" value="Search"
											class="btn btn-xs btn-primary"
											onclick="searchLabTestPatient('phelbotomySearchBtn');"
											style="margin-top: 20px;" />
									</div>
									
									<div class=" col-md-1">
										<input type="button" value="Clear All"
											class="btn btn-xs btn-primary"
											onclick="clearSearch('phelbotomy');"
											title="Clear All Fields & Refresh"
											style="margin-top: 20px;" />
									</div>
									
									<div class="col-md-1">
										<label style="margin-top: 20px;" for="inlineFold" class="control-label">Emergency : </label>
									</div>
									
									<div class="col-md-2">
										<div class="input-group" id="documentByName">
											<div id="radioBtn" class="btn-group" style="margin-top: 20px;">
											<!-- <a class="btn btn-danger btn-xs notActive"
												data-toggle="emergencyFlag" id="labAvailableSwitchYes"
												value="Y" onclick="toggleSwitch(this.id,'phlebotomy')">Yes</a>
											<a class="btn btn-primary btn-xs active"
												data-toggle="emergencyFlag" id="labAvailableSwitchBoth"
												data-title="All" onclick="toggleSwitch(this.id,'phlebotomy')">All</a>
											<a class="btn btn-success btn-xs notActive"
												data-toggle="emergencyFlag" id="labAvailableSwitchNo"
												data-title="N" onclick="toggleSwitch(this.id,'phlebotomy')">No</a> -->
										
												<input type="checkbox" data-on="On" data-off="Off" data-toggle="toggle" data-onstyle="danger" id="toggle-event4"
													data-style="ios" data-size="mini" data-width="60">	
										
											</div>
											<input type="hidden" name="emergencyFlag" id="emergencyFlag" value="All">
										</div>
									</div>
									
								</div>
								<div class="col-md-12" style="margin-top: 1%; display:none">
									<!-- <div class="col-md-1">
										<label for="inlineFold" class="control-label">Emergency : </label>
									</div> -->
									<!-- <div class="col-md-2">
										<div class="input-group" id="documentByName">
											<div id="radioBtn" class="btn-group">
											<a class="btn btn-danger btn-xs notActive"
												data-toggle="emergencyFlag" id="labAvailableSwitchYes"
												value="Y" onclick="toggleSwitch(this.id,'phlebotomy')">Yes</a>
											<a class="btn btn-primary btn-xs active"
												data-toggle="emergencyFlag" id="labAvailableSwitchBoth"
												data-title="All" onclick="toggleSwitch(this.id,'phlebotomy')">All</a>
											<a class="btn btn-success btn-xs notActive"
												data-toggle="emergencyFlag" id="labAvailableSwitchNo"
												data-title="N" onclick="toggleSwitch(this.id,'phlebotomy')">No</a>
										
										<input type="checkbox" data-on="On" data-off="Off" data-toggle="toggle" data-onstyle="danger" id="toggle-event4"
												data-style="ios" data-size="mini" data-width="60">	
										
										</div>
										<input type="hidden" name="emergencyFlag" id="emergencyFlag"
											value="All">
										</div>
									</div> -->
									
									<div class="col-md-1">
										<label for="inlineFold" class="control-label" style="margin-left: -90px;">Collected At: </label>
									</div>
									<div class="col-md-2" style="margin-left: -102px;">
										<div class="input-group" id="documentByName">
											<select style="width: 150px" id="collectedAt" onchange="getSamplesByCollectedAt('phlebotomy');">
											</select>
										</div>
									</div>
									
									<div class=" col-md-1">
										<input type="button" value="Clear All"
											class="btn btn-xs btn-primary"
											onclick="clearSearch('phelbotomy');"
											title="Clear All Fields & Refresh"
											/>
									</div>
								</div>
							</div>

							<div class="divide-20"></div>
							<div class="row">
								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">

										<div class="panel panel-default">
											<div class="panel-heading">
												<ul class="nav nav-tabs" id="tabId">
													
												<li  class="active"  id="open">
												<a id="phleboOpen"  data-toggle="tab" href="#accessionTab"  onclick="getSamples('phelbotomySearchBtn');"><i class="fa fa-bookmark"></i> 
												<span class="hidden-inline-mobile">Open Records</span>
												
												<!-- ========================================================================== -->
												<!-- =======================code disabled by ROHIT AMBAWADE==================== -->
												<span class="badge badge-blue font-11" id="subChrgCount" style="display: none">0</span>
												<!-- ========================================================================== -->
												
												</a></li>

												<li id="collected">
												<a id="phleboCollected"  data-toggle="tab" href="#accessionPendingTab" onclick="getSamples('phelbotomySearchBtn');"><i class="fa fa-bookmark"></i> 
												<span class="hidden-inline-mobile">Collected Records</span>
												
												<!-- ========================================================================== -->
												<!-- =======================code disabled by ROHIT AMBAWADE==================== -->
												<span class="badge badge-blue font-11" id="chrgCount" style="display: none"> 0</span>
												<!-- ========================================================================== -->
												
												</a></li>
												</ul>
																															
												</div>
												<div class="panel-body">
													<div class="tab-content">

														<div id="accessionTab" class="tab-pane fade in active">
															<div class="panel-group" id="accordion">

														<div class="form-inline col-md-12">

																	<!-- <div class="checkbox checkbox-inline col-md-1 pull-right">
																		<input type="button" value="Delete"
																			class="btn btn-xs btn-warning " data-toggle="tooltip"
																			data-placement="bottom" title="Delete" />
																	</div> -->
																	
																	<div class="checkbox checkbox-inline col-md-1 pull-right">
																		<input style="margin-left:0%;margin-top:0%" type="button" value="Collection Done" class="btn btn-xs btn-success " data-toggle="tooltip"
													              data-placement="bottom" title="Collection Done" onclick="collectionPatient()" />
																	</div>

																	<div class="checkbox checkbox-inline col-md-1 pull-right">
																	    <div style="margin-left: -97px;">
																		<label class="TextFont">Collection Time</label>
																			</div>
																			<input type="text" style="margin-top: -29px;"
																			id="collectionTime"
																			class="form-control input-SmallText input-small"
																			onchange="calculateDuration()" readonly="readonly"  value="<%=todays_time %>" />
																	</div>
																	
																	
																	
																	    <div class="form-group col-md-4 pull-right">
																				<label for="type">Sample Collected<b style="color: red;">*</b></label> 
																					<select	class="form-control" id="sampleCollectedAt">
																						<option value="Inside The Lab">Inside The Lab </option>
																		          	<option value="OutSide The Lab">OutSide The Lab </option>
																					</select>
																			</div>

																	<div class="checkbox checkbox-inline col-md-1 pull-right">
																		<input style="margin-left:-187%;display: none;" type="button" value="Forced Outsource" class="btn btn-xs btn-warning " data-toggle="tooltip"
																			data-placement="bottom" title="Forced Outsource" onclick="viewOutSourceTestforResult()" />
																	</div>	 															
																	
																	
																	
																	<!-- <div class="checkbox checkbox-inline col-md-1 pull-right">
																		<input type="button" value="Print Barcode"
																			class="btn btn-xs btn-warning " data-toggle="tooltip"
																			data-placement="bottom" title="Print Barcode" />
																	</div> -->
																</div>


																<!-- <div class="divide-20"></div> -->
																<div class="panel">
																	<div class="panel-body"
																		style="overflow: auto; height: 400px; margin-top: -1%">
																		<table id="currentRecordTable" class="datatable table  table-bordered">
																			<thead id="ehatTHead">
																				<tr style="background-color: lightblue">
																				<th class="col-md-1 center">Sr.No.</th>
																					<th class="col-md-1 center">Reg. Date</th>
<!-- 																					<th class="col-md-1 center">Sr.No.</th>														 -->
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">UHID</th>
																					<th class="col-md-1 center">Collected At</th>
																					<th class="col-md-1 center">Barcode</th>
																					<!-- <th class="col-md-1 center">Unit</th> -->																				
																					<th class="col-md-1 center">Test Name</th>
																					<th class="col-md-1 center">Status</th>
																					<th class="col-md-1 center"colspan="2">Sample</th>
																					<th class="col-md-1 center">Lab Status</th>
																					<th class="col-md-1 center">Time Sensitive(hrs.)</th>
																					<th class="col-md-1 center">Hold/Unhold</th>
																					<th class="col-md-1 center">Action</th>
																					<th class="col-md-1 center">Print Barcode</th>
																					
																				</tr>
																				<tr style="background-color: lightcyan">
																					<th class="col-md-1 center"></th>	
																					<th class="col-md-1 center"></th>	
																					<th class="col-md-1 center"></th>													
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<!-- <th class="col-md-1 center"></th> -->
																					<th class="col-md-1 center"></th>																				
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center">Type</th>
																					<th class="col-md-1 center">Container</th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
<!-- 																					<th class="col-md-1 center"></th> -->
																					<th class="col-md-1 center"><input id="selectAll" type="checkbox"></th>
																					<th class="col-md-1 center"></th>
																				</tr>
																			</thead>

																			<tbody id="phlebotomytabId">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
															<!--    Starting pagination    -->
															<div style="margin-top: -1%">
																<div class="" align="right">
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="phleboOpenJumpToPage">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="phleboOpenPagination">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="phleboOpenNumberOfPages">
																	</ul>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>

														<div id="accessionPendingTab" class="tab-pane fade in">
															<div class="panel-group" id="accordion">
																<!-- <div class="divide-20"></div> -->
																<div class="panel">
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0"
																			border="0" class="datatable table  table-bordered">
																			<thead id="ehatTHead">
																						<tr style="background-color: lightblue">
																						<th class="col-md-1 center">Sr.No.</th>	
																					<th class="col-md-1 center">Reg. Date</th>													
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">UHID</th>
																					<th class="col-md-1 center">Collected At</th>
																					<th class="col-md-1 center">Barcode</th>
																					<!-- <th class="col-md-1 center">Unit</th> -->																				
																					<th class="col-md-1 center">Test Name</th>
																					<th class="col-md-1 center">Status</th>
																					<th class="col-md-1 center"colspan="2">Sample</th>
																					<th class="col-md-1 center">Lab Status</th>
																					<th class="col-md-1 center">Time Sensitive(hrs.)</th>
																					<th class="col-md-1 center">Hold/Unhold</th>
																					<th class="col-md-1 center">Action</th>
																				</tr>
																				<tr style="background-color: lightcyan">
																					<th class="col-md-1 center"></th>	
																					<th class="col-md-1 center"></th>													
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<!-- <th class="col-md-1 center"></th> -->																				
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center">Type</th>
																					<th class="col-md-1 center">Container</th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																				</tr>
																			</thead>

																			<tbody id="phlebotomyCollectedRecordTableBody">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
															<!--    Starting pagination    -->
															<div style="margin-top: -1%">
																<div class="pull-right">
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="phleboCollectedJumpToPage">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="phleboCollectedPagination">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="phleboCollectedNumberOfPages">
																	</ul>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>

														<div id="collectionPendingTab" class="tab-pane fade in ">
															<div class="panel-group" id="accordion">
																<!-- <div class="divide-20"></div> -->
																<div class="panel">
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" class="datatable table  table-bordered">
																			<thead id="ehatTHead">
																						<tr style="background-color: lightblue">
																						<th class="col-md-1 center">Sr.No.</th>
																					<th class="col-md-1 center">Reg. Date</th>													
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">UHID</th>
																				<!-- <th class="col-md-1 center">Center Name</th> -->
																					<th class="col-md-1 center">Collected At</th>
																					<th class="col-md-1 center">Barcode</th>
																					<th class="col-md-1 center">Collection Date Time</th>																				
																					<th class="col-md-1 center">Test Name</th>
																					<th class="col-md-1 center">Status</th>
																					<th class="col-md-1 center"colspan="2">Sample</th>
																					<th class="col-md-1 center">Time Sensitive(hrs.)</th>
																					<th class="col-md-1 center">Accession</th>
																					<th class="col-md-1 center">Reject</th>
																					<th class="col-md-1 center">Action</th>
																				</tr>
																				<tr style="background-color: lightcyan">
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>													
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																				<!-- <th class="col-md-1 center"></th> -->
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>																				
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center">Type</th>
																					<th class="col-md-1 center">Container</th>
																					<!-- <th class="col-md-1 center">Quantity</th> -->
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																				</tr>
																			</thead>

																			<tbody id="collectionPendingTabId">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
															<!--    Starting pagination    -->
															<div style="margin-top: -1%">
																<div class="pull-right">
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="collectionPendingJumpToPage">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="collectionPendingPagination">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="collectionPendingNumberOfPages">
																	</ul>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>

														<div id="accessionDoneTab" class="tab-pane fade in ">
															<div class="panel-group" id="accordion">
																<!-- <div class="divide-20"></div> -->
																<div class="panel">
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" class="datatable table  table-bordered">
																			<thead id="ehatTHead">
																						<tr style="background-color: lightblue">
																					<th class="col-md-1 center">Reg. Date</th>													
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">UHID</th>
																				<!-- <th class="col-md-1 center">Center Name</th> -->
																					<th class="col-md-1 center">Collected At</th>
																					<th class="col-md-1 center">Barcode</th>
																					<th class="col-md-1 center">Collection Date Time</th>																				
																					<th class="col-md-1 center">Test Name</th>
																					<th class="col-md-1 center">Status</th>
																					<th class="col-md-1 center"colspan="2">Sample</th>
																					<th class="col-md-1 center">Time Sensitive(hrs.)</th>
																					<th class="col-md-1 center">Accession</th>
																					<th class="col-md-1 center">Reject</th>
																					<th class="col-md-1 center">Action</th>
																				</tr>
																				<tr style="background-color: lightcyan">
																					<th class="col-md-1 center"></th>													
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																				<!-- <th class="col-md-1 center"></th> -->
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>																				
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center">Type</th>
																					<th class="col-md-1 center">Container</th>
																					<!-- <th class="col-md-1 center">Quantity</th> -->
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																				</tr>
																			</thead>
																			<tbody id="accessionDoneTabId">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
															<!--    Starting pagination    -->
															<div style="margin-top: -1%">
																<div class="pull-right">
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="accessionDoneJumpToPage">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="accessionDonePagination">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="accessionDoneNumberOfPages">
																	</ul>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>

														<div id="rejectedSampleTab" class="tab-pane fade in ">
															
															<div class="form-inline col-md-12">																
																	
																	<!-- <div class="checkbox checkbox-inline col-md-1 pull-right">
																		<input type="button" value="Delete" id="deleteId"
																			class="btn btn-xs btn-warning " data-toggle="tooltip"
																			data-placement="bottom" title="Delete"  onclick="InRejectSampleBackToAccessionAndDelete(this.id)"/>
																	</div>	 -->
																	<div class="checkbox checkbox-inline col-md-1 pull-right">
																		<input type="button" value="ReCollection" id="ReCollection"
																			class="btn btn-xs btn-warning " data-toggle="tooltip"
																			data-placement="bottom" title="ReCollection"  onclick="showRejectedprofileandTest('rejectedSampleTab')"/>
																	</div>																	
																																	
																	
																</div>
															
															<div class="panel-group" id="accordion">
																<div class="panel">															
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="previousRecordTable"
																			class="datatable table  table-bordered">
																			<thead id="ehatTHead">
																						<tr style="background-color: lightblue">
																					<th class="col-md-1 center">Reg. Date</th>													
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">UHID</th>
																				<!-- <th class="col-md-1 center">Center Name</th> -->
																					<th class="col-md-1 center">Collected At</th>
																					<th class="col-md-1 center">Barcode</th>
																					<th class="col-md-1 center">Collection Date Time</th>																				
																					<th class="col-md-1 center">Test Name</th>
																					<th class="col-md-1 center">Status</th>
																					<th class="col-md-1 center"colspan="2">Sample</th>
																					<th class="col-md-1 center">Time Sensitive(hrs.)</th>
																					<th class="col-md-1 center">Accession</th>
																					<th class="col-md-1 center">Reject</th>
																					<th class="col-md-1 center">Action</th>
																				</tr>
																				<tr style="background-color: lightcyan">
																					<th class="col-md-1 center"></th>													
																					<th class="col-md-1 center"></th>
																				<!-- <th class="col-md-1 center"></th> -->
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>																				
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center">Type</th>
																					<th class="col-md-1 center">Container</th>
																					<!-- <th class="col-md-1 center">Quantity</th> -->
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																				</tr>
																				</thead>
																			<tbody id="rejectedSampleTabId">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
															<!--    Starting pagination    -->
															<div style="margin-top: -1%">
																<div class="pull-right">
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="rejectedSampleJumpToPage">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="rejectedSamplePagination">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="rejectedSampleNumberOfPages">
																	</ul>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>

														<div class="modal fade" id="rejectedTestPopUp" tabindex="-1" >
															<div class="modal-dialog modal-dialog-centered"  style="width: 75%;margin-top:10%">																
																	
																	<div class="modal-body">
																		<div class="row">
																			<div class="col-md-12">
																				<div class="container">
																					<div class="panel">
																					   <div class="panel-body" style="overflow: auto;">
																							<div class="col-md-1" style="margin-top:0%;margin-left:91%">
																								<input type="button" value="close" class="btn btn-xs btn-danger "
																									data-toggle="tooltip" data-placement="bottom" title="close" onclick="hidepopuprejecttest()" />
																							</div>
																							
																						<div class="panel-heading" id="divEhatContent"></div>
																						
																							<div class="col-md-12" style="font-weight: bold; overflow: auto; height: 300px">
																							
																							<div style="font-weight: bold; overflow: auto;">
																								
																									<table border="1" class="table table-bordered table-hover table-responsive" id="rejectedTestTable" style="overflow: auto;">
																										<thead>
																											<tr style="background-color: lightblue">
																												<!-- <th class="col-md-1 center">#</th> -->
																												<th class="col-md-3 center">Profile Test Name</th>
																												<th class="col-md-3 center">Code</th>
																												<th class="col-md-1 center">Reason</th>
																												<th class="col-md-1 center">Cancel</th>
																												<th class="col-md-1 center">Action</th>
																											</tr>
																										</thead>
																										<tbody style="overflow: auto; border: 1px solid #436a9d;"
																											id="rejectedTestTableBody"></tbody>
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

														
														<div class="modal fade" id="rejectedpopupAllTab"
															tabindex="-1">
															<div class="modal-dialog modal-dialog-centered"
																style="width: 75%; margin-top: 10%">

																<div class="modal-body">
																	<div class="row">
																		<div class="col-md-7"
																			style="margin-top: 0%; margin-left: 20%">
																			<div class="container">
																				<div class="panel">
																					<div class="panel-body" style="overflow: auto;">
																						<div class="col-md-12" style="font-weight: bold;">
																							<div class="col-md-2" style="margin-top: -6px">
																								<h6>Reason:</h6>
																							</div>
																							<div id="cancleDiv" class="form-group col-md-5">
																								<select id="testReasonIDList" name="select"
																									class="col-md-12 input-SmallText"
																									style="margin-top: 0px;">
																								</select>
																							</div>

																							<div id="reCollectionDiv"
																								class="form-group col-md-2"
																								style="margin-top: 0%">
																								<input type="button" value="Reject"
																										class="btn btn-xs btn-warning " title="Reject" id="rejectid"
																										onclick="AccessionpatientTestRejectAndAccepted(this.id,'allrecord')" />
																							</div>

																							<div id="closeDiv" class="form-group col-md-2"
																								style="margin-top: 0%">
																								<input type="button" value="close"
																										class="btn btn-xs btn-danger " title="close" id="closeId"
																										onclick="hideRejectedprofileandTest('allrecord')" />
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

														
														<div class="modal fade" id="rejectedpopupAccessionPendingTab" tabindex="-1" >
															<div class="modal-dialog modal-dialog-centered"  style="width: 75%;margin-top:10%">																
																	
																	
																<div class="modal-body">
																	<div class="row">
																		<div class="col-md-7"
																			style="margin-top: 0%; margin-left: 20%">
																			<div class="container">
																				<div class="panel">
																					<div class="panel-body" style="overflow: auto;">
																						<div class="col-md-12" style="font-weight: bold;">
																							<div class="col-md-2" style="margin-top: -6px">
																								<h6>Reason:</h6>
																							</div>
																							<div id="cancleDiv" class="form-group col-md-5">
																								<select id="testReasonId" name="select"
																									class="col-md-12 input-SmallText"
																									style="margin-top: 0px;">
																								</select>
																							</div>

																							<div id="reCollectionDiv"
																								class="form-group col-md-2"
																								style="margin-top: 0%">
																								<input type="button" value="Reject"
																										class="btn btn-xs btn-warning " title="Reject" id="rejectid"
																										onclick="AccessionpatientTestRejectAndAccepted(this.id,'accessionPending')" />
																							</div>

																							<div id="closeDiv" class="form-group col-md-2"
																								style="margin-top: 0%">
																								<input type="button" value="close"
																										class="btn btn-xs btn-danger " title="close" id="closeId"
																										onclick="hideRejectedprofileandTest('accessionPending')" />
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
														
														<div class="modal fade" id="rejectedpopupRejectSampleTab" tabindex="-1" >
															<div class="modal-dialog modal-dialog-centered"  style="width: 75%;margin-top:10%">																
																	
																	
																<div class="modal-body">
																	<div class="row">
																		<div class="col-md-7"
																			style="margin-top: 0%; margin-left: 20%">
																			<div class="container">
																				<div class="panel">
																					<div class="panel-body" style="overflow: auto;">
																						<div class="col-md-12" style="font-weight: bold;">
																							<div class="col-md-2" style="margin-top: -6px">
																								<h6>Reason:</h6>
																							</div>
																							<div id="cancleDiv" class="form-group col-md-5">
																								<select id="recollectionreasonId" name="select"
																									class="col-md-12 input-SmallText"
																									style="margin-top: 0px;">
																								</select>
																							</div>

																							<div id="reCollectionDiv"
																								class="form-group col-md-3"
																								style="margin-top: 0%">
																								<input type="button" value="ReCollection"
																										class="btn btn-xs btn-warning " title="Reject" id="ReCollection"
																										onclick="InRejectSampleBackToAccessionAndDelete(this.id)" />
																							</div>

																							<div id="closeDiv" class="form-group col-md-2"
																								style="margin-top: 0%">
																								<input type="button" value="close"
																										class="btn btn-xs btn-danger " title="close" id="closeId"
																										onclick="hideRejectedprofileandTest('rejectsample')" />
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
											</div>
										</div>
									</div>
								</div>
								<!-- /NEW ORDERS -->
							</div>

							<div class="footer-tools">
								<span class="go-top"> <i class="fa fa-chevron-up"></i>
									Top
								</span>
							</div>
						</div>
						<!-- /CONTENT-->
					</div>
				</div>
				<div class="modal fade" id="outSourcelabpopup" tabindex="-1"
					role="dialog" aria-labelledby="labTestModal" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered" role="document"
						style="width: 50%;">
						<div class="modal-content">
							<div class="modal-header">
								<h4 class="center">
									<b>OutSource Test</b>
								</h4>
							</div>
							<div class="modal-body">
								<div class="row">
									<div class="col-md-12">
										<div class="container">
											<div class="panel panel-primary">
												<div class="panel-heading" id="divEhatContent"></div>
												<div class="panel-body">
													<input id="outlabId" type="hidden" value="0">
													<div class="form-group col-md-4">
														<label>OutSource To</label> <select id="labCenterId"
															class="form-control" style="width: 97%;">
														</select> <input type="hidden" id="hiddenSubServiceId">
													</div>
													<div class="form-group col-md-4">
														<label for="exampleInputEmail1">Dispatch Date </label> <input
															class="form-control" type="text" readonly="readonly"
															onclick="displayCalendar(document.getElementById('dispatchDate'),'dd/mm/yyyy',this)"
															id="dispatchDate" onchange="validateDateOutSourceTest();" placeholder="Dispatch Date">
													</div>
													<div class="form-group col-md-4">
														<label for="exampleInputEmail1">Dispatch Time </label> <input
															class="form-control" type="text" readonly="readonly"
															id="dispatchTime" placeholder="Dispatch Time">
													</div>
													<div class="form-group col-md-4">
														<label for="exampleInputEmail1">Carrier Name </label> <input
															type="text" id="carrierId" class="form-control"
															placeholder="Carrier Name">
													</div>
													<div class="form-group col-md-4">
														<label for="exampleInputEmail1">Comment </label> <input
															type="text" id="CommentId" class="form-control"
															placeholder="Comment">
													</div>
													<div class="pull-right" style="margin-top: 2%">
														<button type="button" class="btn btn-primary"
															onclick="sendToOutSourceTestPhlebo()">Save</button>
														<button type="button" class="btn btn-warning"
															data-dismiss="modal">Close</button>
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
				
				
				<!-- ----Added by kishor for Barcode Popup ---- -->
				<div class="modal fade" id="Counter_Batch_Pop_Up" tabindex="-1"
					role="dialog" aria-labelledby="labTestModal" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered" role="document"
						style="width: 20%;">
						<div class="modal-content">
							<div class="modal-header">
								<h4 class="center">
									<b>Barcode Generation </b>
								</h4>

							</div>
							<div class="modal-body">
								<div class="row">
									<div class="col-md-12">
										<div class="container">
											<div class="panel panel-primary">
												<div class="panel-heading" id="divEhatContent"></div>
												<div class="panel-body">
													<input id="outlabId" type="hidden" value="0">
													<div class="form-group col-md-12">
														<label for="exampleInputEmail1">Enter Barcode
															Count: </label> <input type="text" id="txtBarcodecnt"
															onkeypress="return validatePrice(event)"
															class="form-control"
															placeholder="Enter Barcode Count:">
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="pull-right" style="margin-right: 15%;">
											<button type="button" class="btn btn-warning"
												onclick="generateBarcodePrint11()">Print</button>
											<button type="button" class="btn btn-danger"
												data-dismiss="modal">Close</button>
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
				
				<input type="hidden" value="0" id="barcodeId" />
				<input type="hidden" value="0" id="pName" />
				<input type="hidden" value="0" id="profileName" />
				<input type="hidden" value="0" id="tId" />
				
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

		<script type="text/javascript">
			$("#selectAll").click(function() {
			  $("input[type=checkbox]").prop("checked", $(this).prop("checked"));
			});

			$("input[type=checkbox]").click(function() {
		  		if (!$(this).prop("checked")) {
		    		$("#selectAll").prop("checked", false);
		  		}
			});

			   $('#collectionTime').datetimepicker({
			      	datepicker : false,
			      	format : 'H:i',
			      	step : 5
			      });
		</script>

		<script>
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
				$('#dispatchTime').datetimepicker({
					datepicker : false,
					format : 'H:i',
					step : 5
				}); 
			});
			
		    $('.pagination li a').click(function(e) {

		        $('.pagination li.active').removeClass('active');

		        var $parent = $(this).parent();
		        $parent.addClass('active');
		        e.preventDefault();
		    });
			
		    $('#emergencyFlag').val("All");
			//getAccessionRecord('all');	
			//getCountOfTabs();
			searchLabTestPatient("phelbotomySearchBtn");
			<%-- setCustName("<%=session.getAttribute("userType")%>", "<%=session.getAttribute("userCustomerType")%>", "<%=session.getAttribute("userCustomerId")%>"); --%>
			//getAllCustomerType('custTypeForSearch');
			$("#collectedAt").select2();
			//getCollectedAtOptions();
			getAllOutLabMaster();
			//$("#sampleCollectedAt").select2();
		});
	</script>
		<input type="hidden" id=stateId value="0">
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
			<input type="hidden" value="<%=meeshaFlow%>"  id="meeshaFlow" />
			<input type="hidden" value="<%=hospitalname%>"  id="hospitalname" />

		<input type='hidden' id="custTypeId" value="0" />
		<input type="hidden" id="custNameId" value="0" />
		<input type='hidden' id="fromDate" value="" />
		<input type="hidden" id="toDate" value="" />
		<input type='hidden' id="searchBy" value="byAll" />
		<input type="hidden" value="<%=session.getAttribute("userFor")%>" id="userFor"/>
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>