<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Donor Blood Bag Collection</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<%@include file="inv_header.jsp"%>

<!-- TYPEHEAD -->
		<script type="text/javascript"
			src="ehat-design/js/typeahead/typeahead.min.js"></script>
			
			<!-- TYPEAHEAD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/typeahead/typeahead.css" />
	
	<!-- CUSTOM SCRIPT -->
		<script src="ehat-design/js/script.js"></script>
		<script src="auto/jquery.mockjax.js"></script>
		<script src="auto/bootstrap-typeahead.js"></script>

<!-- include js for development -->
<script type="text/javascript" src="js/users.js"></script>
<script type="text/javascript" src="js/blood_bank.js"></script>
<script type="text/javascript" src="js/bb_donor_registration_checkuplist.js"></script>
<script type="text/javascript" src="js/bb_blood_collection.js"></script>
<script type="text/javascript" src="js/patient_management.js"></script>


<!--  <script type="text/javascript">
	onload = function() {
		defaultFetchPatientTitle("checkuplist");
		getBloodDonorTreatmentDetailsById($("#donorId1").val(),$("#callform").val());
		//clearBloodBag();
	}
	</script>
	-->


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
										
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><i class="fa fa-home"></i> <a href="bb_blood_bag_collection.jsp">Donor Blood Bag Collection</a></li>
									<button class="btn btn-xs btn-info pull-right" style="float: right;" type="button" id="expandDonor" onclick="toggleBloodBagCollectionListDiv()">
										<i class="fa fa-plus"></i> Blood Bag Collection
									</button>
                                       </li>
										
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>
							
							
								<div class="row">
	
								<!-- NEW ORDERS -->
								<div class="col-md-12">
								
									<div class="panel panel-default">
										<div class="panel-body">
	

								  <div class="tab-content">
									
									<!-- ============================================================================== -->
									<!-- START:Menu1 -->
									<!-- ============================================================================== -->
								   <!--  <div id="menu1" class="tab-pane fade"> -->
								    	<!-- <div class="row"> -->
											
								    
									
									<!-- ============================================================================== -->
								    <!-- START:Blood Bag Details Form -->
									<!-- ============================================================================== -->
						
								  <!--   <div id="menu2" class="tab-pane fade"> -->
								    	<div class="row">
											<div class="col-md-12" id="divForEntry">
												
												<div  method="POST" id="diveForEntryBloodBagCollection" style="display: none">
																							
																	<div class="panel panel-primary" >
													<div class="panel-heading">Blood Bag Details</div>				
														<div class="panel-body" >
													
													
														<div class="buttons">
																		<button type="submit" class="btn btn-success " style="float: right;" onclick="saveBloodBagDetails()"><i class="fa fa-save"></i> Save</button>
																	</div>
															<form action="#" method="POST">
																<div class="row">
																	<div class="col-md-2">
																		<label>
																			<span class="required-text-Danger">*</span> Donor Name
																		</label>
																	</div>
																	<div class="col-sm-2">
																		<div class="form-group">	
																				<input type="text" name="user_title" id="title" class="form-control" placeholder="Title">									
																			<!-- <Input type="text"  id="title" name="user_title" style="width: 100%" placeholder="Title"> -->
																			 	<!-- <option value="Mr">Mr</option>
																			 	<option value="Mrs">Mrs</option>  </select> -->
																			
																		</div>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">	
																		<input type="text" name="first_name" id="blood_first_name" class="form-control" placeholder="First name">
																		</div>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">	
																		<input type="text" name="middle_name" id="blood_middle_name" class="form-control" placeholder="Middle name">
																		</div>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">	
																		<input type="text" name="last_name" id="blood_last_name" class="form-control" placeholder="Last name">
																		</div>
																	</div>
																</div>
							
																<div class="row">
																	<div class="col-md-2">
																		<label>
																			Type of blood bag
																		</label>
																	</div>
																	<div class="col-md-4">
																		<div class="form-group">
																			<select class="form-select" id="type_of_blood_bag" name="type_of_blood_bag">
																				<!-- <option value="">Type of blood bag</option>
																				<option value="1">ABC</option>
																				<option value="2">xyz</option> -->
																			</select>
																		</div>											
																	</div>
																</div>
							
																<div class="row">
																	<div class="col-md-2">
																		<label>
																			Blood bag details
																		</label>
																	</div>
																	<div class="col-md-4">
																		<div class="form-group">
																			<select class="form-select" id="blood_bag_details" name="blood_bag_details">
																				<!-- <option value="">Available bag number from stock</option>
																				<option value="BAG001">BAG001</option>
																				<option value="BAG002">BAG002</option>
																				<option value="BAG005">BAG005</option> -->
																			</select>
																		</div>											
																	</div>
																</div>
							
																<div class="row">
																	<div class="col-md-2">
																		<label>
																			Blood group
																		</label>
																	</div>
																	<div class="col-md-4">
																		<div class="form-group">
																			<select class="form-select" id="blood_group" name="blood_group">
																				<option value="0">Blood group</option>
															
																			</select>
																		</div>											
																	</div>
																</div>
							
																<div class="row">
																	<div class="col-md-2">
																		<label>
																			Collected By
																		</label>
																	</div>
																	<div class="col-md-4">
																		<div class="form-group">
																			 <select class="form-select" id="collected_by" name="collected_by">
																				<option value="0">--Select Doctor--</option>
																				
																			</select>
																			<!-- <select class="form-control typeahead sss"
																					style="border: nimmunizationChartsone; outline: none;"
																					title="Please enter doctor" id="collected_by">
																						<option value="">--Select--</option>
																				
																				</select> -->
																		</div>											
																	</div>
																</div>
							
																<div class="row">
																	<div class="col-md-2">
																		<label>
																			Blood Item Name
																		</label>
																	</div>
																	<div class="col-md-4">
																		<!-- <div class="form-group">
																			<select class="form-select" id="blood_item_name" name="blood_item_name">
																				<option value="">Item namee</option>
																				<option value="1">Item name1</option>
																				<option value="2">Item name2</option>
																			</select>
																		</div> -->	
																		
																		<div class="form-group">
																			<select class="form-select" id="blood_item_name" name="blood_item_nam" >
																				<option value="0">SELECT</option>
																			</select>
																		</div>	
																		
																											
																	</div>
																</div>
							
																<div class="row">
																	<div class="col-md-2">
																		<label>
																			Volume of Collection (ml)
																		</label>
																	</div>
																	<div class="col-md-4">
																		<div class="form-group">
																			<input type="text" class="form-control" id="volume_of_collection" name="volume_of_collection" placeholder="Volume of collection">
																		</div>											
																	</div>
																</div>
																
																<div class="row">
																	<div class="col-md-2">
																		<label>
																			No of Barcode
																		</label>
																	</div>
																	<div class="col-md-4">
																		<div class="form-group">
																			<input type="text" class="form-control" id="no_of_barcode" name="no_of_barcode" placeholder="No of barcode">
																		</div>											
																	</div>
																</div>
							
																<div class="row">
																	<div class="col-md-2">
																		<label>
																			Remarks
																		</label>
																	</div>
																	<div class="col-md-4">
																		<div class="form-group">
																			<textarea name="blood_bag_details_remarks" id="blood_bag_details_remarks" class="form-control" rows="5" placeholder="Remarks"></textarea>
																		</div>											
																	</div>
																</div>
							
															</form>
														</div> 
													</div>
												</div>																					
								    		</div>
								    		</div>
								    		
								    		
								    <!-- </div> -->
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
																									<div class="header-form-details">
												<div class="col-md-4 header-search-donor" id="header_search_donor_collection" >
											<div class="form-group" id="divtext_search_name_collection">
												<input type="text" class="form-control" id="text_search_name_collection" name="search_donor_treatment" placeholder="Search donor" onkeyup="searchBloodCollectionDonorDonorByName(this.value,'collection')">
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
																									class="datatable table table-striped table-bordered">
																									<thead id="ehatTHead">
																										<tr>
																											<th class="col-md-1 center">#</th>
																											<th class="col-md-1 center">Blood Bag Collection ID</th>
																											<th class="col-md-1 center">Donor ID</th>
																											<th class="col-md-1 center">Treatment ID</th>
																											<th class="col-md-1 center">Donor Name</th>
																											<th class="col-md-1 center">Blood Bag</th>
																											<th class="col-md-1 center">Type of Bag</th>
																											 <th class="col-md-1 center">Collected Done By</th>
																											<th class="col-md-1 center">Collected Date</th>
																											<th class="col-md-1 center">Edit</th>
																											<th class="col-md-1 center">Delete</th>
																											
																										</tr>
																									</thead>
							
																									<tbody id="BloodDonorsBloodBagCollectionListDetails">
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
									<!-- END:Blood Bag Details Form -->
									<!-- ============================================================================== -->
				  
								 <!--  </div> -->
								</div>
								</div>
								</div>
							</div>

						</div>

						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
					</div>
					<!-- /CONTENT-->
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
			defaultFetchPatientTitle("checkuplist");// Added By Annapurna
			getBloodDonorTreatmentDetailsById($("#donorId1").val(),$("#callform").val());
			getBloodDonorTreatmentDetailsforCollectionById($("#donorId1").val(),$("#callform").val());
	     	getBloodGrpDetails();
			fetchDoctor();
			getAllBloodBagCollectionDonorList();
			getBloodItemsDetails(); 
		    getAllBloodTypeMaster(); //added  by akshata
			getAllBloodBagMaster(); //added by akshata
			// $("#title").select2();// Added By Annapurna				
			
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
				clearDonorForm();
			});
			
			
		});
		
	</script>
	
	<input type="hidden" value="111" id="userID" />
	<input type="hidden" value="0" id="doctorId"  />
	<div id="userDetails" style="display: none;"></div>
	<input type="hidden" value="0" id="usernameValidation" />
	<input id="synchronizeToken" type="hidden" value="cbdcb840-12c9-4582-9c0f-abb5511603b3">
	<input type="hidden" id="bloodBagDetailsId" value="0" />
	<input id="donorTreatmentId" type="hidden" value="0" />	
	<input type="hidden" value="0" id="userIdForUpdate" />
	<input type="hidden" value="0" id="doctorIdForUpdate" />
		<input type="hidden" value="<%=request.getParameter("donorId")%>" id="donorId1" />
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<input type="hidden" value="0" id="donorId" />
	<input type="hidden" value="bloodBagCollection" id="callform" />
	<input type="hidden" value="0" id="donorReactionId" >
	<!-- /JAVASCRIPTS -->
	
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>