<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>IPD Discharge Process</title>

<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />


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

<!-- for Developers  -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<!-- <script type="text/javascript" src="js/patient.js"></script> -->
<script type="text/javascript" src="js/ipdTreatment.js"></script>
<script type="text/javascript" src="js/process_master.js"></script>
<script type="text/javascript" src="js/IPD_Discharge.js"></script>

<!-- /for Developers  -->

<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<!--TIMEPEACKER -->
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>
<style type="text/css">
.custom-date-style {
	background-color: red !important;
}
</style>
<script>
	jQuery(document).ready(function() {
		App.setPage("ipdDischarge_Process"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		})
	});
</script>

<script>
	$('#discharge_Time').datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});
</script>


<script type="text/javascript">
	onload = function() {
		
		<%ResourceBundle resourceBundleEhat2 = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");%>
		
		getPatientDataByTreatmentId(<%=request.getParameter("treatmentId")%>); //Added by sagar		
		
		getConsultantDrName(<%=request.getParameter("treatmentId")%>);
		
		processTemplateIPD();
		$('#TDLTime').datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 15
		});

		var type = $("#callfromipd").val();
		if (type == "PDP") {
			$("#bed").hide();

		}
		$("#disprocess").addClass("anchorActive");

		//fetchHospitalDetailsPrint();
		//fetchDischargeProcess();
		
		fetchIPDDischargeProcess();

		setTimeout(function() {
			setDischargeDetails();
			setval();
		}, 500);

		for ( var timeLoop = 1; timeLoop <= 9; timeLoop++) {
			$('#txtstartTime' + timeLoop).datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 15
			});
		}

		setTimeout(function() {
			var callFor = ($("#callFor").val()).trim();
			if (callFor === "previousTreatmentIPD") {
				$("#ipdDischargeProcessJSPHeadDiv *").prop("disabled", true);
				$("#savedDischargeProcessSaveButton").prop("disabled", true);
			}
		}, 1500);
//		getDoctornameForCommonTemp(); //Added by sagar

	};
