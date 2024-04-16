<%@page import="java.util.Date"%>

<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Patient Test Details Report</title>
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

.num {
  mso-number-format:General;
}
.text{
  mso-number-format:"\@";/*force text*/
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
											<li><a href="pathology_test_patient_details_report.jsp">Patient Test Details Report</a></li>
											<li class="pull-right">
											
												<!-- <button id="btnExportReport" class="pull-right btn btn-primary btn-xs btn-warning editUserAccess" disabled value="Excel" title="Export Report"
													 data-placement="left" data-toggle="tooltip" data-original-title="Excel">Export To Excel
												</button>  -->
												
													<button id="btnExportReport" onclick="exportToExceltestPatientTestDetails();" class="pull-right btn btn-primary btn-xs btn-warning editUserAccess" disabled value="Excel" title="Export Report"
													 data-placement="left" data-toggle="tooltip" data-original-title="Excel">Export To Excel
												</button> 
												
												
												<!-- <script type="text/javascript">
													 $("[id$=btnExportReport]").click(function(e) {
														 /*	window.open('data:application/vnd.ms-excel,'+ encodeURIComponent($('div[id$=patientTestDetailsReportExport]').html()));														
														e.preventDefault(); */
														
														
												        
												        
												        var fromDate = $("#collectionFromDate").val();
														var toDate = $("#collectionToDate").val();
												       alert(fromDate);
												        //creating a temporary HTML link element (they support setting file names)
												        var a = document.createElement('a');
												        //getting data from our div that contains the HTML table
												        var data_type = 'data:application/vnd.ms-excel';
												        var table_div = document.getElementById('patientTestDetailsReportExport');
												        var table_html = table_div.outerHTML.replace(/ /g, '%20');
												        a.href = data_type + ', ' + table_html;
												        //setting the file name
												        a.download = 'Patient_Test_details_report(' + fromDate + ' To ' + toDate + ').xls';
												        //triggering the function
												        a.click();
												        //just in case, prevent default behaviour
												        e.preventDefault();
												        alert(table_html);
														
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
																<label>Reporting From Date</label> <input id="collectionFromDate"
																	class="form-control input-SmallText" type="text"
																	readonly="readonly" name="date" placeholder="Date"
																	value="<%=formattedDate%>">
															</div>

															<div id="divToDate" class="form-group col-md-2">
																<label>Reporting To Date</label> <input id="collectionToDate"
																	class="form-control input-SmallText" type="text"
																	readonly="readonly" name="date" placeholder="Date"
																	value="<%=formattedDate%>">
															</div>

															<div class="form-group col-md-2 ">
																<div class="divide-20"></div>
																<button class="btn btn-primary"
																	style="margin-bottom: 1%" type="button"
																	onclick="patientTestDetailsReportData()">
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
																	<div class="panel-heading" id="divEhatContent" style="font-size: 130%">Patient Test Details Report</div>
																	<div class="panel-body"	style="overflow: auto; height: 450px" id="patientTestDetailsReportExportUI">
																		
																		<!-- -----------Loading Images-------- -->
																				<div style="display: none; overflow: hidden; margin-top:10%" id="ajaxloaderimg" class="center">
																					<img src="/EhatEnterprise/images/ajax_loader_blue_64.gif">
																				</div>
																		<!-- -----------Loading Images-------- -->
																		
																		<table class="datatable table table-striped table-bordered"	id="patientTestDetailsReportUI">
																			<thead id="ehatTHead">
																				<tr>
																					<th style="text-align: right;">SR NO</th>
																					<th>COLLECTED AT</th>
																					<th>CENTER NAME</th>
																					<th>TEST NAME</th>																					
																					<th>COLLECTION DATE</th>
																					<th>COLLECTION TIME</th>
																					<th>PATIENT NAME</th>
																					<th style="text-align: right;">PATIENT AGE</th>
																					<th>GENDER</th>
																					<th style="text-align: right;">MOBILE</th>	
																					<th>PATIENT EMAIL</th>	
																					<th>ADDRESS</th>	
																					<th>TEST RESULT</th>																																			
																				</tr>
																			</thead>
																			<tbody id="patientTestDetailsReportBodyUi">
																				
																			</tbody>
																		</table>
																	</div>
																	
																	
																	<!------------Template for eport excel date------- -->
																	<div class="panel-body hide" style="overflow: auto; height: 450px;" id="patientTestDetailsReportExport">
																		<table class="datatable table table-striped table-bordered"	id="patientTestDetailsReport">
																			<thead id="ehatTHead">
																				<tr>
																					<th style="text-align: right;"><b>SR NO</b></th>
																					<th><b>COLLECTED AT</b></th>
																					<th><b>CENTER NAME</b></th>
																					<th><b>TEST NAME</b></th>																					
																					<th><b>COLLECTION DATE</b></th>
																					<th><b>COLLECTION TIME</b></th>																					
																					<th><b>REGISTRATION DATE</b></th>	
																					<th><b>REGISTRATION TIME</b></th>	
																					<th><b>AUTHENTICATION DATE</b></th>	
																					<th><b>AUTHENTICATION TIME</b></th>
																					<th><b>REPORTING DATE</b></th>	
																					<th><b>REPORTING TIME</b></th>	
																					<th><b>BARCODE</b></th>																					
																					<th><b>PATIENT ID</b></th>
																					<th><b>PATIENT NAME</b></th>
																					<th style="text-align: right;"><b>PATIENT AGE</b></th>
																					<th><b>GENDER</b></th>
																					<th style="text-align: right;"><b>MOBILE</b></th>	
																					<th><b>PATIENT EMAIL</b></th>	
																					<th><b>ADDRESS</b></th>
																					<th><b>DISTRICT</b></th>
																					<th><b>STATE</b></th>
																					<th><b>PINCODE</b></th>	
																					<th><b>TEST RESULT</b></th>
																					<th><b>CT VALUE</b></th>																						
																					<th><b>FLIGHT NO.</b></th>	
																					<th><b>STATUS DESCRIPTION</b></th>	
																					<th><b>REPORT PRINTED</b></th>	
																					<th><b>ID TYPE NAME</b></th>	
																					<th><b>ID NUMBER</b></th>	
																					<th><b>PATIENT DOB</b></th>
																					<th><b>DOCTOR NAME</b></th>
																					<th><b>NATIONALITY</b></th>
																					<th><b>PAYMENT STATUS</b></th>
																					<th style="text-align: right;"><b>AMOUNT</b></th>
																					<th><b>PAYMENT TYPE</b></th>
																					<th><b>PAYMENT DATE</b></th>
																					<th><b>PAYMENT TIME</b></th>
																					<th><b>IS MAIL SENT</b></th>
																					<th><b>EMAIL SENT DATE</b></th>
																					<th><b>EMAIL SENT TIME</b></th>
																					<th><b>SAMPLE TYPE</b></th>
																					<th><b>MAIL ACK</b></th>
																					<th><b>ARRIVAL CITY</b></th>
																					<th><b>DESTINATION CITY</b></th>																				
																																																													
																				</tr>
																			</thead>
																			<tbody id="patientTestDetailsReportBody">
																				
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
				patientTestDetailsReportData();
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

