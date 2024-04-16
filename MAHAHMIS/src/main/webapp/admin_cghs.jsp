<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>CGHS Master</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<%@include file="inv_header.jsp"%>

	<!-- include js for development -->
<script type="text/javascript" src="js/serviceMaster.js"></script>
<script type="text/javascript" src="js/temp.js"></script>
	
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
												<li><a href="hospital_info.jsp">Administrator</a></li>												
												<li>Ehat Masters</li>
												<li>CGHS Master</li>
											<!-- <li class="pull-right">
												<button class="btn btn-xs btn-info pull-right" type="button" onclick="toggleEntryDiv('divForEntry')">
												<i class="fa fa-plus"></i> Add New Module </button></li> -->
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
										<div class="input-group" id="byNamee">
											<input class="form-control" title="Please enter CGHS name" id="byName"
												type="text" placeholder="CGHS Name" onkeyup="setAutoCompleteForTempMaster(this.id,'search')">
											<span class="input-group-btn">
												<button class="btn btn-primary"	style="height: 25px; margin-bottom: 10px" type="button">
													<span class="fa fa-search" aria-hidden="true"> </span>
													Search
												</button>
											</span>
										</div>
									</div>
								</div>
							</div>

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">

											<div class="row">
												<div class="col-md-12" id="divForEntry">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">CGHS Master</div>
															<div class="panel-body">
																<div class="form-row">

																	<div
																		class='form-group Remove-Padding col-md-12-1 hidden'
																		style='padding-right: 8px; margin-top: 9px;'>
																		<div class='divide-20'></div>
																		<label class='TextFont col-md-4-1'>CGHS
																			ID</label> <input id='tempId' type='text'
																			placeholder='CGHS ID'
																			style='background-color: #ddd' disabled="disabled"
																			;
																		class='form-control input-SmallText col-md-7-1'
																			readonly='readonly' style='margin-left:0%;' value='0' />
																	</div>

																	<div class="form-group col-md-3"> 
																		<label for="inputEmail4">CGHS Name</label>
																		 <input validateAlphabetsByRegEx(this.id)' class="form-control tip-focus" title="Please enter module name" id="tempName" type="text" placeholder="CGHS Name">
																	</div>
																	
																	<div class="form-group col-md-3"> 
																		<label for="inputEmail4">CGHS Code</label>
																		 <input validateAlphabetsByRegEx(this.id)' class="form-control tip-focus" title="Please enter module name" id="tempCode" type="text" placeholder="CGHS Code">
																	</div>
																	
																	<div class="form-group col-md-3"> 
																		<label for="inputEmail4">Charges Service</label>
																		 <select class="tip-focus" id="uId" name="unitListName"
																						style="width: 100%" title="Please select Service name"
																						onchange="">
																					</select>
																	</div>
																	
																	<!-- <div class="form-group col-md-3">
																				<label class="col-sm-4 control-label">Charges Service
																					</label>
																				<div class="col-sm-8">
																					<select class="tip-focus" id="uId" name="unitListName"
																						style="width: 100%" title="Please select Service name"
																						onchange="">
																					</select>
																				</div>
																			</div> -->
																</div>
																<button type="button" class="btn btn-success" onclick="insertMaster()" style="margin-top: 15px;">Save</button>
																<button type="button" class="btn btn-warning" onclick="refreshTempMaster()" style="margin-top: 15px;">Clear</button>
															</div>
														</div>
													</div>
												</div>
												<div class="divide-20"></div>
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary" >
															<div class="panel-heading" id="divEhatContent">Narration Master Table</div>
															<div class="panel-body" style="overflow: auto;height: 300px">
																<table id="ehatTable" class="datatable table table-striped table-bordered">
																	<thead id="ehatTHead" class="fixedheaderdemo">
																		<tr>
																			<th class="col-md-1 center">#</th>
																			<th class="col-md-1 center">CGHS Id</th>
																			<th class="col-md-1 center">CGHS Name</th>
																			<th class="col-md-1 center">CGHS Code</th>
																			<th class="col-md-1 center">Service Id</th>
																	`		<th class="col-md-1 center">Edit</th>
																			<th class="col-md-1 center">Delete</th>
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
			getAllTemp();
			getTempCount();
			getServicesInTemp();	
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