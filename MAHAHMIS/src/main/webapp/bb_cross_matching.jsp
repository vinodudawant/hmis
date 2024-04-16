<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Blood Request Cross Matching</title>
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
										<a href="bb_cross_matching.jsp">Blood Request Cross Matching</a>	
										</li>
									<li class="pull-right">
	                               <button class="btn btn-xs btn-info pull-right" style="float: right;" type="button" id="expandDonor" onclick="toggleBloodRequestCrossMatch()">
									<i class="fa fa-plus"></i> NewRequestCrossMatch
									</button>
                                        </li>
						
									</ul>
									<!-- /BREADCRUMBS -->
									<div class="clearfix"></div>
								</div>
							</div>
						</div>
						<!-- /PAGE HEADER -->
						<div class="function-buttons" style="float: right;">
							<!-- <div class="buttons">
								<button type="submit" class="btn btn-success"><i class="fa fa-save"></i> Save</button>
								<button type="button" class="btn btn-danger"> Cancel</button>
							</div> -->
						</div>
						<!-- SAMPLE -->
						<div class="row">
                          <div class="row">
							<!-- NEW ORDERS -->
							<div class="col-md-12">
								<div class="panel panel-default">
							<div action="#" method="POST"  id="divForRequestCrossMatch">		
									<div class="panel-body">

								<div class="header-bag-search">
									<div class="col-md-4 header-search-bag-no" id="header_search_donor">
										<div class="form-group">
										<div class="form-group" id="divtext_search_sample_dispatch">
											<!-- <input type="text" class="form-control" name="search_donor" placeholder="Search Request ID" id="search_request_id" onkeyup="searchPatientDetailsById(event, this.id,'crossMatch')"> -->
									    	<input type="text" class="form-control" name="search_donor" placeholder="Search Request ID" id="search_request_id" onkeyup="searchPatientDetailsById(this.value,'crossMatch')">
											
											</div>
										</div>
									</div>

									<div class="clearfix"></div>
								</div>		


			<!-- ============================================================================== -->
			<!-- START:Cross Matching -->
			<!-- ============================================================================== -->

							    		<div class="row">

											<div class="col-md-12" id="divForEntry">
													
													<div class="panel panel-primary">
														<div class="panel-heading">Cross Matching</div>
														<div class="panel-body">
															
								<div action="#" method="POST">
									<div class="row">
										<div class="col-md-2">
											<label>
												Patient Name
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">												
												<input type="text" class="form-control" name="user_title" id="title">
												 	<!-- <option value="Mr">Mr</option>
												 	<option value="Mrs">Mrs</option>
												</select> -->
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">	
											<input type="text" name="first_name" class="form-control" placeholder="First name" id="ci_fname">
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">	
											<input type="text" name="middle_name" class="form-control" placeholder="Middle name" id="ci_mname">
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">	
											<input type="text" name="last_name" class="form-control" placeholder="Last name" id="ci_lname">
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
												<input type="text" name="contact1" id="ci_contactno1" class="form-control" placeholder="Contact number 1" maxlength="10">
											</div>											
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="contact2" id="ci_contactno2" class="form-control" placeholder="Contact number 2" maxlength="10">
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
												<input type="text" name="age" id="ci_age" class="form-control" placeholder="Age">
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
												<label><input type="radio" id="ci_gender" name="ci_gender" value="1"> Male</label>
											</div>											
										</div>
										<div class="col-md-1">
											<div class="form-group">
												<label><input type="radio" id="ci_gender" name="ci_gender" value="2"> Female</label>
											</div>											
										</div>
										<div class="col-md-1">
											<div class="form-group">
												<label><input type="radio" id="ci_gender" name="ci_gender" value="3"> Other</label>
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
												<input type="text" id="ci_bloodgroup" name="blood_group" class="form-control" placeholder="Blood group">
											</div>											
										</div>
										<div class="col-md-2">
											<label>
												Hemoglobin
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="haemoglobin" id="ci_haemoglobin" class="form-control" placeholder="Hemoglobin">
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
												<input type="text" name="height" id="ci_height" class="form-control" placeholder="Height">
											</div>											
										</div>
										<div class="col-md-2">
											<label>
												Weight
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="weight" id="ci_weight" class="form-control" placeholder="Weight">
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
												<input type="text" name="ward_name" id="ci_wardname" class="form-control" placeholder="Ward name">
											</div>											
										</div>
										<div class="col-md-2">
											<label>
												Bed number
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="bed_number" id="ci_bedno" class="form-control" placeholder="Bed number">
											</div>											
										</div>
									</div>


								</div>


														</div> 
													</div>
																
											</div>																					
							    		</div>
							    
			<!-- ============================================================================== -->
			<!-- END:Cross Matching -->
			<!-- ============================================================================== -->

