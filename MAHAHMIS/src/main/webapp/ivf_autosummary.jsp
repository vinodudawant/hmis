<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>IVF Auto Summary</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />


<!-- css for developer -->

<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!-- JQUERY -->
<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
<!-- JQUERY UI-->
<script
	src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<!-- JQUERY UI-->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/cloud-admin.css">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/themes/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/responsive.css">
<link href="ehat-design/font-awesome/css/font-awesome.min.css"
	rel="stylesheet">
<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- SELECT2 -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />
<!-- TYPEAHEAD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/typeahead/typeahead.css" />
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/uniform/css/uniform.default.min.css" />
<!-- DATA TABLES -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />

<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />

<!-- bootstrap datepicker new added  js-->
<script src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"
	type="text/javascript"></script>
<script src="css/inventoryDatepicker/js/jsDatePick.min.1.3.js"
	type="text/javascript"></script>

<!-- bootstrap datepicker new added  csss-->
<link rel="stylesheet" type="text/css"
	href="css/inventoryDatepicker/css/jsDatePick_ltr.css" />
<script src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"
	type="text/javascript"></script>

<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>

<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>

<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>

<!-- CKEDITOR -->
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>

<!-- include js for development -->

<script type="text/javascript" src="js/ivf_autosummary.js"></script>
<script type="text/javascript" src="js/validate.js"></script>

<script type="text/javascript" src="js/ivf_autosummary_autodischarge.js"></script>
<script type="text/javascript" src="js/ivf_doctor_round.js"></script>

<!-- <style>
.tabledynamicscroll {
	max-height: 400px;
	overflow: auto;
	scrollbar-width: thin;
} 


</style>-->

<style>
.tableFixHead {
	overflow-y: auto;
	height: 400px;
	width: 98%;
}

.tableFixHead thead th {
	position: sticky;
	top: 0;
	z-index: 100 !important;
}

/* Just common table stuff. Really. */
table {
	border-collapse: separate;
	width: 100%;
}

th, td {
	padding: 8px 16px;
}

th {
	background: #eee;
}
</style>


