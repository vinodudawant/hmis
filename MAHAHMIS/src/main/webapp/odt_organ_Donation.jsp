<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@page import="java.util.Calendar"%>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Organ Donor Registration</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<%@include file="inv_header.jsp"%>
<!-- TYPEHEAD -->
<script type="text/javascript"
	src="ehat-design/js/typeahead/typeahead.min.js"></script>

<!-- TYPEAHEAD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/typeahead/typeahead.css" />

<!-- CUSTOM SCRIPT -->
<script src="ehat-design/js/script.js"></script>
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>


<!-- JQUERY files import start -->

<!-- css for developer -->
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->	

<!-- include js for development -->
	<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
	<!-- JQUERY -->
	<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
	<!-- JQUERY UI-->
	<script src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
	<!-- BOOTSTRAP -->
	<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
	
	<!-- bootstrap datepicker -->
	<script src="ehat-design/datepicker/bootstrap-datepicker.js"></script>
		
	<!-- JQUERY UI-->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/themes/default.css" id="skin-switcher" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/responsive.css" >
	<link href="ehat-design/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<!-- DATE RANGE PICKER -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
	<!-- SELECT2 -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
	<!-- TYPEAHEAD -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/typeahead/typeahead.css" />
	<!-- UNIFORM -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/uniform/css/uniform.default.min.css" />
	<!-- DATA TABLES -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />
	<!-- FULL CALENDAR -->
<script type="text/javascript" src="js/fullcalendar/fullcalendar.min.js"></script>
<link type="text/css" rel="stylesheet"	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"	media="screen"></link>
<!-- FULL CALENDAR -->
<script type="text/javascript"	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>


<!-- JQUERY files import END -->

<!-- include js for development -->
<script type="text/javascript" src="js/users.js"></script>
<script type="text/javascript" src="js/organ_donor.js"></script>
<script type="text/javascript" src="js/organ_donor_intend_master.js"></script>
<script type="text/javascript" src="js/organ_body_size.js"></script>



<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd-MM-yyyy");
	String todays_date = formatter.format(currentDate.getTime());
	java.text.SimpleDateFormat formatter1 = new java.text.SimpleDateFormat(
			"dd/MM/yyyy");
	String todays_date1 = formatter1.format(currentDate.getTime());
