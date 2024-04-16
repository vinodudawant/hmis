<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<!DOCTYPE html>

<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<title>Previous Operation</title>

<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link rel="stylesheet" type="text/css"
	href="bootstrap-dist/css/bootstrap.min.css" media="screen">
<link rel="stylesheet" type="text/css"
	href="font-awesome/css/font-awesome.min.css">

<link href="ehat-design/js/select2/select2.min.css" type="text/css"
	rel="stylesheet">

<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />

<script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>
<script type="text/javascript"
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript"
	src="ehat-design/js/select2/select2.min.js"></script>
<script type="text/javascript" src="js/operation.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<script type="text/javascript" src="js/ipdBill.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>

<!-- Auto-Suggestion 1/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>
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

<!-- BOOTSTRAP WYSIWYG -->
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/jquery.hotkeys.min.js"></script>
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/bootstrap-wysiwyg.min.js"></script>
<!-- CKEDITOR -->
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>	

<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("operation"); //Set current page
		App.init(); //Initialise plugins and elements
		getIpdPatientHeaderInfo(<%=request.getParameter("treatmentId")%>);
		$("#rowcount").val(1);
		
		//viewOPerationSummary("previousOperation");
		//fetchipdbilldetails('DoctorStation');
		//fetchipdbilldetails('OC');
		fetchCustomizeTemplateListOT();
		fetchdetailsOT(0, 0,'OTDRUG','ONTAB');
		fetchdetailsOT(0, 0,'OTINV','ONTAB');
		fetchdetailsOT(0, 0,'OTCATH','ONTAB');
				getAllUnitOT();
		fetchOperationTheaterNames();
		fetchOperationTeamList('OTScheduler');
		fetchPTNameForOtSchedule();
		fetchOperationTheaterNames();
		fetchDepartmentForOTSchedule();
		fetchAllServicecomot("ONLOAD","");
		//viewOPerationPatient("operation");
		operationSummaryDetails("previousOperation");
		setTimeout(function() {
			setOperationDetails1();
		}, 500); 
	
			$('#CPOE').find('input, text').attr("readonly", "readonly");
			$('#OTSERV').find('input, text').attr("readonly", "readonly");
			$('#OTDRUG').find('input, text').attr("readonly", "readonly");
			$('#OTInv').find('input, text').attr("readonly", "readonly");
			$('#cathLab').find('input, text').attr("readonly", "readonly");
		//setcommonPatInfoForOperation();
		
		
		setTemplateFunc();
		fetchOTNotesData();
		  $("#otdel").prop('disabled', true);
		  getpatientTrIOT(<%=request.getParameter("treatmentId")%>);
		  var type = $("#typeOfOperation").val();
			if (type == "previous") {
				$("#idSaveButtonDiv").html("");
			}
			
			function selectText(field) {
				var index = [];
				var textcount = 0;
				var count = 0;
				index = $(field).val().split("\n");
				var curPos = $textArea.GetCaretPos(field);
				for ( var i = 0; i < index.length; i++) {
					if (curPos > textcount) {
						if (i == 0) {
							textcount = textcount + index[i].length;
						} else {
							textcount = textcount + index[i].length + 1;
						}
						count++;
					}

				}
				var start = textcount - index[count - 1].length;

				var end = textcount;
				if (field.createTextRange) {

					var newend = end - start;
					var selRange = field.createTextRange();
					selRange.collapse(true);
					selRange.moveStart("character", start);
					selRange.moveEnd("character", newend);
					selRange.select();
				} else if (field.setSelectionRange) {

					field.setSelectionRange(start, end);
				}

				field.focus();
			}
	});
</script>
<!--TIMEPEACKER -->
<script type="text/javascript">
	onload = function() {

	
}
</script>

