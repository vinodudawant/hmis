<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Shift Master</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<meta name="viewport" content="user-scalable=no, width=device-width" />

<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="css/bootstrap-chosen.css" />


<!-- ----for table auto complete-------------- -->
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />


<!-- =-=-=-=-=-=-=-=Multi Select  Touheed=-=-=-=-=-=-=-=- -->
<!-- css for developer -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->


<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script type="text/javascript"
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.js"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>

<script type="text/javascript" src="js/js.js"></script>
<!-- <script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script> -->
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript"
	src="pharmacy/resources/js/app_js/Pharma_Validation.js "></script>

<!-- CKEDITOR -->
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>
<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<!-- End New JS File -->

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

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>
<script src="/pharmacy/resources/js/bootbox.js"></script>

<!-- @code for editor (Start)-->
<!-- BOOTSTRAP WYSIWYG -->
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/jquery.hotkeys.min.js"></script>
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/bootstrap-wysiwyg.min.js"></script>

<!-- CKEDITOR -->
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>

<script type="text/javascript"
	src="js/bootstrap-switch/bootstrap-switch.min.js"></script>
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-switch/bootstrap-switch.min.css" />
<script type="text/javascript" src="RichTextBox/tinymce/tinymce.min.js"></script>
<script type="text/javascript"
	src="RichTextBox/tinymce/jquery.tinymce.min.js"></script>
<script type="text/javascript"
	src="RichTextBox/tinymce/themes/modern/theme.min.js"></script>
<!-- @code for editor (End)-->	
<script type="text/javascript" src="js/roster_management.js"></script>
<script type="text/javascript">
	onload = function() {
	
		$('#startTime').datetimepicker({
			 datepicker:false,
			 format:'H:i',
			 step:60
			 }); 
		$('#endTime').datetimepicker({
			 datepicker:false,
			 format:'H:i',
			 step:60
			 });
		$('#breakTime').datetimepicker({
			 datepicker:false,
			 format:'H:i',
			 step:60
			 });
		
		getShiftmasterList();
	};
</script>
<script type="text/javascript">
	$(document).ready(function() {
		App.setPage("wizards_validations");
		App.init();
		//FormWizard.init();
	});
</script>

<script type="text/javascript">
	$(function() {

		$("#myform :input").tooltip({

			// place tooltip on the right edge
			position : "center right",

			// a little tweaking of the position
			offset : [ -2, 10 ],

			// use the built-in fadeIn/fadeOut effect
			effect : "fade",

			// custom opacity setting
			opacity : 0.7

		});

	});
	
	$('#collectionTime').datetimepicker({
		 datepicker:false,
		 format:'H:i',
		 step:5
		 }); 
