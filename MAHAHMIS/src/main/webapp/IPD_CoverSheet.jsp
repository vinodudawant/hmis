<%@page import="org.codehaus.groovy.tools.shell.ParseCode"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@ page import="com.hms.model.AdminModel"%>
<%@ page import="javax.servlet.http.HttpServletRequest"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>IPD Cover Sheet</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<link href="css/pop_up.css" rel="stylesheet" type="text/css" />

<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- TODO -->
<!-- FULL CALENDAR -->
<link rel="stylesheet" type="text/css"
	href="js/fullcalendar/fullcalendar.min.css" />
<!-- GRITTER -->

<script type="text/javascript"
	src="js/bootstrap-switch/bootstrap-switch.min.js"></script>
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-switch/bootstrap-switch.min.css" />

<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">

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

<!-- CKEDITOR -->
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>

<!-- for Developers  -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script type="text/javascript" src="js/pop_up.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/ehat_patient.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script type="text/javascript" src="js/ipdTreatment.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/ehat_copy_last_treatment_page.js"></script>
<script type="text/javascript" src="RichTextBox/tinymce/tinymce.min.js"></script>
<script type="text/javascript"
	src="RichTextBox/tinymce/jquery.tinymce.min.js"></script>
<script type="text/javascript"
	src="RichTextBox/tinymce/themes/modern/theme.min.js"></script>
<!-- /for Developers  -->


<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript" src="js/labresult.js"></script>
<script type="text/javascript" src="js/ehat_CoversheetNew.js"></script>

<script type="text/javascript" src="js/studyChart/exporting.js"></script>
<script type="text/javascript" src="js/studyChart/highcharts.js"></script>
<script type="text/javascript" src="js/studyChart/studyChart.js"></script>

<!--calender Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>

<!--TIMEPEACKER -->
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>
<style type="text/css">
.custom-date-style {
	background-color: red !important;
}
</style>
<!--TIMEPEACKER -->


<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("IPD_CoverSheet"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		})

	});
</script>

<script type="text/javascript">
	onload = function() {
		
		<%ResourceBundle resourceBundleEhat1 = ResourceBundle.getBundle("Ehat");%>
		getPatientDataByTreatmentId(<%=request.getParameter("treatmentId")%>); //Added by sagar
		getConsultantDrName(<%=request.getParameter("treatmentId")%>);
		//Added By Pooja
		getPatientBedHall(<%=request.getParameter("treatmentId")%>);
		
		fetchPreviousTreatmentsByTreatmentID();

		/* var type = $("#callfromipd").val();
		if(type == "PDP"){
			$("#bed").hide();
		} */
		
		getPackages("onload");
		//to fetch the patObject for IPD_BedWard.jsp
		display('IPD_CoverSheet');

		// getAllHeading("onload", "assignTest");
		//fetchTopicNm('instructions');
		//defaultViewTest("radioBodyPart");
		//defaultViewTest("RadioGroup");
		$("#lidoctor").addClass("anchorActive");
		//var pid = $("#pid").val();

		/* Patient Summary */
		//fetchPreviousTreatmentsByTreatmentID();
		fetchIpdCoversheetLab();
		setTimeout(function() {
			// setPatientInfo(pid, "DoctorDesk");
			//setPatientInfo(pid, "ipd");

			fetchAllergyAlerts();
            
			//fetchTestDashboard();
			
			setTemplateRisIPD();
			
			featchOrderFormByDate("previous"); //Change By Pooja

			fetchVitalCoverSheet();

			//fetchHospitalDetailsPrint();
			//setUpdateSKTemp('0', 'opdInstructions');

			// getpatientAllAssignedtest();
			//loadDoctorPretreatment();
		}, 1000);
		 getDoctornameForCommonTemp2();   
			var preTreat = $("#preTreat").val();
			if(preTreat=="Y"){
				$('#tempdissum').removeAttr("class");
                $("#tempdissum").css('display','none');
				$('#bed').removeAttr("class");
                $("#bed").css('display','none');
                $('#autodissum').removeAttr("class");
                $("#autodissum").css('display','none');
                $('#disinv').removeAttr("class");
                $("#disinv").css('display','none');
                $('#pharmacyConsumptionIndent').removeAttr("class");
                $("#pharmacyConsumptionIndent").css('display','none');
			}
		//$("#RowCount").val('1');
		
		/* setTimeout(function() {
			var callFor = ($("#callFor").val()).trim();
			if (callFor === "previousTreatmentIPD") {
				$("#ipdCoverSheetJSPHeadDiv *").prop("disabled", true);
				$("#previousPatientSummaryTable *").prop("disabled", false);
			}
		}, 1500);
		 */
		//fetchLabResultData("OpdDoctorsDesk");
		
		/* var todays_date = $("#date").html();
		var arrDate = todays_date.split("-");
		var date = arrDate[0] + "/" + arrDate[1] + "/" + arrDate[2];
		$("#date-pick").val(date);
		$("#OFdate-pick").val(date);
		$("#OFdate-pick1").val(date);
		$("#hiddenDate").val(date); */
	};
</script>

</head>

<%
	java.util.Calendar currentDate = Calendar.getInstance();
	SimpleDateFormat dateformatter = new SimpleDateFormat("dd-MM-yyyy");
	String todays_date = dateformatter.format(currentDate.getTime());

	// order form date
	SimpleDateFormat dateformatterOF = new SimpleDateFormat(
			"dd/MM/yyyy");
	String todays_dateOF = dateformatterOF
			.format(currentDate.getTime());
%>


<body style="background: white ! important;">


	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	<c:if test="${ sessionScope.userType != null }">


		<!-- HEADER -->
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header.jsp"%>
		</header>
		<!--/HEADER -->
		<section id="page">
			<!--Start Left Menu -->
			<%
	
			
			 String dtid=request.getParameter("treatmentId");
			System.out.println(dtid+">>>>>>>>>>>>>>>>>>>>>>>>tid>>>>>>>>>>>>>>>>>>>");
			int trid =Integer.parseInt(dtid);
			int deptid=2;
			System.err.println("depid>>>>----------------->>" + deptid);
				String moduleName = (String) session.getAttribute("moduleName");
			System.err.println("moduleName>>>>>>" + moduleName);

			/* 	String pageIncludeType = request
							.getParameter("pageIncludeType");
 */
				if (deptid==2) {

				 
			%>
			<%@include file="left_menu_IPD.jsp"%>
			<%
				} else {
			%>
			<%@include file="menu_DoctorDesk.jsp"%>
			<%
				}

					 
			%>
			<!--End Left Menu -->
			
			<!--Start Left Menu -->
