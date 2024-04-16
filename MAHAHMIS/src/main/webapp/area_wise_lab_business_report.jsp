<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Area Wise Lab Business Report</title>
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
	<!-- <script type="text/javascript" src="jquery/jquery.freezeheader.js"></script> -->

<script type="text/javascript" src="js/ExtraJs/lab_business_report.js"></script>

	
	<!--calender Files  -->
	<script type="text/javascript"
		src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
	<link type="text/css" rel="stylesheet"
		href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
		media="screen"></link>
	
	<!-- SELECT2 -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
	
<!-- include js for development -->

<script type="text/javascript">
	onload = function() {

		fetchAllCustomerTypes2();
		fetchCustomerType();
		fetchLabBusinessReport();
		//getBillRegisterReport();
		$('#custTypeForRegPage2').select2();
	}

	jQuery(document).ajaxStart(function() {
		//alert("hi ajax start");
		$("body").addClass("loading");
	})

	jQuery(document).ajaxStop(function() {
		$("body").removeClass("loading");
		//alert("hi ajax stop");
	})
	
	/* $(document).ready(function () {
            $("#tableid").freezeHeader({ 'height': '500px' });
        }) */
	
	
	
</script>
<style type="text/css">

/* Start by setting display:none to make this hidden.
   Then we position it in relation to the viewport window
   with position:fixed. Width, height, top and left speak
   speak for themselves. Background we set to 80% white with
   our animation centered, and no-repeating */
.ajaxmodal {
	display: none;
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('images/ajax_loader_blue_64.gif') 50% 50% no-repeat;
}

/* When the body has the loading class, we turn
   the scrollbar off with overflow:hidden */
body.loading {
	overflow: hidden;
}

/* body.table, td {
    border: thin solid black;
    text-align: center;
    font-weight: bold;
} */

/* Anytime the body has the loading class, our
   ajaxmodal element will be visible */
body.loading .ajaxmodal {
	display: block;
}

