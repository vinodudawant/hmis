<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Transfusion Reaction</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<%@include file="inv_header.jsp"%>

<!-- include js for development -->
<script type="text/javascript" src="js/users.js"></script>
<script type="text/javascript" src="js/blood_bank.js"></script>
<script type="text/javascript" src="js/blood_issue.js"></script>
<script type="text/javascript" src="js/bb_test_master.js"></script>
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
										<a href="bb_transfusion_reaction.sjsp">Transfusion Reaction</a></li>
																				<li class="pull-right">
									<button class="btn btn-xs btn-info pull-right" style="float: right;" type="button" id="expandDonor" onclick="toggleBloodTransfusion()">
										<i class="fa fa-plus"></i> NewBloodTransfusion
									</button>
                                        </li>
										
									</ul>
									<!-- /BREADCRUMBS -->
									<div class="clearfix"></div>
								</div>
							</div>
						</div>
						<!-- /PAGE HEADER -->
						<!-- SAMPLE -->
                      <div class="row">
                           <div class="row">
							<!-- NEW ORDERS -->
							<div class="col-md-12">
								<div class="panel panel-default">
									<div class="panel-body">
									 <div action="#" method="POST"  id="divForBloodTransfusion">
								<div class="header-bag-search">
									<div class="col-md-4 header-search-bag-no" id="header_search_donor">
										<div class="form-group">
										<div class="form-group" id="divtext_search_sample_dispatch">
											<input type="text" class="form-control" name="search_donor" id="search_request_id" placeholder="Search Blood Request Number" onkeyup="searchPatientDetailsById(this.value,'transfusion')">
											</div>
										</div>
									</div>

									<div class="clearfix"></div>
								</div>		


			<!-- ============================================================================== -->
			<!-- START:Transfusion Reaction -->
			<!-- ============================================================================== -->

							    		<div class="row">

											<div class="col-md-12" id="divForEntry">
													
													<div class="panel panel-primary">
														<div class="panel-heading">Transfusion Reaction</div>
														<div class="panel-body">
																<div class="function-buttons" style="float: right;">
							     <div class="buttons">
							     <button type="button" class="btn btn-primary" onclick="addtransfusiuon()">Add</button>
							<!-- 	<button type="submit" class="btn btn-success" onclick="saveObservation()"><i class="fa fa-save"></i> Save</button> -->
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
												<input type="text" class="form-control" name="title" id="title"placeholder="Title">
												 	<!-- <option value="Mr">Mr</option>
												 	<option value="Mrs">Mrs</option>
												</select> -->
											</div>
										</div>
										<div class="col-md-2">
											<div class="form-group">	
											<input type="text" name="first_name" class="form-control" placeholder="First name" id="tr_fname">
											</div>
										</div>
										<div class="col-md-2">
											<div class="form-group">	
											<input type="text" name="middle_name" class="form-control" placeholder="Middle name" id="tr_mname">
											</div>
										</div>
										<div class="col-md-2">
											<div class="form-group">	
											<input type="text" name="last_name" class="form-control" placeholder="Last name" id="tr_lname">
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
												<input type="text" name="contact1" class="form-control" placeholder="Contact number 1" maxlength="10" id="tr_contact1">
											</div>											
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="contact2" class="form-control" placeholder="Contact number 2" maxlength="10" id="tr_contact2">
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
												<input type="text" name="age" class="form-control" placeholder="Age" id="tr_age">
											</div>											
										</div>
									</div>

									<div class="row" style="padding: 10px 0;">
										<div class="col-md-2">
											<label>
												gender
											</label>
										</div>
										<div class="col-md-1">
											<div class="form-group">
												<label><input type="radio" name="tr_gender" id="tr_gender" value="1"> Male</label>
											</div>											
										</div>
										<div class="col-md-1">
											<div class="form-group">
												<label><input type="radio" name="tr_gender" id="tr_gender" value="2"> Female</label>
											</div>											
										</div>
										<div class="col-md-1">
											<div class="form-group">
												<label><input type="radio" name="tr_gender" id="tr_gender" value="3"> Other</label>
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
												<input type="text" name="blood_group" class="form-control" placeholder="Blood group" id="tr_bloodgroup">
											</div>											
										</div>
										<div class="col-md-2">
											<label>
												Haemoglobin
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="haemoglobin" class="form-control" placeholder="Haemoglobin" id="tr_haemoglobin">
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
												<input type="text" name="height" class="form-control" placeholder="Height" id="tr_height">
											</div>											
										</div>
										<div class="col-md-2">
											<label>
												Weight
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="weight" class="form-control" placeholder="Weight" id="tr_weight">
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
												<input type="text" name="ward_name" class="form-control" placeholder="Ward name" id="tr_wardname">
											</div>											
										</div>
										<div class="col-md-2">
											<label>
												Bed number
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="bed_number" class="form-control" placeholder="Bed number" id="tr_bedno">
											</div>											
										</div>
									</div>


								


														</div> 
													</div>
																
											</div>																					
							    		</div>
			<!-- ============================================================================== -->
			<!-- END:Transfusion Reaction -->
			<!-- ============================================================================== -->

