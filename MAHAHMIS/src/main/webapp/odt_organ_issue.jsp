<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Organ Issue</title>
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


<!-- JQUERY files import END -->

<!-- include js for development -->
<script type="text/javascript" src="js/users.js"></script>
<script type="text/javascript" src="js/organ_donor.js"></script>
<script type="text/javascript" src="js/organ_donor_intend_master.js"></script>
<script type="text/javascript" src="js/organ_cross_match.js"></script>
<script type="text/javascript" src="js/organ_issue.js"></script>




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
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><a href="odt_organ_issue.jsp">Organ Issue</a></li>
										</ul>

										<!-- /BREADCRUMBS -->
										<div class="clearfix"></div>
									</div>
								</div>
							</div>
							<!--this is commented by Vishnu  -->
							<!-- <div class="function-buttons" style="float: right;">
								<div class="buttons">
									<button type="submit" class="btn btn-success">
										<i class="fa fa-save"></i> Save
									</button>
									<button type="button" class="btn btn-danger">Cancel</button>
								</div>
							</div> -->

							<!-- for search and new registration START -->

							<div class="row">

								<div class="col-md-12">
									<div class="col-sm-1">
										<label for="inlineFold" class="control-label">Select
											Search By</label>
									</div>
									<div class="col-sm-1">
										<select name="doctor_name" class="form-control"
											id="searchType">
											<option value="0">--Select--</option>
											<option value="1">Organ Issue Id</option>
											<option value="2">Rquester Id</option>
										</select>
									</div>
									<div class="col-md-3">
										<div class="input-group" id="organRquestDiv">
											<!-- <input class="form-control typeahead"
												title="Please enter organ requester id" id="requestSearchId"
												type="text" placeholder="requester by id or patient id"
												onkeyup="organCrossMatchAutoSuggestion(this.id)"> <span
												class="input-group-btn"> -->
											<input class="form-control typeahead"
												title="Please enter organ requester id" id="requestSearchId"
												type="text" placeholder="Organ Issue Id or Requester By Id"
												onkeyup="organIssueAutoSuggestion(this.id)"> <span
												class="input-group-btn">
												<button class="btn btn-primary"
													onclick="organRequestSearchById();"
													style="height: 25px; margin-bottom: 10px" type="button">
													<span class="fa fa-search" aria-hidden="true"> </span>
													Search
												</button>
											</span>
										</div>
									</div>
									<div class="col-md-1">
										<button class="btn btn-xs btn-info pull-left" type="button"
											onclick="toggleRegDiv()">
											<i class="fa fa-plus"></i>New Organ Issue
										</button>
									</div>
									
									<div class="col-sm-1">
										<label for="inlineFold" class="control-label" style="margin-left: 90px;">From</label>
									</div>

									<div class="col-sm-2">
										<input id="fromDate"
											class="form-control input-SmallText pull-right" type="text"
											onclick="displayCalendar(document.getElementById('fromDate'),'dd/mm/yyyy',this)"
											readonly="readonly" name="date" placeholder="Date"
											value="<%=todays_date1%>" style="margin-left: -162px;width: 99px;margin-right: -7px;">
									</div>

									<div class="col-sm-1">
										<label for="inlineFold" class="control-label" >To</label>
									</div>

									<div class="col-sm-2">
										<input id="lastDate"
											class="form-control input-SmallText pull-right" type="text"
											onclick="displayCalendar(document.getElementById('lastDate'),'dd/mm/yyyy',this)"
											readonly="readonly" name="date" placeholder="Date"
											value="<%=todays_date1%>" style="margin-left: -162px;width: 100px;margin-right: 100px;">
									</div>

									<div class="col-sm-1 pull-right">
										<input type="button" onclick="getAllOrganIssueList()"
											class="btn btn-primary" value="Show" style="margin-top: -37px;margin-left: -60px;">
									</div>
									
									
								</div>
							</div>

							<!-- for search and new registration END -->

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">

											<div class="tab-content">
												<!-- ============================================================================== -->
												<!-- START:Donor Registration -->
												<!-- ============================================================================== -->
												<div id="menu" class="tab-pane fade in active">
													<div class="row">

														<div class="col-md-12" id="divForNewDonorReg"
															style="display:none;">

															<div class="panel panel-primary">
																<div class="panel-heading">Organ Issue</div>
																<div class="panel-body">
																	<div class="row">
																		<div style="" class="col-md-3">
																			<label class="TextFont"
																				style="margin-left: 0%; font-size: 11px;">Search
																				By:</label>
																		</div>

																		<div class="col-md-4" id="organRquestDiv">
																			<input name="byName" type="text" id="byName"
																				class="form-control input-SmallText"
																				autocomplete="off"
																				onkeyup="organRequestAutoSuggestionOrgnIssue(this.id,'reg')"
																				placeholder="Requester Id" />
																		</div>
																		<div style="" class="col-md-3">
																			<div class="buttons">
																				<button type="submit" class="btn btn-success "
																					style="float: right;" onclick="saveOrganIssue()">
																					<i class="fa fa-save"></i> Save
																				</button>
																			</div>
																		</div>

																	</div>

																	<form id="documentForm" name="documentForm"
																		enctype="multipart/form-data" method="POST">

																		<div class="row">
																			<div class="col-md-12">
																				<div class="tabbable header-tabs">
																					<div class="row" style="margin-top: 10px">
																						<div class="col-md-12">
																							<div class="panel panel-primary">

																								<div class="panel-body" height:="" 300px"="">
																									<div class="row">
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																												Patient Name
																											</label>
																										</div>
																										<div class="col-md-3">
																											<div class="form-group">
																												<select class="form-control input-SmallText"
																													id="oragn_issue_title"
																													name="oragn_request_title">
																												</select>
																											</div>
																										</div>
																										<div class="col-md-3">
																											<div class="form-group">
																												<input type="text" id="firstName"
																													name="first_name" class="form-control"
																													placeholder=" Patient First name">
																											</div>
																										</div>
																										<div class="col-md-3">
																											<div class="form-group">
																												<input type="text" id="middleName"
																													name="middle_name" class="form-control"
																													placeholder=" Patient Middle name">
																											</div>
																										</div>
																										<div class="col-md-3">
																											<div class="form-group">
																												<input type="text" id="lastName"
																													name="last_name" class="form-control"
																													placeholder=" Patient Last name">
																											</div>
																										</div>
																									</div>
																									<div class="row">
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																												Contact Number
																											</label>
																										</div>

																										<div class="col-md-3">
																											<div class="form-group">
																												<input type="number" id="contact_number_1"
																													name="contact_number_1" onkeypress="return validateNumOnly(event)"
																													class="form-control" maxlength="10"
																													placeholder=" Contact Number 10 digit">
																											</div>
																										</div>
																										<div class="col-md-3">
																											<div class="form-group">
																												<input type="text" id="contact_number_2"
																													name="contact_number_2" maxlength="10"
																													class="form-control" onkeypress="return validateNumOnly(event)"
																													placeholder=" Contact Number 10 digit">
																											</div>
																										</div>

																									</div>
																									<div class="row">
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																												Age
																											</label>
																										</div>

																										<div class="col-md-3">
																											<div class="form-group">
																												<input type="number" id="age" name="age"
																													class="form-control" placeholder=" Age">
																											</div>
																										</div>

																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																												Gender
																											</label>
																										</div>
																										<div class="col-md-1">
																											<div class="form-group">
																												<label><input type="radio"
																													id="maleG" name="gender" value="M">
																													Male</label>
																											</div>
																										</div>
																										<div class="col-md-1">
																											<div class="form-group">
																												<label><input type="radio"
																													id="femaleG" name="gender" value="F">
																													Female</label>
																											</div>
																										</div>
																										<div class="col-md-1">
																											<div class="form-group">
																												<label><input type="radio"
																													id="otherG" name="gender" value="O">
																													Other</label>
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
																												<select class="form-control input-SmallText"
																													id="bloodGroupId" name="blood_group">
																													<option value="">- Select blood
																														group -</option>
																												</select>
																											</div>
																										</div>
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																												Hemoglobin
																											</label>
																										</div>
																										<div class="col-md-3">
																											<div class="form-group">
																												<div class="form-group">
																													<input type="text" id="hemoglobin"
																														name="hemoglobin" class="form-control"
																														placeholder="Hemoglobin">
																												</div>
																											</div>
																										</div>
																									</div>
																									<div class="row">
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																												Height
																											</label>
																										</div>
																										<div class="col-md-3">
																											<div class="form-group">
																												<input type="number" id="height" name="height"
																													class="form-control" placeholder="Height">
																											</div>
																										</div>
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																												Weight
																											</label>
																										</div>
																										<div class="col-md-3">
																											<div class="form-group">
																												<div class="form-group">
																													<input type="number" id="Weight"
																														name="Weight" class="form-control"
																														placeholder="Weight">
																												</div>
																											</div>
																										</div>
																									</div>
																									<div class="row">
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																												Ward Name
																											</label>
																										</div>
																										<div class="col-md-3">
																											<div class="form-group">
																												<input type="text" id="ward_name"
																													name="ward_name" class="form-control"
																													placeholder="Ward Name">
																											</div>
																										</div>
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																												Bed Number
																											</label>
																										</div>
																										<div class="col-md-3">
																											<div class="form-group">
																												<div class="form-group">
																													<input type="text" id="bed_number"
																														name="bed_number" class="form-control"
																														placeholder="Bed Number">
																												</div>
																											</div>
																										</div>
																									</div>
																									<div class="row">
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																												Organ Name
																											</label>
																										</div>

																										<div class="col-md-3">
																											<div class="form-group">
																												<select class="input-SmallText" style="width:100%" id="organ_name"
																													name="organ_name">
																													<option value="0">- Select Organ
																														Name -</option>
																												</select>
																											</div>
																										</div>
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																												Body Type
																											</label>
																										</div>
																										<div class="col-md-3">
																											<div class="form-group">
																												<select class="input-SmallText" style="width:100%"
																													id="organissue_body_type"
																													name="body_type">
																													<option value="0">--Select Body
																														Type--</option>
																												</select>
																											</div>
																										</div>
																									</div>
																									<div class="row">
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																												Size
																											</label>
																										</div>

																										<div class="col-md-3">
																											<div class="form-group">
																												<input id="body_size" type="text"
																													class="form-control" name="body_size">
																											</div>
																										</div>
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																												Priority
																											</label>
																										</div>
																										<div class="col-md-1">
																											<div class="form-group">
																												<label><input type="radio"
																													id="urgent_id" name="planned"
																													value="urgent"> Urgent</label>
																											</div>
																										</div>
																										<div class="col-md-1">
																											<div class="form-group">
																												<label><input type="radio"
																													id="planned_id" name="planned"
																													value="planned">Planned</label>
																											</div>
																										</div>
																									</div>
																										<div class="row">
																											<div class="col-md-4"></div>
																											<div class="col-md-4" style="align: center;">
																												<label><b>Corss Match Result</b></label>
																											</div>
																											<div class="col-md-4" style="align: center;"></div>
																											<hr></hr>
																										</div>
																										<div class="row" style="height:35px">
																											<div class="col-md-2">
																												<label> <span class="required-field"><b style="color: red;">*</b></span>
																													Select Container
																												</label>
																											</div>
																											<!-- <div class="col-md-3">
																												<div class="form-group">
																													 <select class="form-control input-SmallText"
																														onchange="getOrganCollectionById();"
																														id="container_id" name="container_id">
																														<option value="0">--Select
																															Container--</option>
																													</select> 
																													</div>
																											</div>
																											-->
																													
																															<div class="col-md-3">
																												<input type="text" class="form-control"
																													id="container_id" name="container_id" placeholder="container">
																											</div>
																										
																										<div class="col-md-2">
																												<label> <span class="required-field"><b style="color: red;">*</b></span>
																													Organ Name
																												</label>
																											</div>
																															<div class="col-md-3">
																												<input type="text" class="form-control"
																													id="organ_name_container" name="organ_name_container" placeholder="organName">
																											</div>
																										
																										
																												
																											<!-- <div class="col-md-2">
																												<label> <span class="required-field"><b style="color: red;">*</b></span>
																													Organ Name
																												</label>
																											</div>
																											<div class="col-md-3">
																												<input type="text" class="form-control"
																												id="organ_name_container" name="organ_name"
																												placeholder="Organ Name">
																												<select class="form-control input-SmallText"
																													id="organ_name_container"
																													name="organ_name_container">
																													<option value="0">--Select Organ
																														Name--</option>
																												</select>
																											</div>
																											
 -->																										</div>
																										<div class='row'>
																											<div class="col-md-2">
																												<label> <span class="required-field"><b style="color: red;">*</b></span>
																													Size
																												</label>
																											</div>
																											<div class="col-md-3">
																												<input type="text" class="form-control"
																													id="size_id" name="size" placeholder="Size">
																											</div>
																											<div class="col-md-2">
																												<label> <span class="required-field"><b style="color: red;">*</b></span>
																													Blood Group
																												</label>
																											</div>
																											<div class="col-md-3">
																												<div class="form-group">
																													<select class="form-control input-SmallText"
																														id="blood_group_container"
																														name="blood_group">
																														<option value="">- Select Blood
																															group -</option>
																													</select>
																												</div>
																											</div>
																										</div>
																										<div class="row">
																											<div class="col-md-2">
																												<label> <span class="required-field"><b style="color: red;">*</b></span>
																													Cold Ischemia Time
																												</label>
																											</div>

																											<div class="col-md-3">
																												<div class="form-group">
																													<!-- <input type="text" class="form-control"
																													name="Cold Ischemia Time"
																													id="cold_ischemia_time"
																													placeholder="Cold Ischemia Time	"> -->
																													<select class="input-SmallText" style="width:100%"
																														id="cold_ischemia_time"
																														name="cold_ischemia_time">
																														<option value="0">--Select Clod
																															Ischemia Time--</option>
																													</select>
																												</div>
																											</div>
																											<div class="col-md-2">
																												<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																													Expiry Date
																												</label>
																											</div>

																											<div class="col-md-3">
																												<div class="form-group">
																													<input type="date" class="form-control"
																														name="expriy_date" id="expriy_date"
																														placeholder="Expiry Date">
																												</div>
																											</div>
																										</div>

																										<div class="row">
																											<div class="col-md-2">
																												<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																													Available Quantity
																												</label>
																											</div>

																											<div class="col-md-3">
																												<div class="form-group">
																													<input type="text" class="form-control"
																														name="available_quantity"
																														id="available_qty" disabled
																														placeholder="Available Quantity">
																												</div>
																											</div>
																											<div class="col-md-2">
																												<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																													Required Quantity
																												</label>
																											</div>

																											<div class="col-md-3">
																												<div class="form-group">
																													<input type="text" class="form-control"
																														name="required_quantity"
																														onkeyup="validateQty()"
																														id="required_quantity"
																														placeholder="Required Quantity">
																												</div>
																											</div>
																										</div>
																										<div class="row" style="padding: 10px 0;">
																											<div class="col-md-2">
																												<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																													Cross Match Date and time
																												</label>
																											</div>

																											<div class="col-md-3">
																												<div class="form-group">
																													<input type="date"
																														id="cross_match_date_time"
																														name="date_time" class="form-control">
																												</div>
																											</div>
																											<div class="col-md-2">
																												<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																													Compatibility Type
																												</label>
																											</div>
																											<div class="col-md-3">
																												<div class="form-group">
																													<select class="form-control input-SmallText"
																														id="cross_match_compatible_type"
																														name="cross_match_compatible_type">
																														<option value="0">--Select
																															Compatibility Type--</option>
																														<option value="major">Major</option>
																														<option value="minor">Minor</option>
																													</select>
																												</div>
																											</div>
																										</div>
																										<div class="row" style="padding: 10px 0;">
																											<div class="col-md-2">
																												<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																													Cross Match Remarks
																												</label>
																											</div>
																											<div class="col-md-4">
																												<div class="form-group">
																													<textarea name="cross_match_remark"
																														id="cross_match_remark"
																														class="form-control" rows="4"
																														placeholder="Reason and remarks"
																														style="resize: none;"></textarea>
																												</div>
																											</div>
																											<div class="col-md-2">
																												<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																													Organ Issue
																												</label>
																											</div>
																											<div class="col-md-3">
																												<div class="form-group">
																													<input type="checkbox"
																														id="orgnaIssue"
																														name="organissue">
																												</div>
																											</div>
																										</div>
																										<div class="row">
																											<div class="col-md-2">
																												<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																													Issue Remarks
																												</label>
																											</div>
																											<div class="col-md-6">
																												<div class="form-group">
																													<textarea name="issue_remark"
																														id="issue_remark"
																														class="form-control" rows="4"
																														placeholder="Reason and remarks"
																														style="resize: none;"></textarea>
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
																		</br>
																	</form>

																</div>
															</div>

														</div>
													</div>
													<!-- ============================================================================== -->
													<!-- END:Donor Registration -->
													<!-- ============================================================================== -->
												</div>
											</div>
											<!-- Donor List STARt -->
											<div class="col-md-12">
												<div class="tabbable header-tabs">
													<div class="row" style="margin-top: 10px">
														<div class="col-md-12">
															<div class="col-sm-12">
																<div class="pull-right">
																	<div id="datatable1_filter" class="dataTables_filter">
																		<label id="searchlabel"> </label>
																	</div>
																</div>
															</div>
															<div class="panel panel-primary" style="margin-top: 20px">
																<div class="panel-heading" id="divEhatContent">Organ
																	Request List</div>
																<div class="panel-body"
																	style="overflow: auto; height: 300px">
																	<table id="ehatTable" cellpadding="0" cellspacing="0"
																		border="0"
																		class="datatable table table-striped table-bordered">
																		<thead id="ehatTHead">
																			<tr>
																				<th class="col-md-1 center">#</th>
																				<th class="col-md-1 center">Issue ID</th>
																				<th class="col-md-1 center">Requester Name</th>
																				<th class="col-md-1 center">Donor Name</th>
																				<th class="col-md-1 center">Organ Name</th>
																				<th class="col-md-1 center">Blood Group</th>
																				<th class="col-md-1 center">Cross Match Date</th>
																				<th class="col-md-1 center">Compatibility Type</th>
																				<th class="col-md-1 center">Container No</th>
																				<th class="col-md-1 center">Edit</th>
																				<th class="col-md-1 center">Delete</th>
																			</tr>
																		</thead>

																		<tbody id="organIssueDetails">
																		</tbody>
																	</table>
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
				getAllDoctors();
				getAllIntendedOrgansToDonate();
				getAllBodyType();
				getAllClodIschemiaTime();
				// get blood groups
				getBloodGroupList();
				//get All Organ Request List
				getAllOrganIssueList();
				///getContainerList();
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
		</script>

		<input type="hidden" value="111" id="userID" />
		<input type="hidden" value="0" id="doctorId" />
		<div id="userDetails" style="display: none;"></div>
		<input type="hidden" value="0" id="usernameValidation" />
		<input id="synchronizeToken" type="hidden"
			value="cbdcb840-12c9-4582-9c0f-abb5511603b3">
		<input type="hidden" value="0" id="userIdForUpdate" />
		<input type="hidden" value="0" id="doctorIdForUpdate" />

		<input type="hidden" value="0" id="issueCrossMatchId" />
		<input type="hidden" value="0" id="issueRequestId" />
		<input type="hidden" value="0" id="issueStockInwardId" />
		<input type="hidden" value="0" id="issueId" />

		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">

		<!-- /JAVASCRIPTS -->

	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>