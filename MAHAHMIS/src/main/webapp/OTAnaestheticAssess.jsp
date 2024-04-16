<%@page import="java.util.Calendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Pre-Anaesthetic Assessment</title>
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
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/bill.js"></script>
<script type="text/javascript" src="js/operation.js"></script>
<script type="text/javascript" src="js/ot_coversheet.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/ipdTreatment.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script src="js/Admin.js" type="text/javascript"></script>
<script type="text/javascript" src="js/consentFormDetail.js"></script>
<script type="text/javascript" src="js/Channeling.js"></script>
<script type="text/javascript" src="js/ehat_copy_last_treatment_page.js"></script>
<script type="text/javascript" src="js/ehat_CoversheetNew.js"></script>
<script type="text/javascript" src="js/ehat_OPDDoctorsDesk.js"></script>
<script type="text/javascript" src="js/anasthesiaApproval.js"></script>

<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>
<!--calender Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<!-- /for Developers  -->
<script src="js/jquery.datePicker-min.js" type="text/javascript"></script>
<!-- MARKDOWN -->
<script type="text/javascript"
	src="js/bootstrap-markdown/js/markdown.js"></script>
<script type="text/javascript"
	src="js/bootstrap-markdown/js/to-markdown.js"></script>
<script type="text/javascript"
	src="js/bootstrap-markdown/js/bootstrap-markdown.min.js"></script>
	
<!--Added by Vikas Godse for alertify plugins  -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!--End By Vikas Godse  -->

<!--calender Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<!-- CUSTOM SCRIPT -->

<!-- BOOTSTRAP WYSIWYG -->
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/jquery.hotkeys.min.js"></script>
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/bootstrap-wysiwyg.min.js"></script>
<!-- CKEDITOR -->
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>	

<script src="js/script.js"></script>
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
<script>
	jQuery(document).ready(function() {
		App.setPage("OTAnaestheticAssess"); //Set current page
		App.init(); //Initialise plugins and elements

		$("#OTManagement").addClass("menuActive");
		$("#assessOP").addClass("anchorActive");
	/* 	 dp_cal = new Epoch('epoch_popup', 'popup', document
				.getElementById('crtdate')); */
		$("#viedat").addClass("anchorActive");
		$('input[name=approval]').attr('checked', false);

		var todaysDefaultDate = $("#currentDate").html();

		/* 30-12-2014 */
		var dateSplit = todaysDefaultDate.split('-');
		/* 30/12/2014 */
		todaysDefaultDate = dateSplit[0] + "/" + dateSplit[1] + "/"
				+ dateSplit[2];
		
		viewAnaestheticAssess("operation");
		getIntraOperation();
		fetchAnaesthesiaApproval();

		$("#todaysDefaultDate").val(dateSplit[0]);
		$("#OFdate-pick").val(dateSplit[0]);
		fetchConductAnaesthesiaHistory('onload');
		//setcommonPatInfoForOperation();
		// getpatientTrIddrdesk(<%=request.getParameter("tId")%>);
		getIpdPatientHeaderInfo(<%=request.getParameter("treatID")%>);
		getAnaesthesiaPreOp();
		//setAssessDetails();
		
		//comment
		//fetchPreAnaestheticDetails();
	    //fetchConductAnaesthesiaHistory('onload');
		$("#idSaveButtonDiv").hide();
		$("#idSaveAnaesthesiaApproval").hide();
		$("#idConductOfAnaesthiaTab").hide();
		$("#idPrintConductAnaesthesiaBTN").hide();
		$("#idSaveConductAnaesthesiaBTN").hide();
		$("#idSaveVitalsOfConductAnaesthesiaBTN").hide();
		$("#idSaveVitalsForPreAnaesthiaBTN").hide();
		$("#ipdConsentFormJSPHeadDiv").hide();
		$("#idSaveOTConsentForm").hide();
		$("#idDashboardTab").css("background-color", "#ced9ae");
		fetchPreviousTreatmentsByTreatmentID("OTAnaethetic");
		//fetchIpdCoversheetLab();
		//fetchAllergyAlerts();
		//fetchTestDashboard();
		vitalsUIOTModule("VIEW");
		fetchPreviousTreatmentsByTreatmentIDNew();
		fetchInvestigationDashboard();
		getVitalsListOnCoversheet();
		fetchAllAllergyAlertsOnOPDCoversheet();
		getAllPrescriptionsOnOPDCoversheet();
		//fetchInvestigationDashboard();
		//fetchBillDetails();
		fetchLabTestOnDashBoard();
		//fetchPreviousTreatmentsByTreatmentIDNew();
		getTodaysVitalsOnPopUp1();
		fetchCustomizeTemplateListOT();
		//fetchPreviousTreatmentsByTreatmentID();
		//fetchVitalCoverSheet();
		//getIpdVitalList();
		/* vitals */
		//fetchinvestigation();
		//fetchOTIPDinvestigation();
		//fetchOTIPDLab();
		//fetchAllPrescription();
		// featchOrderFormByDate();
		/* showPrescriptionTemp(); */
		//fetchCustomizeTemplateList();
		setTemplateFunc();
		
		//setUserName(this.id);
		//setcommonPatInfoForOperation();
		//setAutoDoctorNameForTeamMember("userName", "onload");
		
		// @codeBy : Kavita @codeDate : 3-Feb-2017
		getPackages("onload");
		fetchLabResultData("OTAnaestheticAssess");
		showprint("Y");
	});

	// add new vitals: START
	$(function() {
		$("#vitalNewDia").dialog({
			autoOpen : false,
			show : {
				effect : "blind",
				duration : 100,
			},
			hide : {
				effect : "explode",
				duration : 100
			},
			
			height : 600,
			width : 800
		});
		
//............ Amrut hiding code  ...
		 $("#newVitals").click(function() {
			$("#vitalNewDia").dialog("open");
			vitalsUIOTModule("OTVitals_dashboard");
		});
		$("#idSaveVitalsForPreAnaesthiaBTN").click(function() {
			$("#vitalNewDia").dialog("open");
			vitalsUIOTModule("OTVitals_preAnasthia");
		});
		 $("#idSaveVitalsOfConductAnaesthesiaBTN").click(function() {
			$("#vitalNewDia").dialog("open");
			vitalsUIOTModule("OTVitals_conductAnasthia");
		});
 

		$("#vitalNewclose").click(function() {
			$("#vitalNewDia").dialog("close");
		});
	});
	// add new vitals: END

	//Vital Edit Dialog box
	$(function() {
		$("#vitalEditDia").dialog({
			autoOpen : false,
			show : {
				effect : "blind",
				duration : 100,
			},
			hide : {
				effect : "explode",
				duration : 100
			},
			height : 500,
			width : 800
		});

		/*  	$("#editVitals").click(function() {
			$("#vitalEditDia").dialog("open");
			vitalsUIOTModule("VIEWALLDATEForOT");
		}); */

		$("#vitalEditclose").click(function() {
			$("#vitalEditDia").dialog("close");
		});
	/* 	$("#idSaveVitalsForPreAnaesthiaBTN").click(function() {
			$("#vitalEditDia").dialog("open");
			vitalsUIOTModule("OTModuleVitals");
		});  */
	});

	$(function() {

		$("#subVitals").click(function() {
			$("#vitalEditDia").dialog("open");
		});

		$("#vitalEditclose").click(function() {
			$("#vitalEditDia").dialog("close");
		});
	});
</script>
<script type="text/javascript">
	onload = function() {
		
		
	}
