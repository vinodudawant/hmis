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
	
<!-- FONTS -->
<link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700' rel='stylesheet' type='text/css'>

<!-- include js for development -->
<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>

<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<script src="jquery/jquery-2.0.3.min.js"></script>
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
<script type="text/javascript" src="js/ivf_autosummary.js"></script>
<script type="text/javascript" src="js/IPD_AutoSummary.js"></script>
<script type="text/javascript" src="js/dd_history.js"></script>
<script type="text/javascript" src="js/ipdhistory.js"></script>
<script type="text/javascript" src="js/ipd_treatmentAtdischarge.js"></script>
<script type="text/javascript" src="js/patient_death_summary_report.js"></script>
<script type="text/javascript" src="js/AutoDischargeSummary.js"></script> <!-- Add By Rahul -->
<!-- <script type="text/javascript" src="js/dd_prescription.js"></script>

	

 --> 


<!-- /for Developers  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>

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

<!--TIMEPEACKER -->
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>


<!-- BOOTSTRAP WYSIWYG -->
<script type="text/javascript" src="js/bootstrap-wysiwyg/jquery.hotkeys.min.js"></script>
<script type="text/javascript" src="js/bootstrap-wysiwyg/bootstrap-wysiwyg.min.js"></script>
<!-- CKEDITOR -->
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("IPD_DischargeAutoSummary"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
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
	 	getPatientDataByTreatmentId(<%=request.getParameter("treatmentId")%>); //add by paras get patient details 
	getPatientDataByTreatmentIdIPD(<%=request.getParameter("treatmentId")%>); 
	getConsultantDrName(<%=request.getParameter("treatmentId")%>);
		//Added By Pooja
		getPatientBedHall(<%=request.getParameter("treatmentId")%>);
		var flow =""+'<%=resourceBundleEhat1.getObject("shraddha").toString()%>'+"";
		if(flow=="on"){
			$("#print1").hide();
			$("#print2").hide();
			$("#print3").hide();
			$("#btnAutoIpd").show();
			}
		else{
			$("#btnAutoIpd").hide();
		}

		var type = $("#callfromipd").val();
		if(type == "PDP"){
			$("#bed").hide();
			$("#saveDischargeSummeryButton").hide();
		}
		$("#disnote").addClass("anchorActive");
		//fetchDischargeCode();
		var pid = $("#pid").val();
		//setPatientInfo(pid, "ipd"); //old common temp its disabled by sagar  
		var lang = $("#language").html();
		if (lang == "Marathi") {
			// $("#instruction").html($("#InstructionListMarathi").html());
		} else {
			// $("#instruction").html($("#InstructionListEnglish").html());
		}
		
		
		//for cheif compliants for rising
		var flow1 =""+'<%=resourceBundleEhat1.getObject("rising").toString()%>'+"";

			 if(flow1=="on"){
				 $("#chiefComplaintsDiv").show();
				 $("#lbch").text("History of Present Iilness");
			 }
			 else
				 {
			//	 $("#chiefComplaintsDiv").hide();
				 $("#lbch").text("Chief Complaints");
				 }

		/* prep. */
		fetchPreperationsList("DoctorDesk");
		// getPatientInfoByTreatmentId(); 
		/* prescription instruction */
		fectchAllPrescriptionInstruction("IPD");

		/* unit */
		fetchUnitTypeList("DoctorDesk");
		fetchAutoDischargeSummery();
		
		/* route */
		fetchAllMedicationMaster("RouteType");

		/****************fetchPreperationsList*****************/
		fetchPreperationsList("DoctorDesk");
		//Diagnosis
		showAssessmentTemp(); //Added by sagar (summary shows)
		//Admission note
		//Investigation
		//fetchTestDashboard();
		fetchipddetailsdrdesk("AutoDischarge");
		//Medicine
		//featchOrderFormByDate('previous'); // Added by sagar
		//featchOrderFormByDate('previousAuto');
		 
		//Medicine
		//featchTreatmentAtDischarge();   //Added by sagar
		//getPatientInfoByTreatmentId
		//OT notes
		//fetchOTNotesByTreatmentId();
		fetchCustomizeTemplateListOT();

		/******************update discharge date ****************/
		setTimeout(function() {
	//	getPatientDischargeDate();
		}, 100);
		/******************new FetchDischargeAutoSummary********/
		//FetchDischargeAutoSummary();
		

		/* Fetch History*/
		//fetchAddIPDHistory("IPD_DischargeAutoSummary");  //Added By Sagar
		
		//fetchDoc();
		display('IPD_DischargeAutoSummary');
		$("#causeOfDeath").hide();
		/*Fetch OT Data*/
		fetchCustomizeTemplateList();
		fetchOperationsData();
		setTemplateFunc();
		/*setTimeout(function() {
			fetchOTNotesData("autoDischarge");
			}, 300);*/		
			FetchAdmissionNote();
			diagosListOPD();
		//fetchipddetailsdrdesk();
		//fetchbilldetails();
        getDoctornameForCommonTemp2();   //Added by sagar
	
       var physicalDisFlag =  $("#physicalDisFlag").val();
        if(physicalDisFlag=="Y"){
        	$("#physicalDischarge").hide();
        }else{
        	//$("#physicalDischarge").show();
        }
       // savefollowUpForPatient('FETCH');
        getPrevPatdetailsOPD();
        
        // 16 June 20 - For Covid Hospital
      //  fetchDischargeIpdbilDiscount("discharge");
      //  fetchIPDDischargesPatientTotals("ipd");
       // IPDDischargereturnAmoutPharma();
        //displayTotalRecievedAmountByIPDDischarge('current');
        //setIPDDischargeBillMode();
        
        getListOfDeathSummaryReportByTreatmentId();
        //getOperationNameForAutoDiscahargeSummary();/* Added By Annapurna */

        checkDeathStatus();
       
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
					
					
					SimpleDateFormat formatter2 = new SimpleDateFormat("hh:mm a");
					String todays_time = formatter2.format(currentDate.getTime());
			%>
			<%@include file="left_menu_bill.jsp"%>
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
										 	   <button class="btn btn-xs btn-primary editUserAccess" style="margin-right: 20px;"
													id="physicalDischarge" data-toggle="tooltip"
													data-placement="left" title="Physical Discharge"
													onclick="physicalDischargeToIpd()">Physical Discharge
												</button>     
												
												 <button class="btn btn-xs btn-success editUserAccess" 
													id="saveDischargeSummeryButton" data-toggle="tooltip"
													data-placement="left" title="Save IPD Discharge Summary "
													onclick="saveAutoDischargeSummery();">
													<i class="fa fa-save"></i>
												</button> 
												<!-- <button class="btn btn-xs btn-warning" data-toggle="tooltip"
													data-placement="left" title="Print "
													onclick="AutoDischargeSummaryPrint()">
													<i class="fa fa-print"></i>
												</button> -->
												
												<button class="btn btn-xs btn-warning" id="btnAutoIpd"data-toggle="tooltip"
													data-placement="left" title="Print "
													onclick="AutoDischargeSummaryPrintforIpd('all')">
													<i class="fa fa-print"></i>
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
												
												 <button   id="print3" onclick="showIpdDischargeSummary();" title="" data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-warning" data-original-title="Print">
														<i class="fa fa-print"></i>
												</button>
												
												<button class="btn btn-xs btn-danger" data-toggle="tooltip"
													data-placement="left" title="Discard "
													onclick="refreshTrue();">
													<i class="fa fa-refresh"></i>
												</button>
												
												
												<!-- 16 June 20 Close Treatment flow -->
												<%-- <button class="btn btn-xs btn-success editUserAccess" type='button'
															data-toggle="tooltip" data-placement="left" id="btnGenInvoice"
															title="Generate Invoice" value='Generate Invoice' style="margin-left: 10px"
															onclick='IPDDischargeGenerateInvoice(<%=request.getParameter("treatmentId")%>)'>
														<i class="fa fa-money"></i>
														</button> --%>
													
													<!-- 	<button class="btn btn-xs btn-success editUserAccess" type='button'
															data-toggle="tooltip" data-placement="left" id="btnTreatClose"
															title="Close Treatment" value='Close Treatment'
															onclick='closePatientTreatmentForIPDFromDischarge(<%-- <%=request.getParameter("treatmentId")%> --%>)'>
														<i class=" fa fa-times"></i>
														</button> -->
														<!-- End -->
											</div>
										</ul>

									</div>
								</div>
								<!-- <div id="commonPatInfo" class="col-md-12-1"
									style="margin-top: -21px;"></div> -->
									
								<%-- <div class="panel panel-primary">
								<div class="panel-body">
								<div class="row">
								<div class="col-md-1">
									<img id="patImg" class="img-responsive" src="ehat-design/img/profile/avatar.jpg" alt="">
								</div>
								<div class="col-md-10" style="margin-top: 10px;">
								<div class="col-md-3">
											<div class="form-group">
											<input type="hidden"  id="pt_Id" value="0">
											<input type="hidden"  id="tr_Id" value="<%=request.getParameter("treatmentId")%>">
											<input type="hidden"  id="pt_Id" value="<%=request.getParameter("patientId")%>">
											<input type="hidden"  id="bill_Id" value="0">
												<label class="control-label lblBold" id="lblCenterPatientId">Patient Id :</label>  
												<label id="centeripdID" class="control-label" ></label> 
											</div>
										</div>

										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Age :</label> <label id="age" class="control-label"></label>
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

										<div class="col-md-3" >
											<div class="form-group">
												<label class="control-label lblBold">Ref.BillNo: </label>  <label id="billNo" class="control-label"></label> 

											</div>
										</div>

										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Gender :</label> <label id="sex" class="control-label">male</label>

											</div>
										</div>


										<div class="col-md-3" >
											<div class="form-group">
												<label class="control-label lblBold">Corporate :</label> <label id="corporate" class="control-label"> </label>

											</div>
										</div>
										
										<div class="col-md-3" >
											<div class="form-group">
												<label class="control-label lblBold">Consulting Dr:</label> <label id="consultingDoctorr" class="control-label"> </label>

											</div>
										</div>
										
										<div  class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Treatment Id :</label> <label id="treatmentid" class="control-label"> <%=request.getParameter("treatmentId")%></label>

											</div>
										</div>

										<div class="col-md-3" >
											<div class="form-group">
											<input type="hidden"  id="dtofadmission" value="0">
												<label class="control-label lblBold">DOA:</label> <label id="doa" class="control-label"></label>

											</div>
										</div>

										<div class="col-md-3">
											<div class="form-group">
                                                 <label class="control-label lblBold">Ref Dr:</label> <label id="refDoctor" class="control-label"></label>                                                      
                                             </div>
										</div>
										
										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Bill Category :</label>
												<label id="billCategoty" class="control-label"> </label>

											</div>
										</div>
										
										<div class="col-md-3">
                                              <div class="form-group">
                                                    <label class="control-label lblBold">Hall(HType):</label> <label id="hallName" class="control-label"></label>   
                                              </div>
                                    	</div>
                                    	
                                    	<div class="col-md-3">
                                              <div class="form-group">
                                                    <label class="control-label lblBold">Bill No:</label> <label id="DisBillNo" class="control-label"></label>   
                                              </div>
                                    	</div>
								</div>
								</div>
								</div>
								</div>	
 --%>						<div class="alert alert-block alert-info fade in col-md-12-1"style="padding-block-end:5%; padding-top:3%;margin-top:-29px;">
						
							<div class="row">
								<div class="col-md-1">
									<img id="patImg" style="width: 100%;height: 45px" src="ehat-design/img/profile/avatar.jpg"
										class="img-responsive">
								</div>

								<div class="col-md-11">
									<div class="col-md-12">
										<div class="col-md-3" style="width: 22%">
											<div class="form-group">
											<input type="hidden"  id="pt_Id" value="0">
											<input type="hidden"  id="tr_Id" value="<%=request.getParameter("treatmentId")%>">
											<input type="hidden"  id="bill_Id" value="0">											
											<label class="control-label lblBold" id="lblCenterPatientId">Patient Id :</label>  <label id="patientId" class="control-label" style="display: none"></label> 
											<label class="control-label lblBold" id="lblCenterPIdVal"></label>
											<label id="pId" class="control-label" ></label>
											<input type="hidden"  id="documentId" value="0">
											<input type="hidden"  id="prescriptionId" value="0">
											<input type="hidden" id="medicineID" value="0" />
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
												<label class="control-label lblBold">Treatment Id :</label> <label id="treatmentid" class="control-label"> <%=request.getParameter("treatmentId")%></label>
											</div>
										</div>
										
										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">IPD No :</label> <label id="opdNo" class="control-label"></label>
											</div>
										</div>
										
										<div class="col-md-3" style="width: 22%">
											<div class="form-group">
												<label class="control-label lblBold">Age:</label> <label id="age" class="control-label"></label>
											</div>
										</div>
										
										<div class="col-md-5" style="width: 33%">
                                              <div class="form-group">
                                                    <label class="control-label lblBold">Ref Dr:</label> <label id="refDoctor" class="control-label"></label>   
                                              </div>
                                         </div>
										
										<div class="col-md-3" style="display:none;">
											<div class="form-group">
												<label class="control-label lblBold">Ref.BillNo: </label>  <label id="billNo" class="control-label"></label> 
											</div>
										</div>
										<div class="col-md-3" style="width: 22%">
											<div class="form-group">
												<label class="control-label lblBold">Gender :</label> <label id="sex" class="control-label">male</label>
											</div>
										</div>
										
										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Bill No:</label> <label id="billNo1" class="control-label"> </label>
											</div>
										</div>
										
										<div class="col-md-3" style="width: 22%">
											<div class="form-group">
												<label class="control-label lblBold">DOA:</label> <label id="doa" class="control-label"> DOA-D</label>
											</div>
										</div>
										
										<div class="col-md-5" style="width: 33%">
											<div class="form-group">
												<label class="control-label lblBold">Consulting Dr:</label> <label id="consultingDoctorr" class="control-label"> </label>
											</div>
										</div>
										
										<div class="col-md-3" style="width: 22%">
											<div class="form-group">
												<label class="control-label lblBold">Bill Category :</label>
												<label id="billCategoty" class="control-label"> </label>
											</div>
										</div>
										
										<div class="col-md-3">
                                              <div class="form-group">
                                                    <!-- <label class="control-label lblBold">Hall(HType):</label> <label id="hallName" class="control-label"></label> -->
                                                       <label class="control-label lblBold">Height/weight: </label> <label id="h_w" class="control-label"></label> 
                                              </div>
                                    	</div>
										
										<div id="finalAdvancediv" class="col-md-3" style="width: 22%">
                                              <div class="form-group">
                                                    <!-- <label class="control-label lblBold">Hall(HType):</label> <label id="hallName" class="control-label"></label> -->
                                                       <label class="control-label lblBold">Common Advance :</label> <label id="finalAdvance" class="control-label"></label> 
                                              </div>
                                    	</div>
										
										<div class="col-md-5" style="width: 33%">
											<div class="form-group">
												<label class="control-label lblBold">Corporate :</label> <label id="corporate" class="control-label"> </label>
											</div>
										</div>
										
                                         <div class="col-md-4">
                                              <div class="form-group">
                                                    <!-- <label class="control-label lblBold">Hall(HType):</label> <label id="hallName" class="control-label"></label> -->
                                                       <label id="hallnm" class="control-label lblBold">Hall:</label> <label id="hallName" class="control-label"></label> 
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
										onclick="displayCalendar(document.getElementById('discharge_date'),'dd/mm/yyyy',this)"
										class="form-control input-SmallText col-md-6-1"></input>
								</div>

								<div class="col-md-4-1" style="">
									<label class="TextFont col-md-4-1">Discharge Time <b
										style="color: red;">*</b></label><input type="text"
										id="discharge_Time"
										class="form-control input-SmallText col-md-6-1"></input>
								</div>

								<div class="col-md-4-1" style="">
									<label class="TextFont col-md-4-1">Type of Discharge <b
										style="color: red;">*</b></label> <select name="discharge_Type"
										id="discharge_Type" onchange="checkDeathStatus()"
										class="form-control input-SmallText TextFont col-md-6-1">
										<option value="select">-SELECT-</option>
										<option value="Discharge" selected="selected">Discharge</option>
										<option value="Transferred">Transferred</option>
										<option value="DAMA">DAMA</option>
										<option value="Absconded">Absconded</option>
										<option value="Dead">Death</option>

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
											<li><a data-toggle="tab" href="#Treatment" onclick="getAllPrescriptionsByTreatmentId2(<%=request.getParameter("treatmentId")%>,<%=session.getAttribute("uId")%>);"><span
													class="hidden-inline-mobile">Treatment</span></a></li>
											<li><a data-toggle="tab" href="#OTNotes" onclick="fetchOTNotesData('autoDischarge')"><span
													class="hidden-inline-mobile">OT Notes</span></a></li>
											<li><a data-toggle="tab" href="#Condition"><span
                                                    class="hidden-inline-mobile">Condition on Discharge</span></a></li>
                                            <!-- <li onclick="savefollowUpForPatient('FETCH')"><a data-toggle="tab" href="#TreatmentDischarge"><span
                                                    class="hidden-inline-mobile">Treatment at Discharge</span></a></li>
                                                            class="hidden-inline-mobile">Condition on Discharge</span></a></li> -->
                                            <li  onclick="getPrescriptionTemplate(this.id);"><a data-toggle="tab" href="#TreatmentDischarge" id="prescription"><span
                                                    class="hidden-inline-mobile">Treatment at Discharge</span></a></li>
                                            <li id="nicu"><a data-toggle="tab" href="#NICU"><span
                                                    class="hidden-inline-mobile" onclick="showIPDNO(),fetchAutoDischargeSummery();">PAEDIATRIC
                                                        DEPT (NICU)</span></a></li>
											<li id="paedDept"><a data-toggle="tab" href="#PAED"><span
													class="hidden-inline-mobile" onclick="fetchAutoDischargeSummery();">PAEDIATRIC DEPT </span></a></li>
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
										<div style="height: 250px; width: 1060px; overflow: auto;">
										 <textarea class="ckeditor ui-widget-content" name="adNote"
												title="Admission Note" placeholder="Content" 
												id="adNote" style="border: none; width: 1072px; height: 160px;"></textarea>
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
														<textarea id='preSymp' rows='4' cols='175' class=""></textarea>
													</div>
													<div class="divide-10"></div>
													<div class="col-md-12-1" style="padding-right: 8px;">
														<div class="divide-10"></div>
														<label class="TextFont">Clinical Findings :</label>
													</div>
													<div>
														<textarea id='cliFind' rows='4' cols='175' class=""></textarea>
													</div>
												</div>
											</div> -->
											
											 <!-- Start Code for #History(Date:-08/10/2016) GUI -->
											<%-- <div id="History" class="tab-pane fade">
                                                <div id="historyRow" class="col-md-12-1"
														style="padding-top: 0px;">
													</div>
														<div class="tabbable tabs-left col-md-12-1"
															style="margin-top: -9px; margin-left: 5px;">
															<ul class="nav nav-tabs" style="height: 380px;">
																<li class="active"><a href="#chiefComplaints"
																	data-toggle="tab"> Chief Complaints and Duration </a></li>
																<li><a href="#pastMedHistory" data-toggle="tab">
																		Past Medical History </a></li>
																<li><a href="#PastPresentFamilyHistory" data-toggle="tab">
																		Past/Present/Family History </a></li>
																<li><a href="#OnExaminations"
																	data-toggle="tab"> On Examinations </a></li>
																<li><a href="#SystematicExaminations"
																	data-toggle="tab"> Systematic Examinations </a></li>
																
															</ul>
															
															<div class="tab-content col-md-9-1"
																style="margin-top: 0px;">
														<div id="chiefComplaints"
																	class="tab-pane fade in active col-md-12-1">
																	
													<div class="tab-content col-md-12-1"
																style="margin-top: 8px;">
														<div class="col-sm-12-1" style="padding-left: 30%;padding-top: 5px;">
														
														<div class="col-sm-3-1" style="margin-top: 15px;">
															<label class="TextFont">Medical Officer Name.</label>
														</div>
														<div class="col-sm-3-1" style="padding-left: -5%; margin-top: 15px;">
															<input type="text" class="form-control input-SmallText"
																id="medOffName" name="name" readonly="readonly"
																value="${sessionScope.userName}"/>
														</div>
														
														<div class="col-sm-2-1" style="margin-top: 15px; padding-left: 3%;">
															<label class="TextFont">MRN No.</label>
														</div>
														<div class="col-sm-3-1" style="margin-top: 15px;">
															<input type="text" class="form-control input-SmallText"
																id="mrn" name="mrn" readonly="readonly"/>
														</div>
													  </div>
													  
													  <div class="col-sm-1-1" style="margin-top: -32px; margin-left:94%;">
													<div class="divide-10"></div>
													<button class="btn btn-xs btn-warning" data-toggle="tooltip"
													data-placement="left" title="Print "
													onclick="IPDHistoryPrint();">
													<i class="fa fa-print"></i>
												</button> 
												
											</div>
													</div>
																	
																	<div id="row_1" class="col-sm-12-1"
																		style="margin-top: 25px;">
                                                                     </div>
                                                           <table class='table table-bordered'
															style='margin-top: 25px; width: 100%;'>
															<thead>
																<tr>
																	<th class='col-sm-1-1 center'
																		style='width: 29px; height: 21.5px; font-size: "103";'><label
																		class='TextFont'>#</label></th>
																	<th class='col-sm-4-1 center'
																		style=' width: 65px; height: 21.5px; font-size: "3";'><label
																		class='TextFont'>Chief Complaints</label></th>
																	<th class='col-sm-6-1 center'
																		style='height: 21.5px; font-size: "3";'><label
																		class='TextFont'> Duration</label></th>
																	<!-- <th style='height: 21.5px; width: 25px;'><input
																		type="button" onclick="createDivIPDHistory()"
																		value="+" /> <input type="button"
																		onclick="removeChifComp('RowCount')" value="-" /> -->
																</tr>
															</thead>
														</table>
														
														<div
														style='width: 100%; margin-top: -22px; height: 130px; overflow-y: scroll; border: 1px solid lightgrey;'>
														<table
															class="table table-condensed table-bordered table-stripped cf">
															<tbody id="historyDiv">
															</tbody>
														</table>
													</div>
													
													<div class="col-md-10-1" style="padding-left: 1%; margin-top: 5%;" >
															<label class="TextFont">Clinical Findings:</label>
															<textarea id='clinicalFinding' rows='3' cols='52' class="" readonly="readonly"></textarea>
													</div>
													
                                         			</div>
                                         			
                                         			
                                         			<div id="pastMedHistory"
																	class="col-md-12-1 tab-pane fade in">
																	
													<div class="tab-content col-md-12-1"
																style="margin-top: 8px;">
													</div>
																	
													<div id="row_1" class="col-sm-12-1"
																		style="margin-top: 30px;">
                                                                     </div>
                                                            <div class="col-md-5-1 form-group"
															style="font: bold; padding-bottom: 1%; padding-top: 3%; padding-left: 2%;">
															<label>Past Medical History</label>

															<div id="tableContent"
																style="width: 100%; height: 20%; font-family: Tahoma, Geneva, sans-serif; padding-top: 1%; font-size: 13px; float:;">

																<table style="border: 1px solid lightgrey;"
																	cellpadding="0" cellspacing="0">
																	<tr>
																		<td align="center"
																			style="height: 35px; border: 1px solid lightgrey;"></td>
																		<td align="center"
																			style="height: 35px; border: 1px solid lightgrey;">Yes/
																			No</td>
																		<td align="center"
																			style="height: 35px; border: 1px solid lightgrey;">Duration(Hr.)</td>

																	</tr>
																	<tr>
																		<td width="30%" align="center"
																			style="border: 1px solid lightgrey;">DM</td>
																		<td style="border: 0.2px solid lightgrey;" width="20%";><input
																			type="checkbox" name=""
																			style="width: 105%; border: 0.2px solid lightgrey;"
																			id="chkDm" readonly="readonly" /></td>
																		<td><input type="text" name=""
																			style="width: 100%;"
																			id="txtDm" readonly="readonly" /></td>

																	</tr>
																	<tr>
																		<td width="30%" align="center"
																			style="border: 1px solid lightgrey;">HTN</td>
																		<td style="border: 0.2px solid lightgrey;"><input
																			type="checkbox" name=""
																			style="width: 105%; border: 0.2px solid lightgrey;"
																			id="chkHtn" readonly="readonly"></td>
																		<td><input type="text" name=""
																			style="width: 100%; "
																			id="txtHtn" readonly="readonly"></td>

																	</tr>
																	<tr>
																		<td width="30%" align="center"
																			style="border: 1px solid lightgrey;">IHD</td>
																		<td style="border: 0.2px solid lightgrey;"><input
																			type="checkbox" name=""
																			style="width: 105%; border: 0.2px solid lightgrey;"
																			id="chkIhd" readonly="readonly"></td>
																		<td><input type="text" name=""
																			style="width: 100%; "
																			id="txtIhd" readonly="readonly"></td>

																	</tr>
																	<tr>
																		<td width="30%" align="center"
																			style="border: 1px solid lightgrey;">BA/COPD</td>
																		<td style="border: 0.2px solid lightgrey;"><input
																			type="checkbox" name=""
																			style="width: 105%; border: 0.2px solid lightgrey;"
																			id="chkBaco" readonly="readonly"></td>
																		<td><input type="text" name=""
																			style="width: 100%; "
																			id="txtBaco" readonly="readonly"></td>

																	</tr>
																	<tr>
																		<td width="30%" align="center"
																			style="border: 1px solid lightgrey;">OTHER</td>
																		<td style="border: 0.2px solid lightgrey;"><input
																			type="checkbox" name=""
																			style="width: 105%; border: 0.2px solid lightgrey;"
																			id="chkOther" readonly="readonly"></td>
																		<td><input type="text" name=""
																			style="width: 100%;"
																			id="txtOther" readonly="readonly"></td>

																	</tr>

																</table>
															</div>
														</div> 
														
														<div class="col-md-4-1" style="padding-left: 10%; margin-top: 2%;" >
															<label class="TextFont">Past Surgical History:</label>
															<textarea id='pastSurgHistory' rows='3' cols='52' class="" readonly="readonly"></textarea>
														</div>
														
														<div class="col-md-4-1" style="padding-left: 10%; margin-top: 2%;">
															<label class="TextFont">Medications:</label>
															<textarea id='medications' rows='3' cols='52' class="" readonly="readonly"></textarea>
														</div>
                                                </div>
                                                <div id="PastPresentFamilyHistory"
																	class="col-md-12-1 tab-pane fade in">
													<div id="row_1" class="col-sm-12-1"
																		style="margin-top: 58px;">
                                                                     </div>
                                                          <div class="col-md-4-1">
															<label class="TextFont">Past Reguler :</label>
															<textarea id='pastReguler' rows='3' cols='40' class="" readonly="readonly"></textarea>
														</div>
														<div class="col-md-4-1" style="padding-left: 0.8%;">
															<label class="TextFont">Present Reguler :</label>
															<textarea id='PresentReguler' rows='3' cols='40' class="" readonly="readonly"></textarea>
														</div>
														<div class="col-md-4-1" style="padding-left: 1.6%;">
															<label class="TextFont">GYNAE/OBS History :</label>
															<textarea id='gynac' rows='3' cols='40' class="" readonly="readonly"></textarea>
														</div>
														<div class="col-md-12-1"
														style="padding-right: 8px; margin-top: 1%;">
														<div class="divide-10"></div>
														<div class="col-md-4-1">
															<label class="TextFont">Any allergies or adverse
																drug reactions?:</label>
															<textarea id='drugReaction' rows='3' cols='40' class="" readonly="readonly"></textarea>
														</div>
														<div class="col-md-4-1" style="padding-left: 0.8%;">
															<label class="TextFont">Family History:</label>
															<textarea id='familyHis' rows='3' cols='40' class="" readonly="readonly"></textarea>
														</div>
														<div class="col-md-4-1" style="padding-left: 1.6%;">
															<label class="TextFont">Personal History:</label>
															<textarea id='perHistory' rows='3' cols='40' class="" readonly="readonly"></textarea>
														</div>
													</div>
												<div class="col-md-12-1"
														style="padding-right: 8px; margin-top: 1%;">
														<div class="divide-10"></div>
														<div class="col-md-4-1">
															<label class="TextFont">Habbits:</label>
															<textarea id='habbits' rows='3' cols='40' class="" readonly="readonly"></textarea>
														</div>
														<div class="col-md-4-1" style="padding-left: 0.8%;">
															<label class="TextFont">Bowel:</label>
															<textarea id='bowel' rows='3' cols='40' class="" readonly="readonly"></textarea>
														</div>
														<div class="col-md-4-1" style="padding-left: 1.6%;">
															<label class="TextFont">Blader:</label>
															<textarea id='blader' rows='3' cols='40' class="" readonly="readonly"></textarea>
														</div>
													</div>
													</div>
													<div id="OnExaminations"
																	class="col-md-12-1 tab-pane fade in">
													<div id="row_1" class="col-sm-12-1"
																		style="margin-top: 58px;">
                                                                     </div>
                                                             <div class="form-group Remove-Padding col-md-4-1"
															style="padding-left: 15px;">
															<div class="divide-10"></div>
															<label class="TextFont">VITALS:</label>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 0px;">
																<label class="TextFont">Temperature:</label> <input
																	type="text" id="temparature" name="temparature"
																	placeholder="Temparature"
																	class="form-control input-SmallText" readonly="readonly"/>
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Pulse:</label> <input
																	type="text" id="pulse" name="pulse" placeholder="Pulse"
																	class="form-control input-SmallText" readonly="readonly"/>
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">BP :</label> <input type="text"
																	id="bp" name="bp" placeholder="BP"
																	class="form-control input-SmallText" readonly="readonly"/>
															</div>
														</div>   
                                                     <div class="form-group Remove-Padding col-md-4-1"
															style="padding-left: 15px;">
															<div class="divide-10"></div>
															<label class="TextFont">General Exam:</label>
															<div class="divide-10"></div>
															<div class="col-md-12-1">
																<div class="form-group Remove-Padding col-md-12-1"
																	style="margin-top: 0px;">
																	<label class="TextFont">Pallor:</label> <input
																		type="text" id="pallor" name="Pallor"
																		placeholder="Pallor"
																		class="form-control input-SmallText" readonly="readonly"/>
																</div>
																<div class="form-group Remove-Padding col-md-12-1"
																	style="margin-top: 5px;">
																	<label class="TextFont">Clubbing:</label> <input
																		type="text" id="clubbing" name="Clubbing"
																		placeholder="Clubbing"
																		class="form-control input-SmallText" readonly="readonly"/>
																</div>

																<div class="form-group Remove-Padding col-md-12-1"
																	style="margin-top: 5px;">
																	<label class="TextFont">Lymph Adenopathy:</label> <input
																		type="text" id="lymph" name="Lymph Adenopathy"
																		placeholder="Lymph Adenopathy "
																		class="form-control input-SmallText" readonly="readonly"/>
																</div>
															</div>
														</div>
                                                          <div class="form-group Remove-Padding col-md-4-1"
															style="padding-left: 15px; padding-top: 20px;">
															<div class="divide-10"></div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 0px;">
																<label class="TextFont">Icterus:</label> <input
																	type="text" id="lcterus" name="Lcterus"
																	placeholder="Lcterus"
																	class="form-control input-SmallText" readonly="readonly"/>
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Oedema:</label> <input
																	type="text" id="oedema" name="Oedema"
																	placeholder="Oedema"
																	class="form-control input-SmallText" readonly="readonly"/>
															</div>
														</div>
													</div>
													<div id="SystematicExaminations"
																	class="col-md-12-1 tab-pane fade in">
													<div id="row_1" class="col-sm-12-1"
																		style="margin-top: 58px;">
                                                                     </div>
                                                  <div class="col-md-12-1"
														style="left: 15px; margin-top: 1%;">
														<div class="form-group Remove-Padding col-md-3-1"
															style="margin-top: 0px;">
															<label class="TextFont">R/S:</label> <input type="text"
																id="rs" name="R/S " placeholder="R/S"
																class="form-control input-SmallText" readonly="readonly"/>
														</div>

														<div class="form-group Remove-Padding col-md-3-1"
															style="margin-top: 0px; margin-left: 45px;">
															<label class="TextFont">CVS:</label> <input type="text"
																id="cvs" name="CVS" placeholder="CVS"
																class="form-control input-SmallText" readonly="readonly"/>
														</div>

														<div class="form-group Remove-Padding col-md-3-1"
															style="margin-top: 0px; margin-left: 45px;">
															<label class="TextFont">CNS:</label> <input type="text"
																id="cns" name="CNS" placeholder="CNS"
																class="form-control input-SmallText" readonly="readonly"/>
														</div>

														<div class="form-group Remove-Padding col-md-3-1"
															style="margin-top: 0px; margin-left: 45px;">
															<label class="TextFont">PA:</label> <input type="text"
																id="pa" name="PA" placeholder="PA"
																class="form-control input-SmallText" readonly="readonly"/>
														</div>
                                                     </div>
                                                     <div class="col-md-12-1"
														style="padding-right: 8px; margin-top: 3%;">
														<div class="divide-10"></div>
														<div class="col-md-6-1">
															<label class="TextFont">Local Examinations:</label>
															<textarea style='margin-left: 3%;' id='localExm' rows='3'
																cols='40' class="" readonly="readonly"></textarea>
														</div>
														<div class="col-md-6-1" style="padding-left: 0.8%;">
															<label class="TextFont">Investigation Reports:</label>
															<textarea style='margin-left: 1%;' id='invsRep' rows='3'
																cols='40' class="" readonly="readonly"></textarea>
														</div>
													</div>
														<div class="col-md-12-1"
														style="padding-right: 8px; margin-top: 3%;">
														<div class="divide-10"></div>
														<div class="col-md-6-1">
															<label class="TextFont">Provisional Diagnosis:</label>
															<textarea style='margin-left: 0%;' id='provDia' rows='3'
																cols='40' class="" readonly="readonly"></textarea>
														</div>
														<div class="col-md-6-1" style="padding-left: 0.8%;">
															<label class="TextFont">Treatment Plan:</label>
															<textarea style='margin-left: 9%;' id='treatPlan'
																rows='3' cols='40' class="" readonly="readonly"></textarea>
														</div>
													</div>
													
													
																		
													<!-- <div class="col-md-12-1"
														style="padding-right: 8px; margin-top: 1%;">
														<div class="divide-10"></div>
														<div class="col-md-6-1">
															<label class="TextFont" style="padding-left: 2%;">Sign:</label>
														</div>
														<div class="col-md-6-1" style="padding-left: 0.8%;">
															<label class="TextFont">Sign Of Consultant:</label>
														</div>
													</div>
													 -->
													</div>
                                         		</div>
											</div>
                                           </div> --%>

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
																		<input type="text" value="${sessionScope.userName}" readonly="readonly"
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
																	<button onclick="saveOPDHistory()"
																		title="Save History " data-placement="left"
																		data-toggle="tooltip" id="saveAddIpdHistory"
																		class="btn btn-xs btn-success"
																		style="margin-left: 2px;">
																		<i class="fa fa-save"></i>
																	</button>
																	<button onclick="prinOPDHistory();" title="Print "
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
																				<th style=" width: 25px; height: 21.5px; font-size: &amp;quot;"
																					class="col-sm-1-1 center"><label
																					class="TextFont">#</label></th>
																				<th style=" width: 102px; height: 21.5px; font-size: &amp;quot;"
																					class="col-sm-4-1 center"><label
																					class="TextFont">Chief Complaints</label></th>
																				<th style="height: 21.5px; font-size: &amp;quot;"
																					class="col-sm-6-1 center"><label
																					class="TextFont"> Duration</label></th>
																				<th style="height: 21.5px; width: 15px;"><input
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
																<div  id ="chiefComplaintsDiv"class="col-md-10-1" style="padding-left: 1%; margin-top: 2%;">
                                                                <label class="TextFont" id="lbch">Chief Complaints:</label>
                                                                <textarea id="chiefComplaintsTxt" class="" rows="3" cols="52"></textarea>
                                                                </div>
																<div style="padding-left: 1%; margin-top: 2%;"
																	class="col-md-10-1">
																	<label class="TextFont">Negative History:</label>
																	<textarea class="" cols="52" rows="3" style="margin-left: 4%;"
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
															<div style="margin-top: 0px;" class="col-sm-12-1"
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
																	<div style="padding-right: 8px; margin-top: 3%;" class="col-md-12-1">
																		<div class="divide-10"></div>
																		<div class="col-md-6-1">
																			<label class="TextFont">Provisional
																				Diagnosis:</label>
																			<textarea class="" cols="40" rows="3" id="provDia"
																				style="margin-left: 1%;"></textarea>
																		</div>
																		<div style="padding-left: 0.8%;"
																			class="col-md-6-1">
																			<label class="TextFont">Treatment Plan:</label>
																			<textarea class="" cols="40" rows="3" id="treatPlan"
																				style="margin-left: 6%;"></textarea>
																		</div>
																	</div>
																	
																		<div style="padding-right: 8px; margin-top: 3%;" class="col-md-12-1">
																		<div class="divide-10"></div>
																		<div style="padding-left: 0.8%;"
																			class="col-md-6-1">
																			<label class="TextFont">Habbits :</label>
																			<textarea class="" cols="40" rows="3" id="habbits"
																				style="margin-left: 6%;"></textarea>
																		</div>
																	</div>
																	
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
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
																				<th class="col-md-3-1 center"
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
														<textarea id='specInvest' rows='4' cols='179' class=""></textarea>
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
																						class="TextFont">Prescription</div></th>
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
																			 <!--  <tbody id="prescriptionContent">  -->
																		
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
														<textarea id='riskFact' rows='4' cols='179' class=""></textarea>
													</div>
													<div class="divide-10"></div>
													<div class="col-md-12-1" style="padding-right: 8px;">
														<div class="divide-10"></div>
														<label class="TextFont">Complications : </label>
													</div>
													<div>
														<textarea id='complication' rows='4' cols='179' class=""></textarea>
													</div>
													<div class="divide-10"></div>
													<div class="col-md-12-1" style="padding-right: 8px;">
														<div class="divide-10"></div>
														<label class="TextFont"> Treatment Given :</label>
													</div>
													<div>
														<textarea id='treatmentGiven' rows='4' cols='179' class=""></textarea>
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
																		class="col-md-12-1 form-control input-SmallText "
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
													<div class="col-md-8-1" style="margin-top: 20px;">
														<div style="margin-top: 5px;" class="col-md-12-1">
															<div class="col-md-7-1">
																<div class="col-md-2-1 form-group"><label class="TextFont">Template List</label></div>
																<div class="col-md-6-1">
																	<select id="selCustomizeTemp" name="selCustomizeTemp"
																		style="margin-top: 0px;margin-left: 10%;"
																		class="col-md-11-1 form-control input-SmallText ">
																		<option onclick="setCustomizeTemplate()" value="0">NewTemplate</option>
																	</select> <input type="hidden" name="idTempMast" value="0"
																		id="idTempMast">
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
														<textarea id='condDisc' rows='4' cols='179' class=""></textarea>
													</div>
													<div class="col-md-12-1" 
													    style="padding-right: 8px; margin-top: 0px;">
                                                    <div class="divide-10"></div>
                                                    <label class="TextFont">Advised on Discharge :</label>
                                                    </div>
                                                     <div>
                                                      <textarea id="advDisc" class="" cols="179" rows="4"></textarea>
                                                       </div>
													<div class="divide-20"></div>
												</div>
											</div>
											<div ID="TreatmentDischarge" class="tab-pane fade in">
											<div class="col-md-12-1"  style="margin-top: 0px;">
												<div class="col-md-2-1" style="margin-top: 0px;">
																			<div class="col-md-6-1" style="margin-top: 0px;">
																				<strong>Follow-up After:</strong>
																			</div>

																			<div class="col-md-5-1" style="margin-top: 6px;">
																				<select
																					class="col-md-12-1 form-control input-SmallText"
																					id="DWMSelect">
																					<option value="">-SELECT-</option>
																					<option onclick="getInstruction()" value="DAY">DAY</option>
																					<option onclick="getInstruction()" value="WEEK">WEEK</option>
																					<option onclick="getInstruction()" value="MONTH">MONTH</option>
																				</select>
																			</div>
																		</div>
														<div class="col-md-2-1" style="margin-top: 6px;">
																				<select id="noOf"
																					onchange="getInstruction(),savefollowUpForOPDPatient('SAVE')"
																					class="col-md-12-1 form-control input-SmallText">
																					<option value="">-SELECT-</option>
																					<option value="0">0</option>
																					<option value="1">1</option>
																					<option value="2">2</option>
																					<option value="3">3</option>
																					<option value="4">4</option>
																					<option value="5">5</option>
																					<option value="6">6</option>
																					<option value="7">7</option>
																					<option value="8">8</option>
																					<option value="9">9</option>
																					<option value="10">10</option>
																					<option value="11">11</option>
																					<option value="12">12</option>
																				</select>
																			</div>					
													<div class="col-md-2-1" style="margin-left:373px">
														<button style="margin-top: 10px; margin-left: -13px;"
															class="btn btn-xs btn-warning" data-toggle="modal"
															onclick="refreshOPDPrescriptionTemplatesModal(); fetchOPDPrescriptionTemplatesByID('0')"
															data-target="#AddUpdatePrescriptionTemplatePopup1">
															Create and View Temp.</button>
														<!-- <button
															onclick="showUpdateOrderTemp();refreshDocOrderformTemplate();disableDocOrderformTemplate1();refreshDocOrderformTemplateMedicine();fetchDocOrderformTemplateByID(0);"
															style="margin-top: 10px; margin-left: -13px;"
															data-toggle="modal" class="btn btn-xs btn-warning">Create
															and View Temp.</button> -->
													</div>
													<div style="float: right;padding-right: 20px; ">General Medicine: 
												<input id="medicineNotAvailableCheckbox" type="checkbox" 
																				style="cursor: pointer;" /></div>
																				</div>	
														<div class="col-md-12-1"
																		style="margin-top: 3px; height: 14px;">
																		<div id="divfollow" class="col-md-5-1"
																			style="margin-top: 5px;"></div>
																		<div id="divfollowDate" class="col-md-3-1"
																			style="margin-top: 5px; color: red;"></div>
																	</div>							
												<input type="hidden" id="paediatricsMedicineFlag"
														value="N" /> <input type="hidden"
													id="paediatricsMedicineCapacity" value="" />
												<input type="hidden" id="idpaediatric_dept_nicu" value="0" />
												<input type="hidden" id="idadvice_on_desc" value="0" />
												<input type="hidden" id="idimaging" value="0" />
												<input type="hidden" id="idelectrolyte" value="0" />
												<input type="hidden" id="idventilation" value="0" />
												<input type="hidden" id="idpaediatric_dept" value="0" />
												<div id="col2" class="col-sm-1-1"
													style="margin-top: 10px; padding-left: 3px;">
													<div class="form-group Remove-Padding col-sm-12-1">
														<div class="divide-10"></div>
														<label class="TextFont" for="exampleInputEmail1">Prepration<b
															style="color: red; padding-left: 2px;">*</b></label> <select
															id="prep" class="form-control input-SmallText"
															 onchange="fetchRoutesByPreparationId('prescription')">
															 </select>
													</div>
												</div>
												<div id="col3" class="col-sm-1-1" style="margin-top: 10px;">
													<div class="form-group Remove-Padding col-sm-12-1">
														<div class="divide-10"></div>
														<label class="TextFont" for="exampleInputEmail1">
															Medicine Name <b style="color: red; padding-left: 2px;">*</b>
														</label>
														<div id="divTagname">
															<input type="text" placeholder="Name" id="name"
																name="name"
																class="typeahead form-control input-SmallText"
																 onkeypress="autoSuggestMedicines(this.id, 'prescription');" />
																<!-- onkeypress="setPrescriptionAutocompleteNameID(this.id, 'afterLoad'); -->
																
														</div>

														<input type="hidden" id="medicineID" value="0" />
													</div>
												</div>
												<div id="col4" class="col-sm-1-1" style="margin-top: 10px;">
													<div class="form-group Remove-Padding col-sm-12-1">
														<div class="divide-10"></div>
														<label class="TextFont" for="exampleInputEmail1">Strength</label>
														<input type="text" placeholder="Strength" name="strength"
															id="strength" class="form-control input-SmallText" />
													</div>
												</div>
												<div id="col5" class="col-sm-1-1" style="margin-top: 10px;">
													<div class="form-group Remove-Padding col-sm-12-1">
														<div class="divide-10"></div>
														<label class="TextFont" for="exampleInputEmail1">Dose
															Type</label> <input type="text" placeholder="Dose" name="dose"
															id="dose"
															onkeypress="return validateNumberMinusSign(event)"
															class="form-control input-SmallText" />
													</div>
												</div>
												<div id="col4A" class="col-sm-1-1"
													style="margin-top: 10px;">
													<div class="form-group Remove-Padding col-sm-12-1">
														<div class="divide-10"></div>
														<label class="TextFont" for="exampleInputEmail1">Unit</label>
														<select name="unit" id="unit"
															class="form-control input-SmallText">
														</select>
													</div>
												</div>
												
												<div id="col11" class="col-sm-1-1"
																style="margin-top: 10px;">
																<div class="form-group Remove-Padding col-sm-12-1">
																	<div class="divide-10"></div>
																	<label class="TextFont" for="exampleInputEmail1">MO - AN - EV - NT </label>
																	<div class="col-sm-12-1" style=" margin-top: -5px; margin-left:2px">
																	<input id="mo" name="timeslot"  value="Morning"  onclick ="setFrequency()" type="checkbox" style="cursor: pointer;">
																	<input id="an" name="timeslot" value="Afternoon" onclick ="setFrequency()" type="checkbox" style="cursor: pointer;">
																	<input id="ev" name="timeslot" value="Evening" onclick ="setFrequency()" type="checkbox" style="cursor: pointer;">
																	<input id="nt"  name="timeslot" value="Night" onclick ="setFrequency()" type="checkbox" style="cursor: pointer;">
																	</div>
																	
																</div>
															</div>
															

												<div id="col6" class="col-sm-1-1" style="margin-top: 10px;">
													<div class="form-group Remove-Padding col-sm-12-1">
														<div class="divide-10"></div>
														<label class="TextFont" for="exampleInputEmail1">Frequency</label>
														<input type="text" placeholder="Frequency"
															name="frequency" id="frequency"
															onkeyup="calculateQuantity()"
															onkeypress="return validateNumbers(event)"
															class="form-control input-SmallText" />
													</div>
												</div>
												<div id="col7" class="col-sm-1-1" style="margin-top: 10px;">
													<div class="form-group Remove-Padding col-sm-12-1">
														<div class="divide-10"></div>
														<label class="TextFont" for="exampleInputEmail1">Instructions</label>
														<select id="instruction"
															class="form-control input-SmallText"></select>
													</div>
												</div>
												<div id="col8" class="col-sm-1-1" style="margin-top: 10px;">
													<div class="form-group Remove-Padding col-sm-12-1">
														<div class="divide-10"></div>
														<label class="TextFont" for="exampleInputEmail1">Route</label>
														<select name="route" id="route"
															class="form-control input-SmallText"><option
																value="0">SELECT</option></select>
													</div>
												</div>
												<!-- <div id="col8" class="col-sm-1-1"
													style="margin-top: 10px;">
													<div class="form-group Remove-Padding col-sm-12-1">
														<div class="divide-10"></div>
														<label class="TextFont">Route</label> <select
															name="route" id="route"
															class="form-control input-SmallText">
															<option value="0">SELECT</option>
														</select>
													</div>
												</div> -->
												<div id="col9" class="col-sm-1-1" style="margin-top: 10px;">
													<div class="form-group Remove-Padding col-sm-12-1">
														<div class="divide-10"></div>
														<label class="TextFont" for="exampleInputEmail1">Days<b
															style="color: red; padding-left: 2px;">*</b></label> <input
															type="text" placeholder="Days" name="days" id="days"
															class="form-control input-SmallText"
															onkeyup="calculateQuantity()"
															onkeypress="return validateNumbers(event)" />
													</div>
												</div>
												<div id="col10" class="col-sm-1-1" style="margin-top: 10px;">
													<div class="form-group Remove-Padding col-sm-12-1">
														<div class="divide-10"></div>
														<label class="TextFont" for="exampleInputEmail1">Quantity<b
															style="color: red; padding-left: 2px;">*</b></label> <input
															type="text" placeholder="Qty" name="qty" id="qty"
															class="form-control input-SmallText"
															onkeypress="return validateNumbers(event)" />
													</div>
												</div>
												<div id="col10" class="col-sm-1-1" style="margin-top: 10px;">
													<div class="form-group Remove-Padding col-sm-12-1">
														<div class="divide-10"></div>
														<div class="divide-20"></div>
														<label class="TextFont" for="exampleInputEmail1"></label>
														<!-- <input type="button" value="Save"
															class="btn btn-xs btn-success editUserAccess"
															onclick="saveOrderFormDetails('TreatmentAtDischarge')" disabled="disabled"/> -->
														<button id="col11"
															class="btn btn-xs btn-success editUserAccess"
															title="Save Prescription"
															onclick="saveOPDPrescription1()" data-toggle="tooltip"
															disabled="disabled"><i class="fa fa-save"></i>
														</button>
														<button class="btn btn-xs btn-warning" onclick="tratmentAtDischargePrintIpd()" title="" data-placement="left" data-toggle="tooltip" data-original-title="Print ">
															<i class="fa fa-print"></i>
														</button>
														
														<button class="btn btn-xs btn-warning" onclick="treatmentAtDischargePrescrptionPrint()" title="" data-placement="left" data-toggle="tooltip" data-original-title="Print ">
															<i class="fa fa-print"></i>
														</button>
														
													</div>
												</div>
												<div class="col-md-12-1"
													style="height: 70px;  margin-left: -77px">
													<div id="row1" class="col-sm-12-1" style="margin-top: 0px;">
														<div id="col2" class="col-sm-1-1"
															style="margin-top: 10px; padding-left: 3px;">
															<div class="form-group Remove-Padding col-sm-12-1">
																<div class="divide-10"></div>
															</div>
														</div>
														<div id="col3" class="col-sm-2-1"
															style="margin-top: 10px;">
															<div class="form-group Remove-Padding col-sm-12-1">
																<div class="divide-10"></div>
															</div>
														</div>
														<div id="col4" class="col-sm-1-1"
															style="margin-top: 10px;">
															<div class="form-group Remove-Padding col-sm-12-1">
																<div class="divide-10"></div>
															</div>
														</div>
														<div id="col5" class="col-sm-1-1"
															style="margin-top: 10px;">
															<div class="form-group Remove-Padding col-sm-12-1">
																<div class="divide-10"></div>
															</div>
														</div>
														<div style="margin-top: 10px;" class="col-sm-1-1"
															id="col4A">
															<div class="form-group Remove-Padding col-sm-12-1">
																<div class="divide-10"></div>
															</div>
														</div>
														<div id="col11" class="col-sm-3-1"
															style="margin-top: 30px; margin-left: -42px">
															<div class="form-group Remove-Padding col-sm-12-1">
																<div class="col-sm-12-1"
																	style="margin-top: -5px; margin-left: 2px">
																	<input type="text" readonly=""
																		class="form-control input-SmallText  col-sm-1-1"
																		onkeyup="calculateQuantity()"
																		onkeypress="return validateNumbers(event)" id="tmo"
																		value="1" style="width: 47px"><input
																		type="text" readonly=""
																		class="form-control input-SmallText  col-sm-1-1"
																		onkeyup="calculateQuantity()"
																		onkeypress="return validateNumbers(event)" id="tan"
																		value="1" style="width: 47px"><input
																		type="text" readonly=""
																		class="form-control input-SmallText col-sm-1-1"
																		onkeyup="calculateQuantity()"
																		onkeypress="return validateNumbers(event)" id="tev"
																		value="1" style="width: 47px"><input
																		type="text" readonly=""
																		class="form-control input-SmallText col-sm-1-1"
																		id="tnt" value="1" style="width: 47px">
																</div>
															</div>
														</div>
													</div>
												</div>
												<div class="divide-10"></div>
												<!-- Start Column:2 Row:3 -->
												<div class="col-md-12-1" style="padding-top: 0px;">
													<div class="col-md-12-1">
														<!-- Start Header for New Edit Delete Option -->
														<div class="col-md-12-1"
															style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; margin-top: 3px;">
															<label class="btn" id="enableTextBoxesLabel"
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																value="New"> <i class="fa fa-plus"></i> New
															</label> <label class="btn" id="editOrderFormLabel"
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																value="Edit"> <i class="fa fa-edit"></i> Edit
															</label> <label class="btn" id="deleteOrderFormLabel"
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
																	 <tbody id="prescriptionContent1"></tbody>
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

											<div id="NICU" class="tab-pane fade in">
												<div class="col-md-12-1"
													style="margin-top: 0px; height: 400px; margin-left: 2%; width: 96%; overflow-y: scroll;"
													id="kavita">
													<div class="divide-20"></div>
													<div class="col-md-12-1">
														<div class="form-group Remove-Padding col-md-2-1"
															style="padding-right: 5px; padding-left: 3px">
															<div class="divide-10"></div>
															<label class="TextFont" for="exampleInputEmail1">IPD
																No : </label> <input id="ipdNo1" name="ipdNo" type="text"
																placeholder="IPD No" readonly="readonly"
																class="form-control input-SmallText">
														</div>
														<div class="form-group Remove-Padding col-md-2-1"
															style="padding-right: 5px; padding-left: 3px">
															<div class="divide-10"></div>
															<label class="TextFont" for="exampleInputEmail1">Birth
																Weight : </label> <input id="birthWeight" name="birthWeight"
																type="text" placeholder="Birth Weight"
																class="form-control input-SmallText">
														</div>
														<div class="form-group Remove-Padding col-md-2-1"
															style="padding-right: 5px; padding-left: 3px">
															<div class="divide-10"></div>
															<label class="TextFont" for="exampleInputEmail1">Weight
																On Adm. : </label> <input id="weightOnAdmission"
																name="weightOnAdmission" type="text"
																placeholder="Weight On Adm."
																class="form-control input-SmallText">
														</div>
														<div class="form-group Remove-Padding col-md-2-1"
															style="padding-right: 5px; padding-left: 3px">
															<div class="divide-10"></div>
															<label class="TextFont" for="exampleInputEmail1">Weight
																On Disch. : </label> <input id="weightOnDischarge"
																name="weightOnDischarge" type="text"
																placeholder="Weight On Disch."
																class="form-control input-SmallText">
														</div>
														<div class="form-group Remove-Padding col-md-2-1"
															style="padding-right: 5px; padding-left: 3px">
															<div class="divide-10"></div>
															<label class="TextFont" for="exampleInputEmail1">Condition
																at Birth : </label> <input id="conditionAtBirth"
																name="conditionAtBirth" type="text"
																placeholder="Condition at Birth"
																class="form-control input-SmallText">
														</div>
														<div class="form-group Remove-Padding col-md-2-1"
															style="padding-right: 5px; padding-left: 3px">
															<div class="divide-10"></div>
															<label class="TextFont" for="exampleInputEmail1">Patient
																Type : </label>
															<div>
																<input id="chknicupd" name="PatientType" type="radio"
																	style="margin-top: 0px;" value="nicuPD"
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
																style="margin-left: 10px;" />Term <input type="radio"
																id="paga" name="babysData" value="paga"
																style="margin-left: 10px;" />Preterm AGA<input
																type="radio" id="sga" name="babysData" value="sga"
																style="margin-left: 10px;" />SGA <input type="radio"
																id="lgr" name="babysData" value="lgr"
																style="margin-left: 10px;" />LGA <input type="radio"
																id="iugr" name="babysData" value="iugr"
																style="margin-left: 10px;" />IUGR
														</div>
														<div class="form-group Remove-Padding col-md-5-1">
															<div class="divide-10"></div>
															<label class="TextFont">Delivery Data :</label> <input
																type="radio" id="nd" name="deliveryData" value="nd"
																style="margin-left: 10px;" />ND <input type="radio"
																id="lscs" name="deliveryData" value="lscs"
																style="margin-left: 10px;" />LSCS <input type="radio"
																id="assisted" name="deliveryData" value="assisted"
																style="margin-left: 10px;" />Assisted
														</div>

													</div>

													<div class="divide-40"></div>
													<div class="col-md-12-1">
														<div class="col-sm-2-1"
															style="padding-left: 0px; padding-top: 2px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-5"></div>
																<label class="TextFont">ANC History -</label>
																<div class="col-md-12-1" style="margin-top: 2px;">
																	<div class="col-md-2-1" style="padding-top: 1px;">Age:</div>
																	<input type="text" id="ancAge" name="ancAge"
																		placeholder="Age"
																		class="form-control input-SmallText col-md-6-1" />
																	<div class="col-md-4-1"
																		style="padding-top: 2px; padding-left: 3%;">G P
																		L A D</div>
																</div>
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 0px;">
																<label class="TextFont">MBG :</label> <input type="text"
																	id="mbg" name="mbg" placeholder="MBG"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 0px;">
																<label class="TextFont">RH :</label> <input type="text"
																	id="rh" name="rh" placeholder="RH"
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 25px; padding-top: 20px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<input type="radio" id="registered" name="registration"
																	value="registered">Registered
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<input type="radio" id="unregistered"
																	name="registration" value="unregistered">Unregistered
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<input type="radio" id="immunized" name="im"
																	value="immunized">Immunized
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<input type="radio" id="unimmunized" name="im"
																	value="unimmunized">Unimmunized
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 10px; padding-top: 0px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-6"></div>
																<label class="TextFont">Serology-HIV- :</label> <input
																	type="text" id="serHIV" name="serHIV"
																	placeholder="Serology-HIV"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 0px;">
																<label class="TextFont">Hbs Ag :</label> <input
																	type="text" id="hbsAG" name="hbsAG"
																	placeholder="Hbs Ag"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 0px;">
																<label class="TextFont">VDRL :</label> <input
																	type="text" id="vdrl" name="vdrl" placeholder="VDRL"
																	class="form-control input-SmallText" />
															</div>

														</div>
														<div class="col-sm-2-1"
															style="padding-left: 10px; padding-top: 2px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-5"></div>
																<label class="TextFont">Medical History- DM :</label> <input
																	type="text" id="dm" name="dm"
																	placeholder="Medical History"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 0px;">
																<label class="TextFont">HTN :</label> <input type="text"
																	id="htn" name="htn" placeholder="HTN"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 0px;">
																<label class="TextFont">Thyroid Disorder :</label> <input
																	type="text" id="thyroid" name="thyroid"
																	placeholder="Thyroid Disorder"
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 15px; padding-top: 0px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-5"></div>
																<label class="TextFont">Fever with Rash :</label> <input
																	type="text" id="fever" name="fever"
																	placeholder="Fever with Rash"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 0px;">
																<label class="TextFont">Other :</label> <input
																	type="text" id="medOther" name="medOther"
																	placeholder="Other"
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 25px; padding-top: 10px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<label class="TextFont">Obsteric Problem's :</label>
																<div class="divide-5"></div>
																<input type="radio" id="pih" name="obsProb" value="pih">PIH
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 2px;">
																<input type="radio" id="eclampsia" name="obsProb"
																	value="eclampsia">Eclampsia
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 2px;">
																<input type="radio" id="poly" name="obsProb"
																	value="poly">Poly
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 2px;">
																<input type="radio" id="oligo" name="obsProb"
																	value="oligo">Oligohydramnios,APH,Leak

															</div>
														</div>
														<div class="divide-40"></div>

													</div>
													<div class="col-md-12-1">
														<div class="form-group Remove-Padding col-md-2-1"
															style="padding-left: 0px; padding-top: 10px;">
															<div class="divide-10"></div>
															<label class="TextFont">Course In Hospital :</label>
															<textarea id='courseInHos' rows='10' cols='24'></textarea>
														</div>
														<div class="form-group Remove-Padding col-md-2-1"
															style="padding-left: 15px; padding-top: 8px;">
															<div class="divide-10"></div>
															<label class="TextFont">Treatment Given -</label>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 0px;">
																<label class="TextFont">IV Fluids :</label> <input
																	type="text" id="fluids" name="fluids"
																	placeholder="IV Fluids"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 1px;">
																<label class="TextFont">Antibiotics :</label> <input
																	type="text" id="antibio" name="antibio"
																	placeholder="Other"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 1px;">
																<label class="TextFont">Sedation Used- 1. :</label> <input
																	type="text" id="sedation1" name="sedation1"
																	placeholder="Sedation Used"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 1px;">
																<label class="TextFont">Sedation Used- 2. :</label> <input
																	type="text" id="sedation2" name="sedation2"
																	placeholder="Sedation Used"
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
																		placeholder="Duration"
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
																					type="text" name=""
																					class="form-control input-SmallText" id="mode1" /></td>
																				<td class="col-md-3-1 center"><input
																					type="text" name=""
																					class="form-control input-SmallText" id="pip1" /></td>
																				<td class="col-md-3-1 center"><input
																					type="text" name=""
																					class="form-control input-SmallText" id="peep1" /></td>
																				<td class="col-md-3-1 center"><input
																					type="text" name=""
																					class="form-control input-SmallText" id="fio1" /></td>
																			</tr>
																			<tr>
																				<td class="col-md-3-1 center"><input
																					type="text" name=""
																					class="form-control input-SmallText" id="mode2" /></td>
																				<td class="col-md-3-1 center"><input
																					type="text" name=""
																					class="form-control input-SmallText" id="pip2" /></td>
																				<td class="col-md-3-1 center"><input
																					type="text" name=""
																					class="form-control input-SmallText" id="peep2" /></td>
																				<td class="col-md-3-1 center"><input
																					type="text" name=""
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
																	type="text" id="organism" name="organism"
																	placeholder="" class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Sensitive To :</label> <input
																	type="text" id="sensitive" name="sensitive"
																	placeholder="" class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">BSL- MAX- :</label> <input
																	type="text" id="bslmax" name="bslmax" placeholder=""
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Min -</label> <input type="text"
																	id="bslmin" name="bslmin" placeholder=""
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 15px; padding-top: 20px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">Electrolyte: Sr Na</label><input
																	type="text" id="electrolyte" name="electrolyte"
																	placeholder="" class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Sr K -</label> <input
																	type="text" id="srk" name="srk" placeholder=""
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Sr CL -</label> <input
																	type="text" id="srcl" name="srcl" placeholder=""
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Sr Ca (mg%)</label> <input
																	type="text" id="srca" name="srca" placeholder=""
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Sr Mg - (mg%)</label> <input
																	type="text" id="srmg" name="srmg" placeholder=""
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
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="billirubin1" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="billirubin2" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="billirubin3" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="billirubin4" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1 center"><div>Total</div></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="total1" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="total2" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="total3" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="total4" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1 center"><div>Indirect</div></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="indirect1" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="indirect2" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="indirect3" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="indirect4" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1 center"><div>Direct</div></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="direct1" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="direct2" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="direct3" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="direct4" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1 center"><div>Phototherapy</div></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="phototherapy1" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="phototherapy2" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="phototherapy3" /></td>
																			<td class="col-md-3-1 center"><input type="text"
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
																	type="text" id="xray" name="xray" placeholder="X - Ray"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">USG :</label> <input type="text"
																	id="usg" name="usg" placeholder="USG"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">CT/MRI :</label> <input
																	type="text" id="ctmri" name="ctmri"
																	placeholder="CT/MRI"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Others :</label> <input
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
																	placeholder="Consultant"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Date :</label> <input
																	type="text" id="priConsultDate" name="priConsultDate"
																	value='<%=todays_date%>' placeholder=""
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Time :</label> <input
																	type="text" id="priConsultTime" name="priConsultTime"
																	placeholder="" class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 15px; padding-top: 20px;">
															<div class="divide-10"></div>
															<label class="TextFont">Other : -</label>
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">High Risk OPD :</label><input
																	type="text" id="hrOPD" name="hrOPD" placeholder="Risk"
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Date :</label> <input
																	type="text" id="hrOPDDate" name="hrOPDDate"
																	value='<%=todays_date%>' placeholder=""
																	class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Time :</label> <input
																	type="text" id="hrOPDTime" name="hrOPDTime"
																	placeholder="" class="form-control input-SmallText" />
															</div>
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Other :</label> <input
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
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="redReflex1" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="redReflex2" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1"><div
																					style="padding-left: 30%;">2. Hips</div></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="hips1" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="hips2" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1"><div
																					style="padding-left: 30%;">3. Femorals</div></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="femorals1" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="femorals2" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1"><div
																					style="padding-left: 30%;">4. Genitals</div></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="genitals1" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="genitals2" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1"><div
																					style="padding-left: 30%;">5. Hernia</div></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="hernia1" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="hernia2" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1"><div
																					style="padding-left: 30%;">6. Head Circm.</div></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="headcir1" /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="headcir2" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1"><div
																					style="padding-left: 30%;">7. Other</div></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="" class="form-control input-SmallText"
																				id="pcother1" /></td>
																			<td class="col-md-3-1 center"><input type="text"
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
																			<td class="col-md-3-1 center"><input type="text"
																				name="ropScreen0"
																				class="form-control input-SmallText" id="ropScreen0" value='<%=todays_date%>'/></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="ropScreen1"
																				class="form-control input-SmallText" id="ropScreen1" value='<%=todays_time%>'/></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="ropScreen2"
																				class="form-control input-SmallText" id="ropScreen2" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1"><div>Hearing
																					Screening</div></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="hearingScreen0"
																				class="form-control input-SmallText"
																				id="hearingScreen0" value='<%=todays_date%>' /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="hearingScreen1" 
																				class="form-control input-SmallText"
																				id="hearingScreen1" value='<%=todays_time%>' /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="hearingScreen2"
																				class="form-control input-SmallText"
																				id="hearingScreen2" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1"><div>USG Brain</div></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="usgBrain0"
																				class="form-control input-SmallText" id="usgBrain0" value='<%=todays_date%>' /></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="usgBrain1"
																				class="form-control input-SmallText" id="usgBrain1" value='<%=todays_time%>'/></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="usgBrain2"
																				class="form-control input-SmallText" id="usgBrain2" /></td>
																		</tr>
																		<tr>
																			<td class="col-md-3-1"><div>Other</div></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="adother0" class="form-control input-SmallText"
																				id="adother0" value='<%=todays_date%>'/></td>
																			<td class="col-md-3-1 center"><input type="text"
																				name="adother1" class="form-control input-SmallText"
																				id="adother1" value='<%=todays_time%>'/></td>
																			<td class="col-md-3-1 center"><input type="text"
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
															<input id="chkpd" name="PatientType" type="radio"
																style="margin-top: 0px;" value="PD"
																class="form-control input-SmallText col-md-2-1">
															<label style="margin-top: 3px;">Peadiatrics</label>
														</div>

													</div>
													<div class="col-md-12-1"
														style="padding-right: 8px; margin-top: 1%;">
														<div class="divide-10"></div>
														<div class="col-md-4-1">
															<label class="TextFont">Past/Family History :</label>
															<textarea id='pastHistory' rows='3' cols='52' class=""></textarea>
														</div>
														<div class="col-md-4-1" style="padding-left: 0.8%;">
															<label class="TextFont">General Examination :</label>
															<textarea id='generalExamination' rows='3' cols='52'
																class=""></textarea>
														</div>
														<div class="col-md-4-1" style="padding-left: 1.6%;">
															<label class="TextFont">CVS :</label>
															<textarea id='paedcvs' rows='3' cols='52' class=""></textarea>
														</div>
													</div>

													<div class="divide-10"></div>
													<div class="col-md-12-1"
														style="padding-right: 8px; margin-top: 1px;">
														<div class="divide-10"></div>
														<div class="col-md-3-1">
															<label class="TextFont">RS :</label>
															<textarea id='paedrs' rows='3' cols='38' class=""></textarea>
														</div>
														<div class="col-md-3-1" style="padding-left: 5.25%;">
															<label class="TextFont">PA :</label>
															<textarea id='paedpa' rows='3' cols='38' class=""></textarea>
														</div>
														<div class="col-md-3-1" style="padding-left: 10.5%;">
															<label class="TextFont">CNS :</label>
															<textarea id='paedcns' rows='3' cols='38' class=""></textarea>
														</div>
														<div class="col-md-3-1" style="padding-left: 16%;">
															<label class="TextFont">P/S :</label>
															<textarea id='ps' rows='3' cols='38' class=""></textarea>
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
																	placeholder="Platelet Count"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Urine -R :</label> <input
																	type="text" id="urineR" name="urineR"
																	placeholder="Urine -R"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Stool -R :</label> <input
																	type="text" id="stoolR" name="stoolR"
																	placeholder="Stool -R"
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 0px; padding-top: 5px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">BSL (mg%) :</label><input
																	type="text" id="bsl" name="bsl" placeholder="BSL"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">CSF :</label> <input type="text"
																	id="csf" name="csf" placeholder="CSF"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">OTT :</label> <input type="text"
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
																	placeholder="Sr Calcium"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Coombs Test Advice:</label> <input
																	type="text" id="coombTest" name="coombTest"
																	placeholder="Coomb's Test"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">T.T. :</label> <input
																	type="text" id="pdtt" name="pdtt" placeholder="T.T."
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 0px; padding-top: 5px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">Sr Na :</label><input
																	type="text" id="pdsrna" name="pdsrna"
																	placeholder="Sr Na"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Sr K :</label> <input
																	type="text" id="pdsrk" name="pdsrk" placeholder="Sr K"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Sr CL :</label> <input
																	type="text" id="pdsrcl" name="pdsrcl"
																	placeholder="Sr CL"
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 0px; padding-top: 5px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">Sr Billirubin(mg%) :</label><input
																	type="text" id="srBillirubin" name="srBillirubin"
																	placeholder="Sr Billirubin"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Unconj(mg%) :</label> <input
																	type="text" id="unconj1" name="unconj1"
																	placeholder="Unconj"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Unconj(mg%) :</label> <input
																	type="text" id="unconj2" name="unconj2"
																	placeholder="Unconj"
																	class="form-control input-SmallText" />
															</div>
														</div>
														<div class="col-sm-2-1"
															style="padding-left: 0px; padding-top: 5px;">
															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont">X-RAY :</label><input
																	type="text" id="pdxray" name="pdxray"
																	placeholder="X-RAY"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">USG :</label> <input type="text"
																	id="pdusg" name="pdusg" placeholder="USG"
																	class="form-control input-SmallText" />
															</div>

															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">CT/MRI :</label> <input
																	type="text" id="pdctmri" name="pdctmri"
																	placeholder="CT/MRI"
																	class="form-control input-SmallText" />
															</div>
														</div>
													</div>
													<div class="col-md-12-1"
														style="padding-right: 8px; margin-top: 1px;">
														<div class="divide-10"></div>
														<div class="col-md-3-1">
															<label class="TextFont">Course Of ILLNESS/REC :</label>
															<textarea id='courseOfRec' rows='3' cols='38' class=""></textarea>
														</div>
														<div class="col-md-3-1" style="padding-left: 5.25%;">
															<label class="TextFont">Management :</label>
															<textarea id='pdManagement' rows='3' cols='38' class=""></textarea>
														</div>
														<div class="col-md-3-1" style="padding-left: 10.5%;">
															<label class="TextFont">Other :</label>
															<textarea id='pdFOther' rows='3' cols='38' class=""></textarea>
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
																		style="margin-left: 1%;" />BCG <input type="checkbox"
																		id="chk2" value="DPT/OPV" name="DPT/OPV"
																		style="margin-left: 1%;" />DPT/OPV <input
																		type="checkbox" id="chk3" value="MEASLES"
																		name="MEASLES" style="margin-left: 1%;" />MEASLES <input
																		type="checkbox" id="chk4" value="MMR" name="MMR"
																		style="margin-left: 1%;" />MMR <input type="checkbox"
																		id="chk5" value="Booster" name="Booster"
																		style="margin-left: 1%;" />Booster <input
																		type="checkbox" id="chk6" value="DT.TT" name="DT.TT"
																		style="margin-left: 1%;" />DT.TT <input
																		type="checkbox" id="chk7" value="Hepatitis-B"
																		name="Hepatitis-B" style="margin-left: 1%;" />Hepatitis-B
																	<input type="checkbox" id="chk8" value="Hib" name="Hib"
																		style="margin-left: 1%;" />Hib <input type="checkbox"
																		id="chk9" value="Chicken Pox" name="Chicken Pox"
																		style="margin-left: 1%;" />Chicken Pox <input
																		type="checkbox" id="chk10" value="Thyroid"
																		name="Thyroid" style="margin-left: 1%;" />Typhoid <input
																		type="checkbox" id="chk11" value="Hepatitis-A"
																		name="Hepatitis-A" style="margin-left: 1%;" />Hepatitis-A
																</div>
															</div>
														</div>
														<div class="col-md-3-1" style="">
															<div class="form-group Remove-Padding col-md-12-1"
																style="margin-top: 5px;">
																<label class="TextFont">Other Vaccines :</label> <input
																	type="text" id="otherVaccines" name="otherVaccines"
																	placeholder="CT/MRI"
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
															<textarea id='anyOtherPoints' rows='3' cols='38' class=""></textarea>
														</div>
														<div class="col-md-4-1" style="padding-left: 5.25%;">
															<label class="TextFont">Follow Up Advice :</label>
															<textarea id='followUpAdvise' rows='3' cols='53' class=""></textarea>
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
		
		
		<input id="pid" type="hidden"
				value="<%=request.getParameter("patientId")%>"
				style="display: none;" />
			<input id="treatmentId" type="hidden"
				value="<%=request.getParameter("treatmentId")%>"
				style="display: none;" />
			<input type="hidden" id="depdoctordesk" value="1">	
		<div><%@include file="Footer.jsp"%></div>
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
					<div tabindex="-1" class="modal fade in" id="iPrintDsPopUpOPD" style="display: none;">
		<div class="modal-dialog" style="display: block;">
			<div style="margin-top: 13%; margin-left: 13%;" class="modal-content col-md-7">
				<div class="modal-header">
					<div class="box-title">
						<h4 class="col-md-8-1">
							<i class="fa fa-calendar"></i> Discharge Summary
						</h4>
						<div style="float: right;" class="form-group col-md-4-1">
							<button type="button" onclick="AutoDischargeSummaryPrintopdlab();" class="btn btn-xs btn-warning">
								<i class="fa fa-print"></i> Print
							</button>
							<button onclick="hideDisSummaryLangPopUpopd();" class="btn btn-xs btn-danger">
								<i class="fa fa-arrows"></i> Close
							</button>
						</div>
					</div>
				</div>

				<div class="modal-body col-md-12-1">
					<div class="col-md-3-1">
						<label class="input-SmallText"> <input type="checkbox" style="margin-top: 0px; cursor: pointer" id="idopdlab" onclick="opdlab();"> : OPD LAB
						</label>
					</div>

					<div class="col-md-6-1" style="display: none;" id="divopdlab">
					<table class="table table-striped table-condensed cf">
					<tr>
					<td style="height: 21.5px;" class="col-sm-1-1 center">#</td>
					<td style="height: 21.5px;" class="col-sm-2-1 center">Treatment ID </td>
					</tr>
					<tbody id="tbodyopd">
					</tbody>
					</table>
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
							<!-- <button onclick="AutoDischargeSummaryPrintforIpd();" data-placement="left" data-toggle="tooltip" data-original-title="Print" "="" style="margin-top: -37px; margin-left: 500px" title="" class="btn btn-xs btn-warning">
								<i class="fa fa-print"></i>
							</button> -->

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
								
								<!-- <div style="background-color: #ccffeb;" class="col-md-3-1">
									<input type="checkbox" onclick="hideCheckAllLangDiv()" name="printTypeDs" value="checkAll" id="checkAll"><b>Check All</b>
								</div>  -->
								
								
								<div style="background-color: #ccffeb;" class="col-md-3-1">
								<input type="checkbox" onclick="checkAllBoxes(),showCheckAllLangDiv()" name="printTypeDs" id="checkAll">
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
		<input id="callfromipd" type="hidden" name="callfromipd" value="<%=request.getParameter("type")%>"/>
		<div id="appo_type" style="display: none;"><%=request.getParameter("appo_type")%></div>
		<div id="id" style="display: none;"><%=request.getParameter("id")%></div>
		<div id="updateOn" style="display: none;"><%=request.getParameter("updateFlagOn")%></div>
		<div id="PreTre" style="display: none;"><%=request.getParameter("myObj")%></div>
		<div style="display: none;" id="docName">${sessionScope.userName}</div>
		<div id="date" style="display: none;"><%=todays_date%></div>
		<input type="hidden" id="OFdate-pick" value="<%=todays_date%>"
			style="display: none;" />
		<input type="hidden" id="pageType" value="IPD" style="display: none;" />
		<input type="hidden" value="0" id="historyMasterId"></input>
		<input id="CPOE_TestDetails" style="display: none;" />

		<!-- IPD_DRR for Daily Doctor Round and Order Form -->
		<input type="hidden" id="treStart"
			value="<%=request.getParameter("treStart")%>" style="display: none;" />
		<div id="treatmentbedid" style="display: none;"><%=request.getParameter("treatmentbedid")%></div>
		<div id="OTNotesDiv" style="display: none;"></div>
		<div id="AddUpdateOrderformTemplatePopupForIpda" class="modal fade in"></div>

		<!-- For IPD_BedWard -->
		<input id="pname" type="hidden"
				value="0"
				style="display: none;" />
			<input id="drid" type="hidden"
				value="0"
				style="display: none;" />
		<input type="hidden" id="ipdNumber" value="0" style="display: none;" />
		<input type="hidden" id="followUpId" value="0" />
		<div id="patobject" style="display: none;"></div>
		<input id="tid" type="hidden"
			value="<%=request.getParameter("treatmentId")%>"
			style="display: none;" />
			
		<input id="pid" type="hidden"
			value="0" style="display: none;" />
		<input id="treatmentId" type="hidden"
			value="<%=request.getParameter("treatmentId")%>"
			style="display: none;" />
			<input id="tr_Id" type="hidden"
			value="<%=request.getParameter("treatmentId")%>"
			style="display: none;" />
			<input type="hidden" style="display: none;" id="userdr_id"	value="<%=session.getAttribute("userId1")%>" />
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

		<div id="objorder" style="display: none;"></div>
		<div id="objtreat" style="display: none;"></div>

		<div id="previousorder" style="display: none;"></div>
		<input type="hidden" value="<%=session.getAttribute("userType")%>"
			id="userType" />
		<input type='hidden' id='queryType' value='save' />

		<!-- prescription route details as per prepID -->
		<div id="prescriptionTemplateContentDocHiddenDiva" style="display: none;"></div>
		<div id="routeDetails" style="display: none;"></div>
        <input type='hidden' id='pagetypopd' value='Discharge' />
	 	<input type='hidden' id='tomId' value='0' /> 
		<input type='hidden' id='idOTNote' value='0' />
		<input type='hidden' id='followUpId' value='0' />
		<input type='hidden' id='physicalDisFlag' value='N' />
		<%-- <input type="hidden" id="tomId" value="<%=request.getParameter("tomId")%>"/> --%>
		<input type="hidden"  id="shraddhaFlow" value="<%=resourceBundleEhat1.getObject("shraddha").toString()%>">
		
		<!--16 June 2020 for Covid Hospital-->
		<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
		<input type='hidden' id='billType' value='' />
		<input id="chargesSlaveId" type="hidden" value="0" />
		<input id="idForDisc" type="hidden"/>
		<input id="remainAmount" type="hidden" value="0" />
		<input id="finalDiscount" type="hidden" value="0" />
		<input id="DisgenInvoiceFlag" type="hidden" value=0 />
		<input id="DisPharmacyCashReturn" type="hidden" value="0" />
		<input id="DisPharmacyAdvancePaid" type="hidden" value="0" />
		<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<input id="patientDeathId" type="hidden" value="0" />
		<!-- End -->
		
		
		<input type="hidden" name="mrnID" id="mrnID" value="0">
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
			<input type='hidden' value='0' id='RowCount' />
			<input type='hidden' value='0' id='HisRowCount' />
			<input type='hidden' value='0' id='treStart' />
			<input type='hidden' value='1' id='consumptionRowCount' />
			<input type='hidden' value='0' id='billidservice' />
			<option value="">----</option>
			<option value="1">जेवणानंतर/After Dinner</option>
			<option value="2">बाहेरून लावणे/Topical Application</option>
			<option value="3">नाश्त्या अगोदर-जेवणाअगोदर/Before
				Breakfast-Before Dinner</option>
			<option value="4">नाश्त्या नंतर-जेवणानंतर/After Food</option>
		</div>
		<div id="language" style="display: none;">Marathi</div>
		<input id="disSummID" type="hidden" style="display: none;" value="0">
		<div id="customizeTemplateDiv" style="display: none;"></div>
		<!-- End For Medicine -->
		<!--Start #AddUpdatePrescriptionTemplatePopup Popup -->



		<div id="AddUpdatePrescriptionTemplatePopup1" class="modal fade in">



			<div class="modal-dialog col-md-11-1"
				style="margin-top: 40px; margin-left: 65px;">



				<div class="modal-content" class="col-md-12" style="height: 580px;">





					<div class="modal-header" style="padding-bottom: 0px; height: 41px">



						<div class="box-title" style="margin-bottom: 29px;">



							<h4 class="col-md-8-1">
								<i class="fa fa-calendar"></i>Add Update Prescription Templates



							</h4>



							<div style="width: 9%; float: left; padding-left: 3px;">







								<!-- commented, aniket kanse 13 JAN 22 -->



								<!-- <button id="saveMedDoc" class="btn btn-xs btn-success editUserAccess" onclick="saveUpdatePrescriptionDocTemplateMedicine()">Save Medicine</button> -->







								<!-- changed, aniket kanse 13 JAN 22 -->



								<!--                                                                                                                                                                         <button id="saveMedDoc" class="btn btn-xs btn-success editUserAccess" onclick="saveUpdateOPDPrescriptionTemplateMedicine()">Save Medicine</button>

	

 -->



								<button id="saveMedDoc"
									class="btn btn-xs btn-success editUserAccess"
									onclick="saveUpdateOPDPrescriptionTemplateMedicine1()">Save
									Medicine</button>



								<input id="prepDocTemplateMedicineID" type="hidden" value="0">



							</div>



							<div style="float: right; padding-right: 6px;">



								<button type="button" class="btn btn-xs btn-danger"
									data-dismiss="modal">



									<i class="fa fa-arrows"></i> Close



								</button>



							</div>



						</div>



					</div>



					<div class="modal-body">



						<div class="form-group col-md-12-1">



							<div class="form-group Remove-Padding col-md-12-1"
								style="margin-top: -8px;">



								<div
									style="background-color: #EEEEEE; padding: 5px; height: 34px;">



									<div style="width: 20%; float: left;">



										<select onchange="refreshFetchOPDPrescriptionTemplate()"
											id="docTemplateNameSelect"
											style="cursor: pointer; width: 90%;">



										</select>



									</div>



									<div style="width: 8%; float: left; padding-top: 5px;">



										Template Name: <b style="color: red; padding-left: 2px;">*</b>



									</div>



									<div style="width: 30%; float: left;">



										<input type="text" id="docTemplateNameText"
											style="width: 100%;" maxlength="500"
											placeholder="Enter Template Name..." /> <input
											id="docTemplateNameID" type="hidden" value="0" />



									</div>



									<div
										style="width: 6%; float: left; padding-top: 5px; margin-left: 27px;">
										General Medicine:</div>



									<div style="width: 3%; float: left;">
										<input type="checkbox" style="cursor: pointer;"
											id="medicineNotAvailableCheckboxTemp">
									</div>



									<div
										style="width: 6%; float: left; padding-top: 5px; margin-left: 8px;">My



										Template:</div>



									<div style="width: 3%; float: left;">



										<input type="checkbox" id="docMyTemplateCheckbox"
											style="cursor: pointer;" />



									</div>



									<div style="width: 10%; float: left; padding-top: 5px;">Organization



										Template:</div>



									<div style="width: 3%; float: left;">



										<input type="checkbox" id="docOrgTemplateCheckbox"
											style="cursor: pointer;" />



									</div>





									<div style="float: right;">



										<button class="btn btn-xs btn-success editUserAccess"
											onclick="saveUpdateOPDPrescriptionTemplates1()">



											<i class="fa fa-save"></i> Save Template



										</button>



									</div>



								</div>



							</div>



							<!-- Start Column:2 Row:2 -->



							<div class="col-md-12-1" style="height: 45px; margin-top: 0px;">



								<div id="row1" class="col-sm-12-1" style="margin: 0px;">



									<div id="col2" class="col-sm-1-1" style="margin-top: 10px;">



										<div class="form-group Remove-Padding col-sm-12-1">



											<div class="divide-10"></div>



											<label class="TextFont">Prep<b
												style="color: red; padding-left: 2px;">*</b></label> <select
												id="prepDoc" class="form-control input-SmallText"
												onchange="fetchRoutesByPreparationId('opdTemplate')">



											</select>



										</div>



									</div>



									<div id="col3" class="col-sm-2-1" style="margin-top: 10px;">



										<div class="form-group Remove-Padding col-sm-12-1">



											<div class="divide-10"></div>



											<label class="TextFont">Medicine Name <b
												style="color: red; padding-left: 2px;">*</b>



											</label>



											<div id="divTagmedicineNameDoc">



												<!-- <input type="text" placeholder="Name"

	

                                                                                                                                                                                                                id="medicineNameDoc"

	

                                                                                                                                                                                                                class="typeahead form-control input-SmallText"

	

                                                                                                                                                                                                                onkeypress="setPrescriptionAutocompleteNameID(this.id, 'DoctorDesk_DocTempPopup');" /> -->







												<!-- changed, aniket kanse -->



												<input type="text" placeholder="Name" id="medicineNameDoc"
													class="typeahead form-control input-SmallText"
													onkeypress="autoSuggestMedicines(this.id, 'opdTemplate');" />



											</div>



											<input type="hidden" id="medicineIDDoc" value="0" />



										</div>



									</div>



									<div id="col4" class="col-sm-1-1" style="margin-top: 10px;">



										<div class="form-group Remove-Padding col-sm-12-1">



											<div class="divide-10"></div>



											<label class="TextFont">Strength</label> <input type="text"
												placeholder="Strength" id="strengthDoc"
												class="form-control input-SmallText" />



										</div>



									</div>



									<div id="col5" class="col-sm-1-1" style="margin-top: 10px;">



										<div class="form-group Remove-Padding col-sm-12-1">



											<div class="divide-10"></div>



											<label class="TextFont">Dose Type</label> <input type="text"
												placeholder="Dose" id="doseDoc"
												onkeypress="return validateNumberMinusSign(event)"
												class="form-control input-SmallText" />



										</div>



									</div>



									<div id="col4A" class="col-sm-1-1" style="margin-top: 10px;">



										<div class="form-group Remove-Padding col-sm-12-1">



											<div class="divide-10"></div>



											<label class="TextFont">Unit</label> <select id="unitDoc"
												class="form-control input-SmallText">



											</select>



										</div>



									</div>



									<div id="colFrq12" class="col-sm-1-1" style="margin-top: 10px;">



										<div class="form-group Remove-Padding col-sm-12-1">



											<div class="divide-10"></div>



											<label class="TextFont" for="exampleInputEmail1">MO -
												AN - EV - NT </label>



											<div class="col-sm-12-1"
												style="margin-top: -5px; margin-left: 2px">



												<input id="mo1" type="checkbox" style="cursor: pointer;"
													onclick="setFrequencyOpd()" value="Morning" name="timeslot">



												<input id="an1" type="checkbox" style="cursor: pointer;"
													onclick="setFrequencyOpd()" value="Afternoon"
													name="timeslot"> <input id="ev1" type="checkbox"
													style="cursor: pointer;" onclick="setFrequencyOpd()"
													value="Evening" name="timeslot"> <input id="nt1"
													type="checkbox" style="cursor: pointer;"
													onclick="setFrequencyOpd()" value="Night" name="timeslot">



											</div>



										</div>



									</div>



									<div id="col6" class="col-sm-1-1" style="margin-top: 10px;">



										<div class="form-group Remove-Padding col-sm-12-1">



											<div class="divide-10"></div>



											<label class="TextFont">Frequency</label> <input type="text"
												placeholder="Frequency" id="frequencyDoc"
												onkeyup="calculateQuantity('prepDoc')"
												class="form-control input-SmallText" />



										</div>



									</div>



									<div id="col7" class="col-sm-1-1" style="margin-top: 10px;">



										<div class="form-group Remove-Padding col-sm-12-1">



											<div class="divide-10"></div>



											<label class="TextFont">Instructions</label> <select
												id="instructionDoc" class="form-control input-SmallText"></select>



										</div>



									</div>



									<div id="col8" class="col-sm-1-1" style="margin-top: 10px;">



										<div class="form-group Remove-Padding col-sm-12-1">



											<div class="divide-10"></div>



											<label class="TextFont">Route</label> <select name="routeDoc"
												id="routeDoc" class="form-control input-SmallText"></select>



										</div>



									</div>



									<div id="col9" class="col-sm-1-1" style="margin-top: 10px;">



										<div class="form-group Remove-Padding col-sm-12-1">



											<div class="divide-10"></div>



											<label class="TextFont">Days<b
												style="color: red; padding-left: 2px;">*</b></label> <input
												type="text" placeholder="Days" id="daysDoc"
												class="form-control input-SmallText"
												onkeyup="calculateQuantity('prepDoc')"
												onkeypress="return validateNumbers(event)" />



										</div>



									</div>



									<div id="col10" class="col-sm-1-1" style="margin-top: 10px;">



										<div class="form-group Remove-Padding col-sm-12-1">



											<div class="divide-10"></div>



											<label class="TextFont">Quantity<b
												style="color: red; padding-left: 2px;">*</b></label> <input
												type="text" placeholder="Qty" id="qtyDoc"
												class="form-control input-SmallText"
												onkeypress="return validateNumbers(event)" />



										</div>



									</div>



									<div class="divide-10"></div>







									<div style="margin-top: 0px;" class="col-md-12-1">



										<div style="margin-top: 0px;" class="col-sm-12-1" id="row1">



											<div style="margin-top: 10px; padding-left: 3px;"
												class="col-sm-1-1" id="col2">



												<div class="form-group Remove-Padding col-sm-12-1">



													<div class="divide-10"></div>



												</div>



											</div>



											<div style="margin-top: 10px;" class="col-sm-2-1" id="col3">



												<div class="form-group Remove-Padding col-sm-12-1">



													<div class="divide-10"></div>



												</div>



											</div>



											<div style="margin-top: 10px;" class="col-sm-1-1" id="col4">



												<div class="form-group Remove-Padding col-sm-12-1">



													<div class="divide-10"></div>



												</div>



											</div>



											<div style="margin-top: 10px;" class="col-sm-1-1" id="col5">



												<div class="form-group Remove-Padding col-sm-12-1">



													<div class="divide-10"></div>



												</div>



											</div>



											<div id="col4A" class="col-sm-1-1" style="margin-top: 10px;">



												<div class="form-group Remove-Padding col-sm-12-1">



													<div class="divide-10"></div>



												</div>



											</div>



											<div style="margin-top: 30px; margin-left: -45px"
												class="col-sm-4-1" id="col11">



												<div class="form-group Remove-Padding col-sm-12-1">



													<div style="margin-top: -5px; margin-left: 2px"
														class="col-sm-12-1">



														<input type="text" style="width: 47px" value="1" id="tmo1"
															class="form-control input-SmallText  col-sm-1-1"
															readonly="readonly"
															onkeyup="calculateQuantity('prepDoc')"><input
															type="text" style="width: 47px" value="1" id="tan1"
															class="form-control input-SmallText  col-sm-1-1"
															readonly="readonly"
															onkeyup="calculateQuantity('prepDoc')"><input
															type="text" style="width: 47px" value="1" id="tev1"
															class="form-control input-SmallText col-sm-1-1"
															readonly="readonly"
															onkeyup="calculateQuantity('prepDoc')"><input
															type="text" style="width: 47px" value="1" id="tnt1"
															class="form-control input-SmallText col-sm-1-1"
															readonly="readonly"
															onkeyup="calculateQuantity('prepDoc')">



													</div>



												</div>



											</div>



										</div>



									</div>



								</div>



							</div>



							<!-- End Column:2 Row:2 -->



							<!-- Start Column:2 Row:3 -->



							<div class="col-md-12-1" style="margin-top: 41px;">



								<!-- Start Header for New Edit Delete Option -->



								<div class="col-md-12-1"
									style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; margin-top: 3px;">



									<label id="refreshDocPrescriptionTemplateMedicineLabel"
										style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">



										<i class="fa fa-plus"></i> New



									</label> <label id="editDocPrescriptionTemplateMedicinelabel"
										style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">



										<i class="fa fa-edit"></i> Edit



									</label> <label id="deleteDocPrescriptionTemplateMedicineLabel"
										style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">



										<i class="fa fa-trash-o"></i> Delete



									</label>



								</div>



								<!-- End Header for New Edit Delete Option -->



								<div class="col-sm-12-1" style="margin-top: 0px;">



									<!--Start Table Heading -->



									<table class="table table-bordered table-condensed">



										<thead>





											<tr>



												<td class="col-md-1-1 center">#</td>



												<td class="col-md-4-1">Prep. Drug</td>



												<td class="col-md-1-1 center">Strength</td>



												<td class="col-md-1-1 center">Dose</td>



												<td class="col-md-1-1 center">Frequency</td>



												<td class="col-md-2-1 center">Instruction</td>



												<td class="col-md-1-1 center">Route</td>



												<td class="col-md-1-1 center">Days</td>



												<td class="col-md-1-1">Quantity</td>



												<td class="col-md-1-1"></td>



											</tr>



										</thead>



									</table>



									<!--End Table Heading -->





									<!--Start Table Body -->



									<div id="flip-scroll" class="col-sm-12-1"
										style="overflow-y: scroll; height: 160px; maxheight: auto; margin-top: -21px;">



										<table class="table table-striped table-condensed">



											<tbody id="prescriptionTemplateContentDocTable">



											</tbody>



											<!-- <tbody id="prescriptionContent">

	

                                                                                                                                                                                                </tbody> -->



										</table>



									</div>



									<!--End Table Body -->



								</div>



							</div>



							<!-- End Column:2 Row:3 -->







							<!-- start: second row -->



							<!-- Start Column:2 Row:1_1 -->



							<div class="col-md-12-1"
								style="margin-top: 3px; border: 2px solid orange;">



								<div class="tabbable tabs-left col-md-12-1"
									style="margin-top: 10px; margin-left: 5px;">



									<ul class="nav nav-tabs col-md-1-1" style="margin: 0px;">



										<li class="active" style="margin-top: -6px"><a
											data-toggle="tab" href="#prepDocMyTemplate"> My Templates
										</a></li>



										<li><a data-toggle="tab" href="#prepDocOrgTemplate">
												Org.Temp </a></li>



									</ul>



									<div class="tab-content col-md-11-1" style="margin: 0px;">





										<div id="prepDocMyTemplate" class="tab-pane fade in active"
											style="margin: 0px; padding-right: 4px; padding-left: 0px;">



											<div class="col-md-12-1"
												style="margin-top: 0px; padding-right: 10px; padding-left: 0px;">



												<!-- Start Header for New Edit Delete Option -->







												<!-- End Search Option -->



											</div>



											<div class="col-sm-12-1" style="margin-top: -1px;">



												<table class="table table-condensed">



													<thead>



														<tr>



															<th class="col-sm-1-1 center"><div class="TextFont">#</div></th>



															<th class="col-sm-1-1 center"><div class="TextFont">Template
																	Name</div></th>



															<th class="col-sm-2-1 center" style="padding-left: 7px;"><div
																	class="TextFont">Owner</div></th>



															<th class="col-sm-1-1 center" style="padding-left: 15px;"><div
																	class="TextFont">Use</div></th>



															<th class="col-sm-1-1 center" style="padding-left: 15px;"><div
																	class="TextFont">Delete</div></th>



														</tr>



													</thead>



												</table>



												<div id="flip-scroll" class="col-sm-12-1"
													style="overflow-y: scroll; height: 135px; maxheight: auto; margin-top: -21px;">



													<table class="table table-striped table-condensed">



														<tbody id="prepDocMyTemplateTable">



														</tbody>



													</table>



												</div>



											</div>



										</div>









										<div id="prepDocOrgTemplate" class="tab-pane fade in"
											style="margin: 0px; padding-right: 4px; padding-left: 0px;">



											<div class="col-md-12-1"
												style="margin-top: 0px; padding-right: 10px; padding-left: 0px;">



												<!-- Start Header for New Edit Delete Option -->



												<!-- <div class="col-md-12-1"

	

                                                                                        

	

                                                                                                                                                                                                        <!-- End Search Option -->



											</div>



											<div class="col-sm-12-1" style="margin-top: -1px;">



												<table class="table table-condensed">



													<thead>



														<tr>



															<th class="col-sm-1-1 center"><div class="TextFont">#</div></th>



															<th class="col-sm-1-1 center"><div class="TextFont">Template
																	Name</div></th>



															<th class="col-sm-2-1 center" style="padding-left: 7px;"><div
																	class="TextFont">Owner</div></th>



															<th class="col-sm-1-1 center" style="padding-left: 15px;"><div
																	class="TextFont">Use</div></th>



															<th class="col-sm-1-1 center" style="padding-left: 15px;"><div
																	class="TextFont">Delete</div></th>



														</tr>



													</thead>



												</table>



												<div id="flip-scroll" class="col-sm-12-1"
													style="overflow-y: scroll; height: 135px; maxheight: auto; margin-top: -21px;">



													<table class="table table-condensed">



														<tbody id="prepDocOrgTemplateTable">



														</tbody>



													</table>



												</div>



											</div>



										</div>







									</div>



								</div>



							</div>



							<!-- End Column:2 Row:1_1 -->



							<!-- End: second row -->



						</div>



					</div>



				</div>



			</div>



		</div>



		<!--End #AddUpdatePrescriptionTemplatePopup Popup -->

		<script>
			$('#discharge_Time').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 1
			});
		</script>
		
		<script>
			$('#dpatient_admission_time_in_iww').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 1
			});
		</script>
		
		
			<script>
			$('#dpatient_death_time').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 1
			});
		</script>
		
		
		
		<script>
			$('#priConsultTime').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 15
			});
		</script>
		
		<script>
			$('#hrOPDTime').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 15
			});
		</script>
		
		<script>
			$('#ropScreen1').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 15
			});
		</script>
		
		<script>
			$('#hearingScreen1').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 15
			});
		</script>
		
		<script>
			$('#usgBrain1').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 15
			});
		</script>
		
		<script>
			$('#adother1').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 15
			});
		</script>
		
	</c:if>
	<!-- /c:if -->
</body>
</html>