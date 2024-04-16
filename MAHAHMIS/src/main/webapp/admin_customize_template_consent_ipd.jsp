<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>

<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Customize Consent IPD  Template</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>

<%@include file="inv_header.jsp"%>

<!-- include js for development -->
<script type="text/javascript" src="js/customize_template.js"></script>
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
											<li><i class="fa fa-home"></i> <a
												href="customize_template_consent_ipd.jsp">Customize Template</a></li>

											<li class="pull-right">
											<button class="btn btn-xs btn-info pull-left" type="button"
											onclick="toggleEntryDiv('divForEntry')">
											<i class="fa fa-plus"></i> Add New Template
										</button>
											</li>		
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row">

								<div class="col-md-12">
									<div class="col-sm-1">
										
									</div>
								
									<div class="col-md-4">
										
									</div>

									<div class='form-group col-md-3 pull-right'>
										<button type="button" class="btn btn-success"
											onclick="saveCustomizeTemplateForConsentIPD()" style="margin-top: 15px;">Save</button>
										<button type="button" class="btn btn-warning"
											onclick="resetCustomizeTemplateForConsentIPD()" style="margin-top: 15px;">Clear</button>

									</div>

								</div>
							</div>

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">

											<div class="row">
												<div class="col-md-12" id="divForEntry"
													style="display: none;">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Customize IPD
																Template</div>
															<div class="panel-body">
																<div class="form-row">

																	<div class="form-group col-md-3">
																		<label for="inputEmail4">Template List</label> 
																		<select	name="tempname" id="selCustomizeTempci" style="width: 100%;">
																			<option value="0">--Select--</option>

																		</select>
																	</div>

																	<div class="form-group col-md-3">
																		<label for="inputEmail4">Template Type</label> <select
																			name="tempname" id="selTemplateType" onchange="showSpecilationList()"
																			style="width: 100%;">
																			 <option value="Select" style="font-size: 12px;">-Select-</option>
    <option value="c" style="font-size: 12px;">Consent Forms</option>
    <option value="d" style="font-size: 12px;">Discharge Summary</option>
    <option value="o" style="font-size: 12px;">OT</option>
    <option value="h" style="font-size: 12px;">History</option>
    <option value="f" style="font-size: 12px;">Fitness</option>
    <option value="t" style="font-size: 12px;">Death</option>
    <option value="s" style="font-size: 12px;">Sickness</option>
    <option value="m" style="font-size: 12px;">Mortuary</option>

																		</select>
																	</div>

																	<div class="form-group col-md-3" style="display:none" id="specializationDiv">
																		<label for="inputEmail4">Specialization List</label> <select
																			name="tempname" id="doctorSpeci"
																			style="width: 100%;">
																			<option value="0">--Select--</option>

																		</select>
																	</div>



																	<div class="form-group col-md-3">
																		<label for="inputEmail4">Template Name <b
																			style="color: red;">*</b></label> <input type="text"
																			id="customizeTemplateNameci"
																			name="customizeTemplateName" style="width: 100%;"
																			placeholder="Template Name" maxlength="145"
																			class="form-control tip-focus"
																			title="Please enter Template Name">
																	</div>
																	
																	<div class="form-group col-md-3" >
																		<label for="inputEmail4">Department </label> <select
																			name="tempname" id="departName" style="width: 100%;">
																			<option value="0">--Select--</option>

																		</select>
																	</div>

																	<!-- <div class="form-group col-md-6">
																	
																	<label">OPD</label>
																		<input type="checkbox" id="opdFlag" >
																		
																		<label>IPD</label>
																		<input type="checkbox" id="ipdFlag" >
																		
																		<label >Diet</label>
																		<input type="checkbox" id="dietflag" >
																	
																		<label>Mortuary</label>
																		<input type="checkbox" id="mortflag" >


																	</div> -->


																</div>

															</div>

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
															<div class="panel panel-primary">
																<div class="panel-heading" id="divEhatContent">Customize IPD Template
																	Details</div>
																<div class="panel-body">
															<!-- ------------------------Customize Template Start-------------- -->
																	
																	<div class="panel panel-default col-md-12-1"
																		style="margin-top: 0%;">
																		<div class="panel-body">
																			<div id="move" style="width: 100%; display: none;"
																				class="ui-resizable ui-draggable ui-draggable-handle">
																				<textarea class="ckeditor ui-widget-content "
																					name="editor1" title="Rich Text Editor, editor1"
																					placeholder="Content" id="editor1"></textarea>
																			</div>
																			
																			<!-- commented following by aniket, 7 JAN 22 -->

																			<!--  <div id="historyTemp" style="width: 100%;"
																				class="tabbable ui-resizable ui-draggable ui-draggable-handle">

																				<div class="divide-10"></div>
																				<div class="tab-content">
																					<div ID="Subjective"
																						class="tab-pane fade in active">
																						<textarea class="ckeditor ui-widget-content "
																							name="editorSubjective"
																							title="Rich Text Editor, editorSubjective"
																							placeholder="Content" id="editorSubjectiveData" style="width: 955px;height:67px"></textarea>
																					</div>
																					<input type="hidden" name="tempname" id="tempname"
																						value="">

																				</div>
																			</div>  -->
																			
																			
																			<!-- START---- added by aniket kanse, 7th JAN 22 -->
																			
																				<div id="historyTemp" style="width: 100%;"
																					class="tabbable ui-resizable ui-draggable ui-draggable-handle">
																					<ul class="nav nav-tabs">
																						<li class="active">
																							<a data-toggle="tab" href="#Subjective">
																								<i class="fa fa-home"></i> 
																									<span class="hidden-inline-mobile">Subjective</span>
																							</a>
																						</li>
																						<li>
																							<a data-toggle="tab" href="#Objective">
																								<i class="fa fa-home"></i> 
																									<span class="hidden-inline-mobile">Objective</span>
																							</a>
																						</li>
																					</ul>
																					<div class="divide-10"></div>
																					
																					<div class="tab-content">
																						<div id="Subjective" class="tab-pane fade in active">
																							<textarea class="ckeditor ui-widget-content "
																								name="editorSubjective"
																								title="Rich Text Editor, editorSubjective"
																								placeholder="Content" id="editorSubjectiveci"></textarea>
																						</div>
																						<div id="Objective" class="tab-pane fade">
																							<textarea class="ckeditor ui-widget-content "
																								name="editorObjective"
																								title="Rich Text Editor, editorObjective"
																								placeholder="Content" id="editorObjective"></textarea>
																						</div>
																					</div>
																				</div>
																				
																				<input type="hidden" name="tempname" id="tempname"
																						value="">
																			
																			<!-- END  ---- added by aniket kanse, 7th JAN 22 -->

																		</div>
																	</div>
																	<!-- ------------------------Customize Template End----------------------- -->



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

		<script>
		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			fetchCustomizeTemplateListForConsentIPD();	
			getSpecializationInfo();		 
			/* $("#selTemplateType").select2();
			$("#doctorSpeci").select2();
			$("#departName").select2(); */

			getDropDownListData("DEPT", "departName");	// aniket kanse / 07 JAN 22
			 
		});
	</script>
		<input type="hidden" id="idCustomizeTemplateci" value="0">
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