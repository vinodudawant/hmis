<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Ambulance Update Trip</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
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

<script>
	jQuery(document).ready(function() {
		App.setPage("Patient_Death"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});
	});
</script>

<script type="text/javascript">
	onload = function() {
		$("#hospDetail").addClass("anchorActive");
		fetchMortuaryInternal('all');
	}
</script>

		<script>
		
		jQuery(document).ready(function() {
			
			getDepts();
			getAllVehicleMaster();
			getDriver();
			fetchWardName();
			getAllStatusMaster();
		});
	</script>
<!-- JQUERY files import start -->

<!-- css for developer -->
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->	

<!-- include js for development -->
	<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
	<!-- JQUERY -->
	<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
	<!-- JQUERY UI-->
	<script src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
	<!-- BOOTSTRAP -->
	<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
		
	<!-- JQUERY UI-->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/themes/default.css" id="skin-switcher" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/responsive.css" >
	<link href="ehat-design/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<!-- DATE RANGE PICKER -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
	<!-- SELECT2 -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
	<!-- TYPEAHEAD -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/typeahead/typeahead.css" />
	<!-- UNIFORM -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/uniform/css/uniform.default.min.css" />
	<!-- DATA TABLES -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />


<!-- JQUERY files import END -->

<!-- include js for development -->
<script type="text/javascript" src="js/users.js"></script>

<script type="text/javascript" src="js/ambulance.js"></script>
      
      <%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>
