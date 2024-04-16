<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Pathology Organ</title>
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
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<!-- Auto-Suggestion 2/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>



<script>
	jQuery(document).ready(function() {
		App.setPage("PathologyOrgan"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		})

	});
</script>

<script type="text/javascript">
	onload = function() {
		$("#pathManagement").addClass("anchorActive");
		getLabOrgans("onload");
		autoSuggestionForLab("byName", "onload","pathologyOrgan");


	}
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

				<%@include file="left_menu_pathology.jsp"%>

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
												<li><a href="diagnoPatBillDashboard.jsp">Diagnostics</a></li>
												<li><a href="PathologyGroups.jsp">Pathology Management</a></li>
												<li><a href="PathologyOrgan.jsp">Lab Organ</a></li>
												<div class="pull-right">
													<button class="btn btn-xs btn-success" 
													data-toggle="tooltip" data-placement="left" title="Save Lab Organ"
													onclick="saveLabOrgans()">
													<i class = "fa fa-save"></i>
													</button>
												</div>
											</ul>


										</div>
									</div>
								</div>
								<!-- /Common -->

								<div class="col-md-12-1">
									<div style="" class="col-md-1-1">
									<label class="TextFont" style="margin-left: 20%;margin-top:3%;font-size: 11px;">Search By:</label></div>
									<div class="col-md-2-1"><label class="TextFont" style="margin-left: 30%;margin-top:3%;">
									Lab Organ Name:</label></div>

									<div style="" class="col-md-2-1 TextFont" id="divbyName">
										<input id="byName" class="typeahead form-control input-SmallText" 
									type="text" placeholder="-Select-" style="width: 200px;" name="byName" 
									onkeypress = "SearchPathologyOnEnter(event,'searchpathologyOrgan')" />
									</div>
									<div class="col-md-1-1" style="text-align: center;">
										<input type="button" value="search" class="btn btn-xs btn-primary"
											onclick="getLabOrgans('searchpathologyOrgan')" />
									</div>
								</div>
							
							<div class="divide-20"></div>
								<div class="panel panel-default">
								<div class="panel-body" class="col-md-12-1">
											<div id="infoDiv" class="col-md-5-1"
												style="margin-top: 0%; height: 450px;"></div>
												<div class="divide-10"></div>
											<div class="col-md-7-1"  id="userMangTemp"
												style="max-height: auto; padding-left: 15px;">
											</div>
										</div>
								</div>
							
						</div>
					</div>
				</div>

				<%@include file="Footer.jsp"%></div>
		</div>

		<div id="userObj" style="display: none;"></div>
	</c:if>
	</section>
</body>
</html>