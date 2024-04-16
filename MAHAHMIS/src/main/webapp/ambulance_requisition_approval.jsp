<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Ambulance Requisition Approval</title>

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
		getDoctors();
		getNurse();
		fetchWardName();
		getAllStatusMaster();
	});
</script>
<!-- JQUERY files import start -->

<!-- css for developer -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->

<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!-- JQUERY -->
<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
<!-- JQUERY UI-->
<script
	src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>

<!-- JQUERY UI-->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/cloud-admin.css">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/themes/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/responsive.css">
<link href="ehat-design/font-awesome/css/font-awesome.min.css"
	rel="stylesheet">
<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- SELECT2 -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />
<!-- TYPEAHEAD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/typeahead/typeahead.css" />
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/uniform/css/uniform.default.min.css" />
<!-- DATA TABLES -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />


<!-- JQUERY files import END -->

<!-- include js for development -->
<script type="text/javascript" src="js/users.js"></script>

<script type="text/javascript"
	src="js/ambulance_requisition_approval.js"></script>

<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
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
				<div class="modal fade" id="box-config" tabindex="-1" role="dialog"
					aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal"
									aria-hidden="true">&times;</button>
								<h4 class="modal-title">Box Settings</h4>
							</div>
							<div class="modal-body">Here goes box setting content.</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default"
									data-dismiss="modal">Close</button>
								<button type="button" class="btn btn-primary">Save
									changes</button>
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
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="ambulance_requisition_approval.jsp">Ambulance
													Requisition Approval</a></li>
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
																		 Ward Name<span class="required text-danger"></span>
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
														
													<!--<div class="col-md-2">
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
																		 Requisition Search :<span class="required-field"></span>
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

															<!-- <div class="col-md-4 TextFont" style="margin-top: 17px;" id="divbyName">
																		<select id="byName" class="form-control" onchange="setSearchedPatientTemp()"></select>																		
																	</div> -->

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
										<div class="clearfix"></div>
											<div class="panel panel-primary" style="display: none" id="patientInfoDiv">
												<div class="panel-heading">Ambulance Requisition Approval :
													 	<button class="close" onclick="closeWin()" data-dismiss="modal" aria-hidden="true">&times;</button>
												</div>
													<div class="panel-body">								
														<form action="#" method="POST">
														  <div class="col-md-12" style="margin: 0 0 15px">
															<div class="function-buttons" style="float: right;">
																<div class="buttons">
																	<button type="submit" class="btn btn-success"
																		onclick="saveAmbulancePatient()">
																		<i class="fa fa-save"> save</i>
																	</button>
																	<button type="button" class="btn btn-warning"
																		onclick="clearAmbulancePatient()">
																		<i> clear</i>
																	</button>
																</div>
															</div>	
														</div>
