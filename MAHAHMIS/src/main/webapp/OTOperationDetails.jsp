<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<title>OT Operation Details</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">
<link href="ehat-design/js/select2/select2.min.css" type="text/css" rel="stylesheet">
<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP WYSIWYG -->
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/jquery.hotkeys.min.js"></script>
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/bootstrap-wysiwyg.min.js"></script>
<!-- CKEDITOR -->
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>	
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


<!-- for Developers  -->
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/operation.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/Channeling.js"></script>
<script type="text/javascript" src="js/anasthesiaApproval.js"></script>
<!-- Auto-Suggestion 3/12/2014-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>
<!-- /for Developers  -->

<!--TIMEPEACKER -->
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>
<script src="jquery/jquery.ajaxfileupload.js" ></script>

<!--calender Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<!-- CUSTOM SCRIPT -->

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>
<script>
	jQuery(document).ready(function() {
		App.setPage("OTOperationDetails"); //Set current page
		App.init(); //Initialise plugins and elements

		//var todays_date = $("#todays_date").val();
		//var arrDate = todays_date.split("-");
		//var date = arrDate[0] + "/" + arrDate[1] + "/" + arrDate[2];
		$("#popup_container2").val(date);
		getIpdPatientHeaderInfo(<%=request.getParameter("tId")%>); 
		PatientCommanInfo();
		fetchOperationDocList();
		setAutoDoctorNameForTeamMember("userName", "onload");
		fetchPreOpPre();
		fetchOTDoc();
		fetchOTDescription();
		showAssessmentTemp();
		fetchCustomizeTemplateList();
		setTemplateFunc();
		fetchOTNotesData();
		fetchTempTopicList('OTOperationDetails');
		defaulthraListView('OTOperationDetails','onload');
		defaultCheckListView('OTOperationDetails','onload');
		$("#idConductOfAnaesthiaTab").hide();
		fetchAnaesthesiaApproval();
		fetchPreAnaestheticDetails();
		fetchConductAnaesthesiaHistory('onload');
		$("#idOperationDetails").css("background-color", "#ced9ae");
		showprint("Y");
	});
</script>
<script type="text/javascript">
	onload = function() {
		
		
	}
</script>
<style>
    .typeahead {
	max-width: 450px;
}

input[type="range"]::-moz-range-progress {
	background-color: #94ccf3;
	height: 3px;
}

input[type=range]::-moz-range-track {
	width: 100%;
	height: 3px;
	cursor: pointer;
	animate: 0.2s;
	box-shadow: 0px 0px 0px #000000;
	background-color: #D3D3D3;
	border-radius: 1px;
	border: 0px solid #000000;
}

input[type=range]::-moz-range-thumb {
	box-shadow: 0px 0px 0px #000000;
	border: 1px solid #2497E3;
	height: 12px;
	width: 12px;
	border-radius: 25px;
	background: #A1D0FF;
	cursor: pointer;
}

input[type=range]::-moz-focus-outer {
	border: 0;
}

input[type=range]:-moz-focusring {
	outline: 1px solid orange;
}
</style>
<%
	Calendar currentDate = Calendar.getInstance();
	SimpleDateFormat dateFormatter = new SimpleDateFormat("dd-MM-yyyy");
	String todays_date = dateFormatter.format(currentDate.getTime());
