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
<title>Manage Operation</title>

<link href="ehat-design/js/select2/select2.min.css" type="text/css"
	rel="stylesheet">

<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link rel="stylesheet" type="text/css"
	href="bootstrap-dist/css/bootstrap.min.css" media="screen">
<link rel="stylesheet" type="text/css"
	href="font-awesome/css/font-awesome.min.css">

<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />
<!-- for alert -->
<link href="ehat-design/alertify/alertify.core.css" type="text/css"
	rel="stylesheet">
<link href="ehat-design/alertify/alertify.default.css" type="text/css"
	rel="stylesheet">

<!-- for alert  -->

<script src="ehat-design/alertify/alertify.js" type="text/javascript"></script>

<script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>
<script type="text/javascript"
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="js/operation.js"></script>
<script type="text/javascript" src="js/otPharma.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<script type="text/javascript" src="js/ipdBill.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script type="text/javascript" src="js/validate.js"></script>

<script type="text/javascript" src="js/ot_automatic_charge.js"></script>

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
<!-- <link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link> -->
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
<script type="text/javascript" src="js/emergencyChargesOpd.js"></script>
<!-- <script type="text/javascript" src="js/ipd_bed_mgt.js"></script> -->


<script>
	/* jQuery(document).ready(function() {
		App.setPage("operation"); //Set current page
		App.init(); //Initialise plugins and elements
	}); */
</script>
<%
	session = request.getSession();
String uid = (String) session.getAttribute("uid");
ResourceBundle resourceBundleEhat1 = ResourceBundle.getBundle("OT_Service");
%>
<!--TIMEPEACKER -->
<script type="text/javascript">
	
	function setAnathesiaType(){
		
		var strTxt = <%=request.getParameter("txtchargetype1")%>;		
		$("#txtchargetype1").val(strTxt);			
	}
	
	onload = function() {
		
		setAnathesiaType();
		getOperationName();
		$("#rowcount").val(1);
		getAllUnitOT();
	//	unitListOnLogin();   //add by paras for fetching service assign details.
	<%--  $("#uId").val(<%=session.getAttribute("uId")%>); --%>
		viewOPerationPatient("operation");
		
		fetchOperationTheaterNames();
		fetchOperationTeamList('OTScheduler');

		fetchPTNameForOtSchedule();
		fetchOperationTheaterNames();
	//	fetchDepartmentForOTSchedule();
		fetchAllServicecomot("ONLOAD","");
		
		//setAutoDoctorNameForTeamMember("userName", "onload");
		
		var editOP = $("#editOP").val();
		if (editOP == 1) {
			setTimeout(function() {
				setCathId();
			}, 200);

		} else {
			setTimeout(function() {
				setOperationDetails();
			}, 200);
		}

		var type = $("#typeOfOperation").val();
		if (type == "previous") {
			$("#idSaveButtonDiv").html("");
		}
		//setcommonPatInfoForOperation();
		//getpatientTrIddrdesk(<%=request.getParameter("treatmentId")%>);
		//getPatientBedHall(<%=request.getParameter("treatmentId")%>);
		getIpdPatientHeaderInfo(<%=request.getParameter("treatmentId")%>);
		fetchipdbilldetailsOC("OC");
		/* __@author : Touheed @date : 26-May-2016 @reason : For CPOE(Start)___ */
		//getAllHeading("onload", "assignTest");
		//fetchDoctorHospital();
		// 	fetchTestDashboard();
		//fetchBodyPartDetails();
		//defaultViewTest("RadioGroup");
		/* __@author : Touheed @date : 26-May-2016 @reason : For CPOE (End)___ */
		
        $("#idOperation").css("background-color", "#ced9ae");
        fetchCustomizeTemplateListOT();
		setTemplateFunc();
		fetchOTNotesData();
		fetchotprocedure("OT");
		fetchprocedureCatsedrvOT();
		
		//added By Tarique Aalam
		getDayOfWeek2();
		fetchHospitalHolidayEmrPer('onload');
		EmerChrAccordingToTimeOpd();
		otpercentage();
		otpercentageServices();
		//getConsultantDrName(<%=request.getParameter("treatmentId")%>);
		/* setTimeout(function() {
		hallwiseCHARGE('OT');
		}, 200); */
	<%-- 	setTimeout(function() {
		getchargesOfot(<%=resourceBundleEhat1.getObject("MainSurgan").toString()%>,"M");
		getchargesOfot(<%=resourceBundleEhat1.getObject("AsistanSurgan").toString()%>,"A");
		getchargesOfot(<%=resourceBundleEhat1.getObject("Anethesia").toString()%>,"AN");
		getchargesOfot(<%=resourceBundleEhat1.getObject("PreAnethesia").toString()%>,"PR");
		getchargesOfot(<%=resourceBundleEhat1.getObject("OTRent").toString()%>,"OR");
		fetchipdbilldetailsOT("OC");

		}, 200); --%>
		setTimeout(function() {
		fetchipdbilldetailsOT("OC");
		//saveAutoChargeDetails();
		
		}, 200); 
	};
	

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
	
	
	

</script>

<style>
#teamMembersList {
	background-color: #e7e7e7;
	overflow: auto;
}

