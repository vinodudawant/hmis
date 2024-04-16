<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Phlebotomy OutSource Record</title>
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

<!-- added for tableToExcel Property -->
<script src="ehat-design/table2excel/jquery.table2excel.js"></script>
<script src="ehat-design/table2excel/jquery.table2excel.min.js"></script>

<!-- include js for development -->
<script type="text/javascript" src="js/diagnostic_patient.js"></script>
<script type="text/javascript" src="js/pathology_phelbotomy.js"></script>
<script type="text/javascript" src="js/new_phlebotomy.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/pathology_outsource_template.js"></script>
<style>
#radioBtn .notActive{
    color: #3276b1;
    background-color: #fff;
}
</style>

<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());

	java.text.SimpleDateFormat formatterr = new java.text.SimpleDateFormat("dd/MM/yyyy");
	String todays_datee = formatterr.format(currentDate.getTime());
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
											<li><i class="fa fa-home"></i> <a
												href="pathology_phlebotomy_outsource.jsp">OutSource</a></li>

										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-12">
									<div class="col-md-1">
										<label for="inlineFold" class="control-label">Search
											By : </label> 
									</div>

									<div class="col-md-2">
										<div class="input-group" id="documentByName">
											<label for="inlineFold" class="control-label">OutSource
												Type:</label> <select id="outSourceType"
												class="form-control input-SmallText" onchange="fetchLabNameByType()">
												<option value="0">---Select---</option>												
												<option value="2">OutSource</option>
												<option value="3">Forced OutSource</option>
											
											</select>
										</div>
										
										
									</div>
									
									<div class="col-md-2">
										
											<label for="inlineFold" class="control-label">Lab Name
												:</label> <select id="outSourceTypeId" class="form-control" onchange="getOutSourceTypeById()"> 
												<option value="0">--Select Lab--</option>
											</select>
										
									</div>
									
									<!-- <div class="col-md-2">
										
											<label for="inlineFold" class="control-label">Department
												:</label> <select id="outSourceTypeId" class="form-control" onchange="getOutSourceTypeById()"> 
												<option value="0">--Select Lab--</option>
											</select>
										
									</div> -->
									<!-- <div class="col-md-2">
										<div class="input-group" id="divbyName"
											style="margin-top: 18px">
											<label for="inlineFold" class="control-label"></label> <input
												class="form-control" id="byName" style="width: 100%"
												type="text" placeholder="Enter Search Text"
												onkeyup="outSourcePatientAutoSuggestion(this.id);">
										</div>
									</div> -->

								<!-- 	<div class="col-md-2">
										<div class="input-group" id="customerTypes">
											<label for="inlineFold" class="control-label">Customer
												Type:</label> <select id="custTypeForSearch"
												onchange="fetchCustomerNames('outSourceSearchBtn')"
												class="form-control input-SmallText">
												<option value="0">--Select Type--</option>
												<option value="1">Inhouse Lab</option>
												<option value="2">Customer Lab</option>
												<option value="3">Customer Hospital</option>
												<option value="4">Customer Clinic</option>
												<option value="5">Collection Center</option>
											</select>
										</div>
									</div>
 --><!-- 
									<div class="col-md-2">
										<div class="input-group" id="customerNames">
											<label for="inlineFold" class="control-label">Customer
												Name:</label> <select id="custNameForSearch"
												class="form-control input-SmallText">
												<option value="0">--Select Customer--</option>
											</select>
										</div>
									</div> -->
									
									<div class="col-md-1">
										<span class="input-group-btn"> <label for="inlineFold"
											class="control-label">Department : </label>
											 <select id="departmentId" class="form-control" > 
											    <option value="0">--Select Department--</option>
											    <option value="1">OPD</option>
											    <option value="2">IPD</option>
											    <option value="3">DIAG</option>
											 </select>
										</span>
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
											onclick="searchDateWiseOutSourced();"
											style="margin-top: 20px;" />
									</div>
									
									<div class="col-md-1">
										<label style="margin-top: 20px;" for="inlineFold" class="control-label">Emergency:</label>
									</div>
									<div class="col-md-2">
										<div class="input-group" id="documentByName" style="margin-top: 20px;">
											<div id="radioBtn" class="btn-group">
											<a class="btn btn-danger btn-xs notActive"
												data-toggle="emergencyFlag" id="labAvailableSwitchYes"
												data-title="Y" onclick="toggleSwitch(this.id,'outsource')">Yes</a>
											<a class="btn btn-primary btn-xs active"
												data-toggle="emergencyFlag" id="labAvailableSwitchBoth"
												data-title="All" onclick="toggleSwitch(this.id,'outsource')">All</a>
											<a class="btn btn-success btn-xs notActive"
												data-toggle="emergencyFlag" id="labAvailableSwitchNo"
												data-title="N" onclick="toggleSwitch(this.id,'outsource')">No</a>
										</div>
										<input type="hidden" name="emergencyFlag" id="emergencyFlag"
											value="All">
										</div>
									</div>
									
								</div>
								
								<div class="col-md-12" style="margin-top: 1%; display:none">
									<!-- <div class="col-md-1">
										<label for="inlineFold" class="control-label">Emergency : </label>
									</div>
									<div class="col-md-2">
										<div class="input-group" id="documentByName">
											<div id="radioBtn" class="btn-group">
											<a class="btn btn-danger btn-xs notActive"
												data-toggle="emergencyFlag" id="labAvailableSwitchYes"
												data-title="Y" onclick="toggleSwitch(this.id,'outsource')">Yes</a>
											<a class="btn btn-primary btn-xs active"
												data-toggle="emergencyFlag" id="labAvailableSwitchBoth"
												data-title="All" onclick="toggleSwitch(this.id,'outsource')">All</a>
											<a class="btn btn-success btn-xs notActive"
												data-toggle="emergencyFlag" id="labAvailableSwitchNo"
												data-title="N" onclick="toggleSwitch(this.id,'outsource')">No</a>
										</div>
										<input type="hidden" name="emergencyFlag" id="emergencyFlag"
											value="All">
										</div>
									</div> -->
									
									<div class="col-md-1">
										<label for="inlineFold" class="control-label" style="margin-left: -90px;">Collected At: </label>
									</div>
									<div class="col-md-2" style="margin-left: -94px;">
										<div class="input-group" id="documentByName">
											<select style="width: 150px" id="collectedAt" onchange="getSamplesByCollectedAt('outsource');">
											</select>
										</div>
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
													
												<li  class="active"  id="outsource" >
												<a id="AO"  data-toggle="tab" href="#OutSourceProcessingTab"  onclick="getSamples('outSourceSearchBtn')"><i class="fa fa-bookmark"></i> 
												<span class="hidden-inline-mobile">OutSource Record</span>
												<span class="badge badge-blue font-11" id="subChrgCount"></span>
												</a></li>

												<li id="forcedOutSource" >
												<a id="AOO"  data-toggle="tab" href="#OutSourcedPhleboTab" onclick="getSamples('outSourceSearchBtn')"><i class="fa fa-bookmark"></i> 
												<span class="hidden-inline-mobile">OutSourced Record</span>
												<span class="badge badge-blue font-11" id="chrgCount"></span>
												</a></li>
												
												<li id="outsourcelabreport" >
												<a id="AOO1"  data-toggle="tab" href="#OutSourcedReportTab" onclick="getSamplesReport('outSourceSearchBtn')"><i class="fa fa-bookmark"></i> 
												<span class="hidden-inline-mobile">OutSource Lab Report</span>
												<span class="badge badge-blue font-11" id="chrgCount"></span>
												</a></li>
																							

												</ul>
																															
												</div>
												<div class="panel-body">
													<div class="tab-content">

														<div id="OutSourceProcessingTab" class="tab-pane fade in active">
															<div class="panel-group" id="accordion">
																<!-- <div class="divide-20"></div> -->
																<div class="panel">
																	<div class="panel-body"
																		style="overflow: auto; height: 400px; margin-top: -2%">
																		<table id="ehatTable"
																			class="datatable table  table-bordered"
																			style="margin-top: 0%">
																			<thead id="ehatTHead">
																				<tr style="background-color: lightblue">
																					<th class="col-md-1 center">Reg. Date</th>
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">Patient ID</th>
<!-- 																					<th class="col-md-1 center">Center Name</th> -->
																					<th class="col-md-1 center">Collected At</th>
																					<th class="col-md-1 center">Barcode</th>
																					<th class="col-md-1 center">Collection Date Time</th>
																					<th class="col-md-1 center">Test Name</th>
																					<th class="col-md-1 center">Status</th>
																					<th class="col-md-2 center"colspan="2">Sample</th>
																					<th class="col-md-1 center">Time Sensitive(hrs.)</th>																					
																					<th class="col-md-1 center">Print Barcode</th>
																					<th class="col-md-1 center">Action</th>
																				</tr>
																				<tr style="background-color: lightcyan">
																					<th class="col-md-1 center"></th>													
																					<th class="col-md-1 center"></th>
																					<!-- <th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th> -->
