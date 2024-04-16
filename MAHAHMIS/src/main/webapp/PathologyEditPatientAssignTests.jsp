<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Assign Pathology Tests</title>

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
<script type="text/javascript" src="js/Treatment.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>

<script type="text/javascript">
	onload = function() {

		myObj = window.parent.document.getElementById("div1").innerHTML;
		myObj = JSON.parse(myObj);
		var pi = myObj.objPat.pi;
		$("#treatmentId").val(myObj.objPat.trid);
		$("#testMasterId").val(myObj.idtestmstr);
		setPatientInfo(pi);
		$("#patEntry").addClass("anchorActive");
		getTestDashboard('PathologyPatientAssignTest');
		setEditPatientAssignedTestTemp(myObj);

	}
</script>
</head>

<body>
	<c:if test="${ sessionScope.userType != null  }">

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

							<div style="padding-right: 2%; width: 30%;" id="">

								<input onclick="savePatientAssignedTests()"
									style="font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;"
									type="button" value="Save Now" />
							</div>

						</div>
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
							<div id="commonPatInfo" style="width: 98%;"></div>


							<div style="width: 96%; height: 5%; padding: 2%;">




								<div style="width: 10%; margin-left: 550px; font-weight: bold;">Search
									By:</div>
								<div style="width: 8%;">Test Name</div>
								<div style="width: 12%; padding-left: 2%;">
									<input style="width: 100%;" name="strValue" type="text"
										id="strValue" />
								</div>
								<div style="width: 15%; text-align: center;">
									<input type="button" value="search" class="btn btn-xs btn-primary" class="edit"
										onclick='searchSubTestDetails( "PathologyPatientAssignTest")' />
								</div>

							</div>


							<div
								style="width: 45%; border: 1px solid #436a9d; height: 350px;"
								id="infoDiv">
								<div
									style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'>

									<div
										style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div>

									<div
										style='width: 45%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>
										Test Name</div>
									<div
										style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>
										Amount</div>

									<div
										style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>
										Status</div>
								</div>
								<div id="assignTestDiv"
									style='width: 100%; overflow-y: scroll; height: 300px'></div>

								<div id="" style='width: 100%;'>
									<div style="width: 68%; margin-left: 5px;">
										<label style="font-weight: bold;">Amount Collected By:</label>
										${sessionScope.userName}
									</div>

									<div style="width: 20%; font-weight: bold;">
										<div style="width: 90%">Total Amount:</div>
										<div style="width: 10%" id="divtotalAmt">0</div>
									</div>
								</div>

							</div>

							<div style="width: 2%; margin-left: 10px; margin-top: 150px">
								<input type="button" value="<<" onclick="
									addTestToPatients()" class="edit" /> <input type="button"
									style="margin-top: 5px;" value=">>" class="edit"
									onclick="removePatientAssignedTest()" />
							</div>

							<div
								style="width: 49%; margin-left: 20px; border: 1px solid #436a9d">
								<div
									style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'>

									<div
										style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div>
									<div
										style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>
										Group Test</div>
									<div
										style='width: 45%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>
										Test Name</div>
									<div
										style='width: 17%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>
										Amount</div>




								</div>
								<div id="testDiv"
									style='width: 100%; height: 320px; overflow-y: scroll;'>


								</div>
							</div>

						</div>
					</div>



				</div>

			</div>
		</div>
		</div>

		<%@include file="Footer.jsp"%></div>
		<div id="div1" style="visibility: hidden"><%=request.getParameter("myObj")%></div>
		<div id="testDetails" style="display: none;"></div>
		<input type="hidden" id="treatmentId" />
		<input type="hidden" id="queryType" value="update"> <input
			type="hidden" id="testMasterId">
	</c:if>

	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>

	</c:if>

</body>
</html>