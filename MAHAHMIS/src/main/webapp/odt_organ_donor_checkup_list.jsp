<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Organ Donor Checkup List</title>
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
	
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />

<!-- CUSTOM SCRIPT -->
<script src="ehat-design/js/script.js"></script>
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>
<script type="text/javascript"
		src="ehat-design/js/select2/select2.min.js"></script>

<!-- include js for development -->
<script type="text/javascript" src="js/users.js"></script>
<script type="text/javascript" src="js/organ_donor.js"></script>

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
											<li><i class="fa fa-home"></i> <a
												href="odt_organ_donor_checkup_list.jsp">Organ Donor
													Checkup List</a></li>
										</ul>

										<!-- /BREADCRUMBS -->
										<div class="clearfix"></div>
									</div>
								</div>
							</div>

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">

											<!-- <div class="header-bag-search">
												<div class="col-md-4 header-search-bag-no"
													id="header_search_donor">
													<div class="form-group">
														<input type="text" class="form-control"
															name="search_donor" placeholder="Search Donor">
													</div>
												</div>

												<div class="clearfix"></div>
											</div> -->

											<div class="row">

												<div class="col-md-12">
													<div class="col-sm-1">
														<label for="inlineFold" class="control-label">Select Search By</label>
													</div>
													<div class="col-sm-1">
														<select name="doctor_name" class="form-control" id="searchType" onchange="setCheckupListSearchType()">
															<option value="0">--Select--</option>
														 	<option value="1">Donor Id</option>
														 	<option value="2">CheckupListId</option>  
														</select>
													</div>
													<div class="col-md-3">
														<div class="input-group" id="documentByName">
															<input class="form-control typeahead"
																title="Please enter donor checkuplist" id="searchId"
																type="text" placeholder="donor checkuplist"
																onkeyup="organDonorCheckupListAutoSuggestion(this.id)"> <span
																class="input-group-btn">
																<button class="btn btn-primary" onclick="donorCheckupListSearchById();"
																	style="height: 25px; margin-bottom: 10px" type="button">
																	<span class="fa fa-search" aria-hidden="true"> </span>
																	Search
																</button>
															</span>
														</div>
													</div>
													<div class="col-md-1" style="display: none;">
														<button class="btn btn-xs btn-info pull-left"
															type="button"
															onclick="toggleEntryDivOrganDonorCheckuplist()">
															<i class="fa fa-plus"></i> Add Donor CheckupList
														</button>
													</div>
													
													
													<div class="col-sm-1">
														<label for="inlineFold" class="control-label">From</label>
													</div>
												
													<div class="col-sm-2">
														<input id="fromDate" class="form-control input-SmallText pull-right"
															type="text"
															onclick="displayCalendar(document.getElementById('fromDate'),'dd/mm/yyyy',this)"
															readonly="readonly" name="date" placeholder="Date"
															value="<%=todays_date1%>" style="margin-left: -162px;">
													</div>
													
												
												
												<div class="col-sm-1">
														<label for="inlineFold" class="control-label">To</label>
													</div>
												
												
													<div class="col-sm-2">
														<input id="lastDate" class="form-control input-SmallText pull-right"
															type="text"
															onclick="displayCalendar(document.getElementById('lastDate'),'dd/mm/yyyy',this)"
															readonly="readonly" name="date" placeholder="Date"
															value="<%=todays_date1%>" style="margin-left: -162px;">
													</div>
													
													
													<div class="col-sm-1">
														<input type="button" onclick="getAllDonorCheckupList();"	class="btn btn-primary" value="Show">
													</div>
												
													
													
													
												</div>
											</div>


											<!-- ============================================================================== -->
											<!-- START:checkup_list -->
											<!-- ============================================================================== -->

											<div class="row">
												<div class="col-md-12" id="divForEntryOrganDonorCheckuplist"
													style="display: none">
													<div class="panel panel-primary">
														<div class="panel-heading">Check List</div>
														<div class="panel-body">
															<div class="buttons">
																<button type="submit" class="btn btn-success "
																	style="float: right;" onclick="saveCheckupList()">
																	<i class="fa fa-save"></i> Save
																</button>
															</div>
															<div class="row">
																<div class="col-md-2">
																	<label> <span class="required-field"><b
																				style="color: red;"><b
																				style="color: red;">*</b></b></span>
																		Donor Name
																	</label>
																</div>
																<div class="col-md-1">
																	<div class="form-group">
																		<select name="user_title" id="user_title_checkuplist"
																			class="form-control">
																			<option value="select">--Select Title--</option>
																		</select>
																	</div>
																</div>
																<div class="col-md-3">
																	<div class="form-group">
																		<input type="text" name="first_name"
																			id="donor_first_name" class="form-control"
																			placeholder="First name">
																	</div>
																</div>
																<div class="col-md-3">
																	<div class="form-group">
																		<input type="text" name="middle_name"
																			id="donor_middle_name" class="form-control"
																			placeholder="Middle name">
																	</div>
																</div>
																<div class="col-md-3">
																	<div class="form-group">
																		<input type="text" name="last_name"
																			id="donor_last_name" class="form-control"
																			placeholder="Last name">
																	</div>
																</div>
															</div>

															<div class="row">
																<div class="col-md-2">
																	<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																		Donor feeling good
																	</label>
																</div>
																<div class="col-md-1">
																	<div class="form-group">
																		<label><input type="radio"
																			name="donor_feeling_good" value="1"> Yes</label>
																	</div>
																</div>
																<div class="col-md-1">
																	<div class="form-group">
																		<label><input type="radio"
																			name="donor_feeling_good" value="0"> No</label>
																	</div>
																</div>
															</div>

															<div class="row">
																<div class="col-md-2">
																	<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																		Any allergy record
																	</label>
																</div>
																<div class="col-md-1">
																	<div class="form-group">
																		<label><input type="radio"
																			name="allergy_record" value="1"> Yes</label>
																	</div>
																</div>
																<div class="col-md-1">
																	<div class="form-group">
																		<label><input type="radio"
																			name="allergy_record" value="0"> No</label>
																	</div>
																</div>
															</div>

															<div class="row">
																<div class="col-md-2">
																	<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																		Any previous health issue
																	</label>
																</div>
																<div class="col-md-1">
																	<div class="form-group">
																		<label><input type="radio"
																			name="previous_health_issue" value="1"> Yes</label>
																	</div>
																</div>
																<div class="col-md-1">
																	<div class="form-group">
																		<label><input type="radio"
																			name="previous_health_issue" value="0"> No</label>
																	</div>
																</div>
															</div>

															<div class="row">
																<div class="col-md-2">
																	<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																		Any habit
																	</label>
																</div>
																<div class="col-md-4">
																	<div class="form-group">
																		<textarea name="heabit_details" id="heabit_details"
																			class="form-control" placeholder="Habit details"
																			rows="5"></textarea>
																	</div>
																</div>
															</div>

															<div class="row">
																<div class="col-md-2">
																	<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																		Weight (KG)
																	</label>
																</div>
																<div class="col-md-4">
																	<div class="form-group">
																		<input type="number" name="weight" id="weight"
																			class="form-control" placeholder="Weight">
																	</div>
																</div>

																<div class="col-md-2">
																	<label> Organ donation test1 </label>
																</div>
																<div class="col-md-3">
																	<div class="form-group">
																		<input type="text" id="organ_donation_test1"
																			class="form-control"
																			placeholder="Organ donation test1"
																			name="organ_donation_test_field1">
																	</div>
																</div>
															</div>

															<div class="row">
																<div class="col-md-2">
																	<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																		Height (CM)
																	</label>
																</div>
																<div class="col-md-4">
																	<div class="form-group">
																		<input type="number" name="height" id="height"
																			class="form-control" placeholder="Height">
																	</div>
																</div>

																<div class="col-md-2">
																	<label> Organ donation test2 </label>
																</div>
																<div class="col-md-3">
																	<div class="form-group">
																		<input type="text" id="organ_donation_test2"
																			class="form-control"
																			placeholder="Organ donation test2"
																			name="organ_donation_test_field2">
																	</div>
																</div>
															</div>

															<div class="row">
																<div class="col-md-2">
																	<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																		Blood pressure (mmhg)
																	</label>
																</div>
																<div class="col-md-4">
																	<div class="form-group">
																		<input type="text" name="blood_pressure"
																			id="blood_pressure" class="form-control"
																			placeholder="Blood pressure">
																	</div>
																</div>
																<div class="col-md-2">
																	<label> Organ donation test3 </label>
																</div>
																<div class="col-md-3">
																	<div class="form-group">
																		<input type="text" id="organ_donation_test3"
																			class="form-control"
																			placeholder="Organ donation test3"
																			name="organ_donation_test_field3">
																	</div>
																</div>
															</div>

															<div class="row">
																<div class="col-md-2">
																	<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																		Temprature
																	</label>
																</div>
																<div class="col-md-4">
																	<div class="form-group">
																		<input type="text" name="temprature" id="temprature"
																			class="form-control" placeholder="Temprature">
																	</div>
																</div>
															</div>

															<div class="row">
																<div class="col-md-2">
																	<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																		Pulse
																	</label>
																</div>
																<div class="col-md-4">
																	<div class="form-group">
																		<input type="text" name="pulse" id="pulse"
																			class="form-control" placeholder="Pulse">
																	</div>
																</div>
															</div>

															<div class="row">
																<div class="col-md-2">
																	<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																		Haemoglobin
																	</label>
																</div>
																<div class="col-md-4">
																	<div class="form-group">
																		<input type="text" name="haemoglobin" id="haemoglobin"
																			class="form-control" placeholder="Haemoglobin">
																	</div>
																</div>
															</div>

															<div class="row" style="padding: 10px 0;">
																<div class="col-md-2">
																	<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																		Checkup done by
																	</label>
																</div>
																<div class="col-md-2">
																	<div class="form-group">
																		<!-- <select name="doctor_name" class="form-control" id="doctor_name">
																				 	<option value="=">Doctor name</option>
																				 	<option value="1">ABC</option>  
																				</select>  -->
																		<select class="form-control typeahead sss"
																			style="border: nimmunizationChartsone; outline: none;"
																			title="Please enter doctor" id="doctor_name">
																		</select>
																	</div>
																</div>
																<div class="col-md-2">
																	<div class="form-group">
																		<select name="accept_or_decline"
																		id="accept_or_decline"class="form-control">
																			<option value="0">--Select Accept or Decline--</option>
																			<option value="1">Accept</option>
																			<option value="2">Decline</option>
																			
																		</select>
																	</div>
																</div>
															</div>
															<div class="row" style="padding: 10px 0;">
																<div class="col-md-2">
																	<label> <span class="required-field"><b
																				style="color: red;">*</b></span>
																		Select Multiple Donor
																	</label>
																</div>
																<div class="col-md-2">
																	<div class="form-group">
																		<select name="select_organ_name"
																			id="select_organ_name" onchange="setOrganInMultiSelect()" class="col-md-12 full-width-fix form-control">
																		</select>
																	</div>
																</div>
																<div class="col-md-4">
																	<div class="form-group">
																		<select multiple="multiple" name="select_organ_name"
																			id="select_organ_name_id" class="col-md-12  form-control">
																		</select>
																	</div>
																</div>
															</div>

															<div class="row">
																<div class="col-md-2">
																	<label> Remarks if any </label>
																</div>
																<div class="col-md-4">
																	<div class="form-group">
																		<textarea name="checkup_remarks" id="checkup_remarks"
																			class="form-control" rows="5" placeholder="Remarks"></textarea>
																	</div>
																</div>
															</div>

														</div>
													</div>
												</div>
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
																<div class="panel panel-primary"
																	style="margin-top: 20px">
																	<div class="panel-heading" id="divEhatContent">Organ
																		Donor Checkup List</div>
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Checkuplist ID</th>
																					<th class="col-md-1 center">Treatment Id</th>
																					<th class="col-md-1 center">Donor Id</th>
																					<th class="col-md-1 center">Donor Name</th>
																					<th class="col-md-1 center">Checkup Date</th>
																					<th class="col-md-1 center">Checkup Done By</th>
																					<th class="col-md-1 center">Edit</th>
																					<th class="col-md-1 center">Delete</th>
																					<th class="col-md-1 center">Add Consent Form</th>
																					<th class="col-md-1 center">Organ Collection</th>
																				</tr>
																			</thead>

																			<tbody id="organDonorCheckupListDetails">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<!-- ============================================================================== -->
											<!-- END:checkup_list -->
											<!-- ============================================================================== -->


										</div>
									</div>

								</div>
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
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			getAllTitle();
			getAllDoctors();
			getAllDonorCheckupList();
			getAllIntendedOrgans();
			
			$('#select_organ_name').select2();
			$('#select_organ_name_id').select2();

			getAllOrgansFromTreatment(<%=request.getParameter("treatmentId")%>);
			$('#accept_or_decline').select2(); //Added By Annapurna
		});

		$(document).ready(function(){
			$('#collection_menu').click(function(){
				$('#outdoor_details').hide();
			})
		})

		$(document).ready(function(){
			$('#collection_menu1').click(function(){
				$('#outdoor_details').show();
			})
		})

		$(document).ready(function(){
			$('#donor_menu_existing').click(function(){
				$('#header_search_donor').show();
				$('#existing_donor').show();
			})
		})

		$(document).ready(function(){
			$('#donor_menu_new').click(function(){
				$('#header_search_donor').hide();
				$('#existing_donor').hide();
				clearDonorForm();
			})
		})
		
	</script>
	<script type = "text/javascript">
		window.onload = function(){  
			getOrganDonorById($("#organDonorId").val());
			getOrganDonorTreatmentByPatientIdAndOrganDonorId($("#patientId").val(),$("#organDonorId").val(),$("#treatmentCheckupListId").val());
	}  
	</script>

		<input type="hidden" value="111" id="userID" />
		<input type="hidden" value="0" id="doctorId" />
		<input type="hidden" value="0" id="checkupListId" />
		<input type="hidden" value="<%=request.getParameter("patientId")%>" id="patientId" />
		<input type="hidden" value="<%=request.getParameter("donorId")%>" id="organDonorId" />
		<input type="hidden" value="<%=request.getParameter("treatmentId")%>" id="treatmentCheckupListId" />
		<div id="userDetails" style="display: none;"></div>
		<input type="hidden" value="0" id="usernameValidation" />
		<input id="synchronizeToken" type="hidden"
			value="cbdcb840-12c9-4582-9c0f-abb5511603b3">
		<input type="hidden" value="0" id="userIdForUpdate" />
		<input type="hidden" value="0" id="doctorIdForUpdate" />
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