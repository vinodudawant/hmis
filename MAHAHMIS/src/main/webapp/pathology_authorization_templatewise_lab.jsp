<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Authorization Routine Result</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
	<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
	<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
	<script src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
	<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/themes/default.css" id="skin-switcher" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/responsive.css" >
	<link href="ehat-design/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/typeahead/typeahead.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/uniform/css/uniform.default.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />
    <link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></link>
    <script type="text/javascript"	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
    <link rel="stylesheet" type="text/css" href="timepeacker/jquery.datetimepicker.css" />
    <script src="timepeacker/jquery.datetimepicker.js"></script>
    <script src="ehat-design/js/jquery-validate/jquery.validate.min.js"></script>
    <script src="ehat-design/js/jquery-validate/additional-methods.min.js"></script>
    <script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>	
    <script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
    <!-- CKEDITOR -->
	<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>
    
   
   <script type="text/javascript" src="js/pathology_phelbotomy.js"></script>
   <script type="text/javascript" src="js/pathology_template.js"></script>
    
<style type="text/css">
.ajaxmodal {
	display: none;
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('images/ajax_loader_blue_64.gif') 50% 50% no-repeat;
}

body.loading {
	overflow: hidden;
}

body.loading .ajaxmodal {
	display: block;
}
</style>
</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
		<!-- HEADER -->
		<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>

	</c:if>
	<c:if test="${sessionScope.userType != null }">
		<div id="outer" class="container-main" style="width: 100%;">	
			<header class="navbar clearfix" id="header">

			<%@include file="Menu_Header_Nobel.jsp"%>
			
			<%
			 ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	      	String Neutrophils = resourceBundleEha.getObject("Neutrophils").toString();
	      	String Lymphocytes = resourceBundleEha.getObject("Lymphocytes").toString();
	      	String Eosinophils = resourceBundleEha.getObject("Eosinophils").toString();
	      	String Basophils = resourceBundleEha.getObject("Basophils").toString();
	      	String Monocytes = resourceBundleEha.getObject("Monocytes").toString();
	    	String CBCProfile = resourceBundleEha.getObject("CBCProfile").toString();
			
						java.util.Calendar currentDate = java.util.Calendar
						.getInstance();
				java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
						"dd-MM-yyyy");
				String todays_date = formatter.format(currentDate.getTime());
				
				java.text.SimpleDateFormat formatterr = new java.text.SimpleDateFormat(
						"dd/MM/yyyy");
				String todays_datee = formatterr.format(currentDate.getTime());
				
				java.text.SimpleDateFormat formatterrr = new java.text.SimpleDateFormat(
						"hh:mm");
				String todays_time = formatterrr.format(currentDate.getTime());
				ResourceBundle resourceBundle = ResourceBundle.getBundle("Ehat"); 
			  	
			  	String meeshaFlow = resourceBundle.getObject("meesha").toString();
			  	 ResourceBundle resourceBundleHospital = ResourceBundle.getBundle("hospitalaccess"); 
				 String hospitalname = resourceBundleHospital.getObject("hospitalname").toString();
			%>

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

											<ul class="breadcrumb col-md-12">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
												<li><a href="">LIS</a></li>
												<li>Lab Test Result</li>
												<div class="li pull-right">													
													<button  class="btn btn-xs btn-info" id="backtocurrentBtn" value="AP" onclick="changeStatusOfLabReportForTemplateWise(this.id)">Back To Accession</button>					
												    <button  class="btn btn-warning btn-xs" id="PrintHBtn" value="PH"  onclick="printTemplateWithoutHeader()">Print(W-H)</button>	
												    <button  class="btn btn-warning btn-xs" id="printBtn" value="PF"  onclick="printTemplateWithHeader()">Print(H)</button>
												    <button class="btn btn-success btn-xs" id="postBtn" value="AAP" onclick="saveTemplateInfo('post')"> Authorization And Post</button>
