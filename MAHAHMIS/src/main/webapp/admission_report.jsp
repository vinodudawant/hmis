<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Admission Report </title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
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
	<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
	<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
	
	
	<!-- JQUERY UI-->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
		
	<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/themes/default.css" id="skin-switcher" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/responsive.css" >
		
	<link href="ehat-design/font-awesome/css/font-awesome.min.css" rel="stylesheet">
		
	<!-- DATE RANGE PICKER -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
	
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
	<link rel="stylesheet" type="text/css" href="ehat-design/modal/css/component.css" />
	<!-- FONTS -->
	<!-- <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700' rel='stylesheet' type='text/css'> -->
		
	<script type="text/javascript" src="js/js.js"></script>
	<script type="text/javascript" src="js/validate.js"></script>
	<script type="text/javascript" src="js/Admin.js"></script>
	<script type="text/javascript" src="js/patient.js"></script>
	<script type="text/javascript" src="js/profees.js"></script>
	<script type="text/javascript" src="js/professionalFees.js"></script>
	<script type="text/javascript" src="js/profeesAdvance.js"></script>
	<script type="text/javascript" src="js/registration.js"></script>
		
	<!-- <script type="text/javascript" src="js/demoConfiguration2.js"></script> -->
	
	<!--calender Files  -->
	<script type="text/javascript"
		src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
	<link type="text/css" rel="stylesheet"
		href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
		media="screen"></link>
	
	
<!-- include js for development -->

<script>

	jQuery(document).ajaxStart(function() {		
		
		$("#pleaseWait").show();
	});
	
	jQuery(document).ajaxStop(function() {
		
		$("#pleaseWait").hide();
	});
	
	jQuery(document).ready(function() {		
		// added by vinod 
		getDocListUnitWise();
		getRefDoctors2();
		fetchAdmissionReport();
	});
	
</script>

</head>
<body>

<div id="pleaseWait" style="text-align: center;">
        <img style="margin-top: 250px;" height="43px" src="images/loading_black.gif"/>
        <div style="margin-top: 10px; color: white">
            <b>Please wait...</b>
        </div>
