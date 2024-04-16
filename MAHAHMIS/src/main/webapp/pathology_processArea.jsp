<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Lab Test Phlebotomy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->	

<!-- include js for development -->
	<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
	<!-- JQUERY -->
	<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
	<!-- JQUERY UI-->
	<script src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
	<!-- BOOTSTRAP -->
	<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
		
	<!-- JQUERY UI-->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/themes/default.css" id="skin-switcher" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/responsive.css" >
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

<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>

<script src="ehat-design/js/jquery-validate/jquery.validate.min.js"></script>
	<script src="ehat-design/js/jquery-validate/additional-methods.min.js"></script>
	<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>	
	<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>


<!-- include js for development -->
<script type="text/javascript" src="js/OutsourceMaster.js"></script>
<script type="text/javascript" src="js/ehat_pathology_outsource.js"></script>

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
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: -5px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="diagnoPatBillDashboardNew.jsp">Diagnostics</a></li>
												<li><a href="pathology_processArea.jsp">Pathology
														Management</a></li>
												<li>Lab Process Area</li>
											</ul>
										</div>
									</div>
								</div>
								<div class="alert alert-block alert-info fade in" style="height:0%;">

										<div class="row">
											<div class="col-md-1">
												<img id="patImg" style="width: 100%; height: 60px"
													src="ehat-design/img/profile/avatar.jpg"
													class="img-responsive">
											</div>
											<div class="col-md-11" >

												<div class="col-md-12" style="margin-top: 2%;">

													<div class="col-md-2">
														<div class="form-group">

															<label class="control-label lblBold">Patient Id :</label>
															<label class="control-label" id="patientId"> </label>
														</div>
													</div>



													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">Patient Name
																:</label> <label class="control-label" id="patientName">
															</label>

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

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Gender :</label> <label
																class="control-label" id="sex"></label>

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
													<!-- <div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">DOD :</label> <label
													class="control-label" id="dod"></label>

											</div>
										</div>			 -->
												</div>
											</div>
										</div>
									</div>
								<div class="container-fluid">
									<div class="row">
										<div class="col-md-8">
											<div class="panel panel-default" style="height: 436px;">
												<div class="panel-body ">
												<!-- <div class="divide-20"></div> -->
													<!-- <div class="row" > -->
													<div class="col-md-12 form-group"style="border: 1px solid #edeff0;background-color:#edeff0;">
														<div class="divide-10"></div>
														<div class="col-md-3">
														<div class="form-group">
																<label class="control-label lblBold">Order No: </label>
																<label style="color: #ffae00;" class="control-label"
																	id="orderno"><%=request.getParameter("testmasterId")%>
																</label>

															</div>															
														</div>

														<div class="col-md-2">
														<div class="form-group">
																<label class="control-label lblBold">Sample No:
																</label> <label style="color: #ffae00;" class="control-label"
																	id="sampleNo"></label>
															</div>															
														</div>

														<div class="col-md-4">
														<div class="form-group">
																<label class="control-label lblBold">Sample: </label> <label
																	style="color: #ffae00;" class="control-label"
																	id="samplename"></label>
															</div>
																												
														</div>

														<div class="col-md-3">
														<div class="form-group">
																<label class="control-label lblBold">Collection
																	On: </label> <label style="color: #ffae00;"
																	class="control-label" id="collectiondate"> </label>
															</div>															
														</div>
														
														<div class="col-md-3">
																	<div class="form-group">
																<label class="control-label lblBold">Container:
																</label> <label style="color: #ffae00;" class="control-label"
																	id="conatinername"></label>
															</div>													
														</div>
														
														<div class="col-md-2">
														<div class="form-group">
																<label class="control-label lblBold">Quantity: </label> <label
																	style="color: #ffae00;" class="control-label"
																	id="quantity"></label>
															</div>
														</div>


														<div class="col-md-4">
														<div class="form-group">
																<label class="control-label lblBold">Collection
																	Center: </label> <label style="color: #ffae00;"
																	class="control-label" id="collectionname"> </label>
															</div>															
														</div>
														<div class="col-md-3">
														<div class="form-group">
																<label class="control-label" id="">Collection
																	Time: </label> <label style="color: #ffae00;"
																	class="control-label" id="collectiontime"> </label>
															</div>
														</div>
													</div>
													<!-- </div> -->
													<div class="divide-20"></div>
													<div class="divide-20"></div>
													<div class="divide-20"></div>
													<div class="divide-20"></div>
													<div class="divide-20"></div>
													<div class="divide-20"></div>
													

														<div class="col-md-12 form-group">

															<div class="col-md-6">
															<div class="col-md-4"style="border: 2px solid #27a825;background-color: #008000;color: #ffffff;">
																<label class="radio-inline"> <input type="radio" onclick="changeDivForAcceptReject('accepted');"
																	id="testflag" name="testflag" value="A"
																	checked="checked"> <font size="2">Accepted</font> 
																</label>
																</div>
															</div>

															<div class="col-md-6">
																<div class="col-md-4"
																		style="border: 2px solid #fa1805;background-color: #fa1805;color: #ffffff;">
																		<label class="radio-inline"> <input onclick="changeDivForAcceptReject('rejected');"
																			type="radio" name="testflag" value="R"><font size="2">Rejected</font> 
																		</label>
																	</div>
															</div>
														</div>
														
														<div class="divide-20"></div>
														<div class="divide-20"></div>
														<div class="divide-20"></div>
														
														<div class="col-md-12 form-group" id="acceptDiv" style="border: 1px solid #A9A9A9;">
														<div class="divide-20"></div>
														<div class="col-md-8 form-group">
														
														<div class="form-group col-md-6">
																	<label for="inputState">Collection Date</label> <input
																		type="text" class="form-control input-SmallText"
																		onclick="displayCalendar(document.getElementById('collectiondatep'),'dd/mm/yyyy',this)"
																		readonly="readonly" id="collectiondatep">
																</div>

																<div class="form-group col-md-6">
																	<label for="inputState">Collection Time</label> <input
																		type="text" class="form-control input-SmallText"
																		onclick="getTime(this.id)" readonly="readonly"
																		id="collectionTimep">
																</div>

																<div class="form-group col-md-6">
																	<label for="inputState">Recieved Date</label> <input
																		type="text" class="form-control input-SmallText"
																		onclick="displayCalendar(document.getElementById('recieveddate'),'dd/mm/yyyy',this)"
																		readonly="readonly" id="recieveddate" value="<%=todays_datee%>">
																</div>

																<div class="form-group col-md-6">
																	<label for="inputState">Recieved Time</label> <input
																		type="text" class="form-control input-SmallText"
																		onclick="getTime(this.id)" readonly="readonly"
																		id="recievedtime" value="<%=todays_time%>">
																</div>

														</div>
														<div class="form-group col-md-4">

																<label for="comment">Remark:</label>
																<textarea class="form-control" rows="4" id="comment"
																	style="resize: none;"></textarea>
															</div>
															<div class="divide-20"></div>
														</div>
														
														<!-- ----------Div Start For Reject------ -->
														
														<div class="col-md-12 form-group" id="rejectDiv" style="display: none;border: 1px solid #A9A9A9;">
														<div class="divide-20"></div>
														<div class="col-md-6 form-group">
														
														<div class="form-group col-md-12">
																	<label for="inputState">Rejection Reason</label> <select
																		id="rejectedreasonId"
																		class="col-md-12 input-SmallText"
																		onchange="setGender('ehat_patient')">
																		<option value="select">-Select Title-</option>
																		<option value="Hemolysed Sample">Hemolysed
																			Sample</option>
																		<option value="Clotted Sample">Clotted Sample</option>
																		<option value="Inadequate Sample">Inadequate
																			Sample</option>
																		<option value="Contamination">Contamination</option>
																		<option value="Inappropriate Collection Container">Inappropriate
																			Collection Container</option>
																		<option value="Others">Others</option>
																	</select>
																</div>
																
																	<div class="form-group col-md-12">
																	<b>Recollection Request:</b> <label
																		class="checkbox-inline"> <input
																		type="checkbox" value="" id="recollectionRequest"></label>
																</div>


														</div>
														<div class="form-group col-md-6">

															
																<label for="comment">Remark:</label>
																<textarea class="form-control" rows="2"
																	id="rejedtedRemark" style="resize:none;"></textarea>
															</div>
														</div>
														
														<div class="form-group col-md-2 pull-right">
															<button style=width:80px; class="btn btn-success btn-xs"
																onclick="saveProcessArea()">Save</button>
														</div>
														<input type="hidden" id="sampleid" value="0" />
														<!-- ----------------Div End For Reject----->

														<%-- <div class="container-fluid">
														<div class="col-md-6" style="border-right:1px solid black;">
															<div class="col-md-8">
																<div class="row">
																	<div class="col-md-5 form-group"
																		style="border: 2px solid #00ff01;">
																		<label class="radio-inline"> <input
																			type="radio" id="testflag" name="testflag" value="A"
																			checked="checked">Accepted
																		</label>
																	</div>
																</div>
																<div class="divide-20"></div>
																<div class="form-group col-md-6">
																	<label for="inputState">Collection Date</label> <input
																		type="text" class="form-control input-SmallText"
																		onclick="displayCalendar(document.getElementById('collectiondatep'),'dd/mm/yyyy',this)"
																		readonly="readonly" id="collectiondatep">
																</div>

																<div class="form-group col-md-6">
																	<label for="inputState">Collection Time</label> <input
																		type="text" class="form-control input-SmallText"
																		onclick="getTime(this.id)" readonly="readonly"
																		id="collectionTimep">
																</div>

																<div class="form-group col-md-6">
																	<label for="inputState">Recieved Date</label> <input
																		type="text" class="form-control input-SmallText"
																		onclick="displayCalendar(document.getElementById('recieveddate'),'dd/mm/yyyy',this)"
																		readonly="readonly" id="recieveddate" value="<%=todays_datee%>">
																</div>

																<div class="form-group col-md-6">
																	<label for="inputState">Recieved Time</label> <input
																		type="text" class="form-control input-SmallText"
																		onclick="getTime(this.id)" readonly="readonly"
																		id="recievedtime" value="<%=todays_time%>">
																</div>
															</div>
															<div class="divide-20"></div>
															<div class="form-group col-md-4">

																<label for="comment">Remark:</label>
																<textarea class="form-control" rows="5" id="comment" style="resize:none;"></textarea>
															</div>
														</div>
														
														<div class="col-md-6">
															<div class="col-md-8">
																<div class="row">
																	<div class="col-md-5 form-group"
																		style="border: 2px solid #fa1805;">
																		<label class="radio-inline"> <input
																			type="radio" name="testflag" value="R">Rejected
																		</label>
																	</div>
																</div>
																<div class="divide-20"></div>
																<div class="form-group col-md-8"
																	style="margin-left: -11%">
																	<label for="inputState">Rejection Reason</label> <select
																		id="rejectedreasonId"
																		class="form-control input-SmallText"
																		onchange="setGender('ehat_patient')">
																		<option value="select">-Select Title-</option>
																		<option value="Hemolysed Sample">Hemolysed
																			Sample</option>
																		<option value="Clotted Sample">Clotted Sample</option>
																		<option value="Inadequate Sample">Inadequate
																			Sample</option>
																		<option value="Contamination">Contamination</option>
																		<option value="Inappropriate Collection Container">Inappropriate
																			Collection Container</option>
																		<option value="Others">Others</option>
																	</select>
																</div>

																<div class="form-group col-md-8"
																	style="margin-left: -10%; margin-top: 4%">
																	<b>Recollection Request:</b> <label
																		class="checkbox-inline"> <input
																		type="checkbox" value="" id="recollectionRequest"></label>
																</div>
															</div>
															<div class="divide-20"></div>
															<div class="form-group col-md-4">
																<label for="comment">Remark:</label>
																<textarea class="form-control" rows="5"
																	id="rejedtedRemark" style="resize:none;"></textarea>
															</div>
														</div>
														<div class="form-group col-md-2 pull-right">
															<button class="btn btn-success btn-xs"
																onclick="saveProcessArea()">save</button>
														</div>
														<input type="hidden" id="sampleid" value="0" />
													</div> --%>
												</div>
											</div>
											<!-- <div class="row">
												<div class="col-md-1" style="width: 100%">
													<div class="panel panel-warning">
														<div class="panel-heading" id="divEhatContent"
															style="background: #FFE0C2">Sample Type</div>
														<div class="panel-body"
															style="overflow: auto; height: 250px;">
															<table class="datatable table table-hover table-bordered">
																<thead id="ehatTHead">
																	<tr>
																		<th class="col-md-1 center">#</th>
																		<th class="col-md-1 center">Order No</th>
																		<th class="col-md-1 center">Sample No</th>
																		<th class="col-md-1 center">Sample Type</th>
																		<th class="col-md-1 center">Collection Date</th>
																		<th class="col-md-1 center">Time</th>
																		<th class="col-md-1 center">Container</th>
																		<th class="col-md-1 center">Qty</th>
																		<th class="col-md-1 center">Units</th>
																		<th class="col-md-1 center">Collection Center</th>
																		<th class="col-md-1 center">Edit</th>
																	</tr>
																</thead>
																<tbody id="processAreaTableBody">
																</tbody>
															</table>
														</div>
													</div>
												</div>
											</div> -->
										</div>

										<div class="col-md-4">
											<div class="panel panel-default">
											<div class="panel-heading" id="divEhatContent"  style="background: #FFE0C2">Test Name</div>
												<div class="panel-body" style="overflow: auto;height: 400px;">
												<table class="datatable table table-bordered table-striped table-condensed cf">
													<thead id="ehatTHead">
														<tr>
															<th class="col-md-10 center">Package /Profile /Test Name</th>
															<!-- <th class="col-md-1 center">Test Name</th> -->
															<!-- <th class="col-md-2 center">Select All</th> -->
														</tr>
													</thead>
														<tbody id="itemMasterRecordsListProcessArea" >
														
													</tbody>
													
												</table>
						<!-- <input type="hidden" value="0" id="patientId1" />
						<input type="hidden" value="0" id="labrequestId1" />
						<input type="hidden" value="0" id="treatmentId1" /> -->
						
						<input type="hidden" value="0" id="id" />
						<input type="hidden" value="0" id="phlebotomyprofileid" />
						<input type="hidden" value="0" id="phlebotomyprofiletestid" />
										</div>
											</div>
										</div>
									</div>


								</div>




