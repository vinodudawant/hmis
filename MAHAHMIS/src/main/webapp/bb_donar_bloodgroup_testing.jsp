<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Blood Group Testing</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<%@include file="inv_header.jsp"%>

<!-- include js for development -->
<script type="text/javascript" src="js/users.js"></script>
<script type="text/javascript" src="js/blood_bank.js"></script>
<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
<script type="text/javascript" src="js/bb_donor_registration_checkuplist.js"></script>
<script type="text/javascript" src="js/bb_blood_collection.js"></script>
<script type="text/javascript" src="js/patient_management.js"></script>
<script type="text/javascript" src="js/bb_blood_group_master.js"></script><!-- // Addded By Annapurna -->
<script type="text/javascript" src="js/organ_reaction.js"></script>
	<!-- SELECT2 -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />

<script type="text/javascript">
	onload = function() {
		defaultFetchPatientTitle("checkuplist");
		getAllBloodGroupMaster();<!-- // Addded By Annapurna -->
		getAllBloodGroupTestingList();
		clearBloodGroupTestingForm();
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
											<li>
												<i class="fa fa-home"></i>
												<a href="index.html">Home</a>
											</li>
											<li>
												<a href="bb_donar_bloodgroup_testing.jsp">Blood Group Testing</a>
											</li>
										<li class="pull-right">
									<button class="btn btn-xs btn-info pull-right" style="float: right;" type="button" id="expandDonor" onclick="toggleBloodGroupTesting()">
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
                              <div class="row">
							<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
									<div  method="POST" style="display:none" id="divForBloodTesting">
										<div class="panel-body">
	
									<div class="header-bag-search">
										<div class="col-md-4 header-search-bag-no" id="header_search_donor">
											<div class="form-group">
											<div class="form-group" id="divtext_search_blood_name">
												<input type="text" class="form-control" name="search_donor" id="search_blood_number" placeholder="Search Blood Bag Number" onkeyup="serachBloodBagDetailsById(this.value,'bloodGroupTesting')">
											</div>
											</div>
										</div>
	
										<div class="clearfix"></div>
									</div>		
	
								<!-- ============================================================================== -->
								<!-- START:Blood Group Testing Form -->
								<!-- ============================================================================== -->
					
									<div class="panel panel-primary">
										<div class="panel-heading">Blood Group Testing</div>
										<div class="panel-body">
											<div class="row">
											<div class="function-buttons" style="float: right;">
								<div class="buttons">
									<button type="submit" class="btn btn-success" onclick="saveBloodGroupTesting()"><i class="fa fa-save"></i> Save</button>
									<button type="button" class="btn btn-danger"> Cancel</button>
								</div>
							</div>
												<div class="col-md-9">
														<div  method="POST">
															<div class="row">
																<div class="col-md-2">
																
																	<label>
																		<span class="required-field">*</span> Donor Name
																	</label>
																</div>
																<div class="col-sm-2">
																	<div class="form-group">
																	<input type="text" name="user_title" id="title" class="form-control" placeholder="Title">												
																		
																		 <!-- 	<option value="Mr">Mr</option>
																		 	<option value="Mrs">Mrs</option> </select> -->
																		</select>
																	</div>
																</div>
																<div class="col-md-3">
																	<div class="form-group">	
																	<input type="text" name="first_name" id="first_name" class="form-control" placeholder="First name">
																	</div>
																</div>
																<div class="col-md-3">
																	<div class="form-group">	
																	<input type="text" name="middle_name" id="middle_name" class="form-control" placeholder="Middle name">
																	</div>
																</div>
																<div class="col-md-3">
																	<div class="form-group">	
																	<input type="text" name="last_name" id="last_name" class="form-control" placeholder="Last name">
																	</div>
																</div>
															</div>
						
															<div class="row">
																<div class="col-md-2">
																	<label>
																		<span class="required-field">*</span> Blood bag number
																	</label>
																</div>
																<div class="col-md-5">
																	<div class="form-group">
																		<select class="form-select" name="type_of_blood_bag" id="type_of_blood_bag_gropu_testing" style="width:40%">
																			<!-- <option value="">Type of blood bag</option>
																			<option value="1">Type of blood bag1</option> -->
																		</select>
																	</div>											
																</div>
															</div>
						
															<div class="row">
																<div class="col-md-2">											
																</div>
																<div class="col-md-10">
																	<div class="bloodbag-details-fetch">
																		<div class="block-heading">
																			<h3>Blood Bag Details</h3>
																		</div>
																		<div class="block-body">
																			<p>
																				<label><strong>Type of Blood Bag:</strong></label><label id="bl_type_blood_bag"></label>
																			</p>
																			<p>
																				<label><strong>Blood Bag Number:</strong></label><label id="bl_blood_bag_no"></label>
																			</p>
																			<p>
																				<label><strong>Blood Group:</strong></label><label id="bl_group"></label>
																			</p>
																			<p>
																				<label><strong>Blood Item Name:</strong></label><label id="bl_blood_item_no"></label>
																			</p>
																			<p>
																				<label><strong>Volume of Collection:</strong></label><label id="bl_volume_collection"></label>
																			</p>
																			<p>
																				<label><strong>Date of Collection:</strong></label><label id="bl_date_collection"></label>
																			</p>
																			<p>
																				<label><strong>Remarks:</strong> </label><label id="bl_remarks"></label>
																			</p>
																		</div>
																	</div>										
																</div>
															</div>
						
															<div class="row">
																<div class="col-md-2">
																	<label>
																		Blood Group
																	</label>
																</div>
																<div class="col-md-5">
																	<div class="form-group">
																		<select class="form-select" name="blood_group" id="blood_group_group_testing">
																		<option value="0">Select bloodGroup </option>
																			<!-- <option value="1">A+</option>
																			<option value="2">B+</option>
																			<option value="3">AB+</option>
																			<option value="4">AB-</option> -->
																		</select>
																	
																	</div>											
																</div>
															</div>
						
															<div class="row" style="padding: 10px 0;">
																<div class="col-md-2">
																	<label>
																		Forward Serology (Cell grouping)
																	</label>
																</div>
																<div class="col-md-2">
																	<div class="form-group">
																		<label><input type="radio"  id="forward_serology" name="forward_serology" value="anti_a"> Anti A</label>
																	</div>											
																</div>
																<div class="col-md-2">
																	<div class="form-group">
																		<label><input type="radio" id="forward_serology" name="forward_serology" value="anti_b"> Anti B</label>
																	</div>											
																</div>
																<div class="col-md-2">
																	<div class="form-group">
																		<label><input type="radio" id="forward_serology" name="forward_serology" value="anti_ab"> Anti AB</label>
																	</div>											
																</div>
																<div class="col-md-2">
																	<div class="form-group">
																		<label><input type="radio"  id="forward_serology" name="forward_serology" value="anti_h"> Anti H</label>
																	</div>											
																</div>
																<div class="col-md-2">
																	<div class="form-group">
																		<label><input type="radio" id="forward_serology" name="forward_serology" value="anti_d"> Anti D</label>
																	</div>											
																</div>
															</div>
						
															<div class="row" style="padding: 10px 0;">
																<div class="col-md-2">
																	<label>
																		Reverse Serology (Serum grouping)
																	</label>
																</div>
																<div class="col-md-2">
																	<div class="form-group">
																		<label><input type="radio" id="reverse_serology" name="reverse_serology" value="cell_a"> A Cell</label>
																	</div>											
																</div>
																<div class="col-md-2">
																	<div class="form-group">
																		<label><input type="radio" id="reverse_serology" name="reverse_serology" value="cell_b"> B Cell</label>
																	</div>											
																</div>
																<div class="col-md-2">
																	<div class="form-group">
																		<label><input type="radio" id="reverse_serology" name="reverse_serology" value="cell_o"> O Cell</label>
																	</div>											
																</div>
																<div class="col-md-2">
																	<div class="form-group">
																		<label><input type="radio" id="reverse_serology" name="reverse_serology" value="cell_3"> Cell 3</label>
																	</div>											
																</div>
																<div class="col-md-2">
																	<div class="form-group">
																		<label><input type="radio" id="reverse_serology" name="reverse_serology" value="cell_4"> Cell 4</label>
																	</div>											
																</div>
															</div>
						
															<div class="row">
																<div class="col-md-2">
																	<label>
																		Remarks
																	</label>
																</div>
																<div class="col-md-5">
																	<div class="form-group">
																		<textarea name="remarks" id="blood_group_testing_remark" class="form-control" rows="5" placeholder="Remarks"></textarea>
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
															<!-- <label class="control-label lblBold">Weight :</label> <label
													class="control-label" id="weight"> </label> -->
																 <p>
																	<label><strong>Weight:</strong></label><label id="bl_weight"></label>
																</p> 
																<p>
																<label>	<strong>Height:</strong></label> <label id="bl_height"></label>
																</p>
																<p>
																<label>	<strong>Hemoglobin:</strong></label> </label> <label id="bl_hamoglobin"></label>
																</p>
																<p>
																<label><strong>Temperature:</strong></label> </label> <label id="bl_temprature"></label>
																</p>
															</div>
														</div>
													</div>
												</div>
                                              </div>
                                             </div>
                                         </div>
                                      </div>
							     </div>
								<!-- ============================================================================== -->
								<!-- END : Blood Group Testing Form -->
								<!-- ============================================================================== -->
								
								<!-- ============================================================================== -->
								<!-- START:Blood Group TestingList Form -->
								<!-- Added By Annapurna  -->
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
																						
																						
							
						     

							<!-- NEW ORDERS -->
							

								<div class="header-bag-search">
									<div class="col-md-3 header-search-bag-no" id="header_search_donor">
										<div class="form-group">
										<div class="form-group" id="divtext_search_name_checkup">
											<input type="text" class="form-control" name="search_donor" id="text_search_name_checkup" placeholder="Search Donor ID/ Donor Name" onkeyup="searchCheckupDonorByName(this.value,'bloodTesting')">
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
																											<th class="col-md-1 center">Blood Group Testing ID</th>
																											<th class="col-md-1 center">Donor ID</th>
																											<th class="col-md-1 center">Treatment ID</th>
																											<th class="col-md-1 center">Donor Name</th>
																											  <th class="col-md-1 center">BAG</th> 
																											<th class="col-md-1 center"> Date</th>
																											<th class="col-md-1 center">Edit</th>
																											<th class="col-md-1 center">Delete</th>
																											<!-- <th class="col-md-1 center">Blood Bag Collection</th> -->
																										</tr>
																									</thead>
							
																									<tbody id="BloodDonorGroupTestingListDetails">
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
										</div>
											
										<!-- ============================================================================== -->
										<!-- END:Blood Group TestingList Form -->
										<!-- ============================================================================== -->
	
										</div>
								
							
							<div class="footer-tools">
								<span class="go-top">
									<i class="fa fa-chevron-up"></i> Top
								</span>
							</div>
						</div><!-- /CONTENT-->
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
			$('#search_blood_number').val();
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			getAllBloodGroupMaster();<!-- // Addded By Annapurna -->
			$("#blood_group_group_testing").select2();/* // Added By Annapurna	 */
	        //getAllBloodGroupTestingList();
			//$("#title").focus();/* // Added By Annapurna */
			//$("#title").select2();/* // Added By Annapurna	 */
			
				
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
				clearBloodGroupTestingForm();
			})
		})

		$(document).ready(function(){
			$('#donor_menu_new').click(function(){
				$('#header_search_donor').hide();
				$('#existing_donor').hide();
			})
			
		})
		
	</script>
	
	<input type="hidden" value="111" id="userID" />
	<input type="hidden" value="0" id="doctorId"  />
	<div id="userDetails" style="display: none;"></div>
	<input type="hidden" value="0" id="usernameValidation" />
	<input id="synchronizeToken" type="hidden" value="cbdcb840-12c9-4582-9c0f-abb5511603b3">
	
	<input type="hidden" value="0" id="userIdForUpdate" />
	<input type="hidden" value="0" id="doctorIdForUpdate" />
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<input type="hidden" id="bloodGroupTestingId" value="0"/>
	<input type="hidden" id="donorTreatmentId" value="0"/>
	<!-- /JAVASCRIPTS -->
	
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>