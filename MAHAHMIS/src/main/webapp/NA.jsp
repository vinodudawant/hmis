<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>

<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<title>Doctor's Availability</title>

<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">
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
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>

<!--  For Developers -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>

<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/doctor.js"></script>
<script type="text/javascript" src="js/validate.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<!--Calendar Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>

<script>
	jQuery(document).ready(function() {
		App.setPage("NA"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		});
	});
</script>

<script type="text/javascript">
	onload = function() {
		$("#lina").addClass("anchorActive");
		fetchAllDoctorForNA();
		fetchTimeSlots();
	}
</script>

<script type="text/javascript">
	function setCalander(rowCount) {
		for ( var i = 1; i <= rowCount; i++) {

			$('#date' + i).datePicker({
				clickInput : true

			});
		}
	}
</script>
</head>

<body style="background: white ! important;">
	<section id="page">

		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${sessionScope.userType != null }">

			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->

				<%
					String moduleName = (String) session.getAttribute("moduleName");
						if (moduleName.equals("opd")) {
				%>
				<%@include file="menu_HelpDesk.jsp"%>
				<%
					} else {
				%>
				<%@include file="menu_DoctorDesk.jsp"%>
				<%
					}
				%>
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
												style="padding: 6px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="IPD_OPD_Database.jsp">Help Desk</a></li>
												<li>Doctor's Availability</li>
												<div class="pull-right" id = "NAButton">
													<button class="btn btn-xs btn-success editUserAccess" name="btnSave" onclick="saveNA()" data-toggle="tooltip" data-placement="left" title="Save Details" disabled='disabled'><i class="fa fa-save"></i> </button>
												</div>
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->




								<div class="panel panel-default">
									<div class="panel-body">

										<div class="row">
											<div class="tabable">
											<div id="myTabs">
													<ul class="nav nav-tabs" id="">
														<li class="active"><a href="#tab_DoctorNotAvailable" data-toggle="tab"
															onclick="setAvailableType()"
															onselect="setAvailableType()"
															style="color: #555555">Doctor's Not Available</a></li>
														<li><a href="#tab_DoctorAvailable"
															data-toggle="tab" style="color: #555555"
															onclick="fetchDoctorAvailability()"
															onselect="fetchDoctorAvailability()"
															>Doctor's Available</a></li>
													</ul>
												</div>
												
												<div id="MainTabs" class="tab-content">
												<!-- For Doctor's Not Available -->
													<div id="tab_DoctorNotAvailable" class="tab-pane fade in active">
													<div class="divide-10"></div>
														<strong>Doctor's Not Available Time Slot Details</strong>
														<div
															style="width: 100%; padding-top: 5px; color: #333; background-color: #EEEEEE; padding: 0% 0% 1% 1%;">
															<div style="width: 100%; padding-top: 10px;"
																id="testType">
																<div style="width: 30%; padding-left: 0%;" id="tempSec">
																	<div style="width: 30%; padding-top: 5px;">Doctor
																		Name</div>
																	<div style="width: 60%; padding-top: 5px;">
																		<select style="width: 100%;" name="selDocNm"
																			id="selDocNm">
																		</select>
																	</div>
																	<!-- <div
														style="width: 60%; margin-left: 210px; text-align: left; margin-top: -22px;">
														<input class="save btn btn-xs btn-success" name="btnSave"
															type="button" value="SAVE" id="btnSave"
															onclick="saveNA()" />
													</div> -->
																</div>
															</div>
														</div>
														<div id="divTimeslot"
															style="width: 100%; margin-top: 10px; color: #333; height: 360px;">
														</div>
														<input type="hidden" value='0' id='addRowCount' /><input
															type="hidden" value='0' id='RowCount' />
													</div>
													<!-- Doctor's Not Available End-->
													
													<div id="tab_DoctorAvailable" class="tab-pane fade in">
													<div class="divide-10"></div>
														<strong>Doctor's Available Time Slot Details</strong>
														<div
															style="width: 100%; padding-top: 5px; color: #333; background-color: #EEEEEE; padding: 0% 0% 1% 1%;">
															<div style="width: 100%; padding-top: 10px;">
																
																<div style="width: 30%; padding-left: 0%;" id="tempSec">
																	<div style="width: 30%; padding-top: 5px;">Doctor
																		Name</div>
																	<div style="width: 60%; padding-top: 5px;">
																		<select style="width: 100%;" name="selDocNmForDA"
																			id="selDocNmForDA">
																		</select>
																	</div>
																	<!-- <div
														style="width: 60%; margin-left: 210px; text-align: left; margin-top: -22px;">
														<input class="save btn btn-xs btn-success" name="btnSave"
															type="button" value="SAVE" id="btnSave"
															onclick="saveNA()" />
													</div> -->
																</div>
															</div>
														</div>
														<div id="divTimeslotForDoctor"
															style="width: 100%; margin-top: 10px; color: #333; height: 360px;">
														</div>
														<input type="hidden" value='0' id='addRowCountForDoctor' /><input
															type="hidden" value='0' id='RowCountForDoctor' />
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
			
			<input type="hidden" id="txtHidTimeSlices" value="" />
			<input type="hidden" id="availableType" value="DoctorNotAvailable" />
			<%@include file="Footer.jsp"%>
		
		</c:if>

		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>

		</c:if>
	</section>
</body>
</html>
