<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Report Feedback Dashboard</title>

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

<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/bill.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/report.js"></script>
<!-- /for Developers  -->


<!-- Auto-Suggestion 1/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>


<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>
<script>
	jQuery(document).ready(function() {
		App.setPage("Report_feedback_Dashboard"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>
<script type="text/javascript">
	onload = function() {
		$("#lifeedback").addClass("anchorActive");
		viewFeedbackPat();
	};
</script>
</head>

<body>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>

	</c:if>
	<c:if test="${sessionScope.userType != null}">
		<div id="outer">
			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header_Nobel.jsp"%>
				</header>
				<!--/HEADER -->
				
				<%
					String moduleName = (String) session.getAttribute("moduleName");
				System.err.println("moduleName =" + moduleName);
						if (moduleName.equals("bill")) {
				%>
				<%@include file="left_menu_bill.jsp"%>
				<%
					} else {
				%>
				<%@include file="menu_report.jsp"%>
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
										<div class="page-header" style="height: 32px;">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="ReportDashboard.jsp">Report</a></li>
												<li>Feedback Dashboard</li>
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->

								<div class="col-md-12-1">

									<div style="font-weight: bold;" class="col-md-1-1">Search
										By:</div>

									<div style="font-weight: bold;" class="col-md-1-1">Patient
										Name</div>

									<div class="form-group col-md-2" id="divbyName">
										<input name="byName" type="text" id="byName"
											class="typeahead form-control input-SmallText "
											onkeyup="clearText('byName')"
											onkeypress="return validatealphabetic(event)" />
									</div>
									<!-- onkeyup="setAutoPatientName(this.id,'onchange','IPD_OldPatientDatabase')" -->

									<div style="font-weight: bold;" class="col-md-1-1">OR</div>

									<div style="font-weight: bold;" class="col-md-1-1">Patient
										UHID</div>

									<div class="form-group col-md-2">
										<input id="byId"
											class="form-group form-control input-SmallText" name="byId"
											type="text" onkeyup="clearText('byId')" onkeypress="return validateNumbers(event)" />
									</div>
									<div class="form-group col-md-2-1">
										<button class="btn btn-xs btn-primary"
											onClick="showIPDDICpatientSearch()">Search</button>
									</div>

								</div>

								<div class="divide-20"></div>
								<div>
								<table style="margin-bottom: 8px; width:98.8%;"
									class="datatable table table-bordered table-striped table-condensed cf">
									<thead class="cf">
										<tr>
											<th style="height: 21.5px;" class="col-md-1-1"><div
													class="TextFont">#</div></th>
											<th style="height: 21.5px;" class="numeric col-md-4-1"><div
													class="TextFont">Patient Name</div></th>
											<th style="height: 21.5px;" class="col-md-1-1 center" id="thCenterPatientId"><div
													class="TextFont">Patient Id</div></th>
											<th style="height: 21.5px;" class="numeric col-md-1-1 center"><div
													class="TextFont">Age</div></th>
											<!-- <th style="height: 21.5px;" class="numeric col-md-1-1 center"><div
													class="TextFont">Blood Group</div></th>
											<th style="height: 21.5px;" class="numeric col-md-2-1 center"><div
													class="TextFont">M.R.N. No</div></th> -->
											<th style="height: 21.5px;" class="numeric col-md-1-1 center"><div
													class="TextFont">View Form</div></th>
											<th style="height: 21.5px;" class="numeric col-md-1-1 center"><div
													class="TextFont">View Form</div></th>
										</tr>
									</thead>
								</table>
								</div>
								<div
									style="height: 420px; max-height: auto; overflow-y: scroll;"
									class="col-md-12-1">
									<table style="width: 100%;"
										class="table table-bordered table-condensed TextFont">
										<tbody id="container">
										</tbody>
									</table>
								</div>


							</div>
						</div>
					</div>
				</div>

				<%@include file="footer_nobel.jsp"%>
			</div>
		</div>

		<input type="hidden" id="byName" name="byName" />
		<input type="hidden" id="byId" name="byId" />
		<div id="patientDetailsFeedback" style="display: none;"></div>


	</c:if>


</body>
</html>
