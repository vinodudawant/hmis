<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Pre-Anaesthetic Assessment Dashboard</title>
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

<!-- <script type="text/javascript"
	src="js/bootstrap-switch/bootstrap-switch.min.js"></script>
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-switch/bootstrap-switch.min.css" />

<script type="text/javascript" src="RichTextBox/tinymce/tinymce.min.js"></script>
<script type="text/javascript"
	src="RichTextBox/tinymce/jquery.tinymce.min.js"></script>
<script type="text/javascript"
	src="RichTextBox/tinymce/themes/modern/theme.min.js"></script>
 -->
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

<!-- Auto-Suggestion 17/01/2017-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

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
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		})

	});
</script>

<script type="text/javascript">
	onload = function() {

		$("#OTManagement").addClass("menuActive");
		$("#assessOP").addClass("anchorActive");
		viewAnaestheticAssess("OperationDashboard");
			//var todays_date = $("#todays_date").val();
			//var arrDate = todays_date.split("-");
			//var date = arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];
		// $("#operationDate").val(date);

		//viewOPerationPatient("OTAnaesthetic");
		//viewOPerationPatient("OTDashboard");
		
						
		// setAutoPatientName("byName", "onload", "OperationDashboard");
	}
	/*  $(window).ready(function() {

		$('#operationDate').datePicker({
			clickInput : true
		});
	}); */
</script>
</head>
<%
	Calendar currentDate = Calendar.getInstance();
	SimpleDateFormat dateFormatter = new SimpleDateFormat("dd/MM/yyyy");
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
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="operationTypeManagement.jsp">OT</a></li>
												<li><a href="OTAnaesthetic.jsp">PreAnaesthetic
														Assessment</a></li>
											</ul>
										</div>
									</div>
								</div>
								<!-- Page Date Print Discards-->


								<!-- Page Search Header -->
								<div style="font-weight: bold;" class="col-md-1-1">Search
									By:</div>

								<div style="font-weight: bold;" class="col-md-1-1">Patient
									Name</div>

								<div class="form-group col-md-2" id="divbyName">
									<input name="byName" type="text" id="byName"
										class="typeahead form-control input-SmallText "
										onkeypress="return validatealphabetic(event)" />
								</div>

								<div style="font-weight: bold;" class="col-md-1-1">OR</div>

								<div style="font-weight: bold;" class="col-md-1-1" id="lblCenterPatientId">Patient
									ID</div>

								<div class="form-group col-md-2">
									<input id="byId"
										class="form-group form-control input-SmallText" name="byId"
										type="text" onkeypress="return validateNumbers(event)" />
								</div>
								<div class="form-group col-md-2-1">
									<button class="btn btn-xs btn-primary" id="byName" name = ""
									data-toggle="tooltip" data-placement="right" title="Search "
										onclick="viewAnaestheticAssess('Search')">
										<i class = "fa fa-search"></i>
										</button>
								</div>
								<!-- Page Search Header -->


								<div class="divide-20"></div>
								<div class="panel panel-default">
									<div class="panel-body">

										<div class="divide-10"></div>

										<div style="font-weight: bold;" class="col-md-1-1">Operation
											Date</div>

										<div class="form-group col-md-2-1">
											<input style="width: 100%;" name="popup_container2"
												value='<%=todays_date%>' id="popup_container2"
												class="dp-applied form-control input-SmallText"
												readonly="readonly"
												onchange="viewAnaestheticAssess('OperationDashboard')"
												onclick="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)" />
										</div>

										<!-- Start Table Gui -->

										<div class='col-sm-12-1'>
											<table class='table' style='margin-top: 10px;'>
												<thead>
													<tr>
														<th class='col-md-1-1 center' style='height: 21.5px;'><label
															class='TextFont center'>#</label></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><label
															class='TextFont' id="thCenterPatientId">Patient ID</label></th>
														<th class='col-md-2-1' style='height: 21.5px;'><label
															class='TextFont'>Patient Name</label></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><label
															class='TextFont'>Operation Date</label></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><label
															class='TextFont'>Pre-Anaesthetic Assessment</label></th>
													<!-- 	<th class='col-md-1-1 center' style='height: 21.5px;'><label
															class='TextFont'>Conduct Of Anaesthesia </label></th> -->
													</tr>
												</thead>
											</table>
										</div>


										<!-- from operation.js <var containerviewAssessTemplate> -->
										<div id="container" class="col-md-12-1"></div>
										<input id="pageName" type="hidden" value="OperationDashboard">
										<input type="hidden" value="<%=todays_date%>" id="operationDate">
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
		</c:if>
	</section>
