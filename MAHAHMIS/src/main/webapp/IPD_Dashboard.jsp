<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>IPD_Dashboard</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link rel="stylesheet" type="text/css"
	href="bootstrap-dist/css/bootstrap.min.css" media="screen">
<link rel="stylesheet" type="text/css"
	href="font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />

<!--/PAGE -->
<!-- JAVASCRIPTS -->
<!-- Placed at the end of the document so the pages load faster -->
<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>

<!-- BOOTSTRAP -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>

<!-- DATE RANGE PICKER -->
<script src="js/bootstrap-daterangepicker/moment.min.js"></script>

<script src="js/bootstrap-daterangepicker/daterangepicker.min.js"></script>


<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
<!-- SPARKLINES -->
<script type="text/javascript"
	src="js/sparklines/jquery.sparkline.min.js"></script>
<!-- EASY PIE CHART -->
<script src="js/jquery-easing/jquery.easing.min.js"></script>
<script type="text/javascript"
	src="js/easypiechart/jquery.easypiechart.min.js"></script>
<!-- FLOT CHARTS -->
<script src="js/flot/jquery.flot.min.js"></script>
<script src="js/flot/jquery.flot.time.min.js"></script>
<script src="js/flot/jquery.flot.selection.min.js"></script>
<script src="js/flot/jquery.flot.resize.min.js"></script>
<script src="js/flot/jquery.flot.pie.min.js"></script>
<script src="js/flot/jquery.flot.stack.min.js"></script>
<script src="js/flot/jquery.flot.crosshair.min.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/js.js"></script>
<script src="js/ipdTreatment.js"></script>
<script src="js/operation.js"></script>

<script type="text/javascript" src="js/Dashboard.js"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<!-- /JAVASCRIPTS -->

<script type="text/javascript">
	onload = function() {
	//	getBedAvaDashboard('allHallBed');
		getBedAvaiableDashboard();
		$("#dischargePlan").hide();
		$("#operationPlan").hide();
		dischargeSummaryList();
		operatianSummaryList();
		fetchOperationTheaterNames();
	}
</script>
<style>
	#bedAccupiedPer > td {
	
	height:167px;
	
	}
	</style>
	
