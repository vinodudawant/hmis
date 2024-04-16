<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Hospital Information Master</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<%@include file="inv_header.jsp"%>
<!-- include js for development -->
<script type="text/javascript" src="js/hospitalDetailAdministrator.js"></script>
<script type="text/javascript" src="js/ehat_inventory.js"></script>
<script type="text/javascript" src="js/admin_district.js"></script>

<script type="text/javascript" src="js/abdm_sandbox.js"></script>

<script>
	$(document).ready(function() {
		$("#pathologyInfoTable").hide();
		$(".checkRadioBtn1").click(function() {
			$("#sandboxIntegration").prop("checked", true);
		});

	});
</script>
</head>

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
			<!-- /SIDEBAR -->
			<div id="main-content">

				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">
										<!-- STYLER -->
										<!-- /STYLER -->
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><i class="fa fa-home"></i> <a
												href="admin_hospital_information.jsp">Hospital
													Information</a></li>
											<li class="pull-right">
												<button class="btn btn-xs btn-info pull-left" type="button"
													onclick="toggleEntryDiv('ownerForm')">
													<i class="fa fa-plus"></i> Hospital Information
												</button>
											</li>
										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>
							<div class="row">

								<div class="col-md-12">
									<div class="col-md-4"></div>
								</div>
							</div>
							<div class="row">
								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">

											<div class="row">
												<div class="col-md-12" id="divForEntry"
													style="display: none;">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Hospital
																Information Master</div>
															<div class="panel-body">
																<form id="financialFormId">
																	<div class="form-row">
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Unit</label> <select
																				id="hInfoUnitId" name="hInfoUnitId"
																				onchange="getHospitalInfo1(),gethospitalspcializationListByUnitId(),getListDepartmentsByUnitId();"
																				class="form-control input-SmallText">
																			</select>
																		</div>

																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Hospital Name <b
																				style="color: red;">*</b></label> <input type="text"
																				id='txtHosName' name='txtHosName'
																				placeholder="Enter Hospital Name"
																				style="width: 100%;" class="form-control tip-focus"
																				title="Enter Hospital Name">
																		</div>

																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Initials <b
																				style="color: red;">*</b></label> <input type="text"
																				id='txtInitials' name='txtInitials'
																				placeholder="Intitial Name" style="width: 100%;"
																				class="form-control tip-focus"
																				title="Please Intitial Name">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Address <b
																				style="color: red;">*</b></label>
																			<textarea type="text" id='txtAddress'
																				name='txtAddress' placeholder="Address"
																				style="width: 100%; height: 25px;"
																				class="form-control tip-focus"
																				title="Please Enter Address" rows="3"></textarea>
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Zip Code</label> <input
																				type="text" id='txtZipCode' name='txtZipCode'
																				placeholder="Zip Code" style="width: 100%;"
																				class="form-control tip-focus"
																				title="Please Enter Zip Code">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">City <b
																				style="color: red;">*</b></label> <input type="text"
																				id='txtCity' name='txtCity' placeholder="City"
																				style="width: 100%;" class="form-control tip-focus"
																				title="Please Enter City">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Email ID<b
																				style="color: red;">*</b></label> <input type="text"
																				name="email" id="email" placeholder="Email ID"
																				style="width: 100%;" class="form-control tip-focus"
																				title="Please Enter Email ID">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Contact No.<b
																				style="color: red;">*</b></label> <input type="text"
																				id='txtContact' name='txtContact'
																				placeholder="Contact No." style="width: 100%;"
																				class="form-control tip-focus"
																				title="Please Enter Contact No" maxlength="10">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Fax Number</label> <input
																				type="text" id='txtFax' name='txtFax'
																				placeholder="Fax Number" style="width: 100%;"
																				class="form-control tip-focus"
																				title="Please Enter Fax Number">
																		</div>

																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Opd Registration
																				Fees <b style="color: red;">*</b>
																			</label></label> <input type="text" id='txtRegCh' name='txtRegCh'
																				placeholder="Opd Registration Fees"
																				style="width: 100%;" class="form-control tip-focus"
																				title="Please Enter Registration fees">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Diagnostic
																				Registration Fees <b style="color: red;">*</b>
																			</label></label> <input type="text" id='txtRegChDiagnostc'
																				name='txtRegCh' placeholder="Diag Registration Fees"
																				style="width: 100%;" class="form-control tip-focus"
																				title="Please Enter Registration fees">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Service Tax No<b
																				style="color: red;">*</b></label> <input type="text"
																				type="text" id='txtSerTaxNo'
																				"  placeholder="Service Tax" style="width: 100%;"
																				class="form-control tip-focus"
																				title="Please Enter Service Tax Number">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">GST IN<b
																				style="color: red;">*</b></label> <input type="text"
																				id='txtGstNo' placeholder="GST NO"
																				style="width: 100%;" class="form-control tip-focus"
																				title="Please enter GST Number">
																		</div>

																		<div class="form-group col-md-3">
																			<label for="inputEmail4">CIN No <b
																				style="color: red;">*</b></label> <input type="text"
																				id='txtCinNo' placeholder="CIN No"
																				style="width: 100%;" class="form-control tip-focus"
																				title="Please Enter CIN NO">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Treatment Close
																				Time(In Minutes) </label> <input type="text"
																				id='txtTrmtClsTime'
																				placeholder="Treatment Close Time" name="taxrate"
																				style="width: 100%;" class="form-control tip-focus"
																				title="Please Enter Treatment Close Time">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Service Tax(%)<b
																				style="color: red;">*</b></label> <input type="text"
																				id='txtSerTax' placeholder="Service Tax"
																				style="width: 100%;" class="form-control tip-focus"
																				title="Please Enter Service Tax">
																		</div>

																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Doctors Follow Up
																				Days<b style="color: red;">*</b>
																			</label> <input type="text" maxlength="5"
																				id='txtDocFollowUpDays'
																				placeholder="Doctors Follow Up Days"
																				style="width: 100%;" class="form-control tip-focus"
																				title="Please Enter Doctors Follow Up Days">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Registration Follow
																				Up Days<b style="color: red;">*</b>
																			</label> <input type="text" maxlength="5"
																				id='txtRegFollowUpDays'
																				placeholder="Registration Follow Up Days"
																				name="taxrate" style="width: 100%;"
																				class="form-control tip-focus"
																				title="Please Enter Registration Follow Up Days">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">MLC Charges(Rs)<b
																				style="color: red;">*</b></label> <input type="text"
																				id='txtMLCChr' placeholder="MLC Charges(Rs) *"
																				style="width: 100%;" class="form-control tip-focus"
																				title="Please Enter MLC Charges(Rs)">
																		</div>

																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Infection Charges(%)</label>
																			<input type="text" id='txtInfChr'
																				placeholder="Infection Charges(%)"
																				style="width: 100%;" class="form-control tip-focus"
																				title="Please Enter Infection Charges(%)">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Website.</label> <input
																				type="text" id="website" placeholder="Website"
																				name="website" style="width: 100%;"
																				class="form-control tip-focus"
																				title="Please Enter Website">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Secondary Phone
																				Number</label> <input type="text" id="secPNo"
																				placeholder="Secondary Phone Number"
																				style="width: 100%;" class="form-control tip-focus"
																				title="Please Enter Secondary Phone Number">
																		</div>

																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Pan No</label> <input
																				type="text" name="PanNo" id="PanNo"
																				placeholder="Pan No" style="width: 100%;"
																				class="form-control tip-focus"
																				title="Please Enter Pan No">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Hospital Reg No.</label> <input
																				type="text" id="hosRegNo"
																				placeholder="Hospital Reg No" name="hosRegNo"
																				style="width: 100%;" class="form-control tip-focus"
																				title="Please Enter Hospital Reg No">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Bed Ridden
																				charges(%)</label> <input type="text"
																				name="'txtBedRiddenCharges'"
																				id="'txtBedRiddenCharges'"
																				placeholder="Bed Ridden charges"
																				style="width: 100%;" class="form-control tip-focus"
																				title="Please Enter Bed Ridden charges">
																		</div>

																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Sero Positive
																				Charges(%)</label> <input type="text" name="txtServoCharges"
																				id="txtServoCharges"
																				placeholder="Sero Positive Charges(%)"
																				style="width: 100%;" class="form-control tip-focus"
																				title="Please Enter Sero Positive Charges">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Charges for Surgeon
																				Instruments(%)</label> <input type="text"
																				id="txtSurInstruCharges"
																				placeholder="Charges for Surgeon Instruments"
																				name="txtSurInstruCharges" style="width: 100%;"
																				class="form-control tip-focus"
																				title="Please Enter Charges for Surgeon Instruments">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Post Surgical
																				Charges(Rs)</label><br> <label class="TextFont">Upto
																				2 Days</label> <input type="text" name="surChrtwoHrs"
																				id="surChrtwoHrs"
																				placeholder="Post Surgical Charges(Rs)"
																				style="width: 100%;" class="form-control tip-focus"
																				title="Please Enter Post Surgical Charges(Rs)">
																		</div>

																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Post Surgical
																				Charges(Rs)</label><br> <label class="TextFont">Upto
																				4 Days</label> <input type="text" name="surChrFourHrs"
																				id="surChrFourHrs" placeholder="Upto 4 Days"
																				style="width: 100%;" class="form-control tip-focus"
																				title="Please Enter Upto 4 Days">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Post Surgical
																				Charges(Rs)</label><br> <label class="TextFont">Beyond
																				6 Days</label> <input type="text" id="surChrBeyondFourHrs"
																				placeholder="Beyond 6 Days"
																				name="surChrBeyondFourHrs" style="width: 100%;"
																				class="form-control tip-focus"
																				title="Please Enter Beyond 6 Days">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">State</label> <select
																				id="stateId" name="stateId"
																				class="form-control input-SmallText">
																			</select>
																		</div>
																		<div class="form-group col-md-3">

																			<label for="inputEmail4">Appointment Start
																				Time <b style="color: red;">*</b>
																			</label> <select id='txtAppoStrtTime'
																				class="form-control input-SmallText">
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
																			<label for="inputEmail4">Appointment End Time<b
																				style="color: red;">*</b></label> <select
																				id='txtAppoEndTime'
																				class="form-control input-SmallText">
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
																			<label for="inputEmail4">Appointment
																				Duration(In Minutes)<b style="color: red;">*</b>
																			</label> <select id='txtAppoDure'
																				class="form-control input-SmallText">
																				<option value="5">5</option>
																				<option value="10">10</option>
																				<option value="15">15</option>
																				<option value="20">20</option>
																				<option value="25">25</option>
																				<option value="30">30</option>
																				<option value="35">35</option>
																				<option value="40">40</option>
																				<option value="45">45</option>
																				<option value="50">50</option>
																				<option value="55">55</option>
																				<option value="60">60</option>
																			</select>
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Billing Day Time
																				From<b style="color: red;">*</b>
																			</label> <select class="form-control input-SmallText"
																				id='txtBlDayFrmTime'>
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
																			<label for="inputEmail4">Billing Day Time To<b
																				style="color: red;">*</b></label> <select
																				class="form-control input-SmallText"
																				id='txtBlDayToTime'>
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
																			<label for="inputEmail4">Anaesthetist Charges
																			</label> <select class="form-control input-SmallText"
																				id='txtAnestChar'>
																				<option value="1">Fix</option>
																				<option value="2">Percentage</option>
																			</select>
																		</div>

																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Image and Address
																				place on print:</label> <label for="inputEmail4">Left(I)
																				and Right(A):</label> <input type="radio"
																				name="imageAndAddressPlace" value="LR"
																				checked="checked" /> <label for="inputEmail4">Top(I)
																				and Bottom(A):</label> <input type="radio"
																				name="imageAndAddressPlace" value="LB"
																				checked="checked" /> <label for="inputEmail5">Sandbox
																				Integration </label> <input type="radio"
																				onclick="docheck(this);" id="sandboxIntegration"
																				name="sandboxIntegration" value="false" />
																		</div>


																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Doctor
																				Specialization's</label> <label style="cursor: pointer"
																				onclick="addThemSpe()"><img
																				style="margin-left: 0%;" height="18" width="18"
																				src="images/plus.jpg" id="btnAddSpeciality"> </label>
																			&nbsp&nbsp<label style="cursor: pointer"
																				onclick="RemoveThemSpl()"><img height="18"
																				width="18" src="images/minus.jpg"
																				id="btnRemoveSpeciality"></label> <input type="text"
																				id="txtDocSpl" name="txtDocSpl" maxlength="45"
																				class="form-control input-SmallText"
																				required="required" />
																			<div class="divide-10"></div>
																			<select size="4" multiple="multiple" id="selDocSpec"
																				class="form-control input-md">
																			</select>

																		</div>


																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Hospital Departments</label>
																			<label style="cursor: pointer"
																				onclick="addThemDept()"><img
																				style="margin-left: 0%;" height="18" width="18"
																				src="images/plus.jpg" id="btnAddDept"> </label>&nbsp&nbsp<label
																				style="cursor: pointer" onclick="RemoveThemDept()"><img
																				height="18" width="18" src="images/minus.jpg"
																				id="btnRemoveDept"> </label><input type="text"
																				id="txtHosDept" name="txtHosDept" maxlength="45"
																				class="form-control input-SmallText"
																				required="required" />
																			<div class="divide-10"></div>
																			<select size="4" multiple="multiple" id="selHosDept"
																				class="form-control input-md">
																			</select>
																		</div>
																		<div class="form-group col-md-3">
																			<div style='width: 100%; padding-top: 5%;'>
																				<div style='width: 32%; font-size: 15px;'>Upload
																					Logo</div>
																				<div style='width: 40%;'>
																					<form action='' id='fileUploadfrm'
																						name='fileUploadfrm' enctype='multipart/form-data'
																						method='post'>
																						<img src="images/upload-icon.png" width="200px"
																							height="100px" name="patImg" id="patImg1"
																							title="Upload The Logo Of Hospital"
																							style="margin-top: 10px; margin-bottom: 10px;" />
																					</form>
																				</div>
																				<div class="form-group col-md-3 ">
																					<label for="inputEmail4"></label>
																					<form id="docSignUploadfrm" name="docSignUploadfrm">
																						<input class="form-control tip-focus"
																							id="signature1" name="signature" type="file"
																							onchange="uploadHospitalLogo()"
																							placeholder="File Name" style='width: 170px;'>
																						<div id="doctorSignName"
																							style="font-weight: bold; color: green; width: 170px;"></div>
																					</form>
																				</div>
																			</div>
																		</div>

																		<div class="form-group col-md-3">
																			<label for="inputEmail6 " style="scale: 1.3;">Add
																				Pharmacy Information</label> <input
																				class="form-control tip-focus"
																				style="height: 15px; width: 100%; font-weight: bold"
																				class="form-control tip-focus"
																				" id="medicalInformationCheck"
																				onchange="checkboxForMedicalInformation()"
																				type="checkbox">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail6 " style="scale: 1.3;">Add
																				Pathology Information</label> <input
																				class="form-control tip-focus"
																				style="height: 15px; width: 100%; font-weight: bold"
																				class="form-control tip-focus"
																				" id="pathologyInformationCheck"
																				onchange="checkboxForPathologyInformation()"
																				type="checkbox">
																		</div>
																		
																		<div class="form-group col-md-3">
																			<label for="inputEmail6 " style="scale: 1.3;">Upload
																				NABH Logo</label> <input
																				class="form-control tip-focus"
																				style="height: 15px; width: 100%; font-weight: bold"
																				class="form-control tip-focus"
																				" id="nabhLogoCheck"
																				onchange="checkboxForNabhLogo()"
																				type="checkbox">
																		</div>

																		<button type="button"
																			class="btn btn-success editUserAccess"
																			onclick="savehospitalinfo()"
																			style="margin-top: 15px;">Save</button>
																	</div>
																</form>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<!-- Added by Annapurna -->
										<!--  /Medical Information Start -->
										<div class="row">
											<div class="container">
												<div class="container" style="margin-bottom: 20px;">
													<div class="col-md-12">
														<div class="panel panel-primary" id="medicalInfoTable">
															<div class="panel-heading" id="divEhatContent">Medical
																Information Master</div>
															<div class="panel-body"height: 100px">
																<div class="form-row">
																	<div class="form-group col-md-3">
																		<label for="inputEmail6">Medical Name <b
																			style="color: red;">*</b></label> <input type="text"
																			id='txtMedicalName' name='txtMedicalName'
																			placeholder="Enter Medical Name" style="width: 100%;"
																			class="form-control tip-focus"
																			title="Enter Medical Name">
																	</div>
																	<div class="form-group col-md-3">
																		<label for="inputEmail6">Address <b
																			style="color: red;">*</b></label>
																		<textarea type="text" id='txtAddressMedical'
																			name='txtAddressMedical' placeholder="Address"
																			style="width: 100%; height: 25px;"
																			class="form-control tip-focus"
																			title="Please Enter Address" rows="3"></textarea>
																	</div>
																	<div class="form-group col-md-3">
																		<label for="inputEmail6">City <b
																			style="color: red;">*</b></label> <input type="text"
																			id='txtCityMedical' name='txtCityMedical'
																			placeholder="City" style="width: 100%;"
																			class="form-control tip-focus"
																			title="Please Enter City">
																	</div>

																	<div class="form-group col-md-3">
																		<label for="inputEmail6">Zip Code</label> <input
																			type="text" id='txtZipCodeMedical'
																			name='txtZipCodeMedical' placeholder="Zip Code"
																			style="width: 100%;" class="form-control tip-focus"
																			title="Please Enter Zip Code">
																	</div>
																	<!-- <div class="form-group col-md-3">
																			<label for="inputEmail6">Medical State</label> <input
																				type="text" id='medicalState' name='medicalState'
																				placeholder="State Name" style="width: 100%;"
																				class="form-control tip-focus"
																				title="Please Enter Medical State Name">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail6">Medical Country</label> <input
																				type="text" id='medicalCountry' name='medicalCountry'
																				placeholder="Country Name" style="width: 100%;"
																				class="form-control tip-focus"
																				title="Please Enter Medical Country Name ">
																		</div> -->

																	<div class="form-group col-md-3">
																		<label for="inputEmail6">Email ID<b
																			style="color: red;">*</b></label> <input type="text"
																			name="emailMedical" id="emailMedical"
																			placeholder="Email ID For Medical"
																			style="width: 100%;" class="form-control tip-focus"
																			title="Please Enter Email ID">
																	</div>
																	<div class="form-group col-md-3">
																		<label for="inputEmail6">Contact No.<b
																			style="color: red;">*</b></label> <input type="text"
																			id='txtContactMedical' name='txtContactMedical'
																			placeholder="Contact No." style="width: 100%;"
																			class="form-control tip-focus"
																			title="Please Enter Contact No" maxlength="10">
																	</div>
																	<div class="form-group col-md-3">
																		<label for="inputEmail6">Alternative Contact
																			No. </label> <input type="text"
																			id='txtAlternativeContactMedical'
																			name='txtAlternativeContactMedical'
																			placeholder="Alternative Contact No."
																			style="width: 100%;" class="form-control tip-focus"
																			title="Please Enter Alternative Contact No"
																			maxlength="10">
																	</div>
																	<div class="form-group col-md-3">
																		<label for="inputEmail6">drugLicenseNo<b
																			style="color: red;">*</b></label> <input type="text"
																			id='txtdruglicense' name='druglicense'
																			placeholder="DrugLicense No." style="width: 100%;"
																			class="form-control tip-focus"
																			title="Please Enter DrugLicense No">
																	</div>


																	<div class="form-group col-md-3">
																		<label for="inputEmail6">drugLicenseNo1<b
																			style="color: red;">*</b></label> <input type="text"
																			id='txtdruglicense1' name='druglicense1'
																			placeholder="DrugLicense No1." style="width: 100%;"
																			class="form-control tip-focus"
																			title="Please Enter DrugLicense No1">
																	</div>
																	<div class="form-group col-md-3">
																		<label for="inputEmail6">GST IN<b
																			style="color: red;">*</b></label> <input type="text"
																			id='txtMedicalGstNo' placeholder="GST NO"
																			style="width: 100%;" class="form-control tip-focus"
																			title="Please enter GST Number">
																	</div>
																	<div class="form-group col-md-3">
																		<div style='width: 100%; padding-top: 5%;'>
																			<div style='width: 32%; font-size: 15px;'>Upload
																				Logo</div>
																			<div style='width: 40%;'>
																				<form action='' id='fileUploadfrm1'
																					name='fileUploadfrm' enctype='multipart/form-data'
																					method='post'>
																					<img src="images/upload-icon.png" width="200px"
																						height="100px" name="patImg" id="patImg1"
																						title="Upload The Logo Of Hospital"
																						style="margin-top: 10px; margin-bottom: 10px;" />
																				</form>
																			</div>
																			<div class="form-group col-md-3 ">
																				<label for="inputEmail4"></label>
																				<form id="medicalLogo" name="medicalLogo">
																					<input class="form-control tip-focus"
																						id="pharmaLogo" name="pharmaLogo" type="file"
																						onchange="uploadMedicalLogo()"
																						placeholder="File Name" style='width: 170px;'>
																					<div id="pharmacyLogo"
																						style="font-weight: bold; color: green; width: 170px;"></div>
																				</form>
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
										<!-- /Medical Information End -->


										<!-- Added by Annapurna -->
										<!-- /Nabh Logo Start -->
										<div class="row">
											<div class="container">
												<div class="container" style="margin-bottom: 20px;">
													<div class="col-md-12">
														<div class="panel panel-primary" id="nabhLogoTable">
															<div class="panel-heading" id="divEhatContent">UPLOAD NABH
																LOGO</div>
															<div class="panel-body"height: 100px">
																<div class="form-row">
																	<div class="form-group col-md-3">
																		<div style='width: 100%; padding-top: 5%;'>
																			<div style='width: 32%; font-size: 15px;'>UPLOAD NABH
																				LOGO</div>
																			<div style='width: 40%;'>
																				<form action='' id='fileUploadfrm1'
																					name='fileUploadfrm' enctype='multipart/form-data'
																					method='post'>
																					<img src="images/upload-icon.png" width="200px"
																						height="100px" name="patImg" id="patImg1"
																						title="Upload The Logo Of Hospital"
																						style="margin-top: 10px; margin-bottom: 10px;" />
																				</form>
																			</div>
																			<div class="form-group col-md-3 ">
																				<label for="inputEmail4"></label>
																				<form id="nabhImage" name="nabhImage">
																					<input class="form-control tip-focus"
																						id="nabhLogo" name="nabhLogo" type="file"
																						onchange="uploadNabhLogo()"
																						placeholder="File Name" style='width: 170px;'>
																					<div id="nabhImageLogo"
																						style="font-weight: bold; color: green; width: 170px;"></div>
																				</form>
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
										<!-- /Nabh Logo End -->

										<!-- Added by Tushar -->
										<!--  /Pathology Information Start -->
										<div class="row">
											<div class="container">
												<div class="container" style="margin-bottom: 20px;">
													<div class="col-md-12">
														<div class="panel panel-primary" id="pathologyInfoTable">
															<div class="panel-heading" id="divEhatContent">Pathology
																Information Master</div>
															<div class="panel-body"height: 100px">
																<div class="form-row">
																	<div class="form-group col-md-3">
																		<label for="inputEmail6">Pathology Name <b
																			style="color: red;">*</b></label> <input type="text"
																			id='txtpathologyName' name='txtpathologyName'
																			placeholder="Enter Pathology Name"
																			style="width: 100%;" class="form-control tip-focus"
																			title="Enter Pathology Name">
																	</div>
																	<div class="form-group col-md-3">
																		<label for="inputEmail6">Address <b
																			style="color: red;">*</b></label>
																		<textarea type="text" id='txtAddressPathology'
																			name='txtAddressPathology' placeholder="Address"
																			style="width: 100%; height: 25px;"
																			class="form-control tip-focus"
																			title="Please Enter Address" rows="3"></textarea>
																	</div>
																	<!-- <div class="form-group col-md-3">
																		<label for="inputEmail6">City <b
																			style="color: red;">*</b></label> <input type="text"
																			id='txtCityMedical' name='txtCityMedical'
																			placeholder="City" style="width: 100%;"
																			class="form-control tip-focus"
																			title="Please Enter City">
																	</div>

																	<div class="form-group col-md-3">
																		<label for="inputEmail6">Zip Code</label> <input
																			type="text" id='txtZipCodeMedical'
																			name='txtZipCodeMedical' placeholder="Zip Code"
																			style="width: 100%;" class="form-control tip-focus"
																			title="Please Enter Zip Code">
																	</div> -->
																	<!-- <div class="form-group col-md-3">
																			<label for="inputEmail6">Medical State</label> <input
																				type="text" id='medicalState' name='medicalState'
																				placeholder="State Name" style="width: 100%;"
																				class="form-control tip-focus"
																				title="Please Enter Medical State Name">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail6">Medical Country</label> <input
																				type="text" id='medicalCountry' name='medicalCountry'
																				placeholder="Country Name" style="width: 100%;"
																				class="form-control tip-focus"
																				title="Please Enter Medical Country Name ">
																		</div> -->

																	<div class="form-group col-md-3">
																		<label for="inputEmail6">Email ID<b
																			style="color: red;">*</b></label> <input type="text"
																			name="emailPathology" id="emailPathology"
																			placeholder="Email ID For Pathology"
																			style="width: 100%;" class="form-control tip-focus"
																			title="Please Enter Email ID">
																	</div>
																	<div class="form-group col-md-3">
																		<label for="inputEmail6">Phone No.<b
																			style="color: red;">*</b></label> <input type="text"
																			id='txtContactPathology' name='txtContactPathology'
																			placeholder="Phone No." style="width: 100%;"
																			class="form-control tip-focus"
																			title="Please Enter Mobile No" maxlength="10">
																	</div>
																	<div class="form-group col-md-3">
																		<label for="inputEmail6">Mobile No. </label> <input
																			type="text" id='txtAlternativeContactPathology'
																			name='txtAlternativeContactPathology'
																			placeholder="Alternative Contact No."
																			style="width: 100%;" class="form-control tip-focus"
																			title="Please Enter Mobile No" maxlength="10">
																	</div>
																	<div class="form-group col-md-3">
																		<label for="inputEmail6">Owner Name<b
																			style="color: red;">*</b></label> <input type="text"
																			id='txtpathologistName' name='pathologistName'
																			placeholder="Owner Name" style="width: 100%;"
																			class="form-control tip-focus"
																			title="Please Enter Owner Name">
																	</div>


																	<div class="form-group col-md-3">
																		<label for="inputEmail6">Qualification<b
																			style="color: red;">*</b></label> <input type="text"
																			id='txtQualification' name='drugQualification'
																			placeholder="Pathologist Qualification"
																			style="width: 100%;" class="form-control tip-focus"
																			title="Please Enter Pathologist Qualification">
																	</div>
																	<div class="form-group col-md-3">
																		<label for="inputEmail6">Designation<b
																			style="color: red;">*</b></label> <input type="text"
																			id='txtDesignation' placeholder="Designation"
																			style="width: 100%;" class="form-control tip-focus"
																			title="Please enter Designation Number">
																	</div>
																	<div class="form-group col-md-3">
																		<div style='width: 100%; padding-top: 5%;'>
																			<div style='width: 32%; font-size: 15px;'>Upload
																				Logo</div>
																			<div style='width: 40%;'>

																				<img src="images/upload-icon.png" width="200px"
																					height="100px" name="patImg" id="patImg1"
																					title="Upload The Logo Of Pathology"
																					style="margin-top: 10px; margin-bottom: 10px;" />
																			</div>
																			<div class="form-group col-md-3 ">
																				<label for="inputEmail4"></label>
																				<form id="PathLogo" name="PathologyLogo">
																					<input class="form-control tip-focus"
																						id="PathologyLogo" name="PathologyLogo"
																						type="file" onchange="uploadPathologyLogo()"
																						placeholder="File Name" style='width: 170px;'>
																					<div id="PathologyLogodis"
																						style="font-weight: bold; color: green; width: 170px;"></div>
																				</form>
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
										<!-- /Pathology Information End -->

									</div>
								</div>
							</div>

							<!-- /NEW ORDERS -->
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
			<%@include file="footer_nobel.jsp"%>
		</section>
		<!--/PAGE -->

		<!-- JAVASCRIPTS -->

		<!-- CUSTOM SCRIPT -->
		<%@include file="inv_footer.jsp"%>
		<script>
			jQuery(document).ready(function() {
				App.setPage("wizards_validations"); //Set current page 
				App.init(); //Initialise plugins and elements  
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});

				toggleEntryDiv('divForEntry');
				getFetchHospitalInfo();
				getFetchSaveHospitalDepartment();
				getSpecializationInfo();
				getAllStateList();
				getAllUnitForHospitalInfo();
				checkboxForMedicalInformation();
				checkboxForNabhLogo();
			});
		</script>
		<input type="hidden" id="departmentId" value="" />
		<input type="hidden" id="hiddenHosId" value="" />
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<!-- <input type="hidden" id="currencyId" value="0" /> -->
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>