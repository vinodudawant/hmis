<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>

<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<title>Patient Records Details</title>

<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<link href="css/pop_up.css" rel="stylesheet" type="text/css" />

<script type="text/javascript"
	src="js/bootstrap-switch/bootstrap-switch.min.js"></script>
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-switch/bootstrap-switch.min.css" />

<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">

<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- TODO -->
<!-- FULL CALENDAR -->
<link rel="stylesheet" type="text/css"
	href="js/fullcalendar/fullcalendar.min.css" />
	
<link rel="stylesheet" type="text/css" href="css/sb-admin-2.css" />

<!-- ----for search  autosuggation  complete-------------- -->
<link rel="stylesheet" type="text/css"
    href="css/jquery-ui-1.10.3.custom.min.css" />
<!-- ----for search  autosuggation  complete-------------- -->

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

<!--TIMEPEACKER -->
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>

<!-- SELECT2 -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />

<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/uniform/css/uniform.default.min.css" />
<!-- WIZARD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-wizard/wizard.css" />

<!-- SELECT2 -->
	<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
	
	<!-- UNIFORM -->
	<script type="text/javascript"
		src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
	<!-- WIZARD -->

	
<!-- for Developers  -->

<!--DEVELOPERS JS -->
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/doctor.js"></script>
<script type="text/javascript" src="js/Dashboard.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript" src="js/markvisit.js"></script>
<script type="text/javascript" src="js/ehat_other_billing.js"></script>


<!-- Auto-Suggestion 1/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>  
<!-- bootstrap datepicker new added  csss-->
<link rel="stylesheet" type="text/css"
	href="css/inventoryDatepicker/css/jsDatePick_ltr.css" />
<script src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"
	type="text/javascript"></script>
<script src="css/inventoryDatepicker/js/jsDatePick.min.1.3.js"
	type="text/javascript"></script>
<script src="ehat-design/js/script.js"></script>
<!-- <script>
	jQuery(document).ready(function() {
		App.setPage("patientRecordsDetails"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script> -->


<script>
	
	//Date picker
    $('#dob').datepicker({
      autoclose: true
    });

	jQuery(document).ready(function() {		
		App.setPage("wizards_validations");  //Set current page
		App.init(); //Initialise plugins and elements
		FormWizard.init();
	});
</script>

<script>
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});
</script>

<script type="text/javascript">
	onload = function() {
		getAllPatientOtherBillingNew();	
		
		//setDocNameForOPD();
		$("#helpDesk").addClass("menuActive");
		$("#opd").addClass("anchorActive");
		$("#byName").val("");
		$("#byId").val("");
		setTimeout(function() {
			setAppoTimeWatchesForOPD("load");
		}, 100);
		//setAppoTimeWatchesForOPD();
		/* setTimeout(function() {
			setTreatmentDoneOPD();
		}, 200); */

		setAutoPatientName("byName", "onload", "patientRecordsDetails");
		
		
		fetchDoctorSpecilizationsForPatientRegistration();
		fetchHospitalDepartmentsForPatientRegistration();
		
		// Add By Amol Saware
		setInterval( function(){ setAppoTimeWatchesForOPD($('#fetchPatientRecord').val()); }, 30000 );
		
		new JsDatePick({
			useMode : 2,
			target : "iDate",
			/* dateFormat:"%d-%M-%Y", */
			yearsRange : [ 1920, 2099 ],
			limitToToday : false,
			/* cellColorScheme:"beige", */
			dateFormat : "%d/%m/%Y",
			imgPath : "../img/",
			weekStartDay : 1
		});
		$('#iDate .JsDatePickBox').css({'top':'8px','left':'100px'});

		$('#iTime').datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 15
		});
		
			
	
			setDocNameForEhatRegistration();
		
	}
</script>

</head>
<%@ page language="java" import="java.util.*" %> 
<%@ page import = "java.util.ResourceBundle" %>
<% ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
  String multipleConsultationFlow=resource.getString("multipleConsultationFlow"); %>
