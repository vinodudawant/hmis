<%@page import="java.util.Calendar"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Surgery Wise Report</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<meta name="viewport" content="user-scalable=no, width=device-width" />

<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="css/bootstrap-chosen.css" />


<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script> -->

<!-- ----for table auto complete-------------- -->
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />


<!-- =-=-=-=-=-=-=-=Multi Select  Touheed=-=-=-=-=-=-=-=- -->
<!-- css for developer -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->

<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!-- JQUERY -->
<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
<!-- JQUERY UI-->
<script
	src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>

<!-- STYLESHEETS -->

<link href="ehat-design/font-awesome/css/font-awesome.min.css"
	rel="stylesheet">

<!-- DATE RANGE PICKER -->
<!-- <link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" /> -->
<!-- <!-- DATE RANGE PICKER -->
<!-- <link rel="stylesheet" type="text/css"
	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css" /> -->

<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- FULL CALENDAR -->
<link rel="stylesheet" type="text/css"
	href="js/fullcalendar/fullcalendar.min.css" />

<!--calender Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>

<!--TIMEPEACKER -->
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>
<style type="text/css">
.custom-date-style {
	background-color: red !important;
}
</style>
<!--TIMEPEACKER -->


<script src="jquery/jquery-2.1.1.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<!-- JQUERY UI-->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>

<!-- DATE RANGE PICKER -->

<!-- bootstrap datepicker -->
<link rel="stylesheet" href="ehat-design/datepicker/datepicker3.css">

<!-- SELECT2 -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/uniform/css/uniform.default.min.css" />
<!-- WIZARD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-wizard/wizard.css" />
<!-- FONTS -->
<!-- <link
	href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700'
	rel='stylesheet' type='text/css'> -->
<link href='ehat-design/css/family.css' rel='stylesheet' type='text/css'>
<script type="text/javascript" src="js/unit_master.js"></script>

<!-- Touheed code for Drag and Drop with sorting Date  14-Dec-2015-->
<script src='js/jquery.sortable.js'></script>
<!-- Touheed code for Drag and Drop with sorting -->
<!-- -=-=-=-=-=-=-=-=-=-Multi Select Touheed-=-=-=-=-=-=-=--=- -->
<script type="text/javascript" src="js/patientDeathreport.js"></script>
<!-- /for Developers  -->
<script src="js/chosen.jquery.js"></script>
<!-- Auto-Suggestion 7/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script src="js/demoConfiguration2.js"></script>
<script src="js/packagereport.js"></script>
<script type="text/javascript">
	
	jQuery(document).ajaxStart(function() {		
		
		$("#pleaseWait").show();
	});
	
	jQuery(document).ajaxStop(function() {
		
		$("#pleaseWait").hide();
	});
	
	onload = function() {		
	//	fetchAllServicecom();

		fetchopshdule();
		getreportsurgery();
	};
</script>

<script type="text/javascript">
	$(document).ready(function() {
		App.setPage("wizards_validations"); 
		App.init(); 
		//FormWizard.init();
	});
	</script>

