<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Service Wise Business Report Old </title>
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
	
	
	<!-- added by vishant for table column freeze -->
	
<script type="text/javascript" src="jquery/freeze-table.js"></script>
<script type="text/javascript" src="jquery/freeze-table.min.js"></script>

	
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
	<script type="text/javascript" src="js/service_head_report.js"></script>
	<!-- <script type="text/javascript" src="js/registration.js"></script> -->
		
	<!-- <script type="text/javascript" src="js/demoConfiguration2.js"></script> -->
	
	<!--calender Files  -->
	<script type="text/javascript"
		src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
	<link type="text/css" rel="stylesheet"
		href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
		media="screen"></link>
	
	<!-- SELECT2 -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
	
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
		//getDocListUnitWise();
		//getRefDoctors2();
		//fetchAdmissionReport();
		
		$('#chkRquisitionDate').prop('checked', 'checked');
        
      $('#chkBillDate').change(function() {
        if ($(this).prop('checked')) {
          $('#chkRquisitionDate').prop('checked', false);
        }
      });

      $('#chkRquisitionDate').change(function() {
        if ($(this).prop('checked')) {
          $('#chkBillDate').prop('checked', false);
        }
      });
		
		getAllDept();
		fetchServiceWiseBusinessReport('old'); 
		getAllServices();
		fetchChargesSlave();
		//getAllServicesForDrPer();
		$('#deptId').select2();
		$("#multiSubServicesIds").select2();

		 	var fromDateValue = document.getElementById('fromDate').value;
		    var toDateValue = document.getElementById('toDate').value;

		    document.getElementById('dynamicFromDate').textContent = fromDateValue;
		    document.getElementById('dynamicToDate').textContent = toDateValue;
	});


	
	
</script>

<script>
    $(document).ready(function(){
        // Function to handle scrolling and fix the header
        $(window).scroll(function(){
            var sticky = $('#headServiceWiseReport'),
                scroll = $(window).scrollTop();

            if (scroll >= 50) sticky.addClass('fixed');
            else sticky.removeClass('fixed');
        });


        $("#chkBillDate").click(function(){
            // New header text
            var newHeaderText = "Bill Date";
            // Select the table header element by its ID
            $("#nameChange").text(newHeaderText);
            // Alternatively, you can use .html() if you need to insert HTML content
            // $("#table_header").html("<b>New Header Text</b>");
          });

        $("#chkRquisitionDate").click(function(){
            // New header text
            var newHeaderText = "Rquisition Date";
            // Select the table header element by its ID
            $("#nameChange").text(newHeaderText);
            // Alternatively, you can use .html() if you need to insert HTML content
            // $("#table_header").html("<b>New Header Text</b>");
          });
    });
</script>
<style>
    /* CSS to style the frozen header */
    .sticky-header {
        position: sticky;
        top: 0;
        z-index: 1000; /* Ensure header stays above other content */
        background-color: #FFFFE0; /* Set background color */
    }
    
</style>
 <style>


.select2-container-multi .select2-choices {
	min-height: 70px;
	scrollbar-width: thin;
}
</style>

