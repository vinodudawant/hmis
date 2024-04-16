<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
   pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport"
         content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
      <meta name="description" content="">
      <meta name="author" content="">
      <meta name="viewport" content="user-scalable=no, width=device-width">
      <title>Manage Operation</title>
      <link href="ehat-design/js/select2/select2.min.css" type="text/css" rel="stylesheet">
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
      <script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>
      <script type="text/javascript"
         src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
      <script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
      <script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
      <script type="text/javascript" src="js/js.js"></script>
      <script type="text/javascript" src="js/operation.js"></script>
      <script type="text/javascript" src="js/validate.js"></script>
      <script type="text/javascript" src="bootstrap-dist/js/bootstrap.min.js"></script>
      <script type="text/javascript" src="bootstrap-dist/js/bootstrap.js"></script>
      <script type="text/javascript"
         src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
      <script type="text/javascript"
         src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
      <!-- BLOCK UI -->
      <script type="text/javascript"
         src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
      <!-- Auto-Suggestion 1/1/2015-->
      <script src="auto/jquery.mockjax.js"></script>
      <script src="auto/bootstrap-typeahead.js"></script>
      <!-- /for Developers  -->
      <script type="text/javascript"
         src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
      <!-- <link type="text/css" rel="stylesheet"
         href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
         media="screen"></link> -->
      <!--TIMEPEACKER -->
      <link rel="stylesheet" type="text/css"
         href="timepeacker/jquery.datetimepicker.css" />
      <script src="timepeacker/jquery.datetimepicker.js"></script>
      <!-- CUSTOM SCRIPT -->
      <!-- BOOTSTRAP WYSIWYG -->
      <script type="text/javascript"
         src="js/bootstrap-wysiwyg/jquery.hotkeys.min.js"></script>
      <script type="text/javascript"
         src="js/bootstrap-wysiwyg/bootstrap-wysiwyg.min.js"></script>
      <!-- CKEDITOR -->
      <script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>	
      <script src="js/script.js"></script>
      <script>
         /* jQuery(document).ready(function() {
         	App.setPage("operation"); //Set current page
         	App.init(); //Initialise plugins and elements
         }); */
      </script>
      <!--TIMEPEACKER -->
      <script type="text/javascript">
         onload = function() {
         	
         	fetchOTPercentage();
         //	fetchDepartmentForOTSchedule();
         	fetchAllService();
         	
         	
         
         }
      </script>
      <style>
         #teamMembersList {
         background-color: #e7e7e7;
         overflow: auto;
         }
         thead>tr , #teamMembersList {
         display: block;
         } 
      </style>
   </head>
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

								<!-- Page Date Print Discards-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
												<li><a href="operationTypeManagement.jsp">OT</a></li>
												<li><a href="OperationDashboard.jsp"> Manage
														Operation</a></li>
													<li style="padding-left: 45%;"><input type="radio" id = "sameBed"
													name="BedShift" value="sameBed" checked="checked"/>Same Bed <input
													name="BedShift" type="radio" value="newBed" id = "newBed" onclick="showBedShiftPopup()" />Bed Shift</li>
												</ul>
										</div>
									</div>
									<div class="box border col-md-12" style="height:500px;">
									<div class="box border col-md-12">
                  					<div class="form-row">
									<div class="form-group col-md-4">
									<div class="form-group col-md-6">
                                    <label class="TextFont" style="margin-top: 30px;">Select Combination Services</label>
                                    </div>
									<div class="form-group col-md-6" style="margin-top: 30px;">
                                    <div class="form-group">
										<div class="col-md-8">
											<select name="listmstrcom" id="listmstr_select_otcharges"
												style="width: 200px"
												onclick="setDyanamicDivot('dynamicItemcom',this.id,'OTPER')">
												<option id="firstElmtcom" value="0">--- Select Services---</option>
	
											</select>
										</div>
									</div>
									</div>
									</div>
									<div class="form-group col-md-7">
									<div class="form-group col-md-6" style="margin-top: 40px;">
                                    <div class="col-md-8">
                                    <div class="col-md-12 select2-container select2-container-multi">
                                    <ul id="dynamicItemcom" class="select2-choices" style="overflow-y: scroll;"></ul>
                                    </div>
                                    </div>
                                    </div>
                                    <div class="form-group col-md-6" style="margin-top: 30px;">
									<input type="button" value="search" class="btn btn-xs btn-primary" id="searchCharges" onclick="showDataOP()" />
									<button onclick="Saveotpercentage()" class="btn btn-xs btn-success editUserAccess">Save</button>
									</div>
									
									</div>
                  					</div>
								</div>
								<div class="box border col-md-12">
								<div class="form-group col-md-6" style="margin-top: 30px;">
								<div class="row">
								<div class="form-group col-md-12">
								<div class="box border primary">
									<div class="box-title">
										<h4 id="">
											<i class="fa fa-table"></i>Services
										</h4>
									</div>
									<div class="box-body"
										style="height: 300px; width: 100%;">
										<div class='col-sm-12-1' style="margin-top: 0%;">
											<table class='table table-bordered'
												style='width: 100%;'>
												<thead class='cf'>
													<tr>
														<th class=' center'
															style='height: 21.5px;width:14%'><div
																class='TextFont'>Surgeon</div></th>
														<th class=' center'
															style='height: 21.5px;width:14%'><div
																class='TextFont'>Percentage(%)</div></th>
													</tr>
												</thead>
											</table>
										</div>
										<div class='col-sm-12-1' style='height: 220px; width: 100%; overflow-y: scroll; border: 1px solid #ddd; margin-top: -21px;'>
											<table
												class='table table-striped table-condensed cf'>
												<tbody id="leftDiv">
												</tbody>
											</table>
										</div>
									</div>
								</div>
								</div>
								</div>
								</div>
								<div class="form-group col-md-6" style="margin-top: 30px;">
								<div class="row">
								<div class="form-group col-md-12">
								<div class="box border blue">
								<div class="box-title">
								<h4 id="">
									<i class="fa fa-table"></i>Charges Configuration
								</h4>
								<div class="pull-right"></div>
								</div>
								<div class="box-body" style="height: 297px;">
									<div class='col-sm-12-1' style="margin-top: 1%;">
										<table class='table table-bordered'
											style='width: 100%;'>
											<thead class='cf'>
												<tr>
												<th class=' center' style="width:14%">
												<div class='TextFont'>Surgeon</div></th>
												<th class=' center' style="width:14%">
												<div class='TextFont'>Percentage(%)</div></th>
												</tr>
											</thead>
										</table>
									</div>
									<div class='col-sm-12-1' style='height: 234px; overflow-y: scroll; border: 1px solid #ddd; margin-top: -21px;'>
										<table class='table table-striped table-condensed cf'>
											<tbody id="rightDiv" class="rightDivClass">
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
								 
                  </div>
                  
               </div>
               <!-- _____@author :  Touheed @date : 26-May-2016 @reason : CPOE(Start)_______ -->
               <!-- /*********************Code by Kavita Date-13/04/2016****************************/ -->
               <!-- /*********************modal for bed change and shift from billing****************************/ -->
               <div id="bedChangeShiftPopup" class="modal fade in" tabindex="-1"
                  data-backdrop="static">
                  <div class="modal-dialog">
                     <div class="modal-content col-md-12-1"
                        style="margin-top: 10px; margin-left: 50px;">
                        <div class="modal-header">
                           <div class="box-title">
                              <h4>
                                 Change Bed Details
                                 <div class="pull-right">
                                    <button class="btn btn-success"
                                       onclick="SaveOperationDetails()">
                                    <i class='fa fa-save'></i>
                                    </button>
                                    <button class="btn btn-danger"
                                       onclick="closeBedShiftPopup();">
                                    <i class='fa fa-times'></i>
                                    </button>
                                 </div>
                              </h4>
                           </div>
                        </div>
                        <div class="modal-body">
                           <div class="" id=""
                              style="height: 280px; max-height: auto; margin-top: 0%; border: 1px solid #ddd;">
                              <div id="" class="form-group col-md-12-1"
                                 style="float: right; margin-top: 1%; margin-bottom: 0%;">
                                 <!--Panel Body-->
                                 <div class="form-group col-md-3-1"
                                    style="margin: 0px; text-align: center;">
                                    <label class="checkbox-inline input-SmallText"
                                       style="padding-left: 20px;"> <input
                                       onclick="getallHallType('ipd_billing'),getBedAva('allBed')" 
                                       name="bedEditType"
                                       type="radio" id="radBillableBed1" value="BedChange">
                                    Bed Change
                                    </label>
                                 </div>
                                 <div class="form-group col-md-3-1"
                                    style="margin: 0px; text-align: center;">
                                    <label class="checkbox-inline input-SmallText"
                                       style="padding-left: 20px;"> <input
                                       onclick="getallHallType('ipd_billing'),getBedAva('allBed')" 
                                       name="bedEditType" type="radio"
                                       id="radBillableBed2" value="BedShift"> Bed Shift
                                    </label>
                                 </div>
                                 <div class="form-group col-md-3-1"
                                    style="margin: 0px; text-align: center;">
                                    <label class="checkbox-inline input-SmallText"
                                       style="padding-left: 20px;"> <input
                                       onclick="setBillableBed()" name="radBillableBed" type="checkbox"
                                       id="radBillableBed3" value="differentBed"> <label style="margin-top: 13px;margin-left: 5px;">Select Billable Bed
                                    Type</label>
                                    </label>
                                    </label>
                                 </div>
                                 <div class="form-group col-md-3-1"
                                    style="margin: 0px; text-align: center;">
                                    <label class="checkbox-inline input-SmallText"
                                       style="padding-left: 20px;"> <input
                                       name="isolation" type="checkbox" 
                                       id="isolation" value="isolation"> <label style="margin-top: 13px;margin-left: 5px;">Isolation</label>
                                    </label>
                                 </div>
                              </div>
                              <div id="" class="form-group col-md-12-1"
                                 style="float: right; margin-top: 3%; margin-bottom: 0%;">
                                 <div class="col-md-12-1"
                                    style="margin-left: 0%; margin-top: 10px;">
                                    <div class="col-md-4-1" style="padding-top: 9px;padding-left: 2%">
                                       <div class="form-group col-md-3-1">
                                          <label class='TextFont'>Ward</label>
                                       </div>
                                       <div id="" class="form-group col-md-9-1"
                                          style="padding: 0px 5px;">
                                          <select id='wardType' class='form-control input-SmallText'
                                             onchange="setHallTypeSelectID(this.value, 'samebed')"></select>
                                       </div>
                                    </div>
                                    <div class="col-md-4-1" style="padding-top: 9px;">
                                       <div class="form-group col-md-3-1">
                                          <label class='TextFont'>Hall</label>
                                       </div>
                                       <div class="form-group col-md-9-1">
                                          <select id="hallType" 
                                             class="form-control input-SmallText"
                                             onchange="setAvailableBeds(this.value, 'sameBed')" >
                                          </select>
                                       </div>
                                    </div>
                                    <div class="col-md-4-1" style="padding-top: 9px;">
                                       <div class="form-group col-md-3-1">
                                          <label class='TextFont'>Bed</label>
                                       </div>
                                       <div class="form-group col-md-9-1">
                                          <select id="bedName"
                                             class="form-control input-SmallText">
                                          </select>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div id="divWardType" class="form-group col-md-12-1"
                                 style="float: right; margin-top: 3%; margin-bottom: 0%; display: none;">
                                 <div class="col-md-12-1"
                                    style="margin-left: 0%; margin-top: 10px;">
                                    <div class="col-md-4-1" style="padding-top: 9px;padding-left: 2%">
                                       <div class="form-group col-md-3-1">
                                          <label class='TextFont'>Ward</label>
                                       </div>
                                       <div id="" class="form-group col-md-9-1"
                                          style="padding: 0px 5px;">
                                          <select id='billableWardType' class='form-control input-SmallText'
                                             onchange="setHallTypeSelectID(this.value, 'bllableBed')"></select>
                                       </div>
                                    </div>
                                    <div class="col-md-4-1" style="padding-top: 9px;">
                                       <div class="form-group col-md-3-1">
                                          <label class='TextFont'>Hall</label>
                                       </div>
                                       <div class="form-group col-md-9-1">
                                          <select id="billableHallType" 
                                             class="form-control input-SmallText"
                                             onchange="setAvailableBeds(this.value, 'billable')" >
                                          </select>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="modal-footer">
                              <div class="form-group col-md-12-1 center"></div>
                              <div id="allBedObj" style="display: none"></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <!-- 	/********end modal for Previous Pending Amount div*******/ -->
               <!--added by paras for geting usertype  -->
               <div style="display: none;" id="otproc"></div>
               <input type='hidden' value='0' id='totalchargesph'/>
               <input type='hidden' value='0' id='totalchargesinv'/>
               <input type='hidden' value='0' id='rcunt'/>
               <input type='hidden' value='0' id='totalchargescath'/>
               <input type='hidden' value='0' id='countshedule'/>
               <!-- <input type='hidden' value='0' id='idotherbill'/> -->
               <input type='hidden' value='N' id='inserv'/>
               <input type="hidden" id="updateop" value="insert" />
               <input type="hidden" id="deleteop" value="delete" />
               <input type="hidden" value="<%=session.getAttribute("userType")%>"
                  id="userType" />
               <input type="hidden"  value="<%=session.getAttribute("uId")%>" id="unitid" /> 
               <input id="treatmentId" type="hidden"
                  value="<%=request.getParameter("treatmentId")%>"
                  style="display: none;" /> <input type="hidden"
                  id="InvestigationQueryType" value="insert" /> <input
                  id="CPOE_TestDetails" style="display: none;" /> <input
                  type="hidden" id="CPOE_testId" value="" style="display: none;" />
               <!-- _____@author :  Touheed @date : 26-May-2016 @reason : CPOE (End)_______ -->
               <input type="hidden" id="Type" /> <input type="hidden"
                  id="treatmentoperationid" name="treatmentoperationid"
                  value="<%=request.getParameter("treatmentOPerationId")%>" /> <input
                  type="hidden" id="otID" name="otID" />
               <%@include file="footer_nobel.jsp"%>
            </div>
            <div id="divPatId" style="display: none;"><%=request.getParameter("myObj")%></div>
            <input type="hidden" id="docIds" value="" />
            <input type="hidden" id="editOP"
               value="<%=request.getParameter("editOP")%>" />
            <input type="hidden" id="anesthesisIds" value="" />
            <input type='hidden' id='typeOfOperation'
               value='<%=request.getParameter("type")%>' />
            <input type='hidden' id='tempQnt' value='0' />
            <input type='hidden' id='tempId' value='0' />
            <input type='hidden' id='topId' value='<%=request.getParameter("topId")%>' />
            <input type='hidden' id='tomId' value='<%=request.getParameter("tomId")%>' />
            <input type='hidden' id='pid' value='<%=request.getParameter("pid")%>' />
            <input type='hidden' id='operationDate' value='<%=request.getParameter("operationDate")%>' />
            <div id="teamList" style="display: none;"></div>
            <input type="hidden" id="userDocId" value="0" />
            <input type="hidden" id="teamMemberCount" value="0" />
            <input type="hidden" id="trid" value="0" />
            <input type="hidden" id="pageName" value="operation" />
            <input type='hidden' value='insert' id='idOTNote'/>
            <input type='hidden' value='insert' id='queryTypeOS'/>
            <input type='hidden' value='insert' id='queryTypeOD'/>
            <input type='hidden' value='insert' id='queryTypeOI'/>
            <input type='hidden' value='insert' id='queryTypeOTC'/>
            <!-- <input type='hidden' value='0' id='subIDs'/> -->
            <div id="subIDs" style="display: none;"></div>
            <div id="customizeTemplateDiv" style="display: none;"></div>
         </c:if>
         <c:if test="${sessionScope.userType == null}">
            <jsp:forward page="index.jsp"></jsp:forward>
         </c:if>
      </section>
   </body>
   <!-- =-=-=-=-Touheed multiselect plugin=-=-=-=-=- -->
   <!-- =-=-=-=-=-=Multiselect=-=-=-=-=-=-=-=- -->
   <!-- JAVASCRIPTS -->
   <!-- Placed at the end of the document so the pages load faster -->
   <!-- DATE RANGE PICKER -->
   <script src="ehat-design/js/bootstrap-daterangepicker/moment.min.js"></script>
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
   <!-- -=-=-=-=-=-=-=-=-=-=-=-=Multi select-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- -->
   <!-- -=-=-=-=-=Touheed Multiselect plugin-=-=-=-=-= -->
   <script>
      $('#txtStartTime').datetimepicker({
      	datepicker : false,
      	format : 'H:i',
      	step : 15
      });
      $('#txtEndTime').datetimepicker({
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
      
      $(document).ready(function() {
      	App.setPage("wizards_validations"); // Set current page
      	App.init(); // Initialise plugins and elements
      	FormWizard.init();
      });
      // multiselect ui
   </script>
</html>