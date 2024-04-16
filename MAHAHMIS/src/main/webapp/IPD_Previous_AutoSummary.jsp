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
<title>Auto Discharge Summary</title>
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
<!-- MARKDOWN -->
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-markdown/css/bootstrap-markdown.min.css" />

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
<!-- <script type="text/javascript" src="js/dd_prescription.js"></script> -->
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/operation.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<script type="text/javascript" src="js/ipdTreatment.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript" src="js/ehat_physical_discharge.js"></script>
<script type="text/javascript" src="js/ehat_OPDDoctorsDesk.js"></script>
<script type="text/javascript" src="js/patient_death_summary_report.js"></script>
<!-- <script type="text/javascript" src="js/ivf_autosummary.js"></script> -->
<script type="text/javascript" src="js/IPD_AutoSummary.js"></script>
<script type="text/javascript" src="js/dd_history.js"></script>
<script type="text/javascript" src="js/ipdhistory.js"></script>
<script type="text/javascript" src="js/ipd_treatmentAtdischarge.js"></script>
<script type="text/javascript" src="js/patient_death_summary_report.js"></script>
<script type="text/javascript" src="js/AutoDischargeSummary.js"></script> <!-- Add By Rahul -->
<!-- <script type="text/javascript" src="js/dd_prescription.js"></script>


<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<!-- MARKDOWN -->
<script type="text/javascript"
	src="js/bootstrap-markdown/js/markdown.js"></script>
<script type="text/javascript"
	src="js/bootstrap-markdown/js/to-markdown.js"></script>
<script type="text/javascript"
	src="js/bootstrap-markdown/js/bootstrap-markdown.min.js"></script>

<!-- Auto-Suggestion 3/12/2014-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>
<!-- BOOTSTRAP WYSIWYG -->
<script type="text/javascript" src="js/bootstrap-wysiwyg/jquery.hotkeys.min.js"></script>
<script type="text/javascript" src="js/bootstrap-wysiwyg/bootstrap-wysiwyg.min.js"></script>
<!-- CKEDITOR -->
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>


<script>
	jQuery(document).ready(function() {
		App.setPage("IPD_DischargeAutoSummary"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		})

	});
</script>

