<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<html lang="en">

<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<title>Assign Shift</title>

<!--Color Picker CSS-->
<link rel="stylesheet" type="text/css"
	href="js/colorpicker/css/colorpicker.min.css">
<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link rel="stylesheet" type="text/css"
	href="bootstrap-dist/css/bootstrap.min.css" media="screen">
<link rel="stylesheet" type="text/css"
	href="font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="css/datepicker.css"
	media="screen">
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css">

<!-- DATA TABLES -->
<link rel="stylesheet" type="text/css"
	href="js/datatables/media/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css"
	href="js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css"
	href="js/datatables/extras/TableTools/media/css/TableTools.min.css" />

<!-- FULL CALENDAR -->
<link rel="stylesheet" type="text/css"
	href="js/fullcalendar/fullcalendar.min.css" />
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>

<!--Small Cal-->
<link rel="stylesheet" type="text/css" charset="utf-8"
	href="css/scal.css">


<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="js/uniform/css/uniform.default.min.css" />
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />
<script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>
<script type="text/javascript"
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<!-- <script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script> -->
<!-- <script type="text/javascript" src="js/jquery-ui.js"></script> -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/HR.js"></script>

<script type="text/javascript" src="js/roster_management.js"></script>


<!-- New Js Files -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<!-- End New JS File -->

<!--TIMEPEACKER -->
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>


<link href="appointment/myTheme.css" rel="stylesheet" media="screen" />
<link href="appointment/defaultTheme.css" rel="stylesheet"
	media="screen" />
<link href="appointment/960.css" rel="stylesheet" media="screen" />
<script src="appointment/jquery.fixedheadertable.js"></script>

<!-- <link rel="stylesheet"
	href="http://netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<script
	src="http://netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script> -->


<!-- JAVASCRIPTS -->
<!-- Placed at the end of the document so the pages load faster -->

<!--Color Picker-->
<script type="text/javascript"
	src="js/colorpicker/js/bootstrap-colorpicker.min.js"></script>

<script type="text/javascript" src="bootstrap-dist/js/bootstrap.js"></script>

<!-- UNIFORM -->
<script type="text/javascript" src="js/uniform/jquery.uniform.min.js"></script>

<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
<!-- DATA TABLES -->
<script type="text/javascript"
	src="js/datatables/media/js/jquery.dataTables.min.js"></script>

<script type="text/javascript"
	src="js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
<script type="text/javascript"
	src="js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
<!-- FULL CALENDAR -->
<script type="text/javascript" src="js/fullcalendar/fullcalendar.min.js"></script>

<!-- COOKIE -->
<script type="text/javascript"
	src="js/jQuery-Cookie/jquery.cookie.min.js"></script>

<!-- AUTOSUGGESTION -->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<!-- SELECT2 -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />
<!-- SELECT2 -->
<script type="text/javascript"
	src="ehat-design/js/select2/select2.min.js"></script>
		
		
<script type="text/javascript">
	jQuery(document).ready(function() {
		App.setPage("calendar"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});

	});
				
</script>
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
		
		getAllRoleForHrr();
		//getRosterScheduleList();
		setTemplateOnAssignShift();
		getShiftmasterList();
		getShiftlist();
		getUserListFromType();
		getRosterList();
		//getShiftTypeallocation();
		
	}
	
	
</script>


<!-- /JAVASCRIPTS -->
</head>