</script>
</head>
		<%
				java.util.Calendar currentDate = Calendar.getInstance();
				java.text.SimpleDateFormat dateformatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
				String todays_date = dateformatter.format(currentDate.getTime());
				java.text.SimpleDateFormat dateformatter2 = new java.text.SimpleDateFormat("dd/MM/yyyy");
				String todays_dateOF = dateformatter2.format(currentDate.getTime());
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
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="operationTypeManagement.jsp">OT</a></li>
												<li><a href="OTAnaestheticAssess.jsp">PreAnaesthetic
														Assessment</a></li>
											<!--	<li><i class="fa fa-question"></i></li>
												 <li><i class="fa fa-exclamation-circle"
													style="color: red;">12</i></li> -->
											</ul>
										</div>
									</div>
								</div>
								<!-- <div class="panel panel-primary" style="margin-top: -20px;">
								<div class="panel-body">
								<div class="row">
								<div class="col-md-1">
									<img id="patImg" class="img-responsive" src="ehat-design/img/profile/avatar.jpg" alt="">
								</div>
								<div class="col-md-10" style="margin-top: 10px;">
								<div class="col-md-3">
								<div class="form-group">
								<label class="control-label lblBold" id="lblCenterPatientId">Patient Id :</label> <label
									id="patientId" class="control-label" style="display: none;"></label>
								<label
									id="centerPatientId" class="control-label"></label>
								</div>
								</div>
								<div class="col-md-3">
								<div class="form-group">
								<label class="control-label lblBold">Patient Name :</label> <label
									id="patientName" class="control-label"></label>
								</div>
								</div>
								<div class="col-md-3">
								<div class="form-group">
									<label class="control-label lblBold">Age :</label> <label
										id="age" class="control-label"></label>
								</div>
								</div>
								<div class="col-md-3">
								<label class="control-label lblBold">Weight (kg) -</label> <label
									class="control-label" id="weight"></label>
								</div>
								<div class="col-md-3">
								<div class="form-group">
								<label class="control-label lblBold">Gender :</label> <label
									id="sex" class="control-label"></label>
								</div>
								</div>
								<div class="col-md-3">
								<div class="form-group">
									<label class="control-label lblBold">DOA:</label> <label class="control-label"
										id="dateOfAdmission"></label>
								</div>
								</div>
								<div class='col-md-3'>
								<div class="form-group">
									<label class="control-label lblBold">IPD No : </label>
										<label class="control-label"
										id="ipdno"></label>
								</div>
								</div>
								<div class="col-md-3">
								<div class="form-group">
									<label class="control-label lblBold">Refer-By: </label> <label
										class="control-label" id="refer_by"></label>
								</div>
								</div>
								<div class="col-md-3">
								<div class="form-group">
									<label class="control-label lblBold">Corporate: </label> <label
										class="control-label" id="bill_category"></label>
								</div>
								</div>
								<div class="col-md-3">
								<div class="form-group">
								<label class="control-label lblBold" >OT Date:</label>
								<label id="OpDate" class="control-label"></label>
								</div>
								</div>
								<div class="col-md-3">
								<div class="form-group">
								<label class="control-label lblBold" >OT Time:</label>
								<label id="OpTime" class="control-label"></label></div>
								</div>
								<div class="col-md-3">
								<div class="form-group">
								<label class="control-label lblBold" >OT Name:</label>
								<label id="OpName" class="control-label" ></label>
								</div>
								</div>
								</div>
								</div>
								</div>
								</div> -->
								
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
														<input type="hidden"  id="tr_Id" value="<%=request.getParameter("treatID")%>">
														<input type="hidden"  id="pt_Id" value="<%=request.getParameter("pid")%>">
														<input type="hidden"  id="bill_Id" value="0">
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
								
								<div class="box border col-md-12-1">
									<div class="divide-10"></div>
									<div class="tabbable col-md-12-1">
										<ul class="nav nav-tabs mainTab">

											<li class="active"><a data-toggle="tab"
												href="#Cover_Sheet" id="idDashboardTab"
												onclick="openDashboard(),showprint('Y');"><span
													class="hidden-inline-mobile">Clinical Dashboard</span></a></li>
											<li><a data-toggle="tab" id="idOTNotesTab"
												href="#iOTNotes" onclick="openOTNotes(),showprint('N'),fetchOTNotesData('OT');"><span
													class="hidden-inline-mobile">OT Notes</span></a></li>
											<li><a data-toggle="tab"
												id="idPreAnaesthaticAssessmentTab" href="#PreAnasthAssess"
												onclick="openPreAnaesthaticAssessment(),showprint('N'),getAllBloodGroupMasterForPreAnaesthetic();fetchPreAnaestheticDetails2();"><span
													class="hidden-inline-mobile">Pre-Anaesthatic
														Assessment</span></a></li>
											<!-- <li><a data-toggle="tab" id="idAnaesthesiaNotesTab"
												href="#ANSNotes" onclick="openAnaesthesiaNotes();"><span
													class="hidden-inline-mobile"> Anaesthesia abcd </span></a></li> -->
											<li><a data-toggle="tab" id="idAnaesthesiaApprovalTab"
												href="#AnaesthesiaApproval"
												onclick="openAnaesthesiaApproval(),showprint('N');;"><span
													class="hidden-inline-mobile">Anaesthesia Approval </span></a></li>
													
											<li><a data-toggle="tab" id="idOTConsentForm"
												href="#ipdConsentFormJSPHeadDiv"
												onclick="openOTConsetntForm();getOTTemplateList();getAllOtConsentForms();showprint('N');"><span
													class="hidden-inline-mobile">OT Consent Form </span></a></li>
													
													
											
											<li><a data-toggle="tab" id="idConductOfAnaesthiaTab"
												href="#ConductOfAnaesthia"
												onclick="openConductOfAnaesthia();"><span
													class="hidden-inline-mobile">Conduct of Anaesthesia </span></a></li>
											<li class="pull-right">
											 	<button class="btn btn-xs btn-warning" id="idSaveVitalsForPreAnaesthiaBTN" 
													onclick="" value=""> Vitals </button> 
												<button class="btn btn-xs btn-success" id="idSaveButtonDiv"
													onclick="savePreAnaestheticDetails()"
													style="margin-right: 10px; margin-top: 1px;">Save</button>
											</li>
											<li class="pull-right">
												<button class="btn btn-xs btn-success"
													id="idSaveAnaesthesiaApproval"
													onclick="saveAnaesthesiaApprovalDetails1()"
													style="margin-right: 10px; margin-top: 1px;">Save</button>
											</li>
											<li class="pull-right" style="margin-right:5px">
<!-- 												<button id="idSaveVitalsOfConductAnaesthesiaBTN" class="btn btn-xs btn-warning" value="" onclick="" style="display: none;">Vitals </button> -->
<!-- <button id="idPrintThisConductAnaesthesiaBTN" class="btn btn-xs btn-warning" value="" onclick="PrintConductAnest()" style="display: none;">Print </button> -->
 <button id="idPrintPreAnaePrintAss" class="btn btn-xs btn-warning" onclick="printPreAnaethAssmnt3()" >Print </button>
