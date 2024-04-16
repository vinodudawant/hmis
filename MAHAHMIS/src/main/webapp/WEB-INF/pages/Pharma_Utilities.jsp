<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>E-Hat | Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">


<link rel="stylesheet" type="text/css" href="<c:url value="/pharmacy/resources/css/ehat_general.css"/>">
<link rel="stylesheet" type="text/css" href="<c:url value="/pharmacy/resources/css/default.css"/>"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="<c:url value="/pharmacy/resources/css/responsive.css"/>">
<link href="<c:url value="/pharmacy/resources/bootstrap-dist/css/bootstrap.min.css"/>" rel="stylesheet"
	media="screen">
<link href="<c:url value="/pharmacy/resources/font-awesome/css/font-awesome.min.css"/>" rel="stylesheet">


<!-- JQUERY -->
<script src="<c:url value="/pharmacy/resources/jquery/jquery-2.1.1.js"/>"></script>
<!-- JQUERY UI-->
<script
	src="<c:url value="/pharmacy/resources/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"/>"></script>
<!-- BOOTSTRAP -->
<script src="<c:url value="/pharmacy/resources/bootstrap-dist/js/bootstrap.min.js"/>"></script>
<script src="<c:url value="/pharmacy/resources/bootstrap-dist/js/bootstrap.js"/>"></script>

<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>
<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>
</head>	
<script>
	jQuery(document).ready(function() {
		//App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<body style="background: white ! important;">
	<section id="page">

		<%-- <c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${sessionScope.userType != null }"> --%>

			<!-- Common -->
			<!-- DASHBOARD CONTENT -->
			<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Pharma_Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->

				<%@include file="Pharma_left_menu_utilities.jsp"%>

				<!-- <div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12">
								PAGE HEADER
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
								/Common

								<div style="font-weight: bold;" class="col-md-1-1">Add New
									User:</div>

								<div class="col-md-2-1">
									<select id="selNewUser" name="select" style="width: 100%"
										onchange="setNewUserTemp(this.value)">
										<option value="select">-Select-</option>
										<option value="admin">Admin</option>
										<option value="doctor">Doctor</option>
										<option value="rmo">RMO</option>
										<option value="visitingdoctor">Visiting Doctor</option>
										<option value="receptionist">Receptionist</option>
										<option value="nurse">Nurse</option>
										<option value="anesthetist">Anesthetist</option>
										<option value="HR">HR</option>
										<option value="General">General</option>
									</select>
								</div>
								<div style="font-weight: bold;" class="col-md-1">Search
									By:</div>
								<div class="col-md-1">User Name</div>
								<div style="padding-left: 2%;" class="col-md-2 TextFont">
									<input style="width: 100%;" name="byName" type="text"
										id="byName" onkeypress="return validatealphabetic(event)" />
								</div>
								<div class="col-md-1" style="text-align: center;">
									<input type="button" value="Search" class="edit"
										onclick="searchViewUser('AcManag')" />
								</div>
								<input type="hidden" id="txtUserID" value="" />

								<div class="divide-20"></div>
								<div class="panel panel-default">
									<div class="panel-body">

										<form name="AdmiFrm" action="#">
											<div id="infoDiv" class="col-md-4-1"
												style="height: 200px; max-height: auto; border: 1px;"></div>
										</form>

										<form id="myform" name="myform">
											<div id="userMangTemp" class="col-md-8-1"></div>
										</form>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div> -->
				<input type="hidden" id="userID" />
			</div>
			<div><%@include file="Pharma_Footer.jsp"%></div>
			<div id="userObj" style="display: none;"></div>
		<%-- </c:if> --%>
	</section>
</body>
</html>