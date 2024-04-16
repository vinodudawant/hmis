<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Previous Auto Summary</title>
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
<link href="css/pop_up.css" rel="stylesheet" type="text/css" />


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

<!-- for Developers  -->

<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>

<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script src="js/validate.js" type="text/javascript"></script>
<script type="text/javascript" src="js/Dashboard.js"></script>
<script type="text/javascript" src="js/pop_up.js"></script>

<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<!-- /for Developers  -->

<!-- Auto-Suggestion 1/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("IPD_BedWardDashboard"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<script type="text/javascript">
	onload = function() {
		
		getAllPatientRecordsForPreviousAutosummary("null",'auto');
		
		$("#bedwar").addClass("anchorActive");
	//	fetchIPDPatientsForAutoDischargeSummary("onload");
		//setAutoPatientName("byName","onload","Previous_AutoSummary");
	}
</script>

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
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->

				<!--Start Left Menu -->
				
				<%@include file="left_menu_IPDMain.jsp"%>
				
				<!--End Left Menu -->
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

								<!-- Page Date Print Discards-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 6px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="IPD_Dashboard.jsp">IPD</a></li>
												<li><a href="previous_patient_auto_summary.jsp">Previous Auto Summary</a></li>
											</ul>
										</div>
									</div>
								</div>
								<!-- Page Date Print Discards-->

								<!-- Page Search Header -->
								
								<div class="col-md-12-1">
									<div style="font-weight: bold;" class="col-md-1">Search
										By:</div>
									<div class="col-md-1-1"><label class="TextFont" style="margin-left: 10%;margin-top:3%;">Patient Name:</label></div>

									<div style="" class="col-md-2-1 TextFont" id="divbyName">
										<input name="byName" type="text" id="byName" class="typeahead form-control input-SmallText"
										placeholder="Pat.Name/Pat.ID/Mob.No/MRN NO/"
											onkeyup="getAllPatientRecordsForPreviousAutosummary(this.id,'auto')" />
									</div>
									<div class="col-md-1-1" style="margin-left: 0%; display: none;">
										<label class="TextFont" style="margin-left: 30%;margin-top:3%;">Patient ID:</label></div>

									<div style="padding-left: 0%;  display: none;" class="col-md-2-1 " >
										<input name="byId" type="text" id="byId" class="form-control input-SmallText"
											onkeyup="getAllPatientRecordsForAuto(this.id,'auto')" />
									</div>
									<div class="col-md-1-1" style="text-align: center;  display: none;">
										<input type="button" value="search" class="btn btn-xs btn-primary" class="btn btn-xs btn-primary"
											onclick="getAllPatientRecordsForPreviousAutosummary(this.id,'search')" />
									</div>
								</div>
								
								<!-- Page Search Header -->

								<div class="divide-20"></div>
								<div class="panel panel-default">
									<!-- <div class="panel-body">

										from Patient.js <var ipdManualSummaryTemp>
										<div id="container" class="col-md-12-1"></div>

									</div> -->
									
										<div class="col-md-12" style="margin: 0px;">
																<table class="table table-condensed cf"
																	style="margin-top: 10px;">
																	<thead class='cf'>
																		<tr>
																			<th class='col-sm-1-1 center'>#</th>
																			 
																			<th class='col-sm-3-1 center'>Patient
																				Name</th>
																				<th class='col-sm-1-1 center'>UHID</th>
																				
																				<th class='col-sm-1-1 center'>Mobile
																				No</th>
																				
																				<th class='col-sm-2-1 center'>MRN
																				No</th>
																			 
																			<!-- <th class='col-sm-1-1 '>Admition
																				No</th> -->
																			 
																			<th class='col-sm-2-1 center'>Action</th>
																			 
																		</tr>
																	</thead>
																</table>
															</div>
															<div class='col-md-12'
																style='margin-top: -22px; overflow-y: scroll; height: 400px; max-height: auto; border: 1px solid #dddddd;'>
																<table class='table table-striped table-condensed cf'>
																	<tbody id="containerIPDAuto">
																	</tbody>
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

			<div><%@include file="Footer.jsp"%></div>
			<div id="patobject" style="display: none;"></div>
			<input type="hidden" id="pageName"  value="Auto" />
		</c:if>
	</section>
</body>
</html>