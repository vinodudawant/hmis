<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Closed Complaints Reports</title>
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
			<%
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
							"yyyy-MM-dd");
					String todays_date = formatter.format(currentDate.getTime());
					//	System.out.print("todays_date :::"+todays_date );

					Date date = new Date();
					java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat(
							"dd/MM/yyyy h:mm:ss a");
					String formattedDate = sdf.format(date);
					System.out.println(formattedDate); // 12/01/2011 4:48:16 PM
			%>
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
												href="closed_complaints_reports.jsp">Closed Complaints
													Reports</a></li>
											<li class="pull-right">
											<button id="btnExportReport"
													class="btn btn-xs btn-warning"
													value="Excel" title="" data-placement="left"
													data-toggle="tooltip" data-original-title="Excel"
													style="margin-left: 10px;margin-bottom: 10px;">Export To Excel</button></li>

											<script type="text/javascript">
												$("[id$=btnExportReport]")
														.click(
																function(e) {
																	//getting values of current time for generating the file name
																	var dt = new Date();
																	var day = dt
																			.getDate();
																	var month = dt
																			.getMonth() + 1;
																	var year = dt
																			.getFullYear();

																	var postfix = day
																			+ "."
																			+ month
																			+ "."
																			+ year;
																	//creating a temporary HTML link element (they support setting file names)
																	var a = document
																			.createElement('a');
																	//getting data from our div that contains the HTML table
																	var data_type = 'data:application/vnd.ms-excel';
																	var table_div = document
																			.getElementById('closedComplaintTableIdReports');
																	var table_html = table_div.outerHTML
																			.replace(
																					/ /g,
																					'%20');
																	a.href = data_type
																			+ ', '
																			+ table_html;
																	//setting the file name
																	a.download = 'Closed_Complaints_Reports'
																			+ postfix
																			+ '.xls';
																	//triggering the function
																	a.click();
																	//just in case, prevent default behaviour
																	e
																			.preventDefault();

																});
											</script>
										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>
							<!-- modal starts here -->
							<div class="modal fade" id="assetTicketManagementModuleModal"
								tabindex="-1" data-backdrop="static" data-keyboard="false"
								role="dialog" aria-labelledby="assetComplaintModuleModal"
								aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header"></div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Complaint
																Details</div>
															<div class="panel-body"></div>
														</div>
													</div>
												</div>
											</div>
											<!-- slave table starts here -->
											<div class="container" style="margin-top: 2%;">
												<ul class="nav nav-tabs">
													<li class="active"><a data-toggle="tab"
														href="#ticketDiscrption">Ticket Description</a></li>
												</ul>
												<div class="tab-content"></div>
											</div>
											<!-- slave table ends here -->
										</div>
										<div class="modal-footer"></div>
									</div>
								</div>
							</div>
							<!-- modal ends here -->
							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div>
										<ul class="nav nav-tabs">
											<li class="active"><a data-toggle="tab"
												href="#closedTicketTab" onclick="getClosedTicketsRecords();">
													<span class="hidden-inline-mobile">Closed Complaints</span>
											</a></li>
										</ul>
									</div>
									<div class="tab-content">
										<!-- closed ticket tab start here -->
										<div id="closedTicketTab" class="tab-pane fade in active">
											<div class="panel panel-default">
												<div class="panel-body">
													<div class="row">
														<div class="col-md-12">
															<div class="tabbable header-tabs">
																<div class="row" style="margin-top: 10px">
																	<div class="col-md-12">
																		<div class="form-group col-md-2">
																			<label for="from date">From Date</label> <input
																				type="text" class="form-control tip-focus"
																				id="fromDateClosedTicketSearchId"
																				placeholder="please enter from date" name="supplier">
																		</div>
																		<div class="form-group col-md-2">
																			<label for="to date">To Date</label> <input
																				type="text" class="form-control tip-focus"
																				id="toDateClosedTicketSearchId"
																				placeholder="please enter to date" name="supplier">
																		</div>
																		<div class="form-group col-md-2">
																			<label for="asset name search">Item Name</label> <select
																				class="form-control"
																				onchange="getItemWiseCategory(this.value);"
																				id="assetNameClosedTicketSearchId">
																				<option value="0">--Select Item Name--</option>
																			</select>
																		</div>
																		<div class="form-group col-md-2">
																			<label for="product category search">Product
																				Category</label> <select class="form-control"
																				id="productCategoryClosedTicketSearchId">
																				<option value="0">--Select Category--</option>
																			</select>
																		</div>
																		<div class="form-group col-md-2">
																			<label for="location name">Department </label> <select
																				class="form-control"
																				id="assetTicketClosedDepartmentId">
																				<option value="0">--Select Department--</option>
																			</select>
																		</div>
																		<div class="form-group col-md-2">
																			<label for="location name">Hospital Dept </label> <select
																				class="form-control"
																				id="assetTicketClosedHospitalDeptId">
																				<option value="0">--Select Hospital Dept--</option>
																			</select>
																		</div>
																		<div class="form-group col-md-2">
																			<label for="search button"></label>
																			<button class="btn btn-primary form-control"
																				onclick="universalSearchAssetTicketManagement('Closed');"
																				type="button" onclick=""
																				style="height: 25px; margin-bottom: 10px">
																				<span class="fa fa-search" aria-hidden="true">
																				</span> Search!
																			</button>
																		</div>
																	</div>
																	<div class="col-md-12">
																		<div class="col-sm-12">
																			<div class="pull-right">
																				<div id="datatable1_filter"
																					class="dataTables_filter">
																					<label id="searchlabel"> </label>
																				</div>
																			</div>
																		</div>
																		<div class="panel panel-primary"
																			style="margin-top: 20px">
																			<div class="panel-heading" id="divEhatContent">Closed
																				Ticket Management</div>
																			<div class="panel-body"
																				style="overflow: auto; height: 300px" id="closedComplaintTableIdReports">
																				<table id="assetComplaintTableId" cellpadding="0"
																					cellspacing="0" border="0"
																					class="table table-striped table-bordered">
																					<thead id="ehatTHead">
																						<tr>
																							<th class="col-md-1 center">Sr. No.</th>
																							<th class="col-md-1 center">Created Date</th>
																							<th class="col-md-1 center">Created Time</th>
																							<th class="col-md-1 center">Ticket ID</th>
																							<th class="col-md-1 center">Raised By</th>
																							<th class="col-md-1 center">Product Category</th>
																							<th class="col-md-1 center">Item Name</th>
																							<th class="col-md-1 center">Batch No</th> 
																							<th class="col-md-1 center">Serial No</th>
																							<th class="col-md-1 center">Department</th>
																							<th class="col-md-1 center">Hospital Department</th>
																							<th class="col-md-1 center">Location</th>
																							<th class="col-md-1 center">Complaint</th>
																							<th class="col-md-1 center">Description</th>
																							<th class="col-md-1 center">Priority</th>
																							<th class="col-md-1 center">Rate</th>
																							<th class="col-md-1 center">Urgency</th>
																							<th class="col-md-1 center">Status</th>
																							<th class="col-md-1 center">Closed Date and Time  </th>
																							<th class="col-md-1 center">Ticket Closed By</th>
																						</tr>
																					</thead>
																					<tbody id="assetClosedTicketManagementTableBodyIdReports">
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
										<!-- closed ticket tab ends here -->
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
		<script>
			/*
			 * @author: Rohit Sandbhor
			 * @date:- 23-10-2019
			 * @codeFor:- below js function to call the getAllFinancialMasterRecords() on ready
			 */
			jQuery(document)
					.ready(
							function() {
								App.setPage("wizards_validations"); //Set current page 
								App.init(); //Initialise plugins and elements  
								$(function() {
									$('[data-toggle="tooltip"]').tooltip();
								});

								var nowTemp = new Date();
								var now = new Date(nowTemp.getFullYear(),
										nowTemp.getMonth(), nowTemp.getDate(),
										0, 0, 0, 0);
								var checkin = $('#dpd1')
										.datepicker(
												{
													onRender : function(date) {
														return date.valueOf() < now
																.valueOf() ? 'disabled'
																: '';
													}
												})
										.on(
												'changeDate',
												function(ev) {

													if (ev.date.valueOf() > checkout.date
															.valueOf()) {
														var newDate = new Date(
																ev.date);
														newDate.setDate(newDate
																.getDate() + 1);
														checkout
																.setValue(newDate);
													}
													checkin.hide();
													$('#dpd2')[0].focus();
												}).data('datepicker');

								var checkout = $('#dpd2')
										.datepicker(
												{
													onRender : function(date) {
														return date.valueOf() <= checkin.date
																.valueOf() ? 'disabled'
																: '';
													}
												}).on('changeDate',
												function(ev) {
													checkout.hide();
												}).data('datepicker');

								new JsDatePick({
									useMode : 2,
									target : "fromDateClosedTicketSearchId",
									yearsRange : [ 1920, 2099 ],
									limitToToday : false,
									dateFormat : "%Y-%m-%d",
									imgPath : "../img/",
									weekStartDay : 1,
								});

								new JsDatePick({
									useMode : 2,
									target : "toDateClosedTicketSearchId",
									yearsRange : [ 1920, 2099 ],
									limitToToday : false,
									dateFormat : "%Y-%m-%d",
									imgPath : "../img/",
									weekStartDay : 1,
								});

								$('#contactDateofbirthPOId').datepicker({
									autoclose : true
								});

								getAllHospitalDepartment();
								getAllDepartment();
								getAllItemInvAndSubInv();
								getAllAssetCategory();
								getClosedComplaintsReports();
								$("#productCategoryTicketSearchId").select2();
								$("#assetNameTicketSearchId").select2();
								$("#productCategoryClosedTicketSearchId")
										.select2();
								$("#assetNameClosedTicketSearchId").select2();

							});
		</script>
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<input type="text" id="assetTicketManagementMasterId" value="0" />
		<input type="hidden" id="userNameId"
			value="<%=session.getAttribute("userName")%>" />
		<input type="hidden" id="RowCount" value="0">

		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	<!-- include js for development -->
	<script type="text/javascript" src="js/ehat_inv_ticket_management.js"></script>
	<script type="text/javascript" src="js/ehat_inv_complaints.js"></script>
	<script type="text/javascript" src="js/ehat_inventory.js"></script>
	<!-- include js for development of po -->
</body>
</html>
