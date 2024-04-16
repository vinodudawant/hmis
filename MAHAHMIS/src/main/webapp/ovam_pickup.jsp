<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Ovam PickUp Form</title>
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
	
	<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>


<!-- include js for development -->
<script type="text/javascript" src="js/formA.js"></script>
<script type="text/javascript" src="js/ovam_pickup.js"></script>

<style>
.tabledynamicscroll {
	max-height: 150px;
	overflow: auto;
	scrollbar-width: thin;
}

table>tbody>tr>td>span{
position:unset !important;
}

</style>


</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
		<%
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
				java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
				String todays_date = formatter.format(currentDate.getTime());
		%>
		<!-- HEADER -->
		<header class="navbar clearfix navbar-fixed-top" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%>
		</header>
		<!--/HEADER -->

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->
				
			
			<%@include file="left_menu_ivf.jsp"%>
			
			<!-- /SIDEBAR -->
			<div id="main-content">
				<input type="hidden" value="<%=request.getParameter("patientId")%>" id="patientId">
				<input type="hidden" value="<%=request.getParameter("treatmentId")%>" id="treatmentId">
				<input type="hidden" value="<%=request.getParameter("IVFTreatmentId")%>" id="IVFTreatmentId">
				<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
				<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
				<input type="hidden" id="ovamPickUpMasterId" value="0">
				
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
											<li><a href="ovam_pickup.jsp">Ovum Pick Up</a></li>
											<li><a></a></li>
										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>
							<div class="panel panel-primary">
								<div class="panel-heading">
									<label>IVF ICSI Details:Oocyte/Embryo Development</label>
								</div>
								<div class="col-md-4" style="margin-top:2px; float: right;margin-right: -212px">
								<label><input type="button"	class="btn btn-xs btn-success pull-right" value="Save" id="Save" onclick="saveOvamPickUpForm()"></label> 
								<label><button type="button" class="btn btn-xs btn-warning pull-right" style="margin-right: 0%" value="Print" id="Print" onclick="ovamPickUpPrint()"><i class="fa fa-print"></i></button></label>
								<label><button 	class="btn btn-xs btn-info pull-right" style="margin-right: 0%" value="Embryo Transper" title="Go To Embryo Transper" id="embryoform" onclick="openEmbryoTransperForm()"><i class="fa fa-sign-in"></i></button></label>
								</div>
								<div class="panel-body" style="margin-top: 1%;">
									<div class="panel panel-default" style="margin-top: 0%;">
										<div class="panel-heading">
											<label>A: Patient Information</label>
										</div>
										<div class="panel-body">
											<div class="form-group col-md-4">
												<label>Name of Patient (Female)</label> <input type="text"
													class="form-control" id="nameOfPatient"
													placeholder="Name Of Patient" readonly="true">
											</div>

											<div class="form-group col-md-4">
												<label>Age</label> <input type="text" class="form-control"
													id="patientsAge" placeholder="Age" readonly="true">
											</div>

											<div class="form-group col-md-4">
												<label>Husband Name  (Male)</label> <input type="text"
													class="form-control" id="husbanName" 
													placeholder="HusBand's Name" readonly="readonly">
											</div>

											<div class="form-inline col-md-12" style="display: none">
												<div class="col-md-2 form-inline">
													<label>Gender:</label>
												</div>
												<div class=" col-md-2" style="margin-top: 0%">
													<label class="radio-inline"><input type="radio" name="gender"
														value="Male">Male</label>
												</div>
												<div class=" col-md-2" style="margin-top: 0%">
													<label class="radio-inline"><input type="radio" name="gender"
														value="Female">Female </label>
												</div>
											</div>

											

										</div>
										<div class="panel-body">
										
										<!-- ======================================================== -->
										<!-- ======================================================== -->
										<div class="col-md-12">
										<div class="row">
											<div class="form-group col-md-2">
												<label>Cycle No</label> <input
													type="text" class="form-control" id="cycleNo" value="<%=request.getParameter("cycleNo")%>"
													placeholder="Cycle No" readonly="readonly">
											</div>

											<div class="form-group col-md-4">
												<label>Embryologist</label> 
												<select  class="col-md-12"   multiple id="embryologistName" name="embryologistName"  style="width: 98%;height: 200%">	
													
												</select>
											</div>

											<div class="form-group col-md-2">
												<label>Date Of Ovum Pick Up</label> <input type="text"
													class="form-control" id="dateofovampickup" onclick="displayCalendar(document.getElementById('dateofovampickup'),'dd/mm/yyyy',this)"
													placeholder="Date Of Ovam Pick Up" readonly="readonly">
											</div>
											
											<div class="form-group col-md-4" style="margin-top: 24px;">
												<div class="row">
													<div class="col-md-4">
														<label> Ejaculate &nbsp;&nbsp;
															<input type="radio" id="ejaculate" name="ejaculate_flag" value="ejaculate" style="height:15px;width:15px;">
														</label>
													</div>
													<div class="col-md-4">
														<label> Other &nbsp;&nbsp;
															<input type="radio" id="other" name="ejaculate_flag" value="other" style="height:15px;width:15px;">
														</label>
													</div>
												</div>
											</div>
										</div>
										</div>
										<!-- ======================================================== -->
										<!-- END OF ROW -->
										<!-- ======================================================== -->
											
										</div>

										<div class="panel-body">
											<div style="overflow: auto">
											<table class="table table-bordered responsive">
												<thead>
													<tr>
														<th>Sperm Source</th>
														<!-- <th>Ejaculate</th>
														<th>PESA</th>
														<th>TESA</th> -->
														<th></th>
														<th></th> 
														
														
													</tr>
													
												</thead>
												<tbody>
													<tr>
														<td style="font-weight:bold">No Of oocytes retrieved</td>
														
														<td><input type="text" class="form-control"
															id="oocytesretrievedEjaculate" placeholder="" style="width: 156px;"></td>
															
															<td><input type="text" class="form-control"
															id="oocyteEjaculateDate" placeholder="" onclick="displayCalendar(document.getElementById('oocyteEjaculateDate'),'dd/mm/yyyy',this)" readonly="readonly"  style="width: 156px;"></td>
															
															<td style="display: none"><input type="text" class="form-control-s"
															id="oocytesretrievedPesa" placeholder=""></td>
															
															<td style="display: none"><input type="text" class="form-control-s"
															id="oocytesretrievedTesa" placeholder=""></td>

													</tr>
													<tr>
														<td style="font-weight:bold">No Of mature oocytes </td>
														<td><input type="text" class="form-control"
															id="matureoocytesEjaculate" placeholder="" style="width: 156px;"></td>
															
															<td><input type="text" class="form-control"
															id="matureoocytesDate" placeholder=""  onclick="displayCalendar(document.getElementById('matureoocytesDate'),'dd/mm/yyyy',this)" style="width: 156px;" readonly="readonly"></td>
															
															<td style="display: none"><input type="text" class="form-control-s"
															id="matureoocytesPesa" placeholder=""></td>
															
															<td style="display: none"><input type="text" class="form-control-s"
															id="matureoocytesTesa" placeholder=""></td>

													</tr>
													<tr>
														<td style="font-weight:bold">No Of oocytes injected</td>
														<td><input type="text" class="form-control"
															id="oocytesinjectedEjaculate" placeholder="" style="width: 156px;"></td>
															
															<td><input type="text" class="form-control"
															id="oocytesinjectedDate" placeholder=""  onclick="displayCalendar(document.getElementById('oocytesinjectedDate'),'dd/mm/yyyy',this)" style="width: 156px;" readonly="readonly"></td>
															
															<td style="display: none"><input type="text" class="form-control-s"
															id="oocytesinjectedPesa" placeholder=""></td>
															
															<td style="display: none"><input type="text" class="form-control-s"
															id="oocytesinjectedTesa" placeholder=""></td>
													</tr>
													<tr>
														<td style="font-weight:bold">Embroys Formed</td>
														<td><input type="text" class="form-control"
															id="embroysformedEjaculate" placeholder="" style="width: 156px;"></td>
															
															<td><input type="text" class="form-control"
															id="embroysformedDate" placeholder="" onclick="displayCalendar(document.getElementById('embroysformedDate'),'dd/mm/yyyy',this)" style="width: 156px;" readonly="readonly"></td>
															
															<td style="display: none"><input type="text" class="form-control-s"
															id="embroysformedPesa" placeholder=""></td>
															
															<td style="display: none"><input type="text" class="form-control-s"
															id="embroysformedTesa" placeholder=""></td>
													</tr>
													
												</tbody>
											</table>
											</div>
										</div>

									</div>
									<div class="form-group col-md-12">
										<div class="pull-right" style="margin: 20px 0 -20px">
											<input type="button" value="+"
											onclick="createRowForOvamPickUpInfo()"
											id="ovampickupaddid" class="btn btn-xs btn-success" style="margin: 0 10px 0 0"/>
											<input type="button" value="-"
											onclick="deleteOvamPickUpSalveInfo('ovampickupTabel','chkovampickup')"
											id="deleteovampickup" class="btn btn-xs btn-danger" style="margin: 0 10px 0 0;padding: 2px 8px"/>&nbsp;
									 	<button type="button" class="pull-right btn btn-xs btn-success btn-table-add-row editUserAccess" style="padding: 2px 8px" onclick="saveOvamPickUpSlaveInfo()">
									 		<i class="fa fa-save"></i>
									 	</button>
									</div> 
									<div class="clearfix"></div>
									<br><br>
									<div class="panel panel-default" style="margin-top: 1%;">

										<div class="panel-body">
											
												<div class="tabledynamicscroll">
												<table class="table table-bordered responsive "
													id="ovampickupTabel">
													<thead>
														<tr>
															<th>Select</th>
															<th>Egg Number</th>
															<th>Appearance</th>
															<th>Date</th>
															<th>Maturity</th>
															<th>PB Appearance</th>
															<th>PN Score</th>
															<th>Day 2</th>
															<th>Day 3</th>
															<th>Day 4</th>
															<th>Day 5</th>
															<th>Transfer</th>
															<th>Rate</th>
														</tr>
													</thead>
													<tbody id="ovampickupTabelBody">
													</tbody>
												</table>
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

		<script>
			jQuery(document).ready(function() {
				App.setPage("wizards_validations"); //Set current page 
				App.init(); //Initialise plugins and elements  
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});
				$("#embryologistName").select2();
				getPatientInfoForOvamPickUp();
				getHusbandNameForOvamPickup();
				getDoctorListForOvamPickUp();
				
				getOvamPickUpMasterInfo();
				getOvamPickUpSalveList();
				
				
			});
		</script>

		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>


