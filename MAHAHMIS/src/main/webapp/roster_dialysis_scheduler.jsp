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
<title>Dialysis Scheduler</title>

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
<script type="text/javascript"
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<!-- <script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script> -->
<!-- <script type="text/javascript" src="js/jquery-ui.js"></script> -->
<script type="text/javascript" src="js/js.js"></script>

<script type="text/javascript" src="js/ehat_dialysis.js"></script>



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
<script src="js/dialysisCalender.js"></script>

<!-- /JAVASCRIPTS -->
</head>


<script type="text/javascript">

jQuery(document).ready(function() {
	App.setPage("calendar2"); 
	App.init(); 
	$(function() {
		$('[data-toggle="tooltip"]').tooltip();
		getwardtypeName();
		getpatinetName();
	});

});

	
</script>


<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd-MM-yyyy");
	String todays_date = formatter.format(currentDate.getTime());
	
	String patinetId =request.getParameter("patientId");
%>

<body>

	<c:if test="${ sessionScope.userType != null }">
		<input type="hidden" id="todays_date" value="<%=todays_date%>" />
		
		<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				
				</header>
		<!--/HEADER -->

		<section id="page">
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
											<div class="pull-right">
											<button class="btn btn-xs btn-success"
														data-toggle="tooltip" data-placement="left"
														title="Save Dailysis Schedule "
														onclick="saveDialysisScheduler()">
														<i class="fa fa-save"></i>
											</button>
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

												<div id="MainTabs" class="tab-content">
													<div class="divide-10"></div>

													<div class="panel-body">
														<div class="tab-content">


															<div class="col-md-6"
																style="margin-right: -20px; margin-top: 10px">
																<div class="box border">
																	<div class="box-title">
																		<h4>
																			<i class="fa fa-calendar"></i>Dialysis Scheduler
																		</h4>
																		<div class="box-body">
																			<div class="row">

																				<div class="col-md-12"
																					style="margin-top: 16px; margin-left: 42px">


																					<form class="form-horizontal  col-md-12-1">
																						<div class="divide-10"></div>

																						<div class="form-group col-md-4-1">
																							<label for="exampleInputEmail1" class="TextFont">Select
																								Date:</label> 
																								<input name="schedulerDate" type="text" id="schedulerDate"
																								class="form-control input-SmallText " onclick="displayCalendar(document.getElementById('schedulerDate'),'dd-mm-yyyy',this)"
																								class="form-group" onchange="validateDateScheduler()" readonly="readonly" value="<%=todays_date%>" />

																						</div>
																						<div class="form-group col-md-3-1"
																							style="margin-top: -11px; margin-left: 16px">
																							<label for="exampleInputEmail1" class="TextFont">Select
																								Dialysis ward Type</label> <select
																								class="form-control input-SmallText" id="wardid"
																								name="wardid"
																								onchange="getwardtypeNameofBedNo()">
																								<option value="0">-Select-</option>
																							</select>
																						</div>

																						<div class="form-group col-md-3-1"
																							style="margin-top: -11px; margin-left: 16px">
																							<label for="exampleInputEmail1" class="TextFont">Select
																								Dialysis Chair</label> <select
																								class="form-control input-SmallText"
																								id="bedid" name="bedid" onchange="getPatientNameListAlreadyPresent()">
																								<option value="0">-Select-</option>
																							</select>
																						</div>
																						
																		 
																					</form>



																					<form class="form-horizontal  col-md-12-1">
																						<div class="divide-10"></div>
																						

																						<div class="form-group col-md-4-1">
																							<label for="exampleInputEmail1" class="TextFont">Patient
																								Name</label><input type="text"
																								autocomplete="off" class="typeahead form-control input-SmallText "
																								onkeyup="autoSuggestionForPatientNameDialysis(this.id);"
																								name="patinetName" id="patinetName">
																						<input type="hidden" value="" id="patientId" disabled="disabled" />
																						<input type="hidden" id="dialysisSchedulerId"  value="0" disabled="disabled" />
																								
																						</div>

																						<div class="form-group col-md-4-1" style="margin-left:40px">
																							<label for="exampleInputEmail1" class="TextFont">Mobile
																								No</label><input type="text"
																								class="form-control input-SmallText"
																								placeholder="Mobile" id="patMob" minlength="10"
																								maxlength="10"
																								onkeypress="return validateNumbers(event)">
																						</div>

																					</form>




																					<form class="form-horizontal  col-md-12-1">

																						

																					</form>
																					<form class="form-horizontal  col-md-10"
																						style="margin-left: -16px;">
																						<div class="form-group col-md-4-1">
																							<label for="exampleInputEmail1" class="TextFont">Description</label>
																							 <textarea class="form-control" id="details" rows="3"></textarea>
																							
																						</div>
																					</form>


																				</div>

																			</div>
																		</div>
																	</div>
																</div>
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

																		</div>
																		<div class="box-body">
																			<div class="row">
																				<div class="col-md-12">
																					<div id='calendar11'></div>
																				</div>
																			</div>
																		</div>

																	</div>
																</div>
															</div>
															<!-- /CALENDAR -->
														</div>
														<!--/Tab Appointment-->
													</div>

	                                                                    


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

		</section>
		<!-- </div> -->
		<%@include file="Footer.jsp"%>	
		<input type="hidden" value="" id="startTime" disabled="disabled" />
		<input type="hidden" value="" id="endTime" disabled="disabled" />
        <input id="color" type="hidden" value="green">
        <input type="hidden" value="<%=patinetId%>" id="patientId1" disabled="disabled" />
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>

</body>
</html>