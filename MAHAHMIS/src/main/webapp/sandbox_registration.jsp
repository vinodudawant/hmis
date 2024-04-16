<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<c:if test="${ sessionScope.userType != null }">
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Registration | EhatEnterprise</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<link rel="stylesheet" href="css/themify-icons.css">


<!-- ----for search  autosuggation  complete-------------- -->
<!-- <link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" /> -->
<!-- ----for search  autosuggation  complete-------------- -->
<!-- css for developer -->

<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!-- JQUERY -->
<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
<!-- JQUERY UI-->
<script	src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>

<!-- STYLESHEETS -->
<!--[if lt IE 9]><script src="js/flot/excanvas.min.js"></script><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script><![endif]-->
<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css">
<link rel="stylesheet" type="text/css" href="ehat-design/css/themes/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css" href="ehat-design/css/responsive.css">
<link href="ehat-design/font-awesome/css/font-awesome.min.css" rel="stylesheet">
<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- bootstrap datepicker -->
<link rel="stylesheet" href="ehat-design/datepicker/datepicker3.css">
<!--TIMEPEACKER -->
<link rel="stylesheet" type="text/css" href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>
<!-- FULL CALENDAR -->
<link rel="stylesheet" type="text/css" href="js/fullcalendar/fullcalendar.min.css" />
<!--calender Files  -->
<script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></link>    
<!--TIMEPEACKER -->
<!-- BOOTSTRAP SWITCH -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-switch/bootstrap-switch.min.css" />
<!-- SELECT2 -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/uniform/css/uniform.default.min.css" />
<!-- WIZARD -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-wizard/wizard.css" />
<!-- FONTS -->
<link href='ehat-design/css/family.css' rel='stylesheet' type='text/css'>

<!-- <script type="text/javascript" src="js/ehatMaster.js"></script>
	<script type="text/javascript" src="js/dept.js"></script>
	<script type="text/javascript" src="js/unit_master.js"></script>
	<script type="text/javascript" src="js/serviceMaster.js"></script> -->
<!-- include js for development -->


<!-- DATA TABLES -->
<!-- <link rel="stylesheet" type="text/css" href="js/datatables/media/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css" href="js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css" href="js/datatables/extras/TableTools/media/css/TableTools.min.css" /> -->

<!-- <link rel="stylesheet" type="text/css"
	href="dataTable/jquery.dataTables.min.css" />
<script src="dataTable/jquery-1.12.4.js"></script>
<script src="dataTable/jquery.dataTables.min.js"></script> -->

<!-- FULL CALENDAR -->
<script type="text/javascript" src="js/fullcalendar/fullcalendar.min.js"></script>
<script src="js/jquery.ajaxfileupload.js"></script>
<!-- Auto-Suggestion 8/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>
<!-- Added by sagar-->

<script src="ehat-design/js/script.js"></script>

<script type="text/javascript" src="js/Dashboard.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/unit_master.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/config.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/serviceMaster.js"></script>
<script type="text/javascript" src="js/ehat_appointment.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/notification.js"></script>
<script type="text/javascript" src="js/profeesAdvance.js"></script>
<script type="text/javascript" src="js/chargesMasterSlave.js"></script>
<script type="text/javascript" src="js/multipleSponsor.js"></script>
<script type="text/javascript" src="js/markvisit.js"></script>
<script type="text/javascript" src="js/autosuggession_patient.js"></script>
<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript" src="js/abdm_sandbox.js"></script>

<%
	session = request.getSession();
	String uid = (String) session.getAttribute("uid");
	ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	//String cancerOnOff = resourceBundleEha.getObject("cancerOnOff").toString();
	
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
	String current_date = formatter.format(currentDate.getTime());
	
	java.text.SimpleDateFormat formatterrr = new java.text.SimpleDateFormat("hh:mm");
	String todays_time = formatterrr.format(currentDate.getTime());

%>	



