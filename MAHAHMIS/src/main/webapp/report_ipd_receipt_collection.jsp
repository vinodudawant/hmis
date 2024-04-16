<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>IPD Receipt Collection Report</title>
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
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.min.js"></script>
<script src="https://unpkg.com/jspdf-autotable@3.5.22/dist/jspdf.plugin.autotable.js"></script>
 

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
<script type="text/javascript" src="js/report_ipd_collection.js"></script>
<script type="text/javascript" src="js/formattedDate.js"></script>
<script type="text/javascript" src="js/servicewise_report.js"></script>
<script type="text/javascript">
	onload = function() {
		getIpdCollectionReport('collectionreport');
	};
</script>
<style>
table {
	text-align: left;
	position: relative;
	border-collapse: collapse;
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
	position: sticky;
	top: 0;
	box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
}

.dynamicstructurescroll {
	max-height: 350px;
	overflow: auto;
	scrollbar-width: thin;
}
</style>
</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
	<%   
		 ResourceBundle resourceBundle = ResourceBundle.getBundle("Ehat");   
	     String meeshaFlow = resourceBundle.getObject("meesha").toString(); 
	%>
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">
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
												href="report_ipd_receipt_collection.jsp"> IPD Receipt
													Collection Report</a></li>
											<li class="pull-right">

												<button class="btn btn-info btn-xs" id="btnExportipdrec"
													data-placement="left" data-toggle="tooltip">Export
													Excel</button> 
													<!-- following code for Excel sheet 
																Added by Tushar Jadhav -->
													<script type="text/javascript">
													$("[id$=btnExportipdrec]").click(function (e) {
													    // Getting values of the current time for generating the file name
													    var dt = new Date();
													    var day = dt.getDate();
													    var month = dt.getMonth() + 1;
													    var year = dt.getFullYear();
													    var postfix = day + "." + month + "." + year;

													    // Creating a temporary HTML link element (they support setting file names)
													    var a = document.createElement('a');

													    // Getting data from our div that contains the HTML table
													    var data_type = 'data:application/vnd.ms-excel';
													    var table_div = $('#ipdcollectiontable').clone();

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

													    // Setting the file name
													    a.href = data_type + ', ' + table_html;
													    a.download = 'IPD Receipt Collection Report_' + postfix + '.xls';

													    // Triggering the function
													    a.click();

													    // Just in case, prevent default behavior
													    e.preventDefault();
													});
											
													</script>
											</li>

											<li class="pull-right">
												<button class="btn btn-primary btn-xs"
													onclick="openIpdReportDetailsPDF()">Export PDF</button>
											</li>

										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row form-group text-center">
								<div class="col-md-12 form-group">

									<div class="col-md-2 form-group">
										<div class="col-sm-4">
											<label for="inlineFold" class="control-label">From </label>
										</div>
										<input type="text"
											class="form-control span6 input-mini search-query"
											placeholder="Date" name="date" readonly="readonly"
											onclick="displayCalendar(document.getElementById('servicewisefdate'),'yyyy-mm-dd',this)"
											id="servicewisefdate">
									</div>

									<div class="col-md-1 form-group">
										<div class="col-sm-4">
											<label for="inlineFold" class="control-label">From </label>
										</div>
										<input type="text" placeholder="Time" readonly="readonly"
											class="center form-control" id="servicewiseftime"
											onclick="getTime(this.id)">
									</div>

									<div class="col-md-2 form-group">
										<div class="col-sm-4">
											<label for="inlineFold" class="control-label">To </label>
										</div>
										<input type="text"
											class="form-control span6 input-mini search-query"
											placeholder="Date" name="date" readonly="readonly"
											onclick="displayCalendar(document.getElementById('servicewisetodate'),'yyyy-mm-dd',this)"
											id="servicewisetodate">
									</div>

									<div class="col-md-1 form-group">
										<div class="col-sm-3">
											<label for="inlineFold" class="control-label">To </label>
										</div>
										<input type="text" placeholder="Time" readonly="readonly"
											class="center form-control" id="servicewisetotime"
											onclick="getTime(this.id)">
									</div>

									<div class="col-md-1 form-group">
										<div class="divide-20"></div>
										<button class="btn btn-primary btn-xs"
											onclick="getIpdCollectionReport('collectionreport')">
											Search&nbsp;<i class="fa fa-search" aria-hidden="true"></i>
										</button>
									</div>
								</div>
							</div>

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12" style="display: none"
									id="ipdcolltablediv">
									<div class="panel panel-primary">
										<div class="panel-heading">IPD Receipt Collection Report</div>
										<div class="panel-body">

											<div id="dynamicstructurescroll" class="dynamicstructurescroll">
												<table id="ipdcollectiontable"
													class="table table-bordered table-responsive table-striped">
													<thead>
														<tr>
															<th class="text-center">Sr.No.</th>
															<th class="text-center">Bill&nbsp;No</th>
															<th class="text-center">Receipt&nbsp;No.</th>
															<th class="text-center">Receipt&nbsp;By</th>
															<th class="text-center">DOA</th>
															<th class="text-center">UHID</th>
															<th class="text-center">Patient&nbsp;Name</th>
															<th class="text-center">Sponsor&nbsp;Name</th>
															<th class="text-center">Consulting&nbsp;Doctor</th>
															<th class="text-center">Speciality</th>
															<th class="text-center">Address</th>
															<th class="text-center">City</th>
															<th class="text-center">Taluka</th>
															<th class="text-center">District</th>
															<th class="text-center">Receipt&nbsp;Date</th>
															<th class="text-center">Paid&nbsp;Amt</th>
															<th class="text-center">Paymode</th>
															<th class="text-center">Card&nbsp;No.</th>
															<th class="text-center">Bank&nbsp;Name</th>
															<th class="text-center">Remark</th>
															<th class="text-center">Reference</th>
															<th class="text-center">Ref.&nbsp;Doctor&nbsp;Name</th>
														</tr>
													</thead>
													<tbody id="ipdcollectionlist">
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
			jQuery(document).ready(
					function() {
						App.setPage("wizards_validations"); //Set current page 
						App.init(); //Initialise plugins and elements

						$(function() {
							$('[data-toggle="tooltip"]').tooltip();
						});
						
						setCurrentDateAndTime();

					});
		</script>

		<input type="hidden" id="userId1"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="userType"
			value="<%=session.getAttribute("userType")%>">
		<input type="hidden" id="userid" value="0">
		<input type="hidden" id="meeshaFlow" value='<%=meeshaFlow%>'>
		<!-- /JAVASCRIPTS -->

	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>