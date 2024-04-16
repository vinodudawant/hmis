<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Processing Routine Result</title>
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


<style>
.control-label
{
	margin: 5px 0;
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
		    	String Bandcells = resourceBundleEha.getObject("Bandcells").toString();
		    	
		    	
				java.util.Calendar currentDate = java.util.Calendar .getInstance();
				java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
				String todays_date = formatter.format(currentDate.getTime());
				
				java.text.SimpleDateFormat formatterr = new java.text.SimpleDateFormat("dd/MM/yyyy");
				String todays_datee = formatterr.format(currentDate.getTime());
				
				java.text.SimpleDateFormat formatterrr = new java.text.SimpleDateFormat("hh:mm");
				String todays_time = formatterrr.format(currentDate.getTime());
				
				ResourceBundle resourceBundle = ResourceBundle.getBundle("Ehat"); 
			  	
			  	String meeshaFlow = resourceBundle.getObject("meesha").toString();
			  	
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
													<div class="li pull-right" id="btndivId">
														<button class="btn btn-xs btn-info" id="backtocurrentBtn" value="AP" onclick="changeStatusOfLabReport(this.id)">Back To Accession</button>
														<button class="btn btn-warning btn-xs" id="saveBtn" value="AU" onclick="saveLabTestRoutineValueResult(this.id)">Save</button>
														<button class="btn btn-success btn-xs" id="saveautoriseBtn" value="AA" onclick="saveLabTestRoutineValueResult(this.id)">Send To Authorization</button>

													</div>
												</ul>
											</div>
										</div>
									</div>
									<!-- /Common -->

									<div class="alert alert-block alert-info fade in"
										style="height: 0%;">

										<div class="row">
											<div class="col-md-1">
												<img id="patImg" style="width: 100%; height: 60px"
													src="ehat-design/img/profile/avatar.jpg"
													class="img-responsive">
											</div>
											<div class="col-md-11">

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
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="form-row">
												<div class="form-group col-md-3" id="kitspecId" style="display:none">
												<label><strong>KIT SPEC</strong><b style="color: red;">*</b></label> 
													
												<select id="kitSpecId" name="select" style="width:70%;">
													
													<option value="Meril COVID-19 One Step RT-PCR kit">Meril COVID-19 One Step RT-PCR kit</option>
													<!-- <option value="Malaria Test Kit">Malaria Test Kit</option>												
													<option value="Corona Virus Test Kit">Corona Virus Test Kit</option>
													<option value="Covid 19 Antigen Detection">Covid 19 Antigen Detection</option>
													<option value="TULIPS Polyester Corona Test Kit Swab">TULIPS Polyester Corona Test Kit Swab</option> -->
												</select>
												</div>

												<!-- <div class="form-group col-md-3" id="kitspecId1" style="display:none">
													
												</div> -->
												<div class="form-group col-md-3">
													<label><strong>Treatment</strong></label> <select id="tId"
														name="select" style="width:70%;"
														onclick="getTreatmentIdwiseRoutineValueResult()">
													</select>
												</div>
												<div class="form-group col-md-3">
													<label><strong>Machine</strong></label> 
													<select id="machineId" name="select" style="width:70%;">
													</select>
												</div>
												
												<div class="form-group col-md-3">
													<label><strong>Samples</strong></label> 
													<select id="patientWiseSamples" name="select" style="width:70%;"
														onchange="getRoutineValuesBySampleType('processing');">
													</select>
												</div>
												
											</div>


											<!-- <div id="kitspecId" style="display:none">
											<div class="col-md-1" style="margin-top: -6px">
												<h6>KIT SPEC <b style="color: red;">*</b></h6>
											</div>

                                            <div class="col-md-2" style="margin-top: -3px"
												id="pathologistdivId">
												<select id="kitSpecId" name="select"
													class="col-md-12 input-SmallText" style="margin-top: 0px;">
													
													<option value="Meril COVID-19 One Step RT-PCR kit">Meril COVID-19 One Step RT-PCR kit</option>
													<option value="Malaria Test Kit">Malaria Test Kit</option>												
													<option value="Corona Virus Test Kit">Corona Virus Test Kit</option>
													<option value="Covid 19 Antigen Detection">Covid 19 Antigen Detection</option>
													<option value="TULIPS Polyester Corona Test Kit Swab">TULIPS Polyester Corona Test Kit Swab</option>
												</select>
											</div>
										</div> -->
										
										 <div id="kitspecId1" style="display:none">
											<div class="col-md-1" style="margin-top: -6px">
																							</div>

                                            <div class="col-md-2" style="margin-top: -3px"
												id="pathologistdivId">
												
											</div>
										</div>
										
											<!-- <div class="col-md-2" style="margin-top: -3px"
												id="pathologistdivId">
												<select id="IdPathologist" name="select"
													class="col-md-12 input-SmallText" style="margin-top: 0px;">
												</select>
											</div> -->

											<!-- <div class="col-md-1" style="margin-top: 3xp">
												<h6>Treatment <b style="color: red;"></b></h6>
											</div>

											<div class="col-md-2" style="margin-top: -3px"
												id="tratmentdivid">
												<select id="tId" name="select"
													class="col-md-12 input-SmallText" style="margin-top: 0px;"
													onclick="getTreatmentIdwiseRoutineValueResult()">
												</select>
											</div>
											
											<div class="col-md-1" style="margin-top: -6px">
												<h6> Machine <b style="color: red;"></b></h6>
											</div>

											<div class="col-md-2"  style="margin-top: -3px" id="machineIddiv">
												<select id="machineId" name="select" class="col-md-12 input-SmallText" style="margin-top: 0px;">
												</select>
											</div> -->


											<%-- <div class="col-md-1" id="reCollectionDivId"  >
												<input type="button" value="ReCollection"
													id="reCollectionId" class="btn btn-xs btn-warning "
													data-toggle="tooltip"
													onclick="showrejectedtestInProcessingArea(this.id,<%=request.getParameter("sampleTypeId")%>);"
													data-placement="bottom" title="ReCollection" />
											</div>
											
											
											<div class="col-md-2" id="rejectDivId" style="margin-top: -3px">
												<input type="button" value="Fill Default Values"
													id="rejectId" class="btn btn-xs btn-success "
													data-toggle="tooltip"
													onclick="setDefaultRoutineValue(<%=request.getParameter("treatmentId")%>);"
													data-placement="bottom" title="Fill Default Values" />
											</div>
                                         
                                         <div id="anitId" style="display:none">
											<div class="col-md-1" id="rerundiv">
												<input type="button" value="Test Re-Run" id="rerunId"
													class="btn btn-xs btn-primary" data-toggle="tooltip"
													onclick="reRunTestResult()" data-placement="bottom"
													title="Re-Run" />
											</div>

											<div class="col-md-1" id="history" >
												<input type="button" value="Patient History"
													id="prevHistory" class="btn btn-xs btn-warning"
													data-toggle="tooltip"
													onclick="showPatientPreviousHistory(<%=request.getParameter("treatmentId")%>);"
													data-placement="bottom" title="Show Patient History"/>
											</div>
                                        </div>
                                        
                                        <div id="anitId1" style="display:none;" >
											<div class="col-md-1" id="rerundiv" style="margin-top: 0%; margin-left: 75%">
												<input type="button" value="Test Re-Run" id="rerunId"
													class="btn btn-xs btn-primary" data-toggle="tooltip"
													onclick="reRunTestResult()" data-placement="bottom"
													title="Re-Run" />
											</div>

											<div class="col-md-1" id="history" style="margin-top: -2%; margin-left: 84%" >
												<input type="button" value="Patient History"
													id="prevHistory" class="btn btn-xs btn-warning"
													data-toggle="tooltip"
													onclick="showPatientPreviousHistory(<%=request.getParameter("treatmentId")%>);"
													data-placement="bottom" title="Show Patient History"/>
											</div>
                                        </div> --%>
											<div class="divide-20"></div>
											<div class="row" id="rountinevalueIddiv1">
												<div class="col-md-4"
													style="width: 100%; margin-top: 2%; overflow: auto;">
													<div class="panel panel-primary">
														<div id="routinevaluedivId" class="panel-body"
															style="overflow: auto; height: 374px;">

															<div class="col-md-12" style="margin-botton:4px ">

																<button type="button" value="ReCollection" style="float:right;margin-left:7px;margin-botton:4px "														
																	id="reCollectionId" class="btn btn-xs btn-warning "
																	data-toggle="tooltip"
																	onclick="showrejectedtestInProcessingArea(this.id,<%=request.getParameter("sampleTypeId")%>);"
																	data-placement="bottom" title="ReCollection" >ReCollection</button>
																
																<button type="button" value="Test Re-Run" id="rerunId"
																	style="float: right; margin-left: 7px;"
																	class="btn btn-xs btn-primary" data-toggle="tooltip"
																	onclick="reRunTestResult()" data-placement="bottom"
																	title="Re-Run">Test Re-Run</button>
																&nbsp;&nbsp;

																<button type="button" value="Fill Default Values"
																	style="float: right; margin-left: 7px; display: none" id="rejectId"
																	class="btn btn-xs btn-success " data-toggle="tooltip"
																	onclick="setDefaultRoutineValue(<%=request.getParameter("treatmentId")%>);"
																	data-placement="bottom" title="Fill Default Values">Fill
																	Default Values</button>


																<button type="button" value="Patient History"
																	style="float: right; margin-left: 7px;"
																	id="prevHistory" class="btn btn-xs btn-warning"
																	data-toggle="tooltip"
																	onclick="showPatientPreviousHistory(<%=request.getParameter("treatmentId")%>);"
																	data-placement="bottom" title="Show Patient History">History</button>
																&nbsp;&nbsp;

															</div>
															<table
																class="datatable table table-bordered table-striped table-condensed cf"
																style="overflow: auto;">
																<thead id="ehatTHead">
																	<tr style="background-color: lightblue">
																	    <th class="col-md-3 center">Profile Name</th>
																		<th class="col-sm-3 center">Test Name</th>
																		<th class="col-md-1 center">Trend Analysis</th>
																		<!-- <th class="col-md-1 center">Parameter/Micro-organism</th> -->
																		<th class="ccol-md-1 center">Test Result</th>
																		<th class="ccol-md-1 center">Previous Result</th>
																		<th class="col-md-1 center">Normal Values</th>
																		<th class="col-md-1 center">Units</th>
																		<th class="col-md-1 center">Flag</th>
																		<th class="col-md-2 center">Method</th>
																		<th class="col-md-1 center">Test Comments</th>
																		<th class="col-md-1 center">Reject Test</th>
																		<th class="col-md-1 center">Action</th>
																	</tr>
																</thead>
																<tbody id="itemMasterRecordsList">

																</tbody>

															</table>
															<input type="hidden" id=flag value="0"> 
															<input type="hidden" value="0" id="id" /> 
															<input type="hidden" value="0" id="patientgander" /> 
															<input type="hidden" value="0" id="phlebotomyprofileid" />
															<input type="hidden" value="0" id="phlebotomyprofiletestid" />
															<input type="hidden" value="<%=request.getParameter("masterid")%>" id="masterIdd" /> 
															<input type="hidden" value="<%=request.getParameter("treatmentId")%>" id="treatmentIddd" /> 
															<input type="hidden" value="<%=request.getParameter("patientId")%>" id="patientId" /> 
															<input type="hidden" value="0" id="masterid1" /> 
															<input type="hidden" value="0" id="profileid1" />
															<input type="hidden" value="0" id="testid1" /> 
															<input type="hidden" value="0" id="testflag1" /> 
															<input type="hidden" value="<%=request.getParameter("pathoflag")%>" id="pathoflagId" />
															<input type="hidden" value="<%=request.getParameter("sampleTypeId")%>" id="sampleTypeId" />
														
														    <input type="hidden" value="<%=Neutrophils%>"  id="Neutrophils" />
															<input type="hidden" value="<%=Lymphocytes%>"  id="Lymphocytes" /> 
															<input type="hidden" value="<%=Eosinophils%>"  id="Eosinophils" /> 
															<input type="hidden" value="<%=Basophils%>"  id="Basophils" />
															<input type="hidden" value="<%=Monocytes%>"  id="Monocytes" />
															<input type="hidden" value="<%=CBCProfile%>"  id="CbcProfile" />
															 <input type="hidden" value="<%=meeshaFlow%>"  id="meeshaFlow" />
															<input type="hidden" value="<%=Bandcells%>"  id="Bandcells" />
														</div>
													</div>
												</div>
											</div>

											<div class="modal fade" id="rejectedTestPopUpInProcessing"
												tabindex="-1">
												<div class="modal-dialog modal-dialog-centered"
													style="width: 75%; margin-top: 10%">

													<div class="modal-body">
														<div class="row">
															<div class="col-md-7"
																style="margin-top: 0%; margin-left: 20%">
																<div class="container">
																	<div class="panel">
																		<div class="panel-body" style="overflow: auto;">
																			<div class="col-md-12" style="font-weight: bold;">
																				<div class="col-md-2" style="margin-top: -6px">
																					<h6>Reason:</h6>
																				</div>
																				<div id="rejectDiv" class="form-group col-md-5">

																					<!-- <select id="rejectresion">
																						<option value="1">Hemolysed Sample</option>
																						<option value="2">Clotted Sample</option>
																						<option value="3">Inadequate Sample</option>
																						<option value="4">Contamination</option>
																						<option value="5">Inappropriate Collection Container</option>
																						<option value="6">Others</option>
																					</select> -->

																					<select id="rejectresion" name="select"
																						class="col-md-12 input-SmallText"
																						style="margin-top: 0px;"></select>
																				</div>

																				<div id="rejecetDiv" class="form-group col-md-2"
																					style="margin-top: 0%">
																					<input type="button" value="Reject"
																						class="btn btn-xs btn-warning " title="Reject"
																						id="rejectid"
																						onclick="rejectedInprofiletestInRoutinevalue()" />
																				</div>

																				<div id="closeDiv" class="form-group col-md-2"
																					style="margin-top: 0%">
																					<input type="button" value="close"
																						class="btn btn-xs btn-danger " title="close"
																						id="closeId"
																						onclick="hiderejectedtestInProcessingArea()" />
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



											<div class="modal fade" id="UnrejectedTestPopUpInProcessing"
												tabindex="-1">
												<div class="modal-dialog modal-dialog-centered"
													style="width: 75%; margin-top: 10%">

													<div class="modal-body">
														<div class="row">
															<div class="col-md-7"
																style="margin-top: 0%; margin-left: 20%">
																<div class="container">
																	<div class="panel">
																		<div class="panel-body" style="overflow: auto;">
																			<div class="col-md-12" style="font-weight: bold;">
																				<div class="col-md-2" style="margin-top: -6px">
																					<h6>Reason:</h6>
																				</div>
																				<div id="cancleDiv" class="form-group col-md-5">

																					<!-- <select id="unrejectresion">
																						<option value="1">Hemolysed Sample</option>
																						<option value="2">Clotted Sample</option>
																						<option value="3">Inadequate Sample</option>
																						<option value="4">Contamination</option>
																						<option value="5">Inappropriate Collection Container</option>
																						<option value="6">Others</option>
																					</select> -->
																					<select id="unrejectresion" name="select"
																						class="col-md-12 input-SmallText"
																						style="margin-top: 0px;"></select>

																				</div>

																				<div id="UnRejectDiv" class="form-group col-md-2"
																					style="margin-top: 0%">
																					<input type="button" value="UnReject"
																						class="btn btn-xs btn-success " title="UnReject"
																						id="unRejectId"
																						onclick="rejectedInprofiletestInRoutinevalue()" />
																				</div>

																				<div id="closeDiv" class="form-group col-md-2"
																					style="margin-top: 0%">
																					<input type="button" value="close"
																						class="btn btn-xs btn-danger " title="close"
																						id="closeId"
																						onclick="hiderejectedtestInProcessingArea()" />
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

											<div class="modal fade" id="reCollectionPopUp" tabindex="-1">
												<div class="modal-dialog modal-dialog-centered"
													style="width: 75%; margin-top: 10%">

													<div class="modal-body">
														<div class="row">
															<div class="col-md-7"
																style="margin-top: 0%; margin-left: 20%">
																<div class="container">
																	<div class="panel">
																		<div class="panel-body" style="overflow: auto;">
																			<div class="col-md-12" style="font-weight: bold;">
																				<div class="col-md-2" style="margin-top: -6px">
																					<h6>Reason:</h6>
																				</div>
																				<div id="cancleDiv" class="form-group col-md-5">

																					<!-- <select id="unrejectresion">
																						<option value="1">Hemolysed Sample</option>
																						<option value="2">Clotted Sample</option>
																						<option value="3">Inadequate Sample</option>
																						<option value="4">Contamination</option>
																						<option value="5">Inappropriate Collection Container</option>
																						<option value="6">Others</option>
																					</select> -->

																					<select id="recollectionreasonId" name="select"
																						class="col-md-12 input-SmallText"
																						style="margin-top: 0px;"></select>

																				</div>

																				<div id="reCollectionDiv"
																					class="form-group col-md-2" style="margin-top: 0%">
																					<input type="button" value="ReCollection"
																						class="btn btn-xs btn-success "
																						title="ReCollection" id="reCollectionId"
																						onclick="recollectionTest(this.id)" />
																				</div>

																				<div id="closeDiv" class="form-group col-md-2"
																					style="margin-top: 0%">
																					<input type="button" value="close"
																						class="btn btn-xs btn-danger " title="close"
																						id="closeId"
																						onclick="hiderejectedtestInProcessingArea(this.id)" />
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

										</div> <!-- Panel END -->
									</div>
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
	<!-- JQUERY UI-->
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
				
				getPatientWiseSamples(<%=request.getParameter("treatmentId")%>, <%=request.getParameter("patientId")%>, <%=request.getParameter("sampleTypeId")%>, "processing");
				processingPatientinformation(<%=request.getParameter("treatmentId")%>);
				displayOnPatholgistView();
			//	getpathologistname();
				getmachinename();
				getTreatmentIdList(<%=request.getParameter("patientId")%>);
				setTimeout(function() {
					
				getProcessingRoutinevalueResutl(<%=request.getParameter("treatmentId")%>);
				
				$("#kitSpecId").select2();
				hideTabForMeesha();
				
				
				}, 1000);		
			};
	</script>
<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>