<!-- Added by vinod -->
<script type="text/javascript">

	//============================================================== 
	$(document).ready(function() {
		App.setPage("wizards_validations"); //Set current page
		App.init(); //Initialise plugins and elements
		FormWizard.init();
		
		
		
		$("#sourceDiv").hide();
		$("#doctorDiv").hide();
		$("#referredByDiv").hide();
		$("#userResStatus").hide();

		var bmiId =<%=request.getParameter("bmiPatID")%>;
	
		if (bmiId != null) {
			setVisitingPatientDetails1(<%=request.getParameter("bmiPatID")%>,"edit");
		}

		//setSponser();
		var apid = <%=request.getParameter("apid")%>;
		var ptid = <%=request.getParameter("ptid")%>;
	
		//setAutoCompleteMarkVisit(inputId, callfrom);
		if (apid != null) {
			registerPatient(<%=request.getParameter("apid")%>); //  
			$("#patientApId").val(<%=request.getParameter("patientApId")%>);		
		}
		if (ptid != null) {
			setVisitingPatientDetails1(<%=request.getParameter("ptid")%>,"appointment");//	
			$("#patientApId").val(<%=request.getParameter("patientApId")%>);
		}
		//setUserResStatus(); 
		setAddReasonOfVisitreg();
		$('#prefix').focus();

		$('#e1').select2();
		$('#prefix').select2();
		$('#gender').select2();
		$('#department').select2();
		$('#drDeptId').select2();
		$('#spclwiseDoc').select2();
		$('#authType').select2();
		
		$('#calendar1').fullCalendar({
	
		});	


		localStorage.removeItem('visited');
		
	    $('#foo').click(function() {

	    	var yetVisited = localStorage['visited'];
		    if (!yetVisited) {

		    	fetchMarkVisitPatient();
		        localStorage['visited'] = "yes";
		    }
		});
			

		//Date picker
		$('#dob').datepicker({
			autoclose : true
		});
		
		//Date picker
		$('#refDate').datepicker({
			autoclose : true
		});
		
		//Date picker
		$('#validUpToDate').datepicker({
			autoclose : true
		});
		
		//Date picker
		$('#mulRefDate').datepicker({
			autoclose : true
		});
		
		//Date picker
		$('#mulValidUpToDate').datepicker({
			autoclose : true
		});
		
		//Date picker
		$('#doa').datepicker({
			autoclose : true
		});
		
		$('#toa').datetimepicker({
		 	datepicker:false,
		 	format:'H:i',
		 	step:5
		});
	});

	

	/* $(document).click(function() {
		$('input[type="file"]').ajaxfileupload({
			'action' : 'ehat/uploadregdoc/uploadDocument',
		});
	}); */
	
	//==============
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp
			.getDate(), 0, 0, 0, 0);
	var checkin = $('#dpd1').datepicker({
		onRender : function(date) {
			return date.valueOf() < now.valueOf() ? 'disabled' : '';
		}
	}).on('changeDate', function(ev) {

		if (ev.date.valueOf() > checkout.date.valueOf()) {
			var newDate = new Date(ev.date);
			newDate.setDate(newDate.getDate() + 1);
			checkout.setValue(newDate);
		}
		checkin.hide();
		$('#dpd2')[0].focus();
	}).data('datepicker');

	var checkout = $('#dpd2').datepicker({
		onRender : function(date) {
			return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
		}
	}).on('changeDate', function(ev) {
		checkout.hide();
	}).data('datepicker');
	
	//================= 
	$(function() {
		$("#events").change(function() {
			var col = $(this).val();
			$(this).css("background", col);
			$(function() {
				$('#DocList').on('click', 'div', function() {
					$('#DocList div').css({
						background : 'transparent'
					});
					$(this).css({
						background : col
					});
					//$(this).setAttribute('disabled','disabled');
				});
			});
		});
	});

	$(function() {
		$("#eventsAppointment").change(function() {
			var col = $(this).val();
			$(this).css("background", col);
			$(function() {
				$('#DocList1').on('click', 'div', function() {
					$('#DocList1 div').css({
						background : 'transparent'
					});
					$(this).css({
						background : col
					});
					//$(this).setAttribute('disabled','disabled');
				});
			});
		});
	});
	//===================================================================== 
	
</script>

