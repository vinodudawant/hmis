\<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Special Case</title>
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
<script type="text/javascript" src="js/pathology_specialcase.js"></script>
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
											<li><a href="pathology_specialcase.jsp">Special Case Master</a></li>
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
												title="Please enter Special Case name" id="searchId" type="text"
												placeholder="Special Case Name" onkeyup="searchSpecialCaseByName(this.value)">
											<span class="input-group-btn">
												<button class="btn btn-primary" style="height: 25px; margin-bottom: 10px" type="button" onclick="">
													<span class="fa fa-search" aria-hidden="true"> </span>Search
												</button>
											</span>
										</div>
									</div> 
									<div class="col-md-4">
										<button class="btn btn-xs btn-info pull-right editUserAccess" type="button" onclick="toggleEntryDiv('divForAddForm')">
											<i class="fa fa-plus"></i> Add Special Case
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
												<div class="col-md-12" id="divForAddForm" style="display: none;">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent"></div>
																<div class="panel-body">

																<div class="form-group col-md-4">
																	<label>Special Case Name</label> <input type="text"
																		class="form-control" id="specialCaseName" 
																		placeholder="Special Case Name">
																</div>
																
																<form class="form-horizontal col-md-3" role="form">
																		<div class="form-group">
																			<label class="col-sm-4 control-label"></label>
																			<div class="col-sm-4">
																				<input type="button" class="btn btn-success"
																					onclick="saveSpecialCase();" value="Save" style="margin-top: 20px;">
																			</div>
																			<div class="col-sm-4">
																				<input type="button" class="btn btn-info"
																					onclick="resetSpecialCaseForm();" value="Reset" style="margin-top: 20px;">
																			</div>
																		</div>
																</form>
																
															</div>
														</div>
													</div>
												</div>
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row">
															<div class="col-md-12">																
																<div class="panel panel-primary" style="margin-top: 5px">
																	<div class="panel-heading" id="divEhatContent">Special Case
																		Table</div>
																	<div class="panel-body">
																		<table id="fixed_header" class="table table-bordered">
																			<thead id="ehatTHead" class="fixedheaderdemo">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-2 center">Special Case Name</th>
																					<th class="col-md-2 center">Edit</th>
																					<th class="col-md-2 center">Delete</th>
																				</tr>
																			</thead>
																			<tbody id="specialCaseTableBody">
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
			getAllSpecialCasesList();
		});
	</script>
	
	<input type="hidden" id=specialCaseId value="0">
	<input type="hidden" id=doc_id value="0">
	<%-- <input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>"> --%>
	<%-- <input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>"> --%>
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>