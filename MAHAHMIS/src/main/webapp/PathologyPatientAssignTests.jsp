<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Assign Pathology Test</title>

<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />

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

<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css" />

<!-- FULL CALENDAR -->
<link rel="stylesheet" type="text/css"
	href="js/fullcalendar/fullcalendar.min.css" />
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>


<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<script type="text/javascript">
	onload = function() {

		myObj = window.parent.document.getElementById("div1").innerHTML;
		myObj = JSON.parse(myObj);
		var pi = myObj.pi;
		$("#treatmentId").val(myObj.trid);
		setPatientInfo(pi);
		$("#patEntry").addClass("anchorActive");

		//getTestDashboard('PathologyPatientAssignTest');
		getTechnicianAndDoctor("onload", "Doctor");

		getAllHeading("onload", "assignTest");
		getLabPatTypes("onload", "assignedTest");

		featchPreviousLabTestOfPat();

	}
</script>
</head>

<body style="background: white ! important;">
	<c:if test="${ sessionScope.userType != null  }">

		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>

		<!-- <div id="top18">
				<div style="width: 100%;">
					<div style="width: 60%;">
						<img src="images/logo.jpg" />
					</div>
					<div
						style="width: 20%; float: right; padding-left: 20%; padding-top: 2%;">
						<div
							style="width: 92%; float: right; padding-top: 3%; padding-right: 8%">

							<div style="padding-right: 2%; width: 30%;" id="">

								<input onclick="saveAssignedTests('opdTestAssign')"
									style="font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;"
									type="button" value="Save Now" />
							</div>
						</div>
					</div>
				</div>
			</div> -->
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

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
			<%@include file="menu_HelpDesk.jsp"%>
			<%
				} else {
			%>
			<%@include file="menu_DoctorDesk.jsp"%>
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
											<li><a href="IPD_OPD_Database.jsp">Doctor Desk</a></li>
											<li>Add Routine Test</li>
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
							<!-- /Common -->

							<div id="commonPatInfo"
								style="width: 98%; margin-top: -3px; margin-left: 5px; margin-bottom: 60px;"></div>

							<div style="font-weight: bold;" class="col-md-1">Search By:</div>
							<div class="col-md-1">Test Name</div>
							<div style="padding-left: 2%;" class="col-md-2 TextFont">
								<input style="width: 100%;" name="strValue" type="text"
									class="inpSearchBox" id="strValue" />
							</div>
							<div class="col-md-1" style="text-align: center;">
								<input type="button" value="search" class="btn btn-xs btn-primary" class="edit"
									onclick="searchProAndTest('assign')" id="inpSearchBtn" />
							</div>
							<div class="col-md-5"
								style="text-align: center; margin-top: 3px;">
								<div class="col-md-4"
									style="text-align: center; font-weight: bold;">Refer
									Doctor :</div>
								<div class="col-md-8" style="text-align: center;">
									<select id="doctor" style="width: 70%;"></select><b
										style="color: red;"> *</b>
								</div>
							</div>


							<div
								style="width: 20%; border: 1px solid #436a9d; height: 300px; margin-top: 2%;"
								id="infoDiv">
								<table
									class='datatable table table-bordered table-striped table-condensed cf'
									style='margin-bottom: 9px;'>
									<thead class='cf'>
										<tr>
										<th class='col-md-1-1 center' style='height: 21.5px;'><div
													class='TextFont'></div></th>
											<th class='col-md-11-1 center' style='height: 21.5px;'><div
													class='TextFont'>Heading</div></th>
										</tr>
										<tr>
											<th class='col-md-1-1 center' style='height: 21.5px;'><div
													class='TextFont'>&nbsp;</div></th>
											<th class='col-md-11-1 center' style='height: 21.5px;'><div
													class='TextFont'>Heading Name</div></th>
										</tr>
									</thead>
								</table>

								<div class='col-md-12-1'
									style='height: 333px; max-height: auto; overflow-y: scroll;'
									id="HeadingDiv">
									<table
										class='table table-bordered table-striped table-condensed cf'>
										<tbody>
											{#foreach $T.lbHedLi as lbHedLi}
											<tr>
												<td class='col-md-1-1 center'><input type="checkbox"
													value="{$T.lbHedLi.idHed}" id="headcheck{$T.lbHedLi.idHed}"
													name="headchk"
													onclick="featchProAndTest({$T.lbHedLi.idHed},'assign')" /></td>
												<td class='col-md-11-1 center' style="margin-left: 15px;">{$T.lbHedLi.hcod} -
													{$T.lbHedLi.hedNm}</td>
											</tr>
										</tbody>
									</table>
								</div>
								{#/for}
							</div>

							<!-- <div
								style="width: 20%; border: 1px solid #436a9d; height: 300px; margin-top: 2%;"
								id="infoDiv">
								<div
									style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold; color: #FFF; text-align: center;'>
									Heading</div>
								<div
									style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'>
									<div
										style='width: 7%; border: 1px solid #FFF; color: #FFF; text-align: center;'>&nbsp;</div>
									<div
										style='width: 85%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>
										Heading Name</div>
								</div>
								<div id="HeadingDiv"
									style='width: 100%; overflow-y: scroll; height: 250px'>
									{#foreach $T.lbHedLi as lbHedLi}
									<div
										style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>
										<div
											style='width: 9%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>
											<input type="checkbox" value="{$T.lbHedLi.idHed}"
												id="headcheck{$T.lbHedLi.idHed}" name="headchk"
												onclick="featchProAndTest({$T.lbHedLi.idHed},'assign')" />
										</div>
										<div
											style='width: 89%; height: 23px; padding-left: 1%; padding-top: 5px; text-align: left;'>{$T.lbHedLi.hcod}
											- {$T.lbHedLi.hedNm}</div>
									</div>
									{#/for}
								</div>
							</div> -->




							<div
								style="width: 35%; margin-left: 20px; border: 1px solid #436a9d; margin-top: 2%;">
								<div
									style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold; color: #FFF; text-align: center;'>
									Tests</div>
								<div
									style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'>

									<div
										style='width: 4.4%; border: 1px solid #FFF; color: #FFF; text-align: center;'>&nbsp;</div>
									<div
										style='width: 88.5%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>
										Test Name</div>
								</div>

								<div id="testDiv"
									style='width: 100%; height: 250px; overflow-y: scroll;'></div>
							</div>

							<div
								style="width: 40%; border: 1px solid #436a9d; margin-left: 20px; margin-top: 2%;"
								id="infoDiv">
								<div
									style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold; color: #FFF; text-align: center;'>
									Assigned Tests</div>
								<div
									style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'>
									<div
										style='width: 4.4%; border: 1px solid #FFF; color: #FFF; text-align: center;'>&nbsp;</div>
									<div
										style='width: 77%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>
										Test Name</div>
									<div
										style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>
										Amount</div>

								</div>
								<div id="assignTestDiv"
									style='width: 100%; overflow-y: scroll; height: 250px'></div>
							</div>

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
					</div>
				</div>
			</div>
			<%@include file="Footer.jsp"%>
		</div>

		<input type="hidden" id="testCount" value="1">
		<input type="hidden" id="profileCount" value="1">
		<input type="hidden" id="pkgCount" value="1">

		<div style="display: none;" id="featchProAndTestTemp">
			{#foreach $T.lbHedLi[0].lbpkgli as lbpkgli}
			<div style='width: 100%; border-bottom: 1px solid #069;'
				id="pkgDiv{$T.lbpkgli.idlbpkg}">
				<div
					style='width: 100%; height: 28px; border-bottom: 1px solid #069;'
					id="pkgIdDiv{$T.lbpkgli.idlbpkg}">
					<div
						style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>
						<input type="checkbox" value="{$T.lbpkgli.idlbpkg}"
							id="pkgcheck{$T.lbpkgli.idlbpkg}"
							onclick="sendPkgToAsign({$T.lbpkgli.idlbpkg})" />
					</div>
					<div
						style='width: 92%; height: 23px; padding-left: 1%; padding-top: 5px; text-align: left;'
						id="PkgCodNm{$T.lbpkgli.idlbpkg}">{$T.lbpkgli.pkgcod} -
						{$T.lbpkgli.pkgnm}</div>
					<input type="hidden" id="PkgCodCharge{$T.lbpkgli.idlbpkg}"
						value="{$T.lbpkgli.pkgchrg}" />
				</div>
				{#param name=xp value=1}{#param name=xt value=1} {#foreach
				$T.lbpkgli.pkgprotstli as pkgprotstli} {#if
				$T.pkgprotstli.typeTP=='P'}
				<div
					style='width: 94%; float: right; border-bottom: 1px solid #069;'
					id="pkgproDiv{$T.pkgprotstli.idprotst}">
					<div
						style='width: 100%; height: 28px; border-bottom: 1px solid #069; border-left: 1px solid #069;'
						id="pkgproIdDiv{$T.pkgprotstli.idprotst}">
						<div
							style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>
							<input type="checkbox" value="{$T.pkgprotstli.idprotst}"
								id="pkgprocheck-{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}" />
						</div>
						<div
							style='width: 92%; height: 23px; padding-left: 1%; padding-top: 5px; text-align: left;'
							id="pkgProCodNm-{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}">{$T.pkgprotstli.tstCod}
							- {$T.pkgprotstli.tstNm}</div>
						<input type="hidden"
							id="pkgProCodCharge-{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}"
							value="{$T.pkgprotstli.tstRt}" />
					</div>
					{#param name=x value=1} {#foreach $T.pkgprotstli.lbpkgproli as
					lbpkgproli}
					<div
						style='width: 94%; height: 28px; border-bottom: 1px solid #069; float: right;'
						id="pkgproTestDiv-{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}-{$T.lbpkgproli.idtst}">
						<div
							style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; border-left: 1px solid #069; padding-top: 5px;'>
							<input type="checkbox" value="{$T.lbpkgproli.idtst}"
								id="pkgproTestcheck-{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}-{$T.lbpkgproli.idtst}" />
						</div>
						<div
							style='width: 92%; height: 23px; padding-left: 1%; padding-top: 5px; text-align: left;'
							id='pkgproTestNm-{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}-{$T.lbpkgproli.idtst}'>
							{$T.lbpkgproli.tstCod} - {$T.lbpkgproli.tstNm}</div>
						<input type='hidden'
							id='pkgproTestCharge-{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}-{$T.lbpkgproli.idtst}'
							value='{$T.lbpkgproli.tstRt}' />
					</div>
					<input type="hidden" value="{$T.lbpkgproli.idtst}"
						id="pkgProTestId-{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}-{$P.x++}" />
					{#/for}<input type="hidden"
						id="pkgproTestCount{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}"
						value="{--$P.x}" />
				</div>

				<input type="hidden" value="{$T.pkgprotstli.idprotst}"
					id="pkgProId-{$T.lbpkgli.idlbpkg}-{$P.xp++}" /> {#/if} {#if
				$T.pkgprotstli.typeTP=='T'}
				<div
					style='width: 94%; height: 28px; border-bottom: 1px solid #069; float: right;'
					id="pkgtestDiv{$T.pkgprotstli.idprotst}">
					<div
						style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px; border-left: 1px solid #069;'>
						<input type="checkbox" value="{$T.pkgprotstli.idprotst}"
							id="pkgtestcheck{$T.pkgprotstli.idprotst}" />
					</div>
					<div
						style='width: 92%; height: 23px; padding-left: 1%; padding-top: 5px; text-align: left;'
						id="pkgtestNm-{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}">
						{$T.pkgprotstli.tcd} - {$T.pkgprotstli.tstNm} <input type="hidden"
							id="pkgtestCharge-{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}"
							value="{$T.pkgprotstli.idprotst}" />
					</div>
				</div>
				<input type="hidden" value="{$T.pkgprotstli.idprotst}"
					id="pkgTestId-{$T.lbpkgli.idlbpkg}-{$P.xt++}" /> {#/if} {#/for}<input
					type="hidden" id="pkgproCount{$T.lbpkgli.idlbpkg}"
					value="{--$P.xp}" /><input type="hidden"
					id="pkgTestCount{$T.lbpkgli.idlbpkg}" value="{--$P.xt}" />
			</div>
			{#/for}{#foreach $T.lbHedLi[0].lbProLi as lbProLi}
			<div style='width: 100%;' id="proDiv{$T.lbProLi.proId}">
				<div
					style='width: 100%; height: 28px; border-bottom: 1px solid #069;'
					id="proIdDiv{$T.lbProLi.proId}">
					<div
						style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>
						<input type="checkbox" value="{$T.lbProLi.proId}"
							id="procheck{$T.lbProLi.proId}"
							onclick="sendProToAsign({$T.lbProLi.proId})" />
					</div>
					<div
						style='width: 92%; height: 23px; padding-left: 1%; padding-top: 5px; text-align: left;'
						id="ProCodNm{$T.lbProLi.proId}">{$T.lbProLi.proCode} -
						{$T.lbProLi.proNm}</div>
					<input type="hidden" id="ProCodCharge{$T.lbProLi.proId}"
						value="{$T.lbProLi.proChr}" />
				</div>
				{#param name=x value=1} {#foreach $T.lbProLi.protestLi as protestLi}
				<div
					style='width: 94%; height: 28px; border-bottom: 1px solid #069; float: right;'
					id="proTestDiv-{$T.protestLi.testId}-{$T.lbProLi.proId}">
					<div
						style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; border-left: 1px solid #069; padding-top: 5px;'>
						<input type="checkbox" value="{$T.protestLi.testId}"
							id="proTestcheck-{$T.protestLi.testId}-{$T.lbProLi.proId}"
							id="proTestcheck{$T.lbProLi.proId}"
							onclick="sendProTestToAsign({$T.protestLi.testId},{$T.lbProLi.proId})" />
					</div>
					<div
						style='width: 92%; height: 23px; padding-left: 1%; padding-top: 5px; text-align: left;'
						id='proTestNm-{$T.protestLi.testId}-{$T.lbProLi.proId}'>
						{$T.protestLi.tstCod} - {$T.protestLi.tstNm}</div>
					<input type='hidden'
						id='proTestCharge-{$T.protestLi.testId}-{$T.lbProLi.proId}'
						value='{$T.protestLi.tstRt}' />
				</div>
				<input type="hidden" value="{$T.protestLi.testId}"
					id="ProTestId-{$T.lbProLi.proId}-{$P.x++}" /> {#/for}<input
					type="hidden" id="proTestCount{$T.lbProLi.proId}" value="{--$P.x}" />
			</div>
			{#/for} {#foreach $T.lbHedLi[0].lbTestLi as lbTestLi}
			<div
				style='width: 100%; height: 28px; border-bottom: 1px solid #069;'
				id="testDiv{$T.lbTestLi.tid}">
				<div
					style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>
					<input type="checkbox" value="{$T.lbTestLi.tid}"
						id="testcheck{$T.lbTestLi.tid}"
						onclick="sendTestToAsign({$T.lbTestLi.tid})" />
				</div>
				<div
					style='width: 92%; height: 23px; padding-left: 1%; padding-top: 5px; text-align: left;'
					id="testNm{$T.lbTestLi.tid}">
					{$T.lbTestLi.tcd} - {$T.lbTestLi.tnm} <input type="hidden"
						id="testCharge{$T.lbTestLi.tid}" value="{$T.lbTestLi.trt}" />
				</div>
			</div>
			{#/for}
		</div>

		<div id="div1" style="visibility: hidden"><%=request.getParameter("myObj")%></div>

		<div id="testDetails" style="display: none;"></div>
		<input type="hidden" id="treatmentId" />
		<input type="hidden" id="queryType" value="insert" />
		<input type="hidden" id="labPatId" value="0" />
		<input type="hidden" id="testResultMastId" value="0" />
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>