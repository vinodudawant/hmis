<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<!-- For Prescription Multilpe language -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Autopsy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<meta name="viewport" content="user-scalable=no, width=device-width" />

<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link rel="stylesheet" type="text/css"
	href="bootstrap-dist/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css"
	href="font-awesome/css/font-awesome.min.css" />
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>
<!-- SLIMSCROLL -->
<script src="jquery/jquery.ajaxfileupload.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
<!-- BOOTSTRAP WYSIWYG -->
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/jquery.hotkeys.min.js"></script>
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/bootstrap-wysiwyg.min.js"></script>
<!-- CKEDITOR -->
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>

<!-- Notify Js -->
<script type="text/javascript" src="js/notify/notify.min.js"></script>

<!-- /for Developers  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>

<!--TIMEPEACKER -->
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script type="text/javascript" src="js/mortuary_Beds_cold_Room.js"></script>
<script type="text/javascript" src="js/ehat_autopsy.js"></script>



<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>


<script lang="Javascript">
$(document).click(function() {	
		$('input[type="file"]').ajaxfileupload({
		'action' : 'UploadFileServlet',
	});
});
</script>

<script>
	jQuery(document).ready(function() {
		App.setPage("Mortuary_coldRoom_BedWard"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<script type="text/javascript">
	onload = function() {
		
		singleMorturay(<%=request.getParameter("morId")%>);
		fetchBodyTrackingInfo('pm');
	
		var todays_date = $("#todays_date").val();
		var arrDate = todays_date.split("-");
		var date = arrDate[0] + "/" + arrDate[1] + "/" + arrDate[2];
		
		$("#release_date").val(date);
// 		$("#release_time").val($("#current_time").val());
		$("#pm_date").val(date);
// 		$("#pm_time").val($("#current_time").val());
		$("#forensic_date").val(date);
// 		$("#forensic_time").val($("#current_time").val());
		$("#study_date").val(date);
// 		$("#study_time").val($("#current_time").val());
		$("#other_date").val(date);
// 		$("#other_time").val($("#current_time").val());
		getTemplateListByDepartmentId();
		updatedPmReportbyid();
	};

	$(document).ready(function() {
		
		$(".nav-tabs a").click(function() {
			$(this).tab('show');
		});
		$('#release_time').datetimepicker({
			datepicker : false,
			format : 'h:i',
			step : 1
		});
		$('#pm_time').datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 1
		});
		$('#forensic_time').datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 1
		});
		$('#study_time').datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 1
		});
		$('#other_time').datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 1
		});
	});
</script>

</head>

