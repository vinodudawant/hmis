<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Immunization Configuration</title>
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
<!-- 	 <script type="text/javascript" src="js/ehat_inventory.js"></script> 
	<script type="text/javascript" src="js/Administrator.js"></script> -->
	<script type="text/javascript" src="js/dd_immunization_configuration.js"></script>
	
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
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="dd_route_master.jsp">DoctorsDesk</a></li>
												<li><a href="">Medication Master</a></li>
												<li>Immunization Configuration</li>
												
												
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row">

								<div class="col-md-12">
									<div class="col-sm-1">
										<label for="inlineFold" class="control-label">Search
											By</label>
									</div>
									<div class="col-md-4">
										<div class="input-group" id="documentByName">
											<input class="form-control"
												title="Please enter Vaccine Name" id="search_vaccine_name"
												type="text" placeholder="Vaccine Name"
												onkeyup="fetchImmunizationConfig();">
											<span class="input-group-btn">
												<button class="btn btn-primary"
													style="height: 25px; margin-bottom: 10px" type="button"
													onclick="fetchImmunizationConfig();">
													<span class="fa fa-search" aria-hidden="true"> </span>
													Search
												</button>
											</span>
										</div>
									</div>
									<div class="col-md-4">
									</div>
									<div class="form-group  col-md-4">
										<button class="btn btn-xs btn-info pull-left" type="button" onclick="clearImmunizationMaster();">
											<i class="fa fa-plus"></i> Immunization Configuration
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
												<div class="col-md-12" id="divForEntry" style="display: none;">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Immunization Configuration
																</div>
															<div class="panel-body">
																<div class="form-row">
																	
																	<div class="form-group col-md-3" >
																		<label for="">
																		
																Vaccine Name:</label><input class="input-group form-control" type="text" title="Enter Vaccine Name"  id="vaccinename" name="" placeholder="Vaccine Name" style="width: 100%">

																	</div>
																	<div class="form-group col-md-3">

																		<label for="">Given from DOB:(At Birth = 0 )</label> <select
																			name='dob' class="input-group form-control"
																			id="dob" style='width: 100%'
																			>
																			<option value="">--select--</option>
																			<option value="0">0</option>
																			<option value="1">1</option>
																			<option value="2">2</option>
																			<option value="3">3</option>
																			<option value="4">4</option>
																			<option value="5">5</option>
																			<option value="6">6</option>
																			<option value="7">7</option>
																			<option value="8">8</option>
																			<option value="9">9</option>
																			<option value="10">10</option>
																			<option value="11">11</option>
																			<option value="12">12</option>
																			<option value="13">13</option>
																			<option value="14">14</option>
																			<option value="15">15</option>
																			<option value="16">16</option>
																			<option value="17">17</option>
																			<option value="18">18</option>
																			<option value="19">19</option>
																			<option value="20">20</option>
																			<option value="21">21</option>
																			<option value="22">22</option>
																			<option value="23">23</option>
																			<option value="24">24</option>
																			<option value="25">25</option>
																			<option value="26">26</option>
																			<option value="27">27</option>
																			<option value="28">28</option>
																			<option value="29">29</option>
																			<option value="30">30</option>
																			<option value="31">31</option>
																		</select>

																	</div>
																	<div class="form-group col-md-3">

																		<label for="">Max. Value:</label> <select
																			name='maxvaluedays' class="input-group form-control"
																			id="maxvaluedays" style='width: 100%'
																			onchange="">
																			<option value="">--select--</option>
																			<option value="0">0</option>
																			<option value="1">1</option>
																			<option value="2">2</option>
																			<option value="3">3</option>
																			<option value="4">4</option>
																			<option value="5">5</option>
																			<option value="6">6</option>
																			<option value="7">7</option>
																			<option value="8">8</option>
																			<option value="9">9</option>
																			<option value="10">10</option>
																			<option value="11">11</option>
																			<option value="12">12</option>
																			<option value="13">13</option>
																			<option value="14">14</option>
																			<option value="15">15</option>
																			<option value="16">16</option>
																			<option value="17">17</option>
																			<option value="18">18</option>
																			<option value="19">19</option>
																			<option value="20">20</option>
																			<option value="21">21</option>
																			<option value="22">22</option>
																			<option value="23">23</option>
																			<option value="24">24</option>
																			<option value="25">25</option>
																			<option value="26">26</option>
																			<option value="27">27</option>
																			<option value="28">28</option>
																			<option value="29">29</option>
																			<option value="30">30</option>
																			<option value="31">31</option>
																		</select>

																	</div>
																	<div class="form-group col-md-3">
																		<label for="">Max:</label>
																		<select name='maxvaluedaysweeks'
																			class="input-group form-control" id="maxvaluedaysweeks"
																			style='width: 100%' onchange="">
																			<option value="">--select--</option>
																			<option value="DAYS">Days</option>
																			<option value="WEEKS">Weeks</option>
																			<option value="MONTHS">Months</option>
																			<option value="YEARS">Year</option>
																		</select>

																	</div>
																	
																	<div class="form-group col-md-3">
																	
																			<label for="">Optional or Mandatory:</label>
																		
																		<select name='optionalormandatory'  class="input-group form-control" id="optionalormandatory" style='width: 100%' > 
																		<option value="0" >--select--</option> 
																		<option value="OPTIONAL">Optional</option>
																		<option value="MANDATORY">Mandatory</option>
																		</select>
																	</div>
																	<div class="form-group col-md-3">

																		<label for="">Gender:</label> <select name='gender'
																			class="input-group form-control" id="gender"
																			style='width: 100%' >
																			<option value="0">--select--</option>
																			<option value="ALL">Both</option>
																			<option value="MALE">Male</option>
																			<option value="FEMALE">Female</option>
																		</select>
																	</div>

																	<div class="form-group col-md-3">
																		<label for=""> Notes:</label><textarea
																			class="input-group form-control" title="Notes..."
																			id="notes" name="" placeholder="Notes..."
																			style="width: 100%"></textarea>
																	</div>



																	<div>
																	<button type="button" class="btn btn-success" onclick="saveImmunizationConfiguration();" style="margin-top: 15px;">Save</button>
																	<button type="button" class="btn btn-warning" onclick="clearFild();" style="margin-top: 15px;">Clear</button>
																	</div>
																	
																</div>
																
																
															</div>

														</div>

													</div>
												</div>
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row">
															<div class="col-md-12">																
																<div class="panel panel-primary" style="margin-top: 5px">
																	<div class="panel-heading" id="divEhatContent">Immunization Configuration
																		Master Table</div>
																	<div class="panel-body" style="overflow: auto;height: 300px" >
																		<table id="fixed_header" class="table table-striped table-bordered" style="overflow: auto;">
																			<thead id="ehatTHead" class="fixedheaderdemo">
																				<tr>
																					<th class="col-md-1 center">Sr.No</th>
																					<th class="col-md-2 center">Vaccine Name</th>
																					<th class="col-md-2 center">Given from DOB</th>
																					<th class="col-md-1 center">Edit</th>
																				</tr>
																			</thead>
																			<tbody id="setfetchimmunizationconfig"
																				>
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
			fetchImmunizationConfig();
		});
	</script>
	<input type="hidden" id=doc_id value="0">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<input type="hidden" id="immunizationconfiguration_id" value="" >
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>