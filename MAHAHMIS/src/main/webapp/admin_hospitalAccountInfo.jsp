<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>
Hospital Accounting Information
</title>
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
<script src="js/script.js"></script>

<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/currencyMaster.js"></script>
<script src="js/admin_subserv.js"></script>
<script src="js/admin_hospitalAccInfo.js"></script>
<!-- include js for development -->
</head>
<script type="text/javascript">
	onload = function() {
		$("#hospDetail").addClass("anchorActive");
		//fetchHospitalDetails();
		setTimeout(function() {
			getAllUnitForHospitalAccountInfo();
			fetchhospitalAccInfo();
		}, 500);

		//emergencyAdminsionFlag();
		/* fetchDoctorSpecilizations();
		fetchHospitalDepartments(); */
		getAllServicesInHr();

		//fetchAllService();
		fetchSubServiceCategoryList();
		getAllChargesMaster();
		getAllChargesMaster2();
		getAllDeptForConfiguration();
		fetchAllServicecom();
		fetchCurrencyTypes();
		
	}
</script>
<body>
	<c:if test="${ sessionScope.userType != null }">
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%>
		</header>
		<!--/HEADER -->

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->

			<%@include file="left_menu_admin.jsp"%>
			<%
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
							"dd-MM-yyyy");
					String todays_date = formatter.format(currentDate.getTime());
			%>
			<!-- /SIDEBAR -->
			<div id="main-content">

				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header" style="height:0%;">
										<!-- STYLER -->

										<!-- /STYLER -->
										<!-- BREADCRUMBS -->

										<ul class="breadcrumb">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="UserManagement.jsp">Administrator</a></li>
											<li><a href="hospital_info.jsp">Hospital Detail</a></li>
											<li>Hospital Accounting Information</li>
                                             <li class="pull-right">
                                             
                                             <button class="btn btn-success" type="button"
														data-toggle="tooltip" data-placement="left"
														title="Save Account Information"
														onclick="saveHospitalAccDetailsNew()">
														<i class="fa fa-save"></i>
													</button>
                                             </li>
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row"></div>

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-primary">
										<div class="panel-heading">Hospital Accounting
											Information</div>
										<div class="panel-body">

											<div class="row">

												<form>
													<div class="form-row">
														<div class="form-group col-md-3">
															<label for="inputEmail4">Unit</label> <select
																id="hInfoUnitId" name="hInfoUnitId"
																class="form-control input-SmallText">
															</select>
														</div>
														<div class="form-group col-md-3">
															<label>IPD Registration Fees(Rs.)<b
																style="color: red; padding-left: 3px;">*</b>
															</label> <input type="email" class="form-control"
																id='txtIPDFee' placeholder="IPD Registration Fees"
																id='txtIPDFee'>
														</div>
														<div class="form-group col-md-3">
															<label class="TextFont">From <b
																style="color: red; padding-left: 3px;">*</b></label> <select
																class="form-control form-control-sm" id='OTFrmTime'>
																<option value="00:00:01">00:00:01</option>
																<option value="01:00:00">01:00:00</option>
																<option value="02:00:00">02:00:00</option>
																<option value="03:00:00">03:00:00</option>
																<option value="04:00:00">04:00:00</option>
																<option value="05:00:00">05:00:00</option>
																<option value="06:00:00">06:00:00</option>
																<option value="07:00:00">07:00:00</option>
																<option value="08:00:00">08:00:00</option>
																<option value="09:00:00">09:00:00</option>
																<option value="10:00:00">10:00:00</option>
																<option value="11:00:00">11:00:00</option>
																<option value="12:00:00">12:00:00</option>
																<option value="13:00:00">13:00:00</option>
																<option value="14:00:00">14:00:00</option>
																<option value="15:00:00">15:00:00</option>
																<option value="16:00:00">16:00:00</option>
																<option value="17:00:00">17:00:00</option>
																<option value="18:00:00">18:00:00</option>
																<option value="19:00:00">19:00:00</option>
																<option value="20:00:00">20:00:00</option>
																<option value="21:00:00">21:00:00</option>
																<option value="22:00:00">22:00:00</option>
																<option value="23:00:00">23:00:00</option>
																<option value="23:59:59">23:59:59</option>
															</select>
														</div>

														<div class="form-group col-md-3">
															<label class="TextFont">To <b
																style="color: red; padding-left: 3px;">*</b></label> <select
																class="form-control form-control-sm" id='OTToTime'>
																<option value="00:00:01">00:00:01</option>
																<option value="01:00:00">01:00:00</option>
																<option value="02:00:00">02:00:00</option>
																<option value="03:00:00">03:00:00</option>
																<option value="04:00:00">04:00:00</option>
																<option value="05:00:00">05:00:00</option>
																<option value="06:00:00">06:00:00</option>
																<option value="07:00:00">07:00:00</option>
																<option value="08:00:00">08:00:00</option>
																<option value="09:00:00">09:00:00</option>
																<option value="10:00:00">10:00:00</option>
																<option value="11:00:00">11:00:00</option>
																<option value="12:00:00">12:00:00</option>
																<option value="13:00:00">13:00:00</option>
																<option value="14:00:00">14:00:00</option>
																<option value="15:00:00">15:00:00</option>
																<option value="16:00:00">16:00:00</option>
																<option value="17:00:00">17:00:00</option>
																<option value="18:00:00">18:00:00</option>
																<option value="19:00:00">19:00:00</option>
																<option value="20:00:00">20:00:00</option>
																<option value="21:00:00">21:00:00</option>
																<option value="22:00:00">22:00:00</option>
																<option value="23:00:00">23:00:00</option>
																<option value="23:59:59">23:59:59</option>
															</select>
														</div>
														<div class="form-group col-md-3">
															<label class="TextFont">Anaesthesia Normal(%) <b
																style="color: red; padding-left: 3px;">*</b></label> <input
																id='aneNormal' name='aneNormal' type="text"
																onkeypress="return validatePrice(event)"
																class="form-control form-control-sm" required="required"
																maxlength="2" />
														</div>
														<div class="form-group col-md-3">
															<label class="TextFont">Administrative Charges <b
																style="color: red; padding-left: 3px;">*</b></label> <select
																id="txtChrgType" class="form-control form-control-sm"
																style="display: none;">
																<option value="percentage" onClick="showtxtper()">Percentage
																	(%)</option>
																<option value="rupee" onClick="showtxtINR()">Rupee
																	INR (&#8377)</option>
															</select>
															<div id="ChrgPer">
																<input id='txtadminChrg' name='txtadminChrg' type="text"
																	class="form-control input-SmallText"
																	required="required" />
															</div>

														</div>

														<div class="form-group col-md-3">
															<label class="TextFont">OT Charges (in %) <b
																style="color: red; padding-left: 3px;">*</b></label> <input
																id='txtOTcharge' name='txtOTcharge' type="text"
																onkeypress="return validatePrice(event)"
																class="form-control input-SmallText" required="required"
																maxlength="2" />
														</div>

														<div class="form-group col-md-3">
															<label class="TextFont">Anaesthesia StandBy(%) <b
																style="color: red; padding-left: 3px;">*</b></label> <input
																id="aneStandby" name="aneStandby" type="text"
																onkeypress="return validatePrice(event)"
																class="form-control form-control-sm" required="required"
																maxlength="5">
														</div>

														<div class="form-group col-md-3">
															<label class="TextFont">TPA Processing
																Charges(Rs.) <b style="color: red; padding-left: 3px;">*</b>
															</label> <input id="txtTPAChr" name="txtTPAChr" type="text"
																onkeypress="return validatePrice(event)"
																class="form-control form-control-sm" required="required"
																maxlength="4">
														</div>

														<div class="form-group col-md-3">
															<label class="TextFont">OT Charges After OT
																Time(Rs. per hour)</label> <input id='txtOT' name='txtOT'
																type="text" onkeypress="return validateNumbers(event)"
																class="form-control form-control-sm" required="required"
																maxlength="5" />
														</div>


														<div class="form-group col-md-3">
															<label class="TextFont">Anaesthesia ASA/IV(%)</label> <input
																id='aneAsa' name='aneAsa' type="text"
																onkeypress="return validatePrice(event)"
																class="form-control form-control-sm" required="required"
																maxlength="4" />
														</div>



														<div class="form-group col-md-3">
															<label class="TextFont">Operation Time for
																Emergency<b style="color: red; padding-left: 3px;">*</b>
															</label>

															<div class="form-inline">
																<label class="my-1 mr-2"
																	for="inlineFormCustomSelectPref">From</label> <select
																	id='OpEmerFrmTime'>
																	<option value="00:00:01">00:00:01</option>
																	<option value="01:00:00">01:00:00</option>
																	<option value="02:00:00">02:00:00</option>
																	<option value="03:00:00">03:00:00</option>
																	<option value="04:00:00">04:00:00</option>
																	<option value="05:00:00">05:00:00</option>
																	<option value="06:00:00">06:00:00</option>
																	<option value="07:00:00">07:00:00</option>
																	<option value="08:00:00">08:00:00</option>
																	<option value="09:00:00">09:00:00</option>
																	<option value="10:00:00">10:00:00</option>
																	<option value="11:00:00">11:00:00</option>
																	<option value="12:00:00">12:00:00</option>
																	<option value="13:00:00">13:00:00</option>
																	<option value="14:00:00">14:00:00</option>
																	<option value="15:00:00">15:00:00</option>
																	<option value="16:00:00">16:00:00</option>
																	<option value="17:00:00">17:00:00</option>
																	<option value="18:00:00">18:00:00</option>
																	<option value="19:00:00">19:00:00</option>
																	<option value="20:00:00">20:00:00</option>
																	<option value="21:00:00">21:00:00</option>
																	<option value="22:00:00">22:00:00</option>
																	<option value="23:00:00">23:00:00</option>
																	<option value="23:59:59">23:59:59</option>
																</select> <label class="my-1 mr-2"
																	for="inlineFormCustomSelectPref">To</label> <select
																	id="OpEmerToTime">
																	<option value="00:00:01">00:00:01</option>
																	<option value="01:00:00">01:00:00</option>
																	<option value="02:00:00">02:00:00</option>
																	<option value="03:00:00">03:00:00</option>
																	<option value="04:00:00">04:00:00</option>
																	<option value="05:00:00">05:00:00</option>
																	<option value="06:00:00">06:00:00</option>
																	<option value="07:00:00">07:00:00</option>
																	<option value="08:00:00">08:00:00</option>
																	<option value="09:00:00">09:00:00</option>
																	<option value="10:00:00">10:00:00</option>
																	<option value="11:00:00">11:00:00</option>
																	<option value="12:00:00">12:00:00</option>
																	<option value="13:00:00">13:00:00</option>
																	<option value="14:00:00">14:00:00</option>
																	<option value="15:00:00">15:00:00</option>
																	<option value="16:00:00">16:00:00</option>
																	<option value="17:00:00">17:00:00</option>
																	<option value="18:00:00">18:00:00</option>
																	<option value="19:00:00">19:00:00</option>
																	<option value="20:00:00">20:00:00</option>
																	<option value="21:00:00">21:00:00</option>
																	<option value="22:00:00">22:00:00</option>
																	<option value="23:00:00">23:00:00</option>
																	<option value="23:59:59">23:59:59</option>
																</select>
															</div>


														</div>

														<div class="form-group col-md-3">
															<label class="TextFont">OT Emergency Charges(%)</label> <input
																id='txtOTEmerchrg' name='txtOTEmerchrg' type="text"
																onkeypress="return validateNumbers(event)"
																class="form-control form-control-sm" required="required"
																maxlength="5" />
														</div>
														<div class="form-group col-md-3">
															<label class="TextFont">Assistant Surgeon
																Charges(%)</label> <input id='astsurchrg' name='astsurchrg'
																type="text" onkeypress="return validatePrice(event)"
																class="form-control form-control-sm" required="required"
																maxlength="4" />
														</div>
														<div class="form-group col-md-3">
															<label class="TextFont">Doctor Round Charges (For
																Emergency in % )</label> <input id='docRCART' name='docRCART'
																type="text" onkeypress="return validatePrice(event)"
																class="form-control form-control-sm" required="required"
																maxlength="4" />
														</div>
														<div class="form-group col-md-3">
															<label class="TextFont">Doctor Round Time (For
																Emergency in)</label>
															<div class="form-inline">
																<label class="my-1 mr-2"
																	for="inlineFormCustomSelectPref">From</label> <select
																	class="custom-select my-1 mr-sm-2" id='DocRdFrmTime'>
																	<option value="00:00:01">00:00:01</option>
																	<option value="01:00:00">01:00:00</option>
																	<option value="02:00:00">02:00:00</option>
																	<option value="03:00:00">03:00:00</option>
																	<option value="04:00:00">04:00:00</option>
																	<option value="05:00:00">05:00:00</option>
																	<option value="06:00:00">06:00:00</option>
																	<option value="07:00:00">07:00:00</option>
																	<option value="08:00:00">08:00:00</option>
																	<option value="09:00:00">09:00:00</option>
																	<option value="10:00:00">10:00:00</option>
																	<option value="11:00:00">11:00:00</option>
																	<option value="12:00:00">12:00:00</option>
																	<option value="13:00:00">13:00:00</option>
																	<option value="14:00:00">14:00:00</option>
																	<option value="15:00:00">15:00:00</option>
																	<option value="16:00:00">16:00:00</option>
																	<option value="17:00:00">17:00:00</option>
																	<option value="18:00:00">18:00:00</option>
																	<option value="19:00:00">19:00:00</option>
																	<option value="20:00:00">20:00:00</option>
																	<option value="21:00:00">21:00:00</option>
																	<option value="22:00:00">22:00:00</option>
																	<option value="23:00:00">23:00:00</option>
																	<option value="23:59:59">23:59:59</option>
																</select> <label class="my-1 mr-2"
																	for="inlineFormCustomSelectPref">To</label> <select
																	class="custom-select my-1 mr-sm-2" id='DocRdToTime'>
																	<option value="00:00:01">00:00:01</option>
																	<option value="01:00:00">01:00:00</option>
																	<option value="02:00:00">02:00:00</option>
																	<option value="03:00:00">03:00:00</option>
																	<option value="04:00:00">04:00:00</option>
																	<option value="05:00:00">05:00:00</option>
																	<option value="06:00:00">06:00:00</option>
																	<option value="07:00:00">07:00:00</option>
																	<option value="08:00:00">08:00:00</option>
																	<option value="09:00:00">09:00:00</option>
																	<option value="10:00:00">10:00:00</option>
																	<option value="11:00:00">11:00:00</option>
																	<option value="12:00:00">12:00:00</option>
																	<option value="13:00:00">13:00:00</option>
																	<option value="14:00:00">14:00:00</option>
																	<option value="15:00:00">15:00:00</option>
																	<option value="16:00:00">16:00:00</option>
																	<option value="17:00:00">17:00:00</option>
																	<option value="18:00:00">18:00:00</option>
																	<option value="19:00:00">19:00:00</option>
																	<option value="20:00:00">20:00:00</option>
																	<option value="21:00:00">21:00:00</option>
																	<option value="22:00:00">22:00:00</option>
																	<option value="23:00:00">23:00:00</option>
																	<option value="23:59:59">23:59:59</option>
																</select>
															</div>


														</div>
														<div class="form-group col-md-3">
															<label class="TextFont">Preanaesthesia Charges
																(Rs.)</label> <input id='txtPreanechrg' name='txtPreanechrg'
																type="text" onkeypress="return validateNumbers(event)"
																class="form-control form-control-sm" required="required"
																maxlength="4" />
														</div>
														<div class="form-group col-md-3">
															<label class="TextFont">IPD Billing</label> <input
																type="radio" style="margin-left: 10px;" id='radioAuto'
																value="A" name="IPD_Billing_Radio" /> <label>Automatic</label>
															<input type="radio" style="margin-left: 10px;"
																id='radioManual' value="M" name="IPD_Billing_Radio" />
															<label>Manual</label>

														</div>
														<div class="form-group col-md-3">
															<label class="TextFont">Operation Emergency
																Charges (in %)</label> <input id='txtOpEmrcharge'
																name='txtOpEmrcharge' type="text"
																onkeypress="return validatePrice(event)"
																class="form-control form-control-sm" required="required"
																maxlength="2" />
														</div>
														<div class="form-group col-md-3">
															<label class="TextFont">TDS (%)</label> <input
																id='txtTDS' name='txtTDS' type="text"
																onkeypress="return validateNumbers(event)"
																class="form-control form-control-sm" required="required"
																maxlength="4" />
														</div>
														<div class="form-group col-md-3">
															<label class="TextFont">Reference doctor
																percentage %</label> <input id='refDocPer' name='refDocPer'
																type="text" onkeypress="return validateNumPer(event)"
																class="form-control form-control-sm" maxlength="5" />
														</div>
														<div class="form-group col-md-3">
															<label class="TextFont">Ppn percentage %</label> <input
																id='ppnPer' name='ppnPer' type="text"
																onkeypress="return validateNumPer(event)"
																class="form-control form-control-sm" maxlength="5" />
														</div>
														<div class="form-group col-md-3">
															<label class="TextFont">Currency Type</label> <select
																id="currencyId" name="currencyId"
																class="form-control form-control-sm">
															</select>
														</div>

														<div class="form-group col-md-3">
															<label class="TextFont">Emergency charges in
																percentage %</label> <input id='emrChrPer' name='emrChrPer'
																type="text" onkeypress="return validateNumPer(event)"
																class="form-control form-control-sm" maxlength="5" />
														</div>

														<div class="form-group col-md-3">
															<label class="TextFont">Emergency Admission Time</label>
															<div class="form-inline">
																<label class="my-1 mr-2"
																	for="inlineFormCustomSelectPref">From</label> <select
																	class="custom-select my-1 mr-sm-2" id='SelEAFrmTime'>
																	<option value="00:00:01">00:00:01</option>
																	<option value="01:00:00">01:00:00</option>
																	<option value="02:00:00">02:00:00</option>
																	<option value="03:00:00">03:00:00</option>
																	<option value="04:00:00">04:00:00</option>
																	<option value="05:00:00">05:00:00</option>
																	<option value="06:00:00">06:00:00</option>
																	<option value="07:00:00">07:00:00</option>
																	<option value="08:00:00">08:00:00</option>
																	<option value="09:00:00">09:00:00</option>
																	<option value="10:00:00">10:00:00</option>
																	<option value="11:00:00">11:00:00</option>
																	<option value="12:00:00">12:00:00</option>
																	<option value="13:00:00">13:00:00</option>
																	<option value="14:00:00">14:00:00</option>
																	<option value="15:00:00">15:00:00</option>
																	<option value="16:00:00">16:00:00</option>
																	<option value="17:00:00">17:00:00</option>
																	<option value="18:00:00">18:00:00</option>
																	<option value="19:00:00">19:00:00</option>
																	<option value="20:00:00">20:00:00</option>
																	<option value="21:00:00">21:00:00</option>
																	<option value="22:00:00">22:00:00</option>
																	<option value="23:00:00">23:00:00</option>
																	<option value="23:59:59">23:59:59</option>
																</select> <label class="my-1 mr-2"
																	for="inlineFormCustomSelectPref">To</label> <select
																	class="custom-select my-1 mr-sm-2" id='SelEAToTime'>
																	<option value="00:00:01">00:00:01</option>
																	<option value="01:00:00">01:00:00</option>
																	<option value="02:00:00">02:00:00</option>
																	<option value="03:00:00">03:00:00</option>
																	<option value="04:00:00">04:00:00</option>
																	<option value="05:00:00">05:00:00</option>
																	<option value="06:00:00">06:00:00</option>
																	<option value="07:00:00">07:00:00</option>
																	<option value="08:00:00">08:00:00</option>
																	<option value="09:00:00">09:00:00</option>
																	<option value="10:00:00">10:00:00</option>
																	<option value="11:00:00">11:00:00</option>
																	<option value="12:00:00">12:00:00</option>
																	<option value="13:00:00">13:00:00</option>
																	<option value="14:00:00">14:00:00</option>
																	<option value="15:00:00">15:00:00</option>
																	<option value="16:00:00">16:00:00</option>
																	<option value="17:00:00">17:00:00</option>
																	<option value="18:00:00">18:00:00</option>
																	<option value="19:00:00">19:00:00</option>
																	<option value="20:00:00">20:00:00</option>
																	<option value="21:00:00">21:00:00</option>
																	<option value="22:00:00">22:00:00</option>
																	<option value="23:00:00">23:00:00</option>
																	<option value="23:59:59">23:59:59</option>
																</select>
															</div>

														</div>



														<div class="form-group col-md-3">
															<label class="TextFont">Prefix & Suffix </label> <input
																type="checkbox" onclick="showHidePrefix()" class="radio"
																id="chkPreSuf" />
														</div>



													</div>
												</form>

											</div>

											<div class="row">
											
												
											<div class="form-group col-md-12" id="divBillPrefix" style="display: none;overflow: auto;">
													<div class="panel panel-default">
													<ul class="nav nav-tabs" style="padding: 0px">						
							
														<li class="pull-right" style="width: 100px">
															<button value="+" id="btnAddNew" type="button" style="margin: 7px;float: left;margin-left: 40px"
																class="btn btn-xs btn-success" onclick="toCreatePrefixTr()">+</button>
															<button value="_" id="btnDelete" type="button" style="margin: 7px;" 
																class="btn btn-xs btn-success" onclick="toRemovePrefixTr('RowCount')">-</button>
														</li>
							
													</ul>
													
													<div class="divide-10"></div>
													
													<div style="overflow: auto;">
													
													<table border="1" class="table table-bordered table-striped table-condensed" id="billPrefixTable" style="width: 100%">
														<thead>
															<tr>
																<th class="center" style='width:15%'>Dept</th>
																<th class="center" style='width:20%'>Prefix</th>
																<th class="center" style='width:20%'>Middle</th>															
																<th class="center" style='width:20%'>Suffix</th>
																<th class="center" style='width:25%'>Bill/Rec</th>																														
															</tr>
														</thead>
														<tbody	style="overflow-y: scroll; border: 1px solid #436a9d;" id="billPrefixTbody">
																
															<tr>
																<td class="col-md-2-2 center">
																	<select>
																		<option value="0">All<option>
																		<option value="1">Opd<option>
																		<option value="2">Ipd<option>
																		<option value="3">Diag<option>
																		<option value="4">Reg No<option>
																	</select>
																</td>
																<td class="col-md-2-1 center"><input type="text" id="prefix"/></td>
																<td class="col-md-2-2 center"><input type="text" id="middle"/></td>															
																<td class="col-md-2-1 center"><input type="text" id="sufix"/></td>
																<td class="col-md-2-2 center" >
																
																	
																</td>																														
															</tr>
																								
														</tbody>
													</table>
													
													</div>
												
																			
												
												
												</div>
											</div>
											
											
												<div class="form-group col-md-12">
													<div class="divide-10"></div>
													<label class="TextFont" id="adminConfig"
														style="color: blue; text-decoration: none; cursor: pointer;">Show
														Admin Charges Configuration</label> <input id="rdFixed"
														type="radio" name="rdAdminChrg" value="fixed"
														checked="checked" onclick="showHideAdminChg('fixed')">
													Fixed Charges <input id="rdservicewise" type="radio"
														name="rdAdminChrg" value="servicewise"
														onclick="showHideAdminChg('serviceWise')"> Service
													Wise Charges
												</div>



												<div class="form-group col-md-6" id="mainSrv"
													style="display: none;">
													<div class="divide-10"></div>
													<label class="TextFont">Select Admin Services </label>
													<div class="divide-10"></div>
													<select id="adminSrv" class="col-md-12" onchange="fetchSubServicesForHosp();" multiple
														name="adminSrv"></select>

												</div>

												<!-- <div class="form-group col-md-6" id="divLine10"
													style="display: none;">
													<div class="divide-10"></div>
													<label class="TextFont">Select Sub Services </label>
													<div class="divide-10"></div>
													<select name="listmstr" id="listmstr_select"
														class="form-control form-control-sm"
														onchange="setDyanamicDivNew('dynamicItem',this.id)">
														<option id="firstElmt" value="0">--- Select
															Services ---</option>

													</select><br /> <br />	
													<div
														class="form-group select2-container select2-container-multi ">
														<ul id="dynamicItem" class="select2-choices"
															style="overflow-y: scroll;">

														</ul>
													</div>

												</div> -->
												<div class="col-sm-4" id="divLine10"
										style="display: none">

										<div class="col-sm-12">
											<label for="inlineFold" class="control-label">Select
												SubService </label>
										</div>

										<select id="listmstr_select" multiple="multiple"
											style="width: 100%">
											<option value="0">--Select SubServices--</option>
										</select> 

                                             </div>

												<div class="row">
												
												
													<div class="form-group col-md-12" id="divLine3"
														style="display: none;">

														<!-- 1st panel start here -->

														<div class="col-md-6 form-group">

															<div class="panel panel-primary">
																<div class="panel-heading">
																	<i class="fa fa-table"></i>Services
																</div>
																<div class="panel-body">
																	<form class="form-inline">

																		<div class="form-group col-md-6 mb-2">
																			<input class="form-control form-control-sm"
																				name="byName" type="text"
																				onkeyup="setAutoCompleteForConfiguration(this.id,'search')"
																				class="typeahead form-control input-SmallText"
																				id="byName" />
																		</div>
																		<input type="button" value="show"
																			class="btn btn-xs btn-primary" id="showdata"
																			onclick="showData1()" />
																	</form>
																	<div class="col-md-12">&nbsp;</div>
																	<div class="col-md-12"
																		style="overflow: auto; height: 261px;">
																		<table
																			class="table table-responsive table-bordered table-striped">
																			<thead>
																				<tr>

																					<th class='col-md-10-1 center'
																						style='height: 21.5px;'><div class='TextFont'>Service
																							Name</div></th>

																					<th class='col-md-2-1 center'
																						style='height: 21.5px;'><input type='button'
																						value='>>' onclick='addAllTrFromBackend()'></th>

																				</tr>
																			</thead>
																			<tbody id="leftDiv">



																			</tbody>
																		</table>


																	</div>


																</div>
															</div>
														</div>
	<!-- 1st panel end here -->

<!-- 2nd panel start here -->

               <div class="col-md-6 form-group">

															<div class="panel panel-primary">
																<div class="panel-heading">
																<i class="fa fa-table"></i>Charges Configuration
																</div>
																<div class="panel-body">
																	<div class="col-md-12"
																		style="overflow: auto; height: 299px;">
																		<table
																			class="table table-responsive table-bordered table-striped" id="tblRightDiv">
																			<thead>
																			<tr>
																			<th>Service Name</th>
																			
																			<th>
																								<input class="form-control form-control-sm"  
																								onkeyup="searchservicesonui()" 
	                                                                                                type="text" placeholder="Search"></th>
																			</tr>
																			</thead>
																			<tbody id="rightDiv">



																				</tbody>
																			</table>
                                              
																</div>
															</div>
														</div>               






													</div>



</div></div></div>

												</div>
											</div>
										</div>
									</div>
									<!-- /NEW ORDERS -->

								</div>

								<div class="footer-tools">
									<span class="go-top"> <i class="fa fa-chevron-up"></i>
										Top
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
					<%@include file="footer_nobel.jsp"%>
		</section>
		<!--/PAGE -->
			<input type="hidden" id="queryType" value="Insert" />
			<input type="hidden" id="idForHospital" value="0" />
			<div id="subIDs" style="display: none;"></div>

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
				//getAllDocumentMaster();
			});
		</script>
		<input type="hidden" id=doc_id value="0">
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<!-- /JAVASCRIPTS -->
			<div id="subIDs" style="display: none;"></div>
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>