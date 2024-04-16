<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<title>OT Reports</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<meta name="viewport" content="user-scalable=no, width=device-width" />

<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- TODO -->
<!-- FULL CALENDAR -->
<link rel="stylesheet" type="text/css"
	href="js/fullcalendar/fullcalendar.min.css" />
<!-- GRITTER -->

<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">
<!-- Auto-Suggestion 5/1/2015-->
<!-- ----for table auto complete-------------- -->
<link rel="stylesheet" type="text/css"
    href="css/jquery-ui-1.10.3.custom.min.css" />
<!-- ----for table auto complete-------------- -->
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
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/operation.js"></script>
<!-- /for Developers  -->
<!--calender Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<!-- Auto-Suggestion 16/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("OT_dashboard"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		})
	});
</script>

<script type="text/javascript">
	onload = function() {
		$("#opeman").addClass("anchorActive");
		fetchOTReportdetails('onload');
	
	}
</script>
<style type="text/css">



</style>
</head>

<body style="background: white ! important;">

	<section id="page">
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${ sessionScope.userType != null }">

			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header_Nobel.jsp"%>
				</header>
				<!--/HEADER -->

				<!--Start Left Menu -->
				<%@include file="left_menu_otmanagement.jsp"%>
				<!--End Left Menu -->
				<%
					java.util.Calendar currentDate = java.util.Calendar
								.getInstance();
						java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
								"dd-MM-yyyy");
						java.text.SimpleDateFormat formatter1 = new java.text.SimpleDateFormat(
								"dd/MM/yyyy");
						String todays_date = formatter.format(currentDate.getTime());
						String todays_date1 = formatter1.format(currentDate.getTime());
				%>
				<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12">

								<!-- Page Date Print Discards-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-8-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
												<li><a href="OT_Reports.jsp">OT</a></li>
												<li><a href="OT_Reports.jsp">OT
														Reports</a></li>
												
												
											</ul>
											<div class="pull-right" style="margin-top:2px" >
													<button onclick="showotreports()" title="" data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-primary" data-original-title="Export" id="btnPrint">
														EXPORT
													</button>
													<script type="text/javascript">

														$(document).on('click', '#btnPrint', function (e) {
															var clonedContent = $('div[id$=companyReport]').clone();
	
														    clonedContent.find('th').css({
														        'background-color': '#CCFF66',
														        'border': '1px solid black', // Add border to heading cells
														        	 'text-align': 'center',
														        	 'vertical-align': 'middle'
														    });
	
														    clonedContent.find('td').css({
														    	 'background-color': '#d3d3d3', 
														        'border': '1px solid black',
														        //'width': '100px', // Adjust width as per your requirement
														        	 'text-align': 'center',
														        	 'vertical-align': 'middle'
														    });
														    var result = 'data:application/vnd.ms-excel,' + encodeURIComponent(clonedContent.html());
														    var link = document.createElement("a");
														    document.body.appendChild(link);
														    link.download = " otPatientWiseReport.xls";
														    link.href = result;
														    link.click();
														});																												
													</script> 
													
												<button onclick="showotprintotreports('onload')" title="" data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-danger" style="display: none;" >
														PRINT
													</button>
												</div>
										</div>
									</div>
								</div>
								<!-- Page Date Print Discards-->
							

								<div class="divide-20"></div>
								<div class="container">
					
						<div style="height: 100%; margin-top: -4%; padding-left: 20px; border: 1px solid #b8b8b8;margin-left:-30px" class="col-md-12-1" id="">

										<div style="margin-bottom: 10px;margin-top: 2px ;margin-left:-11px;background-color:#FFEFD5" class="col-md-12-1 center">
											<h4 align="center" id="title" style="margin-left:-160px"> OT Reports</h4>
											
										</div>

										<div style="margin-top: 0px; margin-bottom: 10px" class="col-md-6-1">
											<div style="margin-top: 9px;" class="col-md-2-1">
												<b>From:</b>
											</div>
											<div style="margin-top: 9px;" class="col-md-4-1">
												<input type="text" onfocus="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)" required="" placeholder="From Date" readonly="" class="form-control input-SmallText" name="txtBillDate" id="popup_container2">
											</div>
										</div>

										<div style="margin-top: 0px; margin-bottom: 10px;" class="col-md-6-1 ">
											<div style="margin-top: 9px;" class="col-md-2-1">
												<b>To:</b>
											</div>
											<div style="margin-top: 9px;" class="col-md-4-1">
												<input type="text" id="popup_container3" name="popup_container3" onclick="displayCalendar(document.getElementById('popup_container3'),'dd/mm/yyyy',this)" readonly="readonly" placeholder="To Date" class="form-control input-SmallText">
											</div>
										</div>

										<div style="margin-top: 0px; margin-bottom: 10px" class="col-md-12-1">
										<div style="margin-top: 0px; margin-bottom: 10px" class="col-md-6-1">
										<div style="margin-top: 9px;" class="col-md-2-1">
												<b>Patient Name:</b>
											</div>
										<div class="col-md-4-1" style="margin-top: 9px;width:180px">
											<input type="text" name="byName1" id="byName1" class="typeahead form-control input-SmallText" onkeyup="getIPDPatientDetails(this.id,'Emg')" placeholder="Patient Name"></input>

											</div>
											</div>
											<div style="margin-top: 0px; margin-bottom: 10px" class="col-md-6-1">
											<div style="margin-top: 9px;" class="col-md-2-1">
												<b>Patient ID:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