<!-- <button id="idSaveConductAnaesthesiaBTN" class="btn btn-xs btn-success" onclick="saveConductAnaesthesia()" style="display: none;">Save</button> -->
											</li>
											<li class="pull-right" style="margin-right:5px">
											 	<!-- <button class="btn btn-xs btn-warning" id="idSaveVitalsOfConductAnaesthesiaBTN"
													onclick="showVitalsOnPopUp1()" value="">Vitals
												</button>  -->
												<button class="btn btn-xs btn-warning" id="idSaveVitalsOfConductAnaesthesiaBTN"
													onclick="" value="">Vitals
												</button>
												<button class="btn btn-xs btn-success"
													id="idSaveConductAnaesthesiaBTN"
													onclick="saveConductAnaesthesia()">Save</button>
												<button class="btn btn-xs btn-success" 
													id="idPrintConductAnaesthesiaBTN" 
 													onclick="printConductAnaesthesia()">Print</button> 
											</li>
											
											<li><a data-toggle="tab" id="preOpli" href="#preOperation"><span
														class="hidden-inline-mobile" onclick="fetchPreOp()">Pre Op</span></a></li>
												<li><a data-toggle="tab" id="intraOpli" href="#intraOperation"><span
														class="hidden-inline-mobile" onclick="fetchIntraOpPostOp()">IntraOp-PostOp</span></a></li>
										</ul>
										<div class="divide-10"></div>

										<div id="ipdAutoDischargeSummaryHeadDiv" class="tab-content">

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

															<div class="col-sm-12-1" style="margin-top: 3px;">
																<table class="table table-condensed">
																	<thead>
																		<tr class="TextFont">
																			<th class="col-md-1-1">#</th>
																			<th class="col-md-3-1">Referred To</th>
																			<th class="col-md-3-1">Admission No</th>
																			<th class="col-md-3-1">Start Date</th>
																			<th class="col-md-1-1">Action</th>
																		</tr>

																	</thead>
																</table>
															</div>

															<div id="flip-scroll" class="col-md-12-1"
																style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;">
																<table class="table table-condensed">
																	<tbody id="previousPatientSummaryTable">

																	</tbody>
																</table>
															</div>
														</div>

														<!-- /BOX -->
													</div>

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
																	<button class="b" id="labbut" style="margin-top: -4px;"
																		type="button" onclick="showPostPopup()"
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
																			<th class="col-md-2-1"><div class="TextFont">Time</div></th>
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
													<div class="col-md-4-1">
														<!-- BOX-->
														<div class="box border default col-md-12-1"
															style="margin: 0px;">
															<div class="box-title col-sm-12-1"
																style="margin-top: 0px; background-color: #a696ce;">
																<h4>
																	<i class="fa fa-bars"></i>Vitals
																</h4>
																<div class="pull-right">
																	<!-- <label id="editVitals"
																		style="cursor: pointer; margin-right: 20px;">
																		<i class="fa fa-eye View"></i>View All
																	</label> -->
																	 <label id="newVitals" style="cursor: pointer;" onclick="showVitalsOnPopUp1()">
																		<i class="fa fa-plus-square"></i>Today's Vitals
																	</label>
																</div>
															</div>
															<div class="col-sm-12-1" style="margin-top: 0px;">
																<table class="table table-condensed">
																	<thead>
																		<tr>
																			<th class="col-md-1-1 TextFont">#</th>
																			<th class="col-md-6-1 TextFont">Particulars</th>
																			<th class="col-md-2-1 TextFont">Date</th>
																			<th class="col-md-2-1 TextFont center">Report</th>
																		</tr>
																	</thead>
																</table>
															</div>
															<div id="flip-scroll" class="col-md-12-1"
																style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;">
																<table class="table table-condensed">
																	<tbody id="otHtmlVitals">
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
																	<i class="fa fa-bars"></i>Investigation
																</h4>
															</div>
															<div class="col-sm-12-1" style="margin-top: 3px;">
																<table class="table table-condensed">
																	<thead>
																		<tr>
																			<th class="col-md-1-1"><div class="TextFont">#</div></th>
																			<th class="col-md-7-1"><div class="TextFont">Particulars</div></th>
																			<th class="col-sm-1-1"><div class="TextFont">Package</div></th>
																			<th class="col-md-1-1"><div class="TextFont">View</div></th>
																			<th class="col-md-2-1"><div class="TextFont">Report</div></th>
																		</tr>
																	</thead>
																</table>
															</div>
															<div id="flip-scroll" class="col-md-12-1"
																style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;">
																<table class="table table-condensed">
																	<tbody id="coverSheetInvestDashBoard">

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
																	<i class="fa fa-bars"></i>Alerts & Allergies
																</h4>
															</div>

															<div class="col-sm-12-1" style="margin-top: 3px;">
																<table class="table table-condensed">
																	<thead>
																		<tr>
																			<th class="col-md-1-1"><div class="TextFont">#</div></th>
																			<th class="col-md-8-1"><div class="TextFont">Particulars</div></th>
																			<th class="col-md-2-1"><div class="TextFont">Date</div></th>

																		</tr>
																	</thead>
																</table>
															</div>
															<div id="flip-scroll" class="col-md-12-1"
																style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;">
																<table class="table table-condensed">
																	<tbody id="allergyAlertsCoverSheetTemp">
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
																style="margin-top: 0px;">
																<h4>
																	<i class="fa fa-bars"></i>Medication
																</h4>
															</div>
															<div class="col-sm-12-1" style="margin-top: 3px;">
																<table class="table table-condensed">
																	<thead>
																		<tr>
																			<th class="col-md-1-1 center">
																				<div class="TextFont">#</div>
																			</th>
																			<th class="col-md-4-1">
																				<div class="TextFont">Drugs</div>
																			</th>
																			<th class="col-md-1-1 center">
																				<div class="TextFont">Frequency</div>
																			</th>
																			<th class="col-md-1-1 center">
																				<div class="TextFont">Duration</div>
																			</th>
																			<th class="col-md-1-1 center"
																				style="padding-right: 20px;">
																				<div class="TextFont">Status</div>
																			</th>
																		</tr>
																	</thead>
																</table>
															</div>
															<div id="flip-scroll" class="col-md-12-1"
																style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;">
																<table class="table table-condensed">
																	<tbody id="prescriptionCoverSheetContent">
																	</tbody>
																</table>
															</div>
														</div>
														<!-- /BOX -->
													</div>
												</div>
											</div>
											<!-- End Code for Cover_Sheet GUI -->

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
																placeholder="Estimated Blood Loss" style="border: 1px solid orange;"
																onkeypress="return validateNumbers(event)"
																name="EBLoss" id="iEBLoss">
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
																onkeypress="return validateNumbers(event)"
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
																onkeypress="return validateNumbers(event)"
																name="ICount" id="iICount">
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
																id="iRecBy">
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
																id="iMOPCount">
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
																placeholder="OT Notes Comment"></textarea>
														</div>
													</div>
												</div>
												<div class="container">
													<div class="col-md-8-1" style="margin-top: 55px;">
														<div style="margin-top: 5px;" class="col-md-12-1">
															<div class="col-md-7-1">
																<div class="col-md-2-1 form-group"><label class="TextFont">Template List</label></div>
																<div class="col-md-6-1">
																	<select id="selCustomizeTemp" name="selCustomizeTemp"
																		style="margin-top: 0px;margin-left: 10%;"
																		class="col-md-11-1 form-control input-SmallText ">
																		<option onclick="setNewCustomizeTemp()" value="0">NewTemplate</option>
																	</select> <input type="hidden" name="idTempMast" value="0"
																		id="idTempMast">
																</div>
																<div class="col-md-4-1">
																	<button style="margin-left: 270%;" type="button"
																		id="isaveOTNotesData" onclick="saveOTNotesData()"
																		data-placement="left" data-toggle="tooltip"
																		class="btn btn-xs btn-success"
																		data-original-title="Save">
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

										<!-- 	<div ID="ANSNotes" class="tab-pane fade in">
												====== Row: 1 ======
												<div style="margin-top: 10px; width: 96%; margin-left: 2%;">
													MARKDOWN
													<div class="box border red">
														<div class="box-title">
															<h4>
																<i class="fa fa-pencil-square"></i>Anaesthesia Note
															</h4>
															<div class="tools hidden-xs">
																<a href="#box-config" data-toggle="modal" class="config">
																	<i class="fa fa-cog"></i>
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
													/MARKDOWN
												</div>
											</div> -->

											<!-- Start Code for Pre-Anaesthatic Assessment GUI -->
											<div id="PreAnasthAssess" class="tab-pane fade in">
												<!-- Start Code for row1 CPOE GUI -->

												<div class="tabbable tabs-left col-md-12-1"
													style="margin-top: 0px; margin-left: 5px;">
													<ul class="nav nav-tabs colorChanges" style="height: 250px;margin-top: 30px;">
														<li><a href="#MedicalHistory"
															id="medicalHistoryTAB"
															data-toggle="tab"> Medical History </a></li>
														<li><a href="#PresentMedications"
															id="PresentMedicationsTAB"
															data-toggle="tab"> Present Medications </a></li>
														<li><a href="#ExaminationFindMedications"
															id="ExaminationFindMedicationsTAB"
															data-toggle="tab"> Examination Findings Medications</a></li>
														<li><a  href="#Investigations" id="InvestigationsTAB"
															data-toggle="tab">Investigations</a></li>
														<li><a href="#PlanOfAnasthia" id="PlanOfAnasthiaTAB"
															data-toggle="tab"> Plan Of Anaesthia </a></li>
													<li><a href="#OtConsentFormTab" onclick="fetchPreAnaesthesiaInfo()" id="OtConsentForm1"
															data-toggle="tab">Consent Form</a></li>
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
																		class="" type="radio" id="radAppType1" name="cough"
																		value="yes"
																		onclick="createDivForCoughHistory('COUGH')"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" />&nbsp;Yes
																	</label>
																</div>
																<div class="col-sm-1-1" style="margin-top: 2px;">
																	<label class="radio TextFont Remove-Padding"> <input
																		type="radio" id="radAppType2" name="cough" value="no"
																		onclick="hideDivDateAndTime('COUGH')"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" />&nbsp;No
																	</label>
																</div>
																<div class="col-sm-8-1" style="margin-top: 10px;">
																	<div id="coughPresent" class="col-sm-12-1">
																		<div class="col-sm-8-1">
																			<input type="range" min="0" max="100"
																				class="defaultSlider" id="cough"
																				style="font-size: 11px; width: 90%;" />
																		</div>
																		<div class="col-sm-2-1" style="margin-top: 5px;">
																			<input type="text" class="col-sm-6-1 cough"
																				style="font-weight: bold;" name="qty"
																				id="qtyForCough" />
																		</div>
																		<div class="col-sm-2-1" style="margin-top: 5px;">
																			<select class="col-sm-12-1" style=""
																				id="selectCoughTime" name="selectCoughTime">
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
																		type="radio" id="radAppType3" name="dry" value="dry"
																		onclick=""
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" />&nbsp;Dry
																	</label>
																</div>
																<div class="col-sm-2-1">
																	<label class="radio TextFont Remove-Padding"> <input
																		value="expect" id="radAppType4" type="radio"
																		name="dry" onclick=""
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" />&nbsp;Expect
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
																		value="yes" type="radio" name="dyspnoea"
																		id="radAppType5"
																		onclick="createDivForCoughHistory('DYSPNOEA')"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" />&nbsp;Yes
																	</label>
																</div>
																<div class="col-sm-1-1" style="margin-top: 1px;">
																	<label class="radio TextFont Remove-Padding"> <input
																		type="radio" name="dyspnoea" id="radAppType6"
																		value="no" onclick="hideDivDateAndTime('DYSPNOEA')"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" />&nbsp;No
																	</label>
																</div>
																<div class="col-sm-8-1" style="margin-top: 10px;">
																	<div id="DYSPNOEAPresent" class="col-sm-12-1">
																		<div class="col-sm-8-1">
																			<input type="range" min="0" max="100"
																				class="defaultSlider" id="dyspnoea"
																				style="font-size: 11px; width: 90%;" name="duration" />
																		</div>
																		<div class="col-sm-2-1" style="margin-top: 5px;">
																			<input type="text" class="col-sm-6-1 dyspnoea"
																				style="font-weight: bold;" name="qty"
																				id="qtyForDyspnoea" />
																		</div>
																		<div class="col-sm-2-1" style="margin-top: 5px;">
																			<select class="col-sm-12-1" style=""
																				id="selectDyspnoeaTime" name="selectDyspnoeaTime">
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
																		value="yes" type="radio" name="giddiness"
																		id="radAppType7"
																		onclick="createDivForCoughHistory('GIDDINESS')"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" />&nbsp;Yes
																	</label>
																</div>
																<div class="col-sm-1-1" style="margin-top: 1px;">
																	<label class="radio TextFont Remove-Padding"> <input
																		value="no" type="radio" name="giddiness"
																		id="radAppType8"
																		onclick="hideDivDateAndTime('GIDDINESS')"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" />&nbsp;No
																	</label>
																</div>



																<div class="col-sm-8-1" style="margin-top: 10px;">
																	<div id="GiddnessPresent" class="col-sm-12-1">
																		<div class="col-sm-8-1">
																			<input type="range" min="0" max="100"
																				class="defaultSlider" id="giddiness"
																				style="font-size: 11px; width: 90%;" name="duration" />
																		</div>
																		<div class="col-sm-2-1" style="margin-top: 5px;">
																			<input type="text" class="col-sm-6-1 giddiness"
																				style="font-weight: bold;" name="qty"
																				id="qtyForGiddiness" />
																		</div>
																		<div class="col-sm-2-1" style="margin-top: 5px;">
																			<select class="col-sm-12-1" style=""
																				id="selectGiddinessTime" name="selectGiddinessTime">
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
																		value="yes" type="radio" name="chestpain"
																		id="radAppType9"
																		onclick="createDivForCoughHistory('chestPain')"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" />&nbsp;Yes
																	</label>
																</div>
																<div class="col-sm-1-1" style="margin-top: 1px;">
																	<label class="radio TextFont Remove-Padding"> <input
																		value="no" type="radio" name="chestpain"
																		id="radAppType10"
																		onclick="hideDivDateAndTime('chestPain')"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" />&nbsp;No
																	</label>
																</div>
																<div class="col-sm-8-1" style="margin-top: 10px;">
																	<div id="chestPainPresent" class="col-sm-12-1">
																		<div class="col-sm-8-1">
																			<input type="range" min="0" max="100"
																				class="defaultSlider" id="chestPain"
																				style="font-size: 11px; width: 90%;" name="duration" />
																		</div>
																		<div class="col-sm-2-1" style="margin-top: 5px;">
																			<input type="text" class="col-sm-6-1 chestPain"
																				style="font-weight: bold;" name="qty"
																				id="qtyForChestPain" />
																		</div>
																		<div class="col-sm-2-1" style="margin-top: 5px;">
																			<select class="col-sm-12-1" style=""
																				id="selectChestPainTime" name="selectChestPainTime">
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
																		<input type="checkbox" name="checkAppType1"
																		id="checkAppType1" value="hypertension" />H/O:HYPERTENSION
																	</label>
																</div>
																<div class="col-md-3-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px -9px;">
																		<input type="checkbox" name="checkAppType2"
																		id="checkAppType2" value="ihd" />IHD COAGULATION
																		DEFECT
																	</label>
																</div>
																<div class="col-md-3-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input value="jaundice" type="checkbox"
																		name="checkAppType3" id="checkAppType3" />JAUNDICE
																	</label>
																</div>
																<div class="col-md-3-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input value="diabetes" type="checkbox"
																		name="checkAppType4" id="checkAppType4" />DIABETES
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
																		<input type="checkbox" name="checkAppType5"
																		id="checkAppType5" value="hospitaliasation" />HOSPITALISATION
																	</label>
																</div>
																<div class="col-md-3-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px -9px;">
																		<input value="bloodtrans" type="checkbox"
																		name="checkAppType6" id="checkAppType6" />BLOOD
																		TRANSFUSION
																	</label>
																</div>
																<div class="col-md-3-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input value="allergy" type="checkbox"
																		name="checkAppType7" id="checkAppType7" />ALLERGY
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
																		<input id="checkAppType8" type="checkbox" value=""
																		name="checkAppType8" />SMOKING
																	</label>
																</div>
																<div class="col-md-3-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px -9px;">
																		<input id="checkAppType9" type="checkbox"
																		name="checkAppType9" value="bloodtrans" />ALCOHOL
																	</label>
																</div>
																<div class="col-md-3-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input id="checkAppType10" type="checkbox"
																		name="checkAppType10" value="allergy" />TOBACCO
																	</label>
																</div>
															</div>


															<div class="col-sm-12-1" style="padding-bottom: 10px;">
																<div class="divide-20"></div>
																<div class="divide-10"></div>
																<div class="form-group Remove-Padding col-md-7-1">
																	<label class="TextFont"> OTHER -:</label>
																	<textarea type="text" id="otherh" rows="2" cols="8"
																		class="form-control" style="margin-left: 160px;"></textarea>
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
																				onclick="displayCalendar(document.getElementById('crtdate'),'dd/mm/yyyy',this)">

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
																			<input type="checkbox" name="checkAppType11"
																			value="hosp" id="checkAppType11" /> &nbsp;Dilanatin
																			Phenobarb
																		</label>
																	</div>
																	<div class="col-md-3-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px -5px;">
																			<input value="bloodtrans" type="checkbox"
																			name="checkAppType12" id="checkAppType12" />&nbsp;Steroids
																			Anti hypertensive
																		</label>
																	</div>
																	<div class="col-md-3-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input value="allergy" type="checkbox"
																			name="checkAppType13" id="checkAppType13" />&nbsp;Anti
																			coagulants
																		</label>
																	</div>
																	<div class="col-md-3-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppType14"
																			value="hosp" id="checkAppType14" />&nbsp;Anti
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
																			style="margin-left: 20px;"></textarea>
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
																			class="form-control" style="margin-left: 20px;"></textarea>
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
																		class="form-control"></textarea>
																</div>

																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Icterus : </label>
																	<textarea type="text" id="ict" rows="1" cols="10"
																		class="form-control"></textarea>
																</div>
															</div>
															<div class="col-sm-12-1" style="padding-top: 3%;">
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Cyanosis:</label>
																	<textarea type="text" class="form-control" rows="1"
																		cols="10" id="cya" value=""></textarea>
																</div>
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Clubbing:</label>
																	<textarea type="text" class="form-control" rows="1"
																		cols="10" id="club" value=""></textarea>
																</div>
															</div>
															<div class="col-sm-12-1" style="padding-top: 3%;">
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Oedema:</label>
																	<textarea type="text" class="form-control " rows="1"
																		cols="10" id="ode" value=""></textarea>
																</div>
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Veins:</label>
																	<textarea type="text" class="form-control" rows="1"
																		cols="10" id="veins" value=""></textarea>
																</div>
															</div>
															<div class="col-sm-12-1" style="padding-top: 3%;">
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Obesity:</label>
																	<textarea type="text" class="form-control " rows="1"
																		cols="10" id="obs" value=""></textarea>
																</div>
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Neck:</label>
																	<textarea type="text" class="form-control" rows="1"
																		cols="10" id="neck" value=""></textarea>
																</div>
															</div>


															<div class="col-sm-12-1" style="padding-top: 3%;">
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Jaw:</label>
																	<textarea type="text" class="form-control " rows="1"
																		cols="10" id="jaw" value=""></textarea>
																</div>
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Teeth:</label>
																	<textarea type="text" class="form-control" rows="1"
																		cols="10" id="teeth" value=""></textarea>
																</div>
															</div>

															<div class="col-sm-12-1"
																style="margin-bottom: 3px; margin-top: 13px;">
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">Spine:</label>
																	<textarea type="text" class="form-control" rows="1"
																		cols="10" id="spine" value=""></textarea>
																</div>
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont">BHT &nbsp;(Sec) :</label>
																	<textarea type="text" class="form-control" rows="1"
																		cols="10" id="bht" value=""></textarea>
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
																		id="blood" name="blood">
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
																		id="hb" value="">&nbsp;
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> Platelets:</label> <input
																		type="text" class="form-control input-SmallText"
																		id="plat" value="">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> HIV :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="hiv" value="">&nbsp;
																</div>

																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> TC :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="tc" value="">
																</div>
															</div>
															<div class="col-sm-12-1">
																<div class="divide-10"></div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> P :</label> <input type="text"
																		class="form-control input-SmallText" id="p" value="">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> L :</label> <input type="text"
																		class="form-control input-SmallText" id="l" value="">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> E :</label> <input type="text"
																		id="e" class="form-control input-SmallText" value="">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> M :</label> <input type="text"
																		class="form-control input-SmallText" id="m" value="">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> B :</label> <input type="text"
																		class="form-control input-SmallText" id="bone"
																		value="">
																</div>
															</div>
															<div class="col-sm-12-1">
																<div class="divide-20"></div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> Smear :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="smear" value="">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> ESR &nbsp;( mm ) :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="esr" value="">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> Urine :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="urine" value="">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> BUN :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="bun" value="">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> BSL(R)&nbsp; ( mg% ) :</label>
																	<input type="text" class="form-control input-SmallText"
																		id="bsl" value="">
																</div>
															</div>
															<div class="col-sm-12-1">
																<div class="divide-20"></div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> F &nbsp;( mg% ) :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="f" value="">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> PP &nbsp;( mg% ) :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="pp" value="">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> K+ &nbsp;( mg% ) :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="kelec" value="">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> Cl+ &nbsp;( mg% ) :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="clelec" value="">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> S.Electrolytes Na+
																		&nbsp;( mg% ) :</label> <input type="text"
																		class="form-control input-SmallText" id="naelec"
																		value="">
																</div>
															</div>

															<div class="col-sm-12-1">
																<div class="divide-20"></div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> B :</label> <input type="text"
																		class="form-control input-SmallText" id="btwo"
																		value="">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> CT :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="ct" value="">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> PT :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="pt" value="">
																</div>
																<div class="form-group Remove-Padding col-md-3-1"
																	style="width: 39%; margin-left: 8px;">
																	<label class="TextFont"> S.Creat :</label> <input
																		type="text" class="form-control input-SmallText"
																		id="screat" value="">
																</div>
															</div>

															<div class="col-sm-12-1">
																<div class="divide-20"></div>
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont"> ECG :</label>
																	<textarea type="text" class="form-control" rows="1"
																		cols="10" id="ecg" value=""></textarea>
																</div>
																<div class="form-group Remove-Padding col-md-6-1" style="margin-left: 0px;">
																	<label class="TextFont"> X Ray Chest:</label>
																	<textarea type="text" class="form-control" rows="1"
																		cols="10" id="xrayid" value=""></textarea>
																</div>
															</div>

															<div class="col-sm-12-1" style="margin-bottom: 10px;">
																<div class="divide-20"></div>
																<div class="col-md-12-1">
																	<label class="TextFont"> Other :</label>
																	<textarea type="text" class="form-control" rows="1"
																		cols="10" id="otherid" value=""></textarea>
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
																		id="riskassess"></textarea>
																</div>
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont"> PROPOSED PLAN OF
																		ANAESTHESIA:</label>
																	<textarea type="text" class="form-control" id=proplan></textarea>
																</div>
															</div>
															<div class="col-sm-12-1" style="padding-top: 5%">
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont"> PRE-OPERATIVE
																		INSTRUCTION:</label>
																	<textarea type="text" id="preoper"
																		class="form-control "></textarea>
																</div>
																<div class="form-group Remove-Padding col-md-6-1">
																	<label class="TextFont"> PRE MEDICATION :</label>
																	<textarea type="text" id="premed" class="form-control"></textarea>
																</div>
															</div>
														</div>

														<!-- *************End Plan Of Anasthia tab-content-->