<!-- <script>
    // jQuery code to handle radio button toggling
    
    
    $(document).ready(function() {

    	$('#chkRquisitionDate').prop('checked', 'checked');
        
      $('#chkBillDate').change(function() {
        if ($(this).prop('checked')) {
          $('#chkRquisitionDate').prop('checked', false);
        }
      });

      $('#chkRquisitionDate').change(function() {
        if ($(this).prop('checked')) {
          $('#chkBillDate').prop('checked', false);
        }
      });
    });
  </script> -->

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

		<%@include file="ehat_finance_leftmenu.jsp"%>

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
												<li><i class="fa fa-home"></i> <a href="ehat_finance_dashboard">Home</a>
												</li>
												<li><a href="finance_dashboard.jsp">Siddhivinayak Report</a></li>
												<li><a href="service_head_report.jsp">Service Business Report </a></li>
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

													 $("[id$=btnExport]").click(function(e) {
													    var fileName = "Service Wise Report_"+ Date.now()+".xls"; // Specify your desired file name with extension

													    var data = 'data:application/vnd.ms-excel,' + encodeURIComponent($('div[id$=divTestServiceList]').html());
													    var link = document.createElement('a');
													    link.href = data;
													    link.download = fileName;
													    link.click();

													    e.preventDefault();
													}); 
													/*  $("[id$=btnExport]").click(function(e) {
													    window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$=divTesPatientList]').html()));
													    e.preventDefault();
													});  */
													
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
								
									<div id="divLine1" class="box border col-md-12"
										>
									<form class="form-horizontal col-md-12 ">	
										<div class="col-md-2">
											<label class="TextFont">From Date<b
												style="color: red;">*</b></label> <input id="fromDate"
												class="form-control input-SmallText" type="text"
												onclick="displayCalendar(document.getElementById('fromDate'),'dd/mm/yyyy',this)"
												readonly="readonly" name="date" placeholder="From Date"
												value="<%=todays_date%>">
										</div>

										<div class="col-md-2">
											<label class="TextFont">To Date<b style="color: red;">*</b></label>
											<input id="toDate" class="form-control input-SmallText"
												type="text"
												onclick="displayCalendar(document.getElementById('toDate'),'dd/mm/yyyy',this)"
												readonly="readonly" name="date" placeholder="To Date"
												value="<%=todays_date%>">
										</div>

										<div class="col-md-2">
											<label class="TextFont">Select Department</label> <select
												id="deptId" class="form-control input-SmallText"
												onclick="checkDepartmentShowHide(this.value);">
												<option value="0"> All Dept </option>
											</select>
										</div>
										
										<div class="col-md-3" id="mutliservicediv">

										<div class="col-sm-12">
											<label for="inlineFold" class="control-label">Select
												Service </label>
										</div>

										<select multiple="multiple" id="multiservicesIds"
											onchange="getAllSubServices('multiple');" style="width: 100%">
											
										</select>

									</div>
										
								<div class="col-sm-3" id="mutliservicediv">

										<div class="col-sm-12">
											<label for="inlineFold" class="control-label">Select Sub
												Service </label>
										</div>

										<select multiple="multiple" id="multiSubServicesIds"
											
											style="width: 100%">
											
										</select>

									</div>

										<!-- <div class="col-md-2">
											<label class="TextFont">Select Service</label> <select
												id="serviceId" class="form-control input-SmallText"
												<option value="0"> All Service </option>
												onchange="fetchSubServices();"></select>
										</div> -->
										
									</form>
									
									<form class="form-horizontal col-md-12 ">
									
										<div class="col-sm-3" id="mutlischemeParentDiv" style="margin-bottom: 20px;">

											<div class="col-sm-12">
												<label for="inlineFold" class="control-label">Select Parent
													Scheme </label>
											</div>

											<select multiple="multiple" id="multiSchemeParent"
												
												onchange="fetchChargesSlaveList('child');"
												style="width: 100%">

											</select>

										</div>
										
										<div class="col-sm-3" id="mutlischemeChildDiv" style="margin-bottom: 20px;">

											<div class="col-sm-12">
												<label for="inlineFold" class="control-label">Select
													Child Scheme </label>
											</div>

											<select multiple="multiple" id="multiSchemeChild"
												
												onchange="fetchChargesSlaveList(this.value);"
												style="width: 100%">

											</select>

										</div>	

										<div class="col-md-2" id="mediclaimTypeDiv">
											<div class="form-group" style="padding: 20px 0 0; margin-bottom: 20px;">
												<label><input name="checkTypeRadio" id="chkBillDate"
													type="radio" value="1">Bill Date</label>&nbsp&nbsp <label><input
													name="checkTypeRadio"  id="chkRquisitionDate" type="radio"
													value="2">Requisition Date</label>
											</div>
										</div>

										<div class="col-md-1">
											<br>
											<button class="btn btn-xs btn-primary" type="button"
												data-toggle="tooltip" data-placement="left"
												style="margin-top: 4px;" title="Show"
												onclick="fetchServiceWiseBusinessReport('old')" type="button">
												<b>Show</b>
											</button>
										</div>
										</form>
									</div>


									<!-- -------------------------------------------------------------------- -->

											<div id="divTestServiceList" class=" box border col-md-12"
												style="height: 350px; overflow-x: auto; overflow-y: auto; ">
												<div style="text-align: center; height:10px; color:black; font-size:10px;"><b style="text-align: center; height:15px; color:black; font-size:15px;"> Head Wise Collection From :<i class="fa fa-arrow-down"></i>
														        <span id="dynamicFromDate"></span> to
														        <span id="dynamicToDate"></span>
														       <label style="text-align: right; float: right; margin-right: 20px";>Total Record:
														       <span id="totalRecord"></span></label></b>
												<!-- -----------Loading Images-------- -->
														<div style="display: none; overflow: hidden; margin-top:10%" id="ajaxloaderimg" class="center">
														<!-- 	<img src="/EhatEnterprise/images/ajax_loader_blue_64.gif"> -->
														
														
														</div>
												<!-- -----------Loading Images-------- -->
														
												<form class="form-horizontal col-md-12 ">
													<div id="table-columns-only" class="table-multi-columns2" class="col-sm-12-1">
													<table  border="1"  id="printTable" style="margin-top:20px;width: 2000px;">
															<%-- <colgroup>
															<col span="3" style="background-color: #EEEEEE">
														</colgroup> --%>
															
														<thead id="headServiceWiseReport">
															<tr class="sticky-header" style="background-color: #FFFFE0;">
																<th class='col-md-1 center'>SR.NO</th>
																<th id="nameChange" class='col-md-3 center'>Requisition Date </th>
																<th class='col-md-1 center'>Bill No</th>
																<th class='col-md-2 center'>Patient Name</th>
																<th class='col-md-2 center'>Consultant Doctor</th>
																<th class='col-md-2 center'>Ref Doctor</th>
																<th  class='col-md-2 center'>Head Amt</th>
																<th class='col-md-1 center'>Concession</th>
																<th class='col-md-1 center'>Discount</th>
																<th class='col-md-1 center'>Collected Amt</th>
																<th class='col-md-1 center'>Dues</th>
																<th class='col-md-1 center'>Patient Type</th>
																
																
															</tr>
														</thead>
															<tbody id="tableServiceHeadReport" >

															</tbody>
														</table>
													</div>
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
<input type="hidden" id="obj" value="0">
<input type="hidden" value="<%=session.getAttribute("userType")%>" id="userName" />
<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
<input type="hidden" id="hdnTotRemain" value="0">
<input type="hidden" id="hdnTotDisc" value="0">
<input type="hidden" id="patPrefix" value="0">
<input type="hidden" id="patMiddle" value="0">
<input type="hidden" id="patSufix" value="0">
<input type="hidden" id="multiSchemeChildIds" value="0">
<input type="hidden" id="multiSchemeParentIds" value="0">
</body>
</html>