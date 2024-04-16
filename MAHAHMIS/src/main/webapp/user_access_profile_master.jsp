<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>User Profile Master</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<link rel="stylesheet" type="text/css" href="css/bootstrap-chosen.css" />
<script src="js/chosen.jquery.js"></script>
<%@include file="inv_header.jsp"%>

	<!-- include js for development -->
	<script type="text/javascript" src="js/UserAccess.js"></script>
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
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><i class="fa fa-home"></i> <a
												href="user_access_profile_master.jsp">User Profile Master</a></li>
											<li class="pull-right">
												<button class="btn btn-xs btn-info pull-right" type="button" onclick="toggleEntryDiv('divForEntry')">
												<i class="fa fa-plus"></i> Add New Profile </button></li>
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
												<div class="col-md-12" id="divForEntry" style="display: none">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Profile	Master</div>
															<div class="panel-body">
																<div class="form-row">
																	<div class="form-group col-md-3">
																		<label for="inputEmail4">Profile Name</label>
																		 <input onkeypress="return validatealphabetic(event)" class="form-control tip-focus" title="Please enter profile name" id="profileName" type="text" placeholder="Profile Name">
																	</div>
																</div>
																
																<div class="form-row">
																	<div class="form-group col-md-2">
																		<button type="button" class="btn btn-success" onclick="insertProfile()" style="margin-top: 15px;">Save</button>
																		<button type="button" class="btn btn-warning" onclick="refreshProfileMaster()" style="margin-top: 15px;">Clear</button>
																	</div>
																</div>
																
																<div class="divide-20"></div>
																<div class="col-md-12" style="margin-top: 10px;">
																	<table class="table table-bordered table-condensed">
																		<thead>
																			<tr>
																				<th>Modules</th>
																				<th>View <label class="checkbox-inline"> <input
																						type="checkbox" id="viewAll"
																						onchange="selectAll('viewAll')">
																				</label></th>
																				<th>Create/Edit <label class="checkbox-inline">
																						<input type="checkbox" id="editAll"
																						onchange="selectAll('editAll')">
																				</label></th>
																				<th>Delete <label class="checkbox-inline">
																						<input type="checkbox" id="deleteAll"
																						onchange="selectAll('deleteAll')">
																				</label></th>
																				<th>Sub-Module</th>
																			</tr>
																		</thead>
																		<tbody id="moduleBody">
			
																		</tbody>
																	</table>
																</div>
																
																
															</div>
														</div>
													</div>
												</div>
												<div class="divide-20"></div>
												<div class="col-md-12" id="divForEdit">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Profile Master Table</div>
															<div class="panel-body" style="overflow: auto;height: 500px">
																<table class="datatable table table-striped table-bordered">
																	<thead id="ehatTHead">
																		<tr>
																			<th style="width:10%">#</th>
																			<th style="width:10%">Profile Id</th>
																			<th style="width:30%">Profile Name</th>
																			<th style="width:10%">Edit</th>
																			<th style="width:10%">Delete</th>
																		</tr>
																	</thead>
																	<tbody id="profileMasterBody">
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
	
	<script>		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			getAllModule();
			getAllSubModule();
			getAllProfile();	
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