<!-- *************Stating of Consent Form tab-content-->

						<div id="OtConsentFormTab" class="tab-pane fade in col-md-12-1">

								<table style="background-color: #d9d9d9; table-layout: 2px;">
										<tr><th style="width: 80%;">
											<h6 style="margin-left:230px;" ><b>Pre Anaesthesia Information</b></h6>
											</th>
											<th style="width: 20%;">Date: <input style= "width:90px;" type="text" id="DateConsnt" value="<%=todays_date%>"onclick="displayCalendar(document.getElementById('DateConsnt'),'dd/mm/yyyy',this)"readonly="readonly" /></th>
											<th style="width: 20%;">
												<button style="margin-right: 20px;" class="btn btn-xs btn-success" onclick="SavePreAnaesthesiaInfo()" title="Save Pre Anaesthesia Information" data-placement="left" data-toggle="tooltip">
												Save
											</th></tr>
									</table>
									<table class="table table-bordered table-condensed cf">
										<tbody>
										<tr style="background-color: #e8e8e8">
										<td>
										<label>1. Have you ever been through a operation before?</label>
										</td>
										</tr>
										<tr style="background-color: #e8e8e8">
										<td>
										<textarea style="width: 90%;" id="que1"></textarea>
										</td>
										</tr>
										
										<tr style="background-color: #e8e8e8">
										<td>
										<label>2. Did you suffered from any side effect of anasthesia, such as vommiting after anasthesia? Yes or No?</label>
										</td>
										</tr>
										<tr style="background-color: #e8e8e8">
										<td>
										<textarea style="width: 90%;" id="que2"></textarea>
										</td>
										</tr>
										
										<tr style="background-color: #e8e8e8">
										<td>
										<label>3.Did you suffered from any serious illness and for which you have been hospitalised for many days?</label>
										</td>
										</tr>
										<tr style="background-color: #e8e8e8">
										<td>
										<textarea style="width: 90%;" id="que3"></textarea>
										</td>
										</tr>
										
										<tr style="background-color: #e8e8e8">
										<td>
										<label>4.Are you suffering from any of the following:</label>
										</td>
										</tr>
										<tr style="background-color: #e8e8e8">
										<td>
										<input type="checkbox" id="chkDiabetes" >Diabetes&nbsp;&nbsp;
										<input type="checkbox" id="chkHighBlood">High Blood Pressure&nbsp;&nbsp;
										<input type="checkbox" id="chkHrtdisease" >Heart Disease&nbsp;&nbsp;
										<input type="checkbox" id="chkAsthma">Asthma&nbsp;&nbsp;
										<input type="checkbox" id="chkAngiography" >Angiography&nbsp;&nbsp;
										<input type="checkbox" id="chkAngioplasty">Angioplasty&nbsp;&nbsp;
										<input type="checkbox" id="chkByPass" >ByPass, Kidney Disease&nbsp;&nbsp;
										<input type="checkbox" id="chkJaundice">Jaundice&nbsp;&nbsp;
										<input type="checkbox" id="chkFever">Fever&nbsp;&nbsp;
										</td>
										</tr>
										
										<tr style="background-color: #e8e8e8">
										<td>
										<label>5.Are you going through any medications?</label>
										</td>
										</tr>
										<tr style="background-color: #e8e8e8">
										<td>
										<textarea style="width: 90%;" id="que5"></textarea>
										</td>
										</tr>
										
										<tr style="background-color: #e8e8e8">
										<td>
										<label>6.Are you suffering from any kind of allergies?</label>
										</td>
										</tr>
										<tr style="background-color: #e8e8e8">
										<td>
										<textarea style="width: 90%;" id="que6"></textarea>
										</td>
										</tr>
										
										<tr style="background-color: #e8e8e8">
										<td>
										<label>7.Are you suffering from cold or cough?</label>
										</td>
										</tr>
										<tr style="background-color: #e8e8e8">
										<td>
										<textarea style="width: 90%;" id="que7"></textarea>
										</td>
										</tr>
										
										<tr style="background-color: #e8e8e8">
										<td>
										<label>8.Are you suffering from tootheache, tooth mobility Or Do you have dentures(Artificial Teeth)?</label>
										</td>
										</tr>
										<tr style="background-color: #e8e8e8">
										<td>
										<textarea style="width: 90%;" id="que8"></textarea>
										</td>
										</tr>
										
										<tr style="background-color: #e8e8e8">
										<td>
										<label>9.Are you facing any problem regarding urine & faeces?</label>
										</td>
										</tr>
										<tr style="background-color: #e8e8e8">
										<td>
										<textarea style="width: 90%;" id="que9"></textarea>
										</td>
										</tr>
										
										<tr style="background-color: #e8e8e8">
										<td>
										<label>10.Are you taking enough sleep regularly, Or do you take any sleeping pills?</label>
										</td>
										</tr>
										<tr style="background-color: #e8e8e8">
										<td>
										<textarea style="width: 90%;" id="que10"></textarea>
										</td>
										</tr>
										
										<tr style="background-color: #e8e8e8">
										<td>
										<label>11.Do you have any addiction?(Tobacco, alcohol, Ciggarate etc.)</label>
										</td>
										</tr>
										<tr style="background-color: #e8e8e8">
										<td>
										<textarea style="width: 90%;" id="que11"></textarea>
										</td>
										</tr>

										</tbody>
									</table>
						</div>
