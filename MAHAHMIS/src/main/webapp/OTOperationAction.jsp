<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<title>OT Operation Action</title>
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
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />
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
<script type="text/javascript" src="js/operation.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<script type="text/javascript" src="js/finance.js"></script>
<script type="text/javascript" src="js/registration.js"></script>

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
		App.setPage("OTOperationAction"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>
<script type="text/javascript">
	onload = function() {
		
		
		var todays_date = $("#todays_date").val();
		var arrDate = todays_date.split("-");
		var date = arrDate[0] + "/" + arrDate[1] + "/" + arrDate[2];
		$("#popup_container2").val(date);
		/* PatientCommanInfo(); */
		// getpatientTrIddrdesk(<%=request.getParameter("tId")%>);
		getIpdPatientHeaderInfo(<%=request.getParameter("tId")%>);
		autoCompTable("[]","userName");
		fetchOperationDocList();
		//setAutoDoctorNameForTeamMember("userName", "onload");
		fetchPreOpPre();
		fetchOTDoc();
		fetchOTDescription();
		showAssessmentTemp();
		fetchCustomizeTemplateListOT();
		setTemplateFunc();
		fetchOTNotesData("OT");
		fetchTempTopicList('OTOperationAction');
		defaulthraListView('OTOperationAction','onload');
		defaultCheckListView('OTOperationAction','onload');
		$("#idOperationDetails").css("background-color", "#ced9ae");
		getConsultantDrName(<%=request.getParameter("tId")%>);
		
	}
</script>
<script lang="Javascript">
$(document).click(function() {
	
	/* $('input[type="file"]').ajaxfileupload({
		'action' : 'UploadDocServlet1',
		
	}); */

});
</script>
<style>
    .typeahead {
	max-width: 450px;
}
</style>
<script type="text/javascript">
	function addPreOpPrep(RowCount) {
		var w =  $("#adRowCount").val();
		var hiddenRowCount = document.getElementById(RowCount);
		var rowCount = hiddenRowCount.value;
		
		if (rowCount != 0) {
			var chklst = $("#byName" + rowCount + "").val();
			var time = $("#time" + rowCount + "").val();
			if (chklst == "" || time == "") {
				alert("Please fill the Checklist Name and Time in Previous Row...");
				return false;
			}
		}
		
		var chklst = $("#byName" + rowCount).val();
		var chbx = $("#chbx" + rowCount).val();
		var time = $("#time" + rowCount).val();
		var rmk = $("#rmk" + rowCount).val();

		if(chklst == "" && chbx == "" && time == "" && rmk == "") {
			alert("Please fill the previous added row.");
			return false;
		}

		rowCount++;
		divId = "div" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', divId);
		document.getElementById("PreOpPrepList").appendChild(x);
		document.getElementById(divId).innerHTML = '<td	class="left" style="width: 2%;">'
				+ rowCount
				+ '</td><td	class="col-md-5-1" style="height: 21.5px; padding-left: 50px;"><input type="text" class="typeahead form-control input-SmallText" onkeyup=defaultCheckListView("PreOperativeCheckListMasterDetails","search",this.id) id="byName'
				+ rowCount
				+ '" style="width: 100%"/></td><td class="col-md-1-1 center" style="height: 21.5px;"><input type="checkbox" id="chbx'
				+ rowCount
				+ '"/></td><td class="col-md-2-1 center" style="height: 21.5px;"><input readonly="readonly" class="form-control input-SmallText" type="text" id="time'
				+ rowCount
				+ '" onkeypress="return validateComma(event)"/></td><td class="col-md-1-1 center" style="height: 21.5px;"><textarea rows="1" cols="20" id="rmk'
				+ rowCount
				+ '" onkeypress="return validateComma(event)"></textarea><td class="col-md-1-1 center" style="height: 21.5px;"><input type="checkbox" onClick="removePreOpPrep(0,'+rowCount+')" id="action'
				+ rowCount
				+ '" /></td></div>';
				
		$("#RowCount").val(rowCount);
		$("#addRowCount").val(w);

		$('#time' + rowCount).datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 15
		});
		w++;
		$("#adRowCount").val(w);
}
</script>
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
					<%@include file="Menu_Header_Nobel.jsp"%>
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
												<li><a href="OTDashboard.jsp">Pre-Operation</a></li>
												<li><a href="OTOperationAction.jsp">OT Operation Action</a></li>
											</ul>
										</div>
									</div>
								</div>
								<div id="commonPatInfo">
									<!--adde by paras @date:17-jun-2017  -->
									<div class="panel panel-primary" style="margin-top: -20px;">
										<div class="panel-body">
											<div class="row">
												<div class="col-md-1">
													<img id="patImg" style="width: 100%;height: 45px" class="img-responsive" src="ehat-design/img/profile/avatar.jpg" alt="">
												</div>
												<div class="col-md-10" style="margin-top: 10px;">
													<div class="col-md-3">
														<div class="form-group">
														<input type="hidden"  id="pt_Id" value="0">
														<input type="hidden"  id="tr_Id" value="<%=request.getParameter("treatID")%>">
														<input type="hidden"  id="bill_Id" value="0">
															<label class="control-label lblBold" id="lblCenterPatientId">Patient Id :</label>  
															<label id="patientId" class="control-label" style="display: none;"></label> 
															<label id="centerPatientId" class="control-label"></label>
														</div>
													</div>
													
													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">Age :</label> <label id="age" class="control-label"></label>
														</div>
													</div>
			
													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">Ipd No :</label> 
															<label id="ipdNo" class="control-label"></label>
			
														</div>
													</div>
			
													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">BillNo: </label>  <label id="billNo" class="control-label"></label> 
			
														</div>
													</div>
			
													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">Gender :</label> <label id="sex" class="control-label">male</label>
			
														</div>
													</div>
			
													<div class="col-md-3" >
														<div class="form-group">
															<label class="control-label lblBold">Bill Category :</label>
															<label id="billCategoty" class="control-label"> </label>
			
														</div>
													</div>
													
													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">Corporate :</label> <label id="corporate" class="control-label"> </label>
			
														</div>
													</div>
			
													<div class="col-md-3" >
														<div class="form-group">
															<label class="control-label lblBold">DOA : </label> <label id="doa" class="control-label">- </label>
			
														</div>
													</div>
			
													<div class="col-md-3" >
														<div class="form-group">
															<label class="control-label lblBold">DOD :</label> <label id="dod" class="control-label">- </label>
			
														</div>
													</div>
													
													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">Treatment Id :</label> <label id="treatmentId" class="control-label"> <%=request.getParameter("treatID")%></label>
			
														</div>
													</div>
													
													<div class="col-md-5">
														<div class="form-group">
															<label class="control-label lblBold">Patient Name :</label>
															<label id="patientName" class="control-label"></label>
			
														</div>
													</div>
			
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label lblBold">Consulting
																Doctor :</label> <label id="consultingDoctorr" class="control-label"> </label>
			
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>						
								</div>
								
								<div class="panel panel-default" style="margin-top: 2%;">
									<div class="panel-body" style="height: 600px;">
									<div style="width: 100%; margin-left: 0px;" id="rightContActual">

									<!-- Start Tab UI -->
									<div style="margin-top: 0px; margin-left: 0px;" id="#deskTabs" class="col-md-12-1">
										<!-- Start BOX -->
										<div class="col-md-12-1" style="height: 400px;">
											<div class="divide-10"></div>
											<div class="tabbable col-md-12-1">
												<ul class="nav nav-tabs mainTab">
													<li class="active"><a href="#iOperationDetails" id="idOperationDetails" data-toggle="tab"><span class="hidden-inline-mobile">Operation Details</span></a></li>
													<li><a href="#iPreOpPrep" data-toggle="tab"><span class="hidden-inline-mobile">Pre-Op Prep</span></a></li>
													<li><a href="#iProtocol" data-toggle="tab"><span class="hidden-inline-mobile">Protocol</span></a></li>
													<li><a href="#iOTNotes" onclick="fetchOTNotesData('OT')" data-toggle="tab"><span class="hidden-inline-mobile">OT Notes</span></a></li>
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
																			<label onclick="ShowAddDocPopUp()" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;" class="btn">
																				<i class="fa fa-plus"></i> Add Team Member
																			</label>
																		</div>
																		<!-- End Header for New Edit Delete Option -->
																		<div style="margin-top: 0px;" class="col-sm-12-1">
																			<table class="table table-bordered table-condensed header-fixed cf' style='width : 1090px; margin-top: 10px;">
																				<thead>
																					<tr>
																						<th><div class="TextFont">#</div></th>
																						<th style="height: 21.5px; width: 20%; padding-left: 30px;" ><div class="TextFont">Name</div></th>
																						<th style="height: 21.5px; width: 10%; padding-left: 30px;" ><div class="TextFont">Type</div></th>
																						<th style="height: 21.5px; width: 10%; padding-left: 30px;" ><div class="TextFont">Contact</div></th>
																						<th style="height: 21.5px; width: 20%; padding-left: 50px;" ><div class="TextFont">E-Mail</div></th>
																						<th style="height: 21.5px; width: 6%; padding-left: 10px;" ><div class="TextFont">Remove</div></th>
																						<th style="height: 21.5px; width: 6%; padding-left: 10px;" ><div class="TextFont">Confirm</div></th>
																						<th style="height: 21.5px; width: 8%; padding-left: 10px;" ><div class="TextFont">Confirm Time</div></th>
																						<th style="height: 21.5px; width: 6%; padding-left: 10px;" ><div class="TextFont">Arrival</div></th>
																						<th style="height: 21.5px; width: 8%; padding-left: 10px;" ><div class="TextFont">Arrival Time</div></th>
																						<th style="height: 21.5px; width: 6%; padding-left: 10px;" ><div class="TextFont">Absent</div></th>
																						
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
															<div class="modal-content">
																<div class="modal-header">
																	<h4 id="testHead" class="col-md-6">Narration for Delete:</h4>
																	
																	<button class="btn btn-xs pull-right" aria-label="Close"
																		data-dismiss="modal" type="button" onclick="HideNarraPopUp()">
																		<i class="fa fa-times"></i>
																	</button>&nbsp&nbsp&nbsp
																	<button class="btn btn-xs btn-save pull-right" title="Save" data-original-title="Save" data-toggle="tooltip"
																		data-placement="left" id="isaveNarra1" style="margin-right: 5px" onclick="deleteDocRecord()">
																		<i class="fa fa-save"></i>
																	</button>
																</div>
																<div class="modal-body" style="margin-top: 10px">
																	<div class="col-md-8">
																		<div class="col-md-12">
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
															<div class="modal-content">
																<div class="modal-header">
																	<h4 id="testHead" class="col-md-6">Narration for Absent:</h4>
																	<button class="btn btn-xs pull-right" aria-label="Close"
																		data-dismiss="modal" type="button" onclick="HideNarraPopUp()">
																		<i class="fa fa-times"></i>
																	</button>
																	<button class="btn btn-xs btn-save pull-right" title="Save" data-original-title="Save" data-toggle="tooltip"
																		data-placement="left" id="isaveNarra2" onclick="absentDoc()" style="margin-right: 5px">
																		<i class="fa fa-save"></i>
																	</button>
																	<div class="divide-20"></div>
																</div>
																<div class="modal-body" style="margin-top: 10px">
																	<div class="col-md-12">
																		<div class="col-md-6">
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
														<div class="modal-content">
															<div class="modal-header">
																<div class="row">
																	<div class="col-md-4"><h4 id="testHead">Add Doctor:</h4></div>
																	<div class="col-md-8">
																		<button class="btn btn-xs btn-danger pull-right" aria-label="Close"
																			data-dismiss="modal" type="button" style="margin: 5px" onclick="HideAddDocPopUp()">
																			<i class="fa fa-times"></i>
																		</button>&nbsp&nbsp&nbsp
																		<button class="btn btn-xs btn-success pull-right" title="Save"
																			data-original-title="Save"  style="margin: 5px" data-toggle="tooltip"
																			data-placement="left" onclick="addDocNameToList1();">
																			<i class="fa fa-save"></i>
																		</button>
																	</div>
																</div>
															</div>
															<div class="modal-body">
																<div class="col-md-12">
																	<div class="form-group col-md-4">
																		<label class="TextFont">Doctor Type</label> 
																		<select id="doctype" onchange = setUsetType(); class="form-control input-SmallText TextFont">
																			<option value="select">-Select-</option>
																			<option value="surgeon">Surgeon</option>
																			<option value="surgeon1">Surgeon 1</option>
																			<option value="surgeon2">Surgeon 2</option>
																			<option value="surgeon3">Surgeon 3</option>
																			<option value="asssurgeon">Assistant Surgeon</option>
																			<option value="assSurgeon1">Assistant Surgeon 1</option>
																			<option value="assSurgeon2">Assistant Surgeon 2</option>
																			<option value="assSurgeon3">Assistant Surgeon 3</option>
																			<option value="scrubNurse1">Scrub Nurse 1</option>
																			<option value="scrubNurse2">Scrub Nurse 2</option>
																			<option value="scrubNurse3">Scrub Nurse 3</option>
																			<option value="circulatingNurse1">Circulating Nurse 1</option>
																			<option value="circulatingNurse2">Circulating Nurse 2</option>
																			<option value="circulatingNurse3">Circulating Nurse 3</option>
																			<option value="anesthetist">Anaesthesiologist</option>
																			<option value="anaesthesiologist1">Anaesthesiologist 1</option>
																			<option value="anaesthesiologist2">Anaesthesiologist 2</option>
																			<option value="anaesthesiologist3">Anaesthesiologist 3</option>
																			<option value="assAnaesthesiologist1">Assistant Anaesthesiologist 1</option>
																			<option value="assAnaesthesiologist2">Assistant Anaesthesiologist 2</option>
																			<option value="assAnaesthesiologist3">Assistant Anaesthesiologist 3</option>
																			<option value="other">Other</option>
																		</select>
																		<input type="hidden" id="type" value="select">
																	</div>
																	<div class="form-group col-md-8">
																		<label class="TextFont">Name</label>
																		<div id="divuserName">
																			<input id='userName' autocomplete="off" name='userName'
																				onkeyup="setAutoCompleteForDoctorName(this.id,'onchange')"
																				value="" class="form-control input-SmallText" />
																				<div style="display:none;" id="selectedObj"></div>
																		</div>
																	</div>
																</div>
															</div>
															
															<div class="modal-footer"></div>
															
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
																			<label class="col-sm-2-1" style="margin-left: 0px; margin-top: 6px;">Select Template
																				<select name="selTemp" id="iSelTemp" class="form-control input-SmallText col-sm-10-1" style="margin-left: 110px; margin-top: -15px;"></select>
																			</label>
																			<label onclick="addPreOpPrep('RowCount')" style="margin-left: 100px; margin-top: 0px;" class="btn">
																				<i class="fa fa-plus"></i> Add
																			</label>
																			<button data-original-title="Save" class="btn btn-xs btn-success" data-toggle="tooltip" data-placement="left" onclick="savePreOpPrep()" id="isavePreOpPrep" type="button" style="margin-left: 700px;">
																			<i class="fa fa-save"></i>
																			</button>
																			<!-- <button data-original-title="Delete" class="btn btn-xs btn-danger" data-toggle="tooltip" data-placement="left" onclick="removePreOpPrep('RowCount',0)" id="ideletePreOpPrep" type="button" style="margin-left: 10px;">
																			<i class="fa fa-trash-o"></i>
																			</button> -->
																		</div>
																		<!-- End Header for New Edit Delete Option -->
																		<div style="margin-top: 0px;" class="col-sm-12-1">
																			<table class="table table-bordered table-condensed header-fixed cf' style='width : 1090px; margin-top: 10px;">
																				<thead>
																					<tr>
																						<th><div class="TextFont">#</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-5-1 center"><div class="TextFont">Checklist</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Confirmation</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-3-1 center"><div class="TextFont">Time</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Remark</div></th>
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Delete</div></th>
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
														<!-- ====== Row: 1 ====== -->
														<div style="margin-bottom: 10px; margin-top: 10px;" class="col-sm-12-1" id="row1" >
															<div style="margin-top: 10px; margin-left: 10px;" class="col-sm-2-1" id="col1">
															<div class="form-group Remove-Padding col-sm-12-1">
																	<div class="divide-10"></div>
																	<label class="TextFont">Diagnosis &amp; Description</label>
																	<div id="divdiagno_description">
																		<input type="text" class="typeahead form-control input-SmallText" onkeypress="setDiagnosisAutocompleteNameDescpID(this.id,'diagoname');" name="diagno_description" placeholder="Diagnosis &amp; Description" id="diagno_description">
																	</div>
																</div>
																
															</div>
															<div style="margin-top: 10px;" class="col-sm-2-1" id="col2">
																<div class="form-group Remove-Padding col-sm-12-1">
																	<div class="divide-10"></div>
																	<label class="TextFont">Diagnosis</label>
																	<div id="divdiagnosis">
																		<input type="text" class="typeahead form-control input-SmallText" onkeypress="setDiagnosisAutocompleteNameDescpID(this.id,'diagoname');" id="diagnosis" name="diagnosis" placeholder="diagnosis">
																	</div>
																</div>
															</div>
															<div style="margin-top: 10px;" class="col-sm-1-1" id="col3">
																<div class="form-group Remove-Padding col-sm-12-1">
																	<div class="divide-10"></div>
																	<label class="TextFont">ICD 10 Code</label> <input type="text" readonly="readonly" class="form-control input-SmallText" id="icd10_code" name="icd10_code" placeholder="ICD 10 Code">
																</div>
															</div>
															<div style="margin-top: 10px;" class="col-sm-1-1" id="col4">
																<div class="form-group Remove-Padding col-sm-12-1">
																	<div class="divide-10"></div>
																	<label class="TextFont">Date</label> <input type="text" class="form-control input-SmallText" onclick="displayCalendar(document.getElementById('assesmentDate'),'dd/mm/yyyy',this)" id="assesmentDate" readonly="readonly" name="date" placeholder="Date">
																</div>
															</div>
															<div style="margin-top: 10px;" class="col-sm-2-1" id="col5">
																<div class="form-group Remove-Padding col-sm-12-1">
																	<div class="divide-10"></div>
																	<label class="TextFont">Diagnosis Type</label> <select class="form-control input-SmallText" id="diagno_type" name="diagno_type">
																		<option value="Provisional">Provisional</option>
																		<option value="Confirmed">Confirmed</option>
																	</select>
																	<!-- 	<input type="text" placeholder="Diagnosis Type"
																	name="diagno_type" id="diagno_type"
																	class="form-control input-SmallText"
																	disabled="disabled" /> -->
																</div>
															</div>
															<div style="margin-top: 10px;" class="col-sm-2-1" id="col6">
																<div class="form-group Remove-Padding col-sm-12-1">
																	<div class="divide-10"></div>
																	<label class="TextFont">Comments</label> <input type="text" class="form-control input-SmallText" id="comment" name="comment" placeholder="Comments">
																</div>
															</div>
															<div style="margin-top: 20px;" class="col-sm-1-1" id="col8">
																<div class="divide-10"></div>
																<button onclick="saveEditAssesmentOPD('ipd')" class="btn btn-xs btn-success">Save</button>
															</div>

														</div>
														<!-- ======End Row: 1 ====== -->

														<!-- ====== Row: 2 ====== -->
														<div style="margin-top: 10px;" class="col-sm-12-1" id="row2">
															<div class="col-md-12-1">
																<div class="col-sm-12-1">
																	<h6 style="margin-left: 10px;">Diagnosis Assessment</h6>
																</div>
																<div style="padding-top: 10px; padding-bottom: 0px" class="box-body col-md-12-1">
																	<div class="form-group  box border col-md-12-1">
																		<!-- Start Header for New Edit Delete Option -->
																		<div style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;" class="col-md-12-1">
																			<label onclick="enableAsmntTextBoxes('Provisional');" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;" class="btn">
																				<i class="fa fa-plus"></i> New
																			</label> <label onclick="editAssesment1('Provisional');" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" class="btn"> <i class="fa fa-edit"></i> Edit
																			</label> <label onclick="deleteAssessment('Provisional');" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" class="btn">
																				<i class="fa fa-trash-o"></i> Delete
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
																	
															<div class="centered">
															<div class="divide-10"></div>
															<div class="col-md-12-1" style="height: 50px; margin-top: 10px;">
															<label class="col-md-2-1"
																style="margin-top: 3px; padding-left: 5px;">
																Select a File to Upload: </label> 
																<form id="otDocUploadfrm" name="otDocUploadfrm" enctype="multipart/form-data" method="post">
																	<input type="file" name="ifile" id="ifile" multiple="multiple" style="margin-top: 0px; cursor: pointer;"/><br />
																</form>
																
															</div>
															<div class="divide-10"></div>
															<div class="col-md-12-1" style="height: 50px;">
															<label class="col-md-2-1" style="margin-top: 3px; padding-left: 5px;">
																Comment: </label> 
																<textarea class="col-md-4-1" rows="2" cols="60" 
																style="width: 236px; height: 48px;" name="txtNotes" id="iNotes"  maxlength="120"></textarea>
															<button type="button" name="fileUp" 
																id="ifileUp" onclick="saveOTDocument()" class="btn btn-xs btn-success"
																style=" margin-top: 3px; margin-left: 80px" >Upload Document</button>
															
															</div>
															
														</div>
														
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
																						<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">View / Delete</div></th>
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
																		<textarea maxlength="120" id="iDescription" name="txtDescription" style="" cols="75" rows="2" class="col-md-4-1"></textarea>
																		<button style=" margin-top: 3px; margin-left: 80px" class="btn btn-xs btn-success" onclick="saveOTDescription()" id="isaveID" value="0" type="button">Save</button>
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
																		<input type="text" class="form-control input-SmallText capitalise" style="border: 1px solid orange;" placeholder="Estimated Blood Loss" onkeypress="return validateNumberByRegEx(this.id)" name="EBLoss" id="iEBLoss">
																		</div>
														</div>
														<div class="form-group Remove-Padding col-md-12-1">
																		<div class="col-md-5-1" style="margin-top: 30px;">
																		<label for="Actual Blood Loss" class="TextFont">Actual Blood Loss</label></div> 
																		<div class="col-md-6-1" style="margin-top: 30px;">
																		<input type="text" class="form-control input-SmallText capitalise" style="border: 1px solid orange;" placeholder="Actual Blood Loss" onkeypress="return validateNumberByRegEx(this.id)" name="ABLoss" id="iABLoss" value="0" disabled="disabled">
																		</div>
														</div>
														<div class="form-group Remove-Padding col-md-12-1">
																		<div class="col-md-5-1" style="margin-top: 30px;">
																		<label for="Instrumental Count" class="TextFont">Instrumental Count</label></div> 
																		<div class="col-md-6-1" style="margin-top: 30px;">
																		<input type="text" class="form-control input-SmallText capitalise" placeholder="Instrumental Count" onkeypress="return validateNumberByRegEx(this.id)" name="ICount" id="iICount">
																		</div>
														</div>
														<div class="form-group Remove-Padding col-md-12-1">
																		<div class="col-md-5-1" style="margin-top: 30px;">
																		<label for="Recorded By" class="TextFont">Recorded By</label></div> 
																		<div class="col-md-6-1" style="margin-top: 30px;" id = "diviRecBy">
																		<input type="text" class="typeahead form-control input-SmallText" placeholder="Recorded By" onkeypress="setUserName(this.id)" name="RecBy" id="iRecBy">
																		</div>
														</div>
														<div class="form-group Remove-Padding col-md-12-1">
																		<div class="col-md-5-1" style="margin-top: 30px;">
																		<label for="MOP Count" class="TextFont">MOP Count Recorded By</label></div> 
																		<div class="col-md-6-1" style="margin-top: 30px;">
																		<input type="text" class="typeahead form-control input-SmallText" placeholder="MOP Count" onkeypress="setUserName(this.id)" name="MOPCount" id="iMOPCount">
																		</div>
														</div>
														<div class="form-group Remove-Padding col-md-12-1">
																	<div class="col-md-5-1" style="margin-top: 30px;">
																	<label for="OTNotesComment" class="TextFont">Comment</label></div>
																	<div class="col-md-6-1" style="margin-top: 30px;">
																	<textarea class="field span12 " style="margin-top: 4px; 
																	margin-bottom: 2px;" id="iOTNotesComment" 
																	rows="3" cols="23"
																	placeholder="OT Notes Comment"></textarea>
																</div>
														</div>		
														</div>
														<div class="container">
														<div class="col-md-8-1" style="margin-top: 20px;">
														<div style="margin-top: 5px;" class="col-md-12-1">
														<div class="col-md-7-1">
															<div class="col-md-2-1 form-group">Template List</div>
															<div class="col-md-4-1">
															<select id="selCustomizeTemp" name="selCustomizeTemp" style="margin-top: 0px;" class="col-md-11-1 form-control input-SmallText " onchange="getCustomizeTemplatesIDDischarge()">
															</select> <input type="hidden" name="idTempMast" value="0" id="idTempMast">
															</div>
															<div class="col-md-6-1">
															<button style="margin-left: 470px;" type="button" id="isaveOTNotesData" onclick="saveOTNotesData()" data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-success" data-original-title="Save">
																	<i class="fa fa-save"></i>
															</button>
															</div>
														</div>
													</div>
													<div class="panel panel-default col-md-12-1"
														style="margin-top: 0px;">
													<div class="panel-body">
														<div id="move" style="width: 100%; display: none;"
														class="ui-resizable ui-draggable ui-draggable-handle">
														<textarea class="ckeditor ui-widget-content " name="editor1"
														title="Rich Text Editor, editor1" placeholder="Content"
														id="editor1"></textarea>
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
																				<button type="button" id="isaveQue" onclick="saveQueAns()" class="btn btn-xs btn-success" style="margin-left: 830px"><i class="fa fa-save"></i></button>
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
												
			<div><%@include file="footer_nobel.jsp"%></div>
			<div id="opObject" style="display: none;"></div>
			<div id="POP" style="display: none;"></div>
			<div id="divPreopCheckList" style="display: none;"></div>
			<input type="hidden" id="" value="" />
			<input type="hidden" id="todays_date" value="<%=todays_date%>" />
			<input type="hidden" id="pageName" value="OTOperationAction" />
			<input type="hidden" id="pId" value="<%=request.getParameter("pId")%>"/>
			<input type="hidden" id="tId" value="<%=request.getParameter("tId")%>"/>
			<input type="hidden" id="Id" value="<%=request.getParameter("Id")%>"/>
			<input type="hidden" id="tomId" value="<%=request.getParameter("tomId")%>"/>
			<input type="hidden" id="docId" value=""/>
			<input type="hidden" id="idopDocTbl" value=0/>
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
			<input type="hidden" id="teamMemberCount" value="0" />
			<div id='objhraque' style="display: none;"></div>
			<input type="hidden" id="unitid" value="<%=session.getAttribute("uId")%>">
			<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
			<input type='hidden' value='0' id='s'/>
			<div id="previousOtNotes"></div>			
		</c:if>
	</section>
</body>
</html>