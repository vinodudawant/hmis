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
<title>Previous OPD Doctor Desk</title>

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

<!-- SELECT2 -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />

<!--calender Files  -->
<script type="text/javascript"    src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"    href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"    media="screen"></link>    
<!--TIMEPEACKER -->

<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- FULL CALENDAR -->
<link rel="stylesheet" type="text/css"
	href="js/fullcalendar/fullcalendar.min.css" />
	
	<!-- ----for search  autosuggation  complete-------------- -->
<link rel="stylesheet" type="text/css"
    href="css/jquery-ui-1.10.3.custom.min.css" />
<!-- ----for search  autosuggation  complete-------------- -->


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
	
<!-- DATA TABLES -->
<!-- <link rel="stylesheet" type="text/css" href="js/datatables/media/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css" href="js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css" href="js/datatables/extras/TableTools/media/css/TableTools.min.css" /> -->

<link rel="stylesheet" type="text/css" href="dataTable/jquery.dataTables.min.css" />
<!-- <script src="dataTable/jquery-1.12.4.js"></script> -->
<script src="dataTable/jquery.dataTables.min.js"></script>

<!-- DATA TABLES -->
<script type="text/javascript" src="js/datatables/media/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="js/datatables/media/assets/js/datatables.min.js"></script>
<!-- <script type="text/javascript" src="js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
<script type="text/javascript" src="js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script> -->
	
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/patient.js"></script>

<script type="text/javascript" src="js/bill.js"></script>
<script type="text/javascript" src="js/validate.js"></script>

<script type="text/javascript" src="js/Dashboard.js"></script>
<!-- <script type="text/javascript" src="js/billNoble.js"></script> -->
<script type="text/javascript" src="js/opd_previous_doctor_desk.js"></script>
<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript" src="js/autosuggession_patient.js"></script>

<!-- End New JS File -->

<!-- Auto-Suggestion 2/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("prevOPD_Bill_Database"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<script type="text/javascript">
		
	onload = function() {
		
		setPatientSearchType();
		getBillPrefix("",1);
		$("#patPreTreat").hide();

		$("#byName").val("");
		$("#byName").val("");
		$("#byName").val("");
		getAllPatientRecordsForPrevOPD();
		//getPreviousTreatmentPatient();
		setAvaStatus();
		$("#preOpdBill").addClass("anchorActive");
		//viewPrevOPDBillPatient("onload","opd");
		//setAutoPatientNameForMarkVisit("byName", "onload", "previousOPDbill");

		$("#patSearchType").select2();
		
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

				<%@include file="dd_menu_DoctorDesk.jsp"%>

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
											style="padding: 6px 10px; margin-top: 1px;">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="IPD_OPD_Database.jsp">Help Desk</a></li>
											<li>Previous Bill</li>
										</ul>

									</div>
								</div>
							</div>


							<div class="col-md-12-1">
								<div style="font-weight: bold;" class="col-md-1">Search
									By:</div>
								<!-- <div class="col-md-2-1">
									<label class="TextFont"
										style="margin-left: 10%; margin-top: 3%;">Patient
										Name/Patient ID:</label>
								</div> -->
								<div class="col-md-1" style="margin-top: 1%">
								<br>
								</div>
								
								<div class="col-md-3 TextFont" id="divbyName" >
																		
									<select id="patSearchType" class="form-control input-SmallText" onchange="setPatientSearchType()">
										<option value="1">Patient UHID</option>
										<option value="2">Patient Name</option>
										<option value="3">Patient Mobile</option>
									</select>
									
								</div>
								<div  class="col-md-1" style="margin-top: 1%">
								<br>
								</div>

								<div class="col-md-4 TextFont" id="divbyName">
									<input name="byName" type="text" id="byName" class="form-control input-SmallText" autocomplete="off"
										onkeyup="setAutoPatientName(this.id,'prevOpdDD',event)" placeholder="Patient Id,Name,Mobileno"/>																		
								</div>
								

							


								</div>


							<div class="divide-20"></div>
							
							
							<div class="col-md-12" style="margin-top: 7px; padding-left: 3%; width: 102.3%; margin-bottom: 16px;">
								<div class="col-md-12-1" style="overflow-y: scroll; height:510px; maxheight: auto; border: 1px solid #b8b8b8;">
									<table class="table table-condensed cf"
										style="Width: 100%;">
										<tbody id="containerprevOpd">
										
										</tbody>
									</table>
								</div>
							</div>
							
						


			<div style="display: none;" id="pageType">opd</div>

		</c:if>
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
	</section>
	
	<input type="hidden" id="billPrefix" value="">
	<input type="hidden" id="billMiddle" value="">
	<input type="hidden" id="billSufix" value="">
	
	<input type="hidden" id="patPrefix" value="">
	<input type="hidden" id="patMiddle" value="">
	<input type="hidden" id="patSufix" value="">
	
	<input type="hidden" id="recPrefix" value="">
	<input type="hidden" id="recMiddle" value="">
	<input type="hidden" id="recSufix" value="">	
	
</body>
</html>