<body style="background: white ! important;">


	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	<c:if test="${sessionScope.userType != null }">

		<!-- HEADER -->
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header.jsp"%>
		</header>
		<!--/HEADER -->
		<section id="page">
			<%@include file="menu_HelpDesk.jsp"%>

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
											style="padding: 6px 10px; margin-top: 1px;">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="IPD_OPD_Database.jsp">Help Desk</a></li>
											<li>Other Billing </li>
										
										<div style="margin-left: 9px;" class="li pull-right hide" onclick="setPatient('cancel')">
											<span title="Total Checkup Cancel Today" data-placement="left" data-toggle="tooltip" class="badge" style="background-color: #FFCC80;cursor:pointer;color:green;"><i class="fa fa-times"></i> <i id="checkUpCancelToday">00</i> </span>
										</div>
										<div style="margin-left: 9px;" class="li pull-right hide" onclick="setPatient('out')">
											<span title="Total Checkup Done Today" data-placement="left" data-toggle="tooltip" class="badge" style="background-color: #ccffcc;cursor:pointer;color:black;"><i class="fa fa-check"></i> <i id="checkUpDoneToday">00</i> </span>
										</div>
										<div style="margin-left: 9px;" class="li pull-right hide" onclick="setPatient('in')">
											<span title="Current Checkup" data-placement="left" data-toggle="tooltip" class="badge" style="background-color: green;cursor:pointer;"><i class="fa fa-location-arrow"></i>  <i id="currentCheckUp">00</i> </span>
										</div>
										<div style="margin-left: 9px;" class="li pull-right hide" onclick="setPatient('load')">
											<span title="Total OPD Patient" data-placement="left" data-toggle="tooltip" class="badge" style="background-color: red;cursor:pointer;"><i class="fa fa-user"></i>  <i id="opdPatientCount">00</i> </span>
										</div>
										
										</ul>
										
									</div>
								</div>
							</div>
							<!-- /Common -->

							<div class="col-md-12-1">
								<div style="font-weight: bold;" class="col-md-1">Search
									By:</div>
								<div class="col-md-1-1">
									<label class="TextFont"
										style="margin-left: 10%; margin-top: 3%;">Patient
										Name:</label>
								</div>

								<div style="" class="col-md-2-1 TextFont" id="divbyName">
									<input name="byName" type="text" id="byName"
									placeholder="Patient Name/Mob.No/DOB"
										class="typeahead form-control input-SmallText"
									
										 onkeypress= "AutosuggestionForOPDqueOther(this.id,'auto'),clerpi()"/>
								</div> 
								<div class="col-md-1-1" style="margin-left: 0%;">
									<label class="TextFont"
										style="margin-left: 30%; margin-top: 3%;">Patient ID:</label>
								</div>

								<div style="padding-left: 0%;" class="col-md-2-1 ">
									<input name="byId" type="text" id="byId"
											placeholder="Patient ID:"
										class="form-control input-SmallText"
									    onkeypress="return SearchPatientIdOnEnter(event,'OPDQueue'),clerpn()" />
								</div>
								<div class="col-md-1-1" style="text-align: center;">
									<input type="button" value="search"
									
										class="btn btn-xs btn-primary" class="btn btn-xs btn-primary"
										onclick="AutosuggestionForOPDqueOther(this.id,'search')" />
								</div>
								<div class="col-md-2-1 hide">
									<input type="button" onclick="AdvSearch()" class="btn btn-xs btn-primary" value="Advanced Search">
								</div>
															
								<div class="col-md-offset-1 col-md-1-1 hide">
									<a target="_blank" href="help_desk_opd_queue.jsp" class="btn btn-xs btn-primary">Display LED</a>
								</div>
								
							</div>
							
							
							 <!-- <div class="colmd-12"> 
							  <div class="form-group">   
							  <label class="col-md-4 control-label" for="doctorName"></label>  
						      <div class="col-md-8">  
						      <select multiple id="doctorName" name="doctorName" class="col-md-12"  
						      	onchange="setSpecilizationAndDepartmentForRegistration()"> 
						      </select> 
						      </div> 
						      </div> 
						      </div>  -->

							<div class="divide-20"></div>
							<div class="panel panel-default">
								<div class="panel-body">
									<!-- <table class="table  cf "
										style=" margin-top: -12px; margin-bottom: 0px;">
										<thead class="cf" style="background: white;" id="headerDiv">
										</thead>
									</table> -->
									<div class="col-md-12-1"
										style="margin-top: 8px; padding-left: 0%; width: 100%;">
										<div class="col-md-12-1"
											style="overflow-y: auto; height: 331px; maxheight: auto; border: 1px solid #b8b8b8;">
											<!-- <table class="table  table-condensed cf"
												style="Width: 100%; line-height: 25px;">
												<tbody id="contain"> -->
												
													<div class='col-sm-12-1'>
													<table id="myTable" class='bill' style='width: 100%; margin-top: 10px'>
														<thead class='cf'>
															<tr >
																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>#</div></th>
																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Patient Name</div></th>
																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>UH ID</div></th>
																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Mobile No</div></th>
																		
																		<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>App.Date</div></th>
																			<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Token</div></th>
																		
																		<!-- <th class ='col-md-1-1 center' style=' height: 21.5px;'><div
																		class='TextFont'>Doctor</div></th> -->
																		<th class ='col-md-1-1 center' style=' height: 21.5px;'><div
																		class='TextFont'>Department</div></th>
																		
																		
																		<th class ='col-md-3-1 center' style=' height: 21.5px; '><div
																		
																		class='TextFont'>Dr Name</div></th>
																		<!-- class='TextFont'>Dr Name</div></th> -->
																		
																		<!-- <th class ='col-md-1-1 center' style=' height: 21.5px;'><div
																		class='TextFont'>Send</div></th> -->
																		
																		<th class ='col-md-1-1 center' style=' height: 21.5px;display: none;'><div
																		class='TextFont'>CasePaper</div></th>
																		
																		
																		
																	 <th class ='col-md-1-1 center' style=' height: 21.5px;'><div
																		class='TextFont'>Bill</div></th>
																	<!-- <th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Department Id</div></th> -->
																		<!-- <th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Treatment Id</div></th> -->
																		<!-- <th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Doctor Id</div></th> -->
																		<!-- <th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Cancel</div></th> -->
																	
																		
																<!-- <th class='numeric col-md-1-1 center'
																	style='height: 21.5px;'><div class='TextFont'>Edit</div></th>
																<th class='numeric col-md-1-1 center'
																	style='height: 21.5px;'><div class='TextFont'>Delete</div></th> -->
															</tr>
														</thead>
															<tbody id="container13"></tbody>
													</table>
												</div> 
												
												
												<!-- </tbody>
											</table> -->
										</div>
									</div>
									</div>
									</div>
						</div>
					</div>
				</div>
			</div>
				<!--*****************Print case paper***************-->
			<div id="iPopUpForPrintCasePaper" class="modal fade in" tabindex="-1">
				<div class="modal-dialog">
					<div class="modal-content col-md-8-1"
						style="margin-top: 123px; margin-left: 213px;">
						<div class="modal-header">
							<button class="btn btn-xs btn-danger" aria-label="Close"
								data-dismiss="modal" type="button"
								style="margin-top: -5px;; margin-left: 530px"
								onclick="closeCasePaperPrintPopup()">
								<i class="fa fa-times"></i>
							</button>
							<button class="btn btn-xs btn-warning" title="Print"
								style="margin-top: -37px; margin-left: 500px"
								" data-original-title="savepass " data-toggle="tooltip"
								data-placement="left" onclick="openCasePaperPrint();">
								<i class="fa fa-print"></i>
							</button>
							<input type="hidden" value="0" id="hiddenId"/>
							<h4 id="testHead" style="margin-top: -36px;">
								<i class="fa fa-print"></i> Print Case Paper :
							</h4>
						</div>
						<div class="modal-body" style="background-color: #ccffeb;">
							<div class="col-md-12-1">
								<div class="col-md-2-1">
									<input id="idPrintCasePaperWithHeader" type="radio" value="Standard"
										name="printType"> <b>Standard</b>
								</div>
								<div class="col-md-2-1">
									<input id="idPrintCasePaperWithoutHeader" type="radio" value="Custom"
										name="printType"> <b>Custom</b>
								</div>
								<div class="col-md-4-1">
									<input id="idPrintCasePaperStandardWithPhoto" type="radio" value="standardWithPhoto"
										name="printType"> <b>Standard With Photo</b>
								</div>
								<div class="col-md-4-1">
									<input id="idPrintCasePaperWithPhoto" type="radio" value="customWithPhoto"
										name="printType"> <b>Custom With Photo</b>
								</div>
								<div class="divide-40"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			
			
			
		<div id="AdvSearchPop" class="modal fade in" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content col-md-7"
				style="margin-top: 13%; margin-left: 13%;">
				<div class="modal-header">
					<div class="box-title">
						<h4 class="col-md-8-1">
							<i class="fa fa-search"></i> Advanced Search
						</h4>
						<div class="form-group col-md-4-1" style="float: right;">
							<button class="btn btn-xs btn-primary"
								onclick="searchDoctorWise();">
								<i class="fa fa-search"></i> Search
							</button>&nbsp;&nbsp;
							<button class="btn btn-xs btn-danger"
								onclick="hideAdvSearch();">
								<i class="fa fa-arrows"></i> Close
							</button>
						</div>
					</div>
				</div>

				<div class="modal-body col-md-12-1">
					<div class="col-md-4-1">
						<label class="input-SmallText">Doctor: 
						 <select id="igetDoc" onchange="setSpecilizationAndDepart()" name="getDoc" style="width: 98%; font-size: 11px; margin-top:10px;">
						 </select>
						</label>
					</div>

					<div class="col-md-4-1">
						<label class="input-SmallText">Specialization: 
						 <select id="igetSpec" name="getSpec" style="width: 98%; font-size: 11px; margin-top:10px;">
						 </select>
						</label>
					</div>

					<div class="col-md-4-1">
						<label class="input-SmallText">Department: 
						 <select id="igetDept" onchange="setDoctorsForDepart()" name="getDept" style="width: 98%; font-size: 11px; margin-top:10px;">
						 </select>
						</label>
					</div>
				</div>
			</div>
		</div>
	</div>
			
			<div><%@include file="Footer.jsp"%></div>
			<div style="display: none;" id="divDocId"></div>
			<div style="display: none;" id="appointedpatientDiv"></div>
			<div style="display: none;" id="treatmentDonePatientDiv"></div>
			<div style="display: none;" id="docListDiv"></div>
			<%-- 	<div  style="display: none;" id="userRole">${sessionScope.userType}</div>
 --%>
			<div style="display: none;" id="doctorObject"></div>
  			<div style="display: none;" id="specObject"></div>
  			<div style="display: none;" id="deptObject"></div>	
  			<div style="display: none;" id="cathConsTrolleyDiv"></div>
			<input style="display: none;" id="userRoleopd"
				value="${sessionScope.userType}" /> <input style="display: none;"
				id="userRoleName" value="${ sessionScope.userName }" />
			<div style="display: none;" id="pageType">opd</div>
			<input type='hidden' id="pageName" value='OPDOldPatientDatabase' />
			<input type="hidden" id="fetchPatientRecord" value="load" />
			<input type="hidden" id="pName" value="0" />
			<input type="hidden" id="pID" value="0" />
			<input type='hidden' id="count" value='0' />
			<input type='hidden' id="trId" value='0' />
			<input type='hidden' id="hiddenradiovalue" value='0' />  
			
			<input type='hidden' id="paid" value='0' />
			<input type='hidden' id="preDocId" value='0' />
			<input type='hidden' id="doctorId" value='0' />
			<input type='hidden' id="splId" value='0' />
			<input type='hidden' id="depId" value='0' />
			<input type='hidden' id="patIDLoad" value='' />
			<input type='hidden' id="patNameLoad" value='' />
			<div style="display: none;" id="conDocsList"></div>
			<input type="hidden" id="multipleConsultationFlow" value="<%=multipleConsultationFlow %>" />
		</section>
	</c:if>