<!-- *************End Plan Of of Consent Form tab-content-->

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
											<!-- *************  tabbable  -->

											<!-- *************Start Anaesthesia Approval  -->

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
																class="form-control"></textarea>
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
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" />&nbsp;Approval
																	</label>
																</div>
																<div class="col-sm-3-1" style="margin-top: 2px;">
																	<label class="radio TextFont Remove-Padding"> <input
																		type="radio" id="disapproval" name="approval"
																		value="disApproval"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;" />&nbsp;Disapproval
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
																	type="text"></textarea>
															</div>
															<div class="col-sm-1-1">
																<label class="TextFont"></label>
															</div>
														</div>


													</div>
												</div>
												<!-- *************End Anaesthesia Approval  -->
											</div>
											<!-- *************  PreAnaestheticAssessment -->

                                              <!-- *************  PreAnaestheticAssessment -->
													<!-- Start PreOp and IntraOp Div -->


															<div id="preOperation" class="tab-pane fade in">
																<div
																	style="text-transform: capitalize; font-weight: bold; font-size: medium;"
																	class="col-sm-12-1 center">

																	<div class="col-sm-12-1" style="margin-top: 10px;">
																		<div class="form-group Remove-Padding col-md-10-1" style="margin-left: 50px">
																			<label class="TextFont">Pre Op :</label>
																			<textarea id="preOpNotes" class="form-control"
																				cols="10" rows="10" type="text"></textarea>
																				<div class="divide-20"></div>
																		</div>

																		<div class="form-group Remove-Padding col-md-1-1"
																			style="margin-top: 16px; padding-left: 20px;">
																			<input id="preOp"
																				class="btn btn-xs btn-success editUserAccess"
																				type="button" value="Save"
																				onclick="savePreOperationNotes1()">
																		</div>
																	</div>
																</div>
															</div>
															<!-- End PreOp and IntraOpDiv -->

													<!-- Start PreOp and IntraOp Div -->


															<div id="intraOperation" class="tab-pane fade in">
																<div
																	style="text-transform: capitalize; font-weight: bold; font-size: medium;"
																	class="col-sm-12-1 center">

																	<div class="col-sm-12-1" style="margin-top: 10px;">
																		<div class="form-group Remove-Padding col-md-10-1" style="margin-left: 50px">
																			<label class="TextFont">IntraOp-PostOp :</label>
																			<textarea id="intraOpNotes" class="form-control"
																				cols="10" rows="10" type="text"></textarea>
																				<div class="divide-20"></div>
																		</div>

																		<div class="form-group Remove-Padding col-md-1-1"
																			style="margin-top: 16px; padding-left: 20px;">
																			<input id="intraOp"
																				class="btn btn-xs btn-success editUserAccess"
																				type="button" value="Save"
																				onclick="saveIntraOperationNotes1()">
																		</div>
																	</div>
																</div>
															</div>
															<!-- End PreOp and IntraOpDiv -->

											<!-- Start Code for Conduct Of AnaesthiaGUI -->
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
																			value="" maxlength="45">
																	</div>

																	<div class="form-group Remove-Padding col-md-3-1">
																		<label class="TextFont"> Relaxant :</label> <input
																			name="txtRelax" id="txtRelax"
																			class="form-control input-SmallText" type="text"
																			value="" maxlength="45">
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
																				onchange="checkFutureDate('conductAnaesthesia')">

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
																			id="checkAppTypeForConduct8" value="hyper" /> Drug
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct9"
																			id="checkAppTypeForConduct9" value="hyper" /> Needle
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct10"
																			id="checkAppTypeForConduct10" value="hyper" /> Catheter
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct11"
																			id="checkAppTypeForConduct11" value="hyper" /> Space
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct12"
																			id="checkAppTypeForConduct12" value="hyper" /> Position
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
																			id="checkAppTypeForConduct13" value="hyper" /> N20
																		</label>
																	</div>
																	<div class="col-md-1-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct14"
																			id="checkAppTypeForConduct14" value="hyper" /> 02
																		</label>
																	</div>
																	<div class="col-md-1-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct15"
																			id="checkAppTypeForConduct15" value="hyper" /> Air
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct16"
																			id="checkAppTypeForConduct16" value="hyper" /> Halothane
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct17"
																			id="checkAppTypeForConduct17" value="hyper" /> Isoflunane
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct18"
																			id="checkAppTypeForConduct18" value="hyper" /> Sevoflunane
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
																			id="checkAppTypeForConduct19" value="hyper" /> Open
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct20"
																			id="checkAppTypeForConduct20" value="hyper" /> Circle
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct21"
																			id="checkAppTypeForConduct21" value="hyper" /> NRB
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct22"
																			id="checkAppTypeForConduct22" value="hyper" /> Bain
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct23"
																			id="checkAppTypeForConduct23" value="hyper" /> Laryngeal Mask
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
																			id="checkAppTypeForConduct24" value="hyper" /> Spontaneous
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct25"
																			id="checkAppTypeForConduct25" value="hyper" /> Controlled
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct26"
																			id="checkAppTypeForConduct26" value="hyper" /> Manual
																		</label>
																	</div>
																	<div class="col-md-2-1">
																		<label class="radio TextFont Remove-Padding"
																			style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																			<input type="checkbox" name="checkAppTypeForConduct27"
																			id="checkAppTypeForConduct27" value="hyper" /> Auto
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
																			cols="10" name="txtFindings" value=""></textarea>
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
																		value="" maxlength="45">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> B.P (Mm Hg.):</label> <input
																		name="txtOPBp" id="txtOPBp"
																		class="form-control input-SmallText" type="text"
																		value="" maxlength="45">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> R.R (/min.):</label> <input
																		name="txtOPRr" id="txtOPRr"
																		class="form-control input-SmallText" type="text"
																		value="" maxlength="45">
																</div>
																<div class="form-group Remove-Padding col-md-3-1">
																	<label class="TextFont"> Color :</label> <input
																		name="txtOPColor" id="txtOPColor"
																		class="form-control input-SmallText" type="text"
																		value="" maxlength="45">
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
																		id="checkApplTypeForConduct1" value="hyper" /> &nbsp;Cough
																		Reflex
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct2"
																		id="checkApplTypeForConduct2" value="hyper" /> &nbsp;Eyes
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
																		id="checkApplTypeForConduct3" value="hyper" /> &nbsp;Pain
																		Perception
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct4"
																		id="checkApplTypeForConduct4" value="hyper" /> &nbsp;Motor
																		Response
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct5"
																		id="checkApplTypeForConduct5" value="hyper" /> &nbsp;Obeys
																		Command
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct6"
																		id="checkApplTypeForConduct6" value="hyper" /> &nbsp;Verbal
																		Response
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct7"
																		id="checkApplTypeForConduct7" value="hyper" /> &nbsp;Fully
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
																		id="checkApplTypeForConduct8" value="hyper" /> Sore throat
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct9"
																		id="checkApplTypeForConduct9" value="hyper" /> Urine Ret
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct10"
																		id="checkApplTypeForConduct10" value="hyper" /> Nausea
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct11"
																		id="checkApplTypeForConduct11" value="hyper" /> Vomiting
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct12"
																		id="checkApplTypeForConduct12" value="hyper" />
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
																		id="checkApplTypeForConduct13" value="hyper" />Headache
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct14"
																		id="checkApplTypeForConduct14" value="hyper" />Backache
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct15"
																		id="checkApplTypeForConduct15" value="hyper" />Other
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
																		id="checkApplTypeForConduct16" value="hyper" />Pleasant
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct17"
																		id="checkApplTypeForConduct17" value="hyper" />Unpleasant
																	</label>
																</div>
																<div class="col-md-2-1">
																	<label class="radio TextFont Remove-Padding"
																		style="vertical-align: middle; margin: 0px 2px 0px 3px;">
																		<input type="checkbox" name="checkApplTypeForConduct18"
																		id="checkApplTypeForConduct18" value="hyper" />Nightmarish
																	</label>
																</div>
															</div>
														</div>
														<!-- *************End Post Operative Of Conduct tab-content-->
													</div>
												</div>
											</div>
											
							<!--Starts  Vikas -->		
							
								<div id="ipdConsentFormJSPHeadDiv"
											style="width: 100%; height: 82%; margin-top: 20px;">
											<div style="width: 100%; margin-left: 0%;">
												<div style="width: 15%; height: 100px;">
													<div style="width: 98%; padding-top: 10px; color: #333; background-color: #EEEEEE; padding: 1%; height: 50px;">
														<div style="width: 99%; float: left; padding-top: 5px; padding-left: 0px;">
															Template List</div>
														<div style="width: 99%; float: left; padding-left: 5px;">
															<select style="width: 99%;" name="selOtTemplate"
																id="selOtTemplate"></select> <input type="hidden"
																id="idTempMast" value="0" name="idTempMast" />
														</div>
													</div>
													<div style="width: 98%; padding-top: 10px; color: #333; background-color: #EEEEEE; padding: 1%; margin-top: 10px; height: 400px;">
														<div style="width: 99%; float: left; padding-top: 5px; padding-left: 0px;">
															All Form:</div>
														<div id="allConcentFormDiv1"
															style="width: 99%; float: left; padding-left: 5px; padding-bottom: 5px; height: 430px; overflow-y: auto;"></div>
													</div>
												</div>
												<div style="width: 84%; margin-top: -98px; margin-left: 175px;">
													<div>
