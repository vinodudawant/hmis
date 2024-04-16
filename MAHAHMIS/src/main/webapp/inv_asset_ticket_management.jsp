<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Ticket Management</title>
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
												href="inv_asset_ticket_management.jsp">Ticket Management</a></li>
										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>
							<!-- modal starts here -->
							<div class="modal fade" id="assetTicketManagementModuleModal" tabindex="-1" data-backdrop="static" data-keyboard="false"
								role="dialog" aria-labelledby="assetComplaintModuleModal"
								aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">Ticket Management
									         <div class="pull-right" style="margin-right: 15px;">
										         <button type="button" id="saveAssetTicketManagement" class="btn btn-primary" onclick="saveAssetTicketManagement();">Save</button>
										         <button type="button" class="btn btn-primary btn-danger" data-dismiss="modal" onclick="refreshAssetTicketManagementDetails();">Close</button>
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
																			<label for="asset name">Department</label>
																				<select class="form-control" id="deptNameAssetTicketId" disabled="disabled">
																				<option value="0">--Select Department--</option>
																			</select>
																		</div>
																		<div class="form-group col-md-2">
																			<label for="asset name">Hospital Department</label>
																				<select class="form-control" id="hopsDeptNameAssetTicketId" disabled="disabled">
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
																			<label for="serial number">Batch No.<b
																				style="color: red;">*</b></label>
																				<select class="form-control" id="batchNumberAssetTicketId" disabled="disabled">
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
																			<label for="desciprtion">Description</label> 
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
																				<select class="form-control" id="ticketStatusManagementId">
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
											<div class="form-group col-md-3 pull-right" style="margin-top: 7px;" id="plusMinusButtonDivIdGeneratedMrn">
												<div class="form-group col-md-8">
													<button type="button"
														class="btn btn-success btn-number"
														onclick="addNewRowInTableByAddButton('assetTicketSlaveTableId','assetTicketSlaveTable')">
														<span class="glyphicon glyphicon-plus"></span>
													</button>
													<!-- <button type="button"
														class="btn btn-danger btn-number"
														onclick="removeRowFromTableForSI('assetTicketSlaveTableId','chkMrnItem')">
														<span class="glyphicon glyphicon-minus"></span>
													</button> -->
												</div>
											</div>
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
							<!-- modal ends here -->
							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
								<div>
										<ul class="nav nav-tabs">
											<li class="active"><a data-toggle="tab" href="#processedTicketTab">
											<span class="hidden-inline-mobile">Processed Complaints</span></a>
											</li>
											<li>
											<a data-toggle="tab" href="#closedTicketTab" onclick="getClosedTicketsRecords();">
											<span class="hidden-inline-mobile">Closed Complaints</span></a>
											</li>
										</ul>
									</div>
									<div class="tab-content">		
									<!-- processed ticket tab start here -->
									<div id="processedTicketTab" class="tab-pane fade in active">			
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="row">
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row" style="margin-top: 10px">
														<div class="col-md-12">
															<div class="form-group col-md-2">
															<label for="from date">From Date</label>
																<input type="text"	class="form-control tip-focus"	id="fromDateTicketSearchId"
																placeholder="please enter from date"
																name="supplier" autocomplete="off">
															</div>
															<div class="form-group col-md-2">
															<label for="to date">To Date</label>
																<input type="text"	class="form-control tip-focus"	id="toDateTicketSearchId"
																placeholder="please enter to date"
																name="supplier" autocomplete="off">
															</div>
															<div class="form-group col-md-2">
															<label for="asset name search">Item Name</label>
																<select class="form-control" onchange="getItemWiseCategory(this.value);" id="assetNameTicketSearchId">
																<option value="0">--Select Item Name--</option>
															</select>
															</div>
															<div class="form-group col-md-2">
															<label for="product category search">Product Category</label>
																<select class="form-control" id="productCategoryTicketSearchId">
																<option value="0">--Select Category--</option>
															</select>
															</div>
															<div class="form-group col-md-2">
																<label for="location name">Department
																</label> 
																<select class="form-control" id="assetTicketDepartmentId">
																	<option value="0">--Select Department--</option>
																</select>
															</div>
															<div class="form-group col-md-2">
																<label for="location name">Hospital Dept
																</label> 
																<select class="form-control" id="assetTicketHospitalDeptId">
																	<option value="0">--Select Hospital Dept--</option>
																</select>
															</div>
															<div class="form-group col-md-2">
															<label for="search button"></label>
															<button class="btn btn-primary form-control" onclick="universalSearchAssetTicketManagement('Others');"
																	type="button" onclick="" style="height: 25px; margin-bottom: 10px">
																	<span class="fa fa-search" aria-hidden="true"> </span>
																	Search!
																</button>
															</div>
															</div>
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
																	<div class="panel-heading" id="divEhatContent">Processed Ticket Management</div>
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
																					<th class="col-md-1 center">Action</th>
																				</tr>
																			</thead>
																			<tbody id="assetTicketManagementTableBodyId">
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
									<!-- processed ticket tab ends here -->
									<!-- closed ticket tab start here -->
									<div id="closedTicketTab" class="tab-pane">			
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="row">
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row" style="margin-top: 10px">
														<div class="col-md-12">
															<div class="form-group col-md-2">
															<label for="from date">From Date</label>
																<input type="text"	class="form-control tip-focus"	id="fromDateClosedTicketSearchId"
																placeholder="please enter from date"
																name="supplier">
															</div>
															<div class="form-group col-md-2">
															<label for="to date">To Date</label>
																<input type="text"	class="form-control tip-focus"	id="toDateClosedTicketSearchId"
																placeholder="please enter to date"
																name="supplier">
															</div>
															<div class="form-group col-md-2">
															<label for="asset name search">Item Name</label>
																<select class="form-control" onchange="getItemWiseCategory(this.value);" id="assetNameClosedTicketSearchId">
																<option value="0">--Select Item Name--</option>
															</select>
															</div>
															<div class="form-group col-md-2">
															<label for="product category search">Product Category</label>
																<select class="form-control" id="productCategoryClosedTicketSearchId">
																<option value="0">--Select Category--</option>
															</select>
															</div>
															<div class="form-group col-md-2">
																<label for="location name">Department
																</label> 
																<select class="form-control" id="assetTicketClosedDepartmentId">
																	<option value="0">--Select Department--</option>
																</select>
															</div>
															<div class="form-group col-md-2">
																<label for="location name">Hospital Dept
																</label> 
																<select class="form-control" id="assetTicketClosedHospitalDeptId">
																	<option value="0">--Select Hospital Dept--</option>
																</select>
															</div>
															<div class="form-group col-md-2">
															<label for="search button"></label>
															<button class="btn btn-primary form-control" onclick="universalSearchAssetTicketManagement('Closed');"
																	type="button" onclick="" style="height: 25px; margin-bottom: 10px">
																	<span class="fa fa-search" aria-hidden="true"> </span>
																	Search!
																</button>
															</div>
															</div>
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
																	<div class="panel-heading" id="divEhatContent">Closed Ticket Management</div>
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
																			<tbody id="assetClosedTicketManagementTableBodyId">
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
		jQuery(document).ready(function() {		
			App.setPage("wizards_validations");  //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			
			var nowTemp = new Date();
			var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp
					.getDate(), 0, 0, 0, 0);
			var checkin = $('#dpd1').datepicker({
				onRender : function(date) {
					return date.valueOf() < now.valueOf() ? 'disabled' : '';
				}
			}).on('changeDate', function(ev) {

				if (ev.date.valueOf() > checkout.date.valueOf()) {
					var newDate = new Date(ev.date);
					newDate.setDate(newDate.getDate() + 1);
					checkout.setValue(newDate);
				}
				checkin.hide();
				$('#dpd2')[0].focus();
			}).data('datepicker');

			var checkout = $('#dpd2').datepicker({
				onRender : function(date) {
					return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
				}
			}).on('changeDate', function(ev) {
				checkout.hide();
			}).data('datepicker');
			
			new JsDatePick({
				useMode : 2,
				target : "fromDateTicketSearchId",
				yearsRange : [ 1920, 2099 ],
				limitToToday : false,
				dateFormat : "%Y-%m-%d",
				imgPath : "../img/",
				weekStartDay : 1,
			});
			
			new JsDatePick({
				useMode : 2,
				target : "toDateTicketSearchId",
				yearsRange : [ 1920, 2099 ],
				limitToToday : false,
				dateFormat : "%Y-%m-%d",
				imgPath : "../img/",
				weekStartDay : 1,
			});
			
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
			getAllAssetTicketsComplaintsData();
			addNewRowInTable('assetComplaintSlaveTableId','assetComplaintSlaveTable');
			$("#productCategoryTicketSearchId").select2();
			$("#assetNameTicketSearchId").select2();
			$("#productCategoryClosedTicketSearchId").select2();
			$("#assetNameClosedTicketSearchId").select2();

			
		});
		</script>
		<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<input type="text" id="assetTicketManagementMasterId" value="0" />
		<input type="hidden" id="userNameId" value="<%=session.getAttribute("userName")%>" />
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
