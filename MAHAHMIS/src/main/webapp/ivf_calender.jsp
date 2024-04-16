<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="java.util.Calendar"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>IVF Calender</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->	
<!-- include js for development -->
	<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
	<!-- JQUERY -->
	<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
	<!-- JQUERY UI-->
	<script src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
	<!-- BOOTSTRAP -->
	<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
	<!-- JQUERY UI-->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/themes/default.css" id="skin-switcher" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/responsive.css" >
	<link href="ehat-design/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<!-- DATE RANGE PICKER -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
	<!-- FULL CALENDAR -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/fullcalendar/fullcalendar.min.css" />
<script type="text/javascript" src="ehat-design/js/fullcalendar/fullcalendar.min.js"></script>
	
	<!-- bootstrap datepicker -->
<link rel="stylesheet" href="ehat-design/datepicker/datepicker3.css">
<link rel="stylesheet" type="text/css"	href="css/inventoryDatepicker/css/jsDatePick_ltr.css" />
	<!-- SELECT2 -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
	<!-- TYPEAHEAD -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/typeahead/typeahead.css" />
	<!-- UNIFORM -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/uniform/css/uniform.default.min.css" />
	<!-- DATA TABLES -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />
<!--calender Files  -->
<script type="text/javascript"	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"	media="screen"></link>
	
	<!-- bootstrap datepicker new added  js-->
<script src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"	type="text/javascript"></script>
<
<!-- include js for development -->

<script type="text/javascript" src="js/ivf_calender.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<style>










</style>
</head>
<%
	java.util.Calendar currentDate = Calendar.getInstance();
	SimpleDateFormat dateformatter = new SimpleDateFormat("dd-MM-yyyy");
	String todays_date = dateformatter.format(currentDate.getTime());
	java.text.SimpleDateFormat dateformatter2 = new java.text.SimpleDateFormat("dd/MM/yyyy");
	String todays_date2 = dateformatter2.format(currentDate.getTime());
	