<div class="row">

		<div class="col-md-12" id="divForEntry" style="margin: 15px 0 0">
													
			<div class="panel panel-primary">
				<div class="panel-heading">Requested Component</div>
				<div class="panel-body">
                                <div class="function-buttons" style="float: right;">		
					<div class="button-submit">
						<button type="button" class="btn btn-primary" onclick="saveCrossMatch()">Add</button>
					</div>
				</div>			
			
                 
		<div class="row">
			<div class="table-responsive data-with-table col-md-5" style="padding: 20px ">
				<table class="table table-bordered table-hover" id="table" >
					<thead> 
						<th>Component Name</th>
						<th>Volume (ml)</th>
					</thead>
					<tbody id="requestComponentDetails">
						<!-- <tr>
							<td>Plasma</td>
							<td>
								<input type="text" class="form-control" name="volume[]" value="200">
							</td>
							
						</tr>
						<tr>
							<td>FFP</td>
							<td>
								<input type="text" class="form-control" name="volume[]" value="50">
							</td>							
						</tr>
						<tr>
							<td>R-cell</td>
							<td>
								<input type="text" class="form-control" name="volume[]" value="150">
							</td>							
						</tr> -->
					</tbody>
				</table>
			</div>
		</div>

		<div class="request-component-form">
			<div class="row" style="padding: 10px ">
				<div class="col-md-2">
					<label>
						Select Component
					</label>
				</div>
				<div class="col-md-3">
					<div class="form-group">
						<select class="form-select" name="component_select" id="requested_component" onclick>
							<option value="">- Select component -</option>
						</select>
					</div>
				</div>
			</div>

			<div class="row" style="padding: 10px ">
				<div class="col-md-2">
					<label>
						Select Blood Bag
					</label>
				</div>
				<div class="col-md-3">
					<div class="form-group">
						<select class="form-select" name="component_select" id="component_select">
						
						</select>
					</div>
				</div>
				<div class="col-md-3">
					<div class="form-group">
						<input type="text" class="form-control" name="component_name" placeholder="Component name" id="component_name">
					</div>
				</div>
				<div class="col-md-3">
					<div class="form-group">
						<input type="text" class="form-control" name="component_volume" placeholder="Component volume" id="component_volume">
					</div>
				</div>
				<div class="col-md-3">
					<div class="form-group">
						<input type="date" class="form-control" id="expiry_date" name="expiry_date"> (<small>Expiry date</small>)
					</div>
				</div>
			</div>

			<div class="row" style="padding: 10px ">
				<div class="col-md-2">
					<label>
						Required Quantity
					</label>
				</div>
				<div class="col-md-3">
					<div class="form-group">
						<input type="text" class="form-control" name="required_qnty" placeholder="Required quantity" id="required_qnty">
					</div>
				</div>
			</div>		

			<div class="row" style="padding: 10px ">
				<div class="col-md-2">
					<label>
						Date and Time
					</label>
				</div>
				<div class="col-md-3">
					<div class="form-group">
						<input type="date" class="form-control" name="date_time_requested_component" id="date">
					</div>
				</div>
			</div>			

			<div class="row" style="padding: 10px ">
				<div class="col-md-2">
					<label>
						Compatible Type
					</label>
				</div>
				<div class="col-md-3">
					<div class="form-group">
						<select class="form-select" name="compatible_type" id="compatible_type">
							<!-- <option value="">- Select compatible type -</option>
								<option value="minor">Minor</option>
								<option value="major">Major</option> -->
						</select>
					</div>
				</div>
			</div>		

			<div class="row" style="padding: 10px ">
				<div class="col-md-2">
					<label>
						Compatible Remark
					</label>
				</div>
				<div class="col-md-5">
					<div class="form-group">
						<textarea class="form-control" id="compatible_remark" name="compatible_remark" rows="5" placeholder="Compatible remark"></textarea>
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


						<div class="col-md-12">
								<div class="panel panel-default">
								<div class="panel-body">
								
								
							<!-- <div action="#" method="POST"  id="divForRequestCrossMatch">		
									<div class="panel-body"> -->

                                    <div class="header-bag-search">
									<div class="col-md-3 header-search-bag-no" id="header_search_donor">
										<div class="form-group">
										<div class="form-group" id="divtext_search_bloodRequest">
											<input type="text" class="form-control" name="search_donor" id="search_donorrequester_id" placeholder="Search Request ID" onkeyup="searchDonorRequesterDetailsById(this.value,'crossMatchList')">
										</div>
										</div>
									</div>

									<div class="clearfix"></div>
								</div>		

								
			<!-- <div class="table-responsive data-for-data-table col-md-12">
		
				<table id="inline-edit-data-table"></table>
				<div id="inline-edit-data-table-widgets"></div>

			</div> -->
			 <div class="table-responsive data-with-table">
				 <table class="table table-bordered  table-hover" id="table"> 
			<!--	<div class="table-responsive data-for-data-table col-md-12">
				<table id="table" class="table table-striped table-bordered" style="width:100%"> --><!-- Added By Annapurna  -->
					<thead> 
					     <th>Sr.No</th> 
						<th>Component Name</th>
						<th>Blood Bag</th>
						<th>Available Quantity</th>
						<th>Required Quantity</th>
						<th>Expiry Date</th>
						<th>Compatibility Type</th>
						<th>Compatibility Remark</th>
						<th>Edit</th>
						<th>Delete</th>
					</thead>
					<tbody id="crossMatchDetails">
					</tbody>
				</table>
			</div>
		</div>
			</div>
			</div>
				<!-- </div> -->
				



						<!-- /SAMPLE -->
						<div class="footer-tools">
							<span class="go-top">
								<i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
					<!-- </div>  --><!-- /CONTENT-->
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
			//getRequestComponentDetailsByID(); 
			getAllCompatibilityType();	
			getAllCrossMatchList();
			
			$("#compatible_type").select2();
		//	$("#requested_component").select2();
		//	$("#component_select").select2();
	
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
	<input type="hidden" id="crossmatchId" value="0" />
	<input type="hidden" id="bloodRequestId" value="0" />
	<input type="hidden" id="requstId" value="0" />
	 <input id="callfrom" type="hidden" value="save" />
	<!-- /JAVASCRIPTS -->
	
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>