<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Roster Management</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<meta name="viewport" content="user-scalable=no, width=device-width" />

<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="css/bootstrap-chosen.css" />


<!-- ----for table auto complete-------------- -->
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />


<!-- =-=-=-=-=-=-=-=Multi Select  Touheed=-=-=-=-=-=-=-=- -->
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

<!-- STYLESHEETS -->

<link href="ehat-design/font-awesome/css/font-awesome.min.css"
	rel="stylesheet">



<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- FULL CALENDAR -->
<link rel="stylesheet" type="text/css"
	href="js/fullcalendar/fullcalendar.min.css" />

<!--calender Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>

<!--TIMEPEACKER -->
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>
<style type="text/css">
.custom-date-style {
	background-color: red !important;
}
</style>
<!--TIMEPEACKER -->


<script src="jquery/jquery-2.1.1.js"></script>
<!-- <script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script> -->
<!-- JQUERY UI-->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>

<!-- DATE RANGE PICKER -->

<!-- bootstrap datepicker -->
<link rel="stylesheet" href="ehat-design/datepicker/datepicker3.css">

<!-- SELECT2 -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/uniform/css/uniform.default.min.css" />
<!-- WIZARD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-wizard/wizard.css" />
<!-- FONTS -->
<!-- <link
	href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700'
	rel='stylesheet' type='text/css'> -->
<link href='ehat-design/css/family.css' rel='stylesheet' type='text/css'>
<script type="text/javascript" src="js/unit_master.js"></script>

<!-- Touheed code for Drag and Drop with sorting Date  14-Dec-2015-->
<script src='js/jquery.sortable.js'></script>
<!-- Touheed code for Drag and Drop with sorting -->
<!-- -=-=-=-=-=-=-=-=-=-Multi Select Touheed-=-=-=-=-=-=-=--=- -->

<!-- /for Developers  -->
<script src="js/chosen.jquery.js"></script>
<!-- Auto-Suggestion 7/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script src="js/demoConfiguration2.js"></script>
<script src="js/yearWiseConfiguration.js"></script>

<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/consultation_charge.js"></script>
<script type="text/javascript" src="js/roster_management.js"></script>

<script type="text/javascript">
	onload = function() {
		getRosterList();
		//getRosterScheduleList();
	};
</script>
<script type="text/javascript">
	$(document).ready(function() {
		App.setPage("wizards_validations");
		App.init();
		//FormWizard.init();
	});
</script>

<script type="text/javascript">
	$(function() {

		$("#myform :input").tooltip({

			// place tooltip on the right edge
			position : "center right",

			// a little tweaking of the position
			offset : [ -2, 10 ],

			// use the built-in fadeIn/fadeOut effect
			effect : "fade",

			// custom opacity setting
			opacity : 0.7

		});

	});
