<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Blood Issue</title>
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
										<a href="bb_blood_issue.jsp">Blood Issue</a></li>
											<li class="pull-right">
									<button class="btn btn-xs btn-info pull-right" style="float: right;" type="button" id="expandDonor" onclick="toggleBloodIssue()">
										<i class="fa fa-plus"></i> NewBloodIssue
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
								
									<div class="panel-body">
									 <div action="#" method="POST"  id="divForBloodIssue">
								<div class="header-bag-search">
									<div class="col-md-4 header-search-bag-no" id="header_search_donor">
										<div class="form-group">
										<div class="form-group" id="divtext_search_sample_dispatch">
											<input type="text" class="form-control" name="search_donor" placeholder="Search Blood Request ID" id="search_request_id" onkeyup="searchPatientDetailsById(this.value,'bloodIssue')">
											</div>
										</div>
									</div>

									<div class="clearfix"></div>
								</div>		


			<!-- ============================================================================== -->
			<!-- START:Blood Issue -->
			<!-- ============================================================================== -->

							    		<div class="row">

											<div class="col-md-12" id="divForEntry">
													
													<div class="panel panel-primary">
														<div class="panel-heading">Blood Issue</div>
														<div class="panel-body">
																					<div class="function-buttons" style="float: right;">
							<div class="buttons">
								<button type="submit" class="btn btn-success" onclick="saveBloodIssue()"><i class="fa fa-save"></i> Save</button>
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
												<input type="text" class="form-control" name="user_title" id="title" placeholder="Title">
												 	<!-- <option value="Mr">Mr</option>
												 	<option value="Mrs">Mrs</option>
												</select> -->
											</div>
										</div>
										<div class="col-md-2">
											<div class="form-group">	
											<input type="text" name="first_name" class="form-control" placeholder="First name" id="first_name">
											</div>
										</div>
										<div class="col-md-2">
											<div class="form-group">	
											<input type="text" name="middle_name" class="form-control" placeholder="Middle name" id="middle_name">
											</div>
										</div>
										<div class="col-md-2">
											<div class="form-group">	
											<input type="text" name="last_name" class="form-control" placeholder="Last name" id="last_name">
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
												<input type="text" name="contact1" class="form-control" placeholder="Contact number 1" maxlength="10" id="contact1">
											</div>											
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="contact2" class="form-control" placeholder="Contact number 2" maxlength="10" id="contact2">
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
												<input type="text" name="age" class="form-control" placeholder="Age" id="age">
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
												<label><input type="radio" name="gender" value="1" id="gender"> Male</label>
											</div>											
										</div>
										<div class="col-md-1">
											<div class="form-group">
												<label><input type="radio" name="gender" value="2" id="gender"> Female</label>
											</div>											
										</div>
										<div class="col-md-1">
											<div class="form-group">
												<label><input type="radio" name="gender" value="3" id="gender"> Other</label>
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
												<input type="text" name="blood_group" class="form-control" placeholder="Blood group" id="blood_group">
											</div>											
										</div>
										<div class="col-md-2">
											<label>
												Hemoglobin
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="haemoglobin" class="form-control" placeholder="Hemoglobin" id="haemoglobin">
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
												<input type="text" name="height" class="form-control" placeholder="Height" id="height">
											</div>											
										</div>
										<div class="col-md-2">
											<label>
												Weight
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="weight" class="form-control" placeholder="Weight" id="weight">
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
												<input type="text" name="ward_name" class="form-control" placeholder="Ward name" id="ward_name">
											</div>											
										</div>
										<div class="col-md-2">
											<label>
												Bed number
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="bed_number" class="form-control" placeholder="Bed number" id="bed_number">
											</div>											
										</div>
									</div>

			
	<!-- =================================================================================================== -->
	<!-- Table for incoming data -->
	<!-- =================================================================================================== -->

						<div class="cross-match-result">
							<!-- <div class="block-heading">
								<h2>Cross Match Result</h2>
							</div> -->
							<div class="row" style="padding: 10px 0 5px;">
										<div class="col-md-2">
											<label style="color: #2874A6;font-size: 15px">
												Cross Match Result
											</label>
										</div>
									</div>
							<div class="block-body">
		
		<div class="row">
			<div class="table-responsive data-for-data-table col-md-12">
				<table id="data-table" class="table table-striped table-bordered" style="width:100%">
					<thead> 
						<th>Priority</th>
						<th>Component Name</th>
						<th>Blood Bag</th>
						<th>Available Quantity</th>
						<th>Required Quantity</th>
						<th>Expiry Date</th>
						<th>Compatibility Remark</th>
						<th>Compatibility Type</th>
					</thead>
					<tbody id="crossResult">
					
					</tbody>
				</table>
			</div>
		</div>

							</div>
						</div>

	<!-- =================================================================================================== -->
	<!-- =================================================================================================== -->

			
	<!-- =================================================================================================== -->
	<!-- Table for incoming data -->
	<!-- =================================================================================================== -->

						<div class="cross-match-result">
							<div class="row" style="padding: 10px 0 5px;">
										<div class="col-md-2">
											<label style="color: #2874A6;font-size: 15px">
												Components Data Table
											</label>
										</div>
									</div>
							<div class="block-body">

		<div class="row">
			<div class="table-responsive data-for-data-table col-md-12">
				<table id="data-table" class="table table-striped table-bordered" style="width:100%">
					<thead> 
						<th style="width: 15%">Component Name</th>
						<th style="width: 20%">Blood Bag</th>
						<th style="width: 20%">Expiry Date</th>
						<th style="width: 15%">Available Quantity</th>
						<th style="width: 15%">Issue Quantity</th>
						<th style="width: 25%">Remark</th>
					</thead>
					<tbody id="issueDetails">
										</tbody>
				</table>
			</div>
		</div>

							</div>
						</div>

	<!-- =================================================================================================== -->
	<!-- =================================================================================================== -->




		<!-- <div class="row">
			<div class="col-md-2">
				<label>
					Remark
				</label>
			</div>
			<div class="col-md-5">
				<div class="form-group">
					<textarea class="form-control" name="remarks" rows="5" placeholder="Rremarks"></textarea>
				</div>
			</div>
		</div> -->

			</div>


														</div> 
													</div>
																
											</div>																					
							    		</div>
							    	</div>
			<!-- ============================================================================== -->
			<!-- END:Blood Issue -->
			<!-- ============================================================================== -->

	                             </div>					
									
								</div>

							
					
						
						 					<div class="col-md-12">
								<div class="panel panel-default">
								<div class="panel-body">
                                    <div class="header-bag-search">
									<div class="col-md-3 header-search-bag-no" id="header_search_donor">
										<div class="form-group">
										<div class="form-group" id="divtext_search_bloodRequest">
											<input type="text" class="form-control" name="search_donor" id="search_donorrequester_id" placeholder="Search Request ID" onkeyup="searchDonorRequesterDetailsById(this.value,'bloodIssueList')">
										</div>
										</div>
									</div>

									<div class="clearfix"></div>
								</div>		

		
	     <div class="panel panel-primary" id="pape"
			style="margin-top: 20px">
			<div class="panel-heading" id="divEhatContent">BloodIssue List</div>
			<div class="panel-body"
			style="overflow: auto; height: 300px">
			<table id="ehatTable" cellpadding="0" cellspacing="0"
				border="0"
				class="datatable table table-striped table-bordered">
				<thead id="ehatTHead">
					<thead> 
					     <th>Sr.No</th> 
					    <th>CrossMatch Id</th>
					    <th>BloodRequest Id</th>
						<th>Component Name</th>
						<th>Blood Bag</th>
						<th>Required Quantity</th>
						<th>Requisition Quantity</th>
						<th>Expiry Date</th>
						<th>Issue Quantity</th>
						<th>Issue Remark</th>
						<th>Edit</th>
						<th>Delete</th>
					</thead>
					<tbody id="issueDetailsList">
					</tbody>
				</table>
			</div>
		</div>
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
			
			getAllBloodIssueList();
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
	
	<!-- /JAVASCRIPTS -->
	
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>