<!-- 														<textarea name="content" id="editor1" style="width: 100%; height: 250px;"></textarea>
 -->														<textarea class="ckeditor ui-widget-content"
															name="editorSubjective" id="editor12"
															title="Rich Text Editor, editorSubjective"
															placeholder="Content"></textarea>
													</div>
												</div>
											</div>
										</div>		
											
							<!--End Vikas  -->
							
											<!-- End Code for Conduct Of AnaesthiaGUI -->

										</div>
										<!-- *************  main tab content -->
									</div>
									<!-- *************  main tabbable -->
								</div>
								<!-- *************  box border   -->

							</div>
						</div>
					</div>
				</div>
				<%@include file="Footer.jsp"%>
				<input type="hidden" id="OFdate-pick" value="<%=todays_dateOF%>" />
				<input type="hidden" id="queryType" name="queryType" value="" />
				<div id="divPatId" style="display: none;"><%=request.getParameter("myObj")%></div>
				<input type="hidden" id="tomId" value="<%=request.getParameter("tomid")%>"/>
				<input type="hidden" id="cType" value="<%=request.getParameter("cType")%>"/>
				<input id="pid" type="hidden"
					value="<%=request.getParameter("pid")%>"/> <input
					type="hidden" id="divIPDAjaxresponse">
			</div>
			<div id="patientdetails" style="display: none;"><%=request.getParameter("patientdetails")%></div>
			<div id="tretID" style="display: none;"><%=request.getParameter("treatID")%></div>
			<input id="treatmentId" type="hidden"
				value="<%=request.getParameter("treatmentId")%>" style="display: none;" />
			<div id="currentDate" style="display: none;"><%=todays_dateOF%></div>
		</c:if>
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>

		</c:if>
		<div id="userObj" style="display: none;"></div>
		<!-- @codeBy : Touheed @codeDate : 18-Feb-2016 -->

		<div id="iPopupFormula" class="modal fade in" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content col-md-11-1"
					style="margin-top: 7%; margin-left: 9%;">
					<div class="modal-header">
						<button class="btn btn-xs btn-danger" aria-label="Close"
							title="Close" data-dismiss="modal" type="button"
							style="margin-top: -5px;; margin-left: 730px"
							onclick="closeLabPop()">
							<i class="fa fa-times"></i>
						</button>
						<!-- <button class="btn btn-xs btn-success" title="Edit"
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
									</button> -->

						<h4 id="testHead" style="margin-top: -25px;">
							<i class="fa fa-fw"><img width="19px;" height="19px;"
								src="images/science-512.png" alt=""></i> Lab Test Results :
						</h4>
					</div>
					<div class="modal-body">
						<div class="divide-20"></div>
						<div class="col-sm-12-1">

							<div class="col-sm-6-1 center">
								<label class="TextFont col-md-3-1">Posted Date:</label> <label
									id="postDate" class="TextFont col-md-3-1"></label>
							</div>
							<div class="col-sm-6-1 center">
								<label class="TextFont col-md-3-1">Posted Time:</label> <label
									id="postTime" class="TextFont col-md-3-1"></label>
							</div>
						</div>

						<div class="divide-10"></div>

						<div id="ratediv" class="col-sm-12-1">
							<table class="table table-bordered"
								style="margin-top: 0px; width: 1067px;">
								<thead>
									<tr>
										<th class="col-sm-1 center">#</th>
										<th class="col-sm-5-1 center">Test Name</th>
										<th class="col-sm-2-1 center">Test Result</th>
										<th class="col-sm-2-1 center">Normal Values</th>
										<th class="col-sm-2-1 center">Method</th>
									</tr>
								</thead>
							</table>
						</div>
						<div id="testDivLab" class="col-md-12-1"
							style="width: 782px; height: 300px; overflow-y: scroll; border: 1px solid #436a9d; margin-top: -21px; margin-bottom: 10px;"></div>
					</div>
				</div>
			</div>
		</div>

		<!-- ---------------------------Touheed Khan @date : 27-Apr-2016--------------------- -->
		<div id="postPopup" class="modal fade in" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content col-md-7-1"
					style="margin-top: 16%; margin-left: 25%;">
					<div class="modal-header">
						<h4 id="testHead" style="margin-top: 0px;">
							<i class="fa fa-fw"><img width="19px;" height="19px;"
								src="images/science-512.png" alt=""></i>Select Posted Lab Test
							Result To View :

							<button class="btn btn-xs btn-success" title="View Post Result"
								data-dismiss="modal" type="button"
								style="margin-top: 0px;; margin-left: 16%"
								onclick="viewAllLabTestResult('OTAnaestheticAssess')">
								<i class="fa fa-eye View"></i>
							</button>

							<button class="btn btn-xs btn-danger" aria-label="Close"
								title="Close" data-dismiss="modal" type="button"
								style="margin-top: 0px;; margin-left: 0px"
								onclick="hideValueforResult()">
								<i class="fa fa-times"></i>
							</button>
						</h4>
					</div>
					<div class="modal-body">
						<div id="totalposttime" class="col-md-12-1">
							<table class="table table-bordered" style="margin-top: 0px;">
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

						<div class="col-md-7-1"
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
									onclick="printPrescriptionIPD('PRINT');" type="button">
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
							<label class="input-SmallText"> <input type="radio"
								checked="checked" value="standard"
								name="prepInstructionPaperSizePopup"
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
									onclick="printPrescription('PRINT');" type="button">
									<i class="fa fa-print"></i> Print
								</button>
								<button class="btn btn-xs btn-danger"
									onclick="printPrescription('HIDE_POPUP_PRINT');">
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
							<label class="input-SmallText"> <input type="radio"
								checked="checked" value="standard"
								name="prepInstructionPaperSizePopup"
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
								<i class="fa fa-fw"><img width="19px;" height="19px;"
									src="images/science-512.png" alt=""></i> Lab Test Results
								Editor:

								<button id="btnSavelab" class="btn btn-xs btn-success"
									onclick="saveEditorForResult()" title="Save"
									style="margin-left: 48%;">
									<i class="fa fa-save"></i>
								</button>
								<!-- <button class="btn btn-xs btn-success" onclick="" title="Edit" >
										<i class="fa fa-edit"></i>
										</button> -->
								<button class="btn btn-xs btn-danger"
									onclick="closeEditorForResult()" title="Close">
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
		<div id="SummarypostPopup" class="modal fade in" tabindex="-1">
			<div class="modal-dialog" style="border: thin; width: 90%;">
				<div class="modal-content col-md-12-1"
					style="margin-top: -1%; margin-left: 0%;">
					<div class="modal-header">
						<div class="box-title">
							<h4 class="col-md-10-1">Primary Summary:</h4>
							<div class="form-group col-md-1-1" style="float: right;">
								<button class="btn btn-xs btn-warning"
									onclick="printPrescription('SHOW_POPUP_PRINT');" type="button">
									<i class="fa fa-print"></i>
								</button>
								<button class="btn btn-xs btn-danger"
									onclick="printPrescription('HIDE_POPUP_PRINT');">
									<i class="fa fa-times"></i>
								</button>

							</div>
						</div>
					</div>
					<div class="modal-body">
						<div class="form-group col-md-12-1"
							style="background-color: #e7e7e7; margin-bottom: 2px;">
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label> Patient ID:</label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label id="pid1"> </label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label> Patient Name:</label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label id="pname"> </label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label> OPD No:</label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label id="opdNo"> </label>
							</div>
						</div>
						<div class="form-group col-md-12-1">
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label> Registered Date:</label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label id="regDate"> </label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label> Ref To:</label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label id="refTo"> </label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label> Doctor Name:</label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
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
							<div class="form-group col-md-3-1"
								style="background-color: #e7e7e7;">
								<label> Prep. Drug</label>
							</div>
							<div class="form-group col-md-3-1"
								style="background-color: #e7e7e7;">
								<label> Advice</label>
							</div>
							<div class="form-group col-md-3-1"
								style="background-color: #e7e7e7;">
								<label> Frequency</label>
							</div>
							<div class="form-group col-md-3-1"
								style="background-color: #e7e7e7;">
								<label> Duration</label>
							</div>
							<div class="form-group col-md-3-1"
								style="background-color: #e7e7e7;">
								<label> Qty</label>
							</div>
						</div>
						<div class="form-group col-md-12-1">
							<div class="form-group col-md-12-1 TextFont">
								<label id="prescription" class="form-group col-md-12-1"
									style="margin-top: 12px; font-size: 9px;"> </label>
							</div>
						</div>
						<div class="form-group col-md-12-1" style="margin-top: -20px;">
							<label style="font-size: 14px;"> CPOE:</label>
						</div>
						<div class="form-group col-md-12-1">
							<div class="form-group col-md-3-1"
								style="background-color: #e7e7e7;">
								<label> Particulars</label>
							</div>
							<div class="form-group col-md-3-1"
								style="background-color: #e7e7e7;">
								<label> Consultant Name</label>
							</div>
							<div class="form-group col-md-3-1"
								style="background-color: #e7e7e7;">
								<label> Date</label>
							</div>
							<div class="form-group col-md-3-1"
								style="background-color: #e7e7e7;">
								<label> Type</label>
							</div>
							<div class="form-group col-md-3-1"
								style="background-color: #e7e7e7;">
								<label> Test</label>
							</div>
						</div>
						<div class="form-group col-md-12-1">
							<div class="form-group col-md-12-1 TextFont">
								<label id="cpoeTest" class="form-group col-md-12-1"
									style="margin-top: 12px; font-size: 9px;"> </label>
							</div>
						</div>
						<div class="form-group col-md-12-1">
							<div class="form-group col-md-12-1" style="margin-top: -20px;">
								<label style="font-size: 14px;"> General Instructions:</label>
							</div>
							<div class="form-group col-md-12-1 TextFont">
								<label id="genInst" class="form-group col-md-12-1"
									style="font-size: 9px;"> </label>
							</div>
						</div>
						<div class="form-group col-md-12-1">
							<div class="form-group col-md-12-1 TextFont"
								style="margin-top: -20px;">
								<label style="font-size: 14px;"> Primary Instructions:</label>
							</div>
							<div class="form-group col-md-12-1">
								<label id="primInst" class="form-group col-md-12-1"
									style="font-size: 9px;"> </label>
							</div>
						</div>
						<div class="form-group col-md-12-1">
							<div class="form-group col-md-12-1" style="margin-top: -20px;">
								<label style="font-size: 14px;"> Surgery Advice:</label>
							</div>
							<div class="form-group col-md-6-1"
								style="background-color: #e7e7e7;">
								<label> Operation Name</label>
							</div>
							<div class="form-group col-md-6-1"
								style="background-color: #e7e7e7;">
								<label> Advice Date</label>
							</div>
							<div class="form-group col-md-12-1 TextFont">
								<label id="surgeryAdvice" class="form-group col-md-12-1"
									style="margin-top: 4PX; font-size: 9px;"> </label>
							</div>
						</div>
						<div class="form-group col-md-12-1" style="margin-top: -20px;">
							<label style="font-size: 14px;">Rediotherapy Advice:</label>
						</div>
						<div class="form-group col-md-12-1">
							<div class="form-group col-md-4-1"
								style="background-color: #e7e7e7;">
								<label> Serum Creatine</label>
							</div>
							<div class="form-group col-md-4-1"
								style="background-color: #e7e7e7;">
								<label> Radiation Technique</label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7;">
								<label> Simulation Date & Time</label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7;">
								<label> Treatment Date & Time</label>
							</div>
						</div>
						<div class="form-group col-md-12-1">
							<div class="form-group col-md-12-1">
								<label id="RedioAdvice" class="form-group col-md-12-1"
									style="margin-top: 4px; font-size: 9px;"> </label>
							</div>
						</div>
						<div class="form-group col-md-12-1" id="summaryData"></div>
					</div>

				</div>
			</div>
		</div>
		
		


			<!-- <div class="modal" tabindex="-1" role="dialog" id="vitalModalOT"> 
			  <div class="modal-dialog" role="document" style="width:40%;"> 
			   <div class="modal-content">
			      <div class="modal-header" style="background-color:LightBlue;">
			       <h5 class="modal-title" >Vitals</h5>
			
			      </div>
			       <div class="modal-body">
			       
				   <table class="datatable table table-striped table-bordered" id="vitalsTabel">
				 		<tbody id="vitalsBodyList" > </tbody>
				   </table>
			 
			      </div>
			     <div class="modal-footer">
			       <button type="button" class="btn btn-primary" onclick="saveOTVitals()">Save changes</button>
			       <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeVitalPopUp()">Close</button>
			      </div>
			    </div>
			  </div>
			 </div> -->
		
		<div id="IPDSummarypostPopup" class="modal fade in" tabindex="-1">
			<div class="modal-dialog" style="border: thin; width: 90%;">
				<div class="modal-content col-md-12-1"
					style="margin-top: -1%; margin-left: 0%;">
					<div class="modal-header">
						<div class="box-title">
							<h4 class="col-md-10-1">Primary Summary:</h4>
							<div class="form-group col-md-1-1" style="float: right;">
								<button class="btn btn-xs btn-warning"
									onclick="printPrescriptionIPD('SHOW_POPUP_PRINT');"
									type="button">
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
						<div class="form-group col-md-12-1"
							style="background-color: #e7e7e7; margin-bottom: 2px;">
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label> Patient ID:</label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label id="pid2"> </label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label> Patient Name:</label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label id="pname2"> </label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label> IPD No:</label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label id="ipdNo2"> </label>
							</div>
						</div>
						<div class="form-group col-md-12-1">
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label> Registered Date:</label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label id="regDate2"> </label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label> Ref To:</label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label id="refTo2"> </label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label> Doctor Name:</label>
							</div>
							<div class="form-group col-md-2-1"
								style="background-color: #e7e7e7">
								<label id="doc2"> </label>
							</div>
						</div>

						<div class="form-group col-md-12-1">
							<div class="form-group col-md-3-1" style="margin-top: -20px;">
								<label style="font-size: 14px;"> Previous Doctor Round
									Report:</label>
							</div>
							<div class="form-group col-md-12-1">
								<div class="form-group col-md-3-1"
									style="background-color: #e7e7e7;">
									<label> #.</label>
								</div>
								<div class="form-group col-md-3-1"
									style="background-color: #e7e7e7;">
									<label> Time</label>
								</div>
								<div class="form-group col-md-3-1"
									style="background-color: #e7e7e7;">
									<label> Clinical Notes</label>
								</div>
								<div class="form-group col-md-3-1"
									style="background-color: #e7e7e7;">
									<label> Investigation Advice</label>
								</div>
								<div class="form-group col-md-3-1"
									style="background-color: #e7e7e7;">
									<label> RoundBy</label>
								</div>
							</div>
							<div class="form-group col-md-12-1">
								<div class="form-group col-md-12-1 TextFont">
									<label id="DocRound2" class="form-group col-md-12-1"
										style="margin-top: 12px; font-size: 9px;"> </label>
								</div>
							</div>
							<div class="form-group col-md-12-1">
								<div class="form-group col-md-2-1" style="margin-top: -20px;">
									<label style="font-size: 14px;"> Subjective &
										Objective:</label>
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
								<div class="form-group col-md-3-1"
									style="background-color: #e7e7e7;">
									<label> Particulars</label>
								</div>
								<div class="form-group col-md-3-1"
									style="background-color: #e7e7e7;">
									<label> Consultant Name</label>
								</div>
								<div class="form-group col-md-3-1"
									style="background-color: #e7e7e7;">
									<label> Date</label>
								</div>
								<div class="form-group col-md-3-1"
									style="background-color: #e7e7e7;">
									<label> Type</label>
								</div>
								<div class="form-group col-md-3-1"
									style="background-color: #e7e7e7;">
									<label> Test</label>
								</div>
							</div>
							<div class="form-group col-md-12-1">
								<div class="form-group col-md-12-1 TextFont">
									<label id="cpoeTest2" class="form-group col-md-12-1"
										style="margin-top: 12px; font-size: 9px;"> </label>
								</div>
							</div>
							<div class="form-group col-md-12-1" style="margin-top: -20px;">
								<label style="font-size: 14px;"> IPD Services:</label>
							</div>
							<div class="form-group col-md-12-1">
								<div class="form-group col-md-3-1"
									style="background-color: #e7e7e7;">
									<label> Particulars/Details</label>
								</div>
								<div class="form-group col-md-3-1"
									style="background-color: #e7e7e7;">
									<label> Service Type</label>
								</div>
								<div class="form-group col-md-3-1"
									style="background-color: #e7e7e7;">
									<label> Quantity</label>
								</div>
								<div class="form-group col-md-3-1"
									style="background-color: #e7e7e7;">
									<label> Assign By</label>
								</div>
								<div class="form-group col-md-3-1"
									style="background-color: #e7e7e7;">
									<label> Assign Date & Time</label>
								</div>
							</div>
							<div class="form-group col-md-12-1">
								<div class="form-group col-md-12-1 TextFont">
									<label id="ipdServices2" class="form-group col-md-12-1"
										style="margin-top: 12px; font-size: 9px;"> </label>
								</div>
							</div>
							<div class="form-group col-md-12-1" style="margin-top: -20px;">
								<label style="font-size: 14px;"> Order Form:</label>
							</div>
							<div class="form-group col-md-12-1">
								<div class="form-group col-md-3-1"
									style="background-color: #e7e7e7;">
									<label> #.</label>
								</div>
								<div class="form-group col-md-3-1"
									style="background-color: #e7e7e7;">
									<label> Prep</label>
								</div>
								<div class="form-group col-md-3-1"
									style="background-color: #e7e7e7;">
									<label> Drug</label>
								</div>
								<div class="form-group col-md-3-1"
									style="background-color: #e7e7e7;">
									<label> Advice</label>
								</div>
								<div class="form-group col-md-3-1"
									style="background-color: #e7e7e7;">
									<label> Duration</label>
								</div>
							</div>
							<div class="form-group col-md-12-1">
								<div class="form-group col-md-12-1 TextFont">
									<label id="prescription2" class="form-group col-md-12-1"
										style="margin-top: 12px; font-size: 9px;"> </label>
								</div>
							</div>

							<div class="form-group col-md-12-1">
								<div class="form-group col-md-12-1" style="margin-top: -20px;">
									<label style="font-size: 14px;"> General Instructions:</label>
								</div>
								<div class="form-group col-md-12-1 TextFont">
									<label id="genInst2" class="form-group col-md-12-1"
										style="font-size: 9px;"> </label>
								</div>
							</div>
							<div class="form-group col-md-12-1">
								<div class="form-group col-md-12-1" style="margin-top: -20px;">
									<label style="font-size: 14px;"> Primary Instructions:</label>
								</div>
								<div class="form-group col-md-12-1 TextFont">
									<label id="primInst2" class="form-group col-md-12-1"
										style="font-size: 9px;"> </label>
								</div>
							</div>
							<div class="form-group col-md-12-1">
								<div class="form-group col-md-12-1" style="margin-top: -20px;">
									<label style="font-size: 14px;"> Admission Note:</label>
								</div>
								<div class="form-group col-md-12-1 TextFont">
									<label id="note2" class="form-group col-md-12-1"
										style="font-size: 9px;"> </label>
								</div>
							</div>
							<div class="form-group col-md-12-1" id="summaryData"></div>
						</div>

					</div>
				</div>
			</div>
		</div>

			<!-- Code End -->


			<!-- Dialog box for edit Vital -->
			<div id="vitalEditDia"
				style="diplay: none; width: 100%; overflow-x: scroll;"
				title="All Vitals">
				<table style="width: 100%"
					class="table table-condensed table-bordered table-stripped">
					<tbody id="vitalsVIEWALLDATE"></tbody>
				</table>
			</div>

			<div id="vitalNewDia" style="diplay: none; width: 70%" title="Vitals">
				<table class="table table-condensed table-bordered table-stripped" id="otHtmlVitalsTemplate">
				</table>
				<table class="table table-condensed table-bordered table-stripped" id="vitalNewDiaTableUI">
				</table>
			</div>
			
			<!-- Start  Lab test Result Pop Up -->
			<div class="modal" tabindex="-1" role="dialog" id="labResultModal"> 
			  <div class="modal-dialog" role="document" style="width:40%;"> 
			   <div class="modal-content">
			      <div class="modal-header" style="background-color:blue;">
			       <h5 class="modal-title" >Vitals</h5>
			
			     </div>
			      <div class="modal-body">
			
			       <table border="1"
						class="table table-bordered table-striped table-condensed">
						<thead>
							<tr>
								<th>#</th>
								<th>Test Name</th>
								<th>Normal Range</th>
								<th>Result</th>
								
							</tr>
						</thead>

						<tbody id="labTestResultBody">

						</tbody>
					</table>
			 
			     </div>
			     <div class="modal-footer">
			       <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeLabResultPopUp()">Close</button>
			      </div>
			    </div>
			  </div>
			 </div>
