<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>HaemoDialysis Ward</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<meta name="viewport" content="user-scalable=no, width=device-width" />
<script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>
<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css" id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="ehat-design/css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet" media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="css/bootstrap-chosen.css" />
<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
<link rel="stylesheet" type="text/css" href="css/jquery-ui-1.10.3.custom.min.css" />
<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></link>
<link rel="stylesheet" type="text/css" href="timepeacker/jquery.datetimepicker.css" />
<link rel="stylesheet" type="text/css" href="<c:url value="/pharmacy/resources/js/jqx-widgets/jqx.base.css"/>">
<link rel="stylesheet" type="text/css" href="js/ExtraJs/jqx-widgets/jqx_customTheme.css" />
<link rel="stylesheet" type="text/css" href="js/bootstrap-switch/bootstrap-switch.min.css" />


<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.js"></script>
<script type="text/javascript" src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript" src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<script type="text/javascript" src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="pharmacy/resources/js/app_js/Pharma_Validation.js "></script>
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>
<script src="js/script.js"></script>
<script type="text/javascript" src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<script src="timepeacker/jquery.datetimepicker.js"></script>
<script src="/pharmacy/resources/js/bootbox.js"></script>
<script type="text/javascript" src="js/bootstrap-wysiwyg/jquery.hotkeys.min.js"></script>
<script type="text/javascript" src="js/bootstrap-wysiwyg/bootstrap-wysiwyg.min.js"></script>
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="js/bootstrap-switch/bootstrap-switch.min.js"></script>
<script type="text/javascript" src="RichTextBox/tinymce/tinymce.min.js"></script>
<script type="text/javascript" src="RichTextBox/tinymce/jquery.tinymce.min.js"></script>
<script type="text/javascript" src="RichTextBox/tinymce/themes/modern/theme.min.js"></script>
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>
<script src="timepeacker/jquery.datetimepicker.js"></script>


<!-- adding for developers js  -->
<script type="text/javascript" src="js/Treatment.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/ehat_dialysis.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<!-- ending for developers js  -->


<script type="text/javascript">
	onload = function() {	
		hidedivoninvestigationsheet();
		setTempateOnPatientinformation();
		hideDivPreviousTreatmentDeatils();
		$('#startDate').datetimepicker({
			 datepicker:false,
			 format:'H:i',
			 step:10
			 }); 
		$('#terminateDate').datetimepicker({
			 datepicker:false,
			 format:'H:i',
			 step:10
			 });
	};
</script>

<style>
.panel-heading {
	position: relative;
}

.panel-heading[data-toggle="collapse"]:after {
	font-family: 'Glyphicons Halflings';
	content: "\e072"; /* "play" icon */
	position: absolute;
	color: #b0c5d8;
	font-size: 18px;
	line-height: 22px;
	right: 20px;
	top: calc(50% -     10px);
	/* rotate "play" icon from > (right arrow) to down arrow */
	-webkit-transform: rotate(-90deg);
	-moz-transform: rotate(-90deg);
	-ms-transform: rotate(-90deg);
	-o-transform: rotate(-90deg);
	transform: rotate(-90deg);
}

.panel-heading[data-toggle="collapse"].collapsed:after {
	/* rotate "play" icon from > (right arrow) to ^ (up arrow) */
	-webkit-transform: rotate(90deg);
	-moz-transform: rotate(90deg);
	-ms-transform: rotate(90deg);
	-o-transform: rotate(90deg);
	transform: rotate(90deg);
}
</style>

<style>
.container {
	
}
</style>


<%	
	ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	String risingFlow = resourceBundleEha.getObject("rising").toString();
%>

</head>

