<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Out Source Routine Result</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!-- JQUERY -->
<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
<!-- JQUERY UI-->
<script src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
<!-- JQUERY UI-->

<link rel="stylesheet" type="text/css" href="ehat-design/js/xcharts/xcharts.min.css" />
<link rel="stylesheet" type="text/css"  href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
<link rel="stylesheet" type="text/css"	href="ehat-design/css/cloud-admin.css">
<link rel="stylesheet" type="text/css" 	href="ehat-design/css/themes/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css"  href="ehat-design/css/responsive.css">
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

<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></link>
<script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link rel="stylesheet" type="text/css" href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>
<script src="ehat-design/js/script.js"></script>
<script type="text/javascript" src="js/pathology_phelbotomy.js"></script>
    
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
<!-- 													<button  class="btn btn-xs btn-info" id="backtocurrentBtn" value="AP" onclick="changeStatusOfLabReport(this.id)">Back To Accession</button>					
 -->												    <button  class="btn btn-warning btn-xs" id="PrintHBtn" value="PH"  onclick="printRoutineValueResultW()">Print(H/F)</button>	
												    <button  class="btn btn-warning btn-xs" id="printBtn" value="PF"  onclick="printRoutineValueResult()">Print</button>
												    <button class="btn btn-success btn-xs" id="saveBtn"	value="AU" onclick="saveLabTestRoutineValueResultOutSource(this.id)">Save</button>														
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

												<div class="col-md-12" style="margin-top: 1%;">

													
													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">Patient Name
																:</label> <label class="control-label" id="patientName">
															</label>

														</div>
													</div>
													
													<div class="col-md-2">
														<div class="form-group">

															<label class="control-label lblBold">Patient Id :</label>
															<label class="control-label" id="patientId"> </label>
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
															<label class="control-label lblBold">Diagnostic
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
															<label class="control-label lblBold">Dispatch Date :</label> <label
																class="control-label" id="dispatchDate"></label>

														</div>
													</div>
													
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Dispatch Time :</label> <label
																class="control-label" id="dispatchTime"></label>

														</div>
													</div>
												
												</div>
											</div>
										</div>
									</div>							
								<div class="panel panel-default">
									<div class="panel-body">										 
											<div class="col-md-1"  style="margin-top:-6px">												
												<h6>Pathologist:</h6>
											</div>
											
											<div class="col-md-3"  style="margin-top:-6px">												
												<select id="IdPathologist" name="select"
													class="col-md-12 input-SmallText" style="margin-top: 0px;">
												</select>
											</div>
                                            
                                           <div class="col-md-2"  style="margin-top:-2%;margin-left:87%">
												<input type="button" value="Fill Default Values" id="rejectId"
													class="btn btn-xs btn-warning " data-toggle="tooltip" onclick="setDefaultRoutineValue(<%=request.getParameter("treatmentId")%>);"
													data-placement="bottom" title="Fill Default Values"/>
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
																		<th class="col-sm-3 center">Test Name</th>
																		<th class="col-sm-3 center">Analysis</th>
																		<th class="col-md-2 center">(- > or < +)</th>
																		<th class="ccol-md-2 center">Test Result</th>
																		<th class="col-md-2 center">Normal Values</th>
																		<th class="col-md-2 center">Units</th>
																		<th class="col-md-1 center">Flag</th>
																		<th class="col-md-2 center">Method</th>
																		<th class="col-md-6 center">Reason</th>
																		<th class="col-md-3 center">Reject Test</th>
																		<th class="col-md-3 center">Action</th>
																	</tr>
																</thead>
																<tbody id="itemMasterRecordsList">

																</tbody>

															</table>
															<input type="hidden" id=flag value="0"> 
															<input type="hidden" value="0" id="id" />
															<input type="hidden" value="0" id="patientgander" /> 
															<input type="hidden" value="0" id="phlebotomyprofileid" />
															<input type="hidden" value="<%=request.getParameter("treatmentId")%>" id="treatmentID" />
														    <input type="hidden" value="<%=request.getParameter("treatmentId")%>" id="treatmentIddd" />															
															<input type="hidden" value="<%=request.getParameter("masterid")%>" id="masterIdd" />
															<input type="hidden" value="<%=request.getParameter("profileId")%>" id="pId" />
															
															
															 <input type="hidden" value="0" id="masterid1" /> 
														    <input type="hidden" value="0" id="profileid1" /> 
														    <input type="hidden" value="0" id="testid1" /> 
														    <input type="hidden" value="0" id="testflag1" />
															 <input type="hidden"
																value="<%=request.getParameter("sampleTypeId")%>"
																id="sampleTypeId" />
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
																				
																					<select id="rejectresion">
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
																				
																					<select id="unrejectresion">
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
								</div>
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
	 <!--  <script src = "https://code.highcharts.com/modules/data.js"></script> -->
	
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
		<script type="text/javascript"src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
		<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
		
		<script src="auto/jquery.mockjax.js"></script>
		<script src="auto/bootstrap-typeahead.js"></script>
		
	    <!-- COOKIE -->	    
	  <script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
        <script type="text/javascript" src="ehat-design/js/d3/d3.v3.min.js"></script>
        <script type="text/javascript" src="ehat-design/js/xcharts/xcharts.min.js"></script>	

         <script src="lis/highcharts.js"></script>
       <script src="lis/exporting.js"></script>
       <script src="lis/dashboard.js"></script> 
	<!-- CUSTOM SCRIPT -->

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
				processingPatientinformation(<%=request.getParameter("treatmentId")%>);
				getpathologistname();
				setTimeout(function() {
				getOutSourceRoutinevalueResutl(<%=request.getParameter("treatmentId")%>);	
				}, 1000);		
			};
	</script>
	
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>