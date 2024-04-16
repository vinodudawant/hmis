<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Module Master</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

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
												href="user_access_module_master.jsp">Module Master</a></li>
											<li class="pull-right">
												<button class="btn btn-xs btn-info pull-right" type="button" onclick="toggleEntryDiv('divForEntry')">
												<i class="fa fa-plus"></i> Add New Module </button></li>
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

											<div class="row">
												<div class="col-md-12" id="divForEntry" style="display: none">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Module
																Master</div>
															<div class="panel-body">
																<div class="form-row">
																	<div class="form-group col-md-3">
																		<label for="inputEmail4">Module Name</label>
																		 <input validateAlphabetsByRegEx(this.id)' class="form-control tip-focus" title="Please enter module name" id="moduleName" type="text" placeholder="Module Name">
																	</div>
																	
																	<div class="form-group col-md-3">
																		<label for="inputEmail4">Landing Page Name</label>
																		 <input validateAlphabetsByRegEx(this.id)' class="form-control tip-focus" title="Please enter Landing Page name" id="landPage" type="text" placeholder="Landing Page Name">
																	</div>
																	
																	<div class="form-group col-md-3">
																	     <label for="inputEmail4">Module Sequence</label>
																		 <input validateAlphabetsByRegEx(this.id)' class="form-control tip-focus" title="Please enter Sequence Number" id="ModSequence" type="text" placeholder="Sequence Number">
																	</div>
																	
																	<div class="form-group col-md-3">
																		<label for="inputEmail4">View Module </label>
                                                                          <input class="tip-focus" type="checkbox" name="checkModule" id="checkModule"
												         	           checked="checked">																	
												         	           </div>
	              													</div>
	              													
															<button type="button" class="btn btn-success" onclick="insertModule()" style="margin-top: 15px;">Save</button>
															<button type="button" class="btn btn-warning" onclick="refreshModuleMaster()" style="margin-top: 15px;">Clear</button>
															</div>
														</div>
													</div>
												</div>
												<div class="divide-20"></div>
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Module Master Table</div>
															<div class="panel-body" style="overflow: auto;height: 500px">
																<table class="datatable table table-striped table-bordered">
																	<thead id="ehatTHead">
																		<tr>
																			<th style="width:10%">#</th>
																			<th style="width:10%">Module Id</th>
																			<th style="width:30%">Module Name</th>
																			<th style="width:10%">Edit</th>
																			<th style="width:10%">Delete</th>
																		</tr>
																	</thead>
																	<tbody id="masterModuleBody">
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
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			getAllModule();		
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