<!-- 												 <button  class="btn btn-success btn-xs" id="postBtn" value="AAP"  onclick="changeStatusOfLabReport(this.id)">POST</button>
 -->												    														
													</div>
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->
								
								<div class="alert alert-block alert-info fade in" style="height:0%;">

										<div class="row">
											<div class="col-md-1">
												<img id="patImg" style="width: 100%; height: 60px"
													src="ehat-design/img/profile/avatar.jpg"
													class="img-responsive">
											</div>
											<div class="col-md-11" >

<%-- 												<div class="col-md-12" style="margin-top: 1%;">

													
													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">Patient Name
																:</label> <label class="control-label" id="patientName">
															</label>

														</div>
													</div>
													
													<div class="col-md-2">
														<div class="form-group">

															<label class="control-label lblBold">UHID :</label>
															<label class="control-label" id="patientId" style="display:none;"> </label>
															<label class="control-label" id="patientId11"  > </label>
														</div>
													</div>



													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Age :</label> <label
																class="control-label" id="age"> </label>
														</div>
													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Corporate :</label>
															<label class="control-label" id="corporateid"> </label>

														</div>
													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Ref.BNo: </label> <label
																class="control-label" id="billNo"></label>

														</div>
													</div>
													
													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">Diagonstic
																No :</label> <label class="control-label" id="digNo"></label>

														</div>

													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Gender :</label> <label
																class="control-label" id="sex"></label>

														</div>
													</div>
													
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Bill No: </label> <label
																class="control-label" id="consultingDoctor">
																Vinod-D</label>

														</div>
													</div>
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Treatment Id
																:</label> <label class="control-label" id=treatmentId> <%=request.getParameter("treatmentId")%>
															</label>

														</div>
													</div>
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">DOA:</label> <label
																class="control-label" id="doa"></label>

														</div>
													</div>
													
													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">Patient Address
																:</label> <label class="control-label" id="addressNew">
															</label>

														</div>
													</div>
													
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Collection Date :</label> <label
																class="control-label" id="collectionDate"></label>

														</div>
													</div>
													
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Collection Time :</label> <label
																class="control-label" id="collectiontime"></label>

														</div>
													</div>
													
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Accepted Date :</label> <label
																class="control-label" id="accepteddate"></label>

														</div>
													</div>
													
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Accepted Time :</label> <label
																class="control-label" id="acceptedtime"></label>

														</div>
													</div>
												
												</div> --%>
												
												
													<div class="col-md-12" style="margin-top: 1%;">

													<div class="col-md-4">
														<div class="form-group">

															<label class="control-label lblBold">UHID :</label>
															<label class="control-label" id="patientId" style="display:none;" > </label>
															<label class="control-label" id="patientId11"> </label>
														</div>
													</div>

													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">Age :</label> <label
																class="control-label" id="age"> </label>
														</div>
													</div>
													
													<div class="col-md-3" style="display: none;">
														<div class="form-group">
															<label class="control-label lblBold">Ref.BNo: </label> <label
																class="control-label" id="billNo"></label>

														</div>
													</div>

													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">Diagonstic
																No :</label> <label class="control-label" id="digNo"></label>

														</div>
													</div>		
													
													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">Bill No: </label> <label
																class="control-label" id="consultingDoctor">
																Vinod-D</label>

														</div>
													</div>
													
													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">DOA:</label> <label
																class="control-label" id="doa"></label>

														</div>
													</div>
													
													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">Treatment Id
																:</label> <label class="control-label" id=treatmentId> <%=request.getParameter("treatmentId")%>
															</label>

														</div>
													</div>														

													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">Gender :</label> <label
																class="control-label" id="sex"></label>

														</div>
													</div>
													
													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">Collection
																Date :</label> <label class="control-label" id="collectionDate"></label>

														</div>
													</div>
													
													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">Patient Name
																:</label> <label class="control-label" id="patientName">
															</label>

														</div>
													</div>												
													 
													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">Accepted
																Date :</label> <label class="control-label" id="accepteddate"></label>

														</div>
													</div>								

													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">Accepted
																Time :</label> <label class="control-label" id="acceptedtime"></label>

														</div>
													</div>
													
													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">Collection
																Time :</label> <label class="control-label" id="collectiontime"></label>

														</div>
													</div>
													
													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">Corporate :</label>
															<label class="control-label" id="corporateid"> </label>

														</div>
													</div>	
													
													<div class="col-md-7">
														<div class="form-group">
															<label class="control-label lblBold">Patient
																Address :</label> <label class="control-label" id="addressNew">
															</label>

														</div>
													</div>
													
																								

												</div>
												
												
												
											</div>
										</div>
									</div>		
									<input type="hidden" value="<%=meeshaFlow%>"  id="meeshaFlow" />	
										<input type="hidden" value="<%=hospitalname%>"  id="hospitalname" />				
								<%-- <div class="panel panel-default">
									<div class="panel-body">										 
											<div class="col-md-1"  style="margin-top:-6px">												
												<h6>KIT SPEC:</h6>
											</div>
											
											<div class="col-md-2" style="margin-top: -3px"
												id="pathologistdivId">
												<select id="kitSpecId" name="select"
													class="col-md-12 input-SmallText" style="margin-top: 0px;">
													<option value="">Select</option>
													<option value="Meril COVID-19 One Step RT-PCR kit">Meril COVID-19 One Step RT-PCR kit</option>
												</select>
											</div>
											
											<div class="form-group col-md-3">
												<label><strong>Samples</strong></label> 
												<select id="patientWiseSamples" name="select" style="width:70%;"
													onchange="getRoutineValuesBySampleType('reporting');">
												</select>
											</div>

											<div class="col-md-1" id="history"
												style="margin-top: -2%; margin-left: 84%">
												<input type="button" value="Patient History"
													id="prevHistory" class="btn btn-xs btn-warning"
													data-toggle="tooltip"
													onclick="showPatientPreviousHistory(<%=request.getParameter("treatmentId")%>);"
													data-placement="bottom" title="Show Patient History" />
											</div>

											<div class="divide-20"></div>
											<div class="row" >
												<div class="col-md-4" style="width: 100%;margin-top:2%;overflow: auto;">																					
													<div class="panel panel-primary">													
														 <div class="panel-body"
															style="overflow: auto; height: 374px;"> 
															<table
																class="datatable table table-bordered table-striped table-condensed cf" style="overflow: auto;">
																<thead id="ehatTHead">
																	<tr style="background-color: lightblue">
																	    <th class="col-md-3 center">Profile Name</th>
																		<th class="col-sm-3 center">Test Name</th>
																		<th class="col-md-1 center">Trend Analysis</th>
																		<!-- <th class="col-md-1 center">Parameter/Micro-organism</th> -->
																		<th class="ccol-md-1 center">Test Result</th>
																		<!-- added by Rohit on 12-09-2021 -->
																		<th class="col-md-1 center" style="display:none">General Type</th>
																		<th class="ccol-md-1 center">Previous Result</th>
																		<th class="col-md-1 center">Normal Values</th>
																		<th class="col-md-1 center">Units</th>
																		<th class="col-md-1 center">Flag</th>
																		<th class="col-md-2 center">Method</th>
																		<th class="col-md-1 center">Test Comment</th>
																		<th class="col-md-1 center">Reject Test</th>
																		<th class="col-md-1 center">Action</th>
																	</tr>
																</thead>
																<tbody id="itemMasterRecordsList">

																</tbody>

															</table>
														</div>
													</div> 



											</div>

										</div>
										
										
										
										<div class="modal fade" id="rejectedTestPopUpInProcessing" tabindex="-1">
												<div class="modal-dialog modal-dialog-centered"
													style="width: 75%; margin-top: 10%">

													<div class="modal-body">
														<div class="row">
															<div class="col-md-7" style="margin-top: 0%; margin-left: 20%">
																<div class="container">
																	<div class="panel">
																		<div class="panel-body"  style="overflow: auto;">																	
																			<div class="col-md-12" style="font-weight: bold;">
																				<div class="col-md-2" style="margin-top: -6px">
																					<h6>Reason:</h6>
																				</div>																		
																				<div id="rejectDiv" class="form-group col-md-5">
																				
																					<select id="rejectresion"class="col-md-12">
																						<option value="1">Hemolysed Sample</option>
																						<option value="2">Clotted Sample</option>
																						<option value="3">Inadequate Sample</option>
																						<option value="4">Contamination</option>
																						<option value="5">Inappropriate Collection Container</option>
																						<option value="6">Others</option>
																					</select>
																				</div>
																				
																				<div id="rejecetDiv" class="form-group col-md-2" style="margin-top: 0%">
																					<input type="button" value="Reject" class="btn btn-xs btn-warning " title="Reject"
																						id="rejectid" onclick="rejectedInprofiletestInRoutinevalue()" />
																				</div>
																				
																				<div id="closeDiv" class="form-group col-md-2" style="margin-top: 0%">
																					<input type="button" value="close" class="btn btn-xs btn-danger " title="close"
																						id="closeId" onclick="hiderejectedtestInProcessingArea()" />
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
											
											
											
											<div class="modal fade" id="UnrejectedTestPopUpInProcessing" tabindex="-1">
												<div class="modal-dialog modal-dialog-centered"
													style="width: 75%; margin-top: 10%">

													<div class="modal-body">
														<div class="row">
															<div class="col-md-7" style="margin-top: 0%; margin-left: 20%">
																<div class="container">
																	<div class="panel">
																		<div class="panel-body"  style="overflow: auto;">																	
																			<div class="col-md-12" style="font-weight: bold;">
																				<div class="col-md-2" style="margin-top: -6px">
																					<h6>Reason:</h6>
																				</div>																		
																				<div id="cancleDiv" class="form-group col-md-5">
																				
																					<select id="unrejectresion"class="col-md-12">
																						<option value="1">Hemolysed Sample</option>
																						<option value="2">Clotted Sample</option>
																						<option value="3">Inadequate Sample</option>
																						<option value="4">Contamination</option>
																						<option value="5">Inappropriate Collection Container</option>
																						<option value="6">Others</option>
																					</select>
																				</div>
																				
																				<div id="UnRejectDiv" class="form-group col-md-2" style="margin-top: 0%">
																					<input type="button" value="UnReject" class="btn btn-xs btn-success " title="UnReject"
																						id="unRejectId" onclick="rejectedInprofiletestInRoutinevalue()" />
																				</div>
																				
																				<div id="closeDiv" class="form-group col-md-2" style="margin-top: 0%">
																					<input type="button" value="close" class="btn btn-xs btn-danger " title="close"
																						id="closeId" onclick="hiderejectedtestInProcessingArea()" />
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
											<div class="modal fade" id="trendAnalysisDivpopup" tabindex="-1">
												<div class="modal-dialog modal-dialog-centered" style="width: 70%; margin-top: 5%">

													<div class="modal-body">
														<div class="row">
															<div class="col-md-12">

																<div class="panel panel-default">
																	<h3 class="center">TREND ANALYSIS</h3>
																	<div class="panel-body">
																		<div class="panel-body" style="overflow: auto;">
																			<div class="panel panel-default">
																				<div class="panel-heading">
																					<ul class="nav nav-tabs" id="tabId">

																						<li class="active" id="AL"><a class="center" id="all" data-toggle="tab" href="#tableTab" onclick="">
																						<i class="fa fa-bookmark"></i> 
																					    <span class="hidden-inline-mobile">Tabular</span></a></li>

																						<!--  <li id="accessionPending"><a class="center" id="AP" data-toggle="tab" href="#graphTab" onclick="">
																						 <i class="fa fa-bookmark"></i> 
																						 <span class="hidden-inline-mobile">Graph</span></a></li> -->
																						 
																						 <li id="graph"><a class="center" id="AP" data-toggle="tab" href="#graphTabb" onclick="">
																						 <i class="fa fa-bars"></i> 
																						 <span class="hidden-inline-mobile">Graph</span></a></li>


																					</ul>

																				</div>
																				<div class="panel-body">
																					<div class="tab-content">

																						<div id="tableTab" class="tab-pane fade in active">
																							<div class="panel-group" id="accordion">
																								<div class="col-md-12" style="margin-top: 1%;">
																									<div style="font-weight: bold; overflow: auto;">
																										<table
																											class="table table-bordered border table-hover table-responsive"
																											id="" style="overflow: auto;">

																											<thead id="ehatTHead">
																												
																											</thead>
																											<tbody id="trendAnalysisListTable">

																											</tbody>
																										</table>
																									</div>
																								</div>
																							</div>


																						</div>

																						<!-- <div id="graphTab" class="tab-pane fade in">
																							<div class="panel-group" id="accordion">



																								<div class="col-md-10">
																									<div class="box border primary">
																										<div class="box-title">
																											<h4>
																												<i class="fa fa-bars"></i> <span
																													class="hidden-inline-mobile hh"></span>
																											</h4>
																										</div>
																										<div class="box-body">
																											<figure class="chart" id="chart7"></figure>
																										</div>
																									</div>
																								</div>
																																															</div>
																						</div> -->
																						
																						
																						<div id="graphTabb" class="tab-pane fade in">
																							<div class="panel-group" id="graph">



																								<div class="col-md-12">
																									<div class="box border primary">
																										<div class="box-title">
																											<h4>
																												<i class="fa fa-bars"></i> <span
																													class="hidden-inline-mobile hh"></span>
																											</h4>
																										</div>
																										<div class="box-body">
																											<div id="tempratureContainer"
																												style="height: 300px; width: 100%"></div>
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
													</div>
												</div>

											</div>
											
											<div class="modal fade" id="patientHistoryPopup"
												tabindex="-1">
												<div class="modal-dialog modal-dialog-centered"
													style="width: 40%;">
													<div class="modal-content">
														<div class="row">
															<div class="col-md-12">
																<div class="container">
																	<div class="panel-body">

																		<div class="col-md-12">
																			<div class="panel panel-default">
																				<div class="panel-heading" id="divEhatContent"
																					style="background: #FFE0C2">Patient History</div>
																				<div class="panel-body"
																					style="overflow: auto; height: 300px;">

																					<table
																						class="datatable table table-bordered table-striped table-condensed cf">
																						<thead id="patientHistoryTHead">
																							<tr>
																								<th class="col-md-10 center"><input type="text"/></th>
																							</tr>
																						</thead>
																						<tbody id="patientHistoryTableBody">

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
							</div> --%>
							
							<!-- added by Rohit on 20-09-2021 -->
										<div class="col-md-12">
												<div class="container">
													<div class="panel panel-primary" style="margin-top: 20px;">
														<div class="panel-heading" id="divEhatContent">Template Test Details</div>
														<div class="panel-body">
														<div class="form-group col-md-4">
														<label for="categoryName">Profile Name</label>
														 <input type="text" class="form-control tip-focus" id="profileNameId"
															placeholder="Profile Name"> 
														</div>
														<div class="form-group col-md-4">
															<label for="categoryName">Template Name</label> 
															<select class="form-control" id="templateNameId" onchange="getTemplateDataByTemplateId()">
														      <option value="">--Select Template--</option>
														    </select>
														</div>
														
														<div class="form-group col-md-4">
															<label for="categoryName">Equipment</label> 
															<select class="form-control" id="equipmentId">
														      
														    </select>
														</div>
														
														
														<div class="col-md-12" style="margin-botton:4px ">
																<button type="button" value="Patient History"
																	style="float: right; margin-left: 7px;"
																	id="prevHistory" class="btn btn-xs btn-warning"
																	data-toggle="tooltip"
																	onclick="showPatientPreviousHistory(<%=request.getParameter("treatmentId")%>);"
																	data-placement="bottom" title="Show Patient History">Patient History</button>
																&nbsp;&nbsp;

															</div>
															</div>
														</div>
														
														</div>
														
														</div>
														
														<!-- template ckeditor starts here added by Rohit -->
														<div class="col-md-12" style="margin-botton:4px ">
													<div id="historyTemp" style="width: 100%;"
														class="tabbable ui-resizable ui-draggable ui-draggable-handle">
														<ul class="nav nav-tabs">
															<li class="active"><a data-toggle="tab"
																href="#Subjective"><i class="fa fa-home"></i> <span
																	class="hidden-inline-mobile">Template Details</span></a></li>
			
														</ul>
														<div class="divide-10"></div>
														<div class="tab-content">
															<div ID="Subjective" class="tab-pane fade in active">
																<textarea class="ckeditor ui-widget-content "
																	name="RiseditorSubjective"
																	title="Rich Text Editor, RiseditorSubjective"
																	placeholder="Content" id="RiseditorSubjective"></textarea>
															</div>
															<div ID="Objective" class="tab-pane fade">
																<textarea class="ckeditor ui-widget-content "
																	name="editorObjective"
																	title="Rich Text Editor, editorObjective"
																	placeholder="Content" id="editorObjective"></textarea>
															</div>
														</div>
													</div>
													</div>
										<!-- template ckeditor ends here added by Rohit -->
										<!-- ends here -->
							
							
						</div>
