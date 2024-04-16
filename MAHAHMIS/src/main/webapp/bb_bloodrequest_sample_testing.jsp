<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Blood Request Sample Testing</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<%@include file="inv_header.jsp"%>

<!-- include js for development -->
<script type="text/javascript" src="js/users.js"></script>
<script type="text/javascript" src="js/blood_bank.js"></script>
<script type="text/javascript" src="js/blood_issue.js"></script>
<script type="text/javascript" src="js/bb_issue_master.js"></script>

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
			<div class="row">
		<div class="container">
		<div class="row">
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
										<a href="bb_bloodrequest_sample_testing.jsp">Blood Request Sample Testing</a>			
										</li>
																			<li class="pull-right">
	                           <button class="btn btn-xs btn-info pull-right" style="float: right;" type="button" id="expandDonor" onclick="toggleBloodRequestSampleTesting()">
										<i class="fa fa-plus"></i> NewRequestSampleTesting
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
								<div action="#" method="POST" style="display:none" id="divForBRSampleTesting">
									<div class="panel-body">

								<div class="header-bag-search">
									<div class="col-md-4 header-search-bag-no" id="header_search_donor">
										<div class="form-group">
										<div class="form-group" id="divtext_search_sample_dispatch">
											<input type="text" class="form-control" name="search_donor" id="search_request_id" placeholder="Search Request ID" onkeyup="searchPatientDetailsById(this.value,'SampleTesting')">
											</div>
										</div>
									</div>

									<div class="clearfix"></div>
								</div>		


			<!-- ============================================================================== -->
			<!-- START:Sample Testing -->
			<!-- ============================================================================== -->

							    		<div class="row">

											<div class="col-md-12" id="divForEntry">
													
													<div class="panel panel-primary">
														<div class="panel-heading">Sample Testing</div>
														<div class="panel-body">
								<div class="function-buttons" style="float: right;">
							  <div class="buttons">
								<button type="submit" class="btn btn-success" onclick="saveSampleTesting()"><i class="fa fa-save"></i> Save</button>
								<button type="button" class="btn btn-danger"> Cancel</button>
							</div>
						</div>
	
								<div class="row">
										<div class="col-md-2">
											<label>
												Patient Name
											</label>
										</div>
										<div class="col-md-2">
											<div class="form-group">												
												<input type="text" class="form-control" name="user_title" id="title"  placeholder="Title">
												 												</div>
										</div>
										<div class="col-md-2">
											<div class="form-group">	
											<input type="text" name="first_name" id="ti_fname" class="form-control" placeholder="First name">
											</div>
										</div>
										<div class="col-md-2">
											<div class="form-group">	
											<input type="text" name="middle_name" id="ti_mname" class="form-control" placeholder="Middle name">
											</div>
										</div>
										<div class="col-md-2">
											<div class="form-group">	
											<input type="text" name="last_name" id="ti_lname" class="form-control" placeholder="Last name">
											</div>
										</div>
									</div>

									<div class="row">
										<div class="col-md-2">
											<label>
												Contact number
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="contact1" id="ti_contactno1" class="form-control" placeholder="Contact number 1" maxlength="10">
											</div>											
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="contact2" id="ti_contactno2" class="form-control" placeholder="Contact number 2" maxlength="10">
											</div>											
										</div>
									</div>

									<div class="row">
										<div class="col-md-2">
											<label>
												Age
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="age" id="ti_age" class="form-control" placeholder="Age">
											</div>											
										</div>
									</div>

									<div class="row" style="padding: 10px 0;">
										<div class="col-md-2">
											<label>
												Gender
											</label>
										</div>
										<div class="col-md-1">
											<div class="form-group">
												<label><input type="radio" id="ti_gender" name="ti_gender" value="1"> Male</label>
											</div>											
										</div>
										<div class="col-md-1">
											<div class="form-group">
												<label><input type="radio" id="ti_gender" name="ti_gender" value="2"> Female</label>
											</div>											
										</div>
										<div class="col-md-1">
											<div class="form-group">
												<label><input type="radio" id="ti_gender" name="ti_gender" value="3"> Other</label>
											</div>											
										</div>
									</div>

									<div class="row">
										<div class="col-md-2">
											<label>
												Blood group
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="blood_group" id="ti_bloodgroup" class="form-control" placeholder="Blood group">
											</div>											
										</div>
										<div class="col-md-2">
											<label>
												Hemoglobin
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="haemoglobin" id="ti_haemoglobin" class="form-control" placeholder="Hemoglobin">
											</div>											
										</div>
									</div>

									<div class="row">
										<div class="col-md-2">
											<label>
												Height
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="height" id="ti_height" class="form-control" placeholder="Height">
											</div>											
										</div>
										<div class="col-md-2">
											<label>
												Weight
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="weight" id="ti_weight" class="form-control" placeholder="Weight">
											</div>											
										</div>
									</div>

									<div class="row">
										<div class="col-md-2">
											<label>
												Ward name
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="ward_name" id="ti_wardName" class="form-control" placeholder="Ward name">
											</div>											
										</div>
										<div class="col-md-2">
											<label>
												Bed number
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="bed_number" id="ti_bedNo" class="form-control" placeholder="Bed number">
											</div>											
										</div>
									</div>

		<div class="row" style="margin: 20px 0 0;border-top: 1px solid #CCC">
			
				<table id="data-table" class="table table-striped table-bordered" style="width:100%">
					<thead> 
					     <th>Select</th> 
						<th>Test Name</th>
						<th>Result</th>
						<th>Date & Time</th>
						<th>Remark</th>
					</thead>
					<tbody id="sampleTestingDetails">
						<!-- <tr>
							<td >
							<label id="ti_testname1">	Test A </label>
							</td>
							<td>
								<select class="form-select" name="result[]" id="ti_result1">
									<option value="positive">Positive</option>
									<option value="negative">Negative</option>
								</select>
							</td>
							<td>
								<input type="date" class="form-control" name="date_time[]" id="ti_date1">
							</td>
							<td>
								<textarea class="form-control" name="remarks[]" rows="3" id="ti_remark1"></textarea>
							</td>
						</tr>

						<tr>
							<td >
								<label id="ti_testname2">	Test A </label>
							</td>
							<td>
								<select class="form-select" name="result[]" id="ti_result2">
									<option value="positive">Positive</option>
									<option value="negative">Negative</option>
								</select>
							</td>
							<td>
								<input type="date" class="form-control" name="date_time[]" id="ti_date2">
							</td>
							<td>
								<textarea class="form-control" name="remarks[]" rows="3" id="ti_remark2" ></textarea>
							</td>
						</tr>
						
						<tr>
							<td >
								<label id="ti_testname3">Identification of antibodies</label>
							</td>
							<td>
								<select class="form-select" name="result[]" id="ti_result3">
									<option value="positive">Positive</option>
									<option value="negative">Negative</option>
								</select>
							</td>
							<td>
								<input type="date" class="form-control" name="date_time[]" id="ti_date3">
							</td>
							<td>
								<textarea class="form-control" name="remarks[]" rows="3" id="ti_remark3"></textarea>
							</td>
						</tr>
						
						<tr>
							<td>
								<label id="ti_testname4">Identification of antibodies</label>
							</td>
							
							<td>
								<select class="form-select" name="result[]" id="ti_result4">
									<option value="positive">Positive</option>
									<option value="negative">Negative</option>
								</select>
							</td>
							<td>
								<input type="date" class="form-control" name="date_time[]" id="ti_date4">
							</td>
							<td>
								<textarea class="form-control" name="remarks[]" rows="3" id="ti_remark4"></textarea>
							</td>
						</tr>	 -->
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
			<!-- ============================================================================== -->
			<!-- END:Sample Testing -->
			<!-- ============================================================================== -->


									</div>
								</div>

							
					
						
							      <!-- ============================================================================== -->
									<!-- Start : List -->
									<!-- ============================================================================== -->
						
						
                                    <!-- Added By Annapurna  -->
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
																						        <div class="row">

							<!-- NEW ORDERS -->
		                      	<!-- Added By Annapurna -->
								<div class="header-bag-search">
									<div class="col-md-3 header-search-bag-no" id="header_search_donor">
										<div class="form-group">
										<div class="form-group" id="divtext_search_bloodRequest">
											<input type="text" class="form-control" name="search_donor" id="search_donorrequester_id" placeholder="Search Request ID" onkeyup="searchDonorRequesterDetailsById(this.value,'sampletestinglist')">
										</div>
										</div>
									</div>

									<div class="clearfix"></div>
								</div>		

	
																						<div class="panel panel-primary" id="pape"
																							style="margin-top: 10px">
																							<div class="panel-heading" id="divEhatContent">Blood Donor Request List</div>
																							<div class="panel-body"
																								style="overflow: auto; height: 300px">
																								<table id="ehatTable" cellpadding="0" cellspacing="0"
																									border="0"
																									class="datatable table table-striped table-bordered">
																									<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">SampleTesting Id</th>
																					<th class="col-md-1 center">Blood Request Id</th>
																					<th class="col-md-1 center">Requester Name</th>
																					<!-- <th class="col-md-1 center">testName</th> -->
																					<th class="col-md-1 center">testDate</th>
																					
																					<th class="col-md-1 center">Edit</th>
																					<th class="col-md-1 center">Delete</th>
																				</tr>
																			</thead>

																			<tbody id="bloodrequestTestinglist">
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
			<!-- ============================================================================== -->
			<!-- END:Blood Request List -->
			<!-- ============================================================================== -->


									</div>
								</div>

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
			$("#request_number").select2();
			getAllTestsMaster();
			getAllBloodRequestSampleTestingList();
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
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
	<input type="hidden" id="bloodRequestId" value="0" />
	<input type="hidden" id="sampletestingid" value="0" />
	<input type="hidden" id="sampletest_slave_id" value="0" />
	<!-- /JAVASCRIPTS -->
	
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>