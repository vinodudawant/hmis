<%@page import="java.util.Date"%>

<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>TEST COUNT SUMMARY REPORT</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<%@include file="inv_header.jsp"%>
<style>
.tdColorWarning{
	color:#e1890c;
	font-weight: bold;
}
.tdColorRed{
	color:red;
	font-weight: bold;
}
.tdColorGreen{
	color:green;
	font-weight: bold;
}
</style>
<link rel="stylesheet" type="text/css"  href="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js">
<script src="ehat-design/table2excel/jquery.table2excel.js"></script>
<script src="ehat-design/table2excel/jquery.table2excel.min.js"></script>
</head>
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
			<%@include file="left_menu_pathology_analytics.jsp"%>
			<!-- /SIDEBAR -->
			<%
				java.util.Calendar currentDate = java.util.Calendar.getInstance();
				java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
				String todays_date = formatter.format(currentDate.getTime());
				
				Date date = new Date();
				java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
				String formattedDate = sdf.format(date);	
				
				   ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
				   String REALTIMEQUALITATIVEID = resourceBundleEha.getObject("REALTIMEQUALITATIVEID").toString();
			       String SARSCOV2ANTIGENID = resourceBundleEha.getObject("SARSCOV2ANTIGENID").toString();
			       String COVID19RNAAMPLIFICATIONID = resourceBundleEha.getObject("COVID19RNAAMPLIFICATIONID").toString();
			%>
			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">										
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><a href="pathology_TestCountSummary_Report.jsp">Test Count Summary Report</a></li>
											<li class="pull-right">
											
												<button id="btnExportReport" onclick="exportToExceltestCountSummaryReport();" class="pull-right btn btn-primary btn-xs btn-warning editUserAccess" disabled value="Excel" title="Export Report"
													 data-placement="left" data-toggle="tooltip" data-original-title="Excel">Export To Excel
												</button> 
												
												<!-- <script type="text/javascript">
													$("[id$=btnExportReport]").click(function(e) {
														window.open('data:application/vnd.ms-excel,'+ encodeURIComponent($('div[id$=patientsummaryReportExport]').html()));
														e.preventDefault();
													});
												</script> -->
											
											</li>
										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>
							
							<div class="row">
								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="row">
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row">

															<div id="divFromDate" class="form-group col-md-2">
																<label>Collection From Date</label> <input id="collectionFromDate"
																	class="form-control input-SmallText" type="text"
																	readonly="readonly" name="date" placeholder="Date"
																	value="<%=formattedDate%>">
															</div>

															<div id="divToDate" class="form-group col-md-2">
																<label>Collection To Date</label> <input id="collectionToDate"
																	class="form-control input-SmallText" type="text"
																	readonly="readonly" name="date" placeholder="Date"
																	value="<%=formattedDate%>">
															</div>

															<div class="col-md-2">
																<div class="input-group" id="customerTypes">
																	<label for="inlineFold" class="control-label">Test Name:</label> 
																	<select style="width: 150px" id="testId">
															        <option value="0">--Select Test Name--</option>
															        
															        <option value="<%=REALTIMEQUALITATIVEID%>" >REAL TIME QUALITATIVE RT PCR DETECTION OF SARS-COV-2 / COVID 19</option>
																	<option value="<%=COVID19RNAAMPLIFICATIONID%>" >COVID-19 RNA DETECTION BY RAPID AMPLIFICATION</option>
																	<option value="<%=SARSCOV2ANTIGENID%>" >SARS-COV-2 ANTIGEN</option>
																	
																	</select>
																</div>
															</div>

															<div class="form-group col-md-2 ">
																<div class="divide-20"></div>
																<button class="btn btn-primary"
																	style="margin-bottom: 1%" type="button"
																	onclick="getTestCountSummaryReport()">
																	<span class="fa fa-search" aria-hidden="true"> </span>
																	Search
																</button>
															</div>
															
															
															

															<div class="col-md-12">
																<div class="col-sm-12">
																	<div class="pull-right">
																		<div id="datatable1_filter" class="dataTables_filter">
																			<label id="searchlabel"> </label>
																		</div>
																	</div>
																</div>
																<div class="panel panel-primary">
																	<div class="panel-heading" id="divEhatContent" style="font-size: 130%">TEST COUNT SUMMARY REPORT</div>
																	<div class="panel-body"	style="overflow: auto; height: 450px" id="patientsummaryReportExport">
																		<table class="datatable table table-striped table-bordered"	id="patientsummarReport">
																			<thead id="ehatTHead">
																				<tr>
																					<th style="text-align: center;"><b>SR NO</b></th>	
																					<th style="text-align: center;"><b>CENTER NAME</b></th>																				
																					<th style="text-align: center;"><b>COLLECTION DATE</b></th>
																					<th style="text-align: center;"><b>COLLECTED AT</b></th>
																					<th style="text-align: center;"><b>TEST NAME</b></th>
																					<th style="text-align: center;"><b>TOTAL TESTS</b></th>
																					<th style="text-align: center;"><b>TOTAL POSITIVE/DETECTED</b></th>
																					<th style="text-align: center;"><b>TOTAL NEGATIVE/NON-DETECTED</b></th>																																								
																				    <th style="text-align: center;"><b>TOTAL REJECTED</b></th>
																					<th style="text-align: center;"><b>TOTAL AUTHENTICATED TESTS</b></th>																																								
																		            <th style="text-align: center;"><b>REPORT ACKNOWLEDGEMENT COUNT</b></th>
																				</tr>
																			</thead>
																			<tbody id="patientsummaryReportBody">
																				
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
				<img style="margin-top: 250px;" height="43px" src="images/loading_black.gif" />
				<div style="margin-top: 10px; color: white">
					<b>Please wait...</b>
				</div>
			</div>
			<%@include file="footer_nobel.jsp"%>
		</section>
		<!--/PAGE -->

		<!-- JAVASCRIPTS -->
		<%@include file="inv_footer.jsp"%>
		<!-- BOOTSTRAP SWITCH -->
		<script type="text/javascript" src="ehat-design/js/bootstrap-switch/bootstrap-switch.min.js"></script>
		<!-- /JAVASCRIPTS -->
		<script>
		
			jQuery(document).ready(function() {		
				App.setPage("wizards_validations");  //Set current page 
				App.init(); //Initialise plugins and elements  
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});	
				

				$('#collectionFromDate').datepicker({
					autoclose : true,
					format: 'dd/mm/yyyy'
				});
				$('#collectionToDate').datepicker({
					autoclose : true,
					format: 'dd/mm/yyyy'
				});	
				//getTestname();
				getTestCountSummaryReport();
			});
			
			
			
		</script>
	</c:if>
	<!-- include js for development -->
	<script type="text/javascript" src="js/pathology_reporting.js"></script>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>

