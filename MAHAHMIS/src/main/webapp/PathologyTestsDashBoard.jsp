

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Pathology Test</title>



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
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>

<script type="text/javascript">
	onload = function() {
		getTestDashboard();
		fetchTestId();
		$("#btnAddtestDetail").hide();
		$("#pathManagement").addClass("anchorActive");
	}
</script>
</head>
<body>

	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>

	</c:if>
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
							style="width: 92%; float: right; padding-top: 3%; padding-right: 8%">

							<div style="padding-right: 2%; width: 30%;" id="btnSubtestDetail">

								<input onclick="saveTestDetails()"
									style="font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;"
									type="button" value="Save Now" />
							</div>
							<div style="padding-right: 2%; width: 30%;" id="btnAddtestDetail">

								<input onclick="addTestDetails()"
									style="font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;"
									type="button" value="Add Test" />
							</div>

						</div>
					</div>
				</div>
			</div>

			<%@include file="Menu_Header.jsp"%>
			<div id="right">

				<%@include file="left_menu_pathology.jsp"%>
				<div id="rightContent" style="height: 100%;">
					<div style="width: 100%; height: 1%; background-color: #85a7d4;"></div>
					<div style="width: 100%; height: 99%;">
						<div id="rightContActual">

							<div style="width: 96%; height: 5%; padding: 2%;">




								<div style="width: 10%; margin-left: 430px; font-weight: bold;">Search
									By:</div>
								<div style="width: 8%;">Test Name</div>
								<div style="width: 12%; padding-left: 2%;">
									<input style="width: 100%;" name="strValue" type="text"
										id="strValue" />
								</div>
								<div style="width: 18%; text-align: center;">
									<input type="button" value="search" class="btn btn-xs btn-primary" class="edit"
										onclick="searchTestDetails()" />
								</div>

							</div>

							<div style="width: 35%; border: 1px solid #436a9d; height: 400px"
								id="infoDiv">
								<div style='width: 80%;' id="testHeading">
									<h2>&nbsp;&nbsp;Add Test</h2>
								</div>


								<div style='width: 100%; padding-top: 8%;'>
									<div style='width: 25%;'>&nbsp;&nbsp;Code</div>
									<div style='width: 35%;'>
										<input type='text' id='txtTestCode' name='txtTestCode'
											readonly="readonly"
											style='width: 100%; background-color: lightgray;' />
									</div>
									<input type="checkbox" id="chkUnit" name="chkUnit"
										style='width: 8%;' '  /> Non Regular Test?


								</div>
								<div style="width: 100%; padding-top: 3%;">
									<div style="width: 25%;">&nbsp;&nbsp;Group</div>
									<div style="width: 70%;">
										<select style="width: 100%;" id="selGroups" name="selGroups"></select>
									</div>
									<div style="width: 1%; color: red">
										<b>&nbsp;&nbsp;&nbsp;*</b>
									</div>
								</div>
								<div style='width: 100%; padding-top: 3%;'>
									<div style='width: 25%;'>&nbsp;&nbsp;Test Name</div>
									<div style='width: 70%;'>
										<input type='text' id='txtTestName' name='txtTestName'
											style='width: 100%;' ' />
									</div>
									<div style="width: 1%; color: red">
										<b>&nbsp;&nbsp;&nbsp;*</b>
									</div>

								</div>
								<div style='width: 100%; padding-top: 3%;'>
									<div style='width: 25%;'>&nbsp;&nbsp;Patient Amount</div>
									<div style='width: 70%;'>
										<input style="width: 100%;" id='txtPatAmount'
											name='txtPatAmount' type="text"
											onkeypress="return validateNumbers(event)" />
									</div>
									<div style="width: 1%; color: red">
										<b>&nbsp;&nbsp;&nbsp;*</b>
									</div>
								</div>
								<div style='width: 100%; padding-top: 3%;'>
									<div style='width: 25%;'>&nbsp;&nbsp;Reagent Cost</div>
									<div style='width: 70%;'>
										<input style="width: 100%;" id='txtReaCoast'
											name='txtReaCoast' type="text"
											onkeypress="return validateNumbers(event)" />
									</div>
									<div style="width: 1%; color: red">
										<b>&nbsp;&nbsp;&nbsp;*</b>
									</div>
								</div>
								<div style='width: 100%; padding-top: 3%;'>
									<div style='width: 25%;'>&nbsp;&nbsp;Test Note</div>
									<div style='width: 70%; color: red;'>
										<textarea type='text' id='txtTestNote' name='txtTestNote'
											rows="2" cols="31"></textarea>

									</div>
								</div>
								<div style='width: 100%; padding-top: 3%;'>
									<input type="checkbox" id="chkUnit" name="chkUnit"
										style='width: 6%;' '  /> Show Test Note In
									Report&nbsp;&nbsp;&nbsp; Which Lab?&nbsp;<select
										style="width: 30%;" id="selLab" name="selLab">
									</select>


								</div>

							</div>



							<div style="width: 62%; height: 370px; margin-left: 20px;">
								<div
									style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'>
									<div style='width: 100%;'>
										<div
											style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div>
										<div
											style='width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>
											Group Test</div>
										<div
											style='width: 30%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>
											Test Name</div>
										<div
											style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>
											Patient Amount</div>
										<div
											style='width: 11%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>
											Regent Cost</div>
										<div
											style='width: 6%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>
											Edit</div>
										<div
											style='width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>
											Delete</div>
									</div>
								</div>
								<div id="testDiv"
									style='width: 100%; border: 1px solid #436a9d; height: 100%; overflow-y: scroll;'>

									


								</div>
							</div>

						</div>
					</div>
				</div>
				<%@include file="Footer.jsp"%></div>
			<div style="display: none;" id="testDetails"></div>
			<input type="hidden" id="queryType" value="insert" />
		</div>


	</c:if>

</body>
</html>