<!-- <script type="text/javascript">
	$(function() {
		$("#ehat_module_sandbox").addClass("menuActive");
	});
</script> -->

</head>
<body>

	<!-- HEADER -->
	<header class="navbar clearfix" id="header">

		<%@include file="Menu_Header_Nobel.jsp"%>

	</header>
	<!--/HEADER -->

	<!-- PAGE -->
	<section id="page">

		<!-- SIDEBAR -->
		<%-- <%@include file="left_menu_nobel.jsp"%> --%>
		<%@include file="sandbox_left_menu.jsp"%>
		<!-- /SIDEBAR -->

		<div id="main-content">

			<div class="container">
				<div class="row">
					<div id="content" class="col-lg-12">
						<!-- PAGE HEADER-->
						
						<div class="row">
								<div class="col-sm-12">
									<div class="page-header">
										<!-- STYLER -->

										<!-- /STYLER -->
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><a href="sandbox_registration.jsp">ABHA Creation</a></li>
											
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>
						<!-- /PAGE HEADER -->


						<!-- SAMPLE -->
						<div class="row">


							<div class="col-sm-12">

							

								<div class="col-md-9" id="getPatDiv">

								
									<div class="box-body form">

										<form id="wizForm" action="#" class="form-horizontal">
										<!-- <form method="post" enctype="multipart/form-data" name="fileUploadfrm" id="fileUploadfrm" action="UploadDoctordeskServlet"> -->
															<!--Health Id Information Start  on 16-Sep-2022 -->
														
															<div class="row">

																<!--For Single Sponser-->
																<div class="col-md-12" >
																	<div class="panel panel-primary"
																		style="height: 618px; width: 107%;">
																		<div class="panel-heading" id="divEhatContent">
																		<label class="control-label"><b>ABHA
																					Creation Information</b></label></div>
																		<div class="panel-body">
																		
																			<div class="col-md-6">
																				<div class="form-group">
																					<label class="control-label ">Aadhaar Number</label>
																					<div class="" style="width: 90%;">
																						<input type="text" class="form-control"
																							name="visa" id="aadharNumber"
																							placeholder="Aadhaar Number" />
																						<!-- <label><input type="checkbox">I agree &nbsp<a data-toggle="modal" data-target="#addharConsentPopup">read more</a> </label> -->
																					</div>
																					
																				</div>
																			</div>
																			
																			<div class="col-md-6">
																				<div class="form-group">
																					<label class="control-label ">Verify OTP</label>
																					<div class="" style="width: 90%;">
																						<input type="text" class="form-control"
																							name="visa" id="verifyOTP"
																							placeholder="Verify OTP" />

																					</div>
																				</div>
																			</div>
																			
																			
																			<div class="col-md-6">
																				<div class="form-group">
																					<div class="" style="width: 90%;">																					
																						<button class="btn btn-xs btn-success" data-toggle="modal"
																							onclick="generateAadharOTP()"	>Send OTP</button>

																					</div>
																				</div>
																			</div>
																			
																			<div class="col-md-6">
																				<div class="form-group">
																					<div class="" style="width: 90%;">																					
																						<button class="btn btn-xs btn-success" data-toggle="modal"
																							onclick="verifyAadharOTP()">Verify OTP</button>

																					</div>
																				</div>
																			</div>
																			<div class="col-md-6">
																				<div class="form-group">
																					<label class="control-label ">Mobile Number</label>
																					<div class="" style="width: 90%;">
																						<input type="text" class="form-control"
																							name="visa" id="mobileNumber"
																							placeholder="Mobile Number" />

																					</div>
																				</div>
																			</div>
																			
																			<div class="col-md-6">
																				<div class="form-group">
																					<label class="control-label ">Verify OTP</label>
																					<div class="" style="width: 90%;">
																						<input type="text" class="form-control"
																							name="visa" id="verifyMobileOTP"
																							placeholder="Verify Mobile OTP" />

																					</div>
																				</div>
																			</div>
																			
																			
																			<div class="col-md-6">
																				<div class="form-group">
																					<div class="" style="width: 90%;">																					
																						<button class="btn btn-xs btn-success" data-toggle="modal"
																							onclick="generateMobileOTP()">Send Mobile OTP</button>

																					</div>
																				</div>
																			</div>
																			
																			<div class="col-md-6">
																				<div class="form-group">
																					<div class="" style="width: 90%;">																					
																						<button class="btn btn-xs btn-success" data-toggle="modal"
																							onclick="verifyMobileOTP1()">Verify Mobile OTP</button>

																					</div>
																				</div>
																			</div>
																			
																			
																				<div class="col-md-6 col align-self-center">

																					<div class="form-group">
																						<label style="margin-right: 14px;"
																							class="control-label ">ABHA Address<span
																							class="required text-danger">*</span></label>

																						<div class="input-group " style="width: 90%;">

																							<input type="text" class="form-control" id="sbx" >
																						   <div class="input-group-addon">
																								@sbx
																							</div>
																						</div>
																					</div>
																				</div>
																				
																				
																		<div class="col-md-12 text-center">
																				<div class="form-group">
																					<div class="" style="width: 90%;">																					
																						<button class="btn btn-xs btn-success" data-toggle="modal"
																							onclick="createHealthIdWithPreVerified()">Save</button>

																					</div>
																				</div>
																			</div>
																		
																			
																	</div>
																	</div>
																	
																	
																</div>
															</div>
														
														<!--Health Id Information End-->
																			
														<div class="modal" tabindex="-1" role="dialog" id="addharConsentPopup">
																			  <div class="modal-dialog" role="document">
																			    <div class="modal-content">
																			      <div class="modal-header">
																			        <h5 class="modal-title">Addhar Consent</h5>
																			        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
																			          <span aria-hidden="true">&times;</span>
																			        </button>
																			      </div>
																			      <div class="modal-body">
																			        <p>I, hereby declare that I am voluntarily sharing my Aadhaar Number and demographic information issued by UIDAI, with National Health Authority (NHA) for the sole purpose of creation of ABHA number . I understand that my ABHA number can be used and shared for purposes as may be notified by ABDM from time to time including provision of healthcare services. Further, I am aware that my personal identifiable information (Name, Address, Age, Date of Birth, Gender and Photograph) may be made available to the entities working in the National Digital Health Ecosystem (NDHE) which inter alia includes stakeholders and entities such as healthcare professionals (e.g. doctors), facilities (e.g. hospitals, laboratories) and data fiduciaries (e.g. health programmes), which are registered with or linked to the Ayushman Bharat Digital Mission (ABDM), and various processes there under. I authorize NHA to use my Aadhaar number for performing Aadhaar based authentication with UIDAI as per the provisions of the Aadhaar (Targeted Delivery of Financial and other Subsidies, Benefits and Services) Act, 2016 for the aforesaid purpose. I understand that UIDAI will share my e-KYC details, or response of Yes with NHA upon successful authentication. I have been duly informed about the option of using other IDs apart from Aadhaar; however, I consciously choose to use Aadhaar number for the purpose of availing benefits across the NDHE. I am aware that my personal identifiable information excluding Aadhaar number / VID number can be used and shared for purposes as mentioned above. I reserve the right to revoke the given consent at any point of time as per provisions of Aadhaar Act and Regulations.</p>
																			      </div>
																			      <div class="modal-footer">
																			        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
																			      </div>
																			    </div>
																			  </div>
																			</div>
													
															
																</form>
															
																
															</div>
														</div>
													
												</div>
												
												
												
											</div>
										<!-- </form> -->

									</div>
									<!-- </div> -->

								</div>
								<!-- /BOX -->
							</div>
						</div>
						<!-- /SAMPLE -->
						<input type="hidden" id="queryType" value="insert"> <input
							type="hidden" id="patientId" value="0"> <input
							type="hidden" id="treatmentId" value="0"> <input
							type="hidden" id="billId" value="0"> <input type="hidden"
							id="billDetailsId" value="0"> <input type="hidden"
							id="billDetailsIpdId" value="0"> <input type="hidden"
							id="count" value="0">
							
							<input type="hidden"	id="patientApId" value="0">


						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
					
		<div id="pleaseWait" style="text-align: center; display: none;">
			<img style="margin-top: 250px;" height="43px"
				src="images/loading_black.gif" />
			<div style="margin-top: 10px; color: white">
				<b>Please wait...</b>
			</div>
		</div>
		

		<!-- End pop up for camera -->
		<%@include file="footer_nobel.jsp"%></section>
	<!--/PAGE -->

	<!-- JAVASCRIPTS -->
	<!-- Placed at the end of the document so the pages load faster -->

	<!-- DATE RANGE PICKER -->
	<script src="ehat-design/js/bootstrap-daterangepicker/moment.min.js"></script>

	<!-- <script
		src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script> -->

	<!-- bootstrap datepicker -->
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

	<!-- BOOTSTRAP SWITCH -->
	<script type="text/javascript"
		src="ehat-design/js/bootstrap-switch/bootstrap-switch.min.js"></script>

	<script
		src="ehat-design/js/bootstrap-wizard/jquery.bootstrap.wizard.min.js"></script>
	<!-- WIZARD -->
	<script src="ehat-design/js/jquery-validate/jquery.validate.min.js"></script>
	<script src="ehat-design/js/jquery-validate/additional-methods.min.js"></script>
	<!-- BOOTBOX -->
	<script type="text/javascript"
		src="ehat-design/js/bootbox/bootbox.min.js"></script>
	<!-- COOKIE -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	<!-- CUSTOM SCRIPT -->	
	<script src="ehat-design/js/bootstrap-wizard/form-wizard.min.js"></script>
	<!-- <script type="text/javascript" src="js/patient.js"></script> -->
	<script type="text/javascript" src="js/validate.js"></script>


	<!-- for image upload -->
	<script lang="Javascript">
		//$(document).ready();
			
	
		
	</script>
	<script type="text/javascript" src="webcam/webcam.min.js"></script>

	<!-- /JAVASCRIPTS -->

	<!-- added by sagar -->

	<div id="state" style="display: none;"></div>
	<div id="district" style="display: none;"></div>
	<div id="taluka" style="display: none;"></div>
	<div id="city" style="display: none;"></div>
	<!-- //<div id="doctorName" style="display: none;"></div> -->
	<div class="modal-footer">
		<div class="form-group col-md-12-1 center"></div>
		<input type='hidden' id="commonAd_patId" value='0' /> <input
			type='hidden' id="commonAd_treatId" value='0' /> <input
			type='hidden' id="commonAd_receipt_type" value='advance' />
	</div>

	;<div id="doctorObject" style="display: none;"></div>
	<input type="hidden" id="appoid" value="0">
	<div style="display: none;" id="divPatFile">${requestScope.imgPath}</div>
	<div id="pageName" style="display: none;"><%=request.getParameter("pagenm")%></div>
	<div id="CompanyDetails" style="display: none;"></div>
	<div id="CompanySponsorDetails" style="display: none;"></div>
	<div id="PolicyDetails" style="display: none;"></div>
	<div id="SponsorDetails" style="display: none;"></div>
	<input type="hidden" id="appoid" value="0" />
	<input type="hidden" id="trid" value="0" />
	<input type="hidden" id="trid24" value="0" />
	<input type="hidden" value="<%=session.getAttribute("userName")%>" id="userName" />
	<input type="hidden" value="<%=session.getAttribute("userLoginName")%>" id="userNameLogIn" />
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="UHPrefix" value="<%=session.getAttribute("UHPrefix")%>">
	<div style="display: none;" id="hospDetails"></div>
	<input type="hidden" id="mrnnoHidden" value="xyz" />
	<input type="hidden" id="invoiceFlag" value="N" />

	<!--  added by sagar -->
	<input type="hidden" id="popup_container3" value="" />
	<input type="hidden" id="doctorObject" />

	<div id="commonAdvance" style="display: none;"></div>
	<div style="display: none;" id="allPatInfo"></div>
	<input type="hidden" id="patName" value="" />
	<input type="hidden" id="patID" value="0" />

	<input type="hidden" id="doctorid" value="" />
	<input type="hidden" id="patID" value="0" />
	<input type="hidden" id="docName" value="" />
	<input type="hidden" id="imageName" value="" />	
	<input type="hidden" id="aadharImageName" value="" />

	<input type="hidden" id="ptName" value="null" />
	<input type="hidden" id="OpdIpdNo" value="0" />
	<input type="hidden" id="markvisitTflag" value="Y" />
	<input type="hidden" id="invoiceCount" value="0" />
	<input type="hidden" id="AppId"	value="<%=request.getParameter("apid")%>" />
	<input type="hidden" id="ptid" value="<%=request.getParameter("ptid")%>" />

	<input type="hidden" id="billPrefix" value="">
	<input type="hidden" id="billMiddle" value="">
	<input type="hidden" id="billSufix" value="">

	<input type="hidden" id="patPrefix" value="">
	<input type="hidden" id="patMiddle" value="">
	<input type="hidden" id="patSufix" value="">

	<input type="hidden" id="recPrefix" value="">
	<input type="hidden" id="recMiddle" value="">
	<input type="hidden" id="recSufix" value="">

	<input type="hidden" id="patListLen" value="0">
		
	<input type="hidden" id="maxPatId" value="0">
	<input type="hidden" id="curPatImg" value="">
	<input type="hidden" id="payResId" value="0" />    <!-- added by Tarique Aalam -->
	<input type="hidden" id="mlcId" value="0" />    <!-- added by Tarique Aalam -->
	<input type="hidden" id="mlcCmoDoctorhidden" value="0" />    <!-- added by Tarique Aalam -->
	
	 <!-- For Multiple Sponsor -->
	<input type="hidden" id="mulSponsorId" value="0" />  
 	<input type="hidden" id="primaryFlag" value="N" />
	<input type="hidden" id="curAadharImg" value="" />  
	<input type="hidden"  id="namcoFlow" value="<%=resourceBundleEha.getObject("namco").toString()%>">
	<input type="hidden"  id="risingFlow" value="<%=resourceBundleEha.getObject("rising").toString()%>">

	<input type="hidden" id="idTourDateDetails" value="<%=todays_date%>">
	<input type="hidden" id="idNewAppointment" value="<%=todays_date%>">
	<input type="hidden" id="todays_date" value="<%=todays_date%>">
	<input type="hidden" value="New" id="appointmentType" disabled="disabled" />
	<div id="divAppo" style="display: none; display: none;"></div>
	<div id="patientDetails" style="display: none; display: none;"></div>
	<div id="followUpList" style="display: none; display: none;"></div>
	<div id="reScheduleList" style="display: none; display: none;"></div>
	
	
	<input type="text" style="display: none;" id="txtHiddenFollowUp" disabled="disabled" />
	<input type="text" style="display: none;" id="txtHiddenFollowUpBColor" disabled="disabled" />
	<div id="divTokenNo" style="display: none; display: none;"></div>		
	<div id="DocNotAvailable" style="display: none; display: none;"></div>
	<input type="hidden" value="" id="hidpatId" disabled="disabled" />
	<input type="hidden" value="" id="trid" disabled="disabled" />	
	<input type="hidden" value="" id="appDateTime" disabled="disabled" />
	<input type="hidden" value="" id="appEndTime" disabled="disabled" />
	<input type="hidden" value="save" id="appQueryType" disabled="disabled" />
	<input type="hidden" value="0" id="appointmentId" disabled="disabled" />		
	<input type="hidden" value="green" id="color" disabled="disabled" />
	<div id="doctorObject" style="display: none; display: none;"></div>	
	<input type="hidden" value="0" id="chgDeptId" />
	
	<input type="hidden" value="new" id="regType" />
	<input type="hidden" value="<%=current_date %>" id="collectionDate" />
	<input type="hidden" value="<%=todays_time %>" id="collectionTime" />
	
	
	
</body>
</html>
</c:if>
<c:if test="${sessionScope.userType == null}">
	<jsp:forward page="index.jsp"></jsp:forward>
</c:if>