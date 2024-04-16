<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Processing Record</title>
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
<!-- <link rel="stylesheet" type="text/css"  href="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"> -->
<script src="ehat-design/table2excel/jquery.table2excel.js"></script>
<script src="ehat-design/table2excel/jquery.table2excel.min.js"></script>

<!-- include js for development -->
<script type="text/javascript" src="js/diagnostic_patient.js"></script>
<script type="text/javascript" src="js/pathology_phelbotomy.js"></script>
<script type="text/javascript" src="js/ehat_pathology_outsource.js"></script>
<script type="text/javascript" src="js/new_phlebotomy.js"></script>
<script type="text/javascript" src="js/validate.js"></script>

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

</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">

		<%@include file="Menu_Header_Nobel.jsp"%>
           <%			
			    ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		      	
                String Neutrophils = resourceBundleEha.getObject("Neutrophils").toString();
		      	String Lymphocytes = resourceBundleEha.getObject("Lymphocytes").toString();
		      	String Eosinophils = resourceBundleEha.getObject("Eosinophils").toString();
		      	String Basophils = resourceBundleEha.getObject("Basophils").toString();
		      	String Monocytes = resourceBundleEha.getObject("Monocytes").toString();
		    	String CBCProfile = resourceBundleEha.getObject("CBCProfile").toString();
		    
		    	String CovidReportProfileId = resourceBundleEha.getObject("CovidReportProfileId").toString();
		      	String SARSCOV2ANTIGEN = resourceBundleEha.getObject("SARSCOV2ANTIGEN").toString();
		      	String COVID19RNAAMPLIFICATION = resourceBundleEha.getObject("COVID19RNAAMPLIFICATION").toString();
		      	String REALTIMEHEPATITISCVIRUSHCV = resourceBundleEha.getObject("REALTIMEHEPATITISCVIRUSHCV").toString();
		      	String REALTIMETRUENAT = resourceBundleEha.getObject("REALTIMETRUENAT").toString();
		      				
				java.util.Calendar currentDate = java.util.Calendar .getInstance();
				java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
				String todays_date = formatter.format(currentDate.getTime());
				
				java.text.SimpleDateFormat formatterr = new java.text.SimpleDateFormat("dd/MM/yyyy");
				String todays_datee = formatterr.format(currentDate.getTime());
				
				java.text.SimpleDateFormat formatterrr = new java.text.SimpleDateFormat("hh:mm");
				String todays_time = formatterrr.format(currentDate.getTime());
			%>

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
											<li><i class="fa fa-home"></i> <a href="pathology_proccessing.jsp">Processing Record</a></li>
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
												onkeyup="phelbotomyPatientAutoSuggestion(this.id, 'processingAutoSugg');" autocomplete="off">
										</div>
									</div>

									<div class="col-md-2" style="display:none">
										<div class="input-group" id="customerTypes">
											<label for="inlineFold" class="control-label">Customer
												Type:</label>
												<!-- <select id="custTypeForSearch"
												onchange="fetchCustomerNames('processingSearchBtn')"
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
											<label for="inlineFold" class="control-label">Customer
												Name:</label> 
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
											onclick="searchLabTestPatient('processingSearchBtn');"
											style="margin-top: 20px;" />
									</div>	
									
									<div class=" col-md-1">
										<input type="button" value="Clear All"
											class="btn btn-xs btn-primary"
											onclick="clearSearch('proccessing');"
											title="Clear All Fields & Refresh"
											style="margin-top: 20px;"/>
									</div>
									
									<div class="col-md-1">
										<label style="margin-top: 20px;" for="inlineFold" class="control-label">Emergency : </label>
									</div>
									<div class="col-md-2">
										<div class="input-group" id="documentByName">
											<div id="radioBtn" class="btn-group" style="margin-top: 20px;">
											
												<input type="checkbox" data-on="On" data-off="Off" data-toggle="toggle" data-onstyle="danger" id="toggle-event1"
												data-style="ios" data-size="mini" data-width="60">
										</div>
										<input type="hidden" name="emergencyFlag" id="emergencyFlag"
											value="All">
										</div>
									</div>								
								</div>
								<div class="col-md-12" style="margin-top: 1%;display:none">
									<!-- <div class="col-md-1">
										<label for="inlineFold" class="control-label">Emergency : </label>
									</div>
									<div class="col-md-2">
										<div class="input-group" id="documentByName">
											<div id="radioBtn" class="btn-group">
											<a class="btn btn-danger btn-xs notActive"
												data-toggle="emergencyFlag" id="labAvailableSwitchYes"
												data-title="Y" onclick="toggleSwitch(this.id,'processing')">Yes</a>
											<a class="btn btn-primary btn-xs active"
												data-toggle="emergencyFlag" id="labAvailableSwitchBoth"
												data-title="All" onclick="toggleSwitch(this.id,'processing')">All</a>
											<a class="btn btn-success btn-xs notActive"
												data-toggle="emergencyFlag" id="labAvailableSwitchNo"
												data-title="N" onclick="toggleSwitch(this.id,'processing')">No</a>
												
												<input type="checkbox" data-on="On" data-off="Off" data-toggle="toggle" data-onstyle="danger" id="toggle-event1"
												data-style="ios" data-size="mini" data-width="60">
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
											<select style="width: 150px" id="collectedAt" onchange="getSamplesByCollectedAt('processing');">
											</select>
										</div>
									</div>
									
									<!-- <div class=" col-md-1">
										<input type="button" value="Clear All"
											class="btn btn-xs btn-primary"
											onclick="clearSearch('proccessing');"
											title="Clear All Fields & Refresh"
											/>
									</div> -->
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
													
												<li  class="active"  id="AL" >
												<a id="AD"  data-toggle="tab" href="#processingTab"  onclick="getSamples('processingSearchBtn')"><i class="fa fa-bookmark"></i> 
												<span class="hidden-inline-mobile">Processing Record</span>
												
												<!-- ========================================================================== -->
												<!-- =======================code disabled by ROHIT AMBAWADE==================== -->
												<span class="badge badge-blue font-11" id="proccRecCount" style="display: none">0</span>
												<!-- ========================================================================== -->
												
												</a></li>

												<!-- <li id="accessionpatho" >
												<a id="AAprocessing"  data-toggle="tab" href="#accessionPathoRecordTab" onclick="getProcessingRecord(this.id)"><i class="fa fa-bookmark"></i> 
												<span class="hidden-inline-mobile">Authorization Pathologist Record</span>
												<span class="badge badge-blue font-11" id="chrgCount"></span>
												</a></li> -->
																							

												</ul>
																															
												</div>
												<div class="panel-body">
													<div class="tab-content">

														<div id="processingTab" class="tab-pane fade in active">
															<div class="panel-group" id="accordion">
																<!-- <div class="divide-20"></div> -->
																<div class="form-inline col-md-12">
																	
																	
																	<div class="col-md-2 pull-right">
																	<input type="button" value="Bulk send to authorise" id="bulkPost" class="btn btn-xs btn-success " data-toggle="tooltip" data-placement="bottom" title="" onclick="bulkAuthoriseRecord()" style="" data-original-title="Bulk send to authorise">
																	
																		<!-- <button class="btn btn-info btn-xs"
																			id="btnExportReport" value="AP"
																			onclick="showWorklistPopupInProcessingArea()">Bulk send to Authorise</button>
																 -->	</div>
																	
																	<div class="col-md-1 pull-right">
																		<button class="btn btn-info btn-xs"
																			id="btnExportReport" value="AP"
																			onclick="showWorklistPopupInProcessingArea()">WorkList</button>
																	</div>
																</div>
																
																<div class="panel">
																	<div class="panel-body"
																		style="overflow: auto; height: 400px; margin-top: -2%">
																		<table id="ehatTable"
																			class="datatable table  table-bordered"
																			style="margin-top: 0%">
																			<thead id="ehatTHead">
																				<tr style="background-color: lightblue">
																				<th class="col-md-1 center">Sr.No.</th>	
																					<th class="col-md-1 center">Reg. Date</th>
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">UHID</th>
<!-- 																					<th class="col-md-1 center">Center Name</th> -->
																					<th class="col-md-1 center">Collected At</th>
																					<!-- <th class="col-md-1 center">Customer Name</th> -->
																					<th class="col-md-1 center">Barcode</th>
																					<th class="col-md-1 center">Collection Date Time</th>
																					<th class="col-md-1 center">Test Name</th>
																					<th class="col-md-1 center">Status</th>
																					<th class="col-md-1 center">Sample</th>
																					<th class="col-md-1 center">Time Sensitive(hrs.)</th>
																					<th class="col-md-1 center">Print Barcode</th>
																					<th class="col-md-1 center">Action</th>
														                            <th class="col-md-1 center"><input class="selectall" id="bulksapmle" name="bulksapmle" type="checkbox" ></th>
																				</tr>
																			</thead>

																			<tbody id="proccessingtabId">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>

															<div class="panel-group" id="accordion1">
																<table id="ehatTable1" style="display: none"
																	class="datatable table  table-bordered"
																	style="margin-top:0%">


																	<tbody id="proccessingtabId" style="display: none">
																	</tbody>
																</table>
															</div>

															<!--    Starting pagination    -->
															<div style="margin-top: -1%">
																<div class="pull-right">
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="jumpToPage">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="processingPagination">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="processingNumberOfPages">
																	</ul>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>

														<div id="accessionPathoRecordTab" class="tab-pane fade in">
															<div class="panel-group" id="accordion">

																<!-- <div class="divide-20"></div> -->
																<div class="panel">
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable"
																			class="datatable table  table-bordered"
																			style="margin-top: -2%">
																			<thead id="ehatTHead">
																				<tr style="background-color: lightblue">
																					<th class="col-md-1 center">Reg. Date</th>
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">UHID</th>
																					<!-- <th class="col-md-1 center">Center Name</th> -->
																					<th class="col-md-1 center">Collected At</th>
																					<th class="col-md-1 center">Barcode</th>
																					<th class="col-md-1 center">Collection Date
																						Time</th>
																					<th class="col-md-1 center">Test Name</th>
																					<th class="col-md-1 center">Status</th>
																					<th class="col-md-1 center">Sample</th>
																					<th class="col-md-1 center">Pathologist Name</th>
																					<th class="col-md-1 center">Time Sensitive(hrs.)</th>
																					<th class="col-md-1 center">Print Barcode</th>
																					<th class="col-md-1 center">Action</th>
																				</tr>
																			</thead>

																			<tbody id="proccessingtabId1">
																			</tbody>
																		</table>
																	</div>

																	<!--    Starting pagination    -->
																	<div style="margin-top: -1%">
																		<div class="pull-right">
																			<ul class="pagination pagination-blue margin-bottom-10"
																				id="accessionPathologistJumpToPage">
																			</ul>
																			<ul class="pagination pagination-blue margin-bottom-10"
																				id="accessionPathologistPagination">
																			</ul>
																			<ul
																				class="pagination pagination-blue margin-bottom-10"
																				id="accessionPathologistNumberOfPages">
																			</ul>
																		</div>
																	</div>
																	<!--   Ending  pagination -->

																</div>
															</div>
															
															
															<!--    Starting pagination    -->
															<div style="margin-top: -2%">
																<div class="pull-right">
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="accessionPendingPagination">
																	</ul>
																</div>
																<div class="row">
																	<div class="col-md-4 col-md-offset-8">
																		<div class="pull-right">
																			<ul
																				class="pagination pagination-blue margin-bottom-10"
																				id="accessionPendingNumberOfPages">
																			</ul>
																		</div>
																	</div>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>

													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- /NEW ORDERS -->
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
							
							<!-- ----Added by kishor for authorization pathologist record Barcode Popup ---- -->
							<div class="modal fade" id="Counter_Batch_Pop_Up1" tabindex="-1"
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
																		Count: </label> <input type="text" id="txtBarcodecnt1"
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
															onclick="generateBarcodePrint12(40)">Print</button>
														<button type="button" class="btn btn-danger"
															data-dismiss="modal">Close</button>
													</div>
												</div>
											</div>
										</div>

									</div>
								</div>
							</div>

							<div class="modal fade" id="worklistpopup" tabindex="-1">
								<div class="modal-dialog modal-dialog-centered"
									style="width: 75%; margin-top: 10%">
									<div class="modal-body">
										<div class="row">
											<div class="col-md-12">
												<div class="container">
													<div id="exportToExceldiv" class="panel"
														style="overflow: auto;">
														<div class="panel-body"
															style="overflow: auto; height: 460px">
															<div class="col-md-12" style="font-weight: bold;">

																<div class="col-md-2" style="margin-top: -6px">
																	<h6>Department Name:</h6>
																</div>
																<div id="cancleDiv" class="form-group col-md-4">
																	<select id="Iddepartment" name="select"
																		class="col-md-10 input-SmallText" onclick="getdepartmentWiseWorkList()"></select>
																</div>

																<!-- <div id="searchIdDiv" class="form-group col-md-1"
																	style="margin-top: 0%">
																	<input type="button" id="searchId" value="Search"
																		class="btn btn-xs btn-primary"
																		onclick="getdepartmentWiseWorkList()" />
																</div> -->

																<div id="PrintDiv" class="form-group col-md-2"
																	style="margin-top: 0%">
																	<input type="button" id="searchId" value="ExportToPDF"
																		class="btn btn-xs btn-success"
																		onclick="getdepartmentWiseWorkListPrint()" />
																</div>
