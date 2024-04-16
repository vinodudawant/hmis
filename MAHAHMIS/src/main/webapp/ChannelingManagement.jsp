<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>

<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<title>Channeling Doctor</title>

<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />

<!--/PAGE -->
<!-- JAVASCRIPTS -->
<!-- Placed at the end of the document so the pages load faster -->
<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>

<!-- BOOTSTRAP -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>

<!-- DATE RANGE PICKER -->
<script src="js/bootstrap-daterangepicker/moment.min.js"></script>

<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
<!-- SPARKLINES -->
<script type="text/javascript"
	src="js/sparklines/jquery.sparkline.min.js"></script>

<!--  For Developers -->
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>

<script type="text/javascript" src="js/Channeling.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/validate.js"></script>

<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>

<!-- Auto-Suggestion 1/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("Channelingmanagement"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		})
	});
</script>



<script type="text/javascript">
	onload = function() {
		$("#channe").addClass("anchorActive");
		setnewDocTemp();
		setExistingDoctorTemp();
		//setAutoPatientName("byName","onLoad")
		//setAutoPatientName("byName","onload","Manage_ReferenceDatabase");
		title("ehat_patient");
	}
	
	function validateDecimal(value){
		alert();
        var RE = /^\d*\.?\d*$/;
        if(RE.test(value)){
           return true;
        }else{
        	alert("false");
           return false;
        }
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
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->
				<%
					String moduleName1 = (String) session
								.getAttribute("moduleName");
						if (moduleName1.equals("admin")) {
				%>
				<%@include file="left_menu_admin.jsp"%>
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
										<div class="page-header">

											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="UserManagement.jsp">Administrator</a></li>
												<li><a href="ChannelingManagement.jsp">Channel Management</a></li>
												<li><a href="ChannelingManagement.jsp">Channelling Doctor</a></li>
												<div class="li pull-right">
													<button class="btn btn-xs btn-success editUserAccess"
													  data-toggle="tooltip" data-placement="left" title="Save Channeling Doctor"
														onclick="saveReferToDoc()" disabled="disabled">
														<i class="fa fa-save"></i>
														</button>
													<!-- 	<button class="btn btn-xs btn-warning">Print</button>
													<button class="btn btn-xs btn-danger">Discard</button> -->
												</div>
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
											style="margin-left: 10%; margin-top: 3%;">Doctor
											Name:</label>
									</div>

									<div style="" class="col-md-2-1 TextFont" id="divbyName">
										<input name="byName" type="text" id="byName" class="typeahead form-control input-SmallText"
											onkeypress="return SearchPatientNameOnEnter(event,'ChannelingDoctor')" />
									</div>
									<div class="col-md-1-1" style="margin-left: 0%;">
										<label class="TextFont"
											style="margin-left: 30%; margin-top: 3%;">Doctor ID:</label>
									</div>

									<div style="padding-left: 0%;" class="col-md-2-1 ">
										<input name="byId" type="text" id="byId"
											class="form-control input-SmallText"
											onkeypress="return SearchPatientIdOnEnter(event,'ChannelingDoctor')" />
									</div>
									<div class="col-md-1-1" style="text-align: center;">
										<input type="button" value="search"
											class="btn btn-xs btn-primary" class="btn btn-xs btn-primary"
											onclick="searchDoctor()" />
									</div>
								</div>

								<div class="divide-20"></div>
								<div class="panel panel-default">
									<div class="panel-body" class="col-md-12-1">
										<div id="container1" class="col-md-4-1"
											style="height: 510px; margin-top: 0%"></div>
										<div class="divide-10"></div>
										<div class="col-md-8-1" id="container"
											style="max-height: auto; padding-left: 15px;"></div>
									</div>
								</div>
							</div>
						</div>
						<%@include file="Footer.jsp"%></div>
				</div>
			</div>
			<div id="channelingDocDiv" style="display: none;"></div>
			<div id="div1" style="display: none"><%=request.getParameter("ajaxResponse")%></div>
			<input id="Patid" type="hidden"
				value="<%=request.getParameter("pi")%>" />
			<div id="div2" style="display: none"><%=request.getParameter("showSaveBtn")%></div>
		</c:if>

		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>

		</c:if>
	</section>
</body>
</html>