<%-- 			<%@include file="left_menu_IPDMain.jsp"%>
 --%>						
		<%-- 	<%@include file="left_menu_IPD.jsp"%> --%>
			
				<!--End Left Menu -->
						<%-- 	<%@include file="left_menu_IPD.jsp"%> --%>
							 
			
			

			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">

							<!-- Page Date Print Discards-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">
										<ul class="breadcrumb col-md-12-1"
											style="padding: 5px 10px; margin-top: 1px;">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="IPD_Dashboard.jsp">IPD</a></li>
											<li>IPD Coversheet</li>
											<div class="pull-right">
												<button class="btn btn-xs btn-danger"
												data-toggle="tooltip" data-placement="left" title="Discard"
													onclick="refreshTrue()">
													<i class ="fa fa-refresh"></i>
													</button>
													
													<button class="btn btn-xs btn-warning" data-toggle="tooltip"
													data-placement="left" title="Print "
													onclick="printCurrentPrescriptionNewIpd('PRINT')">
													<i class="fa fa-print"></i>
												</button>
											</div>
										</ul>
									</div>
								</div>

						<div class="alert alert-block alert-info fade in" style="height: 0%;">
								<div class="row">
										<input type="hidden"  id="pt_Id" value="0">
										<input type="hidden"  id="tr_Id" value="<%=request.getParameter("treatmentId")%>">
										<input type="hidden"  id="bill_Id" value="0">
								
								<div class="col-md-1" style="margin-bottom: 0%;">
									<img id="patImg" style="width: 100%; height: 45px"
										src="ehat-design/img/profile/avatar.jpg"
										class="img-responsive">
								</div>
								<div class="col-md-11">
									
									<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold" id="lblCenterPatientId">UHID :</label> 
												 <label id="patientId" class="control-label"></label> 
											</div>
								</div>
									
									
								<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Age :</label> <label
													class="control-label" id="age"> </label>
								</div>
								</div>
								<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Patient Name :</label>
												<label id="patientName" class="control-label"></label>

											</div>
								</div>
								<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Ipd No :</label> <label id="ipdNo" class="control-label"> IPD-D</label>

											</div>
								</div>
								<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Ref.BillNo: </label>  <label id="billNo" class="control-label"></label> 

											</div>
								</div>
								
								
								<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Gender :</label> <label id="sex" class="control-label">male</label>

											</div>
								</div>
								<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Bill Category :</label>
												<label id="billCategoty" class="control-label"> </label>
											</div>
								</div>
								<div class="col-md-3" >
											<div class="form-group">
												<label class="control-label lblBold">DOA:</label> <label id="doa" class="control-label"> DOA-D</label>

											</div>
								</div>
								<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Treatment Id :</label> <label id="treatmentId" class="control-label"> <%=request.getParameter("treatmentId")%></label>

											</div>
											</div>
											<div class="col-md-3" >
											<div class="form-group">
												<label class="control-label lblBold">Bill No:</label> <label id="consultingDoctor" class="control-label"> </label>

											</div>
											</div>
											<div class="col-md-3" >
											<div class="form-group">
												<label class="control-label lblBold">Consulting Dr:</label> <label id="consultingDoctorr" class="control-label"> </label>

											</div>
										</div>
										<div class="col-md-3">
                                              <div class="form-group">
                                                    <label class="control-label lblBold">Ref Dr:</label> <label id="refDoctor" class="control-label"></label>   
                                              </div>
                                         </div>
                                         <div class="col-md-3">
                                              <div class="form-group">
                                                    <label class="control-label lblBold">Hall(HType):</label> <label id="hallName" class="control-label"></label>   
                                              </div>
                                    	</div>
                                    	<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Corporate :</label> <label id="corporate" class="control-label"> </label>

											</div>
										</div>	
							</div>
						</div>
						</div>
							
							
							
							
							<!-- Page Date Print Discards-->

							<!-- Page Search Header -->
							<!-- Page Search Header -->

							<!-- <div class="divide-20"></div> -->

							<!-- Start Tab UI -->
							<div class="col-md-12-1"
								style="margin-top: 5px; margin-left: 0px;">
								<!-- Start BOX -->
								<div id="ipdCoverSheetJSPHeadDiv" class="box border col-md-12-1">
									<div class="divide-10"></div>
									<div class="tabbable col-md-12-1">
										<ul class="nav nav-tabs">
											<li class="active"><a data-toggle="tab"
												href="#Cover_Sheet"><span class="hidden-inline-mobile">Cover
														Sheet</span></a></li>
										</ul>
										<div class="divide-10"></div>
										<div class="tab-content">										
										
											<!-- Start Code for Cover_Sheet GUI -->
											<div id="Cover_Sheet" class="tab-pane fade in active">
												<!-- Start Code for row1 Cover_Sheet GUI -->
												<div id="row1" class="col-md-12-1" style="margin: 0px;">
													<!-- ACCORDIONS -->
													<div class="col-md-4-1">
														<!-- BOX -->
														<div class="col-md-12-1 box border default"
															style="margin-top: 0px;">
															<div class="box-title col-sm-12-1"
																style="margin-top: 0px; background-color: #f0ad4e;">
																<h4>
																	<i class="fa fa-bars"></i>Patient Summary
																</h4>
															</div>
															<div class="col-sm-12-1"
																style="overflow-y: scroll; height: 180px; max-height: auto; margin-top: -1px;">

																<table class="table table-condensed">
																	<tbody id="previousPatientSummaryTable"
																		class="TextFont">
																		<!-- <tr>
																					<td class="col-md-1-1" style="padding-left: 25px;">1</td>
																					<td class="col-md-1-1">05-01-2015</td>
																					<td class="col-md-1-1" style="padding-left: 20px;">1</td>
																					<td class="col-md-2-1" style="padding-left: 10px;">Rahul
																						Solanki</td>
																					<td class="col-md-2-1" style="padding-left: 25px;"><button
																							class="btn btn-xs btn-success">
																							<i class="fa fa-edit"></i>
																						</button>
																						<button class="btn btn-xs btn-success"
																							id="viewPatSum1">
																							<i class="fa fa-credit-card"></i>
																						</button></td>
																				</tr>
																				<tr>
																					<td class="col-md-1-1" style="padding-left: 25px;">2</td>
																					<td class="col-md-1-1">06-02-2015</td>
																					<td class="col-md-1-1" style="padding-left: 20px;">2</td>
																					<td class="col-md-2-1" style="padding-left: 10px;">Rahul
																						Solanki</td>
																					<td class="col-md-2-1" style="padding-left: 25px;"><button
																							class="btn btn-xs btn-success">
																							<i class="fa fa-edit"></i>
																						</button>
																						<button class="btn btn-xs btn-success"
																							id="viewPatSum2">
																							<i class="fa fa-credit-card"></i>
																						</button></td>
																				</tr> -->
																	</tbody>
																</table>
															</div>
														</div>
													</div>
													<!-- /BOX -->


													<!-- /ACCORDIONS -->

													<!-- =========== 2 ============== -->
													<div class="col-md-4-1">
														<!-- BOX-->
														<div class="box border default col-md-12-1"
															style="margin: 0px;">
															<div class="box-title col-sm-12-1"
																style="margin-top: 0px; background-color: #539fb8;">
																<h4>
																	<i class="fa fa-bars"></i>Lab
																</h4>
																<div class="pull-right">
																			<!-- Added by Laxman on 26-Feb-2018 for Compare Test result. -->
																			<button class="lab_button" title="Compare Test Results" 
																			onclick="showComparePopUp('cmprbtn')" 
																			type="button" style="margin-top: -4px;display:none;" 
																			id="labcmpbut">
						        											<i class="fa fa-exchange"></i>
						        											</button>
		        
																		 	<button class="lab_button" id="labbut"
																				style="margin-top: -4px;display:none;" type="button"
																				onclick="showPopUpTestResult('viewbtn')"
																				title="View Lab Result">
																				<i class="fa fa-eye View"></i>
																			</button>
																			
																			<button class="b" id="labbut"
																				style="margin-top: -4px;display:none;" type="button" 
																				onclick="showreqPopUp()"
																				title="View Lab Result">
																				<i class="fa fa-eye View"></i>
																			</button>
																			
																</div>
															</div>
															<div class="col-sm-12-1" style="margin-top: 3px;">
																<table class="table table-condensed">
																	<thead>
																		<tr>
																			<th class="col-md-1-1"><div class="TextFont">#</div></th>
																			<th class="col-md-4-1"><div class="TextFont">Particulars</div></th>
																			<th class="col-md-2-1"><div class="TextFont">Date</div></th>
																			<th class="col-md-2-1 "><div class="TextFont">Time</div></th>
																			<!-- <th class="col-md-1-1 "
																				style="height: 21.5px; "><div
																					class="TextFont">Report</div></th> -->
																		</tr>
																	</thead>
																</table>
															</div>
															<div id="flip-scroll" class="col-md-12-1"
																style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;">
																<table class="table table-condensed">
																	<tbody id="coverSheetLabDashBoard">
																	</tbody>
																</table>
															</div>
														</div>
														<!-- /BOX -->
													</div>

													<!-- =========== 3 ============== -->

													<div class="col-md-4-1">
														<!-- BOX-->
														<div class="box border default col-md-12-1"
															style="margin: 0px;">
															<div class="box-title col-sm-12-1"
																style="margin-top: 0px; background-color: #a696ce;">
																<h4>
																	<i class="fa fa-bars"></i>Radiology and Images
																</h4>
															</div>
															<div class="col-sm-12-1" style="margin-top: 3px;">
																<table class="table table-condensed">
																	<thead>
																		<tr>
																			<th class="col-md-1-1"><div class="TextFont">#</div></th>
																			<th class="col-md-4-1"><div class="TextFont">Particulars</div></th>
																			<th class="col-md-2-1"><div class="TextFont">Date</div></th>
																			<th class="col-md-2-1 center"
																				style="height: 21.5px; padding-right: 40px;"><div
																					class="TextFont">Report</div></th>
																		</tr>
																	</thead>
																</table>
															</div>
															<div id="flip-scroll" class="col-md-12-1"
																style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;">
																<table class="table table-condensed">
																	<tbody id="coverSheetInvestDashBoard11">
																	</tbody>
																</table>
															</div>
														</div>
														<!-- /BOX -->
													</div>
												</div>
												<!-- End Code for row1 Cover_Sheet GUI -->

												<!-- Start Code for row2 Cover_Sheet GUI -->
												<div id="row2" class="col-md-12-1" style="margin-top: 0px;">
													<div class="col-md-4-1">
														<!-- BOX-->
														<div class="box border default col-sm-12-1"
															style="margin: 0px;">
															<div class="box-title col-sm-12-1"
																style="margin-top: 0px; background-color: #a8bc7b;">
																<h4>
																	<i class="fa fa-bars"></i>Vitals
																</h4>
																<button
																				style="margin-left: 259px;" type="button"
																				onclick="showPopUpVitals()"
																				title="IPD Nursing Chart">
																				<i class="fa fa-eye View"></i>
																			</button>
																
															</div>
															<div class="col-sm-12-1" style="margin-top: 3px;">
																<table class="table table-condensed">
																	<thead>
																		<tr>
																			<th class="col-md-1-1"><div class="TextFont">#</div></th>
																			<th class="col-md-6-1"><div class="TextFont">Particulars</div></th>
																			<th class="col-md-1-1"><div class="TextFont">Time</div></th>
																			<th class="col-md-2-1"><div class="TextFont">Description</div></th>
																		</tr>
																	</thead>
																</table>
															</div>
															<div id="flip-scroll" class="col-md-12-1"
																style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;">
																<table class="table table-condensed">
																	<tbody id="vitalsCoverSheet">
																	</tbody>
																</table>
															</div>
														</div>
														<!-- /BOX -->
													</div>
													<div class="col-md-4-1">
														<!-- BOX-->
														<div class="box border default col-sm-12-1"
															style="margin: 0px;">
															<div class="box-title col-sm-12-1"
																style="margin-top: 0px; background-color: #d9534f;">
																<h4>
																	<i class="fa fa-bars"></i>Allergies & Alerts
																</h4>
															</div>

															<div class="col-sm-12-1" style="margin-top: 3px;">
																<table class="table table-condensed">
																	<thead>
																		<tr>
																			<th class="col-md-1-1" style="height: 21.5px;"><div
																					class="TextFont">#</div></th>
																			<th class="col-md-8-1"
																				style="height: 21.5px; padding-right: 40px;"><div
																					class="TextFont">Particulars</div></th>
																			<th class="col-md-2-1 center"
																				style="height: 21.5px; padding-right: 40px;"><div
																					class="TextFont">Date</div></th>
																		</tr>
																	</thead>
																</table>
															</div>
															<div id="flip-scroll" class="col-md-12-1"
																style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;">
																<table class="table table-condensed">
																	<tbody id="allergyAlertsCoverSheetTemp">
																</table>
															</div>

														</div>
														<!-- /BOX -->
													</div>
													<div class="col-md-4-1">
														<!-- BOX-->
														<div class="box border default col-sm-12-1"
															style="margin: 0px;">
															<div class="box-title col-sm-12-1"
																style="margin-top: 0px;">
																<h4>
																	<i class="fa fa-bars"></i>Medication
																</h4>
															</div>
															<div class="col-sm-12-1" style="margin-top: 3px;">
																<table class="table table-condensed">
																	<thead>
																		<tr>
																			<th class="col-md-1-1" style="height: 21.5px;"><div
																					class="TextFont">#</div></th>
																			<th class="col-md-10-1"><div class="TextFont">Drugs</div></th>
																			<th class="col-md-1-1 center"><div
																					class="TextFont">Status</div></th>
																		</tr>
																	</thead>
																</table>
															</div>
															<div id="flip-scroll" class="col-md-12-1"
																style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;">
																<table class="table table-condensed">
																	<tbody id="coverSheetOrderForm">
																	</tbody>
																</table>
															</div>
														</div>
														<!-- /BOX -->
													</div>
												</div>
											</div>
											<!-- End Code for Cover_Sheet GUI -->

											<div id="Cover_History" class="tab-pane fade in active">
										<div class="panel-body">
											<table class="table table-bordered header-fixed cf "
												style="Width: 100%; margin-top: -26px;">
												<thead class="cf" style="background: white;">
													
												</thead>
												<tbody id="coverHistoryDetails"
												style="max-height: auto; overflow-y: auto;">
												
												</tbody>
											</table>											
											</div>
									</div>


										</div>
										<!-- End Code for tab-content GUI -->
									</div>
								</div>
							</div>
							<!-- End Tab UI -->
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
			<input id="callfromipd" type="hidden" name="callfromipd" value="<%=request.getParameter("type")%>"/>
			<div id="patobject" style="display: none;"></div>
			<%-- <div id="pid" style="display: none;"><%=request.getParameter("pid")%></div> --%>
			<%-- <div id="appo_type" style="display: none;"><%=request.getParameter("appo_type")%></div>
			<div id="id" style="display: none;"><%=request.getParameter("id")%></div>
			<div id="updateOn" style="display: none;"><%=request.getParameter("updateFlagOn")%></div>
			<div id="PreTre" style="display: none;"><%=request.getParameter("myObj")%></div>
			<input type="hidden" value="<%=request.getParameter("FunType")%>"
				id="FunType" /> --%>
			<div id="hospDetails" style="display: none;"></div>
			<div id="topic" style="display: none;"></div>
			<div style="display: none;" id="docName">${sessionScope.userName}</div>
			<div id="date" style="display: none;"><%=todays_date%></div>
			<input type="hidden" id="pageType" value="DoctorDesk" />

			<!-- Patient Summary Cover Sheet:Start -->
			<div id="previousPatientSummary" style="display: none;"></div>
			<!-- Patient Summary Cover Sheet:End -->

			<!-- for order form -->
			<input type="hidden" id="OFdate-pick" value="<%=todays_dateOF%>" />

			<!-- For IPD_BedWard -->
			<<%-- input id="tid" type="hidden"
				value=" --%>
				<%=request.getParameter("treatmentId")%>"
				style="display: none;" /> <input id="pid" type="hidden"
				value="<%=request.getParameter("patientId")%>"
				style="display: none;" /> <input id="treatmentId" type="hidden"
				value="<%=request.getParameter("treatmentId")%>"
				style="display: none;" /> <input id="bedAllocated" type="hidden"
				value="<%=request.getParameter("bedallocated")%>"
				style="display: none;" /> <input id="ht" type="hidden"
				value="<%=request.getParameter("ht")%>" style="display: none;" /> <input
				id="pattype" type="hidden"
				value="<%=request.getParameter("pattype")%>" style="display: none;" />
			<div id="divPatId" style="display: none;"><%=request.getParameter("myObj")%></div>
			<!-- /For IPD_BedWard -->

			<!-- callFor=previousTreatmentIPD -->
			<input id="callFor" type="hidden"
				value="<%=request.getParameter("callFor")%>" style="display: none;" />
			<!-- /callFor=previousTreatmentIPD -->
			
			<input id='testmasterId' type='hidden' name='testmasterId' value='0'/>
		
			
		</section>
	</c:if>
	<div id="userObj" style="display: none;"></div>
