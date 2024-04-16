<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<title>Previous Operation Dashboard</title>
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
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />
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
<!-- AUTOSUGGESTION -->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>
<!-- for Developers  -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/operation.js"></script>
<script type="text/javascript" src="js/Dashboard.js"></script>
<!-- /for Developers  -->

<!-- Auto-Suggestion 5/1/2015-->
<!-- ----for table auto complete-------------- -->
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />
<!-- ----for table auto complete-------------- -->
<!--calender Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<!-- CUSTOM SCRIPT -->
<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements

		getOperationName();
		getDocListUnitWise1();
		viewOPerationSummary('OPS',1);

		//fetchPreviousOTPatients("onload");
		$("#OTManagement").addClass("menuActive");
		$("#preOP").addClass("anchorActive");

		$("#patPreTreat").hide();
		setAutoPatientName("byName1", "onload", "OperationSummaryDashboard");
		//setDocNameOT();
		//setDocNameOTPRIVOUS();
		fetchPTNameForOtScheduleODASH();

	});
</script>

<style>
.col-md-2, .col-md-3, .col-sm-2, .col-md-1 {
	padding-left: 15px; 
	padding-right: 15px;
}

.form-select
{
	width: 100%;
	padding: 4px;
	font-size: 10px;
	background: #FFF;
	color: #121212;
}
</style>

