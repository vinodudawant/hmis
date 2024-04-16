<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Organ Donor Consent Form</title>
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
												href="odt_organ_donor_consent_form.jsp">Organ Donor
													Consent Form</a></li>
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
														<label for="inlineFold" class="control-label">Select
															Search By</label>
													</div>
													<div class="col-sm-1">
														<select name="doctor_name" class="form-control"
															id="searchType">
															<option value="0">--Select--</option>
															<option value="1">Donor Id</option>
															<option value="2">Consent Form Id</option>
														</select>
													</div>
													<div class="col-md-3">
														<div class="input-group" id="documentByName">
															<input class="form-control typeahead"
																title="Please enter donor consent form" id="searchConsentFromId"
																type="text" placeholder="donor consent form"
																onkeyup="organDonorConsentFormAutoSuggestion(this.id)">
															<span class="input-group-btn">
																<button class="btn btn-primary"
																	onclick="donorConsentFormSearchById();"
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
															onclick="toggleEntryDivOrganDonorConsentForm()">
															<i class="fa fa-plus"></i> Show Consent Form
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
														<input type="button" onclick="getAllDonorConsentForm();"	class="btn btn-primary" value="Show">
													</div>
													
													
												</div>
											</div>


											<!-- ============================================================================== -->
											<!-- START:checkup_list -->
											<!-- ============================================================================== -->

											<div class="row">
												<div class="col-md-12" id="divForEntryOrganDonorConsentForm"
													style="display:none;">
													<div class="panel panel-primary">
														<div class="panel-heading">Consent Fom</div>
														<div class="panel-body">
															<div class="buttons">
																<button type="submit" class="btn btn-success "
																	style="float: right;" onclick="saveConsentForm()">
																	<i class="fa fa-save"></i> Save
																</button>
															</div>
															 <form id="documentForm" name="documentForm"
																		enctype="multipart/form-data" method="post">
															<div class="row">
																<div class="col-md-2">
																	<label> <span class="required-field">*</span>
																		Donor Name
																	</label>
																</div>
																<div class="col-md-1">
																	<div class="form-group">
																		<select name="consent_form_title" id="title_consentform"
																			class="form-control">
																			<option value="select">--Select Title--</option>
																		</select>
																	</div>
																</div>
																<div class="col-md-3">
																	<div class="form-group">
																		<input type="text" name="first_name"
																			id="consent_form_first_name" class="form-control"
																			placeholder="First name">
																	</div>
																</div>
																<div class="col-md-3">
																	<div class="form-group">
																		<input type="text" name="middle_name"
																			id="consent_form_middle_name" class="form-control"
																			placeholder="Middle name">
																	</div>
																</div>
																<div class="col-md-3">
																	<div class="form-group">
																		<input type="text" name="last_name"
																			id="consent_form_last_name" class="form-control"
																			placeholder="Last name">
																	</div>
																</div>
															</div>
															<div class="row">
																<div class="col-md-2">
																	<label> <span class="required-field">*</span>
																		Consent Form
																	</label>
																</div>
																<div class="col-md-4">
																	<div class="form-group">
																		<input type="file" name="uploadConsentFormDocs"
																			id="consent_form" class="form-control"
																			placeholder="consent form">
																	</div>
																</div>
															</div>

															<div class="row">
																<div class="col-md-2">
																	<label> <span class="required-field">*</span>
																		Sign By
																	</label>
																</div>
																<div class="col-md-4">
																	<div class="form-group">
																		<input type="text" name="please enter sign by name"
																			id="consent_form_sign_by_name" class="form-control"
																			placeholder="sign by name">
																	</div>
																</div>
															</div>
															<div class="row" style="padding: 10px 0;">
																<div class="col-md-2">
																	<label> <span class="required-field">*</span>
																		Relation:
																	</label>
																</div>
																<div class="col-md-2">
																	<div class="form-group">
																		<!-- <select name="doctor_name" class="form-control" id="doctor_name">
																				 	<option value="=">Doctor name</option>
																				 	<option value="1">ABC</option>  
																				</select>  -->
																		<select class="form-control typeahead"
																			style="border: nimmunizationChartsone; outline: none;"
																			title="Please enter relation" id="consent_form_relation">
																			<option value="0">Select</option>
																			<option value="Father">Father</option>
																			<option value="Brother">Brother</option>
																			<option value="Mother">Mother</option>
																			<option value="Sister">Sister</option>
																			<option value="Husband">Husband</option>
																			<option value="Wife">Wife</option>
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
																		<textarea name="consent_form_remarks" id="consent_form_remarks"
																			class="form-control" rows="5" placeholder="Remarks"></textarea>
																	</div>
																</div>
															</div>
															<!-- <div class="row">
																<div class="col-md-2">
																	<label>  </label>
																</div>
																<div class="col-md-2">
																	<div class="form-group">
																		<div class="buttons">
																			<button type="submit" class="btn btn-success "
																				style="float: right;" onclick="addConsentFormTable()">
																				<i class="fa fa-save"></i> Add Consent Form
																			</button>
																		</div>
																	</div>
																</div>
															</div> -->
															
															<!-- <div class="row">
																<div class="col-md-12">
																	<div class="tabbable header-tabs">
																		<div class="row" style="margin-top: 10px">
																			<div class="col-md-12">
																				<div class="panel panel-primary"
																					style="margin-top: 20px">
																					<div class="panel-heading" id="divEhatContent">Organ
																						Donor Consent Form</div>
																					<div class="panel-body"
																						style="overflow: auto; height: 300px">
																						<table id="ehatTable" cellpadding="0" cellspacing="0"
																							border="0"
																							class="datatable table table-striped table-bordered">
																							<thead id="ehatTHead">
																								<tr>
																									<th class="col-md-1 center">#</th>
																									<th class="col-md-1 center">Consent Form Name</th>
																									<th class="col-md-1 center">Date And Time</th>
																									<th class="col-md-1 center">Sign By Name</th>
																									<th class="col-md-1 center">Relation</th>
																								</tr>
																							</thead>
																							<tbody id="organDonorConsentFormList">
																							</tbody>
																						</table>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															
															</div> -->
															</form>
														</div>
													</div>
												</div>
												
												<!------------ Start view Document Modal-----------------  -->
													<div class="modal fade bs-example-modal-lg"
														id="viewDocModal" tabindex="-1" role="dialog"
														aria-labelledby="myLargeModalLabel" aria-hidden="true">
														<div class="modal-dialog modal-dialog modal-lg">
															<div class="modal-content">
																<div class="modal-header">
																	<button type="button" class="close"
																		data-dismiss="modal" aria-label="Close">
																		<span aria-hidden="true">&times;</span>
																	</button>
																	<div class="row">
																		<div class="col-md-4 col-xs-11">
																			<h3 class="modal-title" id="myModalLabel">View
																				document</h3>
																		</div>
																		<br>
																		<br>
																		<div class="col-md-6 col-xs-11">
																			<h5></h5>
																			<h6 id="documentComment"></h6>
																		</div>
																	</div>
																</div>
																<div class="modal-body">
																	<iframe id="ViewDocumemnt" width="80%" height="330px"></iframe>
																</div>
															</div>
														</div>
													</div>
												
												<!------------ End view Document Modal ------------------ -->
												
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
																		Donor Consent Form</div>
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Consent Form Id</th>
																					<th class="col-md-1 center">Donor Id</th>
																					<th class="col-md-1 center">Treatment Id</th>
																					<th class="col-md-1 center">Checkuplist Id</th>
																					<th class="col-md-1 center">Donor Name</th>
																					<th class="col-md-1 center">Consent Given by</th>
																					<th class="col-md-1 center">Relation</th>
																					<th class="col-md-1 center">Uploaded File</th>
																					<th class="col-md-1 center">Consent Given Date</th>
																					<th class="col-md-1 center">Edit</th>
																					<th class="col-md-1 center">Delete</th>
																				</tr>
																			</thead>

																			<tbody id="organDonorConsentFormDetails">
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
			jQuery(document).ready(function() {
				App.setPage("wizards_validations"); //Set current page 
				App.init(); //Initialise plugins and elements  
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});
				
			//	getOrganDonorByIdInConsentForm($("#organDonorId").val());
				//getOrganDonorCheckupListByCheckupListIdAndOrganDonorIdAndTreatmentId($("#organDonorId").val(),$("#consentFormCheckupListId").val(),$("#consentFormTreatmentId").val());
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
					$('#header_search_donor').hide();
					$('#existing_donor').hide();
					clearDonorForm();
				})
			})
		</script>
		<script type="text/javascript">
			window.onload = function() {
				getAllTitle();
				getAllDonorConsentForm();
			getOrganDonorByIdInConsentForm($("#organDonorId").val());
			getOrganDonorCheckupListByCheckupListIdAndOrganDonorIdAndTreatmentId($("#organDonorId").val(),$("#consentFormCheckupListId").val(),$("#consentFormTreatmentId").val());
			}
		</script>

		<input type="hidden" value="111" id="userID" />
		<input type="hidden" value="0" id="doctorId" />
		<input type="hidden" value="0" id="consentFormId" />
		<input type="hidden" value="<%=request.getParameter("checkupListId")%>" id="consentFormCheckupListId" />
		<input type="hidden" value="<%=request.getParameter("treatmentId")%>" id="consentFormTreatmentId" />
		<input type="hidden" value="<%=request.getParameter("donorId")%>" id="organDonorId" />
		<div id="userDetails" style="display: none;"></div>
		<input type="hidden" value="0" id="usernameValidation" />
		<input id="synchronizeToken" type="hidden"		value="cbdcb840-12c9-4582-9c0f-abb5511603b3">
		<input type="hidden" value="0" id="userIdForUpdate" />
		<input type="hidden" value="0" id="doctorIdForUpdate" />
		<input type="hidden" id="userId"	value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"	value="<%=session.getAttribute("uId")%>">


		<!-- /JAVASCRIPTS -->

	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>