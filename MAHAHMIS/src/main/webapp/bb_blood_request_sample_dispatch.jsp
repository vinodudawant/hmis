<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Blood Request Sample Dispatch</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<%@include file="inv_header.jsp"%>

<!-- include js for development -->
<script type="text/javascript" src="js/users.js"></script>
<script type="text/javascript" src="js/blood_bank.js"></script>
<script type="text/javascript" src="js/blood_issue.js"></script>
<script type="text/javascript">
	onload = function() {
		getAllBloodRequestSampleDispatchList();
	}
</script>

	<%


		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
		String todays_date = formatter.format(currentDate.getTime());
		
		java.text.SimpleDateFormat formatter2 = new java.text.SimpleDateFormat(
				"dd/MM/yyyy");
		String todays_date2 = formatter2.format(currentDate.getTime());
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
										<a href="bb_blood_request_sample_dispatch.jsp">Blood Request Sample Dispatch</a>
										</li>
									<li class="pull-right">
	                           <button class="btn btn-xs btn-info pull-right" style="float: right;" type="button" id="expandDonor" onclick="toggleBloodRequestSampleDispatch()">
										<i class="fa fa-plus"></i> NewRequestSampleDispatch
									</button>
                                        </li>
										
									</ul>

									<!-- /BREADCRUMBS -->
									<div class="clearfix"></div>
								</div>
							</div>
						</div>

			
						
						<!-- <div class="row"> -->
                         <div class="row">
							<!-- NEW ORDERS -->
							<div class="col-md-12">
								<div class="panel panel-default">
							<div action="#" method="POST" style="display: none" id="divForBRSampleDispatch">
								<div class="panel-body">

								<div class="header-bag-search">
									<div class="col-md-4 header-search-bag-no" id="header_search_donor">
										<div class="form-group">
										<div class="form-group" id="divtext_search_sample_dispatch">
											<input type="text" class="form-control" name="search_donor" id="search_request_id" placeholder="Search Request ID" onkeyup="searchPatientDetailsById(this.value,'sampleDispatch')">
										</div>
										</div>
									</div>

									<div class="clearfix"></div>
								</div>		


			<!-- ============================================================================== -->
			<!-- START:Donor Registration -->
			<!-- ============================================================================== -->

							    		
                                           <div class="row">
											<div class="col-md-12">
													<div class="panel panel-primary">
														<div class="panel-heading">Sample Dispatch</div>
														<div class="panel-body">
							<div class="function-buttons" style="float: right;">
							<div class="buttons">
								<button type="submit" class="btn btn-success" onclick="saveSampleDispatch()"><i class="fa fa-save"></i> Save</button>
							
							</div>
						</div>
														
															
								
									<div class="row">
										<div class="col-md-2">
											<label>
												<span class="required-field">*</span> Patient Name
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">												
												<input type="text" class="form-control" name="user_title" id="title" >
												 	<!-- <option value="Mr">Mr</option>
												 	<option value="Mrs">Mrs</option> -->
												<!-- </select> -->
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">	
											<input type="text" name="first_name" id="bi_fname" class="form-control" placeholder="First name">
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">	
											<input type="text" name="middle_name" id="bi_mname" class="form-control" placeholder="Middle name">
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">	
											<input type="text" name="last_name" id="bi_lname" class="form-control" placeholder="Last name">
											</div>
										</div>
									</div>

									<div class="row">
										<div class="col-md-2">
											<label>
												<span class="required-field">*</span> Contact number
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="contact1" id="bi_contactno1" class="form-control" placeholder="Contact number 1" maxlength="10">
											</div>											
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="contact2" id="bi_contactno2" class="form-control" placeholder="Contact number 2" maxlength="10">
											</div>											
										</div>
									</div>

									<div class="row">
										<div class="col-md-2">
											<label>
												<span class="required-field">*</span> Age
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="age" id="bi_age" class="form-control" placeholder="Age">
											</div>											
										</div>
									</div>

									<div class="row" style="padding: 10px 0;">
										<div class="col-md-2">
											<label>
												<span class="required-field">*</span> Gender
											</label>
										</div>
										<div class="col-md-1">
											<div class="form-group">
												<label><input type="radio" id="bi_gender" name="bi_gender" value="1"> Male</label>
											</div>											
										</div>
										<div class="col-md-1">
											<div class="form-group">
												<label><input type="radio" id="bi_gender" name="bi_gender" value="2"> Female</label>
											</div>											
										</div>
										<div class="col-md-1">
											<div class="form-group">
												<label><input type="radio" id="bi_gender" name="bi_gender" value="3"> Other</label>
											</div>											
										</div>
									</div>

									<div class="row">
										<div class="col-md-2">
											<label>
												<span class="required-field">*</span> Blood group
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="blood_group" id="bi_bloodgroup" class="form-control" placeholder="Blood group">
											</div>											
										</div>
										<div class="col-md-2">
											<label>
												<span class="required-field">*</span> Hemoglobin
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="haemoglobin" id="bi_haemoglobin" class="form-control" placeholder="Hemoglobin">
											</div>											
										</div>
									</div>

									<div class="row">
										<div class="col-md-2">
											<label>
												<span class="required-field">*</span> Height
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="height" id="bi_height" class="form-control" placeholder="Height">
											</div>											
										</div>
										<div class="col-md-2">
											<label>
												<span class="required-field">*</span> Weight
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="weight" id="bi_weight" class="form-control" placeholder="Weight">
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
												<input type="text" name="ward_name" id="bi_wardname" class="form-control" placeholder="Ward name">
											</div>											
										</div>
										<div class="col-md-2">
											<label>
												Bed number
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="bed_number" id="bi_bedno" class="form-control" placeholder="Bed number">
											</div>											
										</div>
									</div>

		<div class="row">
			<div class="table-responsive data-with-table col-md-8">
				<table class="table table-bordered table-hover" id="table">
					<thead> 
						<th>Section</th>
						<th style="width: 5%">Send</th>
						<th>Date and Time</th>
						<th style="width: 13%">Print Barcode</th>
					</thead>
					<tbody>
						<tr>
							<td>Blood Bank</td>
							<td>
								<center>
									<input type="checkbox" id="bi_send"  value="Y" name="send">
								</center>
							</td>		
							<td>
								<input type="date" class="form-control" id="bi_date" name="date_and_time">
							</td>		
							<td>
								<center>
									<input type="checkbox" value="Y" id="bi_barcode" name="barcode">
								</center>
							</td>						
						</tr>

						<%-- <tr>
							<td>Plasma</td>
							<td>
								<center>
									<input type="checkbox" name="send[]">
								</center>
							</td>		
							<td>
								<input type="text" class="form-control" name="date_and_time[]" value="14/05/2021 04:50 PM">
							</td>		
							<td>
								<center>
									<input type="checkbox" name="barcode[]">
								</center>
							</td>						
						</tr> --%>

						<%-- <tr>
							<td>Plasma</td>
							<td>
								<center>
									<input type="checkbox" name="send[]">
								</center>
							</td>		
							<td>
								<input type="text" class="form-control" name="date_and_time[]" value="14/05/2021 04:50 PM">
							</td>		
							<td>
								<center>
									<input type="checkbox" name="barcode[]">
								</center>
							</td>						
						</tr> --%>

						<%-- <tr>
							<td>Plasma</td>
							<td>
								<center>
									<input type="checkbox" name="send[]">
								</center>
							</td>		
							<td>
								<input type="text" class="form-control" name="date_and_time[]" value="14/05/2021 04:50 PM">
							</td>		
							<td>
								<center>
									<input type="checkbox" name="barcode[]">
								</center>
							</td>						
						</tr> --%>
					</tbody>	
				</table>
			</div>
		</div>


									<div class="row">
										<div class="col-md-2">
											<label>
												Remarks
											</label>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<textarea name="remarks" id="remarks" class="form-control" rows="5" placeholder="Remarks"></textarea>
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

                                    </div>
								</div>

							</div>
									</div>
								</div>

			<!-- ============================================================================== -->
				<!-- Added By Annapurna  -->
			<!-- Start:Dispatch list  -->
			<!-- ============================================================================== -->

											
						
						
						
						 <div class="panel panel-default">
										<div class="panel-body">

											 <div class="header-record-search">
											<!--	<div class="col-md-12 header-search-record-no"
													id="header_search_donor">
														<div class="row">
															<div class="col-md-12">
																
															
																<div class="col-md-3">
																	<div class="from-group" id="divtext_search_name_checkup">
																		<input class="form-control typeahead"
																			title="Please enter Donor Name" id="divtext_search_name_checkup"
																			type="text" placeholder="Search  Patient Name"
																			onkeyup="searchCheckupDonorByName(this.value,'bloodTesting')">
																	</div>
																</div>
																
 -->																	<div class="col-sm-1">
														<label for="inlineFold" class="control-label">From</label>
													</div>
												
													<div class="col-sm-2">
														<input id="fromDate" class="form-control input-SmallText pull-right" type="text" onclick="displayCalendar(document.getElementById
															('fromDate'),'dd/mm/yyyy',this)" readonly="readonly" name="date" placeholder="Date" value=<%=todays_date2%> style="margin-left: -162px;">
													</div>
													
												
												
												<div class="col-sm-1">
														<label for="inlineFold" class="control-label">To</label>
													</div>
												
												
													<div class="col-sm-2">
														<input id="lastDate" class="form-control input-SmallText pull-right"
															type="text"
															onclick="displayCalendar(document.getElementById('lastDate'),'dd/mm/yyyy',this)"
															readonly="readonly" name="date" placeholder="Date"
															value="<%=todays_date2%>" style="margin-left: -162px;">
													</div>
													
													
													<div class="col-sm-1">
														<input type="button" onclick="getAllBloodRequestSampleDispatchList()"	class="btn btn-primary" value="Show">
													</div>
																
																
															</div>
														</div>
												

												<div class="clearfix"></div>
											</div>
                                      <!------------ End view Document Modal-----------------  -->
						
						
						           	<!------------ Start view Document Modal-----------------  -->
													<div class="modal fade bs-example-modal-lg" style="margin-top: 20px"
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
											
											
										 	<div class="panel panel-primary" > 
												<div class="panel-heading" id="divEhatContent">Sample
													Dispatch List</div>
												<div class="panel-body"
													style="overflow: auto; height: 300px">
													<div class="collected-consent-data">
														<div class="block-heading"></div>
													</div>
													<div class="collected-data-table">
														<table class="table table-bordered table-striped">
															<thead id="ehatTHead">
																<tr>
																	<th class="col-md-1 center">Sr. No.</th>
																	<th class="col-md-1 center">Request Dispatch Id</th>
																	<th class="col-md-1 center">Blood Request Id</th>
																	<th class="col-md-1 center">Patient Name</th>
																	<th class="col-md-1 center">Dispatch Date </th>
																	<!-- <th class="col-md-1 center">sample ItemName </th> -->
																	<!-- <th class="col-md-1 center">Status </th> -->
																																		

																</tr>
															</thead>

															<tbody id="bloodrequestdispatchhlist">
															</tbody>
														</table>


													</div>
												</div>
											</div>


											<div class="clearfix"></div>
										</div>
									</div>

								</div>
							</div>
						<!-- </div> -->
							</div>
								</div> 
						
						
						<div class="footer-tools">
							<span class="go-top">
								<i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
					<!-- </div> -->
					<!-- /CONTENT-->
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
	<input type="hidden" id="priority" value="0" />
	<input type="hidden" id="sampleDispatchId" value="0" />
	<input type="hidden" value="sample_dispatch" id="callform" />
	<!-- /JAVASCRIPTS -->
	
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>