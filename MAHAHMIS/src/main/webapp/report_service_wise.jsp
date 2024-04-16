<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Advance Service Wise Report</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->

<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!-- JQUERY -->
<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
<!-- JQUERY UI-->
<script
	src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>

<!-- JQUERY UI-->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/cloud-admin.css">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/themes/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/responsive.css">
<link href="ehat-design/font-awesome/css/font-awesome.min.css"
	rel="stylesheet">
<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- SELECT2 -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />
<!-- TYPEAHEAD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/typeahead/typeahead.css" />
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/uniform/css/uniform.default.min.css" />
<!-- DATA TABLES -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-switch/bootstrap-datetimepicker.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />


<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>


<!-- include js for development -->
<script src="timepeacker/jquery.datetimepicker.js"></script>
<script type="text/javascript" src="js/servicewise_report.js"></script>
<script type="text/javascript" src="js/registration.js"></script>


<style>
table {
	text-align: left;
	position: relative;
	border-collapse: collapse;
	width: 1000px;
}

th, td {
	padding: 0.25rem;
}

tr.red th {
	background: red;
	color: white;
}

tr.green th {
	background: green;
	color: white;
}

tr.purple th {
	background: purple;
	color: white;
}

th {
	background: white;
	width: 1000px;
	position: sticky;
	top: 0;
	box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
}

.dynamicstructurescroll {
	max-height: 350px;
	overflow: auto;
	scrollbar-width: thin;
}

