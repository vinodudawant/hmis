<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<c:if test="${ sessionScope.userType != null }">
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Registration</title>
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
<script type="text/javascript" src="js/patient_search.js"></script>

<%
	session = request.getSession();
	String uid = (String) session.getAttribute("uid");
	ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	ResourceBundle resourceBundleEhaMeehsa = ResourceBundle.getBundle("Ehat");
	String abdmFlow = resourceBundleEha.getObject("abdmFlowOnOff").toString();
	ResourceBundle resourceBundle = ResourceBundle.getBundle("hospitalaccess");
	String hospitalname = (String) resourceBundle.getObject("hospitalname").toString();
	System.out.println("abdm------------------------------"+abdmFlow);
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
		<%@include file="menu_HelpDesk.jsp"%>
		<!-- /SIDEBAR -->

		<div id="main-content">

			<div class="container">
				<div class="row">
					<div id="content" class="col-lg-12">
						<!-- PAGE HEADER-->
						<div class="row">
							<div class="col-sm-12">
								<div class="page-header" id="headerforsave">
									<!-- STYLER -->

									<!-- /STYLER -->
									<!-- BREADCRUMBS -->
									<ul class="breadcrumb">
										<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
										</li>
										<li>Registration</li>

										<div class="li pull-right">
											<div class="form-group">
												<div class="col-md-12">
													<div id="input-type" class="row">
														<!-- <div class="col-sm-4"> 
															<label class="radio-inline">Other  
															<input name="privilegesModify" id="Otherid" type="radio" onclick="OtherRecord()" value="Other">  
															</label> 
														</div> 
														
														<div class="col-sm-4"> 
															<label class="radio-inline">Patient  
															<input checked="checked" name="privilegesModify" id="Patientid" type="radio" onclick="OtherRecord2()" value="Patient">
															</label>
														</div> 		 -->

														<div class="col-sm-4">
															<label class="radio-inline">
																<button type="button" id="savebuton"
																	class="pull-right btn btn-xs btn-success btn-table-add-row editUserAccess"
																	data-toggle="tooltip" data-placement="left"
																	title="Save" onclick="savePatientRegDetails()">
																	<i class="fa fa-save"></i>
																</button>
															</label>
														</div>
													</div>
												</div>
											</div>
										</div>


										<!-- <li style="float: right;"><button type="button" class="pull-right btn btn-xs btn-success" style="margin-top: -28px;" data-toggle="tooltip"
												data-placement="left" title="Save Patient Details & Print"  onclick="savePatientRegDetails()"><i class="fa fa-save"></i></button></li> -->
									</ul>
									<!-- /BREADCRUMBS -->
									<!-- <label class="control-label col-md-8">Other</label>

															<input name="Otherid" id="Otherid" type="radio"
															onclick="OtherRecord()" value="Other"> 
 									-->


								</div>
								
								
								
								
									<div class="page-header" id="appointHeader" style="display:none">
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a>Registration</a></li>
											<li><a>Appointment</a></li>
											<div class="li pull-right">
												<input type="hidden" value="0">
												<button class="btn btn-xs btn-danger" type='button'
													data-toggle="tooltip" data-placement="left" title="Reset "
													value='Save Now' onclick='resetOPDScheduler()' style="margin-left: 9px;">
													<i class="fa fa-refresh"></i>
												</button>
											</div>
											
											<div style="margin-left: 9px;" class="li pull-right" onclick="">
											<span title="Reschedule Patients" data-placement="left" data-toggle="tooltip" class="badge" style="background-color: #FFCC80;cursor:pointer;color:green;"><i class="fa fa-times"></i> <i id="ReschedulePatientsToday">00</i> </span>
											</div>
											<div style="margin-left: 9px;" class="li pull-right" onclick="">
												<span title="Follow Up Patients" data-placement="left" data-toggle="tooltip" class="badge" style="background-color: #ccffcc;cursor:pointer;color:black;"><i class="fa fa-check"></i> <i id="FollowUpPatientsToday">00</i> </span>
											</div>
											<div style="margin-left: 9px;" class="li pull-right" onclick="">
												<span title="Existing Patients" data-placement="left" data-toggle="tooltip" class="badge" style="background-color: green;cursor:pointer;"><i class="fa fa-location-arrow"></i>  <i id="ExistingPatientsToday">00</i> </span>
											</div>
											<div style="margin-left: 9px;" class="li pull-right" onclick="">
												<span title="New Patients" data-placement="left" data-toggle="tooltip" class="badge" style="background-color: red;cursor:pointer;"><i class="fa fa-user"></i>  <i id="NewPatientsToday">00</i> </span>
											</div>
										</ul>
									</div>


							</div>
						</div>
						<!-- /PAGE HEADER -->


						<!-- SAMPLE -->
						<div class="row">


							<div class="col-sm-12">

								<%-- <div class="col-md-3" style="background: white">

									<img alt="" style="height: 175px; width: 100%"
										class="image-responsive" src="ehat-design/img/profile/avatar.jpg">

									<div class="divide-10"></div>
									<div class="col-md-12">
										<div class="form-group">
											<label class="control-label col-md-12" style="color: #f46542;font-size: 14px;">NH01/1718/00006754</label>											
										</div>
									</div>
									
									<div class="divide-10"></div>
									<div class="col-md-12">
										<div class="form-group">
											
											<div class="col-md-6">
												<input type="text" class="form-control col-md-12"
													name="email" placeholder=""/>
											</div>
											<div class="col-md-6">
												<input type="submit" class="form-control btn btn-primary"
													name="email" value="Auth."/>
											</div>
											
										</div>
									</div>
									
									<div class="divide-10"></div>
									<div class="col-md-12">
										<div class="form-group">
											<label class="control-label col-md-12">Created By :</label>
											<label class="control-label col-md-12">Registration Date :</label>
											<label class="control-label col-md-12">Registration Time :</label>
											<label class="control-label col-md-12">Edited By :</label>
											<label class="control-label col-md-12">Date & Time :</label>
											
																						
										</div>
									</div>
									
									<div class="col-md-12">
										<div class="form-group">
											
											<div class="col-md-12">
												<input type="checkbox" class="form-control col-md-3"
													name="email" placeholder="Middle Name"/>
												<label class="control-label col-md-3">Emergency</label>
											
												<input type="checkbox" class="form-control col-md-3"
													name="email" placeholder="Middle Name" value="Auth."/>
												<label class="control-label col-md-3">External</label>
											</div>
											
										</div>
									</div>
									
									<div class="col-md-12">
										<div class="form-group">
											<label class="control-label col-md-12">Transaction Communication</label>
											<div class="col-md-12">
												<label class="control-label col-md-6">SMS</label>
												<div class="make-switch switch-small"
													data-on="info" data-off="success"
													data-on-label="<i class='fa fa-check icon-white'></i>"
													data-off-label="<i class='fa fa-times'></i>">
													<input type="checkbox">
												</div>
												
											</div>
											<div class="col-md-12">
												<label class="control-label col-md-6">Email</label>
												<div class="make-switch switch-small"
													data-on="info" data-off="success"
													data-on-label="<i class='fa fa-check icon-white'></i>"
													data-off-label="<i class='fa fa-times'></i>">
													<input type="checkbox">
												</div>
												
											</div>
											
										</div>
									</div>
									
									<div class="col-md-12">
										<div class="form-group">
											
											<div class="col-md-6">
												<input type="checkbox" class="form-control col-md-6"
													name="email" placeholder="Middle Name"/>
												<label class="control-label col-md-6">Emergency</label>
											</div>
											<div class="col-md-6">
												<input type="checkbox" class="form-control col-md-6"
													name="email" placeholder="Middle Name" value="Auth."/>
												<label class="control-label col-md-6">External</label>
											</div>
											
										</div>
									</div>

								</div> --%>


								<div class="col-md-3 box" id="patPhotoDiv"
									style="background: white">

									<div class="col-md-12">
										<center>

											<form
												action="PatientServlet?page=new&patID=${requestScope.patID}"
												name="frmUpload" id="frmUpload" method="post"
												enctype="multipart/form-data">
												<img src=<%if (request.getAttribute("imgPath") != null) {%>
													<%=request.getAttribute("imgPath")%> <%}%>
													<%if (request.getAttribute("imgPath") == null) {%>
													<%="images/patientPhoto.jpg"%> <%}%> name="patImg"
													id="patImg" class="img-responsive col-md-12-1"
													alt="Patient Image"
													style="margin-right: 0px; margin-left: 0px; margin-top: 0px; height: 175px;" />

											</form>

											<div style="display: none;">
												<input type="text" name="divImg" id="divImg"
													value=<%if (request.getAttribute("imgPath") != null) {%>
													<%=request.getAttribute("DimgPath")%> <%}%>
													<%if (request.getAttribute("imgPath") == null) {%>
													<%="images/patientPhoto.jpg"%> <%}%> />
											</div>


											<%-- <img alt="profile photo" <%if (request.getAttribute("imgPath") != null) {%>
																	<%=request.getAttribute("imgPath")%> <%}%>
																	<%if (request.getAttribute("imgPath") == null) {%>
																	<%="images/patientPhoto.jpg"%> <%}%> name="patImg"
																	id="patImg" class="image-responsive" src="images/patientPhoto.jpg"> --%>
										</center>
									</div>


									<!-- <div class="col-md-12">
                                        <div class="form-group">
                                         <center>
                                            <label class="control-label col-md-12" style="color: #f46542;font-size: 14px;">NH01/1718/00006754</label>                                           
                                         </center>
                                        </div>
                                    </div> -->

									<div class="col-md-12 line-separator"></div>

									<div class="col-md-12">
										<div class="form-group">
											<center>
												<div class="col-md-6">
													<button id="cameraClick" class="btn btn-xs btn-success"
														onclick="assignCamera()" data-toggle="modal"
														data-target="#cameraModal">Click</button>
												</div>
												<div class="col-md-6">
													<button class="btn btn-xs btn-warning" data-toggle="modal" data-target="#patientPhotoPopUp">Browse</button>
												</div>
											</center>
										</div>
										
										<!-- popup modal of status for investigation test send to  RIS from OPDBill -->
										<div id="patientPhotoPopUp" class="popup modal fade in" tabindex="-1"
											role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
											<div class="modal-dialog" style="width: 500px;">
												<div class="modal-content">
													<div class="modal-header">
														<div class="box-title">
															<h4>Upload Patient Photo</h4>
														</div>
													</div>
													<div class="modal-body">
														<div class="row">
															<div class="col-md-12">
																<!-- BOX -->
																<div class="box-body">
																	<!--Panel Body-->
																	<form id="regPhotoUploadfrm" name="regPhotoUploadfrm" class="" enctype="multipart/form-data" method="post">
																		<input type="file" class="form-control" name="changeProfilePicture" id="changeProfilePicture">
																	</form>
																</div>
															</div>
															<!-- /BOX-->
														</div>
													</div>
													<div class="modal-footer">
														<button type="button" class="btn btn-xs btn-warning" onclick="uploadPatientPhoto()">Upload</button>
														<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
													</div>
												</div>
												<!-- /BODY-->
											</div>
										</div>

									</div>

									<div class="col-md-12 line-separator"></div>

									<div class="col-md-12">
										<div class="form-group">

											<div id="sandboxSearchButton" class="input-group " style="width: 110%;">

												<input type="text" class="form-control" id="health" 
												value="">
		
													<div class="input-group-addon">
													@sbx
													</div>
												<button class="input-group-addon" onMouseOver="this.style.color='#000000'"  onMouseOut="this.style.color='#00F'" title="search"  style="border:none; background: white;" type="submit" onclick="searchByHealthId()"><i class="fa fa-search "></i></button>									
											</div>
											
											<!-- <div class="col-md-7">
												<input id="adharcardNo" type="text" placeholder="Health Id"
													class="form-control col-md-12" name="adhar" />
												onkeypress="return validateNumOnly(event)" minlength="12" maxlength="12" 
											</div>
											<div class="col-md-5">
												<button type="button" class="btn btn-xs btn-primary"
													onclick="searchByHealthId()" name="adhar"
													>search</button>
											</div> -->

										</div>
									</div>

									<!-- <div class="col-md-12 line-separator"></div> -->
									<div class="col-md-12"></div>
									
									<center>
												<div id="sandboxScanButton" class="col-md-6">
													<button id="cameraClick" class="btn btn-xs btn-success"
														onclick="scanQR()" data-toggle="modal"
														data-target="#cameraAadharModal">Scan QR</button>
												</div>
												
												<div id="sandboxGetProfile" class="col-md-6">
													<button class="btn btn-xs btn-success"
														data-toggle="modal"
														data-target="#getProfileModal">Get Profile</button>
												</div>
												<!-- <div class="col-md-6">
													<button class="btn btn-xs btn-warning" data-toggle="modal"
														data-target="#patientPhotoPopUp">Browse</button>
												</div> -->
									</center>
									<!-- <div id="sandboxScanButton" class="col-md-12 line-separator"></div> -->
									<div id="sandboxScanButton" class="col-md-12 "></div>
		
									<div class="col-md-12">
										<label class="control-label" id="lblCenterPatientId">UHID :</label> <label
											id="patientIdText" class="control-label"> </label>
									</div>
									<div class="col-md-12">
										<label class="control-label">Created By:</label> <label
											id="createdBy" class="control-label"> </label>
									</div>
									<div class="col-md-12">
										<label class="control-label">Reg Date & Time:</label> <label
											id="regDate" class="control-label"> </label>
									</div>
									<!-- <div class="col-md-12">                             
                                        <label class="control-label">Registration Time :</label>
                                        <label id="regTime" class="control-label"> </label>
                                    </div> -->

									<div class="col-md-12">
										<label class="control-label">Edited By :</label> <label
											id="editedBy" class="control-label"> </label>
									</div>
									<div class="col-md-12">
										<label class="control-label">Date & Time :</label> <label
											id="dateTime" class="control-label"> </label>
									</div>
									
									<div class="col-md-12">
										<label class="control-label">Follow Up Count :</label> <label
											id="followUpCount" class="control-label" > 0</label>
									</div>

									<div class="col-md-12 line-separator"></div>

									<div class="col-md-6">
										<div class="form-group">
											<!-- <label class="control-label">Emergency</label>
                                            <div class="col-md-5">
                                                <input id="emergency" type="checkbox" class="form-control" value="Y"/>
                                                
                                            </div> -->
											<!-- <label class="radio-inline">Appointment <input
												name="privilegesModify" id="Otherid" type="radio"
												onclick="OtherRecord()" value="Other">
											</label> -->
											<!-- <label class="radio-inline">Appointment <input
												name="privilegesModify" id="Otherid" type="radio" onclick="setAppointCal()"
												 value="Other">
											</label> -->
											
											<label class="radio-inline">Register<input
												name="privilegesModify" id="rdRegOnly" type="radio"  value="RegisterOnly">
											</label>

										</div>
									</div>

									<div class="col-md-6">
										<div class="form-group">
											<!-- <label class="control-label">External</label>
                                            <div class="col-md-5">
                                                <input id="external" type="checkbox" class="form-control" value="Y"/>
                                                
                                            </div> -->
											<label class="radio-inline">Treatment <input
												checked="checked" name="privilegesModify" id="Patientid"
												type="radio" onclick="" value="Patient">
											</label>

										</div>
									</div>

									<div class="col-md-12 line-separator"></div>

									<div class="col-md-12">
										<div class="form-group">
											<label class="control-label col-md-12">Transaction
												Communication</label>
											<div class="col-md-12">
												<label class="control-label col-md-6">SMS</label> <input
													type="checkbox" name="transSMS" id="transSMS"
													checked="checked">
												<%-- <div id="transSMSdiv" class="make-switch switch-small"
                                                    data-on="info" data-off="success"
                                                    data-on-label="<i class='fa fa-check icon-white'></i>"
                                                    data-off-label="<i class='fa fa-times'></i>">
                                                </div> --%>

											</div>
											<div class="col-md-12">
												<label class="control-label col-md-6">Email</label> <input
													type="checkbox" name="transEmail" id="transEmail"
													checked="checked">

												<%-- <div id="transEmaildiv" class="make-switch switch-small"
                                                    data-on="info" data-off="success"
                                                    data-on-label="<i class='fa fa-check icon-white'></i>"
                                                    data-off-label="<i class='fa fa-times'></i>">
                                                    <input type="checkbox"  name="transEmail" id="transEmail">
                                                </div> --%>

											</div>

										</div>
									</div>

									<div class="col-md-12">
										<div class="form-group">
											<label class="control-label col-md-12">Promotional
												Communication</label>
											<div class="col-md-12">
												<label class="control-label col-md-6">SMS</label> <input
													type="checkbox" name="pramoSMS" id="pramoSMS">

												<%-- <div id="pramoSMSdiv" class="make-switch switch-small"
                                                    data-on="info" data-off="success"
                                                    data-on-label="<i class='fa fa-check icon-white'></i>"
                                                    data-off-label="<i class='fa fa-times'></i>">
                                                    <input type="checkbox" name="pramoSMS" id="pramoSMS">
                                                </div>
                                                 --%>
											</div>
											<div class="col-md-12">
												<label id="pramoEmaildiv" class="control-label col-md-6">Email</label>
												<input type="checkbox" name="pramoEmail" id="pramoEmail">

												<%-- <div class="make-switch switch-small"
                                                    data-on="info" data-off="success"
                                                    data-on-label="<i class='fa fa-check icon-white'></i>"
                                                    data-off-label="<i class='fa fa-times'></i>">
                                                    <input type="checkbox" name="pramoEmail"  id="pramoEmail">
                                                </div> --%>

											</div>

										</div>
									</div>
									
									<div class="col-md-12">
										<div class="form-group">
											<label class="control-label col-md-12">IVF Information
												</label>
											<div class="col-md-12">
												<label class="control-label col-md-6">IVF Flag</label> <input
													type="checkbox" name="ivfFlag" id="ivfFlag"
													>

											</div>
											

										</div>
									</div>
									

									<div class="col-md-12 line-separator"></div>

									<div class="col-md-12 " id="historyDivId">
										<div class="form-group">

											<div class="col-md-12">
												<i class="fa fa-comment-o"></i> <label class="control-label">History</label>
											</div>

										</div>
									</div>

									<div class="col-md-12 " id="uploadDivId">
										<div class="form-group">

											<!-- <div class="col-md-12">
												<i class="fa fa-gear"></i> <label class="control-label">Uploads</label>
											</div> -->

										</div>
									</div>
								</div>

								<div class="col-md-9" id="getPatDiv">

									<!-- BOX -->
									<!-- <div class="box border red" id="formWizard"> -->
									<!-- <div class="box-title">
											<h4>
												<i class="fa fa-bars"></i>Registration - <span
													class="stepHeader">Step 1 of 3 
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
										</div> -->
									<div class="box-body form">

										<form id="wizForm" action="#" class="form-horizontal">
										<!-- <form method="post" enctype="multipart/form-data" name="fileUploadfrm" id="fileUploadfrm" action="UploadDoctordeskServlet"> -->

											<div class="wizard-form" id="tabs">
												<div class="wizard-content" id="tabs">
													<ul class="nav nav-pills nav-justified steps">
														<li id="accountLi" class="active"><a href="#account"
															onclick="getRegUi();" data-toggle="tab"
															class="wiz-step active"> <i class="fa fa-bullhorn"></i>
																<span class="step-number"> Personal Info</span> <span
																class="step-name"> <i class="fa fa-user"></i></span>
														</a></li>

														<!-- <li><a onclick="refreshSponsorDiv();" href="#sponsorInfo" data-toggle="tab" -->
														<li><a onclick="" href="#sponsorInfo" data-toggle="tab"
															onclick="getRegUi();" class="wiz-step"> <span class="step-number">
															Sponsor Info</span> <span class="step-name"><i
																	class="fa fa-check"></i> </span>
														</a></li>
														
														<li><a href="#additionalInfo" data-toggle="tab"
															onclick="getRegUi();" class="wiz-step"> <span class="step-number">Additional
																	Info</span> <span class="step-name"><i
																	class="fa fa-check"></i> </span>
														</a></li>
														<!--<li><a href="#confirm" data-toggle="tab"
															class="wiz-step"> <span class="step-number">History</span>
																<span class="step-name"><i class="fa fa-check"></i>
															</span>
														</a></li> -->
														<li><a id="foo" href="#confirm" data-toggle="tab"
															 class="wiz-step"> <span
																class="step-number">Get Patient</span> <span
																class="step-name"><i class="fa fa-user"></i> </span>
														</a></li>
														
														<li id="sandboxFlow"><a href="#healthIdInfo" data-toggle="tab"
															onclick="getRegUi();" class="wiz-step"> <span
																class="step-number">ABHA Generation </span> <span
																class="step-name"><i class="fa fa-check"></i> </span>
														</a></li>
														
														<!-- <li><a href="#appointment" data-toggle="tab"
															onclick="getApptList();" class="wiz-step"> <span
																class="step-number">Appointment</span> <span
																class="step-name"><i class="fa fa-user"></i> </span>
														</a></li> -->



														<!-- <li><label class="control-label col-md-4">Other</label>

															<input name="Otherid" id="Otherid" type="radio"
															onclick="sourceDivHide()" value="walkin"></li> -->


													</ul>
													<!-- <ul class="nav navbar-nav navbar-right">
 
														<li><label class="control-label col-md-8">Other</label>

															<input name="Otherid" id="Otherid" type="radio"
															onclick="OtherRecord()" value="Other"></li>

													</ul> -->
													<!-- <div id="bar"
														class="progress progress-striped progress-sm active"
														role="progressbar">
														<div class="progress-bar progress-bar-warning"
															style="width: 18.1%"></div>
													</div> -->
													<div class="tab-content">
														<div class="alert alert-danger display-none">
															<a class="close" aria-hidden="true" href="#"
																data-dismiss="alert">×</a> Your form has errors. Please
															correct them to proceed.
														</div>
														<div class="alert alert-success display-none">
															<a class="close" aria-hidden="true" href="#"
																data-dismiss="alert">×</a> Your form validation is
															successful!
														</div>


														<div class="tab-pane active" id="account">

															<div class="row">

																<div class="col-md-7" id="personalDetails">

																	<div class="panel panel-default" style="width: 106%;">
																		<div class="panel-body">
																			<div class="tabbable"
																				style="line-height: 100%; margin-top: -3%;">

																				<div class="col-md-6">
																					<div class="form-group">
																						<label class=" control-label" for="e1">Select
																							Unit</label>
																						<div class="" style="width: 90%;">

																							<select id="e1" name="e1" class="col-md-12 full-width-fix"
																								onchange="unitListSelect()"><option
																									value=<%=session.getAttribute("uId")%>><%=session.getAttribute("uname")%></option>

																							</select>

																						</div>
																					</div>
																				</div>
																				<!-- <div class="col-md-6">
																					<div class="form-group">
																						<label class=" control-label" for="e1">Patient Id</label>
																						<div class="">

																							<input type="text" class="form-control" value="0" readonly="readonly"
																								name="patientId" id="patientId" placeholder="Patient Id" style="width: 90%;"/> 

																						</div>
																					</div>
																				</div> -->

																				<div class="col-md-6">
																					<div class="form-group">
																						<div class="">
																							<label class="control-label ">Prefix<span
																								class="required text-danger">*</span></label>
																						</div>

																						<div class="">
																							<select name="prefix" id="prefix"
																								style="width: 90%;"
																								class="col-md-12 full-width-fix"
																								onchange="setGender('ehat_patient')">
																								<!-- <option value="0">Select</option>
																								<option value="1">Mr</option>
																								<option value="2">Miss</option>
																								<option value="3">Dr.</option> -->

																							</select>
																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">First Name<span
																							class="required text-danger">*</span></label>
																						<!-- <div class="">jitendra class and onkeyup property added
																							<input type="text" class="typeahead form-control input-SmallText"
																						onkeyup="setAutoCompleteMarkVisitForList1(this.id,'auto')"
																								style="width: 90%;" name="fName" id="fName"
																								placeholder="First Name" /> <span
																								class="error-span"></span>
																						</div> -->
																						
																						<div>
																							<input type="text" class="typeahead form-control input-SmallText" onkeypress="return validateOnlyName(event);"
																								style="text-transform:uppercase;width: 90%;" name="fName" id="fName" placeholder="First Name" /> <span
																								class="error-span"></span>
																						</div>
																					</div>
																				</div>


																				<div class="col-md-6">
																					<div class="form-group">

																						<label class="control-label ">Middle Name<span
																							class="required"></span></label>
																						<div class="">
																							<input type="text" class="form-control" onkeypress="return validateOnlyName(event);"
																								style="text-transform:uppercase;width: 90%;" name="mName" id="mName"
																								placeholder="Middle Name" /> <span
																								class="error-span"></span>
																						</div>
																					</div>
																				</div>

																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Last Name<span
																							class="required text-danger">*</span></label>
																						<div class="">
																							<input type="text" class="form-control"
																								style="text-transform:uppercase;width: 90%;" name="lName" id="lName"
																								placeholder="Last Name" /> <span
																								class="error-span"></span>
																						</div>
																					</div>
																				</div>

																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Gender<span
																							class="required text-danger">*</span></label>
																						<div class="">
																							<select name="gender" id="gender"
																								style="width: 90%;"
																								class="col-md-12 full-width-fix">
																								<option value="">Select</option>
																								<option value="Male">Male</option>
																								<option value="Female">Female</option>

																							</select> <span class="error-span"></span>
																						</div>
																					</div>
																				</div>

																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Mobile<span
																							class="required text-danger">*</span></label>
																						<div class="">
																							<input type="text" class="form-control"
																								style="width: 90%;" name="mobile" id="mobile"
																								onkeypress="return validateNumOnly(event)"
																								placeholder="Mobile No" value="0" minlength="10"
																								maxlength="10" /> <span class="error-span"></span>
																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label">Email Id</label>
																						<div style="width: 90%;">
																							<input type="text" class="form-control"
																								name="email" id="emailId" onkeypress="return (event)"
																								placeholder="Email address" />
																						</div>
																					</div>
																				</div>

																				<div class="col-md-6">

																					<div class="form-group">
																						<label style="margin-right: 14px;"
																							class="control-label ">DOB<span
																							class="required text-danger">*</span></label>

																						<div class="input-group date" style="width: 90%;">

																							<input type="text" class="form-control" id="dob"
																								onchange="autoAgeMonthDays(),checkBirthDate('dob')">

																							<div class="input-group-addon">
																								<i class="fa fa-calendar"></i>
																							</div>
																						</div>
																					</div>
																				</div>

																				<div class="col-md-6">
																					<div class="form-group">

																						<div class="" style="margin-left: -13px;">
																							<!-- <div class="col-md-4">
																								<label class="control-label ">Year's</label> <input
																									type="text" class="form-control"
																									name="ageYears" id="year" placeholder="Yrs"
																									value="0" maxlength="3" onchange="getBirthDate();"
																									onkeypress="return validateNumOnly(event);" /> <span
																									class="error-span"></span>
																							</div> -->
																							
																							<div class="col-md-4">
																								<label class="control-label ">Year's</label> <input
																									type="text" class="form-control"
																									name="ageYears" id="year" placeholder="Yrs"
																									value="0" maxlength="3" onchange="getDate();"
																									onkeypress="return validateNumOnly(event);" /> <span
																									class="error-span"></span>
																							</div>
																							
																							<div class="col-md-4">
																								<label class="control-label ">Month's</label> <input
																									type="text" class="form-control"
																									name="ageMonths" id="month" placeholder="mm"
																									value="0"
																									onkeypress="return validateNumOnly(event)"
																									onchange="validateBirthMonth('month'); "
																									maxlength="2" /> <span class="error-span"></span>
																							</div>
																							<div class="col-md-4">
																								<label class="control-label ">Day's</label> <input
																									type="text" class="form-control" name="ageDays"
																									id="days" placeholder="dd" value="0"
																									onkeypress="return validateNumOnly(event)"
																									onchange="validateBirthDays('days');"
																									style="width: 90%;" maxlength="2" /> <span
																									class="error-span"></span>
																							</div>
																						</div>
																					</div>
																				</div>

																				<!--Start of Residencial Address -->
																				
																				<%-- <div class="col-md-12" id="appointDiv" style="display: none;">
																					<div class="panel panel-default" style="width: 102%; margin-left: -3%;">
																						<div class="panel-body" id="" style="min-height: 200px">
																							<div class="tabbable" style="line-height: 90%;">

																								<div class="tab-content" id="deptblock">																																																	
																									
																										<div class="col-md-6">
																											<div class="form-group">
																												<label class="control-label">Select Date:<span class="required text-danger">*</span></label>
																												<div class="">
																													<input type="text" onchange="getTimeSlot('New')" readonly="readonly" onclick="displayCalendar(document.getElementById('idNewAppointment'),'dd/mm/yyyy',this);"
																															class="form-control input-SmallText" value="<%=todays_date%>" id="idNewAppointment"	name="idNewAppointment">
																												</div>
																											</div>
																										</div>																									
																										
																										<div class="col-md-6">
																											<div class="form-group">
																												<label class="control-label">Specialization</label>
																												<div class="">
																													<select onchange="getDoctorNameList('New')" name="selHosDeptNew" id="selHosDeptNew" class="form-control input-SmallText">
																														<option value="0">-select-</option>
																													</select>
																												</div>
																											</div>
																										</div>
																										
																										<div class="col-md-6">
																											<div class="form-group">
																												<label class="control-label">Select Doctor</label>
																												<div class="">
																													<select onchange="getDoctorTimeList('New')"	name="selDoctorNameNew" id="selDoctorNameNew" class="form-control input-SmallText">
																													
																													</select>
																												</div>
																											</div>
																										</div>
																										
																										<div class="col-md-6">
																											<div class="form-group">
																												<label class="control-label">Doctor's Timing</label>
																												<div class="">
																													<select onchange="showDoctorAppointments('calender1')" id="selDoctorTimeNew" name="selDoctorTimeNew" class="form-control input-SmallText">
																														<option value="0">-Select-</option>
																													</select>
																												</div>
																											</div>
																										</div>																									
																								</div>
																								
																								
																								
																								<div class="tab-content" id="changeAppblock" style="display: none;">																																																	
																																																		
																										<div id="idTourApp" class="col-md-6">
																											<div class="form-group">
																												<label class="control-label ">Select Date:<span class="required text-danger">*</span></label>
																												<div class="">
																													<input type="text" onchange="getTimeSlot('Previous')" readonly="readonly" onclick="displayCalendar(document.getElementById('idTourDateDetails'),'dd/mm/yyyy',this);"
																															class="form-control input-SmallText" value="<%=todays_date%>" id="idTourDateDetails" name="idTourDateDetails">
																												</div>
																											</div>
																										</div>
																										
																										<div class="col-md-6">
																											<div class="form-group">
																												<label class="control-label ">Specialization</label>
																												<div class="">
																													<select id="selHosDept" class="form-control input-SmallText" onchange="getDoctorNameList()" type="text">
																													</select>
																												</div>
																											</div>
																										</div>
																										
																										<div class="col-md-6">
																											<div class="form-group">
																												<label class="control-label">Select Doctor</label>
																												<div class="">
																													<select id="selDoctorName" class="form-control input-SmallText" onchange="return getDoctorTimeList()" type="text">
																														<option value="0">-Select-</option>
																													</select>
																												</div>
																											</div>
																										</div>
																										
																										<div class="col-md-6">
																											<div class="form-group">
																												<label class="control-label">Doctor's Timing</label>
																												<div class="">
																													<select id="selDoctorTime" class="form-control input-SmallText" onchange="showDoctorAppointments()" type="text">
																														<option value="0">-Select-</option>
																													</select>
																												</div>
																											</div>
																										</div>																									
																								</div>
																								
																								

																							</div>
																						</div>
																					</div>

																				</div> --%>

																				<div class="col-md-12" id="addessDiv">

																					<div class="panel panel-default"
																						style="width: 102%; margin-left: -3%;">
																						<div class="panel-body" id=""
																							style="min-height: 200px">
																							<div class="tabbable" style="line-height: 90%;">
																								<ul class="nav nav-tabs">
																									
																									<li id="appointDtTab" style="display: none"><a
																										href="#tab_2_1" data-toggle="tab"> <i
																											class="fa fa-home"></i> Date
																									</a></li>	
																									<li id="appointChangeDtTab" style="display: none"><a
																										href="#tab_2_1_change" data-toggle="tab"> <i
																											class="fa fa-home"></i> Date
																									</a></li>																																														
																									<li class="active" id="resAddressTab"><a
																										href="#tab_2_2" data-toggle="tab"> <i
																											class="fa fa-home"></i> Residential Address
																									</a></li>
																									<li id="perAddressTab"><a href="#tab_2_3"
																										data-toggle="tab"> <i class="fa fa-home"></i>
																											Permanent Address
																									</a></li>

																								</ul>

																								<div class="tab-content" id="deptblock">
																								
																									<div class="tab-pane" id="tab_2_1">																									
																									
																										<div class="divide-20"></div>
																										
																										<div class="col-md-6">
																											<div class="form-group">
																												<label class="control-label">Select Date:<span class="required text-danger">*</span></label>
																												<div class="">
																													<input type="text" onchange="getTimeSlot('New')" readonly="readonly" onclick="displayCalendar(document.getElementById('idNewAppointment'),'dd/mm/yyyy',this);"
																															class="form-control input-SmallText" value="<%=todays_date%>" id="idNewAppointment"	name="idNewAppointment">
																												</div>
																											</div>
																										</div>																									
																										
																										<div class="col-md-6">
																											<div class="form-group">
																												<label class="control-label">Specialization</label>
																												<div class="">
																													<select onchange="getDoctorNameList('New')" name="selHosDeptNew" id="selHosDeptNew" class="form-control input-SmallText">
																														<option value="0">-select-</option>
																													</select>
																												</div>
																											</div>
																										</div>
																										
																										<div class="col-md-6">
																											<div class="form-group">
																												<label class="control-label">Select Doctor</label>
																												<div class="">
																													<select onchange="getDoctorTimeList('New')"	name="selDoctorNameNew" id="selDoctorNameNew" class="form-control input-SmallText">
																													
																													</select>
																												</div>
																											</div>
																										</div>
																										
																										<div class="col-md-6">
																											<div class="form-group">
																												<label class="control-label">Doctor's Timing</label>
																												<div class="">
																													<select onchange="showDoctorAppointments('calender1')" id="selDoctorTimeNew" name="selDoctorTimeNew" class="form-control input-SmallText">
																														<option value="0">-Select-</option>
																													</select>
																												</div>
																											</div>
																										</div>
																																																			
																									</div>
																									
																									<!-- ================== For Change Appointment start =============== -->
																									<div class="tab-pane" id="tab_2_1_change" style="display: none;">
																									
																										<div id="idTourApp" class="col-md-6">
																											<div class="form-group">
																												<label class="control-label ">Select Date:<span class="required text-danger">*</span></label>
																												<div class="">
																													<input type="text" onchange="getTimeSlot('Previous')" readonly="readonly" onclick="displayCalendar(document.getElementById('idTourDateDetails'),'dd/mm/yyyy',this);"
																															class="form-control input-SmallText" value="<%=todays_date%>" id="idTourDateDetails" name="idTourDateDetails">
																												</div>
																											</div>
																										</div>
																										
																										<div class="col-md-6">
																											<div class="form-group">
																												<label class="control-label ">Specialization</label>
																												<div class="">
																													<select id="selHosDept" class="form-control input-SmallText" onchange="getDoctorNameList()" type="text">
																													</select>
																												</div>
																											</div>
																										</div>
																										
																										<div class="col-md-6">
																											<div class="form-group">
																												<label class="control-label">Select Doctor</label>
																												<div class="">
																													<select id="selDoctorName" class="form-control input-SmallText" onchange="return getDoctorTimeList()" type="text">
																														<option value="0">-Select-</option>
																													</select>
																												</div>
																											</div>
																										</div>
																										
																										<div class="col-md-6">
																											<div class="form-group">
																												<label class="control-label">Doctor's Timing</label>
																												<div class="">
																													<select id="selDoctorTime" class="form-control input-SmallText" onchange="showDoctorAppointments()" type="text">
																														<option value="0">-Select-</option>
																													</select>
																												</div>
																											</div>
																										</div>
																									
																									</div>
																									<!-- ================== For Change Appointment end =============== -->
																								

																									<!--Start Tab 1  -->
																									<div class="tab-pane fade in active" id="tab_2_2">
																										<div class="divide-20"></div>

																										<div class="form-group">
																											<label class="control-label col-md-2"
																												style="margin-left: 0px;">Address</label>
																											<div class="col-md-10">
																												<!-- <input type="text" class="form-control"
																												name="areaCode" id="areaCode" placeholder="Area Code" 
																												value="0"/>  -->
																												<textarea rows="2" cols="39"
																													style="margin-left: -5px; width: 96%;font-size: 11px"
																													name="addressText" id="addressText"></textarea>
																												<span class="error-span"></span>
																											</div>
																										</div>

																										<div class="col-md-4">
																											<div class="form-group">
																												<label class="control-label ">Town</label>
																												<div class="">
																													<select id="townId" name="townId"
																														class="col-md-12 full-width-fix"
																														onchange="setTalukaAndDistrictAndStateForRegistration(this.value,'local')"
																														style="width: 90%;">
																														<option value=''>--Select--</option>
																														</select>
																												</div>
																											</div>
																										</div>

																										<div class="col-md-4">
																											<div class="form-group">
																												<label class="control-label ">Taluka</label>
																												<div class="">
																													<select id="talukaId" name="talukaId"
																														class="col-md-12 full-width-fix"
																														onchange="setCityAndDistrictAndStateForRegistration(this.value,'local')"
																														style="width: 90%;">
																														<option value=''>--Select--</option>
																														</select>
																												</div>
																											</div>
																										</div>

																										<div class="col-md-4">
																											<div class="form-group">
																												<label class="control-label ">District</label>
																												<div class="">
																													<select id="districtId" name="districtId"
																														class="col-md-12 full-width-fix"
																														onchange="setTalukaAndCityAndStateForRegistration(this.value,'local')"
																														style="width: 90%;">
																														<option value=''>--Select--</option>
																														</select>
																												</div>
																											</div>
																										</div>

																										<div class="col-md-4">
																											<div class="form-group">
																												<label class="control-label">State</label>
																												<div class="">
																													<select id="stateId" name="stateId"
																														class="col-md-12 full-width-fix"
																														onchange="setTalukaAndCityAndDistrictForRegistration(this.value,'local')"
																														style="width: 90%;">
																														<option value=''>--Select--</option>
																														</select>
																												</div>
																											</div>
																										</div>

																										<div class="col-md-4">
																											<div class="form-group">
																												<label class="control-label">Country</label>
																												<div class="">
																													<select name="country" id="country"
																														class="col-md-12 full-width-fix"
																														style="width: 90%;">
																														<option value="1">India</option>
																														<!-- <option value="2">Singapore</option>
																														<option value="3">Spain</option> -->

																													</select>
																												</div>
																											</div>
																										</div>

																										<div class="col-md-4">
																											<div class="form-group">
																												<label class="control-label">AreaCode<span
																													class="required"></span></label>
																												<div class="">
																													<input type="text" class="form-control"
																														name="areaCode" id="areaCode"
																														placeholder="Area Code" value="0"
																														maxlength="8"
																														onkeypress="return validateNumOnly(event)"
																														style="width: 90%;" /> <span
																														class="error-span"></span>
																													<!-- onkeypress="return isNumber(event)" -->
																												</div>
																											</div>
																										</div>

																										<div class="col-md-12">
																											<div class="form-group">

																												<div class="col-md-1">
																													<input id="perFlag" class=""
																														type="checkbox"
																														onclick="hideTabPermanant()">
																												</div>
																												<label class="control-label col-md-10 left"
																													style="text-align: left">Per.
																													Address Is Same As Per Res. Address </label>

																											</div>
																										</div>

																									</div>
																									<!--End Tab 1  -->

																									<!--Start Tab 2  -->

																									<div class="tab-pane" id="tab_2_3">
																										<div class="divide-20"></div>

																										<div class="form-group">
																											<label class="control-label col-md-2">Address</label>
																											<div class="col-md-10">

																												<!-- <textarea rows="2" cols="39" 
																								name="peraddressText" id="peraddressText"></textarea>
																								<span class="error-span"></span> -->
																												<textarea rows="2" cols="39"
																													style="margin-left: -5px; width: 96%;"
																													name="peraddressText" id="peraddressText"></textarea>
																												<span class="error-span"></span>
																											</div>
																										</div>

																										<div class="col-md-4">
																											<div class="form-group">
																												<label class="control-label">Town</label>
																												<div class="">
																													<select id="pertownId" name="pertownId"
																														class="col-md-12 full-width-fix"
																														onchange="setTalukaAndDistrictAndStateForRegistration(this.value,'permanant')"
																														style="width: 90%;"></select>
																												</div>
																											</div>
																										</div>

																										<div class="col-md-4">
																											<div class="form-group">
																												<label class="control-label">Taluka</label>
																												<div class="">
																													<select id="pertalukaId" name="pertalukaId"  
																														class="col-md-12 full-width-fix"
																														onchange="setCityAndDistrictAndStateForRegistration(this.value,'permanant')"
																														style="width: 90%;"></select>
																												</div>
																											</div>
																										</div>

																										<div class="col-md-4">
																											<div class="form-group">
																												<label class="control-label">District</label>
																												<div class="">
																													<select id="perdistrictId"   
																														name="perdistrictId"
																														class="col-md-12 full-width-fix"
																														onchange="setTalukaAndCityAndStateForRegistration(this.value,'permanant')"
																														style="width: 90%;"></select>
																												</div>
																											</div>
																										</div>

																										<div class="col-md-4">
																											<div class="form-group">
																												<label class="control-label">State</label>
																												<div class="">
																													<select style="width: 90%;" id="perstateId"    
																														name="perstateId"
																														class="col-md-12 full-width-fix"
																														onchange="setTalukaAndCityAndDistrictForRegistration(this.value,'permanant')"></select>
																												</div>
																											</div>
																										</div>

																										<div class="col-md-4">
																											<div class="form-group">
																												<label class="control-label">Country</label>
																												<div class="">
																													<select name="percountry" id="percountry"    
																														class="col-md-12 full-width-fix"
																														style="width: 90%;">
																														<option value="1">India</option>
																														<!-- <option value="2">Singapore</option>
																														<option value="3">Spain</option> -->

																													</select>
																												</div>
																											</div>
																										</div>

																										<div class="col-md-4">
																											<div class="form-group">
																												<label class="control-label">Area
																													Code</label>
																												<div class="">
																													<input type="text" class="form-control"
																														name="perareaCode" id="perareaCode"
																														placeholder="Area Code" value="0"
																														maxlength="8"
																														onkeypress="return validateNumOnly(event)"
																														style="width: 90%;" /> <span
																														class="error-span"></span>
																													<!-- onkeypress="return isNumber(event)" -->
																												</div>
																											</div>
																										</div>
																									</div>
																									<!--End Tab 2  -->

																								</div>
																							</div>

																						</div>
																					</div>
																					
																				</div>
																				<!--End of Residencial Address -->





																			</div>
																		</div>
																	</div>
																</div>

																<div class="col-md-5" id="consultDiv">
																	<div class="panel panel-default">
																		<div class="panel-body" id="departmentDiv"
																			style="min-height: 534px">
																			<div class="tabbable">
																				
																				<div class="tab-content" id="deptblock">
																					<div class="tab-pane fade in active" id="tab_1_1">
																						<div class="col-md-12" id="selectdept">
																							<div class="form-group">
																								<label class="control-label ">Department<span
																									class="required text-danger">*</span></label>
																								<div class="">
																									<select name="department" id="department"
																										class="col-md-12 full-width-fix"
																										onchange="refGenFormHideShow()"
																										style="width: 95%;">
																										<option value="0">--Select--</option>
																										<option value="1">OPD</option>
																										<option value="2">IPD</option>
																										<option value="3">Diagnostic</option>
																										<option value="4">Casualty</option>

																									</select>
																								</div>
																							</div>
																						</div>

																						<div class="col-md-12" id="specialityDiv">
																							<div class="form-group">
																								<label class="control-label ">Speciality</label>
																								<div class="">
																									<select name="drDeptId" id="drDeptId" value="0"
																										class="col-md-12 full-width-fix"
																										onchange="getDoctorBySpecialization('speciality','doctorName'),disableDocNameInMultiSelect()"
																										style="width: 95%;">

																									</select>
																								</div>
																							</div>
																						</div>
																						
																						<!-- <div class="col-md-12" id="specialityWiseDiv">
																							<div class="form-group">
																								<label class="control-label ">Speciality wise Doctor</label>
																								<div class="">
																									<select name="spclwiseDoc" id="spclwiseDoc" value="0"
																										class="col-md-12 full-width-fix"
																										onchange="setDocNameInMultiSelect()"
																										style="width: 95%;">

																									</select>
																								</div>
																							</div>
																						</div> -->


																						<div class="col-md-12" id="docConsultingDiv">

																							<div class="form-group">
																								<label class=" control-label" for="doctorName">Doc/Consultant</label>
																								<div>
																									<!-- <select id="doctorName" name="doctorName" class="col-md-12" style="width: 98%;" onchange="setSpecilizationAndDepartmentForRegistration()">	</select> -->
																									<select id="doctorName" name="doctorName" class="col-md-12" style="width: 98%;" onchange="getSpecilizationByDoctorId()">	</select>
																								</div>
																							</div>

																						</div>
																						
																						<!-- <div class="col-md-12" style="display: none;">

																							<div class="form-group">
																								<label class="control-label" for="doctorNameProxy">Doc/Consultant</label>
																								<div>
																									<select multiple id="doctorNameProxy" name="doctorNameProxy" class="col-md-12" style="width: 98%;">																										
																									</select>
																								</div>
																							</div>

																						</div> -->
																						
																						<div class="col-md-6" id="casTypeDiv">
																							<div class="form-group">
																								<label class="control-label ">Case
																									Type<span class="required text-danger">*</span>
																								</label>
																								<div class="" style="margin-top: 5%;">


																									<label><input id="chkHospital"
																										type="radio" name="caseByRadio"
																										checked="checked" value="1">Hospital</label>
																									&nbsp&nbsp&nbsp <label><input
																										name="caseByRadio" id="chkPrivate"
																										type="radio" value="2">Private</label>

																								</div>
																							</div>
																						</div>
																						<div class="col-md-6">
																							<div class="form-group">
																								<label class="control-label ">Reason of Visit</label>
																								<div class="">
																									<select name="visit" id="reasonofvisit" style="width: 95%;"
																										class="col-md-12 full-width-fix form-control"
																										onchange="">

																									</select>
																								</div>
																							</div>
																						</div>
																						<div class="col-md-6">
																							<div class="form-group">
																								<label class="control-label ">Ref.
																									Doctor</label>
																								<div class="">
																									<!-- <input type="text" name="refBy" id="refBy" style="width: 95%;"
																										class="col-md-12 full-width-fix form-control"> -->
																									<select name="refBy" id="refBy" style="width: 95%;"
																										class="col-md-12 full-width-fix">
																									
																										
																										<!-- <option value="0">--Select--</option>
																										<option value="1">OPD</option>
																										<option value="2">IPD</option>
																										<option value="3">Diago</option> -->

																									</select>
																								</div>
																							</div>
																						</div>
																						<div class="col-md-6" id="regGenFormDiv">
																							<div class="form-group">
																								<label class="control-label ">Req.Generated
																									Form</label>
																								<div class="">
																									<select name="reqGenFormId" id="reqGenFormId" style="width: 95%;"
																										class=" form-control">
																										

																									</select>
																								</div>
																							</div>
																						</div>
																						
																						<div class="col-md-6" >
																							<div class="form-group">
																								<label class="control-label ">Referred-Source<span 
																								class="required text-danger">*</span>
																								</label>
																								<div class="" style="margin-top: 5%;"><label><input id="chkWalkin"
																										type="radio" name="refByRadio" 
																										onclick="sourceDivHide()"
																										 value="walkin"> Walkin</label>
																									&nbsp&nbsp&nbsp <!-- <label><input
																										name="refByRadio" id="chkSource" type="radio"
																										onclick="sourceDivShow(),chkRefDocDivHide()"
																										value="source">Source</label> -->
																										<label><input name="refByRadio" id="chkSource" type="radio"
																										onclick="sourceDivShow()"
																									 value="source"> Source</label>

																								</div>
																							</div>
																						</div>

																						<div id="sourceDiv">
																						<div class="col-md-6">
																										<label class="control-label ">Source
																											Type/Referral</label>
																										
																											<select name="selReferredBy"
																												id="selReferredBy" class="form-control"
																												onchange="setReferredBySource2()"
																												style="width: 100%;">
																												<option value="0">select</option>
																												<option value="1">Awareness Lecture</option>
																												<option value="2">Hospital</option>
																												<option value="3">Internet</option>
																												<option value="4">News Paper</option>
																												<option value="5">Other</option>
																												<option value="6">Our Patient Name</option>
																												<option value="7">Television</option>
																												<!-- <option value="8">Ref.Doctor</option> -->
																												<option value="9">In House Doctor/User</option>
																												<option value="10">PRO</option>
																												<option value="11">Phlebotomist</option>
																											</select>
																										
																									</div>
																									
																									<!-- <div class="col-md-6" id="doctorDiv">
																										<label class="control-label ">Doctor</label>
																											<div class="form-group">
																											<select name="refByInHouse" id="refByInHouse"
																												class="col-md-12 full-width-fix">
																												<option value="0">Select</option>
																											</select>
																										</div>
																									</div> -->
																									<div class="col-md-6" id="refByInHouseDiv" style="display: none">
																								<div class="form-group">
																									<label  class="control-label">Doctor</label> <select
																										 style="width: 150px" id="refByInHouse">
																										 <option value='0'>--Select Doctor--</option>
																									</select>
																								</div>
																							</div>

																									<div class="col-md-6" id="referredByDiv"  style="margin-left:150px">
																										<label class="TextFont"
																											for="exampleInputPassword1">Source</label> <input
																											id="txtReferredBy" style="width: 100%;"
																											onkeypress="return validatealphabetic(event)"
																											class="form-control "
																											name="txtReferredBy" type="text"
																											 />
																									</div>
																						</div>
																						
																						
																						<div id="divB2B" class="col-md-12">
																						
																							<div class="col-md-12">
																								<div class="form-group">
																									<label for="status" class="control-label">Customer Type</label> <select
																										class="col-md-10 full-width-fix" id="custTypeForRegPage" onchange="fetchCustomerTypeByUnitId(this.id,'custNameRegPage')">
																										 <option value='0'>--Select Type--</option>
																									</select>
																								</div>
																							</div>
										                                                  
										                                                  <div class="col-md-12">
																								<div class="form-group">
																									<label for="status">Customer Name</label> <select onchange="fetchCustomerTypeByName()"
																										class="col-md-10 full-width-fix" id="custNameRegPage">
										 																<option value="0">--Select Name--</option> 
																									</select>
																								</div>
																							</div>
																						
																						</div>
																						
																						
																					</div>																					
																				</div>
																			</div>
																		</div>
																	</div>
																</div>									
																
																<div class="col-md-7" id="calanderDiv" style="display: none;">
																	<div class="panel panel-default">
																		<div class="panel-body" id="departmentDiv" style="min-height: 480px">
																			<div class="tabbable">
																				
																				<div class="tab-content" id="deptblock">
																																									
																					<div class="tab-pane fade in active" id="appintCal">
																					
																						<div style="margin-right: -20px;" class="col-md-12">
																							<div class="box border">
																								<div class="box-title">
																									<h4>
																										<i class="fa fa-calendar"></i>Calendar
																									</h4>																									
																								</div>
																								<div class="box-body">
																									<div class="row">
																										<div class="col-md-12">
																											<div id="calendar">
																												
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
																</div>
																
																<div class="col-md-7" id="calander1Div" style="display: none;">
																	<div class="panel panel-default">
																		<div class="panel-body" id="departmentDiv" style="min-height: 480px">
																			<div class="tabbable">
																				
																				<div class="tab-content" id="deptblock">
																																									
																					<div class="tab-pane fade in active" id="appintCal">
																					
																						<div style="margin-right: -20px;" class="col-md-12">
																							<div class="box border">
																								<div class="box-title">
																									<h4>
																										<i class="fa fa-calendar"></i>Calendar
																									</h4>																									
																								</div>
																								<div class="box-body">
																									<div class="row">
																										<div class="col-md-12">
																											<div id="calendar1">
																												
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
																</div>
																
																
																
																
																
																
																
																
																
																
																
																
																
																
																
																
																
																
																
																

																
																
															<!-- user Responsible For Payment	 -->	
						<!-- 									<div class="col-md-12">
																	<div class="panel panel-default">
																		<div class="panel-body" style="min-height: 215px;">
																			<div class="tabbable">
																				<ul class="nav nav-tabs">
																					<li><a>Responsible For Payment </a></li>

																				</ul>
																				<div class="tab-content">
																					<div class="tab-pane fade in active" id="tab_1_1">

																	

																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div> -->
																
																<!-- <div class="col-md-12" id="personalDetails2"> -->
																<div class="col-md-12" id="personalDeta" style="display:none">
																	<div class="panel panel-default"></br>
																	<span style="color:red ;display:inline;">Person Responsible for Payments
																	 <input id="userResCheck" type="checkbox" name="userResCheck" onclick="setUserResStatus()"></span>
																		<div class="panel-body" id="userResStatus">
																			<div class="tabbable">
																				<div class="col-md-6">
																					<div class="form-group">
																						<div class="col-md-3">
																							<label class="control-label ">Prefix<span
																							class="required text-danger">*</span></label>
																						</div>
																						<div class="col-md-9">
																							<select name="prefix" id="prefix2"
																								class="col-md-12 full-width-fix form-control" onchange="setpayResGender2(this.value)">
																								<!-- <option value="0">Select</option>
																								<option value="1">Mr</option>
																								<option value="2">Miss</option>
																								<option value="3">Dr.</option> -->
																							</select>
																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label col-md-3">fname<span
																							class="required text-danger">*</span></label>
																						<div class="col-md-9">
																							<input type="text" class="form-control"
																								name="fName2" id="payResFName"placeholder="First Name" /> <span
																								class="error-span"></span>
																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="col-md-3">mname<span
																							class="required"></span></label>
																						<div class="col-md-9">
																							<input type="text" class="form-control"
																								name="mName2" id="payResMName" placeholder="Middle Name" /> <span
																								class="error-span"></span>
																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label col-md-3">lname<span
																							class="required text-danger">*</span></label>
																						<div class="col-md-9">
																							<input type="text" class="form-control"
																								name="lName2" id="payResLName" placeholder="Last Name" /> <span
																								class="error-span"></span>
																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="col-md-3">Gender<span
																							class="required text-danger">*</span></label>
																						<div class="col-md-9">
																							<select name="gender" id="payResgender"
																								class="col-md-12 full-width-fix form-control">
																								<option value="">Select</option>
																								<option value="Male">Male</option>
																								<option value="Female">Female</option>
																							</select> <span
																								class="error-span"></span>
																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label col-md-3">Mobile<span
																							class="required text-danger">*</span></label>
																						<div class="col-md-9">
																							<input type="text" class="form-control"
																								name="mobile2" id="payResmobile" onkeypress="return validateNumOnly(event)" placeholder="Mobile No"
																								value="0" minlength="10" maxlength="10"/> <span
																								class="error-span"></span>
																						</div>
																					</div>
																				</div>
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="col-md-3">Aadhaar No<span
																							class="required"></span></label>
																						<div class="col-md-9">
																							<input type="text" class="form-control"
																								name="aDhar2" id="payResAdharNo" onkeypress="return validateNumOnly(event)" placeholder="Aadhaar Card No"
																								minlength="12" maxlength="12"/>
																								 <span class="error-span"></span>
																						</div>
																					</div>
																				</div>
																				<!-- <div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label col-md-4"> Age
																							<span class="required"></span>
																						</label> <input id="ageYears" class="" name="ageYears"
																							placeholder="Year" value="0" type="text" step=""
																							stye="" style="width: 35px;"> <input
																							id="ageYears" class="" name="ageYears"
																							placeholder="Year" value="0" type="text"
																							style="width: 35px;"> <input
																							id="ageYears" class="" name="ageYears"
																							placeholder="Year" value="0" type="text"
																							style="width: 35px;">
																					</div>
																				</div> -->
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label col-md-3">Relation<span
																							class="required text-danger">*</span></label>
																						<div class="col-md-9">
																							<select name="relation" id="relation"
																								class="col-md-12 full-width-fix form-control">
																								<option value="0">Select</option>
																								<option value="1">Father</option>
																								<option value="2">Brother</option>
																								<option value="3">Mother</option>
																								<option value="4">Sister</option>
																								<option value="5">Husband</option>
																								<option value="6">Other</option>
																							</select> <span
																								class="error-span"></span>
																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label col-md-2">Address<span
																							class="required">*</span></label>
																						<div class="col-md-10">
																							<!-- <input type="text" class="form-control"
																								name="areaCode" id="areaCode" placeholder="Area Code" 
																								value="0"/>  --> 
																								<textarea rows="2" cols="38" 
																								name="addressText2" id="payResAddressText"></textarea>
																								<span class="error-span"></span>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>

														</div>

														
														<!--Sponsor Information Start  on 06-June-2018 -->
														<div class="tab-pane" id="sponsorInfo">
															<div class="row">
																
																<!--For Single Sponser-->
																<div class="col-md-6" id="sponsorDetail" >
																	<div class="panel panel-default" style="height: 618px;width: 107%;">
																		<div class="panel-body">
																			<label class="control-label"><b>Sponsor/Billing Information</b></label>
																			<div class="col-md-12 line-separator"></div>
																						<div class="col-md-12" style="width: 96%;">
																							<div class="form-group">
																								<label class="control-label ">Source
																									Type</label>
																								<div class="">
																									<select name="sourceType" id="sourceType"
																										class="col-md-12 full-width-fix"
																										onchange="getSponsorRecords('sourceid','slaveid'),setSponser('ehat_patient')">
																										<option value="0">Self</option>


																									</select>
																								</div>
																							</div>

																							<div class="">
																								<div id="sponserselectDiv" class="form-group">
																									<label class="control-label ">Source
																										Name</label>
																									<div class="" id="sponserselect">
																										<select name="country" id="sponsor_select"
																											class="col-md-12 full-width-fix"
																											onchange="updateChargesMasterSlave(this.value),fetchSuperCatogoiresSlave(this.value),refreshSpnsrMainDiv()">
																											<option value=""></option>
																											<option value="20">Sponser1</option>
																											<option value="AL">Sponser2</option>
																											<option value="DZ">Sponser3</option>

																										</select>


																										<div id="dynamicItemDiv"
																											style="margin-top: 2%; width: 100%"
																											class="col-md-12 select2-container select2-container-multi ">
																											<ul
																												style="overflow-y: scroll; min-height: 70px"
																												class="select2-choices" id="dynamicItem"></ul>
																										</div>
																									</div>
																								</div>
																							</div>

																						</div>

																						<div class="col-md-6">
																							<div class="form-group">

																								<div class="">
																									<label class="control-label " style="">Employee ID</label> <input type="text" class="form-control"
																										name="empid" id="empid" placeholder="EMP Id"
																										style="width: 90%;" /><span
																										class="error-span"></span>
																								</div>
																							</div>
																						</div>

																						<div class="col-md-6">
																							<div class="form-group">

																								<div class="">
																									<label class="control-label" style="">TPA
																										ID </label> <input type="text" class="form-control"
																										name="tpaid" id="tpaid" placeholder="TPA Id"
																										style="width: 90%" /> <span class="error-span"></span>
																								</div>
																							</div>
																						</div>
																						
																						<div class="col-md-6 refClass">
																							<div class="form-group">
																								<div class="">
																									<label class="control-label" style="">Reference Date</label> 
																									<div class="input-group date" style="width: 90%;">

																										<input type="text" class="form-control" id="refDate">
																										<div class="input-group-addon">
																											<i class="fa fa-calendar"></i>
																										</div>
																									</div>
																								</div>
																							</div>
																						</div>
																						
																						<div class="col-md-6 refClass">
																							<div class="form-group">

																								<div class="">
																									<label class="control-label" style="">Sanction Order No.</label> 
																									<input type="text" class="form-control"
																										name="sactionOrdNo" id="sactionOrdNo" placeholder="Sanction Order No."
																										style="width: 90%" /> <span class="error-span"></span>
																								</div>
																							</div>
																						</div>
																						
																						<div class="col-md-6 refClass">
																							<div class="form-group">

																								<div class="">
																									<label class="control-label" style="">Sanction Amt.</label> 
																									<input type="text" class="form-control"
																										name="sanctionAmt" id="sanctionAmt" placeholder="Sanction Amt."
																										style="width: 90%" /> <span class="error-span"></span>
																								</div>
																							</div>
																						</div>
																						
																						<div class="col-md-6 refClass">
																							<div class="form-group">

																								<div class="">
																									<label class="control-label" style="">NEIS No.</label> 
																									<input type="text" class="form-control"
																										name="neisNo" id="neisNo" placeholder="NEIS No."
																										style="width: 90%" /> <span class="error-span"></span>
																								</div>
																							</div>
																						</div>
																						
																						<div class="col-md-6 refClass">
																							<div class="form-group">

																								<div class="">
																									<label class="control-label" style="">No. Of Visit Permitted</label> 
																									<input type="text" class="form-control"
																										name="visitNo" id="visitNo" placeholder="Sanction Order No."
																										style="width: 90%" /> <span class="error-span"></span>
																								</div>
																							</div>
																						</div>
																						
																						<div class="col-md-6 refClass">
																							<div class="form-group">

																								<div class="">
																									<label class="control-label" style="">IPD Or OPD</label> 
																									<input type="text" class="form-control"
																										name="ipdOrOpd" id="ipdOrOpd" placeholder="IPD Or OPD"
																										style="width: 90%" /> <span class="error-span"></span>
																								</div>
																							</div>
																						</div>
																						
																						<div class="col-md-6 refClass">
																							<div class="form-group">
																								<div class="">
																									<label class="control-label" style="">Valid Up To</label> 
																									<div class="input-group date" style="width: 90%;">

																										<input type="text" class="form-control" id="validUpToDate">
																										<div class="input-group-addon">
																											<i class="fa fa-calendar"></i>
																										</div>
																									</div>
																								</div>
																							</div>
																						</div>
																						
																						
																						<div class="col-md-12 refClass">
																						
																						<div class="col-md-6">
																							<div class="form-group">

																								<div class="">
																									<label class="control-label" style="">Treatment Permitted</label> 
																									<textarea class="form-control" id="treatPermited" name="treatPermited" 
																									style="margin-left: -17px;width: 100%;" 
																									cols="39" rows="2"></textarea> 
																									<span class="error-span"></span>
																								</div>
																							</div>
																						</div>
																						
																						<div class="col-md-6">
																							<div class="form-group">

																								<div class="">
																									<label class="control-label" style="">Disease To Be Treated</label> 
																									<textarea class="form-control" id="diseToBeTreat" name="diseToBeTreat" 
																									style="margin-left: -2px;width: 100%;" 
																									cols="39" rows="2"></textarea> 
																									<span class="error-span"></span>
																								</div>
																							</div>
																						</div>
																						
																					</div>
																					</div>
																				</div>
																			</div>
																			
																	<!--For Multiple Single Sponser-->
																	<<!-- div class="col-md-5" id="mulSponsorDetail" style="display: none;"> -->
																	<div class="col-md-5" id="mulSponsorDeta" style="display: none;">
																	<div class="panel panel-default" style="min-height: 618px;width: 107%;">
																		<div class="panel-body">
																		<div class="col-md-12">
																		<div class="col-md-4">
																			<label class="control-label" style="margin-left: -29px">
																			<b>Multiple Sponsor</b>
																			</label>
																			</div>
																			<div class="col-md-8">
																					<input id="setPrimarySpnsr" type="button" class="btn btn-xs btn-warning"
																					value="Set Primary"	onclick="setPrimarySponsor()" value="setPrimary" title="Set Primary" />

																					<input id="saveMultiSpnsr" type="button"
																						class="btn btn-xs btn-success"
																						onclick="saveMultipleSponsor()" value="save"
																						style="margin-left:1px;" title="save multiple sponsor"/>
																					
																					<button id="deleteMultiSpnsr" class="pull-right btn btn-xs btn-danger"
																						onclick="deleteMultipleSponsor()" type="button" title="delete multiple sponsor">
																						<i class="fa fa-trash-o"></i>
																					</button>
																					
																				</div>
																			
																			</div>
																			<div class="col-md-12 line-separator"></div>
																						<div class="col-md-12" style="width: 96%;">
																							<!-- <div class="form-group">
																								<label class="control-label ">Source
																									Type</label>
																								<div class="">
																									<select name="mulSourceType" id="mulSourceType"
																										class="col-md-12 full-width-fix form-control"
																										onchange="setMulSponser('ehat_patient')"
																										onclick="getMulSponsorRecords('sourceid','slaveid')">

																									</select>
																								</div>
																							</div> -->

																							<div class="">
																							
																							<div id="savedMulSponserselectDiv" class="form-group hide">
																									<label class="control-label ">Saved Sponsor List</label>
																									<div class="" id="getMulsponserselect">
																										<select name="country" id="get_mul_sponsor_select"
																											class="col-md-12 full-width-fix"
																											onchange="updateChargesMasterSlave(this.value),fetchMulSuperSlave(this.value),getMulSponsorData(this.value)">
																											<option value=""></option>

																										</select>
																										
																									</div>
																								</div>
																							
																								<div id="mulSponserselectDiv" class="form-group">
																									<label class="control-label ">Source Name</label>
																									<div class="" id="mulsponserselect">
																										<select name="country" id="mul_sponsor_select"
																											class="col-md-12 full-width-fix"
																											onchange="updateChargesMasterSlave(this.value),fetchMulSuperCatogoiresSlave(this.value)">
																											<option value=""></option>
																											<option value="20">Sponser1</option>
																											<option value="AL">Sponser2</option>
																											<option value="DZ">Sponser3</option>

																										</select>


																										<div id="mulDynamicItemDiv"
																											style="margin-top: 2%; width: 100%"
																											class="col-md-12 select2-container select2-container-multi ">
																											<ul
																												style="overflow-y: scroll; min-height: 70px"
																												class="select2-choices" id="mulDynamicItem"></ul>
																										</div>
																									</div>
																								</div>
																							</div>

																						</div>

																						<div class="col-md-6">
																							<div class="form-group">

																								<div class="">
																									<label class="control-label " style="">Employee ID</label> <input type="text" class="form-control"
																										name="mulEmpid" id="mulEmpid" placeholder="EMP Id"
																										style="width: 90%;" /><span
																										class="error-span"></span>
																								</div>
																							</div>
																						</div>

																						<div class="col-md-6">
																							<div class="form-group">

																								<div class="">
																									<label class="control-label" style="">TPA
																										ID </label> <input type="text" class="form-control"
																										name="mulTpaid" id="mulTpaid" placeholder="TPA Id"
																										style="width: 90%" /> <span class="error-span"></span>
																								</div>
																							</div>
																						</div>
																						
																						<div class="col-md-6 mulRefClass">
																							<div class="form-group">
																								<div class="">
																									<label class="control-label" style="">Reference Date</label> 
																									<div class="input-group date" style="width: 90%;">

																										<input type="text" class="form-control" id="mulRefDate">
																										<div class="input-group-addon">
																											<i class="fa fa-calendar"></i>
																										</div>
																									</div>
																								</div>
																							</div>
																						</div>
																						
																						<div class="col-md-6 mulRefClass">
																							<div class="form-group">

																								<div class="">
																									<label class="control-label" style="">Sanction Order No.</label> 
																									<input type="text" class="form-control"
																										name="mulSactionOrdNo" id="mulSactionOrdNo" placeholder="Sanction Order No."
																										style="width: 90%" /> <span class="error-span"></span>
																								</div>
																							</div>
																						</div>
																						
																						<div class="col-md-6 mulRefClass">
																							<div class="form-group">

																								<div class="">
																									<label class="control-label" style="">Sanction Amt.</label> 
																									<input type="text" class="form-control"
																										name="mulSanctionAmt" id="mulSanctionAmt" placeholder="Sanction Amt."
																										style="width: 90%" /> <span class="error-span"></span>
																								</div>
																							</div>
																						</div>
																						
																						<div class="col-md-6 mulRefClass">
																							<div class="form-group">

																								<div class="">
																									<label class="control-label" style="">NEIS No.</label> 
																									<input type="text" class="form-control"
																										name="mulNeisNo" id="mulNeisNo" placeholder="NEIS No."
																										style="width: 90%" /> <span class="error-span"></span>
																								</div>
																							</div>
																						</div>
																						
																						<div class="col-md-6 mulRefClass">
																							<div class="form-group">

																								<div class="">
																									<label class="control-label" style="">No. Of Visit Permitted</label> 
																									<input type="text" class="form-control"
																										name="mulVisitNo" id="mulVisitNo" placeholder="Sanction Order No."
																										style="width: 90%" /> <span class="error-span"></span>
																								</div>
																							</div>
																						</div>
																						
																						<div class="col-md-6 mulRefClass">
																							<div class="form-group">

																								<div class="">
																									<label class="control-label" style="">IPD Or OPD</label> 
																									<input type="text" class="form-control"
																										name="mulIpdOrOpd" id="mulIpdOrOpd" placeholder="IPD Or OPD"
																										style="width: 90%" /> <span class="error-span"></span>
																								</div>
																							</div>
																						</div>
																						
																						<div class="col-md-6 mulRefClass">
																							<div class="form-group">
																								<div class="">
																									<label class="control-label" style="">Valid Up To</label> 
																									<div class="input-group date" style="width: 90%;">

																										<input type="text" class="form-control" id="mulValidUpToDate">
																										<div class="input-group-addon">
																											<i class="fa fa-calendar"></i>
																										</div>
																									</div>
																								</div>
																							</div>
																						</div>
																						
																						
																						<div class="col-md-12 mulRefClass">
																						
																						<div class="col-md-6">
																							<div class="form-group">

																								<div class="">
																									<label class="control-label" style="">Treatment Permitted</label> 
																									<textarea class="form-control" id="mulTreatPermited" name="mulTreatPermited" 
																									style="margin-left: -17px;width: 100%;" 
																									cols="39" rows="2"></textarea> 
																									<span class="error-span"></span>
																								</div>
																							</div>
																						</div>
																						
																						<div class="col-md-6">
																							<div class="form-group">

																								<div class="">
																									<label class="control-label" style="">Disease To Be Treated</label> 
																									<textarea class="form-control" id="mulDiseToBeTreat" name="mulDiseToBeTreat" 
																									style="margin-left: -2px;width: 100%;" 
																									cols="39" rows="2"></textarea> 
																									<span class="error-span"></span>
																								</div>
																							</div>
																						</div>
																						
																					</div>
																					</div>
																				</div>
																			</div>
																			
																		</div>
																	</div>
																	<!--Sponsor Information End-->
																	
																	
														<!--Health Id Information Start  on 16-Sep-2022 -->
											<div class="tab-pane" id="healthIdInfo">
															<div class="row">

																<!--For Single Sponser-->
																<div class="col-md-6" id="sponsorDetail">
																	<div class="panel panel-default"
																		style="height: 618px; width: 107%;">
																		<div class="panel-body">
																			<label class="control-label"><b>ABHA
																					Creation Information</b></label>
																			<div class="col-md-12 line-separator"></div>
																			
																			<div class="col-md-6">
																				<div class="form-group">
																					<label class="control-label ">Aadhaar Number</label>
																					<div class="" style="width: 90%;">
																						<input type="text" class="form-control"
																							name="visa" id="aadharNumber"
																							onkeypress="return validateNumOnly(event)"
																							placeholder="Aadhaar Number" />
																						<label><input type="checkbox">I agree &nbsp<a data-toggle="modal" data-target="#addharConsentPopup">read more</a> </label>
																					</div>
																					
																				</div>
																			</div>
																			
																			<div class="col-md-6">
																				<div class="form-group">
																					<label class="control-label "></label>
																					<div class="" style="width: 90%;">
																						
																					</div>
																					
																				</div>
																			</div>
																			
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
																							onkeypress="return validateNumOnly(event)"
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
																			
																			
																			
																		<div class="col-md-6">

																					<div class="form-group">
																						<label style="margin-right: 14px;"
																							class="control-label ">ABHA Address<span
																							class="required text-danger">*</span></label>

																						<div class="input-group " style="width: 90%;">

																							<input type="text" class="form-control" id="sbx" 
																							value="">

																							<div class="input-group-addon">
																								@sbx
																							</div>
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
																				<a href="#" onclick="viewForgetTab()" class="btn btn-link"> Retrieval Your
																					ABHA? </a>
																			</div>
																			</div>
																		</div>
															</div>
															
														<!--For Retrieval ABHA-->
																<div class="col-md-6" id="">
																	<div class="panel panel-default"
																		style="height: 618px; width: 107%;">
																		<div class="panel-body">
																			<label class="control-label"><b>ABHA
																					Number Retrieval</b></label>
																			<div class="col-md-12 line-separator"></div>


																			<div class="col-md-12 text-center">
																				<div class="form-group">

																					<select name="list" id="mobileAadhaarDropDown"
																						onchange="changeAuthType();">
																						<option value="MOBILE_OTP">MOBILE_OTP</option>
																						<option value="AADHAAR_OTP">AADHAAR OTP</option>


																					</select>

																				</div>
																			</div>

																			<div class="col-md-6">
																				<div class="form-group">
																					<label class="control-label ">Mobile/Aadhaar
																						Number</label>
																						
																				
																					<div class="" style="width: 90%;">
																						<input type="text" class="form-control"
																							name="visa" id="forgetMobileNumber" onkeypress="return validateNumOnly(event)"
																							placeholder="Enter Mobile Number" minlength="10" maxlength="10" />
																							
																						<input type="text" class="form-control"
																							name="visa" id="forgetAadharNumber"
																							placeholder="Enter Aadhaar Number" />	

																					</div>
																					
																				</div>
																				
																			</div>
																			<div class="col-md-6">
																				<div class="form-group">
																					<label class="control-label ">&nbsp</label>
																					<div class="" style="width: 90%;">
																						<!-- <input type="text" class="form-control"
																							name="visa" id="verifyForgetOTP"
																							placeholder="Verify OTP" /> -->
																							<button class="btn btn-xs btn-success"
																							data-toggle="modal" onclick="sendForgetOTP()">Send
																							OTP</button>

																					</div>
																				</div>
																			</div> 
																			
																			<div class="col-md-6 ">
																				<div class="form-group">
																					<label class="control-label ">First Name
																						</label>
																					<div class="" style="width: 90%;">
																						<input type="text" class="form-control"
																							name="visa" id="abhaFirstName"
																							placeholder="First Name" />

																					</div>
																				</div>
																				
																				
																			</div>
																			
																			
																			<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Gender</label>
																						<div class="" style="width: 90%;">
																							<select  id="abhaGender"
																								class="form-control">
																								<option value="">Select</option>
																								<option value="Male">Male</option>
																								<option value="Female">Female</option>

																							</select>
																						</div>
																					</div>
																			</div>
																			
																			<div class="col-md-6">
																				<div class="form-group">
																					<label class="control-label ">Year Of Birth
																						</label>
																					<div class="" style="width: 90%;">
																						<input type="text" class="form-control"
																							name="visa" id="yearOfBirth"
																							placeholder="Year Of Birth" />

																					</div>
																				</div>
																			</div>
																			
																			
																			<div class="col-md-6">
																				<div class="form-group">
																					<label class="control-label ">OTP
																						</label>
																					<div class="" style="width: 90%;">
																						<input type="text" class="form-control"
																							name="visa" id="abhaOtp"
																							placeholder="OTP" />

																					</div>
																				</div>
																			</div>

																			<div class="col-md-6">
																				<div class="form-group">
																					<label class="control-label ">&nbsp</label>
																					<div class="" style="width: 90%;">
																						<!-- <input type="text" class="form-control"
																							name="visa" id="verifyForgetOTP"
																							placeholder="Verify OTP" /> -->
																							<button class="btn btn-xs btn-success"
																							data-toggle="modal" onclick="verifyForgetOtp()">Retrieve
																							</button>

																					</div>
																				</div>
																			</div> 
																			<!-- <div class="col-md-12 center">
																				<div class="form-group">
																					<div class="" style="width: 90%;">
																						<button class="btn btn-xs btn-success"
																							data-toggle="modal" onclick="verifyMobileOTP1()">Retrieve
																							</button>

																					</div>
																				</div>
																			</div> -->

																		</div>

																	</div>
																</div>
															
														</div>
													</div>
														<!--Health Id Information End-->			
																			
														<div class="tab-pane" id="additionalInfo">
															<div class="row">
																<div class="col-md-6" id="bioInformation" >
																	<div class="panel panel-default" style="min-height: 350px;width: 107%;">
																		<div class="panel-body">
																			<label class="control-label"><b>ADDITIONAL INFORMATION</b></label>
																			<div class="col-md-12 line-separator"></div> 
																			<div class="tabbable">

																				<!--Hardode master table avaible in DB 'ehat_patient_identity'-->
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Id Proof</label>
																						<div class="" style="width: 90%;">
																							<select name="idProof" id="idProof" onchange="setIdProofType()"
																								class="col-md-12 full-width-fix">
																								<option value="0">Select Id Proof</option>
																								<option value="1">Aadhaar card</option>
																								<option value="2">Pan card</option>
																								<option value="3">Passport</option>
																								<option value="4">License</option>
																								<option value="5">Other</option>

																							</select>
																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Identification
																							Number</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control"
																								name="identificationNum" id="identificationNum"
																								placeholder="Identification Number" />
																							<!-- onkeypress="return isNumber(event)" -->
																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label">Passport</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control"
																								name="passport" id="passport"
																								placeholder="Passport" />
																							<!-- onkeypress="return isNumber(event)" -->
																						</div>
																					</div>
																				</div>

																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Visa Type</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control"
																								name="visa" id="visa" placeholder="Visa" />
																							<!-- onkeypress="return isNumber(event)" -->
																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Nationality</label>
																						<div class="" style="width: 90%;">
																							<select name="Nationality" id="nationalityId"
																								class="col-md-12 full-width-fix">
																								<option value="0">Select Nationality</option>
																								<option value="1">Indian</option>
																								<option value="2">Canadian</option>
																								<option value="3">Nigerian</option>
																								<option value="4">Singaporean</option>
																								<option value="5">Saudi</option>

																							</select>
																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Blood Group</label>
																						<div class="" style="width: 90%;">
																							<select name="BloodGroup" id="bloodGroupId"
																								class="col-md-12 full-width-fix">
																								<option value="0">Select Blood Group</option>
																								<!-- <option value="1">A+</option>
																								<option value="2">O+</option>
																								<option value="3">B+</option>
																								<option value="4">AB+</option>
																								<option value="5">A-</option>
																								<option value="6">O-</option>
																								<option value="7">B-</option>
																								<option value="8">AB-</option> -->

																							</select>
																						</div>
																					</div>
																				</div>
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Weight</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control "
																								name="weight" id="weight"
																								placeholder="In Kgs." value="0"
																								/>
																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Height</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control "
																								name="height" id="height"
																								placeholder="In CM" value="0"
																								 />
																						</div>
																					</div>
																				</div>
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Father’s height</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control "
																								name="Fheight" id="Fheight"
																								placeholder="In CM" value="0"
																								/>
																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Mother’s height</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control "
																								name="Mheight" id="Mheight"
																								placeholder="In CM" value="0"
																								 />
																						</div>
																					</div>
																				</div>
																				
																				
																				<div class="col-md-12">
														
																						<form action="PatientServlet?page=new&patID=${requestScope.patID}"
																							name="frmAadharUpload" id="frmAadharUpload" method="post" enctype="multipart/form-data">
																							<img src=<%if (request.getAttribute("imgPath") != null) {%>
																								<%=request.getAttribute("imgPath")%> <%}%>
																								<%if (request.getAttribute("imgPath") == null) {%>
																								<%="images/aadhar.jpg"%> <%}%> name="aadharImg"
																								id="aadharImg" class="img-responsive col-md-6"
																								alt="Patient Image"
																								style="margin-right: 0px; margin-left: 0px; margin-top: 0px; height: 130px;" />
											
																						</form>
																						
																						<div class="col-md-6">
																							<div class="form-group">
																								
																									<div class="col-md-6">
																										<input type="button" data-target="#cameraAadharModal" data-toggle="modal" onclick="assignAadharCamera()" class="btn btn-xs btn-success" id="cameraAadharClick" value="Click"></input>
																									</div>
																									<div class="col-md-6">
													
																										<input type="button" data-target="#addharPhotoPopUp" data-toggle="modal"  class="btn btn-xs btn-warning" value="Browse"></input>
																									</div>
																								
																							</div>
													
																							<!-- popup modal of status for investigation test send to  RIS from OPDBill -->
																							<div id="addharPhotoPopUp" class="popup modal fade in" tabindex="-1"
																								role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
																								<div class="modal-dialog" style="width: 500px;">
																									<div class="modal-content">
																										<div class="modal-header">
																											<div class="box-title">
																												<h4>Upload Patient Addhar Photo</h4>
																											</div>
																										</div>
																										<div class="modal-body">
																											<div class="row">
																												<div class="col-md-12">
																													<!-- BOX -->
																													<div class="box-body">
																														<!--Panel Body-->
																														<form id="addharPhotoUploadfrm" name="addharPhotoUploadfrm" class="" enctype="multipart/form-data" method="post">
																															<input type="file" class="form-control" name="changeAadharPicture" id="changeAadharPicture">
																														</form>
																													</div>
																												</div>
																												<!-- /BOX-->
																											</div>
																										</div>
																										<div class="modal-footer">
																											<button type="button" class="btn btn-xs btn-warning" onclick="uploadAadharPhoto()">Upload</button>
																											<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
																										</div>
																									</div>
																									<!-- /BODY-->
																								</div>
																							</div>
													
																						</div>
											
																						<div style="display: none;">
																							<input type="text" name="divImg" id="divImg"
																								value=<%if (request.getAttribute("imgPath") != null) {%>
																								<%=request.getAttribute("DimgPath")%> <%}%>
																								<%if (request.getAttribute("imgPath") == null) {%>
																								<%="images/aadhar.jpg"%> <%}%> />
																						</div>
											
																				</div>
																				
																				
																			</div>
																		</div>
																	</div>
																</div>
																<div class="col-md-6" id="otherInformation">
																	<div class="panel panel-default" style="min-height: 350px;">
																		<div class="panel-body">
																		<label class="control-label">OTHER INFORMATION</label>
																		<div class="col-md-12 line-separator"></div>
																			<div class="tabbable">

																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Relation</label>
																						<div class="" style="width: 90%;">
																							<select name="relation" id="relation"
																								class="col-md-12 full-width-fix form-control">
																								<option value="0">Select</option>
																								<option value="1">S/O</option>
																								<option value="2">W/O</option>
																								<option value="3">D/O</option>
																								<option value="4">F/O</option>
																								<option value="5">Late S/O</option>
																								<option value="6">Late W/O</option>
																								<option value="7">Late D/O</option>
																								<option value="8">Owner</option>
																							</select>
																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Relative
																							Name</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control"
																								name="relativeName" id="relativeName"
																								placeholder="Relative Name" />
																							<!-- onkeypress="return isNumber(event)" -->
																						</div>
																					</div>
																				</div>

																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Marital
																							status</label>
																						<div class="" style="width: 90%;">
																							<select name="maritalStatus" id="maritalStatusId"
																								class="col-md-12 full-width-fix">
																								<option value="0">Select Status</option>
																								<option value="1">Married</option>
																								<option value="2">Widowed</option>
																								<option value="3">Separated</option>
																								<option value="4">Divorced</option>
																								<option value="5">Single</option>

																							</select>
																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Nationality</label>
																						<div class="" style="width: 90%;">
																							<select name="Nationality" id="nationalityId2"
																								class="col-md-12 full-width-fix">
																								<option value="0">Select Nationality</option>
																								<option value="1">Indian</option>
																								<option value="2">Canadian</option>
																								<option value="3">Nigerian</option>
																								<option value="4">Singaporean</option>
																								<option value="5">Saudi</option>

																							</select>
																						</div>
																					</div>
																				</div>

																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Language</label>
																						<div class="" style="width: 90%;">
																							<select name="language" id="languageId"
																								class="col-md-12 full-width-fix">
																								<option value="0">Select Language</option>
																								<option value="1">English</option>
																								<option value="2">Hindi</option>
																								<option value="3">Marathi</option>
																								<option value="4">Other</option>

																							</select>
																						</div>
																					</div>
																				</div>

																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Occupation</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control"
																								name="occupation" id="occupation"
																								placeholder="Occupation" />
																							<!-- onkeypress="return isNumber(event)" -->
																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Education</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control"
																								name="education" id="education"
																								placeholder="Education" />
																							<!-- onkeypress="return isNumber(event)" -->
																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Annual
																							Income</label>
																						<div class="" style="width: 90%;">
																							<select name="annualIncome" id="annualIncome"
																								class="col-md-12 full-width-fix">
																								<option value="0">Select Income</option>
																								<option value="1">less than 2.5lacs</option>
																								<option value="2">2.5 to 5 lacs</option>
																								<option value="3">5 to 10 lacs</option>
																								<option value="4">Great than 10 lacs</option>

																							</select>
																						</div>
																					</div>
																				</div>

																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Religion</label>
																						<div class="" style="width: 90%;">
																							<select name="religion" id="religionId"
																								class="col-md-12 full-width-fix">
																								<option value="0">Select Religion</option>
																								<option value="1">Hindu</option>
																								<option value="2">Muslim</option>
																								<option value="3">Jain</option>
																								<option value="4">Sikh</option>
																								<option value="5">Christian</option>
																								<option value="6">Other</option>

																							</select>
																						</div>
																					</div>
																				</div>
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">MLC Details</label>
																						<div class="" style="width: 90%;margin-top:3%;">
																							<input type="button" class="form-control btn-primary"
																								name="education" id="education"
																								placeholder="Education" value="MLC Details" onclick="openMlcPopUp()" />
																							<!-- onkeypress="return isNumber(event)" -->
																						</div>
																					</div>
																				</div>

																			<!-- Date & Time Of Admission  -->
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label "
																							style="margin-right: 14px;">Date Of
																							Admission</label>
																						<div style="width: 90%;" class="input-group date">
																							<input type="text" id="doa" class="form-control">
																							<div class="input-group-addon">
																								<i class="fa fa-calendar"></i>
																							</div>
																						</div>
																					</div>
																				</div>

																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Time Of
																							Admission</label>
																						<div class="" style="width: 35%;">
																							<input type="text" class="form-control"
																							id="toa" readonly="readonly">
																						</div>
																					</div>
																				</div>

																			</div>
																		</div>
																	</div>
																</div>
																</form>
																<div class="col-md-12" id="uploadDocuments" style="display: none">
																	<div class="panel panel-default" style="min-height: 240px;">
																		<div class="panel-body">
																		<label class="control-label">UPLOAD DOCUMENTS </label>
																		<div class="col-md-12 line-separator"></div>
																		
																		
																		
																			


																			<!-- <form action="UploadDoctordeskServlet"
																				id="fileUploadfrm" name="fileUploadfrm"
																				enctype="multipart/form-data" method="post"> -->
																				<input type="hidden" id="TRTiD" name="TRTiD"
																					value="0"><input type="hidden" id="PiD"
																					name="PiD" value="0">
																					<input type="hidden" id="isMultiple" name="isMultiple"
																					value="NA">
																				<div class="centered">
																					<div class="divide-10"></div>
																					<div class="col-md-3" style="height: 50px;">
																						<label class="col-md-2-1"
																							style="margin-top: 3px; padding-left: 5px;">Select
																							a File to Upload: </label><input type="file" name="file"
																							id="ifile" multiple="multiple"
																							style="margin-top: 0px; cursor: pointer;"><br>
																					</div>
																					<!-- <div class="divide-10"></div> -->
																					<div class="col-md-5" style="height: 50px;">
																						<label class="col-md-2-1"
																							style="margin-top: 3px; padding-left: 5px;">Comment:
																						</label>
																						<textarea class="col-md-4-1" rows="2" cols="60"
																							style="width: 236px; height: 48px;"
																							name="txtNotes" id="iNotes" maxlength="120"></textarea>
																					</div>
																					<div class="divide-10"></div>
																					<div class="col-md-4-1" style="height: 50px;">
																						<label class="col-md-12-1"
																							style="margin-top: 3px; padding-left: 5px;"></label>
																						<button type="button" onclick="uploadDocumentOnReg1()"
																							name="fileUp" id="ifileUp"
																							class="btn btn-xs btn-success editUserAccess"
																							style="margin-top: 3px; margin-left: 80px">Upload
																							Document</button>
																					</div>
																				</div>
																			<!-- </form> -->
																			<div class="tabbable" id="uploadDocumentsBody">

																		</div>
																		</div>
																	</div>
																</div>
																
															</div>
														</div>
														<div class="tab-pane" id="confirm">

												
																<div class="col-md-12-1">
																	<div style="" class="col-md-1">
																		<label class="TextFont"
																			style="margin-left: 0%; margin-top: 35%; font-size: 11px;">Search
																			By:</label>
																	</div>
																	<!-- <div class="col-md-2">
																		<label class="TextFont"
																			style="margin-left: -68%; margin-top: 3%;">Patient
																			Name:</label>
																	</div> -->
																	
																	<!-- <div  class="col-md-4 TextFont" style="margin-left: -15% ;margin-top: 17px;";
																		id="divbyName">
																		<input name="byName" type="text" id="byName"
																			class="typeahead form-control input-SmallText"
																			onkeyup="setAutoCompleteMarkVisitForList(this.id,'auto')" placeholder="Name, Mobileno , Adharno"/>
																		onkeypress="return SearchPatientNameOnEnter(event,'OPDOldPatientDatabase')" />
																	</div> -->
																	
																	<div class="col-md-3 TextFont" style="margin-top: 17px;" id="divbyName">
																		
																		<select id="patSearchType" class="form-control input-SmallText" onchange="setPatientSearchType()">
																			<option value="1">Patient UHID</option>
																			<option value="5">Legacy UHID</option>
																			<option value="2">Patient Name</option>
																			<option value="3">Patient Mobile</option>
																			<option value="4">Patient Aadhaar No</option>
																			
																		</select>
																		
																	</div>
                                                                   
																	<!-- <div class="col-md-4 TextFont" style="margin-top: 17px;" id="divbyName">
																		<input name="byName" type="text" id="byName" class="form-control input-SmallText" autocomplete="off"
																			onkeyup="setAutoPatientName(this.id,'reg',event)" placeholder="Patient Id,Name,Mobileno"/>																		
																	</div> -->
																	<div class="col-md-4 TextFont" style="margin-top: 17px;" id="divbyName">
																		<input name="byName" type="text" id="byName" class="form-control input-SmallText" autocomplete="off"
																			onkeyup="getPatientAutoDetails(this.id,'reg',event)" placeholder="Patient Id,Name,Mobileno"/>																		
																	</div>
																	
																	
																	<!-- <div class="col-md-4 TextFont" style="margin-top: 17px;" id="divbyName">
																		<select id="byName" class="form-control" onchange="setSearchedPatientTemp()"></select>																		
																	</div> -->
																	
																	<div  id="otherDiv" class="col-md-4 TextFont" style="margin-left: -15% ;margin-top: 7px;display:none; ">
																		<input name="byName1" type="text" id="byName1"
																			class="typeahead form-control input-SmallText"
																			placeholder="Name"
																			onkeyup="autosuggesstionForOtherRecords(this.id,'auto')" />
																		<!-- onkeypress="return SearchPatientNameOnEnter(event,'OPDOldPatientDatabase')" /> -->
																	</div>
																	<!-- <div class="col-md-1" style="margin-left: 0%;">
																		<label class="TextFont"
																			style="margin-left: -75%; margin-top: 0%;">Search By All:</label>
																	</div>

																	<div style="padding-left: 0%;" class="col-md-3">
																		<input name="byId" type="text" id="byId"
																			class="form-control input-SmallText"
																			onkeypress="commonFuntionForSearch(this.id,'auto')" />
																	</div> -->
																	 
																	<!-- <div class="col-md-1">
																		<label class="TextFont"
																			style="margin-left: 0%; margin-top: 3%;">Mobile
																			No:</label>
																	</div>

																	<div style="" class="col-md-2 ">
																		<input name="byMobile" type="text" id="byMobile"
																			class="form-control input-SmallText "
																			onkeypress="return SearchPatientIdOnEnter(event)"
																			maxlength="10" />
																	</div> --> 
																	<!-- <div style="text-align: center; margin-top: 10px;" class="col-md-1">
																	<label class="TextFont"
																			style="margin-left: -30%; margin-top: 3%;">Accurate
																			Result:</label>
																	</div>
																	<div class="col-md-1" style="text-align: center; margin-top: 15px;margin-left:-50px;">
																	
																		<input id="byid" type="checkbox"  class="form-control" onclick="accurate('registration')" />
																	</div> -->

																<!-- <div class="col-md-2" style="margin-top: 0%;">

																	<label class="TextFont">From Date<b
																		style="color: red;">*</b></label> <input type="text" value=""
																		placeholder="From Date" name="date"
																		readonly="readonly"
																		onclick="displayCalendar(document.getElementById('inputFromDate'),'dd/mm/yyyy',this)"
																		class="form-control input-SmallText"
																		id="inputFromDate">

																</div> -->


																<!-- <div class="col-md-2" style="margin-top: 0%;">

																	<label class="TextFont">To Date<b
																		style="color: red;">*</b>

																	</label> <input type="text" value="" placeholder="To Date"
																		name="date" readonly="readonly"
																		onclick="displayCalendar(document.getElementById('inputToDate'),'dd/mm/yyyy',this)"
																		class="form-control input-SmallText" id="inputToDate">



																</div> -->

																<!-- <div id="patientDiv1" class="col-md-1" style="text-align: center; margin-top: 20px;">
																		<input type="button" value="search"
																			class="btn btn-xs btn-primary"
																			onclick="setAutoCompleteMarkVisit(this.id,'search')"  />
																	</div>
																	
																	<div id="otherDiv1" class="col-md-2" style="text-align: center; margin-top: 20px; display:none; ">
																		<input type="button" value="search"
																			class="btn btn-xs btn-primary"
																			onclick="autosuggesstionForOtherRecords(this.id,'search1')"  />
																	</div>
																</div> -->

																<div class="col-md-12" style="margin-top: 7px; padding-left: 3%; width: 102.3%; margin-bottom: 16px;">
																	<div class="col-md-12-1" style="overflow-y: scroll; height: 425px; maxheight: auto; border: 1px solid #b8b8b8;">
																		<table class="table table-condensed cf" style="Width: 100%;">
																			<thead class='col-sm-12-1'>
																				<tr>
																					<th class='col-md-1-1 center' style='height: 21.5px;'><div
																							class='TextFont'>#</div></th>
																					<th class='col-md-3-1'
																						style='height: 21.5px; padding-right: 40px;'><div
																							class='TextFont'>Patient Name</div></th>
																					<th class='col-md-1-1 center' style='height: 21.5px;'><div
																							class='TextFont'>Reg Date</div></th>
																					<th class='col-md-1-1 center' style='height: 21.5px;'><div
																							class='TextFont' id="thCenterPatientId">Patient Id</div></th>
																					<th class='col-md-1-1 center'
																						style='height: 21.5px; padding-right: 5px;'><div
																							class='TextFont'>View</div></th>
																					<th class='col-md-1-1 center'
																						style='height: 21.5px; padding-right: 5px;'><div
																							class='TextFont'>Edit</div></th>
																					<th class='col-md-1-1 center hide' style='height: 21.5px;'><div
																							class='TextFont'>Admission Print</div></th>
																					<th class='col-md-1-1 center hide' style='height: 21.5px;'><div
																							class='TextFont'>Bill History</div></th>
																					<th class='col-md-1-1 center hide'
																						style='height: 21.5px; padding-right: 5px;'><div
																							class='TextFont'>Delete</div></th>
																					<th class='col-md-1-1 center'
																						style='height: 21.5px; padding-right: 5px;'><div
																							class='TextFont'>Mark Visit</div></th>
																					<!-- <th class='col-md-1-1 center'
																						style='height: 21.5px; padding-right: 5px;'><div
																							class='TextFont'>Appointment</div></th> -->
																					<th class='col-md-1-1 center'
																						style='height: 21.5px; padding-right: 5px;;display: none;'><div
																							class='TextFont'>DeletedBy</div></th>
																					<th class='col-md-1-1 center'
																						style='height: 21.5px; padding-right: 5px;'><div
																							class='TextFont'>Print Card</div></th>
																					<th class='col-md-1-1 center'
																						style='height: 21.5px; padding-right: 5px;'><div
																							class='TextFont'>Print Barcodes</div></th>
																					<th class='col-md-1-1 center hide'
																						style='height: 21.5px; padding-right: 5px;'><div
																							class='TextFont'>Common Advance</div></th>
																					<th class='col-md-1-1 center'
																						style='height: 21.5px; padding-right: 5px;'><div
																							class='TextFont'>Block Patient</div></th>
																					<th class='col-md-1-1 center'
																						style='height: 21.5px; padding-right: 5px;'><div
																							class='TextFont'>Print</div></th>
																				</tr>
							
																			</thead>
																			<tbody id="container">
																			
																			</tbody>
																		</table>
												<div class="pull-right">
													<ul class="pagination" id="opdpagenation">

													</ul>
												</div>
												<div class="col-md-4 col-md-offset-8">
													<div class="pull-right">
														<ul class="pagination pagination-blue margin-bottom-10"
															id="totalNumberOfPagesOpd">

														</ul>
													</div>
												</div>

											</div>
																</div>

                                         						<!--    Starting pagination  added by ajay :02-08-2019-->
																<div class="pull-right">
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="patientRecordPagination">
																	</ul>
																</div>
																<div class="row">
																	<div class="col-md-4 col-md-offset-8">
																		<div class="pull-right">
																			<ul class="pagination pagination-blue margin-bottom-10"
																				id="totalNumberOfPages">
																			</ul>
																		</div>
																	</div>
																</div>
																<!--   Ending  pagination -->
									                        </div>
														</div>
		                        	
													<div class="tab-pane" id="appointment">
					
														<div class="col-md-12" id="divAllPatientList">
																<div class="panel panel-default">
																	<!--Panel Body-->
																	<div class="panel-body">
																		<!--Tab Panel-->
																		<div class="tabbable">
																			<ul class="nav nav-tabs" id="tabTodayschedule">
																				<li id="idNewTabAppointment" class="active"><a
																					href="#tab_new" data-toggle="tab"
																					onclick="setAppointmentType('New'),getAppointedListOfPatient('New')"
																					onselect="setAppointmentType('New')"
																					style="color: #555555"></i>New</a></li>
																				<!-- <li id="idExistingTabAppointment"><a
																					href="#tab_Existing" data-toggle="tab"
																					onclick="setAppointmentType('Existing'),getAppointedListOfPatient('Existing')"
																					onselect="setAppointmentType('Existing')"
																					style="color: #555555"></i>Existing</a></li> -->
																				<li id="idFollowUpTabAppointment"><a
																					href="#tab_FollowUP" data-toggle="tab"
																					onclick="setAppointmentType('FollowUp'),fetchFollowUp('New');"
																					onselect="setAppointmentType('FollowUp'),fetchFollowUp('New');"
																					style="color: #555555">Follow</a></li>
																				<li id="idRescheduleTabAppointment"><a
																					href="#tab_ReSchedule" data-toggle="tab"
																					onclick="setAppointmentType('ReSchedule'),fetchReScheduleAppt();"
																					onselect="setAppointmentType('ReSchedule'),fetchReScheduleAppt();"
																					style="color: #555555">Re-Schedule</a></li>
																			</ul>
																			<div class="divide-10"></div>
																			<!--Search Box -->
																			<div class="input-group input-mini" id="patientSearchDivId">
																								
																				<div style="margin-top: 2px" class="col-md-3">
																					<div class="col-md-2">
																						<label>From</label>
																					</div>
																					<div class="col-md-10">
																						<input type="text" value="<%=todays_date%>" class="span6 input-mini search-query" placeholder="Date" name="date" readonly="readonly" onclick="displayCalendar(document.getElementById('fromDate'),'yyyy-mm-dd',this)" class="form-control input-SmallText" id="fromDate">
																					</div>
																				</div>
																				
																				<div style="margin-top: 2px" class="col-md-3">
																					<div class="col-md-2">
																						<label>To</label>
																					</div>
																					<div class="col-md-10">
																						<input type="text" value="<%=todays_date%>" class="span6 input-mini search-query" placeholder="Date" name="date" readonly="readonly" onclick="displayCalendar(document.getElementById('toDate'),'yyyy-mm-dd',this)" class="form-control input-SmallText" id="toDate">
																					</div>
																				</div>																						
																						
																				<div style="margin-top: 2px" class="col-md-3">
																					<div class="col-md-2">
																						<label>Type</label>
																					</div>
																					<div class="col-md-10">
																						<select class="span6 input-mini search-query" style="width: 100%">
																							<option value='0'>All</option>
																							<option value='1'>Paid</option>
																							<option value='2'>Unpaid</option>
																						</select>
																					</div>
																				</div>		
																																								
																				<input type="text" style="margin-top: 1px;"
																					class="span6 input-mini search-query col-sm-3"
																					placeholder="Patient  / Doctor  Search" name="patientListSearch"
																					id="patientListSearch">
																				<script>
																					var patientListSearch = [];
																					$("#patientListSearch").autocomplete({
																						source : patientListSearch
																					});
																				</script>
																				<div class="input-group-btn" style="padding: 5px 10px;">
																					<button class="btn btn-xs btn-primary" type="button"
																						onclick="setPatientIntoList('patient')" data-toggle="tooltip" data-placement="top" title="Patient Search ">
																						<span class="fa fa-search"></span>
																					</button>
																				</div>
																				<div class="input-group-btn">
																					<button class="btn btn-xs btn-danger" type="button"
																						onclick="setPatientIntoList('doctor')"  data-toggle="tooltip" data-placement="top" title="Doctor Search ">
																						<span class="fa fa-search"></span>
																					</button>
																				</div>
																			</div>
																			<div class="divide-10"></div>
																			<table id="" cellpadding="0" cellspacing="0"
																				border="0"
																				class="table table-striped table-bordered table-hover">
																				<thead>
																					<tr>
																						<th style="width: 5%">Appt.Id</th>																						
																						<th style="width: 22%">Patient Name</th>
																						<th style="width: 10%">Mobile No</th>
																						<th style="width: 22%">Doctor Name</th>
																						<th style="width: 20%">Visit Time</th>
																						<th style="width: 20%">Action</th>
																					</tr>
																				</thead>
																			</table>
																			<!--Search Box -->
																			<!--Content Tab -->
																			<div class="tab-content" style="max-height: 320px; height: 320px;overflow: auto;">
																				<!--New Patient -->
																				<div class="tab-pane fade in active" id="tab_new">
																					<table id="newPatientList" cellpadding="0"
																						cellspacing="0" border="0"
																						class="table table-striped table-bordered table-hover">
																					</table>
																					<!-- /BOX -->
																				</div>
																				<!--New Patient -->
																				<!--Existing -->
																				<div class="tab-pane fade" id="tab_Existing">
																					<div class="box-body">
																						<table id="existingPatientList" cellpadding="0"
																							cellspacing="0" border="0"
																							class="table table-striped table-bordered table-hover">

																						</table>
																						<!-- /BOX -->
																					</div>
																				</div>

																				<!--Existing -->
																				<!--Follow UP-->
																				<div class="tab-pane fade" id="tab_FollowUP">
																					<div class="box-body">
																						<table id="followUpPatientList" cellpadding="0"
																							cellspacing="0" border="0"
																							class="table table-striped table-bordered table-hover">

																						</table>
																						<!-- /BOX -->
																					</div>
																				</div>
																				<!--Follow UP-->
																				
																				<!--Re Schedule-->
																				<div class="tab-pane fade" id="tab_ReSchedule">
																					<div class="box-body">
																						<table id="reSchedulePatientList" cellpadding="0"
																							cellspacing="0" border="0"
																							class="table table-striped table-bordered table-hover">

																						</table>
																						<!-- /BOX -->
																					</div>
																				</div>
																				<!--Re Schedule-->
																			</div>
																			<!--Tab-->
																		</div>
																		<!--Tab Panel-->
																	</div>
																	<!--Patient List-->
	
										<!-- <input type="button" class="btn btn-info glyphicon glyphicon-chevron-down" name="upbutton" value="NEXT>" style="font: bold; display: inline-block; width:100px; float : right;" onclick="getAllPatient12()"/>
									
										
										<input type="button" class="btn btn-info glyphicon glyphicon-chevron-down" name="upbutton" value="PREVIOUS>" style="font: bold; display: inline-block; width:150px; float : right;" onclick="getAllPatient12()"/> -->
										
																	<!--Panel Body-->
																</div>
															</div>												
					
														</div>

													</div>
												</div>
												
												
												<!-- <div class="wizard-buttons">
													<div class="row">
														<div class="col-md-12">
															<div class="col-md-offset-3 col-md-9">
																<a href="javascript:;" class="btn btn-default prevBtn">
																	<i class="fa fa-arrow-circle-left"></i> Back
																</a> <a class="btn btn-primary nextBtn"> Continue <i
																	class="fa fa-arrow-circle-right"></i>
																</a> <a href="javascript:;"
																	class="btn btn-success submitBtn"> Submit <i
																	class="fa fa-arrow-circle-right"></i>
																</a>
															</div>
														</div>
													</div>
												</div> -->
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
							<input type="hidden" id="multiSponsorId" value="0">
							<input type="hidden"	id="patientApId" value="0">


						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
					</div>
					<!-- /CONTENT-->
				</div>
			</div>
		</div>
		<div id="pleaseWait" style="text-align: center; display: none;">
			<img style="margin-top: 250px;" height="43px"
				src="images/loading_black.gif" />
			<div style="margin-top: 10px; color: white">
				<b>Please wait...</b>
			</div>
		</div>
		
		
		<div class="modal fade bs-example-modal-lg" id="viewDocModal123"
							tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
							aria-hidden="true">
							<div class="modal-dialog modal-dialog modal-lg">
									<div class="modal-content">
										<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal"
											aria-label="Close">
											<span aria-hidden="true">&times;</span>
											</button>
												<div class="row">
													<div class="col-md-4 col-xs-11">
													<h3 class="modal-title" id="myModalLabel">View document</h3>
													</div><br><br>
													<div class="col-md-6 col-xs-11">
														<h5> </h5><h6 id="documentComment"> </h6>
														</div>
														</div>
													</div>
												<div class="modal-body">
													<iframe id="ViewDocumemnt123"  width="100%" height="330px"></iframe>
													</div>
												</div>
											</div>
										</div>
										
										
		<!-- Tarique -->
	
	
			<div class="modal fade bs-example-modal-lg" id="mlcDetails"  role="dialog" aria-labelledby="myLargeModalLabel"
							aria-hidden="false">
							<div class="modal-dialog modal-dialog modal-lg">
									<div class="modal-content">
										<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal"
											aria-label="Close">
											<span aria-hidden="true">&times;</span>
											</button>
												<div class="row">
													<div class="col-md-4 col-xs-11">
													<h3 class="modal-title" id="myModalLabel">MLC Details</h3>
													</div><br><br>
													<div class="col-md-6 col-xs-11">
														<h5> </h5><h6 id="documentComment"> </h6>
														</div>
														</div>
													</div>
												<div class="modal-body" style="width:100%; height:650px;">
																<div class="col-md-12" id="mlcInformation" >

																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">MLC
																							No.</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control"
																								name="mlcNo" id="mlcNo"
																								placeholder="MLC Number" />
																							<!-- onkeypress="return isNumber(event)" -->
																						</div>
																					</div>
																				</div>
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">FIR
																							No.</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control"
																								name="firNo" id="firNo"
																								placeholder="FIR Number" />
																							<!-- onkeypress="return isNumber(event)" -->
																						</div>
																					</div>
																				</div>
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label">Authority Name</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control"
																								name="passport" id="authorityName"
																								placeholder="Authority Name" />
																							<!-- onkeypress="return isNumber(event)" -->
																						</div>
																					</div>
																				</div>
																				
											
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">
																								Prefix</label>
																						<div class="" style="width: 90%;">
																							<select name="prefix3" id="prefix3"
																								class="form-control">
																						

																							</select>
																						</div>
																					</div>
																				</div>
																				
														

																			<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">First Name</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control"
																								name="visa" id="mlcFirstName" placeholder="First Name" />
							
																						</div>
																					</div>
																				</div> 
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Last Name</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control"
																								name="visa" id="mlcLastName" placeholder="Last Name" />
																							<!-- onkeypress="return isNumber(event)" -->
																						</div>
																					</div>
																				</div>
																				
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">
																								CMO/Consultant Name</label>
																						<div class="" style="width: 90%;">
																							<select name="mlcCmoDoctor2" id="mlcCmoDoctor2"
																								class="col-md-12 full-width-fix">
																						

																							</select>
																						</div>
																					</div>
																				</div>
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Buckle No.</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control"
																								name="buccleNo" id="buccleNo" placeholder="Buccle No" />
																							<!-- onkeypress="return isNumber(event)" -->
																						</div>
																					</div>
																				</div>
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Police Station Name.</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control"
																								name="plStname" id="plStname" placeholder="Polic Station NAme" />
																							<!-- onkeypress="return isNumber(event)" -->
																						</div>
																					</div>
																				</div>
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Gender</label>
																						<div class="" style="width: 90%;">
																							<select name="mlcGender" id="mlcGender"
																								class="form-control">
																								<option value="">Select</option>
																								<option value="Male">Male</option>
																								<option value="Female">Female</option>

																							</select>
																						</div>
																					</div>
																				</div>
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Mobile No</label>
																						<div class="" style="width: 90%;">
																						<input type="text" class="form-control"
																								style="width: 100%;" name="mobile" id="mlcMobile"
																								onkeypress="return validateNumOnly(event)"
																								placeholder="Mobile No" value="0" minlength="10"
																								maxlength="10" /> 
																						</div>
																					</div>
																				</div>
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Email</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control "
																								name="mlcEmail" id="mlcEmail"
																								placeholder="Email" 
																								 />
																						</div>
																					</div>
																				</div>
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Police Station Address</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control "
																								name="mlcPlAddess" id="mlcPlAddess"
																								placeholder="Address" 
																								 />
																						</div>
																					</div>
																				</div>
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Date</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control "
																								name="mlcDate" id="mlcDate" readonly
																								onclick="displayCalendar(document.getElementById('mlcDate'),'dd/mm/yyyy',this)"
																								
																								 />
																						</div>
																					</div>
																				</div>
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">Age</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control "
																								name="mlcAge" id="mlcAge"
																								onkeypress="return validateNumOnly(event)"
																								 value="0"
																								 maxlength="3"
																								 />
																						</div>
																					</div>
																				</div>
																				
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label ">
																								Relation</label>
																						<div class="" style="width: 90%;">
																							<select name="mlcRelation" id="mlcRelation"
																								class="form-control">
																								<option value="0">Select</option>
																								<option value="1">Father</option>
																								<option value="2">Brother</option>
																								<option value="3">Mother</option>
																								<option value="4">Sister</option>
																								<option value="5">Husband</option>
																								<option value="6">Other</option>
																							</select>
																						</div>
																					</div>
																				</div>
																				
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label">Address<span
																							class="required">*</span></label>
																						<!-- <div class="col-md-10"> -->
																							<!-- <input type="text" class="form-control"
																								name="areaCode" id="areaCode" placeholder="Area Code" 
																								value="0"/>  --> 
																								<textarea rows="2" cols="35" 
																								name="addressText2" id="mlcAddressText"></textarea>
																								<span class="error-span"></span>
																						<!-- </div> -->
																					</div>
																				</div>
																				
																				<div class="col-md-6">
																					<div class="form-group">
																						<label class="control-label">Incident Details<span
																							class="required">*</span></label>
																						<!-- <div class="col-md-10"> -->
																							<!-- <input type="text" class="form-control"
																								name="areaCode" id="areaCode" placeholder="Area Code" 
																								value="0"/>  --> 
																								<textarea rows="2" cols="35" 
																								name="incidentDetails" id="incidentDetails"></textarea>
																								<span class="error-span"></span>
																						<!-- </div> -->
																					</div>
																				</div>

																			<!-- </div> -->
																		<!-- </div> -->
																	<!-- </div> -->
																</div>
												
													</div>
												</div>
											</div>
										</div>

		<!-- end Of MLC Details -->

		
		<!--*****************Print card***************-->

		<div id="iPopUp" class="modal fade in" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content col-md-8-1"
					style="margin-top: 123px; margin-left: 213px;">
					<div class="modal-header">
						<button class="btn btn-xs btn-danger" aria-label="Close"
							data-dismiss="modal" type="button"
							style="margin-top: 3px;; margin-left: 347px"
							onclick="closePrintPopup()">
							<i class="fa fa-times"></i>
						</button>
						<button class="btn btn-xs btn-warning" title="Print"
							style="margin-top: -39px; margin-left: 312px"
							"
																								data-original-title="savepass "
							data-toggle="tooltip" data-placement="left"
							onclick="PrintCardFunctiononpopup();">
							<i class="fa fa-print"></i>
						</button>
						<input type="hidden" value="0" id="pid11" /> <input type="hidden"
							value="0" id="pName11" />
						<h4 id="testHead" style="margin-top: -36px;">
							<i class="fa fa-print"></i> Print:
						</h4>
					</div>

					<div class="modal-body" style="background-color: #ccffeb;">
						<div class="col-md-12-1">


							<div class="col-md-4">
								<input id="idPrintSticker" type="radio" value="printSticker" onclick ="showPrintsticker();"
									name="printType"> <b>Print Sticker</b>
							</div>
							<div class="col-md-4">
								<input id="idPrintCard" type="radio" value="printCard"
									name="printType"> <b>Print Card</b>
							</div>

							<div class="col-md-4">
								<input id="idPrintDetails" type="radio" value="printDetails"
									name="printType"> <b>Print Details</b>
							</div>

							<div class="divide-40"></div>
						</div>

					</div>
				</div>
			</div>
		</div>
		<!--*****************End Print card***************-->
		
			<!--*****************Start Print Sticker(24/48)***************-->
			
			<div id="iPopUp24" class="modal fade in" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content col-md-8-1"
					style="margin-top: 123px; margin-left: 213px;">
					<div class="modal-header">
						<button class="btn btn-xs btn-danger" aria-label="Close"
							data-dismiss="modal" type="button"
							style="margin-top: 3px;; margin-left: 347px"
							onclick="closePrintPopup1()">
							<i class="fa fa-times"></i>
						</button>
						<button class="btn btn-xs btn-warning" title="Print"
							style="margin-top: -39px; margin-left: 312px"
							"
																								data-original-title="savepass "
							data-toggle="tooltip" data-placement="left"
							onclick="PrintCardFunctiononpopup();">
							<i class="fa fa-print"></i>
						</button>
						<input type="hidden" value="0" id="pid11" /> <input type="hidden"
							value="0" id="pName11" />
						<h4 id="testHead" style="margin-top: -36px;">
							<i class="fa fa-print"></i> Print:
						</h4>
					</div>

					<div class="modal-body" style="background-color: #ccffeb;">
						<div class="col-md-12-1">


							<div class="col-md-4">
								<input id="PrintSticker24" type="radio" value="printSticker"
									name="printType"> <b>24</b>
							</div>
							<div class="col-md-4">
								<input id="PrintSticker48" type="radio" value="printSticker"
									name="printType"> <b>48</b>
							</div>

							<!-- <div class="col-md-4">
								<input id="idPrintDetails" type="radio" value="printDetails"
									name="printType"> <b>Print Details</b>
							</div> -->

							<div class="divide-40"></div>
						</div>

					</div>
				</div>
			</div>
		</div>
			
			
			
			<!--*****************End Print Sticker(24/48)***************-->
		
		
		<!--*****************Barcode Print ***************-->

		<div id="iPopUp2" class="modal fade in" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content col-md-8-1"
					style="margin-top: 123px; margin-left: 213px;">
					<div class="modal-header">
						<button class="btn btn-xs btn-danger" title="Close" aria-label="Close"
							data-dismiss="modal" type="button"
							style="margin-top: 3px;; margin-left: 347px"
							onclick="closePrintBarcodePopUp()">
							<i class="fa fa-times"></i>
						</button>
						<button class="btn btn-xs btn-warning" title="Print"
							style="margin-top: -39px; margin-left: 312px"
							data-original-title="savepass "
							data-toggle="tooltip" data-placement="left"
							onclick="barcodePrintCard('hori');">
							<i class="fa fa-print"></i>
						</button>
						
						<!-- <button class="btn btn-xs btn-warning" title="Print Vertical"
							style="margin-top: -67px; margin-left: 277px"
							data-original-title="savepass "
							data-toggle="tooltip" data-placement="left"
							onclick="barcodePrintCard('ver');">
							<i class="fa fa-print"></i>
						</button> -->
						
						<input type="hidden" value="0" id="pid11" /> <input type="hidden"
							value="0" id="pName11" />
						<h4 id="testHead" style="margin-top: -36px;">
							<i class="fa fa-print"></i> Print:
						</h4>
					</div>

					<div class="modal-body" style="background-color: #ccffeb;">
						<div class="col-md-12-1">


							<div class="col-md-10">
								<b>Enter No Of Barcode :</b><input id="noOfBarCode" type="text" 
									> 
							</div>
					<!-- 		<div class="col-md-4">
								<input id="idPrintCard" type="radio" value="printCard"
									name="printType"> <b>Print Card</b>
							</div> -->

						<!-- 	<div class="col-md-4">
								<input id="idPrintDetails" type="radio" value="printDetails"
									name="printType"> <b>Print Details</b>
							</div> -->

							<div class="divide-40"></div>
						</div>

					</div>
				</div>
			</div>
		</div>
		<!--*****************End Print card***************-->

		<!-- start pop up for camera -->
		<div id="cameraModal" class="modal fade" role="dialog">
			<div class="modal-dialog">
				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<!-- <button type="button" onclick="assignCamera()" class="close" data-dismiss="modal">&times;</button> -->
						<!-- <button id="cameraClick" class="btn btn-xs btn-success" onclick="assignCamera()" data-toggle="modal"
															data-target="#cameraModal">Click</button> -->
						<h4 class="modal-title">Camera</h4>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-md-6">
								<div id="my_camera"></div>
							</div>
							<div class="col-md-6">
								<div id="results"></div>
							</div>
						</div>
						<div class="row" style="margin-top: 20px;">
							<div class="col-md-2 col-md-offset-3">
								<!-- A button for taking snaps -->
								<button onclick="take_snapshot()" class="btn btn-xs btn-warning">Take
									Snapshot</button>
							</div>
						</div>
						<!-- Configure a few settings and attach camera -->
						<script language="JavaScript">
						
							//var today = new Date();							
							//var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();							
							//var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();							
							//var dateTime = date+' '+time; 
							
							var dateTime = Date.now();
							
							function assignCamera() {
																	
								var qType=$("#queryType").val();
								var imgPath="";							
								
								if(qType != "insert"){
									
									var curImg=$("#curPatImg").val();
									if(curImg=="patientPhoto.jpg"){
										
										imgPath = dateTime + "_webcam.jpg";
									}else{
										
										imgPath=curImg;
									}									
									//var patientId=$("#patientId").val(); 
									//imgPath = patientId + "_webcam.jpg";									
									//imgPath =$("#curPatImg").val(); 
								}else{
									
									imgPath = dateTime + "_webcam.jpg";
									//var nextPatId=$("#maxPatId").val(); 
									//imgPath = nextPatId + "_webcam.jpg"; 
								}
								
								var arr=imgPath.split(".");
								var newPath=arr[0];
								
								$("#cameraClick").removeAttr("onclick");
								Webcam.set({
									width : 320,
									height : 240,
									image_format : 'jpeg',
									jpeg_quality : 90,
									upload_name : newPath
								});
								Webcam.attach('#my_camera');								
							}

							function take_snapshot() {
								// take snapshot and get image data
								Webcam
										.snap(function(data_uri) {
											// display results in page
											document.getElementById('results').innerHTML = '<img id="capturedImage" src="'+data_uri+'"/>';
										});
							}

							function assignProfilePicture() {
								
								var qType=$("#queryType").val();
								var imgPath="";
							
								if(qType != "insert"){
									
									var curImg=$("#curPatImg").val();
									
									if(curImg=="patientPhoto.jpg"){
										
										imgPath = dateTime + "_webcam.jpg";
									}else{
										
										imgPath=curImg;
									}
									
									//var patientId=$("#patientId").val();
									//imgPath = patientId + "_webcam.jpg";
									//alert("maxPatId==="+imgPath);
									//imgPath =$("#curPatImg").val();
								}else{
									
									imgPath = dateTime + "_webcam.jpg";
									//var nextPatId=$("#maxPatId").val();
									//imgPath = nextPatId + "_webcam.jpg";
								}
								
								var src = $('#capturedImage').attr('src');
								$('#patImg').attr('src', src);								
								
								Webcam.upload(src, 'ehat/uploadregdoc/uploadPatientPhoto',
										function(code, text) {
											//$('#patImg').attr('src','pharmacy/pharmacy/readImage?url='+$('#patID').val()+"_webcam.jpg");
											$('#patImg').attr(
													'value',
													+ imgPath);
										});						
								
								$("#imageName").val(imgPath);
							}

							function assignAadharCamera() {
								
								var qType=$("#queryType").val();
								var imgPath="";							
								
								if(qType != "insert"){
									
									var curImg=$("#curPatImg").val();
									if(curImg=="aadhar.jpg"){
										
										imgPath = dateTime + "_webcam.jpg";
									}else{
										
										imgPath=curImg;
									}									
									//var patientId=$("#patientId").val(); 
									//imgPath = patientId + "_webcam.jpg";									
									//imgPath =$("#curPatImg").val(); 
								}else{
									
									imgPath = dateTime + "_webcam.jpg";
									//var nextPatId=$("#maxPatId").val(); 
									//imgPath = nextPatId + "_webcam.jpg"; 
								}
								
								var arr=imgPath.split(".");
								var newPath=arr[0];
								
								//$("#cameraClick").removeAttr("onclick");
								$("#cameraAadharClick").removeAttr("onclick");
								Webcam.set({
									width : 320,
									height : 240,
									image_format : 'jpeg',
									jpeg_quality : 90,
									upload_name : newPath
								});
								Webcam.attach('#my_aadhar_camera');								
							}
						</script>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-success" data-dismiss="modal"
							onclick="assignProfilePicture()">Save</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>

			</div>
		</div>
		
		<!-- start pop up for camera abha qr code -->
				
		<div id="cameraAadharModal" class="modal fade" role="dialog">
			<div class="modal-dialog">
				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<!-- <button type="button" onclick="assignCamera()" class="close" data-dismiss="modal">&times;</button> -->
						<!-- <button id="cameraClick" class="btn btn-xs btn-success" onclick="assignCamera()" data-toggle="modal"
															data-target="#cameraModal">Click</button> -->
						<h4 class="modal-title">Camera</h4>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-md-6">
								<div id="my_aadhar_camera"></div>
							</div>
							<div class="col-md-6">
								<div id="aadhar_results"></div>
							</div>
						</div>
						<div class="row" style="margin-top: 20px;">
							<div class="col-md-2 col-md-offset-3">
								<!-- A button for taking snaps -->
								<button onclick="take_aadhar_snapshot()"
									class="btn btn-xs btn-warning">Take Snapshot</button>
							</div>
						</div>
						<!-- Configure a few settings and attach camera -->
						<script language="JavaScript">
							//var today = new Date();							
							//var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();							
							//var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();							
							//var dateTime = date+' '+time; 

							var dateTime = Date.now();

							function scanQR() {

								var qType = $("#queryType").val();
								var imgPath = "";

								if (qType != "insert") {

									var curImg = $("#curAadharImg").val();
									if (curImg == "aadhar.jpg") {

										imgPath = dateTime
												+ "_aadhar_webcam.jpg";
									} else {

										imgPath = curImg;
									}
									//var patientId=$("#patientId").val(); 
									//imgPath = patientId + "_webcam.jpg";									
									//imgPath =$("#curPatImg").val(); 
								} else {

									imgPath = dateTime + "_aadhar_webcam.jpg";
									//var nextPatId=$("#maxPatId").val(); 
									//imgPath = nextPatId + "_webcam.jpg"; 
								}

								var arr = imgPath.split(".");
								var newPath = arr[0];

								$("#cameraAadharClick").removeAttr("onclick");
								Webcam.set({
									width : 320,
									height : 240,
									image_format : 'jpeg',
									jpeg_quality : 90,
									upload_name : newPath
								});
								Webcam.attach('#my_aadhar_camera');

							}

							function take_aadhar_snapshot() {
								// take snapshot and get image data
								Webcam
										.snap(function(data_uri) {
											// display results in page
											document
													.getElementById('aadhar_results').innerHTML = '<img id="capturedAadharImage" src="'+data_uri+'"/>';
										});
							}

							function assignScanPicture() {

								var qType = $("#queryType").val();
								var imgPath = "";

								if (qType != "insert") {

									var curImg = $("#curAadharImg").val();

									if (curImg == "aadhar.jpg") {

										imgPath = dateTime
												+ "_aadhar_webcam.jpg";
									} else {

										imgPath = curImg;
									}

									//var patientId=$("#patientId").val();
									//imgPath = patientId + "_webcam.jpg";
									//alert("maxPatId==="+imgPath);
									//imgPath =$("#curPatImg").val();
								} else {

									imgPath = dateTime + "_aadhar_webcam.jpg";
									//var nextPatId=$("#maxPatId").val();
									//imgPath = nextPatId + "_webcam.jpg";
								}

								var src = $('#capturedAadharImage').attr('src');
								$('#aadharImg').attr('src', src);

								//Webcam.upload(src, 'ehat/sandbox/scanQR',
								Webcam.upload(src, 'UploadAadharServlet',
										function(code, text) {
										//	$('#aadharImg').attr('src','ehat/sandbox/scanQR?url='+$('#aadharImg').val()+"_webcam.jpg");
										//	$('#aadharImg').attr('src','ehat/sandbox/scanQR?url='+$('#aadharImg').val()+imgPath);
											$('#aadharImg').attr('value', +imgPath);
											//alert(text);
											var response= text;
											if(response=="null"){
												alert("No QR Code Found");
												return 0;
											}
											var obj = JSON.parse(text);
											//alert(obj)
											//localStorage.setItem("healthId", obj.phr);
											//localStorage.setItem("healthIdNumber", obj.hidn);
											
											$("#healthId").val(obj.phr);
											$("#healthIdNumber").val(obj.hidn);
											
											$("#patientId").val();

											var fullname = obj.name;
											var nameArr = fullname.split(" ");
											$("#fName").val(nameArr[0]);
											$("#mName").val(nameArr[1]);
											$("#lName").val(nameArr[2]);
											//$("#gender").select2('val',obj.gender);
											//$("#gender").val();
											
											if(obj.gender == "M"){
												$("#gender").val("Male").change();
									  		    $("#prefix").select2('val',"Mr.");
											}
											else if(obj.gender == "F"){
												$("#gender").val("Female").change();
											     $("#prefix").select2('val',"Miss");
												}										
											$("#mobile").val(obj.mobile);
											$("#emailId").val(obj.email);

//											
//											$("#month").val();
											var birthDate= obj.dob.split("-");
											if(birthDate[0]<10){
												birthDate[0]="0"+birthDate[0]											
												}

											if(birthDate[1]<10){
												birthDate[1]="0"+birthDate[1]											
												}
									
											var dob = birthDate[0]+"/"+birthDate[1]+"/"+birthDate[2];
										 	$("#dob").val(dob);
											
										 	if (dob != "") {
												var ageString = getAgeYMDSandbox(dob);
												// alert(ageString);
												var ageStringArray = ageString.split("___");
												// alert(ageStringArray);
												$("#year").val(ageStringArray[0]);
												$("#month").val(ageStringArray[1]);
												$("#days").val(ageStringArray[2]);
												// var ageString = Y___M___D
											}

										 	$("#addressText").text(obj.address);
											$("#talukaId").val();//taluka
											$("#townId").val();//town
											$("#districtId").select2(obj.state);//district
											$("#stateId").select2('val',obj.stateName);//state
											$("#country").val();
											$("#areaCode").val();
										});

								$("#aadharImageName").val(imgPath);
							}
						</script>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-success" data-dismiss="modal"
							onclick="assignScanPicture()">Save</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>

			</div>
		</div>
		<!-- End pop up for camera abha qr code -->
		
		<!-- start pop up for get profile abha code -->
				
		<div id="getProfileModal" class="modal fade" role="dialog">
			<div class="modal-dialog">
				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<!-- <button type="button" onclick="assignCamera()" class="close" data-dismiss="modal">&times;</button> -->
						<!-- <button id="cameraClick" class="btn btn-xs btn-success" onclick="assignCamera()" data-toggle="modal"
															data-target="#cameraModal">Click</button> -->
						<h4 class="modal-title"><b>Get Profile</b></h4>
					</div>
					<div class="modal-body">
						<div class="row">

							<div class="col-md-12 text-center">
								<div class="form-group">

									<select name="list" id="getProfileDropdown"
										onchange="changeAuthType();">
										<option value="AADHAAR_OTP">AADHAAR OTP</option>
										<option value="MOBILE_OTP">MOBILE_OTP</option>
										


									</select>

								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label class="col-md-4">Health Id No<span
										class="required"></span></label>
									<div class="col-md-8">
										<input type="text" class="form-control" name="aDhar2"
											id="profileHealthIdNumber" 
											placeholder="Health ID No"  />
										<span class="error-span"></span>
									</div>
								</div>


							</div>
							<div class="col-md-6">
								<div class="form-group">
									<div class="" style="width: 90%;">
										<button class="btn btn-xs btn-success" data-toggle="modal"
											onclick="getProfileSendOtp()">Send OTP</button>
									</div>
								</div>
							</div>
						</div>
					<div class="row " style="margin-top: 20px;">
						<div class="col-md-6">
								<div class="form-group">
									<label class="col-md-4">Verify OTP<span
										class="required"></span></label>
									<div class="col-md-8">
										<input type="text" class="form-control" name="aDhar2"
											id="profileVerifyOTP" 
											placeholder="Verify OTP"  />
										<span class="error-span"></span>
									</div>
								</div>


							</div>
							<!-- <div class="col-md-6">
								
									<div class="form-group">
										<div class="" style="width: 90%;">
											<button class="btn btn-xs btn-success" data-toggle="modal"
												onclick="generateMobileOTP()">Send Mobile OTP</button>

										</div>
									</div>
								
							</div> -->
						</div>
							<!-- <div class="col-md-2 col-md-offset-3">
								A button for taking snaps
								<button onclick="take_aadhar_snapshot()"
									class="btn btn-xs btn-warning">Take Snapshot</button>
							</div> -->
						</div>
						<!-- Configure a few settings and attach camera -->
						
					
					<div class="modal-footer">
						<button type="button" class="btn btn-success" data-dismiss="modal"
							onclick="getABHAProfile()">Save</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
				</div>

			</div>
		
		<!-- End pop up for get profile abha code -->
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

	<!-- DATA TABLES -->