<div class="row">

		<div class="col-md-12" id="divForEntry" style="margin: 15px 0 0">
													
			<div class="panel panel-primary">
				<div class="panel-heading">Transfusion Details</div>
				<div class="panel-body">

	<form action="#">

		<div class="row">
			<div class="table-responsive data-with-table col-md-12">
				<table class="table table-bordered table-hover" id="table">
					<thead> 
						<!-- <th>Select</th> -->
						<th>Component Name</th>
						<th>Blood Bag</th>
						<th>Expiry Date</th>
						<th>Available Quantity</th>
						<th>Issue Quantity</th>
						<th>Compatibility Type</th>
					</thead>
					<tbody id="transfusionDetails">
					</tbody>
				</table>
			</div>
		</div>

		<div class="request-component-form">
			<div class="row">
				<div class="col-md-2">
					<label>
						Transfusion Start Time
					</label>
				</div>
				<div class="col-md-3">
					<div class="form-group">
						<input type="datetime-local" class="form-control" name="trans_start_time" id="trans_start_time">
					</div>
				</div>

				<div class="col-md-2">
					<label>
						Rate of Transfusion
						(<small> Drop per minute </small>)
					</label>
				</div>
				<div class="col-md-3">
					<div class="form-group">
						<!-- <input type="text" class="form-control" name="rate_of_transfusion"  id="rate_of_transfusion"> -->
						<select class="form-select" name="rate_of_transfusion" id="rate_of_transfusion">
						<option value="0">--Select--</option>
						</select>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-2">
					<label>
						Transfusion End Time
					</label>
				</div>
				<div class="col-md-3">
					<div class="form-group">
						<input type="datetime-local" class="form-control" name="trans_end_time" id="trans_end_time">
					</div>
				</div>

				<div class="col-md-2">
					<label>
						Blood Transfusion Quantity
						(<small> ml </small>)
					</label>
				</div>
				<div class="col-md-3">
					<div class="form-group">
						<input type="text" class="form-control" name="transfusion_quantity"  id="transfusion_quantity">
					</div>
				</div>
			</div>			
			

		</div>	
	</div>

