<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title> Complaint</title>
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
			<%@include file="left_menu_home.jsp"%>
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
												href="inv_complaint.jsp">Complaint</a></li>
										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-12">
									<div class="pull-right" style="margin-left: 40%;">
										<button class="btn btn-xs btn-info pull-left" type='button'
											data-toggle="modal" data-target="#assetComplaintModuleModal">
											<i class="fa fa-plus"></i>New Complaint
										</button>
									</div>
								</div>
							</div>

							<!-- modal starts here -->
							<div class="modal fade" id="assetComplaintModuleModal"  data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="assetComplaintModuleModal"
								aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">Complaint
									         <div class="pull-right" style="margin-right: 15px;">
										         <button type="button" class="btn btn-primary" onclick="saveAssetComplaint();">Save</button>
										         <button type="button" class="btn btn-primary btn-danger" data-dismiss="modal" onclick="refreshAssetComplaint();">Close</button>
											</div>
										</h5>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Complaint Details 
																</div>
															<div class="panel-body">
																<form id="financialFormId" onsubmit="return false">
																	<div class="row">
																		<div class="form-group col-md-2">
																			<label for="location name">Department
																			</label> 
																			<select class="form-control" id="assetComplainantDepartmentId">
																				<option value="0">--Select Department--</option>
																			</select>
																		</div>
																		<div class="form-group col-md-2">
																			<label for="location name">Hospital Dept
																			</label> 
																			<select class="form-control" id="assetComplainantHospitalDeptId">
																				<option value="0">--Select Hospital Dept--</option>
																			</select>
																		</div>
																		<div class="form-group col-md-2">
																			<label for="asset name">Item Name<b
																				style="color: red;">*</b></label>
																				<select onchange="getAssetWiseSerialNumber(this.value);getItemWiseCategory(this.value);getAllBatchNOInvAndSubInv(this.value)" id="assetNameAssetComplaintId" style="width:134px;">
																				<option value="0">--Select Item Name--</option>
																			</select>
																		</div>
																		<div class="form-group col-md-2">
																			<label for="product category">Product Category<b
																				style="color: red;">*</b></label>
																				<select class="form-control" id="productCategoryAssetComplaintId">
																				<option value="0">--Select Category--</option>
																				
																			</select>
																		</div>
																		
																		<div class="form-group col-md-2">
																			<label for="serial number">Batch No.<b
																				style="color: red;">*</b></label>
																				<select class="form-control" id="batchNoAssetComplaintId">
																				<option value="0">--Select Batch No--</option>
																			</select>
																		</div>
																		<div class="form-group col-md-2">
																			<label for="serial number">Serial No.<b
																				style="color: red;">*</b></label>
																				<select class="form-control" id="serialNumberAssetComplaintId" onchange="getProductWarrantyComplaint();getAssetDetailsByItemIdAndSerialNo(this.value)">
																				<option value="0">--Select Serial No--</option>
																			</select>
																		</div>
																	</div>
																	<div class="row">
																		<div class="form-group col-md-2">
																			<label for="complain">Complaint<b
																				style="color: red;">*</b></label>
																				<select class="form-control" id="complainTypeAssetComplaintId">
																				<option value="0">--Select Complaint Type--</option>
																				<option value="Maintenance">Maintenance</option>
																				<option value="Breakdown">Breakdown</option>
																				<option value="Others">Others</option>
																			</select>
																		</div>
																		
																		<div class="form-group col-md-2">
																			<label for="complainant contact no">Complainant Contact No.</label> 
																			<input type="text"	class="form-control tip-focus"	id="contactNoAssetComplaintId" 
																				placeholder="please Enter Contact No." title="Please Enter Contact No." maxlength="10">
																		</div>
																		
																		<div class="form-group col-md-2">
																			<label for="location">Location</label> 
																			<textarea type="text" class="form-control" required="true"	
																			id="locationAssetComplaintId" placeholder="Enter Location"></textarea>
																		</div>

																		<div class="form-group col-md-4">
																			<label for="desciprtion">Description</label> 
																			<textarea type="text" class="form-control" required="true"	
																			id="descriptionAssetComplaintId"></textarea>
																		</div>
																		
																	</div>
																	<div class="row">
																		<div class="form-group col-md-2">
																			<label for="rate of inconvenience">Rate Of Inconvenience<b
																				style="color: red;">*</b></label>
																				<select class="form-control" id="rateAssetComplaintId">
																				<option value="">--Select Rate--</option>
																				<option value="1">1</option>
																				<option value="2">2</option>
																				<option value="3">3</option>
																				<option value="4">4</option>
																				<option value="5">5</option>
																				<option value="6">6</option>
																				<option value="7">7</option>
																				<option value="8">8</option>
																				<option value="9">9</option>
																				<option value="10">10</option>
																			</select>
																		</div>
																		<div class="form-group col-md-2">
																			<label for="priority">Priority<b
																				style="color: red;">*</b></label>
																				<select class="form-control" id="priorityAssetComplaintId" onchange="changeUrgentStatus();">
																				<option value="0">--Select Priority--</option>
																				<option value="Low">Low</option>
																				<option value="Medium">Medium</option>
																				<option value="High">High</option>
																			</select>
																		</div>
																		<div class="form-group col-md-2">
																		<label for="priority">Urgent
																		<input id="urgencyAssetComplaintId" onclick="checkForPriorityAssetComplaint();" value="No" type="checkbox">
																		</label>
																		</div>
																		<div class="pull-right" style="margin-right: 15px;">
																		 <button type="button" class="btn btn-primary" onclick="assetComplaintView();">
																		    Warranty Details  <span class="badge badge-light" id="productWarrantyComplaintSpanTagId"></span>
																		</button>
																		</div>
																	</div>
																</form>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="modal-footer">
											
										</div>
									</div>
								</div>
							</div>
							<!-- modal asset complaint starts here -->
							<div class="modal fade" id="assetComplaintTicketModuleModal"  data-backdrop="static" data-keyboard="false"
								role="dialog" aria-labelledby="assetComplaintTicketModuleModal"
								aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">Complaint
									         <div class="pull-right" style="margin-right: 15px;">
										         <button type="button" class="btn btn-primary btn-danger" data-dismiss="modal">Close</button>
											</div>
										</h5>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Asset Description</div>
															<div class="panel-body">
																<div class="row">
																	<div class="form-row">
																		<div style="height: 100%; margin-left: 2%;" >
																			<div style='width: 98%; padding: 1%; font-weight: normal;height:190px;overflow-y: scroll; border: 1px solid #436a9d;' >
																				<table  id = "assetMaintenanceDecriptionTableId" class="table table-bordered table-striped table-condensed">
																					<thead class='cf' style='background: white;'>
																						<tr>
																							<th class='col-md-1 center'><div>Sr.No</div></th>
																							<th class='col-md-2 center'><div>Maintenance Contract</div></th>
																							<th class='col-md-1 center'><div>Duration</div></th>
																							<th class='col-md-1 center'><div>Time Period</div></th>
																							<th class='col-md-2 center'><div>Service Provider</div></th>
																							<th class='col-md-1 center'><div>Service Cost</div></th>
																							<th class='col-md-1 center'><div>From Date</div></th>
																							<th class='col-md-2 center'><div>To Date</div></th>
																							<th class='col-md-1 center'><div>Status</div></th>
																						</tr>
																					</thead>
																					<tbody id="assetMaintenanceDecriptionTBodyId">
																					
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
										<div class="modal-footer">
											
										</div>
									</div>
								</div>
							</div>
							<!-- modal asset complaint ends here -->
							<!-- view modal starts here -->
							<div class="modal fade" id="assetComplaintViewModuleModal" tabindex="-1" data-backdrop="static" data-keyboard="false"
								role="dialog" aria-labelledby="assetComplaintModuleModal"
								aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">Ticket Management
									         <div class="pull-right" style="margin-right: 15px;">
										         <button type="button" class="btn btn-primary btn-danger" data-dismiss="modal" onclick="refreshAssetComplaintViewDetails();">Close</button>
											</div>
										</h5>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Complaint Details 
																</div>
															<div class="panel-body">
																<form id="assetTicketManagementFormId" onsubmit="return false">
																	<div class="row">
																	
																		<div class="form-group col-md-2">
																			<label for="asset name">Department<b
																				style="color: red;">*</b></label>
																				<select class="form-control" id="deptClosedTicketId" disabled="disabled">
																				<option value="0">--Select Department--</option>
																			</select>
																		</div>
																		
																		<div class="form-group col-md-2">
																			<label for="asset name">Hospital Department<b
																				style="color: red;">*</b></label>
																				<select class="form-control" id="hospitalDeptClosedTicketId" disabled="disabled">
																				<option value="0">--Select Hospital Department--</option>
																			</select>
																		</div>
																	
																		<div class="form-group col-md-2">
																			<label for="asset name">Item Name<b
																				style="color: red;">*</b></label>
																				<select class="form-control" id="assetNameAssetTicketId" disabled="disabled">
																				<option value="0">--Select Item Name--</option>
																			</select>
																		</div>
																		<div class="form-group col-md-2">
																			<label for="product category">Product Category<b
																				style="color: red;">*</b></label>
																				<select class="form-control" id="productCategoryAssetTicketId" disabled="disabled">
																				<option value="0">--Select Category--</option>
																			</select>
																		</div>
																		<div class="form-group col-md-2">
																			<label for="serial number">Batch No.</label>
																				<select class="form-control" id="batchNumberClosedTicketId" disabled="disabled">
																				<option value="0">--Select Batch No--</option>
																			</select>
																		</div>
																		
																		<div class="form-group col-md-2">
																			<label for="serial number">Serial No.<b
																				style="color: red;">*</b></label>
																				<select class="form-control" id="serialNumberAssetTicketId" disabled="disabled">
																				<option value="0">--Select Serial No--</option>
																			</select>
																		</div>
																	</div>
																	<div class="row">

																		<div class="form-group col-md-2">
																			<label for="complain">Complaint<b
																				style="color: red;">*</b></label>
																				<select class="form-control" id="complainTypeAssetTicketId" disabled="disabled">
																				<option value="0">--Select Complaint Type--</option>
																				<option value="Maintenance">Maintenance</option>
																				<option value="Breakdown">Breakdown</option>
																				<option value="Others">Others</option>
																			</select>
																		</div>
																		
																		<div class="form-group col-md-2">
																			<label for="complainant contact no">Complainant Contact No.</label> 
																			<input type="text"	class="form-control tip-focus"	id="contactNoAssetTicketId" readonly="readonly"
																				placeholder="please Enter Contact No." title="Please Enter Contact No."
																				name="supplier">
																		</div>
																		
																		<div class="form-group col-md-2">
																			<label for="location">Location</label> 
																			<textarea type="text" class="form-control" required="true"	disabled="disabled"
																			id="locationAssetTicketId" placeholder="Enter Location"></textarea>
																		</div>

																		<div class="form-group col-md-4">
																			<label for="desciprtion">Description<b
																				style="color: red;">*</b></label> 
																			<textarea type="text" class="form-control" required="true" disabled="disabled"	
																			id="descriptionAssetTicketId"></textarea>
																		</div>
																	</div>
																	<div class="row">
																		<div class="form-group col-md-2">
																			<label for="priority">Rate Of Inconvenience<b
																				style="color: red;">*</b></label>
																				<select class="form-control" id="rateAssetTicketId" disabled="disabled">
																				<option value="">--Select Rate--</option>
																				<option value="1">1</option>
																				<option value="2">2</option>
																				<option value="3">3</option>
																				<option value="4">4</option>
																				<option value="5">5</option>
																				<option value="6">6</option>
																				<option value="7">7</option>
																				<option value="8">8</option>
																				<option value="9">9</option>
																				<option value="10">10</option>
																			</select>
																		</div>

																		<div class="form-group col-md-2">
																			<label for="priority">Priority<b
																				style="color: red;">*</b></label>
																				<select class="form-control" id="priorityAssetTicketId" onchange="changeUrgentStatus();" disabled="disabled">
																				<option value="0">--Select Priority--</option>
																				<option value="Low">Low</option>
																				<option value="Medium">Medium</option>
																				<option value="High">High</option>
																			</select>
																		</div>
																		<div class="form-group col-md-2">
																			<label for="priority">Urgent
																		<input readonly="readonly"  id="urgencyAssetTicketId" onclick="checkForPriorityAssetComplaint();" value="No" type="checkbox">
																		</label>
																		</div>
																		<div class="form-group col-md-2">
																			<label for="priority">Ticket Status<b
																				style="color: red;">*</b></label>
																				<select class="form-control" disabled="disabled" id="ticketStatusManagementId">
																				<option value="0">--Select Ticket Status--</option>
																				<option value="OPEN">OPEN</option>
																				<option value="INPROCESS">INPROCESS</option>
																				<option value="PENDING">PENDING</option>
																				<option value="CLOSED">CLOSED</option>
																			</select>
																		</div>
																		<div class="pull-right" style="margin-right: 15px;">
																		 <button type="button" class="btn btn-primary">
																		   Warranty  <span class="badge badge-light" id="productWarrantyTicketSpanTagId"></span>
																		</button>
																		</div>
																	</div>
																</form>
															</div>
														</div>
													</div>
												</div>
											</div>
											<!-- slave table starts here -->
											<div class="container" style="margin-top: 2%;">
											<ul class="nav nav-tabs">
												<li class="active"><a data-toggle="tab" href="#ticketDiscrption">Ticket Description</a></li>
											</ul>
											<div class="tab-content">
											<div id="ticketDiscrption" class="tab-pane fade in active">
												<div class="panel panel-primary" style="margin-top: 20px; height: 320px ">
													<div class="panel-body">
														<form>
															<div class="row">
																<div class="form-row">
																<div style="height: 100px; margin-left: 2%;" >
																	<div style='width: 98%; padding: 1%; font-weight: normal; 
																	height:190px;overflow-y: scroll; border: 1px solid #436a9d;' >
																		<table  id = "assetTicketSlaveTableId" 
																		class="table table-bordered table-striped table-condensed">
																		<thead class='cf' style='background: white;'>
																		<tr>
																		<th class='col-md-2 center'><div>Sr.No</div></th>
																		<th class='col-md-1 center'><div>Date</div></th>
																		<th class='col-md-1 center'><div>Raised By</div></th>
																		<th class='col-md-2 center'><div>Comment</div></th>
																		</tr>
																		</thead>
																		<tbody id="assetTicketManagementSlaveTBodyId">
																		
																		</tbody>
																		</table>
																</div>
															</div>
															</div>
														</div>	
														</form>
													</div>
												</div>
											</div>
											</div>
											</div>
											<!-- slave table ends here -->
										</div>
										<div class="modal-footer">
											
										</div>
									</div>
								</div>
							</div>
							<!-- view modal ends here -->
							
							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
								<div>
										<ul class="nav nav-tabs">
											<li class="active"><a data-toggle="tab" href="#processedComplaintsTab">
											<span class="hidden-inline-mobile">Processed Complaints</span></a>
											</li>
											<li><a data-toggle="tab" href="#closedComplaintsTab" onclick="getClosedComplaintsRecords();">
											<span class="hidden-inline-mobile"> Closed Complaints</span></a>
											</li>
										</ul>
									</div>
									<div class="tab-content">
									<!-- processed complaints tab start here -->
									<div id="processedComplaintsTab" class="tab-pane fade in active">					
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="row">
											<!-- <div class="col-md-12">
											<div class="form-group col-md-2">
											<label for="from date">From Date</label>
												<input type="text"	class="form-control tip-focus"	id="fromDateSearchId"
												placeholder="please enter from date"
												name="supplier">
											</div>
											<div class="form-group col-md-2">
											<label for="to date">To Date</label>
												<input type="text"	class="form-control tip-focus"	id="toDateSearchId"
												placeholder="please enter to date"
												name="supplier">
											</div>
											<div class="form-group col-md-2">
											<label for="product category search">Product Category</label>
												<select class="form-control" onchange="getCategoryWiseAssetName(this.value)" id="productCategoryAssetComplaintSearchId">
												<option value="0">--Select Category--</option>
											</select>
											</div>
											<div class="form-group col-md-2">
											<label for="asset name search">Asset Name</label>
												<select class="form-control" id="assetNameAssetComplaintSearchId">
												<option value="0">--Select Asset Name--</option>
											</select>
											</div>
											<div class="form-group col-md-2">
											<label for="search button"></label>
											<button class="btn btn-primary form-control"
													type="button" onclick="" style="height: 25px; margin-bottom: 10px">
													<span class="fa fa-search" aria-hidden="true"> </span>
													Search!
												</button>
											</div>
											</div> -->
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row">
															<div class="col-md-12">
																<div class="col-sm-12">
																	<div class="pull-right">
																		<div id="datatable1_filter" class="dataTables_filter">
																			<label id="searchlabel"> </label>
																		</div>
																	</div>
																</div>
																<div class="panel panel-primary"
																	style="margin-top: 20px">
																	<div class="panel-heading" id="divEhatContent">Processed Complaint Details</div>
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="assetComplaintTableId" cellpadding="0" cellspacing="0"
																			border="0"
																			class="table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Created Date</th>
																					<th class="col-md-1 center">Ticket ID</th>
																					<th class="col-md-1 center">Raised By</th>
																					<th class="col-md-1 center">Product Category</th>
																					<th class="col-md-1 center">Item Name</th>
																					<th class="col-md-1 center">Department</th>
																					<th class="col-md-1 center">Hospital Department</th>
																					<th class="col-md-1 center">Complaint</th>
																					<th class="col-md-1 center">Status</th>
																					<th class="col-md-1 center">Priority</th>
																					<th class="col-md-1 center">Rate</th>
																					<th class="col-md-1 center">Urgency</th>
																					<th class="col-md-1 center">Edit</th>
																					<th class="col-md-1 center">View</th>
																				</tr>
																			</thead>
																			<tbody id="assetComplaintTableBodyId">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
														</div>
														<!--    Starting pagination    -->
														<div style="margin-top: -2%;">
															<div class="pull-right">
																<ul class="pagination pagination-blue margin-bottom-10"
																	id="assetComplaintRecordPagination">
																</ul>
															</div>
															<div class="row">
																<div class="col-md-4 col-md-offset-8">
																	<div class="pull-right">
																		<ul
																			class="pagination pagination-blue margin-bottom-10"
																			id="totalNumberOfPagesAssetComplaint">
																		</ul>
																	</div>
																</div>
															</div>
														</div>
														<!--   Ending  pagination -->
													</div>
												</div>
											</div>

										</div>
									</div>
									</div>
									<!-- processed complaints tab ends here -->
									<!-- closed complaints tab start here -->
									<div id="closedComplaintsTab" class="tab-pane">					
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="row">
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row" style="margin-top: 10px">
															<div class="col-md-12">
																<div class="col-sm-12">
																	<div class="pull-right">
																		<div id="datatable1_filter" class="dataTables_filter">
																			<label id="searchlabel"> </label>
																		</div>
																	</div>
																</div>
																<div class="panel panel-primary"
																	style="margin-top: 20px">
																	<div class="panel-heading" id="divEhatContent">Closed Complaint Details</div>
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="assetComplaintTableId" cellpadding="0" cellspacing="0"
																			border="0"
																			class="table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Created Date</th>
																					<th class="col-md-1 center">Ticket ID</th>
																					<th class="col-md-1 center">Raised By</th>
																					<th class="col-md-1 center">Product Category</th>
																					<th class="col-md-1 center">Item Name</th>
																					<th class="col-md-1 center">Department</th>
																					<th class="col-md-1 center">Hospital Department</th>
																					<th class="col-md-1 center">Complaint</th>
																					<th class="col-md-1 center">Status</th>
																					<th class="col-md-1 center">Priority</th>
																					<th class="col-md-1 center">Rate</th>
																					<th class="col-md-1 center">Urgency</th>
																					<th class="col-md-1 center">View</th>
																				</tr>
																			</thead>
																			<tbody id="assetClosedComplaintTableBodyId">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<!--    Starting pagination    -->
											<div style="margin-top: -2%;">
												<div class="pull-right">
													<ul class="pagination pagination-blue margin-bottom-10"
														id="assetClosedComplaintRecordPagination">
													</ul>
												</div>
												<div class="row">
													<div class="col-md-4 col-md-offset-8">
														<div class="pull-right">
															<ul
																class="pagination pagination-blue margin-bottom-10"
																id="totalNumberOfPagesAssetClosedComplaint">
															</ul>
														</div>
													</div>
												</div>
											</div>
											<!--   Ending  pagination -->

										</div>
									</div>
									</div>
									<!-- closed complaints tab ends here -->
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
		jQuery(document).ready(function() {		
			App.setPage("wizards_validations");  //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			getAllAssetCategory();
			getAllAssetComplaintsData();
			getAllHospitalDepartment();
			$("#productCategoryAssetComplaintSearchId").select2();
			$("#assetNameAssetComplaintSearchId").select2();
		});
		onload = function() {
			getAllDepartment();
			getAllItemInvAndSubInv();
			//getAllBatchNo();
		}
		</script>
		<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>" />
		<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>" />
		<input type="hidden" id="userNameId" value="<%=session.getAttribute("userName")%>" />
		<input type="hidden" id="RowCount" value="0" />
		<input type="hidden" id="assetComplaintMasterId" value="0" />
		<input type="text" id="ticketStatusId" value="OPEN" />
		<input type="text" id="assetItemStatusId" value="0" />
		<input type="text" id="assetItemId" value="0" />
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	<!-- include js for development -->
      <script type="text/javascript" src="js/ehat_inv_complaints.js"></script>
      <script type="text/javascript" src="js/ehat_inv_ticket_management.js"></script>
      <script type="text/javascript" src="js/ehat_inv_pagination.js"></script>
      <!-- include js for development of po -->
</body>
</html>
