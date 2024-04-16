<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Pathology Patient Dashbord</title>

<link href="styles.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="css/themes/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<!-- STYLESHEETS -->
<!--[if lt IE 9]><script src="js/flot/excanvas.min.js"></script><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script><![endif]-->
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />
<!-- ANIMATE -->
<link rel="stylesheet" type="text/css"
	href="css/animatecss/animate.min.css" />
<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- TODO -->
<link rel="stylesheet" type="text/css"
	href="js/jquery-todo/css/styles.css" />
<!-- FULL CALENDAR -->
<link rel="stylesheet" type="text/css"
	href="js/fullcalendar/fullcalendar.min.css" />
<!-- GRITTER -->
<link rel="stylesheet" type="text/css"
	href="js/gritter/css/jquery.gritter.css" />
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script src="jquery/jquery-2.1.1.js"></script><script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script src="js/validate.js" type="text/javascript"></script>
<script type="text/javascript">
	onload = function() {
		$("#patEntry").addClass("anchorActive");
		fetchPatientAssignedTest();
	}
</script>

</head>

<body>
	<c:if test="${ sessionScope.userType != null }">

		<div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div>
		<div id="outer">
			<div id="top18">
				<div style="width: 100%;">
					<div style="width: 60%;">
						<img src="images/logo.jpg" />
					</div>


					<div
						style="width: 20%; float: right; padding-left: 20%; padding-top: 2%;">

					</div>
				</div>
			</div>
			<%@include file="Menu_Header.jsp"%>
			<div id="right">
				<%
					String moduleName = (String) session.getAttribute("moduleName");
						if (moduleName.equals("ipd")) {
				%>
				<%@include file="left_menu_IPD.jsp"%>
				<%
					} else if (moduleName.equals("path")) {
				%>
				<%@include file="left_menu_pathology.jsp"%>
				<%
					} else if (moduleName.equals("opd")) {
				%>
				<div id="leftContent" style="height: 100%;">
					<%@include file="menu_HelpDesk.jsp"%>
				</div>
				<%
					} else {
				%>
				<%@include file="menu_DoctorDesk.jsp"%>
				<%
					}
				%>
				<div id="rightContent" style="height: 100%;">
					<div style="width: 100%; height: 1%; background-color: #85a7d4;"></div>
					<div style="width: 100%; height: 99%;">
						<div id="rightContActual">
							<div style="width: 96%; padding: 2%;">
								<div style="width: 80px;">Search By:</div>
								<div style="width: 90px; padding-left: 10px;">Patient Name</div>
								<div style="width: 12%;">
									<input style="width: 100%;" name="byName" id="byName" class="form-control input-SmallText "
										type="text" onkeypress="return validatealphabetic(event)" />
								</div>
								<div
									style="padding-left: 10px; padding-right: 10px; width: 20px; text-align: center;">or</div>
								<div style="width: 70px; padding-left: 10px;">Patient ID</div>
								<div style="width: 12%;">
									<input style="width: 100%;" name="byId" id="byId" type="text" class="form-control input-SmallText "
										onkeypress="return validateNumbers(event)" />
								</div>
								<div style="width: 80px; padding-left: 10px;">
									<input type="button" value="search" class="btn btn-xs btn-primary" class='edit'
										onclick="searchPatientAssignedTest()" />
								</div>
							</div>

							<div
								style="width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;">
								<div style="width: 100%;">
									<div
										style="width: 3%; border: 1px solid #FFF; color: #FFF; text-align: center;">#</div>
									<div
										style="width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;">Date</div>
									<div
										style="width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;">Patient
										Name</div>

									<div
										style="width: 4%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;">Tre.
										ID</div>
									<div
										style="width: 4%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;">Age</div>
									<div
										style="width: 3%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;">Gender</div>
									<div
										style="width: 6%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;">Contact
										No</div>

									<div
										style="width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;">Routine
										Tests</div>
									<div
										style="width: 3%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;">Bill</div>
									<div
										style="width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;">Routine
										Values</div>
									<div
										style="width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;">Routine
										Report</div>
								</div>
							</div>

							<div
								style="width: 99.80%; height: 75%; overflow-y: scroll; border: 1px solid #436a9d;"
								id="container"></div>



						</div>
					</div>
				</div>
			</div>

			<%@include file="Footer.jsp"%>
			<div id="pathologyAllPatInfo" style="display: none;"></div>
		</div>
	</c:if>

	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>

	</c:if>


</body>
</html>