<div class="col-md-12 container-fluid" id="primeLoader" style="display:none;z-index:9999;height:100vh;background-color:rgba(13,13,13,0.3);position:absolute;">
                <div class="col-md-offset-5 col-md-1" style="overflow: hidden;border-radius:25%;top:30%;background-color:#eee;padding:0;">

                    <img src="images/3.gif" style="top:0;left:0" width="125" height="100">          
                </div>
</div>
						</div>
				</div>
						<%@include file="Footer.jsp"%>
					</div>
					
	</c:if>
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
	
		
	    <!-- COOKIE -->	    
	  <script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
        <script type="text/javascript" src="ehat-design/js/d3/d3.v3.min.js"></script>
        <script type="text/javascript" src="ehat-design/js/xcharts/xcharts.min.js"></script>	

         <script src="lis/highcharts.js"></script>
       <script src="lis/exporting.js"></script>
       <script src="lis/dashboard.js"></script> 

	<script>
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
		});
			jQuery(document).ajaxStart(function() {
				$("body").addClass("loading");
			});

		</script>
		<script type="text/javascript">
			onload = function() {
				getPatientWiseSamples(<%=request.getParameter("treatmentId")%>, <%=request.getParameter("patientId")%>, <%=request.getParameter("sampleTypeId")%>, "reporting");
				processingPatientinformation(<%=request.getParameter("treatmentId")%>);
				//getpathologistname();
				$("#kitSpecId").select2();
				setTimeout(function() {
				getProcessingRoutinevalueResutl(<%=request.getParameter("treatmentId")%>);	
				
				}, 1000);
				//below functions added by Rohit 22-09-2021 for template wise flow
				getProfileName();
				getPathologyTemplateListByProfileId();
				getMachineListOnTemplate();
				getTemplateInfoByMasterId();
			};
	</script>
	
		<!-- /JAVASCRIPTS -->
	</c:if>
	<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	<!-- below code shifted at bottom by Rohit on 22-09-2021 -->
	<input type="hidden" id=flag value="0"> 
	<input type="hidden" value="0" id="id" />
	<input type="hidden" value="0" id="patientgander" /> 
	<input type="hidden" value="0" id="phlebotomyprofileid" />
	<input type="hidden" value="<%=request.getParameter("treatmentId")%>" id="treatmentID" />
    <input type="hidden" value="<%=request.getParameter("treatmentId")%>" id="treatmentIddd" />															
	<input type="hidden" value="<%=request.getParameter("masterid")%>" id="masterIdd" />
	<input type="hidden" value="<%=request.getParameter("profileId")%>" id="pId" />
	<input type="hidden" id="profileId"	value="<%=request.getParameter("profileId")%>">
	 <input type="hidden" value="0" id="masterid1" /> 
    <input type="hidden" value="0" id="profileid1" /> 
    <input type="hidden" value="0" id="testid1" /> 
    <input type="hidden" value="0" id="testflag1" />
    <input type="hidden"value="<%=request.getParameter("sampleTypeId")%>"id="sampleTypeId" />
    <input type="hidden" id="masterid"	value="<%=request.getParameter("masterid")%>">

</body>
</html>