<!-- 		<div class="row">
			<div class="table-responsive data-with-table col-md-12">
				<table class="table table-bordered table-hover" id="table">
					<thead> 
						<th>Select</th>
						<th>Component Name</th>
						<th>Blood Bag</th>
						<th>Expiry Date</th>
						<th>Available Quantity</th>
						<th>Issue Quantity</th>
						<th>Compatibility Type</th>
						<th>Transfusion Start time</th>
						<th>Transfusion End Time</th>
						<th>Rate of Transfusion</th>
						<th>Transfusion Quantity</th>
						<th>Edit</th>
						<th>Delete</th>
					</thead>
					<tbody id="addedtransfusionDetails">

					</tbody>
				</table>
			</div>
		</div>
 -->

		<div class="row">
			<div class="table-responsive data-with-table col-md-12">
				<table class="table table-bordered table-hover" id="table">
					<thead> 
						<th>Observations</th>
						<th>Pre-Transfusion</th>
						<th>During Transfusion</th>
						<th>Post Transfusion</th> 
					</thead>
					<tbody id="observationDetails">
						<tr>	
							<td>
								<input type="text" class="form-control" name="observations" id="observations1" value="Pulse">
							</td>			
							<td>
								<input type="text" class="form-control" name="pre_transfusion" id="pre_transfusion1">
							</td>		
							<td>
								<input type="text" class="form-control" name="during_transfusion" id="during_transfusion1">
							</td>			
							<td>
								<input type="text" class="form-control" name="post_transfusion" id="post_transfusion1">
							</td>			
						</tr>

						<tr>	
							<td>
								<input type="text" class="form-control" name="observations" id="observations2" value="Tempreature">
							</td>			
							<td>
								<input type="text" class="form-control" name="pre_transfusion" id="pre_transfusion2" >
							</td>		
							<td>
								<input type="text" class="form-control" name="during_transfusion" id="during_transfusion2" >
							</td>			
							<td>
								<input type="text" class="form-control" name="post_transfusion" id="post_transfusion2">
							</td>			
						</tr>

						<tr>	
							<td>
								<input type="text" class="form-control" name="observations" id="observations3" value="B.P">
							</td>			
							<td>
								<input type="text" class="form-control" name="pre_transfusion" id="pre_transfusion3">
							</td>		
							<td>
								<input type="text" class="form-control" name="during_transfusion" id="during_transfusion3" >
							</td>			
							<td>
								<input type="text" class="form-control" name="post_transfusion" id="post_transfusion3">
							</td>			
						</tr>

					</tbody>
				</table>
			</div>
		</div>

		
		<div class="row">
			<div class="col-md-1">
				<label>
					Remark
				</label>
			</div>
			<div class="col-md-5">
				<div class="form-group">
					<textarea class="form-control" name="remarks" rows="5" placeholder="Rremarks" id="remark"></textarea>
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
      
     
      
      					<div class="col-md-12">
								<div class="panel panel-default">
								<div class="panel-body">
								
								
							<!-- <div action="#" method="POST"  id="divForRequestCrossMatch">		
									<div class="panel-body"> -->

                                    <div class="header-bag-search">
									<div class="col-md-3 header-search-bag-no" id="header_search_donor">
										<div class="form-group">
										<div class="form-group" id="divtext_search_bloodRequest">
											<input type="text" class="form-control" name="search_donor" id="search_donorrequester_id" placeholder="Search Request ID" onkeyup="searchDonorRequesterDetailsById(this.value,'transfusionList')">
										</div>
										</div>
									</div>

									<div class="clearfix"></div>
								</div>		

								
			 <div class="table-responsive data-with-table">
				 <table class="table table-bordered  table-hover" id="table"> 
				<!-- Added By Annapurna  -->
					<thead> 
					    <!--  <th>Sr.No</th>  -->
					     <th> Transfusion Id </th>
						<th>CrossMatch Id</th>
						<th>Request Id</th>
						<th>Component Name</th>
						<th>Blood Bag</th>
						<th>Expiry Date</th>
						<th>Available Quantity</th>
						<th>Issue Quantity</th>
						<th>Transfusion Quantity</th>
						<th>Edit</th>
						<th>Delete</th>
					</thead>
					<tbody id="addedtransfusionDetails">
					</tbody>
				</table>
			</div>
		</div>
			</div>
			</div>
			 </div>
		      </div>


      

						<!-- /SAMPLE -->
						<div class="footer-tools">
							<span class="go-top">
								<i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
					</div><!-- /CONTENT-->
				</div>
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
			getAllBloodTransfusionList();
			//getAllCrossMatch();
			getAllTransfusion();
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
	<input type="hidden" id="transfusionId" value="0" />
	<input type="hidden" id="crossMatchId" value="0" />
	<input type="hidden" id="callform" value="transfusion" />
	
	<!-- /JAVASCRIPTS -->
	
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>