<!-- @codeBy : Touheed @codeDate : 18-Feb-2016 -->

				<div id="iPopupFormula" class="modal fade in" tabindex="-1">
				</div>
		
				
		
		<!-- ---------------------------Touheed Khan @date : 27-Apr-2016--------------------- -->
					<div id="postPopup" class="modal fade in" tabindex="-1">
						<div class="modal-dialog">
							<div class="modal-content col-md-7-1"
								style="margin-top: 16%; margin-left: 25%;">
								<div class="modal-header">
									<h4 id="testHead" style="margin-top: 0px;">
										<i class="fa fa-fw"><img width="19px;" height="19px;"
											src="images/science-512.png" alt=""></i>Select Posted Lab Test Result To View :
									
										<button class="btn btn-xs btn-success" 
											title="View Post Result" data-dismiss="modal" type="button"
											style="margin-top: 0px;; margin-left: 16%"
											onclick="viewAllLabTestResult()">
											<i class="fa fa-eye View"></i>
										</button>
										
										<button class="btn btn-xs btn-danger" aria-label="Close"
											title="Close" data-dismiss="modal" type="button"
											style="margin-top: 0px;; margin-left:0px"
											onclick="hideValueforResult()">
											<i class="fa fa-times"></i>
										</button>
										
									</h4>
									
								</div>
								<div class="modal-body">
									<div id="totalposttime" class="col-md-12-1">
										<table class="table table-bordered"
											style="margin-top: 0px;">
											<thead>
												<tr>
													<th class="col-sm-1 center">#</th>
													<th class="col-sm-3-1 center">Post</th>
													<th class="col-sm-3-1 center">Post Time</th>
													<th class="col-sm-3-1 center">Post Date</th>
													<th class="col-sm-1-1 center"><i class="fa  fa-eye View"></i></th>
												</tr>
											</thead>
										</table>
									</div>

									<div class="divide-10"></div>

									<div  class="col-md-7-1"
										style="width: 100%; height: 150px; overflow-y: auto; border: 1px solid #b8b8b8; margin-top: -21px; margin-bottom: 10px;">
										
										<table class="table table-striped table-condensed"
											style="margin-top: 0px;">
											
											<tbody id="totalpost">
											
											</tbody>
											
										</table>
										
									</div>


										

								</div>
							</div>
						</div>
					</div>


