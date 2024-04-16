<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@page import="java.text.SimpleDateFormat"%>
 
<%@ page import="javax.servlet.http.HttpServletRequest"%>

<%@page import="java.util.Calendar"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>

<!-- For Prescription Multilple language -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
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



<!-- Added by vinod -->
<script type="text/javascript">

	//============================================================== 
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

		getBloodGroupListOnReg();

		getAllDoctorListForRegistartion();
		
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

		$('#getProfileDropdown').select2();

		$('#mobileAadhaarDropDown').select2();
		
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

	

	/* $(document).click(function() {
		$('input[type="file"]').ajaxfileupload({
			'action' : 'ehat/uploadregdoc/uploadDocument',
		});
	}); */
	
	//==============
	
	

	
	//===================================================================== 
	
</script>
</head>
<body>
<!--------------Pharma Stock Batch Details START ----  -->
		<div id="patient_sale_Batch_Pop_Up" class="modal fade in">
					<div class="modal-dialog" style="width: 54%;">
						<form action="">
							<div class="modal-content center" class="col-md-12">
								<div class="modal-header">
									<div class="box-title">
										<h4>
											<i class="fa fa-calendar"></i>BatchWise Product Information
										</h4>
									</div>
								</div>
								<div class="modal-body">
									<div class="col-md-12-1" style="margin-top: 9px;">
										<div class="col-md-2-1" style="margin-top: 0px;"></div>
									</div>

									<div class="col-md-12-1"
										style="height: 100%; width: 100%; padding-left: 0px;">
										<table id="ItemInfoTable" border="1"
											class="table table-bordered table-striped table-condensed"
											style="height: 100%; width: 100%;">
											<thead>
												<tr>
													<th class='col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>select Product</div></th>
													<th class='col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Batch Number</div></th>
												
													<th class=' col-md-2-1 center' style='height: 21.5px;'><div
															class='TextFont'>Expiry</div></th>

													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Stock</div></th>
												</tr>
											</thead>

										</table>
									</div>
									<div class='col-sm-12-1'
										style='height: 220px; width: 100%; overflow-y: scroll; border: 1px solid #ddd; margin-top: -21px;'>
										<table
											class='table  table-bordered table-striped table-condensed cf'>
											<tbody id="batchData1">
											</tbody>
										</table>
									</div>
									<!-- /BOX-->
								</div>
								<!-- /BODY-->
								<div class="modal-footer">
									<div class="form-group col-md-7-1" style="margin-top: 15px;">
										<button type="submit" class="btn btn-primary"
											id="btnSubContractingMaterialIssueSave"
											name="btnSubContractingMaterialIssueSave"
											onclick="setPopUpValuesot()" data-dismiss="modal">Ok</button>
										<button type="button" class="btn btn-default"
											data-dismiss="modal">Cancel</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
		<!--------------Pharma Stock Batch Details END ----  -->

</body>
</html>