<!-- 
																<div id="exportToExcelDiv" class="form-group col-md-2"
																	style="margin-top: 0%">
																	<input type="button" id="exportToExcelId"
																		value="ExportToExcel" class="btn btn-xs btn-warning" />
																</div> -->
												<!-- 				<script type="text/javascript">
																	$(
																			"[id$=exportToExcelId]")
																			.click(
																					function(
																							e) {
																						window
																								.open('data:application/vnd.ms-excel,'
																										+ encodeURIComponent($(
																												'div[id$=workListDiv]')
																												.html()));
																						e
																								.preventDefault();
																					});
																</script> -->

																<button id="btnExportReport"
																	onclick="exportToExcelworkList();"
																	class="pull-right btn btn-primary btn-xs btn-warning editUserAccess"
																	disabled value="Excel" title="Export Report"
																	data-placement="left" data-toggle="tooltip"
																	data-original-title="Excel">Export To Excel</button>

																<div id="closeDiv" class="form-group col-md-1"
																	style="margin-top: 0%">
																	<input type="button" value="Close"
																		class="btn btn-xs btn-danger " title="Close"
																		id="closeId"
																		onclick="hideWorklistPopupInProcessingArea()" />
																</div>
															</div>
															<div class="col-md-12" id="workListDiv">
															<table id="ehatTable"
																class="datatable table  table-bordered"
																style="margin-top: 0%">
																<thead id="ehatTHead">
																	<tr style="background-color: lightblue">
																		<th class="col-md-1 center">#</th>
																		<th class="col-md-1 center">Patient Id</th>
																		<th class="col-md-1 center">Barcode</th>
																		<th class="col-md-1 center">Patient Name</th>
																		<th class="col-md-1 center" style="display:none">Obs</th>
																		<th class="col-md-1 center" style="display:none">Results</th>
																		<th class="col-md-1 center" style="display:none">Lis Entry</th>
																		<th class="col-md-1 center" style="display:none">Auth</th>
																		<!-- <th class="col-md-1 center">Center Code</th>
																		
																		<th class="col-md-1 center">Visit Date</th>
																		<th class="col-md-1 center">Sample Id</th>
																		<th class="col-md-1 center">Refer Doctor</th>
																		<th class="col-md-1 center">Profile/Test name</th>
																		<th class="col-md-1 center">Department</th> -->
																	</tr>
																</thead>
																<tbody id="worklistpopupId">
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



						<input type="hidden" value="0" id="barcodeId" />
						<input type="hidden" value="0" id="pName" />
						<input type="hidden" value="0" id="profileName" />
						<input type="hidden" value="0" id="tId" />

							<div class="footer-tools">
								<span class="go-top"> <i class="fa fa-chevron-up"></i>
									Top
								</span>
							</div>
						</div>
						<!-- /CONTENT-->
					</div>
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

		<input type='hidden' id="custTypeId" value="0" />
		<input type="hidden" id="custNameId" value="0" />
		<input type='hidden' id="fromDate" value="" />
		<input type="hidden" id="toDate" value="" />
		<input type='hidden' id="searchBy" value="byAll" />
      <input type="hidden" value="<%=Neutrophils%>"  id="Neutrophils" />
	  <input type="hidden" value="<%=Lymphocytes%>"  id="Lymphocytes" /> 
      <input type="hidden" value="<%=Eosinophils%>"  id="Eosinophils" /> 
	  <input type="hidden" value="<%=Basophils%>"    id="Basophils" />
	  <input type="hidden" value="<%=Monocytes%>"    id="Monocytes" />
	  <input type="hidden" value="<%=CBCProfile%>"  id="CbcProfile" />
	 
	  <input type="hidden" value="<%=CovidReportProfileId%>"  id="CovidReportProfileId" />
      <input type="hidden" value="<%=SARSCOV2ANTIGEN%>"  id="SARSCOV2ANTIGEN" />
      <input type="hidden" value="<%=COVID19RNAAMPLIFICATION%>"  id="COVID19RNAAMPLIFICATION" />
      <input type="hidden" value="<%=REALTIMEHEPATITISCVIRUSHCV%>"  id="REALTIMEHEPATITISCVIRUSHCV" />
	  <input type="hidden" value="<%=REALTIMETRUENAT%>"  id="REALTIMETRUENAT" />
														
		<script>
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			$('#emergencyFlag').val("All");
			//getProcessingRecord('AD');
			searchLabTestPatient("processingSearchBtn");
			//getCountOfTabs();
			<%-- setCustName("<%=session.getAttribute("userType")%>", "<%=session.getAttribute("userCustomerType")%>", "<%=session.getAttribute("userCustomerId")%>"); --%>
			//getAllCustomerType('custTypeForSearch');
			//getCollectedAtOptions();
			$("#collectedAt").select2();
			/* $("#bulksapmle").click(function(){
		        $("input[type=checkbox]").prop('checked', $(this).prop('checked'));
			}); */
			
			$("#bulksapmle").click(function () {
				var status = false;
				if($("#bulksapmle").is(':checked'))
					status = true;
				$('input[type=checkbox]').not(":disabled").prop('checked', status);
			});
		});
	</script>
		<input type="hidden" id=stateId value="0">
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
	<input type="hidden" value="<%=session.getAttribute("userFor")%>" id="userFor"/>
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>