</body>
</html>










<%-- 





<body>
	<c:if test="${  sessionScope.userType != null }">
		<div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div>
		<input type="hidden" id="todays_date" value="<%=todays_date%>" />
		<div id="outer">
			<!-- <div id="top18">
				<div style="width: 100%;">
					<div style="width: 60%;">
						<img src="images/logo.jpg" />
					</div>

				</div>
			</div> -->
			<%@include file="Menu_Header.jsp"%>
			<div id="right" style="background: white; margin-top: 17px;">
			<div id="leftContent" class="sidebar"
					style="height: 100%; margin-top: 1px; margin-bottom: 5px;">
				<%@include file="left_menu_otmanagement.jsp"%>
				</div>
				<div id="rightContent" style="height: 100%;">
				
							<!-- Common -->
			<!-- DASHBOARD CONTENT -->
			<div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div>
			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->

				<%@include file="left_menu_otmanagement.jsp"%>


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
												<li>Date : 11 Aug 2014</li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="IPD_OPD_Database.jsp">Help Desk</a></li>
												<li>View Database</li>
												<li><i class="fa fa-question"></i></li>
												<li><i class="fa fa-exclamation-circle"
													style="color: red;">12</i></li>
												<li class="pull-right">
													<button class="btn btn-xs btn-success">Save</button>
													<button class="btn btn-xs btn-warning">Print</button>
													<button class="btn btn-xs btn-danger">Discard</button>
												</li>
											</ul>


										</div>
									</div>
								</div>
								<!-- /Common -->
								
								
					<div style="width: 100%; height: 1%; background-color: #85a7d4;"></div>
					<div style="width: 100%; height: 99%;">
						<div id="rightContActual">
							<div style="width: 96%; padding: 2%;">
								<div style="width: 10%;">Search By:</div>
								<div style="width: 8%;">Patient Name</div>
								<div style="width: 12%; padding-left: 2%;">
									<input style="width: 100%;" name="byName" type="text"  onchange="setSplitId()" class="auto"
										id="byName" onkeypress="return validatealphabetic(event)" />
										
									<script type="text/javascript">
									$(".auto")
											.autocomplete(
													"AutoSuggetionServlet?auto=ManageOperationPatient")
						</script>		
								</div>
								<div style="width: 2%; padding-left: 4%;">or</div>
								<div style="width: 7%; padding-left: 2%;">
									<span style="width: 3%;">Patient ID</span>
								</div>
								<div style="width: 12%;">
									<input style="width: 100%;" name="byId" type="text" id="byId"
										onkeypress="return validateNumbers(event)" />
								</div>
								<div style="width: 12%; text-align: center;">
									<input type="button" value="search" class="btn btn-xs btn-primary" class='edit'
										onclick=" viewAnaestheticAssess('Search')" />
								</div>
							</div>

							<div style="width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;">

								<div style="width: 40%;">
									<div style="width: 25%; padding-right: 4%; padding-left: 2%; color: white;">Operation Date</div>
									<div style="width: 30%;">
										<input style="width: 100%;" name="operationDate"
											id="operationDate" class="dp-applied" value=""
											onchange="viewAnaestheticAssess('OperationDashboard')" />
									</div>
								</div>
								
								
								<div style="width: 100%; padding-top: 1%;">
									<div
										style="width: 3%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;">#</div>
									<div
										style="width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;">Patient
										ID.</div>
									<div
										style="width: 25%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;">Patient
										Name</div>
									<div
										style="width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;">Operation
										Date</div>

									<div
										style="width: 16%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;">Pre-Anaesthetic Assessment</div>
								
								<div
										style="width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;">Conduct Of Anaesthesia</div>
								</div>
							</div>

							<div
								style="width: 99.80%; height: 75%; overflow-y: scroll; border: 1px solid #436a9d;"
								id="container"></div>


						</div>
					</div>
				</div>
			</div>
			</div>
			</div>
			
			<%@include file="Footer.jsp"%>
			<div id="opObject" style="display: none;"></div>
		</div>
	</c:if>

	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>

</body>
</html>
 --%>

