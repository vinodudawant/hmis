<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Lab Result Dashboard</title>
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
<script type="text/javascript" src="js/OutsourceMaster.js"></script>
<script type="text/javascript" src="js/ehat_pathology_outsource.js"></script>
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
											<li><a href="diagnoPatBillDashboard.jsp">Diagnostics</a></li>
											<li><i class="fa fa-home"></i> <a href="">Diagnosis Assign Test Dashboard</a></li>

										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>

						<div class="row">
								<div class="col-md-12">
									<div class="col-sm-1">
										<label for="inlineFold" class="control-label">Search By</label>
									</div>
									<div class="col-md-2">
										<div class="input-group" id="documentByName">
										<label for="inlineFold" class="control-label">Patient Name:</label>
											<input class="form-control" id="searchName" style="width: 100%"
												type="text" placeholder="Patient Name" onkeyup="labPatientAutoSuggestion(this.id, 'autoSugg');labProcessAreaPatientAutoSuggestion(this.id, 'autoSugg');">
										</div>
									</div>
									<div class="col-md-2">
										<div class="input-group" id="documentByName">
										<label for="inlineFold" class="control-label">Patient ID: 
										</label>
											<input class="form-control" id="searchId"
												type="text" placeholder="Patient ID" onkeyup="">
										</div>
									</div>
									<div class="col-md-2">
												<span class="input-group-btn">
													<label for="inlineFold" class="control-label">From Date :
										</label>
												<input type="text"
														class="form-control input-SmallText"
														onclick="displayCalendar(document.getElementById('txtFdate'),'dd/mm/yyyy',this)"
														readonly="readonly" id="txtFdate" placeholder="Date">
											</span>
										</div>
									<div class="col-md-2">
												<span class="input-group-btn">
												<label for="inlineFold" class="control-label">To Date :
										</label>
												<input type="text"
														class="form-control input-SmallText"
														onclick="displayCalendar(document.getElementById('txtTdate'),'dd/mm/yyyy',this)"
														readonly="readonly" id="txtTdate"  placeholder="Date">
											</span>
										</div>
									<div class=" col-md-2 ">
										<input type="button" value="Search"
											class="btn btn-xs btn-primary"
											onclick="searchLabTestPatient('searchBtn'); searchLabTestProcessAreaPatient('searchBtn');" style="margin-top: 20px;" />
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
														<li id="C" class="active"><a id="CTab" data-toggle="tab"href="#currentRecordTab" onclick="getLabTestResultPatientDashboard()"><b>Current Record</b></a></li>
														
														<li id="P"><a id="PTab" data-toggle="tab" href="#processAreaRecordTab" onclick="getProcessAreaRecordTab()"><b>Process Area Record</b></a></li>												
														
														<li id="U"><a id="UTab" data-toggle="tab" href="#unauthorisedRecordTab" onclick="getLabTestUnauthorisedTab()"><b>Unauthenticate Record</b></a></li>
														
														<li id="A"><a id="ATab" data-toggle="tab" href="#authorisedRecordTab" onclick="getLabTestAuthorisedTab()"><b>Authenticate Record</b></a></li>
														
														<li id="H"><a id="HTab" data-toggle="tab" href="#holdRecordTab" onclick="getLabTestHoldTab()"><b>Hold Record</b></a></li>
														
														<li id="R"><a id="RTab" data-toggle="tab" href="#recallRecordTab" onclick="getLabTestRecallTab()"><b>Recall Record</b></a></li>
														
														<li id="PR"><a id="PRTab" data-toggle="tab" href="#previousRecordTab" onclick="getLabTestPreviousTab()" ><b>Previous Record</b></a></li>
														
														<li id="O"><a id="OTab" data-toggle="tab" href="#outsourceTestRecordTab" onclick="getLabTestOutsourceTab()"><b>Outsource Test Record</b></a></li>
													</ul>
												</div>
												<div class="panel-body">
													<div class="tab-content">
														
														<div id="currentRecordTab" class="tab-pane fade in active">
															<div class="panel-group" id="accordion">
																<div class="form-inline col-md-12">
																	<div class="checkbox checkbox-inline col-md-1">
																		<label><input type="radio" name="patientType" checked
																			value="onload" onclick="getLabTestResultPatientDashboard()">Total</label>
																	</div>
																	<div class="checkbox checkbox-inline col-md-1">
																		<label><input type="radio" name="patientType"
																			value="ipd" onclick="getLabTestResultPatientDashboard()">IPD </label>
																	</div>
																	<div class="checkbox checkbox-inline col-md-1">
																		<label><input type="radio" name="patientType"
																			value="opd" onclick="getLabTestResultPatientDashboard()">OPD </label>
																	</div>
																	<div class="checkbox checkbox-inline col-md-1">
																		<label><input type="radio" name="patientType"
																			value="diagnosis" onclick="getLabTestResultPatientDashboard()">Diagnostics </label>
																	</div>
																	<div class="checkbox checkbox-inline col-md-1 pull-right">
																		<input type="button" value="Outsource Test"
																			class="btn btn-xs btn-warning " data-toggle="tooltip" data-placement="bottom" title="Outsource Test"
																			 onclick="viewOutSourceTestforResult()"/>
																	</div>
																</div>
																
																<div class="divide-20"></div>
																<div class="panel">
																	<div class="panel-body" style="overflow: auto; height: 400px ; margin-top: 1%">
																		<table id="currentRecordTable" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table  table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">Patient ID</th>
																					<th class="col-md-1 center">Age</th>
																					<th class="col-md-1 center">Gender</th>
																					<th class="col-md-1 center">Order Date</th>
																					<th class="col-md-1 center">Collected From</th>
																					<th class="col-md-1 center">Test Name</th>																	
																					<th class="col-md-1 center">Phlebotomy</th>
																					<th class="col-md-1 center">Action</th>
																				</tr>
																			</thead>

																			<tbody id="currentRecordTableBody">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
															<!--    Starting pagination    -->
															<div style="margin-top: -2%">
																<div class="pull-right">
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="patientRecordPagination">
																	</ul>
																</div>
																<div class="row">
																	<div class="col-md-4 col-md-offset-8">
																		<div class="pull-right">
																			<ul
																				class="pagination pagination-blue margin-bottom-10"
																				id="totalNumberOfPages">
																			</ul>
																		</div>
																	</div>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>

														<div id="processAreaRecordTab"
															class="tab-pane fade in">
															<div class="panel-group" id="accordion">													
																<div class="form-inline col-md-12">
																	<div class="checkbox checkbox-inline col-md-1">
																		<label><input type="radio" name="processPatientType" checked
																			value="onload" onclick="hideShowSampleContainer(this.value),getProcessAreaRecordTab()">Total</label>
																	</div>
																	<div class="checkbox checkbox-inline col-md-1">
																		<label><input type="radio" name="processPatientType"
																			value="ipd" onclick="hideShowSampleContainer(this.value),getProcessAreaRecordTab()">IPD </label>
																	</div>
																	<div class="checkbox checkbox-inline col-md-1">
																		<label><input type="radio" name="processPatientType"
																			value="opd" onclick="hideShowSampleContainer(this.value),getProcessAreaRecordTab()">OPD </label>
																	</div>
																	<div class="checkbox checkbox-inline col-md-1">
																		<label><input type="radio" name="processPatientType"
																			value="diagnosis" onclick="hideShowSampleContainer(this.value),getListsampleContainer(),getProcessAreaRecordTab()">Diagnostics </label>
																	</div>
																	
																	<div class="form-group col-md-2" id="sampleContainerId" style="display: none">
																	<label for="inputState">Sample Container</label> <select
																		id="containerId" style="width: 100%" class="form-control">
																		<option value="0">Choose...</option>
																		<option>...</option>
																	</select>
																</div>
																
																<div class="checkbox checkbox-inline col-md-1 pull-right">
																		<input type="button" value="Outsource Test"
																			class="btn btn-xs btn-warning " data-toggle="tooltip" data-placement="bottom" title="Outsource Test"
																			 onclick="viewOutSourceTestforResult()"/>
																</div>
																	
																</div>
																<div class="divide-20"></div>
																<div class="panel">
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0"
																			border="0" class="datatable table  table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">Patient ID</th>
																					<th class="col-md-1 center">Sample Type</th>
																					<th class="col-md-1 center">Collection Date</th>
																					<th class="col-md-1 center">Collection Time</th>
																					<th class="col-md-1 center">Sample Quantity</th>
																					<th class="col-md-1 center">Container Name</th>
																					<th class="col-md-1 center">Collection Center</th>
																					<th class="col-md-1 center">Test View</th>
																					<th class="col-md-1 center">Acceptance Status</th>
																					<th class="col-md-1 center">Process Area</th>
                                                                                    <th class="col-md-1 center">Routine Value</th>
                                                                                      <th class="col-md-1 center">Action</th>
																				</tr>
																			</thead>

																			<tbody id="diagnosticProcessAreaId">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
														</div>

														<div id="recallRecordTab" class="tab-pane fade in ">
															<div class="panel-group" id="accordion">															
																<div class="panel"
																	style="margin-top: 20px">
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table  table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">Patient ID</th>
																					<th class="col-md-1 center">Sample Type</th>
																					<th class="col-md-1 center">Collection Date</th>
																					<th class="col-md-1 center">Collection Time</th>
																					<th class="col-md-1 center">Sample Quantity</th>
																					<th class="col-md-1 center">Container Name</th>
																					<th class="col-md-1 center">Collection Center</th>
																					<th class="col-md-1 center">Test View</th>
                                                                                    <th class="col-md-1 center">Routine Value</th>
																				</tr>
																			</thead>

																			<tbody id="diagnosticRecallBody">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
														</div>
														
														<div id="processAreaRecordTab"
															class="tab-pane fade in">
															<div class="panel-group" id="accordion">													
																<div class="panel"
																	style="margin-top: 20px">
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0"
																			border="0" class="datatable table  table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Sample Type</th>
																					<th class="col-md-1 center">Collection Date</th>
																					<th class="col-md-1 center">CollectionTime</th>
																					<th class="col-md-1 center">Qty</th>
																					<th class="col-md-1 center">Collection Center</th>
																					<th class="col-md-1 center">Test View</th>
                                                                                    <th class="col-md-1 center">Routine Value</th>
																				</tr>
																			</thead>

																			<tbody id="diagnosticProcessAreaId">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
														</div>
														
														<div id="holdRecordTab" class="tab-pane fade in ">
															<div class="panel-group" id="accordion">																
																<div class="panel"
																	style="margin-top: 20px">
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table  table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">Patient ID</th>
																					<th class="col-md-1 center">Sample Type</th>
																					<th class="col-md-1 center">Collection Date</th>
																					<th class="col-md-1 center">Collection Time</th>
																					<th class="col-md-1 center">Sample Quantity</th>
																					<th class="col-md-1 center">Container Name</th>
																					<th class="col-md-1 center">Collection Center</th>
																					<th class="col-md-1 center">Test View</th>
                                                                                    <th class="col-md-1 center">Routine Value</th>
																				</tr>
																			</thead>

																			<tbody id="diagnosticHoldBody">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
														</div>
														
												<div id="unauthorisedRecordTab"
															class="tab-pane fade in ">
															<div class="panel-group" id="accordion">
																<div class="form-inline col-md-12">
																
												<div class="col-md-1">
												<span onclick="getLabTestUnauthorisedTabFromIndicator('normal')" title="Normal" data-placement="left"
													data-toggle="tooltip" class="badge"
													style="background-color: #006400; cursor: pointer;"><i
													class="fa fa-check"></i>Normal <i id="normal">00</i>
												</span>
											</div>
											
											<div class="col-md-1">
												<span onclick="getLabTestUnauthorisedTabFromIndicator('abnormal')" title="Abnormal" data-placement="left"
													data-toggle="tooltip" class="badge"
													style="background-color: #FFCC80; cursor: pointer;color: green;"><i
													class="fa fa-times"></i>Abnormal <i id="abnormal">00</i> </span>
											</div>
																	
												<!-- <div class="col-md-1"
												onclick="">
												<span title="Low" data-placement="left"
													data-toggle="tooltip" class="badge"
													style="background-color: #FFCC80; cursor: pointer; color: green;"><i
													class="fa fa-user"></i>Low <i id="low">00</i>
												</span>
											</div> -->
											
											<!-- <div class="col-md-1"
												onclick="">
												
												<span title="High" data-placement="left"
													data-toggle="tooltip" class="badge"
													style="background-color: #FFCC80; cursor: pointer; color: green;"><i
													class="fa fa-user"></i>High <i id="high">00</i>
												</span>
									
											</div> -->
											<div class="col-md-1"
												 style="padding-left: 2%;">
												<span onclick="getLabTestUnauthorisedTabFromIndicator('criticalAbnormal')" title="Critically Abnormal" data-placement="left"
													data-toggle="tooltip" class="badge"
													style="background-color: #ff0000; cursor: pointer;"><i
													class="fa fa-times"></i>Critically Abnormal <i id="criticalAbnormal">00</i> </span>
											</div>
											
											
																	<div class="col-md-1 pull-right">
																		<input type="button" id="selectAllPatient" value="Select All"
																			class="btn btn-xs btn-danger" onclick="selectAllpatient()" />
																	</div>
																	<div
																		class="checkbox checkbox-inline col-md-1 pull-right">
																		<input type="button" value="Authenticate"
																			class="btn btn-xs btn-success " data-toggle="tooltip"
																			data-placement="bottom" title="Authenticate" onclick="collectionPatient()" />
																	</div>

																</div>
																<div class="divide-20"></div>
																<div class="panel">
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table  table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">Patient ID</th>
																					<th class="col-md-1 center">Sample Type</th>
																					<th class="col-md-1 center">Collection Date</th>
																					<th class="col-md-1 center">Collection Time</th>
																					<th class="col-md-1 center">Sample Quantity</th>
																					<th class="col-md-1 center">Container Name</th>
																					<th class="col-md-1 center">Collection Center</th>
																					<th class="col-md-1 center">Test View</th>
                                                                                    <th class="col-md-1 center">Routine Value</th>
																				</tr>
																			</thead>

																			<tbody id="diagnosticUnauthorisedBody">
																			</tbody>
																		</table>
																	</div>
																</div>
																
															</div>
														</div>
														

														<div id="authorisedRecordTab"
															class="tab-pane fade in ">
															<div class="panel-group" id="accordion">		
																<div class="form-inline col-md-12">
																	<div class="checkbox checkbox-inline col-md-1">
																		<label><input type="radio" name="patientType" checked
																			value="onload" onclick="getLabTestAuthorisedTab()">Total</label>
																	</div>
																	<div class="checkbox checkbox-inline col-md-1">
																		<label><input type="radio" name="patientType"
																			value="ipd" onclick="getLabTestAuthorisedTab()">IPD </label>
																	</div>
																	<div class="checkbox checkbox-inline col-md-1">
																		<label><input type="radio" name="patientType"
																			value="opd" onclick="getLabTestAuthorisedTab()">OPD </label>
																	</div>
																	<div class="checkbox checkbox-inline col-md-1">
																		<label><input type="radio" name="patientType"
																			value="diagnosis" onclick="getLabTestAuthorisedTab()">Diagnostics </label>
																	</div>
																	<div class="checkbox checkbox-inline col-md-1 pull-right">
																		<input type="button" value="Refresh"
																			class="btn btn-xs btn-success"
																			data-toggle="tooltip" data-placement="bottom" title="Refresh"
																			onclick="" />
																	</div>
																	
																</div>
																	<div class="divide-20"></div>												
																<div class="panel">
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table  table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">Patient ID</th>
																					<th class="col-md-1 center">Sample Type</th>
																					<th class="col-md-1 center">Collection Date</th>
																					<th class="col-md-1 center">Collection Time</th>
																					<th class="col-md-1 center">Sample Quantity</th>
																					<th class="col-md-1 center">Container Name</th>
																					<th class="col-md-1 center">Collection Center</th>
																					<th class="col-md-1 center">Test View</th>
                                                                                    <th class="col-md-1 center">Routine Value</th>
                                                                                    <th class="col-md-1 center"><button class="btn btn-xs btn-warning" data-toggle="tooltip" data-placement="bottom" title="Print" onclick="getPrintBySelect()"><i class="fa fa-print"></i></button></th>
																				</tr>
																			</thead>
																			<tbody id="diagnosticAuthorisedBody">
																			</tbody>
																		</table>
																	</div>
																</div>
																
															</div>
														</div>
														
														<div id="previousRecordTab"
															class="tab-pane fade in ">
															<div class="panel-group" id="accordion">																								
																<div class="panel">
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="previousRecordTable" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table  table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">Patient ID</th>
																					<th class="col-md-1 center">Sample Type</th>
																					<th class="col-md-1 center">Collection Date</th>
																					<th class="col-md-1 center">Collection Time</th>
																					<th class="col-md-1 center">Sample Quantity</th>
																					<th class="col-md-1 center">Container Name</th>
																					<th class="col-md-1 center">Collection Center</th>
																					<th class="col-md-1 center">Test View</th>
                                                                                    <th class="col-md-1 center">Routine Value</th>
                                                                                    <th class="col-md-1 center"><button class="btn btn-xs btn-warning" data-toggle="tooltip" data-placement="bottom" title="Print" onclick="getPrintBySelect()"><i class="fa fa-print"></i></button></th>
																				</tr>
																			</thead>
																			<tbody id="previousRecordTableBody">
																			</tbody>
																		</table>
																	</div>
																</div>
																
															</div>
														</div>
														
														<div id="outsourceTestRecordTab"
															class="tab-pane fade in">
															<div class="panel-group" id="accordion">
																<div class="form-inline col-md-12">
																	<div class="form-group col-md-1">
																		<label>Lab Name</label>
																	</div>
																	<div class="form-group col-md-3">
																		<select id="labId" style="width: 100%"
																			class="form-control">
																			<option value="0">Select Lab...</option>
																		</select>
																	</div>
																	<div class="form-group col-md-2">
																		<input type="button" value="Search"
																			class="btn btn-xs btn-success" data-toggle="tooltip"
																			data-placement="bottom" title="Search" onclick="" />
																	</div>
																</div>
																<div class="panel">
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table  table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Dispatch Date</th>
																					<th class="col-md-1 center">Dispatch Time</th>
																					<th class="col-md-2 center">OutSource Lab Name</th>
																					<th class="col-md-2 center">Patient Name</th>
																					<th class="col-md-1 center">Patient ID</th>
																					<th class="col-md-1 center">Age</th>
																					<th class="col-md-1 center">Gender</th>
																					<th class="col-md-1 center">Test view</th>
																					<th class="col-md-1 center">Routine Value</th>
																					<th class="col-md-1 center"><button class="btn btn-xs btn-warning" data-toggle="tooltip" data-placement="bottom" title="Print"><i class="fa fa-print"></i></button></th>
																				</tr>
																			</thead>
																			<tbody id="diagnosticOutSourceBody">
																			</tbody>
																		</table>
																	</div>
																</div>	
															</div>
														</div>

													<!-- Test Template Modal -->
														<div class="modal fade" id="outSourcelabpopup"
															tabindex="-1" role="dialog"
															aria-labelledby="labTestModal" aria-hidden="true">
															<div class="modal-dialog modal-dialog-centered"
																role="document" style="width: 50%;">
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
																								<label>OutSource To</label> <select
																									id="labCenterID" class="form-control"
																									style="width: 97%;">
																								</select> <input type="hidden" id="hiddenSubServiceId">
																							</div>
																							<div class="form-group col-md-4">
																								<label for="exampleInputEmail1">Dispatch
																									Date </label> <input class="form-control" type="text"
																									readonly="readonly"
																									onclick="displayCalendar(document.getElementById('dispatchDate'),'dd/mm/yyyy',this)"
																									id="dispatchDate" placeholder="Dispatch Date">
																							</div>
																							<div class="form-group col-md-4">
																								<label for="exampleInputEmail1">Dispatch
																									Time </label> <input class="form-control" type="text"
																									readonly="readonly" id="dispatchTime"
																									placeholder="Dispatch Time">
																							</div>
																							<div class="form-group col-md-4">
																								<label for="exampleInputEmail1">Carrier
																									Name </label> <input type="text" id="carrierId"
																									class="form-control" placeholder="Carrier Name">
																							</div>
																							<div class="form-group col-md-4">
																								<label for="exampleInputEmail1">Comment
																								</label> <input type="text" id="CommentId"
																									class="form-control" placeholder="Comment">
																							</div>
																							<div class="pull-right" style="margin-top: 2%">
																								<button type="button" class="btn btn-primary"
																									onclick="sendToOutSourceTest()">Save</button>
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
													</div>
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
			
			<!-- ----Added by kishor for Barcode Popup ---- -->
				<div class="modal fade" id="test_Pop_Up" tabindex="-1" role="dialog"
					aria-labelledby="labTestModal" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered" role="document"
						style="width: 40%;">
						<div class="modal-content">
							<div class="modal-header">
								<h4 class="center">
									<b>Test View </b>
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
													<div class="col-md-12">
														<div class="panel panel-default">
															<div class="panel-heading" id="divEhatContent"
																style="background: #FFE0C2">Test Name</div>
															<div class="panel-body"
																style="overflow: auto; height: 300px;">
																<table
																	class="datatable table table-bordered table-striped table-condensed cf">
																	<thead id="ehatTHead">
																		<tr>
																			<th class="col-md-10 center">Package /Profile
																				/Test Name</th>

																		</tr>
																	</thead>
																	<tbody id="testPopUptBody">

																	</tbody>

																</table>
															</div>
														</div>
													</div>

	                                   


												</div>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="pull-right" style="margin-right: 15%;">

											<button type="button" class="btn btn-danger"
												data-dismiss="modal">Close</button>
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div></section>
		<!--/PAGE -->

		<!-- JAVASCRIPTS -->
		
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

	<script>
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			
			
			/* added by ajay:16-april-2019 */
			 $('#dispatchTime').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 5
			}); 
			getOutsourceWise();/* added by ajay:16-april-2019 */
			getCountOfRoutineValue();
		/* 	getOutsourceWiselabname();/* added by ajay:4-june-2019 */
			//getLabTestResultPatientDashboard(); */
			
			
			//Added By KishoR
			var tabFlag=$("#tabFlag").val();
			openDynamicTab(tabFlag);
			
			if(tabFlag == "A"){
				$("#RTab").trigger("click");
			}else if(tabFlag == "R"){
				
				$("#RTab").trigger("click");
			}
		});
	</script>
	<input type="hidden" id=stateId value="0">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<input type='hidden' id="idtest" value='0' />
	<input type='hidden' id="testname" value='0' />
	<input type='hidden' id="patientId" value='0' />

    <input type='hidden' id="preTreatmentID" value='0' />
    <input type="hidden" id="treatmentId1" value="0" />
	<input type='hidden' id="testIdoutsource" value='0' />
	<input type="hidden" id="treatmentId" value="0" />
	<input type='hidden' id="treatmentidcheck" value='0' />
	
	<input type='hidden' id="cAbnormalList" value='0' />
	<input type="hidden" id="abnormalList" value="0" />
	<input type='hidden' id="normalList" value='0' />
		

        <!-- hidden field set -->
	<input type='hidden' id="testid" value='0' />
	<input type='hidden' id="labrequestid" value='0' />
	<input type='hidden' id="rate" value='0' />
	<input id="tabFlag" type="hidden" value=<%=request.getParameter("tabFlag")%> />
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>