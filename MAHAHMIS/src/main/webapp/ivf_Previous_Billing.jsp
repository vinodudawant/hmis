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
<title>Previous IVF Bill</title>

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

<!-- css for developer -->
<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!-- css for developer -->

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
<script type="text/javascript" src="js/billNoble.js"></script>
<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript" src="js/ivf_previous_bill.js"></script>

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
		//getBillPrefix("",1);
		$("#patPreTreat").hide();

		$("#byName").val("");
		$("#byName").val("");
		$("#byName").val("");
		//getAllPatientRecordsForPrevOPD();
		fetchOpdQueuePatient(0,'-','-');
		//getPreviousTreatmentPatient();
		//setAvaStatus();
		$("#preOpdBill").addClass("anchorActive");
		//viewPrevOPDBillPatient("onload","opd");
		//setAutoPatientNameForMarkVisit("byName", "onload", "previousOPDbill");
		
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

				<%@include file="left_menu_ivf.jsp"%>

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
										<option value="1">UHID</option>
										<option value="2">Patient Name</option>
										<option value="3">Patient Mobile</option>
									</select>
									
								</div>
								<div  class="col-md-1" style="margin-top: 1%">
								<br>
								</div>

								<div class="col-md-4 TextFont" id="divpatientopd">
									<input name="patientopd" type="text" id="patientopd" class="form-control input-SmallText"
										onkeyup="setAutoPatientName(this.id,'prevIvf',event)" placeholder="Patient UHID,Name,Mobileno"/>																		
								</div>
								

								<!-- <div style="" class="col-md-2-1 TextFont" id="divbyName">
									<input name="byName" type="text" id="byName"
										class="typeahead form-control input-SmallText"
										placeholder="Name/Patient Id/Mob NO"
										onkeyup= "getPreviousTreatmentPatient(this.id,'auto')" />
										onkeypress="return SearchPatientNameOnEnter(event,'previousOPDbill')" />
								</div>
								<div class="col-md-1-1" style="margin-left: 0%;display: none;">
									<label class="TextFont"
										style="margin-left: 30%; margin-top: 3%;">Patient ID:</label>
								</div>

								<div style="padding-left: 0%;display: none;" class="col-md-2-1 ">
									<input name="byId" type="text" id="byId"
										class="form-control input-SmallText"
										onkeypress="getPreviousTreatmentPatient(this.id,'auto')" />
								</div>
								<div class="col-md-1-1">
									<label class="TextFont"
										style="margin-left: 45%; margin-top: 3%;display: none;">Mobile:</label>
								</div>

								<div style="display: none;" class="col-md-2-1 ">
									<input name="byMobile" type="text" id="byMobile"
										class="form-control input-SmallText "
										onkeypress="return SearchPatientIdOnEnter(event)"
										maxlength="10" />
								</div>
								<div class="col-md-1-1" style="text-align: center;display: none;">
									<input type="button" value="search"
										class="btn btn-xs btn-primary" class="btn btn-xs btn-primary"
										onclick="getPreviousTreatmentPatient(this.id,'search')" />
								</div>

									<div class="col-md-1">

										<label class="TextFont">From Date<b
											style="color: red;">*</b></label>
									</div>
									<div class="col-md-2">
										<input type="text" value="" placeholder="From Date"
											name="date" readonly="readonly"
											onclick="displayCalendar(document.getElementById('inputFromDate'),'dd/mm/yyyy',this)"
											class="form-control input-SmallText" id="inputFromDate">

									</div>


									<div class="col-md-1">

										<label class="TextFont">To Date<b style="color: red;">*</b>

										</label>
									</div>
									<div class="col-md-2">
										<input type="text" value="" placeholder="To Date" name="date"
											readonly="readonly"
											onclick="displayCalendar(document.getElementById('inputToDate'),'dd/mm/yyyy',this)"
											class="form-control input-SmallText" id="inputToDate">

									</div>

									<div id="patientDiv1" class="col-md-1"
										style="text-align: center;">
										<input type="button" value="search"
											class="btn btn-xs btn-primary"
											onclick="fetchPrevPatientDateWise(this.id,'search')" />
									</div> -->


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
							
							<div class="col-md-12" style="margin-top: 7px; padding-left: 3%; width: 102.3%; margin-bottom: 16px;">
								<div class="col-md-12-1" style="overflow-y: scroll; height:510px; maxheight: auto; border: 1px solid #b8b8b8;">
									<table class="table table-condensed cf"
										style="Width: 100%;">
										<tbody id="containerprevOpd">
										
										</tbody>
									</table>
								</div>
							</div>
							
							<!-- <div class="row">
								<div class="col-md-12">
									BOX
									<div class="box border">
										<div class="box-title">
											<h4><i class="fa fa-table"></i>Previus Opd Ptient Data</h4>
											<div class="tools hidden-xs">
												<a href="#box-config" data-toggle="modal" class="config">
													<i class="fa fa-cog"></i>
												</a>
												<a href="javascript:;" class="reload">
													<i class="fa fa-refresh"></i>
												</a>
												<a href="javascript:;" class="collapse">
													<i class="fa fa-chevron-up"></i>
												</a>
												<a href="javascript:;" class="remove">
													<i class="fa fa-times"></i>
												</a>
											</div>
										</div>
										<div class="box-body">
											<table id="datatable1" cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered table-hover">
												<thead>
													<tr>
														<th><div class='TextFont'>#</div></th>
														<th><div class='TextFont'>Patient Name</div></th>
														<th><div class='TextFont'>Mobile No</div></th>										
														<th><div class='TextFont'>Patient ID</div></th>
														<th><div class='TextFont'>Reg Date</div></th>										
														<th><div class='TextFont'>View Treatment</div></th>													 
													</tr>
												</thead>
												<tbody id="containerprevOpd">
													
												</tbody>
												<tfoot>
													<tr>
														<th><div class='TextFont'>#</div></th>
														<th><div class='TextFont'>Patient Name</div></th>
														<th><div class='TextFont'>Mobile No</div></th>										
														<th><div class='TextFont'>Patient ID</div></th>
														<th><div class='TextFont'>Reg Date</div></th>										
														<th><div class='TextFont'>View Treatment</div></th>													 
													</tr>
												</tfoot>
											</table>
										</div>
									</div>
									/BOX
								</div>
							</div> -->
							
							
							
							
							<!-- <table style="width: 45%; margin-top: 0px; margin-left: 577px; display: table;" class="table table-bordered table-striped header-fixed cf TextFont" id="patPreOPDBill3">
							<tbody> </tbody></table>

							<div style="font-weight: bold;" class="col-md-1">Search By:</div>
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
			</div>
			<%-- <%@include file="Footer.jsp"%> --%>
			<!-- <div style="display: none;" id="prevOPDBillObj"></div> -->
			<div style="display: none;" id="prevOPDBillObj"></div>

			<!-- <div style="display: none;" id="temp">
			{#foreach $T.pl as pl}{#if $T.pl.liBM != "" }
			<div
				style='width: 100%; height: 28px; border-bottom: 1px solid #069;'
				id='div{++count}'>
				<div
					style='width: 7%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count}.</div>
				<div
					style='width: 34%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit}
					{$T.pl.fn} {$T.pl.ln}</div>
				<div
					style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{$T.pl.pi}</div>
				<div
					style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{$T.pl.rgDt}</div>

				<div
					style='width: 12%; height: 25px; border-right: 1px solid #069; padding-left: 2%; padding-top: 3px; text-align: center;'
					onclick='hideShowPreOPDBill({count})'>
					<img src='images/down.png' id='imgupdown{count}' /> <input
						type="hidden" id="hideShowStatus{count}" value="0" />
				</div>
			</div>
			<div id="patPreOPDBill{count}"
				style="width: 100%; padding-left: 0px; border-bottom: 1px solid #436a9d;">
				<div
					style="width: 60%; background-color: #436a9d; padding: 1%; font-weight: bold; float: right;">
					<div style="width: 100%;">
						<div
							style="width: 24%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;">Treatment
							ID</div>
						<div
							style="width: 22%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;">Bill
							No.</div>
						<div
							style="width: 22%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;">Bill
							Date</div>
						<div
							style="width: 22%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;">View
							Bill</div>
					</div>
				</div>
				<div
					style="width: 61.80%; height: 75%; overflow-y: scroll; border: 1px solid #436a9d; float: right;"
					id="preOPDBillContainer{count}">
					{#foreach $T.pl.liBM as liBM}
					<div
						style='width: 100%; height: 28px; border-bottom: 1px solid #069;'
						id='div{count}'>
						<div
							style='width: 24.4%; height: 23px; border-right: 1px solid #069; padding-left: 3%; padding-top: 5px;'>{$T.liBM.tid}</div>
						<div
							style='width: 23.2%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{$T.liBM.id}</div>
						<div
							style='width: 23.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.liBM.bda}</div>
						<div
							style='width: 21%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'>
							<input style='font-size: 10px;' type='button' value='VIEW BILL'
								onclick='goToOPDPrevBill({$T.liBM.id},{$T.pl.pi})' />
						</div>
					</div>
					{#/for}
				</div>
			</div>
			{#/if}{#/for}<input type="hidden" value="{count}" id="rowCount" />
		</div> -->


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
