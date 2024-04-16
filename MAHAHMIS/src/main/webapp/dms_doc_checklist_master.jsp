<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Document CheckList Master </title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
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
<script type="text/javascript" src="js/doc_checklist_master.js"></script>
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

		<%@include file="left_menu_dms.jsp"%>

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
									<li><i class="fa fa-home"></i> <a href="doc_checklist.jsp">Doc Checklist Master</a>
										</li>	
									
									</ul>
									<!-- /BREADCRUMBS -->

								</div>
							</div>
						</div>

						<div class="row">
							<!-- NEW ORDERS -->
							<div class="col-md-12">
								<div class="box border">
									<div class="box-title">
										<h4>
											<i class="fa fa-colum"></i> <span
												class="hidden-inline-mobi"></span>
										</h4>
									</div>
									<div class="box-body">
										<div class="tabbable header-tabs">
											
											<div class="container box border green">                                                
                                                <div class="box-body big" id="divEhatContent">
													
													<form class="form-horizontal col-md-4" role="form">
														<div class="form-group">
															<label class="col-sm-4 control-label" style="width: 30%">Doc Name</label>
															<div class="col-sm-8">
																<input class="form-control tip-focus" title="Please enter document name" id="docName" type="text" placeholder="Document Name">
															</div>
														</div>
													</form>
																
													<form class="form-horizontal col-md-4" role="form">
														<div class="form-group">
															<label class="col-sm-4 control-label">Department</label>
															<div class="col-sm-8">
                              									<select name="department" id="department" class="col-md-12 full-width-fix form-control" style="width: 95%;">
																	<option value="0">--Select--</option>
																	<option value="1">OPD</option>
																	<option value="2">IPD</option>
																	<!-- <option value="3">Diagnostic</option -->
																</select>
															</div>
														</div>
													</form>
													
													<form class="form-horizontal col-md-3" role="form">													
														<div class="form-group">
															<label class="col-sm-4 control-label"></label>
															<div class="col-sm-4">
																<input type="button" class="btn btn-success editUserAccess" disabled onclick="saveDocCheckList()" value="Submit"></div>
															<div class="col-sm-4">
																<input type="button"  class="btn btn-info" onclick="refreshDocCheckList()" value="Refresh">
															</div> 
														</div>
													</form>
                                                </div>                                                
                                            </div>

											<div class="row" style="margin-top: 10px">
												<div class="col-md-12">
													<!-- BOX -->
													<div class="box border green" id="div1">
														<div class="box-title">
															<h4>
																<i class="fa fa-table"></i>Document Checklist Details
															</h4>
															
														</div>
														<div class="box-body" id="divEhatList" style="height: 300px;overflow: auto;" >
															<!-- <div class="row"> -->
																<div class="col-sm-12">
																	<div class="pull-right">
																		<div id="datatable1_filter" class="dataTables_filter">
																			<label id="searchlabel"> <!-- <input class="form-control input-sm"
																				type="text" aria-controls="datatable1"
																				placeholder="Search"> -->
																			</label>
																		</div>
																	</div>	
																</div>
															<!-- </div> -->
														
															<table id="ehatTable" cellpadding="0" cellspacing="0" border="0"
																class="datatable table table-striped table-bordered table-hover">
																<thead id="ehatTHead">																	
																	<tr>
																		<th class="col-md-1 center">#</th>
																		<th class="col-md-1 center">Doc ID</th>
																		<th class="col-md-1 center">Doc Name</th>
																		<th class="col-md-1 center">Depart Code</th>
																		<th class="col-md-1 center">Edit</th>
																		<th class="col-md-1 center">Delete</th>
																	</tr>
																</thead>
																
																<tbody id="docChecklistDetails">
																
																</tbody>
																
															</table>
														</div>
													</div>
													<!-- /BOX -->
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
	
	<script>
		jQuery(document).ready(function() {		
			App.setPage("wizards_validations");  //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});	
			getAllDocChecklist();
		});
	</script>
	
<input type="hidden" id=docId value="0">	
<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">			
<!-- /JAVASCRIPTS -->
</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>	
</body>
</html>