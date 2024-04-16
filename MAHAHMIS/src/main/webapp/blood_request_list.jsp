<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Blood Request List</title>
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
<script type="text/javascript" src="js/blood_issue.js"></script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd-MM-yyyy");
	String todays_date = formatter.format(currentDate.getTime());
	
	java.text.SimpleDateFormat formatter1 = new java.text.SimpleDateFormat(
			"yyyy-MM-dd");
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

			<%@include file="bb_left_menu.jsp"%>

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
											<li><i class="fa fa-home"></i> <a href="index.html">Home</a>
											</li>
											<li><i class="fa fa-home"></i> <a
												href="odt_organ_donor_consent_form.jsp">Blood Request List
													</a></li>
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

										

										<!-- 	<div class="row">

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
													
													
													
													
												
												
												
													
													
													
													
												</div>
											</div> -->


											<!-- ============================================================================== -->
											<!-- START:bloodRequest_list -->
											<!-- ============================================================================== -->

											<div class="row">
												
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
																	<div class="panel-heading" id="divEhatContent">Blood
																		Donor List</div>
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Blood Request Id</th>
																					<th class="col-md-1 center">Requester Name</th>
																					<th class="col-md-1 center">Blood Group</th>
																					<th class="col-md-1 center">Priority</th>
																					<th class="col-md-1 center">Edit</th>
																					<th class="col-md-1 center">Delete</th>
																				</tr>
																			</thead>

																			<tbody id="bloodRequestetails">
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
											<!-- END:bloodRequest_list -->
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
					
				})
			})
		</script>
		<script type="text/javascript">
			window.onload = function() {
				getAllBloodRequestList();
			}
		</script>

		<input type="hidden" value="111" id="userID" />
		<input type="hidden" value="0" id="doctorId" />
		
	
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