</head>
<body>

	<!-- <div id="outer" class="container-main" style="width: 100%;"> -->
	<!-- HEADER -->
	<header class="navbar clearfix" id="header">
	 	<%@include file="Menu_Header.jsp"%> 
	<%-- 	<%@include file="Menu_Header_Nobel.jsp"%> --%>
	</header>
	<!--/HEADER -->
	<!-- PAGE -->
	<section id="page">
		<%@include file="left_menu_IPDMain.jsp"%>
		<%
					java.util.Calendar currentDate = java.util.Calendar
								.getInstance();
						java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
								"dd-MM-yyyy");
						String todays_date = formatter.format(currentDate.getTime());
				%>

		<div id="main-content">
			<div class="container">
				<div class="row">
					<div id="content" class="col-lg-12" style="height: 600px">
						<div class="row">
							<div class="col-sm-12">
								<div class="page-header">
									<ul class="breadcrumb col-md-12-1"
										style="padding: 6px 10px; margin-top: 1px;">
										<li>Date : <%=todays_date%></li>
										<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
										</li>
										<li><a href="IPD_Dashboard.jsp">IPD</a></li>
									</ul>
								</div>
							</div>
						</div>
						<!-- Common -->
						<!-- DASHBOARD CONTENT -->
						<div class="col-md-12-1" style="margin-top: -5px;">

							<div class="col-md-8" style="padding-left: 0%; padding-right: 0%;">
									<div class="col-md-4" style="padding-left: 0%; padding-right: 0%;">
										<table class="table table-striped col-md-12"
											style="margin-top: 0px;">
											<tbody>
												
												<tr id="">
													<td class="col-md-3-1 text-center" style="height: 167px; "><div style="padding-top: 0% !important;"><b>Bed  Occupancy 
													                 Percentage</b></div></td>
												</tr>
												<tr id="" style="background: #85D6FF;" style="height: 25px;">
													<td class="col-md-3">Total Beds</td>
												</tr>
												<tr id="" style="color: red;">
													<td class="col-md-3">Occupied Beds</td>
												</tr>
												<tr id="" style="background: #85D6FF;">
													<td class="col-md-3">Vacant but unavailable</td>
												</tr>
												<tr id="" style="color: red;">
													<td class="col-md-3">Total Unavailable</td>
												</tr>
												<tr id="" style="background: #85D6FF; color: green;">
													<td class="col-md-3">Available With Waiting</td>
												</tr>
												<tr id="" style="color: green;">
													<td class="col-md-3">Total Available Beds</td>
												</tr>
												<tr id="" style="background: #dddddd; height: 11px;">
													<!-- <td class="col-md-3-1"></td> -->
												</tr>
											</tbody>
										</table>
									</div>

									<div class="col-md-8" style="overflow-x: auto;">

										<table class="table table-striped "
											style="margin-bottom: 0px;">
											<tbody>
												<tr id="bedAccupiedPer">
													<td style="vertical-align: middle; text-align: center;"
														height="280"><img alt=""
														src="images/ajax_loader_blue_64.gif"></td>
												</tr>
												<tr id="bedTotals" style="background: #85D6FF;">
												</tr>
												<tr id="bedOccuppieds" style="color: red;">
												</tr>
												<tr id="bedVacBtUnavl" style="background: #85D6FF;">
												</tr>
												<tr id="bedTotUnAvl" style="color: red;">
												</tr>
												<tr id="bedAvlWait"
													style="background: #85D6FF; color: green;">
												</tr>
												<tr id="bedTotAvl" style="color: green;">
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							<div class="col-md-4"
								style="padding-left: 0%; padding-right: 0%;">
								<div class="divide-10"></div>
								<div class="box border col-md-12-1">
									<div class="divide-10"></div>
									<div class="tabbable col-md-12-1">
										<ul class="nav nav-tabs">
											<li class="active"><a data-toggle="tab"
												href="#Discharge_Summary" onclick="hideShow('dischargePlan')"><i class="fa fa-user"></i> <span
													class="hidden-inline-mobile">Discharge Plan</span></a></li>
											<li><a data-toggle="tab" href="#Operation_Summary" onclick="hideShow('operationPlan')"><i
													class="fa fa-tint"></i> <span class="hidden-inline-mobile">Operation
														Plan</span></a></li>
										</ul>
										<div class="divide-20"></div>
										<div class="tab-content">
											<!-- Start Code for Discharge_Summary GUI -->
											<div id="Discharge_Summary" class="tab-pane fade active in">
												<div id="dischargePatientList"
													style="height: 256px; width: 100%;"></div>
											</div>
											<!-- End Code for Discharge_Summary GUI -->
											<!-- Start Code for Discharge_Summary GUI -->
											<div id="Operation_Summary" class="tab-pane fade in">
												<div id="operationPatientList"
													style="height: 254px; width: 95%; margin-left:3% margin-right:2%"></div>
											</div>
											<!-- End Code for Discharge_Summary GUI -->
										</div>
										<!-- /tab-content 1 -->
									</div>
									<!-- /tabbable -->
								</div>
								<!-- /box -->
							</div>

						</div>
						<!-- /COLUMN 1 -->

						<div class="col-md-12-1">
							<!-- BOX -->
							<div class="box border green">
								<div class="box-title">
									<h4 id="">
										<i class="fa fa-table"></i>Today's Plan Details
									</h4>
								</div>
								<div class="box-body" style="height: 185px;">
									<div id="onloadDiv">
										<h2 style="color: #d0d0d0;">Today's Plan Details</h2>
									</div>
									<div class="col-md-12-1" id="operationPlan">

										<div class='col-sm-4-1' style="padding-left: 3%;">
											<div class="form-group Remove-Padding col-md-12-1"
												style="margin-top: 18px;">
												<!-- <div class="form-group Remove-Padding col-md-12-1"
													style="margin-top: 9px;">
													<label class="TextFont col-md-4-1" style="color: blue;">Patient
														Name:</label> <label class="TextFont col-md-8-1" id="pname"
														style="color: red;"></label>
												</div> -->
											</div>
											<div class="form-group Remove-Padding col-md-12-1"
												style="margin-top: -5px;">
												<div class="form-group Remove-Padding col-md-5-1"
													style="margin-top: 9px;">
													<label class="TextFont">OT Name</label> <select id="otName"
														
														class="form-control input-SmallText TextFont">
													</select>
												</div>
												<div class="form-group Remove-Padding col-md-1-1"
													style="margin-top: 9px;"></div>
												<div class="form-group Remove-Padding col-md-5-1"
													style="margin-top: 9px;">
													<label class="TextFont">Date</label> <input type="text"
														readonly="readonly" id="oprnDateDetails"
														class="form-control input-SmallText"
														name="oprnDateDetails" onchange="">
												</div>
											</div>

											<div class="form-group Remove-Padding col-md-11-1"
												style="margin-top: 0px;">
												<div class="form-group Remove-Padding col-md-5-1"
													style="margin-top: 9px;">
													<label class="TextFont">Duration</label> <input
														id='durationHrs' readonly="readonly" name='' value=""
														class="form-control input-SmallText" />
												</div>
												<div class="form-group Remove-Padding col-md-1-1"
													style="margin-top: 9px;">
													<label class="TextFont"> &nbsp;</label>
													<div class="input-group-btn">Hrs.</div>
												</div>
												<div class="form-group Remove-Padding col-md-5-1"
													style="margin-top: 9px;">
													<label class="TextFont"> &nbsp;</label> <input
														id='durationMin' readonly="readonly" name='' value=""
														class="form-control input-SmallText" />
												</div>
												<div class="form-group Remove-Padding col-md-1-1"
													style="margin-top: 9px;">
													<label class="TextFont"> &nbsp;</label>
													<div class="input-group-btn">Mins.</div>
												</div>
											</div>

											<div class="form-group Remove-Padding col-md-12-1"
												style="margin-top: 0px;">
												<div class="form-group Remove-Padding col-md-5-1"
													style="margin-top: 9px;">
													<label class="TextFont">Start Time</label> <input
														type="text" id="timeFrom"
														class="form-control input-SmallText input-small"
														onchange="calculateDuration()" readonly="readonly" />

												</div>
												<div class="form-group Remove-Padding col-md-1-1"
													style="margin-top: 9px;"></div>
												<div class="form-group Remove-Padding col-md-5-1"
													style="margin-top: 9px;">
													<label class="TextFont">End Time</label> <input id='timeTo'
														onchange="calculateDuration()" name='' value=""
														class="form-control input-SmallText" readonly="readonly" />
												</div>
											</div>
										</div>
										<div class='col-sm-4-1'>
											<div class="form-group Remove-Padding col-md-12-1"
												style="margin-top: 9px;">
												<div class="form-group Remove-Padding col-md-12-1"
													style="margin-top: 9px;">
													<label class="TextFont">Scheduled Doctors</label> <select
														size="8" class="col-md-11-1 form-control"
														style="margin-top: 1px;" multiple="multiple"
														id="scheduledDoctors">
													</select>
												</div>
											</div>
										</div>
										<div class='col-sm-4-1'>
											<div class="form-group Remove-Padding col-md-12-1"
												style="margin-top: 9px;">
												<div class="form-group Remove-Padding col-md-12-1"
													style="margin-top: 9px;">
													<label class="TextFont">Scheduled Procedure</label> <select
														size="8" class="col-md-11-1 form-control"
														style="margin-top: 1px;" multiple="multiple"
														id="scheduledProcedure">
													</select>
												</div>
											</div>
										</div>
									</div>
									<div class="col-md-12-1" id="dischargePlan">
										<div class='col-sm-12-1' style="padding-left: 3%;">
											<div class="form-group Remove-Padding col-md-12-1"
												style="margin-top: 18px;">
												<div class="form-group Remove-Padding col-md-12-1"
													style="margin-top: 9px;">
													<label class="TextFont col-md-1-1" style="color: blue;">Patient
														Name:</label> <label class="TextFont col-md-4-1" id="patName"
														style="color: red;"></label>
												</div>
											</div>
											<div class="form-group Remove-Padding col-md-12-1"
												style="margin-top: 0px;">
												<div class="divide-10"></div>
												<div class="form-group Remove-Padding col-md-3-1"
													style="margin-top: 9px;">
													<label class="TextFont">Date of Admission to Ward:</label>
													<input id='dateAdmission' name='dateAdmission' value=""
														readonly="readonly" class="form-control input-SmallText" />
												</div>

												<div class="form-group Remove-Padding col-md-1-1"
													style="margin-top: 9px;"></div>
												<div class="form-group Remove-Padding col-md-3-1"
													style="margin-top: 9px;">
													<label class="TextFont">Expected Date of Discharge:</label>
													<input id='dateExpectedDischarge'
														name='dateExpectedDischarge' value="" readonly="readonly"
														class="form-control input-SmallText" />
												</div>
												<div class="form-group Remove-Padding col-md-1-1"
													style="margin-top: 9px;"></div>
												<div class="form-group Remove-Padding col-md-3-1"
													style="margin-top: 9px;">
													<label class="TextFont">Expected Time of Discharge:</label>
													<input id='timeExpectedDischarge'
														name='timeExpectedDischarge' value="" readonly="readonly"
														class="form-control input-SmallText" />
												</div>
											</div>
											<div class="form-group Remove-Padding col-md-12-1"
												style="margin-top: 0px;">
												<div class="form-group Remove-Padding col-md-3-1"
													style="margin-top: 9px;">
													<label class="TextFont">Relatives/Carer/Friends
														informed?</label> <select name="" id="isInformed"
														class="form-control input-SmallText TextFont">
														<option value="">-select Title-</option>
														<option value="ByPatient">By Patient</option>
														<option value="ByStaff">By Staff</option>
													</select>
												</div>
												<div class="form-group Remove-Padding col-md-1-1"
													style="margin-top: 9px;"></div>
												<div class="form-group Remove-Padding col-md-3-1"
													style="margin-top: 9px;">
													<label class="TextFont">Transport Arranged:</label> <select
														name="" id="transportArranged"
														class="form-control input-SmallText TextFont">
														<option value="">-select Title-</option>
														<option value="Own">Own</option>
														<option value="Ambulance">Ambulance</option>
													</select>
												</div>
												<div class="form-group Remove-Padding col-md-1-1"
													style="margin-top: 9px;"></div>
												<div class="form-group Remove-Padding col-md-3-1"
													style="margin-top: 9px;">
													<label class="TextFont">Expected Time of arrival:</label> <input
														type="text" class="form-control input-SmallText TextFont "
														readonly="readonly" id="transOwnArrvTime" />
												</div>
											</div>
											<div class="form-group Remove-Padding col-md-12-1"
												style="margin-top: 0px;">
												<div class="form-group Remove-Padding col-md-3-1"
													style="margin-top: 9px;">
													<label class="form-group Remove-Padding col-md-8-1"
														style="margin-top: 9px; padding-left: 0px;">Booked:
														&nbsp;</label> <input type="checkbox" style="margin-top: 12px;"
														id="isTransportOwnBooked" />
												</div>
												<div class="form-group Remove-Padding col-md-1-1"
													style="margin-top: 9px;"></div>
												<div class="form-group Remove-Padding col-md-4-1"
													style="margin-top: 5px;">
													<label class="form-group Remove-Padding"
														style="margin-top: 0px;">Transfer to Discharge
														Lounge(Yes/No): &nbsp; </label> <input type="checkbox"
														style="margin-top: 10px;" id="isTDL" />
												</div>
											</div>
										</div>

									</div>
								</div>
							</div>
							<!-- /BOX -->
						</div>

						<!-- COLUMN 2 -->
						<div class="col-md-6" style="display: none; visibility: hidden;">
							<div class="box solid grey">
								<div class="box-title">
									<h4>
										<i class="fa fa-dollar"></i>Revenue
									</h4>
									<div class="tools">
										<span class="label label-danger"> 20% <i
											class="fa fa-arrow-up"></i>
										</span> <a href="#box-config" data-toggle="modal" class="config">
											<i class="fa fa-cog"></i>
										</a> <a href="javascript:;" class="reload"> <i
											class="fa fa-refresh"></i>
										</a> <a href="javascript:;" class="collapse"> <i
											class="fa fa-chevron-up"></i>
										</a> <a href="javascript:;" class="remove"> <i
											class="fa fa-times"></i>
										</a>
									</div>
								</div>
								<div class="box-body">
									<div id="chart-revenue" style="height: 240px"></div>
								</div>
							</div>
						</div>
						<!-- HERO GRAPH -->
						<div class="col-md-6" style="display: none; visibility: hidden;">
							BOX
							<div class="box border green">
								<div class="box-title">
									<h4>
										<i class="fa fa-bars"></i> <span class="hidden-inline-mobile">Traffic
											& Sales</span>
									</h4>
								</div>
								<div class="box-body">
									<div class="tabbable header-tabs">
										<ul class="nav nav-tabs">
											<li><a href="#box_tab2" data-toggle="tab"><i
													class="fa fa-search-plus"></i> <span
													class="hidden-inline-mobile">Select & Zoom Sales
														Chart</span></a></li>
											<li class="active"><a href="#box_tab1" data-toggle="tab"><i
													class="fa fa-bar-chart-o"></i> <span
													class="hidden-inline-mobile">Traffic Statistics</span></a></li>
										</ul>
										<div class="tab-content">
											<div class="tab-pane fade in active" id="box_tab1">
												TAB 1
												<div id="chart-dash" class="chart"></div>
												<hr class="margin-bottom-0">
												/TAB 1
											</div>
											<div class="tab-pane fade" id="box_tab2">
												<div class="row">
													<div class="col-md-8">
														<div class="demo-container">
															<div id="placeholder" class="demo-placeholder"></div>
														</div>
													</div>
													<div class="col-md-4">
														<div class="demo-container" style="height: 100px;">
															<div id="overview" class="demo-placeholder"></div>
														</div>
														<div class="well well-bottom">
															<h4>Month over Month Analysis</h4>
															<ol>
																<li>Selection support makes it easy to construct
																	flexible zooming schemes.</li>
																<li>With a few lines of code, the small overview
																	plot to the right has been connected to the large plot.</li>
																<li>Try selecting a rectangle on either of them.</li>
															</ol>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- BOX -->
						</div>
						<!-- /HERO GRAPH -->
						<!-- /COLUMN 2 -->

					</div>
					<!-- /DASHBOARD CONTENT -->

				</div>
			</div>

		</div>
		<!-- /CONTENT-->
	</section>
	
	<script>
		jQuery(document).ready(function() {
			App.setPage("IPD_Dashboard"); //Set current page
			App.init(); //Initialise plugins and elements
		});
	</script>
	
	<div><%@include file="Footer.jsp"%></div>
	<div id="Discharge" style="display: none;"></div>
	<div id="Operation" style="display: none;"></div>

</body>
</html>