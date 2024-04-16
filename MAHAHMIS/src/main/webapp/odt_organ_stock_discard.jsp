<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Organ Stock Discard</title>
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
<script type="text/javascript" src="js/organ_stock_discard.js"></script>



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
											<li><i class="fa fa-home"></i> <a href="index.html">Home</a>
											</li>
											<li>Organ Stock Discard Form</li>
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
											<option value="1">Stock Discard Id</option>
										</select>
									</div>
									<div class="col-md-3">
										<div class="input-group" id="organRquestDiv">
											<input class="form-control typeahead" autocomplete="off"
												title="Please enter donor id" id="donorSearchId" type="text"
												placeholder="donor" onkeyup="organStockDisacrdAutoSuggestion(this.id)">
											<span class="input-group-btn">
												<button class="btn btn-primary"
													onclick="donorSearchId();"
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
											<i class="fa fa-plus"></i> Add New Stock Discard
										</button>
									</div>
									
									<div class="col-sm-1">
										<label for="inlineFold" class="control-label" style="margin-left: 90px;">From</label>
									</div>

									<div class="col-sm-2">
										<input id="fromDate"
											class="form-control input-SmallText pull-right" type="text"
											onclick="displayCalendar(document.getElementById('fromDate'),'yyyy-mm-dd',this)"
											readonly="readonly" name="date" placeholder="Date"
											value="<%=todays_date1%>" style="margin-left: -162px;width: 99px;margin-right: -7px;">
									</div>

									<div class="col-sm-1">
										<label for="inlineFold" class="control-label" >To</label>
									</div>

									<div class="col-sm-2">
										<input id="lastDate"
											class="form-control input-SmallText pull-right" type="text"
											onclick="displayCalendar(document.getElementById('lastDate'),'yyyy-mm-dd',this)"
											readonly="readonly" name="date" placeholder="Date"
											value="<%=todays_date1%>" style="margin-left: -162px;width: 100px;margin-right: 100px;">
									</div>

									<div class="col-sm-1 pull-right">
										<input type="button" onclick="getAllOrganStockDiscardList()"
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

											<!-- <div class="header-form-details">
												<div class="header-bag-search">
													<div class="donor-menu-seln">
														<label><input type="radio" name="donor_menu"
															id="donor_menu_new" value="new"> New donor </label> <label><input
															type="radio" name="donor_menu" id="donor_menu_existing"
															value="existing"> Existing donor </label>
													</div>

													<div class="col-md-4 header-search-bag-no"
														id="header_search_donor">
														<div class="form-group">
															<input type="text" class="form-control"
																name="search_donor" placeholder="Donor ID">
														</div>
													</div>
													<div class="clearfix"></div>
												</div>
											</div> -->
											<div class="tab-content">
												<!-- ============================================================================== -->
												<!-- START:Donor Registration -->
												<!-- ============================================================================== -->
												<div id="menu" class="tab-pane fade in active">
													<div class="row">

														<div class="col-md-12" id="divForNewDonorReg"
															style="display: none">

															<div class="panel panel-primary">
																<div class="panel-heading">Organ Stock Discard</div>
																<div class="panel-body">
																	<div class="row">
																		<div class="col-md-12">
																			<div class="tabbable header-tabs">
																				<div class="row" style="margin-top: 10px">
																					<div class="col-md-12">
																						<div class="panel panel-primary">

																							<div class="panel-body" height:="" 300px"="">
																								<div class="buttons">
																									<button type="submit" class="btn btn-success "
																										style="float: right;"
																										onclick="saveOrganStockDiscard()">
																										<i class="fa fa-save"></i> Save
																									</button>
																								</div>
																								<form action="#" method="POST">
																									<div class="row">
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																													style="color: red;">*</b></span> Select Container
																											</label>
																										</div>
																										<div class="col-md-3">
																											<div class="form-group">
																												<select class="form-control input-SmallText"
																													onchange="getOrganCollectionStockDiscardById();"
																													id="container_id" name="container_id">
																													<option value="0">--Select
																														Container--</option>
																												</select>
																											</div>
																										</div>

																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																													style="color: red;">*</b></span> Collection Date
																											</label>
																										</div>

																										<div class="col-md-3">
																											<div class="form-group">
																												<input type="date" class="form-control"
																													name="collection_date" id="collection_date"
																													placeholder="Expiry Date">
																											</div>
																										</div>
																									</div>
																									<div class="row">
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																													style="color: red;">*</b></span> Patient Name
																											</label>
																										</div>
																										<div class="col-md-3">
																											<div class="form-group">
																												<select class="form-control input-SmallText"
																													id="oragn_stock_discard_title"
																													name="oragn_stock_discard_title">
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
																													style="color: red;">*</b></span> Organ Name
																											</label>
																										</div>
																										<div class="col-md-3">
																											<!-- <input type="text" class="form-control"
																												id="organ_name_container" name="organ_name"
																												placeholder="Organ Name"> -->
																											<select class="input-SmallText" style="width:100%"
																												id="organ_name_container"
																												name="organ_name_container">
																												<option value="0">- Select Organ
																													Name -</option>
																											</select>
																										</div>
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																													style="color: red;">*</b></span> Blood group
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
																									</div>
																									<div class="row">
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																													style="color: red;">*</b></span> Height
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
																													style="color: red;">*</b></span> Weight
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
																													style="color: red;">*</b></span> Hemoglobin
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
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																													style="color: red;">*</b></span> Size
																											</label>
																										</div>
																										<div class="col-md-3">
																											<input type="number" class="form-control"
																												id="size_id" name="size" placeholder="Size">
																										</div>
																									</div>
																									<div class="row">
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																													style="color: red;">*</b></span> Inward Date
																											</label>
																										</div>

																										<div class="col-md-3">
																											<div class="form-group">
																												<input type="text" class="form-control"
																													name="inward_date" id="inward_date"
																													placeholder="Inward Date" onclick="displayCalendar(document.getElementById('inward_date'),'yyyy-mm-dd',this)"
																													readonly="readonly" name="date"
																													placeholder="Date"
																													value="<%=todays_date1%>"
																													>
																											</div>
																										</div>
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																													style="color: red;">*</b></span> Expiry Date
																											</label>
																										</div>

																										<div class="col-md-3">
																											<div class="form-group">
																												<input type="text" class="form-control"
																													name="expriy_date" id="expriy_date"
																													placeholder="Expiry Date"
																													onclick="displayCalendar(document.getElementById('expriy_date'),'yyyy-mm-dd',this)"
																													readonly="readonly" name="date"
																													placeholder="Date"
																													value="<%=todays_date1%>"
																													>
																											</div>
																										</div>
																									</div>
																									<div class="row">
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																													style="color: red;">*</b></span> Discard Date
																											</label>
																										</div>

																										<div class="col-md-3">
																											<div class="form-group">
																												<input type="text" class="form-control"
																													name="discard_date" id="discard_date"
																													placeholder="Discard Date" onclick="displayCalendar(document.getElementById('discard_date'),'yyyy-mm-dd',this)"
																													readonly="readonly" name="date"
																													placeholder="Date"
																													value="<%=todays_date1%>"
																													>
																											</div>
																										</div>
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																													style="color: red;">*</b></span> Authorized By
																											</label>
																										</div>
																										<div class="col-md-3">
																											<div class="form-group">
																												<select class="form-control input-SmallText"
																													id="authorizedById" name="Authorized_By">
																													<option value="">- Select
																														Authorized By -</option>
																												</select>
																											</div>
																										</div>
																									</div>
																									<div class="row" style="padding: 10px 0;">
																										<div class="col-md-2">
																											<label> <span class="required-field"><b
																													style="color: red;">*</b></span> Discard Reason
																											</label>
																										</div>
																										<div class="col-md-4">
																											<div class="form-group">
																												<textarea name="discard_stock_remark"
																													id="discard_stock_remark"
																													class="form-control" rows="4"
																													placeholder="Reason and remarks"
																													style="resize: none;"></textarea>
																											</div>
																										</div>
																									</div>
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
														<!-- Donor List STARt -->

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
																			<div class="panel-heading" id="divEhatContent">Organ
																				Stock Discard List</div>
																			<div class="panel-body"
																				style="overflow: auto; height: 300px">
																				<table id="ehatTable" cellpadding="0"
																					cellspacing="0" border="0"
																					class="datatable table table-striped table-bordered">
																					<thead id="ehatTHead">
																						<tr>
																							<th class="col-md-1 center">#</th>
																							<th class="col-md-1 center">Stock Discard Id</th>
																							<th class="col-md-1 center">Container no</th>
																							<th class="col-md-1 center">Donor Name</th>
																							<th class="col-md-1 center">Body Type</th>
																							<th class="col-md-1 center">Organ Name</th>
																							<th class="col-md-1 center">Expiry Date</th>
																							<th class="col-md-1 center">Discard Date</th>
																							<th class="col-md-1 center">Discard Reason</th>
																							<th class="col-md-1 center">Authorized By</th>
																							<!-- <th class="col-md-1 center">Edit</th>
																							<th class="col-md-1 center">Delete</th> -->
																						</tr>
																					</thead>

																					<tbody id="organDonorStockDiscardDetails">
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
													<!-- ============================================================================== -->
													<!-- END:Donor Registration -->
													<!-- ============================================================================== -->
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
			//	getContainerList();
				getDiscardContainerList();
				// get all name prefixes
				getAllTitle();
				getAllIntendedOrgansToDonate();
				getAllDoctors();
				// get blood groups
				getBloodGroupList();
				//get All Organ StockDiscard List()
				getAllOrganStockDiscardList();
				
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
				$('#donor_menu_new').click(function() {
					clearDonorForm();
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

		<input type="hidden" value="0" id="organDonorId" />
		<input type="hidden" value="0" id="stockDiscardId" />
		<input type="hidden" value="0" id="stockInwardId" />
		<input type="hidden" value="0" id="stockDiscardOrganCollectionId"/>
		<input type="hidden" value="0" id="stockDiscardTreatmentId"/>
		<input type="hidden" value="0" id="organDiscardedQuantity"/>

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