<!-- 																					<th class="col-md-1 center"></th> -->
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
																				</tr>
																			</thead>

																			<tbody id="proccessingtabId">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
															
															<!--    Starting pagination    -->
															<div style="margin-top: -1%">
																<div class="pull-right">
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="jumpToPage">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="outSourcePagination">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="outSourceNumberOfPages">
																	</ul>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>

														<div id="OutSourcedPhleboTab" class="tab-pane fade in">
															<div class="panel-group" id="accordion">

															<div class=" col-md-12" style="margin-left: -2%">
																<div class=" col-md-1 pull-right">
																	<span class="input-group-btn"> <label
																		for="inlineFold" class="control-label"> </label> <input
																		type="button" value="ExportToPrint"
																		class="btn btn-xs btn-primary"
																		onclick="outsourceExportToPdf();"
																		style="margin-top: 20px;" /></span>
																</div>

																<div class=" col-md-1 pull-right" id="exporttoExceldiv">
																	<span class="input-group-btn"> <label
																		for="inlineFold" class="control-label"> </label> <input
																		type="button" value="ExportToExcel"
																		id="exportToExcelId" class="btn btn-xs btn-warning"
																		style="margin-top: 20px;" /></span>
																</div>
																<script type="text/javascript">
																	$(
																			"[id$=exportToExcelId]")
																			.click(
																					function(
																							e) {
																						window
																								.open('data:application/vnd.ms-excel,'
																										+ encodeURIComponent($(
																												'div[id$=forcedoutsourcetab]')
																												.html()));
																						e
																								.preventDefault();
																					});
																</script>
																<!-- <script type="text/javascript">
										$("[id$=exportToExcelId]")
												.click(
														function(e) {
															window
																	.open('data:application/vnd.ms-excel,'
																			+ encodeURIComponent($(
																					'div[id$=forcedoutsourcetab]')
																					.html()));
															e.preventDefault();
														});
									</script> -->
															</div>
															<div  class=" col-md-12">
																<!-- <div class="divide-20"></div> -->
																<div class="panel" id="forcedoutsourcetab">
																	<div class="panel-body"
																		style="overflow: auto; height: 300px"  id="forcedoutsourcetab">
																		<table id="ehatTable"
																			class="datatable table  table-bordered"
																			style="margin-top: -2%">
																			<thead id="ehatTHead">
																				<tr style="background-color: lightblue">
																					<th class="col-md-1 center">Reg. Date</th>
																					<th class="col-md-2 center">Patient Name</th>
																					<th class="col-md-1 center">Patient ID</th>
																					<!-- <th class="col-md-1 center">Center Name</th>
																					<th class="col-md-1 center">Refered By</th> -->
																					<th class="col-md-1 center">Barcode</th>
																					<th class="col-md-2 center">Collection Date Time</th>
																					<th class="col-md-2 center">Test Name</th>
																					<th class="col-md-2 center"colspan="2">Sample</th>
																					<th class="col-md-1 center">OutSource Type</th>
																					<th class="col-md-1 center">OutSource Lab</th>
																					<th class="col-md-1 center">Time Sensitive(hrs.)</th>
																			        <th class="col-md-1 center">Details</th>
																			        <th class="col-md-1 center">Document</th>
																					<th class="col-md-1 center">Print Barcode</th>
																					<th class="col-md-1 center">Action</th>
																				</tr>
																				<tr style="background-color: lightcyan">
																					<th class="col-md-1 center"></th>													
																					<th class="col-md-1 center"></th>
																					<!-- <th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th> -->
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
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																				</tr>
																			</thead>

																			<tbody id="proccessingtabId1">
																			</tbody>
																		</table>
																	</div>

																	

																</div>
																</div>
															</div>

															<!--    Starting pagination    -->
															<div style="margin-top: -1%">
																<div class="pull-right">
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="outsourceforcedJumpToPage">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="outSourceForcedPagination">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="outSourceForcedNumberOfPages">
																	</ul>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>
														<!-- Start Report -->
														<div id="OutSourcedReportTab" class="tab-pane fade in">
															<div class="panel-group" id="accordion">
															
															
															<div class=" col-md-12" style="margin-left: -2%">
																<div class=" col-md-1 pull-right">
																   <button id="btnExportLabReport"
																	onclick="exportToExcelOutSourceLabReport();"
																	class="pull-right btn btn-primary btn-xs btn-warning"
																	value="Excel" title="Export Report"
																	data-placement="left" data-toggle="tooltip"
																	data-original-title="Excel" style="margin-top:19px">Export To Excel
																	</button>
																
																</div>
															</div>
															
															<div  class=" col-md-12">
																<!-- <div class="divide-20"></div> -->
																<div class="panel" id="outsourcelabreporttab">
																	<div class="panel-body" id="outsourcelabreporttab"
																		style="overflow: auto; height: 400px; margin-top: -2%">
																		<table id="ehatTable"
																			class="datatable table  table-bordered table-striped"
																			style="margin-top: 0%">
																			<thead id="ehatTHead">
																				<tr style="background-color: lightblue;">
																					<th class="col-md-1 center">Sr No</th>
																					<th class="col-md-1 center">Lab Name</th>
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">Date</th>
																					<th class="col-md-1 center">Test Name</th>
																					<th class="col-md-1 center">Charges</th>
																				</tr>
																			</thead>

																			<tbody id="reportingtabId">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
														</div>
															
															<!--    Starting pagination    -->
															<div style="margin-top: -1%">
																<div class="pull-right">
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="jumpToPage">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="outSourcePagination">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="outSourceNumberOfPages">
																	</ul>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>
														
														<!--End Report  -->
														

													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- /NEW ORDERS -->
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
									<b>OutSource Lab Details</b>
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
															onclick="displayCalendar(document.getElementById('dispatchDate'),'dd/mm/yyyy',this);"
																onchange="validateDateOutSourceTest();"
															id="dispatchDate" placeholder="Dispatch Date">
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
															onclick="sendToOutSourceTestOutsourceTab()">Save</button>
														<button type="button" class="btn btn-danger"
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
			<div class="modal fade" id="outSourcelabpopupDetails" tabindex="-1"
					role="dialog" aria-labelledby="labTestModal" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered" role="document"
						style="width: 50%;">
						<div class="modal-content">
							<div class="modal-header">
								<h4 class="center">
									<b>OutSource Lab Details</b>
								</h4>
							</div>
							<div class="modal-body">
								<div class="row">
									<div class="col-md-12">
										<div class="container">
											<div class="panel panel-primary">
												<div class="panel-heading" id="divEhatContent"></div>
												<div class="panel-body">
													
													<div class="form-group col-md-4">
														<label for="exampleInputEmail1">Out Lab Type </label> <input
															type="text" id="outlabtype" class="form-control" readonly="readonly"
															>
													</div>
													<div class="form-group col-md-4">
														<label for="exampleInputEmail1">Out Lab Name </label> <input
															type="text" id="outlabname" class="form-control" readonly="readonly"
															placeholder="Carrier Name">
													</div>
													<div class="form-group col-md-4">
														<label for="exampleInputEmail1">Dispatch Date </label> <input
															type="text" id="dispatchDate1" class="form-control" readonly="readonly"
															>
													</div>
													<div class="form-group col-md-4">
														<label for="exampleInputEmail1">Dispatch Time </label> <input
															class="form-control" type="text" readonly="readonly"
															id="dispatchTime1" placeholder="Dispatch Time">
													</div>
													<div class="form-group col-md-4">
														<label for="exampleInputEmail1">Carrier Name </label> <input
															type="text" id="carrierId1" class="form-control" readonly="readonly"
															placeholder="Carrier Name">
													</div>
													<div class="form-group col-md-4">
														<label for="exampleInputEmail1">Comment </label> <input
															type="text" id="CommentId1" class="form-control" readonly="readonly"
															placeholder="Comment">
													</div>
													<div class="pull-right" style="margin-top: 2%">
														<button type="button" class="btn btn-primary" style="display:none"
															onclick="sendToOutSourceTestOutsourceTab()">Save</button>
														<button type="button" class="btn btn-danger"
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
									<b>Barcode Generator </b>
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
															class="form-control" placeholder="Enter Barcode Count:">
													</div>


													<%-- <div class="modal-body">
																								<div class="col-md-12-1" style="margin-top: 9px;">
																								<div class="col-md-5-1" style="margin-top:-28px;margin-left:42px;">Enter Barcode Count:</div>
																									<div class="col-md-7-1" style="margin-top:-10px;margin-left:39px;">
																										<input type="text" id="txtBarcodecnt" placeholder="Enter barcode count" onblur="isNumber('txtBarcodecnt',0,10);">		
																									</div>
																									<div class="col-md-12-1" style="margin-top: 5px;margin-left:-24px;color:red" >
																										<input type="button" value="print" onclick="generateBarcodePrint1(<%=request.getParameter("testmasterId")%>)">
																									</div>
																								</div>
																								<!-- /BOX-->
																							</div> --%>

												</div>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="pull-right" style="margin-right: 15%;">
											<button type="button" class="btn btn-warning"
												onclick="generateBarcodePrint11(40)">Print</button>
											<button type="button" class="btn btn-danger"
												data-dismiss="modal">Close</button>
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>

				<div class="modal fade" id="uploadDocumentModal" tabindex="-1" role="dialog" aria-labelledby="labTestModal" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered" role="document" style="width: 50%;">
						<div class="modal-content">
							<div class="modal-header">
								<h4 class="center">
									<b>Document</b>
								</h4>
							</div>

							<div class="modal-body">
								<div class="row">
									<div class="col-md-12">
										<div class="container">
											<div class="panel panel-primary">
												<div class="panel-body">
													<input type="hidden" id="tretId">
												    <input type="hidden" id="slaveId">
													<form id="outsourcedocumentForm" name="outsourcedocumentForm" class="" enctype="multipart/form-data" method="post">
														<div class="col-md-1">
															<input type="file" id="uploadedFile" name="outsourceDocs" value="" multiple="multiple">
														</div>
														<div class="divide-40"></div>
														<div style="overflow: auto; height: 150px">
															<table id="ehatTable" cellpadding="0" cellspacing="0" border="0" class="table table-bordered table-condensed table-responsive">
																<thead id="ehatTHead">
																	<tr>
																		<th class="col-md-1 center">#</th>
																		<th class="col-md-1 center">Document Name</th>
																		<th class="col-md-1 center">View</th>
																		<th class="col-md-1 center">Download</th>
																		<th class="col-md-1 center">Delete</th>
																	</tr>
																</thead>
																<tbody id="outsourceDocumentTableBody">
																</tbody>
															</table>
														</div>

														<div class="pull-right" style="margin-top: 2%">
															<button type="button" class="btn btn-xs btn-primary"
																onclick="saveOutsourceDocument()">Save</button>
															<button type="button" class="btn btn-xs btn-warning"
																data-dismiss="modal">Close</button>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div class="modal fade bs-example-modal-lg"
															id="viewDocModal" tabindex="-1" role="dialog"
															aria-labelledby="myLargeModalLabel" aria-hidden="true">
															<div class="modal-dialog modal-dialog modal-lg">
																<div class="modal-content">
																	<div class="modal-header">
																		<button type="button" class="close"
																			data-dismiss="modal" aria-label="Close">
																			<span aria-hidden="true">&times;</span>
																		</button>
																		<div class="row">
																			<div class="col-md-4 col-xs-11">
																				<h3 class="modal-title" id="myModalLabel">View
																					document</h3>
																			</div>
																			<br> <br>
																			<div class="col-md-6 col-xs-11">
																				<h5></h5>
																				<h6 id="documentComment"></h6>
																			</div>
																		</div>
																	</div>
																	<div class="modal-body">
																		<iframe id="ViewDocumemnt" width="80%" height="330px"></iframe>
																	</div>
																</div>
															</div>
														</div>
				
				
				<input type="hidden" value="0" id="barcodeId" /> 
				<input type="hidden" value="0" id="pName" /> 
				<input type="hidden" value="0" id="profileName" /> 
				<input type="hidden" value="0" id="tId" />
				<%@include file="footer_nobel.jsp"%>
			</div>
		</section>
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

		<input type='hidden' id="outSourceType" value="0" />
		<input type="hidden" id="outSourceTypeId" value="0" />
		<input type='hidden' id="fromDate" value="" />
		<input type="hidden" id="toDate" value="" />
		<input type='hidden' id="searchBy" value="byAll" />

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
			$('#emergencyFlag').val("All");
				//getProcessingRecord('AO');
				searchDateWiseOutSourced();
				setCustName("<%=session.getAttribute("userType")%>", "<%=session.getAttribute("userCustomerType")%>", "<%=session.getAttribute("userCustomerId")%>");				
				//getAllOutLabMaster();
				
				$("#collectedAt").select2();
				
				//getCollectedAtOptions();
		});
	</script>
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>