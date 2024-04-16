<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>IPD Previous Treatment</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<link rel="stylesheet" type="text/css"
    href="css/jquery-ui-1.10.3.custom.min.css" />

<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />
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

<!-- For Devalopers -->
<!-- <script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script src="js/validate.js" type="text/javascript"></script>
<script type="text/javascript" src="js/Dashboard.js"></script>
<script type="text/javascript" src="js/bill.js"></script>
<script type="text/javascript" src="js/billNoble.js"></script>
<script type="text/javascript" src="js/ehat_ipdbill.js"></script>
<script type="text/javascript" src="js/ehat_ipdbill1.js"></script>
<script type="text/javascript" src="js/autosuggession_patient.js"></script>
 -->
<script type="text/javascript" src="js/ipd_previous_treatment.js"></script>
<script type="text/javascript" src="js/ehat_ipdbill1.js"></script>
<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<!-- Auto-Suggestion 2/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>


<script>
	jQuery(document).ready(function() {
		App.setPage("PreviousTreatment"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<script type="text/javascript">
	onload = function() {
		
		setPatientSearchType();
	//	getBillPrefix("",4);
		getAllPatientRecordsForPrevOPDIPDNEW_updated("onload",1);
	//	setAvaStatus();
		$("#litreatment").addClass("anchorActive");
		// viewPrevDocDeskDistinctPatient();

		//viewPrevOPDBillPatient("onload","opd");
		
		//setAutoPatientName("byName", "onload", "previousOPDbill");
		//setAutoPatientNameForMarkVisit("byName", "onload", "previousOPDbill");
		/* $("#patPreTreat").hide();

		$("#byName").val("");
		$("#byName").val("");
		$("#byName").val("");
		 */
		//getAllPatientRecordsForPrevOPDIPDNEW();
		//getPreviousTreatmentPatientIPD();		
		//closeTreatmentDetailsOfPatient(10);
	}
</script>

<!-- Ajax loader:start -->
<!-- <script type="text/javascript">
	jQuery(document).ajaxStart(function() {
		//alert("hi ajax start");
		$("body").addClass("loading");
	});

	jQuery(document).ajaxStop(function() {
		$("body").removeClass("loading");
		//alert("hi ajax stop");
	});
</script> -->

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
<!-- Ajax loader:END -->

</head>

<body>
	<c:if test="${ sessionScope.userType != null }">
		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- <div id="top18">
				<div style="width: 100%;">
					<div style="width: 60%;">
						<img src="images/logo.jpg" />
					</div>

				</div>
			</div> -->

			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

		<%@include file="left_menu_IPDMain.jsp"%>

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
											<li><a href="OPDDoctorsDeskDashboard.jsp">Doctor
													Desk</a></li>
											<li>Previous Treatment</li>
										</ul>

									</div>
								</div>
							</div>


							<!-- <div class="col-md-12-1">
								<div style="font-weight: bold;" class="col-md-1">Search
									By:</div>
								<div class="col-md-1-1">
									<label class="TextFont"
										style="margin-left: 10%; margin-top: 3%;">Patient
										Name:</label>
								</div>

								<div style="" class="col-md-2-1 TextFont" id="divbyName">
									<input name="byName" type="text" id="byName"
										class="typeahead form-control input-SmallText"
										onkeyup= "getPreviousTreatmentPatientIPD(this.id,'auto'),clerpiPR()"  placeholder="Name, Mobileno , Adharno ,MrnNo "/>
										onkeypress="return SearchPatientNameOnEnter(event,'previousOPDbill')" />
								</div>
								<div class="col-md-1-1" style="margin-left: 0%;">
									<label class="TextFont"
										style="margin-left: 30%; margin-top: 3%;">Patient ID:</label>
								</div>

								<div style="padding-left: 0%;" class="col-md-2-1 ">
									<input name="byId" type="text" id="byId"
										class="form-control input-SmallText"
										onkeyup= "clerpnPR()" />
								</div>
								<div class="col-md-1-1">
									<label class="TextFont"
										style="margin-left: 45%; margin-top: 3%;">Mobile:</label>
								</div>

								<div style="" class="col-md-2-1 ">
									<input name="byMobile" type="text" id="byMobile"
										class="form-control input-SmallText "
										onkeypress="return SearchPatientIdOnEnter(event)"
										maxlength="10" />
								</div>
								<div class="col-md-1-1" style="text-align: center;">
									<input type="button" value="search"
										class="btn btn-xs btn-primary" class="btn btn-xs btn-primary"
										onclick="getPreviousTreatmentPatientIPD(this.id,'search')" />
								</div>
							</div> -->
							
							<div class="col-md-12-1">
								<div style="font-weight: bold;" class="col-md-1">Search	By:</div>
								
								<div class="col-md-3 TextFont" id="divbyName">
																		
									<select id="patSearchType" class="form-control input-SmallText" onchange="setPatientSearchType()">
										<option value="1">UHID</option>
										<option value="2">Patient Name</option>
										<option value="3">Patient Mobile</option>
									</select>
									
								</div>

								<div class="col-md-4 TextFont" id="divbyName">
									<input name="byName" type="text" id="byName" class="form-control input-SmallText"
										onkeyup="setAutoPatientNamePrev(this.id,'prevIpd',event)" placeholder="Patient Id,Name,Mobileno" autocomplete="off"/>																		
								</div>								

							</div>

							<div class="divide-20"></div>
							<!-- <div class="panel panel-default">
								<div class="panel-body">
									<table class="table" style="margin-top: 5px;">
										<thead>
											<tr>
												<th style="height: 21.5px;" class="col-md-1 center"><div>#</div></th>
												<th style="height: 21.5px;" class="col-md-4"><div>Patient
														Name</div></th>
												<th style="height: 21.5px;" class="col-md-1 center"><div>Patient
														ID</div></th>
												<th style="height: 21.5px;" class="col-md-2 center"><div>Reg.
														Date</div></th>
												<th style="height: 21.5px;" class="col-md-2 center"><div>View
														Treatment</div></th>
											</tr>
										</thead>
										<tbody id="container">
																			
										</tbody>
										
									</table>
									<div id="container1"
										style="margin-top: -21px; height: 420px; max-height: auto; overflow-y: scroll;"></div>
								</div>
							</div> -->
							
														<div class="col-md-12"
																	style="margin-top: 7px; padding-left: 3%; width: 102.3%; margin-bottom: 16px;">
																	<div class="col-md-12-1"
																		style="overflow-y: scroll; height: 510px; maxheight: auto; border: 1px solid #b8b8b8;">

																		<table class="table table-condensed cf"
																			style="Width: 100%;">
																			<tbody id="IpdGenPreBill">
																			
																			</tbody>
																		</table>
									<div class="pull-right">
										<ul class="pagination" id="opdpagenation">

										</ul>
									</div>
									<div class="col-md-4 col-md-offset-8">
										<div class="pull-right">
											<ul class="pagination pagination-blue margin-bottom-10"
												id="totalNumberOfPagesOpd">

											</ul>
										</div>
									</div>
								</div>
																</div>
							
							
							<!-- <table style="width: 45%; margin-top: 0px; margin-left: 577px; display: table;" class="table table-bordered table-striped header-fixed cf TextFont" id="patPreOPDBill3">
							<tbody> </tbody></table> -->

							<!-- <div style="font-weight: bold;" class="col-md-1">Search By:</div>
							<div class="col-md-1">Patient Name</div>
							<div style="padding-left: 2%;" class="col-md-2 TextFont">
								<input style='width: 100%;' name='byName' type='text'
									class="inpSearchBox form-control input-SmallText " id='byName'
									onkeypress='return validatealphabetic(event)' />
							</div>
							<div class="col-md-1">or</div>
							<div class="col-md-1">
								<span style='width: 3%;'>Patient ID</span>
							</div>
							<div class="col-md-1">
								<input style='width: 100%;' name='byId' type='text' id='byId'
									class="form-control input-SmallText " class="inpSearchBox"
									onkeypress='return validateNumbers(event)' />
							</div>
							<div class="col-md-1" style="text-align: center;">
								<input type='button' value='Search'
									class='btn btn-xs btn-primary' id="inpSearchBtn"
									onclick="disppatientPreSearch('doc')" />
							</div>
							<div id=' ' class="col-md-4-1">
								<div class="col-md-1-1">
									<input type='radio' name='RadioGroup' value='doctor'
										id='doctor' checked='checked'
										onclick='viewPrevDocDeskDistinctPatient()' />
								</div>
								<div class="col-md-1-1"
									style="margin-left: -15px; margin-top: -3px;">DOCTOR</div>
								<div class="col-md-1-1" style="margin-left: 17px;">
									<input type='radio' name='RadioGroup' value='rmo' id='rmo'
										onclick='setDefaultDistinctRMOTreatment()' />
								</div>
								<div class="col-md-1-1"
									style="margin-left: -15px; margin-top: -3px;">RMO</div>
							</div>


							<div class="divide-20"></div>
							
							
							<div class="panel panel-default">
								<div class="panel-body">
									<div style="width: 100%;">
										<div class="col-md-12-1">
											<table class="table table-bordered table-condensed cf"
												style="width: 1090px; margin-top: 10px;">
												<thead class='cf'>
													<tr>
														<th class='col-md-1-1 center' style='height: 21.5px;'><div
																class='TextFont'>#</div></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><div
																class='TextFont'>Patient Name</div></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><div
																class='TextFont'>Patient ID</div></th>

														<th class='col-md-1-1 center' style='height: 21.5px;'><div
																class='TextFont'>View</div></th>
													</tr>
												</thead>
											</table>

											<div class='col-md-12-1'
												style='margin-top: -21px; overflow-y: scroll; width: 1090px; height: 460px; max-height: auto;'>
												<table
													class='table table-bordered table-striped table-condensed cf'>
													<tbody id="container">
													</tbody>
												</table>
											</div>
											<div
											style="width: 99.80%; height: 75%; overflow-y: scroll; border: 1px solid #436a9d;"
											id="container"></div>
										</div>
									</div>
								</div>
							</div> -->

						</div>
					</div>
				</div>
			</div>

			<%@include file="Footer.jsp"%></div>
			<!--ADDED BY PARAS  -->
          <input type='hidden' id="sridnamepr" value='N' />
          <!--END ADDED BY PARAS  -->
		<div style="display: none;" id="prevOPDBillObj"></div>

		<div style="display: none;" id="pageType">previousTreatmentOPDER</div>

		<!-- <div id="PreTreat"></div> -->

		<div class="ajaxmodal">
			<!-- Place at bottom of page -->
		</div>
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>

	<input type="hidden" id="billPrefix" value="">
	<input type="hidden" id="billMiddle" value="">
	<input type="hidden" id="billSufix" value="">
	
	<input type="hidden" id="patPrefix" value="">
	<input type="hidden" id="patMiddle" value="">
	<input type="hidden" id="patSufix" value="">
	
	<input type="hidden" id="recPrefix" value="">
	<input type="hidden" id="recMiddle" value="">
	<input type="hidden" id="recSufix" value="">
<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
</body>
</html>
