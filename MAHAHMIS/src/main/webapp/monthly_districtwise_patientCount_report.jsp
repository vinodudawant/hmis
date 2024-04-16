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
<title>Monthly District Wise Patient Count Report</title>

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




<script src="jquery/jquery-2.1.1.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<!-- JQUERY UI-->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>


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

<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/patient.js"></script>

<script type="text/javascript" src="js/bill.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/patientDeathreport.js"></script> 
<script type="text/javascript" src="js/amravatiReport.js"></script>		<!-- jitendra -->
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
		var CurrentYear = (new Date()).getFullYear();
		var selectBox = document.getElementById('year');
		for ( var i = CurrentYear; i >= 1980; i--) {
			var option = document.createElement('option');
			option.value = i;
			option.innerHTML = i;
			selectBox.appendChild(option);
		}
		//fetchDistrictwisePatientCountReport();
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
								"yyyy-MM-dd");
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
			                                    <li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											     <li><a href="ReportDashboard.jsp">Reports</a></li>
												<div class="pull-right">
													
													<button onclick="getDeathRecord()" data-original-title="Excel" data-toggle="tooltip" data-placement="left" title="" value="Excel" class="btn btn-xs btn-info pull-right" id="btnExport">Export To Excel</button>
													<script type="text/javascript">
													$("[id$=btnExport]").click(function(e) {
													    window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$=divTestDashVoucherList]').html()));
													    e.preventDefault();
													});
													
													</script>
													<button class="btn btn-xs btn-danger"
													data-toggle="tooltip" data-placement="left" title="Get all patient"
													onclick="getreport()" value="" style="margin-right: 8px">
													Print
													
													</button>
													
													
													
													
													
													
													<!-- <button class="btn btn-xs btn-warning">Print</button>
													<button class="btn btn-xs btn-danger">Discard</button> -->

												</div>
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->								

								<div class="col-md-12-1">
											<div class="col-md-3-1" style="margin-top: 2px">
								 	<div class="col-md-2-1"><label>Year</label></div>
								 	<div class="col-md-6-1">
									 	
											<select id="year" class="form-control input-SmallText">
											</select>
										</div>
								</div>
								
								 <div class="col-md-3-1" style="margin-top: 2px">
									<div class="col-md-2-1"><label>To</label></div>
									<div class="col-md-6-1">
									 	<select id="month" class="form-control input-SmallText">
									 	<option value="0">Select</option>
									 	<option value="1">January</option>
									 	<option value="2">February</option>
									 	<option value="3">March</option>
									 	<option value="4">April</option>
									 	<option value="5">May</option>
									 	<option value="6">June</option>
									 	<option value="7">July</option>
									 	<option value="8">August</option>
									 	<option value="9">September</option>
									 	<option value="10">October</option>
									 	<option value="11">November</option>
									 	<option value="12">December</option>
										</select>
									</div>
								</div>	
									
									<div class="col-md-1-1" style="text-align: center;">
										<input class="btn btn-xs btn-primary" type="button" onclick="fetchDistrictwisePatientCountReport()" value="search">
									</div>
							
								<div class="divide-40"></div>

								<div id="divMain" class="col-sm-12-1 tab-pane fade in active" style="">
								
							
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