<style>
#teamMembersList {
	background-color: #e7e7e7;
	overflow: auto;
}

 thead>tr , #teamMembersList {
	display: block;
} 
</style>

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

				<!--Start Left Menu -->
				<%@include file="left_menu_otmanagement.jsp"%>
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

								<!-- Page Date Print Discards-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
												<li><a href="operationTypeManagement.jsp">OT</a></li>
												<li><a href="OperationSummaryDashboard.jsp">Previous
														Operation Dashboard</a></li>
												<li class="pull-right" id="idSaveButtonDiv">
													<button class="btn btn-xs btn-success"
														onclick="SaveOperationDetails()">Save</button>
												</li>
												</ul>
										</div>
									</div>
								</div>
								<!-- Page Date Print Discards-->

								<!-- <div id="rightContent" style="height: 100%;"> -->
								<!--Start First Panel -->

								<div id="commonPatInfo">
									<div class="panel panel-primary" style="margin-top: -20px;">
										<div class="panel-body">
											<div class="row">
												<div class="col-md-1">
													<img id="patImg" style="width: 100%; height: 45px"
														class="img-responsive"
														src="ehat-design/img/profile/avatar.jpg" alt="">
												</div>
												<div class="col-md-10" style="margin-top: 10px;">
													<div class="col-md-3">
														<div class="form-group">
															<input type="hidden" id="pt_Id" value="0"> <input
																type="hidden" id="tr_Id"
																value="<%=request.getParameter("treatID")%>"> <input
																type="hidden" id="bill_Id" value="0"> <label
																class="control-label lblBold" id="lblCenterPatientId">Patient
																Id :</label> <label id="patientId" class="control-label"
																style="display: none;"></label> <label
																id="centerPatientId" class="control-label"></label>
														</div>
													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Gender :</label> <label
																id="sex" class="control-label">male</label>

														</div>
													</div>


													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Age :</label> <label
																id="age" class="control-label"></label>
														</div>
													</div>

													<div class="col-md-5">
														<div class="form-group">
															<label class="control-label lblBold">Patient Name
																:</label> <label id="patientName" class="control-label"></label>

														</div>
													</div>

													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">DOA : </label> <label
																id="doa" class="control-label">- </label>

														</div>
													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Bill
																Category :</label> <label id="billCategoty"
																class="control-label"> </label>

														</div>
													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Ipd No :</label> <label
																id="ipdNo" class="control-label"></label>

														</div>
													</div>

													<div class="col-md-5">
														<div class="form-group">
															<label class="control-label lblBold">Corporate :</label>
															<label id="corporate" class="control-label"> </label>

														</div>
													</div>

													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">DOD :</label> <label
																id="dod" class="control-label">- </label>

														</div>
													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Weight(kg):
															</label> <label id="weight" class="control-label"></label>
														</div>
													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Treatment Id
																:</label> <label id="treatmentId" class="control-label">
																<%=request.getParameter("treatID")%></label>

														</div>
													</div>

													<div class="col-md-5">
														<div class="form-group">
															<label class="control-label lblBold">Refer-By :</label> <label
																id="refer_by" class="control-label"> </label>

														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="divide-40"></div>

								<div class="box border col-md-12-1">
									<div class="divide-10"></div>
									<div class="tabbable col-md-12-1">
										<ul class="nav nav-tabs">

											<li class="active"><a data-toggle="tab"
												href="#Operation"><span class="hidden-inline-mobile">Operation
														Details</span></a></li>
											<li><a href="#tab_OT_Remark" id="OT_Remark"
																data-toggle="tab">Remark & Description</a></li>
											<li><a data-toggle="tab" href="#iOTNotes"><span
													class="hidden-inline-mobile">OT Notes</span></a></li>
															<li onclick="fetchfreez('OT' , 'CPOE' , 'dynamicItemcpoe'),fetchdetailsOT(0, 0,'CPOE','ONTAB'),setDocNamedrdesk(),fetchfreez('OT' , 'CPOE' , 'dynamicItemcpoe'),getSubServiceDetailsOnCPOE()"><a data-toggle="tab" href="#CPOE"><span
													class="hidden-inline-mobile">CPOE</span></a></li>
										<!-- 	<li onclick="fetchfreez('OT' , 'OTCHARG' , 'dynamicItemcom2'),fetchdetailsOT(0, 0,'OTCHARG','ONTAB'),hallwiseOPchargeOT()"><a data-toggle="tab" href="#OTCHARGES"><span
													class="hidden-inline-mobile">OT CHARGES</span></a></li> -->
										<!-- <li onclick="fetchipdbilldetails('OC'),setDocNameOT(),hallwiseCHARGE('OT')"><a data-toggle="tab" href="#OTSERV"><span
													class="hidden-inline-mobile">OT CHARGES</span></a></li>	 -->
										<li onclick="fetchipdbilldetailsOnOTForPrevious(),setDocNameOT(),getAllDoctorsListOnOTService()"><a data-toggle="tab" href="#OTSERV"><span
													class="hidden-inline-mobile">OT CHARGES</span></a></li>						
											<li onclick="fetchfreez('OT' , 'OTDRUG' , 'dynamicItemdrug'),fetchdetailsOT(0, 0,'OTDRUG','ONTAB')"><a data-toggle="tab" href="#OTDRUG"><span
													class="hidden-inline-mobile">OT DRUGS</span></a></li>
											<li onclick="fetchfreez('OT' , 'OTINV' , 'dynamicItemINV'),fetchdetailsOT(0, 0,'OTINV','ONTAB')"><a data-toggle="tab" href="#OTInv"><span
													class="hidden-inline-mobile">OT Inventory</span></a></li>
													
											<li onclick="fetchfreez('OT' , 'OTCATH' , 'dynamicItemINV'),fetchdetailsOT(0, 0,'OTCATH','ONTAB')"><a data-toggle="tab" href="#cathLab"><span
													class="hidden-inline-mobile">OT CathLab</span></a></li>
													
										</ul>
										<div class="divide-10"></div>

										<div id="" class="tab-content">
										<!-- Start Code for #tab_OT_Remark GUI -->
										<div class="col-sm-12-1 tab-pane fade in"
													id="tab_OT_Remark" >
												<div class="form-group  col-md-12-1"
														style="margin-top: 0px;margin-left:1%;">
													<div class="form-group Remove-Padding col-md-12-1"
														style="margin-top: 0px;margin-left:1%;">
														<div class="form-group Remove-Padding col-md-4-1"
															style="margin-top: 9px;">
															<label class="TextFont">Other Reference</label>
															<input id='otherReference'
																name='otherReference' value=""
																class="form-control input-SmallText"  readonly="readonly" />
														</div>
														
														<div class="form-group Remove-Padding col-md-3-1"
															style="margin-top: 9px;">
															<label class="TextFont">Contact of Reference</label>
															<input id='contactOfReference'
																name='contactOfReference' value="" maxlength="10"
																class="form-control input-SmallText"
																onkeyup="return validateNumberByRegEx(this.id)" readonly="readonly" />
														</div>
														<div class="form-group Remove-Padding col-md-3-1"
															style="margin-top: 9px;">
															<label class="TextFont">Email ID of Reference</label>
															<input id='emailOfReference'
																name='emailOfReference' value=""
																class="form-control input-SmallText" readonly="readonly" />
														</div>
														<!-- <div class="form-group Remove-Padding col-md-1-1"
															style="margin-top: 29px;">
															<button onclick=""
																class="btn btn-xs btn-info"
																style="line-height: 1.2">
																<i class="fa fa-envelope"></i>
															</button>
															<button onclick=""
																class="btn btn-xs btn-warning"
																style="line-height: 1.2">
																<i class="fa fa-mobile fa-lg"></i>
															</button>
														</div> -->
													</div>
														
													<div class="form-group Remove-Padding col-md-12-1"
														style="margin-top: 0px;margin-left:1%;">
														<div class="form-group Remove-Padding col-md-4-1"
															style="margin-top: 9px;">
															<label class="TextFont">Remark</label>
															<textarea disabled rows="4" cols="52" id="remark" name=""
																class="" readonly="readonly"></textarea>
														</div>
														
														<div class="form-group Remove-Padding col-md-4-1"
															style="margin-top: 9px;">
															<label class="TextFont">Precaution</label>
															<textarea disabled rows="4" cols="52" id="precaution" name=""
																class="" readonly="readonly"></textarea>
														</div>
														<div class="form-group Remove-Padding col-md-4-1"
															style="margin-top: 9px;">
															<label class="TextFont">Indication For
																Surgery</label>
															<textarea disabled rows="4" cols="50"
																id="indicationForSurgery" name="" class="" readonly="readonly"></textarea>
														</div>
													</div>
													
													<div class="form-group Remove-Padding col-md-12-1"
														style="margin-top: 0px;margin-left:1%;">
														<div class="form-group Remove-Padding col-md-12-1"
															style="margin-top: 9px;">
															<label class="TextFont">Surgery Description</label>
															<textarea disabled rows="4" cols="177" id="surgeryDescription"
																name="" class="" readonly="readonly"></textarea>
														</div>
													</div>
												</div>
											</div>
										<!-- End Code for #tab_OT_Remark GUI -->

												<!-- Start Code for #OTNotes GUI -->
											<div id="iOTNotes" class="col-md-12-1 tab-pane fade in">
												<div class="col-md-4-1" style="margin-top: 40px;">
													<div class="form-group Remove-Padding col-md-12-1" style="padding-left: 5%;">
														<div class="col-md-5-1" style="margin-top: 10px;">
															<label for="Estimated Blood Loss" class="TextFont">Estimated
																Blood Loss</label>
														</div>
														<div class="col-md-6-1" style="margin-top: 10px;">
															<input type="text"
																class="form-control input-SmallText capitalise"
																placeholder="Estimated Blood Loss"
																onkeypress="return validateOnlyName(event)"
																name="EBLoss" id="iEBLoss" disabled="disabled">
														</div>
													</div>
													<div class="form-group Remove-Padding col-md-12-1" style="padding-left: 5%;">
														<div class="col-md-5-1" style="margin-top: 30px;">
															<label for="Actual Blood Loss" class="TextFont">Actual
																Blood Loss</label>
														</div>
														<div class="col-md-6-1" style="margin-top: 30px;">
															<input type="text"
																class="form-control input-SmallText capitalise"
																placeholder="Actual Blood Loss"
																onkeypress="return validateOnlyName(event)"
																name="ABLoss" id="iABLoss" value="0" disabled="disabled">
														</div>
													</div>
													<div class="form-group Remove-Padding col-md-12-1" style="padding-left: 5%;">
														<div class="col-md-5-1" style="margin-top: 30px;">
															<label for="Instrumental Count" class="TextFont">Instrumental
																Count</label>
														</div>
														<div class="col-md-6-1" style="margin-top: 30px;">
															<input type="text"
																class="form-control input-SmallText capitalise"
																placeholder="Instrumental Count"
																onkeypress="return validateOnlyName(event)"
																name="ICount" id="iICount" disabled="disabled">
														</div>
													</div>
													<div class="form-group Remove-Padding col-md-12-1" style="padding-left: 5%;">
														<div class="col-md-5-1" style="margin-top: 30px;">
															<label for="Recorded By" class="TextFont">Recorded
																By</label>
														</div>
														<div class="col-md-6-1" style="margin-top: 30px;">
															<input type="text"
																class="typeahead form-control input-SmallText"
																placeholder="Recorded By"
																onkeypress="setUserName(this.id)" name="RecBy"
																id="iRecBy" disabled="disabled">
														</div>
													</div>
													<div class="form-group Remove-Padding col-md-12-1" style="padding-left: 5%;">
														<div class="col-md-5-1" style="margin-top: 30px;">
															<label for="MOP Count" class="TextFont">MOP Count
																Recorded By</label>
														</div>
														<div class="col-md-6-1" style="margin-top: 30px;">
															<input type="text"
																class="typeahead form-control input-SmallText"
																placeholder="MOP Count"
																onkeypress="setUserName(this.id)" name="MOPCount"
																id="iMOPCount" disabled="disabled">
														</div>
													</div>
													<div class="form-group Remove-Padding col-md-12-1" style="padding-left: 5%;">
														<div class="col-md-5-1" style="margin-top: 30px;">
															<label for="OTNotesComment" class="TextFont">Comment</label>
														</div>
														<div class="col-md-6-1" style="margin-top: 30px;">
															<textarea class="field span12 "
																style="margin-top: 4px; margin-bottom: 2px;"
																id="iOTNotesComment" rows="3" cols="23"
																placeholder="OT Notes Comment" disabled="disabled"></textarea>
														</div>
													</div>
												</div>
												<div class="container">
													<div class="col-md-8-1" style="margin-top: 20px;">
														<div style="margin-top: 5px;" class="col-md-12-1">
														
														<div class="col-md-7-1">
															<div class="col-md-2-1 form-group">Template List</div>
															<div class="col-md-5-1">
															<select id="selCustomizeTemp" name="selCustomizeTemp" style="margin-top: 0px;" class="col-md-11-1 form-control input-SmallText" disabled>
															<option value="0">NewTemplate</option>
															</select> <input type="hidden" name="idTempMast" value="0" id="idTempMast">
															</div>
															
														</div>
														
															<div class="col-md-5-1">
															
															<div class="col-md-10-1">
																	 <button type="button"
																	class="btn btn-xs btn-warning pull-right" data-toggle="tooltip"
																	title="Print "
																	onclick="printOTNotes('withHdr')">
																	Print(H/F)
																	</button> 
																	</div>
																	
																	<div class="col-md-2-1">
																	 <button type="button"
																	class="btn btn-xs btn-warning pull-right" data-toggle="tooltip"
																	title="Print "
																	onclick="printOTNotes('withoutHdr')">
																	Print
																	</button> 
																	</div>
															
															</div>
														</div>
														<div class="panel panel-default col-md-12-1"
															style="margin-top: 0px;">
															<div class="panel-body">
																<div id="move" style="width: 100%; display: none;"
																	class="ui-resizable ui-draggable ui-draggable-handle">
																	<textarea class="ckeditor ui-widget-content "
																		name="editor1" title="Rich Text Editor, editor1"
																		placeholder="Content" id="editor1" disabled="disabled" ></textarea>
																</div>
																<div class="divide-10"></div>
																<div class="tab-content"></div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<!-- End Code for #OTNotes GUI -->
											
											 <div ID="Operation" class="tab-pane fade active in">
											 <div class="divide-20"></div>
												<div class='col-sm-12-1' style="padding-left: 2%;">
													<div class='col-sm-8-1'>
														<div class='col-sm-12-1'>
															<div class="divide-10"></div>
															<div class='col-sm-6-1'>
																<div class="form-group Remove-Padding col-md-12-1"
																	style="margin-top: 9px;">
																	<div class="form-group Remove-Padding col-md-5-1"
																		style="margin-top: 9px;">
																		<label class="TextFont">Procedure Type</label> <select
																			name="" id="selOTtype"
																			class="form-control input-SmallText TextFont" readonly="true">
																			<option value="0">-SELECT-</option>
																		</select>
																	</div>
																	<div class="form-group Remove-Padding col-md-1-1"
																		style="margin-top: 9px;"></div>
																	<div class="form-group Remove-Padding col-md-5-1"
																		style="margin-top: 9px;">
																		<label class="TextFont">Procedure Group</label> <select
																			name="" id="department" onchange="getOperationName()"
																			class="form-control input-SmallText TextFont" readonly="true">
																			<option value="0">-SELECT-</option>
																		</select>
																	</div>
																</div>
																<div class="form-group Remove-Padding col-md-12-1"
																	style="margin-top: 9px;">
																	<div class="form-group Remove-Padding col-md-11-1"
																		style="margin-top: 0px;">
																		<label class="TextFont">Procedure Name</label> <select
																			name="" id="selOTName"
																			class="form-control input-SmallText TextFont" readonly="true">
																			<option value="0">-SELECT-</option>
																		</select>
																	</div>
																	
																</div>

																<div class="form-group Remove-Padding col-md-12-1"
																	style="margin-top: 9px;">
																	<div class="form-group Remove-Padding col-md-11-1"
																		style="margin-top: 2px; padding-right: 2%;">
																		<label class="TextFont">Scheduled Procedure
																		
																		</label> <select size="4" class="col-md-12-1"
																			style="margin-top: 6px;" multiple="multiple"
																			id="scheduledProcedure" readonly="true">
																		</select>
																	</div>
																</div>
															</div>
															<div class='col-sm-6-1'>
																<div class="form-group Remove-Padding col-md-12-1"
																	style="margin-top: 9px;">
																	<div class="form-group Remove-Padding col-md-6-1"
																		style="margin-top: 9px; padding-right: 5%;">
																		<label class="TextFont">OT Name</label> <select
																			onchange="setOtNameOfPopup()" name="" id="otName"
																			class="form-control input-SmallText TextFont" readonly="true">
																		</select>
																	</div>

																	<div class="form-group Remove-Padding col-md-5-1"
																		style="margin-top: 9px;">
																		<label class="TextFont">Date</label> <input
																			type="text" placeholder=" " readonly="readonly"
																			class="form-control input-SmallText col-md-12-1 margin-1"
																			id="popup_container2"
																			onclick="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)" readonly="readonly">
																	</div>
																</div>
																<div class="form-group Remove-Padding col-md-12-1"
																	style="margin-top: 9px;">
																	<div class="divide-10"></div>
																	<div class="form-group Remove-Padding col-md-5-1">
																		<label class="TextFont">Start Time</label> <input
																			type='text' id='txtStartTime' name='txtStartTime'
																			readonly="readonly"
																			class="form-control input-SmallText col-md-12-1 margin-1"
																			onclick="click1()" readonly="readonly"/>
																	</div>
																	<div class="form-group Remove-Padding col-md-1-1"
																		style="margin-top: 9px;"></div>
																	<div class="form-group Remove-Padding col-md-5-1">
																		<label class="TextFont">End Time</label> <input
																			type='text' id='txtEndTime' name='txtEndTime'
																			readonly="readonly"
																			class="form-control input-SmallText col-md-12-1 margin-1"
																			onclick="click1()" readonly="readonly"/>
																	</div>
																</div>

																<div class="form-group Remove-Padding col-md-12-1"
																	style="margin-top: 11px;">

																	<div class="form-group Remove-Padding col-md-6-1"
																		style="margin-top: 2px; padding-right: 7%;">
																		<label class="TextFont">Anaes.Charge Type</label> <select
																			id='txtchargetype1' name='txtchargetype'
																			style='width: 100%;'
																			class="form-control input-SmallText TextFont" readonly="true">
																			<option value="ASAIV">ASA IV</option>
																			<option value="Normal">Normal</option>
																			<option value="StandBy">StandBy</option>
																		</select>
																	</div>

																	<div class="form-group Remove-Padding col-md-6-1"
																		style="margin-top: 2px; padding-right: 7%;">
																		<label class="TextFont">Anaesthesia Type</label> <select
																			name="" id="anesthesiaType"
																			class="form-control input-SmallText TextFont" readonly="true">
																			<option value="0">-SELECT-</option>
																			<option value="1">General</option>
																			<option value="2">Regional</option>
																			<option value="3">Local</option>
																			<option value="4">Spinel</option>
																			<option value="5">Epidural</option>
																			<option value="6">Brachcal block</option>
																			<option value="7">Block</option>
																			<option value="8">Sedetion</option>
																			<option value="9">Ankull Block</option>
																			<option value="10">Ring Block</option>
																			<option value="11">Femonel block</option>
																			<option value="12">Axilleny Block</option>
																			<option value="13">Epidural analgesia</option>
																			<option value="14">Peripheral nerve block</option>
																			<option value="15">Heavy sedation or
																				monitored</option>
																			<option value="16">Spinal with Epidural with
																				General</option>
																			<option value="17">Spinal with Epidural with
																				Femonel block</option>
																		</select>
																	</div>

																</div>
																<div class="form-group Remove-Padding col-md-12-1"
																	style="margin-top: 1px;">
																	<div class="form-group Remove-Padding col-md-3-1"
																		style="margin-top: 9px;">
																		<label class="TextFont">Infection</label> <input
																			type="checkbox" id="infectFlag" readonly="readonly" disabled/>
																	</div>
																	<div class="form-group Remove-Padding col-md-3-1"
																		style="margin-top: 9px;">
																		<label class="TextFont">Critical</label> <input
																			type="checkbox" id="criticalFlag" readonly="readonly" disabled/>
																	</div>
																	<div class="form-group Remove-Padding col-md-4-1"
																		style="margin-top: 9px;">
																		<label class="TextFont">Operation Charge</label> <input
																			type='checkbox' id='opCharge1' name='opCharge' readonly="readonly" disabled/>
																	</div>
																</div>
															</div>
														</div>

														<div class='col-sm-12-1'>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 9px;">
																<div class="form-group Remove-Padding col-md-6-1"
																	style="margin-top: 9px;">
																	<label class="TextFont">Surgery Team</label> <select
																		name="" id="teanNameList" onchange="setTeamDoctors()"
																		class="form-control input-SmallText TextFont" readonly="true">
																		<option value="0">-SELECT-</option>
																	</select>
																</div>
															</div>
															
															<div class="box border  col-md-12-1"
																style="max-height: 220px; margin-top: 10px; max-width: 720px;">
																<div class="form-group box-body">
																	
																	<div class="col-md-12-1"
																		style="margin-top: 0px; background: #FFE0C2; border: 1px solid orange; padding-left: 3px;">
																		<label class="TextFont"
																			style="padding-top: 5px; padding-bottom: 5px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;">
																		
																		</label> <label class="TextFont"
																			style="padding-top: 5px; padding-bottom: 5px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																			onclick="removeDoctorNameFromList()"> 
																		</label>

																	</div>
																	<div class="divide-20"></div>
																	<div class="col-md-12-1">
																		<table
																			class="table table-hover table-bordered"
																			id="" style='margin-top: 9px;'>
																			<thead>
																				<tr>
																					<th class='center'
																						style="padding-right: 13px; padding-left: 14px; width:4%;">
																						<div>#</div>
																					</th>
																					<th class='center' style="width:25%;"><div>Doctor Name</div></th>
																					<th class='center' style="width:14.7%;"><div>User Type</div></th>
																					<th class='center' style="width:15%;"><div>Speciality</div></th>
																					<th class='center' style="width:20%;"><div>Department</div></th>
																					<th class='center' style="width:18%;"><div>Doctor Type</div></th>
																					<th class='center' style="width:6%;"><div>Action</div></th>
																				</tr>
																			</thead>
																			<tbody id="teamMembersList"
																				style="max-height: 122px; overflow-y: auto;">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
															
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: -15px;">
																<div class="form-group Remove-Padding col-md-6-1"
																	style="margin-top: 0px;">
																	<div class="form-group Remove-Padding col-md-5-1"
																		style="margin-top: 2px; padding-right: 0%;">
																		<label class="TextFont">OHR</label> <input type='text'
																			id='ohr1' name='ohr'
																			class="form-control input-SmallText TextFont" readonly="readonly"/>
																	</div>
																	<div class="form-group Remove-Padding col-md-1-1"
																		style="margin-top: 2px;"></div>
																	<div class="form-group Remove-Padding col-md-5-1"
																		style="margin-top: 2px; padding-right: 0%;">
																		<label class="TextFont">CHR</label> <input type='text'
																			id='chr1' name='chr'
																			class="form-control input-SmallText TextFont" readonly="readonly"/>
																	</div>
																</div>

																<div class="form-group Remove-Padding col-md-6-1"
																	style="margin-top: 0px;">
																	<div class="form-group Remove-Padding col-md-5-1"
																		style="margin-top: 2px; padding-right: 0%;">
																		<label class="TextFont">OBP</label> <input type='text'
																			id='obp1' name='obp'
																			class="form-control input-SmallText TextFont" readonly="readonly"/>
																	</div>
																	<div class="form-group Remove-Padding col-md-1-1"
																		style="margin-top: 2px;"></div>
																	<div class="form-group Remove-Padding col-md-5-1"
																		style="margin-top: 2px; padding-right: 0%;">
																		<label class="TextFont">CBP</label> <input type='text'
																			id='cbp1' name='cbp'
																			class="form-control input-SmallText TextFont" readonly="readonly"/>
																	</div>
																</div>
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 9px;">
																<div class="col-md-6-1">
																	<div class="form-group Remove-Padding col-md-5-1"
																		style="margin-top: 9px; padding-right: 0%;">
																		<label class="TextFont">Operation No</label> <input
																			type='text' id='txtCathNo1' name='txtCathNo'
																			readonly="readonly"
																			class="form-control input-SmallText TextFont" readonly="readonly"/>
																	</div>
																	<div class="form-group Remove-Padding col-md-1-1"
																		style="margin-top: 9px;"></div>
																	<div class="form-group Remove-Padding col-md-5-1"
																		style="margin-top: 9px; padding-right: 0%;">
																		<label class="TextFont">Suggested By</label> <input
																			type='text' id='suggestedBy' name='suggestedBy'
																			readonly="readonly"
																			class="form-control input-SmallText TextFont" readonly="readonly"/>
																	</div>
																</div>
																<div class="col-md-6-1">
																	<div class="form-group Remove-Padding col-md-5-1"
																		style="margin-top: 9px;">
																		<label class="TextFont">Instruments
																			Charges(%):</label> <input type='text' id='surInstrument1'
																			value="0" style=''
																			class="form-control input-SmallText col-md-12-1 margin-1" readonly="readonly"/>
																	</div>
																	<div style="margin-top: 9px;" class="col-md-1-1">
																	</div>
																	<div class="form-group Remove-Padding col-md-5-1"
																		style="margin-top: 9px;">
																		<label class="TextFont">Anaes.(one-on-one)</label> <select
																			id='txtRoute1' name='txtRoute' style='width: 100%;'
																			class="form-control input-SmallText TextFont" readonly="true">
																			<option value="Y">Y</option>
																			<option value="N">N</option>
																		</select>
																	</div>
																</div>
															</div>

														</div>
													</div>

													<div class='col-sm-4-1' style="display: none;">
														<div class="form-group Remove-Padding col-md-12-1"
															style="margin-top: 9px;">
															<div class="form-group Remove-Padding col-md-4-1"
																style="margin-top: 9px;">
																<label class="TextFont">Consumable Item</label> 
															</div>
														</div>
														<div class="form-group Remove-Padding col-md-12-1"
															style="margin-top: 0px;">
															<div class="form-group Remove-Padding col-md-10-1"
																style="margin-top: 0px;">
																<select id='txtEquipmetcreadonly1' multiple="multiple"
																	style="width: 100%;" size="5" readonly="true">
																</select>
															</div>
														</div>

														<div class="form-group Remove-Padding col-md-12-1"
															style="margin-top: 9px;">
															<div class="form-group Remove-Padding col-md-5-1"
																style="margin-top: 9px;">
																<label class="TextFont">Bed Side Procedures</label>
															</div>
														</div>
														<div class="form-group Remove-Padding col-md-12-1"
															style="margin-top: 0px;">

															<div class="form-group Remove-Padding col-md-10-1"
																style="margin-top: 9px;">
																<select id='txtEquipmetb1' multiple="multiple"
																	style="width: 100%;" size="5" readonly="true">
																</select>
															</div>
														</div>

														<div class="form-group Remove-Padding col-md-12-1"
															style="margin-top: 9px;">
															<div class="form-group Remove-Padding col-md-4-1"
																style="margin-top: 9px;">
																<label class="TextFont">Gases and Monitors</label>
															</div>
														</div>
														<div class="form-group Remove-Padding col-md-12-1"
															style="margin-top: 0px;">

															<div class="form-group Remove-Padding col-md-10-1"
																style="margin-top: 9px;">
																<select id='txtEquipmetg1' multiple="multiple"
																	style="width: 100%;" size="5" readonly="true">
																</select>
															</div>
														</div>

														<div class="form-group Remove-Padding col-md-12-1"
															style="margin-top: 9px;">
															<div class="form-group Remove-Padding col-md-6-1"
																style="margin-top: 9px;">
																<label class="TextFont">Instruments and
																	Equipments</label> 
															</div>
														</div>
														<div class="form-group Remove-Padding col-md-12-1"
															style="margin-top: 0px;">

															<div class="form-group Remove-Padding col-md-10-1"
																style="margin-top: 9px;">
																<select id='txtEquipmeti1' multiple="multiple"
																	style="width: 100%;" size="5" readonly="true">
																</select>
															</div>
														</div>
													</div>
												</div>
											</div>
								<!-- Start Code for CPOE GUI -->
											<div id="CPOE" class="tab-pane fade in">
  <div id="row1" class="col-md-12-1" style="padding-top: 0px;">
    <div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 5px;">
      <div class="tab-content col-md-10-1" style="margin-top: 0px;">
        <div id="Investigation" class="tab-pane fade active in col-md-12-1">
          <div id="Investigation_row_1" class="col-sm-12-1" style="margin-top: 40px;">
            <div class="col-sm-4-1"><div class="form-group Remove-Padding col-sm-12-1" style="padding-left:5%">
              <label class="TextFont" for="exampleInputEmail1">Test Name </label>
              <div id="divInvestigationTestName">
              <input type="text" placeholder="Test Name" id="txtautoserviceName" class="typeahead form-control" style="border: 1px solid orange;" onkeyup="setoperationservices(this.id,'cpoe')"></div>
              </div><input type="hidden" id="charges1" value="0"> <input type="hidden" id="investigationtestId" value="0"><input type="hidden" id="idTestSlave" value="0"></div>
              
         <div style="margin-top: -11px;" class="col-sm-1-1">
                 <div style="padding-left:5%" class="form-group Remove-Padding col-sm-12-1">
                <label for="exampleInputEmail1" class="TextFont">Rate</label>
                <input type="text" value="0" readonly="readonly" style=" border: 1px solid sliver;" class=" form-control" id="OtRate" placeholder="Rate"></div></div>
             <div style="margin-top: -11px;" class="col-sm-1-1">
                 <div style="padding-left:5%" class="form-group Remove-Padding col-sm-12-1">
                <label for="exampleInputEmail1" class="TextFont">Qty </label>
                <input type="text" value="1" onkeypress="return validatePrice(event)" onkeyup="calculateTotalCpoe()" style=" border: 1px solid sliver;" class=" form-control" id="OtQty"></div></div> 
                
                
               <div style="margin-top: -11px;" class="col-sm-1-1">
                 <div style="padding-left:5%" class="form-group Remove-Padding col-sm-12-1">
                <label for="exampleInputEmail1" class="TextFont">Amount </label>
                <input type="text" value="1" readonly="readonly" style=" border: 1px solid sliver;" class=" form-control" id="OtAmt"></div></div> 
         
            
              <div class="col-sm-2-1" style="margin-top:-11px;padding-left:5%"><div class="form-group Remove-Padding col-sm-12-1">
                <label class="TextFont" for="exampleInputEmail1">Doctor</label>
                <select id="doctor2" class="form-control input-SmallText" disabled>
                  <option selected="selected" value="0">Select</option></select></div></div>
                  
                 
                  
                  <!-- <div class="col-sm-2-1" style="margin-top:-11px">
                  <div class="form-group Remove-Padding col-sm-12-1">
                  <label class="TextFont" for="exampleInputEmail1">Hospital</label>
                  <select id="hospital2" class="form-control input-SmallText">
                  <option selected="selected" value="0">Select</option></select>
                  </div></div> -->
                  <div class="col-sm-2-1" style="margin-top:-11px">
                  <div class="form-group Remove-Padding col-sm-12-1">
                  <label class="TextFont">Unit</label> 
                  <select id="uId" class="form-control input-SmallText" onchange="cleartexrfiled();" disabled>
                  </select><input type="hidden" id="allunitid">
                  </div></div>
                  </div>
                  <div id="Investigation_row2" class="col-sm-12-1" style="margin-top: 10px;">
                  <div style="margin-top: 2%;" class="col-sm-6 select2-container select2-container-multi ">
                  <ul style="overflow-y: scroll;" class="select2-choices" id="dynamicItem"></ul>
                  <input type="hidden" value="0" id="subserviceid">
                  <input type="hidden" value="0" id="chargesubservice">
                  <input type="hidden" value="0" id="serviceid"></div>
                  <div id="col9" class="col-sm-2-1" style="margin-top: 10px;padding-left:2%">
                  <div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>
                  <label class="TextFont" for="exampleInputEmail1">Instructions </label>
                   <input type="text" placeholder="Instructions" class="form-control input-SmallText" id="cpoeIns">
                   </div></div><div id="col10" class="col-sm-2-1" style="margin-top: 10px;">
                   <div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>
                   <label class="TextFont" for="exampleInputEmail1">Clinical Notes </label>
                   <input type="text" placeholder="Clinical Notes" class="form-control input-SmallText" id="cpoeClinicalNotes"></div>
                   </div><div id="col11" class="col-sm-0-1" style="margin-top: 30px;padding-left:5px">
                   <input type="checkbox" id="cpoeUrgent" disabled> 
                   <label style="margin-top: 0px;" class="TextFont Remove-Padding"> Urgent </label>
                   <i> </i>
                   </div></div><input type="hidden" id="InvestigationQueryType" value="insert"> <input type="hidden" id="billSlaveID" value="0"> <input type="hidden" id="investigationSlaveID" value="0"></div>
                   </div></div>
                   </div><div id="row2" class="col-sm-12-1" style="margin-top: 28px">
                   <div class="form-group col-md-12-1" style="margin: 2px;">
                   <div class="col-md-12-1" style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
                   <label onclick="editCPOE_Test()" id="editCPOE_TestLabel" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
                   <i class="fa fa-edit"></i> Edit</label> <label id="" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" onclick="deleteCpoeServ('multiple','OT')">
                   <i class="fa fa-trash-o"></i> Multiple Delete </label></div>
                   <div class="col-sm-12-1" style="margin-top: 0px;">
                   <table class="table table-condensed "><thead>
                   <tr><th class="col-md-1-1 center" style="height: 21.5px;">
                   <div class="TextFont">#</div></th>
                   <th class="col-md-2-1 center" style="height: 21.5px; padding-left: 5px;">
                   <div class="TextFont">Particulars/Details</div></th>
                   <th class="col-md-2-1 center" style="height: 21.5px; padding-left: 0px;">
                   <div class="TextFont">Date</div></th>
                   <th class="col-md-2-1 center" style="height: 21.5px; padding-left: 0px;">
                   <div class="TextFont">Consultant Name</div></th>
                   <th class="col-md-3-1 center" style="height: 21.5px; padding-right: 23px;">
                   <div class="TextFont">Type</div></th>
                   <th class="col-md-1-1 center" style="height: 21.5px; padding-right: 29px;">
                   <div class="TextFont">Status</div></th>
                   <th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;">
                   <div class="TextFont">Action</div></th>
                   <th class="col-md-1-1 center" style="height: 21.5px; padding-right: 31px;">
                   <div class="TextFont">Delete</div></th></tr></thead></table>
                   <div id="flip-scroll" class="col-sm-12-1" style="overflow-y: scroll; height: 115px; maxheight: auto; margin-top: -21px;">
                   <table class="table table-striped table-condensed">
                   <tbody id="tcpoeservices"></tbody>
                   </table><input type="hidden" id="CPOErowCount" value="0">
                   </div></div> 
                   </div>
                   </div></div>
                   
                   
                  <!-- New OT CHARGES -->
                         
                         
                         	<div id="OTSERV" class="tab-pane fade in">
												<div id="row1" class="col-md-12-1" style="padding-top: 0px;">
													<div class="tabbable tabs-left col-md-12-1"
														style="margin-top: 0px; margin-left: 5px;">
														<div class="tab-content col-md-10-1"
															style="margin-top: 0px;">
															<div id="Investigation"
																class="tab-pane fade active in col-md-12-1">
																<div id="Investigation_row_1" class="col-sm-12-1"
																	style="margin-top: 40px;">
																	<div class="col-sm-4-1">
																		<div class="form-group  col-sm-12-1"
																			style="padding-left: 5%">
																			<label class="TextFont" for="exampleInputEmail1">
																				Name </label>
																			<div>
																				<input type="text" placeholder=" Name" id="txtOserv"
																					class="typeahead form-control"
																					style="border: 1px solid hsl;"
																					onkeyup="hallwiseOPchargeOT(this.id,'OC')">
																			</div>
																		</div>
																		<input type="hidden" id="chargesOS" value="0">
																		<input type="hidden" id="investigationtestId"
																			value="0"><input type="hidden"
																			id="idTestSlave" value="0">
																	</div>
																	<div style="margin-top: -11px;" class="col-sm-2-1">
																		<div style="padding-left: 5%"
																			class="form-group  col-sm-12-1">
																			<label for="exampleInputEmail1" class="TextFont">Amount
																			</label> <input type="text" value="1"
																				style="border: 1px solid sliver;"
																				class=" form-control" id="txtOservamt">
																		</div>
																	</div>


																	<div class="col-sm-2-1"
																		style="margin-top: -11px; margin-left: 20px">
																		<div class="form-group  col-sm-12-1">
																			<label class="TextFont" for="exampleInputEmail1">Doctor</label>
																			<div class="" style="margin-top: 9px">
																				<select id="doctorNameOT" value='null'
																					name="doctorNameOT" class="form-control col-md-12"
																					onchange="" disabled>
																				</select>
																			</div>
																		</div>
																	</div>

																	<div class="col-sm-2-1" style="margin-top: -11px">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<label class="TextFont" for="exampleInputEmail1">Operation
																				Name</label> <select id="operationListId"
																				class="form-control input-SmallText" onchange=""
																				disabled>
																				<!--  <option selected="selected" value="0">Select</option></select> -->
																			</select>
																		</div>
																	</div>
																	<!-- <div class="col-sm-2-1" style="margin-top:-11px">
                  <div class="form-group Remove-Padding col-sm-12-1">
                  <label class="TextFont" for="exampleInputEmail1">Hospital</label>
                  <select id="hospital2" class="form-control input-SmallText">
                  <option selected="selected" value="0">Select</option></select>
                  </div></div> -->
																	<div class="col-sm-2-1" style="margin-top: -11px">
																		<div class="form-group Remove-Padding col-sm-12-1"
																			style="margin-left: 205px; margin-top: -30px;">
																			<label class="TextFont">Unit</label> <select
																				id="unlId" class="form-control input-SmallText"
																				onchange="cleartexrfiled();" disabled>
																			</select>
																			<!-- <input type="hidden" id="allunitid"> -->
																		</div>
																	</div>
																</div>
																<div id="Investigation_row2" class="col-sm-12-1"
																	style="margin-top: 10px;">
																	<div style="margin-top: 2%;"
																		class="col-sm-6 select2-container select2-container-multi ">
																		<ul style="overflow-y: scroll;"
																			class="select2-choices" id="dynamicItemos"></ul>
																		<input type="hidden" value="0" id="subserviceidOS">
																		<input type="hidden" value="0" id="chargesubserviceOS">
																		<input type="hidden" value="0" id="serviceidOS">
																		<input type="hidden" value="0" id="billidserviceOS">
																	</div>
																	<div id="col9" class="col-sm-2-1"
																		style="margin-top: 10px; padding-left: 2%">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																			<label class="TextFont" for="exampleInputEmail1">Instructions
																			</label> <input type="text" placeholder="Instructions"
																				class="form-control input-SmallText" id="cpoeIns">
																		</div>
																	</div>
																	<div id="col10" class="col-sm-2-1"
																		style="margin-top: 10px;">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																			<label class="TextFont" for="exampleInputEmail1">Clinical
																				Notes </label> <input type="text"
																				placeholder="Clinical Notes"
																				class="form-control input-SmallText"
																				id="cpoeClinicalNotes">
																		</div>
																	</div>
																	<div id="col11" class="col-sm-0-1"
																		style="margin-top: 30px; padding-left: 5px">
																		<input type="checkbox" id="cpoeUrgent" disabled>
																		<label style="margin-top: 0px;"
																			class="TextFont Remove-Padding"> Urgent </label> <i><input
																			type="button"
																			class="btn btn-xs btn-success editUserAccess"
																			onclick="saveOTCpoe('CPOE')" value="Save"
																			style="margin-left: 6%"> </i>
																	</div>
																</div>
																<input type="hidden" id="InvestigationQueryType"
																	value="insert"> <input type="hidden"
																	id="billSlaveID" value="0"> <input
																	type="hidden" id="investigationSlaveID" value="0">
															</div>
														</div>
													</div>
												</div>
												<div id="row2" class="col-sm-12-1" style="margin-top: 28px">
													<div class="form-group col-md-12-1" style="margin: 2px;">
														<div class="col-md-12-1"
															style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
															<label onclick="editCPOE_Test()" id="editCPOE_TestLabel"
																style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
																<i class="fa fa-edit"></i> Edit
															</label>
															<!-- <label id="" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" onclick="deleteCpoeServ('multiple','OT')">
                   <i class="fa fa-trash-o"></i> Multiple Delete </label> -->
														</div>
														<div class="col-sm-12-1" style="margin-top: 0px;">
															<table class="table table-condensed ">
																<thead>
																	<tr>
																		<th style="height: 21.5px;" class="col-md-1-1 center"><div
																				class="TextFont">Select</div></th>

																		<th style="height: 21.5px;" class="col-md-1-1 center"><div
																				class="TextFont">#</div></th>

																		<th style="height: 21.5px; padding-right: 13px;"
																			class="col-md-1-1 center"><div class="TextFont">Consultant
																				Name</div></th>

																		<th style="height: 21.5px; padding-right: 13px;"
																			class="col-md-1-1 center"><div class="TextFont">Operation
																				Name</div></th>

																		<th style="height: 21.5px; padding-right: 13px;"
																			class="col-md-1-1 center"><div class="TextFont">Particulars/Details</div></th>
																		<th style="height: 21.5px;" class="col-md-1-1 center"><div
																				class="TextFont">Date</div></th>
																		<th style="height: 21.5px; padding-right: 0px;"
																			class="col-md-1-1 center"><div class="TextFont">Status</div></th>
																		<th style="height: 21.5px; padding-left: 0px;"
																			class="col-md-1-1 center">
																			<div class="TextFont">Edit</div>
																		</th>
																		<th style="height: 21.5px;"
																			class="numeric col-md-1-1 center"><div
																				class="TextFont">Delete</div></th>
																	</tr>
																</thead>
															</table>
															<div id="flip-scroll" class="col-sm-12-1"
																style="overflow-y: scroll; height: 115px; maxheight: auto; margin-top: -21px;">
																<table class="table table-striped table-condensed">
																	<tbody id="tOTcharge"></tbody>
																</table>
																<input type="hidden" id="CPOErowCount" value="0">
															</div>
														</div>
													</div>
												</div>
											</div>
                   
                         
                    <!-- New OTCHARGES -->
                   
                   
                   <!-- OT CHARGES -->
                   
                   <div id="OTCHARGES" class="tab-pane fade in">
                   <div class="col-md-4">
                   
														<div class="row">
															<!-- ---------Touheed Plugin Multi select Plugin-------------- -->
															<label class="TextFont" style="margin-bottom: 4px;margin-top:7px;margin-left:18px">Select Combination
																Services </label>
															<div id="" class="form-group Remove-Padding col-md-12-1"
																style="margin-left: 0; height: 80px;margin-top:1px ;  width: 98%;">

																<div class="divide-20"></div>

																<div class="form-group">

																	<div class="col-md-8">
																		<select name="listmstrcom" id="listmstr_select_otcharges"
																			style="width: 200px"
																			onclick="setDyanamicDivot('dynamicItemcom',this.id,'OTCHARG')">
																			<option id="firstElmtcom" value="0">--- Select Services
																				---</option>

																		</select>
																	</div>
																</div>

																<div
																	class="col-md-12 select2-container select2-container-multi "
																	style="margin-top: -1%;">
																	<ul id="dynamicItemcom" class="select2-choices"
																		style="overflow-y: scroll;">

																	</ul>
																	
																</div>
                                                      
															</div>
														<!-- 	---------Touheed Plugin Multi select Plugin-------------- -->
                                                  
                                                   
														</div>
														<div class="divide-20"></div>
													</div>
													
													 <div class="col-md-4">
                   
														<div class="row">
															<!-- ---------Touheed Plugin Multi select Plugin-------------- -->
															<label class="TextFont" style="margin-bottom: 4px;margin-top:7px;margin-left:18px">Select Combination
																Services </label>
															<div id="" class="form-group Remove-Padding col-md-12-1"
																style="margin-left: 0; height: 80px;margin-top:1px ;  width: 98%;">

																<div class="divide-20"></div>

																<div class="form-group">

																	<div class="col-md-8">
																		<select name="listmstrcom2" id="listmstr_select_otcharges2"
																			style="width: 200px"
																			onclick="setDyanamicDivot('dynamicItemcom2',this.id,'OTCHARG')">
																			<option id="firstElmtcom" value="0">--- Select Services
																				---</option>

																		</select>
																	</div>
																</div>

																<div
																	class="col-md-12 select2-container select2-container-multi "
																	style="margin-top: -1%;">
																	<ul id="dynamicItemcom2" class="select2-choices"
																		style="overflow-y: scroll;">

																	</ul>
																	
																</div>
                                                      
															</div>
														<!-- 	---------Touheed Plugin Multi select Plugin-------------- -->
                                                  
                                                   
														</div>
														<div class="divide-20"></div>
													</div>
													
													<div class="col-md-4" style="margin-top:48px">
													<button id="bOTC" type="button" class="btn btn-xs btn-info" onclick="Freez('OT','OTCHARG')">Freez</button>
													</div>
                   
                   <div id="divLine3" class=" box border col-md-12"
												style="margin-left: 0%; margin-top: -1%;">
												<form class="form-horizontal col-md-12"
													style="margin-top: 0%;">
													<div class="divide-20"></div>
													<div class="col-md-6">
														<div class="row">

															<div class="form-group col-md-12-1">
																<div class="form-group col-md-11-1"
																	style="margin-left: -1%; margin-top: -1%; width: 98%; height: 267px;">
																	<div class="box border primary">
																		<div class="box-title">
																			<h4 id="">
																				<i class="fa fa-table"></i>Services
																			</h4>
																		</div>

																		<div class="box-body"
																			style="height: 300px; width: 100%;">
																			<div class='col-sm-12-1' style="margin-top: 0%;">
																				<!-- search configuration -->

																				<div style="" class="col-md-1-1">
																					<label class="TextFont"
																						style="margin-left: 1%; margin-top: 3%; margin-right: 12px; font-size: 11px;">Search
																						By:</label>
																				</div>

																				<div
																					style="margin-top: 0px; width: 77%; margin-right: 2px;"
																					class="col-md-2-1 TextFont" id="divbyName">
																					<input class="col-md-8-1" name="byName" type="text"
																						onkeyup="setAutoCompleteForConfiguration(this.id,'search')"
																						class="typeahead form-control input-SmallText "
																						id="byName" style="margin-left: 50px;" />
																				</div>

																				<div class="col-md-1-1" style="text-align: center;">
																					<input type="button" value="search"
																						class="btn btn-xs btn-primary" id="searchCharges"
																						onclick="setAutoCompleteForConfiguration(this.id,'search')" />
																				</div>

																				<!-- search configuration -->

																				<table class='table table-bordered'
																					style='width: 100%;'>
																					<thead class='cf'>
																						<tr>

																							<th class='col-md-5-1 center'
																								style='height: 21.5px;'><div
																									class='TextFont'>Service Name</div></th>
																							<th class='col-md-5-1 center'
																								style='height: 21.5px;'><div
																									class='TextFont'>Charges</div></th>
																							<th class='col-md-2-1 center'
																								style='height: 21.5px;'><input
																								type='button' value='>>'
																								onclick='addAllTRtoRight()'></th>

																						</tr>
																					</thead>

																				</table>

																			</div>

																			<div class='col-sm-12-1'
																				style='height: 220px; width: 100%; overflow-y: scroll; border: 1px solid #ddd; margin-top: -21px;'>

																				<table
																					class='table table-striped table-condensed cf'>
																					<tbody id="leftDiv">



																					</tbody>
																				</table>
																			</div>
																		</div>
																	</div>
																</div>
															</div>

														</div>
														<div class="divide-20"></div>
													</div>

													<div class="col-md-6">
														<div class="row">
															<div class="form-group col-md-12-1"
																style="margin-left: 1%; margin-top: 0%; margin-right: 1%; margin-bottom: 1%;">
																
																<div class="box border blue">
																	<div class="box-title">
																		<h4 id="">
																			<i class="fa fa-table"></i>Charges Configuration

																		</h4>
																		<div class="pull-right"></div>
																	</div>
																	<div class="box-body" style="height: 297px;">
																		<div class='col-sm-12-1' style="margin-top: 1%;">
																		
																		<div class="col-md-11-1 center">
																			<label style="margin-top: 6px; margin-left:46px;">Total
																				Charges</label> <input id="totalcharges" type="text"
																				maxlength="200" name="toatalCharges"
																				style="width: 43%; margin-top: -6px; margin-left: 32px;" value="0">
																				
																		<input type="hidden" id="bidipdoc" value="0">		
																		</div>
																			<table class='table table-bordered'
																				style='width: 100%;'>
																				<thead class='cf'>
																					<tr>

																						<th class='col-md-3-1 center'
																							style='height: 21.5px;'><div
																								class='TextFont'>Service Name</div></th>

																						<th class='col-md-3-1 center'
																							style='height: 21.5px;'><div
																								class='TextFont'>Pay</div></th>
																								<th class='col-md-3-1 center'
																							style='height: 21.5px;'><div
																								class='TextFont'>C-Pay</div></th>
																							<th class='col-md-2-1 center'
																								style='height: 21.5px;'></th>
																								<!-- <input
																								type='button' value='<<'
																								onclick='addAllTRtoLeft()'> -->
																					</tr>
																				</thead>
																			</table>
																		</div>

																		<div class='col-sm-12-1'
																			style='height: 234px; overflow-y: scroll; border: 1px solid #ddd; margin-top: -21px;'>

																			<table class='table table-striped table-condensed cf'>
																				<tbody id="rightDiv" class="rightDivClass">



																				</tbody>
																			</table>
																		</div>
																		<!-- <div class="col-md-12-1 center">
																			<label style="margin-top: 28px;">Total
																				Charges</label> <input id="totalcharges" type="text"
																				maxlength="200" name="toatalCharges"
																				style="width: 100%; margin-top: -3px;" value="0">
																		</div> -->
																	</div>
																</div>
															</div>
														</div>
													</div>

												</form>
											</div>
                   </div>
                   
                   <!--OTDRUG  -->
                   
                             <div id="OTDRUG" class="tab-pane fade in">
  <div id="row1" class="col-md-12-1" style="padding-top: 0px;">
    <div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 5px;">
      <div class="tab-content col-md-10-1" style="margin-top: 0px;">
        <div id="Investigation" class="tab-pane fade active in col-md-12-1">
          <div id="Investigation_row_1" class="col-sm-12-1" style="margin-top: 40px;">
            <div class="col-sm-4-1"><div class="form-group Remove-Padding col-sm-12-1" style="padding-left:5%">
              <label class="TextFont" for="exampleInputEmail1">Product Name </label>
              <div id="divInvestigationTestName">
              <input type="text" placeholder="Product Name" id="txtautoservicePharma" class="typeahead form-control" style="border: 1px solid orange;" onkeypress="return setValuesToAutocompleteOT(this.id)" >
             
             
