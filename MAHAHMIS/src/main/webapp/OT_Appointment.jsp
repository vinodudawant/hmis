<!DOCTYPE html>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>OT Appointment</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<!--Color Picker CSS-->
<link rel="stylesheet" type="text/css"
	href="js/colorpicker/css/colorpicker.min.css">
<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link rel="stylesheet" type="text/css"
	href="bootstrap-dist/css/bootstrap.min.css" media="screen">
<link rel="stylesheet" type="text/css"
	href="font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="css/datepicker.css"
	media="screen">
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css">
<!-- DATA TABLES -->
<link rel="stylesheet" type="text/css"
	href="js/datatables/media/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css"
	href="js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css"
	href="js/datatables/extras/TableTools/media/css/TableTools.min.css" />

<!-- FULL CALENDAR -->
<link rel="stylesheet" type="text/css"
	href="js/fullcalendar/fullcalendar.min.css" />
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="js/uniform/css/uniform.default.min.css" />
<!--Small Cal-->
<link rel="stylesheet" type="text/css" charset="utf-8"
	href="css/scal.css">
<!-- DATE PICKER -->
<link rel="stylesheet" type="text/css"
	href="js/datepicker/themes/default.min.css" />
<link rel="stylesheet" type="text/css"
	href="js/datepicker/themes/default.date.min.css" />
<link rel="stylesheet" type="text/css"
	href="js/datepicker/themes/default.time.min.css" />

<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />


<script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>
<script type="text/javascript"
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<!-- <script type="text/javascript" src="js/jquery-ui.js"></script> -->

<script type="text/javascript" src="js/operation.js"></script>
<script src="js/validate.js" type="text/javascript"></script>

<!-- New Js Files -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<!-- End New JS File -->

<!-- FULL CALENDAR -->
<link rel="stylesheet" type="text/css"
	href="js/fullcalendar/fullcalendar.min.css" />
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>

<link href="appointment/myTheme.css" rel="stylesheet" media="screen" />
<link href="appointment/defaultTheme.css" rel="stylesheet"
	media="screen" />
<link href="appointment/960.css" rel="stylesheet" media="screen" />
<script src="appointment/jquery.fixedheadertable.js"></script>



<!-- JAVASCRIPTS -->
<!-- Placed at the end of the document so the pages load faster -->
<!--Color Picker-->

<script type="text/javascript"
	src="js/colorpicker/js/bootstrap-colorpicker.min.js"></script>

<script type="text/javascript" src="bootstrap-dist/js/bootstrap.js"></script>

<!-- UNIFORM -->
<script type="text/javascript" src="js/uniform/jquery.uniform.min.js"></script>
<!-- DATE RANGE PICKER -->
<script type="text/javascript"
	src="js/bootstrap-daterangepicker/moment.min.js"></script>
<script type="text/javascript"
	src="js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
<script src="js/bootstrap-datepicker.js"></script>

<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
<!-- DATA TABLES -->
<script type="text/javascript"
	src="js/datatables/media/js/jquery.dataTables.min.js"></script>

<script type="text/javascript"
	src="js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
<script type="text/javascript"
	src="js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
<!-- FULL CALENDAR -->
<script type="text/javascript" src="js/fullcalendar/fullcalendar.min.js">
	
</script>
<!-- COOKIE -->
<script type="text/javascript"
	src="js/jQuery-Cookie/jquery.cookie.min.js"></script>
<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>


<script type="text/javascript">
	jQuery(document).ready(function() {
		App.setPage("calendar"); //Set current page
		App.init(); //Initialise plugins and elements
	});
	$(document).ready(function() {
		$('#calendar1').fullCalendar({
			defaultView : 'month'
		});
	});
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp
			.getDate(), 0, 0, 0, 0);
	var checkin = $('#dpd1').datepicker({
		onRender : function(date) {
			return date.valueOf() < now.valueOf() ? 'disabled' : '';
		}
	}).on('changeDate', function(ev) {
		if (ev.date.valueOf() > checkout.date.valueOf()) {
			var newDate = new Date(ev.date)
			newDate.setDate(newDate.getDate() + 1);
			checkout.setValue(newDate);
		}
		checkin.hide();
		$('#dpd2')[0].focus();
	}).data('datepicker');
	var checkout = $('#dpd2').datepicker({
		onRender : function(date) {
			return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
		}
	}).on('changeDate', function(ev) {
		checkout.hide();
	}).data('datepicker');
</script>
<script type="text/javascript">
	onload = function() {
		$("#liappo").addClass("anchorActive");
		fetchOperationTheaterNames();
		viewAnaestheticAssess("OTSchedule");
	}
</script>


