<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Pathology Labs</title>

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
		$("#labsData").addClass("anchorActive");
		fetchLabId();
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
							style="width: 92%; float: right; padding-top: 3%; padding-right: 8%">

							<div style="padding-right: 2%; width: 30%;">
								<input
									style='font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;'
									type='button' value='Save Now' onclick="saveSubLabDetails()" />
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

							<div
								style="width: 100%; height: 92%; margin-top: 1%; border: 1px solid #436a9d;"
								id="">



								<div style="width: 100%; margin-left: 2%">
									<div style='width: 80%;'>
										<h2>Lab Details</h2>
									</div>
									<div style='width: 100%;'>
										<div style='width: 8%;'>Code</div>
										<div style='width: 10%;'>
											<input type='text' id='txtCode' name='txtCode'
												readonly="readonly"
												style='width: 100%; background-color: lightgray' />
										</div>
									</div>
									<div style='width: 100%; padding-top: 1%;'>
										<div style='width: 8%;'>Lab Name</div>
										<div style='width: 40%;'>
											<input type='text' id='txtLabName' name='txtLabName'
												style='width: 100%;' ' />
										</div>
									</div>
									<div style='width: 100%; padding-top: 1%;'>
										<div style='width: 8%;'>Lab Incharge</div>
										<div style='width: 14.1%;'>
											<input type='text' id='txtIncharge' name='txtIncharge'
												style='width: 100%;' />
										</div>

										<div style='width: 8%; margin-left: 40px;'>Degree</div>
										<div style='width: 14.1%;'>
											<input type='text' id='txtDegree' name='txtDegree'
												style='width: 100%;' />
										</div>
									</div>


									<div style='width: 100%; padding-top: 1%;'>
										<div style='width: 8%;'>Address</div>
										<div style='width: 40%; color: red;'>
											<textarea type='text' id='txtAddress' name='txtAddress'
												rows="3" cols="53"
												onkeypress='return validatealphabetic(event)'></textarea>

										</div>


									</div>
									<div style='width: 100%; padding-top: 1%;'>
										<div style='width: 8%;'>Locality Area</div>
										<div style='width: 40%;'>
											<input type='text' id='txtArea' name='txtArea'
												style='width: 100%;' ' />
										</div>
									</div>
									<div style='width: 100%; padding-top: 1%;'>
										<div style='width: 8%;'>City</div>
										<div style='width: 14.1%;'>
											<input type='text' id='txtCity' name='txtCity'
												style='width: 100%;' />
										</div>

										<div style='width: 8%; margin-left: 40px;'>Pin Code</div>
										<div style='width: 14.1%;'>
											<input type='text' id='txtPincode' name='txtPincode'
												style='width: 100%;' />
										</div>
									</div>
									<div style='width: 100%; padding-top: 1%;'>
										<div style='width: 8%;'>Phone No</div>
										<div style='width: 14.1%;'>
											<input type='text' id='txtPhoneno' name='txtPhoneno'
												style='width: 100%;' />
										</div>

										<div style='width: 8%; margin-left: 40px;'>Mobile No</div>
										<div style='width: 14.1%;'>
											<input type='text' id='txtMobileno' name='txtMobileno'
												style='width: 100%;' />
										</div>
									</div>

									<div style='width: 100%; padding-top: 1%;'>
										<div style='width: 8%;'>Email</div>
										<div style='width: 40%;'>
											<input type='text' id='txtEmail' name='txtEmail'
												style='width: 100%;' ' />
										</div>
									</div>

									
									<div style='width: 100%; padding-top: 1%;'>
										<div style='width: 8%;'>Open Date</div>
										<div style='width: 10%;'>
											<input type='text' id='txtOpen' name='txtOpen' value='<%=todays_date%>'
												style='width: 100%;' ' />
										</div>
									</div>
									<div style='width: 100%; padding-top: 1%;'>
										<div style='width: 8%;'>Special Info</div>
										<div style='width: 40%; color: red;'>
											<textarea type='text' id='txtSpecialinfo'
												name='txtSpecialinfo' rows="2" cols="53"
												onkeypress='return validatealphabetic(event)'></textarea>

										</div>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<%@include file="Footer.jsp"%></div>




	</c:if>

	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>

	</c:if>

</body>
</html>