</head>
<body style="background: white ! important;">

	<div id="pleaseWait" style="text-align: center;">
        <img style="margin-top: 250px;" height="43px" src="images/loading_black.gif"/>
        <div style="margin-top: 10px; color: white">
            <b>Please wait...</b>
        </div>
	</div>

	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>

	</c:if>
	<c:if test="${sessionScope.userType != null}">


		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

			<%@include file="menu_report.jsp"%>

			<%
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
							"dd/MM/yyyy");
					String todays_date = formatter.format(currentDate.getTime());

					Calendar cal = Calendar.getInstance();
					cal.add(Calendar.DATE, -1);
					String yesterDay_date = formatter.format(cal.getTime());
					//  System.out.println("yesterDay_date :::"+yesterDay_date);

					Calendar cal1 = Calendar.getInstance();
					cal1.add(Calendar.DATE, -2);
					String dayBeforeYesterday = formatter.format(cal1.getTime());
					//	  System.out.println("dayBeforeYesterday :::"+dayBeforeYesterday);
			%>
			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header" style="">

										<ul class="breadcrumb col-md-12-1"
											style="padding: 4px 10px; margin-top: 1px;">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><a href="ReportDashboard.jsp">Reports</a></li>
											<li><a href="ehat_surgerywise_report.jsp">SurgeryWise report</a></li>
											<li class="pull-right">
												<button id="btnExport"
													class="btn btn-xs btn-info pull-right" value="Excel"
													title="" data-placement="left" data-toggle="tooltip"
													data-original-title="Excel">Export To Excel</button>
												 <script type="text/javascript">
											
														$(document).on('click', '#btnExport', function (e) {
															var clonedContent = $('div[id$=idsurgey]').clone();
		
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
														    link.download = "SurgeryWise report.xls";
														    link.href = result;
														    link.click();
														});
												
											</script>
											</li>
										</ul>
									</div>

								<div class="col-md-12-1">
											<div class="col-md-3-1" style="margin-top: 2px">
								 	<div class="col-md-2-1"><label>From</label></div>
								 	<div class="col-md-6-1">
									 	<input id="fromDate"
											class="form-control input-SmallText" type="text"													
											onclick="displayCalendar(document.getElementById('fromDate'),'dd/mm/yyyy',this)"
											readonly="readonly" name="date" placeholder="Date" value="<%=todays_date%>">
									</div>
								</div>
								
								 <div class="col-md-3-1" style="margin-top: 2px">
									<div class="col-md-2-1"><label>To</label></div>
									<div class="col-md-6-1">
									 	<input id="lastDate"
											class="form-control input-SmallText" type="text"													
											onclick="displayCalendar(document.getElementById('lastDate'),'dd/mm/yyyy',this)"
											readonly="readonly" name="date" placeholder="Date" value="<%=todays_date%>">
									</div>
								</div>	
								<div class="col-md-1-1"><label>Surgery Name</label></div>
									  <div class="col-md-3-1" style="margin-top:-3px">
               								<select id="selOTtypeOT" value='null' name="selOTtypeOT"
													class="col-md-12-1" onchange=""></select></div>
										<div class="col-md-1-1" style="text-align: center;">
												<input class="btn btn-xs btn-primary" type="button" onclick="getreportsurgery()" value="search">
										</div>
							
								<div class="divide-40"></div>

								<div id="divMain"
									class="col-sm-12-1 tab-pane fade in active"
									style="">
								</div>

								<div class="divide-20"></div>
								<div  id="idsurgey" class="col-md-12"
									style="margin-top: 7px; padding-left: 0%; width: 102.3%; margin-bottom: 16px;">
									<div class="col-md-12"
										style="overflow-y: scroll; height: 293px; maxheight: auto; border: 1px solid #b8b8b8;margin-top:5px;">

										<table class="table table-condensed cf" style="Width: 100%;">
										<tr>
														<th style="height: 21.5px;" class="col-md-1-1 center"><div
																class="TextFont">#</div></th>
																<th style="height: 21.5px;" class="col-md-1-1 center"><div
																class="TextFont">UHID</div></th>
														<th style="height: 21.5px;" class="col-md-2-1"><div
																class="TextFont">Patient Name</div></th>
																<th style="height: 21.5px;" class="col-md-3-1"><div
																class="TextFont">Procedure Name</div></th>
																	<th style="height: 21.5px;" class="col-md-1-1"><div
																class="TextFont">Start Time</div></th>
														<th style="height: 21.5px;" class="col-md-1-1"><div
																class="TextFont">End Time</div></th>
														<th style="height: 21.5px;" class="col-md-1-1"><div
																class="TextFont">OT Room</div></th>
																
													<th style="height: 21.5px;" class="col-md-1-1"><div
																class="TextFont">Department</div></th>			
														<th style="height: 21.5px;" class="col-md-1-1"><div
																class="TextFont">Proc Type</div></th>
														
														<th style="height: 21.5px;" class="col-sm-2-1"><div
																class="TextFont">Op Date</div></th>
														
													</tr>
												<tbody id="container">

											</tbody>
										</table>
									</div>
								</div>
							</div>

								</div>
							</div>

							<%@include file="Footer.jsp"%></div>

					</div>
					<div class="ajaxmodal">
						<!-- Place at bottom of page -->
					</div>

				</div>
			</div>
		</div>
		<input type="hidden" id="admsnCount" value="<%=todays_date%>" />
		<input type="hidden" id="admsnCount1" value="<%=yesterDay_date%>" />
		<input type="hidden" id="admsnCount2" value="<%=dayBeforeYesterday%>" />
		<input type="hidden" name="from" id="popup_container3"
			value="<%=todays_date%>" />
		<input type="hidden" name="to" value="<%=todays_date%>"
			id="popup_container2" />

		<input type="hidden" id="datecallfrom" value="" />

		<input type="hidden" id="fromdate" value="0" />
		<input type="hidden" id="todate" value="0" />
		<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="operation_id" value="<%=session.getAttribute("operation_id")%>">

	</c:if>

	<!-- =-=-=-=-Touheed multiselect plugin=-=-=-=-=- -->
	<!-- =-=-=-=-=-=Multiselect=-=-=-=-=-=-=-=- -->
	<!-- JAVASCRIPTS -->
	<!-- Placed at the end of the document so the pages load faster -->

	<!-- DATE RANGE PICKER -->
	<!-- <script src="ehat-design/js/bootstrap-daterangepicker/moment.min.js"></script>

	<script src="ehat-design/datepicker/bootstrap-datepicker.js"></script> -->
	<!-- SLIMSCROLL -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<script type="text/javascript"
		src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	<!-- BLOCK UI -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
	<!-- SELECT2 -->
	<script type="text/javascript"
		src="ehat-design/js/select2/select2.min.js"></script>
	<!-- UNIFORM -->
	<script type="text/javascript"
		src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
	<!-- WIZARD -->
	<script
		src="ehat-design/js/bootstrap-wizard/jquery.bootstrap.wizard.min.js"></script>
	<!-- WIZARD -->
	<script src="ehat-design/js/jquery-validate/jquery.validate.min.js"></script>
	<script src="ehat-design/js/jquery-validate/additional-methods.min.js"></script>
	<script type="text/javascript" src="js/validate.js"></script>
	<!-- BOOTBOX -->
	<script type="text/javascript"
		src="ehat-design/js/bootbox/bootbox.min.js"></script>
	<!-- COOKIE -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>
	<script src="ehat-design/js/bootstrap-wizard/form-wizard.min.js"></script>
	<!-- -=-=-=-=-=-=-=-=-=-=-=-=Multi select-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- -->
	<!-- -=-=-=-=-=Touheed Multiselect plugin-=-=-=-=-= -->
</body>
</html>