<!--              <input id="txtautoservicePharma" class="typehead form-control input-SmallText" type="text" required="" onkeypress="return setValuesToAutocomplete(event)" autocomplete="off" autofocus="autofocus" tabindex="1" placeholder="Product" name="txtProductName" >
 -->          <input type="hidden" value="0" id="textBhVat">
              <input type="hidden" value="0" id="txtAQty">
              <input type="hidden" value="0" id="txtExpiry"><!--new filed pharma expdate  -->    
              <input type="hidden" value="0" id="textBatch"> <!--new filed pharma batchcode  -->   
              <input type="hidden" value="0" id="bathid"> <!--new filed pharma bathid  -->   
              <input type="hidden" value="0" id="serIDPharma">
               <input type="hidden" value="0" id="billidPharma">
              </div>
              </div></div>
       <!--      <div class="col-sm-5-1" style="margin-left: 75px;">
              <div class="col-sm-3-1" style="padding-top: 15px;">
                <label class="TextFont" for="exampleInputEmail1">Select Reference</label></div>
              <div class="col-sm-4-1"><div class="form-group Remove-Padding col-sm-12-1">
                <label class="TextFont" for="exampleInputEmail1">Doctor</label>
                <select id="doctor2" class="form-control input-SmallText">
                  <option selected="selected" value="0">Select</option></select></div></div>
                  <div class="col-sm-4-1">
                  <div class="form-group Remove-Padding col-sm-12-1">
                  <label class="TextFont" for="exampleInputEmail1">Hospital</label>
                  <select id="hospital2" class="form-control input-SmallText">
                  <option selected="selected" value="0">Select</option></select>
                  </div></div></div> -->
                 <div  class="col-sm-1-1" style="margin-top: -11px;">
                 <div class="form-group Remove-Padding col-sm-12-1" style="padding-left:5%">
                <label class="TextFont" for="exampleInputEmail1">Rate</label>
                <input type="text" placeholder="Rate" id="pharmaRate" class=" form-control" style=" border: 1px solid sliver;" readonly="readonly" value="0"></div></div>
                <div  class="col-sm-1-1" style="margin-top: -11px;">
                 <div class="form-group Remove-Padding col-sm-12-1" style="padding-left:5%">
                <label class="TextFont" for="exampleInputEmail1">Qty </label>
                <input type="text"  id="pharmaQty" class=" form-control" style=" border: 1px solid sliver;" onkeyup="calculateTotalOT()" onkeypress="return validatePrice(event)" value="1"></div></div>
                   <div  class="col-sm-1-1" style="margin-top: -11px;">
                 <div class="form-group Remove-Padding col-sm-12-1" style="padding-left:5%">
                <label class="TextFont" for="exampleInputEmail1">Amount </label>
                <input type="text"  id="pharmaAmt" class=" form-control" style=" border: 1px solid sliver;" readonly="readonly" value="1"></div></div> 
                <div class="col-md-4">
														<div class="row" style="margin-top:-40px;margin-left:29px">
															<!-- ---------Touheed Plugin Multi select Plugin-------------- -->
															<label class="TextFont" style="margin-bottom: 0px;margin-top:21px;margin-left:18px">Select Combination
																Services </label>
															<div id="" class="form-group Remove-Padding col-md-12-1"
																style="margin-left: 0; height: 80px;margin-top:1px ;  width: 98%;">

																<div class="divide-20"></div>

																<div class="form-group">

																	<div class="col-md-8">
																		<select name="listmstrcom" id="listmstr_select_otdrugs"
																			style="width: 200px"
																			onclick="setDyanamicDivot('dynamicItemdrug',this.id,'OTDRUG')">
																			<option id="firstElmtcomdrug" value="0">--- Select Services
																				---</option>

																		</select>
																	</div>
																</div>

																<div
																	class="col-md-12 select2-container select2-container-multi "
																	style="margin-top: -1%;">
																	<ul id="dynamicItemdrug" class="select2-choices"
																		style="overflow-y: scroll;">

																	</ul>
																</div>

															</div>
														<!-- 	---------Touheed Plugin Multi select Plugin-------------- -->

														</div>
														<div class="divide-20"></div>
													</div>
                  
                  <!-- <div class="col-sm-2-1" style="margin-top:-1%;margin-left:190px">
                  <div class="form-group Remove-Padding col-sm-12-1">
                  <label class="TextFont">Unit</label> 
                  <select id="uIdOD" class="form-control input-SmallText" onchange="cleartexrfiled();">
                  </select><input type="hidden" id="allunitid">
                  </div></div> --></div>
                  <div id="Investigation_row2" class="col-sm-12-1" style="margin-top: -18px;">
                   <div id="col9" class="col-sm-2-1" style="margin-top: 10px;padding-left:2%">
                  <div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>
                  <label class="TextFont" for="exampleInputEmail1">Instructions </label>
                   <input type="text" placeholder="Instructions" class="form-control input-SmallText" id="cpoeIns">
                   </div></div><div id="col10" class="col-sm-2-1" style="margin-top: 10px;">
                   <div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>
                   <label class="TextFont" for="exampleInputEmail1">Clinical Notes </label>
                   <input type="text" placeholder="Clinical Notes" class="form-control input-SmallText" id="cpoeClinicalNotes"></div>
                   </div><div id="col11" class="col-sm-0-1" style="margin-top: 26px;px;padding-left:5px">
                   <input type="checkbox" id="cpoeUrgent" disabled> 
                   <label style="margin-top: 0px;" class="TextFont Remove-Padding"> Urgent </label>
                   <i>
                 </i>
                   </div></div><input type="hidden" id="InvestigationQueryType" value="insert"> <input type="hidden" id="billSlaveID" value="0"> <input type="hidden" id="investigationSlaveID" value="0"></div>
                   </div></div>
                   </div><div id="row2" class="col-sm-12-1" style="margin-top: 28px">
                   <div class="form-group col-md-12-1" style="margin: 2px;">
                   <div class="col-md-12-1" style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
                   <label onclick="editTestOD()" id="editCPOE_TestLabel" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
                   <i class="fa fa-edit"></i> Edit</label> <label id="" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" onclick="deletepharma('multiple','OTDRUG')">
                   <i class="fa fa-trash-o"></i> Multiple Delete </label></div>
                   <div class="col-sm-12-1" style="margin-top: 0px;">
                   
                   
                   
													<table class='table table-bordered table-condensed cf'
														style='width: 100%; margin-top: 10px;'
														id="doctorMasterPojo">
														<thead class='cf'>
															<tr>
																<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>#</div></th>
																<!-- <th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Charges ID</div></th> -->
																	<th class='col-md-1-1 center' style='height: 21.5px;padding-right: 13px;'><div
																		class='TextFont'>Particulars/Details</div></th>		
																<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Date</div></th>
															<th class="col-md-1-1 center" style="height: 21.5px; padding-right: 0px;">
                                                             <div class="TextFont">Status</div></th>
                                                             
                                                             <th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;">
                                                              <div class="TextFont">Edit</div></th>
															
																<th class='numeric col-md-1-1 center'
																	style='height: 21.5px;'><div class='TextFont'>Delete</div></th>
															</tr>
														</thead>
													</table> </div> 
                   		
				<div style="width: 55%; margin-left: 3%; float: left; height: 100%;"></div>
                <div class='col-sm-12-1'	style='margin-top: -21px; border: 1px solid #ddd; overflow-y: scroll; height: 180px;; max-height: auto;'>
				<table class='table table-striped table-condensed cf'>
				<tbody id="tcpoeservicesOD"></tbody>
				</table>
				</div>
				
                 </div>
                 </div></div>
                <!--OTDRUG  -->   
                   
             <!--        ot inventory -->
                   
                             <div id="OTInv" class="tab-pane fade in">
  <div id="row1" class="col-md-12-1" style="padding-top: 0px;">
    <div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 5px;">
      <div class="tab-content col-md-10-1" style="margin-top: 0px;">
        <div id="Investigation" class="tab-pane fade active in col-md-12-1">
          <div id="Investigation_row_1" class="col-sm-12-1" style="margin-top: 40px;">
            <div class="col-sm-4-1"><div class="form-group Remove-Padding col-sm-12-1" style="padding-left:5%">
              <label class="TextFont" for="exampleInputEmail1">Item Name </label>
              <div id="divInvestigationTestName">
              <input type="text" placeholder="Item Name" id="txtautoserviceOI" class="typeahead form-control" style="border: 1px solid orange;" onkeyup="fetchpharmaproductandinvclick(this.id,'OTINV')"></div>
              </div><input type="hidden" id="charges1" value="0"> 
              <input type="hidden" id="billdinv" value="0">
              <input type="hidden" id="serIDinv" value="0">
              <input type="hidden" id="mrnslaveId" value="0">
              </div>
           <!--  <div class="col-sm-5-1" style="margin-left: 75px;">
              <div class="col-sm-3-1" style="padding-top: 15px;">
                <label class="TextFont" for="exampleInputEmail1">Select Reference</label></div>
              <div class="col-sm-4-1"><div class="form-group Remove-Padding col-sm-12-1">
                <label class="TextFont" for="exampleInputEmail1">Doctor</label>
                <select id="doctor2" class="form-control input-SmallText">
                  <option selected="selected" value="0">Select</option></select></div></div>
                  <div class="col-sm-4-1">
                  <div class="form-group Remove-Padding col-sm-12-1">
                  <label class="TextFont" for="exampleInputEmail1">Hospital</label>
                  <select id="hospital2" class="form-control input-SmallText">
                  <option selected="selected" value="0">Select</option></select>
                  </div></div></div>
                  <div class="col-sm-2-1" style="margin-top:-1%;margin-left:190px">
                  <div class="form-group Remove-Padding col-sm-12-1">
                  <label class="TextFont">Unit</label> 
                  <select id="uIdOinv" class="form-control input-SmallText" onchange="cleartexrfiled();">
                  </select><input type="hidden" id="allunitid">
                  </div></div> -->
                  
                      <div  class="col-sm-1-1" style="margin-top: -11px;">
                 <div class="form-group Remove-Padding col-sm-12-1" style="padding-left:5%">
                <label class="TextFont" for="exampleInputEmail1">Rate</label>
                <input type="text" placeholder="Rate" id="InvRate" class=" form-control" style=" border: 1px solid sliver;" readonly="readonly" value="0"></div></div>
                <div  class="col-sm-1-1" style="margin-top: -11px;">
                 <div class="form-group Remove-Padding col-sm-12-1" style="padding-left:5%">
                <label class="TextFont" for="exampleInputEmail1">Qty </label>
                <input type="text"  id="InvQty" class=" form-control" style=" border: 1px solid sliver;" onkeyup="calculateTotalOINV()" onkeypress="return validatePrice(event)" value="1"></div>
                
                
                </div>
                <div  class="col-sm-1-1" style="margin-top: -11px;">
                 <div class="form-group Remove-Padding col-sm-12-1" style="padding-left:5%">
                <label class="TextFont" for="exampleInputEmail1">Available Qty </label>
                <input type="text"  id="InvAQty" class=" form-control" style=" border: 1px solid sliver;"  onkeypress="return validatePrice(event)" value="1"></div>
                
                
                </div>
                   <div  class="col-sm-1-1" style="margin-top: -11px;">
                 <div class="form-group Remove-Padding col-sm-12-1" style="padding-left:5%">
                <label class="TextFont" for="exampleInputEmail1">Amount </label>
                <input type="text"  id="InvAmt" class=" form-control" style=" border: 1px solid sliver;" readonly="readonly" value="0"></div></div> 
                <div class="col-md-4">
														<div class="row" style="margin-top:-40px;margin-left:29px">
															<!-- ---------Touheed Plugin Multi select Plugin-------------- -->
															<label class="TextFont" style="margin-bottom: 0px;margin-top:21px;margin-left:18px">Select Combination
																Services </label>
															<div id="" class="form-group Remove-Padding col-md-12-1"
																style="margin-left: 0; height: 80px;margin-top:1px ;  width: 98%;">

																<div class="divide-20"></div>

																<div class="form-group">

																	<div class="col-md-8">
																		<select name="listmstrcom" id="listmstr_select_otinv"
																			style="width: 200px"
																			onclick="setDyanamicDivot('dynamicItemINV',this.id,'OTINV')">
																			<option id="firstElmtcomdrug" value="0">--- Select Services
																				---</option>

																		</select>
																	</div>
																</div>

																<div
																	class="col-md-12 select2-container select2-container-multi "
																	style="margin-top: -1%;">
																	<ul id="dynamicItemINV" class="select2-choices"
																		style="overflow-y: scroll;">

																	</ul>
																</div>

															</div>
														<!-- 	---------Touheed Plugin Multi select Plugin-------------- -->

														</div>
														<div class="divide-20"></div>
													</div>
                  
                  </div>
                  <div id="Investigation_row2" class="col-sm-12-1" style="margin-top: 10px;">
                  
                  <div id="col9" class="col-sm-2-1" style="margin-top: 10px;padding-left:2%">
                  <div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>
                  <label class="TextFont" for="exampleInputEmail1">Instructions </label>
                   <input type="text" placeholder="Instructions" class="form-control input-SmallText" id="cpoeIns">
                   </div></div><div id="col10" class="col-sm-2-1" style="margin-top: 10px;">
                   <div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>
                   <label class="TextFont" for="exampleInputEmail1">Clinical Notes </label>
                   <input type="text" placeholder="Clinical Notes" class="form-control input-SmallText" id="cpoeClinicalNotes"></div>
                   </div><div id="col11" class="col-sm-0-1" style="margin-top: 30px;padding-left:5px">
                   <input type="checkbox" id="cpoeUrgent" disabled> 
                   <label style="margin-top: 0px;" class="TextFont Remove-Padding"> Urgent </label>
                 
                   </div></div><input type="hidden" id="InvestigationQueryType" value="insert"> <input type="hidden" id="billSlaveID" value="0"> <input type="hidden" id="investigationSlaveID" value="0"></div>
                   </div></div>
                   </div><div id="row2" class="col-sm-12-1" style="margin-top: 28px">
                   <div class="form-group col-md-12-1" style="margin: 2px;">
                   <div class="col-md-12-1" style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
                   <label onclick="editCPOE_Test()" id="editCPOE_TestLabel" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
                   <i class="fa fa-edit"></i> Edit</label> <label id="" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" onclick="deleteCpoeServ('multiple','OT')">
                   <i class="fa fa-trash-o"></i> Multiple Delete </label></div>
                   <div class="col-sm-12-1" style="margin-top: 0px;">
                  	<table class='table table-bordered table-condensed cf'
														style='width: 100%; margin-top: 10px;'
														id="doctorMasterPojo">
														<thead class='cf'>
															<tr>
																<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>#</div></th>
																<!-- <th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Charges ID</div></th> -->
																	<th class='col-md-1-1 center' style='height: 21.5px;padding-right: 13px;'><div
																		class='TextFont'>Particulars/Details</div></th>		
																<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Date</div></th>
															<th class="col-md-1-1 center" style="height: 21.5px; padding-right: 0px;">
                                                             <div class="TextFont">Status</div></th>
                                                             
                                                             <th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;">
                                                              <div class="TextFont">Edit</div></th>
															
																<th class='numeric col-md-1-1 center'
																	style='height: 21.5px;'><div class='TextFont'>Delete</div></th>
															</tr>
														</thead>
													</table></div> 
													
													
													
													<div style="width: 55%; margin-left: 3%; float: left; height: 100%;"></div>
                <div class='col-sm-12-1'	style='margin-top: -21px; border: 1px solid #ddd; overflow-y: scroll; height: 180px;; max-height: auto;'>
				<table class='table table-striped table-condensed cf'>
				<tbody id="tcpoeservicesOI"></tbody>
				</table>
				</div>
                   </div>
                   </div></div>
                   
                 <!--   end ot inventory  -->
                 
                 
                 <!-- Ot cath lab(Start) -->
                  <div id="cathLab" class="tab-pane fade in">
  <div id="row1" class="col-md-12-1" style="padding-top: 0px;">
    <div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 5px;">
      <div class="tab-content col-md-10-1" style="margin-top: 0px;">
        <div id="Investigation" class="tab-pane fade active in col-md-12-1">
          <div id="Investigation_row_1" class="col-sm-12-1" style="margin-top: 40px;">
            <div class="col-sm-4-1"><div class="form-group Remove-Padding col-sm-12-1" style="padding-left:5%">
              <label class="TextFont" for="exampleInputEmail1">Product Name </label>
              <div id="divInvestigationTestName">
              <input type="text" placeholder="Product Name" id="txtCath" class="typeahead form-control" style="border: 1px solid orange;" onkeypress="return setValuesToAutocompleteCath(event)">
              <input type="hidden" value="0" id="setIDPharma">
               <input type="hidden" value="0" id="billidcath">
              </div>
              </div></div>
       <!--      <div class="col-sm-5-1" style="margin-left: 75px;">
              <div class="col-sm-3-1" style="padding-top: 15px;">
                <label class="TextFont" for="exampleInputEmail1">Select Reference</label></div>
              <div class="col-sm-4-1"><div class="form-group Remove-Padding col-sm-12-1">
                <label class="TextFont" for="exampleInputEmail1">Doctor</label>
                <select id="doctor2" class="form-control input-SmallText">
                  <option selected="selected" value="0">Select</option></select></div></div>
                  <div class="col-sm-4-1">
                  <div class="form-group Remove-Padding col-sm-12-1">
                  <label class="TextFont" for="exampleInputEmail1">Hospital</label>
                  <select id="hospital2" class="form-control input-SmallText">
                  <option selected="selected" value="0">Select</option></select>
                  </div></div></div> -->
                 <div  class="col-sm-1-1" style="margin-top: -11px;">
                 <div class="form-group Remove-Padding col-sm-12-1" style="padding-left:5%">
                <label class="TextFont" for="exampleInputEmail1" style="display:none; ">Rate</label>
                <input  type="text" placeholder="Rate" id="cathRate" class=" form-control" style=" border: 1px solid sliver;display:none;" readonly="readonly" value="0"></div></div>
                <div  class="col-sm-1-1" style="margin-top: -11px;">
                 <div class="form-group Remove-Padding col-sm-12-1" style="padding-left:5%">
                <label style="display:none; " class="TextFont" for="exampleInputEmail1">Qty </label>
                <input type="text"  id="cathQty" class=" form-control" style=" border: 1px solid sliver;display:none;" onkeyup="calculateTotalOT()" onkeypress="return validatePrice(event)" value="1"></div></div>
                   <div  class="col-sm-1-1" style="margin-top: -11px;">
                 <div class="form-group Remove-Padding col-sm-12-1" style="padding-left:5%">
                <label style="display:none; " class="TextFont" for="exampleInputEmail1">Amount </label>
                <input type="text"  id="cathAmt" class=" form-control" style=" border: 1px solid sliver;display:none;" readonly="readonly" value="1"></div></div> 
                <div class="col-md-4">
														<div class="row" style="margin-top:-40px;margin-left:29px">
															<!-- ---------Touheed Plugin Multi select Plugin-------------- -->
															<label class="TextFont" style="margin-bottom: 0px;margin-top:21px;margin-left:18px">Select Combination
																Services </label>
															<div id="" class="form-group Remove-Padding col-md-12-1"
																style="margin-left: 0; height: 80px;margin-top:1px ;  width: 98%;">

																<div class="divide-20"></div>

																<div class="form-group">

																	<div class="col-md-8">
																		<select name="listmstrcom" id="listmstr_select_otcath"
																			style="width: 200px"
																			onclick="setDyanamicDivot('dynamicItemcath',this.id,'OTCATH')">
																			<option id="firstElmtcomdrug" value="0">--- Select Services
																				---</option>

																		</select>
																	</div>
																</div>

																<div
																	class="col-md-12 select2-container select2-container-multi "
																	style="margin-top: -1%;">
																	<ul id="dynamicItemcath" class="select2-choices"
																		style="overflow-y: scroll;">

																	</ul>
																</div>

															</div>
														<!-- 	---------Touheed Plugin Multi select Plugin-------------- -->

														</div>
														<div class="divide-20"></div>
													</div>
                  
                  <!-- <div class="col-sm-2-1" style="margin-top:-1%;margin-left:190px">
                  <div class="form-group Remove-Padding col-sm-12-1">
                  <label class="TextFont">Unit</label> 
                  <select id="uIdOD" class="form-control input-SmallText" onchange="cleartexrfiled();">
                  </select><input type="hidden" id="allunitid">
                  </div></div> --></div>
                  <div id="Investigation_row2" class="col-sm-12-1" style="margin-top: -18px;">
                   <div id="col9" class="col-sm-2-1" style="margin-top: 10px;padding-left:2%">
                  <div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>
                  <label class="TextFont" for="exampleInputEmail1">Instructions </label>
                   <input type="text" placeholder="Instructions" class="form-control input-SmallText" id="cpoeIns">
                   </div></div><div id="col10" class="col-sm-2-1" style="margin-top: 10px;">
                   <div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>
                   <label class="TextFont" for="exampleInputEmail1">Clinical Notes </label>
                   <input type="text" placeholder="Clinical Notes" class="form-control input-SmallText" id="cpoeClinicalNotes"></div>
                   </div><div id="col11" class="col-sm-0-1" style="margin-top: 26px;px;padding-left:5px">
                   <input type="checkbox" id="cpoeUrgent" disabled> 
                   <label style="margin-top: 0px;" class="TextFont Remove-Padding"> Urgent </label>
                   <i>
                   </i>
                   </div></div><input type="hidden" id="InvestigationQueryType" value="insert"> <input type="hidden" id="billSlaveID" value="0"> <input type="hidden" id="investigationSlaveID" value="0"></div>
                   </div></div>
                   </div><div id="row2" class="col-sm-12-1" style="margin-top: 28px">
                   <div class="form-group col-md-12-1" style="margin: 2px;">
                   <div class="col-md-12-1" style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
                   <label onclick="editTestOD()" id="editCPOE_TestLabel" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
                   <i class="fa fa-edit"></i> Edit</label> <label id="" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" onclick="deletepharma('multiple','OTCATH')">
                   <i class="fa fa-trash-o"></i> Multiple Delete </label></div>
                   <div class="col-sm-12-1" style="margin-top: 0px;">
                   
                   
                   
													<table class='table table-bordered table-condensed cf'
														style='width: 100%; margin-top: 10px;'
														id="doctorMasterPojo">
														<thead class='cf'>
															<tr>
																<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>#</div></th>
																<!-- <th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Charges ID</div></th> -->
																	<th class='col-md-1-1 center' style='height: 21.5px;padding-right: 13px;'><div
																		class='TextFont'>Particulars/Details</div></th>		
																<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Date</div></th>
															<th class="col-md-1-1 center" style="height: 21.5px; padding-right: 0px;">
                                                             <div class="TextFont">Status</div></th>
                                                             
                                                             <th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;">
                                                              <div class="TextFont">Edit</div></th>
															
																<th class='numeric col-md-1-1 center'
																	style='height: 21.5px;'><div class='TextFont'>Delete</div></th>
															</tr>
														</thead>
													</table>
								
                   </div> 
                   		
				<div style="width: 55%; margin-left: 3%; float: left; height: 100%;"></div>
                <div class='col-sm-12-1'	style='margin-top: -21px; border: 1px solid #ddd; overflow-y: scroll; height: 180px;; max-height: auto;'>
				<table class='table table-striped table-condensed cf'>
				<tbody id="tbOTCAH"></tbody>
				</table>
				</div>
				
                 </div>
                 </div></div>
                   <!-- ot cath lab(end) -->
                   
                   <!--END OT CHARGE  -->




											</div>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
				
				
			
				
				<input id="treatmentId" type="hidden"
					value="<%=request.getParameter("treatmentId")%>"
					style="display: none;" /> <input type="hidden"
					id="InvestigationQueryType" value="insert" /> <input
					id="CPOE_TestDetails" style="display: none;" /> <input
					type="hidden" id="CPOE_testId" value="" style="display: none;" />
				<!-- _____@author :  Touheed @date : 26-May-2016 @reason : CPOE (End)_______ -->

				<input type="hidden" id="Type" /> <input type="hidden"
					id="treatmentoperationid" name="treatmentoperationid"
					value="<%=request.getParameter("treatmentOPerationId")%>" /> <input
					type="hidden" id="otID" name="otID" />

				<%@include file="Footer.jsp"%></div>
			<div id="divPatId" style="display: none;"><%=request.getParameter("myObj")%></div>
			<input type="hidden" id="docIds" value="" />
			<input type="hidden" id="editOP"
				value="<%=request.getParameter("editOP")%>" />
			<input type="hidden" id="anesthesisIds" value="" />
			<input type='hidden' id='typeOfOperation'
				value='<%=request.getParameter("type")%>' />
			<input type='hidden' id='tempQnt' value='0' />
			<!-- <input type='hidden' id='tempId' value='0' /> -->
			<input type="hidden" id="unitid" value="<%=session.getAttribute("uId")%>">
			<div id="tretID" style="display: none;"><%=request.getParameter("treatID")%></div>
			<input type='hidden' id='tomId' value='<%=request.getParameter("tomId")%>' />
			<input type='hidden' id='topId' value='<%=request.getParameter("treatmentOPerationId")%>' />
			<input type='hidden' id='pid' value='<%=request.getParameter("pid")%>' />
			<div id="teamList" style="display: none;"></div>
			<input type="hidden" id="userDocId" value="0" />
			<input type="hidden" id="teamMemberCount" value="0" />
			<input type="hidden" id="trid" value="0" />
			<input type="hidden" id="pageName" value="operation" />
			<input type='hidden' value='0' id='idOTNote'/>
			<div id="customizeTemplateDiv" style="display: none;"></div>
			
			
		</c:if>
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
	</section>
</body>
<script>
	$('#txtStartTime').datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});
	$('#txtEndTime').datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});
	$('#datetimepicker2').datetimepicker({
		yearOffset : 222,
		lang : 'ch',
		timepicker : false,
		format : 'd/m/Y',
		formatDate : 'Y/m/d',
		minDate : '-1970/01/02', // yesterday is minimum date
		maxDate : '+1970/01/02' // and tommorow is maximum date calendar
	});
	var logic = function(currentDateTime) {
		if (currentDateTime.getDay() == 6) {
			this.setOptions({
				minTime : '11:00'
			});
		} else
			this.setOptions({
				minTime : '8:00'
			});
	};
</script>
</html>