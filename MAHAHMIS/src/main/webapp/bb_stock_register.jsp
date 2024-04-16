<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Stock Register</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">


<%@include file="inv_header.jsp"%>

<!-- include js for development -->
<script type="text/javascript" src="js/users.js"></script>
<script type="text/javascript" src="js/blood_bank.js"></script>
<script type="text/javascript" src="js/patient_management.js"></script>
<script type="text/javascript" src="js/bb_donor_registration_checkuplist.js"></script>
<script type="text/javascript" src="js/bb_blood_collection.js"></script>

<!-- Added By Annapurna -->
<script type="text/javascript">
	onload = function() {
		defaultFetchPatientTitle("checkuplist");
		//getBloodDonorTreatmentDetailsById($("#donorId1").val(),$("#callform").val());
			
	}
	</script>
	
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
	String todays_date = formatter.format(currentDate.getTime());
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
				<!-- SAMPLE BOX CONFIGURATION MODAL FORM-->
				<div class="modal fade" id="box-config" tabindex="-1" role="dialog"
					aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal"
									aria-hidden="true">&times;</button>
								<h4 class="modal-title">Box Settings</h4>
							</div>
							<div class="modal-body">Here goes box setting content.</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default"
									data-dismiss="modal">Close</button>
								<button type="button" class="btn btn-primary">Save
									changes</button>
							</div>
						</div>
					</div>
				</div>
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
											<li>Stock Register</li>
									<li class="pull-right">
									<button class="btn btn-xs btn-info pull-right" style="float: right;" type="button" id="expandDonor" onclick="toggleStockReg()">
										<i class="fa fa-plus"></i> NewStockRegister
									</button>
                                        </li>
	
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
											<!-- ============================================================================== -->
											<!-- START:Stock Register form -->
											<!-- ============================================================================== -->
											<!-- <div class="row"> -->
											<!-- <div class="col-md-12" id="divForEntry"> -->
											
                                        <div  method="POST" style="display:none" id="divStockRegister">
											<div class="panel panel-primary">
												<div class="panel-heading">Stock Register</div>
												<div class="panel-body">
												
								<div class="function-buttons" style="float: right;">
								<div class="buttons">
									<button type="submit" class="btn btn-success" onclick="saveStockRegister()"><i class="fa fa-save"></i> Save
									</button>
									<!-- <button type="submit" class="btn btn-warning"><i class="fa fa-ban"></i> Reject
									</button>
									<button type="button" class="btn btn-danger">Cancel</button> -->
								</div>
							</div>
												
													<div class="row">
														<div class="col-md-9">
															<form>
																<div class="filter-menu">
																	<div class="row">
																		<div class="col-md-2">
																			<label style="padding: 5px 0 0">Blood Bag
																				Number</label>
																		</div>
																		<div class="col-md-3">
																			<div class="form-group">
																				<select class="form-select" id="sel_bloodBagNumber" name="status">
																					<option value="0">Select</option>
																				</select>
																			</div>
																		</div>
																		<div class="col-md-2">
																			<button type="button" class="btn btn-primary" onclick="getDonorInfoByBloodBag('stock')">Show</button>
																		</div>
																	</div>
																</div>
															</form>

															<form>
																<div class="row" style="padding: 0 0 5px;">
																	<div class="col-md-2">
																		<label style="padding: 5px 0 0"> Date of Blood
																			Collection </label>
																	</div>
																	<div class="col-md-5">
																		<div class="form-group">
																			<input type="text" class="form-control"
																				id="date_of_bag_collection" value="<%=todays_date%>"
																				placeholder="Date of blood collection">
																		</div>
																	</div>
																</div>

																<div class="row">
																	<div class="col-md-2">
																		<label> Donor Name </label>
																	</div>
																	<div class="col-md-2">
																		<div class="form-group">
																			<select class="form-select" id="title" name="user_title">
																			        <option value="0">-Select-</option>
																				<!-- <option value="Mr">Mr</option>
																				<option value="Mrs">Mrs</option> -->
																			</select>
																		</div>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">
																			<input type="text" id="txt_first_name" name="first_name"
																				class="form-control" placeholder="First name">
																		</div>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">
																			<input type="text" id="txt_middle_name" name="middle_name"
																				class="form-control" placeholder="Middle name">
																		</div>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">
																			<input type="text" id="txt_last_name" name="last_name"
																				class="form-control" placeholder="Last name">
																		</div>
																	</div>
																</div>

																<div class="row">
																	<div class="col-md-2">
																		<label> Blood Group </label>
																	</div>
																	<div class="col-md-5">
																		<div class="form-group">
																			<input type="text" class="form-control" id="txt_blood_group"
																				name="blood_group" placeholder="Blood group name">
																		</div>
																	</div>
																</div>
															</div>
														</div>

														<div class="col-md-3">
															<div class="donor-details-fetch">
																<div class="block-heading">
																	<h3>Donor Details</h3>
																</div>
																<div class="block-body">
																	<p>
																		<label><strong>Weight : </strong></label><label id="la_weight"></label> 
																	</p>
																	<p>
																		<label><strong>Height : </strong></label><label id="la_height"></label> 
																	</p>
																	<p>
																		<label><strong>Hemoglobin  : </strong></label><label id="la_haemoglobin"></label> 
																	</p>
																	<p>
																		<label><strong>Temperature  : </strong></label><label id="la_temprature"></label> 
																	</p>
																</div>
															</div>
														</div>
													</div>


													<div class="table-responsive data-with-table">
														<table class="table table-bordered  table-hover"
															id="table">
															<thead>
																<th>Component Name</th>
																<th>Volume (ml)</th>
																<th>Inward Date & Time</th>
																<th>Expiry Date</th>
																<th>Remark</th>
															</thead>
															<tbody id="stockDetails">
																<!-- <tr>
																	<td>Plasma</td>
																	<td><input type="text" class="form-control" id="plasma_volume" ></td>
																	<td><input type="date" class="form-control" id="plasma_inward_date" ></td>
																	<td><input type="date" class="form-control" id="plasma_expiry_date" ></td>
																	<td><textarea class="form-control" name="reamrk" id="plasma_reamrk" rows="5"></textarea></td>
																</tr>

																<tr>
																	<td>FFP</td>
																	<td><input type="text" class="form-control" id="ffp_volume" ></td>
																	<td><input type="date" class="form-control" id="ffp_inward_date" ></td>
																	<td><input type="date" class="form-control" id="ffp_expiry_date" ></td>
																	<td><textarea class="form-control" name="reamrk" id="ffp_reamrk" rows="5"></textarea></td>
																</tr>

																<tr>
																	<td>R-Cell</td>
																	<td><input type="text" class="form-control" id="rcell_volume" ></td>
																	<td><input type="date" class="form-control" id="rcell_inward_date" ></td>
																	<td><input type="date" class="form-control" id="rcell_expiry_date" ></td>
																	<td><textarea class="form-control" name="reamrk" id="rcell_reamrk" rows="5"></textarea></td>
																</tr> -->
															</tbody>
														</table>
													</div>

													<div class="row">
														<div class="col-md-1">
															<label> Remarks </label>
														</div>
														<div class="col-md-5">
															<div class="form-group">
																<textarea name="remarks" class="form-control" id="stock_remark" rows="5"
																	placeholder="Remarks"></textarea>
															</div>
														</div>
													</div>
												</div>
											</div>
											
											<div class="row">
												<!-- NEW ORDERS -->
												<div class="col-md-12">
													
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
																						
						               <!-- Added By Annapurna -->			
										<div class="header-bag-search">
									<div class="col-md-3 header-search-bag-no" id="header_search_donor">
										<div class="form-group">
										<div class="form-group" id="divtext_search_blood_name">
											<input type="text" class="form-control" name="search_donor" id="search_blood_number" placeholder="Search Blood Bag Number" onkeyup="serachBloodBagDetailsById(this.value,'stockRegister')">
										</div>
										</div>
									</div>

									<div class="clearfix"></div>
								</div>		
																			
																						
																						
																						<div class="panel panel-primary" id="pape"
																							style="margin-top: 20px">
																							<div class="panel-heading" id="divEhatContent">Blood Bag Collection List</div>
																							<div class="panel-body"
																								style="overflow: auto; height: 300px">
																								<table id="ehatTable" cellpadding="0" cellspacing="0"
																									border="0"
																									class="datatable table  table-bordered">
																									<thead id="ehatTHead">
																										<tr>
																											<th class="col-md-1 center">#</th>
																											<th class="col-md-1 center">Blood Bag</th>
																											<th class="col-md-1 center">Component Name</th>
																											<th class="col-md-1 center">Volume</th>
																											 <th class="col-md-1 center">Blood Group</th>
																											<th class="col-md-1 center">Expiry Date</th>
																											<th class="col-md-1 center">Inward Date</th>
																											<th class="col-md-1 center">Edit</th>
																											<th class="col-md-1 center">Delete</th>
																											
																										</tr>
																									</thead>
							
																									<tbody id="stockAllList">
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
											<!-- </div>																					 -->
											<!-- </div>		 -->
											<!-- ============================================================================== -->
											<!-- END:Stock Register form -->
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
				$("#sel_bloodBagNumber").select2();
				 $("#title").select2();
				getBloodBagInComponent();
				getAllStockList();
			});
		</script>

		<input type="hidden" value="111" id="userID" />
		<input type="hidden" value="0" id="doctorId" />
		<div id="userDetails" style="display: none;"></div>
		<input type="hidden" value="0" id="usernameValidation" />
		<input id="synchronizeToken" type="hidden" value="cbdcb840-12c9-4582-9c0f-abb5511603b3">
		<input type="hidden" value="0" id="userIdForUpdate" />
		<input type="hidden" value="0" id="doctorIdForUpdate" />
		<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<input id="donorTreatmentId" type="hidden" value="0" />
		 <input id="stockId" type="hidden" value="0" /> 
		 <input id="bagId" type="hidden" value="0" /> 
		 <input id="callfrom" type="hidden" value="save" />

		<!-- /JAVASCRIPTS -->

	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>