<body style="background: white ! important;">
	<section id="page">
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${ sessionScope.userType != null }">
	<div id="outer" class="container-main" style="width: 100%;">
			<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header.jsp"%>
		</header>

			<%@include file="left_menu_HaemoDialysis.jsp"%>


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
						<div id="content" class="col-lg-12 tab-content">

							<div class="row">
								<div class="col-sm-12">
									<div class="page-header" style="height: 32px;">
										<ul class="breadcrumb col-md-12-1"
											style="padding: 4px 10px; margin-top: 1px;">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><a href="ehat_haemoDialysis_ward.jsp">HaemoDailysis
													Patient</a></li>
											<li>Dashboard</li>

										</ul>
									</div>
								</div>
							</div>



							<div class="alert alert-block alert-info fade in col-md-12-1"
								style="padding-block-end: 5%; padding-top: 3%; margin-top: -2%;">

								<div class="row">
									<div class="col-md-1">
										<img id="patImg" style="width: 100%; height: 45px"
											src="ehat-design/img/profile/avatar.jpg"
											class="img-responsive">
									</div>
								<div class="col-md-11">
										<div class="col-md-12">

											<div class="col-md-4">
												<div class="form-group">
													<label class="control-label lblBold">Patient Name :</label>
													<label id="patientName" class="control-label"></label>
												</div>
											</div>


											<div class="col-md-2">
												<div class="form-group">
													<label class="control-label lblBold">Age:</label> <label
														id="age" class="control-label"></label>
												</div>
											</div>

											<div class="col-md-2">
												<div class="form-group">
													<label class="control-label lblBold">Phone No: </label> <label
														id="mobile" class="control-label"></label>
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
													<label class="control-label lblBold">Bill Category
														:</label> <label id="billCategoty" class="control-label">
													</label>
												</div>
											</div>

											<div class="col-md-2">
												<div class="form-group">
													<label class="control-label lblBold">DOA:</label> <label
														id="doa" class="control-label"> DOA-D</label>
												</div>
											</div>

											<div class="col-md-2">
												<div class="form-group">
													<label class="control-label lblBold">Treatment Id :</label>
													<label id="treatmentId" class="control-label"> <%=request.getParameter("treatmentId")%></label>
												</div>
											</div>
											<div class="col-md-2">
												<div class="form-group">
													<label class="control-label lblBold">Bill No:</label> <label
														id="consultingDoctor" class="control-label"> </label>
												</div>
											</div>
											<div class="col-md-4">
												<div class="form-group">
													<label class="control-label lblBold">Address :</label> <label
														id="addressheader" class="control-label"> </label>
												</div>
											</div>

											<div class="col-md-4">
												<div class="form-group">
													<label class="control-label lblBold">Consulting Dr:</label>
													<label id="consultingDoctorr" class="control-label">
													</label>
												</div>
											</div>

											<div class="col-md-4">
												<div class="form-group">
													<label class="control-label lblBold">Ref Dr:</label> <label
														id="refDoctor" class="control-label"></label>
												</div>
											</div>

										</div>
									</div>
								</div>
							</div>
						
						<div class="col-md-12 well" style="margin-bottom: 2%">
								<ul class="nav nav-tabs md-tabs">

									<li id="consentformtab" class="active" style="margin-bottom:1%" onclick="showdivcallform(this.id);"><a
										data-toggle="tab" href="#consentformdiv" onclick="getinformedconsentForm();"><i
											class="fa fa-user"></i><span class="hidden-inline-mobile">INFORMED
												CONSENT</span></a></li>

									<li id="careplantab" ><a data-toggle="tab"
										href="#careplandiv" onclick="getListCarePlanDialysis(),getVirologyVaccninationListById(),getBloodTransfusionListById()"><i class="fa fa-user"></i><span
											class="hidden-inline-mobile">CARE PLAN</span></a></li>

									<li id="haerecodmodialtsistab" ><a data-toggle="tab"
										href="#haerecodmodialtsisdiv" onclick="getHomoDailaysisHaeremodialsysis(),getOnDialysisTableListById(),getDialysisAdviceList()"><i class="fa fa-user"></i> <span
											class="hidden-inline-mobile">HAERECORDMODIALTSIS</span></a></li>

									<li id="investigationdivtab" ><a data-toggle="tab"
										href="#investigationsheet" onclick="fetchipddetailsDailysis(),getdoctorName();"><i class="fa fa-user"></i> <span
											class="hidden-inline-mobile">INVESTIGATIONSHEET</span></a></li>

									<li id="documenttab" ><a data-toggle="tab"
										href="#Upload_Document" onclick="getuploadDocuments()"><i class="fa fa-user"></i> <span
											class="hidden-inline-mobile">DOCUMENTS UPLOAD</span></a></li>
								</ul>
					
					<div class="tab-content  ">
							<!-- Statring informed form  div -->
								<div id="consentformdiv" class="tab-pane fade in active ">
									<div class="panel panel-default">
										<div class="panel-body"
											style="margin-top: 15px; overflow: auto;">

											<input type="button" value="Print" class="btn btn-info"
												style="float: right;" onclick="printConsentInformedFrom()" /> <input
												type="button" value="save" class="btn btn-success"
												style="float: right; margin-right: 1%"
												onclick="saveinformedconsentForm()" />

											<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10"
												style="margin-left: 77px; margin-top: 19px">
												<div class="panel panel-default">
													<div class="panel-heading"></div>
													<div class="panel-body">

														
														<br> I <input type="text" class="inputbold"
															style="width: 30%; margin-top: -16px; margin-left: 10px"
															id="patientNameconsent"> Resident Of <input type="text"
															class="inputbold"
															style="width: 30%; margin-top: -16px; margin-left: 10px"
															id="addressconsent"> do hearby 1)consent to undergo
														hemodialysis <br> <br>2) Subject my wife/
														Husband/Father/mother/Son/Daughter/Relative <input
															type="text" class="inputbold"
															style="width: 30%; margin-top: -16px; margin-left: 10px"
															id="reletiveconsent"> to undergo hemodialysis on such
														occassions and at such times as may deemed necessary by
														Nephrologist of Health & Dialysis Center Larsen & Toubro.
														If an access has not already been created.I agree to have
														a subclavian jugular or femoral catheter inserted as many
														times as required.as decided by the doctor in
														charge.Complications asrising out of this procedure have
														been explained to me.The Nephrologist concerned has
														explained to me about hemodialysis and its effect and
														possible risks sucha as
														nausea,vomiting,hypertension,rigors,bleeding,convulsions
														and even cardiac arrest.The possiblity of transmisson of
														viruses such as hepatitis B,C & HIV during the procedure
														has also been explained to me.
														<p>I consent to the performance of any other procedure
															and administration of any drug including blood trasfusion
															,which may become necessary as a result hemodialysis or
															the disease.</p>

														<p>I understand that each patient is permitted to have
															only one visitor to wait in waiting area while She/he is
															on dialysis.
														<p>I consent to accept any dialysis machine alloted to
															me by the technician /nurse/doctor on duty.Demands for
															any perticular machine of my choice will not be
															entertained ,also schedule for dialysis may keep changing
															and no perticular shift will be permanently given.Machine
															with TV will not be provided every time.During the
															commencement and termination of a dialysis no realtives
															will be allowed to interfere with the work schedule.</p>
														<p>Patient not responding for dialysis must inform
															sister incharge of the doctor at least 4 hours time.</p>

														<p>I understand that HIV test,Australia antigen test
															and Anti HCV test are compulsory before putting a patient
															on the dialysis programme.These tests will be repeated
															from time as deemed nesessary by the Nephrologists.These
															tests,I unserstand are to be paid for by me.</p>
														<p>I have read and understood above things.I have been
															explained the alternative modes of treatement including
															CAPO,Kidney transplanation and the consequences of not
															taking regular dialysys.</p>
														<p>I have read also been told that certain items will
															be resused during dialysis to decrease the cost of
															dialysis.These items are Dialyzers,blood tubing
															sets,Plasmapheresis filter etc.</p>
														<p>I also understand that experienced nurses and/or
															technicians mainly carry out dialysis and the
															nephrologists may not be present during the entire
															procidure.</p>
														<p>Doctors have tolde me that patient may get
															Cardio-Respiratory Arrest or any complication or mishaup
															during & after Hemodialysis.</p>
														<p>In case of any complication I shall need to be
															transported to nearest Hospital with Intensive Care Unit
															facility as I am aware is not available at Larsen &
															Toubro.Health & Dialysis Centre Thane.</p>
														<p style="text-align: right">Signature</p>

													</div>
												</div>
											</div>

										</div>

									</div>

								</div>
								<!-- ending informed form  div -->


								<!-- statring care plan div -->
								<div id="careplandiv" class="tab-pane fade in "
									class="input-res">
									<div class="panel panel-default from group">
										<div style="padding-left: 0%;">
											<input type="button" value="Print" class="btn btn-info"
												style="float: right; margin-right: 1%; margin-top: 1%;"
												onclick="printHaemoCarePlanForm()" />
										</div>
										<div style="padding-left: 1%;">
											<input type="button" value="save" class="btn btn-success"
												style="margin-top: 1%; float: right; margin-right: 1%;"
												onclick="saveCarePlan()" />
										</div>

										<div class="panel-body"
											style="margin-top: 20px; overflow: auto;">


											<div id="genralInfo">
												<div class="panel-group col-md-12" id="accordion">
													<div class="panel panel-default">
														<div class="panel-heading accordion-toggle collapsed"
															data-toggle="collapse" data-parent="#accordion"
															data-target="#generalInfo">
															<h4 class="panel-title">A.Genral Information</h4>

														</div>
														<div id="generalInfo" class="panel-collapse collapse">
															<div class="container">
																<div class="panel-body">


																	<div class="col-md-3">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;">Marital Status:
																			</label>
																			<div class="">
																			<select id="martialstatus"
																						class="form-control"
																					style="width: 90%;"
																						name="martialstatus">
																						<option value="0">Select Status</option>
																						<option value="1">Married</option>
																						<option value="2">Widowed</option>
																						<option value="3">Separated</option>
																						<option value="4">Divorced</option>
																						<option value="5">Single</option>
																			</select>
																			
																				<!-- <input type="text" class="form-control"
																					style="width: 90%;" id="martialstatus"> -->
																			</div> 
																			
                                                                      	</div>
																	</div>

																	<!-- <div class="col-md-6">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;"> Phone.No:</label>
																			<div class="">
																				<input type="text" class="form-control"
																					style="width: 90%;" id="phoneNo">
																			</div>
																		</div>
																	</div> -->
																	<div class="col-md-6">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;">Allergies:</label>
																			<div class="">
																				<input type="text" class="form-control"
																					style="width: 90%;" id="alllergies">
																			</div>
																		</div>
																	</div>


																	<div class="col-md-3">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;">Blood Group: </label>
																			<div class="">
																				<!-- <input type="text" class="form-control"
																					style="width: 90%;" id="bloodGroup"> -->
																					
																					
																			<select id="bloodGroup"
																						class="form-control"
																					style="width: 90%;"
																						name="bloodGroup">
																						<option value="0">Select Status</option>
																						<option value="1">A+</option>
																						<option value="2">B+</option>
																						<option value="3">0+</option>
																						<option value="4">AB+</option>
																						<option value="5">A-</option>
																						<option value="3">B-</option>
																						<option value="4">O-</option>
																						<option value="5">AB-</option>
																						
																			</select>
																			</div>
																		</div>
																	</div>
																	<!-- <div class="col-md-6">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;"> Address:</label>
																			<div class="">
																				<input type="text" class="form-control"
																					style="width: 90%;" id="address">
																			</div>
																		</div>
																	</div> -->
																</div>
																<br> <br> <br>


															</div>
														</div>
													</div>
												</div>
											</div>
											<br> <br> <br>
											<div id="registrationn">
												<div class="panel-group col-md-12" id="accordion">
													<div class="panel panel-default">
														<div class="panel-heading accordion-toggle collapsed"
															data-toggle="collapse" data-parent="#accordion"
															data-target="#regg">
															<h4 class="panel-title">B.Registration Care Plan</h4>

														</div>
														<div id="regg" class="panel-collapse collapse">
															<div class="container">
																<div class="panel-body">
																	<!-- <div class='divide-40'></div>
																<div class="col-md-6">
																	<div class="form-group">
																		<label class="control-label"
																			style="margin-right: 14px;">Reg.No: </label>
																		<div class="">
																			<input type="text" class="form-control"
																				style="width: 90%;" id="careplanregNo">
																		</div>
																	</div>
																</div> -->


																	<div class="col-md-3">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;">Date Of
																				Initiation Of Dialysis: </label>
																			<div class="">
																				<input type="text" class="form-control"
																					onclick="displayCalendar(document.getElementById('dateOfInitiationOfDialysis'),'dd/mm/yyyy',this);"
																					class="form-group" onchange="getTimeSlot('New')"
																					style="width: 90%;" id="dateOfInitiationOfDialysis">
																			</div>
																		</div>
																	</div>


																	<div class="col-md-6">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;">Frequency Of
																				Dialysis: </label>
																			<div class="">
																				<input type="text" class="form-control"
																					style="width: 90%;" id="FrequencyOfDialysis">
																			</div>
																		</div>
																	</div>

																	<div class="col-md-3">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;">Estimated Dry
																				Weight: </label>
																			<div class="">
																				<input type="text" class="form-control"
																					style="width: 90%;" id="estimatedDryWeight">
																			</div>
																		</div>
																	</div>


																</div>
																<br> <br> <br>

																<div class="panel-body">


																	<div class="col-md-6">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;">Primary Renal
																				Disease:</label>
																			<div class="">
																				<input type="text" class="form-control"
																					style="width: 90%;" id="primaryRentalDisease1">
																			</div>
																		</div>
																	</div>
																	<div class="col-md-6">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;">Vascular Access
																				Details:</label>
																			<div class="">
																				<input type="text" class="form-control"
																					style="width: 90%;" id="vasuclaraccessdetails1">
																			</div>
																		</div>
																	</div>
																	<div class="col-md-6">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;"> Iron Status:</label>
																			<div class="">
																				<input type="text" class="form-control"
																					style="width: 90%;" id="ironStatues1">
																			</div>
																		</div>
																	</div>
																	<div class="col-md-6">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;">Special Needs
																				Problems: </label>
																			<div class="">
																				<input type="text" class="form-control"
																					style="width: 90%;" id="SpecialNeedsProblems">
																			</div>
																		</div>
																	</div>
																</div>
																<div class="panel-body">
																	<label class="control-label"
																		style="padding-left: -21px; margin-bottom: 1%; margin-right: 78%; margin-top: 0%;">
																		CO-MORBID CONDITIONS</label>

																	<div class="checkbox-inline">
																		<input type="checkbox" class="form-check-input"
																			id="CerebroVascularDiseases"
																			value="CerebroVascularDiseases"> <label
																			class="form-check-label">Cerebro Vascular
																			Disease:</label>
																	</div>
																	<div class="checkbox-inline">
																		<input type="checkbox" class="form-check-input"
																			id="diabetesMellitus" value="diabetesMellitus">
																		<label class="form-check-label">Diabetes
																			Mellitus:</label>
																	</div>
																	<div class="checkbox-inline">
																		<input type="checkbox" class="form-check-input"
																			id="IschemicHeartDisease"
																			value="IschemicHeartDisease"> <label
																			class="form-check-label">Ischemic Heart
																			Disease:</label>
																	</div>
																	<div class="checkbox-inline">
																		<input type="checkbox" class="form-check-input"
																			id="ChronicLungDisease" value="ChronicLungDisease">
																		<label class="form-check-label">Chronic Lung
																			Disease:</label>
																	</div>
																	<div class="checkbox-inline">
																		<input type="checkbox" class="form-check-input"
																			id="Tuberclosis" value="Tuberclosis"> <label
																			class="form-check-label">Tuberclosis: </label>
																	</div>
																	<div class="checkbox-inline">
																		<input type="checkbox" class="form-check-input"
																			id="chronicliverdisease" value="chronicliverdisease">
																		<label class="form-check-label">Chronic Liver
																			Disease:</label>
																	</div>
																	<div class="checkbox-inline">
																		<input type="checkbox" class="form-check-input"
																			id="PeripheralVascularDisease"
																			value="PeripheralVascularDiseases"> <label
																			class="form-check-label">Peripheral Vascular
																			Disease:</label>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<br> <br> <br>

											<div id="lastBloodTransfusionDiv">
												<div class="panel-group col-md-12" id="accordion">
													<div class="panel panel-default">
														<div class="panel-heading accordion-toggle collapsed"
															data-toggle="collapse" data-parent="#accordion"
															data-target="#lastBloodTransfusionTable">
															<h4 class="panel-title">C.Last Blood Transfusion</h4>

														</div>
														<div id="lastBloodTransfusionTable"
															class="panel-collapse collapse" style="max-height: auto">
															<div class="panel-body">
																<input type="button" value="save"
																	class="btn btn-success"
																	style="float: right; margin-right: 1%"
																	onclick="saveLastBloodtransfusionTable()" /><br>
																<br>
																<div class="col-md-12" style="padding-left: 45px;">
																	<div class="divide-20"></div>
																	<div
																		style="font-weight: bold; overflow-y: scroll; margin-top: 18px; margin-left: -50px;">
																		<table border="1"
																			class="table table-bordered table-hover table-responsive "
																			style="overflow-y: scroll">
																			<thead>
																				<tr>
																					<th class="col-md-1-1 center">#</th>
																					<th class="col-md-1-1 center">Unit</th>
																					<th class="col-md-1-1 center">Date</th>
																					<th class="col-md-1-1 center"><input
																						type="button" value="+"
																						onclick="createDivBloodTransfusion('RowCount')" />
																						<input type="button" value="-"
																						onclick="removeDivBloodTransfusion('RowCount')" />
																					</th>
																				</tr>
																			</thead>
																			<tbody
																				style="overflow-y: scroll; border: 1px solid #436a9d;"
																				id="lastBloodTrasfusionBody"></tbody>
																		</table>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<br> <br> <br>

											<div id="virologyAndVaccinationDiv">
												<div class="panel-group col-md-12" id="accordion">
													<div class="panel panel-default">
														<div class="panel-heading accordion-toggle collapsed"
															data-toggle="collapse" data-parent="#accordion"
															data-target="#virologyAndVaccinationTable">
															<h4 class="panel-title">D.Virology And Vaccination
																Details</h4>

														</div>
														<div id="virologyAndVaccinationTable"
															class="panel-collapse collapse">
															<div class="panel-body">
																<input type="button" value="save"
																	class="btn btn-success"
																	style="float: right; margin-right: 1%"
																	onclick="saveVirologyVaccinationTable()" /><br> <br>
																<div class="col-md-12" style="padding-left: 45px;">
																	<div class="divide-20"></div>
																	<div
																		style="font-weight: bold; overflow: auto; margin-top: 18px; margin-left: -50px;">
																		<table border="1"
																			class="table table-bordered table-hover table-responsive"
																			style="overflow: auto;">
																			<thead>
																				<tr>
																					<th class="col-md-2-1 center">#</th>
																					<th class="col-md-2-1 center">HEP B-VAC</th>
																					<th class="col-md-2-1 center">HBSAG</th>
																					<th class="col-md-2-1 center">HEP-C</th>
																					<th class="col-md-2-1 center">HIV</th>
																					<th><input type="button" value="+"
																						onclick="createVirologyAndVacccinationDetails('RowCount')" />
																						<input type="button" value="-"
																						onclick="removeVirologyAndVacccinationDetails('RowCount')" />
																					</th>
																				</tr>
																			</thead>

																			<tbody
																				style="overflow-x: scroll; border: 1px solid #436a9d;"
																				id="VirologyAndVacccinationDetailsBody"></tbody>
																		</table>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<!-- ending care plan div -->
								<!-- Starting  haerecodmodialtsis  div -->
								<div id="haerecodmodialtsisdiv" class="tab-pane fade in">
									<div class="panel panel-default">
										<div class="panel-body" style="overflow: auto;">
											<div class="col-md-12">
												<input type="button" value="Print" class="btn btn-info"
													style="float: right;"
													onclick="printHaeRecordModialtsisForm()" /> <input
													type="button" value="save" class="btn btn-success"
													style="float: right; margin-right: 1%"
													onclick="saveHaeRecordModialtsisForm()" />
											</div>

											<br> <br> <br>
											<div id="preDialysisAssesment">
												<div class="panel-group col-md-12 " id="accordion1">
													<div class="panel panel-default" style="margin-top: 20px;">
														<div class="panel-heading accordion-toggle collapsed"
															data-toggle="collapse" data-parent="#accordion1"
															data-target="#preDialysisAssesmentForm">
															<h4 class="panel-title">A. PRE-DIALYSIS ASSESSMENT</h4>

														</div>
														<div id="preDialysisAssesmentForm"
															class="panel-collapse collapse">
															<div class="panel-body">

																<div class="col-md-6">
																	<div class="form-group">
																		<label class="control-label"
																			style="margin-right: 14px;">Provisional
																			Diagnosis: </label>
																		<div class="">
																			<input type="text" class="form-control"
																				style="width: 90%;" id="provisionalDiagnosis">
																		</div>
																	</div>
																</div>

																<div class="col-md-3">
																	<div class="form-group">
																		<label class="control-label"
																			style="margin-right: 14px;">Objective Weight:
																		</label>
																		<div class="">
																			<input type="text" class="form-control"
																				style="width: 90%;" id="objectiveWeight">
																		</div>
																	</div>
																</div>
																<div class="col-md-3">
																	<div class="form-group">
																		<label class="control-label"
																			style="margin-right: 14px;">Pre-Dialysis: </label>
																		<div class="">
																			<input type="text" class="form-control"
																				class="form-group" onchange="getTimeSlot('New')"
																				style="width: 90%;" id="preDialysisWeight">
																		</div>
																	</div>
																</div>
																<div class="col-md-6">
																	<div class="form-group">
																		<label class="control-label"
																			style="margin-right: 14px;"> Inter-Dialysis
																			Wt.Gain:</label>
																		<div class="">
																			<input type="text" class="form-control"
																				style="width: 90%;" id="interDialysisWeightGain">
																		</div>
																	</div>
																</div>
																<div class="col-md-6">
																	<div class="form-group">
																		<label class="control-label"
																			style="margin-right: 14px;">BP(mmHg):</label>
																		<div class="">
																			<input type="text" class="form-control"
																				style="width: 90%;" id="bp">
																		</div>
																	</div>
																</div>
																<div class="col-md-6">
																	<div class="form-group">
																		<label class="control-label"
																			style="margin-right: 14px;">Temp: </label>
																		<div class="">
																			<input type="text" class="form-control"
																				style="width: 90%;" id="temp">
																		</div>
																	</div>
																</div>

																<div class="col-md-3">
																	<div class="form-group">
																		<label class="control-label"
																			style="margin-right: 14px;">UF Goal: </label>
																		<div class="">
																			<input type="text" class="form-control"
																				style="width: 90%;" id="ufGoals">
																		</div>
																	</div>
																</div>
																<div class="col-md-3">
																	<div class="form-group">
																		<label class="control-label"
																			style="margin-right: 14px;">Duration(hr): </label>
																		<div class="">
																			<input type="text" class="form-control"
																				style="width: 90%;" id="duration">
																		</div>
																	</div>
																</div>
															</div>
															<div class="panel-body">

																<div class="col-md-10">
																	<label class="control-label"
																		style="padding-left: -21px; margin-bottom: 5%">
																		PLAN </label>
																</div>
																<div class="col-md-12">

																	<div class="col-md-6">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;">Conductivity
																				(Ms/cm): </label>
																			<div class="">
																				<input type="text" class="form-control"
																					style="width: 90%;" id="conductivity">
																			</div>
																		</div>
																	</div>

																	<div class="col-md-3">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;">No. Of Reuses
																				Dialyser: </label>
																			<div class="">
																				<input type="text" class="form-control"
																					style="width: 90%;" id="dialyser">
																			</div>
																		</div>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;">Surface Area: </label>
																			<div class="">
																				<input type="text" class="form-control"
																					class="form-group" onchange="getTimeSlot('New')"
																					style="width: 90%;" id="area">
																			</div>
																		</div>
																	</div>
																	<div class="col-md-6">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;">Dialyzer:</label>
																			<div class="">
																				<input type="text" class="form-control"
																					style="width: 90%;" id="dialyzer">
																			</div>
																		</div>
																	</div>
																	<div class="col-md-6">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;">Tubing: </label>
																			<div class="">
																				<input type="text" class="form-control"
																					style="width: 90%;" id="tubing">
																			</div>
																		</div>
																	</div>
																</div>
															</div>

															<div class="panel-body">
																<div>
																	<label class="control-label"> TYPE OF DIALYSIS</label>
																</div>
																<div class="col-md-12">

																	<!-- <label class="control-label"
																	style="padding-left: -21px; margin-top: 29px; margin-0%">
																	Plain Dialysis with No: </label> -->
																</div>


																<div class="checkbox-inline">
																	<input type="checkbox" class="form-check-input" id="uf">
																	<label class="form-check-label">Plain Dialysis
																		WithOut UF</label>
																</div>
																<div class="checkbox-inline">
																	<input type="checkbox" class="form-check-input"
																		id="withUF"> <label class="form-check-label">
																		Plain Dialysis With UF</label>
																</div>
																<div class="checkbox-inline">
																	<input type="checkbox" class="form-check-input"
																		id="sDialysiswithUF"> <label
																		class="form-check-label">Sequential Dialysis
																		with UF</label>
																</div>
																<div class="checkbox-inline">
																	<input type="checkbox" class="form-check-input"
																		id="isolatedUF"> <label
																		class="form-check-label"> Sequential Dialysis
																		with Isolated UF</label>
																</div>

															</div>

															<div class="panel-body">

																<div class="col-md-10"></div>

																<div class="col-md-12">

																	<label class="control-label"
																		style="padding-left: -21px; margin-top: -3%; padding-left: -4%">
																		DIALYSATE: </label>
																</div>

																<div class="checkbox-inline">
																	<input type="checkbox" class="form-check-input"
																		id="biocarbonate" name="biocarbonate"> <label
																		class="form-check-label">Biocarbonate</label>
																</div>
																<div class="checkbox-inline">
																	<input type="checkbox" class="form-check-input"
																		id="calciumfree" name="calciumfree"> <label
																		class="form-check-label">Calcium free</label>
																</div>
																<div class="checkbox-inline">
																	<input type="checkbox" class="form-check-input"
																		id="potassiumFree" name="potassiumFree"> <label
																		class="form-check-label">Potassium Free</label>
																</div>
															</div>

															<div class="panel-body">

																<div class="col-md-10"></div>

																<div class="col-md-12">

																	<label class="control-label"
																		style="padding-left: -21px; margin-top: -3%; padding-left: -1%">
																		PRIMING THE DIALYSER WITH:</label>
																</div>


																<div class="checkbox-inline">
																	<input type="checkbox" class="form-check-input" id="ns"
																		name="ns"> <label class="form-check-label">NS</label>
																</div>
																<div class="checkbox-inline">
																	<input type="checkbox" class="form-check-input"
																		id="blood" name="blood"> <label
																		class="form-check-label">Blood</label>
																</div>

															</div>
															<div class="panel-body">

																<div class="col-md-10"></div>

																<div class="col-md-12">

																	<label class="control-label"
																		style="padding-left: -21px; margin-bottom: 4%; margin-top: -3%">
																		HEPARINE DOSE:</label>
																</div>

																<div class="checkbox-inline">
																	<input type="checkbox" class="form-check-input"
																		id="regular" name="regular"> <label
																		class="form-check-label">Reguler</label>
																</div>
																<div class="checkbox-inline">
																	<!-- <label class="control-label"
																	style="padding-left: -21px; margin-top:-3%">
																	HEPARINE DOSE:</label> -->
																	<input type="checkbox" class="form-check-input"
																		id="low" name="low"> <label
																		class="form-check-label">low</label>
																</div>
																<div class="checkbox-inline">
																	<input type="checkbox" class="form-check-input"
																		id="heparinFree" name="heparinFree"> <label
																		class="form-check-label">Heparin Free</label>
																</div>
																<div class="col-md-6">
																	<div class="form-group">
																		<label class="control-label"
																			style="margin-right: 14px;">Bonus Dose(Unit)</label>
																		<div class="">
																			<input type="text" class="form-control"
																				style="width: 90%;" id="bonusDose">
																		</div>
																	</div>
																</div>

															</div>

														</div>
													</div>
												</div>
											</div>
											<br> <br> <br>
											<div id="onDialysis">
												<div class="panel-group col-md-12" id="accordion">
													<div class="panel panel-default" style="margin-top: 25px;">
														<div class="panel-heading accordion-toggle collapsed"
															data-toggle="collapse" data-parent="#accordion"
															data-target="#onDialysisForm">
															<h4 class="panel-title">B. ON DIALYSIS ASSESMENT</h4>
														</div>
														<div id="onDialysisForm" class="panel-collapse collapse">
															<div class="panel-body">

																<input type="button" value="save"
																	class="btn btn-success"
																	style="float: right; margin-right: 1%"
																	onclick="saveOnDialysisTable()" /><br> <br>

																<div class="col-md-3">
																	<label class="control-label"
																		style="padding-left: -21px; margin-top: 29px">
																		Dialysis Started at: </label> <input type="text"
																		id="startDate" readonly="readonly"
																		class="form-control">

																</div>

																<div class="col-md-3">
																	<label class="control-label"
																		style="padding-left: -21px; margin-top: 29px">
																		Dialysis Terminated at: </label> <input type="text"
																		id="terminateDate" readonly="readonly"
																		class="form-control">
																</div>

																<br> <br>

																<div class="col-md-12" style="padding-left: 45px;">
																	<div
																		style="font-weight: bold; overflow: auto; margin-top: 28px; margin-left: -50px;">

																		<table border="1"
																			class="table table-bordered table-hover table-responsive"
																			id="onDialysisAssesment"
																			class="onDialysisAssesmentClass"
																			style="overflow: auto;">
																			<thead>
																				<tr>
																					<th class="col-md-2-1 center">#</th>
																					<th class="col-md-2-2 center">Time</th>
																					<th class="col-md-2-2 center">TPR</th>
																					<th class="col-md-2-2 center">Blood Pressure</th>
																					<th class="col-md-2-2 center">SPO 2</th>
																					<th class="col-md-2-2 center">Blood Flow Rate</th>
																					<th class="col-md-2-2 center">A Pressure</th>
																					<th class="col-md-2-2 center">V Pressure</th>
																					<th class="col-md-2-2 center">TMP</th>
																					<th class="col-md-2-2 center">Heparin Dose</th>
																					<th class="col-md-2-2 center">Remark</th>
																					<th class="col-md-2-2 center"><input
																						type="button" value="+"
																						onclick="createDivForOnDialysisAssesment('RowCount')" />
																						<input type="button" value="-"
																						onclick="removeDivForOnDialysisAssesment('RowCount')" />
																					</th>
																				</tr>
																			</thead>

																			<tbody
																				style="overflow-x: scroll; border: 1px solid #436a9d;"
																				id="onDialysisAssesmentBody"></tbody>
																		</table>

																	</div>

																	<!-- </div> -->


																	<!-- <div class="col-md-12" style=""> -->

																	<div class="divide-40"></div>
																	<div class="col-md-6">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;"> Pre-Dialysis
																				Collection :</label>
																			<div class="">
																				<input type="text" class="form-control"
																					style="width: 90%;" id="preDialysisCollection">
																			</div>
																		</div>
																	</div>
																	<div class="col-md-6">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;">Post-Dialysis
																				Collection:</label>
																			<div class="">
																				<input type="text" class="form-control"
																					style="width: 90%;" id="postDialysisCollection">
																			</div>
																		</div>
																	</div>
																	<div class="col-md-6">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;"> Blood
																				Transfusions:</label>
																			<div class="">
																				<input type="text" class="form-control"
																					style="width: 90%;" id="bloodTransfusions">
																			</div>
																		</div>
																	</div>
																	<div class="col-md-6">
																		<div class="form-group">
																			<label class="control-label"
																				style="margin-right: 14px;">Medications:</label>
																			<div class="">
																				<input type="text" class="form-control"
																					style="width: 90%;" id="medications">
																			</div>
																		</div>
																	</div>
																</div>


															</div>
														</div>
													</div>
												</div>
											</div>
											<br> <br> <br>
											<div id="postAssesment">
												<div class="panel-group col-md-12" id="accordion">
													<div class="panel panel-default" style="margin-top: 28px;">
														<div class="panel-heading accordion-toggle collapsed"
															data-toggle="collapse" data-parent="#accordion"
															data-target="#postDAssesment">
															<h4 class="panel-title">C. POST-DIALYSIS ASSESMENT</h4>

														</div>
														<div id="postDAssesment" class="panel-collapse collapse">
															<div class="panel-body">

																<div class="col-md-6">
																	<div class="form-group">
																		<label class="control-label"
																			style="margin-right: 14px;">Post-Dialysis Wt:
																		</label>
																		<div class="">
																			<input type="text" class="form-control"
																				style="width: 90%;" id="postDialysisWt">
																		</div>
																	</div>
																</div>
																<div class="col-md-6">
																	<div class="form-group">
																		<label class="control-label"
																			style="margin-right: 14px;"> Loss of wt:</label>
																		<div class="">
																			<input type="text" class="form-control"
																				style="width: 90%;" id="lossOfWt">
																		</div>
																	</div>
																</div>
																<div class="col-md-6">
																	<div class="form-group">
																		<label class="control-label"
																			style="margin-right: 14px;">BP: </label>
																		<div class="">
																			<input type="text" class="form-control"
																				style="width: 90%;" id="Postbp">
																		</div>
																	</div>
																</div>

															</div>
														</div>
													</div>
												</div>
											</div>

										</div>

									</div>
								</div>

								<!-- starting doucmunet upload div -->

								<div id="Upload_Document" class="tab-pane fade in ">


									<div class="centered">


										<label style="margin-top: 3px; padding-left: 5px;"
											class="col-md-2-1">Select a File to Upload: </label><input
											type="file" style="margin-top: 0px; cursor: pointer;"
											multiple="" id="ifile" name="file"><br> <input
											type="hidden" value="0" id="upid"> <label
											style="margin-top: 1%; padding-left: 5px;"
											class="col-md-12-1"></label>

										<div class="pull-center">
											<button type="button"
												class=" btn btn-xs btn-success editUserAccess" id="ifileUp"
												name="fileUp" onclick="uploadDocumentOnDialysis()">Upload
												Document</button>

										</div>

										<label style="margin-top: 3px; padding-left: 5px;"
											class="col-md-2-1">Comment: </label>

										<!-- 	<textarea maxlength="120" id="iNotes" name="txtNotes"
										style="width: 236px; height: 48px;" cols="60" rows="2"
										class="col-md-4-1"></textarea> -->

										<div class="form-group">
											<textarea class="form-control" id="iNotes" rows="5"></textarea>

										</div>

										<div id="uploadDocumentsBody" class="tabbable"></div>

										<div class="form-group  box border col-md-12-1">
											<div class="col-md-12-1"
												style="margin-top: 0%; padding-left: 3px;">



												<div class="col-sm-12-1"
													style="margin-top: 0%; margin-top: 0px; height: 160px; overflow-y: scroll;"
													id="divdocDispTable">
													<table
														class="table table-bordered table-condensed table-responsive header-fixed cf"
														style="width: 1090px; margin-top: 10px;">

														<tbody id="docDispTable">
														<thead id="ehatTHead" style="background: wheat;"
															class="cf">

														</thead>
														</tbody>
													</table>
												</div>

											</div>
										</div>

										<div aria-hidden="true" aria-labelledby="myLargeModalLabel"
											role="dialog" tabindex="-1" id="viewDocModal123"
											class="modal fade bs-example-modal-lg">
											<div class="modal-dialog modal-dialog modal-lg">
												<div class="modal-content">
													<div class="modal-header">
														<button aria-label="Close" data-dismiss="modal"
															class="close" type="button">
															<span aria-hidden="true">close</span>
														</button>
														<div class="row">
															<div class="col-md-4 col-xs-11">
																<h3 id="myModalLabel" class="modal-title">View
																	document</h3>
															</div>
															<br> <br>
															<div class="col-md-6 col-xs-11">
																<h5></h5>
																<h6 id="documentComment"></h6>
															</div>
														</div>
													</div>
													<div class="modal-body">
														<iframe width="100%" height="330px" id="ViewDocumemnt123"></iframe>
													</div>
												</div>
											</div>
										</div>

									</div>
								</div>
								<!-- ending doucmunet upload div -->
								<!-- staring  investigation sheet  div -->
								<div id="investigationsheet" class="tab-pane fade in ">

									<div class="panel panel-default">
										<div class="panel-body"
											style="margin-top: 15px; overflow: auto;">

											<div id="Investigation_row_1" class="col-sm-12-1"
												style="margin-top: 4px;">

												<div class="col-sm-3-1">
													<div class="form-group Remove-Padding col-sm-12-1"
														style="padding-left: 5%">
														<label class="TextFont" for="exampleInputEmail1">Test
															Name </label>
														<div id="divInvestigationTestName">
															<input id="txtautoserviceName"
																class="typeahead form-control" type="text"
																placeholder="Test Name"
																style="border: 1px solid orange;"
																onkeyup="autoSuggestionForTestNameDialysis(this.id)">
														</div>
													</div>

												</div>



												<div class="col-sm-4-1" style="margin-left: 2%">
													<div class="form-group Remove-Padding col-sm-12-1"
														style="padding-left: 5%">
														<label class="TextFont" for="exampleInputEmail1">Doctor
															Name </label>
														<div id="divInvestigationTestName">
															<select id="doctorId" class="col-md-6-1" name="userType"
																style="margin-left: 0%; margin-top: 0px;" onchange=""></select>
														</div>
													</div>

												</div>

											</div>


											<div id="Investigation_row2" class="col-sm-12-1"
												style="margin-top: 10px;">

												<div
													class="col-sm-6 select2-container select2-container-multi "
													style="margin-top: 2%;">

													<ul id="dynamicItem" class="select2-choices"
														style="overflow-y: scroll;"></ul>
													<input id="subserviceid" type="hidden" value="0"> <input
														id="iscombination" type="hidden" value="0"> <input
														id="serviceid" type="hidden" value="0">
												</div>


												<div id="col11" class="col-sm-1-1"
													style="margin-top: 10px; padding-left: 3%">
													<div class="form-group Remove-Padding col-sm-12-1">
														<div class="divide-10"></div>
														<label class="TextFont" for="exampleInputEmail1">Charges
														</label> <input id="chargesubservice"
															class="form-control input-SmallText" type="text"
															readonly="readonly" placeholder="Charges" onchange="">
														<input id="cpoeCharges2" type="hidden" value="">
													</div>
												</div>

												<div id="col9" class="col-sm-2-1"
													style="margin-top: 10px; padding-left: 3%">
													<div class="form-group Remove-Padding col-sm-12-1">
														<div class="divide-10"></div>
														<label class="TextFont" for="exampleInputEmail1">Instructions
														</label> <input id="cpoenid" class="form-control input-SmallText"
															type="text" placeholder="Instructions">
													</div>
												</div>

												<div id="col10" class="col-sm-2-1"
													style="margin-top: 10px; padding-left: 3%">
													<div class="form-group Remove-Padding col-sm-12-1">
														<div class="divide-10"></div>
														<label class="TextFont" for="exampleInputEmail1">Clinical
															Notes </label> <input id="cpoeClinicalNotes"
															class="form-control input-SmallText" type="text"
															placeholder="Clinical Notes">
													</div>
												</div>


												<div id="col11" class="col-sm-0-1"
													style="margin-top: 30px; padding-left: 5px">
													<i> <input
														class="btn btn-xs btn-success editUserAccess"
														type="button" onclick="sendDailysisTest('DoctorStation')"
														value="Save" style="margin-left: 1%">
													</i>
												</div>

											</div>

											<div style="margin-top: 0px;" class="col-sm-12-1">
												<div style="margin-top: 0px;" class="col-sm-1-1">
													<input type="checkbox" id="cpoeUrgent">
												</div>


												<div style="margin-top: 0px;" class="col-sm-1-1">
													<label style="margin-top: 6px; margin-left: -51px;"
														class="TextFont Remove-Padding"> Urgent </label>
												</div>


												<div style="" id="cpoesndtolabdiv">
													<div style="margin-top: 0px; margin-left: -64px;"
														class="col-sm-1-1">
														<input type="checkbox" name="cpoesndtolab"
															id="cpoesndtolab">
													</div>

													<div style="margin-top: 0px;" class="col-sm-1-1">
														<label style="margin-top: 6px; margin-left: -51px;"
															class="TextFont Remove-Padding"> Send To Lab </label>
													</div>
												</div>


												<div id="cpoeSendToRisdiv">
													<div style="margin-top: 0px; margin-left: -54px;"
														class="col-sm-1-1">
														<input type="checkbox" name="cpoeSendToRis"
															id="cpoeSendToRis">
													</div>
													<div style="margin-top: 0px;" class="col-sm-1-1">
														<label style="margin-top: 6px; margin-left: -50px;"
															class="TextFont Remove-Padding"> Send To Ris </label>
													</div>
												</div>


												<div id="cpoeSendToRaddiv">
													<div style="margin-top: 0px; margin-left: -64px;"
														class="col-sm-1-1">
														<input type="checkbox" name="cpoeSendToRad"
															id="cpoeSendToRad">
													</div>
													<div style="margin-top: 0px;" class="col-sm-1-1">
														<label style="margin-top: 6px; margin-left: -51px;"
															class="TextFont Remove-Padding"> Send To
															Radiation </label>
													</div>
												</div>


											</div>


											<div id="row2" class="col-sm-12-1" style="margin-top: 28px">
												<div class="form-group col-md-12-1" style="margin: 2px;">
													<div class="col-md-12-1"
														style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">
														<label id="editCPOE_TestLabel1"
															onclick="editDialysisTestnew()"
															style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">
															<i class="fa fa-edit"></i> Edit
														</label> <label id="muldelcp"
															style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;"
															onclick="deleteCpoeServ('multiple','DR')"> <i
															class="fa fa-trash-o"></i> Multiple Delete
														</label>
													</div>
													<div class="col-sm-12-1" style="margin-top: 0px;">
														<table class="table table-condensed ">
															<thead>
																<tr>
																	<th class="col-md-1-1 center" style="height: 21.5px;">
																		<div class="TextFont">#</div>
																	</th>
																	<th class="col-md-2-1 center"
																		style="height: 21.5px; padding-left: 5px;">
																		<div class="TextFont">Particulars/Details</div>
																	</th>
																	<th class="col-md-1-1 center"
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
																<tbody id="tcpoeservices">

																</tbody>
															</table>
															<input id="CPOErowCount" type="hidden" value="0">
														</div>
													</div>
												</div>

                                                </div>   
											</div>
										</div>
									</div>
									<!-- ending div investigation sheet -->	
								</div>
							<!-- ending div  main -->		
						</div>	
						<!-- ending tab div  main -->
					
					</div>
					</div>
				 </div>
              </div>
			</div>
			<input id="careplanId" type="hidden" value="0" />
			<input type="hidden" id="tr_Id"value="<%=request.getParameter("treatmentId")%>">
			<input type="hidden" id="tflag"value="<%=request.getParameter("tflag")%>">			
			<input id="id_haeRecordModialtsis" type="hidden" value="0" />
			<input id="idPostDialysisAssesment" type="hidden" value="0" />
			<input id="tId" type="hidden">
			<input id="SponsorsourceTypeId" type="hidden" value="0">
            <input id="chargesSlaveId" type="hidden" value="0">
            <input id="chargesfromConf" type="hidden" value="0">
            <input id="pt_Id" type="hidden" value="0">
            <input id="depdocdeskid" type="hidden" value="0">
            <input id="emrPer" type="hidden" value="0">
            <input id="uId" type="hidden" value="0">
            <input id="billidservice" type="hidden" value="0">
            <input id="bill_Id" type="hidden" value="0">
            <input id="iscombination" type="hidden" value="0">
            <input id="informedId" type="hidden" value="0">         
		    <div id="billdetailsnew" style="visibility: hidden;"></div>



			<div><%@include file="Footer.jsp"%></div>
			<input type="hidden" id="risingFlow" value="<%=risingFlow%>">
		</c:if>
	</section>
</body>
</html>