<!-- _________________________________________TK End_____________________________________________ -->
		
<!-- Tushar @CodeDate:08 Nov 2016 -->
<div id="iPrintIPDSummary" class="modal fade in" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content col-md-7"
				style="margin-top: 13%; margin-left: 13%;">
				<div class="modal-header">
					<div class="box-title">
						<h4 class="col-md-8-1">
							<i class="fa fa-calendar"></i> Prescription Instruction Language
						</h4>
						<div class="form-group col-md-4-1" style="float: right;">
							<button class="btn btn-xs btn-warning"
								onclick="printPrescriptionIPDNew('PRINT');" type="button">
								<i class="fa fa-print"></i> Print
							</button>
							<button class="btn btn-xs btn-danger"
								onclick="printPrescriptionIPD('HIDE_POPUP_PRINT');">
								<i class="fa fa-arrows"></i> Close
							</button>
						</div>
					</div>
				</div>

				<div class="modal-body col-md-12-1">
					<div class="col-md-3-1">
						<label class="input-SmallText"> <input checked="checked"
							type="radio" value="ENGLISH" name="prepInstructionPopup"
							style="margin-top: 0px; cursor: pointer"> : English
						</label>
					</div>

					<div class="col-md-3-1">
						<label class="input-SmallText"> <input type="radio"
							value="HINDI" name="prepInstructionPopup"
							style="margin-top: 0px; cursor: pointer"> : Hindi
						</label>
					</div>

					<div class="col-md-3-1">
						<label class="input-SmallText"> <input type="radio"
							value="MARATHI" name="prepInstructionPopup"
							style="margin-top: 0px; cursor: pointer"> : Marathi
						</label>
					</div>

					<div class="col-md-4-1">
						<label class="input-SmallText"> <input type="checkbox"
							id="vaccinationFlagCheckboxPrint"
							name="vaccinationFlagCheckboxPrint"
							style="margin-top: 0px; cursor: pointer"> : Print
							Vaccination chart
						</label>
					</div>
					
					<hr>
					
					<div class="col-md-3-1">
						<label class="input-SmallText"> <input type="radio" checked="checked"
							value="standard" name="prepInstructionPaperSizePopup"
							style="margin-top: 0px; cursor: pointer"> Standard
						</label>
					</div>
					
					<div class="col-md-3-1">
						<label class="input-SmallText"> <input type="radio"
							value="custom" name="prepInstructionPaperSizePopup"
							style="margin-top: 0px; cursor: pointer"> Custom
						</label>
					</div>
				</div>
			</div>
		</div>
	</div>
