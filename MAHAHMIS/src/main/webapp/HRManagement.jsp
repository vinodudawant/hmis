<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>HMIS | HR</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->	

<!-- include js for development -->
	<script src="ehat-design/alertify/alertify.js" type="text/javascript"></script>
	<!-- JQUERY -->
	<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
	<!-- JQUERY UI-->
	<script src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
	<!-- BOOTSTRAP -->
	<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
		
	<!-- JQUERY UI-->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css" >
	<link rel="stylesheet" type="text/css" href="ehat-design/css/themes/default.css" id="skin-switcher" >
	<link rel="stylesheet" type="text/css" href="ehat-design/css/responsive.css" >
	<link rel="stylesheet" type="text/css" href="ehat-design/font-awesome/css/font-awesome.min.css" >
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
	<!-- bootstrap datepicker -->
	<link rel="stylesheet" href="ehat-design/datepicker/datepicker3.css">
	
	<script type="text/javascript" src="js/users.js"></script>
	<style>
	.panel-default {
		border-color: #a8bc7b;
	}
	table, th {
  	text-align: center;
	}
	</style>
	</head>
<body>
	<%-- <c:if test="${ sessionScope.userType != null }"> --%>
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%>
		</header>
		<!--/HEADER -->
		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->
			<%@include file="HRLeftMenu.jsp"%>
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
					
											<!-- <li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a class="fa fa-home" href="HRManagementNew.jsp">HR</a></li>
											<li>Employee Details</li> -->
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><i class="fa fa-home"></i> <a href="user_management.jsp">New Users</a></li>
										</ul>										
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>
							
							<div class="row">
							
								<div class="col-md-12">
								<div class="col-sm-1">
                   							<label for="inlineFold" class="control-label">Name</label>
             						</div>
									<div class="col-md-3">											
										<div class="input-group" id="fullName11">												
											<input type="search" class="typeahead form-control input-SmallText" id="userFullName" onkeyup="getUserDetailsByFullName(this.id)"/> 
											<span class="input-group-btn">
												<button class="btn btn-primary" style="height: 25px;margin-bottom: 10px"   type="button" onclick="getUserDetailsListByUserId()">
													<span class="fa fa-search" aria-hidden="true">
													</span> Search!
												</button>
											</span>
										</div>
									</div>
									<div class="col-sm-1">
                   							<label for="inlineFold" class="control-label">User Name</label>
             								</div>
									<div class="col-md-3">											
										<div class="input-group" id="divuserName">												
											<input type="search" class="typeahead form-control input-SmallText" id="userName" onkeyup="getUserDetailsByName(this.id)"/> 
											
											<span class="input-group-btn">
												<button class="btn btn-primary" style="height: 25px;margin-bottom: 10px"  type="button">
													<span class="fa fa-search" aria-hidden="true">
													</span> Search!
												</button>
											</span>
										</div>
									</div>
									<div class="col-sm-1">
                   							<label for="inlineFold" class="control-label">User ID</label>
             								</div>
									<div class="col-md-3">											
										<div class="input-group" id="userId">												
											<input type="search" class="typeahead form-control input-SmallText" id="userId1" onkeyup="getUserDetailsByUserId(this.id)"/> 
											<span class="input-group-btn">
												<button class="btn btn-primary" style="height: 25px;margin-bottom: 10px"   type="button" onclick="getUserDetailsListByUserId()">
													<span class="fa fa-search" aria-hidden="true">
													</span> Search!
												</button>
											</span>
										</div>
									</div>
									
									<div class="col-md-2">
										<div class="col-md-3-1" style="text-align: center;">
											<!-- <a href="AdminEmployeeForm.jsp" class="btn btn-xs btn-primary">Add new user</a> -->
											<a href="user_management.jsp" class="btn btn-xs btn-primary">Add User/Doc</a>
										</div>
									</div>
								</div>
							</div>
							
							<!-- modal starts here -->

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">
										<div class="row">
											  <div class="col-md-12">
												<div class="tabbable header-tabs">
													<div class="row" style="margin-top: 10px">
														<div class="col-md-12">
															<div class="col-sm-12">
																<div class="pull-right">
																	<div id="datatable1_filter" class="dataTables_filter">
																		<label id="searchlabel"> </label>
																	</div>
																</div>
															</div>
															<div class="panel panel-primary" style="margin-top: 10px">
																<div class="panel-heading" id="divEhatContent">Users
																	Master Table</div>
																<div class="panel-body" style="overflow: auto;height: 400px">
																	<table id="ehatTable" cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered" >
																		<thead id="userData">
																			<tr>
																				<th style="width: 10%">#</th>
																				<th style="width: 10%">User ID</th>
																				<th style="width: 30%">Full User Name</th>
																				<th style="width: 20%">User Type</th>
																				<th style="width: 10%">Edit</th>
																				<th style="width: 10%">Delete</th>
																				
																			</tr>
																		</thead>
																	
																	  <tbody id="subInventoryRecordsList">
																		</tbody>
																	</table>

																	<div class="pull-right">
																		<ul class="pagination" id="opdpagenation">

																		</ul>
																	</div>
																	<div class="col-md-4 col-md-offset-8">
																		<div class="pull-right">
																			<ul
																				class="pagination pagination-blue margin-bottom-10"
																				id="totalNumberOfPagesOpd">

																			</ul>
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
			App.setPage("HRManagement"); //Set current page
			App.init(); //Initialise plugins and elements

			defaultViewUserNew('HRDashboard',1);
			$("#empDet").addClass("anchorActive");
			//setAutoPatientName("byName","onload","HRMgmt_Database");
		});
	
	</script>

	<input type="hidden" id="itemMasterId" value="0">
	<%-- <input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>"> --%>
	<!-- /JAVASCRIPTS -->
	<%-- </c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward> 
	</c:if> --%>
</body>
</html>