.select2-container-multi .select2-choices {
	min-height: 81px;
	scrollbar-width: thin;
}
</style>
</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
		<!-- HEADER -->
		<header class="navbar" id="header">
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
									<div class="page-header" style="height: 92%;">
										<!-- STYLER -->

										<!-- /STYLER -->
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a
												href="dd_opdDashBoard.jsp">Home</a></li>
											<li><i class="fa fa-home"></i> <a
												href="report_service_wise.jsp">Advance Service Wise
													Report</a></li>
											<li class="pull-right">

												<button class="btn btn-info btn-xs"
													id="btnExportServiceWise" data-placement="left"
													data-toggle="tooltip">Export Excel</button> <script
													type="text/javascript">
														$("[id$=btnExportServiceWise]").click(function(e) {

																			//getting values of current time for generating the file name
																			var dt = new Date();
																			var day = dt.getDate();
																			var month = dt.getMonth() + 1;
																			var year = dt.getFullYear();
																			var postfix = day + "." + month + "." + year;

																			//creating a temporary HTML link element (they support setting file names)
																			var a = document.createElement('a');
																			
																			//getting data from our div that contains the HTML table
																			var data_type = 'data:application/vnd.ms-excel';
																			var table_div =$('#servicewisetable').clone();

																			// Adding styles to the cloned content
																		    table_div.find('th').css({
																		        'background-color': '#CCFF66',
																		        'border': '1px solid black',
																		        'text-align': 'center',
																		        'vertical-align': 'middle'
																		    });

																		    table_div.find('td').css({
																		    	 'background-color': '#d3d3d3',
																		        'border': '1px solid black',
																		        'text-align': 'center',
																		        'vertical-align': 'middle'
																		    });
																			
																			// Convert the HTML content to a string
																			var table_html = table_div[0].outerHTML.replace(/ /g, '%20');

																			// Adding styles to the HTML content
																		    var styled_html = '<style>';
																		    styled_html += 'th, td { text-align: center; vertical-align: middle; }';
																		    styled_html += '</style>';
																		    table_html = styled_html + table_html;
																		    
																			//setting the file name
																			a.href = data_type + ', ' + table_html;
																			a.download = 'Advance_Service_Wise_Report_' + postfix + '.xls';

																			//triggering the function
																			a.click();
																			//just in case, prevent default behaviour
																			e.preventDefault();

																		});
													</script>
											</li>

											<li class="pull-right"><button
													class="btn btn-primary btn-xs"
													onclick="getServicewiseDetails()">
													Service Wise Report <i class="fa fa-spinner fa-spin"
														style="display: none;" id="spinnerLoader"></i>
												</button></li>
										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>

							<div class="row form-group text-center">
								<div class="col-md-12 form-group">

									<div class="col-md-2 form-group">
										<div class="col-sm-4">
											<label for="inlineFold" class="control-label">From</label>
										</div>
										<input type="text"
											class="form-control span6 input-mini search-query"
											placeholder="Date" name="date" readonly="readonly"
											onclick="displayCalendar(document.getElementById('servicewisefdate'),'yyyy-mm-dd',this)"
											id="servicewisefdate">
									</div>

									<div class="col-md-1 form-group">
										<div class="col-sm-1">
											<label for="inlineFold" class="control-label">From</label>
										</div>
										<input type="text" placeholder="Time" readonly="readonly"
											class="center form-control" id="servicewiseftime"
											onclick="getTime(this.id)">
									</div>

									<div class="col-md-2 form-group">
										<div class="col-sm-2">
											<label for="inlineFold" class="control-label">To </label>
										</div>
										<input type="text"
											class="form-control span6 input-mini search-query"
											placeholder="Date" name="date" readonly="readonly"
											onclick="displayCalendar(document.getElementById('servicewisetodate'),'yyyy-mm-dd',this)"
											id="servicewisetodate">
									</div>


									<div class="col-md-1 form-group">
										<div class="col-sm-1">
											<label for="inlineFold" class="control-label">To </label>
										</div>
										<input type="text" placeholder="Time" readonly="readonly"
											class="center form-control" id="servicewisetotime"
											onclick="getTime(this.id)">
									</div>
										
									<div id="doctorDiveGI" class="form-group col-md-3">
																	
																		<div class="col-md-8">
																	<label for="inlineFold" class="control-label">Select Doctor </label>
																</div>
																	<!-- <div class="col-md-8"> -->
																	<select id="doctorName"  name="doctorName"
																		class="col-md-8">
																		<option value="0">--Select Doctor--</option>
																		</select>
																		
									</div>
									<div class="form-group col-md-3">
									<div class="col-md-12">
																	<label for="inlineFold" class="control-label">Select Dept </label>
																</div>
																	
										<label class="checkbox-inline"> <input
											id="servicewise_opd" type="checkbox" value="1">OPD
										</label> <label class="checkbox-inline"> <input
											id="servicewise_ipd" type="checkbox" value="2">IPD
										</label> <label class="checkbox-inline"> <input
											id="servicewise_diago" type="checkbox" value="3">Diago
										</label>
																		
									</div>
																
								<!-- 	<div class="col-md-4 form-group">
										
										<div class="col-md-2">
											<label for="inlineFold" class="control-label">Select Dept </label>
										</div>
										
										<label class="checkbox-inline"> <input
											id="servicewise_opd" type="checkbox" value="1">OPD
										</label> <label class="checkbox-inline"> <input
											id="servicewise_ipd" type="checkbox" value="2">IPD
										</label> <label class="checkbox-inline"> <input
											id="servicewise_diago" type="checkbox" value="3">Diago
										</label>
									</div>
									 -->
												
									
									
							<!-- 	<div id="doctorDiveGI" class="form-group col-md-2" style="padding:0 0 0 4px">
																	<label for="email">Select Doctor Type:</label>
																	<div class="col-md-8">
																	<select id="doctorName"  name="doctorName"
																		class="col-md-8">
																		<option value="0">--Select Doctor--</option>
																		</select>
																		
																</div> -->

								<div class="col-md-12 form-group">

									<div class="col-md-2 form-group">
										<div class="divide-20"></div>
										<label for="inlineFold" class="control-label">Multiple
											Services </label> <label class="checkbox-inline"> <input
											class="multispcheck" type="checkbox" value=""
											onchange="changeMultiBox()">
										</label>

									</div>

									<div class="col-sm-2">

										<label for="inlineFold" class="control-label">Select
											Patient Type </label> <select
											class="form-control form-control-sm text-center"
											id="patienttype" onchange="onpatienttypechange()">
											<!--  <option value="0">--select Type--</option> -->
											<option value="3">All</option>
											<option value="1">Self</option>
											<option value="2">Sponsor</option>

										</select>

									</div>

									<div class="col-sm-4" id="singleservicediv" style="display: block;">

										<div class="col-sm-12">
											<label for="inlineFold" class="control-label">Select
												Service </label>
										</div>

										<select id="servicesforreport"
											onchange="getAllSubServices('single');" style="width: 70%">
											<option value="0">--Select Services--</option>
										</select>

									</div>

									<div class="col-sm-4" id="singlesubservicediv" style="display: block;">

										<div class="col-sm-12">
											<label for="inlineFold" class="control-label">Select
												SubService </label>
										</div>

										<select id="subservicesforreport" style="width: 70%">
											<option value="0">--Select SubServices--</option>
										</select>

									</div>

									<!-- multiple -->

									<div class="col-sm-4" id="mutliservicediv"
										style="display: none">

										<div class="col-sm-12">
											<label for="inlineFold" class="control-label">Select
												Service </label>
										</div>

										<select multiple="multiple" id="multiservicesforreport"
											onchange="getAllSubServices('multiple');" style="width: 100%">
											<option value="0">--Select Services--</option>
										</select>

									</div>

									<div class="col-sm-4" id="mutlisubservicediv"
										style="display: none">

										<div class="col-sm-12">
											<label for="inlineFold" class="control-label">Select
												SubService </label>
										</div>

										<select id="multisubservicesforreport" multiple="multiple"
											style="width: 100%">
											<option value="0">--Select SubServices--</option>
										</select>

									</div>

									<!-- -multiple end -->

								</div>

								<div class="col-sm-12 form-group">
									<div class="col-sm-4" id="service_wise_sponsor_div"
										style="display: none;">

										<div class="col-sm-12">
											<label for="inlineFold" class="control-label">Select
												Sponsor </label>
										</div>

										<select name="sponsorforreport" id="sponsorforreport"
											style="width: 100%"
											onchange="setDyanamicDivForSponsor('dynamicSponsor',this.id)">
											<option id="firstElmts" value="0">--- Select Charges
												---</option>
										</select>

										<div class="divide-10"></div>
										<div
											class="col-md-12 form-group select2-container select2-container-multi ">
											<div style="overflow-y: auto;">
												<ul id="dynamicSponsor" class="select2-choices">

												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12" style="display: none" id="servicepanel">
									<div class="panel panel-primary">
										<div class="panel-heading">Advance Service Wise Report</div>
										<div class="panel-body">

											<div class="dynamicstructurescroll">
												<table id="servicewisetable"
													class="table table-condensed table-bordered table-responsive table-striped">
													<thead>
														<tr>
															<th class="text-center">Sr.No.</th>
															<th class="text-center">UHID</th>
															<th class="text-center">Patient&nbsp;Name</th>
															<th class="text-center">Department</th>
															<th class="text-center">Sponsor</th>
															<th class="text-center">Opd/Ipd&nbsp;no.</th>
															<th class="text-center">Gender</th>
															<th class="text-center">Age</th>
															<th class="text-center">Service</th>
															<th class="text-center">Subservice</th>
															<th class="text-center">Service&nbsp;Date</th>
															<th class="text-center">Doctor</th>
															<th class="text-center">Rate</th>
															<th class="text-center">Quantity</th>
															<th class="text-center">Amount</th>
															<th class="text-center">Concession</th>
															<th class="text-center">Payable</th>
															<th class="text-center">Discount</th>
															<th class="text-center">Refund Amount</th>
															<th class="text-center">RecId</th>
															<th class="text-center">Remark</th>
															<th class="text-center">updated_by</th>
														</tr>
													</thead>
													<tbody id="servicewiseinfo">
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- /CONTENT-->
					</div>

				</div>

				<%@include file="footer_nobel.jsp"%>
		</section>
		<!--/PAGE -->

		<!-- JAVASCRIPTS -->

		<script
			src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
		<!-- SLIMSCROLL -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>

		<!-- BLOCK UI -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/autosize/jquery.autosize.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/select2/select2.min.js"></script>
		<!-- TYPEHEAD -->
		<script type="text/javascript"
			src="ehat-design/js/typeahead/typeahead.min.js"></script>
		<!-- UNIFORM -->
		<script type="text/javascript"
			src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
		<!-- DATA TABLES -->
		<script type="text/javascript"
			src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>

		<!-- COOKIE -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>

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
				$("#servicesforreport1").select2();
				$("#subservicesforreport").select2();

				
				getAllServices();
				setCurrentDateAndTime();
				//getAllChargesMaster();
				getAllDoctorListForBilling();

			});
		</script>

		<input type="hidden" id="userId1"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="userType"
			value="<%=session.getAttribute("userType")%>">
		<input type="hidden" id="userid" value="0">
		<!-- /JAVASCRIPTS -->

	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>