<div id="iPrintBill" class="modal fade in" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content col-md-7"
				style="margin-top: 13%; margin-left: 13%;">
				<div class="modal-header">
					<div class="box-title">
						<h4 class="col-md-8-1">
							<i class="fa fa-calendar"></i> Prescription Instruction Language
						</h4>
						<div class="form-group col-md-4-1" style="float: right;">
							<button class="btn btn-xs btn-warning"
								onclick="printPrescriptionNew('PRINT');" type="button">
								<i class="fa fa-print"></i> Print
							</button>
							<button class="btn btn-xs btn-danger"
								onclick="hideSummaryPostPopupNew('HIDE_POPUP_PRINT');">
								<i class="fa fa-arrows"></i> Close
							</button>
						</div>
					</div>
				</div>

				<div class="modal-body col-md-12-1">
					<div class="col-md-3-1">
						<label class="input-SmallText"> <input checked="checked"
							type="radio" value="ENGLISH" name="prepInstructionPopup"
							style="margin-top: 0px; cursor: pointer"> : English
						</label>
					</div>

					<div class="col-md-3-1">
						<label class="input-SmallText"> <input type="radio"
							value="HINDI" name="prepInstructionPopup"
							style="margin-top: 0px; cursor: pointer"> : Hindi
						</label>
					</div>

					<div class="col-md-3-1">
						<label class="input-SmallText"> <input type="radio"
							value="MARATHI" name="prepInstructionPopup"
							style="margin-top: 0px; cursor: pointer"> : Marathi
						</label>
					</div>

					<div class="col-md-4-1">
						<label class="input-SmallText"> <input type="checkbox"
							id="vaccinationFlagCheckboxPrint"
							name="vaccinationFlagCheckboxPrint"
							style="margin-top: 0px; cursor: pointer"> : Print
							Vaccination chart
						</label>
					</div>
					
					<hr>
					
					<div class="col-md-3-1">
						<label class="input-SmallText"> <input type="radio" checked="checked"
							value="standard" name="prepInstructionPaperSizePopup"
							style="margin-top: 0px; cursor: pointer"> Standard
						</label>
					</div>
					
					<div class="col-md-3-1">
						<label class="input-SmallText"> <input type="radio"
							value="custom" name="prepInstructionPaperSizePopup"
							style="margin-top: 0px; cursor: pointer"> Custom
						</label>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	
	
	<!-- @codeBy: Touheed  @codeDate:25-Feb-2016 (Start) -->
		<div id="iPopupEditor" class="modal fade in" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content col-md-8-1"
								style="margin-top: 16%; margin-left: 20%;">
								<div class="modal-header">
									<!-- <button class="btn btn-xs btn-danger" aria-label="Close" title="Close"
										data-dismiss="modal" type="button"
										style="margin-top: -5px;; margin-left: 730px"
										onclick="">
										<i class="fa fa-times"></i>
									</button>
									 <button class="btn btn-xs btn-success" title="Edit"
										style="margin-top: -37px; margin-left: 700px"
										" data-original-title="savepass " data-toggle="tooltip"
										data-placement="left" onclick="">
										<i class="fa fa-edit"></i>
									</button>
									
									<button class="btn btn-xs btn-danger" aria-label="Delete Formula" title="Delete Formula"
										data-dismiss="modal" type="button"
										style="margin-top: -70px;; margin-left: 758px"
										onclick="">
										<i class="fa fa-trash-o"></i>
									</button>  -->
		
									<h4 id="testHead" style="margin-top: 0px;">
										<i class="fa fa-fw"><img width="19px;" height="19px;" src="images/science-512.png" alt=""></i> Lab Test Results Editor:
										
										<button class="btn btn-xs btn-danger" onclick="closeEditorForResult()" title="Close" style=" margin-left:56%;">
										<i class="fa fa-times"></i>
										</button>
										<!-- <button class="btn btn-xs btn-success" onclick="" title="Save" >
										<i class="fa fa-save"></i>
										</button> -->
									</h4>
									
									
									
								</div>
						<div class="modal-body">
				
							
										<div>
											<!-- <textarea class="ckeditor ui-widget-content"
												name="editorSubjective" id="editorForLabResult"
												title="Rich Text Editor, editorSubjective"
												placeholder="Content"></textarea>
												 -->
											<textarea id="txtLabNote" class=" " cols="88" rows="8"></textarea>	
										</div>		
						</div>
				</div>
			</div>
		</div>
		
	<!-- @codeBy: Touheed  @codeDate:25-Feb-2016 (End)-->
		
		