<!-- End  Lab test Result Pop Up -->
		
			
			<!--/click Popup modal-->
			<!-- @codeBy: Touheed  @codeDate:25-Feb-2016 (End)-->
			<div id="previousOtNotes"></div>			
			<input type="hidden" id="id" value="0" />
			<input type="hidden" id="preOpId" value=<%=request.getParameter("id")%>/>
			<input type="hidden" id="idForconsnt" value="0" />
			<input type="hidden" id="userDocId" value="0" />
			<input type="hidden" id="pageName" value="OTAnaestheticAssess" />
			<input type='hidden' value='0' id='idOTNote'/>
			<div id="customizeTemplateDiv" style="display: none;"></div>
            <input type="hidden" id="OTVitalsType"	value="" />
			<input type="hidden" value="0" id="idLabResult" />
			<input type="hidden" value="default" id="approvalStatus" />
			<div id="testDetails" style="display: none;"></div>
			<div id="vitalsOTDiv" style="display: none;"></div>
			<input type="hidden" style="display: none;" id="todaysDefaultDate" />
			<input type="hidden" id="treStart" value="0" /> <input type="hidden"
				id="sobobjData" value="0" /> <input type="hidden" id="pid2"
				value="0" /> <input type="hidden" id="tid2" value="0" /> <input
				type="hidden" id="pid1" value="" /> <input type="hidden" id="tid1"
				value="" />
				<!-- @codeBy : Kavita @codeDate : 3-Feb-2017 --> 
			<input id='testmasterId' type='hidden' name='testmasterId' value='0'/>
			<input id='otConsentTemplateId' type='hidden' name='otConsentTemplateId' value='0'/>
			<div id="userObj" style="display: none;"></div>
			
			<input type="hidden" id="unitid" value="<%=session.getAttribute("uId")%>">
			<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
			<input id="treatmentId" type="hidden" value="<%=request.getParameter("treatmentId")%>" />
			<input id="hiddenDate" type="hidden" /> <input type="hidden"
					id="todays_date" value="<%=todays_date%>" />
			
</body>
</html>