</div>
	<!-- HEADER -->
	<header class="navbar clearfix" id="header">

		<%@include file="Menu_Header_Nobel.jsp"%>
		
		<%
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
			String todays_date = formatter.format(currentDate.getTime());
		%>

	</header>
	<!--/HEADER -->

	<!-- PAGE -->
	<section id="page">
		<!-- SIDEBAR -->

		<%@include file="menu_report.jsp"%>

		<!-- /SIDEBAR -->
		<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12">
								<!-- PAGE HEADER-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">

											<ul class="breadcrumb col-md-12">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="ehat_daily_cash_report_dynamic.jsp">Reports</a></li>
												<li><a href="admission_report.jsp">Admission Report </a></li>
												<li class="pull-right">
													
													<button id="txtbtnReset" class="btn btn-xs btn-danger" value="Reset" onclick="proFeesResetReport('report')" title="" data-placement="left" data-toggle="tooltip" data-original-title="Reset">
															<!-- <i class="fa fa-print"></i> --> Reset
													</button>
													
													<!-- <button id="txtbtnPrint" class="btn btn-xs btn-warning" value="print" onclick="demoFromHTML()" title="" data-placement="left" data-toggle="tooltip" data-original-title="Print">
															<i class="fa fa-print"></i> Print
													</button> -->
													<button id="btnExport" class="btn btn-xs btn-success" value="Excel"  title="" data-placement="left" data-toggle="tooltip" data-original-title="Excel">
															<!-- <i class="fa fa-file"></i> --> Export To Excel
													</button>
													<!-- following code for Excel sheet -->
													<script type="text/javascript">
													/* $("[id$=btnExport]").click(function(e) {
													    window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$=divTestDashVoucherList]').html()));
													    e.preventDefault();
													}); */

													$(document).on('click', '#btnExport', function (e) {
														var clonedContent = $('div[id$=divTestDashVoucherList]').clone();

													    clonedContent.find('th').css({
													        'background-color': '#CCFF66',
													        'border': '1px solid black', // Add border to heading cells
													        	 'text-align': 'center',
													        	 'vertical-align': 'middle'
													    });

													    clonedContent.find('td').css({
													    	 'background-color': '#d3d3d3', 
													        'border': '1px solid black',
													        //'width': '100px', // Adjust width as per your requirement
													        	 'text-align': 'center',
													        	 'vertical-align': 'middle'
													    });
													    var result = 'data:application/vnd.ms-excel,' + encodeURIComponent(clonedContent.html());
													    var link = document.createElement("a");
													    document.body.appendChild(link);
													    link.download = "Admission Report.xls";
													    link.href = result;
													    link.click();
													});
													
													</script>
												</li>
											</ul>
										</div>
									</div>
								</div>


								<div class="panel panel-default">
									<div class="panel-body">



										<div id="diveMain" class="col-md-12-1">
											<!-- -------------------------------------------------------------------- -->

											<div id="divLine1" class="box border col-md-12" style="height: 120px">
												
												<div class="col-md-12">											
													<div class="col-md-3">
															<label class="TextFont">From Date<b style="color: red;">*</b></label> 
															<input id="fromDate" class="form-control input-SmallText"
																type="text" 
																onclick="displayCalendar(document.getElementById('fromDate'),'dd/mm/yyyy',this)"
																readonly="readonly" name="date" placeholder="From Date" value="<%=todays_date%>"> <%-- <%=todays_date%> --%>
																<!-- onchange="checkWithCurrentDate('payAll')" -->
														<div class="divide-20"></div>
													</div>
													
													<div class="col-md-3">
															<label class="TextFont">To Date<b style="color: red;">*</b> </label> <input
																id="toDate" class="form-control input-SmallText"
																type="text" onclick="displayCalendar(document.getElementById('toDate'),'dd/mm/yyyy',this)"
																 readonly="readonly" name="date" placeholder="To Date" value="<%=todays_date%>">
																<!--  onchange ="checkWithCurrentDate('ReportToProFees')" -->
														<div class="divide-20"></div>
													</div>

													<div class="col-md-3" id="mediclaimTypeDiv">
														<div class="form-group"  style="padding: 20px 0 0">
															<label><input
																name="mediclaimByRadio" id="chkSelf" type="radio"
																 value="1">Self</label>&nbsp&nbsp
															<label><input name="mediclaimByRadio" id="chkMediclaim"
																type="radio" value="2">MediClaim</label>
															<label><input name="mediclaimByRadio" id="chkAll"
																type="radio" checked="checked" value="3">All</label>
														</div>
													</div>

													<div class="col-md-1">
														<br>
														<button class="btn btn-xs btn-primary" type="button"
														data-toggle="tooltip" data-placement="left"  style="width: 100%;margin-top: 4px;"
														title="Show" onclick="fetchAdmissionReport()" type="button">
														<b> Show </b>
														</button>
													</div>
																											
												</div>
												<div class="col-md-12">
														
													<div class="col-md-3">
														<label><b>Admitted Under</b></label> <select id="doctorName"
															class=" input-SmallText"
															 style="width: 100%;">
														</select>
														<!-- onchange="chargesSlaveHideShow()" -->
													</div>

													<div class="col-md-3">
														<label><b>Reference Doctor</b></label> <select id="refBy"
															class=" input-SmallText"
															 style="width: 112%;">
														</select>
														<!-- onchange="chargesSlaveHideShow()" -->
													</div>

													<div class="col-md-3">
														<label><b>Patient Type</b></label> <select id="patientType"
															class="form-control input-SmallText"
															 style="width: 112%;">
															<option value=0>-select-</option>
															<option value=1>Hospital</option>
															<option value=2>Private</option>
														</select>
														<!-- onchange="chargesSlaveHideShow()" -->
													</div>
												
												</div>
											</div>

											<!-- -------------------------------------------------------------------- -->

											<div id="divTestDashVoucherList" class=" box border col-md-12"
												style="height: 350px; overflow-x: auto; overflow-y: auto; ">
												
												<!-- -----------Loading Images-------- -->
														<div style="display: none; overflow: hidden; margin-top:10%" id="ajaxloaderimg" class="center">
														<!-- 	<img src="/EhatEnterprise/images/ajax_loader_blue_64.gif"> -->
														</div>
												<!-- -----------Loading Images-------- -->
														
												<form class="form-horizontal col-md-12">
													
													<table border="1"  id="printTable" style="margin-top:20px;width: 2000px" bordercolor="#ddd">
															<%-- <colgroup>
															<col span="3" style="background-color: #EEEEEE">
														</colgroup> --%>
															
															<thead id="tableTestVoucherListHead" >

															</thead>
															<tbody id="tableTestVoucherList">

															</tbody>
														</table>
													
												</form>
											</div>

											<!-- ----------------------------------------------------------------------- -->

										</div>

									</div>
								</div>
							</div>
						</div>
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
	
	<script>
		jQuery(document).ready(function() {		
			App.setPage("wizards_validations");  //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});		
			
		});
	</script>
		
<!-- /JAVASCRIPTS -->
<input type="hidden" id="sourceType" value="1">
<input type="hidden" value="<%=session.getAttribute("userType")%>" id="userName" />
<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
<input type="hidden" id="hdnTotRemain" value="0">
<input type="hidden" id="hdnTotDisc" value="0">
<input type="hidden" id="patPrefix" value="0">
<input type="hidden" id="patMiddle" value="0">
<input type="hidden" id="patSufix" value="0">
</body>
</html>