<script>
	var dat = $('#idNewAppointment1').datepicker({
		dateFormat : 'dd-mm-yy',
		minDate : '+5d',
		changeMonth : true,
		changeYear : true,
	}).on('changeDate', function(ev) {
		dat.hide();
	}).data('datepicker');

	$(function() {
		$("#events").change(function() {
			var col = $(this).val();
			$(this).css("background", col);
			$(function() {
				$('#DocList').on('click', 'div', function() {
					$('#DocList div').css({
						background : 'transparent'
					});
					$(this).css({
						background : col
					});
					//$(this).setAttribute('disabled','disabled');
				});
			});
		});
	});

	$(function() {
		$("#eventsAppointment").change(function() {
			var col = $(this).val();
			$(this).css("background", col);
			$(function() {
				$('#DocList1').on('click', 'div', function() {
					$('#DocList1 div').css({
						background : 'transparent'
					});
					$(this).css({
						background : col
					});
					//$(this).setAttribute('disabled','disabled');
				});
			});
		});
	});
</script>
<!-- /JAVASCRIPTS -->
</head>

<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>
<body style="background: white ! important;">

	<section id="page">
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${ sessionScope.userType != null }">

			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header_Nobel.jsp"%>
				</header>
				<!--/HEADER -->

				<!--Start Left Menu -->
				<%@include file="left_menu_otmanagement.jsp"%>
				<!--End Left Menu -->

				<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12">

								<!-- Page Date Print Discards-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 7px 10px; margin-top: 1px;">
												<li>Date : 11 Aug 2014</li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
												<li><a href="operationTypeManagement.jsp">OT</a></li>
												<li><a href="OT_Appointment.jsp">OT Calendar</a></li>
												<div class="pull-right">
													<!-- <button class="btn btn-xs btn-success">Save</button> -->
												</div>
											</ul>
										</div>
									</div>
								</div>
								<!-- Page Date Print Discards-->

								<!--Start First Panel -->
								<div class="panel panel-default">
									<div class="panel-body">
										<div class='col-sm-12-1'>
											<div class="modal-body">
												<div id="MainTabs" class="tab-content">
													<form class="form-horizontal  col-md-12-1">
														<div class="form-group col-md-5-1">
															<div class="divide-40"></div>
															<div class="form-group col-md-10-1 center"
																style="padding-left: 50px;">
																<button class="btn btn-xs btn-warning"
																	style="height: 50px; width: 300px; font-size: 25px;">Schedule</button>
															</div>
															<div id='calendar1' class="form-group col-md-10-1 center"
																style="padding-left: 50px;"></div>
														</div>
																	<div class="divide-10"></div>										
														<div class="form-group col-md-7-1">
															<div class="col-md-12-1 center">
																<div class="col-md-2-1 center">
																	<label class="TextFont">Select OT Name:</label>
																	<div class="divide-20"></div>
																</div>
																<div class="col-md-4-1 center">
																	<select class="form-control input-SmallText TextFont"
																		id="otName" name="" onclick="viewAnaestheticAssess('OTSchedule')"																		onchange="setOperationAppointmentInCalender()"><option
																			value="0">-SELECT-</option>
																	</select>
																	<div class="divide-20"></div>
																</div>
																<div class="col-md-1-1 center">
																	<label class="TextFont">Date:</label>
																	<div class="divide-20"></div>
																</div>
																<div class="col-md-4-1">
																	<input type="text" readonly="readonly" id="idTourDateDetails"
																	onclick="displayCalendar(document.getElementById('idTourDateDetails'),'dd/mm/yyyy',this);"
																		value='<%=todays_date%>' class="form-control input-SmallText"
																		name="idTourDateDetails" onchange="viewAnaestheticAssess('OTSchedule');setOperationAppointmentInCalender();"
																		onclick="viewAnaestheticAssess('OTSchedule');">
																</div>
															</div>

															<div id='calendar' class="col-md-12-1 center" style="width:110%; overflow-x: auto; "></div>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!--End First Panel -->
							</div>
							<!-- End id="content" -->
						</div>
						<!-- End class="row" -->
					</div>
					<!-- class="container" -->
				</div>
				<!-- id="main-content" -->
			</div>
			<!-- id="outer" -->
			<div><%@include file="footer_nobel.jsp"%></div>
			<input type="hidden" id="txtHidTimeSlices" value="" />
			<input type="hidden" id="OTdata" value="" />
			<input type="hidden" value="" id="hidpatId" />
			<input type="hidden" value="" id="trid" />
			<input type="hidden" value="insert" id="queryType" />
			<input type="hidden" value="" id="tropid" />
			<input type="hidden" id="docIds" value="" />
			<input type="hidden" id="anesthesisIds" value="" />
			<input type="hidden" id="tropmanageid" value="" />
			<input type="hidden" id="todays_date" value="<%=todays_date%>" />

			<input type="hidden" id="pageName" value="OTAppointment" />
			<div id="OTdata" style="display: none;"></div>
			<div style="display: none" id="divOTName"></div>
		</c:if>
	</section>
</body>
</html>