<!-- 						 ============================ Requisition Date and  Requisition No and UHID Number ======================
 -->                              <div class="row">
                                       		<!-- <div class="col-md-2">
																<label> <span class="required-field">*</span>Patient
																	Id :
																</label>
												</div>
												<div class="col-md-2">
													<div class="form-group">
														<input type="text" name="id" 
																placeholder="Id" class="form-control">
													</div>
												</div> -->
												
												<div class="col-md-2">
													Requisition Date
														<label>
															<span class="required text-danger">*</span>
														</label>
												</div>
												<div class="col-md-2">	
													<div class="form-group">
		                                                <input type="date" class="form-control"
		                                                 name="requisition_date" id="requisitionDate" 
		                                                 placeholder="" readonly>
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
														<input type="text" name="requi_no" id="ambulanceMasterId" placeholder=" Requisition No" class="form-control" >
													</div>						
												</div>
												
                              <!--        ============================ End :UHID Number and  Patient Name  Consultant Name======================
                        				 ============================ Pickup Location and  Drop Location  Purpose ====================== -->
                                       
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
												
												<div class="hidden">	
													<div class="form-group">
		                                                <input type="text" name="consultantName" id="consultantName" placeholder="consultant Name" class="form-control" readonly>
													</div>						
												</div>
		
												<div class="col-md-2" id="selectdept">
													 Department
														<label>
															<span class="required text-danger">*</span>
														</label>
												</div>
												<div class="col-md-2">	
													<div class="form-group">
														<input type="text" name="department" id="department" placeholder="Department" class="form-control" id="department">
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
														<input type="text" name="ward" id="wardName" placeholder="WardName" class="form-control" >
													</div>						
											</div>
									
                                   <!--   ============================ End :UHID Number and  Patient Name  Consultant Name======================
                        			 ============================ Nurse and  Doctor   Caller Name ====================== -->
                                       
										<div class="col-md-2">
											Nurse
												<label>
													<span class="required text-danger">*</span>
												</label>
										</div>
										<div class="col-md-2">	
											<div class="form-group">
                                               <select class="form-select" name="nurse_name" id="nurse" style="width: 100%">
												
												</select>
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
													<select class="form-select" name="doctor_name"
																	id="doctor" style="width: 100%">
													</select>
											</div>						
										</div>
										
										<div class="col-md-2">
											 Pickup Location
												<label>
													<span class="required text-danger">*</span>
												</label>
										</div>
										<div class="col-md-2">	
											<div class="form-group">
												<input type="text" name="pickup_location" id="pickupLocation" placeholder=" Pickup Location" class="form-control" autocomplete="off">
											</div>						
										</div>
									</div>
									<!-- 
                                     ============================ End :Nurse and  Doctor   Caller Name======================
                        								 ============================ Caller Number and  Status and  Status Remark ====================== -->
										<div class="row">
										
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
											 Purpose :
												<label>
													<span class="required text-danger"></span>
												</label>
										</div>
										<div class="col-md-2">	
											<div class="form-group">
												<input type="text" name="purpose" id="purpose" placeholder="Purpose" class="form-control" autocomplete="off">
											</div>						
										</div>
										
										<div class="col-md-2">
											Caller Number
												<label>
													 <span class="required text-danger">*</span>
												</label>
										</div>
										<div class="col-md-2">
											<div class="form-group">
												<input type="text" name="caller_number" id="callerNumber" maxlength="10"
														placeholder="Caller Number" class="form-control" autocomplete="off">
											</div>
										</div>
										
										<div class="col-md-2">
											Status
												<label>
													<span class="required text-danger">*</span>
												</label>
										</div>
										<div class="col-md-2">	
											<div class="form-group">
												<!-- <input type="text" name="status" id="status"placeholder="Status" class="form-control" > -->
												<select  class="form-control" id="status" name="status">
                                                	<option value="1">OPEN</option>
													<option value="2">Rejected</option>
												</select>
											</div>						
										</div>
									 	
									 	<div class="col-md-2">
										 	CallerName
												<label> 
													<span class="required text-danger">*</span>
												</label>
										</div>
										<div class="col-md-2">
											<div class="form-group">
												<input type="text" name="callerName" id="callerName" placeholder="callerName" class="form-control" autocomplete="off">
											</div>
										</div> 
									<!--============================ End :Caller Number and  Status and  Status Remark ======================-->                          
										<div class="col-md-2">
											 Remark :
												<label>
													<span class="required-field"></span>
												</label>
										</div>
										<div class="col-md-2">	
											<div class="form-group">
                                                <input type="text" name="remark" id="statusRemark" placeholder="Remark" class="form-control" autocomplete="off">
											</div>						
										</div>
									</div>
								</form>
								</div>
								<div class="clearfix"></div>
							</div> 
							
								<div class="col-md-12">
									<div class="tabbable header-tabs">
										<div class="row" style="margin-top: 10px">
											<div class="col-md-12">

												<div class="function-buttons" style="float: right;">
													<div class="buttons">
														<button type="submit" class="btn btn-success"
															onclick="approveAmbulancePatient()">
															<i class="fa fa-save"></i> Approve
														</button>
														<button type="button" class="btn btn-primary"
															onclick="goBack()">Back
														</button>
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
															<div class="panel panel-primary" style="margin-top: 10px">
																<div class="panel-heading" id="divEhatContent">
																	Ambulance Requisition Details</div>
																<div class="panel-body"
																	style="overflow: auto; height: 300px">

																	<table id="" cellpadding="0" cellspacing="0" border="0"
																		class="datatable table table-striped table-bordered">
																		<thead id="ehatTHead">
																			<tr>
																				<th class="col-md-1 center">select</th>
																				<th class="col-md-1 center">Serial No</th>
																				<th class="col-md-1 center">UHID Number</th>
																				<th class="col-md-1 center">Patient Name</th>
																				<th class="col-md-1 center">Department</th>
																				<th class="col-md-1 center">Requisition Date</th>
																				<th class="col-md-1 center">Consultant Name</th>
																				<th class="col-md-1 center">Pickup Location</th>
																				<th class="col-md-1 center">Drop Location</th>
																				<th class="col-md-1 center">Purpose</th>
																				<th class="col-md-1 center">Caller Name</th>
																				<th class="col-md-1 center">Caller Number</th>
																				<th class="col-md-1 center">Status</th>
																				<th class="col-md-1 center">Nurse</th>
																				<th class="col-md-1 center">Doctor</th>
																				<th class="col-md-1 center">Status Remark</th>
																				<th class="col-md-1 center">Edit/Reject</th>
																			</tr>
																		</thead>
																		<tbody id=ambulancePatientList>
									
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

							<div class="footer-tools">
								<span class="go-top"> <i class="fa fa-chevron-up"></i>
									Top
								</span>
							</div>
						</div>
					</div>
					<!-- /CONTENT-->
		
		</section>
		<!--/PAGE -->
		<!-- JAVASCRIPTS -->
		<!-- SLIMSCROLL -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>

		<!-- BLOCK UI -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/autosize/jquery.autosize.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/select2/select2.min.js"></script>
		<!-- TYPEHEAD -->
		<script type="text/javascript"
			src="ehat-design/js/typeahead/typeahead.min.js"></script>
		<!-- UNIFORM -->
		<script type="text/javascript"
			src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
		<!-- DATA TABLES -->
		<!-- Auto-Suggestion 8/1/2015-->
		<script type="text/javascript" src="auto/jquery.mockjax.js"></script>
		<script type="text/javascript" src="auto/bootstrap-typeahead.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
		<!-- COOKIE -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
		<!-- bootstrap datepicker -->
		<script type="text/javascript"
			src="ehat-design/datepicker/bootstrap-datepicker.js"></script>
		<!-- bootstrap datepicker new added  js-->
		<script type="text/javascript"
			src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"></script>
		<script type="text/javascript"
			src="css/inventoryDatepicker/js/jsDatePick.min.1.3.js"></script>
		<!-- CUSTOM SCRIPT -->
		<script src="ehat-design/js/script.js"></script>

		<script>
			jQuery(document).ready(function() {
				App.setPage("index"); //Set current page
				App.init(); //Initialise plugins and elements

				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});

			});
		</script>

		<script type="text/javascript">
			onload = function() {
				
				getAllAmbulancePatient();
			}
		</script>
		<!-- /JAVASCRIPTS -->

	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>