</script>
</head>
<body>

	<c:if test="${ sessionScope.userType != null  }">
		<input type="hidden" id="tid"
			value="<%=request.getParameter("treatmentId")%>" />

		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

			<%@include file="left_menu_IPD.jsp"%>
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
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">

										<ul class="breadcrumb col-md-12-1"
											style="padding: 4px 10px; margin-top: 1px;">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="IPD_Dashboard.jsp">IPD</a></li>
											<li>IPD Discharge Process</li>
											<div class="pull-right">
												<input type="button" id="savedDischargeProcessSaveButton"
													class="btn btn-xs btn-success editUserAccess"
													value="Save Report" onclick="savedIPDDischargeProcess();"
													disabled="disabled">
												<!-- <button class="btn btn-xs btn-warning">Print</button> -->
												<button class="btn btn-xs btn-danger" data-toggle="tooltip"
													data-placement="left" title="Discard "
													onclick="refreshTrue();">
													<i class="fa fa-refresh"></i>
												</button>
											</div>
										</ul>

									</div>
								</div>
							</div>
							<!-- /Common -->

							<div id="commonPatInfo" style="width: 100%;">
								<form class="col-md-12-1">

									<!-- <div
										class='well Remove-Bottom-Margin Remove-Padding col-md-12-1'
										style='padding: 0px 0px;'>
										<div class='col-md-12-1' id="hospitaldetails"
											style='padding-top: 10px; padding-left: 10px;'>
											<div class='col-md-3-1' style="margin-top: 6px;">
												<div
													style="width: 60%; padding-left: 0px; padding-top: 0px;">
													<img src="" id="hospitalLogo" width="60%;" height="100%;" />
												</div>
											</div>
											<div class='col-md-9-1' style="margin-top: 25px;">
												<div id="hospname" class='col-md-11-1'
													style="float: left; text-align: center; font-weight: bold; font-size: medium; margin-top: 0px;"></div>
												<div id="hospAdd" class='col-md-11-1'
													style="text-align: center; float: left; margin-top: 0px;"></div>
												<div id="contact" class='col-md-11-1'
													style="text-align: center; float: left; margin-top: 0px;"></div>
												<div id="email" class='col-md-11-1'
													style="text-align: center; float: left; margin-top: 0px;"></div>
											</div>
										</div>
									</div> -->

								<!-- 	<div class="divide-20"></div>
									<div class="divide-40"></div> -->




									<div class="alert alert-block alert-info fade in"
										style="padding-top: 5%; margin-top: 2%">

										<div class="row" style="margin-top: -12px;">
											<div class="col-md-1" style="margin-top: -38px;">
												<img class="img-responsive"
													src="ehat-design/img/profile/avatar.jpg" alt="">
											</div>

											<div class="col-md-11">

												<div class="col-md-12">

													<div class="col-md-2">
														<div class="form-group">
															<input type="hidden" id="pt_Id" value="0"> <input
																type="hidden" id="tr_Id"
																value="<%=request.getParameter("treatmentId")%>">
															<input type="hidden" id="bill_Id" value="0"> <label
																class="control-label lblBold">UHID :</label> <label
																id="patientId" class="control-label"></label>
														</div>
													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Age :</label> <label
																id="age" class="control-label"></label>
														</div>
													</div>

													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">Patient Name
																:</label> <label id="patientName" class="control-label"></label>

														</div>
													</div>

													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">Ipd No :</label> <label
																id="ipdNo" class="control-label"> IPD-D</label>

														</div>
													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">BillNo: </label> <label
																id="billNo" class="control-label"></label>

														</div>
													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Gender :</label> <label
																id="sex" class="control-label">male</label>

														</div>
													</div>

													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">Corporate :</label>
															<label id="corporate" class="control-label"> </label>

														</div>
													</div>

													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">Consulting
																Dr:</label> <label id="consultingDoctorr" class="control-label">
															</label>

														</div>
													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Treatment Id
																:</label> <label id="treatmentId" class="control-label">
																<%=request.getParameter("treatmentId")%></label>

														</div>
													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Bill
																Categoty :</label> <label id="billCategoty"
																class="control-label"> </label>

														</div>
													</div>

													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">DOA:</label> <label
																id="doa" class="control-label"> DOA-D</label>

														</div>
													</div>

													<div class="col-md-4">
														<!-- <div class="form-group">
												<label class="control-label lblBold">DOD :</label> <label id="dod" class="control-label"> DOD-D</label>

											</div> -->
													</div>




												</div>
											</div>
										</div>
									</div>
								</form>
							</div>


							<div class="divide-40"></div>
							<div class="divide-40"></div>

							<form class="form-horizontal col-md-12-1"
								style="margin-top: 22px;">
								<!-- Jitendra 22 march 2019 -->
								<div id="ipdDischargeProcessJSPHeadDiv" class='col-sm-12-1'>
									<table
										class='table table-bordered table-striped table-condensed cf'>
										<thead>
											<tr>
												<th style="width:; text-align: center;">#</th>
												<th style="width:; text-align: center;">Activites</th>
												<th style="width:; text-align: center;">Time</th>
												<th style="width:; text-align: center;">Staff
													Responsible</th>
												<th style="width:; text-align: center;">Remark</th>
												<th style="width:; text-align: center;"></th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td style="width:"><label class='TextFont'>1.</label></td>
												<td style="width:"><label class='TextFont'
													id="activity1">Clearance from Consultant</label></td>
												<td style="width:; text-align: center;"><input
													type="text" class='form-control input-SmallText'
													onmouseover="click2(this)" id="txtstartTime1"
													readonly="readonly" /> <!-- <input
													type="text" class='form-control input-SmallText demo'
													onmouseover="click1()" id="txtstartTime1" /> --></td>

												<!-- 	<td
												style="width: 1%; border-right: 1.2px solid; border-bottom: 1px solid; text-align: center;"><input
												style="width: 86%;" type="text" class="demo"
												onmouseover="click1()" id="txtendTime1" /></td> -->

												<td style="width:;"><input type="text" id="staffresp1"
													class="form-control input-SmallText" /></td>
												<td style="width:;"><input type="text" id="remark1"
													class="form-control input-SmallText" /></td>
												<td style="width:;"><input type="checkbox"
													id="checkbox1" /></td>
												<div id="dischargeID1" style="display: none;">1</div>
												<div id="userID1" style="display: none;"></div>
												<div id="ID1" style="display: none;">1</div>
											</tr>
											<tr>
												<td style="width:"><label class='TextFont'>2.</label></td>
												<td style="width:;"><label class='TextFont'
													id="activity2">Clearance by Residents</label></td>
												<td style="width:; text-align: center;"><input
													type="text" class='form-control input-SmallText'
													onmouseover="click2(this)" id="txtstartTime2"
													readonly="readonly" /></td>
												<!-- 	<td
												style="width: 1%; border-right: 1.2px solid; border-bottom: 1px solid; text-align: center;"><input
												style="width: 86%;" type="text" class="demo"
												onmouseover="click1()" id="txtendTime2" /></td> -->

												<td style="width: px;"><input type="text"
													id="staffresp2" class="form-control input-SmallText" /></td>
												<td style="width: px;"><input type="text" id="remark2"
													class="form-control input-SmallText" /></td>
												<td style="width: px;"><input type="checkbox"
													id="checkbox2" /></td>
												<div id="dischargeID2" style="display: none;">2</div>
												<div id="userID2" style="display: none;"></div>
												<div id="ID2" style="display: none;">2</div>
											</tr>
											<tr>
												<td style="width:"><label class='TextFont'>3.</label></td>
												<td style="width:;"><label class='TextFont'
													id="activity3">Medicines Replaced</label></td>
												<td style="width: px; text-align: center;"><input
													type="text" class="form-control input-SmallText demo"
													onmouseover="click2(this)" id="txtstartTime3"
													readonly="readonly" /></td>
												<!-- <td
												style="width: 1%; border-right: 1.2px solid; border-bottom: 1px solid; text-align: center;"><input
												style="width: 86%;" type="text" class="demo"
												onmouseover="click1()" id="txtendTime3" /></td> -->

												<td style="width: px;"><input type="text"
													id="staffresp3" class="form-control input-SmallText" /></td>
												<td style="width: px;"><input type="text" id="remark3"
													class="form-control input-SmallText" /></td>
												<td style="width: px;"><input type="checkbox"
													id="checkbox3" /></td>
												<div id="dischargeID3" style="display: none;">3</div>
												<div id="userID3" style="display: none;"></div>
												<div id="ID3" style="display: none;">3</div>
											</tr>
											<tr>
												<td style="width:"><label class='TextFont'>4.</label></td>
												<td style="width: px;"><label class='TextFont'
													id="activity4">Discharge Summary completed</label></td>
												<td style="width: px; text-align: center;"><input
													type="text" class="form-control input-SmallText demo"
													onmouseover="click2(this)" id="txtstartTime4"
													readonly="readonly" /></td>
												<!-- <td
												style="width: 1%; border-right: 1.2px solid; border-bottom: 1px solid; text-align: center;"><input
												style="width: 86%;" type="text" class="demo"
												onmouseover="click1()" id="txtendTime4" /></td>
 -->
												<td style="width: px;"><input type="text"
													id="staffresp4" class="form-control input-SmallText" /></td>
												<td style="width: px;"><input type="text" id="remark4"
													class="form-control input-SmallText" /></td>
												<td style="width: px;"><input type="checkbox"
													id="checkbox4" /></td>
												<div id="dischargeID4" style="display: none;">4</div>
												<div id="userID4" style="display: none;"></div>
												<div id="ID4" style="display: none;">4</div>
											</tr>
											<tr>
												<td style="width:"><label class='TextFont'>5.</label></td>
												<td style="width: px;"><label class='TextFont'
													id="activity5">File sent for billing</label></td>
												<td style="width: px; text-align: center;"><input
													type="text" class="form-control input-SmallText demo"
													onmouseover="click2(this)" id="txtstartTime5"
													readonly="readonly" /></td>
												<!-- <td
												style="width: 1%; border-right: 1.2px solid; border-bottom: 1px solid; text-align: center;"><input
												style="width: 86%;" type="text" class="demo"
												onmouseover="click1()" id="txtendTime5" /></td> -->

												<td style="width: px;"><input type="text"
													id="staffresp5" class="form-control input-SmallText" /></td>
												<td style="width: px;"><input type="text" id="remark5"
													class="form-control input-SmallText" /></td>
												<td style="width: px;"><input type="checkbox"
													id="checkbox5" /></td>
												<div id="dischargeID5" style="display: none;">5</div>
												<div id="userID5" style="display: none;"></div>
												<div id="ID5" style="display: none;">5</div>
											</tr>
											<tr>
												<td style="width:"><label class='TextFont'>6.</label></td>
												<td style="width: px;"><label class='TextFont'
													id="activity6">Provisional Bill gives to relative</label></td>
												<td style="width: px; text-align: center;"><input
													type="text" class="form-control input-SmallText demo"
													onmouseover="click2(this)" id="txtstartTime6"
													readonly="readonly" /></td>
												<!-- <td
												style="width: 1%; border-right: 1.2px solid; border-bottom: 1px solid; text-align: center;"><input
												style="width: 86%;" type="text" class="demo"
												onmouseover="click1()" id="txtendTime6" /></td> -->
												<td style="width: px;"><input type="text"
													id="staffresp6" class="form-control input-SmallText" /></td>
												<td style="width: px;"><input type="text" id="remark6"
													class="form-control input-SmallText" /></td>
												<td style="width: px;"><input type="checkbox"
													id="checkbox6" /></td>
												<div id="dischargeID6" style="display: none;">6</div>
												<div id="userID6" style="display: none;"></div>
												<div id="ID6" style="display: none;">6</div>
											</tr>
											<tr>
												<td style="width:"><label class='TextFont'>7.</label></td>
												<td style="width: px;"><label class='TextFont'
													id="activity7">Clearance from billing</label></td>
												<td style="width: px; text-align: center;"><input
													type="text" class="form-control input-SmallText demo"
													onmouseover="click2(this)" id="txtstartTime7"
													readonly="readonly" /></td>
												<!-- <td
												style="width: 1%; border-right: 1.2px solid; border-bottom: 1px solid; text-align: center;"><input
												style="width: 86%; height: 32px;" type="text" class="demo"
												onmouseover="click1()" id="txtendTime7" /></td> -->

												<td style="width: px;"><input type="text"
													id="staffresp7" class="form-control input-SmallText" /></td>
												<td style="width: px;"><input type="text" id="remark7"
													class="form-control input-SmallText" /></td>
												<td style="width: px;"><input type="checkbox"
													id="checkbox7" /></td>
												<div id="dischargeID7" style="display: none;">7</div>
												<div id="userID7" style="display: none;"></div>
												<div id="ID7" style="display: none;">7</div>
											</tr>
											<tr>
												<td style="width:"><label class='TextFont'>8.</label></td>
												<td style="width: px;"><label class='TextFont'
													id="activity8">Investigations and Discharge Summary
														handed over</label></td>
												<td style="width: px; text-align: center;"><input
													type="text" class="form-control input-SmallText demo"
													onmouseover="click2(this)" id="txtstartTime8"
													readonly="readonly" /></td>
												<!-- <td
												style="width: 1%; border-right: 1.2px solid; border-bottom: 1px solid; text-align: center;"><input
												style="width: 86%;" type="text" class="demo"
												onmouseover="click1()" id="txtendTime8" /></td> -->

												<td style="width: px;"><input type="text"
													id="staffresp8" class="form-control input-SmallText" /></td>
												<td style="width: px;"><input type="text" id="remark8"
													class="form-control input-SmallText" /></td>
												<td style="width: px;"><input type="checkbox"
													id="checkbox8" /></td>
												<div id="dischargeID8" style="display: none;">8</div>
												<div id="userID8" style="display: none;"></div>
												<div id="ID8" style="display: none;">8</div>
											</tr>
											<tr>
												<td style="width:"><label class='TextFont'>9.</label></td>
												<td style="width: px;"><label class='TextFont'
													id="activity9">Patient cleared the bed</label></td>
												<td style="width: px; text-align: center;"><input
													type="text" class="form-control input-SmallText demo"
													onmouseover="click2(this)" id="txtstartTime9"
													readonly="readonly" /></td>
												<!-- <td
												style="width: 1%; border-right: 1.2px solid; border-bottom: 1px solid; text-align: center;"><input
												style="width: 86%;" type="text" class="demo"
												onmouseover="click1()" id="txtendTime9" /></td> -->

												<td style="width: px;"><input type="text"
													id="staffresp9" class="form-control input-SmallText" /></td>
												<td style="width: px;"><input type="text" id="remark9"
													class="form-control input-SmallText" /></td>
												<td style="width: px;"><input type="checkbox"
													id="checkbox9" /></td>
												<div id="dischargeID9" style="display: none;">9</div>
												<div id="userID9" style="display: none;"></div>
												<div id="ID9" style="display: none;">9</div>
											</tr>
											
											<!-- added by vishant (new field pharmacy clearance -->
											<tr>
												<td style="width:"><label class='TextFont'>10.</label></td>
												<td style="width: px;"><label class='TextFont'
													id="activity10">Patient Clearance from Pharmacy</label></td>
												<td style="width: px; text-align: center;"><input
													type="text" class="form-control input-SmallText demo"
													onmouseover="click2(this)" id="txtstartTime10"
													readonly="readonly" /></td>
												<!-- <td
												style="width: 1%; border-right: 1.2px solid; border-bottom: 1px solid; text-align: center;"><input
												style="width: 86%;" type="text" class="demo"
												onmouseover="click1()" id="txtendTime9" /></td> -->

												<td style="width: px;"><input type="text"
													id="staffresp10" class="form-control input-SmallText" /></td>
												<td style="width: px;"><input type="text" id="remark10"
													class="form-control input-SmallText" /></td>
												<td style="width: px;"><input type="checkbox"
													id="checkbox10" /></td>
												<div id="dischargeID10" style="display: none;">10</div>
												<div id="userID10" style="display: none;"></div>
												<div id="ID10" style="display: none;">10</div>
											</tr>


											<!-- 	<tr style="width: 50%;">
											<td
												style="width: 3.33%; border-right: 1.2px solid; border-bottom: 1px solid;">10.</td>
											<td
												style="width: 3.33%; border-right: 1.2px solid; border-bottom: 1px solid;"><div
													id="activity10">Payment</div></td>

											<td
												style="width: 1%; border-right: 1.2px solid; border-bottom: 1px solid; text-align: center;"><input
												style="width: 90%;" type="text" class="demo"
												onmouseover="click1()" id="txtstartTime10" /></td>
											<td
												style="width: 1%; border-right: 1.2px solid; border-bottom: 1px solid; text-align: center;"><input
												style="width: 86%;" type="text" class="demo"
												onmouseover="click1()" id="txtendTime10" /></td>

											<td
												style="width: 3.33%; border-right: 2px solid; border-bottom: 1px solid;"><input
												style="width: 97.7%;" type="text" id="staffresp10" /></td>
											<td
												style="width: 3.33%; border-right: 1.2px solid; border-bottom: 1px solid;"><input
												style="width: 96.6%;" type="text" id="remark10" /></td>
												<td
												style="width: 3.33%; border-right: 1.2px solid; border-bottom: 1px solid;padding-left: 1.5%;"><input type="checkbox"
												  id="checkbox10" /></td>
											<div id="dischargeID10" style="display: none;">10</div>
											<div id="userID10" style="display: none;"></div>
										</tr> -->


											<!-- 	<tr style="width: 50%;">
											<td
												style="width: 3.33%; border-right: 1.2px solid; border-bottom: 1px solid;">8.</td>
											<td
												style="width: 3.33%; border-right: 1.2px solid; border-bottom: 1px solid;"><div
													id="activity11">Investigations and Discharge Summary
													handed over</div></td>

											<td
												style="width: 1%; border-right: 1.2px solid; border-bottom: 1px solid; text-align: center;"><input
												style="width: 90%;" type="text" class="demo"
												onmouseover="click1()" id="txtstartTime11" /></td>
											<td
												style="width: 1%; border-right: 1.2px solid; border-bottom: 1px solid; text-align: center;"><input
												style="width: 86%;" type="text" class="demo"
												onmouseover="click1()" id="txtendTime11" /></td>

											<td
												style="width: 3.33%; border-right: 2px solid; border-bottom: 1px solid;"><input
												style="width: 97.7%;" type="text" id="staffresp11" /></td>
											<td
												style="width: 3.33%; border-right: 1.2px solid; border-bottom: 1px solid;"><input
												style="width: 96.6%;" type="text" id="remark11" /></td>
												<td
												style="width: 3.33%; border-right: 1.2px solid; border-bottom: 1px solid;padding-left: 1.5%;"><input type="checkbox"
												  id="checkbox11" /></td>
											<div id="dischargeID11" style="display: none;">11</div>
											<div id="userID11" style="display: none;"></div>
										</tr> -->


											<!-- 	<tr style="width: 50%;">
											<td
												style="width: 3.33%; border-right: 1.2px solid; border-bottom: 1px solid;">9.</td>
											<td
												style="width: 3.33%; border-right: 1.2px solid; border-bottom: 1px solid;"><div
													id="activity12">Patient cleared the bed</div></td>

											<td
												style="width: 1%; border-right: 1.2px solid; border-bottom: 1px solid; text-align: center;"><input
												style="width: 90%;" type="text" class="demo"
												onmouseover="click1()" id="txtstartTime12" /></td>
											<td
												style="width: 1%; border-right: 1.2px solid; border-bottom: 1px solid; text-align: center;"><input
												style="width: 86%;" type="text" class="demo"
												onmouseover="click1()" id="txtendTime12" /></td>

											<td
												style="width: 3.33%; border-right: 2px solid; border-bottom: 1px solid;"><input
												style="width: 97.7%;" type="text" id="staffresp12" /></td>
											<td
												style="width: 3.33%; border-right: 1.2px solid; border-bottom: 1px solid;"><input
												style="width: 96.6%;" type="text" id="remark12" /></td>
												<td
												style="width: 3.33%; border-right: 1.2px solid; border-bottom: 1px solid;padding-left: 1.5%;"><input type="checkbox"
												  id="checkbox12" /></td>
											<div id="dischargeID12" style="display: none;">12</div>
											<div id="userID12" style="display: none;"></div>
										</tr> -->

										</tbody>
									</table>
									<br></br>
								</div>
							</form>
							<!-- <div style="width: 100%; font-weight: bold;">Note: Serial
									No. 9 and 10 will be completed by Billing and Cash Department</div> -->

						</div>
					</div>
				</div>
			</div>
		</div>
		<%@include file="Footer.jsp"%></div>
		</div>
		<input id="callfromipd" type="hidden" name="callfromipd"
			value="<%=request.getParameter("type")%>" />
		<div id="patobject" style="display: none;"></div>
		<div id="hospDetails" style="display: none;"></div>
		<div id="container" style="display: none;"></div>
		<input type="hidden" id="queryType" name="queryType" value="insert" />
		<input style="display: none;" id="userName"
			value="${ sessionScope.userName }" />
		<input style="display: none;" id="userRole1"
			value="${sessionScope.userType}" />
		<div id="divPatId" style="display: none;"><%=request.getParameter("myObj")%></div>

		<!-- For IPD_BedWard -->

		<input id="drid" type="hidden" value="0" style="display: none;" />
		<input id="tid" type="hidden"
			value="<%=request.getParameter("treatmentId")%>"
			style="display: none;" />
			<input type="hidden" value="<%=session.getAttribute("uId")%>" id="unitId" />
		<input id="pid" type="hidden" value=" 0" style="display: none;" />
		<input id="treatmentId" type="hidden"
			value="<%=request.getParameter("treatmentId")%>"
			style="display: none;" />
		<input id="bedAllocated" type="hidden"
			value="<%=request.getParameter("bedallocated")%>"
			style="display: none;" />
		<input id="ht" type="hidden" value="<%=request.getParameter("ht")%>"
			style="display: none;" />
		<input id="pattype" type="hidden"
			value="<%=request.getParameter("pattype")%>" style="display: none;" />
		<input type='hidden' id="idProcess" value="0" />
		<div id="divPatId" style="display: none;"><%=request.getParameter("myObj")%></div>

		<!-- callFor=previousTreatmentIPD -->
		<input id="callFor" type="hidden"
			value="<%=request.getParameter("callFor")%>" style="display: none;" />
		<!-- /callFor=previousTreatmentIPD -->

	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>