<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd-MM-yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>
<body>

	<c:if test="${ sessionScope.userType != null }">
		<input type="hidden" id="todays_date" value="<%=todays_date%>" />
		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
		<!-- <div id="outer" class="container-main" style="width: 100%;"> -->
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header.jsp"%>
		</header>
		<!--/HEADER -->

		<section id="page">

			<%@include file="left_menu_roster.jsp"%>

			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header" style="height: 32px;">
										<ul class="breadcrumb col-md-12-1"
											style="padding: 4px 10px; margin-top: 1px;">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><a href="ehat_roster_dashboard.jsp"> Roster
													Management</a></li>
											<li>Assign Shift</li>
											<div class="li pull-right">
												<input type="hidden" value="0">
												<button class="btn btn-xs btn-danger editUserAccess" type='button'
													data-toggle="tooltip" data-placement="left"
													title="Add New Shift " value='Add New Shift'
													onclick='addNewShiftPopup()' style="margin-left: 9px;">
													<i class="fa fa-plus"></i>
												</button>
											</div>


										</ul>
									</div>
								</div>
							</div>
							<!-- /Common -->
							<div class="col-lg-12">
								<div class="panel panel-default">
									<!--Panel Body-->
									<div class="panel-body">
										<!-- PAGE HEADER-->
										<div class="row">
											<div class="tabable">

												<div>
													<div class="description"></div>
													<div class="divide-20"></div>
														<div class="col-sm-12-1">		
														
														<label
											class='TextFont col-md-1-1' style="margin-left: 2%;">Roster Type
											</label> <select id="rosterList"
											class="col-md-2-1"
											name="rosterList" style="margin-left: 0%;margin-top: -15px;" onchange="" ></select>
											
											<label
											class='TextFont col-md-1-1' style="margin-left: 2%;">Employee
											Type</label> <select id="userType"
											class="col-md-2-1"
											name="userType" style="margin-left: 0%;margin-top: -15px;" onchange="getUserListFromType();" ></select>
											<label
											class='TextFont col-md-1-1' style="margin-left: 2%;">Employee
											</label> <select id="employeeList"
											class="col-md-2-1"
											name="employeeList" style="margin-left: 0%;margin-top: -15px;" onchange="getRosterListOfEmployee();" ></select>
											
											


													</div>
													<div class="divide-10"></div>
												</div>
												<!--Module Tabs-->
												<div id="MainTabs" class="tab-content">
													<div class="divide-10"></div>
													<!-- New Patient Modal -->

													<!-- /New Patient Modal -->
													<div class="tab-pane fade in active" id="tab_Scheduler">
														<!--/Module Tabs-->

														<div class="row">
															<!--Doctor's List-->
															<div class="col-md-12">
																<form class="form-horizontal " action="#" style="overflow-y: scroll;">
																	<div class="divide-10"></div>


																	<table
																		class="table table-bordered table-striped table-condensed cf col-md-12-1">
																		<tbody id=tHeadDays>

																		</tbody>

																	</table>


																	<table class="table table table-bordered col-md-12-1">
																		<thead class="cf" id="tHeadDayss">
																			
																			
																		</thead>
																		<tbody id=setTimeDetails> 


																		</tbody>
																	</table>


																</form>

															</div>

															<!--Doctor's List-->
															<!-- CALENDAR -->



														</div>

													</div>

												</div>

												<!-- /CONTENT-->
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>

		</section>
		<!-- </div> -->
		<%@include file="Footer.jsp"%>

	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>


	<div id="useraddShiftPopUp" class="modal fade in" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog"
			style="width: 769px; height: 200px; margin-top: 75px">
			<div class="modal-content">
				<div class="modal-header">
					<div class="box-title" style="margin-left: 82px">
						<h4>Add New Shift</h4>
						<input id="deleteShift" type="button" value="Delete" class="btn btn-danger"	onclick="deleteShiftAllocation()" style="margin-left:551px;margin-top:-48px;display: none;"/>
						<button type="button" class="btn btn-default" id="closeDispecedpopup" onclick="hideaddShiftpopup1();" style="margin-left:610px;margin-top:-75px;">Close</button>
					</div>
					     
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12">
							<!-- BOX -->
							<div style="font-weight: 300px; margin-top: 0%" class="col-md-12-1">

								<div style="padding-right: 8px; margin-top: 8px;"class="form-group Remove-Padding col-md-12-1">
									<div class="divide-20"></div>
									 <label class="TextFont col-md-1-1" style="margin-left: 69px;margin-top:-21px">Schedule
										Type<b style="color: red; padding-left: 3px;">*</b>
									</label>  <select id="scheduleid"
										class="col-md-3-1" style="margin-top:-20px;margin-left:13px" onclick="callRosterSchedule()">
									</select><label class="TextFont col-md-1-1" style="margin-left: 104px;margin-top:-19px">Shift
										Type<b style="color: red; padding-left: 3px;">*</b>
									</label> <select id="shiftid"
										class="form-control input-SmallText col-md-3-1"
										onchange="getshiftmasterRecordset()" style="margin-top:-19px;margin-left: 22px">
									</select>
							<!-- temp -->
							<input type="hidden" value="0" id="SelectedDatesHidden"  />
									<input type="hidden" value="0" id="rosterscheduleId"  />	
								</div>



								<div style="padding-right: 8px; margin-top: -2px;"
									class="form-group Remove-Padding col-md-12-1">
									<div class="divide-20"></div>
									<label class="TextFont col-md-2-1"
										style="padding-left: 90px; margin-left: -8px"> Start
										Time<b style="color: red; padding-left: 3px;">*</b></label> <input type="text" style="margin-left: 4%;"
										class="form-control input-SmallText col-md-3-1"
										readonly="readonly" id="startTime" onclick="refreshonEmployeetypeAndEmployee()"> <input
										type="hidden" value="0" id="shiftallocationId"  />
									<label class="TextFont col-md-2-1"
										style="padding-left: 90px; margin-left: 40px;margin-top:-12px">End Time<b style="color: red; padding-left: 3px;">*</b></label>
									<input type="text" style="margin-left: 4%; margin-top:-7px"
										class="form-control input-SmallText col-md-1-1"
										readonly="readonly" id="endTime" onclick="refreshonEmployeetypeAndEmployee()"> <select
										style="margin-left: 2%; width: 70px; margin-top:-7px" name="sameDay"
										id="sameDay" class="form-control input-SmallText col-md-2-1">
										<option value="1">Same Day</option>
										<option value="2">Next Day</option>
									</select>
								</div>


								<div style="padding-right: 8px; margin-top: -4px;"
									class="form-group Remove-Padding col-md-12-1">
									<div class="divide-20"></div>
									<label class="TextFont col-md-1-1" style="margin-left: 80px">
										Name<b style="color: red; padding-left: 3px;">*</b>
									</label> <input type="text" maxlength="150" style="margin-left: 0%;"
										required="true"
										class="form-control input-SmallText col-md-3-1"
										placeholder="Name" id="name"> 
										<label class="TextFont col-md-1-1" style="margin-left: 127px;margin-top:-3px">Days<b
										style="color: red; padding-left: 6px;">*</b></label> <input
										type="text" maxlength="150" style="margin-left: 0%;margin-top:-4px"
										required="true"
										class="form-control input-SmallText col-md-3-1"
										placeholder="Date" id="date" readonly="readonly"
										onclick="displayCalendar(document.getElementById('date'),'yyyy-mm-dd',this)">
										
										
								</div>



								<div style="padding-right: 8px; margin-top: 11px;"
									class="form-group Remove-Padding col-md-12-1">
									<div class="divide-20"></div>
									
									
									<label class="TextFont col-md-1-1" style="margin-left: 80px;margin-top:-16px">Employee
										type<b style="color: red; padding-left: 3px;">*</b>
									</label> <select id="employeetype" class="col-md-3-1" style="margin-top:-16px"
										onchange="getUserListFromTypeOnPopUp();">
									</select> <label class="TextFont col-md-2-1" style="padding-left: 70px; margin-left: 40px">Employee<b
										style="color: red; padding-left: 3px;">*</b></label>
									
									 <select multiple id="employeeid" name="employee" class="col-md-6" style="width: 24%; margin-left: 12px; height: 28px;" onchange="checkTimeDateExitingEmployee()">
									</select>
									<input type="hidden" value="insert" id="queryType" />
								</div>

								<div style="padding-right: 8px; margin-top: 16px;"
									class="form-group Remove-Padding col-md-12-1">
									<div class="divide-20"></div>
									<label class="TextFont col-md-1-1"
										style="margin-left: 80px; margin-top: -19px"> Colour<b
										style="color: red; padding-left: 3px;">*</b></label> <select
										style="margin-top: -3%; width: 144px" name="colour"
										id="colourId" class="form-control input-SmallText col-md-2-1">
										<option value="green" style="background-color: green;">green</option>
										<option value="orange" style="background-color: orange;">orange</option>
										<option value="pink" style="background-color: pink;">pink</option>
										<option value="red" style="background-color: red;">red</option>
										<option value="yellow" style="background-color: yellow;">yellow</option>
									</select> 
									
									
									<label class="TextFont col-md-2-1" style="padding-left: 70px; margin-left: 183px">Location<b
										style="color: red; padding-left: 3px;">*</b></label> 
										<input 	type="text" maxlength="150" style="margin-left: 4%;"required="true"
										class="form-control input-SmallText col-md-3-1"
										placeholder="Location" id="location">

								</div>

								<!-- <div class="modal-header">
									<div class="box-title" style="margin-left:57px;margin-top:222px">
										<h4>Add Shift To</h4>
									</div>
								</div> -->


								<!-- <div class="col-md-12-1 "
										style="margin-top: 6px; margin-bottom: 10px; margin-left: 78px;">

										<input id="patienttype" type="radio" name="saletype"
											onclick="checkOnedays()" value="patient"> <b
											style="font-size: 13px;">One day only</b>&nbsp;&nbsp;&nbsp;&nbsp;<input
											id="Usertype" type="radio" name="saletype"
											style="margin-left: 2%;" onclick="chechAllDays()"
											value="user"> <b style="font-size: 13px;"> All
											days in schedule </b>&nbsp;&nbsp;&nbsp;&nbsp; <input
											id="Doctortype" type="radio" name="saletype"
											style="margin-left: 2%;" onclick="chehcsomeDays()"
											value="doctor"> <b style="font-size: 13px;">
											Following days</b>
									</div>
 -->


									<div class="col-md-12-1 "
										style="margin-top: 45px; margin-left: 131px">


	                                   <!-- <input id="sundays" type="checkbox" name="mondays"
											style="width: 41px" onclick="checkCountbyactiveButton()">
									
										
										<label style="word-wrap: break-word; font-size: 13px;">S</label>
										
										<input id="mondays" type="checkbox" name="mondays"
											style="width: 41px" onclick="checkCountbyactiveButton()">
		
										<label
											style="word-wrap: break-word; font-weight: normal; font-size: 13px;">M</label>
										<input id="tuesday" type="checkbox" name="mondays"
											style="width: 41px" onclick="checkCountbyactiveButton()">
										<label style="word-wrap: break-word; font-size: 13px;">T</label>
										<input id="wednesday" type="checkbox" name="mondays"
											style="width: 41px" onclick="checkCountbyactiveButton()">
										<label style="word-wrap: break-word; font-size: 13px;">W</label>
										<input id="thursday" type="checkbox" name="mondays"
											style="width: 41px" onclick="checkCountbyactiveButton()">
										<label style="word-wrap: break-word; font-size: 13px;">T</label>
										<input id="friday" type="checkbox" name="mondays"
											style="width: 41px" onclick="checkCountbyactiveButton()">
										<label style="word-wrap: break-word; font-size: 13px;">F</label>
										<input id="saturday" type="checkbox" name="mondays"
											style="width: 41px" onclick="checkCountbyactiveButton()">
										<label style="word-wrap: break-word; font-size: 13px;">S</label>
										 -->


                                      <input type="button" value="Submit" class="btn btn-primary"
											onclick="saveShiftAssignAllocation()" style="margin-left:156px"/>
										<button type="button" class="btn btn-default"
											id="closeDispecedpopup" onclick="hideaddShiftpopup1();">Close</button>
		

									</div>
                                  		

							</div>
                 <input type="hidden" value="0" id="selecteddays" />
                  <input type="hidden" value="0" id="selecteddate" />
                   <input type="hidden" value="0" id="tuesday" />
                    <input type="hidden" value="0" id="wednesday" />
                     <input type="hidden" value="0" id="thursday" />
                      <input type="hidden" value="0" id="friday" />
                       <input type="hidden" value="0" id="saturday" />
                     

						</div>
					</div>
				</div>
				<!-- /BODY-->

			</div>
		</div>
	</div>

	<div id="rosterSchedulePopUp" class="modal fade in" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog"
			style="width: 400px; height: 144px; margin-top: 120px">
			<div class="modal-content">

				<div class="modal-body">
					<div class="row">
						<div class="col-md-12">
						
							
										<h4>Add Shift To</h4>
									
								
								<div class="col-md-12-1 " style="margin-top: 6px; margin-bottom: 10px; margin-left: 75px;">
										
										<input
											id="Usertype" type="radio" name="saletype"
											style="margin-left: 2%;" onclick="chechAllDays()"
											value="user"> <b style="font-size: 13px;"> All
											days</b>&nbsp;&nbsp;&nbsp;&nbsp; <input
											id="Doctortype" type="radio" name="saletype"
											style="margin-left: 2%;" onclick="chehcsomeDays()"
											value="doctor"> <b style="font-size: 13px;">
											Following days</b>
									
								</div>

							<div class="col-md-12-1 "
								style="height: 144px; overflow-y: scroll;">
								<table class='table table-bordered table-condensed cf'>
									<tbody id="setDatetime">
									</tbody>
								</table>
							</div>


							<div class="col-md-12-1 " style="padding-top:15px;">
								<button type="button" class="btn btn-default"
									id="rosterSchedulePopUp" onclick="rotserSchedulehidepopup();"  style="margin-left:301px">Next</button>
							</div>





						</div>
				</div>
			</div>

		</div>
		</div>
	</div>




</body>
</html>