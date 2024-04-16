<%@page import="org.json.simple.JSONObject"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>User Access Management</title>
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

<!-- JQUERY -->
<script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script type="text/javascript"
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.js"></script>
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
<!-- <script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script> -->
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/patient.js"></script>

<!-- /for Developers  -->

<!-- Auto-Suggestion 7/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script src="js/UserAccess.js"></script>
<script src="js/chosen.jquery.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});
		getAllModule();
		getAllPrint();
		getAllPrintAccess();
	});
</script>
</head>
<body style="background: white ! important;">
	<section id="page">
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${sessionScope.userType != null }">

			<!-- Common -->
			<!-- DASHBOARD CONTENT -->
			<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->

				<%@include file="left_menu_admin.jsp"%>
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
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="UserManagement.jsp">Administrator</a></li>
												<li><a href="hospital_info.jsp">Hospital Detail</a></li>
												<li>Print Access Master</li>
												<div class="pull-right">
													<button class="btn btn-xs btn-success editUserAccess"
														value="Save Now" data-toggle="tooltip"
														data-placement="left" title="Save Access Details"
														onclick="savePrintAccess()" disabled="disabled">
														<i class="fa fa-save"></i>
													</button>
													<!-- <button onclick="refreshUserAccess()" title=""
														data-placement="left" data-toggle="tooltip"
														class="btn btn-xs btn-danger"
														data-original-title="Refresh">
														<i class="fa fa-refresh"></i>
													</button> -->
												</div>
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->

								<div class="divide-20"></div>
										<div id="tableDiv" class="col-md-12-1">
											<table class="table table-bordered table-condensed">
												<thead>
													<tr>
														<th>Modules</th>
														<!-- <th>Value</th> -->
														<th>Sub-Module</th>
													</tr>
												</thead>
												<tbody id="moduleBody">
												</tbody>
											</table>
										</div>
							</div>
						</div>
					</div>
				</div>
				<!--Start #showSubModulesPopup Popup -->
				<div id="showSubModulesPopup" class="modal fade in">
					<!--End #showSubModulesPopup Popup -->
					<input id="objUserAccess" type="hidden" value="" />
					<%@include file="Footer.jsp"%>
				</div>
			</div>
		</c:if>
	</section>
</body>
</html>