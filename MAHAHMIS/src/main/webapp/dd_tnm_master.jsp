<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>TNM Master</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
<script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script> -->

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
<link href="css/bootstrap-toggle.min.css" rel="stylesheet">


<!-- include js for development -->
<script src="js/bootstrap-toggle.min.js"></script>
<script type="text/javascript" src="js/dd_organ_master.js"></script>
<script type="text/javascript" src="js/dd_tnm_master.js"></script>
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
												href="dd_tnm_master.jsp">TNM
													Master</a></li>
											<li class="pull-right">

												<button class="btn btn-xs btn-success pull-right editUserAccess"
													type="button" onclick="onSaveTnmMaster()">
													<i class="fa fa-plus"></i>save
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
									<div class="panel panel-primary">
										<div class="panel-heading">TNM Master</div>
										<div class="panel-body">

											<form class="col-md-12 form-group">
												<div class="form-row align-items-center">
													<div class="col-md-3">
														<label>Body Part</label> <select
															class="form-control form-control-sm" id="bodyPart"
															onchange="getTnmMasterDetail('onload')">
															
														</select>
													</div>

													<div class="col-md-2">
														<label>TNM Group</label> <input type="text" id="tnmGroupStage"
															value="t0,n0,m0" class="form-control form-control-sm">
													</div>

													<div class="col-md-2">
														<label>Group Name</label> <input type="text"
														 id="groupName"	class="form-control form-control-sm">
													</div>
													<div class="col-md-1">
														<br />
														<button type="button" class="btn btn-success btn-xs editUserAccess" onclick="saveTnmGroupMaster()">Save Group</button>
													</div>
													<div class="col-md-2">
														<br />
														<button class="btn btn-success  btn-xs" data-toggle="modal" data-target="#md1" onclick="getGroups()">Show
															Group</button>

													</div>
													<div class="col-md-2">
														<br />


													</div>

												</div>
											</form>

                       <div class="modal" id="md1" tabindex="-1" role="dialog">
												<div class="modal-dialog" role="document">
													<div class="modal-content">

														<div class="modal-body">
                                                       
                                                       <table class="table table-responsive table-bordered">
                                                       <thead>
                                                       <tr>
                                                       	<th>#</th>
													<th>Group Name</th>
													<th>Stage</th>
													<th>Body Part</th>
													<th>Edit</th>
													<th>Delete</th>
                                                       </tr>
                                                       </thead>
                                                       <tbody id="tnmGroupList">
                                                       </tbody>
                                                       </table>

															
														</div>
														<div class="modal-footer">
															<!-- <button type="button" class="btn btn-primary btn-xs editUserAccess"
																data-dismiss="modal" onclick="onSaveTemplate()">save</button> -->
															<button type="button" class="btn btn-primary"
																data-dismiss="modal">Close</button>
														</div>
													</div>
												</div>
											</div>

											<div class="row form-group">

												<div class="col-md-4">
													<div class="row">

														<div class="col-md-8">
															<h4>Tumor</h4>
														</div>
														<div class="col-md-4">
															<br /> <input type="button" onclick="addTumorRow()"
																value="+"><input type="button"
																onclick="removeTumorRow()" value="-">
														</div>
													</div>
													<table
														class="table table-striped table-bordered table-responsive">
														<thead>
															<tr>
															 	<th>#</th>
																<th>Drescription</th>
																<th>Stage</th>
																<th>CheckBox/Radio</th>
																<th>Action</th>
															</tr>
														</thead>
														<tbody id="TMasterBody">

														</tbody>
													</table>
												</div>
												<div class="col-md-4">

													<div class="row">

														<div class="col-md-8">
															<h4>Lymph Nodes</h4>
														</div>
														<div class="col-md-4">
															<br /> <input type="button" onclick="addNodeRow()"
																value="+"><input type="button"
																onclick="removeNodeRow()" value="-">
														</div>
													</div>
													<table
														class="table table-striped table-bordered table-responsive">
														<thead>
															<tr>
															 	<th>#</th>
																<th>Drescription</th>
																<th>Stage</th>
																<th>CheckBox/Radio</th>
																<th>Action</th>
															</tr>
														</thead>
														<tbody id="NMasterBody">

														</tbody>
													</table>
												</div>
												<div class="col-md-4">

													<div class="row">

														<div class="col-md-8">
															<h4>Metastasis</h4>
														</div>
														<div class="col-md-4">
															<br /> <input type="button"
																onclick="addMetastasizedRow()" value="+"><input
																type="button" onclick="removeMetastasizedRow()"
																value="-">
														</div>
													</div>
													<div style="overflow: auto">
														<table
															class="table table-striped table-bordered table-responsive">
															<thead>
																<tr>
																<th>#</th>
																	<th>Drescription</th>
																	<th>Stage</th>
																	<th>CheckBox/Radio</th>
																	<th>Action</th>
																</tr>
															</thead>
															<tbody id="MetaMasterBody">

															</tbody>
														</table>
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
			getAllOrganMaster();
		});
	</script>
<input type="hidden" id="tnmMasterIds" value="0">
<input type="hidden" id="groupId" value="0">
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>