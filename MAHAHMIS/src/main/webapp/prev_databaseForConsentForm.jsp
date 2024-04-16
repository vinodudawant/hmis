<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<title>Previous IPD Consent Form Dashboard</title>

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
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/bill.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/Dashboard.js"></script>
<script type="text/javascript" src="js/ipdTreatment.js"></script>
<script type="text/javascript" src="js/patient.js"></script>

<!-- /for Developers  -->

<!-- Auto-Suggestion 6/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("prev_databaseForConsentForm"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<script type="text/javascript">
	onload = function() {
		$("#consentform").addClass("anchorActive");
		featchPreviousICFpat("onload");
		//setAutoPatientName("byName", "onload", "prev_databaseForConsentForm");
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
					<%@include file="Menu_Header_Nobel.jsp"%>
				</header>
				<!--/HEADER -->
				<%
					String moduleName = (String) session.getAttribute("moduleName");
						if (moduleName.equals("OTSchedule")) {
				%>
				<%@include file="left_menu_otmanagement.jsp"%>
				<%
					} else {
				%>
				<%@include file="menu_HelpDesk.jsp"%>
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
										<div class="page-header" style="height: 30px;">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
												<li><a href="">Consent Forms</a></li>
												<li><a href="prev_databaseForConsentForm.jsp">Previous</a></li>
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->

								<div class="col-md-12-1">
									<div style="font-weight: bold;" class="col-md-1">Search
										By:</div>
									<div class="col-md-1-1">
										<label class="TextFont"
											style="margin-left: 10%; margin-top: 3%;">Patient
											Name:</label>
									</div>

									<div style="" class="col-md-2-1 TextFont" id="divbyName">
										<input name="byName" type="text" id="byName"
											class="typeahead form-control input-SmallText"
											onkeypress="return SearchPatientNameOnEnter(event,'previousConsentForm')" />
									</div>
									<div class="col-md-1-1">
										<!-- <label class="TextFont"
											style="margin-left: 10%; margin-top: 3%;" id="lblCenterPatientId">Patient Id:</label> -->
									</div>

									<div style="" class="col-md-2-1 TextFont">
										<input name="byId" type="text" id="byId" style="display: none;"
											class="form-control input-SmallText" />
										<!-- <input name="byId" type="text" id="centerPatientId"
											class="form-control input-SmallText" /> -->

									</div>
									<!-- <div class="col-md-1-1" style="text-align: center;">
										<input type="button" value="search"
											class="btn btn-xs btn-primary" class="btn btn-xs btn-primary"
											onclick="featchPreviousICFpat('search')" />
									</div> -->
								</div>

								<div class="divide-20"></div>
								<!-- <div class="panel panel-default">
									<div class="panel-body">
										<div class="container-main col-md-12-1" style="">
											<table class="table">
												<thead>
													<tr>
														<th class="col-md-1 center"><div>#</div></th>
														<th class="col-md-4"><div>Patient Name</div></th>
														<th class="col-md-1 center hidden"><div>Patient ID</div></th>
														<th class="col-md-1 center " id="thCenterPatientId"><div>Patient ID</div></th>
														<th class="col-md-2 center"><div>Reg. Date</div></th>
														<th style="padding-right: 3%;" class="col-md-2 center"><div>View
																Bill</div></th>
													</tr>
												</thead>
											</table>
											<div id="container"
												style="margin-top: -21px; height: 420px; max-height: auto; overflow-y: scroll;"></div>
										</div>
									</div>
								</div> -->
								
								<div class="col-md-12"
																	style="margin-top: 7px; padding-left: 3%; width: 102.3%; margin-bottom: 16px;">
																	<div class="col-md-12-1"
																		style="overflow-y: scroll; height: 293px; maxheight: auto; border: 1px solid #b8b8b8;">

																		<table class="table table-condensed cf"
																			style="Width: 100%;">
																			<tbody id="prevOPDBillObj">
																			
																			</tbody>
																		</table>
																	</div>
																</div>
							</div>
						</div>
						<%@include file="Footer.jsp"%><!-- <div
							style="display: none;" id="prevOPDBillObj"></div> -->

					</div>
				</div>
			</div>

		</c:if>
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
	</section>
</body>
</html>