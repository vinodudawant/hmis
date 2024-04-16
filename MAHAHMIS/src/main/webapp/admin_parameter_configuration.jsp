<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Parameter Configuration</title>
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
<script type="text/javascript" src="js/admin_paraconf.js"></script>
</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header.jsp"%>
		</header>
		<!--/HEADER -->

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->
			<%@include file="left_menu_admin.jsp"%>
			
			<%
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
							"dd-MM-yyyy");
					String todays_date = formatter.format(currentDate.getTime());
			%>
			
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
										<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												 <li><a href="IPD_OPD_Database.jsp">Help Desk</a></li> 
												<li><a href="talukaForm.jsp">Masters</a></li>
												<li><a href="nationalityMaster.jsp">Parameter Configurations</a></li>
											</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row" style="margin-bottom: 2%">
								<div class="col-md-12">
									 <div class="col-sm-1">
										<label for="inlineFold" class="control-label">Search By</label>
									</div> 
									 <div class="col-md-4">
										<div class="input-group" id="documentByName">
											<input class="form-control"  style="height: 25px; margin-bottom: 10px"
												title="Please enter Nationality" id="searchId" type="text"
												placeholder="Search prefix" onkeyup="searchNationalityByName(this.value)">
											<span class="input-group-btn">
												<button class="btn btn-primary" style="height: 25px; margin-bottom: 10px" type="button" onclick="">
													<span class="fa fa-search" aria-hidden="true"> </span>Search
												</button>
											</span>
										</div>
									</div> 
									<div class="col-md-3" style="margin-left: -9%">
										<button class="btn btn-xs btn-info pull-right" type="button" onclick="toggleEntryDiv('divForAddForm')">
											<i class="fa fa-plus"></i> Add Prefix
										</button>
									</div>
									<!-- <div class="col-md-3" style="margin-left: -4%">
										<button class="btn btn-xs btn-info pull-right" type="button"
											onclick="downloadSampleExcelSheet()">
											<i class="fa fa-plus"></i> Download Sample Excel
										</button>
									</div>
									<div class="col-md-3" style="margin-left: -11%">
										<button class="btn btn-xs btn-info pull-right" type="button"
											onclick="uploadExcelSheet()">
											<i class="fa fa-plus"></i> Upload Excel
										</button>
									</div> -->
								</div>
							</div>

							<div class="row">
								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="row">
											
											<!-- ================================================ -->
											<!-- DIV ADD FORM -->
											<!-- ================================================ -->
												<div class="col-md-12" id="divForAddForm" style="display: none;">
													<div class="container">
														<div class="panel panel-primary" style=" border-color: green;">
															<div class="panel-heading" id="divEhatContent"></div>
																<div class="panel-body">

																<div class="form-group col-md-4">
																	<label>Prefix</label> <input type="text"
																		class="form-control" id="prefix" 
																		placeholder="Enter Prefix">
																</div>

																<div class="form-group col-md-4">
																	<label>Prefix Description</label> <input type="text"
																		class="form-control" id="prefix_description" 
																		placeholder="Enter Prefix Description">
																</div>

																<div class="form-group col-md-4">
																	<label>Status</label> 
																		<select class="form-control" id="prefix_status">
																			<option value="Y">Active</option>
																			<option value="N">In-Active</option>
																		</select>
																</div>
																
																	<div class="form-group">
																		<label class="col-sm-4 control-label"></label>
																		<div class="col-sm-4">
																			<input type="button" class="btn btn-success" style="margin-top: 21px;margin-left: 0%;"
																				onclick="savePrefix();" value="Save">
																		</div>
																		<div class="col-sm-4">
																			<input type="button" class="btn btn-info" style="margin-top: 21px;margin-left: -95%;"
																				onclick="resetPrefixForm()" value="Reset">
																		</div>
																	</div>
															</div>
														</div>
													</div>
												</div>
											<!-- ================================================ -->
											<!-- ================================================ -->
												
												
											<!-- ================================================ -->
											<!-- DIV UPDATE FORM -->
											<!-- ================================================ -->
												<div class="col-md-12" id="divForUpdateForm" style="display: none;">
													<div class="container">
														<div class="panel panel-primary" style=" border-color: green;">
															<div class="panel-heading" id="divEhatContent"></div>
																<div class="panel-body">

																<div class="form-group col-md-4">
																	<label>Prefix</label> <input type="text"
																		class="form-control" id="prefix_update" 
																		placeholder="Enter Prefix">
																</div>

																<div class="form-group col-md-4">
																	<label>Prefix Description</label> <input type="text"
																		class="form-control" id="prefix_description_update" 
																		placeholder="Enter Prefix Description">
																</div>

																<div class="form-group col-md-4">
																	<label>Status</label> 
																		<select class="form-control" id="prefix_status_update">
																			<option value="Y">Active</option>
																			<option value="N">In-Active</option>
																		</select>
																</div>
																
																<input type="hidden" id="prefix_id" value="0">
																
																	<div class="form-group">
																		<label class="col-sm-4 control-label"></label>
																		<div class="col-sm-4">
																			<input type="button" class="btn btn-success" style="margin-top: 21px;margin-left: 0%;"
																				onclick="updatePrefix();" value="Update">
																		</div>
																	</div>
															</div>
														</div>
													</div>
												</div>
												
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row">
															<div class="col-md-6">																
																<div class="panel panel-primary" style="margin-top: 7px">
																	<div class="panel-heading" id="divEhatContent">Parameter Configuration
																		Table</div>
																	<div class="panel-body">
																		<table id="fixed_header" class="table table-bordered">
																			<thead id="ehatTHead" class="fixedheaderdemo">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-2 center">Prefix Name</th>
																					<th class="col-md-2 center">Prefix Description</th>
																					<th class="col-md-1 center">Status</th>
																					<th class="col-md-1 center">View</th>
																					<th class="col-md-1 center">Edit</th>
																					<th class="col-md-1 center">Delete</th>
																				</tr>
																			</thead>
																			<tbody id="nationalityTableBody">
																			</tbody>
																		</table>																		
																	</div>
																</div>
															</div>
															<!-- ======================================= -->
															<!-- END:col-md-6 -->
															<!-- ======================================= -->
															<div class="col-md-6" id="display-parameter-details" style="display: none">																
																<div class="panel panel-primary" style="margin-top: 7px">
																	<div class="panel-heading" id="divEhatContent">Parameter Configuration Details
																		Table</div>
																	<div class="panel-body">
																	
																		<div class="parameter-details-form">
																			<div class="row">
																				<div class="col-md-6">
																					<div class="form-group">
																						<label>Prefix sub option</label>
																						<input type="text" class="form-control" placeholder="Enter sub option" id="prefix-suboption">
																					</div>
																				</div>
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label>Prefix sub value</label>
																						<input type="text" class="form-control" placeholder="Enter sub value" id="prefix-subvalue">
																					</div>
																				</div>
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label>Default Value</label>
																						<select class="form-control" id="default-value">
																							<option value="Y">Y</option>
																							<option value="N">N</option>
																						</select>
																					</div>
																				</div>
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label>Status</label>
																						<select class="form-control" id="prefix-details-status">
																							<option value="Y">Active</option>
																							<option value="N">In-Active</option>
																						</select>
																					</div>
																				</div>
																
																			<input type="hidden" id="prefix_detail_id" value="0">
																				
																				<div class="col-md-12">
																					<div style="margin: 15px 0 10px;padding: 0 0 10px;border-bottom: 1px solid #CCC">
																						<div class="row">
																							<div class="col-md-2" id="add_button">
																								<input type="button" class="btn btn-success" onclick="savePrefixDetails()"
																								value="Save">
																							</div>
																							<div class="col-md-2" id="update_button" style="display: none">
																								<input type="button" class="btn btn-success" onclick="updatePrefixDetails()"
																								value="Update">
																							</div>
																							<div class="col-md-1">
																								<input type="button" class="btn btn-danger" onclick="resetPrefixDetailsForm()"
																								value="Reset">
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	
																		<table id="fixed_header" class="table table-bordered">
																			<thead id="ehatTHead" class="fixedheaderdemo">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-2 center">Sub Options</th>
																					<th class="col-md-2 center">Sub Value</th>
																					<th class="col-md-2 center">Status</th>
																					<th class="col-md-2 center">Edit</th>
																					<th class="col-md-2 center">Delete</th>
																				</tr>
																			</thead>
																			<tbody id="parameterdetailsTableBody">
																			</tbody>
																		</table>																		
																	</div>
																</div>
															</div>
															<!-- ======================================= -->
															<!-- END:col-md-6 -->
															<!-- ======================================= -->
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
			getAllPrefixes();
		});
	</script>
	
	<input type="hidden" id="prefixId" value="0">
	<input type="hidden" id="prefixDetailsId" value="0">

	<%-- <input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>"> --%>
	<%-- <input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>"> --%>
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>