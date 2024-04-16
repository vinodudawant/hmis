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

<!-- Auto-Suggestion 16/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		})

		
		defaultOTGroupDetails();
		addGroupDetails();
		setAutoSuggestionForOT("strValue", "onload", "OperationGroup");
		$("#opeman").addClass("anchorActive");
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
				<!--End Left Menu -->
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
												<li><a href="OTgroups.jsp">Operation Groups</a></li>
												<div class="pull-right">
													<button class="btn btn-xs btn-success editUserAccess"
													data-toggle="tooltip" data-placement="left" title="Save OT Group"
														onclick=" saveGroupDetails()">
														<i class="fa fa-save"></i>
														</button>
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

									<div style="font-weight: bold;" class="col-md-2-1">Operation
										Group:</div>

									<div class="form-group col-md-3-1" id="divstrValue">
										<input id='strValue' name='strValue' type='text'
											class="typeahead form-control input-SmallText" />
									</div>
									<div class="form-group col-md-2-1">
										<button class="btn btn-xs btn-primary" class="edit"
										data-toggle="tooltip" data-placement="right" title="Search"
											onclick="searchOTGroupDetails('search')">
											<i class = "fa fa-search"></i>
											</button>
									</div>
									<!-- Search Procedure Header -->
								</div>

								<div class="divide-20"></div>
								<div class="panel panel-default">
									<div class="panel-body">

										<div id="addGroup" class="col-md-4-1"
											style="margin-top: 15px;"></div>

										<div class="col-md-8-1"
											style="padding-left: 25px; margin-top: 5px;">

											<!-- Start Table Gui -->
											<div class='col-sm-12-1'>
												<table class='table' style='margin-top: 10px;'>
													<thead>
														<tr>
															<th class='col-sm-1-1 center' style='height: 21.5px;'><label
																class='TextFont'>#</label></th>
															<th class='col-sm-1-1 center' style='height: 21.5px;'><label
																class='TextFont'>Group ID</label></th>
															<th class='col-sm-2-1' style='height: 21.5px;'><label
																class='TextFont'>Group Name</label></th>
															<th class='col-sm-1-1 center' style='height: 21.5px; padding-right: 3%;'><label
																class='TextFont'>Edit</label></th>
															<th class='col-sm-1-1 center' style='height: 21.5px; padding-right: 3%;'><label
																class='TextFont'>Delete</label></th>
														</tr>
													</thead>
												</table>
											</div>

											<!-- from .js <var > -->
											<div id="GroupList" class="col-md-12-1"></div>

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
			<div style="display: none;" id="GroupeDiv"></div>
			<input style="display: none;" value="0" id="groupId" />
		</c:if>
	</section>
</body>
</html>
