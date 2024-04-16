<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Asset Breakdown Report</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<%@include file="inv_header.jsp"%>
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
			<%@include file="inv_maintenance_left_menu.jsp"%>
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
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><i class="fa fa-home"></i> <a
												href="inv_asset_maintenance_breakdown_report.jsp">Breakdown Report</a></li>
										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
											<button id="btnExportReport" class="pull-right btn btn-primary btn-warning"
												value="Excel" title="" data-placement="left"
												data-toggle="tooltip" data-original-title="Excel"
												style="margin-left: 10px">
												Export To Excel
											</button>
											<script type="text/javascript">
												$("[id$=btnExportReport]")
														.click(
																function(e) {
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
															        var table_div = document.getElementById('breakdownDetailsInfo');
															        var table_html = table_div.outerHTML.replace(/ /g, '%20');
															        a.href = data_type + ', ' + table_html;
															        //setting the file name
															        a.download = 'Asset_Breakdown_Report' + postfix + '.xls';
															        //triggering the function
															        a.click();
															        //just in case, prevent default behaviour
															        e.preventDefault();		
																			
																});
											</script>
										<!-- End -->
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
														<div class="row" style="margin-top: 5px">
															<div class="col-md-12">
																<div class="col-sm-12">
																	<div class="pull-right">
																		<div id="datatable1_filter" class="dataTables_filter">
																			<label id="searchlabel"> </label>
																		</div>
																	</div>
																</div>
																<div class="panel panel-primary">
																	<div class="panel-heading" id="divEhatContent">Breakdown Report</div>
																	<div class="panel-body" style="overflow: auto; height: 300px" id="breakdownDetailsInfo">
																		<table
																			class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">Sr No</th>
																					<th class="col-md-1 center">Ticket Id</th>
																					<th class="col-md-1 center">Raised By</th>
																					<th class="col-md-1 center">Product Category</th>
																					<th class="col-md-1 center">Asset Name</th>
																					<th class="col-md-1 center">Serial No.</th>
																					<th class="col-md-1 center">Breakdown Date</th>
																					<th class="col-md-1 center" style="display: none">Description</th>
																					<th class="col-md-1 center">Ticket Closed Date</th>
																					<th class="col-md-1 center">Downtime Hours(HH:MM:SS)</th>
																					<th class="col-md-1 center">Action Taken By Id</th>
																				</tr>
																			</thead>
																			<tbody id="breakdownRecordsTbodyId">
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
		<%@include file="inv_footer.jsp"%>
		<!-- /JAVASCRIPTS -->
		<script>
		/*
		 * @author: Rohit Sandbhor
		 * @date:- 23-10-2019
		 * @codeFor:- below js function to call the getAllWarehouseMasterRecords() on ready
		 */
		jQuery(document).ready(function() {		
			App.setPage("wizards_validations");  //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			getAllBreakdownRecords();
		});
		</script>
		<script>
		</script>
		<input type="hidden" id="userIdSalesSlave" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="userIdSalesSlave" value="0">
		<input type="hidden" id="userIdPurchaseSlave" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="userIdPartySlave" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="subInvId" value="0">
	</c:if>
	<!-- include js for development -->
	<script type="text/javascript" src="js/ehat_inv_ticket_management.js"></script>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>

