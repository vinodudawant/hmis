
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
<title>Previous Mortuary Autopsy</title>
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

<script>
	jQuery(document).ready(function() {
		App.setPage("Mortuary_coldRoom_BedWard"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<script type="text/javascript">
	onload = function() {
		 singlePreviousMorturay(<%=request.getParameter("id")%>);
		 PreviousBodyTracking('Post Mortem',<%=request.getParameter("id")%>);
		 
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
									value="<%=request.getParameter("id")%>"> <input
									type="hidden" id="todays_date" name="" value="<%=todays_date%>">

								<!-- Page Date Print Discards Common Path info -->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header" style="margin-bottom: 5px">
											<ul class="breadcrumb col-md-12">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="ehat_mortuary.jsp">Mortuary</a></li>

												<li>Previous Mortuary Autopsy</li>
											</ul>
										</div>
									</div>
								</div>



								<div id="mortuaryid_popup"
									class="breadcrumb col-md-12-1"
									style="padding-block-end: 0%; margin-top: 0%; ">

									<div class="row">
										<div class="col-md-1" style="margin-top: 4%;">
											<img id="patImg" class="img-responsive" src="" alt="">
										</div>

										<div class="col-md-11">

											<div class="col-md-12" style="margin-top: 3%;">

												<div class="col-md-2">
													<div class="form-group">

														<label class="control-label lblBold">Mortuary Id :</label>
														<label class="control-label" id="previousmortuaryId">
														</label> <input type="hidden" id="previousmortuaryId">
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="control-label lblBold">Deceased Name
															:</label> <label class="control-label" id="previousdeceasedName">
														</label>

													</div>
												</div>


												<div class="col-md-2">
													<div class="form-group">
														<label class="control-label lblBold">Age :</label> <label
															class="control-label" id="previousage"> </label>
													</div>
												</div>


												<div class="col-md-3">
													<div class="form-group">
														<label class="control-label lblBold">Date of Death
															:</label> <label class="control-label" id="previousdod">
															2017-05-12-D</label>

													</div>
												</div>

												<div class="col-md-2">
													<div class="form-group">
														<label class="control-label lblBold"
															style="line-height: 3.6%;">Gender: </label> <label
															class="control-label" id="previoussex"></label>

													</div>
												</div>

												<div class="col-md-6">
													<div class="form-group">
														<label class="control-label lblBold"
															style="line-height: 3.6%;">Address :</label> <label
															class="control-label" id="previousaddress">
															Address </label>

													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-12 well" style="border: 20px;">

									<ul class="nav nav-tabs md-tabs">
										<li class="nav-item active"><a href="#Badytracing">BodyTracking</a></li>
										<li onclick="preBodyFinding(<%=request.getParameter("id")%>);"><a
											href="#Finding" aria-selected="false">Finding</a></li>
										<li onclick=" PmreportUpdate(<%=request.getParameter("id")%>);"><a href="#PMReport">PM Report</a></li>
										<li onclick="preImages(<%=request.getParameter("id")%>);"><a
											href="#Images">Uploads</a></li>
										<li><a href="#DeathCertificate" onclick="fetchPrevDcCerti();">Death Certificate</a></li>
									</ul>


									<div class="tab-content  ">
										<div id="Badytracing" class="tab-pane fade in active ">
											<div class="tabbable tabs-left col-md-12-1  box border green"
												style="margin-top: 0px; margin-left: 5px;">

												<ul class="nav nav-tabs colorChanges" style="height: 250px;"
													id="cpoeTabULID">
													<li id="postmortemId" class="active" 
														onclick="PreviousBodyTracking('Post Mortem',<%=request.getParameter("id")%>)"><a
														href="#postMortem" data-toggle="tab">Post Mortem</a></li>
													<li id="forensicId"
														onclick="PreviousBodyTracking('Forensic and Investigation',<%=request.getParameter("id")%>)"><a
														href="#Forensic " data-toggle="tab">Forensic &
															Investigation</a></li>
													<li id="studyId"
														onclick="PreviousBodyTracking('Study and Research',<%=request.getParameter("id")%>)"><a
														href="#Study" data-toggle="tab">Study & Research</a></li>
													<li id="otherId"
														onclick="PreviousBodyTracking('Other',<%=request.getParameter("id")%>)"><a
														href="#Other" data-toggle="tab">Other</a></li>
													<li id="releaseId"
														onclick="PreviousBodyTracking('Release',<%=request.getParameter("id")%>)"><a
														href="#Release" data-toggle="tab">Release</a></li>
												</ul>

												<div class="tab-content">
					
													<div id="postMortem" class="tab-pane fade in active">
														
														<div class="form-group"
															style="margin-top: 0px;">
															<label class="TextFont">Post Mortem 
																Date :</label> <b style="color: red;">*</b> <input
																id="pre_pm_date" style="width: 80px;"
																class="form-control input-SmallText" value=""
																readonly="readonly" name="suggestedBy">
														</div>
														<div class="form-group">
															<label class="control-label ">Post Mortem Time :</label> <b style="color: red;">*</b>
															<div class="">
																<input id="pre_pm_time"
																	class="form-control input-SmallText"
																	readonly="readonly" value="" style="width: 80px;">
																<span class="error-span"></span>
															</div>
														</div>
														<div class="form-group">
															<label class="control-label ">Handover
																To :</label> <b style="color: red;">*</b>
															<div class="">
																<input id="pre_pm_handover_to"
																	class="form-control input-SmallText"
																	readonly="readonly" value="" style="width: 25%;">
																<span class="error-span"></span>
															</div>
														</div>
														
														<div class="form-group" >
															<label class=""> Notes
																 : <span class="required text-danger">*</span>
															</label>
															<div class=" ">
																<textarea  id="pre_pm_notes" style="width: 40%;"
																	readonly="readonly"
																	 placeholder="Notes To" name="fName"
																	> </textarea><span class="error-span"></span>
															</div>
														</div>
													
													</div>
													<div id="Forensic" class="tab-pane fade">
														
														<div class="form-group"
															style="margin-top: 0px;">
															<label class="TextFont">Forensic & Investigation
																Date :</label> <b style="color: red;">*</b> <input
																id="pre_Forensic_date" style="width: 80px;"
																class="form-control input-SmallText" value=""
																readonly="readonly" name="suggestedBy">
														</div>
														<div class="form-group">
															<label class="control-label ">Forensic &
																Investigation Time :</label> <b style="color: red;">*</b>
															<div class="">
																<input id="pre_Forensic_time"
																	class="form-control input-SmallText"
																	readonly="readonly" value="" style="width: 80px;">
																<span class="error-span"></span>
															</div>
														</div>
														<div class="form-group">
															<label class="control-label ">Handover
																To :</label> <b style="color: red;">*</b>
															<div class="">
																<input id="pre_Forensic_handover_to"
																	class="form-control input-SmallText"
																	readonly="readonly" value="" style="width: 25%;">
																<span class="error-span"></span>
															</div>
														</div>
														<!-- <div class="form-group" style="margin-top: 30px;">
															<label class="control-label col-md-6-1"> Handover
																To : <span class="required text-danger">*</span>
															</label>
															<div class=" col-md-6-2">
																<input id="" readonly="readonly"
																	class="typeahead form-control input-SmallText"
																	type="text" placeholder="Handover To" name="fName"
																	style="width: 40%;"> <span class="error-span"></span>
															</div>
														</div> -->
															<div class="form-group" >
															<label class=""> Notes
																 : <span class="required text-danger">*</span>
															</label>
															<div class=" ">
																<textarea  id="pre_forensic_notes" style="width: 40%;"
																	readonly="readonly"
																	 placeholder="Notes To" name="fName"
																	> </textarea><span class="error-span"></span>
															</div>
														</div>
													
													</div>
													<div id="Study" class="tab-pane fade">
														
														<div class="form-group "
															style="margin-top: 0px;">
															<label class="TextFont">Study & Research Date :</label> <b
																style="color: red;">*</b> <input id="pre_study_date"
																class="form-control input-SmallText" value=""
																style="width: 80px;"
																readonly="readonly" name="suggestedBy">
														</div>
														<div class="form-group">
															<label class="control-label ">Study & Research
																Time :</label> <b style="color: red;">*</b>
															<div class="">
																<input id="pre_study_time"
																	class="form-control input-SmallText"
																	readonly="readonly" value="" style="width: 80px;">
																<span class="error-span"></span>
															</div>
														</div>
															<div class="form-group">
															<label class="control-label ">Handover
																To :</label> <b style="color: red;">*</b>
															<div class="">
																<input id="pre_study_handover_to"
																	class="form-control input-SmallText"
																	readonly="readonly" value="" style="width: 25%;">
																<span class="error-span"></span>
															</div>
														</div>
														<!-- <div class="form-group" style="margin-top: 30px;">
															<label class="control-label col-md-6-1"> Handover
																To : <span class="required text-danger">*</span>
															</label>
															<div class=" col-md-6-2">
																<input id="pre_study_handover_to" readonly="readonly"
																	class="typeahead form-control input-SmallText"
																	type="text" placeholder="Handover To" name="fName"
																	style="width: 40%;"> <span class="error-span"></span>
															</div>
														</div> -->
														
															<div class="form-group" >
															<label class=""> Notes
																 : <span class="required text-danger">*</span>
															</label>
															<div class=" ">
																<textarea  id="pre_study_notes" style="width: 40%;"
																	readonly="readonly"
																	 placeholder="Notes To" name="fName"
																	> </textarea><span class="error-span"></span>
															</div>
														</div>
													
													</div>
													<div id="Other" class="tab-pane fade">
														
														<div class="form-group "
															style="margin-top: 0px;">
															<label class="TextFont">Date :</label> <b
																style="color: red;">*</b> <input id="pre_other_date"
																class="form-control input-SmallText" value=""
																style="width: 80px;"
																readonly="readonly" name="suggestedBy">
														</div>
														<div class="form-group">
															<label class="control-label ">Time :</label> <b
																style="color: red;">*</b>
															<div class="">
																<input id="pre_other_time"
																	class="form-control input-SmallText"
																	readonly="readonly" value="" style="width: 80px;">
																<span class="error-span"></span>
															</div>
														</div>
																<div class="form-group">
															<label class="control-label ">Handover
																To :</label> <b style="color: red;">*</b>
															<div class="">
																<input id="pre_other_handover_to"
																	class="form-control input-SmallText"
																	readonly="readonly" value="" style="width: 25%;">
																<span class="error-span"></span>
															</div>
														</div>
														<!-- <div class="form-group" style="margin-top: 30px;">
															<label class="control-label col-md-6-1"> Handover
																To : <span class="required text-danger">*</span>
															</label>
															<div class=" col-md-6-2">
																<input id="" readonly="readonly"
																	class="typeahead form-control input-SmallText"
																	type="text" placeholder="Handover To" name="fName"
																	style="width: 40%;"> <span class="error-span"></span>
															</div>
														</div> -->
															<div class="form-group" >
															<label class=""> Notes
																 : <span class="required text-danger">*</span>
															</label>
															<div class=" ">
																<textarea  id="pre_other_notes" style="width: 40%;"
																	readonly="readonly"
																	
																	 placeholder="Notes To" name="fName"
																	> </textarea><span class="error-span"></span>
															</div>
														</div>
													
													</div>

													<div id="Release" class="tab-pane fade in  ">
														
														<div class="form-group "
															style="margin-top: 0px;">
															<label class="TextFont">Release Date :</label> <b
																style="color: red;">*</b> <input id="pre_release_date"
																class="form-control input-SmallText" value=""
																style="width: 80px;"
																onclick="displayCalendar(document.getElementById('release_date'),'dd/mm/yyyy',this)"
																readonly="readonly">
														</div>
														<div class="form-group">
															<label class="control-label ">Release Time :</label> <b
																style="color: red;">*</b>
															<div class="">
																<input id="pre_release_time"
																	class="form-control input-SmallText"
																	readonly="readonly" value="" style="width: 80px;">
																<span class="error-span"></span>
															</div>
														</div>
															<div class="form-group">
															<label class="control-label ">Handover
																To :</label> <b style="color: red;">*</b>
															<div class="">
																<input id="pre_release_handover_to"
																	class="form-control input-SmallText"
																	readonly="readonly" value="" style="width: 25%;">
																<span class="error-span"></span>
															</div>
														</div>
													<!-- 	<div class="form-group" style="margin-top: 30px;">
															<label class="control-label col-md-6-1"> Handover
																To : <span class="required text-danger">*</span>
															</label>
															<div class=" col-md-6-2">
																<input id="" readonly="readonly"
																	class="typeahead form-control input-SmallText"
																	type="text" placeholder="Handover To" name="fName"
																	style="width: 40%;"> <span class="error-span"></span>
															</div>
														</div> -->
															<div class="form-group" >
															<label class=""> Notes
																 : <span class="required text-danger">*</span>
															</label>
															<div class=" ">
																<textarea  id="pre_release_notes" style="width: 40%;"
																	readonly="readonly"
																	 placeholder="Notes To" name="fName"
																	> </textarea><span class="error-span"></span>
															</div>
														</div>
													
													</div>
												</div>

											</div>


										</div>


										<div id="Finding" class="tab-pane fade">
											<div class="col-sm-12 box border green">
											<table class='table table-bordered'
												style='margin-top: 25px; width: 100%;'>
												<thead>
													<tr>
														<th class='col-sm-4-1 center'
															style='width: 3%;'><label
															class='TextFont'>#</label></th>
														<th class='col-sm-4-1 center'
															style='width: 50%;'><label
															class='TextFont'>Headings</label></th>
														<th class='col-sm-6-1 center'
															style='width: 50%;'><label
															class='TextFont'> Remarks</label></th>

													</tr>
												</thead>
												<tbody id="preFinding"></tbody>
											</table>
											</div>
										</div>

										<div id="PMReport" class="tab-pane fade  ">
											<div class="col-sm-12 box border green">
												<div class="col-md-1-1 li pull-right "
													style="margin-top: 1%;padding-left: 3%;">
													<div class="from-group">
														<!-- <button id="saveAddIpdHistory"
															class="btn btn-xs btn-success " onclick="pmreportSave();"
															title="Save History " data-placement="left"
															data-toggle="tooltip">
															<i class="fa fa-save"></i>
														</button> -->
														<button class="btn btn-xs btn-warning coversheetBtn "
															title="Print " data-placement="left"
															data-toggle="tooltip" onclick="Mortuarytempletprinr();">
															<i class="fa fa-print"></i>
														</button>
													</div>
												</div>
												<div style="margin-top: 30px;" class="col-md-12-1">
													<div class="col-md-10-1"></div>

													<div class="col-md-2-1  "
														style="position: absolute; right: 0;">
														<!-- 		
													<div class="col-md-2-1"
														style="position: absolute; right: 0;">

														<button class="btn btn-xs btn-warning coversheetBtn "
															data-placement="right" title="Print " onclick="">
															<i class="fa fa-print"></i>
														</button>

													</div> -->
														<!-- <div class="col-md-2-1" id="hidepmreport"
														style="position: absolute; right: 30px;">

														<button class="btn btn-xs btn-info" data-placement="right"
															title="Edit "
															>
															<i class="fa fa-edit"></i>
														</button>
													</div>
 -->
													</div>


												</div>

												<div class="panel panel-default col-md-12-1"
													style="margin-top: 10px;">
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



													</div>
												</div>
											</div>
										</div>
										<div id="Images" class="tab-pane fade">
											<div class="col-sm-12 box border green">
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
																		</div></th>
															</tr>
														</thead>
														<tbody id="docDispTable"></tbody>
													</table>
												</div>

											</div>
										</div>
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
															<br>
															<br>
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
										<div id="DeathCertificate" class="tab-pane fade">
											<div class=" box border green">
													<div class="divide-10"></div>
													<div style="padding-top: 10px; padding-bottom: 0px"
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
																	<tbody id="prevCertiDispTable"></tbody>
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


					<!-- class="container" -->
					<!-- id="main-content" -->
				</div>

				<!-- id="outer" -->
			</div>


		</c:if>
	</section>
</body>
</html>