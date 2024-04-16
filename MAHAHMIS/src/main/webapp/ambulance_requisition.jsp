<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Requisition For Ambulance</title>

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
	}
</script>

	<script>
		
		jQuery(document).ready(function() {
			getDepts();
			fetchWardName();
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

<script type="text/javascript" src="js/ambulance_requisition.js"></script>
      
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
										
										<li><a href=ambulance_requisition.jsp>Requisition For Ambulance</a></li>
									</ul>

									<!-- /BREADCRUMBS -->
									<div class="clearfix"></div>
								</div>
							</div>
						</div>

					<!-- 	<div class="function-buttons" style="float: right;">
							<div class="buttons">
								<button type="submit" class="btn btn-success"><i class="fa fa-save"></i> Save</button>
								<button type="button" class="btn btn-danger"> Cancel</button>
							</div>
						</div> -->
			
						
						<div class="row">
							<div class="col-md-12" id="divForEntryAmbulanceRequisitionType">
								<div class="panel panel-default">
									<div class="panel-body" id="departmentDiv">

								<div class="header-record-search">
									
										<div class="row">
											<div class="col-md-2">
												<label>
													Requisition From date :
												</label>
											</div>
											<div class="col-md-3">
												<div class="form-group">
													<input type="date" class="form-control" name="from_date" placeholder="">
												</div>
											</div>
											<div class="col-md-2">
												<label>
													To date :
												</label>
											</div>
											<div class="col-md-3">
												<div class="form-group">
													<input type="date" class="form-control" name="to_date" placeholder="">
												</div>
											</div>
											<!-- <div class="col-sm-2">
												<button type="button" class="btn-primary form-control search-button" onclick="AmbulancePatientSearchById();">
													Search
												</button>
											</div> -->
											</div>
													<div class="row">
														<div class="tab-pane" id="confirm">

												
																<div class="col-md-12-1">
																	<div style="" class="col-md-1">
																		<label class="TextFont"
																			style="margin-left: 0%; margin-top: 35%; font-size: 11px;">Search By:</label>
																	</div>
																
																	<!-- <div class="col-md-2">
																		<label class="TextFont"
																			style="margin-left: -68%; margin-top: 3%;">Patient
																			Name:</label>
																	</div> -->
																	
																	<!-- <div  class="col-md-4 TextFont" style="margin-left: -15% ;margin-top: 17px;";
																		id="divbyName">
																		<input name="byName" type="text" id="byName"
																			class="typeahead form-control input-SmallText"
																			onkeyup="setAutoCompleteMarkVisitForList(this.id,'auto')" placeholder="Name, Mobileno , Adharno"/>
																		onkeypress="return SearchPatientNameOnEnter(event,'OPDOldPatientDatabase')" />
																	</div> -->
																	
																	<div class="col-md-3 TextFont" style="margin-top: 17px;margin-left: 81px;" id="divbyName">
																		
																		<select id="patSearchType" class="form-control input-SmallText" onchange="setPatientSearchType()">
																			<option value="1">UHID Id</option>
																			<option value="2">Patient Name</option>
																			<option value="3">Patient Mobile</option>
																			<option value="4">Patient AddharNo</option>
																		</select>
																		
																	</div>

																	<div class="col-md-4 TextFont" style="margin-top: 17px;" id="divbyName">
																		<input name="byName" type="text" id="byName" class="form-control input-SmallText"
																			onkeyup="setAutoPatientName(this.id,'reg',event)" placeholder="Patient Id,Name,Mobileno"/>																		
																	</div>
																	
																	<!-- <div class="col-md-4 TextFont" style="margin-top: 17px;" id="divbyName">
																		<select id="byName" class="form-control" onchange="setSearchedPatientTemp()"></select>																		
																	</div> -->
																	
																	<div  id="otherDiv" class="col-md-4 TextFont" style="margin-left: -15% ;margin-top: 7px;display:none; ">
																		<input name="byName1" type="text" id="byName1"
																			class="typeahead form-control input-SmallText"
																			placeholder="Name"
																			onkeyup="autosuggesstionForOtherRecords(this.id,'auto')" />
																		<!-- onkeypress="return SearchPatientNameOnEnter(event,'OPDOldPatientDatabase')" /> -->
																	</div>
															</div>
															</div>
															</div>
										</div>
									<!-- ============================ Department and ward name row ====================== -->
									<div class="row">
										
										<div class="col-md-2" id="selectdept">
											<label>
												<span class="required-field">*</span> Department :
											</label>
										</div>
										<div class="col-md-3">
											<div class="form-group">												
												<select class="form-select" id="department"
													name="department"
													class="col-md-12 full-width-fix form-control"
													onchange="refGenFormHideShow()"
													style="width: 95%;">
												 	
												</select>
											</div>
										</div>
												<div class="col-md-2">
											<label>
												<span class="required-field">*</span> Ward Name :
											</label>
										</div>
										<div class="col-md-3">	
											<div class="form-group">
												<select class="form-select" name="ward_name" id="wardTypeSelect"
													class="col-md-12 full-width-fix form-control"
													onchange="refGenFormHideShow()"
													style="width: 95%;">
													<!-- <option value="0">--Select--</option>
														<option value="1">Ward 1</option>
														<option value="2">Ward 2</option>
														<option value="3">Ward 3</option>
														<option value="4">Ward 4</option>
														<option value="5">Ward 5</option> -->
												</select> 
											</div>						
										</div>
										
									
									</div>
								<!-- ============================ End :Department and ward name row ====================== -->
								
								<!-- ============================Patient Search and Requisition Search ====================== -->
								   	<div class="row">
									<!-- 	<div class="col-md-2">
											<label>
												<span class="required-field">*</span>Patient Search :
											</label>
										</div>
										<div class="col-md-3">	
											<div class="form-group">
                                                <input type="text" name="patient_search" id="searchId" placeholder="Serach by Patient Id" class="form-control" >
											</div>						
										</div> -->

										<div class="col-md-2">
											<label>
												<span class="required-field">*</span> Requisition Search :
											</label>
										</div>
										<div class="col-md-3">	
											<div class="form-group">
												<input type="text" name="requisition_search" placeholder="Serach with  Id" class="form-control" >
											</div>						
										</div>
										<div class="col-md-2">
												<button type="button" class="btn-primary form-control search-button" onclick="openAmbulanceRequisitionFormJsp()">Add New
													
												</button>
											</div>
									</div>
									
										
		                         <!-- ============================ End :Patient Search and Requisition Search====================== -->
 									
									<div class="clearfix"></div>
								</div>		
													
					<div class="panel panel-primary">
					

                     	<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row" style="margin-top: 10px">
															<div class="col-md-12">
																<div class="col-sm-12">
																	<div class="pull-right">
																		<div id="datatable1_filter" class="dataTables_filter">
																			<label id="searchlabel"> </label>
																		</div>
																	</div>
																</div>
																<div class="panel panel-primary"
																	style="margin-top: 20px">
																	<div class="panel-heading" id="divEhatContent">
																		Ambulance Requisition Details</div>
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">

																		<table id="" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">patientId</th>
																					<th class="col-md-1 center">UHID Number</th>
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">Requisition Date</th>
																					<th class="col-md-1 center">Consultant Name</th>
																					<th class="col-md-1 center">Pickup Location</th>
																					<th class="col-md-1 center">Drop Location</th>
																					<th class="col-md-1 center">Purpose</th>
																					<th class="col-md-1 center">Caller Name</th>
																					<th class="col-md-1 center">Caller Number</th>
																					<th class="col-md-1 center">Status</th>
																					<th class="col-md-1 center">time</th>
																					<th class="col-md-1 center">Status Remark</th>
																					<th class="col-md-1 center">Edit</th>
																					<th class="col-md-1 center">Delete</th>
																				</tr>
																			</thead>
												<tbody id="ambulancePatientList">
											   <!-- <tr>
		                                           <td> <i class="fa fa-edit" style="font-size:13px;color:black"></i></td>
		                                           <td> <i class="fa fa-trash-o" style="font-size:13px;color:red"></i></td>
		                                           	<td>10/11/2021 </td>
		                                             <td> 1001 </td>
		                                             <td>102001 </td>
		                                             <td> Nilesh Thakur </td>
		                                              <td> Dr. Amit</td>
		                                              <td> KEM Hospital </td>
		                                               <td>JJ Hospital </td>
		                                              <td> Check up </td>
		                                              <td> Sr .Merry </td>
		                                               <td> Dr .Nil</td>
		                                               <td>  Amish</td>
		                                               <td> 9987656789</td>
		                                               <td> Open</td>
		                                               <td> Remark Status</td>
			                                       </tr> -->
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
							<span class="go-top">
								<i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
					</div><!-- /CONTENT-->
				</div>
			</div>
		</div>
		</div>
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
	
	<script type="text/javascript">
	onload = function() {
		
		// get all name prefixes
		getAllAmbulancePatient();
		
		
		// get vehicle 
		//getAmbulancePatientList();
		 
	}
</script>
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