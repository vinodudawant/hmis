<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Authorized Record</title>
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
<script type="text/javascript" src="js/new_phlebotomy.js"></script>
<script type="text/javascript" src="js/pathology_information.js"></script>

<link rel="stylesheet" type="text/css" href="css/bootstrap-toggle.min.css" />
<script src="js/bootstrap-toggle.min.js"></script>


<style>
#radioBtn .notActive{
    color: #3276b1;
    background-color: #fff;
}
.toggle.ios, .toggle-on.ios, .toggle-off.ios { border-radius: 20px; width: 10px; }
  .toggle.ios .toggle-handle { border-radius: 50px; width: 10px;}

</style>

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
											<li><i class="fa fa-home"></i> <a href="pathology_authorizatioin.jsp">Authorization</a></li>

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
												onkeyup="phelbotomyPatientAutoSuggestion(this.id, 'authorizationAutoSugg');" autocomplete="off">
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
											onclick="searchLabTestPatient('authorizationSearchBtn');"
											style="margin-top: 20px;" />
									</div>
									
									<div class=" col-md-1">
										<input type="button" value="Clear All"
											class="btn btn-xs btn-primary"
											onclick="clearSearch('authorization');"
											title="Clear All Fields & Refresh"
											style="margin-top: 20px;" />
									</div>
									
									<div class="col-md-1">
										<label style="margin-top: 20px;" for="inlineFold" class="control-label">Emergency : </label>
									</div>
									<div class="col-md-2">
										<div class="input-group" id="documentByName">
											<div id="radioBtn" class="btn-group" style="margin-top: 20px;">
											
											<input type="checkbox" data-on="On" data-off="Off" data-toggle="toggle" data-onstyle="danger" id="toggle-event2"
												data-style="ios"  data-size="mini" data-width="60" data-height="10">
											 										
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
												data-title="Y" onclick="toggleSwitch(this.id,'authorization')">Yes</a>
											<a class="btn btn-primary btn-xs active"
												data-toggle="emergencyFlag" id="labAvailableSwitchBoth"
												data-title="All" onclick="toggleSwitch(this.id,'authorization')">All</a>
											<a class="btn btn-success btn-xs notActive"
												data-toggle="emergencyFlag" id="labAvailableSwitchNo"
												data-title="N" onclick="toggleSwitch(this.id,'authorization')">No</a>
									
 										
											<input type="checkbox" data-on="On" data-off="Off" data-toggle="toggle" data-onstyle="danger" id="toggle-event2"
												data-style="ios"  data-size="mini" data-width="60" data-height="10">
											 										
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
											<select style="width: 150px" id="collectedAt" onchange="getSamplesByCollectedAt('authorization');">
											</select>
										</div>
									</div>
									<!-- <div class=" col-md-1">
										<input type="button" value="Clear All"
											class="btn btn-xs btn-primary"
											onclick="clearSearch('authorization');"
											title="Clear All Fields & Refresh"
											/>
									</div> -->
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
										
										<div class="col-md-1"style="padding-left: 0%">
												<!-- <span onclick="getRecordAgainstIndicator('normal')" title="All tests result in the sample are Normal." data-placement="bottom"
													data-toggle="tooltip" class="badge"
													style="background-color: #008000; cursor: pointer;"><i
													class="fa fa-check"></i>NORMAL <i id="normal">00</i>
												</span> -->
												<span onclick="searchLabTestPatient('authorizationSearchBtn')" title="All tests result in the sample are Normal." data-placement="bottom"
													data-toggle="tooltip" class="badge"
													style="background-color: #008000; cursor: pointer;"><i
													class="fa fa-check"></i>NORMAL <i id="normal">00</i>
												</span>
											</div>
											
											<div class="col-md-2"style="padding-left: 6%" id="abnormalDiv">
												<span onclick="getRecordAgainstIndicator('abnormal')" title="Some tests result in the sample are Low or High" data-placement="bottom"
													data-toggle="tooltip" class="badge"
													style="background-color: #FFA500; cursor: pointer;"><i
													class="fa fa-exclamation"></i> ABNORMAL <i id="abnormal">00</i> </span>
											</div>

										    <div class="col-md-2"style="margin-left:3%" id="cabnormalDiv">
												<span onclick="getRecordAgainstIndicator('cAbnormal')" title="Some tests result in the sample are cLow,cHigh & Not Exist)" data-placement="bottom"
													data-toggle="tooltip" class="badge"
													style="background-color: #FF0000; cursor: pointer;"><i
													class="fa fa-times"></i> C ABNORMAL <i id="cAbnormal">00</i> </span>
											</div>
											
											<!-- added by Rohit to show template wise test -->
											<div class="col-md-1"style="padding-left: 5%">
												<span onclick="getRecordOnAuthorizationTemplateWise('templateList');" data-placement="bottom" data-toggle="tooltip" class="badge"
													style="background-color: #000c66; cursor: pointer;"><i class="fa fa-check"></i>Template Test <i id="templateTest">00</i>
												</span>
											</div>
											<!-- added by Rohit to show template wise test -->
											
											<!-- added by Rohit to show microbiology test -->
											<!-- <div class="col-md-1"style="padding-left: 5%">
												<span onclick="getRecordOnAuthorizationMicrobiology('microbiologyList');" data-placement="bottom" data-toggle="tooltip" class="badge"
													style="background-color: #000c66; cursor: pointer;"><i class="fa fa-check"></i>Microbiology Test <i id="microbiologyTest">00</i>
												</span>
											</div> -->
											<!-- added by Rohit to show template wise test -->
										
											<div class="checkbox checkbox-inline col-md-1 pull-right">
												<input  type="button" value="Bulk Authorize" id="bulkPost"
													class="btn btn-xs btn-success " data-toggle="tooltip"
													data-placement="bottom" title="Bulk authorize" 
													onclick="bulkPostRecord()" style="display:none" />
											</div>

											<div class="divide-20"></div> 
															
													<!-- -----------Loading Images-------- -->
																			<div style="display: none; overflow: hidden; margin-top:10%" id="ajaxloaderimg" class="center">
																				<img src="/EhatEnterprise/images/ajax_loader_blue_64.gif">
																			</div>
																	<!-- -----------Loading Images-------- -->		
																														
											<table id="proccessingtabIdtable" class="datatable table  table-bordered" style="margin-top:1%">
												<thead id="ehatTHead">
													<tr style="background-color: lightblue">
													<th class="col-md-1 center">Sr.No.</th>	
														<th class="col-md-1 center">Reg. Date</th>
														<th class="col-md-1 center">Patient Name</th>
														<th class="col-md-1 center">UHID</th>
