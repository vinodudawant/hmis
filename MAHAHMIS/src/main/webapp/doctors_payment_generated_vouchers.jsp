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
<title>Professional Fees All Voucher</title>


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
<script type="text/javascript" src="js/profees.js"></script>
<script type="text/javascript" src="js/professionalFees.js"></script>
<script type="text/javascript" src="js/profeesAdvance.js"></script>

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
		App.setPage("Motivator_Vouchar"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		});
	});
</script>

<script type="text/javascript">
	onload = function() {
		
		//fetchAllGenVouchers('Current')
		//fetchAuthorisedBy("proFeesAllVouchers");
		
		//auto-suggestion in house doctors list
		setAutoSuggestDocName("byName", "onload", "proFees");
		
		getAllUnitForDrPer();
		getAllDeptForDrPer();
		getAllServicesForDrPer();
		fetchDoctorsVouchers("onload");
	};
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

				<%@include file="ehat_finance_leftmenu.jsp"%>
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
												<li><a href="hisabDiagnostics.jsp">Diagnosis Finance</a></li>
												<li><a href="doctors_payment_generated_vouchers.jsp">All Generated
														Voucher </a></li>
											</ul>
										</div>
									</div>
								</div>


								<div class="panel panel-default" style="margin-top:-16px;">
									<div class="panel-body">
									
									
									<!-- ----------------------------------------- -->
										<!-- <div class="col-md-1-1" style="font-weight: bold;">Voucher No</div>
											<div class="form-group col-md-2-1">
											<input id="byVoucherNo" class="form-group form-control input-SmallText" type="text" onkeypress="return validateNumbers(event)" name="byVoucherNo">
										</div>
										<div class="form-group col-md-2-1">
											<button class="btn btn-xs btn-primary" onclick="searchByVoucherNumber1('search')" title="" data-placement="right" data-toggle="tooltip" data-original-title="Search ">
											<i class="fa fa-search"></i>
											</button>
										</div> -->
										<div class="col-md-12 row"
											style="margin-top: 0%; margin-left: 0%;">

											
											<div class="col-md-3">
												<label class="TextFont">From Date<b
													style="color: red;">*</b></label> <input id="fromDate"
													class="form-control input-SmallText" type="text"
													onclick="displayCalendar(document.getElementById('fromDate'),'dd/mm/yyyy',this)"
													onchange="checkWithCurrentDate('payAll')"
													readonly="readonly" name="date" placeholder="From Date"
													value="">
												<%-- <%=todays_date%> --%>

											</div>

											<div class="col-md-3">

												<label class="TextFont">To Date<b
													style="color: red;">*</b>
												</label> <input id="toDate"
													class="form-control input-SmallText" type="text"
													onclick="displayCalendar(document.getElementById('toDate'),'dd/mm/yyyy',this)"
													onchange="checkWithCurrentDate('ReportToProFees')"
													readonly="readonly" name="date" placeholder="To Date"
													value="">

											</div>

											<div class="col-md-3">
												<label class="TextFont"> Doctor ID </label> <input
													id="txtDoctorId" class="form-control input-SmallText"
													type="text" readonly="readonly" value="0">
											</div>
											<div class="col-md-4">
												<label class="TextFont"> Doctor Name<b
													style="color: red;">*</b>
												</label> <input id="byName"
													class="typeahead form-control input-SmallText" type="text">
											</div>

										</div>
										<div class="col-md-12 row"
											style="margin-top: 1%; margin-left: 0%;">

											<div class="col-md-3">

												<label class="TextFont"> Select Unit </label> <select
													id="unitId" class="form-control input-SmallText">
													<!-- onchange="proFeesfetchReports1('doctor');"> -->

												</select>
												<!-- <input id="unitFlag" type="hidden" value="default"> -->

											</div>
											<div class="col-md-3">

												<label class="TextFont"> Select Department </label> <select
													id="deptId" class="form-control input-SmallText">
													<!-- onchange="proFeesfetchReports1('doctor');"> -->

												</select>


											</div>

											<!-- <div class="col-md-3">

												<label class="TextFont"> Select Service </label> <select
													id="serviceId" class="form-control input-SmallText">
													onchange="proFeesfetchReports1('doctor');">

												</select> <input id="serviceFlag" type="hidden" value="default">

											</div> -->

											<div class="col-md-3">
											<br>
												<button class="btn btn-xs btn-primary" data-toggle="tooltip"
													data-placement="left" style="width: 96%; margin-top: 4px;"
													title="Show" onclick="fetchDoctorsVouchers('search')" type="button">
													<b> Show </b>
												</button>
											</div>

										</div>
										<!-- ----------------------------------------- -->
									
										<div class="tabbable col-md-12" style="margin-top:0px;">
											<ul class="nav nav-tabs">
												<li class="active">
													<a id="ct" href="#CT" data-toggle="tab" onclick="fetchDoctorsVouchers('onload');">
														<span class="hidden-inline-mobile">
															<b>
															<i class="fa fa-location-arrow"></i>
															<!-- Current -->All Voucher
															</b>
														</span>
													</a>
												</li>
												 <li class="">
													<a id="pt" href="#PT" data-toggle="tab" style="" onclick="fetchDoctorsVouchers('cancel');">
														<span class="hidden-inline-mobile">
															<b>
															<i class="fa fa-times"></i>
															Cancel Voucher
															</b>
														</span>
													</a>
												</li> 
											</ul>
											
											<div class="divide-10"></div>
											
											<div class="tab-content">
												<div id="CT" class="tab-pane fade in active">
												
													<div class="col-md-12-" style="margin-top: -10px;">
																	<table class="table table-condensed cf"
																		style="margin-top: 10px;">
																		<thead class='cf'>
																			<tr>
																				<th class='col-md-1 center'>#</th>
																				<th class='col-md-1 TextFont'>Voucher No.</th>
																				<th class='col-md-5 TextFont'>DoctorName</th>
																				<th class='col-md-2 TextFont'>Department Name</th>
																				<th class='col-md-1 TextFont'>Date</th>
																				<th class='col-md-1 TextFont'>Paid Amount</th>
																				<th class='col-md-1 TextFont'>Cancel Voucher</th>
																			</tr>
																		</thead>
																	</table>
														</div>
															
													<div id="divCurrentTestDash" class="box border col-md-12"
														style="overflow-y: scroll; margin-top: -21px; height: 400px;">

														<table class="table table-striped table-condensed">
															<tbody id="tableCurrentTestDash">

															</tbody>
														</table>
													</div>
													
												</div>
									<!-- _______________________CT____________________________ -->		
										
												<div id="PT" class="tab-pane fade in">
													<div class="col-md-12-" style="margin-top: -10px;">
																<table class="table table-condensed cf"
																	style="margin-top: 10px;">
																	<thead class='cf'>
																		<tr>
																				<th class='col-md-1 center'>#</th>
																				<th class='col-md-1 TextFont'>Voucher No.</th>
																				<th class='col-md-6 TextFont'>DoctorName</th>
																				<th class='col-md-2 TextFont'>Department Name</th>
																				<th class='col-md-1 TextFont'>Date</th>
																				<th class='col-md-1 TextFont center'>Paid Amount</th>
																				
																		</tr>
																	</thead>
																</table>
													</div>
															
													<div id="divCancelTestDash" class="box border col-md-12"
														style="overflow-y: scroll; margin-top: -21px; height: 400px;">

														<table class="table table-striped table-condensed">
															<tbody id="tableCancelTestDash">

															</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

	<!-- ____________________Pop up for cancel or Print ProFees____________________ -->
							<div id="popUpProFeesVocher" class="modal fade in" tabindex="-1">
								<div class="modal-dialog">
									<div class="modal-content col-md-12"
										style="margin-top: 0px; margin-left: 0px; width: 120% ;margin-left: -4%;margin-top: 3%;">
										<div class="modal-header">
										<div class="divide-20"></div>
											<div  class="col-md-12">
											<div class="row">
												<div class="col-md-6">
													<h4 id="testHead">Generated Voucher:</h4>
												</div>
											
												
												<div class="col-md-6">
													<button id="cancel" class="btn btn-xs btn-danger pull-right"
													data-dismiss="modal" onclick="hidePopUpProFeesVocher1()"><i class="fa fa-times"></i></button>
												</div>
											</div>
											</div>
										
											
											
											
										</div>

										<div class="modal-body">

											<!-- /*********fileds******/ -->
				
										<div id="divLine1" class=" box border col-md-12">

												<form class="form-horizontal col-md-12">

													<div class="divide-20"></div>
													
													<div class="col-md-3">
														<div class="row">
															<label class="TextFont">Voucher No./CRN </label> <input
																id="txtVoucharNumber"
																class="form-control input-SmallText" type="text" readonly="readonly">
														</div>
														<div class="divide-20"></div>
													</div>

													<div class="col-md-3">
														<div class="row">
															<label class="TextFont"> Date </label> <input
																id="assesmentDate" class="form-control input-SmallText"
																type="text" disabled="disabled"
																onclick="displayCalendar(document.getElementById('assesmentDate'),'yyyy-mm-dd',this)"
																readonly="readonly" name="date" placeholder="Date" value="<%=todays_date%>">
														</div>
														<div class="divide-20"></div>
													</div>

													

													<div class="col-md-3">
														<div class="row">
															<label class="TextFont"> Authorised By </label> <select
																id="txtAuthorisedBy"
																class="form-control input-SmallText"
																onchange="(this.value);" disabled="disabled">
																<!-- <option value="1" selected>Director</option>
																<option value="2">C.E.O.</option>
																<option value="3">General Manager</option>
																<option value="4">Acountant</option> -->
															</select>
														</div>
														<div class="divide-20"></div>
													</div>

													<div class="col-md-3">
														<div class="row">
															<label class="TextFont"> Doctor Name<b style="color: red;">*</b> </label>
															
															 <input
																id="byName" class="form-control input-SmallText"
																type="text"
																onchange="proFeesFetchTestList()" disabled="disabled">
														</div>
														<div class="divide-20"></div>
													</div>

													<div class="col-md-3">
														<div class="row">
															<label class="TextFont"> Doctor ID </label> <input
																id="txtDoctorId" class="form-control input-SmallText"
																type="text" readonly="readonly" value="0" disabled="disabled">
														</div>
														<div class="divide-20"></div>
													</div>

												</form>




												<form class="form-horizontal col-md-12">

													<div class="divide-10"></div>

													<div class="col-md-3">
														<div class="row">
															<label class="TextFont"> Paid To<b style="color: red;">*</b> </label> <input
																id="txtPayTo" class="form-control input-SmallText"
																type="text" disabled="disabled">
														</div>
														<div class="divide-20"></div>
													</div>

													<div class="col-md-3">
														<div class="row">
															<label class="TextFont"> Select Service </label> <select
																id="txtSelectService"
																class="form-control input-SmallText"
																onchange="(this.value);proFeesFetchTestList();" disabled="disabled">
																<option value="investigation">Investigation</option>
																<option value="pathology">Pathology</option>
																<option value="physiotherapy">Physiotherapy</option>
																<option value="OtherServices">Other Services</option>
																<option value="CasualityServices">CasualtyServices</option>
																<option value="Doc">Consulting</option>
																<option value="all">All</option>
																</select>
														</div>
														<div class="divide-20"></div>
													</div>

													<div class="col-md-7">
														<div class="row">
															<label class="TextFont">Narration </label>
															<div class="divide-10"></div>
															<textarea id="txtNaration" class="col-xs-12"
																maxlength="440" rows="1"  readonly="readonly"></textarea>
														</div>
														<div class="divide-10"></div>


													</div>
												</form>

												<div class="divide-10"></div>

											</div>
												
											<!-- *****************************************2nd half pop start********************************************************-->

											<!-- 			Start div for border -->
											<!-- <div class="box border col-md-12-1">


												<form class="form-horizontal col-md-12-1" method="get">
													

												</form>

															Start div for border
											</div> -->
											
										<div id="divLine3" class=" box border col-md-12"
												style="margin-top: -21px;">
												<form class="form-horizontal col-md-8">

													<!-- <div class="col-md-12" style=" background: pink; border-bottom: 1px solid orange; border-top: 1px solid orange;">
													<label style="cursor: pointer;">
														<i class="fa fa-edit"></i> List of Test
													</label>
												</div> -->
													<div class="divide-20"></div>
													<div class="col-md-12">
														<label> <i class="fa fa-arrow-down"></i> Voucher
															List<b style="color: red;">*</b>:
														</label>
													</div>
													<br>

													<table class="table table-condensed col-md-12"
														style="background: Antiquewhite; border-bottom: 1px solid black; border-top: 1px solid black;">
														<thead>
															<tr>
																<th class="col-md-1 center"><div class="TextFont">#</div></th>
																<th class="col-md-1 center">
																	<div class="TextFont">Recpt No.</div>
																</th>
																<th class="col-md-1 center">
																	<div class="TextFont">Compt No.</div>
																</th>
																<th class="col-md-1 center">
																	<div class="TextFont">Test Amt.</div>
																</th>
																<th class="col-md-1 center">
																	<div class="TextFont">Concession</div>
																</th>
																<th class="col-md-1 center">
																	<div class="TextFont">Paid Amt.</div>
																</th>
																<th class="col-md-1 center">
																	<div class="TextFont">Clinic Amt.</div>
																</th>
																<th class="col-md-1 center">
																	<div class="TextFont">PF.Amt.</div>
																</th>
																<th class="col-md-1 center">
																	<div class="TextFont">Reduction</div>
																</th>
																<th class="col-md-1 center">
																	<div class="TextFont">PF. Paid</div>
																</th>
															</tr>
														</thead>
													</table>


													<div id="divTestDashVoucharList"
														class="box border col-md-12"
														style="overflow-y: scroll; margin-top: -21px; height: 148px;">

														<table class="table table-striped table-condensed">
															<tbody id="tableTestVoucherList">

															</tbody>
														</table>

													</div>
												</form>


												<form class="form-horizontal col-md-4">
													<div class="divide-20"></div>
													<div class="divide-10"></div>

													<div class="col-md-12"
														style="margin-top: 0px; background: buttonface; border-bottom: 1px solid orange; border-top: 1px solid orange;">
														<label> <i class="fa fa-edit"></i> Total Payment
														</label>

													</div>


													<div class="divide-20"></div>

													<div class="box border col-md-12">
														<div class="divide-20"></div>
														<div class="col-md-12">

															<div class="col-md-4 col-xs-6">
																<div class="row">
																	<label class="TextFont">Total Amount </label> <input
																		id="txtTotalAmount"
																		class="form-control input-SmallText" type="text"
																		readonly="readonly" value="0" style=" text-align:right;">
																</div>
																<div class="divide-20"></div>

															</div>

															<div class="col-md-4 col-xs-6">
																<div class="row">
																	<label class="TextFont">Total Concession </label> <input
																		id="txtTotalDiscount"
																		class="form-control input-SmallText" type="text"
																		readonly="readonly" value="0" style=" text-align:right;">
																</div>
																<div class="divide-20"></div>
															</div>

															<div class="col-md-4 col-xs-6">
																<div class="row">
																	<label class="TextFont">Total Clinic Amt </label> <input id="txtTotalClinicAmount"
																		class="form-control input-SmallText" type="text" value="0"
																		 style=" text-align:right;" readonly="readonly">
																</div>
																<div class="divide-20"></div>
															</div>
															<div class="divide-20"></div>
															<div class="divide-20"></div>
														</div>

														<div class="col-md-12">
															<div class="col-md-4 col-xs-6">
																<div class="row">
																	<label class="TextFont">Total Pro.Fees </label> <input
																		id="txtTotalMotivation"
																		class="form-control input-SmallText" type="text"
																		readonly="readonly" value="0" style=" text-align:right;">
																</div>
																<div class="divide-20"></div>

															</div>
															
															<div class="col-md-4 col-xs-6">
																<div class="row">
																	<label class="TextFont">Toatal Reduction </label> <input id="txtTotalReduction"
																		class="form-control input-SmallText" type="text" readonly="readonly" value="0" style=" text-align:right;">
																</div>
																<div class="divide-20"></div>
															</div>
															

															<div class="col-md-4 col-xs-6">
																<div class="row">
																	<label class="TextFont">Total PF.Payable </label> <input
																		id="txtAmountPayable"
																		class="form-control input-SmallText" type="text"
																		readonly="readonly" value="0" style=" text-align:right;">
																</div>
																<div class="divide-20"></div>
															</div>

														</div>
														
														<!-- ---------------------------- -->
															<div id="divCancelNa" class="col-md-12" style="display: none">
															<div class="divide-10"></div>
															<div class="col-md-12 col-xs-12">
																<div class="row">
																	<label class="TextFont"> Cancel Narration </label> <input
																		id="txtCancelNarration"
																		class="form-control input-SmallText" type="text"
																		 value="" placeholder="Type Narration Here">
																</div>
															</div>
															<div class="divide-40"></div>
															</div>
														<!-- 	------------------------------ -->
														<div class="col-md-12">
															<div class="divide-20"></div>
															<div class="col-md-6 col-xs-6">
																<div class="row">
																	<button id="btnPrintVoucher" class="btn btn-xs btn-warning" type="button"
																		title="Print" style="width: 90%" onclick="proFeesGeneratedVoucherPrint('allgeneratedVoucher')">
																		<b>Print Voucher</b>
																	</button>
																</div>
																<div class="divide-20"></div>
															</div>
															<div class="col-md-6 col-xs-6">
																<div class="row">
																	<button id="btnCancelVoucher" class="btn btn-xs btn-danger" type="button"
																		title="Cancel" style="width: 90%" onclick="cancelGenratedVoucher('allgeneratedVoucher');">
																		<b>Cancel Voucher</b>
																	</button>
																</div>
																<div class="divide-20"></div>
															</div>

															
															<!-- <div class="divide-20"></div> -->
														</div>
													</div>
												</form>
											</div>
										</div>

									</div>
									<!-- ******Main Pop div end********   -->

								</div>
							</div>


								<!-- ______________________________End Popup______________________________________ -->
		<input type="hidden" value="Current" id="tabName" />
	<input type="hidden" id="uId" value="<%=session.getAttribute("uId")%>">
				<%@include file="Footer.jsp"%></div>
		</c:if>

		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>

		</c:if>
	</section>
</body>
</html>