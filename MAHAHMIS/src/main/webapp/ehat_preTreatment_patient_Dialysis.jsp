<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<html lang="en">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<title>HeamoDialysis Previous Treatment Patient </title>

<link rel="stylesheet" type="text/css" href="js/colorpicker/css/colorpicker.min.css">
<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link rel="stylesheet" type="text/css" href="bootstrap-dist/css/bootstrap.min.css" media="screen">
<link rel="stylesheet" type="text/css" href="font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="css/datepicker.css" media="screen">
<link rel="stylesheet" type="text/css" href="js/bootstrap-daterangepicker/daterangepicker-bs3.css">
<!-- DATA TABLES -->
<link rel="stylesheet" type="text/css" href="js/datatables/media/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css" href="js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css" href="js/datatables/extras/TableTools/media/css/TableTools.min.css" />
<!-- FULL CALENDAR -->
<link rel="stylesheet" type="text/css" href="js/fullcalendar/fullcalendar.min.css" />
<script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></link>
<link rel="stylesheet" type="text/css" charset="utf-8" href="css/scal.css">
<link rel="stylesheet" type="text/css" href="js/uniform/css/uniform.default.min.css" />
<link rel="stylesheet" type="text/css" href="css/jquery-ui-1.10.3.custom.min.css" />
<link href="appointment/myTheme.css" rel="stylesheet" media="screen" />
<link href="appointment/defaultTheme.css" rel="stylesheet" media="screen" />
<link href="appointment/960.css" rel="stylesheet" media="screen" />
<link rel="stylesheet" type="text/css" href="timepeacker/jquery.datetimepicker.css" />

<script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<!-- <script type="text/javascript" src="js/jquery-ui.js"></script> -->
<script type="text/javascript" src="js/js.js"></script>

<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"	src="js/jquery-validate/additional-methods.min.js"></script>
<script src="timepeacker/jquery.datetimepicker.js"></script>

<script src="appointment/jquery.fixedheadertable.js"></script>
<script type="text/javascript" src="js/colorpicker/js/bootstrap-colorpicker.min.js"></script>
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.js"></script>
<script type="text/javascript" src="js/uniform/jquery.uniform.min.js"></script>
<script type="text/javascript" src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript" src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<script type="text/javascript" src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
<script type="text/javascript" src="js/datatables/media/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
<script type="text/javascript" src="js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
<script type="text/javascript" src="js/fullcalendar/fullcalendar.min.js"></script>
<script type="text/javascript" src="js/jQuery-Cookie/jquery.cookie.min.js"></script>
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>
<script type="text/javascript" src="js/ehat_dialysis.js"></script>
<script src="js/script.js"></script>
<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
		
		
<script type="text/javascript">
	jQuery(document).ready(function() {
		App.setPage("calendar"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});

	});
				
</script>
<script type="text/javascript">
	onload = function() {
	
	}
	
</script>

</head>

<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd-MM-yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>
<body>
	<c:if test="${ sessionScope.userType != null }">
		<input type="hidden" id="todays_date" value="<%=todays_date%>" />
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header.jsp"%>
		</header>
		<section id="page">
			<%@include file="left_menu_HaemoDialysis.jsp"%>
			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header" style="height: 32px;">
										<ul class="breadcrumb col-md-12-1"
											style="padding: 4px 10px; margin-top: 1px;">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><a href="ehat_HaemoDialysis_Dashboard.jsp">
													Dialysis </a></li>
											<li>Dashboard</li>
										</ul>
									</div>
								</div>
							</div>
							<div class="col-lg-12">
								<div class="row">
									<div class="panel panel-primary" style="margin-top: -1%">
									   <div class="panel-heading " id="divEhatContent"></div>
										<div class="panel-body" style="height: 100px">
											<div class="col-md-6" style="margin-top: 2%">
												<div class="col-md-2" style="margin-top: 0%;">
													<label>Patient Name</label>
												</div>
												<div class="col-md-6" style="margin-top: 0%;">
													<input id="patientNameDialysis"
														class="typeahead form-control input-SmallText "
														type="text" name="patientNameDialysis"
														onkeyup="autoSuggestionpatientNameByDailysis(this.id);"
														autocomplete="off"> <input id="patientIdDialysis"
														type="hidden" value="0" />
												</div>
											</div>

											<div class="col-md-6" style="margin-left: -19%; margin-top: 2%">											
												<div class="col-md-2" style="margin-top: 0%">
													<label>PatientID</label>
												</div>

												<div class="col-md-4" style="margin-top: 0%">
												<input id="patientIdDialysis1"class="form-control input-SmallText" type="text"
												   name="patientIdDialysis1" />

												<div class="col-md-8"style="margin-left: 108%; margin-top: -12%">
												<input type="button" class="btn btn-xs btn-warning"value="show"
												    onclick="getDialysisPreviousPatienttDetails();" />
												</div>												
												</div>
											</div>

										</div>
									</div>
								</div>
							</div>

							<div id="divTestDashVoucherList" class=" box border col-md-12"
										style="margin-top: -21px; height: 350px; overflow-x: auto; overflow-y: auto;">

										<form class="form-horizontal col-md-12">

											<table border="1" id="printTable" style="margin-top: 20px;">

												<thead id="tableTestVoucherListHead">
													<tr style="background-color: #EEEEEE; height: 30px;">
														<th class='col-md-1 center'>#</th>
														<th class='col-md-1 center'>Patient Name</th>
														<th class='col-md-1 center'>UHID</th>
														<th class='col-md-1 center'>TreatmentId</th>
														<th class='col-md-1 center'>Date</th>
														<th class='col-md-1 center'>Pre WT</th>
														<th class='col-md-1 center'>Pre B.P</th>
														<th class='col-md-1 center'>Post Wt</th>
														<th class='col-md-1 center'>Post B.P</th>
														<th class='col-md-1 center'>V.P</th>
														<th class='col-md-1 center'>A.P</th>
														<th class='col-md-1 center'>B.F</th>
														<th class='col-md-1 center'>Time On</th>
														<th class='col-md-1 center'>Time Off</th>
														<th class='col-md-1 center'>Duration</th>
														<th class='col-md-1 center'>Heparin</th>
														<th class='col-md-1 center'>Remark</th>
														<th class='col-md-1 center'>View</th>

													</tr>
												</thead>
												<tbody id="tableTestVoucherList">
												</tbody>
											</table>
										</form>
									</div>
								</div>
							</div>
						</div>
			      </div>
		    </section>
	  <%@include file="Footer.jsp"%>
	</c:if>
	<c:if test="${sessionScope.userType == null}">
	<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>