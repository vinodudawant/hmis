<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Group Instruction</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
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

<!-- include js for development -->
<script type="text/javascript" src="js/dd_group_inst.js"></script>
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
									<div class="page-header" style="height: 92%;">
										<!-- STYLER -->

										<!-- /STYLER -->
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a
												href="dd_opdDashBoard.jsp">Home</a></li>
											<li><i class="fa fa-home"></i> <a
												href="dd_group_instruction.jsp">Group Instruction Master</a></li>
											<li class="pull-right">

												<button class="btn btn-xs btn-info pull-right" type="button"
													onclick="toggleEntryDiv()">
													<i class="fa fa-plus"></i> Add Instruction
												</button>

												<button class="btn btn-xs btn-warning pull-right"
													type="button" onclick="selectInst()" data-toggle="modal"
													data-target="#md1">
													<i class="fa fa-plus"></i> Create Template
												</button>

											</li>
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row form-group">

								<div class="col-md-12 form-group">
									<div class="col-sm-1">
										<label for="inlineFold" class="control-label">Search
											By</label>
									</div>

									<div class="col-md-2 form-group">
										<input type="text" class="form-control form-control-sm"
											 onkeypress="return validateNumber(event)" id="searchById" placeholder="search By Id">
									</div>

									<div class="col-md-2 form-group">
										<input type="text" class="form-control form-control-sm"
											id="searchByName" placeholder="search By Name">
									</div>

									<div class="col-md-1 form-group">
										<button class="btn btn-primary btn-xs" onclick="searchInst()">search</button>
									</div>

									<div class="form-group col-md-3">
										<select name="tempName" id="tempNames" onchange="getTemp()"
											style="width: 70%;">
										</select>
									</div>

									<div id="templateEditDiv" class="form-group col-md-3"
										style="display: none;">

										<div class="col-md-12 form-group">
											<button class="btn btn-success btn-xs"
												onclick="getGrpInstDataForModal()" data-toggle="modal"
												data-target="#exampleModal">
												<i class="fa fa-edit"></i>Template
											</button>
											<button class="btn btn-danger btn-xs"
												onclick="onDeleteTemplate()">
												<i class="fa fa-trash-o"></i>Template
											</button>

										</div>
									</div>

								</div>
							</div>

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-primary">
										<div class="panel-heading">Group Instruction Master</div>
										<div class="panel-body">

											<div class="panel panel-default form-group" id="addNewGroups">

												<div class="panel-body">

													<form class="col-md-12 form-group" id="preInsForm">
														<div class="form-row align-items-center">
															<div class="col-md-2">
																<label>English</label> <input type="hidden"
																	class="form-control form-control-sm mb-2" id="instId"
																	value="0"> <input type="text"
																	class="form-control form-control-sm mb-2" id="engIns"
																	placeholder="English">
															</div>
														</div>
														<div class="form-row align-items-center">
															<div class="col-md-2">
																<label>Hindi</label> <input type="text"
																	class="form-control form-control-sm mb-2" id="hindiIms"
																	placeholder="Hindi">
															</div>
														</div>
														<div class="form-row align-items-center">
															<div class="col-md-2">
																<label for="inlineFormInput">Marathi</label> <input
																	type="text" class="form-control form-control-sm mb-2"
																	id="marthiIns" placeholder="Marathi">
															</div>
															<div class="col-md-2">
																<label for="inlineFormInput">unicode</label> <input
																	type="text" class="form-control  form-control-sm mb-2"
																	id="unicode" placeholder="unicode">
															</div>

															<div class="col-md-2">
																<label>Refer To</label> <select
																	class="form-control  form-control-sm mb-2" id="referTo">
																	<option value="0">--select--</option>
																	<option>IPD</option>
																	<option>OPD</option>
																	<option>Both</option>
																</select>
															</div>

															<div class="col-md-2">
																<label for="inlineFormInput">&nbsp;</label><br />
																<button class="btn btn-xs btn-success" type="button"
																	onclick="saveGroupDetails()">save</button>
															</div>
														</div>
													</form>
												</div>
											</div>

											<div style="overflow: auto">
												<table
													class="table table-bordered table-responsive table-striped">
													<thead>
														<tr>
															<th>#</th>
															<th>Instruction Id</th>
															<th>English Instruction</th>
															<th>Hindi Instruction</th>
															<th>Marathi Instruction</th>
															<th>Ref To</th>
															<th id="editFlag">Edit</th>
															<th  id="delFlag">Delete</th>
															<th  id="checkFlag"><input type="checkbox" id="chkAllCheck"
																onclick="checkUncheckAll('chkAllCheck','checkInst')"></th>
														</tr>
													</thead>
													<tbody id="groupDetailList">
													</tbody>
												</table>
											</div>

											<div class="modal" id="md1" tabindex="-1" role="dialog">
												<div class="modal-dialog" role="document">
													<div class="modal-content">

														<div class="modal-body">


															<div class="form-group row">
																<label for="inputPassword"
																	class="col-sm-4 col-form-label">Template Name:</label>
																<div class="col-sm-7">
																	<input type="text" class="form-control form-control-sm"
																		id="tempLateName" placeholder="Template Name">
																</div>
															</div>
														</div>
														<div class="modal-footer">
															<button type="button" class="btn btn-primary btn-xs"
																data-dismiss="modal" onclick="onSaveTemplate()">save</button>
															<button type="button" class="btn btn-secondary"
																data-dismiss="modal">Close</button>
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
						<div class="modal fade" id="exampleModal" tabindex="-1"
							role="dialog" aria-labelledby="exampleModalLabel"
							aria-hidden="true">
							<div class="modal-dialog" role="document">
								<div class="modal-content">
									<div class="modal-header">
										<h4>
											<label id="tempName"></label>
										</h4>
									</div>
									<div class="modal-body">

										<div class="form-group row">
											<label for="inputPassword" class="col-sm-4 col-form-label">Template
												Name:</label>
											<div class="col-sm-7">
												<input type="text" class="form-control form-control-sm"
													id="tempLateName1" placeholder="Template Name">
											</div>
										</div>

										<div style="overflow: auto;">

											<table
												class="table table-bordered table-responsive table-striped">
												<thead>
													<tr>
														<th>#</th>
														<th>Instruction Id</th>
														<th>English Instruction</th>
														<th>Hindi Instruction</th>
														<th>Marathi Instruction</th>
														<th>Ref To</th>

													</tr>
												</thead>
												<tbody id="grpDetailListModal">
												</tbody>
											</table>
										</div>
									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-secondary"
											data-dismiss="modal">Close</button>
										<button type="button" class="btn btn-primary" 
											onclick="onSaveTemplate('edit')" data-dismiss="modal">Save changes</button>
									</div>
								</div>
							</div>
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

		<script
			src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
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
				getGroupInstData();
				getAllTemplates();
				$("#addNewGroups").hide();

				$("#tempNames").on("select2:selecting", function(e) {

				});
			});
		</script>
		<input type="hidden" id="inputId" value="0">
		<input type="hidden" id="templateId" value="0">
		<input type="hidden" id=doc_id value="0">
		<input type="hidden" id="instIds" value="0">
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