</script>
<style>
#pleaseWait {
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 10000000;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	background-color: #272424;
	opacity: 0.7;
}
</style>
</head>
<body style="background: white ! important;">
	<section id="page">
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${sessionScope.userType != null }">


				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				
				</header>
				<!--/HEADER -->

				<%@include file="left_menu_roster.jsp"%>
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

							<div id="content" class="col-lg-12">
								<!-- PAGE HEADER-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>	
											<li><a href="ehat_roster_dashboard.jsp"> Roster Management</a></li>
											<li> Scheduler Roster Master</li>
											<div class="pull-right">
												<button class="btn btn-xs btn-success editUserAccess"
													onclick="saveRosterSchedule()" title=""
													data-placement="left" data-toggle="tooltip"
													data-original-title="Save Hospital Information">
													<i class="fa fa-save"></i>
												</button>
											</div>
										</ul>

										</div>
										
									<div class="col-sm-1">
										<label for="inlineFold" class="control-label">Search
											By :</label>
									</div>
									<div class='col-sm-2'> <label for="inlineFold" class="control-label">Schedule Name 
											</label></div>
									<div class='col-sm-3' style="margin-left:-11px">
										<select id="rosterList" class="col-md-3-1"
											name="rosterList" style="margin-left: 0%;margin-top: -15px;width:200px" onchange="getrosterListbyId()" ></select>
									</div>
									</div>
								</div>
								<!-- /Common -->

								<!-- <div class="divide-20"></div> -->
								<div class="panel panel-default" >
									
								
								
								
								
								
								
								<!-- -------------- -->
								
								<div class="panel-body">
										<div class="col-md-12-1">
											<div class="col-md-6-1" style="height: 450px; margin-top: 0%">

												<input id="tempMasterId" class="hidden">

												<div style='height: 100%; border: 1px solid #ddd;'>
													<div style='padding-top: 0%; padding-left: 8%'>
														<div>
															<h3 id='title'>Scheduler Roster Master</h3>
														</div>
														<!-- <div class='divide-20'></div> -->
														
														<div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 13px;'>
															<div class='divide-30'></div>
															<label class='TextFont col-md-4-1' style="margin-top:4px;">First day of the schedule<b
																style='color: red; padding-left: 3px;'>*</b></label> 
															
                                                    <input name="scheduledate" type="text"
															id="scheduledate" class="form-control "
															style="width: 58%  "
															onclick="displayCalendar(document.getElementById('scheduledate'),'dd-mm-yyyy',this)"
															class="form-group"
															onchange="validateDateRosterScheduler()"
															readonly="readonly" 
															value='<%=todays_date%>' />  
															
															
														<!-- <input id="scheduledate" type="text"
															class="form-control input-SmallText" style="width: 58%"
															onclick="displayCalendar(document.getElementById('scheduledate'),'yyyy-mm-dd',this)"
															class="form-group"
															onchange=""
															readonly="readonly"/>  
														 -->
															<input id="schedulerId" type="hidden" value="0"   />
													</div>
													
													<div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 13px;'>
															<div class='divide-20'></div>
															<label class='TextFont col-md-4-1' style="margin-top:4px;">Name  <b
																style='color: red; padding-left: 3px;'>*</b></label> 
														<input id="name" class="form-control " type="text" required="true"
															style="width: 58%; height: 30px; font-size: 10px;"placeholder="Name">
															<input id="schdeulername" type="hidden" value="0"   />
													</div>
													
													<!-- 	<div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 13px;'>
															<div class='divide-20'></div>
															<label class='TextFont col-md-4-1' style="margin-top:2px;">This schedule is a template<b
																style='color: red; padding-left: 3px;'>*</b></label>
																
																<input type="checkbox" name="templateid"
															id="templateid" checked="checked"
															style="margin-left: 0px">
													</div> -->
														
														<div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 13px;'>
															<div class='divide-20'></div>
															<label class='TextFont col-md-4-1' style="margin-top:2px;">Max Duration<b
																style='color: red; padding-left: 3px;'>*</b></label> 	
																<div class="form-group">
           									
              						  
              						  
						              						  <select class="form-control" id="duration" name="duration"
																	style="width: 58%;" onchange="setDays();">
																	<option value="0">Select</option>
																	<option value="1">1 Week(s)</option>
																	<option value="2">2 Week(s)</option>
																	<option value="3">3 Week(s)</option>
																	<option value="4">4 Week(s)</option>
																	<option value="5">5 Week(s)</option>
																	<option value="6">29 days</option>
																	<option value="7">30 days</option>
																	<option value="8">31 days</option>
																	<option value="9">1 day</option>
																</select>
              						  
              						  
           							 </div>
														</div>
														
														
													</div>
												</div>

											</div>
											
											<div class="divide-10"></div>
											<div class="col-md-6-1">
											
											<table class='table table-bordered table-condensed cf'>
														<tbody >
														
														<thead>
															<tr>
															<th class="col-md-1 center"><h4 style="center">Added Following Days to Schedule</h4></th>
															
															</tr></thead>

														</tbody>
														
													</table>
											</div>
											
											<div class="col-md-6-1" style="height: 396px; margin-top: 0%; overflow-y:scroll;">
											
											<table class='table table-bordered table-condensed cf'>
														<!-- <tbody >
														
														<thead>
															<tr>
															<th class="col-md-1 center"><h4 style="center">Add Following days to Schedule</h4></th>
															
															</tr></thead>

														</tbody> -->
														
														
														<tbody id="setDatetime" style="overflow-y: scroll;" >
														
														

														</tbody>
													</table>
											</div>
											
											
											<div class="divide-10"></div>
											
										</div>
									</div>
								
								

							</div>
						</div>
					</div>
				</div>
			</div>
		</c:if>
	</section>
	<%@include file="Footer.jsp"%>

	<!-- SLIMSCROLL -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<script type="text/javascript"
		src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	<!-- BLOCK UI -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
	<!-- SELECT2 -->
	<script type="text/javascript"
		src="ehat-design/js/select2/select2.min.js"></script>
	<!-- UNIFORM -->
	<script type="text/javascript"
		src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
	<!-- WIZARD -->
	<script
		src="ehat-design/js/bootstrap-wizard/jquery.bootstrap.wizard.min.js"></script>
	<!-- WIZARD -->
	<script src="ehat-design/js/jquery-validate/jquery.validate.min.js"></script>
	<script src="ehat-design/js/jquery-validate/additional-methods.min.js"></script>
	<script type="text/javascript" src="js/validate.js"></script>
	<!-- BOOTBOX -->
	<script type="text/javascript"
		src="ehat-design/js/bootbox/bootbox.min.js"></script>
	<!-- COOKIE -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>
	<script src="ehat-design/js/bootstrap-wizard/form-wizard.min.js"></script>
	
</body>
</html>