<!DOCTYPE html>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<html xmlns="http://www.w3.org/1999/xhtml">
   <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <title>OT Schedule</title>
      <meta name="viewport"
         content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
      <meta name="description" content="">
      <meta name="author" content="">
      <meta name="viewport" content="user-scalable=no, width=device-width">
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
      <link rel="stylesheet" type="text/css"
         href="css/jquery-ui-1.10.3.custom.min.css" />
      <link rel="stylesheet" type="text/css" href="css/datepicker.css"
         media="screen">
      <link rel="stylesheet" type="text/css"
         href="js/bootstrap-daterangepicker/daterangepicker-bs3.css">
      <!-- FULL CALENDAR -->
      <link rel="stylesheet" type="text/css"
         href="js/fullcalendar/fullcalendar.min.css" />
       <link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
      <script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>
       <script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
      <script type="text/javascript"
         src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
      <script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
      <script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
      <script type="text/javascript" src="js/js.js"></script>
      <script type="text/javascript" src="js/operation.js"></script>
      <script type="text/javascript" src="js/validate.js"></script>
      <script type="text/javascript" src="bootstrap-dist/js/bootstrap.min.js"></script>
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
      <!-- DATE RANGE PICKER -->
      <script type="text/javascript"
         src="js/bootstrap-daterangepicker/moment.min.js"></script>
      <script type="text/javascript"
         src="js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
      <script src="js/bootstrap-datepicker.js"></script>
      <!--calender Files  -->
      <script type="text/javascript"
         src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
      <link type="text/css" rel="stylesheet"
         href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
         media="screen">
      </link>
      <!-- COOKIE -->
      <script type="text/javascript"
         src="js/jQuery-Cookie/jquery.cookie.min.js"></script>
      <!-- AUTOSUGGESTION -->
      <script src="auto/jquery.mockjax.js"></script>
      <script src="auto/bootstrap-typeahead.js"></script>
      <!-- CUSTOM SCRIPT -->
      <script src="js/script.js"></script>
      <!--TIMEPEACKER -->
      <link rel="stylesheet" type="text/css"
         href="timepeacker/jquery.datetimepicker.css" />
      <script src="timepeacker/jquery.datetimepicker.js"></script>
      <style>
         #teamMembersList {
         background-color: #e7e7e7;
         overflow: auto;
         }
         /* #teamMembersList thead>tr{
         display: block;
         } */
         /* a:link { color:blue; text-decoration: underline; }
         a:visited { color:red; text-decoration: none; }
         a:hover { color:red; text-decoration: none; }
         a:active { color:green; text-decoration: underline; } */
      </style>
      <script type="text/javascript">
         jQuery(document).ready(function() {
         	App.setPage("calendar");
         	App.init();
         	$(function() {
         		$('[data-toggle="tooltip"]').tooltip();
         	});
         	
         	//Code for autosuggestion by Amol Saware
         	autoCompTableForOTScheduler("[]","txtPName");
         	autoCompTable("[]","userName");

         	getOperationName();
         	$("#OTManagement").addClass("menuActive");
         	$("#addOP").addClass("anchorActive");
         
         	$('input[name="radios"][value="radioRegular"]').prop('checked', true);
         	$('#totalDatabase').attr('checked', true);
         
         	var todays_date = $("#todays_date").val();
         	var arrDate = todays_date.split("-");
         	var date = arrDate[0] + "/" + arrDate[1] + "/" + arrDate[2];
         	$("#idTourDateDetails").val(date);
         	
         	
         	//setPatientNameAndId("onLoad");
         	
         	var todays_date = $("#todays_date").val();
         	var arrDate = todays_date.split("-");
         	var date = arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];
         	
         	$("#OT_Schedule").css("background-color", "#ced9ae");
         	viewOPerationPatient("OTSchedule");
         
         	fetchOperationTeamList('OTScheduler');
         	$("#patnameDiv").hide();
         	fetchPTNameForOtSchedule();
         	fetchOperationTheaterNames();
         	fetchDepartmentForOTSchedule();
         	fetchprocedureCatsedrvOT();
         	$('#calendar').html("");
         	$("#teamMemberCount").val(0);
         	
         	setTimeout(function() {
         		var userName = $("#user").val();
         		userName = userName.substring(0, 1).toUpperCase()
         				+ userName.substring(1, userName.length).toLowerCase();
         		$("#bookedBy").val(userName);
         	}, 500);
         	setTimeout(function() {
         		var editQuery = $("#editQuery").val();
         		if (editQuery == "update") {
             		// used to fetch the data for the update page for schedule operation
         			setOperationDetailsScheduler();
         		}
         		fetchotprocedure("shdule");
         	}, 200);
         });
         $(document).ready(function() {
         	$('#calendar ').fullCalendar({
         		defaultView : 'month'
         	});
         });
         var nowTemp = new Date();
         var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp
         		.getDate(), 0, 0, 0, 0);
         var checkin = $('#dpd1').datepicker({
         	onRender : function(date) {
         		return date.valueOf() < now.valueOf() ? 'disabled' : '';
         	}
         }).on('changeDate', function(ev) {
         	if (ev.date.valueOf() > checkout.date.valueOf()) {
         		var newDate = new Date(ev.date)
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
      </script>
      <script type="text/javascript">
         onload = function() {
         	$("#liappo").addClass("anchorActive");
         }
      </script>
      <script>
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
      </script>
      <!-- /JAVASCRIPTS -->
      <script type="text/javascript">
         onload = function() {
        	 $("#selOTName").select2();
         }
      </script>
   </head>
   <%
      Calendar currentDate = Calendar.getInstance();
      SimpleDateFormat dateformatter = new SimpleDateFormat("dd-MM-yyyy");
      String todays_date = dateformatter.format(currentDate.getTime());
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
                  <%@include file="Menu_Header_Nobel.jsp"%>
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
                                 <div class="page-header" style="margin: -10px -15px 15px">
                                    <ul class="breadcrumb col-md-12-1"
                                       style="padding: 4px 10px; margin-top: 1px;">
                                       <li>Date : <%=todays_date%></li>
                                       <li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
                                       <li><a href="operationTypeManagement.jsp">OT</a></li>
                                       <li><a href="OTScheduler.jsp">Schedule Operation</a></li>
                                       <div class="pull-right">
                                          <button class="btn btn-xs btn-primary"
                                             data-toggle="tooltip" data-placement="left"
                                             title="Schedule OT" onclick="showPopUp()">
                                          <i class="fa fa-calendar"></i>
                                          </button>
                                          <button class="btn btn-xs btn-success editUserAccess"
                                             data-toggle="tooltip" data-placement="left"
                                             title="Save OT Schedule "
                                             onclick="saveOperationByButton('save')">
                                          <i class="fa fa-save"></i>
                                          </button>
                                       </div>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                           <!-- Page Date Print Discards-->
                           <div class="col-lg-12">
                              <div class="panel panel-default" style="margin-left: -15px;">
                                 <!--Panel Body-->
                                 <div class="panel-body">
                                    <!-- PAGE HEADER-->
                                    <div class="row">
                                       <div class="tabable">
                                          <div id="myTabs">
                                             <ul class="nav nav-tabs mainTab" id="tabTodayschedule">
                                                <li class="active"><a href="#tab_OT_Schedule"
                                                   data-toggle="tab" id="OT_Schedule"
                                                   onclick="changeBackground()">OT Schedule</a></li>
                                                <li><a href="#tab_OT_Remark" id="OT_Remark"
                                                   data-toggle="tab">Remark & Description</a></li>
                                             </ul>
                                          </div>
                                          <!--Start First Panel -->
                                          <!--Module Tabs-->
                                          <div id="MainTabs" class="tab-content">
                                             <div class="divide-10"></div>
                                             <!-- New Patient Modal -->
                                             <div class="panel-body">
                                                <div class="tab-content">
                                                   <!--New Tab Appointment Starts-->
                                                   <div class="col-sm-12 tab-pane fade in active" id="tab_OT_Schedule" >
                                                   <div class="col-sm-4">
                                                   <div class="form-group col-md-12">
                                                   <div class="form-row" style="margin-top: 30px;">
                                                       <div class="form-group col-md-6">
                                                          <label class="TextFont">Booked By</label> <b style="color: red;">*</b>
                                                          <input id='bookedBy' name='bookedBy' value="" readonly="readonly" class="form-control input-SmallText" />
                                                       </div>
                                                       
                                                       <div class="form-group col-md-6">
                                                          <label class="TextFont">Suggested By</label> <b
                                                             style="color: red;">*</b><input id='suggestedBy'
                                                             name='suggestedBy' value=""
                                                             class="form-control input-SmallText" />
                                                       </div>
                                                       </div>
                                                    </div>
                                                    <div class="form-group col-md-12" id="divSearchRadios">
                                                    <div class="form-group col-md-3">
                                                    <label class="radio-inline TextFont">
												      <input name="radios1" id="chkopd" value="opd" type="radio" onclick="" style="margin-top: 0px;">OPD
												    </label>
												    </div>
												    <div class="form-group col-md-3">
                                                    <label class="radio-inline TextFont">
												       <input name="radios1" id="chkipd" value="ipd" type="radio" onclick="" style="margin-top: 0px;">IPD
												    </label>
												    </div>
												    <div class="form-group col-md-6">
                                                    <label class="radio-inline TextFont">
												      <input name="radios1" id="totalDatabase" value="total" type="radio" onclick="" style="margin-top: 0px;">Total Database
												    </label>
												    </div>
                                                    </div>
                                                    <div class="form-group col-md-12">
                                                    <div class="form-group col-md-6">
                                                     <label class="TextFont">Patient Name</label><b style="color: red;">*</b>
                                                     <div id="divtxtPName">
                                                        <input id='txtPName' onkeyup="getAllPatientRecordsdoctordesk1(this.id,'search')"
                                                           class="form-control input-SmallText" autocomplete="off" />
                                                     </div>
                                                  </div>
                                                  <div class="form-group Remove-Padding col-md-6">
                                                   <label class="TextFont" id="lblCenterPatientId">Patient Id</label>
                                                   <input id='mrnNo' readonly="readonly" name='' value="" class="form-control input-SmallText" / style="display: none;">
                                                   <input id='centerPatientId' readonly="readonly" name='' value="" class="form-control input-SmallText" />
                                                    </div>
                                                    </div>
                                                    <div class="form-group col-md-12">
                                                     <div class="form-group col-md-12">
                                                    <label class="TextFont">Priority</label>
                                                    <b style="color: red;">*</b>
                                                    </div>
                                                    <div class="form-group col-md-3">
                                                    <label class="radio-inline TextFont">
                                                    <input name="radios" id="radioRegular" value="radioRegular" type="radio" onclick="" style="margin-top: 0px;">Regular
                                                    </label>
                                                    </div>
                                                    <div class="form-group col-md-4">
                                                    <label class="radio-inline TextFont">
                                                    <input name="radios" id="radioEmergency" value="radioEmergency" type="radio" onclick="" style="margin-top: 0px;">Emergency
                                                    </label>
                                                    </div>
                                                    <div class="form-group col-md-5">
                                                    <label class="radio-inline TextFont">
                                                    <input name="radios" id="radioHighRisk" value="radioHighRisk" type="radio" onclick="" style="margin-top: 0px;">High Risk
                                                    </label>
                                                   </div>
                                                   </div>
                                                   </div>
                                                   <div class="col-sm-4">
                                                   <div class="form-group col-md-12">
                                                    <div class="form-row" style="margin-top: 30px;">
                                                    <div class="form-group col-md-6">
                                                    <label class="TextFont">Procedure Type</label>
                                                    <b style="color: red;">*</b>
                                                    <select name="" id="selOTtype" onchange="" class="form-control input-SmallText TextFont">
                                                    <option value="0">-SELECT-</option>
                                                    </select> 
                                                    </div>
                                                     <div class="form-group col-md-6">
                                                     <label class="TextFont">Procedure Group</label>
                                                     <b style="color: red;">*</b>
                                                     <select name="" id="department" onchange="getOperationName()" class="form-control input-SmallText TextFont">
                                                     <option value="0">-SELECT-</option>
                                                     </select> 
                                                     </div>
                                                    </div>
                                                   </div>
                                                   <div class="form-group Remove-Padding col-md-12" style="">
                                                     <div class="form-group Remove-Padding col-md-6-1" style="margin-top: 9px;display:none">
                                                        <label class="TextFont">Procedure Category</label>
                                                        <select id='opgrade' name='opgrade' class='form-control input-SmallText' >
                                                        </select>
                                                        <input id="departmentOT" type="hidden" value="0">
                                                     </div>
                                                  </div>
                                                  <div class="form-group col-md-12">
                                                  <div class="form-group col-md-10">
                                                    <!-- <label class="TextFont">Procedure Name</label> 
                                                    <b style="color: red;">*</b> 
                                                    <select name="" id="selOTName" onchange="fetchPTPG()" class="form-control input-SmallText TextFont">
                                                    <option value="0">-SELECT-</option>
                                                    </select> -->
                                                    <label>Procedure Name</label><b style="color: red;">*</b>
													<select style="width: 100%" id="selOTName" onchange="fetchPTPG()">
														<option value="0">-SELECT-</option>
													</select>
                                                 </div>
                                                 <div class="form-group col-md-1" style="margin-top: 10px;">
                                                 <button onclick="addProcedureNameToList('SCHEDULE')" class="btn btn-xs btn-default" style="line-height: 1.2">
                                                 <i class="fa fa-save"></i>
                                                 </button>
                                                 </div>
                                                  </div>
                                                   <div class="form-group col-md-12">
                                                   <div class="form-group col-md-12">
                                                   <label class="TextFont">Scheduled Procedure <b style="color: red;">*</b>&nbsp;&nbsp;&nbsp;&nbsp;<img width="18" height="18" src="images/minus.jpg" onclick="removeOperationNameFromList()"></label>
                                                   <select size="4" class="col-md-12-1" style="margin-top: 1px;" multiple="multiple" id="scheduledProcedure">
                                                   </select>
                                                   </div>
                                                   </div>
                                                   </div>
                                                   <div class="col-sm-4">
                                                   <div class="form-group col-md-12">
                                                   <div class="form-row" style="margin-top: 30px;">
                                                   <div class="form-group col-md-8">
                                                   <label class="TextFont">Date</label> <b style="color: red;">*</b>
                                                    <input type="text" readonly="readonly" id="idTourDateDetails" onclick="displayCalendar(document.getElementById('idTourDateDetails'),'dd/mm/yyyy',this)" class="form-control input-SmallText" name="idTourDateDetails" />
                                                   </div>
                                                   </div>
                                                   </div>
                                                   <div class="form-group col-md-12">
                                                   <div class="form-group col-md-6">
                                                      <label class="TextFont">OT Name</label> <b style="color: red;">*</b>
                                                      <select onchange="setOtNameOfPopup()" name="" id="otName" class="form-control input-SmallText TextFont">
                                                      </select>
                                                   </div>
                                                   <div class="form-group col-md-6">
                                                      <label class="TextFont">Anaesthesia Type</label><b style="color: red;">*</b> 
                                                      <select name="" id="anesthesiaType" class="form-control input-SmallText TextFont">
                                                         <option value="0">-SELECT-</option>
                                                         <option value="1">General</option>
                                                         <option value="2">Regional</option>
                                                         <option value="3">Local</option>
                                                         <option value="4">Spinel</option>
                                                         <option value="5">Epidural</option>
                                                         <option value="6">Brachcal block</option>
                                                         <option value="7">Block</option>
                                                         <option value="8">Sedetion</option>
                                                         <option value="9">Ankull Block</option>
                                                         <option value="10">Ring Block</option>
                                                         <option value="11">Femonel block</option>
                                                         <option value="12">Axilleny Block</option>
                                                         <option value="13">Epidural analgesia</option>
                                                         <option value="14">Peripheral nerve block</option>
                                                         <option value="15">Heavy sedation or monitored</option>
                                                         <option value="16">Spinal with Epidural with General</option>
                                                         <option value="17">Spinal with Epidural with Femonel block</option>
                                                         <option value="18">SAB</option>
                                                         <option value="19">Supraclaviculer Block + Spinal Block</option>
                                                         <option value="20">LA + MAC</option>
                                                         <option value="21">SGA</option>
                                                         <option value="22">SGA + SAB</option>
                                                         <option value="23">Supraclaviculer Block + Sedetion + SAB</option>
                                                         <option value="24">Spinal with Epidural with Femonel block</option>
                                                         <option value="25">Monitored Anaesthesia Care</option>
                                                      </select>
                                                   </div>
                                                   </div>
                                                   <div class="form-group col-md-12">
                                                   <div class="form-group col-md-6">
                                                      <label class="TextFont">Start Time</label><b style="color: red;">*</b>
                                                      <input type="text" id="timeFrom" class="form-control input-SmallText input-small" onchange="calculateDuration()" readonly="readonly" />
                                                   </div>
                                                   <div class="form-group col-md-6">
                                                   <label class="TextFont">End Time</label><b style="color: red;">*</b>
                                                   <input id='timeTo' onchange="calculateDuration()" name='' value="" class="form-control input-SmallText" readonly="readonly" />
                                                   </div>
                                                   </div>
                                                   <div class="form-group col-md-12">
                                                   <div class="form-group col-md-5">
                                                   <label class="TextFont">Duration</label>
                                                      <input id='durationHrs' readonly="readonly" name='' value="" class="form-control input-SmallText" />
                                                   </div>
                                                   <div class="form-group col-md-1">
                                                    <label class="TextFont"> &nbsp;</label>
                                                      <div class="input-group-btn">Hrs</div>
                                                   </div>
                                                    <div class="form-group col-md-4">
                                                      <label class="TextFont"> &nbsp;</label>
                                                      <input id='durationMin' readonly="readonly" name='' value="" class="form-control input-SmallText" />
                                                   </div>
                                                   <div class="form-group col-md-1">
                                                      <label class="TextFont"> &nbsp;</label>
                                                      <div class="input-group-btn">Mins.</div>
                                                   </div>
                                                   </div>
                                                   </div>
                                                   <div class="separator" style="margin-bottom: 3px; margin-top: 210px;"></div>
                                                    <div class="col-md-12">
                                                    <div class="form-row" style="margin-top: 30px;">
                                                    <div class="form-group col-md-3">
                                                       <label class="TextFont">Surgery Team</label><b style="color: red;">*</b>
                                                       <select name="" id="teanNameList" onchange="setTeamDoctorsNew('OT')" class="form-control input-SmallText TextFont">
                                                          <option value="0">-SELECT-</option>
                                                       </select>
                                                    </div>
                                                    <div class="form-group col-md-3">
                                                       <label class="TextFont">Doctor Type</label> 
                                                       <select name="" id="doctype" onchange = setUsetType(); class="form-control input-SmallText TextFont">
                                                          <option value="select">-Select-</option>
                                                          <option value="surgeon">Surgeon</option>
                                                          <option value="surgeon1">Surgeon 1</option>
                                                          <option value="surgeon2">Surgeon 2</option>
                                                          <option value="surgeon3">Surgeon 3</option>
                                                          <option value="asssurgeon">Assistant Surgeon</option>
                                                          <option value="assSurgeon1">Assistant Surgeon 1</option>
                                                          <option value="assSurgeon2">Assistant Surgeon 2</option>
                                                          <option value="assSurgeon3">Assistant Surgeon 3</option>
                                                          <option value="scrubNurse1">Scrub Nurse 1</option>
                                                          <option value="scrubNurse2">Scrub Nurse 2</option>
                                                          <option value="scrubNurse3">Scrub Nurse 3</option>
                                                          <option value="circulatingNurse1">Circulating Nurse 1</option>
                                                          <option value="circulatingNurse2">Circulating Nurse 2</option>
                                                          <option value="circulatingNurse3">Circulating Nurse 3</option>
                                                          <option value="anesthetist">Anaesthesiologist</option>
                                                          <option value="anaesthesiologist1">Anaesthesiologist 1</option>
                                                          <option value="anaesthesiologist2">Anaesthesiologist 2</option>
                                                          <option value="anaesthesiologist3">Anaesthesiologist 3</option>
                                                          <option value="assAnaesthesiologist1">Assistant Anaesthesiologist 1</option>
                                                          <option value="assAnaesthesiologist2">Assistant Anaesthesiologist 2</option>
                                                          <option value="assAnaesthesiologist3">Assistant Anaesthesiologist 3</option>
                                                          <option value="other">Other</option>
                                                       </select>
                                                       <input type="hidden" id = "type"  value = "select">
                                                    </div>
                                                    <div class="form-group col-md-5">
                                                       <label class="TextFont">Name</label>
                                                       <input id='userName'onkeyup="setAutoCompleteForDoctorName(this.id,'OTSchedule')" value="" class="form-control input-SmallText" autocomplete="off" />
                                                       <div style="display: none;" id = "selectedObj"></div>
                                                    </div>
                                                    <div class="form-group col-md-1" style="margin-top: 10px;">
                                                       <button onclick="addDoctorToScheduleOT('OTschedule')" class="btn btn-xs btn-success editUserAccess" style="line-height: 1.2">
                                                       <i class="fa fa-save"></i>
                                                       </button>
                                                    </div>
                                                    </div>
                                                    </div>
                                                    
                                                    <div class="box border  col-md-12" style="max-height: 200px; overflow: auto;">
                                                            <div class="form-group box-body">
                                                               <!-- Start Header for New Edit Delete Option -->
                                                               <div class="col-md-12" style="margin-top: 0px; background: #FFE0C2; border: 1px solid orange; padding-left: 3px;">
                                                                  <label class="TextFont" style="padding-top: 5px; padding-bottom: 5px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;">
                                                                  <i class="fa fa-users fa fw"></i> Scheduled Team
                                                                  </label>
                                                                  <label class="TextFont" style="padding-top: 5px; padding-bottom: 5px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;" onclick="removeDoctorNameFromList()">
                                                                  <i class="fa fa-minus-square fa fw"></i> Remove
                                                                  </label>
                                                               </div>
                                                               <div class="divide-20"></div>
                                                               <div class="col-md-12" style="overflow: auto;">
                                                                  <table class="table table-striped table-bordered" id="" style='margin-top: 9px;'>
                                                                     <thead>
                                                                        <tr>
                                                                           <th class='col-md-1 center'>
                                                                              <div>#</div>
                                                                           </th>
                                                                           <th class='col-md-2 center'>
                                                                              <div>Doctor Name</div>
                                                                           </th>
                                                                           <th class='col-md-1 center'>
                                                                              <div>User Type</div>
                                                                           </th>
                                                                           <th class='col-md-1 center'>
                                                                              <div>Speciality</div>
                                                                           </th>
                                                                           <th class='col-md-1 center'>
                                                                              <div>Department</div>
                                                                           </th>
                                                                           <th class='col-md-1 center'>
                                                                              <div>Doctor Type</div>
                                                                           </th>
                                                                           <th class='col-md-3 center'>
                                                                              <div>Contact No</div>
                                                                           </th>
                                                                           <th class='col-md-3 center'>
                                                                              <div>Email Id</div>
                                                                           </th>
                                                                           <th class='col-md-2 center'>
                                                                              <div>Action</div>
                                                                           </th>
                                                                        </tr>
                                                                     </thead>
                                                                     <tbody id="teamMembersList" style="max-height: 122px;">
                                                                     </tbody>
                                                                  </table>
                                                               </div>
                                                            </div>
                                                         </div>
                                                   </div>
                                                    <!--New Tab Appointment Ends-->
                                                   <!-- new remark and description tab code starts here -->
                                                   <div class="col-sm-12 tab-pane fade" id="tab_OT_Remark">
                                                   <div class='col-sm-12'>
                                                   <div class="form-row" style="margin-top: 30px;">
                                                   <div class="form-group col-md-3">
                                                   <label for="otherReference">Other Reference</label>
                                                    <input id='otherReference' name='otherReference' value="" class="form-control input-SmallText" />
                                                   </div>
                                                   <div class="form-group col-md-3">
                                                    <label for="otherReference">Contact of Reference</label>
                                                    <input id='contactOfReference' name='contactOfReference' value="" maxlength="10" class="form-control input-SmallText" onkeyup="return validateNumberByRegEx(this.id)" />
                                                   </div>
                                                   <div class="form-group col-md-3">
                                                   <label for="otherReference">Email ID Reference</label>
                                                   <input id='emailOfReference' name='emailOfReference' value="" class="form-control input-SmallText" />
                                                   </div>
                                                   <div class="form-group col-md-3">
                                                   <button onclick="sendEmailToReference()" class="btn btn-xs btn-info" style="line-height: 1.2">
									               <i class="fa fa-envelope"></i>
									               </button>
									               <button onclick="" class="btn btn-xs btn-warning" style="line-height: 1.2">
									               <i class="fa fa-mobile fa-lg"></i>
									               </button>
                                                   </div>
                                                    <div class="form-group col-md-6">
										               <label class="TextFont">Remark</label>
										               <textarea rows="4" cols="52" id="remark" name=""
										                  class="form-control"></textarea>
										            </div>
										           <div class="form-group col-md-3">
										               <label class="TextFont">Precaution</label>
										               <textarea rows="4" cols="52" id="precaution" name=""
										                  class="form-control"></textarea>
										            </div>
										            <div class="form-group col-md-3">
										               <label class="TextFont">Indication For
										               Surgery</label>
										               <textarea rows="4" cols="51"
										                  id="indicationForSurgery" name="" class="form-control"></textarea>
										            </div>
                                                       <div class="form-group col-md-12">
                                                          <label class="TextFont">Surgery Description</label>
                                                          <textarea rows="4" cols="173" id="surgeryDescription"
                                                             name="" class="form-control"></textarea>
                                                       </div>
                                                   </div>
                                                   </div>
                                                    
                                                   </div>
                                                   <!-- new remark and description tab code ends here -->
                                                </div>
                                                <!--tab content -->
                                             </div>
                                             <!--End First Panel body-->
                                          </div>
                                       </div>
                                       <!--tabable -->
                                    </div>
                                    <!--End First Panel -->
                                 </div>
                                 <!-- End id="content" -->
                                 <!--click Popup modal-->
                                 <div style="display: none;" class="popup modal fade in"
                                    id="popup" tabindex="-1" role="dialog"
                                    aria-labelledby="myModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" style="width: 70%">
                                       <div class="modal-content" class="col-md-11">
                                          <div class="modal-body" style="padding: 30px">
                                             <div id="MainTabs" class="tab-content">
                                             <!-- form-horizontal   -->
                                                <form class="col-md-12-1">
                                                   <div class="form-group col-md-5-1">
                                                      <div class="form-group col-md-7-1">
                                                         <label for="exampleInputEmail1" class="TextFont">OT
                                                         Name</label><select name="" id="otName2"
                                                            onchange="setOtNameOfPage()"
                                                            class="form-control input-SmallText TextFont">
                                                         </select>
                                                      </div>
                                                      <div class="divide-40"></div>
                                                      <div class="divide-20"></div>
                                                      <div class="form-group col-md-7-1">
                                                         <!-- <label for="exampleInputEmail1" class="TextFont">Date</label>
                                                            <input type="text" name="idTourDateDetails"
                                                            	class="form-control input-SmallText"
                                                            	id="idTourDateDetails" readonly="readonly"> -->
                                                      </div>
                                                      <div class="divide-40"></div>
                                                      <div class="divide-40"></div>
                                                      <div class="divide-40"></div>
                                                      <div class="divide-40"></div>
                                                      <div class="divide-40"></div>
                                                      <div class="divide-40"></div>
                                                      <div class="form-group col-md-12-1">
                                                         <div class="form-group col-md-3-1"
                                                            style="background-color: red; height: 25px;">
                                                            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                                         </div>
                                                         <div class="form-group col-md-8-1">
                                                            &nbsp;&nbsp;&nbsp;&nbsp;Booked
                                                         </div>
                                                      </div>
                                                      <div class="col-md-12-1">
                                                         <div class="col-md-3-1"
                                                            style="background-color: #31B404; height: 25px;">
                                                            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                                         </div>
                                                         <div class="col-md-3-1">
                                                            &nbsp;&nbsp;&nbsp;&nbsp;Selected
                                                         </div>
                                                         <div class="col-md-3-1 pull-right"></div>
                                                      </div>
                                                   </div>
                                                   <div class="form-group col-md-7-1">
                                                      <div id='calendar'></div>
                                                   </div>
                                                </form>
                                             </div>
                                          </div>
                                          <div class="modal-footer">
                                             <div class="divide-10"></div>
                                             <!-- <button class="btn btn-default btn-warning">Done</button> -->
                                             <button type="button" class="btn btn-default exit"
                                                data-dismiss="modal" onclick="closePopUp()">Close</button>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <!--/click Popup modal-->
                     </div>
                     <!-- End class="row" -->
                  </div>
                  <!-- class="container" -->
               </div>
               <!-- id="main-content" -->
            </div>
            <!-- id="outer" -->
            <div><%@include file="footer_nobel.jsp"%></div>
            <div style="display: none;" id="otshchedule"></div>
            <input type="hidden" id="txtHidTimeSlices" value="" />
            <input type="hidden" id="OTdata" value="" />
            <input type="hidden" value="0" id="hidpatId" />
            <input type="hidden" value="0" id="trid" />
            <input type="hidden" value="insert" id="queryType" />
            <input type="hidden" value="0" id="tropid" />
            <input type="hidden" id="docIds" value="" />
            <input type="hidden" id="anesthesisIds" value="" />
            <input type="hidden" id="tropmanageid" value="0" />
            <input type="hidden" id="todays_date" value="<%=todays_date%>" />
            <div id="teamList" style="display: none;"></div>
            <div id="opObject" style="display: none;"></div>
            <input type="hidden" id="userDocId" value="0" />
            <input type="hidden" id="user" value="${sessionScope.userName}" />
            <input type="hidden" id="userType" value="${sessionScope.userType}" />
            <input type="hidden" id="userId" value="${ sessionScope.userId}" />
            <input type="hidden" id="teamMemberCount" value="0" />
            <div id="divPatId" style="display: none"></div>
            <input type="hidden" value="<%=request.getParameter("editQuery")%>"
               id="editQuery" />
            <input type="hidden" value="<%=request.getParameter("treamentOpid")%>"
               id="treamentOpid" />
            <div id="divOTName" style="display: none"></div>
            <input type="hidden" id="pageName" value="updateScheduleOT" />
            <input type="hidden" value="<%=request.getParameter("otDate")%>"
               id="otDate" />
               
            <input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
         </c:if>
      </section>
   </body>
   <script>
      $('#timeFrom').datetimepicker({
      	datepicker : false,
      	format : 'H:i',
      	step : 15
      });
      $('#timeTo').datetimepicker({
      	datepicker : false,
      	format : 'H:i',
      	step : 15
      });
      $('#datetimepicker2').datetimepicker({
      	yearOffset : 222,
      	lang : 'ch',
      	timepicker : false,
      	format : 'd/m/Y',
      	formatDate : 'Y/m/d',
      	minDate : '-1970/01/02', // yesterday is minimum date
      	maxDate : '+1970/01/02' // and tommorow is maximum date calendar
      });
      var logic = function(currentDateTime) {
      	if (currentDateTime.getDay() == 6) {
      		this.setOptions({
      			minTime : '11:00'
      		});
      	} else
      		this.setOptions({
      			minTime : '8:00'
      		});
      };
   </script>
</html>