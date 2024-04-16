<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>

<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<title>Patient Death Record</title>

<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">


<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">

<!-- STYLESHEETS -->

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
<script src="js/bootstrap-daterangepicker/moment.min.js"></script>

<script src="js/bootstrap-daterangepicker/daterangepicker.min.js"></script>

	<!-- ----for search  autosuggation  complete-------------- -->
<link rel="stylesheet" type="text/css"
    href="css/jquery-ui-1.10.3.custom.min.css" />
<!-- ----for search  autosuggation  complete-------------- -->
<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<link rel="stylesheet" type="text/css" href="css/inventoryDatepicker/css/jsDatePick_ltr.css" />
<!--TIMEPEACKER -->
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />

<link rel="stylesheet" type="text/css"	href="js/fullcalendar/fullcalendar.min.css" />

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

<script src="timepeacker/jquery.datetimepicker.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/patient.js"></script>

<script type="text/javascript" src="js/bill.js"></script>
<script type="text/javascript" src="js/validate.js"></script>

<script type="text/javascript" src="js/patientDeathreport.js"></script>

<script src="ehat-design/js/script.js"></script>
<!-- End New JS File -->

<!-- Auto-Suggestion 2/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>
<script>
	jQuery(document).ready(function() {
		App.setPage("Patient_Death"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		});
	});
</script>

<script type="text/javascript">
	onload = function() {
		$("#hospDetail").addClass("anchorActive");
		fetchdeathapatient("callform");

	}
</script>
</head>
<body style="background: white ! important;">
	<section id="page">

		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${sessionScope.userType != null }">

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
												<li><a href="UserManagement.jsp">Administrator</a></li>
												<li><a href="ehat_sponser_deathwise_report.jsp">Patient Death Record</a></li>
												<div class="pull-right">
													
													<button onclick="getDeathRecord()" data-original-title="Excel" data-toggle="tooltip" data-placement="left" title="" value="Excel" class="btn btn-xs btn-info pull-right" id="btnExport">Export To Excel</button>
													<button class="btn btn-xs btn-danger"
													data-toggle="tooltip" data-placement="left" title="Get all patient"
													onclick="getreport()" value="" style="margin-right: 8px">
													Print
													
													</button>
													<script type="text/javascript">
																	$(document).on('click', '#btnExport', function (e) {
																	var clonedContent = $('div[id$=iddeath]').clone();
				
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
																    link.download = "Patient Death Record Report.xls";
																    link.href = result;
																    link.click();
																});
													</script>
												</div>
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->								

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
									
									<div class="col-md-1-1" style="text-align: center;">
										<input class="btn btn-xs btn-primary" type="button" onclick="fetchdeathapatient('date')" value="search">
									</div>
							
								<div class="divide-40"></div>

								<div id="divMain"
									class="col-sm-12-1 tab-pane fade in active"
									style="">
								</div>

								<div class="divide-20"></div>
								<div  id="iddeath" class="col-md-12"
									style="margin-top: 7px; padding-left: 0%; width: 102.3%; margin-bottom: 16px;">
									<div class="col-md-12"
										style="overflow-y: scroll; height: 293px; maxheight: auto; border: 1px solid #b8b8b8;margin-top:5px;">

										<table class="table table-condensed cf" style="Width: 100%;">
											<tbody id="container">

											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
		<input type="hidden" id="deathId" value="0">
		<input type="hidden" id="callfrom" value="all">
		<input type="hidden" id="searchFrom" value="all">
		
		<script>
			$('#discharge_Time_note').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 1
			});
		</script>
		
		<%@include file="Footer.jsp"%></div>
			<input type="hidden" id="hiddenHosId" />
		<div id="state" style="display: none;"></div>
		</c:if>
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
	</section>
</body>
</html>