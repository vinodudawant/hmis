<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<title>Pre-Operation Dashboard</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">

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


<!-- for Developers  -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/operation.js"></script>
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<!--calender Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<!-- CUSTOM SCRIPT -->


<script>
	jQuery(document).ready(function() {
		App.setPage("OTDashboard"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<script type="text/javascript">
	onload = function() {
		//	$("#OTManagement").addClass("menuActive");
		//	$("#manageOP").addClass("anchorActive");

		var todays_date = $("#todays_date").val();
		var arrDate = todays_date.split("-");
		var date = arrDate[0] + "/" + arrDate[1] + "/" + arrDate[2];
		$("#popup_container2").val(date);
		viewOPerationPatient("OTSchedule");
	}
</script>

<%
	Calendar currentDate = Calendar.getInstance();
	SimpleDateFormat dateFormatter = new SimpleDateFormat("dd-MM-yyyy");
	String todays_date = dateFormatter.format(currentDate.getTime());
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
												style="padding: 6px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
												<li><a href="operationTypeManagement.jsp">OT</a></li>
												<li><a href="OTDashboard.jsp">Pre-Operation</a></li>
											</ul>
										</div>
									</div>
								</div>
								<!-- Page Date Print Discards-->


								<!-- Page Search Header -->
								<!-- <div style="font-weight: bold;" class="col-md-1-1">Search
									By:</div>

								<div style="font-weight: bold;" class="col-md-1-1">Patient
									Name</div>

								<div class="form-group col-md-2-1">
									<input name="byName" type="text" id="byName"
										class="form-control input-SmallText " onchange="setSplitId()"
										class="form-group"
										onkeypress="return validatealphabetic(event)" />

									<script type="text/javascript">
										$(".auto")
												.autocomplete(
														"AutoSuggetionServlet?auto=ManageOperationPatient")
									</script>
								</div>

								<div style="font-weight: bold;" class="col-md-1-1">OR</div>

								<div style="font-weight: bold;" class="col-md-1-1">Patient
									ID</div>

								<div class="form-group col-md-2-1">
									<input id="byId" class="form-group" name="byId" type="text"
										class="form-control input-SmallText "
										onkeypress="return validateNumbers(event)" />
								</div>
								<div class="form-group col-md-2-1">
									<button class="btn btn-xs btn-primary"
										onclick="viewOPerationPatient('OTSchedule')">Search</button>
								</div> -->
								<!-- Page Search Header -->


								<div class="divide-20"></div>
								<div class="panel panel-default">
									<div class="panel-body">

										<div class="divide-10"></div>

										<div style="font-weight: bold;" class="col-md-1-1">Operation
											Date</div>

										<div class="form-group col-md-2-1">
											<input type="text"
												onclick="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)"
												id="popup_container2"
												class="form-control input-SmallText col-md-8-1 margin-1"
												readonly="readonly" placeholder=" " value='<%=todays_date%>'
												onchange="viewOPerationPatient('OTSchedule')">
											<!-- <input name="operationDate" id="idTourDateDetails"
											class="dp-applied"
											onchange="viewOPerationPatient('OTSchedule')" /> -->
										</div>

										<div style="font-weight: bold;" class="col-md-1-1">&nbsp</div>
										
										<div class="form-group col-md-2-1">
											<button class="btn btn-xs btn-success"
												onclick="addNewOperation()">Add New Operation</button>
										</div>
										<div class='col-sm-12-1'>
											<table class='table' style='margin-top: 10px;'>
												<thead>
													<tr>
														<th class='col-md-1-1 center' style='height: 21.5px;'><label
															class='TextFont'>#</label></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><label
															class='TextFont'id="thCenterPatientId">Patient ID</label></th>
														<th class='col-md-4-1' style='height: 21.5px;'><label
															class='TextFont'>Patient Name</label></th>
														<th class='col-md-2-1 center' style='height: 21.5px;'><label
															class='TextFont'>Operation Date</label></th>
														<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 3%'><label
															class='TextFont'>Edit</label></th>
														<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 3%'><label
															class='TextFont'>Action</label></th>	
														<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 3%'><label
															class='TextFont'>Delete</label></th>
															<!-- Jitendra 23march2019 -->
														<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 3%'><label
															class='TextFont'>Print</label></th>
													</tr>
												</thead>
											</table>
										</div>

										<!-- from operation.js <var containerviewAssessTemplate> -->
										<div id="container" class="col-md-12-1"></div>

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
			<div id="opObject" style="display: none;"></div>
			<input type="hidden" id="OTdata" value="" />
			<input type="hidden" id="todays_date" value="<%=todays_date%>" />
			<input type="hidden" id="pageName" value="OTDashboard" />
			<input type="hidden" id="pid" value="0" />
			<input type="hidden" id="tid" value="0" />
		</c:if>
	</section>
</body>
</html>