</head>
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
				<%
					java.util.Calendar currentDate = java.util.Calendar.getInstance();
				java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
				String todays_date = formatter.format(currentDate.getTime());
				%>
				<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12">

								<!-- Page Date Print Discards-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 6px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
												<li><a href="operationTypeManagement.jsp">OT</a></li>
												<li><a href="OperationSummaryDashboard.jsp">Previous
														Operation Dashboard</a></li>
											</ul>
										</div>
									</div>
								</div>
								<!-- Page Date Print Discards-->
								<div style="font-weight: bold;" class="col-md-12-1">

									<div style="font-weight: bold;" class="col-md-1">Search
										By:</div>
									<div class="form-group col-md-2"style="">
										
											<input type="text"
												onclick="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)"
												id="popup_container2"
												class="form-control input-SmallText col-md-8-1 margin-1"
												readonly="readonly" placeholder="From Date "
												>
											<!-- <input name="operationDate" id="operationDate"
											class="dp-applied"
											onchange="viewOPerationPatient('OperationDashboard')" /> -->
										</div>

										<div class="form-group col-md-2"style="">
											<input type="text"
												onclick="displayCalendar(document.getElementById('popup_container3'),'dd/mm/yyyy',this)"
												id="popup_container3"
												class="form-control input-SmallText col-md-8-1 margin-1"
												readonly="readonly" placeholder="To Date "
												>
											<!-- <input name="operationDate" id="operationDate"
											class="dp-applied"
											onchange="viewOPerationPatient('OperationDashboard')" /> -->
										</div>
									<div style="font-weight: bold;" class="col-md-1">Surgan</div>
									<div class="col-sm-2"
										style="margin-top: -11px;">
										<div class="form-group">

											<div class="">
												<select id="doctorName" value='null' name="doctorNameOT"
													class="form-select">
													<!-- onchange="getDocListUnitWise()"> -->
													</select>
											</div>
										</div>
									</div>
									<div style="font-weight: bold;" class="col-md-1">Surgery
										Type</div>
									<div class="col-sm-2"
										style="margin-top: -11px; margin-left: 20px">
										<div class="form-group">

											<div class="">
												<select id="selOTName" value='null' name="selOTName"
													class="form-select">
													<!-- onchange="fetchPTPG()">
													<option value="0">-Select-</option> -->
												</select>
											</div>
										</div>
									</div>
								</div>
								<div class="divide-20"></div>
								<!-- Page Search Header -->


								<!-- 	<div style="font-weight: bold;" class="col-md-1-1">Patient
									Name</div> -->

								<div class="form-group col-md-2" id="divbyName"
									style="margin-left: 94px">
									<input placeholder="Patient Name" type="text"
										onkeyup="getIPDPatientDetails(this.id,'Emg')"
										class="typeahead form-control input-SmallText" id="byName1"
										name="byName1" style="margin-left: 2px;">
									<!-- <input name="byName" type="text" id="byName"
										class="typeahead form-control input-SmallText"
										onkeypress="return validatealphabetic(event)" placeholder="Patient Name" /> -->
								</div>

								<div style="font-weight: bold; width: 5.94333%; " class="col-md-1">OR</div>

								<!-- <div style="font-weight: bold;" class="col-md-1-1">Patient
									ID</div> -->

								<!-- <div class="form-group col-md-2" style="margin-left: -61px">
									<input id="centerPatientId"
										class="form-group form-control input-SmallText" name="byId1"
										type="text" onkeypress="return validateNumbers(event)"
										placeholder="UHID" /> <input id="byId1"
										class="form-group form-control input-SmallText" name="byId1"
										style="display: none;" type="text"
										onkeypress="return validateNumbers(event)" placeholder="UHID" />
								</div> -->
								<div class="form-group col-md-2"style="margin-left:-41px">
									<input id="byId1"
										class="form-group form-control input-SmallText" name="byId1"
										type="text" onkeypress="return validateNumbers(event)"  placeholder="Patient UHID"/>
								</div>
								<div class="form-group col-md-2">
									<!-- 	<button class="btn btn-xs btn-primary"
									data-toggle="tooltip" data-placement="left" title="Search "
										onclick="operationSummarySearch('OPSummaryDashBoard')">
										<i class = "fa fa-search"></i>
										</button> -->
									<button class="btn btn-xs btn-primary" data-toggle="tooltip"
										data-placement="left" title="Search "
										onclick="searchotpatient()">
										<i class="fa fa-search"></i>
									</button>
								</div>
								<!-- Page Search Header -->


								<div class="divide-40"></div>
								<div class="panel panel-default">
									<div class="panel-body">

										<!-- Start Table Gui -->

										<div class='col-sm-12-1'>
											<table class='table' style='width: 98.8%; margin-top: 10px;'>
												<thead>
													<tr>
														<th class='col-md-1-1 center' style='height: 21.5px;'><label
															class='TextFont'>#</label></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><label
															class='TextFont' id="thCenterPatientId">Patient
																ID</label></th>
														<th class='col-md-2-1' style='height: 21.5px;'><label
															class='TextFont'>Patient Name</label></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><label
															class='TextFont'>Operation Date</label></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><label
															class='TextFont'>View</label></th>
													</tr>
												</thead>
												<tbody id="operationDataBody">
												</tbody>
											</table>

										</div>


										<!-- from operation.js <var containerviewAssessTemplate> -->
										<div id="container" class="col-md-12-1"
											style="margin-top: -22px; border: 1px solid #ddd; height: 600px; overflow-y: scroll;"></div>

										<div class="pull-right">
											<ul class="pagination" id="pagination">

											</ul>
										</div>
										<div class="col-md-4 col-md-offset-8">
											<div class="pull-right">
												<ul class="pagination pagination-blue margin-bottom-10"
													id="totalNumberOfPagesPagination">

												</ul>
											</div>
										</div>
										<!-- End Table Gui -->

									</div>
									<!-- End class="panel-body" -->
								</div>
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
			<input type="hidden" id="tomId"
				value="<%=request.getParameter("tomId")%>" />
			<div id="divPatId" style="display: none;"><%=request.getParameter("myObj")%></div>
		</c:if>
	</section>
	<!-- JAVASCRIPTS -->

	<script type="text/javascript"
		src="ehat-design/js/select2/select2.min.js"></script>
	<!-- TYPEHEAD -->
	<script type="text/javascript"
		src="ehat-design/js/typeahead/typeahead.min.js"></script>
	<!-- UNIFORM -->
	<script type="text/javascript"
		src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
	<!-- DATA TABLES -->

	<!-- COOKIE -->

	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>
	<!-- <script>
		jQuery(document).ready(function() {		
			App.setPage("wizards_validations");  //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});		
			
		});
	</script> -->

	<!-- /JAVASCRIPTS -->
</body>
</html>