<div id="SummarypostPopup" class="modal fade in" tabindex="-1">
		<div class="modal-dialog" style="border: thin; width: 90%;" >
			<div class="modal-content col-md-12-1"
				style="margin-top: -1%; margin-left: 0%;">
				<div class="modal-header">
					<div class="box-title">
						<h4 class="col-md-10-1"> Primary Summary:
						</h4>
						<div class="form-group col-md-1-1" style="float: right;">
							<button class="btn btn-xs btn-warning"
								onclick="printPrescriptionNew('PRINT');" type="button">
								<i class="fa fa-print"></i>
							</button>
							<button class="btn btn-xs btn-danger"
								onclick="hideSummaryPostPopupNew('HIDE_POPUP_PRINT');">
								<i class="fa fa-times"></i>
							</button>
							
						</div>
					</div>
					</div>
					<div class="modal-body">
					<div class="form-group col-md-12-1" style="background-color: #e7e7e7; margin-bottom: 2px;">
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label> Patient ID:</label>
						</div>
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label id="pid1"> </label>
						</div>
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label> Patient Name:</label>
						</div>
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label id="pname"> </label>
						</div>
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label> OPD No:</label>
						</div>
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label id="opdNo"> </label>
						</div>
					</div>
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label> Registered Date:</label>
						</div>
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label id="regDate"> </label>
						</div>
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label> Ref To:</label>
						</div>
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label id="refTo"> </label>
						</div>
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label> Doctor Name:</label>
						</div>	
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label id="doc"> </label>
						</div>
					</div>
					
					<div class="form-group col-md-12-1">	
						<div class="form-group col-md-2-1" style="margin-top: -20px;">
							<label style="font-size: 14px;"> Subjective & Objective:</label>
						</div>
						<div class="form-group col-md-2-1 TextFont">
							<label id="SubObj" style="font-size: 9px;"> </label>
						</div>
					</div>
					<div class="form-group col-md-12-1">	
						<div class="form-group col-md-2-1" style="margin-top: -20px;">
							<label style="font-size: 14px;"> Alerts & Allergies:</label>
						</div>
						<div class="form-group col-md-2-1 TextFont">
							<label id="alertAllergy" style="font-size: 9px;"> </label>
						</div>
					</div>
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-2-1" style="margin-top: -20px;">
							<label style="font-size: 14px;"> Confirmed Diagnosis:</label>
						</div>	
						<div class="form-group col-md-10-1 TextFont">
							<label id="conirmDiagno" style="font-size: 9px;"> </label>
						</div>
					</div>
					<div class="form-group col-md-12-1" style="margin-top: -20px;">
							<label style="font-size: 14px;"> RX:</label>
					</div>	
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Prep. Drug</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Advice</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Frequency</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Duration</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Qty</label>
						</div>
					</div>		
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-12-1 TextFont">
							<label id="prescription" class="form-group col-md-12-1" style="margin-top: 12px; font-size: 9px;"> </label>
						</div>
					</div>
					<div class="form-group col-md-12-1" style="margin-top: -20px;">
							<label style="font-size: 14px;"> CPOE:</label>
					</div>	
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Particulars</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Consultant Name</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Date</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Type</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Test</label>
						</div>
					</div>		
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-12-1 TextFont">
							<label id="cpoeTest" class="form-group col-md-12-1" style="margin-top: 12px; font-size: 9px;"> </label>
						</div>
					</div>
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-12-1" style="margin-top: -20px;">
							<label style="font-size: 14px;"> General Instructions:</label>
						</div>
						<div class="form-group col-md-12-1 TextFont">
							<label id="genInst" class="form-group col-md-12-1" style="font-size: 9px;"> </label>
						</div>
					</div>
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-12-1 TextFont" style="margin-top: -20px;">
							<label style="font-size: 14px;"> Primary Instructions:</label>
						</div>
						<div class="form-group col-md-12-1">
							<label id="primInst" class="form-group col-md-12-1" style="font-size: 9px;"> </label>
						</div>
					</div>
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-12-1" style="margin-top: -20px;">
							<label style="font-size: 14px; "> Surgery Advice:</label>
						</div>
						<div class="form-group col-md-6-1" style="background-color: #e7e7e7;"><label> Operation Name</label>
						</div>
						<div class="form-group col-md-6-1" style="background-color: #e7e7e7;"><label> Advice Date</label>
						</div>
						<div class="form-group col-md-12-1 TextFont">
							<label id="surgeryAdvice" class="form-group col-md-12-1" style="margin-top: 4PX; font-size: 9px;"> </label>
						</div>
					</div>
					<div class="form-group col-md-12-1" style="margin-top: -20px;">
						<label style="font-size: 14px;">Rediotherapy Advice:</label> 
					</div>
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-4-1" style="background-color: #e7e7e7;"><label> Serum Creatine</label>
						</div>
						<div class="form-group col-md-4-1" style="background-color: #e7e7e7;"><label> Radiation Technique</label>
						</div>
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7;"><label> Simulation Date & Time</label>
						</div>
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7;"><label> Treatment Date & Time</label>
						</div>
					</div>		
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-12-1">
							<label id="RedioAdvice" class="form-group col-md-12-1" style="margin-top: 4px; font-size: 9px;"> </label>
						</div>
					</div>
			<div class="form-group col-md-12-1" id="summaryData">
				</div>	
				</div>
				
			</div>					
			</div>
