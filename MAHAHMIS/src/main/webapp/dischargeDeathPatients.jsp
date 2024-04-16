<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Patient Details</title>
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
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/report_header.css" >
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
	
	<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>
	

<!-- include js for development -->
<script type="text/javascript" src="js/finance.js"></script>	

<style>

.tabledynamicscroll{
	max-height:400px;
	overflow:auto;
	scrollbar-width: thin;
}

</style>

<script type="text/javascript">
	onload = function() {
		searchDischargeDeathPatientList();
	};
</script>



</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
		<%
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
		String todays_date = formatter.format(currentDate.getTime());
	%>
		<!-- HEADER -->
		<header class="navbar clearfix navbar-fixed-top" id="header">

			<%@include file="Menu_Header_Nobel.jsp"%>

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
										<!-- STYLER -->
										<!-- /STYLER -->
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
												<li><a href="ehat_reg.jsp">Dashboard</a></li>
												<li><a href="dischargeDeathPatients.jsp">DischargeDeathReport</a></li>
										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-12">
								<input type="hidden" id="hospitalName" value=<%=session.getAttribute("hospitalName") %>>
									<div class="col-md-2">
										<span class="input-group-btn"> <label for="inlineFold"
											class="control-label">From Date : </label> <input type="text"
											class="form-control input-SmallText"
											onclick="displayCalendar(document.getElementById('fromDate'),'dd/mm/yyyy',this)"
											readonly="readonly" id="fromDate" placeholder="From Date" value="<%=todays_date%>">
										</span>
									</div>
									<div class="col-md-2">
										<span class="input-group-btn"> <label for="inlineFold"
											class="control-label">To Date : </label> <input type="text"
											class="form-control input-SmallText"
											onclick="displayCalendar(document.getElementById('lastDate'),'dd/mm/yyyy',this)"
											readonly="readonly" id="lastDate" placeholder="To Date" value="<%=todays_date%>">
										</span>
									</div>
									<div class="col-md-2">
										<span class="input-group-btn"> <label for="inlineFold"
											class="control-label">Select Type : </label> <select 
											class="form-control input-SmallText" id="dischargeType">
											<option value="All">All</option>
											<option value="Discharge">Discharge</option>
											<option value="Transferred">Transferred</option>
											<option value="DAMA">DAMA</option>
											<option value="Absconded">Absconded</option>
											<option value="Dead">Death</option>
											</select>
										</span>
									</div>
									<div class=" col-md-1 ">
										<input type="button" value="Search" class="btn btn-xs btn-primary"
											onclick="searchDischargeDeathPatientList()" style="margin-top: 20px;" />
									</div>
									<div style="font-weight: bold;" class="col-md-1">
										<button id="btnPrint" class="btn btn-xs btn-warning" value="Excel" title="" data-placement="left"
											data-toggle="tooltip" data-original-title="Excel" style="margin-left: 10px; margin-top: 20px;">Export To Excel
										</button>
										
										
										<!-- following code for Excel sheet 
											Added by Tushar Jadhav -->
										<script type="text/javascript">
											
										$(document).on('click', '#btnPrint', function (e) {
										var clonedContent = $('div[id$=diveMain]').clone();

										    clonedContent.find('th').css({
										        'background-color': '#CCFF66',
										        'border': '1px solid black', // Add border to heading cells
										        	 'text-align': 'center',
										        	 'vertical-align': 'middle'
										    });

										    clonedContent.find('td').css({
										    	 'background-color': '#d3d3d3', 
										        'border': '1px solid black',
										        'width': '100px', // Adjust width as per your requirement
										        	 'text-align': 'center',
										        	 'vertical-align': 'middle'
										    });
										    var result = 'data:application/vnd.ms-excel,' + encodeURIComponent(clonedContent.html());
										    var link = document.createElement("a");
										    document.body.appendChild(link);
										    link.download = "Discharge Death Report.xls";
										    link.href = result;
										    link.click();
										});

										</script>
									</div>
								</div>
							</div>
							
							<div class="divide-20"></div>
							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-primary">
									<div class="panel-heading">Patient Details</div>
										<div class="panel-body">
											<div class="row">
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row" style="">
															<div id="diveMain" class="col-md-12">
																<div class="col-sm-12">
																	<div class="pull-right">
																		<div id="datatable1_filter" class="dataTables_filter">
																			<label id="searchlabel"> </label>
																		</div>
																	</div>
																</div>
																<div id="ipdDiv" class="panel panel-default"
																	style="margin-top: 10px;">
																	<div class="panel-body " id="dischargeDeathTablee"
																		>
																		<div class="col-md-12 tabledynamicscroll" style="height:300px">
																		<table id="dischargeDeathTable" cellpadding="0" cellspacing="0"
																			border="0" style="background: Scrollbar; border-bottom: 1px solid black; border-top: 1px solid black;"
																			class="datatable  table table-striped  table-bordered">
																			<thead>
																				<tr>
																					<th class="col-md-1 center">Sr.No.</th>
																					<th class="col-md-1 center">UHID</th>
																					<th class="col-md-2 center">Patient Name</th>
																					<th class="col-md-1 center">Age</th> 
																					<th class="col-md-1 center">Gender</th> 
																					<th class="col-md-2 center">Address</th> 
																					<th class="col-md-1 center">Mobile No</th> 
																					<th class="col-md-1 center">Hospital Name</th>
																					<th class="col-md-1 center">Admission Date</th>
																					<th class="col-md-1 center">Admission Time</th>
																					<th class="col-md-1 center">Discharge Date</th>
																					<th class="col-md-1 center">Discharge Time</th>
																					<!-- <th class="col-md-1 center">Consulting Doctor</th> -->
																					<th class="col-md-1 center">Discharge Type</th>
																					<!-- <th class="col-md-1 center">Date of Positive Test Result</th> -->
																				</tr>
																			</thead>
																			<tbody id="dischargeDeathTableBody">
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
							<!-- /NEW ORDERS -->

						</div>

						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
							</span>
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
		});
	</script>
	
	<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>