<style type="text/css">
.centered {
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	text-align: center;
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

<script type="text/javascript">
	onload = function() {
		<%ResourceBundle resourceBundleEhat1 = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");%>
		fetchAutoDischargeSummery();
		getPatientDataByTreatmentId2(<%=request.getParameter("treatmentId")%>); //Added by sagar
		getConsultantDrName(<%=request.getParameter("treatmentId")%>);

		//added by vishant
		getIpdPatientHeaderInfoOnIPD2(<%=request.getParameter("treatmentId")%>);
		checkDeathStatus();
		FetchAdmissionNote();
		//Added BysPooja
		<%--  getPatientBedHall(<%=request.getParameter("treatmentId")%>); --%>
		$("#disnote").addClass("anchorActive");
		var flow =""+'<%=resourceBundleEhat1.getObject("shraddha").toString()%>'+"";
		if(flow=="on"){
			$("#print1").hide();
			$("#print2").hide();
			$("#print3").hide();}
		var lang = $("#language").html();
		if (lang == "Marathi") {
			// $("#instruction").html($("#InstructionListMarathi").html());
		} else {
			// $("#instruction").html($("#InstructionListEnglish").html());
		}
		
		var flow1 =""+'<%=resourceBundleEhat1.getObject("rising").toString()%>'+"";

		 if(flow1=="on"){
			 $("#printt").hide();
		 }

		/* prep. */
		fetchPreperationsList("DoctorDesk");

		/* prescription instruction */
		fectchAllPrescriptionInstruction();

		/* unit */
		fetchUnitTypeList("DoctorDesk");

		

		/* route */
		//fetchAllMedicationMaster("RouteType");

		/****************fetchPreperationsList*****************/
		fetchPreperationsList("DoctorDesk");
		//Diagnosis
		showAssessmentTemp();
		//Admission note
		showPatientAdmissionNote("dischargesummary");
		//Investigation
		//fetchTestDashboard();
		//Medicine
		//featchOrderFormByDate('previous');
		//Medicine
		//featchOrderFormByDate();
		//Previous Treatment
		//featchTreatmentAtDischarge();
		//OT notes
		//fetchOTNotesByTreatmentId();

		/******************update discharge date ****************/
		//getPatientDischargeDate();
		
		/******************new FetchDischargeAutoSummary**********************/
		//FetchDischargeAutoSummary();
		
		/**********************Fetch IPD History**************************/
	//	fetchAddIPDHistory("IPD_Previous_AutoSummary");
		display('IPD_Previous_AutoSummary');
		
		/*Fetch OT Data*/
		fetchCustomizeTemplateList();
		fetchOperationsData();
		setTemplateFunc();
		fetchOTNotesData();
		setPatientInfoPrevDischareSummary("Previous_Discharge_Summary");
		fetchipddetailsdrdesk("AutoDischarge");
        savefollowUpForPatient('FETCH');

		//getDoctornameForCommonTemp2();
	};
</script>


</head>
<body>

	<c:if test="${sessionScope.userType != null }">

		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->
			<%
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
							"dd/MM/yyyy");
					String todays_date = formatter.format(currentDate.getTime());
					java.text.SimpleDateFormat formatter1 = new java.text.SimpleDateFormat(
							"dd-MM-yyyy");
					String todays_date1 = formatter1.format(currentDate.getTime());
			%>
			<%@include file="left_menu_IPDMain.jsp"%>
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
											<li>Date : <%=todays_date1%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="IPD_Dashboard.jsp">IPD</a></li>
											<li>IPD Discharge Summary</li>
											<div class="pull-right">
											<!-- 	<button class="btn btn-xs btn-success"
													id="saveDischargeSummeryButton"
													data-toggle="tooltip" data-placement="left" title="Save IPD Discharge Summary "
													onclick="saveAutoDischargeSummery()">
													<i class = "fa fa-save"></i>
													</button> -->
												<button id="printt" class="btn btn-xs btn-warning"
												data-toggle="tooltip" data-placement="left" title="Print "
													onclick="AutoDischargeSummaryPrint()">
													<i class = "fa fa-print"></i>
													</button>
														<button  id="print1" onclick="DisSummaryLangPopUp()" title="" data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-warning" data-original-title="Print ">
													<i class="fa fa-print"></i>
												</button>
												<button   id="print2" onclick="ShowSecondPrintPopUp()" title="" data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-warning" data-original-title="Print ">
													<!-- onclick="AutoDischargeSummaryPrint()" -->
													<i class="fa fa-print"></i>
												</button>
								
	<button   id="print3" onclick="showDischargePrintPopup();" title="" data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-warning" data-original-title="Print">
														<i class="fa fa-print"></i>
												</button>
												<button class="btn btn-xs btn-danger"
												data-toggle="tooltip" data-placement="left" title="Discard "
													onclick="refreshTrue();">
													<i class = "fa fa-refresh"></i>
													</button>
											</div>
										</ul>

									</div>
								</div>
								<!-- <div id="commonPatInfo" class="col-md-12-1"
									style="margin-top: -21px;"></div> -->
									
									<div class="alert alert-block alert-info fade in" style="padding-top:3%;margin-top:3%">
						
							<div class="row">
								<div class="col-md-1" style="margin-top:-30px;">
									<img id="patImg" style="width: 100%;height: 45px" class="img-responsive" src="ehat-design/img/profile/avatar.jpg" alt="">
								</div>

								<div class="col-md-11" style="padding-top:0%">

									<div class="col-md-12">

										<div class="col-md-2">
											<div class="form-group">
											<input type="hidden"  id="pt_Id" value="0">
											<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
											<input type="hidden"  id="tr_Id" value="<%=request.getParameter("treatmentId")%>">
											<input type="hidden"  id="bill_Id" value="0">
												<label class="control-label lblBold">UHID :</label>  <label id="patientId" class="control-label"></label> 
											</div>
										</div>

										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Age :</label> <label id="age" class="control-label"></label>
											</div>
										</div>

										<div class="col-md-4" style="">
											<div class="form-group">
												<label class="control-label lblBold">Patient Name :</label>
												<label id="patientName" class="control-label"></label>

											</div>
										</div>

										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Ipd No :</label> <label id="ipdNo" class="control-label"> IPD-D</label>

											</div>
										</div>

										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">BillNo: </label>  <label id="billNo" class="control-label"></label> 

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
												<label id="billCategoty" class="control-label"> </label>

											</div>
										</div>

										<div class="col-md-4" >
											<div class="form-group">
												<label class="control-label lblBold">Consulting Dr:</label> <label id="consultingDoctorr" class="control-label"> </label>

											</div>
										</div>
										
										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Treatment Id :</label> <label id="" class="control-label"> <%=request.getParameter("treatmentId")%></label>
											</div>
										</div>
										
										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">DOA:</label> <label id="doa" class="control-label"> DOA-D</label>

											</div>
										</div>

										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">DOD :</label> <label id="dod" class="control-label"> DOD-D</label>

											</div>
										</div>
										
										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Corporate :</label> <label id="corporate" class="control-label"> </label>

											</div>
										</div>
										
										<div class="col-md-2">
											<div class="form-group">
                                                 <label class="control-label lblBold">Ref Dr:</label> <label id="refDoctor" class="control-label"></label>                                                      
                                             </div>
										</div>
										
										<div class="col-md-4">
                                              <div class="form-group">
                                                    <label class="control-label lblBold">Hall(HType):</label> <label id="hallName" class="control-label"></label>   
                                              </div>
                                    	</div>	
										
									</div>
								</div>
							</div>
						</div>
							
									
							</div>
							<!-- /Common -->

							<div class="divide-40"></div>
							<div class="col-md-12-1" style="">

								<div class="col-md-4-1" style="">
									<label class="TextFont col-md-4-1">Discharge Date <b
										style="color: red;">*</b></label><input type="text"
										id="discharge_date" readonly="readonly"
										class="form-control input-SmallText col-md-6-1"></input>
								</div>

								<div class="col-md-4-1" style="">
									<label class="TextFont col-md-4-1">Discharge Time <b
										style="color: red;">*</b></label><input type="text"
										id="discharge_Time" readonly="readonly"
										class="form-control input-SmallText col-md-6-1"></input>
								</div>

								<div class="col-md-4-1" style="">
									<label class="TextFont col-md-4-1">Type of Discharge <b
										style="color: red;">*</b></label> <select name="discharge_Type"
										id="discharge_Type"
										class="form-control input-SmallText TextFont col-md-6-1" disabled="disabled">
										<option value="select">-SELECT-</option>
										<option value="Discharge">Discharge</option>
										<option value="Transferred">Transferred</option>
										<option value="DAMA">DAMA</option>
										<option value="Absconded">Absconded</option>
										<option value="Dead">Dead</option>

									</select>
								</div>
							</div>
							<div class="divide-10"></div>
							<!-- Start Tab UI -->
							<div class="col-md-12-1"
								style="margin-top: 5px; margin-left: 0px;">
								<!-- Start BOX -->
								<div class="box border col-md-12-1">
									<div class="divide-10"></div>
									<div class="tabbable col-md-12-1">
										<ul class="nav nav-tabs">

											<li class="active"><a data-toggle="tab" href="#Summary"><span
													class="hidden-inline-mobile">Summary</span></a></li>
											<li><a data-toggle="tab" href="#History" onclick="getOPDPatientHistoryByTreatment();"><span
													class="hidden-inline-mobile">History</span></a></li>
											<li><a data-toggle="tab" href="#Investigation"><span
													class="hidden-inline-mobile">Investigation</span></a></li>
											<li><a data-toggle="tab" href="#Treatment" onclick="getAllPrescriptionsByTreatmentId2(<%=request.getParameter("treatmentId")%>,<%=session.getAttribute("uId")%>)"><span
													class="hidden-inline-mobile">Treatment</span></a></li>
											<li><a data-toggle="tab" href="#OTNotes" onclick="fetchOTNotesData('autoDischarge')"><span
													class="hidden-inline-mobile">OT Notes</span></a></li>
											<li><a data-toggle="tab" href="#Condition"><span
													class="hidden-inline-mobile" >Condition on Discharge</span></a></li>
											<li ><a data-toggle="tab" href="#TreatmentDischarge" onclick="getTreatmentAtDischarge();"><span
													class="hidden-inline-mobile" >Treatment at Discharge</span></a></li>
											<li id="nicu"><a data-toggle="tab" href="#NICU"><span
													class="hidden-inline-mobile" onclick="showIPDNO()">PAEDIATRIC
														DEPT (NICU)</span></a></li>
											<li id="paedDept"><a data-toggle="tab" href="#PAED"><span
													class="hidden-inline-mobile">PAEDIATRIC DEPT </span></a></li>
											<li id="causeOfDeath"><a data-toggle="tab" href="#CauseOfDeath" ><span
													class="hidden-inline-mobile">Cause of Death </span></a></li>
											<li id="deathSummary1" onclick="getListOfDeathSummaryReportByTreatmentId();"><a data-toggle="tab" href="#deathSummary" ><span
													class="hidden-inline-mobile"> Death Summary </span></a></li>				
										</ul>
										<div class="divide-10"></div>

										<div id="ipdAutoDischargeSummaryHeadDiv" class="tab-content">

											<div ID="Summary" class="tab-pane fade active in">
												<!-- ====== Row: 1 ====== -->
												<div class="box border green" style="margin-left: 20px; margin-right: 20px;">
									<div class="box-title">
										<h4><i class="fa fa-pencil-square-o"></i>Admission Note</h4>
										<div class="tools hidden-xs">
											<a class="config" data-toggle="modal" href="#box-config">
												<i class="fa fa-cog"></i>
											</a>
											<a class="reload" href="javascript:;">
												<i class="fa fa-refresh"></i>
											</a>
											<a class="collapse" href="javascript:;">
												<i class="fa fa-times"></i>
											</a>
										</div>
									</div>
									<div class="box-body">
										<div id="alerts"></div>
										<div style="height: 250px; width: 1155px; overflow: auto;">
										 <textarea class="ckeditor ui-widget-content" name="adNote"
												title="Admission Note" placeholder="Content" 
												id="adNote" style="border: none; width: 1072px; height: 160px;" disabled="disabled"></textarea>
										</div>
										
										
									</div>
								</div>
												<!-- ====== End Row: 1 ====== -->
												<!-- ====== Row: 2 ====== -->
												<div id="row2" class="col-sm-12-1"
													style="margin-top: 10px; width: 98%; margin-left: 1%;">
													<div class="col-md-12-1">
														<div class="box-body col-md-12-1"
															style="padding-top: 10px; padding-bottom: 0px">
															<div class="form-group  box border col-md-12-1">
																<!-- Start Header for New Edit Delete Option -->
																<div class="col-md-12-1"
																	style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
																	<h6 style="margin-left: 10px;">Provisional
																		Diagnosis</h6>
																</div>
																<!-- End Header for New Edit Delete Option -->
																<div class="col-sm-12-1" style="margin-top: 0px;">
																	<table
																		class="table table-bordered table-condensed header-fixed cf' style='width : 1090px; margin-top: 10px;">
																		<thead>
																			<tr>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px;"><div class="TextFont">#</div></th>
																				<th class="col-md-2-1"
																					style="height: 21.5px; padding-left: 50px;"><div
																						class="TextFont">Diagnosis</div></th>
																				<th class="col-md-2-1 center"
																					style="height: 21.5px; padding-left: 0px;"><div
																						class="TextFont">Diagnosis Description</div></th>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px; padding-left: 0px;"><div
																						class="TextFont">ICD 10 Code</div></th>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px; padding-left: 0px;"><div
																						class="TextFont">Date</div></th>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px; padding-left: 0px;"><div
																						class="TextFont">Diagnosis Type</div></th>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px; padding-left: 0px;"><div
																						class="TextFont">Diagnosed By</div></th>
																				<th class="col-md-2-1 center"
																					style="height: 21.5px; padding-left: 0px;"><div
																						class="TextFont">Comment</div></th>
																			</tr>
																		</thead>
																	</table>
																	<div id="flip-scroll" class="col-sm-12-1"
																		style="overflow-y: scroll; height: 111px; maxheight: auto; margin-top: -21px;">
																		<table class="table table-striped table-condensed cf">
																			<tbody id="assesmentContentProvisionalDischarge">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<!-- ======End Row: 2 ====== -->
												<!-- ====== Row: 3 ====== -->
												<div id="row3" class="col-sm-12-1"
													style="margin-top: 10px; width: 98%; margin-left: 1%;">
													<div class="col-md-12-1">
														<div class="box-body col-md-12-1"
															style="padding-top: 10px; padding-bottom: 0px">
															<div class="form-group box border col-md-12-1"
																style="padding-top: 0px; margin-bottom: 10px;">
																<!-- Start Header for New Edit Delete Option -->
																<div class="col-md-12-1"
																	style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
																	<h6 style="margin-left: 10px;">Confirmed Diagnosis</h6>
																</div>
																<!-- End Header for New Edit Delete Option -->
																<div class="col-sm-12-1" style="margin-top: 0px;">
																	<table
																		class="table table-bordered table-condensed header-fixed cf' style='width : 1090px; margin-top: 10px;">
																		<thead>
																			<tr>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px;"><div class="TextFont">#</div></th>
																				<th class="col-md-2-1 center"
																					style="height: 21.5px; padding-left: 5px;"><div
																						class="TextFont">Diagnosis</div></th>
																				<th class="col-md-2-1 center"
																					style="height: 21.5px; padding-left: 0px;"><div
																						class="TextFont">Diagnosis Description</div></th>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px; padding-left: 0px;"><div
																						class="TextFont">ICD 10 Code</div></th>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px; padding-left: 0px;"><div
																						class="TextFont">Date</div></th>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px; padding-left: 0px;"><div
																						class="TextFont">Diagnosis Type</div></th>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px; padding-left: 0px;"><div
																						class="TextFont">Diagnosed By</div></th>
																				<th class="col-md-2-1 center"
																					style="height: 21.5px; padding-left: 0px;"><div
																						class="TextFont">Comment</div></th>
																			</tr>
																		</thead>
																	</table>
																	<div id="flip-scroll" class="col-sm-12-1"
																		style="overflow-y: scroll; height: 111px; maxheight: auto; margin-top: -21px;">
																		<table class="table table-striped table-condensed cf">
																			<tbody id="assesmentContentConfirmaedDischarge">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<!-- ======End Row: 3 ====== -->
											</div>

											<!-- <div ID="History" class="tab-pane fade in">
												<div
													style="margin-top: 10px; height: 400px; margin-left: 3%;">
													<div class="col-md-12-1" style="padding-right: 8px;">
														<div class="divide-10"></div>
														<label class="TextFont">Presenting Symptoms :</label>
													</div>
													<div>
														<textarea id='preSymp' rows='4' cols='175' disabled="disabled" ></textarea>
													</div>
													<div class="divide-10"></div>
													<div class="col-md-12-1" style="padding-right: 8px;">
														<div class="divide-10"></div>
														<label class="TextFont">Clinical Findings :</label>
													</div>
													<div>
														<textarea id='cliFind' rows='4' cols='175' disabled="disabled" ></textarea>
													</div>
												</div>
											</div> -->
											
												<!-- Start Code for #History(Date:-08/10/2016) GUI -->
																			<!-- start history model -->
											<div id="History" class="tab-pane fade">
												<div style="padding-top: 0px;" class="col-md-12-1"
													id="historyRow"></div>
												<div style="margin-top: -9px; margin-left: 5px;"
													class="tabbable tabs-left col-md-12-1">

													<div style="margin-top: 0px;"
														class="tab-content col-md-12-1">

														<!-- start chiefComplaints model -->
														<div class="tab-pane fade active in col-md-12-1"
															id="chiefComplaints">
															<div style="margin-top: 8px;"
																class="tab-content col-md-12-1">
																<div style="padding-left: 30%; padding-top: 5px;"
																	class="col-sm-12-1">
																	<div style="margin-top: 15px;" class="col-sm-3-1">
																		<label class="TextFont">Medical Officer Name.</label>
																	</div>
																	<div style="padding-left: -5%; margin-top: 15px;"
																		class="col-sm-3-1">
																		<input type="text" value="" readonly="readonly"
																			name="name" id="medOffName"
																			class="form-control input-SmallText">
																	</div>
																	<div style="margin-top: 15px; padding-left: 3%;"
																		class="col-sm-2-1">
																		<label class="TextFont">MRN No.</label>
																	</div>
																	<div style="margin-top: 15px;" class="col-sm-3-1">
																		<input type="text" value="MS16170000001483"
																			readonly="readonly" name="mrn" id="mrn"
																			class="form-control input-SmallText">
																	</div>
																</div>
																<div style="margin-top: -32px; margin-left: 94%;"
																	class="col-sm-1-1">
																	<div class="divide-10"></div>
																<!-- 	<button onclick="saveAddIpdHistory()"
																		title="Save History " data-placement="left"
																		data-toggle="tooltip" id="saveAddIpdHistory"
																		class="btn btn-xs btn-success"
																		style="margin-left: 2px;">
																		<i class="fa fa-save"></i>
																	</button> -->
																	<button onclick="IPDHistoryPrint();" title="Print "
																		data-placement="left" data-toggle="tooltip"
																		class="btn btn-xs btn-warning coversheetBtn">
																		<i class="fa fa-print"></i>
																	</button>
																</div>
															</div>
															<div>
																<label class="TextFont">CHIEF COMPLAINTS :</label>
																<div>
																	<div style="margin-top: 25px;" class="col-sm-12-1"
																		id="row_1"></div>
																	<table style="margin-top: 25px; width: 100%;"
																		class="table table-bordered">
																		<thead>
																			<tr>
																				<th style="height: 21.5px; font-size: &amp;quot;"
																					class="col-sm-1-1 center"><label
																					class="TextFont">#</label></th>
																				<th style="height: 21.5px; font-size: &amp;quot;"
																					class="col-sm-4-1 center"><label
																					class="TextFont">Chief Complaints</label></th>
																				<th style="height: 21.5px; font-size: &amp;quot;"
																					class="col-sm-6-1 center"><label
																					class="TextFont"> Duration</label></th>
																				<th style="height: 21.5px; width: 25px;"><input
																					type="button" value="+"
																					onclick="createDivIPDHistory()"> <input
																					type="button" value="-"
																					onclick="removeChifComp('RowCount')"></th>
																			</tr>
																		</thead>
																	</table>
																	<div
																		style="width: 100%; margin-top: -22px; height: 130px; overflow-y: scroll; border: 1px solid lightgrey;">
																		<table
																			class="table table-condensed table-bordered table-stripped cf">
																			<tbody id="historyDiv"></tbody>
																		</table>
																	</div>
																</div>
																<div style="padding-left: 1%; margin-top: 2%;"
																	class="col-md-10-1">
																	<label class="TextFont">Negative History:</label>
																	<textarea class="" cols="52" rows="3"
																		id="clinicalFinding"></textarea>
																</div>
															</div>
														</div>

														<!-- end chiefComplaints model -->



														<!-- start pastMedHistory model -->
														<div class="tab-pane fade active in col-md-12-1"
															id="pastMedHistory">
															<div style="margin-top: 8px;"
																class="tab-content col-md-12-1"></div>
															<div style="margin-top: 10px;" class="col-sm-12-1"
																id="row_1">
																<hr
																	style="height: 0px; border-top: 1px solid; margin: 1em 0; width: 99%">
															</div>
															<div
																style="font: bold; padding-bottom: 1%; padding-top: 2%; padding-left: 2%;"
																class="col-md-5-1 form-group">
																<label>PAST/PERSONAL/FAMILY HISTORY :</label>
																<div
																	style="width: 100%; height: 20%; font-family: Tahoma, Geneva, sans-serif; padding-top: 1%; font-size: 13px; float:;"
																	id="tableContent">

																	<table cellspacing="0" cellpadding="0"
																		style="border: 1px solid lightgrey;">
																		<tbody>
																			<tr>
																				<td align="center"
																					style="height: 35px; border: 1px solid lightgrey;"></td>
																				<td align="center"
																					style="height: 35px; border: 1px solid lightgrey;">Yes/No</td>
																				<td align="center"
																					style="height: 35px; border: 1px solid lightgrey;">Duration</td>
																			</tr>
																			<tr>
																				<td width="30%" align="center"
																					style="border: 1px solid lightgrey;">DM</td>
																				<td width="20%"
																					style="border: 0.2px solid lightgrey;"><input
																					type="checkbox" id="chkDm"
																					style="width: 105%; border: 0.2px solid lightgrey;"
																					name=""></td>
																				<td><input type="text" id="txtDm"
																					style="width: 100%; border: 0.2px solid lightgrey;"
																					name=""></td>

																			</tr>
																			<tr>
																				<td width="30%" align="center"
																					style="border: 1px solid lightgrey;">HTN</td>
																				<td style="border: 0.2px solid lightgrey;"><input
																					type="checkbox" id="chkHtn"
																					style="width: 105%; border: 0.2px solid lightgrey;"
																					name=""></td>
																				<td><input type="text" id="txtHtn"
																					style="width: 100%; border: 0.2px solid lightgrey;"
																					name=""></td>
																			</tr>
																			<tr>
																				<td width="30%" align="center"
																					style="border: 1px solid lightgrey;">IHD</td>
																				<td style="border: 0.2px solid lightgrey;"><input
																					type="checkbox" id="chkIhd"
																					style="width: 105%; border: 0.2px solid lightgrey;"
																					name=""></td>
																				<td><input type="text" id="txtIhd"
																					style="width: 100%; border: 0.2px solid lightgrey;"
																					name=""></td>
																			</tr>
																			<tr>
																				<td width="30%" align="center"
																					style="border: 1px solid lightgrey;">BA/COPD</td>
																				<td style="border: 0.2px solid lightgrey;"><input
																					type="checkbox" id="chkBaco"
																					style="width: 105%; border: 0.2px solid lightgrey;"
																					name=""></td>
																				<td><input type="text" id="txtBaco"
																					style="width: 100%; border: 0.2px solid lightgrey;"
																					name=""></td>

																			</tr>
																			<tr>
																				<td width="30%" align="center"
																					style="border: 1px solid lightgrey;">OTHER</td>
																				<td style="border: 0.2px solid lightgrey;"><input
																					type="checkbox" id="chkOther"
																					style="width: 105%; border: 0.2px solid lightgrey;"
																					name=""></td>

																				<td><textarea id="txtOther"
																						style="width: 100%; border: 0.2px solid lightgrey;"></textarea></td>
																			</tr>
																		</tbody>
																	</table>
																</div>
															</div>

															<!-- end pastMedHistory model -->


															<!-- start PastPresentFamilyHistory model -->

															<div id="PastPresentFamilyHistory" class="col-md-6-1"
																style="padding-left: 0%; margin-top: 1%;">
																<div class="col-md-12-1">
																	<div style="padding-left: 0%; margin-top: 2%;"
																		class="col-md-6-1">
																		<label class="TextFont">Past Surgical History:</label>
																		<textarea class="" cols="39" rows="2"
																			id="pastSurgHistory"></textarea>
																	</div>
																	<div style="padding-left: 10%; margin-top: 2%;"
																		class="col-md-6-1">
																		<label class="TextFont">Medications:</label>
																		<textarea class="" cols="39" rows="2" id="medications"></textarea>
																	</div>
																</div>

																<div class="col-md-12-1" style="margin-top: 3%;">
																	<div class="col-md-6-1" style="padding-left: 0%;">
																		<label class="TextFont">GYNAE/OBS History :</label>
																		<textarea class="" cols="39" rows="2" id="gynac"></textarea>
																	</div>
																	<div class="col-md-6-1" style="padding-left: 10%;">
																		<label class="TextFont">Any allergies or
																			adversedrug reactions?:</label>
																		<textarea class="" cols="39" rows="2"
																			id="drugReaction"></textarea>
																	</div>
																</div>

																<div class="col-md-12-1" style="margin-top: 3%;">
																	<div class="col-md-6-1" style="padding-left: 0%;">
																		<label class="TextFont">Family History:</label>
																		<textarea class="" cols="39" rows="2" id="familyHis"></textarea>
																	</div>
																	<div class="col-md-6-1" style="padding-left: 10%;">
																		<label class="TextFont">Personal History:</label>
																		<textarea class="" cols="39" rows="2" id="perHistory"></textarea>
																	</div>
																</div>

															</div>
														</div>
														<!-- end PastPresentFamilyHistory model -->									

														<!-- start OnExaminations model -->

														<div class="tab-pane fade active in col-md-12-1"
															id="OnExaminations">
															<div style="margin-top: -17px;" class="col-sm-12-1"
																id="row_1">
																<hr style="height: 0px; border-top: 1px solid; margin: 1em 0; width: 99%">
															</div>
															<div>
																<label class="TextFont">ON EXAMINATION :</label>
																<div>
																	<div style="padding-left: 15px;"
																		class="form-group Remove-Padding col-md-4-1">
																		<div class="divide-10"></div>
																		<label class="TextFont">VITALS:</label>
																		<div style="margin-top: 0px;"
																			class="form-group Remove-Padding col-md-12-1">
																			<label class="TextFont">Temperature:</label> <input
																				type="text" class="form-control input-SmallText"
																				placeholder="Temparature" name="temparature"
																				id="temparature">
																		</div>
																		<div style="margin-top: 5px;"
																			class="form-group Remove-Padding col-md-12-1">
																			<label class="TextFont">Pulse:</label> <input
																				type="text" class="form-control input-SmallText"
																				placeholder="Pulse" name="pulse" id="pulse">
																		</div>
																		<div style="margin-top: 5px;"
																			class="form-group Remove-Padding col-md-12-1">
																			<label class="TextFont">BP :</label> <input
																				type="text" class="form-control input-SmallText"
																				placeholder="BP" name="bp" id="bp">

																		</div>
																	</div>
																	<div style="padding-left: 15px;"
																		class="form-group Remove-Padding col-md-4-1">
																		<div class="divide-10"></div>
																		<label class="TextFont">General Exam:</label>
																		<div class="divide-10"></div>
																		<div class="col-md-12-1">
																			<div style="margin-top: 0px;"
																				class="form-group Remove-Padding col-md-12-1">
																				<label class="TextFont">Pallor:</label> <input
																					type="text" class="form-control input-SmallText"
																					placeholder="Pallor" name="Pallor" id="pallor">
																			</div>
																			<div style="margin-top: 5px;"
																				class="form-group Remove-Padding col-md-12-1">
																				<label class="TextFont">Clubbing:</label> <input
																					type="text" class="form-control input-SmallText"
																					placeholder="Clubbing" name="Clubbing"
																					id="clubbing">
																			</div>
																			<div style="margin-top: 5px;"
																				class="form-group Remove-Padding col-md-12-1">
																				<label class="TextFont">Lymph Adenopathy:</label> <input
																					type="text" class="form-control input-SmallText"
																					placeholder="Lymph Adenopathy "
																					name="Lymph Adenopathy" id="lymph">
																			</div>
																		</div>
																	</div>
																	<div style="padding-left: 15px; padding-top: 20px;"
																		class="form-group Remove-Padding col-md-4-1">
																		<div class="divide-10"></div>
																		<div style="margin-top: 0px;"
																			class="form-group Remove-Padding col-md-12-1">
																			<label class="TextFont">Icterus:</label> <input
																				type="text" class="form-control input-SmallText"
																				placeholder="Lcterus" name="Lcterus" id="lcterus">
																		</div>
																		<div style="margin-top: 5px;"
																			class="form-group Remove-Padding col-md-12-1">
																			<label class="TextFont">Oedema:</label> <input
																				type="text" class="form-control input-SmallText"
																				placeholder="Oedema" name="Oedema" id="oedema">
																		</div>
																	</div>
																</div>
															</div>
														</div>

														<!-- end OnExaminations model -->

														<!-- start SystematicExaminations model -->

														<div class="tab-pane fade active in col-md-12-1 "
															id="SystematicExaminations">
															<div style="margin-top: 15px;" class="col-sm-12-1"
																id="row_1">
																<hr
																	style="height: 0px; border-top: 1px solid; margin: 1em 0; width: 99%">
															</div>
															<div>
																<label class="TextFont">SYSTEMATIC EXAMINATIONS
																	:</label>
																<div>
																	<div style="left: 15px; margin-top: 1%;"
																		class="col-md-12-1">
																		<div style="margin-top: 0px;"
																			class="form-group Remove-Padding col-md-3-1">
																			<label class="TextFont">CVS:</label> <input
																				type="text" class="form-control input-SmallText"
																				placeholder="CVS" name="CVS" id="cvs">
																		</div>
																		<div style="margin-top: 0px; margin-left: 45px;"
																			class="form-group Remove-Padding col-md-3-1">
																			<label class="TextFont">R/S:</label> <input
																				type="text" class="form-control input-SmallText"
																				placeholder="R/S" name="R/S " id="rs">
																		</div>
																		<div style="margin-top: 0px; margin-left: 45px;"
																			class="form-group Remove-Padding col-md-3-1">
																			<label class="TextFont">PA:</label> <input
																				type="text" class="form-control input-SmallText"
																				placeholder="PA" name="PA" id="pa">
																		</div>
																		<div style="margin-top: 0px; margin-left: 45px;"
																			class="form-group Remove-Padding col-md-3-1">
																			<label class="TextFont">CNS:</label> <input
																				type="text" class="form-control input-SmallText"
																				placeholder="CNS" name="CNS" id="cns">

																		</div>
																	</div>
																	<div style="padding-right: 8px; margin-top: 3%;"
																		class="col-md-12-1">
																		<div class="divide-10"></div>
																		<div class="col-md-6-1">
																			<label class="TextFont">Local Examinations:</label>
																			<textarea class="" cols="40" rows="3" id="localExm"
																				style="margin-left: 3%;"></textarea>
																		</div>
																		<div style="padding-left: 0.8%;" class="col-md-6-1">
																			<label class="TextFont">Investigation
																				Reports:</label>
																			<textarea class="" cols="40" rows="3" id="invsRep"
																				style="margin-left: 1%;"></textarea>
																		</div>
																	</div>
																	<div style="padding-right: 8px; margin-top: 3%;"
																		class="col-md-12-1">
																		<div class="divide-10"></div>
																		<div class="col-md-6-1" style="display: none;">
																			<label class="TextFont">Provisional
																				Diagnosis:</label>
																			<textarea class="" cols="40" rows="3" id="provDia"
																				style="margin-left: 0%;"></textarea>
																		</div>
																		<div style="padding-left: 0.8%; display: none;"
																			class="col-md-6-1">
																			<label class="TextFont">Treatment Plan:</label>
																			<textarea class="" cols="40" rows="3" id="treatPlan"
																				style="margin-left: 9%;"></textarea>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<!-- End Code for #History GUI -->
                                         <!-- End Code for #History GUI -->

											<div ID="Investigation" class="tab-pane fade in">

												<!-- ====== Row: 1 ====== -->
												<div id="row2" class="col-sm-12-1"
													style="margin-top: 10px; width: 98%; margin-left: 1%;">
													<div class="col-md-12-1">
														<div class="box-body col-md-12-1"
															style="padding-top: 10px; padding-bottom: 0px">
															<div class="form-group  box border col-md-12-1">
																<!-- Start Header for New Edit Delete Option -->
																<div class="col-md-12-1"
																	style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
																	<h6 style="margin-left: 10px;">Investigation</h6>
																</div>
																<!-- End Header for New Edit Delete Option -->
																<div class="col-sm-12-1" style="margin-top: 0px;">
																	<table
																		class="table table-bordered table-condensed header-fixed cf' style='width : 1090px; margin-top: 10px;">
																		<thead>
																			<tr>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px;"><div class="TextFont">#</div></th>
																				<th class="col-md-3-1"
																					style="height: 21.5px; padding-left: 50px;"><div
																						class="TextFont">Particulars/Details</div></th>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px; padding-left: 0px;"><div
																						class="TextFont">Date</div></th>
																				<!-- <th class="col-md-1-1 center"
																					style="height: 21.5px; padding-left: 0px;"><div
																						class="TextFont">Type</div></th> -->
																				<th class="col-md-1-1 center"
																					style="height: 21.5px; padding-left: 0px;"><div
																						class="TextFont">Test</div></th>
																			</tr>
																		</thead>
																	</table>
																	<div id="flip-scroll" class="col-sm-12-1"
																		style="overflow-y: scroll; height: 200px; maxheight: auto; margin-top: -21px;">
																		<table class="table table-striped table-condensed cf">
																	<!--  old-->	<!-- 	<tbody id="dischargeSummaryTemplate"> -->
																	<tbody id="tcpoeservices">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<!-- ======End Row: 1 ====== -->

												<div style="margin-top: 10px; width: 98%; margin-left: 2%;">

													<div class="col-md-12-1">
														<div class="divide-10"></div>
														<label class="TextFont">Special Investigation : </label>
													</div>
													<div>
														<textarea id='specInvest' rows='4' cols='179' disabled="disabled"></textarea>
													</div>
												</div>
												<div class="divide-20"></div>
											</div>

											<div ID="Treatment" class="tab-pane fade in">
												<!-- ====== Row: 1 ====== -->
												<div id="row2" class="col-sm-12-1"
													style="margin-top: 20px; width: 98%; margin-left: 1%;">
													<div class="col-md-12-1">
														<div class="box-body col-md-12-1"
															style="padding-top: 10px; padding-bottom: 0px">
															<div class="form-group  box border col-md-12-1">
																<!-- Start Header for New Edit Delete Option -->
																<div class="col-md-12-1"
																	style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
																	<h6 style="margin-left: 10px;">Medicines</h6>
																</div>
																<!-- End Header for New Edit Delete Option -->
																<div class="col-sm-12-1" style="margin-top: 0px;">
																	<table
																		class="table table-bordered table-condensed header-fixed cf' style='width : 1090px; margin-top: 10px;">
																		<thead>
																			<tr>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px;"><div class="TextFont">#</div></th>
																				<th class="col-md-3-1 center"
																					style="height: 21.5px;"><div class="TextFont">Drug</div></th>
																				<th class="col-md-2-1 center"
																					style="height: 21.5px; padding-left: 0px;"><div
																						class="TextFont">Preparation</div></th>
																				<th class="col-md-3-1 center"
																					style="height: 21.5px; padding-left: 0px;"><div
																						class="TextFont">Instructions</div></th>
																				<th class="col-md-1-1 center"
																					style="height: 21.5px; padding-left: 0px;"><div
																						class="TextFont">Duration</div></th>
																			</tr>
																		</thead>
																	</table>
																	<div id="flip-scroll" class="col-sm-12-1"
																		style="overflow-y: scroll; height: 200px; maxheight: auto; margin-top: -21px;">
																		<table class="table table-striped table-condensed cf">
																			<tbody id="orderFormContentAdministrative">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<!-- ======End Row: 1 ====== -->

												<div style="margin-top: 10px; width: 98%; margin-left: 2%;">
													<div class="divide-10"></div>
													<div class="col-md-12-1" style="padding-right: 8px;">
														<div class="divide-10"></div>
														<label class="TextFont">Risk Factors :</label>
													</div>
													<div>
														<textarea id='riskFact' rows='4' cols='179' disabled="disabled"></textarea>
													</div>
													<div class="divide-10"></div>
													<div class="col-md-12-1" style="padding-right: 8px;">
														<div class="divide-10"></div>
														<label class="TextFont">Complications : </label>
													</div>
													<div>
														<textarea id='complication' rows='4' cols='179' disabled="disabled"></textarea>
													</div>
													<div class="divide-10"></div>
													<div class="col-md-12-1" style="padding-right: 8px;">
														<div class="divide-10"></div>
														<label class="TextFont"> Treatment Given :</label>
													</div>
													<div>
														<textarea id='treatmentGiven' rows='4' cols='179' disabled="disabled"></textarea>
													</div>
												</div>
												<div class="divide-20"></div>
											</div>
											<div ID="OTNotes" class="tab-pane fade in">
												<!-- ====== Row: 1 ====== -->
												<!-- Start Code for #OTNotes GUI -->
											<div id="iOTNotes" class="col-md-12-1 tab-pane fade in">
												<div class="col-md-4-1" style="margin-top: 40px;">
													<div class="form-group Remove-Padding col-md-12-1" style="padding-left: 5%;">
															<div class="col-md-5-1" style="margin-top: 10px;">
																<label class="TextFont">Operation List</label>
															</div>
															<div class="col-md-6-1" style="margin-top: 10px; margin-left: -20px;">
																	<select id="idSelOperationData" name="txtSelOperationData"
																		style="margin-top: 0px;margin-left: 10%;"
																		class="col-md-12-1 form-control input-SmallText" 
																		onchange="fetchOTNotesData('autoDischarge')">
																		<option value="0">Select Operation</option>
																	</select> <input type="hidden" name="txtOperation" value="0"
																		id="idOperation">
															</div>
													</div>
													<div class="form-group Remove-Padding col-md-12-1" style="padding-left: 5%;">
														<div class="col-md-5-1" style="margin-top: 30px;">
															<label for="Estimated Blood Loss" class="TextFont">Estimated
																Blood Loss</label>
														</div>
														<div class="col-md-6-1" style="margin-top: 30px;">
															<input type="text"
																class="form-control input-SmallText capitalise"
																placeholder="Estimated Blood Loss" style="border: 1px solid orange;"
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
																placeholder="Actual Blood Loss" style="border: 1px solid orange;"
																onkeypress="return validateNumberByRegEx(this.id)"
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
																onkeypress="return validateNumberByRegEx(this.id)"
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
																<div class="col-md-2-1 form-group"><label class="TextFont">Template List</label></div>
																<div class="col-md-6-1">
																	<select id="selCustomizeTemp" name="selCustomizeTemp"
																		style="margin-top: 0px;margin-left: 10%;"
																		class="col-md-11-1 form-control input-SmallText " disabled="disabled">
																		<option onclick="setNewCustomizeTemp()" value="0">NewTemplate</option>
																	</select> <input type="hidden" name="idTempMast" value="0"
																		id="idTempMast">
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
																		placeholder="Content" id="editor1" disabled="disabled"></textarea>
																</div>
																<div class="divide-10"></div>
																<div class="tab-content"></div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<!-- End Code for #OTNotes GUI -->
											</div>

											<div ID="Condition" class="tab-pane fade in">
												<div class="col-md-12-1"
													style="margin-top: 10px; width: 98%; margin-left: 2%;">
													<div class="col-md-12-1"
														style="padding-right: 8px; margin-top: 0px;">
														<div class="divide-10"></div>
														<label class="TextFont">Condition At Discharge :</label>
													</div>
													<div>
														<textarea id='condDisc' rows='4' cols='179' disabled="disabled" ></textarea>
													</div>
													<div class="col-md-12-1" style="padding-right: 8px; margin-top: 0px;">
                                                    <div class="divide-10"></div>
                                                    <label class="TextFont">Advised on Discharge :</label>
                                                    </div>
                                                    <div>
                                                    <textarea id="advDisc"  rows='4' cols='179' disabled="disabled"></textarea>
                                                    </div>
													
													<div class="divide-20"></div>
												</div>
											</div>
											<div ID="TreatmentDischarge" class="tab-pane fade in">

												<div class="divide-10"></div>
												<!-- Start Column:2 Row:3 -->
										<div style="margin-top: 3px; height: 14px;" class="col-md-12-1">
																		<div style="margin-top: 5px;" class="col-md-5-1" id="divfollow"></div>
																		<div style="margin-top: 5px; color: red;" class="col-md-3-1" id="divfollowDate"></div>
																	</div>		
												<div class="col-md-12-1" style="padding-top: 30px;">
													<div class="col-md-12-1">
														<!-- Start Header for New Edit Delete Option -->
														<div class="col-md-12-1"
															style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; margin-top: 3px;">
															<label class="btn" onclick="enableTextBoxes();"
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																value="New"> <i class="fa fa-plus"></i> New
															</label> <label class="btn" onclick="editOrderForm();"
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																value="Edit"> <i class="fa fa-edit"></i> Edit
															</label> <label class="btn" onclick="deleteOrderForm();"
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																value="Delete"> <i class="fa fa-trash-o"></i>
																Delete
															</label>
														</div>
														<!-- End Header for New Edit Delete Option -->
														<div class="col-sm-12-1" style="margin-top: 0px;">
															<!--Start Table Heading -->
															<table class="table table-condensed">
																<thead>
																	<tr>
																		<th class="col-md-1-1 center" style="height: 21.5px;"><div
																				class="TextFont">#</div></th>
																		<th class="col-md-2-1 center" style="height: 21.5px;"><div
																				class="TextFont">Drug</div></th>
																		<th class="col-md-2-1 center" style="height: 21.5px;"><div
																				class="TextFont">Prep.</div></th>
																		<!-- <th class="col-md-2-1 center" style="height: 21.5px;"><div
																					class="TextFont">Advice</div></th> -->
																		<th class="col-md-3-1 center" style="height: 21.5px;"><div
																				class="TextFont">Instructions</div></th>
																		<th class="col-md-2-1 center" style="height: 21.5px;"><div
																				class="TextFont">Duration</div></th>
																		<th class="col-md-1-1 center" style="height: 21.5px;"><div
																				class="TextFont"></div></th>
																	</tr>
																</thead>
															</table>
															<!--End Table Heading -->

															<!--Start Table Body -->
															<div id="flip-scroll" class="col-sm-12-1"
																style="overflow-y: scroll; height: 290px; maxheight: auto; margin-top: -21px;">
																<table class="table table-condensed">
																	<tbody id="orderFormContent">
																	</tbody>
																</table>
															</div>
															<!--End Table Body -->
															<input type='hidden' id='OFqueryType' value='insert' />
															<input type='hidden' id='OFSlaveID' value='0' />
														</div>
													</div>
												</div>

												<!-- End Code for #OrderForm GUI -->
											</div>

											<div ID="NICU" class="tab-pane fade in">
												<div class="col-md-12-1"
													style="margin-top: 0px; height: 400px; margin-left: 2%; width: 96%; overflow-y: scroll;"
													id="kavita">
													<div class="divide-20"></div>
													<div class="col-md-12-1">
														<div class="form-group Remove-Padding col-md-2-1"
															style="padding-right: 5px; padding-left: 3px">
															<div class="divide-10"></div>
															<label class="TextFont" for="exampleInputEmail1">IPD
																No : </label> <input id="ipdNo1" name="ipdNo1" type="text"
																placeholder="IPD No" readonly="readonly"
																class="form-control input-SmallText">
														</div>
														<div class="form-group Remove-Padding col-md-2-1"
															style="padding-right: 5px; padding-left: 3px">
															<div class="divide-10"></div>
															<label class="TextFont" for="exampleInputEmail1">Birth
																Weight : </label> <input id="birthWeight" name="birthWeight"
																type="text" placeholder="Birth Weight" readonly="readonly"
																class="form-control input-SmallText">
														</div>
														<div class="form-group Remove-Padding col-md-2-1"
															style="padding-right: 5px; padding-left: 3px">
															<div class="divide-10"></div>
															<label class="TextFont" for="exampleInputEmail1">Weight
																On Adm. : </label> <input id="weightOnAdmission"
																name="weightOnAdmission" type="text"
																placeholder="Weight On Adm." readonly="readonly"
																class="form-control input-SmallText">
														</div>
														<div class="form-group Remove-Padding col-md-2-1"
															style="padding-right: 5px; padding-left: 3px">
															<div class="divide-10"></div>
															<label class="TextFont" for="exampleInputEmail1">Weight
																On Disch. : </label> <input id="weightOnDischarge"
																name="weightOnDischarge" type="text"
																placeholder="Weight On Disch." readonly="readonly"
																class="form-control input-SmallText">
														</div>
														<div class="form-group Remove-Padding col-md-2-1"
															style="padding-right: 5px; padding-left: 3px">
															<div class="divide-10"></div>
															<label class="TextFont" for="exampleInputEmail1">Condition
																at Birth : </label> <input id="conditionAtBirth"
																name="conditionAtBirth" type="text"
																placeholder="Condition at Birth" readonly="readonly"
																class="form-control input-SmallText">
														</div>
														<div class="form-group Remove-Padding col-md-2-1"
															style="padding-right: 5px; padding-left: 3px">
															<div class="divide-10"></div>
															<label class="TextFont" for="exampleInputEmail1">Patient
																Type : </label>
															<div>
																<input id="chknicupd" name="PatientType" type="radio"
																	style="margin-top: 0px;" value="nicuPD" disabled="disabled"
																	class="form-control input-SmallText col-md-2-1">
																<label style="margin-top: 3px;">Peadiatrics</label>
															</div>
														</div>
													</div>
													<div class="divide-40"></div>
													<div class="divide-10"></div>
													<div class="col-md-12-1">
														<div class="form-group Remove-Padding col-md-6-1">
															<div class="divide-10"></div>
															<label class="TextFont">Baby's Data :</label> <input
																type="radio" id="term" name="babysData" value="term"
																style="margin-left: 10px;" disabled="disabled" />Term <input type="radio"
																id="paga" name="babysData" value="paga"
																style="margin-left: 10px;" disabled="disabled" />Preterm AGA<input
																type="radio" id="sgr" name="babysData" value="sgr"
																style="margin-left: 10px;" disabled="disabled" />SGA <input type="radio"
																id="lgr" name="babysData" value="lgr"
																style="margin-left: 10px;" disabled="disabled" />LGA <input type="radio"
																id="iugr" name="babysData" value="iugr"
																style="margin-left: 10px;" disabled="disabled" />IUGR
														</div>
														<div class="form-group Remove-Padding col-md-5-1">
															<div class="divide-10"></div>
															<label class="TextFont">Delivery Data :</label> <input
																type="radio" id="nd" name="deliveryData" value="nd"
																style="margin-left: 10px;" disabled="disabled" />ND <input type="radio"
																id="lscs" name="deliveryData" value="lscs"
																style="margin-left: 10px;" disabled="disabled" />LSCS <input type="radio"
																id="assisted" name="deliveryData" value="assisted"
																style="margin-left: 10px;" disabled="disabled" />Assisted
														</div>

													</div>

													<div class="divide-40"></div>
													<div class="col-md-12-1">
														<div class="col-sm-2-1"
															style="padding-left: 0px; padding-top: 5px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">ANC History -</label>
																<div class="col-md-12-1" style="margin-top: 10px;">
																	<div class="col-md-2-1" style="padding-top: 2px;">Age:</div>
																	<input type="text" id="ancAge" name="ancAge"
																		placeholder="Age" readonly="readonly"
																		class="form-control input-SmallText col-md-6-1" />
																	<div class="col-md-4-1"
																		style="padding-top: 3px; padding-left: 3%;">G P
																		L A D</div>
																</div>
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">MBG :</label> <input type="text"
																	id="mbg" name="mbg" placeholder="MBG" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">RH :</label> <input type="text"
																	id="rh" name="rh" placeholder="RH" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 25px; padding-top: 30px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<input type="radio" id="registered" name="registration"
																	value="registered" disabled="disabled" >Registered
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<input type="radio" id="unregistered"
																	name="registration" value="unregistered" disabled="disabled" >Unregistered
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<input type="radio" id="immunized" name="im"
																	value="immunized" disabled="disabled" >Immunized
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<input type="radio" id="unimmunized" name="im"
																	value="unimmunized" disabled="disabled" >Unimmunized
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 15px; padding-top: 5px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">Serology-HIV- :</label> <input
																	type="text" id="serHIV" name="serHIV"
																	placeholder="Serology-HIV" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Hbs Ag :</label> <input
																	type="text" id="hbsAG" name="hbsAG"
																	placeholder="Hbs Ag" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">VDRL :</label> <input
																	type="text" id=vdrl name="vdrl" placeholder="VDRL" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>

														</div>
														<div class="col-sm-2-1"
															style="padding-left: 15px; padding-top: 5px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">Medical History- DM :</label> <input
																	type="text" id="dm" name="dm"
																	placeholder="Medical History" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">HTN :</label> <input type="text"
																	id="htn" name="htn" placeholder="HTN" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Thyroid Disorder :</label> <input
																	type="text" id="thyroid" name="thyroid"
																	placeholder="Thyroid Disorder" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 15px; padding-top: 5px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">Fever with Rash :</label> <input
																	type="text" id="fever" name="fever"
																	placeholder="Fever with Rash" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Other :</label> <input
																	type="text" id="medOther" name="medOther"
																	placeholder="Other" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 25px; padding-top: 15px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<label class="TextFont">Obsteric Problem's :</label>
																<div class="divide-10"></div>
																<input type="radio" id="pih" name="obsProb" value="pih" disabled="disabled" >PIH
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<input type="radio" id="eclampsia" name="obsProb"
																	value="eclampsia" disabled="disabled" >Eclampsia
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<input type="radio" id="poly" name="obsProb"
																	value="poly" disabled="disabled" >Poly
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<input type="radio" id="oligo" name="obsProb"
																	value="oligo" disabled="disabled" >Oligohydramnios,APH,Leak

															</div>
														</div>
														<div class="divide-40"></div>

													</div>
													<div class="col-md-12-1">
														<div class="form-group Remove-Padding col-md-2-1"
															style="padding-left: 0px; padding-top: 10px;">
															<div class="divide-10"></div>
															<label class="TextFont">Course In Hospital :</label>
															<textarea id='courseInHos' rows='10' cols='24' disabled="disabled" ></textarea>
														</div>
														<div class="form-group Remove-Padding col-md-2-1"
															style="padding-left: 15px; padding-top: 10px;">
															<div class="divide-10"></div>
															<label class="TextFont">Treatment Given -</label>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 0px;">
																<label class="TextFont">IV Fluids :</label> <input
																	type="text" id="fluids" name="fluids"
																	placeholder="IV Fluids" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Antibiotics :</label> <input
																	type="text" id="antibio" name="antibio"
																	placeholder="Other" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Sedation Used- 1. :</label> <input
																	type="text" id="sedation1" name="sedation1"
																	placeholder="Sedation Used" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Sedation Used- 2. :</label> <input
																	type="text" id="sedation2" name="sedation2"
																	placeholder="Sedation Used" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="form-group Remove-Padding col-md-7-1"
															style="padding-left: 15px; padding-top: 10px;">
															<div class="divide-10"></div>
															<label class="TextFont">Other Medications -</label>
															<div class="divide-10"></div>
															<div class="col-md-12-1">
																<div class="form-group Remove-Padding col-md-4-1"
																	style="margin-top: 0px;">
																	<label class="TextFont">Ventilation:Total Dur.
																		:</label> <input type="text" id="duration" name="duration"
																		placeholder="Duration" readonly="readonly"
																		class="form-control input-SmallText" />
																</div>
																<div class="form-group Remove-Padding col-md-12-1"
																	style="margin-top: 10px; border: 0px solid #ddd; height: 100px;">
																	<table class="table table-bordered table-condensed cf">
																		<thead class="cf">
																			<tr>
																				<th class="col-md-3-1 center"><div>Mode</div></th>
																				<th class="col-md-3-1 center"><div>Max
																						PIP</div></th>
																				<th class="col-md-3-1 center"><div>Max
																						PEEP</div></th>
																				<th class="col-md-3-1 center"><div>Max
																						FiO2</div></th>
																			</tr>
																		</thead>
																		<tbody>
																			<tr>
																				<td class="col-md-3-1 center"><input
																					type="text" name="" readonly="readonly"
																					class="form-control input-SmallText" id="mode1" /></td>
																				<td class="col-md-3-1 center"><input
																					type="text" name="" readonly="readonly"
																					class="form-control input-SmallText" id="pip1" /></td>
																				<td class="col-md-3-1 center"><input
																					type="text" name="" readonly="readonly"
																					class="form-control input-SmallText" id="peep1" /></td>
																				<td class="col-md-3-1 center"><input
																					type="text" name="" readonly="readonly"
																					class="form-control input-SmallText" id="fio1" /></td>
																			</tr>
																			<tr>
																				<td class="col-md-3-1 center"><input
																					type="text" name="" readonly="readonly"
																					class="form-control input-SmallText" id="mode2" /></td>
																				<td class="col-md-3-1 center"><input
																					type="text" name="" readonly="readonly"
																					class="form-control input-SmallText" id="pip2" /></td>
																				<td class="col-md-3-1 center"><input
																					type="text" name="" readonly="readonly"
																					class="form-control input-SmallText" id="peep2" /></td>
																				<td class="col-md-3-1 center"><input
																					type="text" name="" readonly="readonly"
																					class="form-control input-SmallText" id="fio2" /></td>
																			</tr>
																		</tbody>
																	</table>
																</div>
															</div>
														</div>
													</div>
													<div class="divide-40"></div>
													<div class="col-md-12-1">
														<div class="col-sm-2-1"
															style="padding-left: 0px; padding-top: 20px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">Blood Culture-Org.</label><input
																	type="text" id="organism" name="organism" readonly="readonly"
																	placeholder="" class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Sensitive To :</label> <input
																	type="text" id="sensitive" name="sensitive" readonly="readonly"
																	placeholder="" class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">BSL- MAX- :</label> <input
																	type="text" id="bslmax" name="bslmax" placeholder="" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Min -</label> <input type="text"
																	id="bslmin" name="bslmin" placeholder="" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 15px; padding-top: 20px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">Electrolyte: Sr Na</label><input
																	type="text" id="electrolyte" name="electrolyte" readonly="readonly"
																	placeholder="" class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Sr K -</label> <input
																	type="text" id="srk" name="srk" placeholder="" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Sr CL -</label> <input
																	type="text" id="srcl" name="srcl" placeholder="" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Sr Ca (mg%)</label> <input
																	type="text" id="srca" name="srca" placeholder="" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Sr Mg - (mg%)</label> <input
																	type="text" id="srmg" name="srmg" placeholder="" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-md-8-1"
															style="padding-left: 15px; padding-right: 15px; padding-top: 20px;">

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 22px; border: 0px solid #ddd; height: 190px;">
																<table class="table table-bordered table-condensed cf">
																	<thead class="cf">
																		<tr>
																			<th class="col-md-3-1 center"><div>Date</div></th>
																			<th class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="date1" value='<%=todays_date%>' /></th>
																			<th class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="date2" value='<%=todays_date%>' /></th>
																			<th class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="date3" value='<%=todays_date%>' /></th>
																			<th class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="date4" value='<%=todays_date%>' /></th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr>
																			<td class="col-md-3-1 center"><div>Sr
																					Billirubin</div></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="billirubin1" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="billirubin2" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="billirubin3" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="billirubin4" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1 center"><div>Total</div></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="total1" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="total2" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="total3" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="total4" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1 center"><div>Indirect</div></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="indirect1" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="indirect2" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="indirect3" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="indirect4" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1 center"><div>Direct</div></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="direct1" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="direct2" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="direct3" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="direct4" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1 center"><div>Phototherapy</div></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="phototherapy1" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="phototherapy2" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="phototherapy3" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="phototherapy4" /></td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
													</div>
													<div class="divide-40"></div>
													<div class="col-md-12-1">
														<div class="col-sm-2-1"
															style="padding-left: 0px; padding-top: 20px;">
															<div class="divide-10"></div>
															<label class="TextFont">Imaging : -</label>
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">X - Ray :</label><input
																	type="text" id="xray" name="xray" placeholder="X - Ray" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">USG :</label> <input type="text" readonly="readonly"
																	id="usg" name="usg" placeholder="USG"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">CT/MRI :</label> <input readonly="readonly"
																	type="text" id="ctmri" name="ctmri"
																	placeholder="CT/MRI"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Others :</label> <input readonly="readonly"
																	type="text" id="otherex" name="otherex"
																	placeholder="Others"
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 15px; padding-top: 20px;">
															<div class="divide-10"></div>
															<label class="TextFont">Follow Up : -</label>
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">Pri. Consultant :</label><input
																	type="text" id="priConsult" name="priConsult"
																	placeholder="Consultant" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Date :</label> <input
																	type="text" id="priConsultDate" name="priConsultDate"
																	value='<%=todays_date%>' placeholder="" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Time :</label> <input
																	type="text" id="priConsultTime" name="priConsultTime" readonly="readonly"
																	placeholder="" class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 15px; padding-top: 20px;">
															<div class="divide-10"></div>
															<label class="TextFont">Other : -</label>
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">High Risk OPD :</label><input readonly="readonly"
																	type="text" id="hrOPD" name="hrOPD" placeholder="Risk"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Date :</label> <input readonly="readonly"
																	type="text" id="hrOPDDate" name="hrOPDDate"
																	value='<%=todays_date%>' placeholder=""
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Time :</label> <input readonly="readonly"
																	type="text" id="hrOPDTime" name="hrOPDTime"
																	placeholder="" class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Other :</label> <input readonly="readonly"
																	type="text" id="finalOther" name="finalOther"
																	placeholder="Other"
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-6-1"
															style="padding-left: 15px; padding-right: 15px; padding-top: 20px;">
															<div class="divide-10"></div>
															<label class="TextFont">Predischarge Check :</label>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 2px; border: 0px solid #ddd; height: 250px;">
																<table class="table table-bordered table-condensed cf">
																	<thead class="cf">
																		<tr>
																			<th class="col-md-3-1 center"><div></div></th>
																			<th class="col-md-3-1 center"><div>Rt.</div></th>
																			<th class="col-md-3-1 center"><div>Lt.</div></th>

																		</tr>
																	</thead>
																	<tbody>
																		<tr>
																			<td class="col-md-3-1"><div
																					style="padding-left: 30%;">1. Red Reflex</div></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="redReflex1" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="redReflex2" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1"><div
																					style="padding-left: 30%;">2. Hips</div></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="hips1" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="hips2" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1"><div
																					style="padding-left: 30%;">3. Femorals</div></td> 
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="femorals1" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="femorals2" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1"><div
																					style="padding-left: 30%;">4. Genitals</div></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="genitals1" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="genitals2" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1"><div
																					style="padding-left: 30%;">5. Hernia</div></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="hernia1" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="hernia2" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1"><div
																					style="padding-left: 30%;">6. Head Circm.</div></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="headcir1" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="headcir2" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1"><div
																					style="padding-left: 30%;">7. Other</div></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="pcother1" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="" class="form-control input-SmallText"
																				id="pcother2" /></td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>

													</div>
													<div class="col-md-12-1">
														<div class="col-sm-6-1"
															style="padding-left: 0px; padding-top: 20px;">
															<div class="divide-10"></div>
															<label class="TextFont">Advice On Discharge :</label>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 2px; border: 0px solid #ddd; height: 250px;">
																<table class="table table-bordered table-condensed cf">
																	<thead class="cf">
																		<tr>
																			<th class="col-md-3-1 center"><div></div></th>
																			<th class="col-md-3-1 center"><div>Date</div></th>
																			<th class="col-md-3-1 center"><div>Time</div></th>
																			<th class="col-md-3-1 center"><div>Reporting
																					Place</div></th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr>
																			<td class="col-md-3-1"><div>ROP Screening</div></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="ropScreen0"
																				class="form-control input-SmallText" id="ropScreen0" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="ropScreen1"
																				class="form-control input-SmallText" id="ropScreen1" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="ropScreen2"
																				class="form-control input-SmallText" id="ropScreen2" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1"><div>Hearing
																					Screening</div></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="hearingScreen0" readonly="readonly"
																				class="form-control input-SmallText"
																				id="hearingScreen0" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="hearingScreen1" readonly="readonly"
																				class="form-control input-SmallText"
																				id="hearingScreen1" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="hearingScreen2" readonly="readonly"
																				class="form-control input-SmallText"
																				id="hearingScreen2" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1"><div>USG Brain</div></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="usgBrain0" readonly="readonly"
																				class="form-control input-SmallText" id="usgBrain0" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="usgBrain1" readonly="readonly"
																				class="form-control input-SmallText" id="usgBrain1" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="usgBrain2" readonly="readonly"
																				class="form-control input-SmallText" id="usgBrain2" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1"><div>Other</div></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="adother0" class="form-control input-SmallText"
																				id="adother0" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="adother1" class="form-control input-SmallText"
																				id="adother1" /></td>
																			<td class="col-md-3-1 center"><input type="text" readonly="readonly"
																				name="adother2" class="form-control input-SmallText"
																				id="adother2" /></td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
													</div>
												</div>
											</div>

											<div ID="PAED" class="tab-pane fade in">
												<div class="col-md-12-1"
													style="margin-top: 0px; height: 400px; margin-left: 2%; width: 96%; overflow-y: scroll;"
													id="kavita">

													<div class="form-group Remove-Padding col-md-2-1"
														style="padding-right: 5px; padding-left: 3px">
														<div class="divide-10"></div>
														<label class="TextFont" for="exampleInputEmail1">Patient
															Type : </label>
														<div>
															<input id=chkpd name="PatientType" type="radio"
																style="margin-top: 0px;" value="PD" readonly="readonly"
																class="form-control input-SmallText col-md-2-1">
															<label style="margin-top: 3px;">Peadiatrics</label>
														</div>

													</div>
													<div class="col-md-12-1"
														style="padding-right: 8px; margin-top: 1%;">
														<div class="divide-10"></div>
														<div class="col-md-4-1">
															<label class="TextFont">Past/Family History :</label>
															<textarea id='pastHistory' rows='3' cols='52' disabled="disabled" ></textarea>
														</div>
														<div class="col-md-4-1" style="padding-left: 0.8%;">
															<label class="TextFont">General Examination :</label>
															<textarea id='generalExamination' rows='3' cols='52'
																disabled="disabled" ></textarea>
														</div>
														<div class="col-md-4-1" style="padding-left: 1.6%;">
															<label class="TextFont">CVS :</label>
															<textarea id='cvs' rows='3' cols='52' disabled="disabled" ></textarea>
														</div>
													</div>

													<div class="divide-10"></div>
													<div class="col-md-12-1"
														style="padding-right: 8px; margin-top: 1px;">
														<div class="divide-10"></div>
														<div class="col-md-3-1">
															<label class="TextFont">RS :</label>
															<textarea id='rs' rows='3' cols='38' disabled="disabled" ></textarea>
														</div>
														<div class="col-md-3-1" style="padding-left: 5.25%;">
															<label class="TextFont">PA :</label>
															<textarea id='pa' rows='3' cols='38' disabled="disabled" ></textarea>
														</div>
														<div class="col-md-3-1" style="padding-left: 10.5%;">
															<label class="TextFont">CNS :</label>
															<textarea id='cns' rows='3' cols='38' disabled="disabled" ></textarea>
														</div>
														<div class="col-md-3-1" style="padding-left: 16%;">
															<label class="TextFont">P/S :</label>
															<textarea id='ps' rows='3' cols='38' disabled="disabled" ></textarea>
														</div>
													</div>
													<div class="col-md-12-1"
														style="padding-right: 8px; margin-top: 1px;">
														<div class="divide-10"></div>
														<div class="col-sm-2-1"
															style="padding-left: 0px; padding-top: 5px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">Platelet Count :</label><input
																	type="text" id="plateletCount" name="plateletCount"
																	placeholder="Platelet Count" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Urine -R :</label> <input
																	type="text" id="urineR" name="urineR"
																	placeholder="Urine -R" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Stool -R :</label> <input
																	type="text" id="stoolR" name="stoolR"
																	placeholder="Stool -R" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 0px; padding-top: 5px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">BSL (mg%) :</label><input
																	type="text" id="bsl" name="bsl" placeholder="BSL" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">CSF :</label> <input type="text" readonly="readonly"
																	id="csf" name="csf" placeholder="CSF"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">OTT :</label> <input type="text" readonly="readonly"
																	id="ott" name="ott" placeholder="OTT"
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 0px; padding-top: 5px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">Sr Calcium (mg%) :</label><input
																	type="text" id="srcalcium" name="srcalcium"
																	placeholder="Sr Calcium" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Coombs Test Advice:</label> <input
																	type="text" id="coombTest" name="coombTest"
																	placeholder="Coomb's Test" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">T.T. :</label> <input
																	type="text" id="pdtt" name="pdtt" placeholder="T.T." readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 0px; padding-top: 5px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">Sr Na :</label><input
																	type="text" id="pdsrna" name="pdsrna"
																	placeholder="Sr Na" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Sr K :</label> <input
																	type="text" id="pdsrk" name="pdsrk" placeholder="Sr K" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Sr CL :</label> <input
																	type="text" id="pdsrcl" name="pdsrcl"
																	placeholder="Sr CL" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 0px; padding-top: 5px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">Sr Billirubin(mg%) :</label><input
																	type="text" id="srBillirubin" name="srBillirubin"
																	placeholder="Sr Billirubin" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Unconj(mg%) :</label> <input
																	type="text" id="unconj1" name="unconj1"
																	placeholder="Unconj" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Unconj(mg%) :</label> <input
																	type="text" id="unconj2" name="unconj2"
																	placeholder="Unconj" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 0px; padding-top: 5px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">X-RAY :</label><input
																	type="text" id="pdxray" name="pdxray"
																	placeholder="X-RAY" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">USG :</label> <input type="text"
																	id="pdusg" name="pdusg" placeholder="USG" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">CT/MRI :</label> <input
																	type="text" id="pdctmri" name="pdctmri"
																	placeholder="CT/MRI" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
														</div>
													</div>
													<div class="col-md-12-1"
														style="padding-right: 8px; margin-top: 1px;">
														<div class="divide-10"></div>
														<div class="col-md-3-1">
															<label class="TextFont">Course Of ILLNESS/REC :</label>
															<textarea id='courseOfRec' rows='3' cols='38' disabled="disabled" ></textarea>
														</div>
														<div class="col-md-3-1" style="padding-left: 5.25%;">
															<label class="TextFont">Management :</label>
															<textarea id='pdManagement' rows='3' cols='38' disabled="disabled" ></textarea>
														</div>
														<div class="col-md-3-1" style="padding-left: 10.5%;">
															<label class="TextFont">Other :</label>
															<textarea id='pdFOther' rows='3' cols='38' disabled="disabled" ></textarea>
														</div>

													</div>
													<div class="divide-10"></div>
													<div class="col-md-12-1"
														style="padding-right: 8px; margin-top: 10px;">
														<div class="col-md-9-1" style="padding-left: 0%;">
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Immunization Status :</label>
																<div class="col-md-12-1" style="margin-top: 1px;">
																	<input type="checkbox" id="chk1" value="BCG" name="BCG" 
																		style="margin-left: 1%;" disabled="disabled" />BCG <input type="checkbox"
																		id="chk2" value="DPT/OPV" name="DPT/OPV"
																		style="margin-left: 1%;" disabled="disabled" />DPT/OPV <input
																		type="checkbox" id="chk3" value="MEASLES"
																		name="MEASLES" style="margin-left: 1%;" disabled="disabled" />MEASLES <input
																		type="checkbox" id="chk4" value="MMR" name="MMR"
																		style="margin-left: 1%;" disabled="disabled" />MMR <input type="checkbox"
																		id="chk5" value="Booster" name="Booster"
																		style="margin-left: 1%;" disabled="disabled" />Booster <input
																		type="checkbox" id="chk6" value="DT.TT" name="DT.TT"
																		style="margin-left: 1%;" disabled="disabled" />DT.TT <input
																		type="checkbox" id="chk7" value="Hepatitis-B"
																		name="Hepatitis-B" style="margin-left: 1%;" disabled="disabled" />Hepatitis-B
																	<input type="checkbox" id="chk8" value="Hib" name="Hib"
																		style="margin-left: 1%;" disabled="disabled" />Hib <input type="checkbox"
																		id="chk9" value="Chicken Pox" name="Chicken Pox"
																		style="margin-left: 1%;" disabled="disabled" />Chicken Pox <input
																		type="checkbox" id="chk10" value="Thyroid"
																		name="Thyroid" style="margin-left: 1%;" disabled="disabled" />Typhoid <input
																		type="checkbox" id="chk11" value="Hepatitis-A"
																		name="Hepatitis-A" style="margin-left: 1%;" disabled="disabled" />Hepatitis-A
																</div>
															</div>
														</div>
														<div class="col-md-3-1" style="">
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Other Vaccines :</label> <input
																	type="text" id="otherVaccines" name="otherVaccines"
																	placeholder="CT/MRI" readonly="readonly"
																	class="form-control input-SmallText" />
															</div>
														</div>
													</div>
													<div class="divide-20"></div>
													<div class="col-md-12-1"
														style="padding-right: 8px; margin-top: 1px;">
														<div class="divide-10"></div>
														<div class="col-md-3-1">
															<label class="TextFont">Any Other Points :</label>
															<textarea id='anyOtherPoints' rows='3' cols='38' disabled="disabled" ></textarea>
														</div>
														<div class="col-md-4-1" style="padding-left: 5.25%;">
															<label class="TextFont">Follow Up Advice :</label>
															<textarea id='followUpAdvise' rows='3' cols='53' disabled="disabled" ></textarea>
														</div>
													</div>
												</div>
											</div>
									<div ID="CauseOfDeath" class="tab-pane fade in">
												<div style="margin-top: 10px; width: 98%; margin-left: 2%;">
													<div class="col-md-12-1">
														<div class="divide-10"></div>
														<label class="TextFont">Immediate / Primary Cause of Death : </label>
													</div>
													<div>
														<textarea id='primaryCOD' rows='4' cols='179' class=""></textarea>
													</div>
													<div class="col-md-12-1">
														<div class="divide-10"></div>
														<label class="TextFont">Antecedent / Secondary Cause of Death : </label>
													</div>
													<div>
														<textarea id='secondaryCOD' rows='4' cols='179' class=""></textarea>
													</div>
													<div class="col-md-12-1">
														<div class="divide-10"></div>
														<label class="TextFont">Other Significant Conditions of Death : </label>
													</div>
													<div>
														<textarea id='significantCondition' rows='4' cols='179' class=""></textarea>
													</div>
												</div>
												<div class="divide-20"></div>
											</div>
											
									<!-- Death Summary Start -->
											<div ID="deathSummary" class="tab-pane fade in">
												<div class="divide-40"></div>
												<div class="col-md-12-1" style="">

													<div class="col-md-4-1" style="">
														<label class="TextFont col-md-4-1">Name Of Patient:
															<b style="color: red;">*</b>
														</label><input type="text" id="dpatientName" readonly="readonly"
															class="form-control input-SmallText col-md-6-1"></input>
													</div>

													<div class="col-md-4-1" style="">
														<label class="TextFont col-md-4-1">Gender: <b
															style="color: red;">*</b>
														</label> 
														<input type="text" id="dpatient_gender" readonly="readonly"
															class="form-control input-SmallText col-md-6-1"></input>
													</div>

													<div class="col-md-4-1" style="">
														<label class="TextFont col-md-4-1">Age: <b
															style="color: red;">*</b>
														</label><input type="text" id="dpatient_age" readonly="readonly"
															class="form-control input-SmallText col-md-6-1"></input>
													</div>

												</div>



												<div class="divide-40"></div>
												<div class="col-md-12-1" style="">

													<div class="col-md-4-1" style="">
														<label class="TextFont col-md-4-1">Residental
															Address: <b style="color: red;">*</b>
														</label><input type="text" id="dpatient_address"
															readonly="readonly"
															class="form-control input-SmallText col-md-6-1"></input>
													</div>

													<div class="col-md-4-1" style="">
														<label class="TextFont col-md-4-1">Contact No: <b
															style="color: red;">*</b>
														</label><input type="text" id="dpatient_contact"
															readonly="readonly"
															class="form-control input-SmallText col-md-6-1"></input>
													</div>

													<div class="col-md-4-1" style="">
														<label class="TextFont col-md-4-1">Occupation: <b
															style="color: red;">*</b>
														</label><input type="text" id="dpatient_occupation"
															
															class="form-control input-SmallText col-md-6-1"></input>
													</div>


												</div>


												<div class="divide-40"></div>
												<div class="col-md-12-1" style="">
													<div class="col-md-4-1" style="">
														<label class="TextFont col-md-4-1"> Date Of Onset
															of Illness:<b style="color: red;">*</b>
														</label><input type="text" id="dpatient_date" readonly="readonly"
															onclick="displayCalendar(document.getElementById('dpatient_date'),'dd/mm/yyyy',this)"
															class="form-control input-SmallText col-md-6-1"></input>
													</div>

													<div class="col-md-4-1" style="">
														<label class="TextFont col-md-4-1">Sign & Symptoms
														:</label>
														<textarea class="" rows="2" cols="55"
															name="addressText" id="dpatient_symptom"
															spellcheck="false"></textarea>
													</div>

													<div class="col-md-4-1" style="">
														<label class="TextFont col-md-4-1">Physical
															Condition :</label><input type="text"
															id="dpatient_physical_condion"
															class="form-control input-SmallText col-md-6-1"></input>
													</div>

												</div>
                                        <br><br> <br><br>

												<div class="divide-40"></div>
												<div class="col-md-12-1" style="">
													<div class="col-md-4-1" style="">
														<label class="TextFont col-md-4-1">Details Of
															treatment given at": </label>
														<textarea class="" rows="2" cols="55"
															name="addressText" id="dpatient_treatment_detail"
															spellcheck="false"></textarea>
													</div>

													<div class="col-md-4-1" style="">
														<label class="TextFont col-md-4-1">By First Doctor
															From/Hospital Dr.From: </label><input type="text"
															id="dpatient_first_dfrom"
															class="form-control input-SmallText col-md-6-1"></input>
													</div>


													<div class="col-md-4-1" style="">
														<label class="TextFont col-md-4-1">Second
															Doctor/Hospital: </label><input type="text"
															id="dpatient_second_dfrom"
															class="form-control input-SmallText col-md-6-1"></input>
													</div>

                                            <br><br> <br><br>

													<div class="divide-40"></div>
													<div class="col-md-12-1" style="">
														<div class="col-md-4-1" style="">
															<label class="TextFont col-md-4-1">Brief H/O
																Presumptive Source of infection(Brief Travel history or
																h/o connect with positive case) :</label>
															<textarea class="" rows="2" cols="55"
																name="addressText" id="dpatient_travel_history"
																spellcheck="false"></textarea>
														</div>

														<div class="col-md-4-1" style="">
															<label class="TextFont col-md-4-1">By IIW Dt.From:
															</label><input type="text" id="dpatient_iww_dtfrom"
																class="form-control input-SmallText col-md-6-1"></input>
														</div>


														<div class="col-md-4-1" style="">
															<label class="TextFont col-md-4-1"> Name of
																Referring Hospital: </label><input type="text"
																id="dpatient_refering_hospital"
																class="form-control input-SmallText col-md-6-1"></input>
														</div>

													</div>
													<br>
													<br>
													<br>
													<br>
													<br>
													<br>
													<br>

													<div class="divide-40"></div>
													<div class="col-md-12-1" style="">
														<div class="col-md-4-1" style="">
															<label class="TextFont col-md-4-1"> Date of
																Admission in IIW: </label><input type="text"
																id="dpatient_admission_in_iww" readonly="readonly"
																onclick="displayCalendar(document.getElementById('dpatient_admission_in_iww'),'dd/mm/yyyy',this)"
																class="form-control input-SmallText col-md-6-1"></input>
														</div>

														<div class="col-md-4-1" style="">
															<label class="TextFont col-md-4-1">Time Of
																Admission in IIW :</label> <input type="text"
																id="dpatient_admission_time_in_iww" readonly="readonly"
																class="form-control input-SmallText col-md-6-1"></input>
														</div>

														<div class="col-md-4-1" style="">
															<label class="TextFont col-md-4-1">Name Of IIW: </label><input
																type="text" id="dpatient_iww_name"
																class="form-control input-SmallText col-md-6-1"></input>
														</div>

													</div>



													<div class="divide-40"></div>
													<div class="col-md-12-1" style="">
														<div class="col-md-4-1" style="">
															<label class="TextFont col-md-4-1"> Date of
																Throat of Swab Taken: </label><input type="text"
																id="dpatient_date_throat_taken" readonly="readonly"
																onclick="displayCalendar(document.getElementById('dpatient_date_throat_taken'),'dd/mm/yyyy',this)"
																class="form-control input-SmallText col-md-6-1"></input>
														</div>

														<div class="col-md-4-1" style="">
															<label class="TextFont col-md-4-1">Date Of Result
																Throat Swab: </label> <input type="text"
																id="dpatient_date_throat_swap_result"
																readonly="readonly"
																onclick="displayCalendar(document.getElementById('dpatient_date_throat_swap_result'),'dd/mm/yyyy',this)"
																class="form-control input-SmallText col-md-6-1"></input>
														</div>

														<div class="col-md-4-1" style="">
															<label class="TextFont col-md-4-1">Result Of
																Throat Swab: </label>
															<textarea class="" rows="2" cols="55"
																name="addressText" id="dpatient_result_throat_swab"
																spellcheck="false"></textarea>
														</div>

													</div>

                                                   <br>
                                                    <br>
                                                     <br>
                                                      <br>

													<div class="divide-40"></div>
													<div class="col-md-12-1" style="">

														<div class="col-md-4-1" style="">
															<label class="TextFont col-md-4-1">Name Of
																Laboratory: </label> <input type="text"
																id="dpatient_laboratory_name"
																class="form-control input-SmallText col-md-6-1"></input>
														</div>

														<div class="col-md-4-1" style="">
															<label class="TextFont col-md-4-1">Other relevant
																lab result-CBS,X-ray,CT Sacn etc: </label>
															<textarea class="" rows="2" cols="55"
																name="addressText"
																id="dpatient_other_relevant_lab_result"
																spellcheck="false"></textarea>
														</div>

														<div class="col-md-4-1" style="">
															<label class="TextFont col-md-4-1">Special
																mention of various treatment modalities(Anti-retroviral
																drugs/Oseltamivir/HCQ or Cholroquine/Any other): </label>
															<textarea class="" rows="2" cols="55"
																name="addressText" id="dpatient_special_treatment"
																spellcheck="false"></textarea>
														</div>

													</div>

													<br>
													<br>
													<br>
													<br>
													<br>
													<br>
													<br>
													<br>

													<div class="divide-40"></div>
													<div class="col-md-12-1" style="">
														<div class="col-md-4-1" style="">
															<label class="TextFont col-md-4-1"> Date of Death:
															</label><input type="text" id="dpatient_death_date"
																readonly="readonly"
																onclick="displayCalendar(document.getElementById('dpatient_death_date'),'dd/mm/yyyy',this)"
																class="form-control input-SmallText col-md-6-1"></input>
														</div>

														<div class="col-md-4-1" style="">
															<label class="TextFont col-md-4-1">Time Of Death:
															</label> <input type="text" id="dpatient_death_time"
																readonly="readonly"
																class="form-control input-SmallText col-md-6-1"></input>
														</div>

														<div class="col-md-4-1" style="">
															<label class="TextFont col-md-4-1">Place Of Death:

															</label><input type="text" id="dpatient_place_death"
																class="form-control input-SmallText col-md-6-1"></input>
														</div>

													</div>



													<div class="divide-40"></div>
													<div class="col-md-12-1" style="">

														<div class="col-md-4-1" style="">
															<label class="TextFont col-md-4-1">Casue Of Death:

															</label>
															<textarea class="" rows="2" cols="55"
																name="addressText" id="dpatient_cause_death"
																spellcheck="false"></textarea>
														</div>
														
														
														<div class="col-md-4-1" style="">
															
															<button onclick="saveDeathSummary()"
																		title="Save Death Summary " data-placement="left"
																		data-toggle="tooltip" id="savedeathsummary"
																		class="btn btn-xs btn-success"
																		style="margin-left: 2px;">
																		<i class="fa fa-save"></i>
																	</button>
																	
																	<button onclick="printDeathSummaryReport();" title="Print "
																		data-placement="left" data-toggle="tooltip"
																		class="btn btn-xs btn-warning coversheetBtn">
																		<i class="fa fa-print"></i>
																	</button>
																	
														</div>
														
														

													</div>



												</div>



												<!-- Death Summary End -->

											</div>				
											
											
											
										</div>
									</div>
								</div>
								<!-- /tabbable -->
							</div>
							<!-- /box border -->
						</div>
						<!-- /content -->
					</div>
					<!-- /row -->
				</div>
				<!-- /container -->
			</div>
			<!-- /main-content -->
		</div>
		<!-- /outer -->
						<div tabindex="-1" class="modal fade in" id="iPrintDsPopUp" style="display: none;">
		<div class="modal-dialog" style="display: block;">
			<div style="margin-top: 13%; margin-left: 13%;" class="modal-content col-md-7">
				<div class="modal-header">
					<div class="box-title">
						<h4 class="col-md-8-1">
							<i class="fa fa-calendar"></i> Discharge Summary
						</h4>
						<div style="float: right;" class="form-group col-md-4-1">
							<button type="button" onclick="AutoDischargeSummaryPrint2();" class="btn btn-xs btn-warning">
								<i class="fa fa-print"></i> Print
							</button>
							<button onclick="hideDisSummaryLangPopUp();" class="btn btn-xs btn-danger">
								<i class="fa fa-arrows"></i> Close
							</button>
						</div>
					</div>
				</div>

				<div class="modal-body col-md-12-1">
					<div class="col-md-3-1">
						<label class="input-SmallText"> <input type="radio" style="margin-top: 0px; cursor: pointer" name="langDSPrint" value="ENGLISH" checked="checked"> : English
						</label>
					</div>

					<div class="col-md-3-1">
						<label class="input-SmallText"> <input type="radio" style="margin-top: 0px; cursor: pointer" name="langDSPrint" value="MARATHI"> : Marathi
						</label>
					</div>

				</div>
			</div>
		</div>
	</div>
			<div tabindex="-1" class="modal fade in" id="AllPrintforDischarge" style="display: none;">
				<div class="modal-dialog" style="display: block;">
					<div style="margin-top: 123px; margin-left: 213px;" class="modal-content col-md-8-1">
						<div class="modal-header">
							<button onclick="hideDischargePrintPopup()" style="margin-top: -5px;; margin-left: 530px" type="button" data-dismiss="modal" aria-label="Close" class="btn btn-xs btn-danger">
								<i class="fa  fa-undo"></i>
							</button>
							<button onclick="AutoDischargeSummaryPrintforIpd('Services');" data-placement="left" data-toggle="tooltip" data-original-title="Print" "="" style="margin-top: -37px; margin-left: 500px" title="" class="btn btn-xs btn-warning">
								<i class="fa fa-print"></i>
							</button>

							<h4 style="margin-top: -36px;" id="testHead">
								<i class="fa fa-print"></i> Print:
							</h4>
						</div>
						<div class="modal-body">
							<div class="col-md-12-1">
								<div style="background-color: #ccffeb;" class="col-md-3-1">
									<input type="checkbox" onclick="hideCheckAllLangDiv()" name="printTypeDs" value="admissionNote" id="admissionNote"> <b>Admission Note</b>
								</div>

								<div style="background-color: #ccffeb;" class="col-md-3-1">
									<input type="checkbox" onclick="hideCheckAllLangDiv()" name="printTypeDs" value="history" id="history"> <b>History</b>
								</div>

								<div style="background-color: #ccffeb;" class="col-md-3-1">
									<input type="checkbox" onclick="hideCheckAllLangDiv()" name="printTypeDs" value="invest" id="invest">
									<b>Investigation</b>
								</div>
								
								<div style="background-color: #ccffeb;margin-right: 0px; margin-top:-8px;" class="col-md-3-1">
									<input type="checkbox" onclick="hideCheckAllLangDiv()" name="printTypeDs" value="treatment" id="treatment">
									<b>Treatment</b>
								</div>

								<div style="background-color: #ccffeb;" class="divide-40"></div>


								<div style="background-color: #ccffeb;" class="col-md-3-1">
									<input type="checkbox" onclick="hideCheckAllLangDiv()" name="printTypeDs" value="otNotes" id="otNotes">
									<b>OT Notes</b>
								</div>

								<div style="background-color: #ccffeb;" class="col-md-3-1">
									<input type="checkbox" onclick="hideCheckAllLangDiv()" name="printTypeDs" value="dischrCond" id="dischrCond"> <b>Discharge Cond</b>
								</div>
								
								<div style="background-color: #ccffeb;" class="col-md-3-1">
									<input type="checkbox" onclick="hideCheckAllLangDiv()" name="printTypeDs" value="treatDischrge" id="treatDischrge"> <b>Discharge Treat</b>
								</div>
								
								<div style="background-color: #ccffeb;" class="col-md-3-1">
									<input type="checkbox" onclick="hideCheckAllLangDiv()" name="printTypeDs" value="paediatric" id="paediatric"> <b>Paediatric Dept</b>
								</div>
								
								<div style="background-color: #ccffeb;" class="divide-40"></div>
								
								<div style="background-color: #ccffeb;" class="col-md-3-1">
									<input type="checkbox" onclick="hideCheckAllLangDiv()" name="printTypeDs" value="drRound" id="drRound"><b>Doctor Round</b>
								</div>  
								
								<div style="background-color: #ccffeb;" class="col-md-3-1">
								<input type="checkbox" onclick="checkAllBoxes(),showCheckAllLangDiv()" name="checkAll" id="checkAll">
								<b>Check All</b>
								</div>  
								<div id="allCheckLangRadio" style="display: none;">
								<div style="background-color: #ccffeb;" class="col-md-3-1">
								<label class="input-SmallText"> <input type="radio" style="margin-top: 0px; cursor: pointer" name="langDSCheckAllPrint" value="ENGLISH" checked="checked"> : English
								</label>
							</div>
								<div style="background-color: #ccffeb;" class="col-md-4-1">
								<label class="input-SmallText"> <input type="radio" style="margin-top: 0px; cursor: pointer" name="langDSCheckAllPrint" value="MARATHI" checked="checked"> : Marathi
								</label>
							</div>
								</div>
								
								<div class="divide-40"></div>
							</div>

						</div>
					</div>
				</div>
			</div>
			<div tabindex="-1" class="modal fade in" id="NewPopUp" style="display: none;">
				<div class="modal-dialog" style="display: block;">
					<div style="margin-top: 123px; margin-left: 213px;" class="modal-content col-md-8-1">
						<div class="modal-header">
							<button onclick="hideDisSummaryLangPopUp()" style="margin-top: -5px;; margin-left: 530px" type="button" data-dismiss="modal" aria-label="Close" class="btn btn-xs btn-danger">
								<i class="fa  fa-undo"></i>
							</button>
							<button onclick="AutoDischargeSummaryPrintforIpd('HF')" data-placement="left" data-toggle="tooltip" data-original-title="Print" "="" style="margin-top: -37px; margin-left: 500px" title="" class="btn btn-xs btn-warning">
								<i class="fa fa-print"></i>
							</button>

							<h4 style="margin-top: -36px;" id="testHead">
								<i class="fa fa-print"></i> Print:
							</h4>
						</div>

						<div class="modal-body">
							<div class="col-md-12-1">
								<div style="background-color: #ccffeb;" class="col-md-4-1">
									<input type="radio" onclick="hideLangDiv()" name="printType" value="DS" checked="checked" id="all"> <b>DS Without Sub &amp; Obj</b>
								</div>

								<div style="background-color: #ccffeb;" class="col-md-4-1">
									<input type="radio" onclick="hideLangDiv()" name="printType" value="DischargeSummary" id="DischargeSummary"> <b>Discharge Summary</b>
								</div>
								<div style="background-color: #ccffeb;" class="col-md-4-1">
									<input type="radio" onclick="ShowLangDiv()" name="printType" value="all" id="SubObj"> <b>All</b>
								</div>

								<div class="divide-40"></div>
							</div>
							<div class="col-md-12-1">
								<div style="background-color: #ccffeb;" class="col-md-5-1">
									<input type="radio" onclick="hideLangDiv()" name="printType" value="DischargeSummaryWithoutHF" id="DischargeSummaryWithoutHF"> <b>Discharge Summary Without H/F</b>
								</div>
								<div id="allRadio" style="display: none;">
								<div style="background-color: #ccffeb;" class="col-md-3-1">
								<label class="input-SmallText"> <input type="radio" style="margin-top: 0px; cursor: pointer" name="langDSAllPrint" value="ENGLISH" checked="checked"> : English
								</label>
							</div>
								<div style="background-color: #ccffeb;" class="col-md-4-1">
								<label class="input-SmallText"> <input type="radio" style="margin-top: 0px; cursor: pointer" name="langDSAllPrint" value="MARATHI" checked="checked"> : Marathi
								</label>
							</div>
								</div>
								<div class="divide-40"></div>
							</div>

						</div>
					</div>
				</div>
			</div>
		<div><%@include file="Footer.jsp"%></div>
		<div id="appo_type" style="display: none;"><%=request.getParameter("appo_type")%></div>
		<div id="id" style="display: none;"><%=request.getParameter("id")%></div>
		<div id="updateOn" style="display: none;"><%=request.getParameter("updateFlagOn")%></div>
		<div id="PreTre" style="display: none;"><%=request.getParameter("myObj")%></div>

		<div style="display: none;" id="docName">${sessionScope.userName}</div>
		<div id="date" style="display: none;"><%=todays_date%></div>
		<input type="hidden" id="OFdate-pick" value="<%=todays_date%>"
			style="display: none;" />
		<input type="hidden" id="pageType" value="IPD" style="display: none;" />
		<input id="CPOE_TestDetails" style="display: none;" />

		<!-- IPD_DRR for Daily Doctor Round and Order Form -->
		<input type="hidden" id="treStart"
			value="<%=request.getParameter("treStart")%>" style="display: none;" />
		<div id="treatmentbedid" style="display: none;"><%=request.getParameter("treatmentbedid")%></div>
		<div id="OTNotesDiv" style="display: none;"></div>

		<!-- For IPD_BedWard -->
		
		
		<input id="deptid" type="hidden"
				value="<%=request.getParameter("deptid") %>"
				style="display: none;" />
			
			<input type="hidden" id="ipdNumber" value="0" style="display: none;" />
			<input id="drid" type="hidden"
				value="<%=request.getParameter("drid") %>"
				style="display: none;" />
		<input id="tid" type="hidden"
			value="<%=request.getParameter("treatmentId")%>"
			style="display: none;" />
		<input id="pid" type="hidden"
			value="<%=request.getParameter("patientId")%>" style="display: none;" />
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

		<!-- For Assesment -->
		<div id="assesmentDetails" style="display: none;"></div>
		<input type="hidden" style="display: none;" id="callFor"
			value="DischargeSummary" />
		<input type='hidden' id='tomId' value='0' />
		<input type='hidden' id='idOTNote' value='0' />
		<div id="objorder" style="display: none;"></div>

		<div id="previousorder" style="display: none;"></div>
		<input type="hidden" value="<%=session.getAttribute("userType")%>"
			id="userType" />

		<!-- prescription route details as per prepID -->
		<div id="routeDetails" style="display: none;"></div>

		<!-- For Medicine -->
		<div class="form-group Remove-Padding col-sm-12-1"
			style="display: none">
			<div class="divide-10"></div>
			<label class="TextFont" for="exampleInputEmail1">Instructions<b
				style="color: red; padding-left: 2px;">*</b></label> <select
				id="instruction" class="form-control input-SmallText"></select>
		</div>
		<div id="InstructionListEnglish" style="display: none;">
			<option value="">----</option>
			<option value="1">After Dinner</option>
			<option value="2">Topical Application</option>
			<option value="3">Before Breakfast-Before Dinner</option>
			<option value="4">After Breakfast-After Dinner</option>
		</div>
		<div id="InstructionListMarathi" style="display: none;">
			<option value="">----</option>
			<option value="1">जेवणानंतर/After Dinner</option>
			<option value="2">बाहेरून लावणे/Topical Application</option>
			<option value="3">नाश्त्या अगोदर-जेवणाअगोदर/Before
				Breakfast-Before Dinner</option>
			<option value="4">नाश्त्या नंतर-जेवणानंतर/After Food</option>
		</div>
				<div id="patobject" style="display: none;"></div>
		
		<div id="language" style="display: none;">Marathi</div>
		<input id="disSummID" type="hidden" style="display: none;" value="0">
		<input type="hidden"  id="shraddhaFlow" value="<%=resourceBundleEhat1.getObject("shraddha").toString()%>">

		<!-- End For Medicine -->
		
	</c:if>
	<!-- /c:if -->
</body>
</html>