<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>BMW Complete</title>

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
			getDepts();
			fetchWardName();
		});
	</script>

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

<script type="text/javascript" src="js/bmw_complete.js"></script>

<!-- <script type="text/javascript" src="js/bmw_requisition_approval.js"></script> -->
      
      <%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd-MM-yyyy");
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

			<%@include file="BMW_left_menu.jsp"%>

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
											<a href="Dashboard.jsp">Home</a>
										</li>
										<li><a href="BMW_complete.jsp">BMW Complete</a></li>
									</ul>

									<!-- /BREADCRUMBS -->
									<div class="clearfix"></div>
								</div>
							</div>
						</div>

						<div class="function-buttons" style="float: right;">
							<div class="buttons">
								<button type="submit" class="btn btn-success" onclick="completeBmwRequisition()"><i class="fa fa-save"></i> Collect</button>
								<button type="button" class="btn btn-primary" onclick="goBack()"> Back</button>
							</div>
						</div>
			
						<div class="row">
							<div class="col-md-12">
								<div class="panel panel-default">
									<div class="panel-body">
										<div class="header-record-search">
											<div class="row">
												<div class="col-md-3">
													<div class="form-group">
														<label>
															Requisition Date From  :
														</label>
														<input type="date" id="fdate" class="form-control" name="from_date" placeholder="">
													</div>
												</div>
													
												<div class="col-md-3">
													<div class="form-group">
														<label>
															To  :
														</label>
														<input type="date" id="tdate" class="form-control" name="to_date" placeholder="">
			
													</div>
												</div>
											
												<div class="col-md-3">
													<div class="form-group">
														<label>
															 Department
															<span class="required text-danger">*</span>
														</label>																											
														<select class="form-control" id="department" name="department_name" >
														 	<!-- <option value="">IPD</option>
														 	<option value="">OPD</option> -->
														</select>
													</div>
												</div>
											
												<div class="col-md-3">
														<div class="form-group">
															<label>
															 Ward Name :
																<span class="required-field"></span>
															</label>				
															<select class="form-control" name="ward_name" id="wardTypeSelect" >
																
																<!-- <option value="">Ward 1</option>
																<option value="">Ward 2</option> -->
															</select> 
														</div>
												</div>
													
												<div class="col-md-3">
														<div class="form-group">
															<label>
															 Status
																<span class="required text-danger">*</span>
															</label>				
															<select class="form-control" id="bag_Status" name="bag_Status">
															</select> 
														</div>
												</div>
													
												<div class="col-md-3">
													<div class="form-group">
															<label>
															 Type of Bag
																<span class="required text-danger">*</span>
															</label>		
															<select class="form-control" name="type_of_bag" id="typeOfBag"></select> 
													</div>
												</div>		
											
												<div class="col-md-1">											
														<button type="button" onClick="searchbyFileters()" class="btn-primary form-control search-button" style="margin: 18px 0 0">
															Search											
														</button>	
												</div>
											</div>
										<!-- ============================ Department and ward name and status row ====================== -->
											<div class="row">
									
											</div>
								<!-- ============================ End :Department and ward name row ====================== -->
									<div class="clearfix"></div>
								</div>		
													
					<!-- <div class="panel panel-primary">
						<div class="panel-heading">BMW Complete :</div>
							<div class="panel-body">								
															
								<form action="#" method="POST">
									============================ Requisition Date and  Requisition No and Weight of Bag ======================
                                       	<div class="row">
										<div class="col-md-2">
											<label>
												<span class="required-field">*</span>Requisition No :
											</label>
										</div>
										<div class="col-md-2">	
											<div class="form-group">
                                                <input type="text" name="requ_no" placeholder="Requisition No " class="form-control" >
											</div>						
										</div>

										<div class="col-md-2">
											<label>
												<span class="required-field">*</span> Requisition Date:
											</label>
										</div>
										<div class="col-md-2">	
											<div class="form-group">
												<input type="date" name="requi_date" placeholder=" Requisition Date" class="form-control" >
											</div>						
										</div>
										<div class="col-md-2">
											<label>
												<span class="required-field">*</span>Department:
											</label>
										</div>
										<div class="col-md-2">	
											<div class="form-group">
                                                <input type="text" name="department" placeholder="Department" class="form-control" >
											</div>						
										</div>
										<div class="col-md-2">
											<label>
												<span class="required-field">*</span>Ward:
											</label>
										</div>
										<div class="col-md-2">	
											<div class="form-group">
                                                <input type="text" name="ward" placeholder="Ward" class="form-control" >
											</div>						
										</div>
										<div class="col-md-2">
											<label>
												<span class="required-field">*</span>Weight of Bag :
											</label>
										</div>
										<div class="col-md-2">	
											<div class="form-group">
                                                <input type="text" name="ward" placeholder="Ward" class="form-control" >
											</div>						
										</div>
										<div class="col-md-2">
											<label>
												<span class="required-field">*</span>Type of Bag :
											</label>
										</div>
										<div class="col-md-2">	
											<div class="form-group">
                                                <input type="text" name="type_of_bag" placeholder="Type of Bag" class="form-control" >
											</div>						
										</div>
										
									</div>
                                     ============================ End :Requisition Date and  Requisition No and Weight of Bag   ======================
                        			 ============================ Pickup Location and Drop Location and  Nurse-In Charge ======================
                                       	<div class="row">
									

										<div class="col-md-2">
											<label>
												<span class="required-field">*</span>Pickup Location:
											</label>
										</div>
										<div class="col-md-2">	
											<div class="form-group">
												<input type="text" name="pick_up_location" placeholder="Pickup Location" class="form-control" >
											</div>						
										</div>
										<div class="col-md-2">
											<label>
												<span class="required-field">*</span>Drop Location :
											</label>
										</div>
										<div class="col-md-2">	
											<div class="form-group">
												<input type="text" name="drop_location" placeholder="Drop Location" class="form-control" >
											</div>						
										</div>
											<div class="col-md-2">
											<label>
												<span class="required-field">*</span>Nurse-In Charge :
											</label>
										</div>
										<div class="col-md-2">	
											<div class="form-group">
                                                <input type="text" name="nurese_in_charge" placeholder="Nurse-In Charge" class="form-control" >
											</div>						
										</div>
									</div>
                                     ============================ End :Pickup Location and Drop Location and  Nurse-In Charge ======================
                        			 ============================ Caller Name   and Caller Number and Status  ======================
                                       	<div class="row">
									

										<div class="col-md-2">
											<label>
												<span class="required-field">*</span> Caller Name :
											</label>
										</div>
										<div class="col-md-2">	
											<div class="form-group">
												<input type="text" name="caller_name" placeholder="Caller Name" class="form-control" >
											</div>						
										</div>
									
										<div class="col-md-2">
											<label>
												<span class="required-field">*</span>Caller Number :
											</label>
										</div>
										<div class="col-md-2">	
											<div class="form-group">
                                                <input type="text" name="caller_name" placeholder="Caller Number" class="form-control" >
											</div>						
										</div>
										<div class="col-md-2">
											<label>
												<span class="required-field">*</span>Status  :
											</label>
										</div>
										<div class="col-md-2">	
											<div class="form-group">
                                                <input type="text" name="status" placeholder="Status" class="form-control" >
											</div>						
										</div>
									</div>
                                     ============================ End :SCaller Name   and Caller Number and Status  ======================
                        			 ============================ Assign To and  Remark row  ======================
                                       	<div class="row">

										<div class="col-md-2">
											<label>
												<span class="required-field">*</span>Assign To:
											</label>
										</div>
										<div class="col-md-2">	
											<div class="form-group">
												<input type="text" name="assign_to" placeholder="Assign To" class="form-control" >
											</div>						
										</div>
									
										<div class="col-md-2">
											<label>
												<span class="required-field">*</span>Remark :
											</label>
										</div>
										<div class="col-md-2">	
											<div class="form-group">
                                                <input type="text" name="remark" placeholder="Remark" class="form-control" >
											</div>						
										</div>
									
									</div>
                                     ============================ End :Status and  Remark row  ======================
								</form> -->
								
								<div class="clearfix"></div>
						</div>

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
											<div class="panel-heading" id="divEhatContent"> BMW  Complete :</div>
											<div class="panel-body"
												style="overflow: auto; height: 300px">
											
												<table class="datatable table table-striped table-bordered">
													<thead id="">
														<tr>
															<!-- <th class="col-md-1 center">Edit</th>
															<th class="col-md-1 center">Delete</th> -->
															<th class="col-md-1 center"> Id</th>
															<th class="col-md-1 center">Requisition No</th>
															<th class="col-md-1 center">Requisition Date</th>
															<th class="col-md-1 center">Department</th>
															<th class="col-md-1 center">Ward</th>
															<th class="col-md-1 center">Type of Bag</th>
															<th class="col-md-1 center">Weight of Bag</th>
															<th class="col-md-1 center">Pickup Location</th>
															<th class="col-md-1 center">Drop Location</th>
															<th class="col-md-1 center">Nurse-In Charge</th>
															<th class="col-md-1 center">Caller Name</th>
															<th class="col-md-1 center">Caller Number</th>
															<th class="col-md-1 center">Status</th>
															<th class="col-md-1 center">Collect</th>
															<th class="col-md-1 center">Collected By</th>
															<th class="col-md-1 center">Remark</th>
														</tr>
													</thead>
													<tbody id="bmwRequisitionDetails">
											   
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
		
		getBmwRequisitionDetailsMaster();
		getallbagtypes();
		getstatustypes();
	}
</script>
	<!-- /JAVASCRIPTS -->

</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>