<!--  <script type="text/javascript"
		src="js/datatables/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript"
		src="js/datatables/media/assets/js/datatables.min.js"></script>
	<script type="text/javascript"
		src="js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
	<script type="text/javascript"
		src="js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script> -->

	<!-- for image upload -->
	<script lang="Javascript">
		//$(document).ready();
			
		function uploadPatientPhoto() {
			
			/* $('#changeProfilePicture').ajaxfileupload(
			{
				'action' : 'ehat/uploadregdoc/uploadPatientPhoto',
				'onComplete' : function(response) {
					var fileName = document.getElementById("changeProfilePicture").files[0].name;
					//$('#changeProfilePicture').val(); 
					$("#imageName").val(fileName);
					$('#upload').hide();
					$('#message').show();
					var statusVal = JSON.stringify(response.status);
					if (statusVal == "false") {
						
						$("#message").html("<font color='red'>"+ JSON.stringify(response.message) +" </font>");
					}
					if (statusVal == "true") {
						$("#message").html("<font color='green'>"+ JSON.stringify(response.message)	+" </font>");
						$('#patImg').attr('src','pharmacy/pharmacy/readImage?url='+ fileName);
						$('#patImg').attr('value',fileName);
					}
				},
				'onStart' : function() {
					$('#upload').show();
					$('#message').hide();
				}
			}); */

			 var form = $('#regPhotoUploadfrm')[0];
			 if( document.getElementById("changeProfilePicture").files.length == 0 ){
			    alert("Please select file");
			    return false;
			 }
			 var fileName = document.getElementById("changeProfilePicture").files[0].name;
			 var data = new FormData(form);
		     jQuery.ajax({                   
		    	 async : true,                   
		    	 type : "POST",
		    	 enctype: 'multipart/form-data',
		    	 processData: false,
		         contentType: false,
		    	 data : data,
		    	 url : "ehat/uploadregdoc/uploadPatientPhoto",                   
		    	 timeout : 1000 * 60 * 5,                   
		    	 catche : false,                    
		    	 error : function() {                                            
		    		 alert("error");
		    	 },                   
		    	 success : function(r) {                      
	
			    	alert("File uploaded successfully.");
			    	$("#patientPhotoPopUp").modal("hide");  
			    	$('#changeProfilePicture').val('');                    
		    		$('#patImg').attr('src','pharmacy/pharmacy/readImage?url='+ fileName);
					$('#patImg').attr('value',fileName);   
					$("#imageName").val(fileName);         
		    	}
			});
		}
		
		function uploadAadharPhoto() {
			
			/* $('#changeAadharPicture').ajaxfileupload(
			{
				'action' : 'ehat/uploadregdoc/uploadPatientAddhar',
				'onComplete' : function(response) {
					var fileName = document.getElementById("changeAadharPicture").files[0].name;
					//$('#changeProfilePicture').val(); 
					$("#aadharImageName").val(fileName);
					$('#upload').hide();
					$('#message').show();
					var statusVal = JSON.stringify(response.status);
					if (statusVal == "false") {
						
						$("#message").html("<font color='red'>"+ JSON.stringify(response.message) +" </font>");
					}
					if (statusVal == "true") {
						$("#message").html("<font color='green'>"+ JSON.stringify(response.message)	+" </font>");
						$('#aadharImg').attr('src','pharmacy/pharmacy/readAadharImage?url='+ fileName);
						$('#aadharImg').attr('value',fileName);
					}
				},
				'onStart' : function() {
					$('#upload').show();
					$('#message').hide();
				}
			}); */

			var form = $('#addharPhotoUploadfrm')[0];
			 if( document.getElementById("changeAadharPicture").files.length == 0 ){
			    alert("Please select file");
			    return false;
			 }
			 var fileName = document.getElementById("changeAadharPicture").files[0].name;
			 var data = new FormData(form);
		     jQuery.ajax({                   
		    	 async : true,                   
		    	 type : "POST",
		    	 enctype: 'multipart/form-data',
		    	 processData: false,
		         contentType: false,
		    	 data : data,
		    	 url : "ehat/uploadregdoc/uploadPatientAddhar",                   
		    	 timeout : 1000 * 60 * 5,                   
		    	 catche : false,                    
		    	 error : function() {                                            
		    		 alert("error");
		    	 },                   
		    	 success : function(r) {                      
	
			    	alert("File uploaded successfully.");
			    	$("#addharPhotoPopUp").modal("hide");  
			    	$('#changeAadharPicture').val('');                    
		    		$('#aadharImg').attr('src','pharmacy/pharmacy/readImage?url='+ fileName);
					$('#aadharImg').attr('value',fileName); 
					$("#aadharImageName").val(fileName);           
		    	}
			});
		}

		$(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page
			App.init(); //Initialise plugins and elements
			FormWizard.init();
			
			getUnitList();
			title("ehat_patient"); 
			getSpecialization("reg","drDeptId");
			setPatientSearchType();

			fetchStateListForReg("state");
			fetchDistrictListForReg("district");
			fetchTalukaListForReg("taluka");
			fetchCityListForReg("city");

			getSponsorRecords("sourceid", "slaveid");
			sponsorTypeList();
			
			getRefDoctors2();
			refGenFormHideShow();
			getAllReq("reg");

			fetchAllCustomerTypes();
			fetchCustomerNameByUnitId();

			getBloodGroupListOnReg();

			getAllDoctorListForRegistartion();
			
		//	$("#sourceDiv").hide();
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

			var abdmFlow = $('#abdmFLow').val();
			if(abdmFlow=='off'){

				$('#sandboxFlow').hide();
				$('#sandboxScanButton').hide();
				$('#sandboxSearchButton').hide();
				$('#sandboxGetProfile').hide();
					
					
			}
			else {
				$('#sandboxFlow').show();
				$('#sandboxScanButton').show();
				$('#sandboxSearchButton').show();
				$('#sandboxGetProfile').show();
				
			}


			var hospitalname = $('#hospitalname').val();
			if(hospitalname == 'Siddhivinayak'){
				$("#chkSource").prop('checked', true);
				$("#chkWalkin").prop('checked', false);
			}else
			{	$("#chkWalkin").prop('checked', true);
				$("#chkSource").prop('checked', false);
				}
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
			$('#custNameRegPage').select2();		

			$('#getProfileDropdown').select2();

			$('#mobileAadhaarDropDown').select2();

			//added by vishant
			$("#country").select2();
			//added by Rahul
			$("#refByInHouse").select2();
			$("#stateId").select2();
			$("#townId").select2();
			$("#talukaId").select2();
			$("#districtId").select2();

		
			$("#percountry").select2();
			$("#perstateId").select2();
			$("#pertownId").select2();
			$("#pertalukaId").select2();
			$("#perdistrictId").select2();
			
			$("#idProof").select2();
			$("#nationalityId").select2()
			$("#bloodGroupId").select2();
			$("#maritalStatusId").select2();
			$("#annualIncome").select2();
			$("#religionId").select2();
			$("#relation").select2();
			$("#nationalityId").select2();
			$("#languageId").select2();
			$("#sourceType").select2();
			$("#nationalityId2").select2();
			
			
			$('#calendar1').fullCalendar({
		
			});	


			localStorage.removeItem('visited');
			
		    $('#foo').click(function() {

		    	var yetVisited = localStorage['visited'];
			    if (!yetVisited) {

			    	fetchMarkVisitPatient(1);
			        localStorage['visited'] = "yes";
			    }
			});
				

			//Date picker
			$('#dob').datepicker({
				autoclose : true,
				todayHighlight: true
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
	<input type="hidden" id="mrnno" value="xyz" /><!-- id="mrnnoHidden" -->
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
	<input type="hidden"  id="meeshaFlow" value="<%=resourceBundleEhaMeehsa.getObject("meesha").toString()%>">

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
	
	<input type="hidden" id="abdmFLow" value="<%=abdmFlow%>">
	<input type="hidden" id="healthId">
	<input type="hidden" id="healthIdNumber">
	
	<input type="hidden" id="hospitalname" value="<%=hospitalname%>">
	
	
	<div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" class="popup modal fade in">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<div class="box-title">
						<h4>
							<i class="fa fa-calendar"></i> Patient Appointment
						</h4>
					</div>
				</div>
				<div class="modal-body">
					<div id="myTabs">
						<ul id="tabTodayschedule" class="nav nav-tabs">
							<li class="active"><a data-toggle="tab" href="#tab_PatientAppointment1">Appointment</a></li>
							<!-- <li><a href="#tab_TypeAppointment1"
							data-toggle="tab">Type</a></li> -->
							<li class=""><a data-toggle="tab" href="#tab_NoteAppointment1">Note</a></li>
						</ul>
					</div>
					<div class="tab-content" id="MainTabs">

						<div id="tab_PatientAppointment1" class="tab-pane fade active in">
							<div class="col-md-12-1">
								<div class="divide-10"></div>
								<div class="divide-10"></div>
								<form class="form-horizontal  col-md-12-1">
									<div class="form-group col-md-4-1"></div>
									<div id="">
										<h5>
											<label for="exampleInputEmail1">Patient
												Details </label>
										</h5>
										<div class="divide-10"></div>
										<div class="divide-10"></div>
										<div id="patientDetailsDiv" class="input-group input-mini"><div class="divide-10"></div><label class="TextFont" for="exampleInputEmail1">Patient Name :Mast.aa aa</label><div class="divide-10"></div><label class="TextFont" for="exampleInputEmail1">Patient Mobile Number : 2222222222</label><div class="divide-10"></div><label id"appslottiming"="" class="TextFont" for="exampleInputEmail1"></label></div>
									</div>
								</form>
								<div class="divide-10"></div>
								<div class="divide-10"></div>
								<div style="border: hidden;" class="col-xs-12 col-md-12"></div>
							</div>
						</div>

						<!--Tab Note-->
						<div id="tab_NoteAppointment1" class="tab-pane fade">
							<div class="divide-10"></div>
							<div class="col-md-12">
								<div>
									<label><strong>Note:</strong></label>
								</div>
								<div class="divide-10"></div>
								<div class="divide-10"></div>
								<div class="col-lg-12">
									<textarea placeholder="Enter a Note" rows="12" id="textareaNote" class="field textareawidth col-lg-12"></textarea>
								</div>
							</div>
						</div>
						<!--/tab_Note-->
					</div>
				</div>
				<div class="modal-footer">
					<div class="divide-10"></div>
					<button data-dismiss="modal" class="btn btn-default exit" type="button">Close</button>
					<button onclick="scheduleAppointmentOfPatient()" class="submitFrom btn btn-primary" type="button">Schedule
						Appointment</button>
				</div>
			</div>
		</div>
	</div>	
	
</body>
</html>
</c:if>
<c:if test="${sessionScope.userType == null}">
	<jsp:forward page="index.jsp"></jsp:forward>
</c:if>