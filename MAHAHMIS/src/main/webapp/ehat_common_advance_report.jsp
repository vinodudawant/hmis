<%@page import="java.util.Calendar"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<title>Common Advance Report</title>
<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">

<!-- <link rel="stylesheet" type="text/css" href="js/datePicker.css" />

<script src="js/jquery.datePicker-min.js" type="text/javascript"></script> -->
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
<script type="text/javascript" src="ehat-design/js/jspdf.min.js"></script>


<!-- for Developers  -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/validate.js"></script>

<script type="text/javascript" src="js/hisab/hisab.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/ehat_billing.js"></script>
<!-- <script type="text/javascript" src="js/patient.js"></script> -->
<!-- <script type="text/javascript" src="js/ExtraJs/Shortcut_js/shortcut.js"></script> -->

<!-- /for Developers  -->

<!-- Auto-Suggestion 8/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!--calender Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>


<script type="text/javascript">
	onload = function() {

		searchDailyCashReport('onload');
		setAutoPatientName("byUName", "onload", "HRMgmt_Database");
		setUserInputReadonly();
	};

	jQuery(document).ajaxStart(function() {
		//alert("hi ajax start");
		$("body").addClass("loading");
	});

	jQuery(document).ajaxStop(function() {
		$("body").removeClass("loading");
		//alert("hi ajax stop");
	});
</script>

<style type="text/css">

/* Start by setting display:none to make this hidden.
   Then we position it in relation to the viewport window
   with position:fixed. Width, height, top and left speak
   speak for themselves. Background we set to 80% white with
   our animation centered, and no-repeating */
.ajaxmodal {
	display: none;
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('images/ajax_loader_blue_64.gif') 50% 50% no-repeat;
}

/* When the body has the loading class, we turn
   the scrollbar off with overflow:hidden */
body.loading {
	overflow: hidden;
}

/* Anytime the body has the loading class, our
   ajaxmodal element will be visible */
body.loading .ajaxmodal {
	display: block;
}
</style>

<script>
	jQuery(document).ready(function() {
		App.setPage("Report"); //Set current page
		App.init(); //Initialise plugins and elements
	});
	
	function getDailyCashPdf(){
		
		var fromDate=($("#fromDate").val()).split("/");
		var fDate = (fromDate[2] + "-" + fromDate[1] + "-" + fromDate[0]);  // added by sandip
		var toDate=($("#lastDate").val()).split("/");
		var tDate = (toDate[2] + "-" + toDate[1] + "-" + toDate[0]);	
		var userId=$("#userId").val();
		var deptId=$("#deptId").val();
		window.open("ehat_common_advance_pdf.jsp?fromDate="+fDate+"&toDate="+tDate+"&userId="+userId+"&deptId="+deptId);
	}
	
</script>
</head>
<body>
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
									<div class="page-header" style="">

										<ul class="breadcrumb col-md-12-1"
											style="padding: 4px 10px; margin-top: 1px;">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li>Report</li>
											<li><a href="ehat_common_advance_report.jsp">Common Advance Report</a></li>

											<div class="pull-right">
												<input id="getPdfBtn" type='button'
													onclick="getDailyCashPdf()" value='Get Report'
													class='btn btn-xs btn-success' />
											</div>
										</ul>
									</div>
								</div>
							</div>
							<!-- /Common -->

							<div class="col-md-12-1">
								
								<div class="col-md-3-1" style="margin-top: 2px">
									<div class="col-md-2-1">
										<label>From</label>
									</div>
									<div class="col-md-6-1">
										<input id="fromDate" class="form-control input-SmallText"
											type="text"
											onclick="displayCalendar(document.getElementById('fromDate'),'dd/mm/yyyy',this)"
											readonly="readonly" name="date" placeholder="Date"
											value="<%=todays_date%>">
									</div>
								</div>

								<div class="col-md-3-1" style="margin-top: 2px">
									<div class="col-md-2-1">
										<label>To</label>
									</div>
									<div class="col-md-6-1">
										<input id="lastDate" class="form-control input-SmallText"
											type="text"
											onclick="displayCalendar(document.getElementById('lastDate'),'dd/mm/yyyy',this)"
											readonly="readonly" name="date" placeholder="Date"
											value="<%=todays_date%>">
									</div>
								</div>

								<div class="col-md-3-1" id="divbyName" style="margin-top: 2px">
									<div class="col-md-2-1">
										<label>User</label>
									</div>
									<div class="col-md-6-1">
										
										<input name="byName" type="text" id="byName"
											class="typeahead form-control input-SmallText"
											onkeypress="return validatealphabetic(event)"
											value="<%=session.getAttribute("userName")%>"
											style="display: none;" /> <input name="byName" type="text"
											id="byUName" class="typeahead form-control input-SmallText"
											onkeypress="return validatealphabetic(event)" />
									</div>
								</div>


								<div class="col-md-2-1" style="margin-top: 2px">
									<div class="col-md-2-1">
										<label>Dept</label>
									</div>
									<div class="col-md-6-1">
										<select id="deptId" class="form-control input-SmallText">
											<option value="0">All</option>
											<option value="1">Opd</option>
											<option value="2">Ipd</option>
											<option value="3">Diagnosis</option>
										</select>
									</div>
								</div>
								<!-- <div class="col-md-1-1">
									<label class="radio-inline">Pharmacy <input
										id="idPharmacy" type="checkbox" value='Get Report'
										class='btn btn-xs btn-success' />
									</label>

								</div>

								<div class="col-md-1-1">
									<input type="button" value="Show"
										class="btn btn-xs btn-primary" class="edit"
										onclick="searchDailyCashReport('search')" />
								</div> -->
							</div>
						</div>
					</div>
				</div>
				<%@include file="Footer.jsp"%></div>
		</div>
		<div class="ajaxmodal">
			<!-- Place at bottom of page -->
		</div>
	</c:if>

	<div id="userObj" style="display: none;"></div>
	<input type="hidden" id="userId"
		value="<%=session.getAttribute("userId1")%>">
	<!-- <input type="hidden" id="userId" value="0"> -->
	<input type="hidden" id="userType"
		value="<%=session.getAttribute("userType")%>">

</body>
</html>