<input type="text" placeholder="Patient ID" onkeypress="return validateNumbers(event)" name="byId1" class="form-group form-control input-SmallText" id="byId1">
											</div>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;margin-left: 24%" align="center">
												<button style="margin-left: 5%;" onclick="fetchOTReportdetails('select')" id="getCategoryItemData" type="button" class="btn btn-xs btn-success">Get Data</button>
											</div>

										</div>
									</div>
									<div class="col-sm-12-1" style="margin-left:-31px;overflow-y: scroll;height: 611px;margin-top:29px;border:silver solid 1px" id="companyReport">
									<!-- <div class="" style="margin-left:389px"><label class="center" style="width:200px;font-size:16px">Nobel Hospital Pvt Ltd</label><br />
									<label class="center" style="width:320px;margin-left:-41px">..153,Magarpatta City Road,Hadapsar,Pune pin -411013 ,Phone No.020-66285000/43285000</label>
								
								
									
									</div> -->
													<table id="doctorMasterPojo" style="width: 100%; margin-top: 10px;" class="table table-bordered table-condensed cf">
														<thead class="cf">
															<tr>
																<th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">#</div></th>
																<!-- <th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Charges ID</div></th> -->
																	<th style="height: 21.5px;" class="col-md-4-1 center"><div class="TextFont">Head Name</div></th>		
																<th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">Date</div></th>
															
																<th style="height: 21.5px;" class="numeric col-md-2-1 center"><div class="TextFont">Amount</div></th>
																
															</tr>
														</thead>
														<tbody id="dateop"></tbody>
													</table>
												</div>
					</div>
								
							</div>
							<!-- End id="content" -->
						</div>
						<!-- End class="row" -->
					</div>
					<!-- class="container" -->
				</div>
				<!-- id="main-content" -->
			</div>
			<!-- id="outer" -->

			<%@include file="footer_nobel.jsp"%>
			<div style="display: none;" id="OTDetailDiv"></div>
		</c:if>
	</section>
</body>
</html>























<%-- 

<body>
	<c:if test="${ sessionScope.userType != null }">
		<div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div>
		<div id="outer">
			<!-- <div id="top18">
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
									style='font-size: 11px; background-color: #FC0; border: none; width: 100%; padding: 5px; cursor: pointer;'
									type='button' value='Save Now'
									onclick="saveProcedureTypeDetails()" />
							</div>

							<div style="padding-right: 2%; width: 30%;" id="addOtDiv">

							</div>
						</div>
					</div>
				</div>
			</div> -->




			<%@include file="Menu_Header.jsp"%>
			<div id="right">

				<div id="leftContent" class="sidebar"
					style="height: 100%; margin-top: 1px; margin-bottom: 5px;">

					<%@include file="left_menu_otmanagement.jsp"%>


				</div>


				<div id="rightContent" style="height: 100%;">
					<div style="width: 100%; height: 1%; background-color: #85a7d4;"></div>
					<div style="width: 100%; height: 99%;">
						<div id="rightContActual">


		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
		<div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div>
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

			<%@include file="left_menu_otmanagement.jsp"%>


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
							<!-- /Common -->

							<div id="OTManagementDiv"
								style="width: 35%; height: 40%; padding-top: 4%"></div>

							<div id="search"
								style="width: 58%; margin-left: 2%; margin-bottom: 20px;">
								<div style='width: 80px;'>Search :</div>
								<div style='width: 90px; padding-left: 10px;'>Procedure
									Type</div>
								<div style='width: 30%;'>
									<input style='width: 100%;' name='byName' type='text'
										id='byName' />
								</div>
								<div style='width: 80px; padding-left: 30px;'>
									<input type='button' value='Search' class='edit'
										onclick='searchPT()' />
								</div>

							</div>
							<div style="width: 63%; height: 85%; margin-left: 2%;">
								<div
									style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'>
									<div style='width: 100%;'>
										<div
											style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div>
										<div
											style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>
											ID</div>
										<div
											style='width: 39%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Procedure
											Type</div>
										<div
											style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Edit</div>
										<div
											style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center'>Delete
										</div>
									</div>
								</div>
								<div id="OTMangTemp"
									style='height: 87%; width: 99.7%; overflow-y: auto; border: 1px solid #436a9d;'>

								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
			<div style="display: none;" id="OTDetailDiv"></div>
			<%@include file="Footer.jsp"%>
		</div>
	</c:if>

	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>


 --%>