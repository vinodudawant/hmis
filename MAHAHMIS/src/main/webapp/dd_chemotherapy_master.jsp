<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Chemotherapy Master</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
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

<!-- include js for development -->
<!-- <script type="text/javascript" src="js/ehat_center.js"></script> -->
<script type="text/javascript" src="js/dd_chemotherapy_master.js"></script>
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

			<%@include file="dd_menu_DoctorDesk.jsp"%>

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
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><i class="fa fa-home"></i> <a href="dd_chemotherapy_master.jsp">Chemotherapy Master</a></li>

										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row">

								<div class="col-md-12">
									<div class="col-sm-1">
										<label for="inlineFold" class="control-label">Search By</label>
									</div>
									<div class="col-md-4">
										<div class="input-group" id="documentByName">
											<input class="form-control typeahead" title="Please enter name" id="searchId"
												type="text" placeholder="Search" onkeyup="centerChemoAutoSuggestion(this.id)">
											<span class="input-group-btn">
												<button class="btn btn-primary"	style="height: 25px; margin-bottom: 10px" type="button"  onclick="centerChemoMasterSearchById();">
													<span class="fa fa-search" aria-hidden="true"> </span>
													Search
												</button>
											</span>
										</div>
									</div>
									<div class="col-md-4">
										<button class="btn btn-xs btn-info pull-left" type="button" onclick="toggleEntryDiv('divForEntryChemo')">
											<i class="fa fa-plus"></i> Add Chemotherapy
										</button>
									</div>
								</div>
							</div>

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">

											<div class="row">
												<div class="col-md-12" id="divForEntryChemo" style="display:none;">
													<div class="container">
														<div class="panel panel-primary" style="height: 293px;">
															<div class="panel-heading" id="divEhatContent">Chemotherapy Master
															</div>
															<div class="panel-body">
																<form id="financialFormId">
																	<div class="form-row">
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Chemotherapy</label> 
																			<input class="form-control tip-focus" title="Please enter Chemotherapy" id="chemotherapyName" type="text" placeholder="Chemotherapy" required="required">
																			
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Indication</label> 
																			<input class="form-control tip-focus" title="Please enter Indication" id="indication" type="text" placeholder="Indication">
																			
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Frequency</label> 
																			<input class="form-control tip-focus" title="Please enter Frequency" id="frequency" type="text" placeholder="Frequency">
																			
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Number of Cycles</label> 
																			<input class="form-control tip-focus" title="Please enter Number of Cycles" id="noOfCycle" type="text" placeholder="Number of Cycles">
																			
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Dose</label> 
																			<input class="form-control tip-focus" title="Please enter Dose" id="dose" type="text" placeholder="Dose">
																			
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Investigation</label> 
																			<input class="form-control tip-focus" title="Please enter Investigation" id="investigation" type="text" placeholder="Investigation">
																			
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Drug Orders</label> 
																			<input class="form-control tip-focus" title="Please enter Drug Orders" id="drugOrders" type="text" placeholder="Drug Orders">
																			
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Post-Medications</label> 
																			<input class="form-control tip-focus" title="Please enter Post-Medications" id="postMedication" type="text" placeholder="Post-Medications">
																			
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Post Chemo Advice</label> 
																			<input class="form-control tip-focus" title="Please enter Post Chemo Advice" id="advice" type="text" placeholder="Post Chemo Advice">
																			
																		</div>
																		<div class="form-group col-md-3">
																		<label for="inputEmail4">weight</label>
																		<input class="form-control tip-focus" title="please enter Weight" id="weight" type="text" placeholder="Weight">
																		</div>
																		
																		<div class="form-group col-md-3">
																		<label for="inputEmail4">Height</label>
																		<input class="form-control tip-focus" title="please enter Height"id="height" type="text" placeholder="Height">
																		</div>
																		
																		<div class="form-group col-md-3">
																		<label for="inputEmail4">BSA</label>
																		<input class="form-control tip-focus" title="please enter BSA"id="bsa" type="text" placeholder="BSA">
																		</div>
																		
																		<div class="form-group col-md-3">
																		<label for="inputEmail4">Blood Orders</label>
																		<input class="form-control tip-focus" title="please enter Blood Orders" id="bloodorders" type="text" placeholder="Blood Orders"> 
																		</div>
																		
																		<div class="form-group col-md-3">
																		<label for="inputEmail4">Allergies</label>
																		<input class="form-control tip-focus" title="please enter Allergies"id="allergies" type="text" placeholder="Allergies"> 
																		</div>
																		
																		<div class="form-group col-md-3">
																		<label for="inputEmail4">History</label>
																		<input class="form-control tip-focus" title="please enter History"id="history" type="text" placeholder="History"> 
																		</div>
																		
																		
																		
																	
																	<button type="button" class="btn btn-primary" onclick="refreshChemoMaster();" style="margin-top: 15px;">Refresh</button>
																	<button type="button" class="btn btn-primary" onclick="saveChemoMaster();"	style="margin-top: 15px;">Save</button>
																	</div>
																</form>
															</div>

														</div>

													</div>
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
																	style="margin-top: 114px;">
																	<div class="panel-heading" id="divEhatContent">Chemotherapy Master Details</div>
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Chemotherapy ID</th>
																					<th class="col-md-1 center">Chemotherapy </th>
																					<th class="col-md-1 center">Edit</th>
																					<th class="col-md-1 center">Delete</th>
																				</tr>
																			</thead>

																			<tbody id="chemoDetails">
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
							<!-- /NEW ORDERS -->

						</div>

						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
					</div>
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
		
	<script src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
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
	<script type="text/javascript" src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
	
	<!-- COOKIE -->
	<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>

	<script src="auto/jquery.mockjax.js"></script>
	<script src="auto/bootstrap-typeahead.js"></script>
	<!-- CUSTOM SCRIPT -->

	<script>
		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			getAllChemoMaster();
		});
	</script>
	<input type="hidden" id=chemotherapyId value="">
	
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>