%>
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

			<%@include file="odt_left_menu.jsp"%>

			<!-- /SIDEBAR -->
			<div id="main-content">
				<!-- /SAMPLE BOX CONFIGURATION MODAL FORM-->
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
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="odt_organ_Donation.jsp">Organ Donor Registration</a></li>
										</ul>
										<!-- /BREADCRUMBS -->
										<div class="clearfix"></div>
									</div>
								</div>
							</div>
							
							<!-- for search and new registration START -->
							
							<div class="row">
								<div class="col-md-12">
									<div class="col-md-4">
									</div>
									<button class="btn btn-xs btn-info pull-right" style="float: right;" type="button" id="expandDonor" onclick="toggleRegDiv()">
										<i class="fa fa-plus"></i> Expand
									</button>
								</div>
							</div>
							
							<!-- for search and new registration END -->

							<div class="row">
								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<ul class="nav nav-tabs" >
										<li class="active"><a data-toggle="tab"
											href="#menuNewDonor" id="menuNewDonoTab"
											onclick="getAllDonorsList(),setCallFrom('New');"><span
												class="hidden-inline-mobile">New Organ Donor</span></a></li>
										<li><a data-toggle="tab" href="#menuExistingDonor"
											id="menuExistingDonorTab"
											onclick="getAllDonorsTreatmentList(),setCallFrom('Exit');"><span
												class="hidden-inline-mobile">Existing Organ Donor</span></a></li>
									</ul>
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="header-form-details">
												<div class="donor-menu-seln" style="display: none">
													<label><input type="radio" name="donor_menu" id="donor_menu_new" value="new" onclick="toggleRegDiv()"> New donor </label>
													<label><input type="radio" name="donor_menu" id="donor_menu_existing" value="existing" onclick="showPatSearchDiv()"> Existing donor </label>
												</div>
												<!--  <div class="col-md-6 header-search-donor" id="header_search_donor" style="display: none"> -->
												 <div class="col-md-6 header-search-donor" id="header_search_donor" >
												 <div class="col-md-12">
												 	<div class="col-sm-3">
																<label for="inlineFold" class="control-label">Select Search By</label>
															</div>
															<div class="col-sm-3">
																<select name="doctor_name" class="form-control" id="searchType" onchange="refreshDonarName()">
																	<option value="0">--Select--</option>
																 	<option value="1">Donor Id</option>
																 	<option value="2">Donor Name</option>  
																</select>
															</div>
															<div class="col-md-6">
																<div class="input-group" id="odt_Doc_name">
																	<input class="form-control typeahead"
																		title="Please enter donor id" id="donorSearchId"
																		title="Please enter donor Name" id="donorSearchName"
																		type="text" placeholder="donor" autocomplete="off"
																		onkeyup="donorsAutoSuggestion(this.id)"> <span
																		class="input-group-btn">
																		<button class="btn btn-primary" onclick="donorsSearchById();"
																			style="height: 25px; margin-bottom: 10px" type="button">
																			<span class="fa fa-search" aria-hidden="true"> </span>
																			Search
																		</button>
																	</span>
																</div>
															</div>
															
													</div>
													
													
													
												</div>
												
 											<div class="row">
												<div class="col-sm-1">
														<label for="inlineFold" class="control-label">From</label>
													</div>
												
													<div class="col-sm-1">
														<input id="fromDate" class="form-control input-SmallText pull-right"
															type="text"
															onclick="displayCalendar(document.getElementById('fromDate'),'dd/mm/yyyy',this)"
															readonly="readonly" name="date" placeholder="Date"
															value="<%=todays_date1%>" style="margin-left: -162px;">
													</div>
													
												
												
												<div class="col-sm-1">
														<label for="inlineFold" class="control-label">To</label>
													</div>
												
												
													<div class="col-sm-1">
														<input id="lastDate" class="form-control input-SmallText pull-right"
															type="text"
															onclick="displayCalendar(document.getElementById('lastDate'),'dd/mm/yyyy',this)"
															readonly="readonly" name="date" placeholder="Date"
															value="<%=todays_date1%>" style="margin-left: -162px;">
													</div>
													
													
													<div class="col-sm-1">
														<input type="button" onclick="showOrganPatientDeatils();"	class="btn btn-primary" value="Show">
													</div>
												
												
												</div>
												
												

												<div class="clearfix"></div>
											</div>	
											<div class="tab-content">
												<!-- ============================================================================== -->
												<!-- START:Donor Registration -->
												<!-- ============================================================================== -->
												<div class="tab-pane fade in active">
													<div class="row">

														<div class="col-md-12" id="divForNewDonorReg" style="display:none">

															<div class="panel panel-primary">
																<div class="panel-heading">Organ Donor
																	Registration</div>
																<div class="panel-body">
																	
																	 
																		<div class="row" style="padding: 0 0 30px">
																		
																			<div class="col-md-12">

																			<div style="" class="col-md-2">
																				<label class="TextFont"
																					style="margin-left: 0%; font-size: 11px;">Search
																					By:</label>
																			</div>


																			<div class="col-md-2"
																				style="margin-left: -11%;"
																				id="divbyName">

																				<select id="patSearchType"
																					class="form-control input-SmallText"
																					onchange="setPatientSearchType()">
																					<option value="1">UHID</option>
																					<option value="2">Patient Name</option>
																					<option value="3">Patient Mobile</option>
																				</select>

																			</div>

																			<div class="col-md-3" id="divbyName">
																				<!-- <input name="byName" type="text" id="byName" -->
																				<input name="byName" type="text" id="byName"
																					class="form-control input-SmallText" autocomplete="off"
																					onkeyup="setAutoPatientNameOrganDonor(this.id,'reg')"
																					placeholder="UHID,Name,Mobileno" />
																			</div>
																			
																			<div class="col-md-3">
																				<div class="form-group">
																				
																						<select id='year-dropdown' class="form-control input-SmallText"></select>
																						
																				</div>
																			</div>

																			<!-- get patient above -->
																		 
																			
																			<div class="col-md-4">
																			<div class="buttons " id="treatmentDiv" style="display: none">
																					<button type="submit" class="btn btn-primary "
																						style="float: right;margin-right: 9px;" onclick="saveDonarTreatment()">
																						<i class="fa fa-save"></i> Save Treatment
																					</button>
																				</div>
																			
																				<div class="buttons" id="saveDiv">
																					<button type="submit" class="btn btn-success "
																						style="float: right;margin-right: 30px;" onclick="saveOrgan()">
																						<i class="fa fa-save"></i> Save
																					</button>
																				</div>
																				
																				
																				
																			</div>
																			
																			
																			
																			</div>
																		</div>

																		<div class="row" style="padding: 0 0 10px">
																			<div class="col-md-2">
																				<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																					Intend to Donate
																				</label>
																			</div>
																			<div class="col-md-3">
																				<div class="row">
																					<div class="col-md-12">
																						<div class="form-group">
																							<label> <input type="radio"
																								id="radioIntendNow" name="radioDonate" value="N"> Now
																							</label>
																						</div>
																					</div>

																					<div class="col-md-12">
																						<div class="form-group">
																							<label> <input type="radio"
																								id="radioIntendAfterDeath" name="radioDonate" value="A"> After Death
																							</label>
																						</div>
																					</div>
																				</div>
																			</div>

																			<div class="col-md-4">
																				<div class="col-md-4">
																					<label> 
																						<span class="required-field"><b
																				style="color: red;">*</b></span>
																							Donor Type
																					</label>
																				</div>

																				<div class="col-md-6">
																					<select class="form-control input-SmallText" name="DonorType" id="donorType">
																						<option value="0">- Select Donor Type -</option>
																					</select>
																				</div>
																			</div>

																		</div>

																		<div class="row">
																			<div class="col-md-2">
																				<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																					Donor Name
																				</label>
																			</div>
																			<div class="col-md-3">
																				<div class="form-group">
																					<select class="form-control input-SmallText" id="prefix" name="user_title"  readonly="readonly">
																						<option value=""> -Select Title- </option>
																						<option value="Mr">Mr</option>
																						<option value="Mrs">Mrs</option>
																					</select>
																				</div>
																			</div>
																			<div class="col-md-3">
																				<div class="form-group">
																					<input type="text" id="firstName" name="first_name"
																						class="form-control" placeholder="First name" readonly="readonly">
																				</div>
																			</div>
																			<div class="col-md-3">
																				<div class="form-group">
																					<input type="text" id="middleName" name="middle_name"
																						class="form-control" placeholder="Middle name" readonly="readonly">
																				</div>
																			</div>
																			<div class="col-md-3">
																				<div class="form-group">
																					<input type="text" id="lastName" name="last_name"
																						class="form-control" placeholder="Last name" readonly="readonly">
																				</div>
																			</div>
																		</div>

																		<div class="row">
																			<div class="col-md-2">
																				<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																					Birth Date
																				</label>
																			</div>
																			<div class="col-md-3">
																				<div class="form-group">
																					<!-- <input type="date" id="birthDate" name="birth_Date"
																						class="form-control"> -->
																						
																						<input type="text" name="birth_Date" class="form-control" id="birthDate" readonly="readonly">

																							<!-- <div class="input-group-addon">
																								<i class="fa fa-calendar"></i>
																							</div> -->
																				</div>
																			</div>
																			<div class="col-md-2">
																				<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																					Age
																				</label>
																			</div>
																			<div class="col-md-3">
																				<div class="form-group">
																					<input type="text" onkeypress="return validateNumOnly(event)" id="age" name="age" class="form-control"
																						placeholder="Age" readonly="readonly">
																				</div>
																			</div>
																		</div>
																		<div class="row">
																			<div class="col-md-2">
																				<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																					Address
																				</label>
																			</div>
																			<div class="col-md-3">
																				<div class="form-group">
																					<input type="text" id="address" name="address"
																						class="form-control" placeholder="Address">
																				</div>
																			</div>
																			<div class="col-md-3">
																				<div class="form-group">
																					<select class="form-control input-SmallText" id="city" name="city">
																						<option value="">- Select city -</option>
																					</select>
																				</div>
																			</div>
																			<div class="col-md-3">
																				<div class="form-group">
																					<select class="form-control input-SmallText" id="district" name="district">
																						<option value="">- Select district -</option>
																					</select>
																				</div>
																			</div>
																			<div class="col-md-3">
																				<div class="form-group">
																					<select class="form-control input-SmallText" id="state" name="state">
																						<option value="">- Select state -</option>
																					</select>
																				</div>
																			</div>
																		</div>

																		<div class="row">
																			<div class="col-md-2">
																				<label> <span class="required-field"></span>
																					Occupation
																				</label>
																			</div>
																			<div class="col-md-3">
																				<div class="form-group">
																					<input type="text" id="occupation" name="occupation"
																						class="form-control" placeholder="occupation">
																				</div>
																			</div>
																		</div>

																		<div class="row">
																			<div class="col-md-2">
																				<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																					Contact number
																				</label>
																			</div>
																			<div class="col-md-3">
																				<div class="form-group">
																					<input type="text" id="contactNo1" onkeypress="return validateNumOnly(event)" name="contact1"
																						class="form-control"
																						placeholder="Contact number 1" maxlength="10">
																				</div>
																			</div>
																			<div class="col-md-3">
																				<div class="form-group">
																					<input type="text" id = "contactNo2" onkeypress="return validateNumOnly(event)" name="contact2"
																						class="form-control"
																						placeholder="Contact number 2" maxlength="10">
																				</div>
																			</div>
																		</div>
																		<div class="row" style="padding: 10px 0;">
																			<div class="col-md-2">
																				<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																					gender
																				</label>
																			</div>
																			<div class="col-md-1">
																				<div class="form-group">
																					<label><input type="radio" id="maleG" name="gender"
																						value="M"> Male</label>
																				</div>
																			</div>
																			<div class="col-md-1">
																				<div class="form-group">
																					<label><input type="radio" id="femaleG" name="gender"
																						value="F"> Female</label>
																				</div>
																			</div>
																			<div class="col-md-1">
																				<div class="form-group">
																					<label><input type="radio" id="otherG" name="gender"
																						value="O"> Other</label>
																				</div>
																			</div>
																		</div>

																		<div class="row">
																			<div class="col-md-2">
																				<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																					Blood group
																				</label>
																			</div>
																			<div class="col-md-3">
																				<div class="form-group">
																					<select class="form-control input-SmallText" id="bloodGroupId" name="blood_group">
																						<option value="">- Select blood group -</option>
																					</select>
																				</div>
																			</div>
																			<div class="col-md-2">
																				<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																					Body Size
																				</label>
																			</div>
																			<div class="col-md-3">
																				<div class="form-group">
