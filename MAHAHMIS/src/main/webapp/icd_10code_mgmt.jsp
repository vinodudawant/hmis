<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>

<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>ICD 10 Code Management</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>

<%@include file="inv_header.jsp"%>
	<!-- include js for development -->
	<script type="text/javascript" src="js/icd10_mgmt.js"></script>
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
									<div class="page-header">
										<!-- STYLER -->

										<!-- /STYLER -->
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><i class="fa fa-home"></i> <a
												href="icd_10code_mgmt.jsp">ICD-10 Code Management</a></li>

										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row">

								<div class="col-md-12">
									<div class="col-sm-1">
										<label for="inlineFold" class="control-label">Search
											By</label>
									</div>
									<div class="col-md-4">
										<div class="input-group" id="documentByName">
											<input class="form-control"
												title="Please enter document name" id="invistgroupId"
												type="text" placeholder="ICD CODE"
												onkeyup="icd10CodeMgmtAutoSuggestion(this.id)">
											<span class="input-group-btn">
												<button class="btn btn-primary"
													style="height: 25px; margin-bottom: 10px" type="button"
													onclick="getIcd10CodeMgmtByIdOnClick();">
													<span class="fa fa-search" aria-hidden="true"> </span>
													Search
												</button>
											</span>
										</div>
									</div>
									
									<div class="col-md-4">
										<button class="btn btn-xs btn-info pull-left" type="button" onclick="toggleEntryDiv('divForEntry')">
											<i class="fa fa-plus"></i> Add New ICD-10 Code
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
												<div class="col-md-12" id="divForEntry" style="display: none;">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">ICD-10 Management 
																</div>
															<div class="panel-body">
																	<div class="form-row">
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Level1 ICD Code</label> <input
																				class="form-control tip-focus"	title="Please enter ICD Code"
																				id="icdCode" type="text" placeholder="ICD Code">

																		</div>
																	</div>
																	<div class="form-row">
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Level1 ICD Diagnosis</label> <input
																				class="form-control tip-focus"	title="Please enter ICD Daignosis"
																				id="icdDiagnosis" type="text" placeholder="ICD Daignosis">

																		</div>
																	</div>
																	
																	<div class="form-row">
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Level1 ICD Description</label> <input
																				class="form-control tip-focus"	title="Please enter ICD Description"
																				id="icdDescription" type="text" placeholder="ICD Description">

																		</div>
																	</div>
																	
																	<div class="form-row">
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">ICD 10</label> 
																			<input	id="icd10" type="radio" name="icd"  checked="checked"   >
																			<label for="inputEmail4">ICDO</label> 
																			<input id="icdo" type="radio" name="icd" >
																		</div>
																	</div>
																	
																	<button type="button" class="btn btn-success" onclick="saveICDDiagnosisLevel1()" style="margin-top: 15px;">Save</button>
																	<button type="button" class="btn btn-warning" onclick="refershIcd10Mgmt()" style="margin-top: 15px;">Clear</button>
															</div>

														</div>

													</div>
												</div>
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row" style="margin-top: 5px">
															<div class="col-md-12">
																<div class="col-sm-12">
																	<div class="pull-right">
																		<div id="datatable1_filter" class="dataTables_filter">
																			<label id="searchlabel"> </label>
																		</div>
																	</div>
																</div>																
																<div class="panel panel-primary" >
																	<div class="panel-heading" id="divEhatContent">ICD-10 Management Table
																		</div>
																	<div class="panel-body">
																		<table id="ehatTable" class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead" class="fixedheaderdemo">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">ICD ID</th>
																					<th class="col-md-1 center">ICD Code</th>
																					<th class="col-md-1 center">ICD Diagnosis</th>
																					<th class="col-md-1 center">Edit</th>
																					<th class="col-md-1 center">Delete</th>
																				</tr>
																			</thead>
																			<tbody id="icd10codeMgmtBody"  style="height:300px;">
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
		
			<%@include file="inv_footer.jsp"%>

	<!-- CUSTOM SCRIPT -->

	<script>		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			fetchICD10Level1();			
		});
	</script>
	<input type="hidden" id="icdId" value="0">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>