.select2-container-multi .select2-choices {
	min-height: 20px;
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
  <script>
    $(document).ready(function(){
        // Function to handle scrolling and fix the header
        $(window).scroll(function(){
            var sticky = $('#printTable'),
                scroll = $(window).scrollTop();

            if (scroll >= 50) sticky.addClass('fixed');
            else sticky.removeClass('fixed');
        });


       
    });
</script>
<style>
    /* CSS to style the frozen header */
    .sticky-header {
        position: sticky;
        top: 0;
        z-index: 1000; /* Ensure header stays above other content */
        background-color: #d3d3d3; /* Set background color */
    }
    
</style>
  <style>

.select2-container-multi .select2-choices {
	min-height: 70px;
	scrollbar-width: thin;
}
</style>
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
												<li><a href="area_wise_lab_business_report.jsp">Area Wise Lab Business Report</a></li>
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
													    var fileName = "Lab_Business_Report_"+ Date.now()+".xls"; // Specify your desired file name with extension

													    var clonedContent = $('div[id$=divTestServiceList]').clone();
														
													    clonedContent.find('th').css({
													        'background-color': '#CCFF66',
													        'border': '1px solid black', // Add border to heading cells
													        	 'text-align': 'center',
													        	 'vertical-align': 'middle'
													    });
			
													    clonedContent.find('td').css({
													    	 'background-color': '#d3d3d3', 
													        'border': '1px solid black',
													      //  'width': '100px', // Adjust width as per your requirement
													      //  'width': '100px',
													        	 'text-align': 'center',
													        	 'vertical-align': 'middle'
													    });
														
													   // var data = 'data:application/vnd.ms-excel,' + encodeURIComponent($('div[id$=divTestServiceList]').html());
													    var data = 'data:application/vnd.ms-excel,' + encodeURIComponent(clonedContent.html());
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

				<div id="diveMain" class="col-md-12-1 ">
											<!-- -------------------------------------------------------------------- -->
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

										<div class="col-md-3" id="mutliservicediv">

										<div class="col-sm-12">
											<label for="inlineFold" class="control-label">Select
												Customer Type </label>
										</div>

										<select multiple="multiple" id="custType"
										onchange="fetchCustomerTypeByUnitId(this.id,this.name)"	style="width: 100%">
											<!-- <option value="0">Select Organization</option> -->
										</select>
										
										

									</div>
								
								<div class="col-md-3" id="mutliservicediv">

										<div class="col-sm-12">
											<label for="inlineFold" class="control-label">Select
												Organization </label>
										</div>

										<select multiple="multiple" id="custTypeForRegPage2"
											style="width: 100%">
											<!-- <option value="0">Select Organization</option> -->
										</select>
										
										

									</div>
									
									<div class="col-md-2">
											<label class="TextFont">Select Dues</label> <select
												id="duesType" class="form-control input-SmallText">
												<option value="All"> All </option>
												<option value="FullPaid"> Full Paid </option>
												<option value="PartialPaid"> Partial Paid </option>
											</select>
											
											<label class="TextFont">Select Lab</label> <select
												id="labType" class="form-control input-SmallText">
												<option value="All"> All </option>
												<option value="INLAB"> IN-LAB </option>
												<option value="OUTLAB"> OUT-LAB </option>
												<option value="OPD"> OPD </option>
												<option value="IPD"> IPD </option>
												<option value="DIG"> DIG </option>
											</select>
										</div>
										
										
										<div class="col-md-1">
											<br>
											<button class="btn btn-xs btn-primary" type="button"
												data-toggle="tooltip" data-placement="left"
												style="margin-top: 4px;" title="Show"
												onclick="fetchLabBusinessReport()" type="button">
												<b>Show</b>
											</button>
										</div>
								
							</form>
									
									</div>
									

											<!-- -------------------------------------------------------------------- -->

											<div id="divTestServiceList" class=" box border col-md-12" 
												style="height: 400px; margin-top:10px; overflow-x: auto; overflow-y: auto; ">
												<!-- <div style="text-align: center; height:10px; color:black; font-size:10px;"> -->
												<!-- <b style="text-align: center; height:15px; color:black; font-size:15px;"> Head Wise Collection From :<i class="fa fa-arrow-down"></i>
														        <span id="dynamicFromDate"></span> to
														        <span id="dynamicToDate"></span>
														       <label style="text-align: right; float: right; margin-right: 20px";>Total Record:
														       <span id="totalRecord"></span></label></b> -->
												<!-- -----------Loading Images-------- -->
														<div style="display: none; overflow: hidden; margin-top:10%" id="ajaxloaderimg" class="center">
														<!-- 	<img src="/EhatEnterprise/images/ajax_loader_blue_64.gif"> -->
														
														
														</div>
												<!-- -----------Loading Images-------- -->
														
												<form class="form-horizontal col-md-12">
													<div class="col-sm-12-1">
													<table  border="1"  id="printTable" style="margin-top:20px;width: 2000px; ">
															
														<thead >
																	<tr class="sticky-header" style="background-color: #FFFFE0;">
																			<th class='col-md-1 center' >Sr.No.</th>
																			<th class='col-md-1 center' >Bill No</th>
																			<th class='col-md-1 center' >Patient Id</th>
																			<th class='col-md-1 center' >Date</th>
																			<th class='col-md-1 center' >Patient Name</th>
																			<th class='col-md-1 center' >Test Name</th>
																			<th class='col-md-1 center' >Patient Type </th>
																			<th class='col-md-1 center' >Payment Type </th>
																			<th class='col-md-1 center' >IN /OUT LAB </th>
																			<th class='col-md-1 center' >Organization Name </th>
																			<th class='col-md-1 center' >Test Heading Name</th>	
																			<th class='col-md-1 center' >Gross Amt </th>
																			<th class='col-md-1 center' >Discount Amt</th>
																			<th class='col-md-1 center' >Concession Amt </th>
																			<th class='col-md-1 center' > Net Amt</th>	
																			<th class='col-md-1 center' >Amount Paid</th>
																			<!-- <th class='col-md-1 center' >Refund amount</th> -->			
																			<th class='col-md-1 center' >Dues</th>
																			<th class='col-md-1 center' >Remark</th>
																			<th class='col-md-1 center' >Referral</th>
																																											
																		</tr>
																	</thead>
																	
																	<tbody id="container" style="font-weight: bold">

																	</tbody>
														</table>
													</div>
												</form>
											<!-- </div> -->

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