<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Donor Checkup List</title>
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
<script type="text/javascript" src="js/patient_management.js"></script>
<script type="text/javascript" src="js/bb_blood_collection.js"></script>
<script type="text/javascript" src="js/organ_reaction.js"></script>
<!-- Added By Annapurna -->
<script type="text/javascript">
	onload = function() {
		//defaultFetchPatientTitle("checkuplist");
		getBloodDonorTreatmentDetailsById($("#donorId1").val(),$("#callform").val());
			
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
										
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><i class="fa fa-home"></i> <a href="bb_donar_checkuplist.jsp">Donor Check-up List</a></li>
										<li class="pull-right">
									<button class="btn btn-xs btn-info pull-right" style="float: right;" type="button" id="expandDonor" onclick="toggleCheckUpListDiv()">
										<i class="fa fa-plus"></i> Check-Up List
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
								   
								    	<div class="row">
										<div class="col-md-12" id="divForEntry" >

										<div  method="POST" style="display:none" id="divCheckupList">
											<div class="panel panel-primary">
													<div class="panel-heading">Check List</div>
											<div class="panel-body" >
														<div class="buttons">
																		<button type="submit" class="btn btn-success " style="float: right;" onclick="saveCheckuplist()"><i class="fa fa-save"></i> Save</button>
																	</div>
															<form action="#" method="POST">
																<div class="row">
																
																	<div class="col-md-2">
																		<label>
																			<span class="required text-danger">*</span> Donor Name
																		</label>
																	</div>
																	<div class="col-sm-2">
																		<div class="form-group">												
																			<Input name="user_title" id="title" class="form-control" placeholder="Title">
																			 	<!-- <option value="Mr">Mr</option>
																			 	<option value="Mrs">Mrs</option>  </select> -->
																			
																		</div>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">	
																		<input type="text" name="first_name" id="donor_first_name" class="form-control" placeholder="First name">
																		</div>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">	
																		<input type="text" name="middle_name" id="donor_middle_name" class="form-control" placeholder="Middle name">
																		</div>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">	
																		<input type="text" name="last_name" id="donor_last_name" class="form-control" placeholder="Last name">
																		</div>
																	</div>
																</div>
							
																<div class="row">
																	<div class="col-md-2">
																		<label>
																			<span class="required text-danger">*</span> Donor feeling good
																		</label>
																	</div>
																	<div class="col-md-1">
																		<div class="form-group">
																			<label><input type="radio" name="donor_feeling_good" value="1"> Yes</label>
																		</div>											
																	</div>
																	<div class="col-md-1">
																		<div class="form-group">
																			<label><input type="radio" name="donor_feeling_good" value="0"> No</label>
																		</div>											
																	</div>
																</div>
							
																<div class="row">
																	<div class="col-md-2">
																		<label>
																			<span class="required text-danger">*</span> Any allergy record
																		</label>
																	</div>
																	<div class="col-md-1">
																		<div class="form-group">
																			<label><input type="radio" name="allergy_record" value="1"> Yes</label>
																		</div>											
																	</div>
																	<div class="col-md-1">
																		<div class="form-group">
																			<label><input type="radio" name="allergy_record" value="0"> No</label>
																		</div>											
																	</div>
																</div>
							
																<div class="row">
																	<div class="col-md-2">
																		<label>
																			<span class="required text-danger">*</span> Any previous health issue
																		</label>
																	</div>
																	<div class="col-md-1">
																		<div class="form-group">
																			<label><input type="radio" name="previous_health_issue" value="1"> Yes</label>
																		</div>											
																	</div>
																	<div class="col-md-1">
																		<div class="form-group">
																			<label><input type="radio" name="previous_health_issue" value="0"> No</label>
																		</div>											
																	</div>
																</div>
							
																<div class="row">
																	<div class="col-md-2">
																		<label>
																			<span class="required text-danger">*</span> Any habit
																		</label>
																	</div>
																	<div class="col-md-4">
																		<div class="form-group">
																			<textarea name="heabit_details" id="heabit_details" class="form-control" placeholder="Habit details" rows="5"></textarea>
																		</div>											
																	</div>
																</div>
							
																<div class="row">
																	<div class="col-md-2">
																		<label>
																			<span class="required text-danger">*</span> Weight (KG)
																		</label>
																	</div>
																	<div class="col-md-4">
																		<div class="form-group">
																			<input type="text" name="weight" id="weight" class="form-control"
																			onkeypress="return validateNumbers(event)" placeholder="Weight">
																		</div>											
																	</div>
																</div>
							
																<div class="row">
																	<div class="col-md-2">
																		<label>
																			<span class="required text-danger">*</span> Height (CM)
																		</label>
																	</div>
																	<div class="col-md-4">
																		<div class="form-group">
																			<input type="text" name="height" id="height" class="form-control"
																			onkeypress="return validateNumbers(event)" placeholder="Height">
																		</div>											
																	</div>
																</div>
							
																<div class="row">
																	<div class="col-md-2">
																		<label>
																			<span class="required text-danger">*</span> Blood pressure (mmhg)
																		</label>
																	</div>
																	<div class="col-md-4">
																		<div class="form-group">
																			<input type="text" name="blood_pressure" id="blood_pressure" class="form-control" 
																			onkeypress="return validateNumbers(event)" placeholder="Blood pressure">
																		</div>											
																	</div>
																</div>
							
																<div class="row">
																	<div class="col-md-2">
																		<label>
																			<span class="required text-danger">*</span> Temperature
																		</label>
																	</div>
																	<div class="col-md-4">
																		<div class="form-group">
																			<input type="text" name="temprature" id="temprature" class="form-control"
																			onkeypress="return validateNumbers(event)" placeholder="Temperature">
																		</div>											
																	</div>
																</div>
							
																<div class="row">
																	<div class="col-md-2">
																		<label>
																			<span class="required text-danger">*</span> Pulse
																		</label>
																	</div>
																	<div class="col-md-4">
																		<div class="form-group">
																			<input type="text" name="pulse" id="pulse" class="form-control"
																			onkeypress="return validateNumbers(event)" placeholder="Pulse">
																		</div>											
																	</div>
																</div>
							
																<div class="row">
																	<div class="col-md-2">
																		<label>
																			<span class="required text-danger">*</span> Hemoglobin
																		</label>
																	</div>
																	<div class="col-md-4">
																		<div class="form-group">
																			<input type="text" name="haemoglobin" id="haemoglobin" class="form-control"
																			onkeypress="return validateNumbers(event)" placeholder="Hemoglobin">
																		</div>											
																	</div>
																</div>
							
																<div class="row" style="padding: 10px 0;">
																	<div class="col-md-2">
																		<label>
																			<span class="required text-danger">*</span> Checkup done by
																		</label>
																	</div>
																	<div class="col-md-2">
																		<div class="form-group">											
																	 <!-- <select name="doctor_name" class="form-control" id="doctor_name">
																			 	<option value="=">Doctor name</option>
																			 	<option value="1">ABC</option>  
																			</select>  -->
																	  <select class="form-control typeahead "
																					style="border: nimmunizationChartsone; outline: none;"
																					title="Please enter doctor" id="doctor_name">
																					<option value='0'>select</option>
																				</select> 
																		</div>											
																	</div>
																	<div class="col-md-2">
																		<div class="form-group">											
																			<select name="accept_or_decline" id="accept_or_decline" class="form-control">
																			 	<!-- <option value="Mr">Accept or Decline</option> -->
																			 	<option value="Accept">Accept</option>
																			 	<option value="Decline">Decline</option>
																			</select>
																		</div>											
																	</div>
																</div>
							
																	<div class="row">
																		<div class="col-md-2">
																			<label>
																				Remarks if any
																			</label>
																		</div>
																		<div class="col-md-4">
																			<div class="form-group">
																				<textarea name="checkup_remarks" id="checkup_remarks" class="form-control" rows="5" placeholder="Remarks"></textarea>
																			</div>											
																		</div>
																	</div>
							
															</div>
														</div> 
													</div>
												</div>																					
								    		</div>
								    		</form>
								    		
								    		
								    <!-- </div> -->
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
														
														
														<div class="header-form-details">							
											<div class="col-md-4 header-search-donor" id="header_search_donor_checkup" >
											<div class="form-group" id="divtext_search_name_checkup">
												<input type="text" class="form-control" id="text_search_name_checkup" name="search_donor_treatment" placeholder="Search byDonorID" onkeyup="searchCheckupDonorByName(this.value,'checkup')">
											</div>
										</div>
	
										<div class="clearfix"></div>
									</div>		
																						
																						<div class="panel panel-primary" id="pape"
																							style="margin-top: 20px">
																							<div class="panel-heading" id="divEhatContent">Donor Check-Up List</div>
																							<div class="panel-body"
																								style="overflow: auto; height: 300px">
																								<table id="ehatTable" cellpadding="0" cellspacing="0"
																									border="0"
																									class="datatable table table-striped table-bordered">
																									<thead id="ehatTHead">
																										<tr>
																											<th class="col-md-1 center">#</th>
																											<th class="col-md-1 center">Checkuplist ID</th>
																											<th class="col-md-1 center">Donor ID</th>
																											<th class="col-md-1 center">Donor Name</th>
																											 <th class="col-md-1 center">Checkup Status</th>
																											<th class="col-md-1 center">Checkup Date</th>
																											<th class="col-md-1 center">Edit</th>
																											<th class="col-md-1 center">Delete</th>
																											<th class="col-md-1 center">Blood Bag Collection</th>
																										</tr>
																									</thead>
							
																									<tbody id="BloodDonorsCheckupListDetails">
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
									<!-- ============================================================================== -->
									<!-- END:Menu1 -->
									<!-- ============================================================================== -->
									
									<!-- ============================================================================== -->
								    <!-- START:Blood Bag Details Form -->
									<!-- ============================================================================== -->
						
								    <div id="menu2" class="tab-pane fade">
								    	<div class="row">
											<div class="col-md-12" id="divForEntry">
												<div class="panel panel-primary">
													<div class="panel-heading">Blood Bag Details</div>
														<div class="panel-body">
														<div class="buttons">
																		<button type="submit" class="btn btn-success " style="float: right;" onclick="saveBloodBagDetails()"><i class="fa fa-save"></i> Save</button>
																	</div>
															<form action="#" method="POST">
																<div class="row">
																	<div class="col-md-2">
																		<label>
																			<span class="required text-danger">*</span> Donor Name
																		</label>
																	</div>
																	<div class="col-md-1">
																		<div class="form-group">												
																			<select class="form-select" id="title" name="user_title">
																			 	
																			</select>
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
																				<!-- <option value="1">AB+</option>
																				<option value="2">AB-</option> -->
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
																			<<select class="form-select" id="collected_by" name="collected_by">
																			<option value="0">--Select Doctor--</option>
																				
																			</select> 
																		<!-- 	<select class="form-control typeahead sss"
																					style="border: nimmunizationChartsone; outline: none;"
																					title="Please enter doctor" id="collected_by">
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
						
									<!-- ============================================================================== -->
									<!-- END:Blood Bag Details Form -->
									<!-- ============================================================================== -->
			

								    <!-- <div id="menu3" class="tab-pane fade">
								      <h3>Section 4</h3>
								    </div> -->
								  </div>
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
			<!-- <div id="pleaseWait" style="text-align: center; display: none;">
				<img style="margin-top: 250px;" height="43px"
					src="images/loading_black.gif" />
				<div style="margin-top: 10px; color: white">
					<b>Please wait...</b>
				</div>
			</div> -->
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
			defaultFetchPatientTitle("checkuplist");
			//$("#title").select2();
			getBloodGrpDetails();
			fetchDoctor();
			getAllBloodDonorsCheckupList();
			getBloodItemsDetails();
			getAllBloodTypeMaster(); //added  by akshata
			getAllBloodBagMaster(); //added by akshata
			defaultFetchPatientTitle("organ");
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
				//clearDonorForm();
			});
			
			
		});
	
		//$("#title").select2();
	</script>
	
	<input type="hidden" value="111" id="userID" />
	<input type="hidden" value="0" id="doctorId"  />
	<div id="userDetails" style="display: none;"></div>
	<input type="hidden" value="0" id="usernameValidation" />
	<input id="synchronizeToken" type="hidden" value="cbdcb840-12c9-4582-9c0f-abb5511603b3">
	<input type="hidden" id="donorCheckupId" value="0" />
	<input type="hidden" id="bloodBagDetailsId" value="0" />
	<input id="donorTreatmentId" type="hidden" value="0" />	
	<input type="hidden" value="0" id="userIdForUpdate" />
	<input type="hidden" value="0" id="doctorIdForUpdate" />
		<input type="hidden" value="<%=request.getParameter("donorId")%>" id="donorId1" />
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<input type="hidden" value="0" id="donorId" />
	<input type="hidden" value="checkup" id="callform" />
 	<!-- /JAVASCRIPTS -->
	
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>



