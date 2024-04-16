<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Donor Reaction</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<%@include file="inv_header.jsp"%>

<!-- include js for development -->
<script type="text/javascript" src="js/users.js"></script>
<script type="text/javascript" src="js/blood_bank.js"></script>
<script type="text/javascript" src="js/bb_blood_collection.js"></script>
<script type="text/javascript" src="js/patient_management.js"></script>
<script type="text/javascript" src="js/bb_donor_registration_checkuplist.js"></script>
<script type="text/javascript" src="js/organ_reaction.js"></script>

<script type="text/javascript">
	onload = function() {
		getAllDonorReaction();
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
												<a href="bb_donar_reaction.jsp">Donor Reaction</a>
											</li>
											
																						
												<li class="pull-right">
	                           <button class="btn btn-xs btn-info pull-right" style="float: right;" type="button" id="expandDonor" onclick="toggleDonorReactionDiv()">
										<i class="fa fa-plus"></i> NewDonorReaction
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
								<div class="col-md-12" >
									<div class="panel panel-default" >
										<div  method="POST" style="display:none" id="divForReg">
										<div class="panel-body">
									

											<!-- ============================================================================== -->
											<!-- START:Donor Reaction Form -->
											<!-- ============================================================================== -->
														
																							<div class="header-bag-search">
												<div class="col-md-4 header-search-bag-no" id="header_search_donor_reaction">
													<div class="form-group">
														<input type="text" class="form-control" id="text_search_name_reaction" name="search_donor" placeholder="Search Donor" onkeyup="searchDonorReactionByName(this.value,'reaction')">
													</div>
												</div>
			
												<div class="clearfix"></div>
											</div>		
					
											<div class="panel panel-primary">
												<div class="panel-heading">Donor Reaction</div>
												<div class="panel-body">
			
												<div class="row">
													<div class="col-md-9">
													
														
															<div class="row">
																<div class="col-md-2">
																	<label>
																		<span class="required text-danger">*</span> Donor Name
																	</label>
																</div>
																<div class="col-md-2">
																	<div class="form-group">												
																		<select class="form-control" id="title" name="user_title">																	
																		</select>
																	</div>
																</div>
																<div class="col-md-3">
																	<div class="form-group">	
																	<input type="text" id="txt_first_name" name="first_name" class="form-control" placeholder="First name">
																	</div>
																</div>
																<div class="col-md-3">
																	<div class="form-group">	
																	<input type="text" id="txt_middle_name" name="middle_name" class="form-control" placeholder="Middle name">
																	</div>
																</div>
																<div class="col-md-3">
																	<div class="form-group">	
																	<input type="text" id="txt_last_name" name="last_name" class="form-control" placeholder="Last name">
																	</div>
																</div>
															</div>
						
															<div class="row">
																<div class="col-md-2">
																	<label>
																		Blood bag number
																	</label>
																</div>
																<div class="col-md-5">
																	<div class="form-group">
																		<select class="form-control" id="sel_bloodBagNumber" name="sel_bloodBagNumber">
																			<option value="0">Select</option>
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
																				<label><strong>Type of Blood Bag : </strong></label><label id="la_typebloodBag"></label> 
																			</p>
																			<p>
																				<label><strong>Blood Bag Number:</strong></label><label id="la_bloodBagNo"></label>
																			</p>
																			<p>
																				<label><strong>Blood Group:</strong></label><label id="la_bloodGroup"></label>
																			</p>
																			<p>
																				<label><strong>Blood Item Name:</strong></label><label id="la_bloodItemNo"></label>
																			</p>
																			<p>
																				<label><strong>Volume of Collection:</strong></label><label id="la_volumeCollection"></label>
																			</p>
																			<p>
																				<label><strong>Date of Collection:</strong></label><label id="la_dateCollection"></label>
																			</p>
																			<p>
																				<label><strong>Remarks:</strong></label><label id="la_remarks"></label>
																			</p>
																		</div>
																	</div>										
																</div>
															</div>
						
															<div class="row">
																<div class="col-md-2">
																	<label>
																		Pain
																	</label>
																</div>
																<div class="col-md-1">
																	<div class="form-group">
																		<label><input type="radio" name="ra_pain" id="pain_yes" value="Y"> Yes</label>
																	</div>											
																</div>
																<div class="col-md-1">
																	<div class="form-group">
																		<label><input type="radio" name="ra_pain" id="pain_no" value="N"> No</label>
																	</div>											
																</div>
															</div>
						
															<div class="row" id="pain_details_block" style="padding: 0 0 10px">
																<div class="col-md-2">
																</div>
																<div class="col-md-5">
																	<div class="form-group">
																		<textarea class="form-control" id="pain_details" name="pain_details" placeholder="Pain details" rows="5"></textarea>
																	</div>											
																</div>
															</div>
						
															<div class="row">
																<div class="col-md-2">
																	<label>
																		Allergy reaction
																	</label>
																</div>
																<div class="col-md-1">
																	<div class="form-group">
																		<label><input type="radio" name="ra_allergy_reaction" id="allergy_reaction_yes" value="Y"> Yes</label>
																	</div>											
																</div>
																<div class="col-md-1">
																	<div class="form-group">
																		<label><input type="radio" name="ra_allergy_reaction" id="allergy_reaction_no" value="N"> No</label>
																	</div>											
																</div>
															</div>
						
															<div class="row" id="allergy_reaction_details_block" style="padding: 0 0 10px">
																<div class="col-md-2">
																</div>
																<div class="col-md-5">
																	<div class="form-group">
																		<textarea class="form-control" id="allergy_reaction_details" name="allergy_reaction_details" placeholder="Reaction details" rows="5"></textarea>
																	</div>											
																</div>
															</div>
						
															<div class="row">
																<div class="col-md-2">
																	<label>
																		Outcome
																	</label>
																</div>
																<div class="col-md-1">
																	<div class="form-group">
																		<label><input type="radio" name="ra_outcome" id="outcome_yes" value="Y"> Yes</label>
																	</div>											
																</div>
																<div class="col-md-1">
																	<div class="form-group">
																		<label><input type="radio" name="ra_outcome" id="outcome_no" value="N"> No</label>
																	</div>											
																</div>
															</div>
						
															<div class="row" id="outcome_details_block" style="padding: 0 0 10px">
																<div class="col-md-2">
																</div>
																<div class="col-md-5">
																	<div class="form-group">
																		<textarea class="form-control" id="outcome_details" name="outcome_details" placeholder="Outcome details" rows="5"></textarea>
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
																		<textarea name="ta_remarks" id="ta_remarks" class="form-control" rows="5" placeholder="Remarks"></textarea>
																	</div>											
																</div>
															</div>
														
													</div>
			
													<div class="col-md-3">
													<button type="submit" class="btn btn-success" style="margin-bottom: 2px;" onclick="saveDonorReaction()"> Save</button>
															<br>
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
												</div>
												</div> 
												</div> 
												</div>
							                   	</div>
									<!-- ============================================================================== -->
									<!-- END:Blood Bag Details Form -->
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

                                     <!--Added By Annapurna -->
								<div class="header-bag-search">
									<div class="col-md-3 header-search-bag-no" id="header_search_donor">
										<div class="form-group">
										<div class="form-group" id="divtext_search_name_checkup">
											<input type="text" class="form-control" name="search_donor" id="text_search_name_checkup" placeholder="Search Donor ID/ Donor Name" onkeyup="searchCheckupDonorByName(this.value,'bloodReaction')">
										</div>
										</div>
									</div>

									<div class="clearfix"></div>
								</div>		
																				
		
																						
																						<div class="panel panel-primary" id="pape"
																							style="margin-top: 20px">
																							<div class="panel-heading" id="divEhatContent">Donor Reaction List</div>
																							<div class="panel-body"
																								style="overflow: auto; height: 300px">
																								<table id="ehatTable" cellpadding="0" cellspacing="0"
																									border="0"
																									class="datatable table table-striped table-bordered">
																									<thead id="ehatTHead">
																										<tr>
																											<th class="col-md-1 center">#</th>
																											<th class="col-md-1 center">Donor Reaction ID</th>
																											<th class="col-md-1 center">Donor ID</th>
																											<th class="col-md-1 center">Treatment ID</th>
																											<th class="col-md-1 center">Donor Name</th>
																											 <!-- <th class="col-md-1 center">Done By</th> -->
																											<th class="col-md-1 center"> Date</th>
																											<th class="col-md-1 center">Edit</th>
																											<th class="col-md-1 center">Delete</th>
																											<!-- <th class="col-md-1 center">Blood Bag Collection</th> -->
																										</tr>
																									</thead>
							
																									<tbody id="BloodDonorReactionListDetails">
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
														
														
												</div> 
											</div>
											
											
									
													
										<!-- ============================================================================== -->
										<!-- END:Donor Reaction Form -->
										<!-- ============================================================================== -->
	
										</div>
								</div>
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
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			$("#title").select2();
		//	$("#sel_bloodBagNumber").select2();
		//	getBloodBagIdBySectionId('reaction');
			// getAllDonorReaction();
			defaultFetchPatientTitle("checkuplist");

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
	<input id="donorTreatmentId" type="hidden" value="0" />	
	<input id="donorReactionId" type="hidden" value="0" />
	
	<!-- /JAVASCRIPTS -->
	
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>