<body style="background: white ! important;">

	<section id="page">
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${ sessionScope.userType != null }">

			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->
				<%@include file="left_menu_mortuary.jsp"%>

				<!--End Left Menu -->
				<%
					java.util.Calendar currentDate = java.util.Calendar
								.getInstance();
						java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
								"dd-MM-yyyy");
						String todays_date = formatter.format(currentDate.getTime());
				%>
				<div id="main-content">
					<div class="container">

						<div class="row">
							<div id="content" class="col-lg-12">

								<input type="hidden" id="cold_room_id" name=""
									value="<%=request.getParameter("id")%>"> 
									
									<input type="hidden" id="todays_date" name="" value="<%=todays_date%>">
									
									<input type="hidden" id="morId" name="morId"
									value="<%=request.getParameter("morId")%>">
									


								<!-- Page Date Print Discards Common Path info -->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header" style="margin-bottom: 5px">
											<ul class="breadcrumb col-md-12">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="ehat_mortuary.jsp">Mortuary</a></li>

												<li>Autopsy</li>
											</ul>
										</div>
									</div>
								</div>



								<div id="mortuaryid_popup"
									class="breadcrumb col-md-12-1"
									style="padding-block-end: 0%;margin-top: 0%;">

									<div class="row">
										<div class="col-md-1" style="margin-top: 0%;overflow: atuo;">
											<img id="patImg" class="img-responsive" src="" alt="">
										</div>

										<div class="col-md-11" style="overflow: atuo;">

											<div class="col-md-12" style="margin-top: 2%;">

												<div class="col-md-2">
													<div class="form-group">

														<label class="control-label lblBold">Mortuary Id :</label>
														<label class="control-label" id="mortuaryId"> </label> <input
															type="hidden" id="mortuaryId">
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="control-label lblBold">Deceased Name
															:</label> <label class="control-label" id="deceasedName">
														</label>

													</div>
												</div>


												<div class="col-md-2">
													<div class="form-group">
														<label class="control-label lblBold">Age :</label> <label
															class="control-label" id="age"> </label>
													</div>
												</div>


												<div class="col-md-3">
													<div class="form-group">
														<label class="control-label lblBold">Date of Death
															:</label> <label class="control-label" id="dod">
															2017-05-12-D</label>

													</div>
												</div>

												<div class="col-md-2">
													<div class="form-group">
														<label class="control-label lblBold"
															style="line-height: 3.6;">Gender: </label> <label
															class="control-label" id="sex"></label>

													</div>
												</div>

												<div class="col-md-6">
													<div class="form-group">
														<label class="control-label lblBold"
															style="line-height: 3.6;">Address :</label> <label
															class="control-label" id="address"> Address </label>

													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-12 well" style="border: 0%;">

									<ul class="nav nav-tabs md-tabs">
										<li class="nav-item active"><a href="#Badytracing">BodyTracking</a></li>
										<li onclick="fetchfindings();"><a href="#Finding">Finding</a></li>
										<li onclick="PmreportUpdate(<%=request.getParameter("morId")%>);"><a href="#PMReport">PM Report</a></li>
										<li onclick="fetchDoc();"><a href="#Images">Uploads</a></li>
										<li onclick="fetchDcCerti();"><a href="#DeathCertificate">Death
												Certificate</a></li>
									</ul>

									<div class="tab-content  ">
										<div id="Badytracing" class="tab-pane fade in active ">
											<div class="tabbable tabs-left col-md-12-1  box border green"
												style="margin-top: 0%;">

												<ul class="nav nav-tabs colorChanges" style="height: 250%;"
													id="cpoeTabULID">
													<li id="postmortemId" class="active"><a
														href="#postMortem" data-toggle="tab"
														onClick="fetchBodyTrackingInfo('pm')">Post Mortem</a></li>
													<li id="forensicId"><a href="#Forensic "
														data-toggle="tab"
														onClick="fetchBodyTrackingInfo('forensic')">Forensic &
															Investigation</a></li>
													<li id="studyId"><a href="#Study" data-toggle="tab"
														onClick="fetchBodyTrackingInfo('study')">Study &
															Research</a></li>
													<li id="otherId"><a href="#Other" data-toggle="tab"
														onClick="fetchBodyTrackingInfo('other')">Other</a></li>
													<li id="releaseId"><a href="#Release"
														data-toggle="tab">Release</a></li>
												</ul>

												<div class="tab-content">
													<div id="postMortem" class="tab-pane fade in active ">
													<div class="col-md-1-1 li pull-right"
																		style="margin-top: 1%;padding-left: 3%;">
																		<button id="saveAddIpdHistory"
																			class="btn btn-xs btn-success" title="Save"
																			onclick="saveBodyTrackingInfo('pm')"
																			data-placement="left" data-toggle="tooltip">
																			<i class="fa fa-save"></i>
																		</button>
																	</div>


														<div class="form-group  col-md-2  "
															style="margin-top: 1%;">

															<div class="form-group">
																<div class="form-group">
																	
																</div>
																<div class="form-group">
																	<label class="TextFont">Post Mortem Date <b
																		style="color: red;">*</b>  :</label><input id="pm_date"
																		class="form-control input-SmallText" value=""
																		style="width: 50%"
																		onclick="displayCalendar(document.getElementById('pm_date'),'dd/mm/yyyy',this)"
																		readonly="readonly" name="suggestedBy">
																</div>

																<div class="form-group">
																	<label class="control-label ">Post Mortem Time<b style="color: red;">*</b>
																		:</label> 
																	<div class="">
																		<input id="pm_time" 
																			class="form-control input-SmallText"
																			readonly="readonly" value="" style="width: 50%">
																		<span class="error-span"></span>
																	</div>
																</div>

																<div class="form-group">
																	<label class="control-label col-md-7-1">
																		Handover To <span class="required text-danger">*</span>: 
																	</label>
																	<div style="margin-top: 1%;">
																		<input type="text" id="pm_handover_to"
																			class="typeahead form-control input"
																			placeholder="Body handover to..." name="fName"><span
																			class="error-span"></span>
																	</div>
																</div>
																
																<div class="form-group">
																	<label class="control-label col-md-7-1">
																		Notes : <span class="required text-danger"></span>
																	</label>
																	<div style="margin-top: 1%;">
																		<textarea id="pm_notes_to" rows="8"
																			class="typeahead form-control input"
																			placeholder="Body Notes to..." name="fName"></textarea><span
																			class="error-span"></span>
																	</div>
																</div>

															</div>


														</div>
														<div class="col-md-8" >
															<div class="from-group">
																<div class="box-body col-md-12-1"
																	style="margin-top: 5%;">
																	<div class="form-group  box border col-md-12-1">
																		<!-- Start Header for New Edit Delete Option -->
																		<div class="col-md-12-1"></div>
																		<!-- End Header for New Edit Delete Option -->
																		<div id="divdocDispTable"
																			style="margin-top: 0px; height: 50%; overflow: auto;"
																			class="col-sm-12-1">
																			<table
																				class="table table-bordered table-condensed header-fixed cf ">
																				<thead>
																					<tr>
																						<th style="width: 4%;"><div
																								class="TextFont">#</div></th>
																						<th style="width:10%; padding-left: 2%;"
																							class="col-md-2-1"><div class="TextFont">Body
																								Moved To</div></th>
																						<th style="width:11%; padding-left: 2%;"
																							class="col-md-2-1 center"><div
																								class="TextFont">Body Handover To</div></th>
																							<th style="width:20%; padding-left: 2%;"
																							class="col-md-2-1 center"><div
																								class="TextFont">Body Notes To</div></th>		
																						<th style="width:8%; padding-left: 0%;"
																							class="col-md-1-1 center"><div
																								class="TextFont">Moved Date</div></th>
																						<th style="width:8%; padding-left: 2%;"
																							class="col-md-1-1 center"><div
																								class="TextFont">Moved Time</div></th>
																						<th style="width:8%; padding-left: 2%;"
																							class="col-md-1-1 center"><div
																								class="TextFont">Edit</div></th>
																					</tr>
																				</thead>
																				<tbody id="pmDispTable"></tbody>
																			</table>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<!-- 		end Post Mortem -->

													<div id="Forensic" class="tab-pane fade">
													<div class="col-md-2-1 li pull-right"
																		style="margin-top: 1%;padding-left: 12%;">
																		<button id="saveAddIpdHistory"
																			class="btn btn-xs btn-success" title="Save"
																			onclick="saveBodyTrackingInfo('forensic')"
																			data-placement="left" data-toggle="tooltip">
																			<i class="fa fa-save"></i>
																		</button>
																	</div>
														<div class="form-group  col-md-3-1  "
															style="margin-top: 1%;">

															<div class="form-group">
																<div class="form-group">
																	
																</div>
																<div class="form-group">
																	<label class="TextFont">Forensic &
																		Investigation Date<b style="color: red;">*</b> :</label>  <input
																		id="forensic_date"
																		class="form-control input-SmallText" value=""
																		style="width: 40%;"
																		onclick="displayCalendar(document.getElementById('forensic_date'),'dd/mm/yyyy',this)"
																		readonly="readonly" name="suggestedBy">
																</div>

																<div class="form-group">
																	<label class="control-label ">Forensic &
																		Investigation Time<b style="color: red;">*</b> :</label> 
																	<div class="">
																		<input id="forensic_time"
																			class="form-control input-SmallText"
																			readonly="readonly" value="" style="width: 40%">
																		<span class="error-span"></span>
																	</div>
																</div>

																<div class="form-group">
																	<label class="control-label col-md-7-1">
																		Handover To <span class="required text-danger">*</span>: 
																	</label>
																	<div style="margin-top: 1%;">
																		<input type="text" id="forensic_handover_to"
																			class="typeahead form-control input"
																			placeholder="Body handover to..." name="fName"><span
																			class="error-span"></span>
																	</div>
																</div>
																	<div class="form-group">
																	<label class="control-label col-md-7-1">
																		Notes : <span class="required text-danger"></span>
																	</label>
																	<div style="margin-top: 1%;">
																		<textarea id="forensic_notes_to" rows="8"
																			class="typeahead form-control input"
																			placeholder="Body Notes to..." name="fName"></textarea><span
																			class="error-span"></span>
																	</div>
																</div>


															</div>

														</div>
														<div class="col-md-7-1" style="width: 64%;">
															<div class="from-group">
																<div class="box-body col-md-12-1"
																	style="margin-top: 5%;">
																	<div class="form-group  box border col-md-12-1">
																		<!-- Start Header for New Edit Delete Option -->
																		<div class="col-md-12-1"></div>
																		<!-- End Header for New Edit Delete Option -->
																		<div id="divdocDispTable"
																			style="margin-top: 0px; margin-top: 0px; height: 50%;overflow: auto;"
																			class="col-sm-12-1">
																			<table
																				class="table table-bordered table-condensed header-fixed cf ">
																				<thead>
																					<tr>
																						<th style="width: 4%;"
																							class="col-md-1-1 "><div
																								class="TextFont">#</div></th>
																						<th style="width:10%; padding-left: 2%;"
																							class="col-md-2-1"><div class="TextFont">Body
																								Moved To</div></th>
																						<th style="width:11%; padding-left: 2%;"
																							class="col-md-2-1 center"><div
																								class="TextFont">Body Handover To</div></th>
																									<th style="width:20%; padding-left: 2%;"
																							class="col-md-2-1 center"><div
																								class="TextFont">Body Notes To</div></th>
																						<th style="width:8%; padding-left: 0%;"
																							class="col-md-1-1 center"><div
																								class="TextFont">Moved Date</div></th>
																						<th style="width:8%; padding-left: 2%;"
																							class="col-md-1-1 center"><div
																								class="TextFont">Moved Time</div></th>
																						<th style="width:8%; padding-left: 2%;"
																							class="col-md-1-1 center"><div
																								class="TextFont">Edit</div></th>
																					</tr>
																				</thead>
																				<tbody id="forensicDispTable"></tbody>
																			</table>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>

													<div id="Study" class="tab-pane fade">
														<div class="col-md-2-1 li pull-right" 
																		style="margin-top: 1%;padding-left: 11%;">
																		<button id="saveAddIpdHistory"
																			class="btn btn-xs btn-success" title="Save"
																			onclick="saveBodyTrackingInfo('study')"
																			data-placement="left" data-toggle="tooltip">
																			<i class="fa fa-save"></i>
																		</button>
																	</div>

														<div class="form-group  col-md-2  "
															style="margin-top: 1%;">

															<div class="form-group">
																<div class="form-group">
																
																</div>
																<div class="form-group">
																	<label class="TextFont">Study & Research Date <b style="color: red;">*</b> :</label>
																	 <input id="study_date"
																		class="form-control input-SmallText" value=""
																		style="width: 50%;"
																		onclick="displayCalendar(document.getElementById('study_date'),'dd/mm/yyyy',this)"
																		readonly="readonly" name="suggestedBy">
																</div>

																<div class="form-group">

																	<label class="control-label ">Study & Research
																		Time  <b style="color: red;">*</b>:</label>
																	<div class="">
																		<input id="study_time"
																			class="form-control input-SmallText"
																			readonly="readonly" value="" style="width: 50%">
																		<span class="error-span"></span>
																	</div>
																</div>

																<div class="form-group">
																	<label class="control-label col-md-7-1">
																		Handover To<span class="required text-danger">*</span> : 
																	</label>
																	<div style="margin-top: 1%;">
																		<input type="text" id="study_handover_to"
																			class="typeahead form-control input"
																			placeholder="Body handover to..." name="fName"><span
																			class="error-span"></span>
																	</div>
																</div>
																	<div class="form-group">
																	<label class="control-label col-md-7-1">
																		Notes : <span class="required text-danger"></span>
																	</label>
																	<div style="margin-top: 1%;">
																		<textarea id="study_notes_to" rows="8"
																			class="typeahead form-control input"
																			placeholder="Body Notes to..." name="fName"></textarea><span
																			class="error-span"></span>
																	</div>
																</div>
																

															</div>


														</div>
														<div class="col-md-8" style="width: 68%;">
															<div class="from-group">
																<div class="box-body col-md-12-1"
																	style="margin-top: 5%;">
																	<div class="form-group  box border col-md-12-1">
																		<!-- Start Header for New Edit Delete Option -->
																		<div class="col-md-12-1"></div>
																		<!-- End Header for New Edit Delete Option -->
																		<div id="divdocDispTable"
																			style="margin-top: 0px; margin-top: 0px; height: 50%;overflow: auto; "
																			class="col-sm-12-1">
																			<table
																				class="table table-bordered table-condensed header-fixed cf ">
																				<thead>
																					<tr>
																						<th style="width: 4%;"
																							class="col-md-1-1 "><div
																								class="TextFont">#</div></th>
																						<th style="width:10%; padding-left: 2%;"
																							class="col-md-2-1"><div class="TextFont">Body
																								Moved To</div></th>
																						<th style="width:11%; padding-left: 2%;"
																							class="col-md-2-1 center"><div
																								class="TextFont">Body Handover To</div></th>
																									<th style="width:20%; padding-left: 2%;"
																							class="col-md-2-1 center"><div
																								class="TextFont">Body Notes To</div></th>
																						<th style="width:8%; padding-left: 0%;"
																							class="col-md-1-1 center"><div
																								class="TextFont">Moved Date</div></th>
																						<th style="width:8%; padding-left: 0%;"
																							class="col-md-1-1 center"><div
																								class="TextFont">Moved Time</div></th>
																						<th style="width:8%; padding-left: 2%;"
																							class="col-md-1-1 center"><div
																								class="TextFont">Edit</div></th>
																					</tr>
																				</thead>
																				<tbody id="studyDispTable"></tbody>
																			</table>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>

													<div id="Other" class="tab-pane fade">
														<div class="col-md-2-1 li pull-right"
																		style="margin-top: 1%;padding-left: 11%;">
																		<button id="saveAddIpdHistory"
																			class="btn btn-xs btn-success" title="Save"
																			onclick="saveBodyTrackingInfo('other')"
																			data-placement="left" data-toggle="tooltip">
																			<i class="fa fa-save"></i>
																		</button>
																	</div>
														<div class="form-group  col-md-2  "
															style="margin-top: 1%;">

															<div class="form-group">
																<div class="form-group">
																	
																</div>
																<div class="form-group">
																	<label class="TextFont">Other Date <b
																		style="color: red;">*</b> :</label> <input id="other_date"
																		class="form-control input-SmallText" value=""
																		style="width: 50%"
																		onclick="displayCalendar(document.getElementById('other_date'),'dd/mm/yyyy',this)"
																		readonly="readonly" name="suggestedBy">
																</div>

																<div class="form-group">
																	<label class="control-label ">Other Time<b
																		style="color: red;">*</b> :</label> 
																	<div class="">
																		<input id="other_time"
																			class="form-control input-SmallText"
																			readonly="readonly" value="" style="width: 50%">
																		<span class="error-span"></span>
																	</div>
																</div>

																<div class="form-group">
																	<label class="control-label col-md-7-1">
																		Handover To <span class="required text-danger">*</span> :
																	</label>
																	<div style="margin-top: 1%;">
																		<input type="text" id="other_handover_to"
																			class="typeahead form-control input"
																			placeholder="Body handover to..." name="fName"><span
																			class="error-span"></span>
																	</div>
																</div>
																<div class="form-group">
																	<label class="control-label col-md-7-1">
																		Notes : <span class="required text-danger"></span>
																	</label>
																	<div style="margin-top: 1%;">
																		<textarea id="other_notes_to" rows="8"
																			class="typeahead form-control input"
																			placeholder="Body Notes to..." name="fName"></textarea><span
																			class="error-span"></span>
																	</div>
																</div>

															</div>


														</div>
														<div class="col-md-8" style="width: 68%;">
															<div class="from-group">
																<div class="box-body col-md-12-1"
																	style="margin-top: 5%;">
																	<div class="form-group  box border col-md-12-1">
																		<!-- Start Header for New Edit Delete Option -->
																		<div class="col-md-12-1"></div>
																		<!-- End Header for New Edit Delete Option -->
																		<div id="divdocDispTable"
																			style="margin-top: 0px; margin-top: 0px; height: 50%; overflow: auto;"
																			class="col-sm-12-1">
																			<table
																				class="table table-bordered table-condensed header-fixed cf ">
																				<thead>
																					<tr>
																						<th style="width: 4%;"
																							class="col-md-1-1 "><div
																								class="TextFont">#</div></th>
																						<th style="width:10%; padding-left: 2%;"
																							class="col-md-2-1"><div class="TextFont">Body
																								Moved To</div></th>
																						<th style="width:11%; padding-left: 2%;"
																							class="col-md-2-1 center"><div
																								class="TextFont">Body Handover To</div></th>
																									<th style="width:20%; padding-left: 2%;"
																							class="col-md-2-1 center"><div
																								class="TextFont">Body Notes To</div></th>
																						<th style="width:8%; padding-left: 0%;"
																							class="col-md-1-1 center"><div
																								class="TextFont">Moved Date</div></th>
																						<th style="width:8%; padding-left: 2%;"
																							class="col-md-1-1 center"><div
																								class="TextFont">Moved Time</div></th>
																						<th style="width:8%; padding-left: 2%;"
																							class="col-md-1-1 center"><div
																								class="TextFont">Edit</div></th>
																					</tr>
																				</thead>
																				<tbody id="otherDispTable"></tbody>
																			</table>
																		</div>
																	</div>
																</div>
															</div>
														</div>

													</div>

													<div id="Release" class="tab-pane  ">
															<div class="col-md-2-1 li pull-right"
																		style="margin-top: 2%;padding-left: 11%;">
																		<button id="saveAddIpdHistory"
																			class="btn btn-xs btn-success" title="Save"
																			onclick="saveBodyTrackingInfo('release')"
																			data-placement="left" data-toggle="tooltip">
																			<i class="fa fa-save"></i>
																		</button>
																	</div>
																				
														<div class="form-group  col-md-2  "
															style="margin-top: 1%;">

															<div class="form-group">
																<div class="form-group">
																	
																</div>
																<div class="form-group">
																	<label class="TextFont">Release Date :</label> <b
																		style="color: red;">*</b> <input id="release_date"
																		class="form-control input-SmallText" value=""
																		style="width: 50%"
																		onclick="displayCalendar(document.getElementById('release_date'),'dd/mm/yyyy',this)"
																		readonly="readonly" name="suggestedBy">
																</div>

																<div class="form-group">
																	<label class="control-label ">Release Time<b
																		style="color: red;">*</b>:</label> 
																	<div class="">
																		<input id="release_time"
																			class="form-control input-SmallText"
																			readonly="readonly" value="" style="width: 50%">
																		<span class="error-span"></span>
																	</div>
																</div>

																<div class="form-group">
																	<label class="control-label col-md-7-1">
																		Handover To <span class="required text-danger">*</span>: 
																	</label>
																	<div style="margin-top: 1%;">
																		<input type="text" id="release_handover_to"
																			class="typeahead form-control input"
																			placeholder="Body handover to..." name="fName"><span
																			class="error-span"></span>
																	</div>
																</div>
																<div class="form-group">
																	<label class="control-label col-md-7-1">
																		Notes <span class="required text-danger"></span>: 
																	</label>
																	<div style="margin-top: 1%;">
																		<textarea id="release_notes_to" rows="8"
																			class="typeahead form-control input"
																			placeholder="Body Notes to..." name="fName"></textarea><span
																			class="error-span"></span>
																	</div>
																</div>

															</div>


														</div>

													</div>

												</div>


											</div>
										</div>
										<div id="Finding" class="tab-pane fade row">
											<div class="col-sm-12 box border green">
												<div class="col-sm-4-1"
													style="margin-top: -1px; margin-left: 92%;">
													<div class="divide-10"></div>
													<div class="col-sm-1-1">
														<button id="saveFindings" class="btn btn-xs btn-success"
															style="margin-left: 2px;" data-toggle="tooltip"
															data-placement="left" title="Save"
															onclick="saveFindings();">
															<i class="fa fa-save"></i>
														</button>
													</div>
													
												</div>
												<table class='table table-bordered'
													style='margin-top: 25px; width: 100%;'>
													<thead>
														<tr>
															<th class='col-sm-1-1 center'
																style='height: 21.5px; font-size: "3";'><label
																class='TextFont'>#</label></th>
															<th class='col-sm-4-1 center'
																style='height: 21.5px; font-size: "3";'><label
																class='TextFont'>Headings</label></th>
															<th class='col-sm-4-1 center'
																style='height: 21.5px; font-size: "3";'><label
																class='TextFont'> Remarks</label></th>
															<th class='col-sm-1-1 center'
																style='height: 21.5px; width: 25px;'><input
																type="button" value="+"
																onclick="createDivFinding('RowCount')" /> <input
																type="button" onclick="removeChifComp();"
																value="-" />
														</tr>
													</thead>
													<tbody id="Finding1"></tbody>
												</table>
											</div>
										</div>

										<div id="PMReport" class="tab-pane fade row">
											<div class="col-md-12 box border green">
											 <div class="from-group" style="margin-top: 0%;">
													 
													<div class="col-md-1-1  li pull-right " style="margin-top: 0%;">
													 <div class="from-group">
													
															<button id="saveAddIpdHistory"
																class="btn btn-xs btn-success " data-toggle="tooltip"
																data-placement="left" title="Save History "
																onclick="pmreportSave();">
																<i class="fa fa-save"></i>


															</button>
													
															<button class="btn btn-xs btn-warning coversheetBtn "
															onclick="Mortuarytempletprinr();"
																data-toggle="tooltip" data-placement="left"
																title="Print ">
																<i class="fa fa-print"></i>
															</button>
														<%--  <button class="btn btn-xs btn-info "
																data-toggle="tooltip" data-placement="left"
																onclick=" PmreportUpdate(<%=request.getParameter("morId")%>);"
																title="Edit ">
																<i class="fa fa-edit"></i>
															</button>--%>
											
														</div>
													</div>
													</div>
												<div style="margin-top: 1%;" class="col-md-12-1">
												<div class="col-md-8-1">
													 <div class="from-group">
													 <div class="from-group">
														<div class="col-md-2-1 form-group">Template Type:-</div>
														<div class="col-md-4-1">
															<select id="selCustomizeTempType"
																style="margin-top: 0%;"
																onchange="setTemplateListByTypemortuary(this.value)"
																class="col-md-11-1 form-control input-SmallText ">
																<option value="Select">-Select-</option>
																<option value="m">Mortuary</option>

															</select>
														</div>
														</div>
														 <div class="from-group" style="margin-top: 0%;">
														 <div class="from-group">
														<div class="col-md-2-1 ">Template List:-</div>

														<div class="col-md-4-1" style="margin-top: -1%;">
															<select id="selCustomizeTemp" name="selCustomizeTemp"
																style="margin-top: 0%;"
																onchange="getCustomizeTemplatesIDDischarge(this.value)";
																class="col-md-11-1 form-control input-SmallText ">
																<option value="0">NewTemplate</option>
															</select> <input type="hidden" name="idTempMast" value="0"
																id="idTempMast">
														</div>
														</div>	
														</div>
														</div>
														</div>	
													


												</div>

												<div class="panel panel-default col-md-12-1"
													style="margin-top: 0%;">
													<div class="panel-body">
														<div id="move" style="width: 100%; display: none;"
															class="ui-resizable ui-draggable ui-draggable-handle">
															<textarea class="ckeditor ui-widget-content "
																name="editor1" title="Rich Text Editor, editor1"
																placeholder="Content" id="editor1"></textarea>
														</div>

														<div id="historyTemp" style="width: 100%;"
															class="tabbable ui-resizable ui-draggable ui-draggable-handle">

															<div class="divide-10"></div>
															<div class="tab-content">
																<div ID="Subjective" class="tab-pane fade in active">
																	<textarea class="ckeditor ui-widget-content "
																		name="editorSubjective"
																		title="Rich Text Editor, editorSubjective"
																		placeholder="Content" id="editorSubjective"></textarea>
																</div>
																<input type="hidden" name="tempname" id="tempname" 
																	value="">

															</div>
														</div>



													</div>z
												</div>
											</div>
										</div>
										<div id="Images" class="tab-pane fade ">
											<div class="col-md-12 box border green">
												<form id="fileUploadfrm" name="fileUploadfrm"
													enctype="multipart/form-data" method="post">
													<div class="centered">
														<div class="divide-10"></div>
														<div class="col-md-12-1" style="height: 50px;">
															<label class="col-md-2-1"
																style="margin-top: 3px; padding-left: 5px;">
																Select a File to Upload: </label> <input type="file" name="file"
																id="imagesfileUploadfrom" style="margin-top: 0px; cursor: pointer;"
																multiple="multiple" /><br />
														</div>

														<div class="divide-10"></div>
														<div class="col-md-12-1" style="height: 50px;">
															<label class="col-md-2-1"
																style="margin-top: 3px; padding-left: 5px;">
																Comment: </label>
															<textarea class="col-md-4-1" rows="2" cols="60"
																style="width: 236px; height: 48px;" name="txtNotes"
																id="morturayimagesnote" maxlength="120"></textarea>
														</div>
														<div class="divide-10"></div>
													
														<div class="col-md-4-1" style="margin-top: 0%;">
															<label class="col-md-12-1"
																></label>
															<button type="button" name="fileUp" id="fileUp"
																onclick="uploadDocument();"
																class="btn btn-xs btn-success editUserAccess"
																style="margin-top: 0%; margin-left: 50%"
																disabled="disabled">Upload Document</button>
														</div>
														
													</div>
												</form>
												<br>

												<div class="divide-10"></div>
												<div style="margin-top: 2%;"
													class="box-body col-md-12-1">
													<div class="form-group  box border col-md-12-1">
														<!-- Start Header for New Edit Delete Option -->
														<div
															style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;"
															class="col-md-12-1"></div>
														<!-- End Header for New Edit Delete Option -->
														<div id="divdocDispTable"
															style="margin-top: 0px; margin-top: 0px; height: 250px; overflow-y: scroll;"
															class="col-sm-12-1">
															<table
																class="table table-bordered table-condensed header-fixed cf' style='width : 1090px; margin-top: 10px;">
																<thead>
																	<tr>
																		<th style="height: 21.5px;" class="col-md-1-1 center"><div
																				class="TextFont">#</div></th>
																		<th style="height: 21.5px; padding-left: 50px;"
																			class="col-md-2-1"><div class="TextFont">Document</div></th>
																		<th style="height: 21.5px; padding-left: 0px;"
																			class="col-md-2-1 center"><div class="TextFont">Note</div></th>
																		<th style="height: 21.5px; padding-left: 0px;"
																			class="col-md-1-1 center"><div class="TextFont">Date</div></th>
																		<th style="height: 21.5px; padding-left: 0px;"
																			class="col-md-1-1 center"><div class="TextFont">View
																				/ Delete</div></th>
																	</tr>
																</thead>
																<tbody id="docDispTable"></tbody>
															</table>
														</div>
													</div>
												</div>
											</div>
										</div>


										<!--View Image Model Pop Up-->

										<div class="modal fade bs-example-modal-lg" id="viewDocModal"
											tabindex="-1" role="dialog"
											aria-labelledby="myLargeModalLabel" aria-hidden="true">
											<div class="modal-dialog modal-dialog modal-lg">
												<div class="modal-content">
													<div class="modal-header">
														<button type="button" class="close" data-dismiss="modal"
															aria-label="Close">
															<span aria-hidden="true">&times;</span>
														</button>
														<div class="row">
															<div class="col-md-4 col-xs-11">
																<h3 class="modal-title" id="myModalLabel">View
																	document</h3>
															</div>
															<br> <br>
															<div class="col-md-6 col-xs-11">
																<h5></h5>
																<h6 id="documentComment"></h6>
															</div>
														</div>
													</div>
													<div class="modal-body">
														<iframe id="ViewDocumemnt" width="80%" height="330px"></iframe>
													</div>
												</div>
											</div>
										</div>
										<div id="DeathCertificate" class="tab-pane fade  ">
											
											<form id="dcfileUploadfrm" name="dcfileUploadfrm" class=""
												enctype="multipart/form-data" method="post">
												<div class="centered">
													<div class="divide-10"></div>
													
													<div class="col-md-12-1" style="height: 50px;">
														<label class="col-md-2-1"
															style="margin-top: 3px; padding-left: 5px;">
															Select a File to Upload: </label> <input type="file"
															name="dcFile" id="dcFile" style="margin-top: 0px;"
															multiple="multiple" /><br />
													</div>

													<div class="divide-10"></div>
													<div class="col-md-12-1" style="height: 50px;">
														<label class="col-md-2-1"
															style="margin-top: 3px; padding-left: 5px;">
															Comment: </label>
														<textarea class="col-md-4-1" rows="2" cols="60"
															style="width: 236px; height: 48px;" name="txtNotes"
															id="dcNotes" maxlength="120"></textarea>
													</div>
													<div class="divide-10"></div>
													
													<div class="col-md-4-1" style="height: 50%;margin-top: 0%;" >
														<label class="col-md-12-1"
															></label>
														<button type="button" name="dcFileUp" id="dcFileUp"
															onclick="uploadDCDocument();"
															class="btn btn-xs btn-success editUserAccess"
															style="margin-top: 0%; margin-left: 50%"
															disabled="disabled">Upload Document</button>
													</div>
													
												</div>
											</form>
											<br>

											<div class="divide-10"></div>
											<div style="padding-top: 1%; padding-bottom: 0px;margin-top: 1%;""
												class="box-body col-md-12-1">
												<div class="form-group  box border col-md-12-1">
													<!-- Start Header for New Edit Delete Option -->
													<div
														
														class="col-md-12-1"></div>
													<!-- End Header for New Edit Delete Option -->
													<div id="divdocDispTable"
														style="margin-top: 0px; margin-top: 0px; height: 250px; overflow-y: scroll;"
														class="col-sm-12-1">
														<table
															class="table table-bordered table-condensed header-fixed cf">
															<thead>
																<tr>
																	<th style="height: 21.5px;" class="col-md-1-1 center"><div
																			class="TextFont">#</div></th>
																	<th style="height: 21.5px; padding-left: 50px;"
																		class="col-md-2-1"><div class="TextFont">Document</div></th>
																	<th style="height: 21.5px; padding-left: 0px;"
																		class="col-md-2-1 center"><div class="TextFont">Note</div></th>
																	<th style="height: 21.5px; padding-left: 0px;"
																		class="col-md-1-1 center"><div class="TextFont">Date</div></th>
																	<th style="height: 21.5px; padding-left: 0px;"
																		class="col-md-1-1 center"><div class="TextFont">View
																			/ Delete</div></th>
																</tr>
															</thead>
															<tbody id="certiDispTable"></tbody>
														</table>
													</div>
												</div>
											</div>
											<!-- 											</div> -->
										</div>
									</div>
								</div>

							</div>
						</div>

					</div>


					<!-- class="container" -->
					<!-- id="main-content" -->
				</div>

				<!-- id="outer" -->
			</div>

			<input id="addRowCount" type="hidden" value="0">
			<input id="imageId" type="hidden" value="0">

			<input id="RowCount" type="hidden" value="0">
			<input id="HisRowCount" type="hidden" value="0">


		</c:if>
	</section>
</body>
</html>