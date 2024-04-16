<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Indivisual Instruction</title>
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
<script type="text/javascript" src="js/opd_indivisual_instruction.js"></script>
<script type="text/javascript" src="js/dd_instruction_tab.js"></script> <!-- Akshata Desai /10/MARCH/22 -->
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
												href="dd_pre_Instruction.jsp">Prescription Instruction Master</a></li>
											<li class="pull-right">

												<button class="btn btn-xs btn-info pull-right editUserAccess" type="button"
													onclick="toggleEntryDiv('divForEntry')">
													<i class="fa fa-plus"></i> Add Instruction
												</button>

											
												
											</li>
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row form-group">

								
							</div>

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-primary">
										<div class="panel-heading">Indivisual Instruction Master</div>
										<div class="panel-body">

											<div class="panel panel-default form-group" id="addNewPres">

												<div class="panel-body">

													<form class="col-md-12 form-group" id="preInsForm">
														<div class="form-row align-items-center">
															<div class="col-md-2">
																<label>English</label> <input type="hidden"
																	class="form-control form-control-sm mb-2" id="instId"
																	value="0"> <input type="text"
																	class="form-control form-control-sm mb-2" id="reportInstruction"
																	placeholder="English">
															</div>
														</div>
														<div class="form-row align-items-center">
															<div class="col-md-2">
																<label>Hindi</label> <input type="text"
																	class="form-control form-control-sm mb-2" id="reportInstructionHindi"
																	placeholder="Hindi">
															</div>
														</div>
														
														<div class="form-row align-items-center">
															<div class="col-md-2">
																<label>Hindi UniCode</label> <input type="text"
																	class="form-control form-control-sm mb-2" id="hindiUnicode"
																	placeholder="Hindi Unicode">
															</div>
														</div>
														
														<div class="form-row align-items-center">
															<div class="col-md-2">
																<label for="inlineFormInput">Marathi</label> <input
																	type="text" class="form-control form-control-sm mb-2"
																	id="reportInstructionMarathi" placeholder="Marathi">
															</div>
															
															<div class="col-md-2">
																<label for="inlineFormInput">Marathi Unicode</label> <input
																	type="text" class="form-control form-control-sm mb-2"
																	id="maratiUnicode" placeholder="Marathi Unicode">
															</div>
															
															
															<div class="col-md-2">
																<label for="inlineFormInput">Other Language 1.</label> <input
																	type="text" class="form-control form-control-sm mb-2"
																	id="reportInstructionOther1" placeholder="Other Language 1.">
															</div>
															
															<div class="col-md-2">
																<label for="inlineFormInput">Other Language 2.</label> <input
																	type="text" class="form-control form-control-sm mb-2"
																	id="reportInstructionOther2" placeholder="Other Language 2.">
															</div>
															
															<div class="col-md-2">
																<label for="inlineFormInput">Other Language 3.</label> <input
																	type="text" class="form-control form-control-sm mb-2"
																	id="reportInstructionOther3" placeholder="Other Language 3.">
															</div>
															
															<div class="col-md-2">
																<label for="inlineFormInput">Make it Madatory Instruction </label> 
																<input
																	type="checkbox" class="form-control form-control-sm mb-2" style="height: 15px;"
																	id="mandatoryInstFlag" >
															</div>
															

															

															<div class="col-md-2">
																<label for="inlineFormInput">&nbsp;</label><br />
																<button class="btn btn-xs btn-success" type="button"
																	onclick="saveReportInstruction()">Save</button>
																	<button class="btn btn-xs btn-success editUserAccess" type="button"
																	onclick="editIndivisualInstruction()">Edit</button>
																
															</div>
															
																<div class="col-md-1">
																<label for="inlineFormInput">&nbsp;</label><br />
																
																	<button class="btn btn-xs btn-danger deleteUserAccess" type="button"
																	onclick="deleteIndivisualInstruction()">Delete</button>
															</div>
															
															
															
														</div>
													</form>
												</div>
											</div>

											<div style="overflow: auto;">
												<table class="table table-bordered table-responsive table-striped">
													<thead>
														<tr>
															<th>#</th>
															<th>Instruction Id</th>
															<th>English Instruction</th>
															<th>Hindi Instruction</th>
															<th>Marathi Instruction</th>
														
															<th>Action</th>
																														
														</tr>
													</thead>
													<tbody id="ReportInstructionTemp">
													</tbody>
												</table>
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
			getIndivisualInstructionList();
			
			$("#addNewPres").hide();
			$("#tempNames").on("select2:selecting", function(e) { 
				
			});
		});
	</script>
		<input type="hidden" id="inputId" value="0">
		<input type="hidden" id="reportInstructionID" value="0">
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