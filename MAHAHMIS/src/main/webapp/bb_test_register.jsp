<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Test Register</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<%@include file="inv_header.jsp"%>

<!-- include js for development -->
<script type="text/javascript" src="js/users.js"></script>
<script type="text/javascript" src="js/blood_bank.js"></script>
<script type="text/javascript" src="js/bb_blood_collection.js"></script>
<script type="text/javascript" src="js/patient_management.js"></script>
<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
<script type="text/javascript" src="js/bb_donor_registration_checkuplist.js"></script>
<script type="text/javascript" src="js/organ_reaction.js"></script>

<!-- Added By Annapurna -->
<script type="text/javascript">
onload = function() {
		defaultFetchPatientTitle("checkuplist");
		//getBloodDonorTreatmentDetailsById($("#donorId1").val(),$("#callform").val());
	}
	</script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
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
											<li>Test Register</li>
												<li class="pull-right">
									<button class="btn btn-xs btn-info pull-right" style="float: right;" type="button" id="expandDonor" onclick="toggleTestRegister()">
										<i class="fa fa-plus"></i> NewBloodGrouptesting
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
											<!-- START:Test Register form -->
											<!-- ============================================================================== -->


											<!-- <div class="row"> -->

											<!-- <div class="col-md-12" id="divForEntry"> -->
                                   <div  method="POST" style="display:none" id="divTestRegister">
											<div class="panel panel-primary">
												<div class="panel-heading">Test Register</div>
												<div class="panel-body">
												
												<div class="function-buttons" style="float: right;">
								<div class="buttons">
									<button type="submit" class="btn btn-success" onclick="saveTestRegister()">
										<i class="fa fa-save"></i> Save
									</button>
								<!-- 	<button type="submit" class="btn btn-warning">
										<i class="fa fa-ban"></i> Reject
									</button> -->
									<button type="button" class="btn btn-danger" onclick="ReloadPage1();">Cancel</button>
								</div>
							</div>
												

													<div class="row">
														<div class="col-md-9">


															

																<div class="filter-menu">
																	<div class="row">
																		<div class="col-md-2">
																			<label style="padding: 5px 0 0">Section</label>
																		</div>
																		<div class="col-md-4">
																			<div class="form-group">
																				<select class="form-select" id="sel_component_seperation" name="sel_component_seperation" onchange="getBloodBagIdBySectionId('testregister')">
																					<option value="0">Select Section</option>
																					<option value="1">Red cell serology</option>
																					<option value="2">Transfusion Transmitted Disease Lab</option>
																					<!-- <option value="3">Component Seperation</option> -->
																				</select>
																			</div>
																		</div>
																		<div class="col-md-2">
																			<label style="padding: 5px 0 0">Blood Bag
																				Number</label>
																		</div>
																		<div class="col-md-2">
																				<select  class="form-select" id="sel_bloodBagNumber" name="sel_bloodBagNumber" style="width:100px;">
																				<option value="0">Select</option>
																				</select>
																		</div>


																		<div class="col-md-2">
																			<button type="button" class="btn btn-primary" onclick="getDonorByBloodBag()">Show</button>
																		</div>
																	</div>
																</div>

															


															

																<div class="row" style="padding: 0 0 5px;">
																	<div class="col-md-2">
																		<label style="padding: 5px 0 0"> Date of Bag
																			Collection </label>
																	</div>
																	<div class="col-md-5">
																		<div class="form-group">
																			<input type="text" class="form-control"
																				id="date_of_bag_collection" value="<%=todays_date%>"
																				placeholder="Date of bag collection">
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
																				<option value="0">select title</option>
																			
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
																				name="blood_group" placeholder="Blood group">
																		</div>
																	</div>
																</div>

															</form>
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


													<div class="table-responsive data-with-table" style=" overflow-y: scroll; height: 175px; max-height: auto;">
														<table class="table table-bordered  table-hover"
															id="table">
															<thead>
																<th>Test Name</th>
																<th>Result</th>
																<th>Date & Time</th>
																<th>Remark</th>
															</thead>
															<!-- <tbody>
																<tr>
																	<td>Test A</td>
																	<td><select class="form-select" id="sel_test_result_testA">
																			<option value="positive">Positive</option>
																			<option value="negative">Negative</option>
																	</select></td>
																	<td><input type="date" class="form-control"
																		id="date_time_result_testA">
																	</td>
																	<td><textarea class="form-control" id="reamrk_testA"
																			rows="5"></textarea></td>
																</tr>
																<tr>
																	<td>Identification of Antibodies</td>
																	<td><select class="form-select" id="sel_test_result_identificationTestAntibody">
																			<option value="positive">Positive</option>
																			<option value="negative">Negative</option>
																	</select></td>
																	<td><input type="date" class="form-control"
																		id="inward_date_time_identificationTestAntibody">
																	</td>
																	<td><textarea class="form-control" id="reamrk_identificationTestAntibody"
																			rows="5"></textarea></td>
																</tr>
																<tr>
																	<td>Identification of Blood</td>
																	<td><select class="form-select" id="sel_test_result_identificationBlood">
																			<option value="positive">Positive</option>
																			<option value="negative">Negative</option>
																	</select></td>
																	<td><input type="date" class="form-control"
																		id="inward_date_time_identificationBlood">
																	</td>
																	<td><textarea class="form-control" id="reamrk_identificationBlood"
																			rows="5"></textarea></td>
																</tr>
															</tbody> -->
															
														<tbody id="testRegisterDetailsBody" > </tbody>
														</table>
													</div>

													<div class="row">
														<div class="col-md-1">
															<!-- <label> Remarks </label> -->
														</div>
														<div class="col-md-5">
															<div class="form-group">
																<textarea id="remarks_test_register" style='display:none' class="form-control" rows="5"
																	placeholder="Remarks"></textarea>
															</div>
														</div>
													</div>

												</div>
										   </div>
							         </div>
							       </div>
											<!-- ============================================================================== -->
											<!-- START: Test Register form -->
											<!-- Added By Annapurna  -->	
											<!-- ============================================================================== -->
											
											
											<!-- ============================================================================== -->
											<!-- START: Test RegisterList form -->
											<!-- ============================================================================== -->
	
												
												<div class="row">
												<!-- NEW ORDERS -->
												<div class="col-md-12">
													<!-- <div class="tab-content">
														<div class="tab-pane fade in active" id="menuNewDonor"> -->
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
							<!-- NEW ORDERS -->
								<div class="header-bag-search">
									<div class="col-md-3 header-search-bag-no" id="header_search_donor">
										<div class="form-group">
										<div class="form-group" id="divtext_search_name_checkup">
											<input type="text" class="form-control" name="search_donor" id="text_search_name_checkup" placeholder="Search Donor ID/Donor Name" onkeyup="searchCheckupDonorByName(this.value,'testRegister')">
										  </div>
										</div>
									</div>

									<div class="clearfix"></div>
								</div>		
					
																						<div class="panel panel-primary" id="pape"
																							style="margin-top: 20px">
																							<div class="panel-heading" id="divEhatContent">Blood Group Testing List</div>
																							<div class="panel-body"
																								style="overflow: auto; height: 300px">
																								<table id="ehatTable" cellpadding="0" cellspacing="0"
																									border="0"
																									class="datatable table table-striped table-bordered">
																									<thead id="ehatTHead">
																										<tr>
																											<th class="col-md-1 center">#</th>
																											<th class="col-md-1 center">Donor ID</th>
																											<th class="col-md-1 center">Treatment ID</th>
																											<th class="col-md-1 center">Donor Name</th>
																											  <th class="col-md-1 center">Blood Group</th> 
																											<th class="col-md-1 center"> Collection Date</th>
																											<th class="col-md-1 center">SampleItem Name</th>
																											<th class="col-md-1 center">Edit</th>
																											<th class="col-md-1 center">Delete</th>
																											<!-- <th class="col-md-1 center">Blood Bag Collection</th> -->
																										</tr>
																									</thead>
							
																									<tbody id="BloodDonorTestRegisterListDetails">
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
														<!-- </div> -->
														
														
													<!-- </div> -->
												</div>
											</div>
											</div>

											<!-- </div>																					 -->
											<!-- </div>		 -->


											<!-- ============================================================================== -->
											<!-- END:Test RegisterList form -->
											<!-- ============================================================================== -->
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
				getAllTestRegister();
				$('#title').select2();	
				$('#sel_component_seperation').select2();	
				
					$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});
					
				$("#sel_bloodBagNumber").select2();
				$("#sel_component_seperation").select2();
				getBloodBagIdBySectionId('testregister');
				//getAllBloodBagMaster();
				//aniket 27 MAY
				getAllTestsDetails();
			});

			 $(function() {
				 
		         $("#date_of_bag_collection" ).datetimepicker({
		        	timepicker:false,
		        	format: 'd/m/Y',
		    	 	formatTime: 'H:i',
		    	 	formatDate: 'd/m/Y',
		         });
		        
		       
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
		<input type="hidden" value="0" id="donorTreatmentId"/>	
		<input type="hidden" value="0" id="donorId" />
		<input type="hidden" id="test_slave_id" value="0" />
		<input type="hidden" id="testRegisterId" value="0" />
		<input id="callfrom" type="hidden" value="save" /><!--Added By Annapurna  -->
			<input id="bagno1" type="hidden" value="0" /><!--Added By Annapurna  -->

		<!-- /JAVASCRIPTS -->

	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>