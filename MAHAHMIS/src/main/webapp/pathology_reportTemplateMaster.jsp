<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Report Template Master</title>
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
	
	<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />
<link href="css/bootstrap-toggle.min.css" rel="stylesheet">

<!-- include js for development -->
<script src="js/bootstrap-toggle.min.js"></script>
	
<!-- CKEDITOR -->
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>
	<!-- include js for development -->
	<script type="text/javascript" src="js/pathology_reportTemplateMaster.js"></script>
</head>
<body>
	<%
		ResourceBundle resourceBundle = ResourceBundle.getBundle("Ehat");
		String pathologyId = (String) resourceBundle.getObject("pathologyId").toString();
	%>
	<c:if test="${ sessionScope.userType != null }">
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%>
		</header>
		<!--/HEADER -->

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->
			<%@include file="left_menu_pathologyNew.jsp"%>
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
											<li><a href="pathology_dashboard.jsp">LIS</a></li>
											<li>Report Template Master</li>
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
											<input class="form-control"
												title="Please enter test name" id="searchId" type="text"
												placeholder="Test  Name" onkeyup="searchTestByName(this.value)">
											<span class="input-group-btn">
												<button class="btn btn-primary" style="height: 25px; margin-bottom: 10px" type="button" onclick="">
													<span class="fa fa-search" aria-hidden="true"> </span>Search
												</button>
											</span>
										</div>
									</div> 

									<button class="btn btn-xs btn-info pull-left editUserAccess" type='button'
										data-toggle="modal" data-target="#reportTemplateModal" onclick="resetReportTemplateForm()">
										<i class="fa fa-plus"></i> Create New Template
									</button>
								</div>
							</div>

							<!-- modal starts here -->
							<div class="modal fade" id="reportTemplateModal" 
								role="dialog" aria-labelledby="reportTemplateModal" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 80%;">
									<div class="modal-content">
										<div class="modal-header">
											<h4 class=" center" id="exampleModalLabel">Create Report Template</h4>
											<div class="row">
												<div class="pull-right" style="margin-right: 15px;">
													
														<button type="button" class="btn btn-primary" onclick="saveLabReportTemplate()">Save</button>
														<button type="button" data-dismiss="modal"class="btn btn-danger" onclick="resetReportTemplateForm();">Close</button>
												</div>
											</div>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12">
 													<div class="container">
														<div class="panel-body">
															<div class="tab-content">
																<div id="labTestTab">
																	<div class="form-group col-md-12">
																		<div class="form-group col-md-2">
																			<label>Create Template For </label><b style="color: red;">*</b>
																		</div>
																	
																		<div class="form-group col-md-2">
																			<label>Profile  </label>
																			<input type="radio" class="form-group" name="templateFor" checked="checked" value="profile" onclick="hideShowOnCreateTempFor();">
																		</div>
																	
																		<div class="form-group col-md-2">
																			<label>Test</label>
																			<input type="radio" class="form-group" name="templateFor" value="test" onclick="hideShowOnCreateTempFor();">
																		</div>
																	
																		<div class="form-group col-md-3" id="multiProfileDiv">
																			<label>Lab Profiles</label><b style="color: red;">*</b>
																			<select style="width: 100%" id="profileId1" multiple="multiple" onchange="getAllTestsUnderProfile();">
																				<option value="0">Select Profile</option>
																			</select>
																		</div>
																		<div class="form-group col-md-3" id="singleProfileDiv" style="display: none;">
																			<label>Lab Profiles</label><b style="color: red;">*</b>
																			<select style="width: 100%" id="profileId2" onchange="getAllTestsUnderProfile();">
																				<option value="0">Select Profile</option>
																			</select>
																		</div>
																	</div>
																	
																	<div class="form-group col-md-12" id="testDiv" style="display: none;">
																		<div class="form-group col-md-2">
																			<label>Default Template For </label><b style="color: red;">*</b>
																		</div>
																	
																		<div class="form-group col-md-2">
																			<label>All Tests</label>
																			<input type="radio" class="form-group" name="defaultTemplateFor" checked="checked" value="All" onclick="hideShowOnCreateTempFor();">
																		</div>
																	
																		<div class="form-group col-md-2">
																			<label>Individual Test</label>
																			<input type="radio" class="form-group" name="defaultTemplateFor" value="Individual" onclick="hideShowOnCreateTempFor();">
																		</div>

																		<div class="form-group col-md-3">
																			<label>Lab Tests</label><b style="color: red;">*</b>
																			<select style="width: 100%" id="testId">
																				<option value="0">Select Test</option>
																			</select>
																		</div>
																	</div>
																	
																	<!-- Drag and drop start  -->
																	<div class="col-md-12">
																		<div class="col-md-6">
																			<div class="box border primary">
																				<div class="box-title">
																					<h4>
																						<i class="fa fa-medkit"></i> Content (Drag From Here)
																					</h4>
																				</div>
																			<div class="box-body">
																				<div class="col-md-12-1" style="margin-top: 0%;">
																					<table class="table table-bordered"
																						style="width: 100%;">
																						<thead class="cf">
																							<tr>
																								<th class="col-md-1 center"
																									style="height: 21.5px;">
																									<div class="TextFont">#</div>
																								</th>
																								<th class="col-md-11 center"
																									style="height: 21.5px;">
																									<div class="TextFont">Content Name</div>
																								</th>
																							</tr>
																						</thead>
																					</table>
																				</div>

																				<div class="col-md-12-1"
																					style="margin-top: 0px; margin-bottom: 10px; border: 1px solid #ddd; height: 175px; overflow-y: scroll; width: 100%;">
																					<table id='table-draggable2'
																						class='table table-striped table-condensed cf'>
																						<tbody class="connectedSortable" id="tb1">
																							<tr>
																								<th></th>
																							</tr>
																						</tbody>
																					</table>
																				</div>
																			</div>
																		</div>
																	</div>

																	<div class="col-md-6">
																		<div class="box border blue">
																			<div class="box-title">
																				<h4>
																					<i class="fa fa-medkit"></i> Content (Drop Here)
																				</h4>
																			</div>

																			<div class="box-body">
																				<div class="col-md-12-1" style="margin-top: 0%;">
																					<table class="table table-bordered"
																						style="width: 100%;">
																						<thead class="cf">
																							<tr>
																								<th class="col-md-1 center"
																									style="height: 21.5px;">
																									<div class="TextFont">#</div>
																								</th>
																								<th class="col-md-11 center"
																									style="height: 21.5px;">
																									<div class="TextFont">Content Name</div>
																								</th>
																							</tr>
																						</thead>
																					</table>
																				</div>
																				<div class="col-md-12-1"  id="dropDiv"
																					style="margin-top: 0px; margin-bottom: 10px; border: 1px solid #ddd; height: 175px; overflow-y: scroll; width: 100%;">
																					<table id='table-draggable2'
																						class='table table-striped table-condensed cf'>
																						<tbody class="connectedSortable" id="tb2">
																							<tr>
																								<th></th>
																							</tr>
																						</tbody>
																					</table>
																				</div>
																			</div>
																		</div>
																	</div>
																</div> 
															<!-- Drag and drop code End -->
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

							<div class="row">
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="row">
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row">
															<div class="col-md-12">																
																<div class="panel panel-primary" style="margin-top: 5px; height: 500px; overflow: scroll;">
																	<div class="panel-heading" id="divEhatContent">Lab Test
																		Table</div>
																	<div class="panel-body">
																		<table id="fixed_header" class="table table-striped table-bordered">
																			<thead id="ehatTHead" class="fixedheaderdemo">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-2 center">Template For</th>
																					<th class="col-md-2 center">Profile Name</th>
																					<th class="col-md-2 center">Default Tests</th>
																					<th class="col-md-2 center">Test Name</th>
																					<th class="col-md-2 center">Edit</th>
																					<th class="col-md-2 center">Delete</th>
																				</tr>
																			</thead>
																			<tbody id="reportTemplateBody">
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
						</div>
					</div>
					<div class="footer-tools">
						<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
						</span>
					</div>
				</div>
				<!-- /CONTENT-->
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

	<!-- Drag and drop code  -->
	<script type="text/javascript">
		$(document).ready(function() {
			var $tabs = $('#table-draggable2')
			$("tbody.connectedSortable").sortable({
				connectWith : ".connectedSortable",
				//items: "> tr:not(:first)",
				appendTo : $tabs,
				helper : "clone",
				zIndex : 999990
			}).disableSelection();

			var $tab_items = $(".nav-tabs > li", $tabs).droppable({
				accept : ".connectedSortable tr",
				hoverClass : "ui-state-hover",
				drop : function(event, ui) {
					return false;
				}
			});
		});
		</script>

		<!-- Drag and drop code  -->
		<script>
			$(document)
					.ready(
							function() {

								$(
										"#table1 .childgrid tr, #table2 .childgrid tr")
										.draggable(
												{
													helper : function() {
														var selected = $('.childgrid tr.selectedRow');
														if (selected.length === 0) {
															selected = $(this)
																	.addClass(
																			'selectedRow');
														}
														var container = $(
																'_$tag_')
																.attr('id',
																		'draggingContainer');
														container
																.append(selected
																		.clone()
																		.removeClass(
																				"selectedRow"));
														return container;
													}
												});

								$("#table1 .childgrid, #table2 .childgrid")
										.droppable(
												{
													drop : function(event, ui) {
														$(this)
																.append(
																		ui.helper
																				.children());
														$('.selectedRow')
																.remove();
													}
												});

								$(document).on("click", ".childgrid tr",
										function() {
											$(this).toggleClass("selectedRow");
										});

							});
	</script>
		<!-- Code for drag and drop -->
	<script>		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			$("#profileId2").select2();
			$("#testId").select2();
			
			getAllReportTemplates();
			getAllLabProfiles(); 
		});
	</script>
	<input type="hidden" id="reportTemplateId" value="0">
	<input type="hidden" id="reportTemplateMasterId" value="0">
	<input type="hidden" id=pathologyId value="<%=pathologyId%>">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>