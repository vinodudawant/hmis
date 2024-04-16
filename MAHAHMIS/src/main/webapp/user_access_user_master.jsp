<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Users List</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description">
<meta name="author">

<%@include file="inv_header.jsp"%>
<!-- include js for development -->

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
			<%@include file="left_menu_admin.jsp"%>
			<!-- /SIDEBAR -->
			<div id="main-content">
				<div class="container">
					
					<div class="row">					
						<div class="col-md-12">
							<div class="panel panel-default">
								<div class="panel-body">						
									<div class="col-md-12-1" style="margin-top: 2%">
										<div class="col-md-12-1">
											<div class="col-lg-3 col-md-6">
												<div class="panel panel-primary">
													<div class="panel-heading">
														<div class="row">
															<div class="col-xs-3">
																<i class="fa fa-comments fa-5x"></i>
															</div>
															<div class="col-xs-9 text-right">
																<div class="huge" id="loginUsers">00</div>
																<div>Login Users!</div>
															</div>
														</div>
													</div>
													<a href="#">
														<div class="panel-footer" onclick="getUsersLoginOrNew('login')">
															<span class="pull-left">View Details</span> <span
																class="pull-right"><i
																class="fa fa-arrow-circle-right"></i></span>
															<div class="clearfix"></div>
														</div>
													</a>
												</div>
											</div>
											<div class="col-lg-3 col-md-6">
												<div class="panel panel-primary">
													<div class="panel-heading">
														<div class="row">
															<div class="col-xs-3">
																<i class="fa fa-tasks fa-5x"></i>
															</div>
															<div class="col-xs-9 text-right">
																<div class="huge" id="newUsers">00</div>
																<div>New Users!</div>
															</div>
														</div>
													</div>
													<a href="#">
														<div class="panel-footer" onclick="getUsersLoginOrNew('new')">
															<span class="pull-left">View Details</span> <span
																class="pull-right"><i
																class="fa fa-arrow-circle-right"></i></span>
															<div class="clearfix"></div>
														</div>
													</a>
												</div>
											</div>
											<div class="col-lg-3 col-md-6">
												<div class="panel panel-primary">
													<div class="panel-heading">
														<div class="row">
															<div class="col-xs-3">
																<i class="fa fa-shopping-cart fa-5x"></i>
															</div>
															<div class="col-xs-9 text-right">
																<div class="huge" id="softwareUsers">00</div>
																<div>Software Users!</div>
															</div>
														</div>
													</div>
													<a href="#">
														<div class="panel-footer">
															<span class="pull-left">View Details</span> <span
																class="pull-right"><i
																class="fa fa-arrow-circle-right"></i></span>
															<div class="clearfix"></div>
														</div>
													</a>
												</div>
											</div>
											<!-- <div class="col-lg-3 col-md-6">
												<div class="panel panel-red">
													<div class="panel-heading">
														<div class="row">
															<div class="col-xs-3">
																<i class="fa fa-support fa-5x"></i>
															</div>
															<div class="col-xs-9 text-right">
																<div class="huge">13</div>
																<div>Support Tickets!</div>
															</div>
														</div>
													</div>
													<a href="#">
														<div class="panel-footer">
															<span class="pull-left">View Details</span> <span
																class="pull-right"><i
																class="fa fa-arrow-circle-right"></i></span>
															<div class="clearfix"></div>
														</div>
													</a>
												</div>
											</div> -->
										</div>
									</div>
			
									<div class="col-md-12" style="margin-top: 1%">
										<!-- BOX -->
										<div class="col-md-12-1">
											<!-- BOX -->
											<div class="box border">
												<div class="box-title">
													<h4>
														<i class="fa fa-table"></i>User List
													</h4>
													<!-- <div class="tools hidden-xs">
														<a href="#box-config" data-toggle="modal" class="config">
															<i class="fa fa-cog"></i>
														</a> <a href="javascript:;" class="reload"> <i
															class="fa fa-refresh"></i>
														</a> <a href="javascript:;" class="collapse"> <i
															class="fa fa-chevron-up"></i>
														</a> <a href="javascript:;" class="remove"> <i
															class="fa fa-times"></i>
														</a> 
													</div> -->
												</div>
												<div class="box-body">
			
													<div class="row" style="margin-top: 5px;">
														<div class="col-sm-12">
															<div class="pull-right">
																<div class="dataTables_filter" id="datatable1_filter">
																	<label><input type="text" id="searchUser"
																		onkeyup="userAccessAutoSuggestion(0)"
																		aria-controls="datatable1" placeholder="Search"
																		class="form-control input-sm"></label>
																</div>
															</div>
															<!-- <div class="pull-left">
																<div id="datatable1_length" class="dataTables_length">
																	<label>Show <select name="datatable1_length"
																		size="1" aria-controls="datatable1"
																		class="form-control input-sm"><option value="10"
																				selected="selected">10</option>
																			<option value="25">25</option>
																			<option value="50">50</option>
																			<option value="100">100</option></select>
																	</label>
																</div>
															</div> -->
															<div class="clearfix"></div>
														</div>
													</div>
			
													<table id="datatable1" class="datatable table table-striped table-bordered table-hover">
														<thead>
															<tr>
																<th>Full Name</th>
																<th>Username</th>
																<th>Email</th>
																<th class="hidden-xs">Role</th>
															</tr>
														</thead>
														<tbody id="userTableBody">
														</tbody>
														<!-- <tfoot>
															<tr>
																<th>Rendering engine</th>
																<th>Browser</th>
																<th class="hidden-xs">Platform(s)</th>
																<th>Engine version</th>
																<th class="hidden-xs">CSS grade</th>
															</tr>
														</tfoot> -->
													</table>
			
													<div id="paginationDiv" class="row">
														<div class="col-sm-12">
															<div class="pull-left">
																<div class="dataTables_info" id="datatable1_info">
																	Showing <span id="start"></span> to <span id="last"></span>
																	of <span id="total"></span> entries
																</div>
															</div>
															<div class="pull-right">
																<div class="dataTables_paginate paging_bs_full"
																	id="datatable1_paginate">
																	<ul class="pagination" id="userPagination">
																	</ul>
																</div>
															</div>
															<div class="clearfix"></div>
														</div>
													</div>
												</div>
											</div>
											<!-- /BOX -->
										</div>
										<!-- /BOX -->
									</div>							
								</div>
							</div>
						</div>					
					</div>
				</div>
				<input type="hidden" id="userID" />
			</div>
			
			<div id="userObj" style="display: none;"></div>
			
			<!-- start pop up for user display -->
			<div id="userDisplayModal" class="modal fade" role="dialog">
				<div class="modal-dialog">
					<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal">&times;</button>
							<h4 class="modal-title" id="userDisplayModalTitle"></h4>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="col-md-12" style="overflow: auto; max-height: 450px;">
									<table cellpadding="0" cellspacing="0" border="0"
										class="datatable table table-striped table-bordered table-hover">
										<thead>
											<tr>
												<th>Sr.No</th>
												<th>Full Name</th>
												<th>User Name</th>
												<th>Email</th>
												<th>Role</th>
												<th class="signIn" style="display: none;">Sign-In Time</th>
												<th class="softwareUser" style="display: none;">Software User</th>
											</tr>
										</thead>
										<tbody id="userDisplayBody">
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
			<!-- End pop up for user display -->
			
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
		<%@include file="inv_footer.jsp"%>
		<script>			
			jQuery(document).ready(function() {
				App.setPage("wizards_validations"); //Set current page 
				App.init(); //Initialise plugins and elements
				//FormWizard.init();

				userAccessAutoSuggestion("0");
				getActiveUserCount();
				getSoftwareUserCount();
				//getNewUserCount();
				
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});

				$('#mrnDate').datepicker({
					autoclose : true
				});
				
				
				$("select").select2({dropdownParent: $("#MrnModal")});

			    $('[data-toggle=offcanvas]').click(function() {
			      $('.row-offcanvas').toggleClass('active');
			    });
				//$('#test').select2();
				/* $("#test").select2({
			    	dropdownParent: $("#MrnModal")
			    }); */
			});
		</script>
		
		<input type="hidden" id="partyMasterId" value="0">
		<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	<script src="js/UserAccess.js"></script>
</body>
</html>
