<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<html lang="en">

<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<title>OPD Appointment</title>

	
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
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>

<!--Small Cal-->
<link rel="stylesheet" type="text/css" charset="utf-8"
	href="css/scal.css">


<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="js/uniform/css/uniform.default.min.css" />
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />
<script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>

<!-- SELECT2 -->
<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />

<script type="text/javascript"
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<!-- <script type="text/javascript" src="js/jquery-ui.js"></script> -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/appointment.js"></script>

<script src="js/validate.js" type="text/javascript"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/registration.js"></script>

 <!-- <script type="text/javascript" src="js/schedulerNew.js"></script>  -->

<script type="text/javascript" src="js/appointmentNew.js"></script>

<!-- New Js Files -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<!-- End New JS File -->



<link href="appointment/myTheme.css" rel="stylesheet" media="screen" />
<link href="appointment/defaultTheme.css" rel="stylesheet"
	media="screen" />
<link href="appointment/960.css" rel="stylesheet" media="screen" />
<script src="appointment/jquery.fixedheadertable.js"></script>

<!-- <link rel="stylesheet"
	href="http://netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<script
	src="http://netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script> -->


<!-- JAVASCRIPTS -->
<!-- Placed at the end of the document so the pages load faster -->

<!--Color Picker-->
<script type="text/javascript"
	src="js/colorpicker/js/bootstrap-colorpicker.min.js"></script>

<script type="text/javascript" src="bootstrap-dist/js/bootstrap.js"></script>

<!-- UNIFORM -->
<script type="text/javascript" src="js/uniform/jquery.uniform.min.js"></script>

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
<script type="text/javascript" src="js/fullcalendar/fullcalendar.min.js"></script>

<!-- COOKIE -->
<script type="text/javascript"
	src="js/jQuery-Cookie/jquery.cookie.min.js"></script>

<!-- AUTOSUGGESTION -->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<style>
.dropdown-menu {
 position: inherit !important;
}

</style> 



