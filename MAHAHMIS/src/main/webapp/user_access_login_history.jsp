<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>User Login History</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<link rel="stylesheet" type="text/css" href="ehat-design/datepicker/datepicker3.css">
<link rel="stylesheet" type="text/css" href="css/bootstrap-chosen.css" />

<%@include file="inv_header.jsp"%>

<style>

.chosen-container-single .chosen-single {
 
  height: 26px;
  line-height: 25px;
}
</style>

<!-- include js for development -->
<script type="text/javascript" src="js/UserAccess.js"></script>

<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>
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
											<li><i class="fa fa-home"></i> <a href="user_access_profile_master.jsp">User Login History</a></li>											
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">
										
											<input id="masterProfileId" class="hidden">
											
											<div class="row">
												<div class="col-md-12" id="divForEntry">
													<div class="container">
														<div class="panel panel-primary">
															<!-- <div class="panel-heading" id="divEhatContent">Login History</div> -->
															<div class="panel-body">
																
																<div class="form-row">
																	<div class="form-group col-md-3">																		
																		 <select id="loginHistoryUser" onchange="getLoginHistory($('#loginHistoryUser').val(),'0')" data-placeholder="Your Favorite Type of Bear"
																			class="chosen-select" tabindex="7">
																		 </select>
																	</div>
																</div>
																
																<div class="input-group date col-md-3">
																	<input type="text" class="form-control" id="loginDate" onchange="getLoginHistoryByDateWise($('#loginDate').val(),'0')">
																	<div class="input-group-addon">
																		<i class="fa fa-calendar"></i>
																	</div>
																</div>
																
															</div>
														</div>
													</div>
												</div>
												<div class="divide-20"></div>
												<div class="col-md-12" id="divForEdit">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Login History Table</div>
															<div class="panel-body" style="overflow: auto;height: 370px">
																<table class="datatable table table-striped table-bordered">
																	<thead id="ehatTHead">
																		<tr>																		
																			<th style="width:20%">User Name</th>
																			<th style="width:10%">User IP Address</th>
																			<th style="width:10%">Sign-in Time</th>
																			<th style="width:10%">Sign-out Time</th>
																			<th style="width:10%">Status</th>
																		</tr>
																	</thead>
																	<tbody id="loginHistoryBody">
																	</tbody>
																</table>																		
															</div>
															
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
			<!--Start #showSubModulesPopup Popup -->
			<div id="showSubModulesPopup" class="modal fade in">
				<!--End #showSubModulesPopup Popup -->
				<input id="objUserAccess" type="hidden" value="" />
			</div>
			
			<%@include file="footer_nobel.jsp"%>
		</section>
		<!--/PAGE -->

	<!-- JAVASCRIPTS -->
	<%@include file="inv_footer.jsp"%>
	<script type="text/javascript" src="ehat-design/datepicker/bootstrap-datepicker.js"></script>
	<script src="js/chosen.jquery.js"></script>
	<script src="js/UserAccess.js"></script>	
	
	<script>		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			getAllUser();
			getLoginHistory("0","0");			
		});

		$('#loginDate').datepicker({
			autoclose : true,
			format: 'dd-mm-yyyy',
		});
	</script>
	<input id="masterModuleId" class="hidden">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>