<!-- 														<th class="col-md-1 center">Center Name</th> -->
														<th class="col-md-1 center">Collected At</th>
														<!-- <th class="col-md-1 center">Customer Name</th> -->
														<th class="col-md-1 center">Barcode</th>
														<th class="col-md-1 center">Collection Date Time</th>
														<th class="col-md-1 center">Test Name</th>
														<th class="col-md-1 center">Status</th>
														<th class="col-md-1 center">Sample</th>	
														<!-- <th class="col-md-1 center">Pathologist Name</th> -->
														<th class="col-md-1 center">Time Sensitive(hrs.)</th>	
														<th class="col-md-1 center">Print Barcode</th>														
														<th class="col-md-1 center">Action</th>
														<th class="col-md-1 center"><input class="selectall" id="bulksapmle" name="bulksapmle" type="checkbox"   style="display:none"></th>
													</tr>
												</thead>

												<tbody id="proccessingtabId">
												</tbody>
											</table>
											<!-- added .by Rohit on 22-09-2021 -->
											<!-- <table id="proccessingtabIdtableTemplateList" class="datatable table  table-bordered" style="margin-top:1%">
												<thead id="ehatTHead">
													<tr style="background-color: lightblue">
													<th class="col-md-1 center">Sr.No.</th>	
														<th class="col-md-1 center">Reg. Date</th>
														<th class="col-md-1 center">Patient Name</th>
														<th class="col-md-1 center">Patient ID</th>
														<th class="col-md-1 center">Collected At</th>
														<th class="col-md-1 center">Barcode</th>
														<th class="col-md-1 center">Collection Date Time</th>
														<th class="col-md-1 center">Test Name</th>
														<th class="col-md-1 center">Department</th>
														<th class="col-md-1 center">Status</th>
														<th class="col-md-1 center">Sample</th>	
														<th class="col-md-1 center">Pathologist Name</th>
														<th class="col-md-1 center">Time Sensitive(hrs.)</th>	
														<th class="col-md-1 center">Print Barcode</th>														
														<th class="col-md-1 center">Action</th>
														<th class="col-md-1 center"><input class="selectall" id="bulksapmle" name="bulksapmle" type="checkbox"   style="display:none"></th>
													</tr>
												</thead>

												<tbody id="proccessingtabIdTemplateList">
												</tbody>
											</table> -->
											<!-- added .by Rohit on 22-09-2021 -->
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
											id="authorizationPagination">
										</ul>
										<ul class="pagination pagination-blue margin-bottom-10"
											id="authorizationNumberOfPages">
										</ul>
									</div>
								</div>
								<!--   Ending  pagination -->

							</div>
						</div>
					<!-- /CONTENT-->
				</div>
			</div>	
			<!-- ----Added by kishor for Barcode Popup ---- -->
		<div class="modal fade" id="Counter_Batch_Pop_Up"
															tabindex="-1" role="dialog"
															aria-labelledby="labTestModal" aria-hidden="true">
															<div class="modal-dialog modal-dialog-centered"
																role="document" style="width: 20%;">
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
																								<label for="exampleInputEmail1">Enter Barcode Count:
																								</label> <input type="text" id="txtBarcodecnt" onkeypress="return validatePrice(event)"
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
			<input type="hidden" value="0" id="barcodeId" />
						<input type="hidden" value="0" id="pName" />
						<input type="hidden" value="0" id="profileName" />
						<input type="hidden" value="0" id="tId" />
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
    <input type="hidden" value="<%=CovidReportProfileId%>"  id="CovidReportProfileId" />
    <input type="hidden" value="<%=SARSCOV2ANTIGEN%>"  id="SARSCOV2ANTIGEN" />
    <input type="hidden" value="<%=COVID19RNAAMPLIFICATION%>"  id="COVID19RNAAMPLIFICATION" />
    <input type="hidden" value="<%=REALTIMEHEPATITISCVIRUSHCV%>"  id="REALTIMEHEPATITISCVIRUSHCV" />
    <input type="hidden" value="<%=REALTIMETRUENAT%>"  id="REALTIMETRUENAT" />
    <input type="hidden" value="<%=meeshaFlow%>"  id="meeshaFlow" />
     
    
															
	<script>
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});		
			$('#emergencyFlag').val("All");
				//getProcessingRecord('AA');
				searchLabTestPatient("authorizationSearchBtn");
				getRecordCountOnAuthorization();
				//getRecordCountForAuthorizeTabIndicator();
				//getCollectedAtOptions();
				<%-- setCustName("<%=session.getAttribute("userType")%>", "<%=session.getAttribute("userCustomerType")%>", "<%=session.getAttribute("userCustomerId")%>"); --%>
				//getAllCustomerType('custTypeForSearch');
				
				$("#collectedAt").select2();
				hideTabForMeesha();
		});
		
/* 
		$("#bulksapmle").click(function(){
	        $("input[type=checkbox]").prop('checked', $(this).prop('checked'));
		}); */
		
		$("#bulksapmle").click(function () {
			var status = false;
			if($("#bulksapmle").is(':checked'))
				status = true;
			$('input[type=checkbox]').not(":disabled").prop('checked', status);
		});
		
	</script>
	<input type="hidden" value="<%=session.getAttribute("userFor")%>" id="userFor"/>
	<input type="hidden" id="callformforAuthorizationSearch" value=""/>
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>