thead>tr, #teamMembersList {
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
					java.util.Calendar currentDate = java.util.Calendar.getInstance();
				java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
				String todays_date = formatter.format(currentDate.getTime());
				java.text.SimpleDateFormat dateformatter2 = new java.text.SimpleDateFormat("dd/MM/yyyy");
				String todays_date2 = dateformatter2.format(currentDate.getTime());
				java.text.SimpleDateFormat formatterrr = new java.text.SimpleDateFormat("hh:mm");
				String todays_time = formatterrr.format(currentDate.getTime());
				session.setAttribute("pharmacyStoreName", "ot");
				%>

				<div id="patient_sale_Batch_Pop_Up" class="modal fade in">
					<div class="modal-dialog" style="width: 54%;">
						<form action="">
							<div class="modal-content center" class="col-md-12">
								<div class="modal-header">
									<div class="box-title">
										<h4>
											<i class="fa fa-calendar"></i>BatchWise Product Information
										</h4>
									</div>
								</div>
								<div class="modal-body">
									<div class="col-md-12-1" style="margin-top: 9px;">
										<div class="col-md-2-1" style="margin-top: 0px;"></div>
									</div>

									<div class="col-md-12-1"
										style="height: 100%; width: 100%; padding-left: 0px;">
										<table id="ItemInfoTable" border="1"
											class="table table-bordered table-striped table-condensed"
											style="height: 100%; width: 100%;">
											<thead>
												<tr>
													<th class='col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>select Product</div></th>
													<th class='col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Batch Number</div></th>
													<th class=' col-md-2-1 center' style='height: 21.5px;'><div
															class='TextFont'>Expiry</div></th>

													<!-- <th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Net Rate</div></th>
			 -->
													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>MRP</div></th>

													<!-- <th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Sale Rate</div></th>
												
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Bill Rate</div></th>	 -->


													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Rate</div></th>

													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Stock</div></th>

													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Last Purchase From</div></th>

													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Last bill number</div></th>

													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Last Pur date</div></th>


												</tr>
											</thead>

											<!-- <tbody id="batchData1"
											style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
										</tbody> -->
										</table>
									</div>

									<div class='col-sm-12-1'
										style='height: 220px; width: 100%; overflow-y: scroll; border: 1px solid #ddd; margin-top: -21px;'>
										<table
											class='table  table-bordered table-striped table-condensed cf'>
											<tbody id="batchData1">
											</tbody>
										</table>
									</div>
									<!-- /BOX-->
								</div>
								<!-- /BODY-->
								<div class="modal-footer">
									<div class="form-group col-md-7-1" style="margin-top: 15px;">
										<button type="submit" class="btn btn-primary"
											id="btnSubContractingMaterialIssueSave"
											name="btnSubContractingMaterialIssueSave"
											onclick="setPopUpValuesot()" data-dismiss="modal">Ok</button>
										<button type="button" class="btn btn-default"
											data-dismiss="modal">Cancel</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>

                <div id="Ot_Inventory_Batch_Pop_Up" class="modal fade in">
					<div class="modal-dialog" style="width: 54%;">
						<form action="">
							<div class="modal-content center" class="col-md-12">
								<div class="modal-header">
									<div class="box-title">
										<h4>
											<i class="fa fa-calendar"></i>Batch Wise Product Information
										</h4>
									</div>
								</div>
								<div class="modal-body">
									<div class="col-md-12-1" style="margin-top: 9px;">
										<div class="col-md-2-1" style="margin-top: 0px;"></div>
									</div>

									<div class="col-md-12-1"
										style="height: 100%; width: 100%; padding-left: 0px;">
										<table id="ItemInfoTable" border="1"
											class="table table-bordered table-striped table-condensed"
											style="height: 100%; width: 100%;">
											<thead>
												<tr>
													<th class='col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>select Product</div></th>
													<th class='col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Batch Number</div></th>
													<th class=' col-md-2-1 center' style='height: 21.5px;'><div
															class='TextFont'>Expiry</div></th>
 													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>MRP</div></th>

													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Rate</div></th>

													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Stock</div></th>

												</tr>
											</thead>
										</table>
									</div>

									<div class='col-sm-12-1'
										style='height: 220px; width: 100%; overflow-y: scroll; border: 1px solid #ddd; margin-top: -21px;'>
										<table
											class='table  table-bordered table-striped table-condensed cf'>
											<tbody id="batchDataOtInventory">
											</tbody>
										</table>
									</div>
									<!-- /BOX-->
								</div>
								<!-- /BODY-->
								<div class="modal-footer">
									<div class="form-group col-md-7-1" style="margin-top: 15px;">
										<button type="submit" class="btn btn-primary"
											id="btnSubContractingMaterialIssueSave"
											name="btnSubContractingMaterialIssueSave"
											onclick="setPopUpValuesForOtInventory()" data-dismiss="modal">Ok</button>
										<button type="button" class="btn btn-default"
											data-dismiss="modal">Cancel</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>

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
												<li><a href="OperationDashboard.jsp"> Manage
														Operation</a></li>

												<li><label class="checkbox-inline">Emergency
														Charge <input onclick="setBoxOtcharges();" type="checkbox"
														value="N" id="emrChrFlag">
												</label> <label class="text-inline" id="perBox"> <input
														type="text" value="0" name="emrPer" id="emrPer"
														style="display: none; height: 23px; width: 54px;"
														onkeyup="calculateEmerChrForOtCharges()"
														onkeypress="return validateNumPer2(event)">
												</label></li>
												<li style="padding-left: 40%;"><input type="radio"
													id="sameBed" name="BedShift" value="sameBed"
													checked="checked" />Same Bed <input name="BedShift"
													type="radio" value="newBed" id="newBed"
													onclick="showBedShiftPopup()" />Bed Shift</li>
											</ul>
										</div>
									</div>
								</div>
								<!--adde by paras @date:17-jun-2017  -->
								<div id="commonPatInfo">
									<!--adde by paras @date:17-jun-2017  -->
									<div class="panel panel-primary" style="margin-top: -20px;">
										<div class="panel-body">
											<div class="row">
												<div class="col-md-1">
													<img id="patImg" style="width: 100%;height: 45px" class="img-responsive" src="ehat-design/img/profile/avatar.jpg" alt="">
												</div>
												<div class="col-md-10" style="margin-top: 10px;">
													<div class="col-md-3" style="width: 22%">
														<div class="form-group">
														<input type="hidden"  id="pt_Id" value="0">
														<input type="hidden"  id="tr_Id" value="<%=request.getParameter("treatmentId")%>">
														<input type="hidden"  id="storeId" value="<%=resourceBundleEhat1.getObject("OtpharmaSubStoreID").toString()%>"> <!-- DEFAULT OT PHARMA STORE ID -->
														<input type="hidden"  id="bill_Id" value="0">
														<input type="hidden"  id="userId" value="<%=session.getAttribute("userId")%>">
															<label class="control-label lblBold" id="lblCenterPatientId">Patient Id :</label>  
															<label id="patientId" class="control-label" style="display: none;"></label> 
															<label id="centerPatientId" class="control-label"></label>
														</div>
													</div>
													
													<div class="col-md-5" style="width: 33%">
														<div class="form-group">
															<label class="control-label lblBold">Patient Name :</label>
															<label id="patientName" class="control-label"></label>
			
														</div>
													</div>
													
													<div class="col-md-3" style="width: 22%">
														<div class="form-group">
															<label class="control-label lblBold">Treatment Id :</label> <label id="treatmentId" class="control-label"> <%=request.getParameter("treatID")%></label>
			
														</div>
													</div>
													
													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">Ipd No :</label> 
															<label id="ipdNo" class="control-label"></label>
			
														</div>
													</div>
													
													<div class="col-md-3" style="width: 22%">
														<div class="form-group">
															<label class="control-label lblBold">Age :</label> <label id="age" class="control-label"></label>
														</div>
													</div>
													
													<div class="col-md-5" style="width: 33%">
														<div class="form-group">
															<label class="control-label lblBold">Consulting
																Doctor :</label> <label id="consultingDocName" class="control-label"> </label>
			
														</div>
													</div>
													
													<div class="col-md-3" style="width: 22%">
														<div class="form-group">
															<label class="control-label lblBold">Gender :</label> <label id="sex" class="control-label">male</label>
			
														</div>
													</div>
													
													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">BillNo: </label>  <label id="billNo" class="control-label"></label> 
			
														</div>
													</div>
													
													<div class="col-md-3" style="width: 22%">
														<div class="form-group">
															<label class="control-label lblBold">DOA : </label> <label id="doa" class="control-label">- </label>
			
														</div>
													</div>
													
													<div class="col-md-5" style="width: 33%">
														<div class="form-group">
															<label class="control-label lblBold">Corporate :</label> <label id="corporate" class="control-label"> </label>
			
														</div>
													</div>
			
													<div class="col-md-3" style="width: 22%">
														<div class="form-group">
															<label class="control-label lblBold">DOD :</label> <label id="dod" class="control-label">- </label>
			
														</div>
													</div>
													
													<div class="col-md-3">
														<div class="form-group">
															<label class="control-label lblBold">Bill Category :</label>
															<label id="billCategoty" class="control-label"> </label>
			
														</div>
													</div>
													
													
												</div>
											</div>
										</div>
									</div>						
								</div>
								
								<!-- <div class="panel panel-primary" style="margin-top: -20px;">
									<div class="panel-body"> -->
										<!-- <div class="alert alert-block alert-info fade in" style="height: 0%;"> -->
											<%-- <div class="row">
												<div class="col-md-1">
													<img id="patImg" style="width: 100%; height: 45px"
														src="ehat-design/img/profile/avatar.jpg"
														class="img-responsive">
												</div>
				
												<div class="col-md-11">
				
													<div class="col-md-12 form-row">
				
														<div class="col-md-3">
															<div class="form-group">
																<label class="control-label lblBold" id="lblCenterPatientId">UHID
																	:</label> <label class="control-label" id="patientId"
																	style="display: none;"> </label> <label
																	class="control-label" style="display: none" id="prnId">
																</label> <label class="control-label" id="centerPatientId">
																</label>
															</div>
														</div>
														
														<div class="col-md-3">
															<div class="form-group">
																<label class="control-label lblBold">Treatment Id :</label>
																<label class="control-label" id=treatmentId> <%=request.getParameter("treatmentId")%>
																</label>
				
															</div>
														</div>
														
														<div class="col-md-3">
															<div class="form-group">
																<label class="control-label lblBold">Bill No : </label> <label
																	class="control-label" id="consultingDoctor"
																	style="display: none;">Vinod-D</label> <label
																	class="control-label" id="preBillId">0</label>
															</div>
														</div>
														
														<div class="col-md-3">
															<div class="form-group">
																<label class="control-label lblBold">Ref.BNo: </label> <label
																	class="control-label" id="billNo">01-D</label>
				
															</div>
														</div>
														
														<div class="col-md-3">
															<div class="form-group">
																<input type="hidden" id="deptid" value="0"> <label
																	id=billipdlable class="control-label lblBold">Ipd
																	No :</label> <label class="control-label" id="ipdNo">
																	IPD/00002017/553-D</label>
															</div>
														</div>
														
													</div>
													
													<div class="col-md-12 form-row">
														
														<div class="col-md-3">
															<div class="form-group">
																<label class="control-label lblBold">Age :</label> <label
																	class="control-label" id="age"> </label>
															</div>
														</div>
				
														<div class="col-md-3">
															<div class="form-group">
																<label class="control-label lblBold">Gender :</label> <label
																	class="control-label" id="sex"> Male(D) </label>
				
															</div>
														</div>
				
														<div class="col-md-3">
															<div class="form-group">
																<label class="control-label lblBold">DOA:</label> <label
																	class="control-label" id="doa"> 2017-05-12-D</label>
				
															</div>
														</div>
														
														<div class="col-md-3">
															<div class="form-group">
																<label class="control-label lblBold">Bill Category :</label>
																<label class="control-label" id="billCategoty"> </label>
				
															</div>
														</div>
														
														<div class="col-md-3">
															<div class="form-group">
																<label class="control-label lblBold">Corporate :</label> <label
																	class="control-label" id="corporate"> </label>
															</div>
														</div>
														
													</div>
													<div class="col-md-12 form-row">
													
														<div class="col-md-4" style="width: 38%">
															<div class="form-group">
																<label class="control-label lblBold">Ref Dr:</label> <label
																	id="refDoctor" class="control-label"></label>
															</div>
														</div>
														
														<div class="col-md-3">
															<div class="form-group">
																<label class="control-label lblBold">DOD :</label> <label
																	class="control-label" id="dod"></label>
				
															</div>
														</div>
														
														<div class="col-md-5">
															<div class="form-group">
																<label class="control-label lblBold">Consulting Dr:</label>
																<label id="consultingDoctorr" class="control-label"></label>
															</div>
														</div>	
														
													</div>
													<div class="col-md-12 form-row">
														
														<div class="col-md-5" style="width: 38%">
															<div class="form-group">
																<label class="control-label lblBold">Patient Name :</label>
																<label class="control-label" id="patientName"> </label>
				
															</div>
														</div>
														
														<div class="col-md-7" style="width: 38%">
															<div class="form-group">
																<label class="control-label lblBold">Hall Name :</label>
																<label class="control-label" id="hallName"> </label>
				
															</div>
														</div>
														
														<div class="col-md-3 hide">
															<div class="form-group">
																<input type="hidden" id="uId" value="<%=session.getAttribute("uId")%>" /> 
																<input type="hidden" id="prePostPaid" value="0" />
																<input type="hidden" id="customerType" value="0" /> 
																<input type="hidden" id="customerId" value="0" />
																<input type="hidden" id="businessType" value="2" />
																<input type="hidden" id="registeredAt" value="other" />
																<input type="hidden" id="depdocdeskid" value="0" />
																<input type="hidden" id="sourceTypeId" value="0" /> 
																<input type="hidden" id="subserviceid" value="0" /> 
																<input type="hidden" id="pId" value="0" /> 
																<input type="hidden" id="tId" value="0" />
																<input type="hidden" id="bNo" value="0" /> 
																<input type="hidden" id="bNo" value="0" /> 
																<input type="hidden" id="serviceid" value="0" /> 
																<input type="hidden" id="editPerticularType" value="0" /> 
																<input type="hidden" id="editPerticularId" value="0" /> 
																<input type="hidden" id="treatId" value=<%=request.getParameter("treatmentId")%> /> 
																<input type="hidden" id="generalId" value="0" />
																<input type="hidden" id="pHeight" value="0" />
																<input type="hidden" id="pWeight" value="0" />
																<input type="hidden" id="uvCount" value="0" />
																<input type="hidden" id="lmpDate" value="" />
																<input type="hidden" id="mobileNo" value="0" />
																<input type="hidden" id="hallTypeId" value="0" />
																<input type="hidden" id="hallId" value="0" />
																<input type="hidden" id="bedId" value="0" />
																<input type="hidden" id="treatBedsId" value="0" />
																<!-- <input type="hidden" id = "depdocdeskid" value = "0" /> -->
																<input type="hidden" id = "patientId" value = <%=request.getParameter("patientId")%> />
															</div>
														</div>
														
													</div>
													
												</div>
											</div> --%>
										<!-- </div> -->
									
										<%-- <div class="row">
											<div class="col-md-1">
												<img id="patImg" class="img-responsive"
													src="ehat-design/img/profile/avatar.jpg" alt="">
											</div>
											<div class="col-md-10" style="margin-top: 10px;">
												<div class="col-md-3">
													<div class="form-group">
														<input type="hidden" id="pt_Id" value="0"> <input
															type="hidden" id="tr_Id"
															value="<%=request.getParameter("treatmentId")%>">
														<input type="hidden" id="bill_Id" value="0"> <label
															class="control-label lblBold" id="lblCenterPatientId">Patient
															Id :</label> <label id="patientId" class="control-label"
															style="display: none;"></label> <label
															id="centerPatientId" class="control-label"></label>
													</div>
												</div>
												<div class="col-md-3">
													<div class="form-group">
														<label class="control-label lblBold">Age:</label> <label
															id="age" class="control-label"></label>
													</div>
												</div>
												<div class="col-md-3">
													<div class="form-group">
														<label class="control-label lblBold">Patient Name
															:</label> <label id="patientName" class="control-label"></label>

													</div>
												</div>
												<div class="col-md-3">
													<div class="form-group">
														<label class="control-label lblBold">IPD No :</label> <label
															id="ipdno" class="control-label"> </label>

													</div>
												</div>
												<div class="col-md-3">
													<div class="form-group">
														<label class="control-label lblBold">Ref.BillNo: </label>
														<label id="billNo" class="control-label"></label>

													</div>
												</div>
												<div class="col-md-3">
													<div class="form-group">
														<label class="control-label lblBold">Gender :</label> <label
															id="sex" class="control-label">male</label>

													</div>
												</div>
												<div class="col-md-3">
													<div class="form-group">
														<label class="control-label lblBold">Bill Category
															:</label> <label id="bill_category" class="control-label">
														</label>

													</div>
												</div>
												<div class="col-md-3">
													<div class="form-group">
														<label class="control-label lblBold">Weight (kg) -</label>
														<label id="weight" class="control-label"> </label>

													</div>
												</div>
												<div class="col-md-3">
													<div class="form-group">
														<label class="control-label lblBold">Corporate :</label> <label
															id="corporate" class="control-label"> </label> <input
															type="hidden" id="chargesSlaveId" value="0">
													</div>
												</div>
												<div class="col-md-3" style="display: none;">
													<div class="form-group">
														<label class="control-label lblBold">Refer-By:</label> <label
															id="refer_by" class="control-label">male</label>

													</div>
												</div>
											</div>
										</div> --%>
										
										
										
										<%-- <div class="alert alert-block alert-info fade in col-md-12-1" id="commonPatInfo" style="padding-top:4%;margin-top:-29px;">
							<div class="row" style="margin-top: 0%;">
								<div class="col-md-1" style="margin-top:-30px;">
									<img id="patImg" class="img-responsive" src="ehat-design/img/profile/avatar.jpg" alt="">
								</div>
								<div class="col-md-11">
									<div class="col-md-12">
										<div class="col-md-2">
											<div class="form-group">
											<input type="hidden"  id="pt_Id" value="0">
											<input type="hidden"  id="tr_Id" value="<%=request.getParameter("treatmentId")%>">
											<input type="hidden"  id="bill_Id" value="0">
												<label class="control-label lblBold" id="lblCenterPatientId">Patient Id :</label>  
												<label  id="patientId" class="control-label" style="display: none;"></label>
												<label  id="centerPatientId" class="control-label"></label> 
											</div>
										</div>
										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Age:</label> <label id="age" class="control-label"></label>
											</div>
										</div>
										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Patient Name :</label>
												<label 	id="patientName" class="control-label"></label>

											</div>
										</div>
										<div class="col-md-3" >
											<div class="form-group">
												<label class="control-label lblBold" >IPD No :</label> <label id="ipdno" class="control-label"> </label>

											</div>
										</div>											
										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Ref.BillNo: </label>  <label id="billNo" class="control-label"></label> 

											</div>
										</div>
										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Gender :</label> <label id="sex" class="control-label">male</label>

											</div>
										</div>
										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Bill Category :</label>
												<label id="bill_category" class="control-label"> </label>

											</div>
										</div>
										<div class="col-md-3" >
											<div class="form-group">
												<label class="control-label lblBold">Weight (kg) -</label> <label id="weight" class="control-label"> </label>

											</div>
										</div>
										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Corporate :</label> <label id="corporate" class="control-label"> </label>
                                            <input type="hidden"  id="chargesSlaveId" value="0">
											</div>
										</div>
												<div class="col-md-2">
											<div class="form-group"style="display: none;">
												<label class="control-label lblBold">Refer-By:</label> <label id="refer_by" class="control-label">male</label>

											</div>
										</div>
									</div>
								</div>
								</div>
								</div> --%>

										
										<div class="box border col-md-12-1">
											<div class="divide-10"></div>
											<div class="tabbable col-md-12-1">
												<ul class="nav nav-tabs mainTab">
													<li id="od" class="active"><a data-toggle="tab"
														id="idOperation" href="#Operation"><span
															class="hidden-inline-mobile">Operation Details</span></a></li>
													<li><a href="#tab_OT_Remark" id="OT_Remark"
														data-toggle="tab">Remark & Description</a></li>
													<li><a data-toggle="tab" href="#iOTNotes"><span
															class="hidden-inline-mobile">OT Notes</span></a></li>
													<!-- <li><a data-toggle="tab" href="#ANSNotes"><span
													class="hidden-inline-mobile">Anaesthesia Notes</span></a></li> -->
													<!-- <li onclick="fetchipdbilldetails('DoctorStation'),setDocNamedrdesk()"><a data-toggle="tab" href="#CPOE"><span
													class="hidden-inline-mobile">CPOE</span></a></li> -->
													<li id="otcpoe1"
														onclick="fetchdetailsOT(0, 0,'CPOE','ONTAB'),setDocNamedrdesk(),fetchfreez('OT' , 'CPOE' , 'dynamicItemcpoe'),getSubServiceDetailsOnCPOE(),getAllDoctorsListOnOTCpoe()"><a
														id="licpoe" data-toggle="tab" href="#CPOE"><span
															class="hidden-inline-mobile">CPOE</span></a></li>
													<!-- 	<li onclick="fetchfreez('OT' , 'OTCHARG' , 'dynamicItemcom2'),fetchdetailsOT(0, 0,'OTCHARG','ONTAB'),hallwiseOPchargeOT()"><a data-toggle="tab" href="#OTCHARGES"><span
													class="hidden-inline-mobile">OT CHARGES</span></a></li> -->
													<li id="otchr"
														onclick="fetchipdbilldetailsOnOT(),setDocNameOT(),hallwiseCHARGE('OT'),getAllDoctorsListOnOTService()"><a
														id="otserv" data-toggle="tab" href="#OTSERV"><span
															class="hidden-inline-mobile">OT SERVICES</span></a></li>
													<li id="otd"
														onclick="fetchfreez('OT' , 'OTDRUG' , 'dynamicItemdrug'),fetchdetailsOT(0, 0,'OTDRUG','ONTAB')"><a
														id="otdrug" data-toggle="tab" href="#OTDRUG"><span
															class="hidden-inline-mobile">OT DRUGS</span></a></li>
													<li id="otinv"
														onclick="fetchfreez('OT' , 'OTINV' , 'dynamicItemINV'),fetchdetailsOT(0, 0,'OTINV','ONTAB')"><a
														id="linv" data-toggle="tab" href="#OTInv"><span
															class="hidden-inline-mobile">OT Inventory</span></a></li>

													<li id="otc"
														onclick="fetchfreez('OT' , 'OTCATH' , 'dynamicItemINV'),fetchdetailsOT(0, 0,'OTCATH','ONTAB')"><a
														id="licath" data-toggle="tab" href="#cathLab"><span
															class="hidden-inline-mobile">OT CathLab</span></a></li>

												</ul>
												<div class="divide-10"></div>

												<div id="" class="tab-content">
													<!-- Start Code for #tab_OT_Remark GUI -->
													<div class="col-sm-12-1 tab-pane fade in"
														id="tab_OT_Remark">
														<div class="form-group  col-md-12-1"
															style="margin-top: 0px; margin-left: 1%;">
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 0px; margin-left: 1%;">
																<div class="form-group Remove-Padding col-md-4-1"
																	style="margin-top: 9px;">
																	<label class="TextFont">Other Reference</label> <input
																		id='otherReference' name='otherReference' value=""
																		class="form-control input-SmallText" />
																</div>

																<div class="form-group Remove-Padding col-md-3-1"
																	style="margin-top: 9px;">
																	<label class="TextFont">Contact of Reference</label> <input
																		id='contactOfReference' name='contactOfReference'
																		value="" maxlength="10"
																		class="form-control input-SmallText"
																		onkeyup="return validateNumberByRegEx(this.id)" />
																</div>
																<div class="form-group Remove-Padding col-md-3-1"
																	style="margin-top: 9px;">
																	<label class="TextFont">Email ID of Reference</label> <input
																		id='emailOfReference' name='emailOfReference' value=""
																		class="form-control input-SmallText" />
																</div>
																<div class="form-group Remove-Padding col-md-1-1"
																	style="margin-top: 29px;">
																	<button onclick="sendEmailToReference()"
																		class="btn btn-xs btn-info" style="line-height: 1.2">
																		<i class="fa fa-envelope"></i>
																	</button>
																	<button onclick="" class="btn btn-xs btn-warning"
																		style="line-height: 1.2">
																		<i class="fa fa-mobile fa-lg"></i>
																	</button>
																</div>
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 0px; margin-left: 1%;">
																<div class="form-group Remove-Padding col-md-4-1"
																	style="margin-top: 9px;">
																	<label class="TextFont">Remark</label>
																	<textarea rows="4" cols="55" id="remark" name=""
																		style="line-height: 1.42857" class=""></textarea>
																</div>

																<div class="form-group Remove-Padding col-md-4-1"
																	style="margin-top: 9px;">
																	<label class="TextFont">Precaution</label>
																	<textarea rows="4" cols="55" id="precaution" name=""
																		style="line-height: 1.42857" class=""></textarea>

																</div>
																<div class="form-group Remove-Padding col-md-4-1"
																	style="margin-top: 9px;">
																	<label class="TextFont">Indication For Surgery</label>
																	<textarea rows="4" cols="50" id="indicationForSurgery"
																		name="" style="line-height: 1.42857" class=""></textarea>
																</div>
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 0px; margin-left: 1%;">
																<div class="form-group Remove-Padding col-md-12-1"
																	style="margin-top: 9px;">
																	<label class="TextFont">Surgery Description</label>
																	<textarea rows="4" cols="174" id="surgeryDescription"
																		style="line-height: 1.42857" name="" class=""></textarea>
																</div>
															</div>
														</div>
													</div>
													<!-- End Code for #tab_OT_Remark GUI -->

													<!-- Start Code for #OTNotes GUI -->
													<div id="iOTNotes" class="col-md-12-1 tab-pane fade in">
														<div class="col-md-4-1" style="margin-top: 40px;">
															<div class="form-group Remove-Padding col-md-12-1"
																style="padding-left: 5%;">
																<div class="col-md-5-1" style="margin-top: 10px;">
																	<label for="Estimated Blood Loss" class="TextFont">Estimated
																		Blood Loss</label>
																</div>
																<div class="col-md-6-1" style="margin-top: 10px;">
																	<input type="text"
																		class="form-control input-SmallText capitalise"
																		placeholder="Estimated Blood Loss"
																		style="border: 1px solid orange;"
																		onkeypress="return validateOnlyName(event)"
																		name="EBLoss" id="iEBLoss" disabled="disabled">
																</div>
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="padding-left: 5%;">
																<div class="col-md-5-1" style="margin-top: 30px;">
																	<label for="Actual Blood Loss" class="TextFont">Actual
																		Blood Loss</label>
																</div>
																<div class="col-md-6-1" style="margin-top: 30px;">
																	<input type="text"
																		class="form-control input-SmallText capitalise"
																		placeholder="Actual Blood Loss"
																		style="border: 1px solid orange;"
																		onkeypress="return validateNumberByRegEx(this.id)"
																		name="ABLoss" id="iABLoss" value="0">
																</div>
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="padding-left: 5%;">
																<div class="col-md-5-1" style="margin-top: 30px;">
																	<label for="Instrumental Count" class="TextFont">Instrumental
																		Count</label>
																</div>
																<div class="col-md-6-1" style="margin-top: 30px;">
																	<input type="text"
																		class="form-control input-SmallText capitalise"
																		placeholder="Instrumental Count"
																		onkeypress="return validateNumberByRegEx(this.id)"
																		name="ICount" id="iICount">
																</div>
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="padding-left: 5%;">
																<div class="col-md-5-1" style="margin-top: 30px;">
																	<label for="Recorded By" class="TextFont">Recorded
																		By</label>
																</div>
																<div class="col-md-6-1" style="margin-top: 30px;">
																	<input type="text"
																		class="typeahead form-control input-SmallText"
																		placeholder="Recorded By"
																		onkeypress="setUserName(this.id)" name="RecBy"
																		id="iRecBy">
																</div>
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="padding-left: 5%;">
																<div class="col-md-5-1" style="margin-top: 30px;">
																	<label for="MOP Count" class="TextFont">MOP
																		Count Recorded By</label>
																</div>
																<div class="col-md-6-1" style="margin-top: 30px;">
																	<input type="text"
																		class="typeahead form-control input-SmallText"
																		placeholder="MOP Count"
																		onkeypress="setUserName(this.id)" name="MOPCount"
																		id="iMOPCount">
																</div>
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="padding-left: 5%;">
																<div class="col-md-5-1" style="margin-top: 30px;">
																	<label for="OTNotesComment" class="TextFont">Comment</label>
																</div>
																<div class="col-md-6-1" style="margin-top: 30px;">
																	<textarea class="field span12 "
																		style="margin-top: 4px; margin-bottom: 2px;"
																		id="iOTNotesComment" rows="3" cols="23"
																		placeholder="OT Notes Comment"></textarea>
																</div>
															</div>
															
															<div class="form-group Remove-Padding col-md-12-1" style="padding-left: 5%;">
														<div class="col-md-5-1" style="margin-top: 30px;">
															<label for="OTImplantDetails" class="TextFont">Implant Details</label>
														</div>
														<div class="col-md-6-1" style="margin-top: 30px;">
															<textarea class="field span12 "
																style="margin-top: 4px; margin-bottom: 2px;"
																id="iOTImplantDetails" rows="3" cols="23"
																placeholder="OT Implant Details"></textarea>
														</div>
													</div>
													
													<div class="form-group Remove-Padding col-md-12-1" style="padding-left: 5%;">
														<div class="col-md-5-1" style="margin-top: 30px;">
															<label for="OTImplantDetails" class="TextFont"> Details</label>
														</div>
														<div class="col-md-6-1" style="margin-top: 30px;">
															<select id="selOtTempRecord" name="selOtTempRecord" 
																		style="margin-top: 0px;margin-left: 0%;"
																		class="col-md-11-1 form-control input-SmallText "  onchange="getOtNotesDataByOtId()">
																		<option  value="0">Select</option>		
															</select> 
														</div>
													</div>
													
														</div>
														<div class="container">
															<div class="col-md-8-1" style="margin-top: 20px;">
																<div style="margin-top: 5px;" class="col-md-12-1">
																	<div class="col-md-7-1">
																		<div class="col-md-2-1 form-group">
																			<label class="TextFont">Template List</label>
																		</div>
																		<div class="col-md-6-1">
																			<select id="selCustomizeTemp" name="selCustomizeTemp"
																				style="margin-top: 0px; margin-left: 10%;"
																				class="col-md-11-1 form-control input-SmallText " onchange="getCustomizeTemplatesIDDischarge()">
																				
																			</select> <input type="hidden" name="idTempMast" value="0"
																				id="idTempMast">
																		</div>
																		<div class="col-md-2-1">
																			<button style="margin-left: 10%;" type="button"
																				id="isaveOTNotesData" onclick="saveOTNotesData()"
																				data-placement="left" data-toggle="tooltip"
																				class="btn btn-xs btn-success"
																				data-original-title="Save">
																				<i class="fa fa-save"></i>
																			</button>
																		</div>
																		<div class="col-md-1-1">
																			<button style="margin-left: 170%;" type="button"
																				class="btn btn-xs btn-warning" data-toggle="tooltip"
																				data-placement="right" title="Print "
																				onclick="printOTNotes('withHdr')">
																				Print(H/F)</button>
																		</div>

																		<div class="col-md-1-1">
																			<button style="margin-left: 290%;" type="button"
																				class="btn btn-xs btn-warning" data-toggle="tooltip"
																				data-placement="right" title="Print "
																				onclick="printOTNotes('withoutHdr')">Print
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
																				placeholder="Content" id="editor1"></textarea>
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
														<div class="pull-right" style="padding-right: 57px">
															<button onclick="saveMangeOperationByButton()"
																class="btn btn-xs btn-success">Save</button>

														</div>
														<div class="divide-40"></div>
														<div class='col-sm-12-1' style="padding-left: 2%;">
															<div class='col-sm-12-1'>
																<div class='col-sm-12-1'>
																	<div class="divide-10"></div>
																	<div class='col-sm-6-1'>
																		<div class="form-group Remove-Padding col-md-12-1"
																			style="margin-top: 9px;">
																			<div class="form-group Remove-Padding col-md-5-1"
																				style="margin-top: 9px;">
																				<label class="TextFont">Procedure Type</label> <select
																					name="" id="selOTtype"
																					class="form-control input-SmallText TextFont">
																					<option value="0">-SELECT-</option>
																				</select>
																			</div>
																			<div class="form-group Remove-Padding col-md-1-1"
																				style="margin-top: 9px;"></div>
																			<div class="form-group Remove-Padding col-md-5-1"
																				style="margin-top: 9px;">
																				<label class="TextFont">Procedure Group</label> <select
																					name="" id="department"
																					onchange="getOperationName()"
																					class="form-control input-SmallText TextFont">
																					<option value="0">-SELECT-</option>
																				</select>
																			</div>
																		</div>
																		<div class="form-group Remove-Padding col-md-12-1"
																			style="margin-top: 9px; display: none;">
																			<div class="form-group Remove-Padding col-md-6-1"
																				style="margin-top: 9px;">
																				<label class="TextFont">Procedure Category</label> <select
																					id='opgrade' name='opgrade'
																					class='form-control input-SmallText'>
																				</select> <input type="hidden" value="0" id="departmentOT">
																			</div>

																		</div>
																		<div class="form-group Remove-Padding col-md-12-1"
																			style="margin-top: 9px;">
																			<div class="form-group Remove-Padding col-md-10-1"
																				style="margin-top: 0px;">
																				<label class="TextFont">Procedure Name</label> <select
																					name="" id="selOTName"
																					class="TextFont" style="width:90%"
																					onclick="fetchPTPG()">
																					<option value="0">-SELECT-</option>
																				</select>
																			</div>
																			<div class="form-group Remove-Padding col-md-1-1"
																				style="margin-top: 20px;">
																				<button onclick="addProcedureNameToList('OT')"
																					class="btn btn-xs btn-success"
																					style="line-height: 1.3">
																					<i class="fa fa-save"></i>
																				</button>
																			</div>
																		</div>

																		<div class="form-group Remove-Padding col-md-12-1"
																			style="margin-top: 9px;">
																			<div class="form-group Remove-Padding col-md-11-1"
																				style="margin-top: 2px; padding-right: 2%;">
																				<label class="TextFont">Scheduled Procedure
																					&nbsp;&nbsp;&nbsp;&nbsp;<img width="18" height="18"
																					src="images/minus.jpg"
																					onclick="removeOperationNameFromList()">
																				</label> <select size="4" class="col-md-12-1"
																					style="margin-top: 6px;" multiple="multiple"
																					id="scheduledProcedure">
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
																					class="form-control input-SmallText TextFont">
																				</select>
																			</div>

																			<div class="form-group Remove-Padding col-md-5-1"
																				style="margin-top: 9px;">
																				<label class="TextFont">Date</label> <input
																					type="text" placeholder=" " readonly="readonly"
																					class="form-control input-SmallText col-md-12-1 margin-1"
																					id="popup_container2"
																					onclick="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)">
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
																					onclick="click1()" />
																			</div>
																			<div class="form-group Remove-Padding col-md-1-1"
																				style="margin-top: 9px;"></div>
																			<div class="form-group Remove-Padding col-md-5-1">
																				<label class="TextFont">End Time</label> <input
																					type='text' id='txtEndTime' name='txtEndTime'
																					readonly="readonly"
																					class="form-control input-SmallText col-md-12-1 margin-1"
																					onclick="click1()" />
																			</div>
																		</div>

																		<div class="form-group Remove-Padding col-md-12-1"
																			style="margin-top: 11px;">

																			<div class="form-group Remove-Padding col-md-6-1"
																				style="margin-top: 2px; padding-right: 7%;">
																				<label class="TextFont">Anaes.Charge Type</label> <select
																					id='txtchargetype1' name='txtchargetype'
																					style='width: 100%;'
																					class="form-control input-SmallText TextFont">
																					<option value="ASAIV">ASAIV</option>
																					<option value="Normal">Normal</option>
																					<option value="StandBy">StandBy</option>
																				</select>
																			</div>

																			<div class="form-group Remove-Padding col-md-6-1"
																				style="margin-top: 2px; padding-right: 7%;">
																				<label class="TextFont">Anaesthesia Type</label> <select
																					name="" id="anesthesiaType"
																					class="form-control input-SmallText TextFont">
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
																					<option value="16">Spinal with Epidural
																						with General</option>
																					<option value="17">Spinal with Epidural
																						with Femonel block</option>
																				</select>
																			</div>

																		</div>
																		<div class="form-group Remove-Padding col-md-12-1"
																			style="margin-top: 1px;">
																			<div class="form-group Remove-Padding col-md-3-1"
																				style="margin-top: 9px;">
																				<label class="TextFont">Infection</label> <input
																					type="checkbox" id="infectFlag" />
																			</div>
																			<div class="form-group Remove-Padding col-md-3-1"
																				style="margin-top: 9px;">
																				<label class="TextFont">Critical</label> <input
																					type="checkbox" id="criticalFlag" />
																			</div>
																			<div class="form-group Remove-Padding col-md-4-1"
																				style="margin-top: 9px;">
																				<label class="TextFont">Operation Charge</label> <input
																					type='checkbox' id='opCharge1' name='opCharge' />
																			</div>
																		</div>
																	</div>
																</div>

																<div class='col-sm-12-1'>
																	<div class="form-group Remove-Padding col-md-12-1"
																		style="margin-top: 9px;">
																		<div class="form-group Remove-Padding col-md-3-1"
																			style="margin-top: 9px;">
																			<label class="TextFont">Surgery Team</label> <select
																				name="" id="teanNameList"
																				onchange="setTeamDoctors('ManageOT')"
																				class="form-control input-SmallText TextFont">
																				<option value="0">-SELECT-</option>
																			</select>
																		</div>
																		<div class="form-group Remove-Padding col-md-3-1"
																			style="margin-top: 9px;">
																			<label class="TextFont">Doctor Type</label> <select
																				name="" id="doctype" onchange="setUsetType()"
																				class="form-control input-SmallText TextFont">
																				<option value="select">-Select-</option>
																				<option value="surgeon">Surgeon</option>
																				<option value="surgeon1">Surgeon 1</option>
																				<option value="surgeon2">Surgeon 2</option>
																				<option value="surgeon3">Surgeon 3</option>
																				<option value="asssurgeon">Assistant
																					Surgeon</option>
																				<option value="assSurgeon1">Assistant
																					Surgeon 1</option>
																				<option value="assSurgeon2">Assistant
																					Surgeon 2</option>
																				<option value="assSurgeon3">Assistant
																					Surgeon 3</option>
																				<option value="scrubNurse1">Scrub Nurse 1</option>
																				<option value="scrubNurse2">Scrub Nurse 2</option>
																				<option value="scrubNurse3">Scrub Nurse 3</option>
																				<option value="circulatingNurse1">Circulating
																					Nurse 1</option>
																				<option value="circulatingNurse2">Circulating
																					Nurse 2</option>
																				<option value="circulatingNurse3">Circulating
																					Nurse 3</option>
																				<option value="anesthetist">Anaesthesiologist</option>
																				<option value="anaesthesiologist1">Anaesthesiologist
																					1</option>
																				<option value="anaesthesiologist2">Anaesthesiologist
																					2</option>
																				<option value="anaesthesiologist3">Anaesthesiologist
																					3</option>
																				<option value="assAnaesthesiologist1">Assistant
																					Anaesthesiologist 1</option>
																				<option value="assAnaesthesiologist2">Assistant
																					Anaesthesiologist 2</option>
																				<option value="assAnaesthesiologist3">Assistant
																					Anaesthesiologist 3</option>
																				<option value="other">Other</option>
																			</select> <input type="hidden" id="type" value="select">
																		</div>
																		<!-- <div class="form-group Remove-Padding col-md-4-1"
																	style="margin-top: 9px;">
																	<label class="TextFont">Type</label> <select name=""
																		id="type"
																		class="form-control input-SmallText TextFont"
																		onchange="clearDocName(),showDocTypeDiv()">
																		<option value="select">-Select-</option>
																		<option value="admin">Admin</option>
																		<option value="anesthetist">Anesthetist</option>
																		<option value="doctor">Doctor</option>
																		<option value="General">General</option>
																		<option value="nurse">Nurse</option>
																		<option value="rmo">RMO</option>
																		<option value="visitingdoctor">Visiting
																			Doctor</option>
																	</select>
																</div> -->
																		<div class="form-group Remove-Padding col-md-4-1"
																			style="margin-top: 9px;">
																			<label class="TextFont">Name</label>
																			<!-- <div id="divuserName"> -->
																				<input id='userName' name='userName'
																					onkeyup="setAutoCompleteForDoctorName(this.id,'ManageOT')"
																					class="form-control input-SmallText" />
																			<!-- </div> -->
																			<div style="display: none;" id="selectedObj"></div>
																		</div>
																		<div class="form-group Remove-Padding col-md-1-1"
																			style="margin-top: 29px;">
																			<button onclick="addDoctorToScheduleOT('ManageOT')"
																				class="btn btn-xs btn-success"
																				style="line-height: 1.2">
																				<i class="fa fa-save"></i>
																			</button>
																		</div>

																	</div>

																	<div class="box border  col-md-12-1"
																		style="max-height: 220px; margin-top: 10px;">

																		<div class="form-group box-body">

																			<div class="col-md-12-1"
																				style="margin-top: 0px; background: #FFE0C2; border: 1px solid orange; padding-left: 3px;">
																				<label class="TextFont"
																					style="padding-top: 5px; padding-bottom: 5px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;">
																					<i class="fa fa-users fa fw"></i> Scheduled Team
																				</label> <label class="TextFont"
																					style="padding-top: 5px; padding-bottom: 5px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																					onclick="removeDoctorNameFromList()"> <i
																					class="fa fa-minus-square fa fw"></i> Remove
																				</label>

																			</div>
																			<div class="divide-20"></div>
																			<div class="col-md-12-1">
																				<table class="table table-hover table-bordered"
																					id="teamTableId" style='margin-top: 9px;'>
																					<thead>
																						<tr>
																							<th class='center'
																								style="padding-right: 13px; padding-left: 14px; width: 4%;">
																								<div>#</div>
																							</th>
																							<th class='center' style="width: 25%;"><div>Doctor
																									Name</div></th>
																							<th class='center' style="width: 14.7%;"><div>User
																									Type</div></th>
																							<th class='center' style="width: 15%;"><div>Speciality</div></th>
																							<th class='center' style="width: 20%;"><div>Department</div></th>
																							<th class='center' style="width: 18%;"><div>Doctor
																									Type</div></th>
																							<th class='center' style="width: 6%;"><div>Action</div></th>
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
																				<label class="TextFont">OHR</label> <input
																					type='text' id='ohr1' name='ohr'
																					class="form-control input-SmallText TextFont" />
																			</div>
																			<div class="form-group Remove-Padding col-md-1-1"
																				style="margin-top: 2px;"></div>
																			<div class="form-group Remove-Padding col-md-5-1"
																				style="margin-top: 2px; padding-right: 0%;">
																				<label class="TextFont">CHR</label> <input
																					type='text' id='chr1' name='chr'
																					class="form-control input-SmallText TextFont" />
																			</div>
																		</div>

																		<div class="form-group Remove-Padding col-md-6-1"
																			style="margin-top: 0px;">
																			<div class="form-group Remove-Padding col-md-5-1"
																				style="margin-top: 2px; padding-right: 0%;">
																				<label class="TextFont">OBP</label> <input
																					type='text' id='obp1' name='obp'
																					class="form-control input-SmallText TextFont" />
																			</div>
																			<div class="form-group Remove-Padding col-md-1-1"
																				style="margin-top: 2px;"></div>
																			<div class="form-group Remove-Padding col-md-5-1"
																				style="margin-top: 2px; padding-right: 0%;">
																				<label class="TextFont">CBP</label> <input
																					type='text' id='cbp1' name='cbp'
																					class="form-control input-SmallText TextFont" />
																			</div>
																		</div>
																	</div>

																	<div class="form-group Remove-Padding col-md-12-1"
																		style="margin-top: 9px; padding-bottom: 4px">
																		<div class="col-md-6-1">
																			<div class="form-group Remove-Padding col-md-5-1"
																				style="margin-top: 9px; padding-right: 0%;">
																				<label class="TextFont">Operation No</label> <input
																					type='text' id='txtCathNo1' name='txtCathNo'
																					readonly="readonly"
																					class="form-control input-SmallText TextFont" />
																			</div>
																			<div class="form-group Remove-Padding col-md-1-1"
																				style="margin-top: 9px;"></div>
																			<div class="form-group Remove-Padding col-md-5-1"
																				style="margin-top: 9px; padding-right: 0%;">
																				<label class="TextFont">Suggested By</label> <input
																					type='text' id='suggestedBy' name='suggestedBy'
																					readonly="readonly"
																					class="form-control input-SmallText TextFont" />
																			</div>
																		</div>
																		<div class="col-md-6-1">
																			<div class="form-group Remove-Padding col-md-5-1"
																				style="margin-top: 9px; display: none;">
																				<label class="TextFont">Instruments
																					Charges(%):</label> <input type='text' id='surInstrument1'
																					value="0" style=''
																					class="form-control input-SmallText col-md-12-1 margin-1" />
																			</div>
																			<div style="margin-top: 9px;" class="col-md-1-1">
																			</div>
																			<div class="form-group Remove-Padding col-md-5-1"
																				style="margin-top: 9px;">
																				<label class="TextFont">Anaes.(one-on-one)</label> <select
																					id='txtRoute1' name='txtRoute' style='width: 100%;'
																					class="form-control input-SmallText TextFont">
																					<option value="Y">Y</option>
																					<option value="N">N</option>
																				</select>
																			</div>
																		</div>
																	</div>

																</div>
															</div>

															<!-- <div class='col-sm-4-1'>
														<div class="form-group Remove-Padding col-md-12-1"
															style="margin-top: 9px;">
															<div class="form-group Remove-Padding col-md-4-1"
																style="margin-top: 9px;">
																<label class="TextFont">Consumable Item</label> <input
																	type='text' id='txtEqNamec1' class="auto" style=''
																	onchange=""
																	onkeypress="return  validatealphabetic(event)" />
															</div>
															<script type="text/javascript">
																$(
																		"#txtEqNamec1")
																		.autocomplete(
																				{
																					source : function(
																							request,
																							response) {
																						var findingName = $(
																								"#txtEqNamec1")
																								.val();
																						var otId = $(
																								"#otID")
																								.val();
																						var auto = 'invOTMedicine';
																						var inputs = [];
																						inputs
																								.push('auto='
																										+ auto);
																						inputs
																								.push('q='
																										+ findingName);
																						inputs
																								.push('OTID='
																										+ otId);
																						var str = inputs
																								.join('&');
																						jQuery
																								.ajax({
																									async : true,
																									type : "POST",
																									data : str
																											+ "&reqType=AJAX",
																									url : "AutoSuggetionServlet",
																									timeout : 1000 * 60 * 15,
																									cache : false,
																									error : function() {
																										//alert('error');
																									},
																									success : function(
																											r) {
																										ajaxResponse = r;
																										//alert(r);
																										var availableTags = [];
																										availableTags = ajaxResponse
																												.split("\n");

																										//alert(availableTags);
																										response(availableTags);
																									}
																								});
																					}
																				});
															</script>
															<div class="form-group Remove-Padding col-md-1-1"
																style="margin-top: 9px;"></div>
															<div class="form-group Remove-Padding col-md-4-1"
																style="margin-top: 9px;">
																<label class="TextFont">Quantity</label> <input
																	type='text' id='txtEqQtyc1' style=''
																	onkeyup="return validateNumberByRegEx(this.id)" />
															</div>
															<div class="form-group Remove-Padding col-md-1-1"
																style="margin-top: 9px;"></div>
															<div class="form-group Remove-Padding col-md-1-1"
																style="margin-top: 29px;">
																<label class="TextFont"></label> <img
																	src="images/plus.jpg" width="18" height="18"
																	onclick="addIpdServicesName('c',1)" />
															</div>
															<div class="form-group Remove-Padding col-md-1-1"
																style="margin-top: 29px;">
																<label class="TextFont"></label> <img
																	src="images/minus.jpg" width="18" height="18"
																	onclick="removeIpdServicesName('c',1)" />
															</div>
														</div>
														<div class="form-group Remove-Padding col-md-12-1"
															style="margin-top: 0px;">

															<div class="form-group Remove-Padding col-md-10-1"
																style="margin-top: 9px;">
																<select id='txtEquipmetc1' multiple="multiple"
																	style="width: 100%;" size="3">
																</select>
															</div>
															<div class="form-group Remove-Padding col-md-10-1"
																style="margin-top: 9px;">
																<select id='txtEquipmetcreadonly1' multiple="multiple"
																	style="width: 100%;" size="3">
																</select>
															</div>
															<button class="btn btn-xs btn-success"
																style="margin-top: 10px; margin-left: 5px;"
																onclick="ProcessInvItemsfromOTManage();">POST</button>
														</div>

														<div class="form-group Remove-Padding col-md-12-1"
															style="margin-top: 9px;">
															<div class="form-group Remove-Padding col-md-4-1"
																style="margin-top: 9px;">
																<label class="TextFont">Bed Side Procedures Item</label>
																<input type='text' id='txtEqNameb1' class="auto"
																	style='' onchange=""
																	onkeypress="return  validatealphabetic(event)" />
																	
																<input type='text' id='txtEqNameb1' class="auto"
																	style=''  onkeyup="setoperationservices(this.id,6)"
																	 />		
																<input type="hidden" id='txtseridb1' value='0'>	
																	
															</div>
															<script type="text/javascript">
																/* $(
																		"#txtEqNameb1")
																		.autocomplete(
																				{
																					source : function(
																							request,
																							response) {
																						var findingName = $(
																								"#txtEqNameb1")
																								.val();
																						var autoType = 'b';
																						var auto = 'IpdService';
																						var inputs = [];
																						inputs
																								.push('auto='
																										+ auto);
																						inputs
																								.push('q='
																										+ findingName);
																						inputs
																								.push('autoType='
																										+ autoType);
																						var str = inputs
																								.join('&');
																						jQuery
																								.ajax({
																									async : true,
																									type : "POST",
																									data : str
																											+ "&reqType=AJAX",
																									url : "AutoSuggetionServlet",
																									timeout : 1000 * 60 * 15,
																									cache : false,
																									error : function() {
																										//alert('error');
																									},
																									success : function(
																											r) {
																										ajaxResponse = r;
																										var availableTags = [];
																										availableTags = ajaxResponse
																												.split("\n");
																										response(availableTags);
																									}
																								});
																					}
																				}); */
																				
																				
																				
																				
															</script>
															<div class="form-group Remove-Padding col-md-1-1"
																style="margin-top: 9px;"></div>
															<div class="form-group Remove-Padding col-md-4-1"
																style="margin-top: 22px;">
																<label class="TextFont">Quantity</label> <input
																	type='text' id='txtEqQtyb1' style=''
																	onkeyup="return validateNumberByRegEx(this.id)" />
															</div>
															<div class="form-group Remove-Padding col-md-1-1"
																style="margin-top: 9px;"></div>
															<div class="form-group Remove-Padding col-md-1-1"
																style="margin-top: 29px;">
																<label class="TextFont"></label> <img
																	src="images/plus.jpg" width="18" height="18"
																	onclick="addIpdServicesName('b',1)" />
															</div>
															<div class="form-group Remove-Padding col-md-1-1"
																style="margin-top: 29px;">
																<label class="TextFont"></label> <img
																	src="images/minus.jpg" width="18" height="18"
																	onclick="removeIpdServicesName('b',1)" />
															</div>
														</div>
														<div class="form-group Remove-Padding col-md-12-1"
															style="margin-top: 0px;">

															<div class="form-group Remove-Padding col-md-10-1"
																style="margin-top: 9px;">
																<select id='txtEquipmetb1' multiple="multiple"
																	style="width: 100%;" size="4">
																</select>
															</div>
														</div>

														<div class="form-group Remove-Padding col-md-12-1"
															style="margin-top: 9px;">
															<div class="form-group Remove-Padding col-md-4-1"
																style="margin-top: 9px;">
																<label class="TextFont">Gases and Monitors Item</label>
																<input type='text' id='txtEqNameg1' class="auto"
																	style='' onchange=""
																	onkeypress="return  validatealphabetic(event)" />
																	<input type='text' id='txtEqNameg1' class="auto"
																	style=''  onkeyup="setoperationservices(this.id,7)">
																	
															</div>
															<script type="text/javascript">
																/* $(
																		"#txtEqNameg1")
																		.autocomplete(
																				{
																					source : function(
																							request,
																							response) {
																						var findingName = $(
																								"#txtEqNameg1")
																								.val();
																						var autoType = 'g';
																						var auto = 'IpdService';
																						var inputs = [];
																						inputs
																								.push('auto='
																										+ auto);
																						inputs
																								.push('q='
																										+ findingName);
																						inputs
																								.push('autoType='
																										+ autoType);
																						var str = inputs
																								.join('&');
																						jQuery
																								.ajax({
																									async : true,
																									type : "POST",
																									data : str
																											+ "&reqType=AJAX",
																									url : "AutoSuggetionServlet",
																									timeout : 1000 * 60 * 15,
																									cache : false,
																									error : function() {
																										//alert('error');
																									},
																									success : function(
																											r) {
																										ajaxResponse = r;
																										var availableTags = [];
																										availableTags = ajaxResponse
																												.split("\n");
																										response(availableTags);
																									}
																								});
																					}
																				}); */
															</script>
															<div class="form-group Remove-Padding col-md-1-1"
																style="margin-top: 9px;"></div>
															<div class="form-group Remove-Padding col-md-4-1"
																style="margin-top: 21px;">
																<label class="TextFont">Quantity</label> <input
																	type='text' id='txtEqQtyg1' style=''
																	onkeyup="return validateNumberByRegEx(this.id)" />
															</div>
															<div class="form-group Remove-Padding col-md-1-1"
																style="margin-top: 9px;"></div>
															<div class="form-group Remove-Padding col-md-1-1"
																style="margin-top: 29px;">
																<label class="TextFont"></label> <img
																	src="images/plus.jpg" width="18" height="18"
																	onclick="addIpdServicesName('g',1)" />
															</div>
															<div class="form-group Remove-Padding col-md-1-1"
																style="margin-top: 29px;">
																<label class="TextFont"></label> <img
																	src="images/minus.jpg" width="18" height="18"
																	onclick="removeIpdServicesName('g',1)" />
															</div>
														</div>
														<div class="form-group Remove-Padding col-md-12-1"
															style="margin-top: 0px;">

															<div class="form-group Remove-Padding col-md-10-1"
																style="margin-top: 9px;">
																<select id='txtEquipmetg1' multiple="multiple"
																	style="width: 100%;" size="4">
																</select>
															</div>
														</div>

														<div class="form-group Remove-Padding col-md-12-1"
															style="margin-top: 9px;">
															<div class="form-group Remove-Padding col-md-4-1"
																style="margin-top: 9px;">
																<label class="TextFont">Instruments and
																	Equipments Item</label> <input type='text' id='txtEqNamei1'
																	class="auto" style='' onchange=""
																	onkeypress="return  validatealphabetic(event)" />
																		<input type='text' id='txtEqNamei1' class="auto"
																	style=''  onkeypress="return  validatealphabetic(event)" onkeyup="setoperationservices(this.id,8)">
															</div>
															<script type="text/javascript">
																/* $(
																		"#txtEqNamei1")
																		.autocomplete(
																				{
																					source : function(
																							request,
																							response) {
																						var findingName = $(
																								"#txtEqNameg1")
																								.val();
																						var autoType = 'i';
																						var auto = 'IpdService';
																						var inputs = [];
																						inputs
																								.push('auto='
																										+ auto);
																						inputs
																								.push('q='
																										+ findingName);
																						inputs
																								.push('autoType='
																										+ autoType);
																						var str = inputs
																								.join('&');
																						jQuery
																								.ajax({
																									async : true,
																									type : "POST",
																									data : str
																											+ "&reqType=AJAX",
																									url : "AutoSuggetionServlet",
																									timeout : 1000 * 60 * 15,
																									cache : false,
																									error : function() {
																										//alert('error');
																									},
																									success : function(
																											r) {
																										ajaxResponse = r;
																										var availableTags = [];
																										availableTags = ajaxResponse
																												.split("\n");
																										response(availableTags);
																									}
																								});
																					}
																				}); */
															</script>
															<div class="form-group Remove-Padding col-md-1-1"
																style="margin-top: 9px;"></div>
															<div class="form-group Remove-Padding col-md-4-1"
																style="margin-top: 22px;">
																<label class="TextFont">Quantity</label> <input
																	type='text' id='txtEqQtyi1' style=''
																	onkeyup="return validateNumberByRegEx(this.id)" />
															</div>
															<div class="form-group Remove-Padding col-md-1-1"
																style="margin-top: 9px;"></div>
															<div class="form-group Remove-Padding col-md-1-1"
																style="margin-top: 29px;">
																<label class="TextFont"></label> <img
																	src="images/plus.jpg" width="18" height="18"
																	onclick="addIpdServicesName('i',1)" />
															</div>
															<div class="form-group Remove-Padding col-md-1-1"
																style="margin-top: 29px;">
																<label class="TextFont"></label> <img
																	src="images/minus.jpg" width="18" height="18"
																	onclick="removeIpdServicesName('i',1)" />
															</div>
														</div>
														<div class="form-group Remove-Padding col-md-12-1"
															style="margin-top: 0px;">

															<div class="form-group Remove-Padding col-md-10-1"
																style="margin-top: 9px;">
																<select id='txtEquipmeti1' multiple="multiple"
																	style="width: 100%;" size="4">
																</select>
															</div>
														</div>
													</div> -->
														</div>
													</div>

													<!-- ____________@author : Touheed @date : 26-May-2016 @reason : CPOE UI For Manage Opreation (Start)_________ -->

													<div ID="ANSNotes" class="tab-pane fade in">
														<!-- ====== Row: 1 ====== -->
														<div
															style="margin-top: 10px; width: 96%; margin-left: 2%;">
															<!-- MARKDOWN -->
															<div class="box border red">
																<div class="box-title">
																	<h4>
																		<i class="fa fa-pencil-square"></i>Anaesthesia Note
																	</h4>
																	<div class="tools hidden-xs">
																		<a href="#box-config" data-toggle="modal"
																			class="config"> <i class="fa fa-cog"></i>
																		</a> <a href="javascript:;" class="reload"> <i
																			class="fa fa-refresh"></i>
																		</a> <a href="javascript:;" class="collapse"> <i
																			class="fa fa-chevron-up"></i>
																		</a> <a href="javascript:;" class="remove"> <i
																			class="fa fa-times"></i>
																		</a>
																	</div>
																</div>
																<div class="box-body">
																	<form>
																		<textarea name="txtComment1" data-provide="markdown"
																			id="txtComment1" rows="10"></textarea>
																	</form>
																</div>
															</div>
															<!-- /MARKDOWN -->
														</div>
													</div>
													<!-- Start Code for CPOE GUI -->
													<div id="CPOE" class="tab-pane fade in">
														<div id="row1" class="col-md-12-1"
															style="padding-top: 0px;">
															<div class="tabbable tabs-left col-md-12-1"
																style="margin-top: 0px; margin-left: 5px;">
																<div class="tab-content col-md-10-1"
																	style="margin-top: 0px;">
																	<div id="Investigation"
																		class="tab-pane fade active in col-md-12-1">
																		<div id="Investigation_row_1" class="col-sm-12-1"
																			style="margin-top: 40px;">
																			<div class="col-sm-4-1">
																				<div class="form-group Remove-Padding col-sm-12-1"
																					style="padding-left: 5%">
																					<label class="TextFont" for="exampleInputEmail1">Test
																						Name </label>
																					<div id="divInvestigationTestName">
																						<input type="text" placeholder="Test Name"
																							id="txtautoserviceName"
																							class="typeahead form-control"
																							style="border: 1px solid orange;"
																							onkeyup="setoperationservices(this.id,'cpoe')">
																					</div>
																				</div>
																				<input type="hidden" id="charges1" value="0"><input
																					type="hidden" id="txtnormalcharges" value="0">
																				<input type="hidden" id="investigationtestId"
																					value="0"><input type="hidden"
																					id="idTestSlave" value="0">
																			</div>

																			<div style="margin-top: -11px;" class="col-sm-1-1">
																				<div style="padding-left: 5%"
																					class="form-group Remove-Padding col-sm-12-1">
																					<label for="exampleInputEmail1" class="TextFont">Rate</label>
																					<input type="text" value="0" readonly="readonly"
																						style="border: 1px solid sliver;"
																						class=" form-control" id="OtRate"
																						placeholder="Rate"><input type="hidden"
																						value="0" id="OtRate2">
																				</div>
																			</div>
																			<div style="margin-top: -11px;" class="col-sm-1-1">
																				<div style="padding-left: 5%"
																					class="form-group Remove-Padding col-sm-12-1">
																					<label for="exampleInputEmail1" class="TextFont">Qty
																					</label> <input type="text" value="1"
																						onkeypress="return validatePrice(event)"
																						onkeyup="calculateTotalCpoe()"
																						style="border: 1px solid sliver;"
																						class=" form-control" id="OtQty">
																				</div>
																			</div>


																			<div style="margin-top: -11px;" class="col-sm-1-1">
																				<div style="padding-left: 5%"
																					class="form-group Remove-Padding col-sm-12-1">
																					<label for="exampleInputEmail1" class="TextFont">Amount
																					</label> <input type="text" value="1" readonly="readonly"
																						style="border: 1px solid sliver;"
																						class=" form-control" id="OtAmt">
																				</div>
																			</div>


																			<div class="col-sm-2-1"
																				style="margin-top: -11px; padding-left: 5%">
																				<div class="form-group Remove-Padding col-sm-12-1">
																					<label class="TextFont" for="exampleInputEmail1">Doctor</label>
																					<select id="doctor2" style="width:90px">
																						<option selected="selected" value="0">Select</option>
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
																				<div class="form-group Remove-Padding col-sm-12-1">
																					<label class="TextFont">Unit</label> <select
																						id="uId" class="form-control input-SmallText"
																						onchange="cleartexrfiled();">
																					</select><input type="hidden" id="allunitid">
																				</div>
																			</div>


																		</div>
																		<div class="col-md-4"
																			style="margin-top: 26px; margin-left: -42px;display:none">
																			<div class="row" style="margin-top: -40px; margin-left: 29px;">
																				<!-- ---------Touheed Plugin Multi select Plugin-------------- -->
																				<label class="TextFont"
																					style="margin-bottom: 0px; margin-top: 21px; margin-left: 18px">Select
																					Combination Services </label>
																				<div id=""
																					class="form-group Remove-Padding col-md-12-1"
																					style="margin-left: 0; height: 80px; margin-top: 1px; width: 98%;">

																					<div class="divide-20"></div>

																					<div class="form-group">

																						<div class="col-md-8">
																							<select name="listmstrcom"
																								id="listmstr_select_otcpoe" style="width: 200px"
																								onclick="setDyanamicDivot('dynamicItemcpoe',this.id,'OTCPOE')">
																								<option id="firstElmtcomdrug" value="0">---
																									Select Services ---</option>

																							</select>
																						</div>
																					</div>

																					<div
																						class="col-md-12 select2-container select2-container-multi "
																						style="margin-top: -1%;">
																						<ul id="dynamicItemcpoe" class="select2-choices"
																							style="overflow-y: scroll;">

																						</ul>
																					</div>

																				</div>
																				<!-- 	---------Touheed Plugin Multi select Plugin-------------- -->

																			</div>
																			<div class="divide-20"></div>
																		</div>
																		<div class="col-md-3"
																			style="margin-top: 65px; margin-left: -22px;display:none">
																			<button
																				style="margin-left: 1%; margin-top: -10px; height: 28px; width: 60px"
																				type="button" class="btn btn-xs btn-info"
																				onclick="Freez('OT','CPOE')" id="bOTCOE">Freez</button>
																		</div>

																		<div id="Investigation_row2" class="col-sm-12-1"
																			style="margin-top: 0px;">
																			<div style="margin-top: 2%;"
																				class="col-sm-6 select2-container select2-container-multi ">
																				<ul style="overflow-y: scroll;"
																					class="select2-choices" id="dynamicItem"></ul>
																				<input type="hidden" value="0" id="subserviceid">
																				<input type="hidden" value="0" id="chargesubservice">
																				<input type="hidden" value="0" id="serviceid">
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
																				<input type="checkbox" id="cpoeUrgent"> <label
																					style="margin-top: 0px;"
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
														<div id="row2" class="col-sm-12-1"
															style="margin-top: 28px">
															<div class="form-group col-md-12-1" style="margin: 2px;">
																<div class="col-md-12-1"
																	style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
																	<label onclick="editServiceOnCPOE()"
																		id="editCPOE_TestLabel11"
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
																		<i class="fa fa-edit"></i> Edit
																	</label> <label id=""
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;"
																		onclick="deleteOTServicesAdvised('multiple','OT')"> <i
																		class="fa fa-trash-o"></i> Multiple Delete
																	</label>
																</div>
																<div class="col-sm-12-1" style="margin-top: 0px;">
																	<table class="table table-condensed ">
																		<thead>
																			<tr>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px;">
																					<div class="TextFont">#</div>
																				</th>
																				<th class="col-md-2-1 center"
																					style="height: 21.5px; padding-left: 5px;">
																					<div class="TextFont">Particulars/Details</div>
																				</th>
																				<th class="col-md-2-1 center"
																					style="height: 21.5px; padding-left: 0px;">
																					<div class="TextFont">Date</div>
																				</th>
																				<th class="col-md-2-1 center"
																					style="height: 21.5px; padding-left: 0px;">
																					<div class="TextFont">Consultant Name</div>
																				</th>
																				<th class="col-md-3-1 center"
																					style="height: 21.5px; padding-right: 23px;">
																					<div class="TextFont">Type</div>
																				</th>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px; padding-right: 29px;">
																					<div class="TextFont">Status</div>
																				</th>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px; padding-left: 0px;">
																					<div class="TextFont">Action</div>
																				</th>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px; padding-right: 31px;">
																					<div class="TextFont">Delete</div>
																				</th>
																			</tr>
																		</thead>
																	</table>
																	<div id="flip-scroll" class="col-sm-12-1"
																		style="overflow-y: scroll; height: 115px; maxheight: auto; margin-top: -21px;">
																		<table class="table table-striped table-condensed">
																			<tbody id="tcpoeservices"></tbody>
																		</table>
																		
																	</div>
																</div>
															</div>
														</div>
													</div>


													<!-- New OT CHARGES -->


													<div id="OTSERV" class="tab-pane fade in">
														<div id="row1" class="col-md-12-1"
															style="padding-top: 0px;">
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
																						<input type="text" placeholder=" Name"
																							id="txtOserv" class="typeahead form-control"
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
																						class=" form-control" id="txtOservamt"
																						onchange="setHiddenFieldOtCharges(this.value),calculateEmerChrForOtCharges()">
																					<input type="hidden" value="0" id="txtOservamt2">
																				</div>
																			</div>


																			<div class="col-sm-2-1"
																				style="margin-top: -11px; margin-left: 20px">
																				<div class="form-group  col-sm-12-1" style="width:280px">
																					<label class="TextFont">Doctor</label>
																					<div class="" style="margin-top: 9px">
																						<select id="doctorNameOT" 
																							name="doctorNameOT"
																							class="col-md-12" ></select>
																					</div>
																				</div>
																				<!-- <div class="form-group">
																	<label class="col-sm-4 control-label">Doctor</label> 
																	<div class="">
																		<select id="doctorNameOT" name="SpecialityId" style="width:100%" > <option value="0">Select Speciality </option>
																	 </select>														
												 			 		</div>
												 			 	</div> -->
																			</div>


																			 <div class="col-sm-2-1" style="margin-top:11px ">
                																	 <div class="form-group Remove-Padding col-sm-12-1" style="margin-left: 130px;margin-top: -30px;">
                 																	 <label class="TextFont" for="exampleInputEmail1">Operation Name</label>
                 																		 <select id="operationListId" class="form-control input-SmallText" onchange="">
               																	  <!--  <option selected="selected" value="0">Select</option></select> -->
               																	  </select>
               																		   </div></div> 
																			<div class="col-sm-2-1" style="margin-top: -11px">
																				<div class="form-group Remove-Padding col-sm-12-1" style="margin-left: 300px;margin-top: -30px;" >
																					<label class="TextFont">Unit</label> <select
																						id="unlId" class="form-control input-SmallText"
																						onchange="cleartexrfiled();">
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
																				<input type="hidden" value="0"
																					id="chargesubserviceOS"> <input
																					type="hidden" value="0" id="serviceidOS"> <input
																					type="hidden" value="0" id="billidserviceOS">
																			</div>
																			<div id="col9" class="col-sm-2-1"
																				style="margin-top: 10px; padding-left: 2%">
																				<div class="form-group Remove-Padding col-sm-12-1">
																					<div class="divide-10"></div>
																					<label class="TextFont" for="exampleInputEmail1">Instructions
																					</label> <input type="text" placeholder="Instructions"
																						class="form-control input-SmallText" id="serviceIns">
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
																						id="serviceClinicalNotes">
																				</div>
																			</div>
																			<div id="col11" class="col-sm-0-1"
																				style="margin-top: 30px; padding-left: 5px">
																				<input type="checkbox" id="cpoeUrgent"> <label
																					style="margin-top: 0px;"
																					class="TextFont Remove-Padding"> Urgent </label> <i><input
																					type="button"
																					class="btn btn-xs btn-success editUserAccess"
																					onclick="saveOTCpoe('OC')" value="Save"
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
														<div id="row2" class="col-sm-12-1"
															style="margin-top: 28px">
															<div class="form-group col-md-12-1" style="margin: 2px;">
																<div class="col-md-12-1"
																	style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
																	<label onclick="editCPOE_Test()"
																		id="editCPOE_TestLabel"
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
																		<i class="fa fa-edit"></i> Edit
																	</label> <label id=""
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;"
																		onclick="deleteOTServicesAdvised('multiple','OT')"> <i
																		class="fa fa-trash-o"></i> Multiple Delete
																	</label>
																</div>
																<div class="col-sm-12-1" style="margin-top: 0px;">
																	<table class="table table-condensed ">
																		<thead>
																			<tr>
																				<th style="height: 21.5px;"
																					class="col-md-1-1 center"><div
																						class="TextFont">Select</div></th>
																						
																						<th style="height: 21.5px;"
																					class="col-md-1-1 center"><div
																						class="TextFont">#</div></th>
																				
																				<th style="height: 21.5px; padding-right: 13px;"
																					class="col-md-1-1 right"><div
																						class="TextFont">Consultant Name</div></th>
																						
																				<th style="height: 21.5px; padding-right: 13px;"
																					class="col-md-1-1 right"><div
																						class="TextFont">Operation Name</div></th>		
									
																				<th style="height: 21.5px; padding-right: 13px;"
																					class="col-md-1-1 center"><div
																						class="TextFont">Particulars/Details</div></th>
																				<th style="height: 21.5px;"
																					class="col-md-1-1 center"><div
																						class="TextFont">Date</div></th>
																				<th style="height: 21.5px; padding-right: 0px;"
																					class="col-md-1-1 center"><div
																						class="TextFont">Status</div></th>
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
																<label class="TextFont"
																	style="margin-bottom: 4px; margin-top: 7px; margin-left: 18px">Select
																	Combination Services </label>
																<div id="" class="form-group Remove-Padding col-md-12-1"
																	style="margin-left: 0; height: 80px; margin-top: 1px; width: 98%;">

																	<div class="divide-20"></div>

																	<div class="form-group">

																		<div class="col-md-8">
																			<select name="listmstrcom"
																				id="listmstr_select_otcharges" style="width: 200px"
																				onclick="setDyanamicDivot('dynamicItemcom',this.id,'OTCHARG')">
																				<option id="firstElmtcom" value="0">---
																					Select Services ---</option>

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
																<label class="TextFont"
																	style="margin-bottom: 4px; margin-top: 7px; margin-left: 18px">Select
																	Combination Services </label>
																<div id="" class="form-group Remove-Padding col-md-12-1"
																	style="margin-left: 0; height: 80px; margin-top: 1px; width: 98%;">

																	<div class="divide-20"></div>

																	<div class="form-group">

																		<div class="col-md-8">
																			<select name="listmstrcom2"
																				id="listmstr_select_otcharges2" style="width: 200px"
																				onclick="setDyanamicDivot('dynamicItemcom2',this.id,'OTCHARG')">
																				<option id="firstElmtcom" value="0">---
																					Select Services ---</option>

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

														<div class="col-md-4" style="margin-top: 48px">
															<button id="bOTC" type="button"
																class="btn btn-xs btn-info"
																onclick="Freez('OT','OTCHARG')">Freez</button>
															<button onclick="Saveoperations('OTCHARG')"
																class="btn btn-xs btn-success">Save</button>
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
																								<input class="col-md-8-1" name="byName"
																									type="text"
																									onkeyup="setAutoCompleteForConfiguration(this.id,'search')"
																									class="typeahead form-control input-SmallText "
																									id="byName" style="margin-left: 50px;" />
																							</div>

																							<div class="col-md-1-1"
																								style="text-align: center;">
																								<input type="button" value="search"
																									class="btn btn-xs btn-primary"
																									id="searchCharges"
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
																							<label
																								style="margin-top: 6px; margin-left: 46px;">Total
																								Charges</label> <input id="totalcharges" type="text"
																								maxlength="200" name="toatalCharges"
																								style="width: 43%; margin-top: -6px; margin-left: 32px;"
																								value="0"> <input type="hidden"
																								id="bidipdoc" value="0">
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

																						<table
																							class='table table-striped table-condensed cf'>
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
														<div id="row1" class="col-md-12-1"
															style="padding-top: 0px;">
															<div class="tabbable tabs-left col-md-12-1"
																style="margin-top: 0px; margin-left: 5px;">
																<div class="tab-content col-md-10-1"
																	style="margin-top: 0px;">
																	<div id="Investigation"
																		class="tab-pane fade active in col-md-12-1">
																		<div id="Investigation_row_1" class="col-sm-12-1"
																			style="margin-top: 40px;">
																			<div class="col-sm-4-1">
																				<div class="form-group Remove-Padding col-sm-12-1"
																					style="padding-left: 5%">
																					<label class="TextFont" for="exampleInputEmail1">Product
																						Name </label>
																					<div id="divInvestigationTestName">
																						<input type="text" placeholder="Product Name"
																							id="txtautoservicePharma"
																							class="typeahead form-control"
																							style="border: 1px solid orange;"
																							onkeypress="return setValuesToAutocompleteOT(this.id)">


																						<!--              <input id="txtautoservicePharma" class="typehead form-control input-SmallText" type="text" required="" onkeypress="return setValuesToAutocomplete(event)" autocomplete="off" autofocus="autofocus" tabindex="1" placeholder="Product" name="txtProductName" >
 -->
																						<input type="hidden" value="0" id="textBhVat">
																						<input type="hidden" value="0" id="txtAQty">
																						<input type="hidden" value="0" id="txtExpiry">
																						<!--new filed pharma expdate  -->
																						<input type="hidden" value="0" id="textBatch">
																						<!--new filed pharma batchcode  -->
																						<input type="hidden" value="0" id="bathid">
																						<!--new filed pharma bathid  -->
																						<input type="hidden" value="0" id="serIDPharma">
																						<input type="hidden" value="0" id="billidPharma">
																					</div>
																				</div>
																			</div>
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
																			<div class="col-sm-1-1" style="margin-top: -11px;">
																				<div class="form-group Remove-Padding col-sm-12-1"
																					style="padding-left: 5%">
																					<label class="TextFont" for="exampleInputEmail1">Rate</label>
																					<input type="text" placeholder="Rate"
																						id="pharmaRate" class=" form-control"
																						style="border: 1px solid sliver;"
																						readonly="readonly" value="0">
																				</div>
																			</div>
																			<div class="col-sm-1-1" style="margin-top: -11px;">
																				<div class="form-group Remove-Padding col-sm-12-1"
																					style="padding-left: 5%">
																					<label class="TextFont" for="exampleInputEmail1">Qty
																					</label> <input type="text" id="pharmaQty"
																						class=" form-control"
																						style="border: 1px solid sliver;"
																						onkeyup="calculateTotalOT()"
																						onkeypress="return validatePrice(event)" value="1">
																				</div>
																			</div>
																			<div class="col-sm-1-1" style="margin-top: -11px;">
																				<div class="form-group Remove-Padding col-sm-12-1"
																					style="padding-left: 5%">
																					<label class="TextFont" for="exampleInputEmail1">Amount
																					</label> <input type="text" id="pharmaAmt"
																						class=" form-control"
																						style="border: 1px solid sliver;"
																						readonly="readonly" value="1">
																				</div>
																			</div>
																			<div class="col-md-4">
																				<div class="row"
																					style="margin-top: -40px; margin-left: 29px">
																					<!-- ---------Touheed Plugin Multi select Plugin-------------- -->
																					<label class="TextFont"
																						style="margin-bottom: 0px; margin-top: 21px; margin-left: 18px">Select
																						Combination Services </label>
																					<div id=""
																						class="form-group Remove-Padding col-md-12-1"
																						style="margin-left: 0; height: 80px; margin-top: 1px; width: 98%;">

																						<div class="divide-20"></div>

																						<div class="form-group">

																							<div class="col-md-8">
																								<select name="listmstrcom"
																									id="listmstr_select_otdrugs"
																									style="width: 200px"
																									onclick="setDyanamicDivot('dynamicItemdrug',this.id,'OTDRUG')">
																									<option id="firstElmtcomdrug" value="0">---
																										Select Services ---</option>

																								</select>
																							</div>
																						</div>

																						<div
																							class="col-md-12 select2-container select2-container-multi "
																							style="margin-top: 5%;">
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
                  </div></div> -->
																		</div>
																		<div id="Investigation_row2" class="col-sm-12-1"
																			style="margin-top: -18px;">
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
																				style="margin-top: 26px; px; padding-left: 5px">
																				<input type="checkbox" id="cpoeUrgent"> <label
																					style="margin-top: 0px;"
																					class="TextFont Remove-Padding"> Urgent </label> <i>
																					<button id="bOTD" onclick="Freez('OT','OTDRUG')"
																						class="btn btn-xs btn-info" type="button"
																						style="margin-left: 1%; margin-top: -12px">Freeze</button>
																					<input type="button"
																					class="btn btn-xs btn-success editUserAccess"
																					onclick="saveOD('OTDRUG')" value="Save"
																					style="margin-left: 1%; margin-top: -12px">
																				</i>
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
														<div id="row2" class="col-sm-12-1"
															style="margin-top: 28px">
															<div class="form-group col-md-12-1" style="margin: 2px;">
																<div class="col-md-12-1"
																	style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
																	<label onclick="editTestOD()" id="editCPOE_TestLabel"
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
																		<i class="fa fa-edit"></i> Edit
																	</label> <label id=""
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;"
																		onclick="deleteMultiplepharma('multiple','OTDRUG')"> <i
																		class="fa fa-trash-o"></i> Multiple Delete
																	</label>
																</div>
																<div class="col-sm-12-1" style="margin-top: 0px;">



																	<table class='table table-bordered table-condensed cf'
																		style='width: 100%; margin-top: 10px;'
																		id="doctorMasterPojo">
																		<thead class='cf'>
																			<tr>
																				<th class='col-md-1-1 center'
																					style='height: 21.5px;'><div class='TextFont'>#</div></th>
																				<!-- <th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Charges ID</div></th> -->
																				<th class='col-md-1-1 center'
																					style='height: 21.5px; padding-right: 13px;'><div
																						class='TextFont'>Particulars/Details</div></th>
																				<th class='col-md-1-1 center'
																					style='height: 21.5px;'><div class='TextFont'>Date</div></th>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px; padding-right: 0px;">
																					<div class="TextFont">Status</div>
																				</th>

																				<th class="col-md-1-1 center"
																					style="height: 21.5px; padding-left: 0px;">
																					<div class="TextFont">Edit</div>
																				</th>

																				<th class='numeric col-md-1-1 center'
																					style='height: 21.5px;'><div class='TextFont'>Delete</div></th>
																			</tr>
																		</thead>
																	</table>
																</div>

																<div
																	style="width: 55%; margin-left: 3%; float: left; height: 100%;"></div>
																<div class='col-sm-12-1'
																	style='margin-top: -21px; border: 1px solid #ddd; overflow-y: scroll; height: 180px;; max-height: auto;'>
																	<table class='table table-striped table-condensed cf'>
																		<tbody id="tcpoeservicesOD"></tbody>
																	</table>
																</div>

															</div>
														</div>
													</div>
													<!--OTDRUG  -->

													<!--        ot inventory -->

													<div id="OTInv" class="tab-pane fade in">
														<div id="row1" class="col-md-12-1"
															style="padding-top: 0px;">
															<div class="tabbable tabs-left col-md-12-1"
																style="margin-top: 0px; margin-left: 5px;">
																<div class="tab-content col-md-10-1"
																	style="margin-top: 0px;">
																	<div id="Investigation"
																		class="tab-pane fade active in col-md-12-1">
																		<div id="Investigation_row_1" class="col-sm-12-1"
																			style="margin-top: 40px;">
																			<div class="col-sm-4-1">
																				<div class="form-group Remove-Padding col-sm-12-1"
																					style="padding-left: 5%">
																					<label class="TextFont" for="exampleInputEmail1">Item
																						Name </label>
																					<div id="divInvestigationTestName">
																						<input type="text" placeholder="Item Name"
																							id="txtautoserviceOI"
																							class="typeahead form-control"
																							style="border: 1px solid orange;"
																							onkeyup="fetchpharmaproductandinvclick(this.id,'OTINV')">
																					</div>
																				</div>
																				<input type="hidden" id="charges1" value="0">
																				<input type="hidden" id="billdinv" value="0">
																				<input type="hidden" id="serIDinv" value="0">
																				<input type="hidden" id="mrnslaveId" value="0">
																				<input type="hidden" id="batchId" value="0">
																				<input type="hidden" id="otSubInventoryId" value="0">
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

																			<div class="col-sm-1-1" style="margin-top: -11px;">
																				<div class="form-group Remove-Padding col-sm-12-1"
																					style="padding-left: 5%">
																					<label class="TextFont" for="exampleInputEmail1">Rate</label>
																					<input type="text" placeholder="Rate" id="InvRate"
																						class=" form-control"
																						style="border: 1px solid sliver;"
																						readonly="readonly" value="0">
																				</div>
																			</div>
																			<div class="col-sm-1-1" style="margin-top: -11px;">
																				<div class="form-group Remove-Padding col-sm-12-1"
																					style="padding-left: 5%">
																					<label class="TextFont" for="exampleInputEmail1">Qty
																					</label> <input type="text" id="InvQty"
																						class=" form-control"
																						style="border: 1px solid sliver;"
																						onkeyup="calculateTotalOINV()"
																						onkeypress="return validatePrice(event)" value="1">
																				</div>


																			</div>
																			<!-- <div class="col-sm-1-1" style="margin-top: -11px;">
																				<div class="form-group Remove-Padding col-sm-12-1"
																					style="padding-left: 5%">
																					<label class="TextFont" for="exampleInputEmail1">Available
																						Qty </label> <input type="text" id="InvAQty"
																						class=" form-control"
																						style="border: 1px solid sliver;"
																						readonly="readonly"
																						onkeypress="return validatePrice(event)" value="1">
																				</div>


																			</div> -->
																			<div class="col-sm-1-1" style="margin-top: -11px;">
																				<div class="form-group Remove-Padding col-sm-12-1"
																					style="padding-left: 5%">
																					<label class="TextFont" for="exampleInputEmail1">Amount
																					</label> <input type="text" id="InvAmt"
																						class=" form-control"
																						style="border: 1px solid sliver;"
																						readonly="readonly" value="0">
																				</div>
																			</div>
																			<div class="col-md-4">
																				<div class="row"
																					style="margin-top: -40px; margin-left: 29px">
																					<!-- ---------Touheed Plugin Multi select Plugin-------------- -->
																					<label class="TextFont"
																						style="margin-bottom: 0px; margin-top: 21px; margin-left: 18px">Select
																						Combination Services </label>
																					<div id=""
																						class="form-group Remove-Padding col-md-12-1"
																						style="margin-left: 0; height: 80px; margin-top: 1px; width: 98%;">

																						<div class="divide-20"></div>

																						<div class="form-group">

																							<div class="col-md-8">
																								<select name="listmstrcom"
																									id="listmstr_select_otinv" style="width: 200px"
																									onclick="setDyanamicDivot('dynamicItemINV',this.id,'OTINV')">
																									<option id="firstElmtcomdrug" value="0">---
																										Select Services ---</option>

																								</select>
																							</div>
																						</div>

																						<div
																							class="col-md-12 select2-container select2-container-multi "
																							style="margin-top: 5%;">
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
																		<div id="Investigation_row2" class="col-sm-12-1"
																			style="margin-top: 10px;">

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
																				<input type="checkbox" id="cpoeUrgent"> <label
																					style="margin-top: 0px;"
																					class="TextFont Remove-Padding"> Urgent </label> <i>
																					<button id="bOTI" onclick="Freez('OT','OTINV')"
																						class="btn btn-xs btn-info" type="button"
																						style="margin-left: 1%; margin-top: -12px">Freeze</button>
																					<input type="button"
																					class="btn btn-xs btn-success editUserAccess"
																					onclick="saveOD('OTINV')" value="Save"
																					style="margin-left: 1%; margin-top: -12px">
																				</i>
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
														<div id="row2" class="col-sm-12-1"
															style="margin-top: 28px">
															<div class="form-group col-md-12-1" style="margin: 2px;">
																<div class="col-md-12-1"
																	style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
																	<label onclick="editCPOE_Test()"
																		id="editCPOE_TestLabel"
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
																		<i class="fa fa-edit"></i> Edit
																	</label> <label id=""
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;"
																		onclick="deleteMultiplepharma('multiple','OTINV')"> <i
																		class="fa fa-trash-o"></i> Multiple Delete
																	</label>
																</div>
																<div class="col-sm-12-1" style="margin-top: 0px;">
																	<table class='table table-bordered table-condensed cf'
																		style='width: 100%; margin-top: 10px;'
																		id="doctorMasterPojo">
																		<thead class='cf'>
																			<tr>
																				<th class='col-md-1-1 center'
																					style='height: 21.5px;'><div class='TextFont'>#</div></th>
																				<!-- <th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Charges ID</div></th> -->
																				<th class='col-md-1-1 center'
																					style='height: 21.5px; padding-right: 13px;'><div
																						class='TextFont'>Particulars/Details</div></th>
																				<th class='col-md-1-1 center'
																					style='height: 21.5px;'><div class='TextFont'>Date</div></th>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px; padding-right: 0px;">
																					<div class="TextFont">Status</div>
																				</th>

																				<th class="col-md-1-1 center"
																					style="height: 21.5px; padding-left: 0px;">
																					<div class="TextFont">Edit</div>
																				</th>

																				<th class='numeric col-md-1-1 center'
																					style='height: 21.5px;'><div class='TextFont'>Delete</div></th>
																			</tr>
																		</thead>
																	</table>
																</div>



																<div
																	style="width: 55%; margin-left: 3%; float: left; height: 100%;"></div>
																<div class='col-sm-12-1'
																	style='margin-top: -21px; border: 1px solid #ddd; overflow-y: scroll; height: 180px;; max-height: auto;'>
																	<table class='table table-striped table-condensed cf'>
																		<tbody id="tcpoeservicesOI"></tbody>
																	</table>
																</div>
															</div>
														</div>
													</div>

													<!--   end ot inventory  -->


													<!-- Ot cath lab(Start) -->
													<div id="cathLab" class="tab-pane fade in">
														<div id="row1" class="col-md-12-1"
															style="padding-top: 0px;">
															<div class="tabbable tabs-left col-md-12-1"
																style="margin-top: 0px; margin-left: 5px;">
																<div class="tab-content col-md-10-1"
																	style="margin-top: 0px;">
																	<div id="Investigation"
																		class="tab-pane fade active in col-md-12-1">
																		<div id="Investigation_row_1" class="col-sm-12-1"
																			style="margin-top: 40px;">
																			<div class="col-sm-4-1">
																				<div class="form-group Remove-Padding col-sm-12-1"
																					style="padding-left: 5%">
																					<label class="TextFont" for="exampleInputEmail1">Product
																						Name </label>
																					<div id="divInvestigationTestName">
																						<input type="text" placeholder="Product Name"
																							id="txtCath" class="typeahead form-control"
																							style="border: 1px solid orange;"
																							onkeypress="return setValuesToAutocompleteCath(event)">
																						<input type="hidden" value="0" id="setIDPharma">
																						<input type="hidden" value="0" id="billidcath">
																					</div>
																				</div>
																			</div>
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
																			<div class="col-sm-1-1" style="margin-top: -11px;">
																				<div class="form-group Remove-Padding col-sm-12-1"
																					style="padding-left: 5%">
																					<label class="TextFont" for="exampleInputEmail1"
																						style="display: none;">Rate</label> <input
																						type="text" placeholder="Rate" id="cathRate"
																						class=" form-control"
																						style="border: 1px solid sliver; display: none;"
																						readonly="readonly" value="0">
																				</div>
																			</div>
																			<div class="col-sm-1-1" style="margin-top: -11px;">
																				<div class="form-group Remove-Padding col-sm-12-1"
																					style="padding-left: 5%">
																					<label style="display: none;" class="TextFont"
																						for="exampleInputEmail1">Qty </label> <input
																						type="text" id="cathQty" class=" form-control"
																						style="border: 1px solid sliver; display: none;"
																						onkeyup="calculateTotalOT()"
																						onkeypress="return validatePrice(event)" value="1">
																				</div>
																			</div>
																			<div class="col-sm-1-1" style="margin-top: -11px;">
																				<div class="form-group Remove-Padding col-sm-12-1"
																					style="padding-left: 5%">
																					<label style="display: none;" class="TextFont"
																						for="exampleInputEmail1">Amount </label> <input
																						type="text" id="cathAmt" class=" form-control"
																						style="border: 1px solid sliver; display: none;"
																						readonly="readonly" value="1">
																				</div>
																			</div>
																			<div class="col-md-4">
																				<div class="row"
																					style="margin-top: -40px; margin-left: 29px">
																					<!-- ---------Touheed Plugin Multi select Plugin-------------- -->
																					<label class="TextFont"
																						style="margin-bottom: 0px; margin-top: 21px; margin-left: 18px">Select
																						Combination Services </label>
																					<div id=""
																						class="form-group Remove-Padding col-md-12-1"
																						style="margin-left: 0; height: 80px; margin-top: 1px; width: 98%;">

																						<div class="divide-20"></div>

																						<div class="form-group">

																							<div class="col-md-8">
																								<select name="listmstrcom"
																									id="listmstr_select_otcath"
																									style="width: 200px"
																									onclick="setDyanamicDivot('dynamicItemcath',this.id,'OTCATH')">
																									<option id="firstElmtcomdrug" value="0">---
																										Select Services ---</option>

																								</select>
																							</div>
																						</div>

																						<div
																							class="col-md-12 select2-container select2-container-multi "
																							style="margin-top: 5%;">
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
                  </div></div> -->
																		</div>
																		<div id="Investigation_row2" class="col-sm-12-1"
																			style="margin-top: -18px;">
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
																				style="margin-top: 26px; px; padding-left: 5px">
																				<input type="checkbox" id="cpoeUrgent"> <label
																					style="margin-top: 0px;"
																					class="TextFont Remove-Padding"> Urgent </label> <i>
																					<button id="bOTD" onclick="pharmareflect()"
																						class="btn btn-xs btn-info" type="button"
																						style="margin-left: 1%; margin-top: -12px">PharmaReflection</button>
																					<input type="button"
																					class="btn btn-xs btn-success editUserAccess"
																					onclick="saveOD('OTCATH')" value="Save"
																					style="margin-left: 1%; margin-top: -12px">
																				</i>
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
														<div id="row2" class="col-sm-12-1"
															style="margin-top: 28px">
															<div class="form-group col-md-12-1" style="margin: 2px;">
																<div class="col-md-12-1"
																	style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
																	<label onclick="editTestOD()" id="editCPOE_TestLabel"
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
																		<i class="fa fa-edit"></i> Edit
																	</label> <label id=""
																		style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;"
																		onclick="deletepharma('multiple','OTCATH')"> <i
																		class="fa fa-trash-o"></i> Multiple Delete
																	</label>
																</div>
																<div class="col-sm-12-1" style="margin-top: 0px;">



																	<table class='table table-bordered table-condensed cf'
																		style='width: 100%; margin-top: 10px;'
																		id="doctorMasterPojo">
																		<thead class='cf'>
																			<tr>
																				<th class='col-md-1-1 center'
																					style='height: 21.5px;'><div class='TextFont'>#</div></th>
																				<!-- <th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Charges ID</div></th> -->
																				<th class='col-md-1-1 center'
																					style='height: 21.5px; padding-right: 13px;'><div
																						class='TextFont'>Particulars/Details</div></th>
																				<th class='col-md-1-1 center'
																					style='height: 21.5px;'><div class='TextFont'>Date</div></th>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px; padding-right: 0px;">
																					<div class="TextFont">Status</div>
																				</th>

																				<th class="col-md-1-1 center"
																					style="height: 21.5px; padding-left: 0px;">
																					<div class="TextFont">Edit</div>
																				</th>

																				<th class='numeric col-md-1-1 center'
																					style='height: 21.5px;'><div class='TextFont'>Delete</div></th>
																			</tr>
																		</thead>
																	</table>

																</div>

																<div
																	style="width: 55%; margin-left: 3%; float: left; height: 100%;"></div>
																<div class='col-sm-12-1'
																	style='margin-top: -21px; border: 1px solid #ddd; overflow-y: scroll; height: 180px;; max-height: auto;'>
																	<table class='table table-striped table-condensed cf'>
																		<tbody id="tbOTCAH"></tbody>
																	</table>
																</div>

															</div>
														</div>
													</div>
													<!-- ot cath lab(end) -->

													<!--END OT CHARGE  -->






													<%-- <div id="CPOE" class="tab-pane fade in">
												<!-- Start Code for row1 CPOE GUI -->
												<div id="row1" class="col-md-12-1" style="padding-top: 0px;">

													<div class="tabbable tabs-left col-md-12-1"
														style="margin-top: 0px; margin-left: 5px;">
														<ul class="nav nav-tabs colorChanges" style="height: 250px;">
															<li class="active"><a href="#Pathology"
																data-toggle="tab"> Pathology </a></li>
															<!-- <li><a href="#Radiology" data-toggle="tab">
																				Investigation </a></li> -->
															<!-- <li><a href="#CasualityServices"
																			data-toggle="tab"> Casuality Services </a></li> -->
															<li><a href="#Investigation" data-toggle="tab">
																	Investigation </a></li>
															<li id="PhysiotherapyServicesList"><a
																href="#PhysiotherapyServices" data-toggle="tab">
																	Physiotherapy Services </a></li>
															<li id="OtherServicesList"><a href="#OtherServices"
																data-toggle="tab"> Other Services </a></li>
														</ul>
														<div class="tab-content col-md-10-1"
															style="margin-top: 10px;">
															<div id="Pathology"
																class="tab-pane fade in active col-md-12-1">
																<div id="row_1" class="col-sm-12-1"
																	style="margin-top: 35px;">

																	<div id="divtxtTestHeadingSearch" class="col-sm-3-1"
																		style="padding-top: 15px;">
																		<input
																			class="typeahead form-control input-SmallText col-sm-8-1"
																			type="text" placeholder="heading search"
																			id="txtTestHeadingSearch"
																			onkeyup="setPathologyAutocompleteTestIDandCharges(this.id);" />
																		<button class="btn btn-primary" type="submit"
																			style="padding: 1px; width: 22px; margin-top: -15px;">
																			<span class="fa fa-search"></span>
																		</button>
																	</div>

																	<div id="divstrValue" class="col-sm-3-1"
																		style="padding-top: 15px;">
																		<input
																			class="typeahead form-control input-SmallText col-sm-8-1"
																			type="text" id="strValue"
																			placeholder="universal search"
																			onkeyup="setPathologyAutocompleteLabTest(this.id);" />
																		<button class="btn btn-primary" type="submit"
																			onclick="searchProAndTest('assign')"
																			style="padding: 1px; width: 22px; margin-top: -15px;">
																			<span class="fa fa-search"></span>
																		</button>
																	</div>

																	<div class="col-sm-6-1">
																		<div class="col-sm-3-1" style="padding-top: 15px;">
																			<label class="TextFont" for="exampleInputEmail1">Select
																				Reference</label>
																		</div>

																		<div class="col-sm-3-1">
																			<div class="form-group Remove-Padding col-sm-12-1">
																				<label class="TextFont" for="exampleInputEmail1">Doctor</label>
																				<select id="doctor" name="doctor"
																					class="form-control input-SmallText"></select>
																			</div>
																		</div>
																		<div class="col-sm-4-1">
																			<div class="form-group Remove-Padding col-sm-12-1">
																				<label class="TextFont" for="exampleInputEmail1">Hospital</label>
																				<select id="hospital" name="hospital"
																					class="form-control input-SmallText">
																					<!-- <option>1</option>
																					<option>1</option> -->
																				</select>
																			</div>
																		</div>
																		<div id="col11">
																			<i><input type="button"
																				class="btn btn-xs btn-success"
																				onclick="saveAssignedTests('opdTestAssign','OT')"
																				value="Save" /> </i>
																		</div>
																	</div>

																</div>
																<div id="row_2" class="col-sm-12-1"
																	style="margin-top: 30px;">
																	<div id="flip-scroll" class="col-md-3-1"
																		style="overflow-y: scroll; height: 170px; max-height: auto; margin-top: -20px; border: 1px solid grey;">
																		<table class="table table-condensed">
																			<tr style="padding-top: 5px;">
																				<td class="col-md-1-1"></td>
																				<td class="col-md-10-1 pull-left">Heading Name</td>
																			</tr>
																			<tbody id="HeadingDiv">
																			</tbody>
																		</table>
																	</div>
																	<div id="flip-scroll" class="col-md-4-1"
																		style="overflow-y: auto; height: 170px; max-height: auto; margin-top: -20px; margin-left: 15px; border: 1px solid grey;">
																		<table class="table table-condensed">
																			<tbody id="testDiv">
																			</tbody>
																		</table>
																	</div>
																	<div id="flip-scroll" class="col-md-5-1"
																		style="overflow-y: scroll; height: 170px; max-height: auto; margin-top: -20px; margin-left: 15px; border: 1px solid grey;">
																		<table class="table table-condensed">
																			<tbody id="assignTestDiv"></tbody>
																		</table>
																	</div>
																	<div id="" style='padding-top: 15px;'
																		class="col-sm-12-1">
																		<div>
																			<label style="font-weight: bold;">Amount
																				Collected By:</label> ${sessionScope.userName}
																		</div>
																		<div style="padding-top: 15px; font-weight: bold;"
																			class="col-sm-4-1">
																			<div class="col-sm-4-1">Total Amount:</div>
																			<div class="col-sm-1-1" id="divtotalAmt">0</div>
																		</div>
																	</div>
																</div>

																<input type="hidden" id="pathologyqueryType"
																	value="insert"></input> <input type="hidden"
																	id="headingId" value="0"></input>

															</div>

															<!-- Start id=""OtherServices"" -->
															<div id="OtherServices"
																class="col-md-12-1 tab-pane fade in">
																<!-- Start Row:1 of CasualityServices-->
																<div id="OtherServices_row_1" class="col-sm-12-1"
																	style="margin-top: 40px;">
																	<div class="col-sm-5-1">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<label class="TextFont"> Test Name </label>
																			<div id="divtxtOtherTestName">
																				<input type="text" placeholder="Universal search"
																					id="txtOtherTestName"
																					class="typeahead form-control"
																					style="border: 1px solid orange;"
																					onkeyup="setIPD_Discharge_DentalAutocomplete(this.id,'opd')" />
																			</div>

																		</div>
																		<input type="hidden" id="patAmtOther" value="0" /> <input
																			type="hidden" id="othertestId" value="0" />
																	</div>
																	<div class="col-sm-6-1" style="margin-left: 75px;">
																		<div class="col-sm-3-1" style="padding-top: 15px;">
																			<label class="TextFont">Select Reference</label>
																		</div>
																		<div class="col-sm-4-1">
																			<div class="form-group Remove-Padding col-sm-12-1">
																				<label class="TextFont">Doctor</label> <select
																					id="doctorForOther"
																					class="form-control input-SmallText">
																				</select>
																			</div>
																		</div>
																		<div class="col-sm-4-1">
																			<div class="form-group Remove-Padding col-sm-12-1">
																				<label class="TextFont">Hospital</label> <select
																					id="hospitalForOther"
																					class="form-control input-SmallText">
																				</select>
																			</div>
																		</div>
																	</div>
																</div>
																<!-- End Row:1 of OtherServices-->
																<!-- Start Row:2 of OtherServices-->
																<div id="OtherServices_row2" class="col-sm-12-1"
																	style="margin-top: 10px;">
																	<div id="col3" class="col-sm-2-1"
																		style="margin-top: 10px;">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																			<label class="TextFont"> Test Code </label> <input
																				type="text" placeholder="Test Code"
																				id="otherTest_Code"
																				class="form-control input-SmallText"
																				readonly="readonly" />
																		</div>
																	</div>
																	<div id="col9" class="col-sm-2-1"
																		style="margin-top: 10px;">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																			<label class="TextFont"> Instructions </label> <input
																				type="text" placeholder="Instructions"
																				class="form-control input-SmallText"
																				id="otherInstruction" />
																		</div>
																	</div>
																	<div id="col10" class="col-sm-2-1"
																		style="margin-top: 10px;">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																			<label class="TextFont"> Clinical Notes </label><input
																				type="text" placeholder="Clinical Notes"
																				class="form-control input-SmallText"
																				id="otherClinicalNote" />
																		</div>
																	</div>
																	<div id="col11" class="col-sm-0-1"
																		style="margin-top: 30px;">

																		<i><input type="button"
																			class="btn btn-xs btn-success"
																			onclick="saveOtherServicesAssignedTests('DoctorStation')"
																			value="Save" /> </i>
																	</div>

																</div>
																<!-- End Row:2 of OtherServices -->
																<!-- Start Row:3 of OtherServices-->
																<div id="OtherServices_row3" class="col-sm-12-1">
																	<div class="col-sm-1-1" style="margin-top: 10px;">
																		<div class="form-group Remove-Padding">
																			<div class="divide-10"></div>
																			<input type="checkbox" class="form-control"
																				id="otherUrgent" />
																		</div>
																	</div>
																	<div class="col-sm-1-1" style="margin-top: 20px;">
																		<div class="form-group Remove-Padding">
																			<div class="divide-10"></div>
																			<label class="TextFont"> Urgent </label>
																		</div>
																	</div>
																	<input type="hidden" id="otherServiceQueryType"
																		value="insert" /> <input id="billSlaveID"
																		type="hidden" value="0"> <input
																		id="idOtherTreatment" type="hidden" value="0">
																</div>
																<!-- Start Row:3 of OtherServices-->
															</div>
															<!-- End id=""OtherServices"" -->

															<!-- Start id=""PhysiotherapyServices"" -->
															<div id="PhysiotherapyServices"
																class="col-md-12-1 tab-pane fade in">
																<!-- Start Row:1 of PhysiotherapyServices-->
																<div id="PhysiotherapyServices_row_1"
																	class="col-sm-12-1" style="margin-top: 40px;">
																	<div class="col-sm-5-1">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<label class="TextFont"> Test Name </label>
																			<div id="divtxtPhysiotherapyTestName">
																				<input type="text" placeholder="Universal search"
																					id="txtPhysiotherapyTestName"
																					class="typeahead form-control"
																					style="border: 1px solid orange;"
																					onkeyup="setPhysiotherapyTestAutocompleteTestID(this.id)" />
																			</div>

																		</div>
																		<input type="hidden" id="patAmtphysio" value="0" /> <input
																			type="hidden" id="physiotherapytestId" value="0" />
																	</div>
																	<div class="col-sm-6-1" style="margin-left: 75px;">
																		<div class="col-sm-3-1" style="padding-top: 15px;">
																			<label class="TextFont">Select Reference</label>
																		</div>
																		<div class="col-sm-4-1">
																			<div class="form-group Remove-Padding col-sm-12-1">
																				<label class="TextFont">Doctor</label> <select
																					id="doctorForPhysiotherapy"
																					class="form-control input-SmallText">
																				</select>
																			</div>
																		</div>
																		<div class="col-sm-4-1">
																			<div class="form-group Remove-Padding col-sm-12-1">
																				<label class="TextFont">Hospital</label> <select
																					id="hospitalForPhysiotherapy"
																					class="form-control input-SmallText">
																				</select>
																			</div>
																		</div>
																	</div>
																</div>
																<!-- End Row:1 of PhysiotherapyServices-->
																<!-- Start Row:2 of PhysiotherapyServices-->
																<div id="PhysiotherapyServices_row2" class="col-sm-12-1"
																	style="margin-top: 10px;">
																	<div id="col3" class="col-sm-2-1"
																		style="margin-top: 10px;">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																			<label class="TextFont"> Test Code </label> <input
																				type="text" placeholder="Test Code"
																				id="physiotherapyTest_Code"
																				class="form-control input-SmallText"
																				readonly="readonly" value="0" />
																		</div>
																	</div>
																	<div id="col9" class="col-sm-2-1"
																		style="margin-top: 10px;">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																			<label class="TextFont"> Instructions </label> <input
																				type="text" placeholder="Instructions"
																				class="form-control input-SmallText"
																				id="physiotherapyInstruction" />
																		</div>
																	</div>
																	<div id="col10" class="col-sm-2-1"
																		style="margin-top: 10px;">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																			<label class="TextFont"> Clinical Notes </label><input
																				type="text" placeholder="Clinical Notes"
																				class="form-control input-SmallText"
																				id="physiotherapyClinicalNote" />
																		</div>
																	</div>
																	<div id="col11" class="col-sm-0-1"
																		style="margin-top: 30px;">

																		<i><input type="button"
																			class="btn btn-xs btn-success"
																			onclick="savePhysiotherapyAssignedTests('DoctorStation')"
																			value="Save" /> </i>
																	</div>

																</div>
																<!-- End Row:2 of PhysiotherapyServices -->
																<!-- Start Row:3 of PhysiotherapyServices-->
																<div id="PhysiotherapyServices_row3" class="col-sm-12-1">
																	<div class="col-sm-1-1" style="margin-top: 10px;">
																		<div class="form-group Remove-Padding">
																			<div class="divide-10"></div>
																			<input type="checkbox" class="form-control"
																				id="physiotherapyUrgent" />
																		</div>
																	</div>
																	<div class="col-sm-1-1" style="margin-top: 20px;">
																		<div class="form-group Remove-Padding">
																			<div class="divide-10"></div>
																			<label class="TextFont"> Urgent </label>
																		</div>
																	</div>
																	<input type="hidden" id="physiotherapyQueryType"
																		value="insert" /> <input id="billSlaveID"
																		type="hidden" value="0"> <input
																		id="idPhysiotherapyTreatment" type="hidden" value="0">
																</div>
																<!-- Start Row:3 of PhysiotherapyServices-->
															</div>

															<!-- Start id="Investigation" -->
															<div id="Investigation" class="tab-pane fade col-md-12-1">
																<!-- Start Row:1 of Investigation-->
																<div id="Investigation_row_1" class="col-sm-12-1"
																	style="margin-top: 40px;">
																	<div class="col-sm-5-1">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<label class="TextFont" for="exampleInputEmail1">
																				Test Name </label>
																			<div id="divInvestigationTestName">
																				<input type="text" placeholder="Test Name"
																					id="InvestigationTestName"
																					class="typeahead form-control"
																					style="border: 1px solid orange;"
																					onkeyup="setInvestigationAutocompleteTestNameIDCharges(this.id,'IPD')" />
																			</div>
																			<!-- <input type="text"
																							placeholder="Test Name"
																							id="InvestigationTestName"
																							class="form-control invTest"
																							style="border: 1px solid orange;"
																							onchange="setInvestigationTestIDandCharges()" /> -->

																			<!-- <script type="text/javascript">																													
																						 $("#InvestigationTestName").autocomplete({
																							 source : function(request, response) {
																									var auto = "DoctorDesk";
																									var data = "investigation";
																									var findingName = $("#InvestigationTestName").val();
																									var inputs = [];
																									inputs.push('auto=' + auto);
																									inputs.push('data=' + data);
																									inputs.push('q=' + findingName);
																									var str = inputs.join('&');
																									jQuery.ajax({
																										async : true,
																										type : "POST",
																										data : str + "&reqType=AJAX",
																										url : "AutoSuggetionServlet",
																										timeout : 1000 * 60 * 15,
																										cache : false,
																										error : function() {
																											alert('error');
																										},
																										success : function(r) {
																											//alert(r);
																											ajaxResponse = r;
																											var availableTags = [];
																											availableTags = ajaxResponse.split("\n");
																											   response(availableTags);
																										}
																									});
																							 }																						
																						});															
																					</script> -->

																		</div>
																		<input type="hidden" id="charges1" value="0" /> <input
																			type="hidden" id="investigationtestId" value="0" />
																		<input type="hidden" id="idTestSlave" value="0" />
																	</div>
																	<div class="col-sm-6-1" style="margin-left: 75px;">
																		<div class="col-sm-3-1" style="padding-top: 15px;">
																			<label class="TextFont" for="exampleInputEmail1">Select
																				Reference</label>
																		</div>
																		<div class="col-sm-4-1">
																			<div class="form-group Remove-Padding col-sm-12-1">
																				<label class="TextFont" for="exampleInputEmail1">Doctor</label>
																				<select id="doctor2"
																					class="form-control input-SmallText">
																				</select>
																			</div>
																		</div>
																		<div class="col-sm-4-1">
																			<div class="form-group Remove-Padding col-sm-12-1">
																				<label class="TextFont" for="exampleInputEmail1">Hospital</label>
																				<select id="hospital2"
																					class="form-control input-SmallText">
																				</select>
																			</div>
																		</div>
																	</div>
																</div>
																<!-- End Row:1 of Investigation-->

																<!-- Start Row:2 of Investigation-->
																<div id="Investigation_row2" class="col-sm-12-1"
																	style="margin-top: 10px;">
																	<div id="col3" class="col-sm-2-1"
																		style="margin-top: 10px;">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																			<label class="TextFont" for="exampleInputEmail1">
																				Test Code </label> <input type="text"
																				id="testCodeInvestigation" readonly="readonly"
																				placeholder="Test Code"
																				class="form-control input-SmallText" />
																			<!-- onblur="fetchAndSetInvestigationDetails()" -->
																		</div>
																	</div>
																	<div id="col7" class="col-sm-2-1"
																		style="margin-top: 10px;">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																			<label class="TextFont" for="exampleInputEmail1">
																				Test Type </label> <select
																				class="form-control input-SmallText"
																				id="radiologyTestType">
																				<!-- <option>1</option>
																					<option>1</option> -->
																			</select>
																		</div>
																	</div>
																	<div id="col8" class="col-sm-2-1"
																		style="margin-top: 10px;">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																			<label class="TextFont" for="exampleInputEmail1">
																				Body Part </label> <select
																				class="form-control input-SmallText"
																				id="radiologyBodyPart">
																				<!-- <option>1</option>
																					<option>1</option> -->
																			</select>
																		</div>
																	</div>
																	<div id="col9" class="col-sm-2-1"
																		style="margin-top: 10px;">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																			<label class="TextFont" for="exampleInputEmail1">
																				Instructions </label> <input type="text"
																				placeholder="Instructions"
																				class="form-control input-SmallText"
																				id="investigationInstruction" />
																		</div>
																	</div>
																	<div id="col10" class="col-sm-2-1"
																		style="margin-top: 10px;">
																		<div class="form-group Remove-Padding col-sm-12-1">
																			<div class="divide-10"></div>
																			<label class="TextFont" for="exampleInputEmail1">
																				Clinical Notes </label><input type="text"
																				placeholder="Clinical Notes"
																				class="form-control input-SmallText"
																				id="investigationClinicalNote" />
																		</div>
																	</div>
																	<div id="col11" class="col-sm-0-1"
																		style="margin-top: 30px;">
																		<i><input type="button"
																			class="btn btn-xs btn-success"
																			onclick="saveradioAssignedTests('IPDDocStation','ipd')"
																			value="Save" /> </i>
																	</div>
																</div>
																<!-- End Row:2 of Investigation -->

																<!-- Start Row:3 of Investigation-->
																<div id="Investigation_row3" class="col-sm-12-1"
																	style="margin-top: 15px;">
																	<input type="checkbox" id="InvestigationUrgent" /> <label
																		class="TextFont Remove-Padding"
																		style="margin-top: 0px;"> Urgent </label>
																</div>
																<!-- End Row:3 of Investigation-->
																<input type="hidden" id="InvestigationQueryType"
																	value="insert" /> <input type="hidden"
																	id="billSlaveID" value="0" /> <input type="hidden"
																	id="investigationSlaveID" value="0" />
															</div>


														</div>


														<!-- <script type="text/javascript">
																	$(".invTest").autocomplete("AutoSuggetionServlet?auto=ipdBill&data=investigation&corporateId=0");</script>
																	End id="Investigation" -->



														<!-- Start id=""CasualityServices"" -->
														<!-- 										<div id="CasualityServices"
																			class="tab-pane fade col-md-12-1">

																			Start Row:1 of CasualityServices
																			<div id="CasualityServices_row_1" class="col-sm-12-1"
																				style="margin-top: 40px;">
																				<div class="col-sm-5-1">
																					<div
																						class="form-group Remove-Padding col-sm-12-1">
																						<label class="TextFont" for="exampleInputEmail1">
																							Test Name </label> <input type="text"
																							placeholder="Universal search"
																							id="txtCasualityTestName"
																							class="ui-autocomplete-input form-control invTest"
																							style="border: 1px solid orange;"
																							onchange="setCasualityTestIDandCharges()" />

																						<script type="text/javascript">																													
																							$("#txtCasualityTestName").autocomplete({
																							 source : function(request, response) {
																							 
																								 	var findingName = $("#txtCasualityTestName").val();
																									var autoType = 't';
																									var auto = 'CasualityTestName';
																									
																									var inputs = [];
																									inputs.push('auto=' + auto);
																									inputs.push('q=' + findingName);
																									inputs.push('autoType=' + autoType);
																									var str = inputs.join('&');
						
																									jQuery.ajax({
																										async : true,
																										type : "POST",
																										data : str + "&reqType=AJAX",
																										url : "AutoSuggetionServlet",
																										timeout : 1000 * 60 * 15,
																										cache : false,
																										error : function() {
																											alert('error');
																										},
																										success : function(r) {
																											ajaxResponse = r;
																											var availableTags = [];
																											availableTags = ajaxResponse.split("\n");
																											   response(availableTags);
																										}
																									});
																							 }																						
																						});																
																					</script>


																					</div>
																					<input type="hidden" id="patAmt" value="0" />
																					<input type="hidden" id="casualitytestId" value="0" />
																					<input type="hidden" id="idTestSlave" value="0" />
																					
																				</div>
																				<div class="col-sm-6-1" style="margin-left: 75px;">
																					<div class="col-sm-3-1" style="padding-top: 15px;">
																						<label class="TextFont" for="exampleInputEmail1">Select
																							Reference</label>
																					</div>
																					<div class="col-sm-4-1">
																						<div class="form-group Remove-Padding col-sm-12-1">
																							<label class="TextFont" for="exampleInputEmail1">Doctor</label>
																							<select id="doctor3" 
																								class="form-control input-SmallText">
																								<option>1</option>
																					<option>1</option>
																							</select>
																						</div>
																					</div>
																					<div class="col-sm-4-1">
																						<div class="form-group Remove-Padding col-sm-12-1">
																							<label class="TextFont" for="exampleInputEmail1">Hospital</label>
																							<select id="hospital3"
																								class="form-control input-SmallText">
																								<option>1</option>
																					<option>1</option>
																							</select>
																						</div>
																					</div>
																				</div>
																			</div>
																			End Row:1 of CasualityServices

																			Start Row:2 of CasualityServices
																			<div id="CasualityServices_row2" class="col-sm-12-1"
																				style="margin-top: 10px;">
																				<div id="col3" class="col-sm-2-1"
																					style="margin-top: 10px;">
																					<div class="form-group Remove-Padding col-sm-12-1">
																						<div class="divide-10"></div>
																						<label class="TextFont" for="exampleInputEmail1">
																								Test Code </label> <input type="text"
																								placeholder="Test Code" id="casualityTest_Code"
																								class="form-control input-SmallText" 
																								onchange="setCasualityTestNameandId()" />
																					</div>
																				</div>
																				<div id="col9" class="col-sm-2-1"
																					style="margin-top: 10px;">
																					<div class="form-group Remove-Padding col-sm-12-1">
																						<div class="divide-10"></div>
																						<label class="TextFont" for="exampleInputEmail1">
																							Instructions </label> <input type="text"
																							placeholder="Instructions"
																							class="form-control input-SmallText"
																							id="casualityInstruction" />
																					</div>
																				</div>
																				<div id="col10" class="col-sm-2-1"
																					style="margin-top: 10px;">
																					<div class="form-group Remove-Padding col-sm-12-1">
																						<div class="divide-10"></div>
																						<label class="TextFont" for="exampleInputEmail1">
																							Clinical Notes </label><input type="text"
																							placeholder="Clinical Notes"
																							class="form-control input-SmallText"
																							id="casualityClinicalNote" />
																					</div>
																				</div>
																				<div id="col11" class="col-sm-0-1"
																					style="margin-top: 30px;">

																					<i><input type="button"
																						onclick="savecasualityAssignedTests('IPD')"
																						value="Save" /> </i>
																				</div>
																				
																			</div>
																			End Row:2 of CasualityServices


																			Start Row:3 of CasualityServices
																			<div id="CasualityServices_row3" class="col-sm-12-1">
																				<div class="col-sm-1-1" style="margin-top: 10px;">
																					<div class="form-group Remove-Padding">
																						<div class="divide-10"></div>
																						<input type="checkbox" class="form-control"
																							id="CasualityUrgent" />
																					</div>
																				</div>
																				<div class="col-sm-1-1" style="margin-top: 20px;">
																					<div class="form-group Remove-Padding">
																						<div class="divide-10"></div>
																						<label class="TextFont" for="exampleInputEmail1">
																							Urgent </label>
																					</div>
																				</div>
																				<input type="hidden" id="casualityServiceQueryType" value="insert" />

																				</div>
																			Start Row:3 of CasualityServices
																		</div> -->
														<!-- End id=""CasualityServices"" -->


													</div>
													<!-- End Tab Content -->
												</div>
												<!-- End Code for row1 CPOE GUI -->

												<!-- Start Code for row2 CPOE GUI -->
												<div id="row2" class="col-sm-12-1" style="margin: 0px">
													<div class="form-group col-md-12-1" style="margin: 2px;">
														<!-- Start Header for Edit Delete Option -->
														<div class="col-md-12-1"
															style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
															<label onclick="editCPOE_Test()"
																style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
																<i class="fa fa-edit"></i> Edit
															</label> <label onclick="deleteCPOE_Test()"
																style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
																<i class="fa fa-trash-o"></i> Delete
															</label>
														</div>
														<!-- End Header for Edit Delete Option -->

														<div class="col-sm-12-1" style="margin-top: 0px;">
															<table class="table table-condensed ">
																<thead>
																	<tr>
																		<th class="col-md-1-1 center" style="height: 21.5px;"><div
																				class="TextFont">#</div></th>
																		<th class="col-md-2-1 center"
																			style="height: 21.5px; padding-left: 5px;"><div
																				class="TextFont">Particulars/Details</div></th>
																		<th class="col-md-1-1 center"
																			style="height: 21.5px; padding-left: 0px;"><div
																				class="TextFont">Date</div></th>
																		<th class="col-md-2-1 center"
																			style="height: 21.5px; padding-left: 0px;"><div
																				class="TextFont">Consultant Name</div></th>
																		<th class="col-md-3-1 center"
																			style="height: 21.5px; padding-right: 23px;"><div
																				class="TextFont">Type</div></th>
																		<th class="col-md-1-1 center"
																			style="height: 21.5px; padding-right: 31px;"><div
																				class="TextFont">Test</div></th>
																		<th class="col-md-1-1 center"
																			style="height: 21.5px; padding-right: 29px;"><div
																				class="TextFont">Status</div></th>
																		<th class="col-md-1-1 center"
																			style="height: 21.5px; padding-left: 0px;"><div
																				class="TextFont">Action</div></th>
																	</tr>
																</thead>
															</table>
															<div id="flip-scroll" class="col-sm-12-1"
																style="overflow-y: scroll; height: 115px; maxheight: auto; margin-top: -21px;">
																<table class="table table-striped table-condensed">
																	<tbody id="testDash">
																	</tbody>
																</table>
																<input type="hidden" id="CPOErowCount" value="0" />
															</div>
														</div>
													</div>
												</div>
												<!-- End Code for row2 CPOE GUI -->
											</div>
											<!-- End Code for CPOE GUI -->
 --%>

													<!-- ____________@author : Touheed @date : 26-May-2016 @reason : CPOE UI For Manage Opreation (End)_________ -->
												</div>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
						<!-- _____@author :  Touheed @date : 26-May-2016 @reason : CPOE(Start)_______ -->

						<!-- /*********************Code by Kavita Date-13/04/2016****************************/ -->
						<!-- /*********************modal for bed change and shift from billing****************************/ -->
						<div id="bedChangeShiftPopup" class="modal fade in" tabindex="-1"
							data-backdrop="static">
							<div class="modal-dialog">
								<div class="modal-content col-md-12-1"
									style="margin-top: 10px; margin-left: 50px;">
									<div class="modal-header">
										<div class="box-title">
											<h4>
												Change Bed Details
												<div class="pull-right">
													<button class="btn btn-success"
														onclick="SaveOperationDetails()">
														<i class='fa fa-save'></i>
													</button>
													<button class="btn btn-danger"
														onclick="closeBedShiftPopup();">
														<i class='fa fa-times'></i>
													</button>
												</div>
											</h4>

										</div>
									</div>
									<div class="modal-body">

										<div class="" id=""
											style="height: 280px; max-height: auto; margin-top: 0%; border: 1px solid #ddd;">

											<div id="" class="form-group col-md-12-1"
												style="float: right; margin-top: 1%; margin-bottom: 0%;">
												<!--Panel Body-->
												<div class="form-group col-md-3-1"
													style="margin: 0px; text-align: center;">
													<label class="checkbox-inline input-SmallText"
														style="padding-left: 20px;"> <input
														onclick="getallHallType('ipd_billing'),getBedAva('allBed')"
														name="bedEditType" type="radio" id="radBillableBed1"
														value="BedChange"> Bed Change
													</label>
												</div>
												<div class="form-group col-md-3-1"
													style="margin: 0px; text-align: center;">
													<label class="checkbox-inline input-SmallText"
														style="padding-left: 20px;"> <input
														onclick="getallHallType('ipd_billing'),getBedAva('allBed')"
														name="bedEditType" type="radio" id="radBillableBed2"
														value="BedShift"> Bed Shift
													</label>
												</div>

												<div class="form-group col-md-3-1"
													style="margin: 0px; text-align: center;">
													<label class="checkbox-inline input-SmallText"
														style="padding-left: 20px;"> <input
														onclick="setBillableBed()" name="radBillableBed"
														type="checkbox" id="radBillableBed3" value="differentBed">
														<label style="margin-top: 13px; margin-left: 5px;">Select
															Billable Bed Type</label>
													</label> </label>
												</div>

												<div class="form-group col-md-3-1"
													style="margin: 0px; text-align: center;">
													<label class="checkbox-inline input-SmallText"
														style="padding-left: 20px;"> <input
														name="isolation" type="checkbox" id="isolation"
														value="isolation"> <label
														style="margin-top: 13px; margin-left: 5px;">Isolation</label>
													</label>
												</div>
											</div>

											<div id="" class="form-group col-md-12-1"
												style="float: right; margin-top: 3%; margin-bottom: 0%;">
												<div class="col-md-12-1"
													style="margin-left: 0%; margin-top: 10px;">

													<div class="col-md-4-1"
														style="padding-top: 9px; padding-left: 2%">
														<div class="form-group col-md-3-1">
															<label class='TextFont'>Ward</label>
														</div>
														<div id="" class="form-group col-md-9-1"
															style="padding: 0px 5px;">
															<select id='wardType'
																class='form-control input-SmallText'
																onchange="setHallTypeSelectID(this.value, 'samebed')"></select>
														</div>
													</div>
													<div class="col-md-4-1" style="padding-top: 9px;">
														<div class="form-group col-md-3-1">
															<label class='TextFont'>Hall</label>
														</div>
														<div class="form-group col-md-9-1">
															<select id="hallType"
																class="form-control input-SmallText"
																onchange="setAvailableBeds(this.value, 'sameBed')">
															</select>
														</div>
													</div>

													<div class="col-md-4-1" style="padding-top: 9px;">
														<div class="form-group col-md-3-1">
															<label class='TextFont'>Bed</label>
														</div>
														<div class="form-group col-md-9-1">
															<select id="bedName" class="form-control input-SmallText">
															</select>
														</div>
													</div>
												</div>
											</div>

											<div id="divWardType" class="form-group col-md-12-1"
												style="float: right; margin-top: 3%; margin-bottom: 0%; display: none;">
												<div class="col-md-12-1"
													style="margin-left: 0%; margin-top: 10px;">

													<div class="col-md-4-1"
														style="padding-top: 9px; padding-left: 2%">
														<div class="form-group col-md-3-1">
															<label class='TextFont'>Ward</label>
														</div>
														<div id="" class="form-group col-md-9-1"
															style="padding: 0px 5px;">
															<select id='billableWardType'
																class='form-control input-SmallText'
																onchange="setHallTypeSelectID(this.value, 'bllableBed')"></select>
														</div>
													</div>
													<div class="col-md-4-1" style="padding-top: 9px;">
														<div class="form-group col-md-3-1">
															<label class='TextFont'>Hall</label>
														</div>
														<div class="form-group col-md-9-1">
															<select id="billableHallType"
																class="form-control input-SmallText"
																onchange="setAvailableBeds(this.value, 'billable')">
															</select>
														</div>
													</div>

												</div>
											</div>

										</div>

										<div class="modal-footer">
											<div class="form-group col-md-12-1 center"></div>
											<div id="allBedObj" style="display: none"></div>
										</div>

									</div>
								</div>
							</div>
						</div>

						<!-- 	/********end modal for Previous Pending Amount div*******/ -->
						
						<!-- Start Add sample wsie barcode pop-up -->
		<div id="sampleWiseBarcode" class="modal fade in" tabindex="-1" data-keyboard="false" data-backdrop="static">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">
							Sample Wise Services
							<div class="pull-right" style="margin-right: 15px;">
								<button data-dismiss="modal" class="btn btn-primary btn-danger"
									onclick="closeAndResetBarcodePopup();" type="button">Close</button>
							</div>
							<div class="pull-right" style="margin-right: 15px;">
								<button class="btn btn-primary btn-success" onclick="saveSampleWiseBarcodes();"
									type="button">Save</button>
							</div>
						</h4>
					</div>
					<div class="modal-body">
						<div style="overflow: auto;">
							<table id="sampleWiseBarcodeTable"
								class="table table-bordered table-hover table-striped table-responsive">
								<thead>
									<tr>
										<th>Sr.No</th>
										<th>Sample Type</th>
										<th>Tests</th>
										<th>Barcode</th>
									</tr>
								</thead>
								<tbody id="sampleWiseBarcodeTableBody">
								</tbody>
							</table>
						</div>
					</div>
	
					<!-- /BODY-->
					<div class="modal-footer"></div>
				</div>
			</div>
		</div>

						<!--added by paras for geting usertype  -->
						<div style="display: none;" id="otproc"></div>
						<input type='hidden' value='0' id='totalchargesph' /> <input
							type='hidden' value='0' id='totalchargesinv' /> <input
							type='hidden' value='0' id='totalchargescath' /> <input
							type='hidden' value='0' id='countshedule' />
						<!-- <input type='hidden' value='0' id='idotherbill'/> -->
						<input type='hidden' value='N' id='inserv' /> <input type="hidden"
							id="updateop" value="insert" /> <input type="hidden"
							id="deleteop" value="delete" /> <input type="hidden"
							value="<%=session.getAttribute("userType")%>" id="userType" /> <input
							type="hidden" value="<%=session.getAttribute("uId")%>"
							id="unitid" /> <input id="treatmentId" type="hidden"
							value="<%=request.getParameter("treatmentId")%>"
							style="display: none;" /> <input type="hidden"
							id="InvestigationQueryType" value="insert" /> <input
							id="CPOE_TestDetails" style="display: none;" /> <input
							type="hidden" id="CPOE_testId" value="" style="display: none;" />
						<!-- _____@author :  Touheed @date : 26-May-2016 @reason : CPOE (End)_______ -->

						<input type="hidden" id="Type" /> <input type="hidden"
							id="treatmentoperationid" name="treatmentoperationid"
							value="<%=request.getParameter("topId")%>" /> <input
							type="hidden" id="otID" name="otID" />

						<%@include file="Footer.jsp"%></div>
					<div id="divPatId" style="display: none;"><%=request.getParameter("myObj")%></div>
					<input type="hidden" id="docIds" value="" /> <input type="hidden"
						id="editOP" value="<%=request.getParameter("editOP")%>" /> <input
						type="hidden" id="anesthesisIds" value="" /> <input type='hidden'
						id='typeOfOperation' value='<%=request.getParameter("type")%>' />
					<input type='hidden' id='tempQnt' value='0' /> <input
						type='hidden' id='tempId' value='0' /> <input type='hidden'
						id='topId' value='<%=request.getParameter("topId")%>' /> <input
						type='hidden' id='tomId'
						value='<%=request.getParameter("tomId")%>' /> <input
						type='hidden' id='pid' value='<%=request.getParameter("pid")%>' />
					<input type='hidden' id='operationDate'
						value='<%=request.getParameter("operationDate")%>' />
					<div id="teamList" style="display: none;"></div>
					<input type="hidden" id="userDocId" value="0" /> <input
						type="hidden" id="teamMemberCount" value="0" /> <input
						type="hidden" id="trid" value='<%=request.getParameter("treatmentId")%>' /> <input type="hidden"
						id="pageName" value="operation" /> <input type='hidden'
						value='insert' id='idOTNote' /> <input type='hidden'
						value='insert' id='queryTypeOS' /> <input type='hidden'
						value='insert' id='queryTypeOD' /> <input type='hidden'
						value='insert' id='queryTypeOI' /> <input type='hidden'
						value='insert' id='queryTypeOTC' /> <input type='hidden'
						value='insert' id='chargesfromConf' />

					<!-- FORSURGANCHARGES -->
					<input type="hidden" id="PreAnethesiaCHARGE" value="0" /> <input
						type='hidden' value='0' id='anetheisacharge' /> <input
						type='hidden' value='0' id='assisuragncharge' /> <input
						type='hidden' value='0' id='mainsurgancharg' /> <input
						type='hidden' value='0' id='OTRentcharg' /> <input type='hidden'
						value='0' id='OTinstrumentcharge' />

					<!--end FORSURGANCHARGES -->
					<!-- FORSURGANCHARGES billdeatilsid-->
					<input type='hidden' value='0' id='billidanetheisa' /> <input
						type='hidden' value='0' id='billidassisuragnc' /> <input
						type='hidden' value='0' id='billidmainsurgan' /> <input
						type='hidden' value='0' id='billidOTRent' /> <input type='hidden'
						value='0' id='billidPreAnethesia' /> <input type='hidden'
						value='0' id='billidOTinstrument' />

					<!--end FORSURGANCHARGES billdeatilsid-->
					<!-- FORSURGANCHARGES serviesid-->
					<input type='hidden'
						value="<%=resourceBundleEhat1.getObject("MainSurgan").toString()%>"
						id='MainSurgan' /> <input type='hidden'
						value="<%=resourceBundleEhat1.getObject("AsistanSurgan").toString()%>"
						id='AsistanSurgan' /> <input type='hidden'
						value="<%=resourceBundleEhat1.getObject("AnethesiaNormal").toString()%>"
						id='Anethesia' /> <input type='hidden'
						value="<%=resourceBundleEhat1.getObject("AnethesiaASAIV").toString()%>"
						id='AnethesiaAIV' /> <input type='hidden'
						value="<%=resourceBundleEhat1.getObject("AnethesiaStandBy").toString()%>"
						id='AnethesiaSATNDBY' /> <input type='hidden'
						value="<%=resourceBundleEhat1.getObject("PreAnethesia").toString()%>"
						id='PreAnethesia' /> <input type='hidden'
						value="<%=resourceBundleEhat1.getObject("OTRent").toString()%>"
						id='OTRent' /> <input type='hidden'
						value="<%=resourceBundleEhat1.getObject("INSTRUMENTCHARGES").toString()%>"
						id='OTinstrument' />

					<!-- FORSURGANCHARGES serviesid  END-->
					<div id="divotpercentage" style="display: none;"></div>
					<div id="divotpercentageservices" style="display: none;"></div>

					<!-- <input type='hidden' value='0' id='subIDs'/> operation.jsp-->
					<div id="subIDs" style="display: none;"></div>
					<div id="customizeTemplateDiv" style="display: none;"></div>
					<input type='hidden' value='0' id='pharmaRatecath' /> <input
						type='hidden' value='0' id='callfrom' />
			<!-- For OT services Start -->	
			<input type="hidden" id="inOutHouseCount" value="0">
			<input type="hidden" id="histopathLab" value="N">
			<input type="hidden" value="N" id="templateWiseTestFlag" />
			<input type="hidden" value="<%=todays_date2%>" id="collectionDate" />
			<input type="hidden" value="<%=todays_time%>" id="collectionTime" />
			<input type="hidden" value="0" id="sampleType" />
			<input type="hidden" value="0" id="sampleTypeOpdSponsor" />
			<input type="hidden" id="sponsorTestCharges" value="0">
			<input type="hidden" id="yearWiseSponsorTestCharges" value="0">	
			 <input type="hidden" class="form-control"		id="billDetailsId" value="0" />
			 <input type="hidden" value=0 id="hallSlaveId"/>
			 <input id="iscombinationIpd" type="hidden" value="N" />
			 <input type="hidden" value="0" id="SponsorsourceTypeId" />
		<input type="hidden" value="0" id="chargesSlaveId" />
		  <input id="receiptSlaveIdIPD" type="hidden" value="0" />
		   <input id="receiptOf" type="hidden" value="general" />	
		   <input type="hidden" id="hallTypeId" value="0" />
			<input type="hidden" id="hallId" value="0" />
			<input type="hidden" id="bedId" value="0" />
			<input type="hidden" id="free_id" value="0" />
			<!--For OT services End  -->		
			
			<div id="previousOtNotes"></div>			
						
		</c:if>
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
	</section>
