<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
<title>Area Wise Patient Report</title>


<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="bootstrap-dist/css/bootstrap.min.css" media="screen">
<link rel="stylesheet" type="text/css"
	href="font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />

<!-- STYLESHEETS -->

<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- FULL CALENDAR -->
<link rel="stylesheet" type="text/css"
	href="js/fullcalendar/fullcalendar.min.css" />


<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>

<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript" src="js/profeesAdvance2.js"></script>

<!-- New Js Files -->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
<!-- End New JS File -->



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


<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<!-- Auto-Suggestion 16/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<script>
jQuery(document).ready(function() {
	App.setPage("Dashboard"); //Set current page
	App.init(); //Initialise plugins and elements
});
</script>

<script type="text/javascript">
	onload = function() {
		fetchStateListForReg("state");
		fetchDistrictListForReg("district");
		fetchTalukaListForReg("taluka");
		fetchCityListForReg("city");
		//areaWisePatientReport2();
		
	};
</script>
</head>
<body style="background: white ! important;">
	<section id="page">

		<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	<c:if test="${sessionScope.userType != null}">

		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

			<%@include file="menu_report.jsp"%>

			<%
				java.util.Calendar currentDate = java.util.Calendar.getInstance();
				java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
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
											<li>Date : </li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="area_wise_patient_report2.jsp">Patient Report Area Wise</a></li>
												<li class="pull-right">
													
												<!-- 	<button id="txtbtnReset" class="btn btn-xs btn-danger" value="Reset" onclick="proFeesResetReport('report')" title="" data-placement="left" data-toggle="tooltip" data-original-title="Reset">
															<i class="fa fa-print"></i> Reset
													</button> -->
													
													<!-- <button id="txtbtnPrint" class="btn btn-xs btn-warning" value="print" onclick="demoFromHTML()" title="" data-placement="left" data-toggle="tooltip" data-original-title="Print">
															<i class="fa fa-print"></i> Print
													</button> -->
													<button id="btnExport" class="btn btn-xs btn-success" value="Excel"  title="" data-placement="left" data-toggle="tooltip" data-original-title="Excel">
															<!-- <i class="fa fa-file"></i> --> Export To Excel
													</button>
													<!-- following code for Excel sheet -->
													<script type="text/javascript">

															$(document).on('click', '#btnExport', function (e) {
																var clonedContent = $('div[id$=divTestDashVoucherList]').clone();
		
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
															    link.download = "Patient Report Area Wise.xls";
															    link.href = result;
															    link.click();
															});
													
													</script>
												</li>
											</ul>
										</div>
									</div>
								</div>


								<div class="panel panel-default" style="margin-top:-16px;">
									<div class="panel-body">



										<div id="diveMain" class="col-md-12-1">

											<div class="divide-10"></div>

											<!-- -------------------------------------------------------------------- -->

											<div id="divLine1" class=" box border col-md-12">

												<form class="form-horizontal col-md-12">

													<div class="divide-20"></div>
													
													<div class="col-md-2">
														<div class="row">
															<label class="TextFont"> Town </label> 
															<select
																id="townId" name="townId"
																class="form-control input-SmallText"
																onchange="setTalukaAndDistrictAndStateForRegistration(this.value,'local')"
																style="width: 90%;">
																
															</select>
															<!-- <input id="unitFlag" type="hidden" value="default"> -->
														</div>
														<div class="divide-20"></div>
													</div>
													<div class="col-md-2">
														<div class="row">
															<label class="TextFont"> Taluka </label> 
															<select
																id="talukaId" name="talukaId"
																class="form-control input-SmallText"
																onchange="setCityAndDistrictAndStateForRegistration(this.value,'local')"
																style="width: 90%;">
																
															</select>
															<!-- <input id="unitFlag" type="hidden" value="default"> -->
														</div>
														<div class="divide-20"></div>
													</div>
													<div class="col-md-2">
														<div class="row">
															<label class="TextFont"> District </label> 
															<select
																id="districtId" name="districtId"
																class="form-control input-SmallText"
																onchange="setTalukaAndCityAndStateForRegistration(this.value,'local')"
																style="width: 90%;">
																
															</select>
															<!-- <input id="unitFlag" type="hidden" value="default"> -->
														</div>
														<div class="divide-20"></div>
													</div>
													<div class="col-md-2">
														<div class="row">
															<label class="TextFont"> State </label> 
															<select
																id="stateId" name="stateId"
																class="form-control input-SmallText"
																onchange="setTalukaAndCityAndDistrictForRegistration(this.value,'local')"
																style="width: 90%;">
																
															</select>
															<!-- <input id="unitFlag" type="hidden" value="default"> -->
														</div>
														<div class="divide-20"></div>
													
													</div>
													
													<div class="col-md-2">
														<div class="row">
															<label class="TextFont"> Diagnosis </label> 
															<input type="text"
																class="typeahead form-control input-SmallText"
																onkeypress="setDiagnosisAutocompleteAreaWise('diagnosis', 'onkeypress');"
																id="diagnosis" name="diagnosis" placeholder="diagnosis">
															<!-- <input id="unitFlag" type="hidden" value="default"> -->
														</div>
														
													</div>
													
													<div class="col-md-1">
														<div class="row">
														<br>
														<button class="btn btn-xs btn-primary"
														data-toggle="tooltip" data-placement="left"  style="width: 96%;margin-top: 4px;"
														title="Show" onclick="areaWisePatientReport2()" type="button">
														<b> Show </b>
														</button>
														</div>
														
													</div>
													

												</form>
												<div class="divide-10"></div>

											</div>

											<!-- -------------------------------------------------------------------- -->

											<div id="divTestDashVoucherList" class=" box border col-md-12"
												style="margin-top: -21px;height: 450px; overflow-x: auto; overflow-y: auto; ">
												
												<!-- -----------Loading Images-------- -->
														<div style="display: none; overflow: hidden; margin-top:10%" id="ajaxloaderimg" class="center">
															<img src="/EhatEnterprise/images/ajax_loader_blue_64.gif">
														</div>
												<!-- -----------Loading Images-------- -->
														
												<form class="form-horizontal col-md-12">
													
													<table border="1"  id="printTable" style="margin-top:20px;" bordercolor="#ddd">
															<%-- <colgroup>
															<col span="3" style="background-color: #EEEEEE">
														</colgroup> --%>
															
															<thead id="tableTestVoucherListHead" >

															</thead>
															<tbody id="tableTestVoucherList">

															</tbody>
														</table>
													
												</form>
											</div>

											<!-- ----------------------------------------------------------------------- -->

										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

<input type="hidden" id="uId" value="<%=session.getAttribute("uId")%>">
<div id="state" style="display: none;"></div>
	<div id="district" style="display: none;"></div>
	<div id="taluka" style="display: none;"></div>
	<div id="city" style="display: none;"></div>
				<%@include file="Footer.jsp"%></div>
		</c:if>

		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>

		</c:if>
	</section>
</body>
</html>