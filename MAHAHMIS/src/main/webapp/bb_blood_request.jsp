<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Blood Request</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<%@include file="inv_header.jsp"%>

<!-- include js for development -->
<script type="text/javascript" src="js/users.js"></script>
<script type="text/javascript" src="js/blood_bank.js"></script>
<script type="text/javascript" src="js/blood_issue.js"></script>
<script type="text/javascript" src="js/bb_test_master.js"></script>
<script type="text/javascript" src="js/bb_component_master.js"></script>
<script type="text/javascript" src="js/patient_management.js"></script>
<script type="text/javascript" src="js/bb_blood_group_master.js"></script><!-- // Addded By Annapurna -->
<script type="text/javascript" src="js/patient.js"></script>

<!-- Added By Annapurna -->
<script type="text/javascript">
	onload = function() {
	//defaultFetchPatientTitle("checkuplist");
		title("UserManagement"); 
		
			
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
										<a href="bb_blood_request.jsp">Blood Request</a>
										</li>
									<li class="pull-right">
									<button class="btn btn-xs btn-info pull-right" style="float: right;" type="button" id="expandDonor" onclick="toggleBloodRequest()">
										<i class="fa fa-plus"></i> NewBloodRequest
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
							<div method="POST" style="display:none" id="divForBloodRequest">
								
									<div class="panel-body">

								<div class="header-bag-search">
									<div class="col-md-3 header-search-bag-no" id="header_search_donor">
										<div class="form-group">
										<div class="form-group" id="divtext_search_blood_request">
											<input type="text" class="form-control" id="search_patient" name="search_patient" placeholder="Search patientId /Patient Name " onkeyup="searchpatientDetails(this.value)">
										</div>
										</div>
									</div>

									<div class="clearfix"></div>
								</div>		


			<!-- ============================================================================== -->
			<!-- START:Donor Registration -->
			<!-- ============================================================================== -->

							    		<div class="row">

											<div class="col-md-12" >
													<div class="panel panel-primary">
														<div class="panel-heading">Blood Request</div>
														<div class="panel-body"  id="bloodRequestfrom">
			                   <div class="function-buttons" style="float: right;">
							     <div class="buttons">
								<button type="submit" class="btn btn-success" onclick="saveBloodRequest()"><i class="fa fa-save"></i> Save</button>
								</div>
						       </div>			
															
								
									<div class="row">
										<div class="col-md-2">
											<label>
												<span class="required text-danger">*</span> Patient Name
											</label>
										</div>
										<div class="col-md-2 style="width:100%">
											<div class="form-group">												
												<select class="form-select" name="user_title" id=title>
												  <option value="0">Select Title</option>
												<!--	 	<option value="Mrs">Mrs</option> -->
												</select>
											</div>
										</div>
										<div class="col-md-2">
											<div class="form-group">	
											<input type="text" name="first_name" id="f_name" class="form-control" placeholder="First name">
											</div>
										</div>
										<div class="col-md-2">
											<div class="form-group">	
											<input type="text" name="middle_name" id="m_name" class="form-control" placeholder="Middle name">
											</div>
										</div>
										<div class="col-md-2">
											<div class="form-group">	
											<input type="text" name="last_name" id="l_name" class="form-control" placeholder="Last name">
											</div>
										</div>
									</div>

									<div class="row">
										<div class="col-md-2">
											<label>
												<span class="required text-danger">*</span> Contact number
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="contact1" id="contact1" class="form-control" placeholder="Contact number 1" onkeypress="return validateContactNumOnly(event)" maxlength="10">
													
											</div>											
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="contact2" id="contact2" class="form-control" placeholder="Contact number 2" onkeypress="return validateContactNumOnly(event)" maxlength="10">
											</div>											
										</div>
									</div>

									<div class="row">
										<div class="col-md-2">
											<label>
												<span class="required text-danger">*</span> Age
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="age" id="age" class="form-control" placeholder="Age" onkeypress="return validateContactNumOnly(event)" maxlength="3" >
											</div>											
										</div>
									</div>

									<div class="row" style="padding: 10px 0;">
										<div class="col-md-2">
											<label>
												<span class="required text-danger">*</span> Gender
											</label>
										</div>
										<div class="col-md-1">
											<div class="form-group">
												<label><input type="radio" id="pa_gender" name="pa_gender" value="1"> Male</label>
											</div>											
										</div>
										<div class="col-md-1">
											<div class="form-group">
												<label><input type="radio" id="pa_gender" name="pa_gender" value="2"> Female</label>
											</div>											
										</div>
										<div class="col-md-1">
											<div class="form-group">
												<label><input type="radio" id="pa_gender" name="pa_gender" value="3"> Other</label>
											</div>											
										</div>
									</div>

									<div class="row">
										<div class="col-md-2">
											<label>
												<span class="required text-danger">*</span> Blood group
												
											</label>
										</div>
										<div class="col-md-2 style="width:90%">
											<div class="form-group">												
												<select class="form-select" name="blood_group" id="blood_group" >
												  <option value="0">Select Blood Group</option>	
												</select>
											</div>
											</div>							
										</div>
										
									<div class="row">
										<div class="col-md-2">
											<label>
												<span class="required text-danger">*</span> Hemoglobin
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="haemoglobin" id="haemoglobin" class="form-control" placeholder="Hemoglobin" onkeypress="return validateContactNumOnly(event)"  >
											</div>											
										</div>
									</div>
										

									<div class="row">
										<div class="col-md-2">
											<label>
												<span class="required text-danger">*</span> Height
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="height" id="height" class="form-control" placeholder="Height" onkeypress="return validateContactNumOnly(event)">
											</div>											
										</div>
										<div class="col-md-1">
											<label>
												<span class="required text-danger">*</span> Weight 
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="weight" id="weight" class="form-control" placeholder="Weight" onkeypress="return validateContactNumOnly(event)">
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
												<input type="text" name="ward_name" id="ward_name" class="form-control" placeholder="Ward name">
											</div>											
										</div>
										<div class="col-md-1">
											<label>
												Bed number
											</label>
										</div>
										<div class="col-md-2">
											<div class="form-group">
												<input type="text" name="bed_number" id="bed_number" class="form-control" placeholder="Bed number">
											</div>											
										</div>
									</div>
									<div class="row" style="padding: 10px 0;">
									
										<div class="col-md-2">
											<label>
												Priority
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<!-- <label><input type="radio"  id="priority" name="priority" value="0"> Urgent</label> -->
												<select class="form-select" name="rate_of_transfusion" id="priority">
										<option value="0">--Select Priority--</option>
											</select>
											</div>											
										</div>
									</div>

		<div class="row">
			<div class="table-responsive data-with-table col-md-5">
				<table class="table table-bordered table-hover" id="table">
					<thead> 
						<th>Component Name</th>
						<th>Volume (ml)</th>
					</thead>
					<tbody id="componentTabel">
						
						<!-- <tr>
							<td><label id="plasma1">Plasma</label></td>
							<td><input type="text" class="form-control" id="plasma_volume1"></td>
							</tr>

							 <tr>
								<td><label id="plasma2">FFP</label></td>
								<td><input type="text" class="form-control"	id="plasma_volume2"></td>
								
							</tr>

							<tr>
							<td><label id="plasma3">R-Cell</label></td>
							<td><input type="text" class="form-control" id="plasma_volume3"></td>
																	
							</tr>  -->
					</tbody>
				</table>
			</div>
		</div>
		                       <div class="row" style="padding: 10px ">
									
										<div class="col-md-2">
											<label>
												Reason and Remarks
											</label>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<textarea name="remarks" id="remarks" class="form-control" rows="5" placeholder="Reason and Remarks"></textarea>
											</div>											
										</div>
									</div>
		


									
										<!-- <div class="col-md-1">
											<div class="form-group">
												<label><input type="radio" id="priority" name="priority" value="1"> Planned</label>
											</div>											
										</div>  -->
									</div>

								</div>
															
														</div> 
													</div>
																
											</div>																					
							    		</div>
							        </div>
			<!-- ============================================================================== -->
			<!-- END:Donor Registration -->
			<!-- ============================================================================== -->

    		<!-- ============================================================================== -->
			<!-- start:Blood Request-->
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
											<input type="text" class="form-control" name="search_donor" id="search_request_id" placeholder="Search Request ID" onkeyup="searchPatientDetailsById(this.value,'bloodRequest')">
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
			
			getAllpriority();
			getAllComponentMaster();
			$("#title").select2();
			 $("#blood_group").select2();
			   $("#priority").select2();
				getAllBloodGroupMaster();<!-- // Addded By Annapurna -->
				getAllBloodRequestList();
	  // editRequestDetails(<%=request.getParameter("bloodRequestId")%>)
	
			 
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
				clearSampleDispatch();
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
	<input type="hidden" id="blood_slave_id" value="0" />

	<!-- /JAVASCRIPTS -->
	
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>