<!-- 																					<select class="form-control input-SmallText" name="body_size"> -->
<!-- 																						<option value="">- Select body size -</option> -->
<!-- 																					</select> -->

																						<div class="form-group">
																							<input id="bodySize" name="Body Size" class="form-control" 
																							 "placeholder="Body Size">
																						</div>
																						
																				</div>
																			</div>
																		</div>

																		<div class="row">
																			<div class="col-md-2">
																				<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																					Body Type
																				</label>
																			</div>
																			<div class="col-md-3">
																				<div class="form-group">
																					<select id='body_type' class="input-SmallText" name="body_type">
																						<option value="">- Select body type -</option>
																					</select>
																				</div>
																			</div>
																		</div>

																		<div class="row">
																			<div class="col-md-2">
																				<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																					Identity Card
																				</label>
																			</div>
																			<div class="col-md-3">
																				<div class="form-group">
																					<select class="form-control input-SmallText" name="identity_card" id="proofId"  onchange="setLength()">
																						<option value="0">Select Id Proof</option>
																						<option value="1">Aadhaar card</option>
																						<option value="2">Pan card</option>
																						<option value="3">Passport</option>
																						<option value="4">License</option>
																						<option value="5">Other</option>
																					</select>
																				</div>
																			</div>
																			<div class="col-md-3">
																				<div class="form-group">
																					<input type="text" id="identityCard" name="Id Proof" class="form-control" placeholder="Id Proof" maxlength="0">
																				</div>
																			</div>
																		</div>

																		<div class="row" style="padding: 15px 0">
																			<div class="col-md-2">
																				<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																					Intend to Donate Organ
																				</label>
																			</div>
																			<div class="col-md-10">
																				<div class="row">
																				
																					<div class="col-md-3">
																						<div class="form-group">
																							<select class="input-SmallText" onchange="setOrganDonorInMultiSelect()" name="intendToDonateOrgans" id="intendToDonateOrganId">
																								<option value="0">- Select Organ To Donate -</option>
																								
																							</select>
																						</div>
																					</div>
																					<div class="col-md-4">
																						<div class="form-group">
																							<select multiple="multiple" name="select_organ_donor_name"
																								id="select_organ_donor_name_id" class="col-md-12  form-control">
																							</select>
																						</div>
																					</div>
																					
																					<!-- <div class="col-md-2">
																						<div class="form-group">
																							<label> <input type="checkbox"
																								name="intend_to_donate_organ[]"> Kidneys
																							</label>
																						</div>
																					</div>

																					<div class="col-md-2">
																						<div class="form-group">
																							<label> <input type="checkbox"
																								name="intend_to_donate_organ[]"> Eyes
																							</label>
																						</div>
																					</div> -->
																				</div>
																			</div>
																		</div>

																		<div class="row">
																			<div class="col-md-2">
																				<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																					Remarks
																				</label>
																			</div>
																			<div class="col-md-10">
																				<div class="form-group">
																					<textarea name="remarks" id="Remarks" class="form-control"
																						rows="7" placeholder="Remarks"></textarea>
																				</div>
																			</div>
																		</div>

																</div>
															</div>

														</div>
													</div>
													<!-- ============================================================================== -->
													<!-- END:Donor Registration -->
													<!-- ============================================================================== -->
												</div>
											</div>
											
											<div class="row">
												<!-- NEW ORDERS -->
												<div class="col-md-12">
													<div class="tab-content">
														<div class="tab-pane fade in active" id="menuNewDonor">
															<div class="panel panel-default">
																<div class="panel-body">
																	<div class="row">
																		<div class="col-md-12">
																			<div class="tabbable header-tabs">
																				<div class="row" style="margin-top: 10px">
																					<div class="col-md-12">
																						<div class="col-sm-12">
																							<div class="pull-right">
																								<div id="datatable1_filter"
																									class="dataTables_filter">
																									<label id="searchlabel"> </label>
																								</div>
																							</div>
																						</div>
																						<div class="panel panel-primary"
																							style="margin-top: 20px">
																							<div class="panel-heading" id="divEhatContent">New Organ Donor List</div>
																							<div class="panel-body"
																								style="overflow: auto; height: 300px">
																								<table id="ehatTable" cellpadding="0" cellspacing="0"
																									border="0"
																									class="datatable table table-striped table-bordered">
																									<thead id="ehatTHead">
																										<tr>
																											<th class="col-md-1 center">#</th>
																											<th class="col-md-1 center">Donor ID</th>
																											<th class="col-md-1 center">Donor Name</th>
																											<th class="col-md-1 center">Donor Type</th>
																											<th class="col-md-1 center">Organ Name</th>
																											<th class="col-md-1 center">Register Date</th>
																											<th class="col-md-1 center">Edit</th>
																											<th class="col-md-1 center">Delete</th>
																										</tr>
																									</thead>
							
																									<tbody id="organDonorsListDetails">
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
														<div class="tab-pane fade" id="menuExistingDonor">
															<div class="panel panel-default">
																<div class="panel-body">
																	<div class="row">
																		<div class="col-md-12">
																			<div class="tabbable header-tabs">
																				<div class="row" style="margin-top: 10px">
																					<div class="col-md-12">
																						<div class="col-sm-12">
																							<div class="pull-right">
																								<div id="datatable1_filter"
																									class="dataTables_filter">
																									<label id="searchlabel"> </label>
																								</div>
																							</div>
																						</div>
																						<div class="panel panel-primary"
																							style="margin-top: 20px">
																							<div class="panel-heading" id="divEhatContent">Existing Organ Donor List</div>
																							<div class="panel-body"
																								style="overflow: auto; height: 300px">
																								<table id="ehatTable" cellpadding="0" cellspacing="0"
																									border="0"
																									class="datatable table table-striped table-bordered">
																									<thead id="ehatTHead">
																										<tr>
																											<th class="col-md-1 center">#</th>
																											<th class="col-md-1 center">Treatment ID</th>
																											<th class="col-md-1 center">Donor ID</th>
																											<th class="col-md-1 center">Donor Name</th>
																											<th class="col-md-1 center">Edit</th>
																											<th class="col-md-1 center">Delete</th>
																											<th class="col-md-1 center">Checkup List</th>
																										</tr>
																									</thead>
							
																									<tbody id="organDonorsTreatmentListDetails">
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
														
													</div>
												</div>
											</div>
											<!-- DONOR LIST END -->
											
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
			</div>
			<!-- <div id="pleaseWait" style="text-align: center; display: none;">
				<img style="margin-top: 250px;" height="43px"
					src="images/loading_black.gif" />
				<div style="margin-top: 10px; color: white">
					<b>Please wait...</b>
				</div>
			</div> -->
			<%@include file="footer_nobel.jsp"%>
		</section>
		<!--/PAGE -->

		<!-- JAVASCRIPTS -->
		<%@include file="inv_footer.jsp"%>

		<script>
		
			<!-- following added by aniket, 30 NOV 21 -->
			jQuery(document).ready(function() {
				App.setPage("wizards_validations"); //Set current page 
				App.init(); //Initialise plugins and elements  
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});
				
				
				// get all name prefixes
				getAllTitle();
				 
				getAllIntendedOrgansToDonate();
				getAllDonorTypeList();
			getAllBodyType();
			getAllBodySize();
				
				
				// get address lines
				getCityList();
				getDistrictList();
				getStateList();
				//getAllBodySize();
				// get blood groups
				getBloodGroupList();
				
				//get All Donors List
				getAllDonorsList();
				//this all donor treatment list
				getAllDonorsTreatmentList();
			//	$('#bodySize').select2();  
			//	$('#bodySize').focus();  
				
			});

			$(document).ready(function() {
				$('#collection_menu').click(function() {
					$('#outdoor_details').hide();
				})
			})

			$(document).ready(function() {
				$('#collection_menu1').click(function() {
					$('#outdoor_details').show();
				})
			})

			 $(document).ready(function() {
				$('#donor_menu_existing').click(function() {
					$('#header_search_donor').show();
					$('#existing_donor').show();
				})
			}) 

			$(document).ready(function() {
				$('#donor_menu_new').click(function() {
					//$('#header_search_donor').hide();
					//$('#existing_donor').hide();
					clearDonorForm();
					
				})
			})
			
			
		</script>
		
		<!-- aniket,DOB picker, 9 12 21 -->
		<script type="text/javascript">
			//Date picker
			$('#birthDate').datepicker({
				autoclose : true
			});
		
		</script>
		
		<!-- aniket, for Year picker, 9 12 21 -->
		<script type="text/javascript">
			let dateDropdown = document.getElementById('year-dropdown');

			let ctYear = new Date().getFullYear();
			let earliestYear = 1970;

			while (ctYear >= earliestYear) {
				let dateOption = document.createElement('option');
				dateOption.text = ctYear;
				dateOption.value = ctYear;
				dateDropdown.add(dateOption);
				ctYear -= 1;
			}
			
		/* 	var yr = $('#year-dropdown').val();
			alert(yr); */
		</script>

		<!--  -->
		

		<input type="hidden" value="111" id="userID" />
		<input type="hidden" value="0" id="doctorId" />
		<div id="userDetails" style="display: none;"></div>
		<input type="hidden" value="0" id="usernameValidation" />
		<input id="synchronizeToken" type="hidden"
			value="cbdcb840-12c9-4582-9c0f-abb5511603b3">
		<input type="hidden" value="0" id="userIdForUpdate" />
		<input type="hidden" value="0" id="doctorIdForUpdate" />
		
		<input type="hidden" value="0" id="donorRegId" />
		<input type="hidden" value="0" id="treatmentId" />
		
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
	
		<input type="hidden" value="0" id="patientId" />
		
		<input type="hidden" value="New" id="callFrom" />

		<!-- /JAVASCRIPTS -->

	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>