<script type="text/javascript">
	jQuery(document).ready(function() {
		App.setPage("calendar"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});

	});

	/* $(document).ready(function() {
		$('#calendar1').fullCalendar({

		});
	}); */
	var nowTemp = new Date();
	
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp
			.getDate(), 0, 0, 0, 0);
	var checkin = $('#dpd1').datepicker({
		onRender : function(date) {
			return date.valueOf() < now.valueOf() ? 'disabled' : '';
		}
	}).on('changeDate', function(ev) {

		if (ev.date.valueOf() > checkout.date.valueOf()) {
			var newDate = new Date(ev.date);
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
		//getCountForFollowUpAndRescheduleNew();  commited by dayanand temporly
		/* App.setPage("ItemManagement");
		App.inti(); */
		title("OPD_Appointment");
		$("#liappo").addClass("anchorActive");

		//Code for autosuggestion by Amol Saware
		//autoCompTableForOPDAppointment("[]","byName"); commited by dayanand temporly
		//autoSuggetionPationNames("byName", "onload", "OPD_Appoinment");

		var todays_date = $("#todays_date").val();
		var arrDate = todays_date.split("-");
		var date = arrDate[0] + "/" + arrDate[1] + "/" + arrDate[2];
		$("#idTourDateDetails").val(date);
		$("#idNewAppointment").val(date);
		$("#byName").val("");
		//autoSuggetionPationNames(todays_date);
		//fetchDoctorSpecilizationsForPatientRegistration("scheduler");
		getAllDoctorListForRegistartion();
		getSpecializationOnSchedulerAppointment();
		getSpecializationOnTodaysAppointment();
		//getAppointedListOfPatient();
		getAppointedListOfPatientNew("New");
		getAllPatientRecordsForScheduler(); //added by sagar
		
		
		changeTabToNew();
		$("#existingPatientDiv").hide();
		$("#queryType").val("update");
		clearValuesNewPatient();
		clearValuesExitPatient();
		//setCalenderOnLoad();
		getPatientAppointListData("New");

		//setAutoPatientName("byName", "onload", "OPDAppoinment");
	}
	
	// Add By Amol Saware
	 setInterval( function(){ 
		var appointmentType = $("#appointmentType").val();
		if(appointmentType=="New" || appointmentType=="Existing"){
			getAppointedListOfPatientNew();
		}
		else if(appointmentType=="ReSchedule"){
			//fetchReScheduleApptNew();
		}
	}, 45000 );
</script>


<script>
	/* var dat = $('#idNewAppointment1').datepicker({
		dateFormat : 'dd/mm/yy',
		minDate : '+5d',
		changeMonth : true,
		changeYear : true,
		}).on('changeDate', function(ev) {
		dat.hide();
	}).data('datepicker'); */

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
			"dd-MM-yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>
<body>

	<c:if test="${ sessionScope.userType != null }">
		<input type="hidden" id="todays_date" value="<%=todays_date%>" />
		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
		<!-- <div id="outer" class="container-main" style="width: 100%;"> -->
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header.jsp"%>
		</header>
		<!--/HEADER -->

		<section id="page">

			<%-- <%@include file="left_menu_sheduler.jsp"%> --%>
			<%@include file="left_menu_roster.jsp"%>

			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header" style="height: 32px;">
										<ul class="breadcrumb col-md-12-1"
											style="padding: 4px 10px; margin-top: 1px;">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="OPD_Appointment.jsp">Scheduler</a></li>
											<li><a href="OPD_Appointment.jsp">Appointment</a></li>
											<div class="li pull-right">
												<input type="hidden" value="0">
												<button class="btn btn-xs btn-danger" type='button'
													data-toggle="tooltip" data-placement="left" title="Reset "
													value='Save Now' onclick='resetOPDScheduler()' style="margin-left: 9px;">
													<i class="fa fa-refresh"></i>
												</button>
											</div>
											
											<div style="margin-left: 9px;" class="li pull-right" onclick="">
											<span title="Reschedule Patients" data-placement="left" data-toggle="tooltip" class="badge" style="background-color: #FFCC80;cursor:pointer;color:green;"><i class="fa fa-times"></i> <i id="ReschedulePatientsToday">00</i> </span>
										</div>
										<div style="margin-left: 9px;" class="li pull-right" onclick="">
											<span title="Follow Up Patients" data-placement="left" data-toggle="tooltip" class="badge" style="background-color: #ccffcc;cursor:pointer;color:black;"><i class="fa fa-check"></i> <i id="FollowUpPatientsToday">00</i> </span>
										</div>
										<div style="margin-left: 9px;" class="li pull-right" onclick="">
											<span title="Existing Patients" data-placement="left" data-toggle="tooltip" class="badge" style="background-color: green;cursor:pointer;"><i class="fa fa-location-arrow"></i>  <i id="ExistingPatientsToday">00</i> </span>
										</div>
										<div style="margin-left: 9px;" class="li pull-right" onclick="">
											<span title="New Patients" data-placement="left" data-toggle="tooltip" class="badge" style="background-color: red;cursor:pointer;"><i class="fa fa-user"></i>  <i id="NewPatientsToday">00</i> </span>
										</div>
										</ul>
									</div>
								</div>
							</div>
							<!-- /Common -->
							<div class="col-lg-12">
								<div class="panel panel-default">
									<!--Panel Body-->
									<div class="panel-body">
										<!-- PAGE HEADER-->
										<div class="row">
											<div class="tabable">
												<div id="myTabs">
													<ul class="nav nav-tabs" id="tabTodayschedule">
														<li><a href="#tab_Schedule" data-toggle="tab"
															onclick="setQueryType('save'),clearValuesNewPatient()"
															onselect="setQueryType('save'),clearValuesNewPatient()"
															style="color: #555555">Schedule</a></li>
														<li class="active"><a href="#tab_Scheduler"
															data-toggle="tab"
															onclick="setQueryType('update'),changeTabToNew()"
															onselect="setQueryType('update'),changeTabToNew()"
															style="color: #555555"></i>Today's Appointment</a></li>
													</ul>
												</div>
												<div>
													<div class="description"></div>
												</div>
												<!--Module Tabs-->
												<div id="MainTabs" class="tab-content">
													<div class="divide-10"></div>
													<!-- New Patient Modal -->
													<div id="tab_Schedule" class="tab-pane fade in">
														<div class="panel-body">
															<div class="tab-content">
																<!--Tab Appointment-->
																<div class="tab-pane fade in active"
																	id="tab_PatientAppointment">
																	<div class="col-md-6">

																		<div class="controls Remove-Padding"
																			style="margin-left: 20px; width: 400px; height: 50px;">
																			<div style="width: 200px; float: left;">
																				<label class="radio TextFont"
																					style="padding-left: 20px;"> <input
																					name="radios" id="newPatientRadios" value="New"
																					type="radio" onclick="setNewExistingDiv()">New
																					Patient
																				</label>
																			</div>
																			<div style="width: 200px; float: right;">
																				<label label-default="" class="radio TextFont"
																					style="padding-left: 20px;"> <input
																					name="radios" id="existingPatientRadios"
																					value="Existing" type="radio"
																					onclick="setNewExistingDiv()">Existing
																					Patient
																				</label>
																			</div>
																		</div>
																		<div class="" id="existingPatientDiv">
																			<form class="form-horizontal  col-md-12-1">
																				<div class="form-group" id="divPatientSearch">

																					<div class="divide-10"></div>
																					<div class="divide-10"></div>
																					<div class="divide-10"></div>
																					<div class="divide-10"></div>

																					<div class="col-md-12" style="margin-left: -30px;">
																						<label class="col-md-12">Search Patient</label>
																					</div>
																					<div class="divide-10"></div>
																					<div class="col-md-12">
																						<div id="divautocomplete">
																							<!-- <input id="autocomplete" placeholder="-Select-"		
																							style="width: 200px;"
																							 class="typeahead form-control input-SmallText"	
																								onkeyup="autoSuggetionPationNames();"> -->
																							
																							<div id="divbyId" style="margin-left: -16px;">
																								<input name="byId" type="text" id="byId"
																									class="form-control input-SmallText" autocomplete="off"
																									style="width: 200px;" placeholder="Patient Id"
																									onkeyup="setAutoPatientNameOnAppointMent(this.id,'1')" />
																							</div>
																							
																							<div class="divide-10"></div>
																																														
																							<div id="divbyMobile" style="margin-left: -16px;">
																								<input name="byMobile" type="text" id="byMobile"
																									class=" form-control input-SmallText"
																									style="width: 200px;" placeholder="Mobile No"
																									onkeyup="setAutoPatientNameOnAppointMent(this.id,'3')" />
																							</div>
																							
																							<div class="divide-10"></div>

																							<div id="divbyName" style="margin-left: -16px;">
																								<input name="byName" type="text" id="byName"
																									class=" form-control input-SmallText"
																									style="width: 200px;" placeholder="Patient Name"
																									onkeyup="setAutoPatientNameOnAppointMent(this.id,'2')" />
																							</div>

																							<!-- For Description -->

																							<div class="form-group col-md-4-1"
																								style="margin-left: -16px";>
																								<label for="" class="TextFont"
																									style="margin-top: 10px;">Description</label>
																								<textarea rows="5" cols="45"
																									id="new_description">																					
																			</textarea>
																							</div>

																						</div>
																					</div>
																				</div>
																				<div class="divide-10"></div>
																			</form>
																			<form class="form-horizontal  col-md-12-1">
																				<!-- <div class="form-group col-md-4-1">
																			<label for="exampleInputEmail1" class="TextFont">M.R.
																				No </label><input type="text"
																				class="form-control input-SmallText"
																				placeholder="M.R. No">
																		</div> -->
																				<!-- <div class="form-group col-md-4-1">
																			<label for="exampleInputEmail1" class="TextFont">Select
																				Date:</label> <input  name="idNewAppointment"
																				id="idNewAppointment" readonly="readonly"
																				class="form-control clsDatePicker input-SmallText" />
																		</div> -->
																				<div class="divide-10"></div>
																				<div class="divide-10"></div>
																			</form>

																		</div>


																		<div style="float: left;" id="newPatientDiv">
																			<div>
																				<div class="divide-10"></div>
																				<div class="divide-10"></div>
																				<form class="form-horizontal  col-md-12-1">
																					<div class="divide-10"></div>
																					<div class="form-group col-md-2-1"
																						style="width: 70px">
																						<label for="exampleInputEmail1" class="TextFont">Title</label>
																						<select type="text"
																							class="form-control input-SmallText" id="title">
																							<!-- Dynamic Title -->
																						</select>
																					</div>

																					<div class="form-group col-md-4-1">
																						<label for="exampleInputEmail1" class="TextFont">First
																							Name</label><input type="text"
																							class="form-control input-SmallText"
																							placeholder="First Name" id="txtPName"
																							onkeypress="return validateOnlyName(event)"
																							name="txtPName">
																					</div>
																					<div class="form-group col-md-4-1">
																						<label for="exampleInputEmail1" class="TextFont">Last
																							Name</label><input type="text"
																							class="form-control input-SmallText"
																							placeholder="Last Name" id="txtLastName"
																							onkeypress="return validateOnlyName(event)"
																							name="txtLastName">

																					</div>
																				</form>
																				<form class="form-horizontal  col-md-12-1">
																					<div class="form-group col-md-4-1">
																						<label for="exampleInputEmail1" class="TextFont">Mobile
																							No</label><input type="text"
																							class="form-control input-SmallText"
																							placeholder="Mobile" id="patMob" minlength="10" maxlength="10"
																							onkeypress="return validateNumbers(event)">
																					</div>

																				</form>
																				<form class="form-horizontal  col-md-10"
																					style="margin-left: -16px;">
																					<div class="form-group col-md-4-1">
																						<label for="exampleInputEmail1" class="TextFont">Description</label>
																						<textarea rows="5" cols="45" id="details">																					
																			</textarea>
																					</div>
																				</form>
																			</div>

																		</div>

																		<form class="form-horizontal col-md-12-1">
																			<div class="form-group col-md-5-1">
																				<label for="exampleInputEmail1" class="TextFont">Select
																					Date:</label>
																				
																				<!-- <input name="idNewAppointment" type="text"
																					id="idNewAppointment"
																					class="form-control input-SmallText "
																					onclick="displayCalendar(document.getElementById('idNewAppointment'),'dd/mm/yyyy',this);"
																					class="form-group" readonly="readonly"
																					onchange="getTimeSlot('New')" /> -->
																					
																					
																					
																					<input name="idNewAppointment" type="text"
																					id="idNewAppointment"
																					class="form-control input-SmallText "
																					onclick="displayCalendar(document.getElementById('idNewAppointment'),'dd/mm/yyyy',this);"
																					class="form-group" readonly="readonly"
																					onchange="getDoctorTimeListNew('New')" />
																					

																			</div>


																			<div class="form-group col-md-5-1">
																				<label for="exampleInputEmail1" class="TextFont">Specialization</label>
																				<select class="input-SmallText"
																					id="selHosDeptNew" name="selHosDeptNew"  style="width: 100%"
																					onchange="getDoctorBySpecializationSchedulerAppointment('New')">
																					<option value="0">-Select-</option>
																				</select>
																			</div>
																			<div class="form-group col-md-5-1">
																				<label for="exampleInputEmail1" class="TextFont">Select
																					Doctor</label> <select class="input-SmallText"
																					id="selDoctorNameNew" name="selDoctorNameNew" style="width: 100%"
																					onchange="getDoctorTimeListNew('New'),getDocSpecilizationByDoctorId(this.id,'selHosDeptNew')">
																					<option value="0">-Select-</option>
																				</select>
																			</div>
																			<div class="form-group col-md-5-1">

																				<label for="exampleInputEmail1" class="TextFont">Doctor's
																					Timing</label> <select class="input-SmallText form-control"
																					name="selDoctorTimeNew" id="selDoctorTimeNew"
																					onchange="showDoctorAppointmentsNew('calender1')">

																					<option value="0">-Select-</option>
																				</select>
																			</div>


																		</form>
																		<form class="form-horizontal col-md-12-1">
																			<div class="col-md-5-1">
																				<div class="divide-10"></div>
																				<div class="divide-10"></div>
																				<!-- <input type="button"
																				onclick="setAutoAppointmentOfPatient()"
																				value="Auto Appointment"
																				style="height: 20px; width: 100px;"> -->
																			</div>
																		</form>
																	</div>
																	<!-- CALENDAR -->
																	<div class="row">
																		<div class="divide-10"></div>
																		<div class="divide-10"></div>
																		<div class="col-md-6" style="margin-right: -20px;">
																			<div class="box border">
																				<div class="box-title">
																					<h4>
																						<i class="fa fa-calendar"></i>Calendar
																					</h4>
																					<!-- 	<div class="tools">
																					<a href="#box-config" data-toggle="modal"
																						class="config"> <i class="fa fa-cog"></i>
																					</a> <a href="javascript:;" class="reload"> <i
																						class="fa fa-refresh"></i>
																					</a> <a href="javascript:;" class="collapse"> <i
																						class="fa fa-chevron-up"></i>
																					</a> <a href="javascript:;" class="remove"> <i
																						class="fa fa-times"></i>
																					</a>
																				</div> -->
																				</div>
																				<div class="box-body">
																					<div class="row">
																						<div class="col-md-12">
																							<div id='calendar1'></div>
																						</div>
																					</div>
																				</div>

																			</div>
																		</div>
																	</div>
																	<!-- /CALENDAR -->
																</div>
																<!--/Tab Appointment-->


																<!--Tab Type-->
																<div class="tab-pane fade " id="tab_TypeAppointment">
																	<div class="divide-10"></div>
																	<div class="panel panel-default col-md-4"
																		style="border: hidden;">
																		<div class="divide-10"></div>
																		<div class="col-md-12-1 border-right label-primary"
																			style="text-align: center;">
																			<div class="divide-10"></div>
																			<label class="col-md-12-1"><strong>Type:</strong></label>
																		</div>
																		<!--Panel Body-->
																		<div class="panel-body">
																			<div>
																				<label><strong>Type of Visit</strong></label>
																			</div>
																			<select class="form-control input-sm ms-trigger-ico">
																				<option value="one">One</option>
																				<option value="two">Two</option>
																				<option value="three">Three</option>
																				<option value="four">Four</option>
																				<option value="five">Five</option>
																			</select>
																			<div>
																				<label><strong>Description</strong></label>
																			</div>
																			<textarea class="field span12" id="textarea" rows="6"
																				placeholder="Enter a Description"></textarea>
																			<div>
																				<label><strong>Colors</strong></label>
																			</div>
																			<select id="eventsAppointment1"
																				class="colorpicker form-control input-sm ms-trigger-ico"
																				style="background-color: green;">
																				<option style="background-color: green;"
																					value="green">green</option>
																				<option style="background-color: yellow;"
																					value="yellow">yellow</option>
																				<option style="background-color: red;" value="red">red</option>
																				<option style="background-color: orange;"
																					value="orange">orange</option>
																				<option style="background-color: pink;" value="pink">pink</option>
																			</select>
																			<div>
																				<label><strong>Length</strong></label>
																			</div>
																			<select
																				class="form-control input-sm ms-trigger-ico col">
																				<option value="one">One</option>
																				<option value="two">Two</option>
																				<option value="three">Three</option>
																				<option value="four">Four</option>
																				<option value="five">Five</option>
																			</select>
																			<div class="divide-10"></div>
																		</div>
																	</div>
																	<!--/Type-->
																	<!--Status-->
																	<div class="panel panel-default col-md-4"
																		style="border: hidden;">
																		<div class="divide-10"></div>
																		<div class="col-md-12-1 border-right label-primary"
																			style="text-align: center;">
																			<div class="divide-10"></div>
																			<label class="col-md-12"><strong>Status:</strong></label>
																		</div>
																		<div class="panel-body">

																			<div>
																				<label><strong>Status</strong></label>
																			</div>

																			<select class="form-control input-sm ms-trigger-ico">
																				<option value="one">busy</option>
																				<option value="two">Available</option>
																				<option value="three">Three</option>
																				<option value="four">Four</option>
																				<option value="five">Five</option>
																			</select>

																			<div class="divide-10"></div>
																		</div>
																	</div>
																	<!--/Status-->
																	<!--Option-->
																	<div class="panel panel-default col-md-4"
																		style="border: hidden;">
																		<div class="divide-10"></div>
																		<div class="col-md-12 border-right label-primary"
																			style="text-align: center;">
																			<div class="divide-10"></div>
																			<label class="col-md-12"><strong>Option:</strong></label>
																		</div>
																		<!--Panel Body-->
																		<div class="panel-body">
																			<div>
																				<label><strong>Doctor's</strong></label>
																			</div>
																			<div class="list-group" id="DocList">
																				<div class="list-group-item dd-handle">Doctor1</div>
																				<div class="list-group-item dd-handle">Doctor2</div>
																				<div class="list-group-item dd-handle">Doctor3</div>
																				<div class="list-group-item dd-handle">Doctor4</div>
																				<div class="list-group-item dd-handle">Doctor5</div>
																			</div>
																			<div class="divide-10"></div>
																		</div>
																	</div>
																	<!--/Option-->
																</div>
																<!--/Tab Type-->

																<!--Tab Note-->
																<div class="tab-pane fade " id="tab_NoteAppointment">
																	<div class="divide-10"></div>
																	<div class="col-md-12">
																		<div>
																			<label><strong>Note:</strong></label>
																		</div>
																		<div class="divide-10"></div>
																		<div class="divide-10"></div>
																		<div class="col-lg-12-1">
																			<textarea class="field textareawidth col-lg-12"
																				id="textarea" rows="12" placeholder="Enter a Note"></textarea>
																		</div>
																	</div>
																	<div class="divide-10"></div>
																</div>
																<!--/tab_Note-->
															</div>
														</div>

														<div class="modal-footer" style="border: hidden;">
															<div class="divide-10"></div>
															<!-- <button type="button" class="btn btn-default exit"
															data-dismiss="modal">Clear</button> -->
															<!-- <button type="button" class="submitFrom btn btn-primary" onclick="scheduleAppointmentOfPatient('New')">Submit</button> -->
														</div>
														<div class="footer-tools">
															<!-- <span class="go-top"> <i class="fa fa-chevron-up"></i>
															Top
														</span> -->
														</div>
													</div>
													<!-- /New Patient Modal -->
													<div class="tab-pane fade in active" id="tab_Scheduler">
														<!--/Module Tabs-->

														<div class="row">
															<!--Doctor's List-->
															<div class="col-md-2">
																<form class="form-horizontal " action="#">
																	<div class="divide-10"></div>
																	<div class="form-group">
																		<div class="col-md-12">
																			<label class="col-md-12 control-label pull-left">Select
																				Date:</label>
																		</div>
																		<div class="divide-10"></div>
																		<div class="divide-10"></div>
																		<div class="divide-10"></div>
																		<div class="col-md-12">
																			
																			<%-- <input type="text"
																				onclick="displayCalendar(document.getElementById('idTourDateDetails'),'dd/mm/yyyy',this)"
																				id="idTourDateDetails"
																				class="form-control input-SmallText "
																				readonly="readonly" placeholder=" "
																				value='<%=todays_date%>'
																				onchange="getTimeSlot('Previous')"> --%>
																				
																				
																				<input type="text"
																				onclick="displayCalendar(document.getElementById('idTourDateDetails'),'dd/mm/yyyy',this)"
																				id="idTourDateDetails"
																				class="form-control input-SmallText "
																				readonly="readonly" placeholder=" "
																				value='<%=todays_date%>'
																				onchange="getDoctorTimeListNew('Previous')">
																				

																			<!-- <input type="text" class="auto"
																			placeholder="Search Patient Name"> -->
																		</div>

																		<div class="divide-10"></div>
																	</div>

																	<div class="form-group">
																		<div class="col-md-12">
																			<label class="col-md-12 control-label pull-left">Select
																				Speciality:</label>
																		</div>
																		<div class="divide-10"></div>
																		<div class="divide-10"></div>
																		<div class="divide-10"></div>
																		<div class="col-md-12">
																			<select type="text" onchange="getDoctorBySpecializationTodayAppointment()"
																				class="input-SmallText" id="selHosDept" style="width: 100%"
																				class="form-control">
																			</select>
																		</div>


																		<div class="divide-10"></div>
																	</div>
																	<div class="form-group">
																		<div class="col-md-12">
																			<label class="col-md-12 control-label pull-left">Select
																				Doctor's:</label>
																		</div>
																		<div class="divide-10"></div>
																		<div class="divide-10"></div>
																		<div class="divide-10"></div>
																		<div class="col-md-12">
																			<select style="width: 100%"
																				onchange="return getDoctorTimeListNew(),getDocSpecilizationByDoctorId(this.id,'selHosDept')"
																				class="input-SmallText"	id="selDoctorName">
																				<option value="0">-Select-</option>
																			</select>
																		</div>


																		<div class="divide-10"></div>
																	</div>
																	<div class="form-group">
																		<div class="col-md-12">
																			<label class="col-md-12 control-label pull-left">Select
																				Timing:</label>
																		</div>
																		<div class="divide-10"></div>
																		<div class="divide-10"></div>
																		<div class="divide-10"></div>
																		<div class="col-md-12">
																			<select type="text"
																				onchange="showDoctorAppointmentsNew()"
																				class="form-control input-SmallText"
																				id="selDoctorTime" class="form-control">
																				<option value="0">-Select-</option>
																			</select>
																		</div>


																		<div class="divide-10"></div>
																	</div>
																	<div class="divide-20"></div>

																	<div class="form-group">
																		<div class="col-md-12">
																			<label class="col-md-12 control-label pull-left">Colors:</label>
																		</div>
																		<div class="divide-40"></div>
																		<div class="col-md-12">
																			<select id="eventsAppointment"
																				class="colorpicker form-control input-sm ms-trigger-ico"
																				style="background: none repeat scroll 0% 0% green;"
																				onchange="updateColor()">
																				<option style="background-color: green;"
																					value="green">green</option>
																				<option style="background-color: yellow;"
																					value="yellow">yellow</option>
																				<option style="background-color: red;" value="red">red</option>
																				<option style="background-color: orange;"
																					value="orange">orange</option>
																				<option style="background-color: pink;" value="pink">pink</option>
																			</select>
																		</div>


																		<div class="divide-10"></div>
																	</div>


																</form>

															</div>

															<!--Doctor's List-->
															<!-- CALENDAR -->

															<div class="col-md-6">
																<!-- BOX -->

																<div class="box border">
																	<div class="box-title">
																		<h4>
																			<i class="fa fa-calendar"></i>Calendar
																		</h4>
																	</div>
																	<div class="box-body">
																		<div class="row">
																			<div class="col-md-12">
																				<div id='calendar'></div>
																			</div>
																		</div>
																	</div>
																</div>
																<!-- /BOX -->
															</div>

															<!--Patient List-->
															<div class="col-md-4" id="divAllPatientList">
																<div class="panel panel-default">
																	<!--Panel Body-->
																	<div class="panel-body">
																		<!--Tab Panel-->
																		<div class="tabbable">
																			<ul class="nav nav-tabs" id="tabTodayschedule">
																				<li id="idNewTabAppointment" class="active"><a
																					href="#tab_new" data-toggle="tab"
																					onclick="setAppointmentType('New'),getPatientAppointListData('New')"
																					onselect="setAppointmentType('New')"
																					style="color: #555555"></i>New</a></li>
																				<li id="idExistingTabAppointment"><a
																					href="#tab_Existing" data-toggle="tab"
																					onclick="setAppointmentType('Existing'),getPatientAppointListData('Existing')"
																					onselect="setAppointmentType('Existing')"
																					style="color: #555555"></i>Existing</a></li>
																				<li id="idFollowUpTabAppointment"><a
																					href="#tab_FollowUP" data-toggle="tab"
																					onclick="setAppointmentType('FollowUp'),fetchFollowUpNew('New');"
																					onselect="setAppointmentType('FollowUp'),fetchFollowUp('New');"
																					style="color: #555555">Follow Up</a></li>
																				<li id="idRescheduleTabAppointment"><a
																					href="#tab_ReSchedule" data-toggle="tab"
																					onclick="setAppointmentType('ReSchedule'),getPatientAppointListData('ReSchedule');"
																					onselect="setAppointmentType('ReSchedule'),getPatientAppointListData('ReSchedule')"
																					style="color: #555555">Re-Schedule</a></li>
																			</ul>
																			<div class="divide-10"></div>
																			<!--Search Box -->
																			<div class="input-group input-mini" id="patientSearchDivId">
																				<input type="text" style="margin-top: 1px;"
																					class="span6 input-mini search-query col-sm-11"
																					placeholder="Patient  / Doctor  Search" name="patientListSearch"
																					id="patientListSearch" onchange="">
																				<script>
																					var patientListSearch = [];
																					$("#patientListSearch").autocomplete(
																									{
																										source : patientListSearch
																									});
																				</script>
																				<div class="input-group-btn" style="padding: 5px 10px;">
																					<button class="btn btn-xs btn-primary"
																						onclick="searchPatientInfoByPatientNameOrDoctorName('P')" data-toggle="tooltip" data-placement="top" title="Patient Search ">
																						<span class="fa fa-search"></span>
																					</button>
																				</div>
																				<div class="input-group-btn">
																					<button class="btn btn-xs btn-danger"
																						onclick="searchPatientInfoByPatientNameOrDoctorName('D')"  data-toggle="tooltip" data-placement="top" title="Doctor Search ">
																						<span class="fa fa-search"></span>
																					</button>
																				</div>
																			</div>
																			<div class="divide-10"></div>
																			<table id="" cellpadding="0" cellspacing="0"
																				border="0"
																				class="table table-striped table-bordered table-hover">
																				<thead>
																					<tr>
																						<th width="95px;">Patient</th>
																						<th>Doctor</th>
																						<th width="100px;">Visit Time</th>
																					</tr>
																				</thead>
																			</table>
																			<!--Search Box -->
																			<!--Content Tab -->
																			<div class="tab-content" style="max-height: 320px; height: 320px;overflow: auto;">
																				<!--New Patient -->
																				<div class="tab-pane fade in active" id="tab_new">
																					<table id="newPatientList" cellpadding="0"
																						cellspacing="0" border="1"
																						class="table table-striped table-bordered table-hover">
																					</table>
																					<!-- /BOX -->
																				</div>
																				<!--New Patient -->
																				<!--Existing -->
																				<div class="tab-pane fade" id="tab_Existing">
																					<div class="box-body">
																						<table id="existingPatientList" cellpadding="0"
																							cellspacing="0" border="0"
																							class="table table-striped table-bordered table-hover">

																						</table>
																						<!-- /BOX -->
																					</div>
																				</div>

																				<!--Existing -->
																				<!--Follow UP-->
																				<div class="tab-pane fade" id="tab_FollowUP">
																					<div class="box-body">
																						<table id="followUpPatientList" cellpadding="0"
																							cellspacing="0" border="0"
																							class="table table-striped table-bordered table-hover">

																						</table>
																						<!-- /BOX -->
																					</div>
																				</div>
																				<!--Follow UP-->
																				
																				<!--Re Schedule-->
																				<div class="tab-pane fade" id="tab_ReSchedule">
																					<div class="box-body">
																						<table id="reSchedulePatientList" cellpadding="0"
																							cellspacing="0" border="0"
																							class="table table-striped table-bordered table-hover">

																						</table>
																						<!-- /BOX -->
																					</div>
																				</div>
																				<!--Re Schedule-->
																			</div>
																			<!--Tab-->
																		</div>
																		<!--Tab Panel-->
																	</div>
																	<!--Patient List-->

																	<!--Panel Body-->
																</div>
															</div>
															<!--Today's Schedule -->
														</div>
														<!-- /CALENDAR -->

														<!--Change Appointment-->
														<div id="ChangeAppointment" class="modal fade in"
															tabindex="-1" role="dialog"
															aria-labelledby="myModalLabel" aria-hidden="true">
															<div class="modal-dialog">
																<div class="modal-content" class="col-md-9">
																	<div class="modal-header">
																		<div class="box-title">
																			<h4>
																				<i class="fa fa-calendar"></i>Change Appointment
																			</h4>
																		</div>
																	</div>
																	<div class="modal-body">
																		<div class="col-md-12">
																			<form class="form-horizontal  col-md-12-1">
																				<div class="form-group col-md-4-1">
																					<label for="exampleInputEmail1" class="TextFont">M.R.
																						No</label><input type="text"
																						class="form-control input-SmallText"
																						placeholder="M.R. No">
																				</div>
																				<div class="form-group col-md-4-1">
																					<label for="exampleInputEmail1" class="TextFont">First
																						Name</label><input type="text"
																						class="form-control input-SmallText"
																						placeholder="First Name">
																				</div>
																				<div class="form-group col-md-4-1">
																					<label for="exampleInputEmail1" class="TextFont">Last
																						Name</label><input type="text"
																						class="form-control input-SmallText"
																						placeholder="Last Name">

																				</div>
																			</form>
																			<form class="form-horizontal  col-md-12-1">
																				<div class="form-group col-md-9-1">
																					<label for="exampleInputEmail1" class="TextFont">Reason</label><input
																						type="text" class="form-control input-SmallText"
																						placeholder="Reason">

																				</div>
																			</form>
																			<form class="form-horizontal  col-md-12-1">
																				<!--Panel Body-->
																				<div class="form-group col-md-4-1">
																					<label class="checkbox-inline input-SmallText"
																						style="padding-left: 20px;"> <input
																						type="checkbox" id="inlineCheckbox2"
																						value="option2"> Morning
																					</label>
																				</div>
																				<div class="form-group col-md-4-1">
																					<label class="checkbox-inline input-SmallText"
																						style="padding-left: 20px;"> <input
																						type="checkbox" id="inlineCheckbox2"
																						value="option2"> Noon
																					</label>
																				</div>
																				<div class="form-group col-md-4-1">
																					<label class="checkbox-inline input-SmallText"
																						style="padding-left: 20px;"> <input
																						type="checkbox" id="inlineCheckbox2"
																						value="option2"> Evening
																					</label>
																				</div>
																			</form>
																			<form class="form-horizontal  col-md-12-1">
																				<!--Panel Body-->
																				<div class="form-group col-md-4-1">
																					<label class="checkbox-inline input-SmallText"
																						style="padding-left: 20px;"> <input
																						type="checkbox" id="inlineCheckbox2"
																						value="option2"> Notify by SMS
																					</label>
																				</div>
																				<div class="form-group col-md-4-1">
																					<label class="checkbox-inline input-SmallText"
																						style="padding-left: 20px;"> <input
																						type="checkbox" id="inlineCheckbox2"
																						value="option2"> Notify by Mail
																					</label>
																				</div>
																			</form>

																			<form class="form-horizontal col-md-12-1">
																				<div class="form-group col-md-4-1">
																					<label for="exampleInputEmail1" class="TextFont">Specialization</label>
																					<select class="form-control input-SmallText"><option>Select
																						</option></select>
																				</div>
																				<div class="form-group col-md-4-1">
																					<label for="exampleInputEmail1" class="TextFont">Doctor</label>
																					<select class="form-control input-SmallText">
																						<option>Select</option>
																					</select>
																				</div>
																				<div class="form-group col-md-4-1">
																					<label for="exampleInputEmail1" class="TextFont">Temp
																						ID</label><input type="text"
																						class="form-control input-SmallText"
																						placeholder="Temp ID">
																				</div>
																			</form>
																		</div>
																		<!-- /BOX-->
																	</div>
																	<!-- /BODY-->
																	<div class="modal-footer">
																		<button type="button" class="btn btn-default"
																			data-dismiss="modal">Close</button>
																		<button type="button" class="btn btn-primary">Change</button>
																	</div>
																</div>
															</div>
														</div>

														<!--/Change Appointment-->

														<!--Cancel Appointment-->
														<div id="CancelAppointment" class="modal fade in"
															tabindex="-1" role="dialog"
															aria-labelledby="myModalLabel" aria-hidden="true">
															<div class="modal-dialog">
																<div class="modal-content" class="col-md-9">
																	<div class="modal-header">
																		<div class="box-title">
																			<h4>
																				<i class="fa fa-calendar"></i>Cancel Appointment
																			</h4>
																		</div>
																	</div>
																	<div class="modal-body">
																		<div class="col-md-12">
																			<form class="form-horizontal  col-md-12-1">
																				<div class="form-group col-md-4-1">
																					<label for="exampleInputEmail1" class="TextFont">M.R.
																						No</label><input type="text"
																						class="form-control input-SmallText"
																						placeholder="M.R. No">
																				</div>
																				<div class="form-group col-md-4-1">
																					<label for="exampleInputEmail1" class="TextFont">First
																						Name</label><input type="text"
																						class="form-control input-SmallText"
																						placeholder="First Name">
																				</div>
																				<div class="form-group col-md-4-1">
																					<label for="exampleInputEmail1" class="TextFont">Last
																						Name</label><input type="text"
																						class="form-control input-SmallText"
																						placeholder="Last Name">

																				</div>
																			</form>
																			<form class="form-horizontal  col-md-12-1">
																				<div class="form-group col-md-8-1">
																					<label for="exampleInputEmail1" class="TextFont">Reason</label><input
																						type="text" class="form-control input-SmallText"
																						placeholder="Reason">

																				</div>
																				<div class="form-group col-md-4-1">
																					<label for="exampleInputEmail1" class="TextFont">Temp
																						ID</label><input type="text"
																						class="form-control input-SmallText"
																						placeholder="Temp ID">
																				</div>
																			</form>
																			<form class="form-horizontal  col-md-12-1">
																				<!--Panel Body-->
																				<div class="form-group col-md-4-1">
																					<label class="checkbox-inline input-SmallText"
																						style="padding-left: 20px;"> <input
																						type="checkbox" id="inlineCheckbox2"
																						value="option2"> Notify by SMS
																					</label>
																				</div>
																				<div class="form-group col-md-4-1">
																					<label class="checkbox-inline input-SmallText"
																						style="padding-left: 20px;"> <input
																						type="checkbox" id="inlineCheckbox2"
																						value="option2"> Notify by Mail
																					</label>
																				</div>
																			</form>
																		</div>
																		<!-- /BOX-->
																		<div class="modal-footer">
																			<button type="button" class="btn btn-default"
																				data-dismiss="modal">Close</button>
																			<button type="button" class="btn btn-primary">Change</button>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<!--/Cancel Appointment-->

														<!--Time click Popup modal-->
														<div style="display: none;" class="popup modal fade in"
															tabindex="-1" role="dialog"
															aria-labelledby="myModalLabel" aria-hidden="true">
															<div class="modal-dialog">
																<div class="modal-content" class="col-md-9">
																	<div class="modal-header">
																		<div class="box-title">
																			<h4>
																				<i class="fa fa-calendar"></i> Patient Appointment
																			</h4>
																		</div>
																	</div>
																	<div class="modal-body">
																		<div id="myTabs">
																			<ul class="nav nav-tabs" id="tabTodayschedule">
																				<li class="active"><a
																					href="#tab_PatientAppointment1" data-toggle="tab"></i>Appointment</a></li>
																				<!-- <li><a href="#tab_TypeAppointment1"
																				data-toggle="tab">Type</a></li> -->
																				<li><a href="#tab_NoteAppointment1"
																					data-toggle="tab">Note</a></li>
																			</ul>
																		</div>
																		<div id="MainTabs" class="tab-content">

																			<div class="tab-pane fade in active"
																				id="tab_PatientAppointment1">
																				<div class="col-md-12-1">
																					<div class="divide-10"></div>
																					<div class="divide-10"></div>
																					<form class="form-horizontal  col-md-12-1">
																						<div class="form-group col-md-4-1"></div>
																						<div id="">
																							<h5>
																								<label for="exampleInputEmail1">Patient
																									Details </label>
																							</h5>
																							<div class="divide-10"></div>
																							<div class="divide-10"></div>
																							<div class="input-group input-mini"
																								id="patientDetailsDiv"></div>
																						</div>
																					</form>
																					<div class="divide-10"></div>
																					<div class="divide-10"></div>
																					<div class="col-xs-12 col-md-12"
																						style="border: hidden;"></div>
																				</div>
																			</div>

																			<!--Tab Note-->
																			<div class="tab-pane fade " id="tab_NoteAppointment1">
																				<div class="divide-10"></div>
																				<div class="col-md-12">
																					<div>
																						<label><strong>Note:</strong></label>
																					</div>
																					<div class="divide-10"></div>
																					<div class="divide-10"></div>
																					<div class="col-lg-12">
																						<textarea class="field textareawidth col-lg-12"
																							id="textareaNote" rows="12"
																							placeholder="Enter a Note"></textarea>
																					</div>
																				</div>
																			</div>
																			<!--/tab_Note-->
																		</div>
																	</div>
																	<div class="modal-footer">
																		<div class="divide-10"></div>
																		<button type="button" class="btn btn-default exit"
																			data-dismiss="modal">Close</button>
																		<button type="button"
																			class="submitFrom btn btn-primary"
																			onclick="scheduleAppointmentOfPatientNew()">Schedule
																			Appointment</button>
																	</div>
																</div>
															</div>
														</div>
														<!--/Time click Popup modal-->
														
													</div>

												</div>
												<!-- /CONTENT-->
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>

		</section>
		<!-- </div> -->
		<%@include file="Footer.jsp"%>
		<input type="text" style="display: none;" id="txtHiddenFollowUp"
			disabled="disabled" />
		<input type="text" style="display: none;" id="txtHiddenFollowUpBColor"
			disabled="disabled" />
		<div id="divTokenNo" style="display: none; display: none;"></div>
		<div id="divAppo" style="display: none; display: none;"></div>
		<div id="DocNotAvailable" style="display: none; display: none;"></div>
		<input type="hidden" value="" id="hidpatId" disabled="disabled" />
		<input type="hidden" value="" id="trid" disabled="disabled" />

		<div id="patientDetails" style="display: none; display: none;"></div>
		<div id="followUpList" style="display: none; display: none;"></div>
		<div id="reScheduleList" style="display: none; display: none;"></div>
		<input type="hidden" value="" id="appDateTime" disabled="disabled" />
		<input type="hidden" value="" id="appEndTime" disabled="disabled" />
		<input type="hidden" value="save" id="queryType" disabled="disabled" />
		<input type="hidden" value="0" id="appointmentId" disabled="disabled" />
		<input type="hidden" value="New" id="appointmentType" disabled="disabled" />
		<input type="hidden" value="green" id="color" disabled="disabled" />
		<input type="hidden" value="0" id="follow_up_id" disabled="disabled" />
		<input type="hidden" value="0" id="follow_up_patient_id" disabled="disabled" />

		<div id="doctorObject" style="display: none; display: none;"></div>
		<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="isMultiple" name="isMultiple" value="NA">
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>

</body>
</html>