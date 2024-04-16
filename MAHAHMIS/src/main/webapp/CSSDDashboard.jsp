<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>CSSDDashboard</title>
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
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/operation.js"></script>
<script src="js/validate.js" type="text/javascript"></script>
<!-- /for Developers  -->

<!-- Auto-Suggestion 6/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<script type="text/javascript">
	onload = function() {
		viewSurgicalKits();
		$("#cssd").addClass("anchorActive");
	}
</script>
</head>

<body>
	<c:if test="${ sessionScope.userType != null }">
		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- <div id="top18">
				<div style="width: 100%;">
					<div style="width: 60%;">
						<img src="images/logo.jpg" />
					</div>
				</div>
			</div> -->
			<header class="navbar clearfix" id="header"> <%@include
				file="Menu_Header.jsp"%> </header>

			<%@include file="left_menu_maintenance.jsp"%>
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
									<div class="page-header" style="margin-bottom: 0px;">

										<ul class="breadcrumb col-md-12-1"
											style="padding: 4px 10px; margin-top: 1px;">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="OPDDoctorsDeskDashboard.jsp">Doctor
													Desk</a></li>
											<!-- <li>View Database</li> -->
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

							<div id="rightContActual">

								<h2>Surgical kits for sterilization:</h2>

								<div class="panel panel-default">
									<div class="panel-body">
										<div style="width: 100%;">
											<div class="col-md-12-1">
												<table class="table table-bordered table-condensed cf"
													style="width: 1090px; margin-top: 10px;">
													<thead class='cf'>
														<tr>
															<th class='col-md-1-1 center' style='height: 21.5px;'><div
																	class='TextFont'>#</div></th>
															<th class='col-md-1-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Kit Name</div></th>
															<th class='col-md-1-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Sterilize</div></th>
														</tr>
													</thead>
												</table>
											</div>
											
											<div class='col-md-12-1'
											style='margin-top: -21px; overflow-y: scroll; width: 1090px; height: 240px; max-height: auto;'>
											<table
												class='table table-bordered table-striped table-condensed cf'>
												<tbody id="container">
													<!-- <div
									style='width: 100.2%; height: 180px; overflow-y: scroll; border: 1px solid #436a9d;'
									id='container'></div> -->
												</tbody>
											</table>
										</div>
										</div>
									</div>
								</div>



							</div>
						</div>
					</div>
				</div>
			</div>


			<%@include file="Footer.jsp"%>
			<div id="divPatId"><%=request.getParameter("myObj")%></div>
		</div>
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>

</body>
</html>