</div>
<div id="IPDSummarypostPopup" class="modal fade in" tabindex="-1">
		<div class="modal-dialog" style="border: thin; width: 90%;" >
			<div class="modal-content col-md-12-1"
				style="margin-top: -1%; margin-left: 0%;">
				<div class="modal-header">
					<div class="box-title">
						<h4 class="col-md-10-1"> Primary Summary:
						</h4>
						<div class="form-group col-md-1-1" style="float: right;">
							<button class="btn btn-xs btn-warning"
								onclick="printPrescriptionIPDNew('PRINT');" type="button">
								<i class="fa fa-print"></i>
							</button>
							<button class="btn btn-xs btn-danger"
								onclick="hideSummaryPostPopupIPD();">
								<i class="fa fa-times"></i>
							</button>
							
						</div>
					</div>
					</div>
					<div class="modal-body">
					<div class="form-group col-md-12-1" style="background-color: #e7e7e7; margin-bottom: 2px;">
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label> Patient ID:</label>
						</div>
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label id="pid2"> </label>
						</div>
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label> Patient Name:</label>
						</div>
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label id="pname2"> </label>
						</div>
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label> IPD No:</label>
						</div>
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label id="ipdNo2"> </label>
						</div>
					</div>
					 <div class="form-group col-md-12-1">
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label> Registered Date:</label>
						</div>
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label id="regDate2"> </label>
						</div>
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label> Ref To:</label>
						</div>
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label id="refTo2"> </label>
						</div>
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label> Doctor Name:</label>
						</div>	
						<div class="form-group col-md-2-1" style="background-color: #e7e7e7">
							<label id="doc2"> </label>
						</div>
					</div>
					
					<div class="form-group col-md-12-1">	
						<div class="form-group col-md-3-1" style="margin-top: -20px;">
							<label style="font-size: 14px;"> Previous Doctor Round Report:</label>
						</div>
						<div class="form-group col-md-12-1">
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> #.</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Time</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Clinical Notes</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Investigation Advice</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> RoundBy</label>
						</div>
					</div>	
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-12-1 TextFont">
							<label id="DocRound2" class="form-group col-md-12-1" style="margin-top: 12px; font-size: 9px;"> </label>
						</div>
					</div>
					<div class="form-group col-md-12-1">	
						<div class="form-group col-md-2-1" style="margin-top: -20px;">
							<label style="font-size: 14px;"> Subjective & Objective:</label>
						</div>
						<div class="form-group col-md-2-1 TextFont">
							<label id="SubObj2" style="font-size: 9px;"> </label>
						</div>
					</div>
					<div class="form-group col-md-12-1">	
						<div class="form-group col-md-2-1" style="margin-top: -20px;">
							<label style="font-size: 14px;"> Alerts & Allergies:</label>
						</div>
						<div class="form-group col-md-2-1 TextFont">
							<label id="alertAllergy2" style="font-size: 9px;"> </label>
						</div>
					</div>
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-2-1" style="margin-top: -20px;">
							<label style="font-size: 14px;"> Confirmed Diagnosis:</label>
						</div>	
						<div class="form-group col-md-10-1 TextFont">
							<label id="conirmDiagno2" style="font-size: 9px;"> </label>
						</div>
					</div>
					<div class="form-group col-md-12-1" style="margin-top: -20px;">
							<label style="font-size: 14px;"> CPOE:</label>
					</div>	
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Particulars</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Consultant Name</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Date</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Type</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Test</label>
						</div>
					</div>		
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-12-1 TextFont">
							<label id="cpoeTest2" class="form-group col-md-12-1" style="margin-top: 12px; font-size: 9px;"> </label>
						</div>
					</div>
					<div class="form-group col-md-12-1" style="margin-top: -20px;">
							<label style="font-size: 14px;"> IPD Services:</label>
					</div>	
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Particulars/Details</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Service Type</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Quantity</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Assign By</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Assign Date & Time</label>
						</div>
					</div>		
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-12-1 TextFont">
							<label id="ipdServices2" class="form-group col-md-12-1" style="margin-top: 12px; font-size: 9px;"> </label>
						</div>
					</div>
					<div class="form-group col-md-12-1" style="margin-top: -20px;">
							<label style="font-size: 14px;"> Order Form:</label>
					</div>	
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> #.</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Prep</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Drug</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Advice</label>
						</div>
						<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Duration</label>
						</div>
					</div>		
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-12-1 TextFont">
							<label id="prescription2" class="form-group col-md-12-1" style="margin-top: 12px; font-size: 9px;"> </label>
						</div>
					</div>
					
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-12-1" style="margin-top: -20px;">
							<label style="font-size: 14px;"> General Instructions:</label>
						</div>
						<div class="form-group col-md-12-1 TextFont">
							<label id="genInst2" class="form-group col-md-12-1" style="font-size: 9px;"> </label>
						</div>
					</div>
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-12-1" style="margin-top: -20px;">
							<label style="font-size: 14px;"> Primary Instructions:</label>
						</div>
						<div class="form-group col-md-12-1 TextFont">
							<label id="primInst2" class="form-group col-md-12-1" style="font-size: 9px;"> </label>
						</div>
					</div>
					<div class="form-group col-md-12-1">
						<div class="form-group col-md-12-1" style="margin-top: -20px;">
							<label style="font-size: 14px;"> Admission Note:</label>
						</div>
						<div class="form-group col-md-12-1 TextFont">
							<label id="note2" class="form-group col-md-12-1" style="font-size: 9px;"> </label>
						</div>
					</div>
				<div class="form-group col-md-12-1" id="summaryData">
				</div>	
				</div>
				
			</div>					
			</div>
		</div>
</div>


<!-- Code End -->		
<div id="RisviewPopUp" class="modal fade in" tabindex="-1" role="dialog"
				aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content" class="col-md-9">
						<div class="modal-header">
							<div class="box-title" style="margin-left: 380px;">
								<h4>
									<i class="fa fa-calendar"></i>Report
								</h4>
						
							</div>
						</div>
						<div class="modal-body">

							<div ID="ckviewEditor" class="tab-pane fade in active">
								<textarea class="ckeditor ui-widget-content "
									name="viewckeditor1"
									title="Rich Text Editor, RiseditorSubjective"
									placeholder="Content" id="viewckeditor1"></textarea>
							</div>
							<div class="modal-footer">
								<label id="draftlab" style="margin-right: 567px;"></label>
								<button type="button" class="btn btn-primary"
									data-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="modal fade" id="groupModal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width: 538px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h5 class="modal-title">Investingation</h5>
			</div>
			<div class="modal-body">
				<div id="totalposttime" class="col-md-12-1">
					<table class="table table-bordered" style="margin-top: 0px;">
							<thead>
								<tr>
									<th class="col-sm-1 center">#</th>
									<th class="col-sm-3-1 center">Investingation X-ray</th>
									<th class="col-sm-3-1 center">Date</th>
								</tr>
							</thead>
					</table>
						<table class="table table-striped table-condensed" style="margin-top: 0px;">
							<tbody id="totalX-ray">
							</tbody>
						</table>
				</div>
			</div>
			<div class="modal-footer">
			</div>
		</div>
	</div>
</div>
			
		<!--  -->
			
			<!-- For Assesment and Order Form -->
			<input type='hidden' id='queryType' value='save' />
			<input type="hidden" style="display: none" value="<%=request.getParameter("callFrom")%>" id="callFrom" />
			<div id="patobject" style="display: none;"></div>
			<%-- <div id="pid" style="display: none;"><%=request.getParameter("patientId")%></div> --%>
			<div id="appo_type" style="display: none;"><%=request.getParameter("appo_type")%></div>
			<div id="id" style="display: none;"><%=request.getParameter("id")%></div>
			<div id="updateOn" style="display: none;"><%=request.getParameter("updateFlagOn")%></div>
			<div id="PreTre" style="display: none;"><%=request.getParameter("myObj")%></div>
			<input type="hidden" value="<%=request.getParameter("FunType")%>"
				id="FunType" style="display: none;" />
			<div id="hospDetails" style="display: none;"></div>
			<div id="topic" style="display: none;"></div>
			<div style="display: none;" id="docName">${sessionScope.userName}</div>
			<div id="date" style="display: none;"><%=todays_date%></div>
			<input type="hidden" id="pageType" value="IPD" style="display: none;" />
			<input type="hidden" id="testCount" value="1" style="display: none;" />
			<input type="hidden" id="profileCount" value="1"
				style="display: none;" />
			<input type="hidden" id="pkgCount" value="1" style="display: none;" />
			<input type="hidden" id="labPatId" value="" style="display: none;" />
			<input type="hidden" id="testResultMastId" value=""
				style="display: none;" />
			<input type="hidden" id="CPOE_testId" value="" style="display: none;" />
			<input id="CPOE_TestDetails" style="display: none;" />

			<!-- IPD_DRR for Daily Doctor Round and Order Form -->
			<input type="hidden" id="treStart"
				value="<%=request.getParameter("treStart")%>" style="display: none;" />
			<div id="treatmentbedid" style="display: none;"><%=request.getParameter("treatmentbedid")%></div>
			<div id="doctorBean" style="display: none;"></div>
			<div id="DRTDetails" style="display: none;"></div>

			<!--Added by sagar -->
			<input id="deptid" type="hidden"
				value="<%=request.getParameter("deptid") %>"
				style="display: none;" />
			<input id="tdate" type="hidden"
				value="<%= todays_dateOF%>"
				style="display: none;" />
			
			<input id="drid" type="hidden"
				value="0"
				style="display: none;" />
			<input id="tid" type="hidden"
				value="<%=request.getParameter("treatmentId")%>"
				style="display: none;" />
			<input id="pid" type="hidden"
				value="<%=request.getParameter("patientId")%>"
				style="display: none;" />
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
			<div id="divPatId" style="display: none;"><%=request.getParameter("myObj")%></div>
			<div id="historyDetails" type="hidden" style="display: none;"></div>
			
			<input type="hidden" name="tIddI" id="tIddI" value="0">
		<input type="hidden" name="pIddI" id="pIddI" value="0">
			
		<input type="hidden" name="tIdd" id="tIdd" value="0">
		<input type="hidden" name="pIdd" id="pIdd" value="0">
		<input id="deptId" type="hidden" value='1' />
			