%>

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

				<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12">

								<!-- Page Date Print Discards-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 2px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
												<li><a href="OperationSummaryDashboard.jsp">Previous Operation</a></li>
												<li><a href="">OT Operation Details</a></li>
											</ul>
										</div>
									</div>
								</div>
								
								<!-- Start UI-->
						
								<div id="commonPatInfo">
									<!--adde by paras @date:17-jun-2017  -->
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
								
								<!-- End UI -->
								<div class="panel panel-default" style="margin-top: 7%;">
									<div class="panel-body" style="height: 600px;">
									<div style="width: 100%; margin-left: 0px;" id="rightContActual">

									<!-- Start Tab UI -->
									<div style="margin-top: 0px; margin-left: 0px;" id="#deskTabs" class="col-md-12-1">
										<!-- Start BOX -->
										<div class="col-md-12-1" style="height: 400px;">
											<div class="divide-10"></div>
											<div class="tabbable col-md-12-1">
												<ul class="nav nav-tabs mainTab">
													<li class="active"><a href="#iOperationDetails" id="idOperationDetails" data-toggle="tab" onclick="showprint('Y');"><span class="hidden-inline-mobile">Operation Details</span></a></li>
													<li><a href="#iPreOpPrep" data-toggle="tab" onclick="showprint('Y');"><span class="hidden-inline-mobile">Pre-Op Prep</span></a></li>
													<li><a href="#iProtocol" data-toggle="tab" onclick="showprint('Y');"><span class="hidden-inline-mobile">Protocol</span></a></li>
													<li><a href="#iOTNotes" data-toggle="tab" onclick="showprint('Y');"><span class="hidden-inline-mobile">OT Notes</span></a></li>
													<li><a data-toggle="tab" id="idPreAnaesthaticAssessmentTab" href="#PreAnasthAssess" onclick="openPreAnaesthaticAssessment(),showprint('N'),();"><!-- onclick="openPreAnaesthaticAssessment()" -->
													    <span class="hidden-inline-mobile">Pre-Anaesthatic Assessment</span></a></li>
													<li><a data-toggle="tab" id="idAnaesthesiaApprovalTab" href="#AnaesthesiaApproval" onclick="showprint('Y');"><!-- onclick="openAnaesthesiaApproval();" -->
														<span class="hidden-inline-mobile">Anaesthesia Approval </span></a></li>
													<li><a data-toggle="tab" id="idConductOfAnaesthiaTab" href="#ConductOfAnaesthia" ><!-- onclick="openConductOfAnaesthia();" -->
														<span class="hidden-inline-mobile">Conduct Of Anaesthia </span></a></li>
													
													<li class="pull-right">
													 <button id="idPrintPreAnaePrintAss" class="btn btn-xs btn-warning" value="" onclick="printPreAnaethAssmnt1()" style="display: inline-block;">Print </button>
													</li>
													
													<!-- <li><a href="#iAnaesthesiaNotes" data-toggle="tab"><span class="hidden-inline-mobile">Anaesthesia Notes</span></a></li> -->
												</ul>
												<div class="divide-10"></div>
												<div id="allTabDivID" class="tab-content">

													<!-- Start Code for OperationDetails GUI -->
													<div class="tab-pane fade in active" id="iOperationDetails">
														<div style="margin: 0px; height: 250px;" class="col-md-12-1" id="row1">
															<div class="form-group  box border col-md-12-1" style="height: 260px;">
																		<!-- Start Header for New Edit Delete Option -->
																		<div style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;" class="col-md-12-1">
																			<label class="col-sm-2-1" style="margin-left: 0px; margin-top: 6px;">
																				Team Details
																			</label>
																		</div>
																		<!-- End Header for New Edit Delete Option -->
																		<div style="margin-top: 0px;" class="col-sm-12-1">
																			<table class="table table-bordered table-condensed header-fixed cf' style='width : 1090px; margin-top: 10px;">
																				<thead>
																					<tr>
																						<th><div class="TextFont">#</div></th>
																						<th style="height: 21.5px; padding-left: 50px;" class="col-md-2-1"><div class="TextFont">Name</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Type</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Contact</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">E-Mail</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Remove</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Confirm</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Confirm Time</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Arrival</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Arrival Time</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Absent</div></th>
																						
																					</tr>
																				</thead>
																			</table>
																			<div style="overflow-y: scroll; height: 207px; maxheight: auto; margin-top: -21px;" class="col-sm-12-1" id="flip-scroll">
																			
																					<div id="OperationDetailsList"></div>
																			
																			</div>
																		</div>
															</div>
														</div>
													</div>
													<!-- End Code for OperationDetails GUI -->
													
													<!-- Start Code for #Narration GUI -->

													<div id="iNarraBox1" class="modal fade in" tabindex="-1">
													<div class="modal-dialog">
														<div class="modal-content col-md-6-1"
														style="margin-top: 123px; margin-left: 213px;">
														<div class="modal-header">
															<button class="btn btn-xs" aria-label="Close"
																data-dismiss="modal" type="button"
																style="margin-top: -5px;; margin-left: 388px"
																onclick="HideNarraPopUp()">
															<i class="fa fa-times"></i>
															</button>
															<button class="btn btn-xs btn-save" title="Save"
															style="margin-top: -37px; margin-left: 360px"
															data-original-title="Save" data-toggle="tooltip"
															data-placement="left" id="isaveNarra1" onclick="deleteDocRecord()">
															<i class="fa fa-save"></i>
															</button>
															<h4 id="testHead" style="margin-top: -36px;">Narration for Delete:</h4>
															</div>
															<div class="modal-body">
															<div class="col-md-12-1">
															<div class="col-md-6-1" style="background-color: #ccffeb;">
															<textarea rows="3" cols="50" id="txtComment" type="textarea"
																name="txtComment"></textarea>
															</div>
	
															<div class="divide-40"></div>
															</div>
															<div class="divide-40"></div>
															</div>
														</div>
													</div>
												</div>
												<div id="iNarraBox2" class="modal fade in" tabindex="-1">
													<div class="modal-dialog">
														<div class="modal-content col-md-6-1"
														style="margin-top: 123px; margin-left: 213px;">
														<div class="modal-header">
															<button class="btn btn-xs" aria-label="Close"
																data-dismiss="modal" type="button"
																style="margin-top: -5px;; margin-left: 388px"
																onclick="HideNarraPopUp()">
															<i class="fa fa-times"></i>
															</button>
															<button class="btn btn-xs btn-save" title="Save"
															style="margin-top: -37px; margin-left: 360px"
															data-original-title="Save" data-toggle="tooltip"
															data-placement="left" id="isaveNarra2" onclick="absentDoc()">
															<i class="fa fa-save"></i>
															</button>
															<h4 id="testHead" style="margin-top: -36px;">Narration for Absent:</h4>
															</div>
															<div class="modal-body">
															<div class="col-md-12-1">
															<div class="col-md-6-1" style="background-color: #ccffeb;">
															<textarea rows="3" cols="50" id="txtComment1" type="textarea"
																name="txtComment"></textarea>
															</div>
	
															<div class="divide-40"></div>
															</div>
															<div class="divide-40"></div>
															</div>
														</div>
													</div>
												</div>
													<!-- End Code for #Narration GUI -->
													
													<!-- Start Code for #Add Doctor GUI -->

													<div id="iDoctorBox" class="modal fade in" tabindex="-1">
													<div class="modal-dialog">
														<div class="modal-content col-md-6-1"
														style="margin-top: 123px; margin-left: 213px; height: 220px;">
														<div class="modal-header">
															<button class="btn btn-xs" aria-label="Close"
																data-dismiss="modal" type="button"
																style="margin-top: -5px;; margin-left: 388px"
																onclick="HideAddDocPopUp()">
															<i class="fa fa-times"></i>
															</button>
															<button class="btn btn-xs btn-save" title="Save"
															style="margin-top: -37px; margin-left: 360px" data-original-title="Save" data-toggle="tooltip"
															data-placement="left" onclick="addDocNameToList1();">
															<i class="fa fa-save"></i>
															</button>
															<h4 id="testHead" style="margin-top: -36px;">Add Doctor:</h4>
															</div>
															<div class="modal-body">
															<div class="form-group Remove-Padding col-md-12-1"
													style="margin-top: 9px;">
													<div class="col-md-12-1">
														<div class="form-group Remove-Padding col-md-4-1"
															style="margin-top: 9px;">
															<label class="TextFont">Type</label> <select name=""
																id="type" class="form-control input-SmallText TextFont"
																onchange="clearDocName(),showDocTypeDiv()">
																<option value="select">-Select-</option>
																<option value="admin">Admin</option>
																<option value="anesthetist">Anesthetist</option>
																<option value="doctor">Doctor</option>
																<option value="General">General</option>
																<option value="nurse">Nurse</option>
																<option value="rmo">RMO</option>
																<option value="visitingdoctor">Visiting Doctor</option>
															</select>
														</div>
														<div class="form-group Remove-Padding col-md-1-1"></div>
														<div class="form-group Remove-Padding col-md-4-1"
															style="margin-top: 9px;">
															<label class="TextFont">Name</label>
															<div id="divuserName">
																<input id='userName' autocomplete="off" name='userName'
																	onkeyup="setAutoDoctorNameForTeamMember(this.id,'onchange')"
																	onchange="setDocNameAndId()"
																	class="typeahead form-control input-SmallText" />
																	<input type="hidden" id="userDocId" value="0"/>
															</div>
														</div>
														</div>
													<div class="col-md-5-1" id="doctypediv">
														<div class="form-group Remove-Padding col-md-10-1"
															style="margin-top: 18px;">
															<label class="TextFont">Doctor Type</label> <select
																name="" id="doctype"
																class="form-control input-SmallText TextFont">
																<option value="select">-Select-</option>
																<option value="surgeon">SURGEON</option>
																<option value="asssurgeon">ASSISTANT SURGEON</option>
															</select>
														</div>
													</div>
												</div>
															</div>
														</div>
													</div>
												</div>
												
												
													<!-- End Code for #Add Doctor GUI -->

													<!-- Start Code for #PreOpPrep GUI -->
													<div class="tab-pane fade" id="iPreOpPrep">
													<div style="margin: 0px; height: 250px;" class="col-md-12-1" id="row1">
															<div class="form-group  box border col-md-12-1" style="height: 360px;">
																		<!-- Start Header for New Edit Delete Option -->
																		<div style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;" class="col-md-12-1">
																			<label class="col-sm-2-1" style="margin-left: 0px; margin-top: 6px;">
																			Assigned Check List
																			</label>
																			<label onclick="" style="margin-left: 100px; margin-top: 0px;" class="btn">
																			</label>
																		</div>
																		<!-- End Header for New Edit Delete Option -->
																		<div style="margin-top: 0px;" class="col-sm-12-1">
																			<table class="table table-bordered table-condensed header-fixed cf' style='width : 1090px; margin-top: 10px;">
																				<thead>
																					<tr>
																						<th><div class="TextFont">#</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-6-1 center"><div class="TextFont">Checklist</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Confirmation</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-3-1 center"><div class="TextFont">Time</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Remark</div></th>
																					</tr>
																				</thead>
																			</table>
																			<div style="overflow-y: auto; height: 300px; maxheight: auto; margin-top: -21px;" class="col-sm-12-1" id="flip-scroll">
																			<table class="table table-striped table-condensed">
																					<tbody id="PreOpPrepList">
																					</tbody>
																			</table>
																			</div>
																		</div>
															</div>
														</div>	
													</div>
													<!-- End Code for PreOpPrep GUI -->

													<!-- Start Code for #Protocol GUI -->
													<div class="tab-pane fade" id="iProtocol">
														<!-- Start Code for row1 CPOE GUI -->
														<div id="row1" class="col-md-12-1"
															style="padding-top: 0px;">
															<div class="tabbable tabs-left col-md-12-1"
																style="margin-top: 0px; margin-left: 5px;">
																<ul class="nav nav-tabs colorChanges" style="height: 250px;"
																	id="cpoeTabULID">
																	<li id="DescriptionList" class="active"><a
																		href="#Description" data-toggle="tab">Description</a></li>
																	<li id="UploadProtocolList"><a
																		href="#UploadProtocol" data-toggle="tab">Upload</a></li>
																	<li id="DiagnosisList"><a
																		href="#Diagnosis" data-toggle="tab">Diagnosis</a></li>
																</ul>
																<div class="tab-content col-md-10-1"
																	style="margin-top: 10px;">
																	<!-- Start id="Pathology" -->
																	<div id="Diagnosis" class="col-md-12-1 tab-pane fade in">
																	<div class="tab-pane fade active in" id="Assesment">
														<!-- ====== Row: 2 ====== -->
														<div style="margin-top: 10px;" class="col-sm-12-1" id="row2">
															<div class="col-md-12-1">
																<div style="padding-top: 10px; padding-bottom: 0px" class="box-body col-md-12-1">
																	<div class="form-group  box border col-md-12-1" style="margin-top: 50px;">
																		<!-- Start Header for New Edit Delete Option -->
																		<div style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;" class="col-md-12-1">
																			<label style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;" class="btn">
																				Diagnosis Assessment
																			</label> 
																		</div>
																		<!-- End Header for New Edit Delete Option -->
																		<div style="margin-top: 0px;" class="col-sm-12-1">
																			<table class="table table-bordered table-condensed header-fixed cf' style='width : 1090px; margin-top: 10px;">
																				<thead>
																					<tr>
																						<th>#</th>
																						<th style="height: 21.5px; padding-left: 50px;" class="col-md-2-1"><div class="TextFont">Diagnosis</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Diagnosis Description</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">ICD 10 Code</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Date</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Diagnosis Type</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Diagnosed By</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Comment</div></th>
																						<th style="height: 21.5px; padding-left: 30px;" class="center"><div class="TextFont"></div></th>
																					</tr>
																				</thead>
																			</table>
																			<div style="overflow-y: scroll; height: 111px; maxheight: auto; margin-top: -21px;" class="col-sm-12-1" id="flip-scroll">
																				<table class="table table-bordered table-striped table-condensed cf">
																					<tbody id="assesmentContentForPreOpPrep">
																					</tbody>
																				</table>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<!-- ======End Row: 2 ====== -->

													</div>
																	</div>
																	<!-- End id="Diagnosis" -->
																	<!-- Start id="Investigation" -->
													<div id="UploadProtocol"
																		class="col-md-12-1 tab-pane fade in">
																		<form>
															<div class="centered">
															<div class="divide-10"></div>
															<div class="col-md-12-1" style="height: 50px; margin-top: 10px;">
															<label class="col-md-2-1"
																style="margin-top: 3px; padding-left: 5px;">
																Uploaded File's </label> 
																<br />
															</div>
														</div>
														</form>
														<br>
														
														<div class="divide-10"></div>
														<div style="padding-top: 10px; padding-bottom: 0px" class="box-body col-md-12-1" >
																	<div class="form-group  box border col-md-12-1">
																		<!-- Start Header for New Edit Delete Option -->
																		<div style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;" class="col-md-12-1">
																			 
																		</div>
																		<!-- End Header for New Edit Delete Option -->
																		<div id="divdocDispTable" style="margin-top: 0px;margin-top: 0px; height: 170px; overflow-y: scroll;" class="col-sm-12-1">
																			<table class="table table-bordered table-condensed header-fixed cf' style='width : 1090px; margin-top: 10px;">
																				<thead>
																					<tr>
																						<th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">#</div></th>
																						<th style="height: 21.5px; padding-left: 50px;" class="col-md-2-1"><div class="TextFont">Document</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Note</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Date</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">View</div></th>
																					</tr>
																				</thead>
																					<tbody id="docOTDispTable"></tbody>
																				</table>
																			</div>
																		</div>
																	</div>
																	</div>
																	<!-- End id="#UploadProtocol" -->

																	<!-- Start id=""#Description"" -->
																	<div id="Description"
																		class="col-md-12-1 tab-pane fade  in active">
																		<div class="centered" id="txthraProtoType"	style="max-height: 280px; overflow: auto;">
																		</div>
																		
																		<div class="centered">
																		<div class="col-md-12-1" style="height: 50px; margin-top: 50px;">
																		<label class="col-md-1-1" style="margin-top: 0px; padding-left: 0px;">
																Description: </label> 
																		<textarea maxlength="120" id="iDescription" name="txtDescription" style="" cols="75" rows="2" class="col-md-4-1" readonly="readonly"></textarea>
																		</div>
																		</div>
																	</div>
																	</div>
																	<!-- End id=""#Description"" -->

																	
																</div>
																<!-- End Tab Content -->
															</div>
														</div>
														<!-- End Code for row1 Protocol GUI -->
													

													<!-- Start Code for #OTNotes GUI -->
													<div id="iOTNotes" class="col-md-12-1 tab-pane fade in">
														<div class="col-md-4-1" style="margin-top: 40px;">
														<div class="form-group Remove-Padding col-md-12-1">
																		<div class="col-md-5-1" style="margin-top: 10px;">
																		<label for="Estimated Blood Loss" class="TextFont">Estimated Blood Loss</label></div> 
																		<div class="col-md-6-1" style="margin-top: 10px;">
																		<input type="text" class="form-control input-SmallText capitalise" style="border: 1px solid orange;" placeholder="Estimated Blood Loss" readonly="readonly" name="EBLoss" id="iEBLoss">
																		</div>
														</div>
														<div class="form-group Remove-Padding col-md-12-1">
																		<div class="col-md-5-1" style="margin-top: 30px;">
																		<label for="Actual Blood Loss" class="TextFont">Actual Blood Loss</label></div> 
																		<div class="col-md-6-1" style="margin-top: 30px;">
																		<input type="text" class="form-control input-SmallText capitalise" style="border: 1px solid orange;" placeholder="Actual Blood Loss" readonly="readonly" name="ABLoss" id="iABLoss" value="0" disabled="disabled">
																		</div>
														</div>
														<div class="form-group Remove-Padding col-md-12-1">
																		<div class="col-md-5-1" style="margin-top: 30px;">
																		<label for="Instrumental Count" class="TextFont">Instrumental Count</label></div> 
																		<div class="col-md-6-1" style="margin-top: 30px;">
																		<input type="text" class="form-control input-SmallText capitalise" placeholder="Instrumental Count" readonly="readonly" name="ICount" id="iICount">
																		</div>
														</div>
														<div class="form-group Remove-Padding col-md-12-1">
																		<div class="col-md-5-1" style="margin-top: 30px;">
																		<label for="Recorded By" class="TextFont">Recorded By</label></div> 
																		<div class="col-md-6-1" style="margin-top: 30px;" id = "diviRecBy">
																		<input type="text" class="typeahead form-control input-SmallText" placeholder="Recorded By" readonly="readonly" name="RecBy" id="iRecBy">
																		</div>
														</div>
														<div class="form-group Remove-Padding col-md-12-1">
																		<div class="col-md-5-1" style="margin-top: 30px;">
																		<label for="MOP Count" class="TextFont">MOP Count Recorded By</label></div> 
																		<div class="col-md-6-1" style="margin-top: 30px;">
																		<input type="text" class="typeahead form-control input-SmallText" placeholder="MOP Count" readonly="readonly" name="MOPCount" id="iMOPCount">
																		</div>
														</div>
														<div class="form-group Remove-Padding col-md-12-1">
																	<div class="col-md-5-1" style="margin-top: 30px;">
																	<label for="OTNotesComment" class="TextFont">Comment</label></div>
																	<div class="col-md-6-1" style="margin-top: 30px;">
																	<textarea class="field span12 " style="margin-top: 4px; 
																	margin-bottom: 2px;" id="iOTNotesComment" readonly="readonly"
																	rows="3" cols="23"
																	placeholder="OT Notes Comment"></textarea>
																</div>
														</div>		
														</div>
														<div class="container">
														<div class="col-md-8-1" style="margin-top: 20px;">
														<div style="margin-top: 5px;" class="col-md-12-1">
													</div>
													<div class="panel panel-default col-md-12-1"
														style="margin-top: 0px;">
													<div class="panel-body">
														<div id="move" style="width: 100%; display: none;"
														class="ui-resizable ui-draggable ui-draggable-handle">
														<textarea class="ckeditor ui-widget-content " name="editor1"
														title="Rich Text Editor, editor1" placeholder="Content"
														id="editor1" disabled="disabled" ></textarea>
														</div>
														<div class="divide-10"></div>
														<div class="tab-content">
												</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- End Code for #OTNotes GUI -->
								<div id="PreAnasthAssess" class="tab-pane fade in">
												<!-- Start Code for row1 CPOE GUI -->

												<div class="tabbable tabs-left col-md-12-1"
													style="margin-top: 0px; margin-left: 5px;">
													<ul class="nav nav-tabs colorChanges" style="height: 250px;">
														<li class="active"><a href="#MedicalHistory"
															id="medicalHistoryTAB"
															data-toggle="tab"> Medical History </a></li>
														<li><a href="#PresentMedications"
															id="PresentMedicationsTAB"
															data-toggle="tab"> Present Medications </a></li>
														<li><a href="#ExaminationFindMedications"
															id="ExaminationFindMedicationsTAB"
															data-toggle="tab"> Examination Findings Medications</a></li>
														<li><a href="#Investigations" id="InvestigationsTAB"
															data-toggle="tab">Investigations</a></li>
														<li><a href="#PlanOfAnasthia" id="PlanOfAnasthiaTAB"
															data-toggle="tab"> Plan Of Anaesthia </a></li>
													</ul>
													<div class="tab-content col-md-9-1"
														style="margin-top: 0px;">

														<%-- 		<div id="PreAnaestheticAssessment"
															class="tab-pane fade in active">

															<!-- *************   -->
															<div
																style="text-transform: capitalize; font-weight: bold; font-size: medium;"
																class='col-sm-9-1 center'>Pre-Anaesthetic
																Assessment</div>
															<div class='col-sm-12-1'>
																<div class='col-sm-12-1'>
																	<div class="divide-20"></div>
																	<div class="divide-20"></div>
																	<div class='col-sm-8-1'>
																		<div class="divide-20"></div>
																		<div class='col-sm-6-1'>
																			<label class="TextFont">Registration Number :</label>
																		</div>
																		<div id="regdate" class='col-sm-4-1'></div>
																	</div>
																</div>
															</div>

															<div class='col-sm-12-1'>
																<div class='col-sm-4-1'>
																	<div class="divide-20"></div>
																	<div class="divide-20"></div>
																	<div class='col-sm-4-1'>
																		<label class="TextFont">Indoor :</label>
																	</div>
																	<div id="indoor1" class='col-sm-4-1'>
																		<input type="text"
																			class="form-control input-SmallText" id="indoor"
																			readonly="readonly" />
																	</div>
																</div>
																<div class='col-sm-4-1'>
																	<div class="divide-20"></div>
																	<div class="divide-20"></div>
																	<div class='col-sm-4-1'>
																		<label class="TextFont">OPD :</label>
																	</div>
																	<div class='col-sm-4-1'>
																		<input type="text"
																			class="form-control input-SmallText"
																			readonly="readonly" id="opd">
																	</div>
																</div>
																<div class='col-sm-4-1'>
																	<div class="divide-20"></div>
																	<div class="divide-20"></div>
																	<div class='col-sm-2-1'>
																		<label class="TextFont">DATE :</label>
																	</div>
																	<div class='col-sm-4-1'>
																		<input type="text"
																			class="form-control input-SmallText" id="crtdate"
																			readonly="readonly" name="crtdate"
																			value='<%=todays_date%>'
																			onclick="displayCalendar(document.getElementById('crtdate'),'dd/mm/yyyy',this)">
																	</div>
																	<div style="color: red; margin-left: 0 px"
																		class='col-sm-1-1'>
																		<b>*</b>
																	</div>
																</div>
															</div>

															<div class='col-sm-12-1'>
																<div class="divide-20"></div>
																<div class="divide-20"></div>
																<div class='col-sm-4-1'>
																	<div class="divide-20"></div>
																	<div class='col-sm-5-1'>
																		<label class="TextFont">Doctor Incharge :</label>
																	</div>
																	<div id="docInCharge" class='col-sm-5-1'></div>
																</div>
																<div class='col-sm-4-1'>
																	<label class="TextFont"></label>
																</div>

																<div class='col-sm-4-1'>
																	<div class="divide-20"></div>
																	<div class="divide-20"></div>
																	<div class='col-sm-4-1'>
																		<label class="TextFont">Type :</label>
																	</div>
																	<div id="refTo" class='col-sm-4-1'></div>
																</div>
															</div>
															<div class='col-sm-12-1'>
																<div class='col-sm-12-1'>
																	<div class="divide-20"></div>
																	<div class="divide-20"></div>
																	<div class='col-sm-4-1'>
																		<label class="TextFont">Surgery Proposed :</label>
																	</div>
																	<div id="" class='col-md-6-1'>
																		<input type="text"
																			class="form-control input-SmallText" id="prosurgery"
																			class='col-md-8-1' value="">
																	</div>
																</div>
															</div>
														</div> --%>

														<!-- *************Start Medical History tab-content-->
														<div id="MedicalHistory" class="tab-pane fade in active">
															<div style="text-transform: capitalize; font-weight: bold; font-size: medium;"
																class="col-sm-12-1 center"></div>
															<div class="divide-20"></div>
															<div class="divide-20"></div>
															<div class="col-sm-12-1">
																<div class="col-sm-2-1">
																	<label class="TextFont">COUGH -:</label>
																</div>
																<div class="col-sm-1-1" style="margin-top: 2px;">
																	<label class="radio TextFont Remove-Padding"> <input
																		class="" type="radio" id="radAppType1" name="cough" disabled
																		value="yes"
																		onclick="createDivForCoughHistory('COUGH')"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" readonly="readonly"/>&nbsp;Yes
																	</label>
																</div>
																<div class="col-sm-1-1" style="margin-top: 2px;">
																	<label class="radio TextFont Remove-Padding"> <input
																		type="radio" id="radAppType2" name="cough" value="no" disabled
																		onclick="hideDivDateAndTime('COUGH')"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" readonly="readonly"/>&nbsp;No
																	</label>
																</div>
																<div class="col-sm-8-1" style="margin-top: 10px;">
																	<div id="coughPresent" class="col-sm-12-1">
																		<div class="col-sm-8-1">
																			<input type="range" min="0" max="100"
																				class="defaultSlider" id="cough"
																				style="font-size: 11px; width: 90%;" readonly="readonly" disabled/>
																		</div>
																		<div class="col-sm-2-1" style="margin-top: 5px;">
																			<input type="text" class="col-sm-6-1 cough"
																				style="font-weight: bold;" name="qty"
																				id="qtyForCough" readonly="readonly"/>
																		</div>
																		<div class="col-sm-2-1" style="margin-top: 5px;">
																			<select class="col-sm-12-1" style=""
																				id="selectCoughTime" name="selectCoughTime" readonly="readonly" disabled>
																				<option value="0">-Select-</option>
																				<option value="Days">Days</option>
																				<option value="Month">Month</option>
																				<option value="Year">Year</option>
																			</select>
																		</div>
																	</div>
																</div>
															</div>

															<div class="col-sm-12-1">
																<div class="divide-20"></div>
																<div class="divide-10"></div>
																<div class="col-sm-2-1">
																	<label class=""></label>
																</div>
																<div class="col-sm-1-1">
																	<label class="radio TextFont Remove-Padding"> <input
																		type="radio" id="radAppType3" name="dry" value="dry" disabled
																		onclick=""
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" readonly="readonly"/>&nbsp;Dry
																	</label>
																</div>
																<div class="col-sm-2-1">
																	<label class="radio TextFont Remove-Padding"> <input
																		value="expect" id="radAppType4" type="radio" disabled
																		name="dry" onclick=""
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" readonly="readonly"/>&nbsp;Expect
																	</label>
																</div>
																<div class="col-sm-8-1">
																	<label class=""></label>
																</div>
															</div>

															<div class="col-sm-12-1">
																<div class="divide-20"></div>
																<div class="divide-10"></div>
																<div class="col-sm-2-1">
																	<label class="TextFont">DYSPNOEA -:</label>
																</div>
																<div class="col-sm-1-1" style="margin-top: 1px;">
																	<label class="radio TextFont Remove-Padding"> <input
																		value="yes" type="radio" name="dyspnoea" disabled
																		id="radAppType5"
																		onclick="createDivForCoughHistory('DYSPNOEA')"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" readonly="readonly"/>&nbsp;Yes
																	</label>
																</div>
																<div class="col-sm-1-1" style="margin-top: 1px;">
																	<label class="radio TextFont Remove-Padding"> <input
																		type="radio" name="dyspnoea" id="radAppType6" disabled
																		value="no" onclick="hideDivDateAndTime('DYSPNOEA')"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" readonly="readonly"/>&nbsp;No
																	</label>
																</div>
																<div class="col-sm-8-1" style="margin-top: 10px;">
																	<div id="DYSPNOEAPresent" class="col-sm-12-1">
																		<div class="col-sm-8-1">
																			<input type="range" min="0" max="100"
																				class="defaultSlider" id="dyspnoea"
																				style="font-size: 11px; width: 90%;" name="duration" readonly="readonly" disabled/>
																		</div>
																		<div class="col-sm-2-1" style="margin-top: 5px;">
																			<input type="text" class="col-sm-6-1 dyspnoea"
																				style="font-weight: bold;" name="qty"
																				id="qtyForDyspnoea" readonly="readonly"/>
																		</div>
																		<div class="col-sm-2-1" style="margin-top: 5px;">
																			<select class="col-sm-12-1" style=""
																				id="selectDyspnoeaTime" name="selectDyspnoeaTime" readonly="readonly" disabled>
																				<option value="0">-Select-</option>
																				<option value="Days">Days</option>
																				<option value="Month">Month</option>
																				<option value="Year">Year</option>
																			</select>
																		</div>
																	</div>
																</div>
															</div>

															<div class="col-sm-12-1">
																<div class="divide-20"></div>
																<div class="divide-10"></div>
																<div class="col-sm-2-1">
																	<label class="TextFont">GIDDINESS -:</label>
																</div>
																<div class="col-sm-1-1" style="margin-top: 1px;">
																	<label class="radio TextFont Remove-Padding"> <input
																		value="yes" type="radio" name="giddiness" disabled
																		id="radAppType7"
																		onclick="createDivForCoughHistory('GIDDINESS')"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" readonly="readonly"/>&nbsp;Yes
																	</label>
																</div>
																<div class="col-sm-1-1" style="margin-top: 1px;">
																	<label class="radio TextFont Remove-Padding"> <input
																		value="no" type="radio" name="giddiness" disabled
																		id="radAppType8"
																		onclick="hideDivDateAndTime('GIDDINESS')"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" readonly="readonly"/>&nbsp;No
																	</label>
																</div>



																<div class="col-sm-8-1" style="margin-top: 10px;">
																	<div id="GiddnessPresent" class="col-sm-12-1">
																		<div class="col-sm-8-1">
																			<input type="range" min="0" max="100"
																				class="defaultSlider" id="giddiness"
																				style="font-size: 11px; width: 90%;" name="duration" readonly="readonly" disabled/>
																		</div>
																		<div class="col-sm-2-1" style="margin-top: 5px;">
																			<input type="text" class="col-sm-6-1 giddiness"
																				style="font-weight: bold;" name="qty"
																				id="qtyForGiddiness" readonly="readonly"/>
																		</div>
																		<div class="col-sm-2-1" style="margin-top: 5px;">
																			<select class="col-sm-12-1" style=""
																				id="selectGiddinessTime" name="selectGiddinessTime" readonly="readonly" disabled>
																				<option value="0">-Select-</option>
																				<option value="Days">Days</option>
																				<option value="Month">Month</option>
																				<option value="Year">Year</option>
																			</select>
																		</div>
																	</div>
																</div>
															</div>

															<div class="col-sm-12-1">
																<div class="divide-20"></div>
																<div class="divide-10"></div>
																<div class="col-sm-2-1">
																	<label class="TextFont">CHEST PAIN -:</label>
																</div>
																<div class="col-sm-1-1" style="margin-top: 1px;">
																	<label class="radio TextFont Remove-Padding"> <input
																		value="yes" type="radio" name="chestpain" disabled
																		id="radAppType9"
																		onclick="createDivForCoughHistory('chestPain')"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" readonly="readonly"/>&nbsp;Yes
																	</label>
																</div>
																<div class="col-sm-1-1" style="margin-top: 1px;">
																	<label class="radio TextFont Remove-Padding"> <input
																		value="no" type="radio" name="chestpain" disabled
																		id="radAppType10"
																		onclick="hideDivDateAndTime('chestPain')"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" readonly="readonly"/>&nbsp;No
																	</label>
																</div>
																<div class="col-sm-8-1" style="margin-top: 10px;">
																	<div id="chestPainPresent" class="col-sm-12-1">
																		<div class="col-sm-8-1">
																			<input type="range" min="0" max="100"
																				class="defaultSlider" id="chestPain"
																				style="font-size: 11px; width: 90%;" name="duration" readonly="readonly" disabled/>
																		</div>
																		<div class="col-sm-2-1" style="margin-top: 5px;">
																			<input type="text" class="col-sm-6-1 chestPain"
																				style="font-weight: bold;" name="qty"
																				id="qtyForChestPain" readonly="readonly"/>
																		</div>
																		<div class="col-sm-2-1" style="margin-top: 5px;">
																			<select class="col-sm-12-1" style=""
																				id="selectChestPainTime" name="selectChestPainTime" readonly="readonly" disabled>
																				<option value="0">-Select-</option>
																				<option value="Days">Days</option>
																				<option value="Month">Month</option>
																				<option value="Year">Year</option>
																			</select>
																		</div>
																	</div>
																</div>
															</div>

															<div class="col-sm-12-1">
																<div class="divide-20"></div>
																<div class="divide-10"></div>
																<div class="col-sm-2-1">
																	<label class="TextFont"></label>
																</div>
																<div class="col-md-3-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkAppType1" disabled
																		id="checkAppType1" value="hypertension" readonly="readonly"/>H/O:HYPERTENSION
																	</label>
																</div>
																<div class="col-md-3-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px -9px;">
																		<input type="checkbox" name="checkAppType2" disabled
																		id="checkAppType2" value="ihd" readonly="readonly"/>IHD COAGULATION
																		DEFECT
																	</label>
																</div>
																<div class="col-md-3-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input value="jaundice" type="checkbox" disabled
																		name="checkAppType3" id="checkAppType3" readonly="readonly"/>JAUNDICE
																	</label>
																</div>
																<div class="col-md-3-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input value="diabetes" type="checkbox" disabled
																		name="checkAppType4" id="checkAppType4" readonly="readonly"/>DIABETES
																	</label>
																</div>
															</div>

															<div class="col-sm-12-1">
																<div class="divide-20"></div>
																<div class="divide-10"></div>
																<div class="col-sm-2-1">
																	<label class="TextFont"></label>
																</div>
																<div class="col-md-3-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkAppType5" disabled
																		id="checkAppType5" value="hospitaliasation" readonly="readonly"/>HOSPITALISATION
																	</label>
																</div>
																<div class="col-md-3-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px -9px;">
																		<input value="bloodtrans" type="checkbox" disabled
																		name="checkAppType6" id="checkAppType6" readonly="readonly"/>BLOOD
																		TRANSFUSION
																	</label>
																</div>
																<div class="col-md-3-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input value="allergy" type="checkbox" disabled
																		name="checkAppType7" id="checkAppType7" readonly="readonly"/>ALLERGY
																	</label>
																</div>
															</div>
															<div class="col-sm-12-1">
																<div class="divide-20"></div>
																<div class="divide-10"></div>
																<div class="col-sm-2-1">
																	<label class="TextFont">COMPLAINTS - :</label>
																</div>
																<div class="col-md-3-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input id="checkAppType8" type="checkbox" disabled value=""
																		name="checkAppType8" readonly="readonly"/>SMOKING
																	</label>
																</div>
																<div class="col-md-3-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px -9px;">
																		<input id="checkAppType9" type="checkbox" disabled
																		name="checkAppType9" value="bloodtrans" readonly="readonly"/>ALCOHOL
																	</label>
																</div>
																<div class="col-md-3-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input id="checkAppType10" type="checkbox" disabled
																		name="checkAppType10" value="allergy" readonly="readonly"/>TOBACCO
																	</label>
																</div>
															</div>


															<div class="col-sm-12-1" style="padding-bottom: 10px;">
																<div class="divide-20"></div>
																<div class="divide-10"></div>
																<div class="form-group Remove-Padding col-md-7-1">
																	<label class="TextFont"> OTHER -:</label>
																	<textarea type="text" id="otherh" rows="2" cols="8"
																		class="form-control" style="margin-left: 160px;" readonly="readonly"></textarea>
																</div>
																<div class="form-group Remove-Padding col-md-3-1"
																		style="margin-top: 0px;margin-left: 170px;">
																		<div class="col-md-12-1">
																			<label class="TextFont">Date <b
																				style="width: 1%; color: red; float: right;">&nbsp;*</b>
																			</label> <input type="text"
																				class="form-control input-SmallText"
																				placeholder="Date" id="crtdate" readonly="readonly"
																				value="<%=todays_date%>"
																				onclick="displayCalendar(document.getElementById('crtdate'),'dd/mm/yyyy',this)"
																				onchange="checkFutureDate('conductAnaesthesia')" readonly="readonly">

																		</div>
																	</div>
															</div>

														</div>
														<!-- *************End Medical History tab-content-->

														<!-- *************Start PRESENT MEDICATIONS tab-content-->
														<div id="PresentMedications" class="tab-pane fade in">
															<!-- <div style="width: 94%; padding-top: 1%; text-align: center; text-transform: capitalize; font-weight: bold; font-size: medium;">
																</div> -->
															<div id="appTyp">
																<div class="col-md-12-1">
																	<div class="divide-20"></div>
																	<div class="divide-20"></div>
																	<div class="col-md-3-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppType11" disabled
																			value="hosp" id="checkAppType11" readonly="readonly"/> &nbsp;Dilanatin
																			Phenobarb
																		</label>
																	</div>
																	<div class="col-md-3-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px -5px;">
																			<input value="bloodtrans" type="checkbox" disabled
																			name="checkAppType12" id="checkAppType12" readonly="readonly"/>&nbsp;Steroids
																			Anti hypertensive
																		</label>
																	</div>
																	<div class="col-md-3-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input value="allergy" type="checkbox" disabled
																			name="checkAppType13" id="checkAppType13" readonly="readonly"/>&nbsp;Anti
																			coagulants
																		</label>
																	</div>
																	<div class="col-md-3-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppType14" disabled
																			value="hosp" id="checkAppType14" readonly="readonly"/>&nbsp;Anti
																			Arrythmics
																		</label>
																	</div>
																</div>
																<div class="col-sm-12-1">
																	<div class="divide-20"></div>
																	<div class="divide-20"></div>

																	<div class="form-group Remove-Padding col-md-12-1">
																		<label class="TextFont" style="margin-left: 35px;">Other
																			: </label>
																		<textarea type="text" id="presentMedicationsOther" rows="2"
																			cols="10" class="form-control"
																			style="margin-left: 20px;" readonly="readonly"></textarea>
																	</div>
																</div>
																<div class="col-sm-12-1">
																	<div class="divide-20"></div>
																	<div class="divide-20"></div>
																	<div class="form-group Remove-Padding col-md-12-1"
																		style="margin-bottom: 10px;">
																		<label class="TextFont" style="margin-left: 35px;">PREVIOUS
																			ANAESTHETIC EXPERIENCE : </label>
																		<textarea type="text" id="prevexp" rows="2" cols="10"
																			class="form-control" style="margin-left: 20px;" readonly="readonly"></textarea>
																	</div>
																</div>
															</div>
														</div>
														<!-- *************End PRESENT MEDICATIONS tab-content-->

														<!-- *************Start EXAMINATION FINDINGS MEDICATIONS tab-content-->
														<div id="ExaminationFindMedications"
															class="tab-pane fade in">
															<div
																style="text-align: center; font-weight: bold; font-size: medium;"
																class="col-sm-9-1 center"></div>

															<div class="col-sm-12-1">
																<div class="divide-20"></div>
																<div class="divide-10"></div>
																<!-- <div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont">Pluse&nbsp;(/ min) :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="pulse" value="">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont">BP &nbsp;(/ mm Hg.) :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="bp" value="">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont">Resp.&nbsp;(/ min ):</label> <input
																		type="text" class="form-control input-SmallText"
																		id="resp" value="">
																</div> -->
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Pallor : </label>
																	<textarea type="text" id="pallor" rows="1" cols="10"
																		class="form-control" readonly="readonly"></textarea>
																</div>

																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Icterus : </label>
																	<textarea type="text" id="ict" rows="1" cols="10"
																		class="form-control" readonly="readonly"></textarea>
																</div>
															</div>
															<div class="col-sm-12-1" style="padding-top: 3%;">
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Cyanosis:</label>
																	<textarea type="text" class="form-control" rows="1"
																		cols="10" id="cya" value="" readonly="readonly"></textarea>
																</div>
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Clubbing:</label>
																	<textarea type="text" class="form-control" rows="1"
																		cols="10" id="club" value="" readonly="readonly"></textarea>
																</div>
															</div>
															<div class="col-sm-12-1" style="padding-top: 3%;">
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Oedema:</label>
																	<textarea type="text" class="form-control " rows="1"
																		cols="10" id="ode" value="" readonly="readonly"></textarea>
																</div>
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Veins:</label>
																	<textarea type="text" class="form-control" rows="1"
																		cols="10" id="veins" value="" readonly="readonly"></textarea>
																</div>
															</div>
															<div class="col-sm-12-1" style="padding-top: 3%;">
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Obesity:</label>
																	<textarea type="text" class="form-control " rows="1"
																		cols="10" id="obs" value="" readonly="readonly"></textarea>
																</div>
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Neck:</label>
																	<textarea type="text" class="form-control" rows="1"
																		cols="10" id="neck" value="" readonly="readonly"></textarea>
																</div>
															</div>


															<div class="col-sm-12-1" style="padding-top: 3%;">
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Jaw:</label>
																	<textarea type="text" class="form-control " rows="1"
																		cols="10" id="jaw" value="" readonly="readonly"></textarea>
																</div>
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Teeth:</label>
																	<textarea type="text" class="form-control" rows="1"
																		cols="10" id="teeth" value="" readonly="readonly"></textarea>
																</div>
															</div>

															<div class="col-sm-12-1"
																style="margin-bottom: 3px; margin-top: 13px;">
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Spine:</label>
																	<textarea type="text" class="form-control" rows="1"
																		cols="10" id="spine" value="" readonly="readonly"></textarea>
																</div>
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">BHT &nbsp;(Sec) :</label>
																	<textarea type="text" class="form-control" rows="1"
																		cols="10" id="bht" value="" readonly="readonly"></textarea>
																</div>
															</div>
															<!-- 	<div class="col-sm-12-1" style="padding-top: 2%;">
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont">CVS :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="cvs" value="">&nbsp;
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont">RS :</label> <input type="text"
																		class="form-control input-SmallText" id="rs" value="">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont">CNS :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="cns" value="">&nbsp;
																</div>
															</div> -->
														</div>
														<!-- *************End EXAMINATION FINDINGS MEDICATIONS tab-content-->

														<!-- *************Start INVESTIGATIONS tab-content-->
														<div id="Investigations" class="tab-pane fade in">
															<div
																style="text-transform: capitalize; font-weight: bold; font-size: medium;"
																class="col-sm-12-1 center"></div>
															<div class="divide-20"></div>
															<div class="divide-20"></div>
															<div class="col-sm-12-1">
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> Blood Group :</label> <select
																		class="form-control input-SmallText TextFont"
																		id="blood" name="blood"  readonly="readonly">
																		<option value="">-Select Blood Group-</option>
																		<option value="A +ve">A +</option>
																		<option value="A -ve">A -</option>
																		<option value="AB +ve">AB +</option>
																		<option value="AB -ve">AB -</option>
																		<option value="B +ve">B +</option>
																		<option value="B -ve">B -</option>
																		<option value="O +ve">O +</option>
																		<option value="O -ve">O -</option>
																	</select>
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> Hb &nbsp;(gms%) :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="hb" value="" readonly="readonly">&nbsp;
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> Platelets:</label> <input
																		type="text" class="form-control input-SmallText"
																		id="plat" value="" readonly="readonly">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> HIV :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="hiv" value="" readonly="readonly">&nbsp;
																</div>

																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> TC :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="tc" value="" readonly="readonly">
																</div>
															</div>
															<div class="col-sm-12-1">
																<div class="divide-10"></div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> P :</label> <input type="text"
																		class="form-control input-SmallText" id="p" value="" readonly="readonly">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> L :</label> <input type="text"
																		class="form-control input-SmallText" id="l" value="" readonly="readonly">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> E :</label> <input type="text"
																		id="e" class="form-control input-SmallText" value="" readonly="readonly">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> M :</label> <input type="text"
																		class="form-control input-SmallText" id="m" value="" readonly="readonly">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> B :</label> <input type="text"
																		class="form-control input-SmallText" id="bone"
																		value="" readonly="readonly">
																</div>
															</div>
															<div class="col-sm-12-1">
																<div class="divide-20"></div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> Smear :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="smear" value="" readonly="readonly">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> ESR &nbsp;( mm ) :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="esr" value="" readonly="readonly">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> Urine :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="urine" value="" readonly="readonly">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> BUN :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="bun" value="" readonly="readonly">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> BSL(R)&nbsp; ( mg% ) :</label>
																	<input type="text" class="form-control input-SmallText"
																		id="bsl" value="" readonly="readonly">
																</div>
															</div>
															<div class="col-sm-12-1">
																<div class="divide-20"></div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> F &nbsp;( mg% ) :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="f" value="" readonly="readonly">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> PP &nbsp;( mg% ) :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="pp" value="" readonly="readonly">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> K+ &nbsp;( mg% ) :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="kelec" value="" readonly="readonly">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> Cl+ &nbsp;( mg% ) :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="clelec" value="" readonly="readonly">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> S.Electrolytes Na+
																		&nbsp;( mg% ) :</label> <input type="text"
																		class="form-control input-SmallText" id="naelec"
																		value="" readonly="readonly">
																</div>
															</div>

															<div class="col-sm-12-1">
																<div class="divide-20"></div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> B :</label> <input type="text"
																		class="form-control input-SmallText" id="btwo"
																		value="" readonly="readonly">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> CT :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="ct" value="" readonly="readonly">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> PT :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="pt" value="" readonly="readonly">
																</div>
																<div class="form-group Remove-Padding col-md-3-1"
																	style="width: 39%; margin-left: 8px;">
																	<label class="TextFont"> S.Creat :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="screat" value="" readonly="readonly">
																</div>
															</div>

															<div class="col-sm-12-1">
																<div class="divide-20"></div>
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont"> ECG :</label>
																	<textarea type="text" class="form-control" rows="1"
																		cols="10" id="ecg" value="" readonly="readonly"></textarea>
																</div>
																<div class="form-group Remove-Padding col-md-6-1" style="margin-left: 0px;">
																	<label class="TextFont"> X Ray Chest:</label>
																	<textarea type="text" class="form-control" rows="1"
																		cols="10" id="xray" value="" readonly="readonly"></textarea>
																</div>
															</div>

															<div class="col-sm-12-1" style="margin-bottom: 10px;">
																<div class="divide-20"></div>
																<div class="col-md-12-1">
																	<label class="TextFont"> Other :</label>
																	<textarea type="text" class="form-control" rows="1"
																		cols="10" id="other" value="" readonly="readonly"></textarea>
																</div>
															</div>
														</div>
														<!-- *************End INVESTIGATIONS tab-content-->


														<!-- *************Start Plan Of Anasthia tab-content-->
														<div id="PlanOfAnasthia" class="tab-pane fade in">
															<div
																style="text-transform: capitalize; padding-top: 5%; font-weight: bold; font-size: medium;"
																class="col-sm-12-1 center"></div>
															<div class="col-sm-12-1">
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont"> RISK ASSESSMENT:ASA:</label>
																	<textarea type="text" class="form-control"
																		id="riskassess" readonly="readonly"></textarea>
																</div>
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont"> PROPOSED PLAN OF
																		ANAESTHESIA:</label>
																	<textarea type="text" class="form-control" id=proplan readonly="readonly"></textarea>
																</div>
															</div>
															<div class="col-sm-12-1" style="padding-top: 5%">
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont"> PRE-OPERATIVE
																		INSTRUCTION:</label>
																	<textarea type="text" id="preoper"
																		class="form-control " readonly="readonly"></textarea>
																</div>
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont"> PRE MEDICATION :</label>
																	<textarea type="text" id="premed" class="form-control" readonly="readonly"></textarea>
																</div>
															</div>



														</div>

														<!-- *************End Plan Of Anasthia tab-content-->








														<!-- 	
															
													<!-- 		<div class="col-sm-12-1">
																<div class="divide-20"></div>
																
																
															</div> -->

														<!-- <div class="col-sm-12-1" style="padding-bottom: 5px;">
																<div class="divide-20"></div>
															
															</div> -->
														<!-- 																						<div class="col-sm-4-1"
																							style="padding-left: 700px;">
																							Name&nbsp;of&nbsp;Anaesthesiologist&nbsp;Performing&nbsp;PAA:&nbsp;&nbsp;</div>
																						<div id="anaesname" class="col-sm-3-1"
																							style="padding-left: 800px;"></div> -->

													</div>


												</div>
												<!-- *************preanaesthetic tab-content-->
												<!-- *************End PRESENT MEDICATIONS tab-content-->

											</div>
							
											<div ID="AnaesthesiaApproval" class="tab-pane fade in">
												<div
													style="text-transform: capitalize; font-weight: bold; font-size: medium;"
													class="col-sm-12-1 center"></div>
												<div class="divide-20"></div>
												<div class="divide-20"></div>

												<div class="col-sm-12-1">
													<div class="col-sm-6-1"
														style="padding: 3%; border-right: 2px solid #ddd;">
														<div class="form-group Remove-Padding col-md-10-1">
															<label class="TextFont"> Pre Of Notes :</label>
															<textarea type="text" id="preOfNotes" rows="5" cols="10"
																class="form-control" readonly="readonly"></textarea>
														</div>

													</div>

													<div class="col-sm-6-1">
														<div class="col-sm-12-1">
															<div class="divide-20"></div>
															<div class="divide-10"></div>
															<div class="col-sm-12-1">
																<div class="col-sm-3-1">
																	<label class="TextFont"></label>
																</div>
																<div class="col-sm-3-1" style="margin-top: 2px;">
																	<label class="radio TextFont Remove-Padding"> <input
																		class="" type="radio" id="approval" name="approval"
																		value="approval"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;"  readonly="readonly" disabled />&nbsp;Approval
																	</label>
																</div>
																<div class="col-sm-3-1" style="margin-top: 2px;">
																	<label class="radio TextFont Remove-Padding"> <input
																		type="radio" id="disapproval" name="approval"
																		value="disApproval"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;"  readonly="readonly" disabled/>&nbsp;Disapproval
																	</label>
																</div>
																<div class="col-sm-3-1">
																	<label class="TextFont"></label>
																</div>
															</div>
														</div>
														<div class="col-sm-12-1" style="margin-bottom: 10px;">
															<div class="divide-20"></div>
															<div class="divide-20"></div>
															<div class="col-sm-1-1">
																<label class="TextFont"></label>
															</div>
															<div class="form-group Remove-Padding col-md-10-1">
																<label class="TextFont" style="margin-left: 35px;">Remark
																	:</label>
																<textarea id="approvalRemark" class="form-control"
																	style="margin-left: 20px; size: 60%" cols="8" rows="3"
																	type="text" readonly="readonly"></textarea>
															</div>
															<div class="col-sm-1-1">
																<label class="TextFont"></label>
															</div>
														</div>


													</div>
												</div>
												<!-- *************End Anaesthesia Approval  -->
											</div>	
											<div id="ConductOfAnaesthia" class="tab-pane fade in">
												<!-- Start Code for row1 CPOE GUI -->

												<div class="tabbable tabs-left col-md-12-1"
													style="margin-top: 0px; margin-left: 5px;">
													<ul class="nav nav-tabs colorChanges" style="height: 250px;">
														<li class="active"><a href="#PreMedicationsOfConduct"
															id="idPreMedicationsOfConductTAB" data-toggle="tab">
																Pre Medications </a></li>
														<li><a href="#PostOperativeOfConduct"
															id="idPostOperativeOfConductTAB"
															data-toggle="tab">Post Operative</a></li>
													</ul>

													<div class="tab-content col-md-10-1"
														style="margin-top: 0px;">
														<!-- *************Start Pre Medications Of Conduct tab-content-->
														<div id="PreMedicationsOfConduct"
															class="tab-pane fade in active">
															<div
																style="text-transform: capitalize; font-weight: bold; font-size: medium;"
																class="col-sm-12-1"></div>
															<div class="divide-20"></div>
															<div class="divide-20"></div>
															<div class="col-sm-12-1">

																<div class="col-sm-12-1">
																	<div class="col-sm-2-1">
																		<label class="TextFont">PRE MEDICATION -:</label>
																	</div>

																	<div class="form-group Remove-Padding col-md-3-1"
																		style="margin-left: 24px;">
																		<label class="TextFont"> Induction :</label> <input
																			id="txtInduction" name="txtInduction"
																			class="form-control input-SmallText" type="text"
																			value="" maxlength="45" readonly="readonly">
																	</div>

																	<div class="form-group Remove-Padding col-md-3-1">
																		<label class="TextFont"> Relaxant :</label> <input
																			name="txtRelax" id="txtRelax"
																			class="form-control input-SmallText" type="text"
																			value="" maxlength="45" readonly="readonly">
																	</div>
																	<div class="form-group Remove-Padding col-md-3-1"
																		style="margin-top: 0px;">
																		<div class="col-md-12-1">
																			<label class="TextFont">Date <b
																				style="width: 1%; color: red; float: right;">&nbsp;*</b>
																			</label> <input type="text"
																				class="form-control input-SmallText"
																				placeholder="Date" id="date" readonly="readonly"
																				value="<%=todays_date%>"
																				onclick="displayCalendar(document.getElementById('date'),'dd/mm/yyyy',this)"
																				onchange="checkFutureDate('conductAnaesthesia')" readonly="readonly">

																		</div>
																	</div>
																</div>

																<div class="col-sm-12-1" style="margin-top: 2%;">
																	<div class="col-sm-2-1">
																		<label class="TextFont">Regional -:</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct8" 
																			id="checkAppTypeForConduct8" value="hyper"  readonly="readonly"/> Drug
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct9"
																			id="checkAppTypeForConduct9" value="hyper"  readonly="readonly"/> Needle
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct10"
																			id="checkAppTypeForConduct10" value="hyper"  readonly="readonly"/> Catheter
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct11"
																			id="checkAppTypeForConduct11" value="hyper"  readonly="readonly"/> Space
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct12"
																			id="checkAppTypeForConduct12" value="hyper"  readonly="readonly"/> Position
																		</label>
																	</div>


																</div>

																<div class="col-sm-12-1" style="margin-top: 3%;">
																	<div class="col-sm-2-1">
																		<label class="TextFont">Maintenance -:</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct13"
																			id="checkAppTypeForConduct13" value="hyper"  readonly="readonly"/> N20
																		</label>
																	</div>
																	<div class="col-md-1-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct14"
																			id="checkAppTypeForConduct14" value="hyper"  readonly="readonly"/> 02
																		</label>
																	</div>
																	<div class="col-md-1-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct15"
																			id="checkAppTypeForConduct15" value="hyper"  readonly="readonly"/> Air
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct16"
																			id="checkAppTypeForConduct16" value="hyper"  readonly="readonly"/> Halothane
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct17"
																			id="checkAppTypeForConduct17" value="hyper"  readonly="readonly"/> Isoflunane
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct18"
																			id="checkAppTypeForConduct18" value="hyper"  readonly="readonly"/> Sevoflunane
																		</label>
																	</div>

																</div>

																<div class="col-sm-12-1" style="margin-top: 3%;">
																	<div class="col-sm-2-1">
																		<label class="TextFont">Anaesthesia Circuit: </label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct19"
																			id="checkAppTypeForConduct19" value="hyper"  readonly="readonly"/> Open
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct20"
																			id="checkAppTypeForConduct20" value="hyper"  readonly="readonly"/> Circle
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct21"
																			id="checkAppTypeForConduct21" value="hyper"  readonly="readonly"/> NRB
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct22"
																			id="checkAppTypeForConduct22" value="hyper"  readonly="readonly"/> Bain
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct23"
																			id="checkAppTypeForConduct23" value="hyper"  readonly="readonly"/> Laryngeal Mask
																		</label>
																	</div>
																</div>
																<div class="col-sm-12-1" style="margin-top: 3%;">
																	<div class="col-sm-2-1">
																		<label class="TextFont">Ventilation : </label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct24"
																			id="checkAppTypeForConduct24" value="hyper"  readonly="readonly"/> Spontaneous
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct25"
																			id="checkAppTypeForConduct25" value="hyper"  readonly="readonly"/> Controlled
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct26"
																			id="checkAppTypeForConduct26" value="hyper"  readonly="readonly"/> Manual
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct27"
																			id="checkAppTypeForConduct27" value="hyper"  readonly="readonly"/> Auto
																		</label>
																	</div>
																</div>
																<div class="col-sm-12-1"
																	style="margin-top: 1%; margin-bottom: 10px;">
																	<div class="divide-20"></div>
																	<div class="col-sm-2-1">
																		<label class="TextFont">REVERSAL : </label>
																	</div>
																	<div class="col-md-10-1" style="">
																		<label class="TextFont"></label>
																		<textarea id="txtReversal"
																			style="width: 95%; margin-left: 18px;" rows="4"
																			cols="10" name="txtFindings" value="" readonly="readonly"></textarea>
																	</div>
																</div>
															</div>
														</div>
														<!-- *************End Pre Medications Of Conduct tab-content-->

														<!-- *************Start Post Operative Of Conduct tab-content-->
														<div id="PostOperativeOfConduct" class="tab-pane fade in">
															<div class="divide-20"></div>
															<div class="divide-20"></div>
															<div class="col-sm-12-1">
																<div class="col-sm-2-1">
																	<label class="TextFont">PRE MEDICATION - :</label>
																</div>
																<div class="form-group Remove-Padding col-md-3-1"
																	style="margin-left: 2%;">
																	<label class="TextFont"> Pulse :</label> <input
																		name="txtOPPulse" id="txtOPPulse"
																		class="form-control input-SmallText" type="text"
																		value="" maxlength="45" readonly="readonly">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> B.P (Mm Hg.):</label> <input
																		name="txtOPBp" id="txtOPBp"
																		class="form-control input-SmallText" type="text"
																		value="" maxlength="45" readonly="readonly">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> R.R (/min.):</label> <input
																		name="txtOPRr" id="txtOPRr"
																		class="form-control input-SmallText" type="text"
																		value="" maxlength="45" readonly="readonly">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> Color :</label> <input
																		name="txtOPColor" id="txtOPColor"
																		class="form-control input-SmallText" type="text"
																		value="" maxlength="45" readonly="readonly">
																</div>
															</div>

															<div class="col-sm-12-1" style="margin-top: 3%;">
																<div class="col-sm-2-1">
																	<label class="TextFont">Recovery - :</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct1"
																		id="checkApplTypeForConduct1" value="hyper"  readonly="readonly"/> &nbsp;Cough
																		Reflex
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct2"
																		id="checkApplTypeForConduct2" value="hyper"  readonly="readonly"/> &nbsp;Eyes
																		Opening
																	</label>
																</div>
															</div>

															<div class="col-sm-12-1" style="margin-top: 3%;">
																<div class="col-sm-2-1">
																	<label class="TextFont">State of Consciousness
																		- :</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct3"
																		id="checkApplTypeForConduct3" value="hyper"  readonly="readonly"/> &nbsp;Pain
																		Perception
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct4"
																		id="checkApplTypeForConduct4" value="hyper"  readonly="readonly"/> &nbsp;Motor
																		Response
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct5"
																		id="checkApplTypeForConduct5" value="hyper"  readonly="readonly"/> &nbsp;Obeys
																		Command
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct6"
																		id="checkApplTypeForConduct6" value="hyper"  readonly="readonly"/> &nbsp;Verbal
																		Response
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct7"
																		id="checkApplTypeForConduct7" value="hyper"  readonly="readonly"/> &nbsp;Fully
																		Awake
																	</label>
																</div>
															</div>

															<div class="col-sm-12-1" style="margin-top: 3%;">
																<div class="col-sm-2-1">
																	<label class="TextFont">Post Op.Problems - :</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct8"
																		id="checkApplTypeForConduct8" value="hyper"  readonly="readonly"/> Sore throat
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct9"
																		id="checkApplTypeForConduct9" value="hyper"  readonly="readonly"/> Urine Ret
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct10"
																		id="checkApplTypeForConduct10" value="hyper" readonly="readonly" /> Nausea
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct11"
																		id="checkApplTypeForConduct11" value="hyper" readonly="readonly" /> Vomiting
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct12"
																		id="checkApplTypeForConduct12" value="hyper" readonly="readonly" />
																		Thrombophlebitis
																	</label>
																</div>
															</div>
															<div class="col-sm-12-1" style="margin-top: 3%;">
																<div class="col-sm-2-1">
																	<label class="TextFont"> </label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct13"
																		id="checkApplTypeForConduct13" value="hyper"  readonly="readonly"/>Headache
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct14"
																		id="checkApplTypeForConduct14" value="hyper"  readonly="readonly"/>Backache
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct15"
																		id="checkApplTypeForConduct15" value="hyper"  readonly="readonly"/>Other
																	</label>
																</div>
															</div>
															<div class="col-sm-12-1"
																style="margin-top: 3%; padding-bottom: 2%;">
																<div class="col-sm-2-1">
																	<label class="TextFont">Consumers Opinion - : </label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct16"
																		id="checkApplTypeForConduct16" value="hyper"  readonly="readonly"/>Pleasant
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct17"
																		id="checkApplTypeForConduct17" value="hyper"  readonly="readonly"/>Unpleasant
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct18"
																		id="checkApplTypeForConduct18" value="hyper"  readonly="readonly"/>Nightmarish
																	</label>
																</div>
															</div>
															</div>
														<!-- *************End Post Operative Of Conduct tab-content-->
													</div>
												</div>
											</div>
								
								
													<!-- Start Code for #AnaesthesiaTab GUI -->
													<div class="tab-pane fade" id="iAnaesthesiaTab">
													</div>
													<!-- End Code for AnaesthesiaTab GUI -->
													</div>
													<!-- End Code for Protocol GUI -->
													
													</div>
												<div style="display:none" id="ImgData"></div>
												<!-- Modal for view upload document -->
																<div class="modal fade bs-example-modal-lg" id="viewOTDocModal"
																	tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
																	aria-hidden="true">
																	<div class="modal-dialog modal-dialog modal-lg">
																		<div class="modal-content">
																			<div class="modal-header">
																				<button type="button" class="close" data-dismiss="modal"
																					aria-label="Close">
																					<span aria-hidden="true">&times;</span>
																				</button>
																				<div class="row" >
																					<div class="col-md-4 col-xs-11">
																						<h3 class="modal-title" id="myModalLabel">View document</h3>
																					</div><br><br>
																					<div class="col-md-6 col-xs-11">
																						<h5>Notes: </h5><h6 id="documentOTComment"> </h6>
																					</div>
																				</div>
																			</div>
																			<div class="modal-body">
																				<iframe id="ViewOTDocumemnt" src="" width="100%" height="530px"></iframe>
																			</div>
																		</div>
																	</div>
																</div>
															<!-- End of Modal for view upload document -->
															<!-- Modal for view hra question -->
																<div class="modal fade bs-example-modal-lg" id="viewHRAQueModal"
																	tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
																	aria-hidden="true">
																	<div class="modal-dialog modal-dialog modal-lg">
																		<div class="modal-content">
																			<div class="modal-header">
																				<button type="button" class="close" data-dismiss="modal"
																					aria-label="Close">
																					<span aria-hidden="true">&times;</span>
																				</button>
																				<div class="row" >
																					<div class="col-md-4 col-xs-11">
																						<h3 class="modal-title" id="myModalLabel">Question</h3>
																					</div>
																				</div>
																			</div>
																			<div id="hraQuestionBody" class="modal-body" style="max-height: 500px; overflow: auto;">
																			</div>
																		</div>
																	</div>
																</div>
															<!-- End of Modal for view hra question -->
											</div>
										<!-- End Code for #Upload_Document GUI -->

										</div>
										<!-- End Code for tab-content GUI -->
									</div>
									</div>

										
										<!-- End Table Gui -->
									</div>
									<!-- End class="panel-body" -->
								</div>
							</div>
							<!-- End id="content" -->
						</div>
						<!-- End class="row" -->
					</div>
					<!-- class="container" -->
				</div>
				<!-- id="main-content" -->
			</div>
			<!-- id="outer" -->
												
			<div><%@include file="Footer.jsp"%></div>
			<div id="opObject" style="display: none;"></div>
			<div id="POP" style="display: none;"></div>
			<input type="hidden" id="" value="" />
			<input type="hidden" id="todays_date" value="<%=todays_date%>" />
			<input type="hidden" id="pageName" value="OTOperationDetails" />
			<input type="hidden" id="pId" value="<%=request.getParameter("pId")%>"/>
			<input type="hidden" id="tId" value="<%=request.getParameter("tId")%>"/>
			<input type="hidden" id="tr_Id" value="<%=request.getParameter("tId")%>"/>
			<input type="hidden" id="pid" value="<%=request.getParameter("pId")%>"/>
			<input type="hidden" id="Id" value="<%=request.getParameter("Id")%>"/>
			<input type="hidden" id="tomId" value="<%=request.getParameter("tomId")%>"/>
			<input type="hidden" id="cType" value="<%=request.getParameter("cType")%>"/>
			<input type="hidden" id="unitid" value="<%=session.getAttribute("uId")%>"> 
			<input type="hidden" id="docId" value=""/>
			<input type="hidden" id="isaveID" value=""/>
			<input type='hidden' value='' id='addRowCount'/>
			<input type='hidden' value='' id='RowCount'/>
			<input type='hidden' value='1' id='adRowCount'/>
			<input type='hidden' value='' id='action'/>
			<input type='hidden' value='0' id='idOTNote'/>
			<input type="hidden" id="diagno_slave_id" value="0"/>
			<div id="assesmentDetails" style="display: none;"></div>
			<div id="customizeTemplateDiv" style="display: none;"></div>
			<input type='hidden' value='0' id='userDocId'/>
			<div id='objhraque' style="display: none;"></div>
			<input type="hidden" id="divIPDAjaxresponse">
			<div id="divPatId" style="display: none;"><%=request.getParameter("myObj")%></div>
		</c:if>
	</section>
</body>
</html>