<%--  								<div class="col-md-9" style="padding-left: 0px; width: 949px">
									<div class="panel panel-default">
										<div class="panel-body ">
											<div class="container-fluid">
												<div class="row">
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Sample: </label> <label
																style="color: orange;" class="control-label"
																id="samplename"></label>

														</div>
													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Container: </label>
															<label style="color: orange;" class="control-label"
																id="conatinername"></label>

														</div>
													</div>


													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">QTY: </label> <label
																style="color: orange;" class="control-label"
																id="quantity"></label>

														</div>
													</div>

													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">Collection
																Center: </label> <label style="color: orange;"
																class="control-label" id="collectionname"> </label>

														</div>
													</div>
													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">Collection
																On: </label> <label style="color: orange;" class="control-label"
																id="collectiondate"> </label>

														</div>
													</div>
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label" id="">Collection
																Time: </label> <label style="color: orange;"
																class="control-label" id="collectiontime"> </label>


														</div>
													</div>


													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Order No: </label> <label
																style="color: orange;" class="control-label"
																id="orderno"><%=request.getParameter("testmasterId")%>
															</label>

														</div>
													</div>
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Sample No: </label>
															<label style="color: orange;" class="control-label"
																id="sampleNo"></label>

														</div>
													</div>


												</div>


												<div class="container-fluid">
													<div class="col-md-6">
														<div class="col-md-8">
															<div class="row">
																<div class="col-md-4 form-group"
																	style="border: 2px solid #00ff01;">
																	<label class="radio-inline"> <input
																		type="radio" id="testflag" name="testflag" value="A"
																		checked="checked">Accepted
																	</label>
																</div>
															</div>
															<div class="divide-20"></div>
															<div class="form-group col-md-6">
																<label for="inputState">Collection Date</label> <input
																	type="text" class="form-control input-SmallText"
																	onclick="displayCalendar(document.getElementById('collectiondatep'),'dd/mm/yyyy',this)"
																	readonly="readonly" id="collectiondatep">
															</div>

															<div class="form-group col-md-6">
																<label for="inputState">Collection Time</label> <input
																	type="text" class="form-control input-SmallText"
																	onclick="getTime(this.id)" readonly="readonly"
																	id="collectionTimep">
															</div>

															<div class="form-group col-md-6">
																<label for="inputState">Recieved Date</label> <input
																	type="text" class="form-control input-SmallText"
																	onclick="displayCalendar(document.getElementById('recieveddate'),'dd/mm/yyyy',this)"
																	readonly="readonly" id="recieveddate">
															</div>

															<div class="form-group col-md-6">
																<label for="inputState">Recieved Time</label> <input
																	type="text" class="form-control input-SmallText"
																	onclick="getTime(this.id)" readonly="readonly"
																	id="recievedtime">
															</div>
														</div>
														<div class="divide-20"></div>
														<div class="form-group col-md-4">
															<label for="comment">Remark:</label>
															<textarea class="form-control" rows="3" id="comment"></textarea>
														</div>
													</div>

													<div class="col-md-6">
														<div class="col-md-8">
															<div class="row">
																<div class="col-md-4 form-group"
																	style="border: 2px solid #ffab00;">
																	<label class="radio-inline"> <input
																		type="radio" name="testflag" value="R">Rejected
																	</label>
																</div>
															</div>
															<div class="divide-20"></div>
															<div class="form-group col-md-8"
																style="margin-left: -11%">
																<label for="inputState">Rejection Reason</label> <select
																	id="rejectedreasonId"
																	class="form-control input-SmallText"
																	onchange="setGender('ehat_patient')">
																	<option value="select">-Select Title-</option>
																	<option value="Hemolysed Sample">Hemolysed
																		Sample</option>
																	<option value="Clotted Sample">Clotted Sample</option>
																	<option value="Inadequate Sample">Inadequate
																		Sample</option>
																	<option value="Contamination">Contamination</option>
																	<option value="Inappropriate Collection Container">Inappropriate
																		Collection Container</option>
																	<option value="Others">Others</option>
																</select>
															</div>

															<div class="form-group col-md-8"
																style="margin-left: -10%; margin-top: 4%">
																<b>Recollection Request:</b> <label
																	class="checkbox-inline"> <input type="checkbox"
																	value="" id="recollectionRequest"></label>
															</div>
														</div>
														<div class="divide-20"></div>
														<div class="form-group col-md-4">
															<label for="comment">Remark:</label>
															<textarea class="form-control" rows="3"
																id="rejedtedRemark"></textarea>
														</div>
													</div>
													<div class="form-group col-md-2 pull-right">
														<button class="btn btn-success btn-xs"
															onclick="saveProcessArea()">save</button>
													</div>
													<input type="hidden" id="sampleid" value="0" />
												</div>
											</div>
										</div>
									</div>
									
								</div>  --%>
							</div>
							</div>
							</div>
							
						</div>
						<%@include file="Footer.jsp"%>
					</div>
					
				<!-- ----Added by kishor for Barcode Popup ---- -->
		<div class="modal fade" id="Counter_Batch_Pop_Up"
															tabindex="-1" role="dialog"
															aria-labelledby="labTestModal" aria-hidden="true">
															<div class="modal-dialog modal-dialog-centered"
																role="document" style="width: 20%;">
																<div class="modal-content">
																	<div class="modal-header">
																		<h4 class="center">
																			<b>Barcode Information </b>
																		</h4>
																		
																	</div>
																	<div class="modal-body">
																		<div class="row">
																			<div class="col-md-12">
																				<div class="container">
																					<div class="panel panel-primary">
																						<div class="panel-heading" id="divEhatContent"></div>
																						<div class="panel-body">
																						<input id="outlabId" type="hidden" value="0">
																							<div class="form-group col-md-12">
																								<label for="exampleInputEmail1">Enter Barcode Count:
																								</label> <input type="text" id="txtBarcodecnt" onkeypress="return validatePrice(event)"
																									class="form-control" placeholder="Enter Barcode Count:">
																							</div>
																							
																							
																							<%-- <div class="modal-body">
																								<div class="col-md-12-1" style="margin-top: 9px;">
																								<div class="col-md-5-1" style="margin-top:-28px;margin-left:42px;">Enter Barcode Count:</div>
																									<div class="col-md-7-1" style="margin-top:-10px;margin-left:39px;">
																										<input type="text" id="txtBarcodecnt" placeholder="Enter barcode count" onblur="isNumber('txtBarcodecnt',0,10);">		
																									</div>
																									<div class="col-md-12-1" style="margin-top: 5px;margin-left:-24px;color:red" >
																										<input type="button" value="print" onclick="generateBarcodePrint1(<%=request.getParameter("testmasterId")%>)">
																									</div>
																								</div>
																								<!-- /BOX-->
																							</div> --%>
																							
																						</div>
																					</div>
																				</div>
																			</div>
																			<div class="row">
																			<div class="pull-right" style="margin-right: 15%;">
																				<button type="button" class="btn btn-warning"
																					onclick="generateBarcodePrint1(40)">Print</button>
																				<button type="button" class="btn btn-danger"
																					data-dismiss="modal">Close</button>
																			</div>
																		</div>
																		</div>
																	</div>
																	
																</div>
															</div>
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

	<script>
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			
			setTempateOnPatientinformation(<%=request.getParameter("treatmentId")%>);
			getProcessAreaWiseSample(<%=request.getParameter("id")%>,<%=request.getParameter("testmasterId")%>,<%=request.getParameter("treatmentId")%>);		
			//FetchTestNameAndProfileNameInProcessArea(<%=request.getParameter("id")%>,<%=request.getParameter("testmasterId")%>,<%=request.getParameter("treatmentId")%>);
			
			ShowPhlebotomyTestOnPopup(<%=request.getParameter("id")%>,<%=request.getParameter("testmasterId")%>,<%=request.getParameter("treatmentId")%>);
			setpathologistname();
			$('#collectionTimep').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 5
			});		
			$('#recievedtime').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 5
			});
			
		});
	</script>
	
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>