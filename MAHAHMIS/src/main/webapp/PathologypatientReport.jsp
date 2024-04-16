<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Pathology patient Report</title>
<link rel="stylesheet" type="text/css" href="js/jquery.autocomplete.css" />

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
<script type="text/javascript" src="js/patient.js"></script>
<script src="jquery/jquery-2.1.1.js"></script><script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script src="js/jquery.autocomplete.js"></script>
<script src="js/validate.js" type="text/javascript"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script type="text/javascript" src="js/jquery.lightbox_me.js"></script>
<script type="text/javascript">
	onload = function() {
		fetchOwnLabDetails();
		setReportDetails();

	}

	function printDiv(divName) {
		//	$("#printButton").hide();
	var printContents = $("#" + divName).html();
		//var originalContents = document.body.innerHTML;
		document.body.innerHTML = printContents;
		window.print();
		//document.body.innerHTML = originalContents;
	}
</script>
</head>
<body style="overflow: auto;">


	<div
		style="width: 20%; float: right; padding-left: 20%; padding-top: 2%;">
		<div
			style="width: 92%; float: right; padding-top: 3%; padding-right: 8%">

			<div id="printButton" style="padding-right: 2%; width: 30%;">
				<input
					style="font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;"
					type="button" value="Print" onclick="printDiv('printContent')" />
			</div>

		</div>
	</div>
	<div style="width: 100%;" id="printContent">
		<div id="billName" style="width: 100%;">

			<div style="width: 100%; padding-left: 25%;" id="RubyBill">

				<h1>
					<span style="padding-left: 4%;" id="labName"></span>
				</h1>


				<span id="labAdd"> </span><br> <span style="padding-left: 9%;">Phone:-</span>
					<span id="labTelephone"></span>
			</div>
			<div style='width: 100%; padding-top: 2%;'>
				<div
					style='width: 23%; padding-left: 7%; padding-top: 3%; float: left;'>
					Opening Time :- <span id="OpenTime"></span>
				</div>
				<div
					style='width: 35%; padding-top: 3%; padding-right: 7%; float: right;'>
					Launch Time :- <span id="LunchTime"></span>
				</div>
			</div>

			<div style='width: 100%;'>
				<div
					style='width: 23%; padding-left: 7%; padding-top: 0%; float: left;'>
					Closing Time :- <span id="CloseTime"></span>
				</div>
				<div style='width: 35%; float: right; padding-right: 7%;'>
					Closed on :- <span id="closeOn"></span>
				</div>
			</div>
		</div>



		<b>__________________________________________________________________________________________________________________________________________________________________________________</b>
		<div style='width: 100%; padding-top: 2%;'>
			<div
				style='width: 45%; padding-left: 7%; padding-top: 1%; float: left;'>
				<samp>
					Patient Name : <span id="pName"></span>
				</samp>
			</div>
			<div
				style='width: 35%; padding-top: 1%; padding-right: 7%; float: right;'>
				<samp>
					Regestration Date : <span id="regDate"></span>
				</samp>
			</div>
		</div>
		<div style='width: 100%; padding-top: 2%;'>
			<div style='width: 45%; padding-left: 7%; float: left;'>
				<samp>
					Age/Gender : <span id="age"></span> Years / <span id="sex"></span>
				</samp>
			</div>
			<div
				style='width: 35%; padding-top: 0%; padding-right: 7%; float: right;'>
				<samp>
					SampleDrawn Date : <span id="samDate"></span>
				</samp>
			</div>
		</div>
		<div style='width: 100%; padding-top: 2%;'>
			<div
				style='width: 45%; padding-left: 7%; padding-bottom: 1% float:                 left;'>
				<samp>
					Referring Doctor : <span id="refDoc"></span>
				</samp>
			</div>
			<div
				style='width: 35%; padding-top: 0%; padding-right: 7%; padding-bottom: 1%; float: right;'>
				<samp>
					Report Date : <span id="repDate"></span>
				</samp>
			</div>
		</div>
		<b>__________________________________________________________________________________________________________________________________________________________________________________</b>



		<div style="width: 100%; padding-left: 2%;" id="reportTest">

			{#foreach $T.liGrpSlave as liGrpSlave}
			<div
				style='width: 75%; padding-left: 1%; padding-top: 1%; padding-right: 7%; float: left;'>
				<table border="" width="650" height="30";>
					<tr>
						<td><center>
								<font size=4><b>{$T.liGrpSlave.objTstGrp.gn}</b></font>
							</center></td>
					</tr>
				</table>
			</div>
			{#foreach $T.liGrpSlave.liTstSlave as liTstSlave}
			<div
				style='width: 75%; padding-left: 1%; padding-top: 1%; padding-right: 7%; float: left;'>
				<table border="" width="300" height="20";>
					<tr>
						
						<td ><center><font size=4>{$T.liTstSlave.objTst.tName}</center></td>
					</tr>
				</table>
			</div>
			<div
				style='width: 75%; padding-left: 1%; padding-top: 1%; padding-right: 7%; float: left;'>
				<table border="" width="650" height="30";>
					<tr>
						<td><center>DESCRIPTION</center></td>



						<td><center>OBSERVED VALUE</center></td>


						<td><center>UNIT</center></td>


						<td><center>NORMAL VALUE</center></td>
					</tr>


				</table>
				{#foreach $T.liTstSlave.liSubTstSlave as liSubTests}



				<table width="650" height="30" cellspacing="0" cellpadding="0"
					style="border: 1px solid; border-color: gray;">
					<tr>
						<td
							style="width: 23%; border: 1px solid; border-color: gray; text-align: center;">{$T.liSubTests.objSubTst.subnm}</td>



						<td
							style="width: 29.5%; border: 1px solid; border-color: gray; text-align: center;">{$T.liSubTests.reading}</td>


						<td
							style="width: 9%; border: 1px solid; border-color: gray; text-align: center;">{$T.liSubTests.objSubTst.unt}</td>


						<td
							style="width: 25%; border: 1px solid; border-color: gray; text-align: center;">{$T.liSubTests.objSubTst.nrange}</td>
					</tr>
				</table>
			</div>
			{#/for} {#/for} {#/for}
		</div>
		<div style="padding-top: 50px;">

			<b>__________________________________________________________________________________________________________________________________________________________________________________</b>

			<div style="width: 100%; padding-top: 20px; padding-left: 20%;"
				id="footerLab"></div>
		</div>
	</div>
	<div id="myObj" style="display: none;"><%=request.getParameter("myObj")%></div>

</body>
</html>