<!-- For IPD_BedWard -->
		<input type="hidden" value="0" id="idLabResult" />
		<div id="testDetails" style="display: none;"></div>
		<input type="hidden" id="treStart" value="0"/>
		<input type="hidden" id="sobobjData" value="0"/>
		<input type="hidden" id="pid2" value="0"/>
		<input type="hidden" id="tid2" value="0"/>
		<input type="hidden" id="pid1" value=""/>
		<input type="hidden" id="tid1" value=""/>
		<!--Added by Laxman  -->
		<input id='testmasterId' type='hidden' name='testmasterId' value='0' />
		<input id='labReqSlvId' type='hidden' name='labReqSlvId' value='0' />
		<input id='subSerId' type='hidden' name='subSerId' value='0' />
		<div id="testDetails" style="display: none;"></div>
		<input id='isPackageFlag' type='hidden' name='isPackageFlag' value='' />
		<div id="chartObj" style="display: none;"></div>
		<div id="DIC" style="display: none;"></div>
		
	<!-- Touheed Dynamic Popup @date:13-Dec-2017 @js: labresult.js-->
		<div id="labReqNoPop" class="modal fade in" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content col-md-12"
							style="margin-top: 30px; margin-left: 0px;">
							<div class="modal-header" id ="labReqPopHead">
							
							</div>
							<div class="modal-body" id="labReqBody">
							</div>
				</div>
			</div>
		</div>
	<!-- Touheed Dynamic Popup  @date:13-Dec-2017 @js: labresult.js-->
	
	<!-- Laxman Dynamic Compare Popup  @date:26-Feb-2018-->
				<div id="iPopupCompare" class="modal fade in" tabindex="-1">
					
				</div>	
				
	<!-- Test Template Added by Laxman. -->
	
	<!-- Kishor Ipd nursing chart Popup  @date:10-April-2018-->
				<div id="iPopupNursing" class="modal fade in" tabindex="-1">
					
				</div>			
				
								
	<!-- Test Template Modal -->
				<div id="viewLabTestTemplate" class="modal fade" role="dialog">
							<div class="modal-dialog">
								<div class="panel panel-default col-md-12-1"
									style="margin-top: 0px; height: 600px;">
					
					<div style="margin-top: 9px;" class="col-md-12-1">

									<div class="col-md-5-1" style="margin-left: 10px;">
										 <div class="col-md-5-1 form-group" style="margin-top: 10px;">Template List</div>
										<div class="col-md-6-1"  style="margin-top: 10px;">
											<select id="selRisTempList" name="selRisTempList"
												style="margin-top: 0px;"
												class="col-md-11-1 form-control input-SmallText ">
												<option onclick="setNewCustomizeTemp()" value="0">NewTemplate</option>
											</select> <input type="hidden" name="idTempMast" value="0"
												id="idTempMast">
										</div>
									</div>
									<div class="col-md-5-1" style="margin-left: 10px;">
										<div class="col-md-6-1 form-group"  style="margin-top: 10px;">
											Template Name<b style="color: red; padding-left: 3px;">*</b>
										</div>
										<div class="col-md-6-1"  style="margin-top: 10px;">
											<input type="text" disabled="disabled"
												class="col-md-11-1 form-control input-SmallText " value=""
												style="margin-top: 0px;" id="iTestTemplateName" >
										</div>
									</div>
								<div class="pull-right">
								<!-- <button onclick="savePatientTestTemplate()" title="Save Template" data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-success" data-original-title="Update Test Template">
									<i class="fa fa-save"></i></button> -->
									&nbsp;&nbsp;&nbsp;
								<button aria-label="Close" data-dismiss="modal" class="close" type="button" style="margin-right: 10px;">
									<span aria-hidden="true">x</span>
								</button>
							</div>
								</div>
									<div class="panel-body">
										<div id="move" style="width: 100%; display: none;"
											class="ui-resizable ui-draggable ui-draggable-handle">
											<textarea class="ckeditor ui-widget-content " name="editor1"
												title="Rich Text Editor, editor1" placeholder="Content"
												id="editor1"></textarea>
										</div>
										<div id="historyTemp" style="width: 100%;"
											class="tabbable ui-resizable ui-draggable ui-draggable-handle">
											<ul class="nav nav-tabs">
											</ul>
											<div class="divide-10"></div>
											<div class="tab-content">
												<div ID="testTemplate" class="tab-pane fade in active">
													<textarea class="ckeditor ui-widget-content "
														name="txtEditorTestTemplate"
														title="Rich Text Editor, editorTestTemplate"
														placeholder="Content" id="iEditorTestTemplate"></textarea>
												</div>
										</div>
									</div>
									<div ID="impressionDiv" class="" style="margin-left: 10px;">
										<label>Impressions :</label>
												<textarea name="txtImpression" title="" cols="60" rows="4"
												placeholder="Content" id="iImpression"></textarea>
									</div>
								</div>		
						</div>
				</div>
				</div>
				<!-- /Test Template Modal -->		
		<!--Added by Laxman  -->
	    <input type="hidden" value="<%=session.getAttribute("preTreat")%>" id="preTreat" />
	    <input type="hidden" value="0" id="printtypeforbtn" />
		<input type="hidden" value="0" id="hTestTemplateName" />
		<input type="hidden" value="0" id="hTestTemplate" />
		<input type="hidden" value="0" id="hImpression" />
		<input type="hidden" value="0" id="hID" />
		<input type="hidden" value="insert" id="hQueryType" />
		<input type="hidden" value="0" id="htestId" />			
		<input type="hidden"  id="pathoMngmnt" value="<%=resourceBundleEhat1.getObject("pathologyManagement").toString()%>">		
					
</body>
</html>