</body>
<!-- =-=-=-=-Touheed multiselect plugin=-=-=-=-=- -->
<!-- =-=-=-=-=-=Multiselect=-=-=-=-=-=-=-=- -->
<!-- JAVASCRIPTS -->
<!-- Placed at the end of the document so the pages load faster -->

<!-- DATE RANGE PICKER -->
<script src="ehat-design/js/bootstrap-daterangepicker/moment.min.js"></script>

<script src="ehat-design/datepicker/bootstrap-datepicker.js"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
<!-- SELECT2 -->
<script type="text/javascript"
	src="ehat-design/js/select2/select2.min.js"></script>
<!-- UNIFORM -->
<script type="text/javascript"
	src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
<!-- WIZARD -->
<script
	src="ehat-design/js/bootstrap-wizard/jquery.bootstrap.wizard.min.js"></script>
<!-- WIZARD -->
<script src="ehat-design/js/jquery-validate/jquery.validate.min.js"></script>
<script src="ehat-design/js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<!-- BOOTBOX -->
<script type="text/javascript"
	src="ehat-design/js/bootbox/bootbox.min.js"></script>
<!-- COOKIE -->
<script type="text/javascript"
	src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
<!-- CUSTOM SCRIPT -->
<script src="ehat-design/js/script.js"></script>
<script src="ehat-design/js/bootstrap-wizard/form-wizard.min.js"></script>
<!-- -=-=-=-=-=-=-=-=-=-=-=-=Multi select-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- -->
<!-- -=-=-=-=-=Touheed Multiselect plugin-=-=-=-=-= -->
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
	
	$(document).ready(function() {
		App.setPage("wizards_validations"); // Set current page
		App.init(); // Initialise plugins and elements
		FormWizard.init();

		$("#doctorNameOT").select2();
	});
	// multiselect ui
</script>
</html>