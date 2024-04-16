<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Pathology Re-Collection Request</title>
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
			<%@include file="menu_HelpDesk.jsp"%>
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
											<li><a href="Dashboard.jsp">Help Desk</a></li>
											<li><i class="fa fa-home"></i> <a
												href="pathology_recollection_request.jsp">Pathology
													Re-Collection Request</a></li>

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
												Type:</label> 
												<select id="patSearchType"
												class="form-control input-SmallText">
												<option value="0">-Select-</option>
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
												type="text" placeholder="Search Text"
												onkeyup="phelbotomyPatientAutoSuggestion(this.id, 'BTOBRecollection');">
										</div>
									</div>

									<div class="col-md-2">
										<div class="input-group" id="customerTypes">
											<label for="inlineFold" class="control-label">Customer
												Type:</label>
												<!-- <select id="custTypeForSearch"
												onchange="fetchCustomerNames('accessionTestSearchBtn')"
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
											<label for="inlineFold" class="control-label">Customer
												Name:</label>
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
											onclick="searchBtoCRecollectionPatient('BTOBRecollection');"
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
												data-title="Y" onclick="toggleSwitch(this.id,'B2B')">Yes</a>
											<a class="btn btn-primary btn-xs active"
												data-toggle="emergencyFlag" id="labAvailableSwitchBoth"
												data-title="All" onclick="toggleSwitch(this.id,'B2B')">All</a>
											<a class="btn btn-success btn-xs notActive"
												data-toggle="emergencyFlag" id="labAvailableSwitchNo"
												data-title="N" onclick="toggleSwitch(this.id,'B2B')">No</a>
										</div>
										<input type="hidden" name="emergencyFlag" id="emergencyFlag"
											value="All">
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

														<li class="active" id="ALBToB"><a id="allBToB" data-toggle="tab" href="#allrecordtab"onclick="getAllRecollectionRequestBToBAndBToC(this.id)">
														<i class="fa fa-bookmark"></i> 
														<span class="hidden-inline-mobile">Recollection From Accession</span> 
														<span class="badge badge-blue font-11" id="subChrgCount">0</span>
														</a></li>

														<li id="rejectedSampleBToB"><a id="ARBToB" data-toggle="tab" href="#rejectedSampleTab" onclick="getAllRecollectionRequestBToBAndBToC(this.id)">
														<i class="fa fa-bookmark"></i> 
														<span class="hidden-inline-mobile">Rejected Record </span> 
														<span class="badge badge-blue font-11" id="deptCount"> 0</span> </a></li>

														<li id="pathoRecollectionBToB"><a id="PRBToB" data-toggle="tab" href="#pathologyRecolltionTab" onclick="getAllRecollectionRequestBToBAndBToC(this.id)">
														<i class="fa fa-bookmark"></i> 
														<span class="hidden-inline-mobile">Pathologist Re-Collection Request</span> 
														<span class="badge badge-blue font-11" id="servCount">0</span> </a></li>
													
													</ul>

												</div>
												<div class="panel-body">
													<div class="tab-content">

														<div id="allrecordtab" class="tab-pane fade in active">
															<div class="panel-group" id="accordion">
																<div class="form-inline col-md-12"></div>																
																<!-- <div class="divide-20"></div> -->
																<div class="panel">
																
																<div class="panel-body" style=" overflow: auto; height: 400px; margin-top: -1%">
																		
																<div id="exportToExcelDiv" class="form-group col-md-2" style="margin-left: 87%">
																	<input type="button" id="exportToExcelId" value="ExportToExcel" class="btn btn-xs btn-warning" />
																</div>
																<script type="text/javascript">
																	$("[id$=exportToExcelId]").click(
																					function(e) {window.open('data:application/vnd.ms-excel,'
																										+ encodeURIComponent($('div[id$=allrecordtab]').html()));
																					e.preventDefault();
																					});
																</script>																		
															     <table id="currentRecordTable"  class="datatable table  table-bordered">
																			<thead id="ehatTHead" style="">
																				<tr style="background-color: lightblue">
																					<th class="col-md-1 center">Reg. Date</th>
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">Patient ID</th>
																					<th class="col-md-1 center">Mobile No</th>
																					<th class="col-md-1 center">Center Name</th>
																					<th class="col-md-1 center">Referred By</th>
																					<th class="col-md-1 center">Barcode</th>
																					<th class="col-md-1 center">Collection Date
																						Time</th>
																					<th class="col-md-1 center">Profile Name</th>
																					<th class="col-md-1 center">Test Name</th>
																					<th class="col-md-1 center" colspan="2">Sample</th>
																					<th class="col-md-1 center">Reason</th>
																					<th class="col-md-1 center">Time Sensitive(hrs.)</th>
																					<th class="col-md-1 center">SendPhlebotomy</th>
																					<th class="col-md-1 center">RejectSample</th>
																					<th class="col-md-1 center">Action</th>
																				</tr>
																				<tr style="background-color: lightcyan">
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
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
																					<th class="col-md-1 center"></th>
																				</tr>
																			</thead>

																			<tbody id="accessionRecordTableBody">
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
																		id="allBToBPagination">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="allBToBNumberOfPages">
																	</ul>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>


														<div id="rejectedSampleTab" class="tab-pane fade in ">

															<div class="form-inline col-md-12"></div>

															<div class="panel-group" id="accordion">
																<div class="panel">
																	<div class="panel-body" style="overflow: auto; height: 400px; margin-top: -1%">
																	<div id="exportToExcelDiv" class="form-group col-md-2" style="margin-left: 87%">
																	<input type="button" id="exportToExcelId" value="ExportToExcel" class="btn btn-xs btn-warning" />
															     	</div>
																    <script type="text/javascript">
																	$("[id$=exportToExcelId]").click(
																					function(e) {window.open('data:application/vnd.ms-excel,'
																										+ encodeURIComponent($('div[id$=rejectedSampleTab]').html()));
																					e.preventDefault();
																					});
																    </script>	
																		<table id="previousRecordTable"
																			class="datatable table  table-bordered">
																			<thead id="ehatTHead">
																				<tr style="background-color: lightblue">
																					<th class="col-md-1 center">Reg. Date</th>
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">Patient ID</th>
																					<th class="col-md-1 center">Mobile No</th>
																					<th class="col-md-1 center">Center Name</th>
																					<th class="col-md-1 center">Referred By</th>
																					<th class="col-md-1 center">Barcode</th>
																					<th class="col-md-1 center">Collection Date
																						Time</th>
																				     <th class="col-md-1 center">Profile Name</th>
																				 	<th class="col-md-1 center">Test Name</th>
																					<th class="col-md-1 center" colspan="2">Sample</th>
																					<th class="col-md-1 center">Reason</th>
																					<th class="col-md-1 center">Time Sensitive(hrs.)</th>
																					<th class="col-md-1 center">SendPhlebotomy</th>
																					<th class="col-md-1 center">RejectSample</th>
																					<th class="col-md-1 center">Action</th>
																				</tr>
																				<tr style="background-color: lightcyan">
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center">Type</th>
																					<th class="col-md-1 center">Container</th>
																				<!-- <th class="col-md-1 center">Quantity</th>  -->
																					<th class="col-md-1 center"></th>
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
																		id="ARBToBJumpToPage">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="ARBToBPagination">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="ARBToBNumberOfPages">
																	</ul>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>

														<div id="pathologyRecolltionTab" class="tab-pane fade in ">
															<div class="panel-group" id="accordion">
																<!-- <div class="divide-20"></div> -->
																<div class="panel">
																	<div class="panel-body"
																		style="overflow: auto; height: 400px; margin-top: -1%">
																		<div id="exportToExcelDiv" class="form-group col-md-2" style="margin-left: 87%">
																	<input type="button" id="exportToExcelId" value="ExportToExcel" class="btn btn-xs btn-warning" />
															     	</div>
																    <script type="text/javascript">
																	$("[id$=exportToExcelId]").click(
																					function(e) {window.open('data:application/vnd.ms-excel,'
																										+ encodeURIComponent($('div[id$=pathologyRecolltionTab]').html()));
																					e.preventDefault();
																					});
																    </script>	
																		<table id="ehatTable"
																			class="datatable table  table-bordered">
																			<thead id="ehatTHead">
																				<tr style="background-color: lightblue">
																					<th class="col-md-1 center">Reg. Date</th>
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">Patient ID</th>
																					<th class="col-md-1 center">Mobile No</th>
																					<th class="col-md-1 center">Center Name</th>
																					<th class="col-md-1 center">Referred By</th>
																					<th class="col-md-1 center">Barcode</th>
																					<th class="col-md-1 center">Collection Date
																						Time</th>
																					<th class="col-md-1 center">Profile Name</th>
																					<th class="col-md-1 center">Test Name</th>
																					<th class="col-md-1 center" colspan="2">Sample</th>
																					<th class="col-md-1 center">Reason</th>
																					<th class="col-md-1 center">Time Sensitive(hrs.)</th>
																					<th class="col-md-1 center">SendToProcessing</th>
																					<th class="col-md-1 center">Reject Test</th>
																					<th class="col-md-1 center">Action</th>
																				</tr>
																				<tr style="background-color: lightcyan">
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
																					<th class="col-md-1 center"></th>
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
																					<th class="col-md-1 center"></th>
																				</tr>
																			</thead>
																			<tbody id="pathologyRecolltionId">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
															<!--    Starting pagination    -->
															<div style="margin-top: -1%">
																<div class="pull-right">
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="PRBToBJumpToPage">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="PRBToBPagination">
																	</ul>
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="PRBToBNumberOfPages">
																	</ul>
																</div>
															</div>
															<!--   Ending  pagination -->
														</div>

														<div class="modal fade" id="rejectRecolletiontestPopUp" tabindex="-1">
															<div class="modal-dialog modal-dialog-centered" style="width: 40%;">
																<div class="modal-content">
																	<div class="row">
																		<div class="col-md-12">
																			<div class="container">
																				<div class="panel-body">

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
																											<th class="col-md-10 center">Package/Profile /Test Name</th>
																										</tr>
																									</thead>
																									<tbody id="rejectTestRecollectionpopupId">

																									</tbody>
																								</table>
																							</div>
																							<input id="recollectionType" type="hidden" value="BtoB">
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														
														
														<div class="modal fade" id="recolletiontestPopUpSendToProcessing" tabindex="-1">
															<div class="modal-dialog modal-dialog-centered" style="width: 40%;">
																<div class="modal-content">
																	<div class="row">
																		<div class="col-md-12">
																		<h5 class="center">Recollection Test Name</h5>

																			<div class="container">
																				<div class="panel-body" style="overflow: auto;">

																					<table
																						class="datatable table table-bordered table-striped table-condensed cf">
																						<thead id="ehatTHead">
																							<tr style="background-color: lightblue">
																								<th class="col-md-10 center">Package/Profile
																									/Test Name</th>
																								<th class="col-md-10 center">Action</th>
																							</tr>
																						</thead>
																						<tbody id="recolletiontestPopUpSendToProcessingId">

																						</tbody>
																					</table>

																					<div class="col-md-12" >
																						
																						<div class=" col-md-3" style="left-margin:60px">
																							<input type="button" id="sendToprocessingId" value="SendToProcessing"
																								class="btn btn-xs btn-success"
																								onclick="sendToProcessingTest(this.id,'B2B','recollectTest');"
																								style="margin-top: 20px;" />
																						</div>
																						
																						<div class=" col-md-3" style="left-margin:80px">
																							<input type="button" value="Close"
																								class="btn btn-xs btn-warning"
																								onclick="hidepopSendToProcessing();"
																								style="margin-top: 20px;" />
																						</div>
																						
																					</div>

																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														
														
														<div class="modal fade" id="rejecTestPopUpPathologist" tabindex="-1">
															<div class="modal-dialog modal-dialog-centered" style="width: 40%;">
																<div class="modal-content">
																	<div class="row">
																		<div class="col-md-12">
																		<h5 class="center">Recollection Test Name</h5>

																			<div class="container">
																				<div class="panel-body" style="overflow: auto;">

																					<table
																						class="datatable table table-bordered table-striped table-condensed cf">
																						<thead id="ehatTHead">
																							<tr style="background-color: lightblue">
																								<th class="col-md-10 center">Package/Profile
																									/Test Name</th>
																								<th class="col-md-10 center">Action</th>
																							</tr>
																						</thead>
																						<tbody id="rejecTestPopUpPathologistTableList">

																						</tbody>
																					</table>

																					<div class="col-md-12" >
																						
																						<div class=" col-md-3" style="left-margin:60px">
																							<input type="button" id="rejectTestRequest" value="Reject"
																								class="btn btn-xs btn-denger"
																								onclick="rejectTestRequestInPathologistTab(this.id,'B2B','recollectTest');"
																								style="margin-top: 20px;" />
																						</div>
																						
																						<div class=" col-md-3" style="left-margin:80px">
																							<input type="button" value="Close"
																								class="btn btn-xs btn-warning"
																								onclick="hidepopRejectRequest();"
																								style="margin-top: 20px;" />
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
			$('#emergencyFlag').val("All");
			//getAllRecollectionRequestBToBAndBToC('allBToB');
			getSamples('BTOBRecollection');
			getRecollectionRecordsCount('BTOBRecollection');
			//getCountOfTabs();
			<%-- setCustName("<%=session.getAttribute("userType")%>", "<%=session.getAttribute("userCustomerType")%>", "<%=session.getAttribute("userCustomerId")%>"); --%>
			getAllCustomerType('custTypeForSearch');
		});
	</script>
		<input type="hidden" id=stateId value="0">
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">

		<input type='hidden' id="custTypeId" value="0" />
		<input type="hidden" id="custNameId" value="0" />
		<input type='hidden' id="fromDate" value="" />
		<input type="hidden" id="toDate" value="" />
		<input type='hidden' id="searchBy" value="byAll" />

		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>