<%@page import="java.util.Date"%>

<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Patient TAT Report</title>
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
				java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
				String todays_date = formatter.format(currentDate.getTime());
				
				Date date = new Date();
				java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("dd/MM/yyyy h:mm:ss a");
				String formattedDate = sdf.format(date);					
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
											<li><a href="pathology_tat_Report.jsp">TAT Report</a></li>
											<li class="pull-right">
											
												<button id="btnExportReport" onclick="exportToExcel();" class="pull-right btn btn-primary btn-xs btn-warning editUserAccess" disabled value="Excel" title="Export Report"
													 data-placement="left" data-toggle="tooltip" data-original-title="Excel">Export To Excel
												</button> 
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
																	value="<%=todays_date%>">
															</div>

															<div id="divToDate" class="form-group col-md-2">
																<label>Collection To Date</label> <input id="collectionToDate"
																	class="form-control input-SmallText" type="text"
																	readonly="readonly" name="date" placeholder="Date"
																	value="<%=todays_date%>">
															</div>

															<div class="form-group col-md-2 ">
																<div class="divide-20"></div>
																<button class="btn btn-primary"
																	style="margin-bottom: 1%" type="button"
																	onclick="getTatReport()">
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
																	<div class="panel-heading" id="divEhatContent" style="font-size: 130%">Patient TAT Report</div>
																	<div class="panel-body"	style="overflow: auto; height: 450px" id="patientTatReportExport">
																		<table class="datatable table table-striped table-bordered"	id="patientTatReport">
																			<thead id="ehatTHead">
																				<tr>
																					<th style="text-align: right;"><b>SR NO</b></th>																					
																					<th><b>COLLECTION DATE</b></th>
																					<th><b>COLLECTED AT</b></th>
																					<th style="text-align: right;"><b>TOTAL PATIENT</b></th>
																					<th style="text-align: right;"><b>TOTAL TESTS</b></th>
																					<th style="text-align: right;"><b>TAT PASS</b></th>
																					<th style="text-align: right;"><b>TAT FAIL</b></th>																																								
																				</tr>
																			</thead>
																			<tbody id="patientTatReportBody">
																				
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

		<input type='hidden' id="fromDate" value="" />
		<input type="hidden" id="toDate" value="" />
		
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
					format: 'dd-mm-yyyy'
				});
				$('#collectionToDate').datepicker({
					autoclose : true,
					format: 'dd-mm-yyyy'
				});
				getTatReport();
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