%>
<body>
	<c:if test="${ sessionScope.userType != null }">
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">

			<%@include file="Menu_Header_Nobel.jsp"%>

		</header>
		<!--/HEADER -->

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->

			<%@include file="left_menu_ivf.jsp"%>

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
											<li><i class="fa fa-home"></i> <a href="ivf_calender.jsp">IVF Calender</a></li>

										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row">

								
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">

											<div class="header-record-search">
												

												<div class="clearfix"></div>
											</div>

											<div class="panel panel-primary">
												<div class="panel-heading">IVF Calender :</div>
												<div class="panel-body">
												<!-- Start Ivf Calendar -->
															<div class="col-md-2 li pull-right">
																<button type="button" id="saveStudyRecordbtnIVF"
																	onclick="saveStudyRecordForIVF()" data-placement="left"
																	data-toggle="tooltip"
																	class="btn btn-success editUserAccess"
																	data-original-title="Save"
																	style="margin-left: 0px; margin: 3px 5px 0 0"
																	disabled="disabled">
																	<i class="fa fa-save"></i>
																</button>
																<button type="button" id="closeStudyRecordtbnIVF"
																	onclick="closeStudyRecordForIVF()" title='close'
																	data-placement="down" value="Close"
																	class="btn btn-primary editUserAccess"
																	data-toggle="tooltip" data-original-title="Close Study"
																	Style="margin: 3px 5px 0 0;" disabled="disabled">
																	<i class="fa fa-times"></i>
																</button>
																<button id="studyPrintBtnIVF"
																	data-original-title="Print" data-toggle="tooltip"
																	data-placement="left" title=""
																	onclick="printStudyDataForIVF('PRINT');"
																	class="btn btn-warning" style="margin: 3px 5px 0 0;">
																	<i class="fa fa-print"></i>
																</button>
																<!-- <button class="btn btn-danger" id="closePopUpbtnIVF"
																	onclick="closePopUpbtnForIVF()" aria-label="Close"
																	data-dismiss="modal" type="button"
																	style="margin: 3px 5px 0 0;" title="Close Pop Up">
																	<i class="fa fa-times"></i>
																</button> -->
																<button class="btn" id="cancelbtnIVF"
																	onclick="cancelIVFCycle()" title='cancel'
																	aria-label="Close" type="button"
																	style="margin: 3px 5px 0 0; background-color: #FFC0CB">
																	<i class="fa fa-times"></i>
																</button>
																<button class="btn" type="button" id="ovampickupbtnIVF"
																	data-placement="left" data-toggle="tooltip"
																	class="btn btn-info"
																	data-original-title="Ovam Pick Up "
																	onclick="openOvamPickUpForm()"
																	style="margin-left: 0px; margin: 3px 0 0 0;"
																	title="Ovam Pick Up">
																	<i class="fa fa-sign-in"></i>
																</button>
															</div>
															<div class="clearfix"></div>

															<div class="divide-20"></div>

															<div class="row">
																<div class="col-md-4 col-xs-11">
																	<h3 class="modal-title" id="myModalLabel">IVF
																		Calender</h3>
																</div>
																<br>
																<br>
																<div id="lmpDateDiv" class="col-md-3 col-xs-11">
																	<h5>LMP Date:</h5>
																	<input type="text"
																		style="margin-top: -25px; margin-left: 100px;"
																		class="form-control input-SmallText TextFont"
																		placeholder="LMP Date" name="lmpdtivf" id="lmpdtivf" onclick="displayCalendar(document.getElementById('lmpdtivf'),'dd/mm/yyyy',this)" readonly="readonly">
																</div>

															</div>
														


														<div class="modal-body"
															class="panel panel-info col-md-12-1">

															<div class="col-md-12" style="margin-top: 10px">
																<div class="panel panel-default">
																	<div class="panel-body" style="padding-top: 25px">
																		<div class="row">
																			<div class="col-md-6">

																				<div class="form-group col-md-3">
																					<label>Age</label> <input type="text"
																						class="form-control input-SmallText TextFont"
																						placeholder="Age" name="age" id="ageivf" value=""
																						style="width: 100%">
																				</div>

																				<div class="form-group col-md-3">
																					<label>Weight</label> <input type="text"
																						class="form-control input-SmallText TextFont"
																						placeholder="Weight" name="pWeight"
																						id="pWeightivf" value="" style="width: 100%" />
																				</div>

																				<div class="form-group col-md-3">
																					<label>Height</label> <input type="text"
																						class="form-control input-SmallText TextFont"
																						placeholder="Height" name="height" id="pHeightivf"
																						onkeyup="finalCalculatedBMIForIVF()" value=""
																						style="width: 100%" />
																				</div>

																				<div class="form-group col-md-3">
																					<label>BMI</label> <input type="text"
																						class="form-control input-SmallText TextFont"
																						placeholder="BMI" name="bmi" id="bmiivf" value=""
																						disabled
																						style="width: 100%; color: #FFF; background: blue">
																				</div>

																				<div class="form-group col-md-3">
																					<label>AFC</label> <input type="text"
																						class="form-control input-SmallText TextFont"
																						placeholder="AFC" name="afc" id="afcivf" value=""
																						style="width: 100%">
																				</div>
																				<div class="form-group col-md-3">
																					<label>RX</label> <input type="text"
																						class="form-control input-SmallText TextFont"
																						placeholder="Rx" name="Rx" id="Rxivf" value=""
																						style="width: 100%">
																				</div>

																				<div class="form-group col-md-3">
																					<label>HSG</label> <input type="text"
																						class="form-control input-SmallText TextFont"
																						placeholder="HSG" name="hsg" id="hsgivf" value=""
																						style="width: 100%">
																				</div>

																				<div class="form-group col-md-3">
																					<label>HSA</label> <input type="text"
																						class="form-control input-SmallText TextFont"
																						placeholder="HSA" name="hsa" id="hsaivf" value=""
																						style="width: 100%">
																				</div>

																				<div class="form-group col-md-6">
																					<label>Pick Up Date</label> <input type="text"
																						class="form-control input-SmallText TextFont"
																						placeholder="Pick Up Date" name="hsa"
																						id="pickUpDate" readonly="readyonly"
																						style="width: 100%">
																				</div>

																				<div class="form-group col-md-6">
																					<label>Embryo Transfer Date : </label> <input
																						type="text"
																						class="form-control input-SmallText TextFont"
																						placeholder="Embriyo Transfer Date" name="hsa"
																						id="embrioTDate" readonly="readyonly"
																						style="width: 100%">
																				</div>

																				<div class="form-group col-md-12">
																					<label>Protocol</label>
																					<textarea class="form-control"
																						placeholder="Protocol" name="prtocolof"
																						id="protocoloivf" rows="7" style="width: 100%"></textarea>
																				</div>
																			</div>

																			<div class="col-md-6">
																				<!-- CALENDAR -->
																				<div class="row">
																					<div class="col-md-12">
																						<!-- BOX -->
																						<div class="box border">
																							<div class="box-title">
																								<h4>
																									<i class="fa fa-calendar"></i>Calendar
																								</h4>
																								<div class="tools">
																									<a href="#box-config" data-toggle="modal"
																										class="config"> <i class="fa fa-cog"></i>
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
																								<div class="row">
																									<!-- <div class="col-md-3">
																													<div class="input-group">
																														 <input type="text" value="" class="form-control" placeholder="Event Event Title..." id="event-title" />
																														 <span class="input-group-btn">
																															<a href="javascript:;" id="add-event" class="btn btn-success">Add Event</a>
																														 </span>
																												    </div>
																													<div class="divide-20"></div>
																													<div id='external-events'>
																														<h4>Draggable Events</h4>
																														<div id="event-box">
																															<div class='external-event'>My Event 1</div>
																															<div class='external-event'>My Event 2</div>
																															<div class='external-event'>My Event 3</div>
																															<div class='external-event'>My Event 4</div>
																															<div class='external-event'>My Event 5</div>
																														</div>
																														<p>
																														<input type='checkbox' id='drop-remove' class="uniform"/> <label for='drop-remove'>remove after drop</label>
																														</p>
																													</div>
																												</div> -->
																									<div class="col-md-12">
																										<div id='calendar'></div>
																									</div>
																								</div>
																							</div>
																						</div>
																						<!-- /BOX -->
																					</div>
																				</div>
																				<!-- /CALENDAR -->
																			</div>
																		</div>
																	</div>
																</div>
															</div>



															<!-- <div class="col-md-12" id="basicStudyInfoTableIVF" style="height: 100px;" >
																	<input type='hidden' id="masterFollicularStudyIdIvf" value='' />
																		
																			<div class="col-md-6" style="margin-top: 25px;margin-bottom:20px;">
																				<div class="col-md-3">
																					<label>Age</label>	
																					<input type="text"  class="form-control input-SmallText TextFont"	placeholder="Age" 		name="age" 		id="ageivf" 		value="" style="margin-left:-5px;">	
																				</div>
																				
																				<div class="col-md-3">
																					<label>Weight</label>	
																					<input type="text"	class="form-control input-SmallText TextFont"	placeholder="Weight"	name="pWeight"	id="pWeightivf" 	value="" />
																				</div>
																				<div class="col-md-3">
																					<label>Height</label>
																					<input type="text"	class="form-control input-SmallText TextFont"	placeholder="Height"	name="height" 	id="pHeightivf"  onkeyup="finalCalculatedBMIForIVF()"	value="" />
																				</div>
																				<div class="col-md-3">
																					<label>BMI</label>		
																					<input type="text"	class="form-control input-SmallText TextFont"	placeholder="BMI" 		name="bmi" 		id="bmiivf" 		value="">
																				</div>
																				
																		</div>	
																		
																		<div class="col-md-6" style="margin-top: 25px;margin-bottom:20px;">	
																				
																				<div class="col-md-3">
																					<label>AFC</label>
																					<input type="text"	class="form-control input-SmallText TextFont"	placeholder="AFC" 		name="afc" 		id="afcivf" 		value="">		
																				</div>
																				<div class="col-md-3">
																					<label>RX</label>
																					<input type="text"  class="form-control input-SmallText TextFont"  placeholder="Rx"		name="Rx" id="Rxivf" value="">
																				</div>
																				<div class="col-md-3">
																				 <label>HSG</label>
																	  <input type="text"  class="form-control input-SmallText TextFont"  placeholder="HSG"	name="hsg" id="hsgivf" value="">
																				</div>
																				<div class="col-md-3">
																	<label>HSA</label> <input type="text"   class="form-control input-SmallText TextFont"  placeholder="HSA"
																		name="hsa" id="hsaivf" value="">
																</div>
																		</div>
																		</div>	
																		
																		
																		<br><br>
																		
																		<div class="col-md-12" style="margin-top: 1px;margin-bottom:20px;">
																		<div class="col-md-3">
																				<label>Protocol</label>
																				<textarea placeholder="Protocol" name="prtocolof"
																					id="protocoloivf" style="height: 85px;width: 212px"></textarea>
																			</div>
																			<div class="col-md-3">
																		<label>Pick Up Date</label> <input type="text"   class="form-control input-SmallText TextFont"  placeholder="Pick Up Date"
																		name="hsa" id="pickUpDate" value="" readonly="readonly">
																		</div>
																		<div class="col-md-3">
																		<label>Embriyo Transfer Date : </label> <input type="text"   class="form-control input-SmallText TextFont"  placeholder="Embriyo Transfer Date " onclick="displayCalendar(document.getElementById(this.id),'dd/mm/yyyy',this)"
																		name="hsa" id="embrioTDate" value="" readonly="readonly">
																		</div>
																	</div> -->
															<br>
															<br> <br>
															<br> <br>
															<br> <br>
															<br>

															<div class="" style="margin-top: 10px; float: right">

																<input type="button" value="+"
																	onclick="createRowForFollicularIVF()"
																	id="savebasicinfoivF" class="btn btn-xs btn-success" />
																<input type="button" value="-"
																	onclick="deleteBasicInfoIVFCalender('follicularStudyTabelivf','chkIvf')"
																	id="deletebasicinfoivF" class="btn btn-xs btn-danger" />&nbsp;

															</div>
															<div class="clearfix"></div>


															<div style="margin-top: 0px;">
																<div class="panel-body" id="studyModalTableF"
																	style="margin-bottom: -4%;">
																	<!-- <div class="pull-right"><input type="button" value="Save" onclick="saveCalenderInfoIVF()"  id="createdivF" class="btn btn-xs btn-success editUserAccess"  style="margin-top: -33px"> </div> -->
																	<!-- 	 <div class="" style="margin-top: -43px"><input type="button" value="+" onclick="createRowForFollicularIVF()" id="savebasicinfoivF" class="btn btn-xs btn-success" /> <input type="button" value="-" onclick="deleteBasicInfoIVFCalender('follicularStudyTabelivf','chkIvf')" id="deletebasicinfoivF" class="btn btn-xs btn-danger" />&nbsp;</div> -->
																	<div id="moveIVF">
																		<div class="col-sm-12-1 dynamicstructurescroll">
																			<table
																				class="table table-bordered table-striped table-condensed table-responsive"
																				id="follicularStudyTabelivf" style="height: 90px">
																				<thead>
																					<tr>
																						<th>#</th>
																						<th>Select</th>
																						<th>Day Count</th>
																						<th>Start Date</th>
																						<th>Days</th>
																						<th>End Date</th>
																						<th>Drug</th>
																						<th>Dose</th>
																						<!-- th ><input type="button" value="+" onclick="createRowForFollicularIVF()" id="savebasicinfoF" class="btn btn-xs btn-success" />&nbsp;
																									<input type="button" value="-" onclick="deleteBasicInfoIVFCalender('follicularStudyTabelivf','chkIvf')" id="deletebasicinfoF" class="btn btn-xs btn-danger" />&nbsp;
																									</th> -->
																					</tr>
																				</thead>
																				<tbody id="tableBodyForFollicularInfoIVF">
																				</tbody>
																			</table>

																		</div>
																	</div>
																</div>
																<!-- /panel-body -->
															</div>

															<div style="margin-top: 0px;">
																<div class="panel-body" id="studyModalTableF"
																	style="margin-bottom: -4%;">
																	<div style="width: 100%; height: 200px;" id="moveIVFC">
																		<div class="col-sm-12-1 dynamicstructurescroll">
																			<table
																				class="table table-bordered table-striped table-condensed table-responsive"
																				id="follicularStudyTabelivfC">
																				<thead>
																					<tr id="ivfbasicinfo2">
																						<!-- <th ></th> -->
																					</tr>
																					<tr id="ivfbasicinfo1">
																						<!-- <th ></th> -->
																					</tr>
																					<tr id="ivfbasicinfo">
																						<!-- <th >#</th> -->
																					</tr>
																				</thead>
																				<tbody id="tableBodyForFollicularInfoIVFC">
																				</tbody>
																			</table>
																		</div>
																	</div>
																</div>
																<!-- /panel-body -->
															</div>
														</div>

													

													<!-- End Ivf Calendar -->

												
											</div>
										</div>

									</div>
								</div>
					</div>
					<!-- /CONTENT-->
				</div>
			</div>			
			<div id="pleaseWait" style="text-align: center; display: none;">
				<img style="margin-top: 250px;" height="43px"
					src="images/loading_black.gif" />
				<div style="margin-top: 10px; color: white">
					<b>Please wait...</b>
				</div>
			</div>
			<%@include file="footer_nobel.jsp"%>
		</section>
		<!--/PAGE -->

		<!-- JAVASCRIPTS -->
		
	<script src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
	<!-- SLIMSCROLL -->
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	
	<!-- BLOCK UI -->
	<script type="text/javascript" src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>	
	<script type="text/javascript" src="ehat-design/js/autosize/jquery.autosize.min.js"></script>	
	<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
	<!-- TYPEHEAD -->
	<script type="text/javascript" src="ehat-design/js/typeahead/typeahead.min.js"></script>	
	<!-- UNIFORM -->
	<script type="text/javascript" src="ehat-design/js/uniform/jquery.uniform.min.js"></script>		
	<!-- DATA TABLES -->
	<script type="text/javascript" src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
	
	<!-- COOKIE -->
	<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>

	<script src="auto/jquery.mockjax.js"></script>
	<script src="auto/bootstrap-typeahead.js"></script>
	<!-- CUSTOM SCRIPT -->

	<script>
		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			getBasicStudyDataForIVFCalender();
			getIvfCalenderInfo();
			getOvamPickupDate();
			getEmbryoTransperDate();
			getPatientInfoByTreatIdOnIvfCalendar();
		});
	</script>
	<input type="hidden" id=donorTypeId value="0">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<input type="hidden" id="ivfCoupleId" value="<%=request.getParameter("ivfCoupleId")%>" />
	<input type="hidden" id="cycleNo" value="<%=request.getParameter("cycleNo")%>" />
	<input type="hidden" id="masterFollicularStudyId" value="<%=request.getParameter("masterFollicularStudyId")%>" />
	<input type="hidden" id="pt_Id" value="<%=request.getParameter("patientId")%>" />
	<input type="hidden" id="tr_Id" value="<%=request.getParameter("treatmentId")%>" />
	<input type="hidden" id="IVFTreatmentId" value="<%=request.getParameter("ivfTreatId")%>" />
	<input type="hidden" id="saveFrom" value="<%=request.getParameter("saveFrom")%>" />
		<input id="hiddenDate" type="hidden" /> <input type="hidden"			id="todays_date" value="<%=todays_date%>" />
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>