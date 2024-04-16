<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Phlebotomy Test</title>
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
											<li><a href="pathology_phelbotomy.jsp">LIS</a></li>
											<li><i class="fa fa-home"></i> <a href="pathology_phelbotomy.jsp">Phlebotomy</a></li>

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
												onkeyup="phelbotomyPatientAutoSuggestion(this.id, 'phelbotomyAutoSugg');">
										</div>
									</div>

									<div class="col-md-2">
										<div class="input-group" id="customerTypes">
											<label for="inlineFold" class="control-label">Customer Type:</label> 
											<!-- <select id="custTypeForSearch" onchange="fetchCustomerNames('phelbotomySearchBtn')"
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
								</div>
								<div class="col-md-12" style="margin-top: 1%;">
									<div class="col-md-1">
										<label for="inlineFold" class="control-label">Emergency : </label>
									</div>
									<div class="col-md-2">
										<div class="input-group" id="documentByName">
											<div id="radioBtn" class="btn-group">
											<a class="btn btn-danger btn-xs notActive"
												data-toggle="emergencyFlag" id="labAvailableSwitchYes"
												data-title="Y" onclick="toggleSwitch(this.id,'phlebotomy')">Yes</a>
											<a class="btn btn-primary btn-xs active"
												data-toggle="emergencyFlag" id="labAvailableSwitchBoth"
												data-title="All" onclick="toggleSwitch(this.id,'phlebotomy')">All</a>
											<a class="btn btn-success btn-xs notActive"
												data-toggle="emergencyFlag" id="labAvailableSwitchNo"
												data-title="N" onclick="toggleSwitch(this.id,'phlebotomy')">No</a>
										</div>
										<input type="hidden" name="emergencyFlag" id="emergencyFlag"
											value="All">
										</div>
									</div>
									
									<div class="col-md-1">
										<label for="inlineFold" class="control-label" style="margin-left: -90px;">Collected At: </label>
									</div>
									<div class="col-md-2" style="margin-left: -94px;">
										<div class="input-group" id="documentByName">
											<select style="width: 150px" id="collectedAt" onchange="getSamplesByCollectedAt('phlebotomy');">
												<option value="0">-Select-</option>
												<option value="1">Domestic</option>
												<option value="2">International</option>
											</select>
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
										<div class="panel-body" style="height: 460px">
											
										<div class="col-md-12">
											<div class="col-md-1">
												<span onclick="" title="No single sample collected against Patient ID." data-placement="bottom"
													data-toggle="tooltip" class="badge"
													style="background-color: #34646c; cursor: pointer;"><i
													class="fa fa-check"></i>OPEN <i id="open">00</i>
												</span>
											</div>
											
											<div class="col-md-1">
												<span onclick="" title="All sample collected against Patient ID." data-placement="bottom"
													data-toggle="tooltip" class="badge"
													style="background-color: #008000; cursor: pointer;"><i
													class="fa fa-times"></i> COLLECTED <i id="collection">00</i> </span>
											</div>

										    <div class="col-md-8"style="margin-left:5%">
												<span onclick="" title="Only some sample collected against Patient ID." data-placement="bottom"
													data-toggle="tooltip" class="badge"
													style="background-color: #CC5500; cursor: pointer;"><i
													class="fa fa-times"></i> PARTIAL <i id="partial">00</i> </span>
													
													<input style="margin-left:67%" type="button" value="Forced Outsource" class="btn btn-xs btn-warning " data-toggle="tooltip"
													data-placement="bottom" title="Forced Outsource" onclick="viewOutSourceTestforResult()" />
													
													<input style="margin-left:100%;margin-top:-6%" type="button" value="Collection Done" class="btn btn-xs btn-success " data-toggle="tooltip"
													data-placement="bottom" title="Collection Done" onclick="collectionPatient()" />
											</div>
											
							
											</div>
										<div class="col-md-12">
										<div style="overflow: auto;height: 460px">
											
											<table id="ehatTable" class="datatable table  table-bordered" style="margin-top:0%">
												<thead id="ehatTHead">
													<tr style="background-color: lightblue">
													   <th class="col-md-1 center">Patient Name</th>
														<th class="col-md-1 center">Reg. Date</th>
														
														<th class="col-md-1 center">Patient ID</th>
														<th class="col-md-1 center">Collected At</th>
														<th class="col-md-1 center">Barcode</th>
														<th class="col-md-1 center">Test</th>
														<th class="col-md-1 center">Sample</th>
														<th class="col-md-1 center">Action</th>
													</tr>
												</thead>

												<tbody id="phlebotomytabId">
												</tbody>
											</table>
										</div>
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
											id="phlebotomyPagination">
										</ul>
										<ul class="pagination pagination-blue margin-bottom-10"
											id="phlebotomyNumberOfPages">
										</ul>
									</div>
								</div>
								<!--   Ending  pagination -->

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
				</div>
				<div id="pleaseWait" style="text-align: center; display: none;">
				<img style="margin-top: 250px;" height="43px"
					src="images/loading_black.gif" />
				<div style="margin-top: 10px; color: white">
					<b>Please wait...</b>
				</div>
			</div>
			<%@include file="footer_nobel.jsp"%></section>
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
				$('#dispatchTime').datetimepicker({
						datepicker : false,
						format : 'H:i',
						step : 5
					}); 
			});
			$('#emergencyFlag').val("All");
			$("#collectedAt").select2();
			getPhlebotomyRecord();		
			getCountOfRecords();
			<%-- setCustName("<%=session.getAttribute("userType")%>", "<%=session.getAttribute("userCustomerType")%>", "<%=session.getAttribute("userCustomerId")%>"); --%>
			getAllCustomerType('custTypeForSearch');
			getAllOutLabMaster();
			
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
		
	<input type='hidden' id="custTypeId" value="0"/>
	<input type="hidden" id="custNameId" value="0"/>
	<input type='hidden' id="fromDate" value=""/>
	<input type="hidden" id="toDate" value=""/>
	<input type='hidden' id="searchBy" value="byAll"/>
		
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>