<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<title>IPD Consent Form Dashboard</title>

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
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/Dashboard.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/registration.js"></script>

<!-- /for Developers  -->

<!-- Auto-Suggestion 6/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("databaseForConsentForm"); //Set current page
		App.init(); //Initialise plugins and elements

		//getIpdPatientsForConcentForm("ipd");
		getAllRecordForCosentForm("all");
		checkedRadioButtonConsentForm();
		//displayPatient("onload");
	//	$("#consentform").addClass("anchorActive");
		//setAutoPatientName("byName", "onload", "Consentform_Database");
	});
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
					<%@include file="Menu_Header_Nobel.jsp"%>
				</header>
				<!--/HEADER -->
				<%
					String moduleName = (String) session.getAttribute("moduleName");
						if (moduleName.equals("OTSchedule")) {
				%>
				<%@include file="left_menu_otmanagement.jsp"%>
				<%
					} else {
				%>
				<%@include file="menu_HelpDesk.jsp"%>
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
										<div class="page-header" style="height: 30px;">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
												<li><a href="">Consent Form</a></li>
												<li><a href="databaseForConsentForm.jsp">New</a></li>
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->

								<div class="col-md-12-1">
									<div style="font-weight: bold;" class="col-md-1">
										</div>
									<div class="col-md-2-1">
										<label class="TextFont"
											style="margin-left: 10%; margin-top: 3%;">Search
										By:</label>
									</div>
									
									<div class="col-md-3 TextFont" style="margin-top: 0px;">
										<input name="FnameIPD" type="text" id="byName"
											class="typeahead form-control input-SmallText"
											placeholder="First name"
											onkeyup="searchRecordForConsentForm(this.id,'search')" />
									</div>
									
									
									<!-- added by vishant start -->
									
									<div class="col-md-1-1">
										<label class=" input-SmallText"> <input
											type="radio" style="margin-top: 0px !important;"
											onclick="getAllRecordForCosentForm('all')"
											name="typeOfpatCheckConsentForm" value="all" id="chkTotalConsentForm">
											Total
										</label>
									</div>
									<div class="col-md-1-1">
										<label class=" input-SmallText"> <input
											type="radio" style="margin-top: 0px !important;"
											name="typeOfpatCheckConsentForm" value="ipd" id="chkIpdConsentForm"
											onclick="getAllRecordForCosentForm('ipd')">
											IPD
										</label>
									</div>
									<div class="col-md-1-1">
										<label class=" input-SmallText"> <input
											type="radio" style="margin-top: 0px !important;"
											onclick="getAllRecordForCosentForm('opd')"
											name="typeOfpatCheckConsentForm" value="opd" id="chkOpdConsentForm">
											OPD
										</label>
									</div>
									<div class="col-md-2-1">
										<label class=" input-SmallText"> <input
											type="radio" style="margin-top: 0px !important;"
											onclick="getAllRecordForCosentForm('diagnosis')"
											name="typeOfpatCheckConsentForm" value="diagnosis"
											id="chkDiagnosisConsentForm"> Diagnostics
										</label>
									</div>
									
									
									
									<!-- end -->
									 <!-- <div style="" class="col-md-2-1 TextFont" id="divbyName">
										<input name="byName" type="text" id="byName"
											class="typeahead form-control input-SmallText" />
									 </div> -->
									<!-- <div class="col-md-1-1" style="margin-left: 0%;">
										<label class="TextFont"
											style="margin-left: 30%; margin-top: 3%;">Patient ID:</label>
									</div>

									<div style="padding-left: 0%;" class="col-md-2-1 ">
										<input name="byId" type="text" id="byId"
											class="form-control input-SmallText"
											onkeypress="return SearchPatientIdOnEnter(event,'IPD_OldPatientDatabase')" />
									</div> --> 
									<!-- <div class="col-md-1-1" style="text-align: center;">
										<input type="button" value="search" class="btn btn-xs btn-primary" class="btn btn-xs btn-primary"
											onclick="sdispIPDDICpatientSearch('IPD_OldPatientDatabase')" />

										<input type="button" value="search"
											class="btn btn-xs btn-primary" class="btn btn-xs btn-primary"
											onclick="autosuggesstionIpdBillPatients3(this.id,'search')" />

									</div> -->
								</div>

								<div class="divide-20"></div>
								<div class="panel panel-default">
									<div class="panel-body">


										<!-- <div class="" style="margin-top: 10px; width: 98.8%;">
											<div class="col-md-12-1" style="">

												 <table class="table">
													<thead>
														<tr>
															<th style="height: 21.5px;" class="col-md-1 center"><div>#
																</div></th>
															<th style="height: 21.5px;" class="col-md-2-1"><div>Patient
																	Name</div></th>
															<th style="height: 21.5px;" class="col-md-1 center"><div>Patient
																	ID</div></th>
															<th style="height: 21.5px;" class="col-md-1 center"><div>Admission
																	No</div></th>
															<th style="height: 21.5px;" class="col-md-1 center"><div>View
																	Details</div></th>
														</tr>
													</thead>
												</table> 
											</div>
										</div> -->
										<div class="col-md-12-1"
											style="margin-top: -15px; width: 100%;">
											 <div class="container-main col-md-12-1">
											 <div class="panel-body" id="containerforConsent" style="margin-top: 15px;">
										 
									</div>
												<!-- <table class="table table-striped table-bordered">
													<tbody id="containerforConsent">
													</tbody>
												</table> -->
											 </div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<%@include file="footer_nobel.jsp"%></div>
			</div>
			<div id="patientobject" style="display: none;"></div>
			<div id="hospDetails" style="display: none;"></div>
			<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		</c:if>
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
	</section>
</body>
</html>