</script>
<style>
#pleaseWait {
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 10000000;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	background-color: #272424;
	opacity: 0.7;
}
</style>
</head>
<body style="background: white ! important;">
	<section id="page">
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${sessionScope.userType != null }">


				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				
				</header>
				<!--/HEADER -->

				<%@include file="left_menu_roster.jsp"%>
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
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>	
											<li><a href="ehat_roster_dashboard.jsp"> Roster Management</a></li>
											<li> Shift Master</li>
											
											
											<div class="pull-right">
													<button class="btn btn-xs btn-success editUserAccess" 
													data-toggle="tooltip" data-placement="left" title="Save Shift Details"
													onclick="saveShiftMaster()">
													<i class="fa fa-save"></i>
													</button>
													<!-- <button class="btn btn-xs btn-danger" 
													data-toggle="tooltip" data-placement="left" title="New State Master"
													onclick="NewStateMaster()">
													<i class="fa fa-refresh"></i>
													</button> -->

												</div>
												</ul>
										</div>
										
			
										
									<div class='col-md-1-1' style="margin-left:253px">Search By:</div>
									<div class='col-md-1-1' style="margin-left:-30px">Shift Name</div>
									<div class='col-md-3-1' style="margin-left:-24px">
										<input class="col-md-12-1" name="userName" type="text"
											onkeyup="setAutoCompleteForshiftMaster(this.id,'search')"
											class="typeahead form-control input-SmallText " id="byName" />
									</div>
										
									</div>
					
							
							
							</div>
								
								<!-- /Common -->

								<div class="panel panel-default">
									<div class="panel-body">
										<div class="col-md-12-1">
											<div class="col-md-4-1" style="height: 450px; margin-top: 0%">

												<input id="narrMasterId" class="hidden">

												<div style='height: 100%; border: 1px solid #ddd;'>
													<div style='padding-top: 0%; padding-left: 8%'>
														<div>
															<h3 id='title'>Shift Master:</h3>
														</div>
														<div class='divide-20'></div>
														
														
														<div class='form-group Remove-Padding col-md-12-1 hidden'
															style='padding-right: 8px; margin-top: 9px;'>
															<div class='divide-20'></div>
															<label class='TextFont col-md-4-1'>Shift ID</label> <input
																id='shiftId' type='text' placeholder='Narration ID'
																style='background-color: #ddd',disabled="disabled";
																		class='form-control input-SmallText col-md-7-1'
																readonly='readonly' style='margin-left:0%;' value='0' />
																
																  <input id="shiftId" type="hidden" value="0" />
														</div>
														
														
														<div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 13px;'>
															<div class='divide-20'></div>
															<label class='TextFont col-md-4-1'>Shift Name<b
																style='color: red; padding-left: 3px;'>*</b></label> <input
																id='Shiftname' type='text' placeholder='Shift Name'
																
																class='form-control input-SmallText col-md-7-1'
																required='true' style='margin-left: 0%;' maxlength='150' />
														</div>
														<div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 13px;'>
															<div class='divide-20'></div>
															<label class='TextFont col-md-4-1'>Abbrevation<b
																style='color: red; padding-left: 3px;'>*</b></label> <input
																id='abbrevation' type='text' placeholder='Abbrevation'
																
																class='form-control input-SmallText col-md-7-1'
																required='true' style='margin-left: 0%;' maxlength='150' />
														</div>
														
														<div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 13px;'>
															<div class='divide-20'></div>
															<label class='TextFont col-md-4-1'>Location<b
																style='color: red; padding-left: 3px;'>*</b></label> <input
																id='location' type='text' placeholder='Location'
																
																class='form-control input-SmallText col-md-7-1'
																required='true' style='margin-left: 0%;' maxlength='150' />
														</div>
														
														<div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 13px;'>
															<div class='divide-20'></div>
															<label class='TextFont col-md-4-1'>Start Time<b
																style='color: red; padding-left: 3px;'>*</b></label> <input
															type="text" id="startTime" readonly="readonly"
															class="form-control input-SmallText col-md-7-1" style='margin-left: 0%;' />

														</div>
														
														<div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 13px;'>
															<div class='divide-20'></div>
															<label class='TextFont col-md-4-1'>End Time<b
																style='color: red; padding-left: 3px;'>*</b></label>
															
															
															 <select class="form-control input-SmallText col-md-4-1" id="sameDay" name="sameDay"
																	style='margin-left: 0%;'>
																	<option value="1">Same Day</option>
																	<option value="2">Next Day</option>
																</select>
															
															
														<!-- 	<input
															type="text" id="endTime" readonly="readonly"
															class="form-control input-SmallText col-md-3-1" style='margin-left: 0%;' /> -->
															 <input
															type="text" id="endTime" readonly="readonly"
															class="form-control input-SmallText col-md-3-1" style='margin-left: 5%;' />
													</div>
													
													<!-- <div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 13px;'>
															<div class='divide-20'></div>
															<label class='TextFont col-md-4-1'>Break Time<b
																style='color: red; padding-left: 3px;'>*</b></label>
															 <input
															type="text" id="breakTime" readonly="readonly"
															class="form-control input-SmallText col-md-7-1" style='margin-left: 0%;' />
													</div> -->
														
														
													</div>
												</div>

											</div>
											<div class="divide-10"></div>
											<div class="col-md-8-1"
												style="max-height: auto; padding-left: 15px;">

											
												<div class='col-sm-12-1'
													style='margin-top: 0px;'>
													<table class='table table-bordered table-condensed cf'>
														<tbody id="masterModuleBodyShift">

															

														</tbody>
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
		</c:if>
	</section>
	<%@include file="Footer.jsp"%>

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
	
</body>
</html>