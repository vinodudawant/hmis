<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Pathology Labs Dashbord</title>

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
<script src="jquery/jquery-2.1.1.js"></script><script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script src="js/validate.js" type="text/javascript"></script>

<script type="text/javascript">
	onload = function() {
		$("#pathManagement").addClass("anchorActive");
		fetchSublabDetails();

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
						<div
							style="width: 92%; float: right; padding-top: 3%; padding-right: 1%">
							<div id="saveButton" ; style="padding-right: 2%; width: 35%;">

							</div>
							<div id="Addlabs"
								style="padding-right: 2%; width: 35%; border: 0px solid #000;">
								<input onclick="fetchLabId()"
									style="font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;"
									type="button" value="Add Labs" />
							</div>



						</div>
					</div>

				</div>
			</div>
			<%@include file="Menu_Header.jsp"%>
			<div id="right">
				<%@include file="left_menu_pathology.jsp"%>
				<div id="rightContent" style="height: 100%; overflow-y: scroll;">
					<div style="width: 100%; height: 1%; background-color: #85a7d4;"></div>
					<div style="width: 100%; height: 99%;">
						<div id="rightContActual">
							<div id="subLabDetailDiv"
								style="width: 100%; height: 92%; border: 1px solid #436a9d;">


							</div>


						</div>
					</div>
				</div>


			</div><%@include file="Footer.jsp"%>
		</div>
		<div style="display: none;" id="subLabDetailData"></div>
		<input type="hidden" id="queryType" />

	</c:if>

	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>

	</c:if>
</body>
</html>