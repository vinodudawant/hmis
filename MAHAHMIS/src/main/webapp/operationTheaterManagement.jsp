<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Operation Management</title>
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
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		})

		$("#opeman").addClass("anchorActive");
		defaultViewOT();
		addOperationTheaterDetails();
	});
</script>

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
				<%
					java.util.Calendar currentDate = java.util.Calendar
								.getInstance();
						java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
								"dd-MM-yyyy");
						String todays_date = formatter.format(currentDate.getTime());
				%>
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
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
												<li><a href="operationTypeManagement.jsp">OT</a></li>
												<li><a href="operationTypeManagement.jsp">Operation
														Management</a></li>
												<li><a href="operationTheaterManagement.jsp">Operation
														Theatre</a></li>
												<div class="pull-right">
													<button class="btn btn-xs btn-success editUserAccess"
													data-toggle="tooltip" data-placement="left" title="Save Operation Theater"
														onclick="saveOTDetails()">
														<i class = "fa fa-save"></i>
														</button> <!-- <button class="btn btn-xs btn-warning">Print</button>
													<button class="btn btn-xs btn-danger">Discard</button> -->
												</div>
											</ul>
										</div>
									</div>
								</div>
								<!-- Page Date Print Discards-->


								<div class="col-md-8-1" style="padding-left: 25px;">

									<!-- Search Procedure Header -->
									<div style="font-weight: bold;" class="col-md-2-1">Search:
									</div>

									<div style="font-weight: bold;" class="col-md-2-1">OT
										Name</div>

									<div class="form-group col-md-3-1">
										<input name="byName" type="text" id="byName"
											class="form-control input-SmallText " onchange="setSplitId()"
											class="form-group" autocomplete="off"/>
									</div>

									<div class="form-group col-md-2-1">
										<button class="btn btn-xs btn-primary" class="edit"
										data-toggle="tooltip" data-placement="right" title="Search " style="margin-left: 10px;"
											onclick="searchOT()">
											<i class = "fa fa-search"></i>
											</button>
									</div>
								</div>
								<!-- Search Procedure Header -->
								<div class="divide-20"></div>
								<div class="panel panel-default">
									<div class="panel-body">

										<div id="OTManagementDiv" class="col-md-4-1"
											style="margin-top: 10px;"></div>

										<!-- Start Table Gui -->
										<div class='col-sm-7-1' style="margin-left: 4%;">
											<table class='table table-bordered table-condensed cf' style='width : 100%; margin-top: 10px;'>
												<thead class='cf'>
											
													<tr>
														<th class='col-md-1-1 center' style='height: 21.5px;'><label
															class='TextFont'>#</label></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><label
															class='TextFont'>OT ID</label></th>
														<th class='col-md-2-1' style='height: 21.5px;'><label
															class='TextFont'>OT Name</label></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><label
															class='TextFont'>Edit</label></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><label
															class='TextFont'>Delete</label></th>
													</tr>
												</thead>
											</table>
										</div>
										<div id="OTMangTemp" class="col-md-7-1"
											style="margin-left: 4%;"></div>

										<!-- End Table Gui -->
									</div>

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
			<div style="display: none;" id="OTDetailDiv"></div>
		</c:if>
	</section>
</body>
</html>