</head>
<body>
<c:if test="${ sessionScope.userType != null }">
<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%>
		</header>
		<!--/HEADER -->

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->

			<%@include file="left_menu_ambulance.jsp"%>

			<!-- /SIDEBAR -->
		
			<!-- PAGE -->
	
		
		<div id="main-content">
			<!-- SAMPLE BOX CONFIGURATION MODAL FORM-->
			<div class="modal fade" id="box-config" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
				  <div class="modal-content">
					<div class="modal-header">
					  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					  <h4 class="modal-title">Box Settings</h4>
					</div>
					<div class="modal-body">
					  Here goes box setting content.
					</div>
					<div class="modal-footer">
					  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					  <button type="button" class="btn btn-primary">Save changes</button>
					</div>
				  </div>
				</div>
			  </div>
			<!-- /SAMPLE BOX CONFIGURATION MODAL FORM-->
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
										<li><a href="ambulance_updatetrip_details.jsp">Update Trip</a></li>
									</ul>

									<!-- /BREADCRUMBS -->
									<div class="clearfix"></div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<div class="panel panel-default">
									<div class="panel-body">
										<div class="header-record-search">
									
											<div class="row">
												<div class="col-md-12">
														<label> Requisition Date : </label>
													</div>
														<div class="col-md-2">
															<span class="input-group-btn"> <label for="inlineFold"
																class="control-label">From : </label> 
															</span>
														</div>
														<div class="col-md-2">
																<input type="text"
																		class="form-control input-SmallText"
																		onclick="displayCalendar(document.getElementById('txtFdate'),'dd/mm/yyyy',this)"
																		readonly="readonly" id="txtFdate" placeholder="Date"
																		value="<%=todays_date%>">
														</div>
															<div class="col-md-2">
																<span class="input-group-btn"> <label for="inlineFold"
																	class="control-label">To : </label> 
																</span>
															</div>
															<div class="col-md-2">
																<input type="text"
																	class="form-control input-SmallText"
																	onclick="displayCalendar(document.getElementById('txtTdate'),'dd/mm/yyyy',this)"
																	readonly="readonly" id="txtTdate" placeholder="Date"
																	value="<%=todays_date%>">
															</div>
														<div class="col-md-1">
															<label>
																Department<span class="required text-danger">*</span>
															</label>
														</div>
														<div class="col-md-2">
																<div class="form-group">												
																	<select class="form-select" id="department_for_header" name="department_name" style="padding: 0px 0;width: 100%">
																
																	</select>
																</div>
															</div>
														</div>
													<!-- ============================ Department and ward name row ====================== -->
														<div class="row" >
														
															<div class="col-md-2">
																<label>
																	 Ward Name :<span class="required-field"></span>
																</label>
															</div>
															<div class="col-md-2">	
																<div class="form-group">
																	<select class="form-select" name="ward_name" id="wardTypeSelect" style="padding: 5px 0;width: 100%">
																
																	</select> 
																</div>						
															</div>
															
															<div class="col-md-2">
																	<label>
																		Status<span class="required text-danger">*</span>
																	</label>
															</div>
															<div class="col-md-2">	
																<div class="form-group">
																	<select class="form-select" name="status" id="statusMaster" style="padding: 5px 0;width: 100%">	
																	
																	</select> 
																</div>						
															</div>
															
															<div class="col-md-1"></div>
																	<div class="col-sm-2">
																		<button type="button"
																			class="btn-primary form-control search-button" onclick="searchbyFilters()">
																			Show
																		</button>
																	</div>
															</div>
														</div>
													<!-- ============================ End :Department and ward name row ====================== -->
													<!-- ============================Patient Search and Requisition Search ====================== -->
								   								   	
								   						<div class="row" >
														
														<!-- <div class="col-md-2">
																<label>
																	<span class="required-field">*</span>Patient Search :
																</label>
															</div>
															<div class="col-md-3">	
																<div class="form-group">
					                                                <input type="text" name="search_patient" placeholder="Serach with ID" class="form-control" id="searchId">
																</div>						
															</div> -->
								
															<div class="col-md-2">
																<label>
																	<span class="required-field">*</span> Requisition Search :
																</label>
															</div>
															<div class="col-md-2 TextFont" id="divbyId">
																<input name="byId" type="text" id="byId"
																class="form-control input-SmallText"
																onkeyup="autoSuggestionforRID(this.id)"
																placeholder="Requesition Id" />
															</div>
															
															<div style="" class="col-md-2">
																<label class="TextFont"	style="font-size: 10px;">Search
																	By:</label>
															</div>
															<div class="col-md-2 TextFont"	id="divbyName">
																<select id="patSearchType"
																	class="form-control input-SmallText"
																	onchange="setPatientSearchType()">
																	<option value="2">Patient Name</option>
																	<option value="3">Patient Mobile</option>
																</select>
															</div>

															<div class="col-md-2 TextFont" id="divbyName">
																<input name="byName" type="text" id="byName"
																	class="form-control input-SmallText"
																	onkeyup="autoSuggestion(this.id)"
																	placeholder="Patient Name,Mobileno" />
															</div>

															<div id="otherDiv" class="col-md-4 TextFont"
																style="margin-left: -15%; margin-top: 7px; display: none;">
																<input name="byName1" type="text" id="byName1"
																	class="typeahead form-control input-SmallText"
																	placeholder="Name"
																	onkeyup="autoSuggestion(this.id)" />
																<!-- onkeypress="return SearchPatientNameOnEnter(event,'OPDOldPatientDatabase')" /> -->
															</div>
														</div>
													<div class="clearfix"></div>
												</div>
											</div>	
										<!-- ============================ End :Patient Search and Requisition Search====================== -->			
																
										<div class="panel panel-primary" style="display: none" id="patientInfoDiv">
											<div class="panel-heading">Update Trip :
												<button class="close" onclick="closeWin()" data-dismiss="modal" aria-hidden="true">&times;</button>
											</div>
											<div class="panel-body">								
												<form action="#" method="POST">
													 <div class="col-md-12" style="margin: 0 0 15px">
														<div class="function-buttons" style="float: right;">
															<div class="buttons">
																<button type="submit" class="btn btn-success"
																	onclick="updateAmbulancePatientDetails()">
																	<i class="fa fa-save"> save</i>
																</button>
																<button  type="button" class="btn btn-warning"
																	onclick="clearAmbulancePatient()">
																	<i> clear</i>
																</button>
															</div>
														</div>	
														<div class="clearfix"></div>
													</div>
											 <!-- ============================ Requisition Date and  Requisition No and UHID Number ====================== -->
                                       			<div class="row">
                                       			
													<div class="col-md-2">
														Requisition Date
															<label>
																<span class="required text-danger">*</span>
															</label>
													</div>
													<div class="col-md-2">	
														<div class="form-group">
			                                                <input type="date" name="requisition_date" id="requisitionDate" placeholder="Requisition Date " class="form-control" readonly>
														</div>						
													</div>
		
													<div class="col-md-2">
														 Requisition No
															<label>
																<span class="required text-danger">*</span>
															</label>
													</div>
													<div class="col-md-2">	
														<div class="form-group">
															<input type="text" name="requi_no" id="ambulanceMasterId" placeholder=" Requisition No" class="form-control" readonly >
														</div>						
													</div>
													
													<div class="col-md-2">
														 UHID Number
															<label>
																<span class="required text-danger">*</span>
															</label>
													</div>
													<div class="col-md-2">	
														<div class="form-group">
															<input type="text" name="UHID_number" id="uHIDNumber" placeholder=" UHID Number" class="form-control" readonly>
														</div>						
													</div>
												</div>
                                     		<!-- ============================ End :UHID Number and  Patient Name  Consultant Name====================== -->
                        					<!-- ============================ Patient Name  and Department and ward ====================== -->
                                       			<div class="row">
													
													<div class="col-md-2">
														Patient Name
															<label>
																<span class="required text-danger">*</span>
															</label>
													</div>
													<div class="col-md-2">	
														<div class="form-group">
			                                                <input type="text" name="patient_name" id="patientName" placeholder="Patient Name" class="form-control" readonly>
														</div>						
													</div>
		
													<div class="col-md-2">
														 Department
															<label>
																<span class="required text-danger">*</span>
															</label>
													</div>
													<div class="col-md-2">	
														<div class="form-group">
															<input type="text" name="department" id="department" placeholder="Department" class="form-control" readonly>
														</div>						
													</div>
													
													<div class="col-md-2">
														 Ward :
															<label>
																<span class="required-field"></span>
															</label>
													</div>
													<div class="col-md-2">	
														<div class="form-group">
															<input type="text" name="wardName" id="wardName" placeholder="WardName" class="form-control" autocomplete="off">
														</div>						
													</div>
												</div>
                                     		<!-- ============================ End :Patient Name  and Department and ward  ====================== -->
                        					<!-- ============================ Pickup Location  and  Drop Location   Caller Name ====================== -->
                                       			<div class="row">
													
													<div class="col-md-2">
														Pickup Location
															<label>
																<span class="required text-danger">*</span>
															</label>
													</div>
													<div class="col-md-2">	
														<div class="form-group">
			                                                <input type="text" name="pickup_location" id="pickupLocation" placeholder="Pickup Location" class="form-control" autocomplete="off">
														</div>						
													</div>
		
													<div class="col-md-2">
														 Drop Location
															<label>
																<span class="required text-danger">*</span>
															</label>
													</div>
													<div class="col-md-2">	
														<div class="form-group">
															<input type="text" name="drop_location" id="dropLocation" placeholder="Drop Location" class="form-control" autocomplete="off">
														</div>						
													</div>
													
													<div class="col-md-2">
														 Caller Name
															<label>
																<span class="required text-danger">*</span>
															</label>
													</div>
													<div class="col-md-2">	
														<div class="form-group">
															<input type="text" name="caller_name" id="callerName" placeholder="Caller Name" class="form-control" autocomplete="off">
														</div>						
													</div>
												</div>
                                   			  <!-- ============================ End : Pickup Location  and  Drop Location   Caller Name ====================== -->
                        					  <!-- ============================ Caller Number and  Caller Contact and  Nurse ====================== -->
                                       			<div class="row">
													
													<div class="col-md-2">
														 Caller Number
															<label>
																<span class="required text-danger">*</span>
															</label>
													</div>
													<div class="col-md-2">	
														<div class="form-group">
			                                                <input type="text" name="caller_number" id="callerNumber" placeholder="Caller Number " class="form-control" autocomplete="off">
														</div>						
													</div>
		
													<div class="col-md-2">
														  Nurse 
															<label>
																<span class="required text-danger">*</span>
															</label>
													</div>
													<div class="col-md-2">	
														<div class="form-group">
															<input type="text" name="nurse" placeholder="Nurse" class="form-control" id="nurseName" autocomplete="off">
														</div>						
													</div>
													
													<div class="col-md-2">
														 Doctor
															<label>
																<span class="required text-danger">*</span>
															</label>
													</div>
													<div class="col-md-2">	
														<div class="form-group">
			                                                <input type="text" name="doctor" placeholder="Doctor" class="form-control" id="doctorName" autocomplete="off">
														</div>						
													</div>
												</div>
                                    		 <!-- ============================ Doctor and  Driver and  Status  ====================== -->
                           						<div class="row">
										
											<!-- 	<div class="col-md-2">
														<label>
															<span class="required-field">*</span> Driver :
														</label>
													</div>
													<div class="col-md-2">	
														<div class="form-group">
                                               				 <input type="text" name="driver" id="driver" placeholder="Driver" class="form-control" >
														</div>						
													</div> -->
													<!-- <div class="col-md-2">
														<label>
															<span class="required-field">*</span> Status :
														</label>
													</div> -->
													
													<div class="col-md-2">	
														<div class="form-group">
			                                                <input type="hidden" name="status" id="status" placeholder="Status" class="form-control" >
														</div>						
													</div>
										
												</div>
									  		<!-- ============================ End :Doctor and  Driver and  Status  ====================== -->
												<div class="panel panel-primary">
													<div class="panel-body" style="padding: 10px 10px 5px 10px">
														 <div class="row" >	
														
															<div class="col-md-2" >
																 Vehicle Type
																	<label>
																		<span class="required text-danger">*</span>
																	</label>
															</div>
															<div class="col-md-2">	
																<div class="form-group">
					                                                <input type="text" name="vehicleType" placeholder="Vehicle Type" class="form-control" id="vehicleType" autocomplete="off">
																</div>						
															</div>
													
															<div class="col-md-2">
																 Vehicle Number
																	<label>
																		<span class="required text-danger">*</span>
																	</label>
															</div>
															<div class="col-md-2">	
																<div class="form-group">
					                                                <input type="text" name="vehicleNumber" placeholder="Vehicle Number" class="form-control" id="vehicleNumber" autocomplete="off">
																</div>						
															</div>
															
															<div class="col-md-2">
																Driver
																	<label> 
																		<span class="required text-danger">*</span>
																	</label>
															</div>
															<div class="col-md-2">	
																<div class="form-group">
									                                <input type="text" name="driver" placeholder="Driver" class="form-control" id="driver" autocomplete="off">
																</div>						
															</div>
														</div>
													<!-- ============================ End :Vehicle Type and Vehicle Number and Driver row ====================== -->
													<!-- ============================ End :Remark and  Schedule Date & Time row ====================== -->
														<div class="row">
													<!-- ============================ Remark and  Schedule Date & Time row ====================== -->
														<div class="col-md-12">
															<div class="row">
																
																<div class="col-md-2">
																	 Schedule Date
																		<label>
																			<span class="required text-danger">*</span>
																		</label>
																</div>
																<div class="col-md-2">	
																	<div class="form-group">
																			<input type="date" name="scheduleDate" id="scheduleDate" class="form-control" style="width: 100%" readonly>
																	</div>	
																</div>
																
																<div class="col-md-2">
																	 Schedule  Time
																		<label>
																			<span class="required text-danger">*</span>
																		</label>
																</div>
																<div class="col-md-2">	
																	<div class="form-group">
																			<input type="text" name="scheduleTime" id="scheduleTime"  class="form-control" style="width: 100%" readonly="readonly">
																	</div>						
																</div>
																
																<div class="col-md-2">
																	 Total KM :
																		<label>
																			<span class="required-field"></span>
																		</label>
																</div>
																<div class="col-md-2">
																	<div class="form-group">												
																		<input type="text" name="TotalKm" id="TotalKm" class="form-control"placeholder="Total km" autocomplete="off">
																	</div>
																</div>
																
																 <div class="col-md-2">
																	  Departure Date
																			<label>
																				<span class="required text-danger">*</span>
																			</label>
																	</div>
																<div class="col-md-2">	
																	<div class="form-group">
																		<input type="date" name="departureDate" id="departureDate" class="form-control">
																	</div>				
																</div> 
																	
																<div class="col-md-2">
																	 Departure Time
																		<label>
																			<span class="required text-danger">*</span>
																		</label>
																</div>
																<div class="col-md-2">	
																	<div class="form-group">
																		<input type="text" name="departureTime" id="departureTime"  class="form-control" style="width: 100%" readonly="readonly">
																	</div>						
																</div>
																
															<!--<div class="col-md-2">
																	<label>
																		<span class="required-field">*</span> Remark :
																	</label>
																</div>
																<div class="col-md-2">
																	<div class="form-group">												
																		<textarea name="remarks" id="Remarks" class="form-control" rows="2" placeholder="Remarks" style="resize: none;"></textarea>
																	</div>
																</div> -->
																
																 <div class="col-md-2">
																	  Arrival Date
																		<label>
																			<span class="required text-danger">*</span>
																		</label>
																</div>
																<div class="col-md-2">	
																	<div class="form-group">
																		<input type="date" name="arrivalDate" id="arrivalDate"  class="form-control">
																	</div>						
																</div> 
																
																<div class="col-md-2">
																	 Arrival Time
																		<label>
																			<span class="required text-danger">*</span>
																		</label>
																</div>
																<div class="col-md-2">	
																	<div class="form-group">
																		<input type="text" name="arrivalTime" id="arrivalTime"  class="form-control" style="width: 100%" readonly="readonly">
																	</div>						
																</div>
																
																<div class="col-md-2">
																	 Drop Date
																		<label>
																			<span class="required text-danger">*</span>
																		</label>
																</div>
																<div class="col-md-2">	
																	<div class="form-group">
																		<input type="date" name="dropDate" id="dropDate" class="form-control">
																	</div>						
																</div> 
																
																<div class="col-md-2">
																	 Drop Time
																		<label>
																			<span class="required text-danger">*</span>
																		</label>
																</div>
																<div class="col-md-2">	
																	<div class="form-group">
																		<input type="text" name="dropTime" id="dropTime"  class="form-control" style="width: 100%" readonly="readonly">
																	</div>						
																</div>
															</div>
														</div>
													</div>
												</div>	
											</div>
										<div class="clearfix"></div>
									</div>
								</div>
							</div>

                     		<div class="col-md-12">
								<div class="tabbable header-tabs">
									<div class="row" style="margin-top: 10px">
										<div class="col-md-12">
											<div class="function-buttons" style="float: right;">
												<div class="buttons">
														<button type="submit" class="btn btn-success" onclick="completeAmbulancePatient()"> Complete Trip</button>
														<button type="button" class="btn btn-primary" onclick="goBack()"> Back</button>
												</div>
											</div>
									
											<div class="clearfix"></div>
												<div class="col-sm-12">
													<div class="pull-right">
														<div id="datatable1_filter" class="dataTables_filter">
															<label id="searchlabel"> </label>
														</div>
													</div>
												</div>
										
												<div class="panel panel-primary"
														style="margin-top: 10px">
														<div class="panel-heading" id="divEhatContent"> Ambulance  Details</div>
															<div class="panel-body"
																style="overflow: auto; height: 300px">
																	<table class="datatable table table-striped table-bordered">
																		<thead id="">
																			<tr>
																				<th class="col-lg-1 center">Select</th>
																				<th class="col-md-1 center">Requisition Number</th>
																				<th class="col-md-1 center">Requisition Date</th>
																				<th class="col-md-1 center">UHID Number</th>
																				<th class="col-md-1 center">Patient Name</th>
																				<th class="col-md-1 center">Department</th>
																				<!-- <th class="col-md-1 center">Ward</th> -->
																				<th class="col-md-1 center">Pickup Location </th>
																				<th class="col-md-1 center">Drop Location</th>
																				<th class="col-md-1 center">Caller Name</th>
																				<th class="col-md-1 center">Caller Contact</th>
																				<th class="col-md-1 center">Status</th>			
																				<th class="col-md-1 center">Status Remark</th>
																				<th class="col-md-1 center">Nurse</th>
																				<th class="col-md-1 center">Doctor</th>
																				<th class="col-md-1 center">Driver</th>
																				<th class="col-md-1 center">DropTime</th>
																				<th class="col-md-1 center">Update Trip</th>
																			</tr>
																		</thead>
																		<tbody id="ambulancePatientList">

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
						
								<div class="footer-tools">
									<span class="go-top">
										<i class="fa fa-chevron-up"></i> Top
									</span>
								</div>
							</div>
						</div>
						<!-- /CONTENT-->
						
	</section>
	<!--/PAGE -->
	<!-- JAVASCRIPTS -->
	<!-- SLIMSCROLL -->
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	
	<!-- BLOCK UI -->
	<script type="text/javascript" src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/autosize/jquery.autosize.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
	<!-- TYPEHEAD -->
	<script type="text/javascript" src="ehat-design/js/typeahead/typeahead.min.js"></script>
	<!-- UNIFORM -->
	<script type="text/javascript" src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
	<!-- DATA TABLES -->
	<!-- Auto-Suggestion 8/1/2015-->
	<script type="text/javascript" src="auto/jquery.mockjax.js"></script>
	<script type="text/javascript" src="auto/bootstrap-typeahead.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
	<!-- COOKIE -->
	<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	<!-- bootstrap datepicker -->
	<script type="text/javascript" src="ehat-design/datepicker/bootstrap-datepicker.js"></script>
	<!-- bootstrap datepicker new added  js-->
	<script type="text/javascript" src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"></script>
	<script type="text/javascript" src="css/inventoryDatepicker/js/jsDatePick.min.1.3.js"></script>
	<!--TIMEPEACKER -->
      <link rel="stylesheet" type="text/css"      href="timepeacker/jquery.datetimepicker.css" />
      <script src="timepeacker/jquery.datetimepicker.js"></script>
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>
	
	<script>
		jQuery(document).ready(function() {		
			App.setPage("index");  //Set current page
			App.init(); //Initialise plugins and elements
			
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});

		});
	</script>
	
	 <script>
	 $('#scheduleTime').datetimepicker({
	      	datepicker : false,
	      	format : 'H:i',
	      	step : 15
	      });
	 </script>
	 	 <script>
	 $('#departureTime').datetimepicker({
	      	datepicker : false,
	      	format : 'H:i',
	      	step : 15
	      });
	 </script>
	 	 <script>
	 $('#arrivalTime').datetimepicker({
	      	datepicker : false,
	      	format : 'H:i',
	      	step : 15
	      });
	 </script>
	  	 <script>
	 $('#dropTime').datetimepicker({
	      	datepicker : false,
	      	format : 'H:i',
	      	step : 15
	      });
	 </script>
	
	<script type="text/javascript">
	onload = function() {
		
		getAllAmbulancePatient();
	}
</script>
		<input type="hidden" id="vehicleId" value="0">
			<input type="hidden" id=patientId value="0">
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
	<!-- /JAVASCRIPTS -->

</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>