</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
		<%
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
		String todays_date = formatter.format(currentDate.getTime());
		%>
		<!-- HEADER -->
		<header class="navbar clearfix navbar-fixed-top" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%>
		</header>
		<!--/HEADER -->
		<%
			String dtid = request.getParameter("treatmentId");
		int trid = Integer.parseInt(dtid);
		//int deptid = FetchHospitalDetails.depid(trid);
		int deptid=1;
		%>

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->
			<%@include file="left_menu_ivf.jsp"%>

			<!-- /SIDEBAR -->
			<div id="main-content">
				
				<%
					
				%>

				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><a href="ivf_doctor_desk.jsp">IVF Doctor Desk</a></li>
											<li><a></a></li>
											
											
											<!-- <div class="pull-right" style="margin-left: 32px;">
											<button class="btn btn-xs btn-warning "
													id="printIvfButton" data-toggle="tooltip"
													data-placement="left" title="Print "
													onclick="saveAutoIvfDischargeSummery()" >
													<i class="fa fa-print"></i>
												</button>
											</div> -->
											
											
											<div class="pull-right" style="margin-left: 32px;">
											<button class="btn btn-xs btn-warning "
													id="printAllIvfButton" data-toggle="tooltip"
													data-placement="left" title="Print All "
													onclick="printIvfAllAutoDischargeSummary()" >
													<i class="fa fa-print"></i>
												</button>
											</div>
											
											
											<div class="pull-right">
											<button class="btn btn-xs btn-success editUserAccess"
													id="saveIvfDischargeSummeryButton" data-toggle="tooltip"
													data-placement="left" title="Save IVF Discharge Summary "
													onclick="saveAutoIvfDischargeSummery()" disabled="disabled">
													<i class="fa fa-save"></i>
												</button>
											</div>
											
											
										</ul>
										
										
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>
							<div class="panel panel-primary">
								<div class="panel-heading">
									<label>IVF Patient Info</label>
								</div>

								<div class="panel-body" style="margin-top: 1%;">
									<div class="panel panel-default" style="margin-top: 1%;">

										<div class="panel-body">
											<div class="form-group col-md-12">
												<div class="col-md-12">
													<div class="col-md-2">
														<div class="form-group">

															<label class="control-label lblBold">Patient Id :</label>
															<label id="patientId" class="control-label"></label>
														</div>
													</div>
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Age:</label> <label
																id="age" class="control-label"></label>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">Patient Name
																:</label> <label id="patientName" class="control-label"></label>
														</div>
													</div>
													<%
														if (deptid == 1) {
													%>
													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">Opd No :</label> <label
																id="ipdNo" class="control-label"> IPD-D</label>
														</div>
													</div>
													<%
														} else if (deptid == 2) {
													%>
													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">Ipd No :</label> <label
																id="ipdNo" class="control-label"> IPD-D</label>
														</div>
													</div>

													<%
														}
													%>
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Ref.BillNo:
															</label> <label id="billNo" class="control-label"></label>
														</div>
													</div>
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Gender :</label> <label
																id="sex" class="control-label">male</label>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">Bill
																Categoty :</label> <label id="billCategoty"
																class="control-label"> </label>
														</div>
													</div>
													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">DOA:</label> <label
																id="doa" class="control-label"> DOA-D</label>
														</div>
													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Treatment Id
																:</label> <label id="treatmentId" class="control-label">
																<%=request.getParameter("treatmentId")%></label>
														</div>
													</div>
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Bill No:</label> <label
																id="consultingDoctor" class="control-label"> </label>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">Corporate :</label>
															<label id="corporate" class="control-label"> </label>
														</div>
													</div>

													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">Consulting
																Dr:</label> <label id="consultingDoctorr" class="control-label">
															</label>
														</div>
													</div>

													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">Ref Dr:</label> <label
																id="refDoctor" class="control-label"></label>
														</div>
													</div>

													<div class="col-md-4">
														<div class="form-group">
															<!-- <label class="control-label lblBold">Hall(HType):</label> <label id="hallName" class="control-label"></label> -->
															<label id="hallnm" class="control-label lblBold">Hall:</label>
															<label id="hallName" class="control-label"></label>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group">
															<!-- <label class="control-label lblBold">Hall(HType):</label> <label id="hallName" class="control-label"></label> -->
															<label class="control-label lblBold">Height/weight:
															</label> <label id="h_w" class="control-label"></label>
														</div>
													</div>
													<div id="finalAdvancediv" class="col-md-4">
														<div class="form-group">
															<!-- <label class="control-label lblBold">Hall(HType):</label> <label id="hallName" class="control-label"></label> -->
															<label class="control-label lblBold">Comman
																Advanced  :</label> <label id="finalAdvance" class="control-label"></label>
														</div>
													</div>
												</div>


											</div>
										</div>
									</div>
								</div>
							</div>


                            <!--  <div class="divide-40"></div> -->
							<div  style="">

								<div class="form-group col-md-3" style="margin-top:2%">
									<label class="TextFont col-md-4-1">IVF Discharge Date <b
										style="color: red;">*</b></label><input type="text"
										id="ivf_discharge_date" readonly="readonly"
										onclick="displayCalendar(document.getElementById('ivf_discharge_date'),'dd/mm/yyyy',this)"
										class="form-control input-SmallText col-md-6-1"></input>
								</div>

								<div class="form-group col-md-3" style="margin-top:2%">
									<label class="TextFont col-md-4-1">IVF Discharge Time <b
										style="color: red;">*</b></label><input type="text"
										id="ivf_discharge_Time" readonly="readonly"
										class="form-control input-SmallText col-md-6-1"></input>
								</div>

								<div class="form-group col-md-3" style="margin-top:2%">
									<label class="TextFont col-md-4-1">Type of IVF Discharge <b
										style="color: red;">*</b></label> <select name="discharge_Type"
										id="discharge_Type" onchange="checkDeathStatus()"
										class="form-control input-SmallText TextFont col-md-6-1">
										<option value="select">-SELECT-</option>
										<option value="Discharge" selected="selected">Discharge</option>
										
									</select>
								</div>
							</div>

							<div class="panel panel-primary">
								<div class="panel-heading"></div>

								<div class="panel-body" style="margin-top: 3%;">
									<div class="panel panel-default" style="margin-top: 1%;">

										<div class="panel-body">
											<div class="form-group col-md-12">

												<div>


													<ul class="nav nav-tabs">
														<li class="nav-item"><a class="nav-link active"
															data-toggle="tab" href="#Summary"
															onclick="getListOfIVFDignosisForAutoSummary()">Summary</a></li>
														<li class="nav-item"><a class="nav-link active"
															data-toggle="tab" href="#history"
															onclick="getListOfIVFDignosisForAutoSummary()" style="display: none">History</a></li>
															
															
														<li class="nav-item"><a class="nav-link"
															data-toggle="tab" href="#TreatmentDischarge"
															onclick="getPriscriptionDetailsForAutoSummary()">Treatment
																at Discharge</a></li>
														<li class="nav-item"><a class="nav-link"
															data-toggle="tab" href="#Treatment"
															onclick="getPriscriptionDataFromDoctorstation()">Treatment
														</a></li>
														
															<li class="nav-item"><a class="nav-link"
															data-toggle="tab" href="#ivfOTNotes"
															onclick="fetchIvfOTNotesData()">OT Notes
														</a></li>

														<li class="nav-item"><a class="nav-link"
															data-toggle="tab" href="#Investigation"
															onclick="getIVFSeviceAdvicetestDeatils()">Investigation
														</a></li>
														<li class="nav-item"><a class="nav-link"
															data-toggle="tab" href="#conditionondischarge">Condition
																On Discharge </a></li>
																
														<!-- <li class="nav-item"><a class="nav-link"
															data-toggle="tab" href="#deathsummary">Death Summary
																</a></li> -->
													</ul>

													<!-- Tab panes -->
													<br>
													<br>
													<div class="tab-content">
														<div class="tab-pane container active" id="Summary">

															<div class="box border green"
																style="margin-left: 20px; margin-right: 20px;">
																<div class="box-title">
																	<h4>
																		<i class="fa fa-pencil-square-o"></i>Admission Note
																	</h4>
																	<div class="tools hidden-xs">
																		<a class="config" data-toggle="modal"
																			href="#box-config"> <i class="fa fa-cog"></i>
																		</a> <a class="reload" href="javascript:;"> <i
																			class="fa fa-refresh"></i>
																		</a> <a class="collapse" href="javascript:;"> <i
																			class="fa fa-times"></i>
																		</a>
																	</div>
																</div>
																<div class="box-body">
																	<div id="alerts"></div>
																	<div
																		style="height: 250px; width: 928px; overflow: auto;" >
																		<textarea class="ckeditor ui-widget-content"
																			name="adNote" title="Admission Note"
																			placeholder="Content" id="adNote"
																			style="border: none; width: 1072px; height: 160px;"></textarea>
																	</div>


																</div>
															</div>

															<!-- ====== End Row: 1 ====== -->
															<!-- ====== Row: 2 ====== -->
															<div id="row2" class="col-sm-12-1"
																style="margin-top: 10px; width: 98%; margin-left: 1%;">
																<div class="col-md-12-1">
																	<div class="box-body col-md-12-1"
																		style="padding-top: 10px; padding-bottom: 0px">
																		<div class="form-group  box border col-md-12-1">
																			<!-- Start Header for New Edit Delete Option -->
																			<div class="col-md-12-1"
																				style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
																				<h6 style="margin-left: 10px;">Provisional
																					Diagnosis</h6>
																			</div>
																			<!-- End Header for New Edit Delete Option -->
																			<div class="col-sm-12-1" style="margin-top: 0px;">
																				<table class="table table-bordered responsive"
																					style="overflow: auto; max-height: 200px">
																					<thead>
																						<tr>
																							<th>#</th>
																							<th>Diagnosis</th>
																							<th>Diagnosis Description</th>
																							<th>ICD 10 Code</th>
																							<th>Date</th>
																							<th>Diagnosis Type</th>
																							<th>Diagnosed By</th>
																							<th>Comment</th>
																						</tr>
																					</thead>
																					<tbody id="assesmentContentProvisionalDischarge">
																					</tbody>
																				</table>

																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<!-- ======End Row: 2 ====== -->
															<!-- ====== Row: 3 ====== -->
															<div id="row3" class="col-sm-12-1"
																style="margin-top: 10px; width: 98%; margin-left: 1%;">
																<div class="col-md-12-1">
																	<div class="box-body col-md-12-1"
																		style="padding-top: 10px; padding-bottom: 0px">
																		<div class="form-group box border col-md-12-1"
																			style="padding-top: 0px; margin-bottom: 10px;">
																			<!-- Start Header for New Edit Delete Option -->
																			<div class="col-md-12-1"
																				style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
																				<h6 style="margin-left: 10px;">Confirmed
																					Diagnosis</h6>
																			</div>
																			<!-- End Header for New Edit Delete Option -->
																			<div class="col-sm-12-1" style="margin-top: 0px;">
																				<table class="table table-bordered responsive"
																					style="overflow: auto; max-height: 200px">
																					<thead>
																						<tr>
																							<th>#</th>
																							<th>Diagnosis</th>
																							<th>Diagnosis Description</th>
																							<th>ICD 10 Code</th>
																							<th>Date</th>
																							<th>Diagnosis Type</th>
																							<th>Diagnosed By</th>
																							<th>Comment</th>
																						</tr>
																					</thead>
																					<tbody id="assesmentContentConfirmaedDischarge">
																					</tbody>
																				</table>

																			</div>
																		</div>
																	</div>
																</div>
															</div>

														</div>
														<!-- End Summary tab -->
														
														
														
														<div class="tab-pane container fade"
															id="TreatmentDischarge">
															<div class="panel-body">
																<div class="form-group col-md-3">
																	<label>Prescription</label> <input type="text"
																		class="form-control" id="date-pick"
																		onclick="displayCalendar(document.getElementById('date-pick'),'yyyy-mm-dd',this)"
																		onchange="fetchIvfPrescriptionDataForIVFAutoSummary()"
																		placeholder="Date " readonly="readonly">
																</div>

																<div class="form-group col-md-3">
																	<label>General Medicine</label> <input type="checkbox"
																		class="form-control" id="medicineNotAvailableCheckbox">
																</div>

																<div class="form-group col-md-3">
																	<label>Preparation <b
																		style="color: red; padding-left: 2px;">*</b></label> <select
																		id="prep" onchange="fetchRouteTypeList('afterLoad')"
																		class="form-control">
																		<option value="select">-SELECT-</option>

																	</select>
																</div>

																<div class="form-group col-md-3">
																	<label>Medicine Name <b
																		style="color: red; padding-left: 2px;">*</b></label>
																	<div id="divTagname">
																		<input type="text" class=" typeahead  form-control"
																			id="name" placeholder="name"
																			onkeypress="setPrescriptionAutocompleteNameIDForAutoSummary(this.id);">
																	</div>
																</div>
																<div class="form-group col-md-3">
																	<label>Strength </label> <input type="text"
																		class="form-control" id="strength"
																		placeholder="strength">
																</div>

																<div class="form-group col-md-3">
																	<label>Dose Type </label> <input type="text"
																		class="form-control" id="doseP" placeholder="Dose"
																		onkeypress="return validateNumberMinusSign(event)">
																</div>

																<div class="form-group col-md-3">
																	<label>Unit<b
																		style="color: red; padding-left: 2px;">*</b></label> <select
																		id="unit"
																		onkeypress="return validateNumberMinusSign(event)"
																		class="form-control">
																		<option value="select">-SELECT-</option>

																	</select>
																</div>

																<div class="form-group col-md-3">
																	<label>MO - AN - EV - NT</label>
																	<div>
																		<input type="checkbox" id="mo" name="timeslot"
																			value="Morning" onclick="setFrequency()">&nbsp&nbsp&nbsp;

																		<input type="checkbox" id="an" name="timeslot"
																			value="Afternoon" onclick="setFrequency()">&nbsp&nbsp&nbsp;

																		<input type="checkbox" id="ev" name="timeslot"
																			value="Evening" onclick="setFrequency()">&nbsp&nbsp&nbsp;

																		<input type="checkbox" id="nt" name="timeslot"
																			value="Night" onclick="setFrequency()">
																	</div>
																</div>

																<div class="form-group col-md-3">
																	<label>Frequency </label> <input type="text"
																		class="form-control" id="frequency"
																		placeholder="Frequency"
																		onkeypress="return validateNumbers(event)"
																		onkeyup="calculateQuantity()" readonly="readonly">
																</div>


																<div class="form-group col-md-3">
																	<label>Instructions<b
																		style="color: red; padding-left: 2px;">*</b></label> <select
																		id="instruction" class="form-control">
																		<option value="0">-SELECT-</option>

																	</select>
																</div>

																<div class="form-group col-md-3">
																	<label>Route<b
																		style="color: red; padding-left: 2px;">*</b></label> <select
																		id="route" class="form-control">
																		<option value="0">-SELECT-</option>

																	</select>
																</div>

																<div class="form-group col-md-3">
																	<label>Days <b
																		style="color: red; padding-left: 2px;">*</b></label> <input
																		type="text" class="form-control" id="days"
																		placeholder="Days"
																		onkeypress="return validateNumbers(event)"
																		onkeyup="calculateQuantity()">
																</div>

																<div class="form-group col-md-3">
																	<div>

																		<input id="timeMorn" disabled="disabled"
																			onclick="abcde();" placeholder="Morning "
																			style="width: 40px" type="text" readonly="readonly">
																		<input type="text" style="width: 25px" value="1"
																			id="tmo" onkeypress="return validateNumbers(event)"
																			onkeyup="calculateQuantity()" readonly="readonly">
																		<input id="timeAfter" disabled="disabled"
																			onclick="abcde();" placeholder="Afternoon"
																			style="width: 40px" type="text" readonly="readonly">
																		<input type="text" style="width: 25px" value="1"
																			id="tan" onkeypress="return validateNumbers(event)"
																			onkeyup="calculateQuantity()" readonly="readonly">
																		<input id="timeEven" disabled="disabled"
																			onclick="abcde();" placeholder="Evening"
																			style="width: 40px" type="text" readonly="readonly">
																		<input type="text" style="width: 25px" value="1"
																			id="tev" onkeypress="return validateNumbers(event)"
																			onkeyup="calculateQuantity()" readonly="readonly">
																		<input id="timeNight" disabled="disabled"
																			onclick="abcde();" placeholder="Night"
																			style="width: 40px" type="text" readonly="readonly">
																		<input type="text" style="width: 25px" value="1"
																			id="tnt" readonly="readonly">

																	</div>
																</div>

																<div class="form-group col-md-3">
																	<label>Quantity <b
																		style="color: red; padding-left: 2px;">*</b></label> <input
																		type="text" class="form-control" id="qty"
																		placeholder="Qty"
																		onkeypress="return validateNumbers(event)">
																</div>

																<div class="form-group col-md-2">
																	<div style="margin-top: 16px">
																		<input type="button" class="btn btn-xs btn-success "
																			value="Save" id="saveIvfPriscription"
																			onclick="savePrescriptionIvfAutoSummary()">
																	</div>

																</div>

																<div class="form-group col-md-2">

																	<div style="margin-left: 100px; margin-top: -32px">
																		<button type="button" class="btn btn-xs btn-warning "
																			value="Print" id="Print"
																			onclick="printIVFAutoSummaryTreatMentAtDischarge()">
																			<i class="fa fa-print"></i>
																		</button>
																	</div>

																</div>


															</div>



															<div class="panel panel-primary">
																<div class="panel-heading">
																	<label>Prescription Tabel Info</label> <input
																		type="button" value="Delete"
																		onclick="deleteIvfPrescriptionDataForAutoSummary()"
																		id="deletefreshembryo"
																		class="btn btn-xs btn-danger pull-right"
																		style="margin-left: 18px" /> <input type="button"
																		value="Edit"
																		onclick="editPrescriptoinDatataForAutoSummary()"
																		id="deletefreshembryo"
																		class="btn btn-xs btn-success pull-right" />


																</div>

																<div class="panel-body">
																	<div class="form-group col-md-12">
																		<div class="pull-right"></div>
																		<div class="tabledynamicscroll">
																			<table class="table table-bordered responsive "
																				id="embryotransperFreshTabel">
																				<thead>
																					<tr>
																						<th>#</th>
																						<th>Drug</th>
																						<th>Prep</th>
																						<th>Instruction</th>
																						<th>Duration</th>
																						<th>Action</th>
																					</tr>
																				</thead>
																				<tbody id="prescriptionTempBody">
																				</tbody>
																			</table>
																		</div>

																	</div>
																</div>
															</div>


														</div>

														<!--  End Treatment at discharge tab-->
														<div class="tab-pane container fade" id="Treatment">


															<div class="panel panel-primary">
																<div class="panel-heading"></div>

																<div class="panel-body">
																	<div class="form-group col-md-12">
																		<div class="pull-right"></div>
																		<div class="tabledynamicscroll">
																			<table class="table table-bordered responsive "
																				id="ivfDoctorStationPrescription">
																				<thead>
																					<tr>
																						<th>#</th>
																						<th>Drug</th>
																						<th>Prep</th>
																						<th>Instruction</th>
																						<th>Duration</th>

																					</tr>
																				</thead>
																				<tbody id="ivfdoctorstationprescriptionTempBody">
																				</tbody>
																			</table>
																		</div>
																		<div class="form-group col-md-12">
																			<div class="form-group col-md-6">
																				<label>Risk Factors: </label>
																				<textarea class="form-control" id="riskfactor"
																					style="height: 83px; width: 617px"></textarea>
																			</div>
																		</div>

																		<div class="form-group col-md-12">
																			<div class="form-group col-md-6">
																				<label>Complications : </label>
																				<textarea class="form-control" id="complications"
																					style="height: 83px; width: 617px"></textarea>
																			</div>
																		</div>

																		<div class="form-group col-md-12">
																			<div class="form-group col-md-6">
																				<label>Treatment Given : </label>
																				<textarea class="form-control" id="treatmentgiven"
																					style="height: 83px; width: 617px"></textarea>
																			</div>
																		</div>

																	</div>
																</div>
															</div>

														</div>

														<!--End Treatment tab  -->


														<div class="tab-pane container fade" id="Investigation">


															<div class="panel panel-primary">
																<div class="panel-heading"></div>

																<div class="panel-body">
																	<div class="form-group col-md-12">
																		<div class="pull-right"></div>
																		<div class="tabledynamicscroll">
																			<table class="table table-bordered responsive "
																				id="investigation">
																				<thead>
																					<tr>
																						<th>#</th>
																						<th>Particulars/Details</th>
																						<th>Date</th>
																						<th>Test</th>

																					</tr>
																				</thead>
																				<tbody id="ivfinvestigationBody">
																				</tbody>
																			</table>
																		</div>

																		<div class="form-group col-md-12">
																			<div class="form-group col-md-6">
																				<label>Special Investigation : </label>
																				<textarea class="form-control"
																					id="specialinvestigation"
																					style="height: 83px; width: 617px"></textarea>
																			</div>
																		</div>

																	</div>
																</div>
															</div>

														</div>

														<!--End Investigation  -->
														
											<div ID="ivfOTNotes" class="tab-pane container fade">
												<!-- ====== Row: 1 ====== -->
												<!-- Start Code for #OTNotes GUI -->
											<div id="iOTNotes" class="panel panel-primary">
													<div class="panel-heading"></div>
											
												<div class="form-group col-md-4" style="margin-top: 60px;">
													<div class="form-group col-md-12" style="padding-left: 6%;">
															<div class="form-group col-md-5" style="margin-top: 10px;">
																<label class="TextFont">Operation List</label>
															</div>
															<div class="form-group col-md-7" style="margin-top: 10px; margin-left: -20px;">
																	<select id="idIvfSelOperationData" name="txtSelOperationData"
																		style="margin-top: 0px;margin-left: 10%;"
																		class="col-md-12-1 form-control input-SmallText "
																		onchange="fetchIvfOTNotesData('IvfautoDischarge')">
																		<option value="0">Select Operation</option>
																	</select> <input type="hidden" name="txtOperation" value="0"
																		id="idOperation">
															</div>
													</div>
													<div class="form-group col-md-12" style="padding-left: 5%;">
														<div class="form-group col-md-5" style="margin-top: 5px;">
															<label for="Estimated Blood Loss" class="TextFont">Estimated
																Blood Loss</label>
														</div>
														<div class="form-group col-md-7" style="margin-top: 5px;">
															<input type="text"
																class="form-control input-SmallText capitalise"
																placeholder="Estimated Blood Loss" style="border: 1px solid orange;"
																"
																name="EBLoss" id="iEBLoss">
														</div>
													</div>
													<div class="form-group col-md-12" style="padding-left: 5%;">
														<div class="form-group col-md-5" style="margin-top: 5px;">
															<label for="Actual Blood Loss" class="TextFont">Actual
																Blood Loss</label>
														</div>
														<div class="form-group col-md-7" style="margin-top: 5px;">
															<input type="text"
																class="form-control input-SmallText capitalise"
																placeholder="Actual Blood Loss" style="border: 1px solid orange;"
																onkeypress="return validateNumberByRegEx(this.id)"
																name="ABLoss" id="iABLoss" value="0" >
														</div>
													</div>
													<div class="form-group col-md-12" style="padding-left: 5%;">
														<div class="form-group col-md-5" style="margin-top: 5px;">
															<label for="Instrumental Count" class="TextFont">Instrumental
																Count</label>
														</div>
														<div class="form-group col-md-7" style="margin-top: 5px;">
															<input type="text"
																class="form-control input-SmallText capitalise"
																placeholder="Instrumental Count"
																onkeypress="return validateNumberByRegEx(this.id)"
																name="ICount" id="iICount">
														</div>
													</div>
													<div class="form-group col-md-12" style="padding-left: 5%;">
														<div class="form-group col-md-5" style="margin-top: 5px;">
															<label for="Recorded By" class="TextFont">Recorded
																By</label>
														</div>
														<div class="form-group col-md-7" style="margin-top: 5px;">
															<input type="text"
																class="typeahead form-control input-SmallText"
																placeholder="Recorded By"
																onkeypress="setUserName(this.id)" name="RecBy"
																id="iRecBy">
														</div>
													</div>
													<div class="form-group col-md-12" style="padding-left: 5%;">
														<div class="form-group col-md-5" style="margin-top: 5px;">
															<label for="MOP Count" class="TextFont">MOP Count
																Recorded By</label>
														</div>
														<div class="form-group col-md-7" style="margin-top: 5px;">
															<input type="text"
																class="typeahead form-control input-SmallText"
																placeholder="MOP Count"
																onkeypress="setUserName(this.id)" name="MOPCount"
																id="iMOPCount">
														</div>
													</div>
													<div class="form-group col-md-12" style="padding-left: 5%;">
														<div class="form-group col-md-5" style="margin-top: 5px;">
															<label for="OTNotesComment" class="TextFont">Comment</label>
														</div>
														<div class="form-group col-md-7" style="margin-top: 5px;">
															<textarea class="field span12 "
																style="margin-top: 4px; margin-bottom: 2px;"
																id="iOTNotesComment" rows="3" cols="23"
																placeholder="OT Notes Comment"></textarea>
														</div>
													</div>
												</div>
												<div class="container">
													<div class="form-group col-md-8" style="margin-top: 20px;">
														<div style="margin-top: 5px;" class="form-group col-md-12">
															<div class="form-group col-md-10">
																<div class="form-group col-md-5"><label class="TextFont">IVF Template List</label></div>
																<div class="form-group col-md-6">
																	<select id="selIvfCustomizeTemp" name="selIvfCustomizeTemp"
																		style="margin-top: 0px;margin-left: 10%;"
																		class="col-md-11-1 form-control input-SmallText ">
																		<option onclick="setIvfNewCustomizeTemp()" value="0">NewTemplate</option>
																	</select> <input type="hidden" name="idTempMast" value="0"
																		id="idTempMast">
																</div>
																<div class="col-md-6-1">
																	<button style="margin-left: 470px; margin-top:-65px;" type="button" id="isaveIvfOTNotesData" onclick="saveIvfOTNotesData()" data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-success" data-original-title="Save">
																		<i class="fa fa-save"></i>
																	</button>
																</div>
															</div>
														</div>
														<div class="panel panel-default col-md-12-1"
															style="margin-top: 45px;">
															<div class="panel-body">
																<div id="move" style="width: 100%;"
																	class="ui-resizable ui-draggable ui-draggable-handle">
																	<textarea class="ckeditor ui-widget-content "
																		name="editor1" title="Rich Text Editor, editor1"
																		placeholder="Content" id="editor1"></textarea>
																</div>
																<div class="divide-10"></div>
																<div class="tab-content"></div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<!-- End Code for #OTNotes GUI -->
											</div>

														<div class="tab-pane container fade"
															id="conditionondischarge">


															<div class="panel panel-primary">
																<div class="panel-heading"></div>

																<div class="panel-body">
																	<div class="form-group col-md-12">
																		<div class="pull-right"></div>


																		<div class="form-group col-md-12">
																			<div class="form-group col-md-6">
																				<label>Condition At Discharge : </label>
																				<textarea class="form-control"
																					id="conditionondischargeivf"
																					style="height: 83px; width: 617px"></textarea>
																			</div>
																		</div>

																		<div class="form-group col-md-12">
																			<div class="form-group col-md-6">
																				<label>Advised On Discharge : </label>
																				<textarea class="form-control"
																					id="adivisedondischarge"
																					style="height: 83px; width: 617px"></textarea>
																			</div>
																		</div>

																	</div>
																</div>
															</div>

														</div>

														<!--  Condition on discharge end-->
															<div class="tab-pane container fade"
															id="deathsummary">


															<div class="panel panel-primary">
																<div class="panel-heading"></div>

																<div class="panel-body">
																	<div class="form-group col-md-12">
																		<div class="pull-right"></div>

																		<div class="form-group col-md-3">
																			<label>Name Of Patient:  <b	style="color: red; padding-left: 2px;">*</b></label> <input
																				type="text" class="form-control" id="nameofpatient"
																				placeholder="Name Of Patient">
																		</div>
																		
																		<div class="form-group col-md-3">
																			<label>Gender:  <b	style="color: red; padding-left: 2px;">*</b></label> <input
																				type="text" class="form-control" id="gender"
																				placeholder="">
																		</div>
																		
																		
																		<div class="form-group col-md-3">
																			<label>Age:  <b	style="color: red; padding-left: 2px;">*</b></label> <input
																				type="text" class="form-control" id="patientage"
																				placeholder="">
																		</div>
																		
																		<div class="form-group col-md-3">
																			<label>Residental Address:  <b	style="color: red; padding-left: 2px;">*</b></label> <input
																				type="text" class="form-control" id="residentaladdress"
																				placeholder="">
																		</div>
																		
																		<div class="form-group col-md-3">
																			<label>Contact Number:  <b	style="color: red; padding-left: 2px;">*</b></label> <input
																				type="text" class="form-control" id="contactnumber"
																				placeholder="">
																		</div>
																		
																		
																		<div class="form-group col-md-3">
																			<label>Occupation:  <b	style="color: red; padding-left: 2px;">*</b></label> <input
																				type="text" class="form-control" id="occupation"
																				placeholder="">
																		</div>

																		<div class="form-group col-md-3">
																			<label>Date Of Onset of Illness:</label> <input
																				type="text" class="form-control" id="dateofillness"
																				onclick="displayCalendar(document.getElementById('dateofillness'),'yyyy-mm-dd',this)"
																				placeholder="Date " readonly="readonly">
																		</div>
																		
																		<div class="form-group col-md-3">
																			<label>Sign & Symptoms : <b
																				style="color: red; padding-left: 2px;">*</b></label>
																				 <textarea class="form-control"	id="signsymtom"
																					></textarea>
																		</div>
																		
																		
																		<div class="form-group col-md-3">
																			<label>Physical Condition :</label> <input
																				type="text" class="form-control" id="physicalcondition"
																				placeholder="">
																		</div>
																		
																		
																		
																		<div class="form-group col-md-3">
																			<label>Details Of treatment given at : <b
																				style="color: red; padding-left: 2px;">*</b></label>
																				 <textarea class="form-control"	id="treatgiven"
																					></textarea>
																		</div>
																		
																		
																			<div class="form-group col-md-3">
																			<label>By First Doctor From/Hospital Dr.From: </label> <input
																				type="text" class="form-control" id="firstdoctorfrom"
																				placeholder="">
																		</div>
																		
																		<div class="form-group col-md-3">
																			<label>Second Doctor/Hospital:  </label> <input
																				type="text" class="form-control" id="seconddoctorfrom"
																				placeholder="">
																		</div>
																		
																		
																		<div class="form-group col-md-3">
																			<label>Brief H/O Presumptive Source of infection(Brief Travel history or h/o connect with positive case) :</label>
																				 <textarea class="form-control"	id="ho"
																					></textarea>
																		</div>
																		
																		
																		<div class="form-group col-md-3">
																			<label>By IIW Dt.From:  </label> <input
																				type="text" class="form-control" id="iiwdtfrom"
																				placeholder="">
																		</div>
																		
																		<div class="form-group col-md-3">
																			<label>Name of Referring Hospital:  </label> <input
																				type="text" class="form-control" id="referinghospital"
																				placeholder="">
																		</div>
																		
																		
																		<div class="form-group col-md-3">
																			<label>Date of Admission in IIW:</label> <input
																				type="text" class="form-control" id="dateofadmissiniiw"
																				onclick="displayCalendar(document.getElementById('dateofadmissiniiw'),'yyyy-mm-dd',this)"
																				placeholder="Date " readonly="readonly">
																		</div>
																		
																		<div class="form-group col-md-3">
																			<label>Time Of Admission in IIW:  </label> <input
																				type="text" class="form-control" id="timeinadmissioniiw"
																				placeholder=""  readonly="readonly">
																		</div>
																		
																		
																		<div class="form-group col-md-3">
																			<label>Name Of IIW:  </label> <input
																				type="text" class="form-control" id="nameofiiw"
																				placeholder="" >
																		</div>
																		
																		
																		<div class="form-group col-md-3">
																			<label>Date of Throat of Swab Taken: </label> <input
																				type="text" class="form-control" id="dateofthroattaken"
																				onclick="displayCalendar(document.getElementById('dateofthroattaken'),'yyyy-mm-dd',this)"
																				placeholder="Date " readonly="readonly">
																		</div>
																		
																		
																		<div class="form-group col-md-3">
																			<label>Date Of Result Throat Swab: </label> <input
																				type="text" class="form-control" id="dateofthroatresult"
																				onclick="displayCalendar(document.getElementById('dateofthroatresult'),'yyyy-mm-dd',this)"
																				placeholder="Date " readonly="readonly">
																		</div>
																		
																		<div class="form-group col-md-3">
																			<label>Result Of Throat Swab: </label>
																				 <textarea class="form-control"	id="throatresult"
																					></textarea>
																		</div>
																		
																		
																		<div class="form-group col-md-3">
																			<label>Name Of Laboratory:  </label> <input
																				type="text" class="form-control" id="nameoflab"
																				placeholder="" >
																		</div>
																		
																		
																		<div class="form-group col-md-3">
																			<label>Other relevant lab result-CBS,X-ray,CT Sacn etc:  </label>
																				 <textarea class="form-control"	id="otherlabresult"
																					></textarea>
																		</div>
																		
																		
																		<div class="form-group col-md-3">
																			<label>Special mention of various treatment modalities(Anti-retroviral drugs/Oseltamivir/HCQ or Cholroquine/Any other):
 </label>
																				 <textarea class="form-control"	id="specialtreatment"
																					></textarea>
																		</div>
																		
																		
																		<div class="form-group col-md-3">
																			<label>Date Of Death: </label> <input
																				type="text" class="form-control" id="dateofdeath"
																				onclick="displayCalendar(document.getElementById('dateofdeath'),'yyyy-mm-dd',this)"
																				placeholder="Date " readonly="readonly">
																		</div>
																		
																		
																		<div class="form-group col-md-3">
																			<label>Time Of Death:  </label> <input
																				type="text" class="form-control" id="timeofdeath"
																				placeholder=""  readonly="readonly">
																		</div>
																		
																		
																		
																		<div class="form-group col-md-3">
																			<label>Place Of Death:  </label> <input
																				type="text" class="form-control" id="placeofdeath"
																				placeholder=""  >
																		</div>
																		
																		
																		<div class="form-group col-md-3">
																			<label>Casue Of Death:   </label>
																				 <textarea class="form-control"	id="causeofdeath"
																					></textarea>
																		</div>
																		
																		<div class="form-group col-md-3">
																			<label>Casue Of Death:   </label>
																				 <textarea class="form-control"	id="causeofdeath"
																					></textarea>
																		</div>
																		
																		<div class="form-group col-md-3">
																		<input type="button" class="btn btn-xs btn-success "
																			value="Save" id="Save"
																			onclick="saveIVFDeathSummary()">
																			
																			
																			<button type="button" class="btn btn-xs btn-warning "
																			value="Print" id="Print"
																			onclick="printIVFDeathSummary()">
																			<i class="fa fa-print"></i>
																		</button>
																			
																		</div>
																		
																	


																	</div>
																</div>
															</div>

														</div>
														
														<!------Death Summary End--  -->


													</div>

												</div>







											</div>
										</div>
									</div>
								</div>
							</div>




						</div>

						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
					</div>
					<!-- /CONTENT-->
				</div>
			</div>
			<div id="pleaseWait" style="text-align: center; display: none;">
				<img style="margin-top: 250px;" height="43px"
					src="images/loading_black.gif" />
				<div style="margin-top: 10px; color: white">
					<b>Please wait...</b>
				</div>
			</div>
			<%-- <%@include file="footer_nobel.jsp"%> --%>
			
		</section>
		<!--/PAGE -->
		
		<!-- JAVASCRIPTS -->

		<script
			src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
		<!-- SLIMSCROLL -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>

		<!-- BLOCK UI -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/autosize/jquery.autosize.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/select2/select2.min.js"></script>
		<!-- TYPEHEAD -->
		<script type="text/javascript"
			src="ehat-design/js/typeahead/typeahead.min.js"></script>
		<!-- UNIFORM -->
		<script type="text/javascript"
			src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
		<!-- DATA TABLES -->
		<script type="text/javascript"
			src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>

		<!-- COOKIE -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>

		<!-- CUSTOM SCRIPT -->
		<script src="ehat-design/js/script.js"></script>

		<script src="auto/jquery.mockjax.js"></script>
		<script src="auto/bootstrap-typeahead.js"></script>
		<!-- CUSTOM SCRIPT -->
		<div>
			<input type="hidden" id="tr_Id"
				value="<%=request.getParameter("treatmentId")%>"> <input
				type="hidden" id="userId"
				value="<%=session.getAttribute("userId1")%>"> <input
				type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
			<input type="hidden" id="prescriptionIdHidden" value="0">
			
			<input type="hidden" id="ivf_tr_Id"		value="<%=request.getParameter("ivfTreatmentId")%>">
			<input type="hidden" id="ivf_callfrom"		value="<%=request.getParameter("callfrom")%>">
				
				<input type="hidden" id="autoMasterId"	value="0">
			<input type='hidden' id='ivftomId' value='0' />
			<input type='hidden' id='idIvfOTNote' value='0' />
			<div id="IvfCustomizeTemplateDiv" style="display: none;"></div>
			
			<input type='hidden' id='otNotesMasterId' value='0' />
			
			

		</div>

		<script>
			jQuery(document).ready(function() {
				App.setPage("wizards_validations"); //Set current page 
				App.init(); //Initialise plugins and elements  
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});
				
				getPatientDataByTreatmentId(<%=request.getParameter("treatmentId")%>);
				getIvfPatientInfoByIVFTreatIdForAutoSummary();
				getListOfIVFDignosisForAutoSummary();
				getUnitTypeListForIvfAutoSummary();
				fetchIvfOperationsData();
				fetchIvfCustomizeTemplateList();
				getIvfAutoSummary();
				hideShowButtons();
			});
		</script>
		
		<script>
			$('#timeinadmissioniiw').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 1
			});
		</script>
		
		<script>
			$('#ivf_discharge_Time').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 1
			});
		</script>
		
		<script>
			$('#timeofdeath').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 1
			});
		</script>

		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>


