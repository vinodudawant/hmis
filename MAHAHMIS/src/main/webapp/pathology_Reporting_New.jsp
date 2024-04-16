<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Reporting Record</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />
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

<script type="text/javascript" src="js/diagnostic_patient.js"></script>
<script type="text/javascript" src="js/pathology_phelbotomy.js"></script>
<script type="text/javascript" src="js/new_phlebotomy.js"></script>
<script type="text/javascript" src="js/pathology_information.js"></script>
<script type="text/javascript" src="js/pathology_reporting_new.js"></script>
<script type="text/javascript" src="js/pathology_template.js"></script>

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
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());

	java.text.SimpleDateFormat formatterr = new java.text.SimpleDateFormat("dd/MM/yyyy");
	String todays_datee = formatterr.format(currentDate.getTime());
	
	ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	String CovidReportProfileId = resourceBundleEha.getObject("CovidReportProfileId").toString();
	String SARSCOV2ANTIGEN = resourceBundleEha.getObject("SARSCOV2ANTIGEN").toString();
	String COVID19RNAAMPLIFICATION = resourceBundleEha.getObject("COVID19RNAAMPLIFICATION").toString();
	String REALTIMEHEPATITISCVIRUSHCV = resourceBundleEha.getObject("REALTIMEHEPATITISCVIRUSHCV").toString();
	String REALTIMETRUENAT = resourceBundleEha.getObject("REALTIMETRUENAT").toString();
	
	 ResourceBundle resourceBundle = ResourceBundle.getBundle("Ehat"); 
	  	String meeshaFlow = resourceBundle.getObject("meesha").toString();
	  	
	  	 ResourceBundle resourceBundleHospital = ResourceBundle.getBundle("hospitalaccess"); 
		 String hospitalname = resourceBundleHospital.getObject("hospitalname").toString();
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
											<li><i class="fa fa-home"></i> <a
												href="pathology_Reporting.jsp">Reporting</a></li>
											
												<div class="li pull-right" id="btndivId">
														<button class="btn btn-xs btn-info" id="backtocurrentBtn" value="AP" onclick="convertReportingToAutorization()">Back To Authorization</button>
														
													</div>	
												
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
												Type:</label> <select id="patSearchType" onchange="setPatientSearchType()"
												class="form-control input-SmallText">
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
												onkeyup="reportingPatientAutoSuggestion(this.id, 'reportingAutoSugg');" autocomplete="off">
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
											onclick="searchReportingPatient('reportingSearchBtn');"
											style="margin-top: 20px;" />
									</div>
									
									<div class=" col-md-1">
										<input type="button" value="Clear All"
											class="btn btn-xs btn-primary"
											onclick="clearSearch('reporting');"
											title="Clear All Fields & Refresh"
											style="margin-top: 20px;" />
									</div>
									
									<div class="col-md-1">
										<label style="margin-top: 20px;" for="inlineFold" class="control-label">Emergency : </label>
									</div>
									<div class="col-md-2">
										<div class="input-group" id="documentByName" style="margin-top: 20px;">
											<div id="radioBtn" class="btn-group">
												<input type="checkbox" data-on="On" data-off="Off" data-toggle="toggle" data-onstyle="danger" id="toggle-event3"
													data-style="ios" data-size="mini" data-width="60">
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
												<input type="checkbox" data-on="On" data-off="Off" data-toggle="toggle" data-onstyle="danger" id="toggle-event3"
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
											<select style="width: 150px" id="collectedAt" onchange="getReportingSamplesByCollectedAt('reporting');">
											</select>
										</div>
									</div>									
									<!-- <div class=" col-md-1">
										<input type="button" value="Clear All"
											class="btn btn-xs btn-primary"
											onclick="clearSearch('reporting');"
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
											<div class="col-md-12" style="margin-left: 62%">
												<label class="radio-inline" style="margin-top: 10px;"> <input id="withheader"
													type="radio" value="1" name="btype">
													With Header
												</label>
												 <label class="radio-inline" style="margin-top: 10px;"> <input id="withoutheader"
													type="radio" checked="checked" value="2" name="btype"> Without Header
												</label>
												
													 <label class="radio-inline" style="margin-top: 10px;"> <input id="withgraph"
													type="radio" value="2" name="btype"> Five Reocord
												</label>
												
												 <label class="radio-inline" style="margin-top: 10px;"> <input id="singlegraphRecord"
													type="radio" value="2" name="btype"> Single Record
												</label>
												
												
											</div>
											<div class="panel-heading">
												<ul class="nav nav-tabs" id="tabId">
													<li  class="active"  id="allTabLi" >
														<a id="all"  data-toggle="tab" href="#allTab"  onclick="getReportingSamples('reportingSearchBtn')"><i class="fa fa-bookmark"></i> 
															<span class="hidden-inline-mobile">All Records</span>
												
															<!-- ========================================================================== -->
															<!-- =======================code disabled by ROHIT AMBAWADE==================== -->
															<span class="badge badge-blue font-11" id="allTotal" style="display: none">0</span>
															<!-- ========================================================================== -->
												
														</a>
													</li>

													<li id="normalTabLi" >
														<a id="normal"  data-toggle="tab" href="#normalTab" onclick="getReportingSamples('reportingSearchBtn')"><i class="fa fa-bookmark"></i> 
															<span class="hidden-inline-mobile">Normal Records</span>
												
															<!-- ========================================================================== -->
															<!-- =======================code disabled by ROHIT AMBAWADE==================== -->
															<span class="badge badge-blue font-11" id="normalTotal" style="display: none"> 0</span>
															<!-- ========================================================================== -->
														</a>
													</li>
											
													<li id="abnormalTabLi" >
														<a id="abnormal"  data-toggle="tab" href="#abnormalTab" onclick="getReportingSamples('reportingSearchBtn')"><i class="fa fa-bookmark"></i>
															<span class="hidden-inline-mobile">Abnormal Records</span>
												
															<!-- ========================================================================== -->
															<!-- =======================code disabled by ROHIT AMBAWADE==================== -->
															<span class="badge badge-blue font-11" id="abnormalTotal" style="display: none"> 0</span>
															<!-- ========================================================================== -->
														</a>
													</li>
											
													<li id="cAbnormalTabLi">
														<a id="cAbnormal"  data-toggle="tab" href="#cAbnormalTab" onclick="getReportingSamples('reportingSearchBtn')"><i class="fa fa-bookmark"></i> 
															<span class="hidden-inline-mobile">Critical Abnormal Records</span>
												
															<!-- ========================================================================== -->
															<!-- =======================code disabled by ROHIT AMBAWADE==================== -->
															<span class="badge badge-blue font-11" id="cAbnormalTotal" style="display: none"> 0</span>
															<!-- ========================================================================== -->													
														</a>
													</li>
													
													<li id="templateTestTabLi">
														<a id="templateTestId"  data-toggle="tab" href="#templateTestTab" onclick="getReportingSamples('reportingSearchBtn')"><i class="fa fa-bookmark"></i> 
															<span class="hidden-inline-mobile">Template Test</span>
												
															<!-- ========================================================================== -->
															<!-- =======================code disabled by ROHIT AMBAWADE==================== -->
															<span class="badge badge-blue font-11" id="templateTestTotal" style="display: none"> 0</span>	
															<!-- ========================================================================== -->												
														</a>
													</li>
												
													<li id="patientWiseTabLi" >
														<a id="patientWise"  data-toggle="tab" href="#patientWiseTab"  onclick="getReportingSamples('reportingSearchBtn')"><i class="fa fa-bookmark"></i> 
															<span class="hidden-inline-mobile">Patient Wise Records</span>
												
															<!-- ========================================================================== -->
															<!-- =======================code disabled by ROHIT AMBAWADE==================== -->
															<span class="badge badge-blue font-11" id="patientWiseTotal" style="display: none">0</span>
															<!-- ========================================================================== -->
														</a>
													</li>
													
													<li id="patientPrintTabLi" >
														<a id="patientPrinttWise"  data-toggle="tab" href="#patientprintTab"  onclick="getReportingSamples('reportingSearchBtn')"><i class="fa fa-bookmark"></i> 
															<span class="hidden-inline-mobile">Patient Records</span>
												
															<!-- ========================================================================== -->
															<!-- =======================code disabled by ROHIT AMBAWADE==================== -->
															<span class="badge badge-blue font-11" id="patientWiseTotal11" style="display: none">0</span>
															<!-- ========================================================================== -->
														</a>
													</li>
													
												</ul>
												</div>
												<div class="panel-body">
													<div class="tab-content">
														<div id="allTab" class="tab-pane fade in active">
															<div class="panel-group" id="accordion">
															<!-- removed disabled from BULK EMAIL BUTTON by rohit on 18-08-2021 -->
																<div class="form-inline col-md-12">
																	<div
																		class="checkbox checkbox-inline col-md-1 pull-right">
																		<input type="button" value="Bulk Email"
																			id="allBulkEmail" class="btn btn-xs btn-warning "
																			data-toggle="tooltip" data-placement="bottom"
																			title="Bulk Email"
																			onclick="reportingEmail('allRecord')" />
																	</div>
																</div>
																<!-- removed disabled from BULK EMAIL BUTTON by rohit on 18-08-2021 -->
																<div class="panel">
																	<div class="panel-body"
																		style="overflow: auto; height: 400px; margin-top: -1%">
																		<table id="allRecordTable"
																			class="datatable table  table-bordered">
																			<thead id="allRecordTHead">
																				<tr style="background-color: lightblue">
																					<th class="col-md-1 center">Sr.No.</th>
																					<th class="col-md-1 center">Reg.&nbsp;Date</th>
																					<th class="col-md-1 center">Patient&nbsp;Name</th>
																					<th class="col-md-1 center">UHID</th>
																					<!-- <th class="col-md-1 center">Center Name</th> -->
																					<th class="col-md-1 center">Collected&nbsp;At</th>
																					<!--  <th class="col-md-1 center">Customer Name</th>  -->
																					<th class="col-md-1 center">Barcode</th>
																					<th class="col-md-1 center">Collection&nbsp;Date&nbsp;Time</th>
																					<th class="col-md-1 center">Auth.&nbsp;Date</th>
																					<th class="col-md-1 center">Test&nbsp;Name</th>
																					<th class="col-md-1 center">Status</th>
																					<th class="col-md-1 center">Sample</th>
																					<!-- 																					<th class="col-md-1 center">Time&nbsp;Sensitive(hrs.)</th> -->
																					<th class="col-md-1 center" colspan="2"></th>
																					<th class="col-md-1 center" colspan="2">Action</th>
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
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<!-- 																					<th class="col-md-1 center"></th> -->
																					<th class="col-md-1 center"></th>
																					<!-- removed disabled from bulk email check box from Rohit on 18-08-2021 -->
																					<th class="col-md-1 center"><input
																						class="selectall"  id="allBulkSapmle"
																						name="allBulkSapmle" type="checkbox"></th>
																					<th class="col-md-1 center"></th>
																					<!-- removed disabled from bulk email check box from Rohit on 18-08-2021 -->
																				</tr>
																			</thead>

																			<tbody id="reportingAllTableBody">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
															<!--    Starting pagination    -->
															<div style="margin-top: -1%">
																<div class="" align="right">
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="allJumpToPage">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="allPagination">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="allNumberOfPages">
																	</ul>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>

														<div id="normalTab" class="tab-pane fade in">
															<div class="panel-group" id="accordion">
																<div class="form-inline col-md-12">
																	<label class="radio-inline"> <input
																		checked="checked" id="normalNotSent" type="radio"
																		value="2" name="normalType"
																		onclick="getReportingEmailSentNotSentData('normal');">
																		Email Not Sent
																	</label> <label class="radio-inline"> <input
																		id="normalSent" type="radio" value="1"
																		name="normalType"
																		onclick="getReportingEmailSentNotSentData('normal');">
																		Email Sent
																	</label>
																	<div
																		class="checkbox checkbox-inline col-md-1 pull-right">
																		<input type="button" value="Bulk Email"
																			id="normalBulkEmail" class="btn btn-xs btn-warning "
																			data-toggle="tooltip" data-placement="bottom"
																			title="Bulk Email"
																			onclick="reportingEmail('normalRecord')" />
																	</div>
																</div>
																<div class="panel">
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="normalRecordTable" cellpadding="0"
																			cellspacing="0" border="0"
																			class="datatable table  table-bordered">
																			<thead id="normalRecordTHead">
																				<tr style="background-color: lightblue">
																					<th class="col-md-1 center">Sr.No.</th>
																					<th class="col-md-1 center">Reg.&nbsp;Date</th>
																					<th class="col-md-1 center">Patient&nbsp;Name</th>
																					<th class="col-md-1 center">UHID</th>
																					<!-- <th class="col-md-1 center">Center Name</th> -->
																					<th class="col-md-1 center">Collected&nbsp;At</th>
																					 <!-- <th class="col-md-1 center">Customer Name</th> -->
																					<th class="col-md-1 center">Barcode</th>
																					<th class="col-md-1 center">Collection&nbsp;Date&nbsp;Time</th>
																					<th class="col-md-1 center">Auth.&nbsp;Date</th>
																					<th class="col-md-1 center">Test&nbsp;Name</th>
																					<th class="col-md-1 center">Status</th>
																					<th class="col-md-1 center">Sample</th>
																					<!-- 																					<th class="col-md-1 center">Time&nbsp;Sensitive(hrs.)</th> -->
																					<th class="col-md-1 center" colspan="2"></th>
																					<th class="col-md-1 center" colspan="2">Action</th>
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
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<!-- 																					<th class="col-md-1 center"></th> -->
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"><input
																						class="selectall" id="normalBulkSapmle"
																						name="normalBulkSapmle" type="checkbox"></th>
																					<th class="col-md-1 center"></th>
																				</tr>
																			</thead>
																			<tbody id="reportingNormalTableBody">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
															<!--    Starting pagination    -->
															<div style="margin-top: -1%">
																<div class="pull-right">
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="normalJumpToPage">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="normalPagination">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="normalNumberOfPages">
																	</ul>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>

														<div id="abnormalTab" class="tab-pane fade in ">
															<div class="panel-group" id="accordion">
																<div class="panel">
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<div class="col-md-12" style="margin-bottom: 1%;">
																			<label class="radio-inline"> <input
																				checked="checked" id="abnormalNotSent" type="radio"
																				value="2" name="abnormalType"
																				onclick="getReportingEmailSentNotSentData('abnormal');">
																				Email Not Sent
																			</label> <label class="radio-inline"> <input
																				id="abnormalSent" type="radio" value="1"
																				name="abnormalType"
																				onclick="getReportingEmailSentNotSentData('abnormal');">
																				Email Sent
																			</label>
																			<div
																				class="checkbox checkbox-inline col-md-1 pull-right">
																				<input type="button" value="Bulk Email"
																					id="abNormalBulkEmail"
																					class="btn btn-xs btn-warning "
																					data-toggle="tooltip" data-placement="bottom"
																					title="Bulk Email"
																					onclick="reportingEmail('abNormalRecord')" />
																			</div>
																		</div>
																		<div class="col-md-12">
																			<table id="abNormalRecordTable"
																				class="datatable table  table-bordered">
																				<thead id="abNormalRecordTHead">
																					<tr style="background-color: lightblue">
																						<th class="col-md-1 center">Sr.No.</th>
																						<th class="col-md-1 center">Reg.&nbsp;Date</th>
																						<th class="col-md-1 center">Patient&nbsp;Name</th>
																						<th class="col-md-1 center">UHID</th>
																						<!-- <th class="col-md-1 center">Center Name</th> -->
																						<th class="col-md-1 center">Collected&nbsp;At</th>
																						<!-- <th class="col-md-1 center">Customer Name</th> --> 
																						<th class="col-md-1 center">Barcode</th>
																						<th class="col-md-1 center">Collection&nbsp;Date&nbsp;Time</th>
																						<th class="col-md-1 center">Auth.&nbsp;Date</th>
																						<th class="col-md-1 center">Test&nbsp;Name</th>
																						<th class="col-md-1 center">Status</th>
																						<th class="col-md-1 center">Sample</th>
																						<!-- 																					<th class="col-md-1 center">Time&nbsp;Sensitive(hrs.)</th> -->
																						<th class="col-md-1 center" colspan="2"></th>
																						<th class="col-md-1 center" colspan="2">Action</th>
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
																						<th class="col-md-1 center"></th>
																						<th class="col-md-1 center"></th>
																						<!-- 																					<th class="col-md-1 center"></th> -->
																						<th class="col-md-1 center"></th>
																						<th class="col-md-1 center"><input
																							class="selectall" id="abNormalBulkSapmle"
																							name="abNormalBulkSapmle" type="checkbox"></th>
																						<th class="col-md-1 center"></th>
																					</tr>
																				</thead>
																				<tbody id="reportingAbnormalTableBody">
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
																		id="abnormalJumpToPage">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="abnormalPagination">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="abnormalNumberOfPages">
																	</ul>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>

														<div id="cAbnormalTab" class="tab-pane fade in ">
															<div class="panel-group" id="accordion">
																<div class="panel">
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<div class="col-md-12" style="margin-bottom: 1%;">
																			<label class="radio-inline"> <input
																				id="cAbnormalNotSent" type="radio" value="2"
																				name="cAbnormalType" checked="checked"
																				onclick="getReportingEmailSentNotSentData('cAbnormal');">
																				Email Not Sent
																			</label> <label class="radio-inline"> <input
																				id="cAbnormalSent" type="radio" value="1"
																				name="cAbnormalType"
																				onclick="getReportingEmailSentNotSentData('cAbnormal');">
																				Email Sent
																			</label>
																			<div
																				class="checkbox checkbox-inline col-md-1 pull-right">
																				<input type="button" value="Bulk Email"
																					id="cAbnormalBulkEmail"
																					class="btn btn-xs btn-warning "
																					data-toggle="tooltip" data-placement="bottom"
																					title="Bulk Email"
																					onclick="reportingEmail('cAbnormalRecord')" />
																			</div>
																		</div>
																		<div class="col-md-12">
																			<table id="cAbNormalRecordTable"
																				class="datatable table  table-bordered">
																				<thead id="cAbNormalRecordTHead">
																					<tr style="background-color: lightblue">
																						<th class="col-md-1 center">Sr.No.</th>
																						<th class="col-md-1 center">Reg.&nbsp;Date</th>
																						<th class="col-md-1 center">Patient&nbsp;Name</th>
																						<th class="col-md-1 center">UHID</th>
																						<!-- <th class="col-md-1 center">Center Name</th> -->
																						<th class="col-md-1 center">Collected&nbsp;At</th>
																						<!-- <th class="col-md-1 center">Customer Name</th> --> 
																						<th class="col-md-1 center">Barcode</th>
																						<th class="col-md-1 center">Collection&nbsp;Date&nbsp;Time</th>
																						<th class="col-md-1 center">Auth.&nbsp;Date</th>
																						<th class="col-md-1 center">Test&nbsp;Name</th>
																						<th class="col-md-1 center">Status</th>
																						<th class="col-md-1 center">Sample</th>
																						<!-- 																					<th class="col-md-1 center">Time&nbsp;Sensitive(hrs.)</th> -->
																						<th class="col-md-1 center" colspan="2"></th>
																						<th class="col-md-1 center" colspan="2">Action</th>
																					</tr>
																					<tr style="background-color: lightcyan">
																						<th class="col-md-1 center"></th>
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
																						<th class="col-md-1 center"></th>
																						<!-- 																					<th class="col-md-1 center"></th> -->
																						<th class="col-md-1 center"></th>
																						<th class="col-md-1 center"><input
																							class="selectall" id="cAbnormalBulkSapmle"
																							name="cAbnormalBulkSapmle" type="checkbox"></th>
																						<th class="col-md-1 center"></th>
																					</tr>
																				</thead>
																				<tbody id="reportingCAbnormalTableBody">
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
																		id="cAbnormalJumpToPage">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="cAbnormalPagination">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="cAbnormalNumberOfPages">
																	</ul>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>
														
														<div id="templateTestTab" class="tab-pane fade in">
															<div class="panel-group" id="accordion">
																<div class="panel">
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<div class="col-md-12" style="margin-bottom: 1%;">
																			<label class="radio-inline"> <input
																				id="templateWiseNotSent" type="radio" value="2"
																				name="templateWiseType" checked="checked"
																				onclick="getReportingEmailSentNotSentData('templateWise');">
																				Email Not Sent
																			</label> <label class="radio-inline"> <input
																				id="templateWiseSent" type="radio" value="1"
																				name="templateWiseType"
																				onclick="getReportingEmailSentNotSentData('templateWise');">
																				Email Sent
																			</label>
																			<div
																				class="checkbox checkbox-inline col-md-1 pull-right">
																				<input type="button" value="Bulk Email"
																					id="templateWiseBulkEmail"
																					class="btn btn-xs btn-warning "
																					data-toggle="tooltip" data-placement="bottom"
																					title="Bulk Email"
																					onclick="reportingEmail('templateWiseRecord')" />
																			</div>
																		</div>
																		<div class="col-md-12">
																			<table id="templateWiseRecordTable"
																				class="datatable table  table-bordered">
																				<thead id="templateWiseRecordTHead">
																					<tr style="background-color: lightblue">
																						<th class="col-md-1 center">Sr.No.</th>
																						<th class="col-md-1 center">Reg.&nbsp;Date</th>
																						<th class="col-md-1 center">Patient&nbsp;Name</th>
																						<th class="col-md-1 center">UHID</th>
																						<!-- <th class="col-md-1 center">Center Name</th> -->
																						<th class="col-md-1 center">Collected&nbsp;At</th>
																						<!-- <th class="col-md-1 center">Customer Name</th> --> 
																						<th class="col-md-1 center">Barcode</th>
																						<th class="col-md-1 center">Collection&nbsp;Date&nbsp;Time</th>
																						<th class="col-md-1 center">Auth.&nbsp;Date</th>
																						<th class="col-md-1 center">Test&nbsp;Name</th>
																						<th class="col-md-1 center">Status</th>
																						<th class="col-md-1 center">Sample</th>
																						<!-- 																					<th class="col-md-1 center">Time&nbsp;Sensitive(hrs.)</th> -->
																						<th class="col-md-1 center" colspan="2"></th>
																						<th class="col-md-1 center" colspan="2">Action</th>
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
																						<th class="col-md-1 center"></th>
																						<th class="col-md-1 center"></th>
																						<th class="col-md-1 center"></th>
																						<!-- 																					<th class="col-md-1 center"></th> -->
																						<th class="col-md-1 center"></th>
																						<th class="col-md-1 center"><input
																							class="selectall" id="patientWiseBulkSapmle"
																							name="patientWiseSapmle" type="checkbox"></th>
																						<th class="col-md-1 center"></th>
																					</tr>
																				</thead>
																				<tbody id="reportingTemplateWiseTableBody">
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
																		id="templateWiseJumpToPage">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="templateWisePagination">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="templateWiseNumberOfPages">
																	</ul>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>
														
														<div id="patientWiseTab" class="tab-pane fade in">
															<div class="panel-group" id="accordion">
																<div class="panel">
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<div class="col-md-12" style="margin-bottom: 1%;">
																			<label class="radio-inline"> <input
																				id="patientWiseNotSent" type="radio" value="2"
																				name="patientWiseType" checked="checked"
																				onclick="getReportingEmailSentNotSentData('patientWise');">
																				Email Not Sent
																			</label> <label class="radio-inline"> <input
																				id="patientWiseSent" type="radio" value="1"
																				name="patientWiseType"
																				onclick="getReportingEmailSentNotSentData('patientWise');">
																				Email Sent
																			</label>
																			<div
																				class="checkbox checkbox-inline col-md-1 pull-right">
																				<input type="button" value="Bulk Email"
																					id="patientWiseBulkEmail"
																					class="btn btn-xs btn-warning "
																					data-toggle="tooltip" data-placement="bottom"
																					title="Bulk Email"
																					onclick="reportingEmail('patientWiseRecord')" />
																			</div>
																		</div>
																		<div class="col-md-12">
																			<table id="patientWiseRecordTable"
																				class="datatable table  table-bordered">
																				<thead id="patientWiseRecordTHead">
																					<tr style="background-color: lightblue">
																						<th class="col-md-1 center">Sr.No.</th>
																						<th class="col-md-1 center">Reg.&nbsp;Date</th>
																						<th class="col-md-1 center">Patient&nbsp;Name</th>
																						<th class="col-md-1 center">UHID</th>
																						<!-- <th class="col-md-1 center">Center Name</th> -->
																						<th class="col-md-1 center">Collected&nbsp;At</th>
																						<!-- <th class="col-md-1 center">Customer Name</th> --> 
																						<th class="col-md-1 center">Barcode</th>
																						<th class="col-md-1 center">Collection&nbsp;Date&nbsp;Time</th>
																						<th class="col-md-1 center">Auth.&nbsp;Date</th>
																						<th class="col-md-1 center">Test&nbsp;Name</th>
																						<th class="col-md-1 center">Status</th>
																						<th class="col-md-1 center">Sample</th>
																						<!-- 																					<th class="col-md-1 center">Time&nbsp;Sensitive(hrs.)</th> -->
																						<th class="col-md-1 center" colspan="2"></th>
																						<th class="col-md-1 center" colspan="2">Action</th>
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
																						<th class="col-md-1 center"></th>
																						<th class="col-md-1 center"></th>
																						<th class="col-md-1 center"></th>
																						<!-- 																					<th class="col-md-1 center"></th> -->
																						<th class="col-md-1 center"></th>
																						<th class="col-md-1 center"><input
																							class="selectall" id="patientWiseBulkSapmle"
																							name="patientWiseSapmle" type="checkbox"></th>
																						<th class="col-md-1 center"></th>
																					</tr>
																				</thead>
																				<tbody id="reportingPatientWiseTableBody">
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
																		id="patientWiseJumpToPage">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="patientWisePagination">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="patientWiseNumberOfPages">
																	</ul>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>
														
														<!------------------ Start Patient Record Tab----------------->
														<div id="patientprintTab" class="tab-pane fade in">
															<div class="panel-group" id="accordion">
															<!-- removed disabled from BULK EMAIL BUTTON by rohit on 18-08-2021 -->
																<div class="form-inline col-md-12">
																	<!-- <div
																		class="checkbox checkbox-inline col-md-1 pull-right">
																		<input type="button" value="Bulk Email"
																			id="allPatientPrint" class="btn btn-xs btn-warning "
																			data-toggle="tooltip" data-placement="bottom"
																			title="Bulk Email"
																			onclick="reportingEmail('allRecord')" ><i class="fa fa-print"></i></input>
																	</div> -->
																	<div class="checkbox checkbox-inline col-md-1 pull-right">
																		<button onclick="printPartientReport();"
																			title="Print" data-placement="left"
																			data-toggle="tooltip" class="btn btn-xs btn-warning"
																			data-original-title="Print Prescription">
																			<i class="fa fa-print"></i>
																		</button>
																	</div>

																</div>
																<!-- removed disabled from BULK EMAIL BUTTON by rohit on 18-08-2021 -->
																<div class="panel">
																	<div class="panel-body"
																		style="overflow: auto; height: 400px; margin-top: -1%">
																		<table id="allRecordTable"
																			class="datatable table  table-bordered">
																			<thead id="allRecordTHead">
																				<tr style="background-color: lightblue">
																					<th class="col-md-1 center">Sr.No.</th>
																					<th class="col-md-1 center">Reg.&nbsp;Date</th>
																					<th class="col-md-1 center">Patient&nbsp;Name</th>
																					<th class="col-md-1 center">UHID</th>
																					<!-- <th class="col-md-1 center">Center Name</th> -->
																					<th class="col-md-1 center">Collected&nbsp;At</th>
																					<!--  <th class="col-md-1 center">Customer Name</th>  -->
																					<th class="col-md-1 center">Barcode</th>
																					<th class="col-md-1 center">Collection&nbsp;Date&nbsp;Time</th>
																					<th class="col-md-1 center">Auth.&nbsp;Date</th>
																					<th class="col-md-1 center">Test&nbsp;Name</th>
																					<th class="col-md-1 center">Status</th>
																					<th class="col-md-1 center">Sample</th>
																					<!-- 																					<th class="col-md-1 center">Time&nbsp;Sensitive(hrs.)</th> -->
																					<th class="col-md-1 center" colspan="2"></th>
																					<th class="col-md-1 center" colspan="2">Action</th>
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
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<!-- 																					<th class="col-md-1 center"></th> -->
																					<th class="col-md-1 center"></th>
																					<!-- removed disabled from bulk email check box from Rohit on 18-08-2021 -->
																					<th class="col-md-1 center"><input
																						class="selectall"  id="allBulkSapmle"
																						name="allBulkSapmle" type="checkbox"></th>
																					<th class="col-md-1 center"></th>
																					<!-- removed disabled from bulk email check box from Rohit on 18-08-2021 -->
																				</tr>
																			</thead>

																			<tbody id="reportingPatientPrintBody">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
															<!--    Starting pagination    -->
															<div style="margin-top: -1%">
																<div class="" align="right">
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="allJumpToPagePatientPrint">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="allPaginationPatientPrint">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="allNumberOfPagesPatientPrint">
																	</ul>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>
														<!-------------------------- End Patient Record Tab---------------->

														<div class="modal fade" id="emailreportingPopUp"
															tabindex="-1">
															<div class="modal-dialog modal-dialog-centered"
																style="width: 50%;">
																<div class="modal-content">
																	<div class="modal-header">
																		<h3 class="left">
																			<b>Send Email Test</b>
																		</h3>
																		<h5 class="left">
																			<b>Patient Name:</b> <label class="control-label"
																				id="patientNameemail"></label>
																		</h5>
																	</div>
																	<div class="modal-body">
																		<div class="row">
																			<div class="col-md-12">
																				<div class="container">
																					<div class="panel panel-primary">
																						<div class="panel-heading" id="divEhatContent"></div>
																						<div class="panel-body">
																							<input id="treatmentID" type="hidden" value="0">
																							<input id="masterIdd" type="hidden" value="0">
																							<input id="reportingPid" type="hidden" value="0">
																							<input id="patientgander1" type="hidden"
																								value="0">
																							<div class="form-group col-md-12">
																								<label for="exampleInputEmail1" style="color: red; font-size: 11px;">Note : To send mail to multiple recipients put ',' in between mail id's.</label>
																							</div>
																							<div class="form-group col-md-6">
																								<label for="exampleInputEmail1">TO: </label> <input
																									type="text" id="emailTo" class="form-control"
																									placeholder=""
																									style="text-transform: lowercase;">
																							</div>
																							<div class="form-group col-md-6">
																								<label for="exampleInputEmail1">CC: </label> <input
																									type="text" id="emailCC" class="form-control"
																									placeholder="">
																							</div>
																							-

																							<!-- <div class="form-group col-md-4">
																		<label for="exampleInputEmail1">Message </label> 
																		<textarea  id="massageId" class="form-control"   rows="3" style="width: 350px; height: 69px;"
																			placeholder="Message"></textarea>
																	</div> -->

																							<div class="pull-right" style="margin-top: 8%">
																								<button type="button" class="btn btn-primary"
																									onclick="sendReportVaiMail();">Send
																									Email</button>
																								<button type="button" class="btn btn-danger"
																									onclick="emailSendingHidePopupPatinetTest()">Close</button>
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

		<input type="hidden" value="<%=session.getAttribute("userFor")%>"
			id="userFor" />
		<input type="hidden" value="N" id="normalEmailStatus"/>
		<input type="hidden" value="N" id="abnormalEmailStatus"/>
		<input type="hidden" value="N" id="cAbnormalEmailStatus"/>
		<input type="hidden" value="N" id="patientWiseEmailStatus"/>
		<input type="hidden" value="N" id="templateTestEmailStatus"/>
		<input type="hidden" value="N" id="patientprintTestEmailStatus"/>

		<input type="hidden" value="<%=CovidReportProfileId%>"  id="CovidReportProfileId" />
		<input type="hidden" value="<%=SARSCOV2ANTIGEN%>"  id="SARSCOV2ANTIGEN" />
		<input type="hidden" value="<%=COVID19RNAAMPLIFICATION%>"  id="COVID19RNAAMPLIFICATION" />
		<input type="hidden" value="<%=REALTIMEHEPATITISCVIRUSHCV%>"  id="REALTIMEHEPATITISCVIRUSHCV" />
		<input type="hidden" value="<%=REALTIMETRUENAT%>"  id="REALTIMETRUENAT" />
		<input type="hidden" value="<%=meeshaFlow%>"  id="meeshaFlow" />
		<input type="hidden" value="<%=meeshaFlow%>"  id="meeshaFlow" />
		<input type="hidden" value="<%=hospitalname%>"  id="hospitalname" />
		<input type="hidden" value="0" id="mobileAuth" />
		<input type="hidden" value="allTabLi" id="activeTabId"/>
		<input type='hidden' id="printTreatmentId" value="0" />
		<input type='hidden' id="printCheckBoxCount" value="0" />
		<input type='hidden' id="printPatientName" value="" />
		<input type='hidden' id="printPatientGeneder" value="" />
		<script>
			jQuery(document).ready(function() {
				App.setPage("wizards_validations"); //Set current page 
				App.init(); //Initialise plugins and elements  
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});
				$('#emergencyFlag').val("All");
				searchReportingPatient("reportingSearchBtn");
				//getAllCustomerType('custTypeForSearch');
				
				$("#collectedAt").select2();
				$("#custTypeForSearch").select2();
				$("#custNameForSearch").select2();
				//getCollectedAtOptions();
				//getRecordCountForReportingTabIndicator();
				$('#patSearchType').val(3);
				
				$("#allBulkSapmle").click(function () {
					var status = false;
					if($("#allBulkSapmle").is(':checked'))
						status = true;
					$('input[name="allTest"]').not(":disabled").prop('checked', status);
				});
				
				$("#normalBulkSapmle").click(function () {
					var status = false;
					if($("#normalBulkSapmle").is(':checked'))
						status = true;
					$('input[name="normalTest"]').not(":disabled").prop('checked', status);
				});
				
				$("#abNormalBulkSapmle").click(function () {
					var status = false;
					if($("#abNormalBulkSapmle").is(':checked'))
						status = true;
					$('input[name="abnormalTest"]').not(":disabled").prop('checked', status);
				});
				
				$("#cAbnormalBulkSapmle").click(function () {
					var status = false;
					if($("#cAbnormalBulkSapmle").is(':checked'))
						status = true;
					$('input[name="cAbnormalTest"]').not(":disabled").prop('checked', status);
				});
			});
			hideTabOnReportForMeesha();
		</script>
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>