</body>

<!--Cancel opd queue narration pop up-->
<div id="narrationModal" class="modal fade in" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content col-md-6-1"
			style="margin-top: 123px; margin-left: 213px;">
			<div class="modal-header">
				<button class="btn btn-xs" aria-label="Close" data-dismiss="modal"
					type="button" style="margin-top: -5px;; margin-left: 388px">
					<i class="fa fa-undo"></i>
				</button>
				<button id="saveNarration" class="btn btn-xs btn-save" title="Save"
					style="margin-top: -37px; margin-left: 360px"
					data-original-title="Save" data-toggle="tooltip"
					data-placement="left">
					<i class="fa fa-save"></i>
				</button>
				<h4 style="margin-top: -36px;">Narration:</h4>
			</div>
			<div class="modal-body">
				<div class="col-md-12-1">
					<div class="col-md-6-1" style="background-color: #ccffeb;">
						<textarea rows="3" cols="64" id="cancelNarration" type="textarea"
							name="txtNarration"></textarea>
					</div>
					<div class="divide-40"></div>
				</div>
				<div class="divide-40"></div>
			</div>
		</div>
	</div>
</div>
<!--********End of cancel opd queue narration pop up*******-->
<!--Consultation Docter pop up-->
<div id="divConsDoc" class="modal fade in" tabindex="-1"
				data-backdrop="static">
				<div class="modal-dialog">
					<div class="modal-content col-md-12-1"
						style="margin-top: 10px; margin-left: 50px;">
						<div class="modal-header">
							<div class="box-title">
								<h4> Consultation Details
									<div class="pull-right">
										<button id="iSaveConsultationDoctor" class="btn btn-success editUserAccess"
											onclick="saveConsultationDoctor()" value="insert">
											<i class='fa fa-save'></i>
										</button>
										<button class="btn btn-danger"
											onclick="closeConsultationPopUP();">
											<i class='fa fa-times'></i>
										</button>
									</div>
								</h4>

							</div>
						</div>

						<div class="modal-body">
							<table border="1"
								class="table table-bordered table-striped table-condensed">
								<thead>
									<tr style="background-color: transparent;">
									<th colspan="4">Patient ID:<span id="patIDSpan"></span></th>
									<!-- <th colspan="2">Patient Name:<span id="patNamSpan"></span></th> -->
                    				</tr>
									<tr>
										<th>Date</th>
										<!-- <th>Time</th> -->
										<th>Doctor</th>
										<th>Specialization</th>
										<th>Department</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><input type="text" id="iDate" name="iDate" readonly="readonly" class="form-control input-SmallText" onchange="checkFutureDate('multipleConsDoc')"/></td>
									<!-- 	<td><input type="text" id="iTime" readonly="readonly" class="form-control input-SmallText"/></td> -->
										<td><select id="iConsDoc" onchange="setSpecilizationAndDepartment(0)" style="width: 98%; font-size: 11px;"></select></td>
										<td><select id="iConsSpec" onkeypress="" style="width: 98%; font-size: 11px;"></select></td>	
										<td><select id="iConsDept" onkeypress="" style="width: 98%; font-size: 11px;"></select></td>
									</tr>
								</tbody>
							</table>

							<div class="title col-md-12-1"
								style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; margin-bottom: 1%; margin-top: 1%;">
								<label style="padding-top: 0px; margin-bottom: 0px; margin-right: 20px; margin-left: 20px; font-size: 10px;"
									 class="editUserAccess btn" onclick="addNewConsDoc()">
									<i class='fa fa-plus'></i> New Consultation Doctor</label> 
							
							</div>

							<div class="" id="consDocDiv" style="height: 300px; max-height: auto; margin-top: 8.3%; border: 1px solid #ddd;">
							<table border="1" class="table table-bordered table-striped table-condensed">
								<thead>
									<tr>
										<th>#</th>
										<th>Doctor Name</th>
										<th>Specialization</th>
										<th>Department</th>
										<th>App.Date</th>
										<th>Update/Delete</th>
									</tr>
								</thead>
								<tbody id="iConsDocTable">
									
								</tbody>
							</table>
							
							</div>

							<div class="modal-footer">
								<div class="form-group col-md-12-1 center"></div>
								<input type='hidden' id="commonAd_patId" value='0' />
								<input type='hidden' id="commonAd_treatId" value='0' />
								<input type='hidden' id="commonAd_receipt_type" value='advance' />
								<input type='hidden' id="sridname" value='N' />
							</div>
						</div>
					</div>
				</div>
			</div>
<!--********End Consultation Docter pop up*******-->

<audio id="audio" src="images/doorbell-1.wav" autostart="false" ></audio>
</html>




