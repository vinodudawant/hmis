<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Item Asset Maintenance</title>
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
<!--calender Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>

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
	href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />
<!-- include js for development -->
<script type="text/javascript" src="js/ehat_inventory.js"></script>
<script type="text/javascript" src="js/ehat_inv_pagination.js"></script>
<script type="text/javascript" src="js/inv_item_asset_maintenance.js"></script>
<script type="text/javascript" src="js/ehat_inv_complaints.js"></script>
<!-- bootstrap datepicker -->
<link rel="stylesheet" href="ehat-design/datepicker/datepicker3.css">
<link rel="stylesheet" type="text/css"
	href="css/inventoryDatepicker/css/jsDatePick_ltr.css" />
<!-- BOOTSTRAP SWITCH -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-switch/bootstrap-switch.min.css" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<!--Below CSS added by Rohit on 14-05-2021 To stick the table head -->
<style>
table {
  font-family: "Fraunces", serif;
  font-size: 100%;
  margin: 0;
  border: none;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid black;
}
table td,
table th {
  border: 1px solid black;
  padding: 0.5rem 1rem;
}
table thead th {
  padding: 3px;
  position: sticky;
  top: 0;
  z-index: 1;
  width: 25vw;
  background: white;
}
table td {
  background: #fff;
  padding: 4px 5px;
  text-align: center;
}

table tbody th {
  font-weight: 100;
  font-style: italic;
  text-align: left;
  position: relative;
}
table tbody th {
  position: sticky;
  left: 0;
  background: white;
  z-index: 1;
}
caption {
  text-align: left;
  padding: 0.25rem;
  position: sticky;
  left: 0;
}

[role="region"][aria-labelledby][tabindex] {
  width: 100%;
  max-height: 98vh;
  overflow: auto;
}
[role="region"][aria-labelledby][tabindex]:focus {
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.5);
  outline: 0;
}
</style>
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
												href="inv_item_maintenace.jsp">Item Asset Maintenance</a></li>
										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-12">
								<div class="container-fluid">
								<div class="panel panel-primary">
								<div class="panel-heading" id="divEhatContent">Asset Maintenance Search</div>
								<div class="panel-body">
								<div class="form-group col-md-2 col-sm-2 col-xs-12">
								<div class="form-check form-check-inline">
								  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="labEquipmentSearchId" onclick="getLabEquipmentOrAssetItems(this.value)"  value="LABEQUIPMENT">
								  <label class="form-check-label" for="lab equipment">Lab Equipments</label>
								</div>
								<div class="form-check form-check-inline">
								  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="assetSearchId" onclick="getLabEquipmentOrAssetItems(this.value)" value="OTHER">
								  <label class="form-check-label" for="asset item">Asset Item</label>
								</div>

							</div>
							<div class="form-group col-md-2">
							<label for="from date">From Date</label>
								<input type="text" autocomplete="off"	class="form-control tip-focus"	id="fromDateMaintenanceSearchId"
								placeholder="please enter from date"
								name="supplier">
							</div>
							<div class="form-group col-md-2">
							<label for="to date">To Date</label>
								<input type="text"	autocomplete="off" class="form-control tip-focus"	id="toDateMaintenanceSearchId"
								placeholder="please enter to date"
								name="supplier">
							</div>
							<div class="form-group col-md-2">
							<label for="product category search">Product Category</label>
								<select class="" onchange="getCategoryWiseAssetName(this.value)" id="productCategoryMaintenanceSearchId">
								<option value="0">--Select Category--</option>
							</select>
							</div>
							<div class="form-group col-md-4">
							<label for="asset name search">Asset Name</label>
								<select class="form-control" onchange="getAssetWiseSerialNumber(this.value)" id="assetNameMaintenanceSearchId">
								<option value="0">--Select Asset Name--</option>
							</select>
							</div>
							
							
							
							<div class="form-group col-md-2">
							<label for="serial number search">Serial No.</label>
								<select class="form-control" id="serialNoMaintenanceSearchId">
								<option value="0">--Select Serial No.--</option>
							</select>
							</div>
							<div class="form-group col-md-2">
							<label for="serial number search">Department</label>
								<select class="form-control" id="assetMaintenanceMasterDepartmentId">
								<option value="NA">--Select Department--</option>
							</select>
							</div>
							<div class="form-group col-md-2">
							<label for="serial number search">Hospital Dept</label>
							<select class="form-control" id="assetMaintenanceMasterHospitalDeptId">
								<option value="NA">--Select Hospital Dept--</option>
							</select>
							</div>
							<div class="form-group col-md-2">
							<label for="asset name search"></label>
							<button class="btn btn-xs btn-primary" style="margin-top: 20px;"  onclick="universalSearchAssetMaintenance();"
									type="button" onclick="">
									<span class="fa fa-search" aria-hidden="true"> </span>
									Search!
								</button>
							</div>
								
							</div>
							</div>
							</div>
							</div>
							</div>
							<!-- modal starts here -->
							<!-- style="overflow:hidden;" -->
							<div class="modal fade" id="assetModal"  data-backdrop="static" 
							data-keyboard="false" role="dialog" aria-labelledby="itemMasterModalLabel" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h3 class="modal-title">
												Item Asset Maintenance
												<div class="pull-right" style="margin-right: 15px;">
													<button type="button" id="saveGrn" class="btn btn-primary"
														onclick="saveItemAssetMaintenace()">Save</button>
													<button type="button" class="btn btn-primary btn-danger"
														onclick="closeAssetMaintenancePopUp('inv_item_maintenace.jsp');" data-dismiss="modal">Close</button>
												</div>
											</h3>
										</div>
										<div class="modal-body" style="padding: 0px !important;">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Item Asset Maintenance</div>
															<div class="panel-body">
																<form id="financialFormId" onsubmit="return false" enctype="multipart/form-data">
																	<div class="row">
																	<input type="hidden" id="productWarrantyDurationId" />
																	<input type="hidden" id="productWarrantyTimePeriodId" />
																		<div class="col-md-4">
																			<div class="row">
																				<!-- <div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="grnId">Asset Name :</label>
																				</div> -->
																				<div class="form-group col-md-12 col-sm-12 col-xs-12">
																					<label for="grnId">Asset Name :</label>
																					<input type="text" placeholder="Asset Name" readonly="readonly"
																						class="form-control tip-focus" id="assetName"
																						 name="Asset Name">
																				</div>
																				<!-- <div class="form-group col-md-4 col-sm-4 col-xs-12">
																					
																				</div> -->
																				<div class="form-group col-md-12 col-sm-12 col-xs-12">
																					<label for="Manufacture Name">Mfr Name:</label>
																					<input id="manufactureName" readonly="readonly"
																						class="form-control input-SmallText" type="text"
																						name="Manufacture Name" placeholder="Manufacture Name"
																						value="">
																				</div>
																				<!-- <div class="form-group col-md-4 col-sm-4 col-xs-12">
																					
																				</div> -->
																				<div class="form-group col-md-12 col-sm-12 col-xs-12">
																					<label for="Installation date">Installation Date
																					<b style="color: red;">*</b></label>
																					<input id="installationDateId" readonly="readonly"
																						class="form-control input-SmallText" type="text" 
																						placeholder="Enter Installation Date">
																				</div>
																				<!-- <div class="form-group col-md-4 col-sm-4 col-xs-12">
																					
																				</div> -->
																				<div class="form-group col-md-12 col-sm-12 col-xs-12">
																					<label for="Manufacture Name">Unit price(W/O GST)</label>
																					<input id="unitPriceId"
																						class="form-control input-SmallText" readonly="readonly" type="text"
																						placeholder="Enter Unit price(W/O GST)">
																				</div>
																				
																			</div>
																		</div>
																		<div class="col-md-4">
																			<div class="row">
																				<!-- <div class="form-group col-md-4 col-sm-4 col-xs-12">
																					
																				</div> -->
																				<div class="form-group col-md-12 col-sm-12 col-xs-12">
																					<label for="Party Name">Party Name :</label>
																					<input type="text" class="form-control tip-focus" readonly="readonly"
																						id="partyName" placeholder="Party Name"
																						title="Party Name" name="Party Name">
																				</div>

																				<!-- <div class="form-group col-md-4 col-sm-4 col-xs-12">
																					
																				</div> -->
																				<div class="form-group col-md-12 col-sm-12 col-xs-12">
																					<label for="Purchase Date">Purchase Date :</label>
																					<input type="text" class="form-control tip-focus" readonly="readonly"
																						id="purchaseDate"
																						placeholder="Purchase Date" onclick="setWarrantyFromDate();"
																						title="Purchase Date"
																						name="purchaseDate">
																				</div>
																				<!-- <div class="form-group col-md-4 col-sm-4 col-xs-12">
																					
																				</div> -->
																				<div class="form-group col-md-12 col-sm-12 col-xs-12">
																					<label for="Manufacture Name">Warranty From Date</label>
																					<input id="warrantyFromId"  onclick="setWarrantyFromDate();"
																						class="form-control input-SmallText" type="text"
																						placeholder="Enter Warranty From Date">
																				</div>
																				<!-- <div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="Manufacture Name">Org. FAR No.</label>
																				</div> -->
																				<div class="form-group col-md-12 col-sm-12 col-xs-12">
																					<label for="Org. FAR No.">Org. FAR No.</label>
																					<input id="orgFarNoId"
																						class="form-control input-SmallText" type="text"
																						placeholder="Enter Org. FAR No">
																				</div>
																				
																			</div>
																		</div>
																		<div class="col-md-4">
																			<div class="row">
																				<!-- <div class="form-group col-md-4 col-sm-4 col-xs-12">
																					
																				</div> -->
																				<div class="form-group col-md-12 col-sm-12 col-xs-12">
																					<label for="status">Asset/Item Id :</label>
																					<input type="text" class="form-control tip-focus" readonly="readonly"
																						id="assetId"
																						placeholder="Asset Id"
																						title="Asset Id"
																						name="Asset Id">
																				</div>
																				<!-- <div class="form-group col-md-4 col-sm-4 col-xs-12">
																					
																				</div> -->
																				<div class="form-group col-md-12 col-sm-12 col-xs-12">
																					<label for="Serial No">Serial No :</label>
																					<input id="serialNo" readonly="readonly"
																						class="form-control input-SmallText" type="text"
																						name="Serial No" placeholder="Serial No"
																						value="">
																				</div>
																				<!-- <div class="form-group col-md-4 col-sm-4 col-xs-12">
																					
																				</div> -->
																				<div class="form-group col-md-12 col-sm-12 col-xs-12">
																					<label for="Manufacture Name">Warranty To Date</label>
																					<input id="warrantyToId" onclick="getProductWarrantyToDate();" readonly="readonly"
																						class="form-control input-SmallText" type="text"
																						placeholder="Enter Warranty To Date">
																				</div>
																				<!-- <div class="form-group col-md-4 col-sm-4 col-xs-12">
																					
																				</div> -->
																				<div class="form-group col-md-12 col-sm-12 col-xs-12">
																					<label for="Installation date">Purchase Ref</label>
																					<textarea id="purchaseRefId"
																						class="form-control input-SmallText" 
																						placeholder="Enter Purchase Ref"></textarea>
																				</div>
																				
																				<div class="pull-right" style="margin-right: 15px;">
																					 <button type="button" class="btn btn-primary">
																					   Warranty Details <span class="badge badge-light" id="productWarrantySpanTagId"></span>
																					</button>
																				</div>
																			</div>
																		</div>
																	</div>
																	<!-- <span class="badge badge-primary">Item No</span> -->
																</form>
															</div>
														</div>
														<div class="container" style="margin-top: 2%;">
															<ul class="nav nav-tabs">
																<li class="active"><a data-toggle="tab" id="descInfoTabId"  href="#descriptionTab">Description</a></li>
																<li><a data-toggle="tab" href="#locationInfo">Location</a></li>
																<!-- <li><a data-toggle="tab" href="#depreciationInfo">Depreciation</a></li> -->
																<li><a data-toggle="tab" href="#uploadDocumentsInfo">Upload Documents</a></li>
																<li><a data-toggle="tab" href="#detailsInfoTab" id="detailsAssetTabId"  style="display: none;">Details</a></li>
															</ul>
															<div class="tab-content">
																<!-- general tab starts here -->
																<div id="descriptionTab" class="tab-pane fade in active">
																	<div class="panel panel-primary"
																		style="">
																		<div class="panel-body" style="height: 250px ">
																			<form enctype="multipart/form-data">
																				<div class="row">
																					<div class="form-group col-md-3 pull-right" id="plusMinusButtonDivIdGeneratedMrn">
																					<div class="form-group col-md-8">
																						<button style="display: none;" type="button" id="addNewContract"
																							class="btn btn-success btn-number"
																							onclick="addNewRowInTableByAddButton('itemMaintenanceTableId','addAssetMaintenanceTableRow')">
																							<span class="glyphicon glyphicon-plus"></span>
																						</button>
																						<button type="button"
																							class="btn btn-danger btn-number"
																							onclick="removeRowFromTableForAssetMaintenance('itemMaintenanceTableId','chkAssetMaintenance')">
																							<span class="glyphicon glyphicon-minus"></span>
																						</button>
																						<button type="button"
																							class="btn btn-success btn-number"
																							onclick="setPreventiveMaintenanceContract()">
																							<span class="glyphicon">Add PM</span>
																						</button>
																					</div>
																					</div>
																				</div>
																				<div class="form-row">
																			<div style="margin-left: 2%;overflow: auto">
																				<div>
																					<table  id = "itemMaintenanceTableId" class="table table-bordered table-striped table-condensed">
																								<thead class='cf' style='background: white;'>
																									<tr>
																										<th>Select</th>
																										<th>Sr.No</th>
																										<th>Maintenance Contract</th>
																										<th>Duration</th>
																										<th>Time Period</th>
																										<th>Service Provider</th>
																										<th>Service Cost</th>
																										<th>From Date</th>
																										<th>To Date</th>
																										<th>Status</th>
																										<th>Remark</th>
																										<th>Alert Date</th>
																										<th>Remaining Days</th>
																										<th>Entry Date & Time</th>
																										<th>User Sign in (Name)</th>
																										<th style="display: none;"></th>
																									</tr>
																								</thead>
																								<tbody id="itemMaintenanceTableBodyId">
																									
																								</tbody>
																							</table>
																				</div>
																			</div>
																		</div>
																				
																			</form>
																		</div>
																	</div>
																</div>
																<!-- general tab ends here -->
																<!-- Asset location tab starts here -->
																 <div id="locationInfo" class="tab-pane fade">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<form enctype="multipart/form-data">
																				<div class="row">
																					<div class="col-md-12">
																						<!-- <div class="col-md-2 form-group">
																							<label for="asset maintenance location">Asset Maintenance Location</label> 
																							<select class="form-control" id="assetMaintenanceLocationId">
																								<option value="0">--Select Location--</option>
																							</select>
																						</div> -->
																						<div class="form-group col-md-4">
																							<label for="location name">Department
																							</label> 
																							<select class="form-control" id="assetMaintenanceDepartmentId">
																								<option value="0">--Select Department--</option>
																							</select>
																						</div>
																						<div class="form-group col-md-4">
																							<label for="location name">Hospital Dept
																							</label> 
																							<select class="form-control" id="assetMaintenanceHospitalDeptId">
																								<option value="0">--Select Hospital Dept--</option>
																							</select>
																						</div>
																						<div class="form-group col-md-4">
																							<label for="location name">Location Name
																							</label> <input type="text" placeholder="Enter Location Name" title="Location Name"
																								class="form-control tip-focus" id="assetMaintenanceLocationId"
																								name="AMC">
																						</div>
																						<div class="form-group col-md-4">
																							<label for="incharge name">Incharge Name</label> 
																							<input type="text" class="form-control tip-focus"
																								id="inchargeNameId"
																								placeholder="Incharge Name"
																								title="Enter Incharge Name"
																								name="inchargeNameId">
																						</div>
																						<div class="form-group col-md-4">
																							<label for="incharge contact number">Incharge Contact Number
																							</label> <input type="text"
																								class="form-control tip-focus"
																								placeholder="Enter Incharge Contact Number" maxlength="10"
																								title="Incharge Contact Number" onkeypress="return validateNumOnly(event);"
																								id="inchargeContactNoId">
																						</div>
																					</div>
																					<div class="col-md-12">
																						<div class="form-group col-md-4">
																							<label for="remark">Remark
																							</label> <textarea 
																								class="form-control tip-focus" id="locationRemarkId"
																								placeholder="Remark"></textarea>
																						</div>
																					</div>
																				</div>
																			</form>
																		</div>
																	</div>
																</div>
																<!-- Asset location tab ends here -->
																<!-- Asset details tab starts here -->
																 <div id="detailsInfoTab" class="tab-pane fade">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<form enctype="multipart/form-data">
																				<div class="row">
																					<div class="col-md-12">
																						<div class="form-group col-md-4">
																							<label for="machine ownership type">Machine Ownership Type</label> 
																							<select class="form-control" id="machineOwnershipTypeId">
																								<option value="0">--Select Ownership Type--</option>
																								<option value="Owned">Owned</option>
																								<option value="Rental">Rental</option>
																								<option value="Lease">Lease</option>
																								<option value="Subscriptions">Subscriptions</option>
																							</select>
																							
																						</div>
																						<div class="form-group col-md-4">
																							<label for="Machine Owner">Machine Owner</label> 
																							<input type="text" class="form-control tip-focus" id="machineOwner" 
																							placeholder="Enter Machine Owner"
																							name="machineOwner">
																						</div>
																						<div class="form-group col-md-4">
																							<label for="used for">Used For </label> 
																							<input type="text" class="form-control tip-focus"
																								placeholder="Enter Used For"
																								id="usedForId">
																						</div>
																					
																					<div class="col-md-4 form-group">
																							<label for="department">Department</label> 
																							<select class="form-control" id="departmentId">
																								<option value="0">--Select Department--</option>
																							</select>
																					</div>
																					<div class="col-md-4 form-group">
																							<label for="test count">Test Count/Capacity</label> 
																							<input type="text" class="form-control tip-focus"
																								placeholder="Enter Test Count" maxlength="10"
																								onkeypress="return validateNumOnly(event);"
																								id="testCountId">
																						</div>
																						<div class="col-md-4 form-group">
																							<label for="reagent name">Reagent Name</label>
																							<select multiple class="form-control" id="reagentNameId">
																								<option value="0">--Select Reagent Name--</option>
																							</select> 
																						</div>
																						</div>
																				</div>
																			</form>
																		</div>
																	</div>
																</div>
																<!-- Asset details tab ends here -->
																<!-- Document upload tab starts here -->
																<div id="uploadDocumentsInfo" class="tab-pane fade">
																		<div class="panel panel-primary">
																			<form id="documentForm" name="documentForm" class=""
																					enctype="multipart/form-data" method="post">
																				<div class="panel-body">
																				<div class="col-md-12">
																				<div class="form-row">
																					<div class="col-md-4">
																						<div class="col-md-3">
																							<label>Select a File</label>
																						</div>
																						<div class="col-md-3">
																							<input type="file" id="uploadAssetMaintenanceDocument" name="uploadAssetMaintenanceDocs" />
																						</div>
																					</div>
																					<div class="col-md-4">
																						<div class="col-md-3">
																							<label>Comment:</label>
																						</div>
																						<div class="col-md-3">
																							<textarea id="uploadAssetMaintenanceDocumentComment"></textarea>
																						</div>
																					</div>
																					<div class="col-md-4">
																					<button type="button" value="Upload Document" class="btn btn-success"
																					onclick="uploadAssetMaintenenceDocuments()">Upload Document</button>
																					</div>
																				</div>
																				</div>
																				</div>
																				</form>
																				<div class="panel-body">
																				<div class="col-md-12">
																						<div style="font-weight: bold; overflow: auto;">
																							<table border="1"
																								class="table table-bordered table-hover table-responsive"
																								id="uploadedDocumentTable" style="overflow: auto;">
																								<thead>
																									<tr>
																										<th class="col-md-1 center">#</th>
																										<th class="col-md-1 center">Document</th>
																										<th class="col-md-1 center">Comment</th>
																										<th class="col-md-2 center">Date</th>
																										<th class="col-md-2 center">View</th>
																										<th class="col-md-2 center">Delete</th>
																									</tr>
																								</thead>
																								<tbody style="overflow-x: scroll; border: 1px solid #436a9d;"
																									id="uploadedDocumentAssetMaintenanceTBody"></tbody>
																							</table>
																						</div>
																					</div>
																				
																				</div>
																		</div>
																	<!-- </div> -->
																</div>
																<!-- Document upload tab ends here -->
															</div>
															<!-- start of document view -->
															<div class="modal fade bs-example-modal-lg" id="viewDocModal" tabindex="-1" role="dialog"  aria-labelledby="myLargeModalLabel" aria-hidden="true">
																<div class="modal-dialog modal-dialog modal-lg">
																	<div class="modal-content">
																		<div class="modal-header">
																			<div class="row">
																				<div class="col-md-4 col-xs-11">
																					<h3 class="modal-title" id="myModalLabel">View document</h3>
																				</div>
																				<br> <br>
																				<div class="col-md-6 col-xs-11">
																					<h5></h5>
																					<h6 id="documentComment"></h6>
																				</div>
																			</div>
																		</div>
																		<div class="modal-body">
																			<iframe id="viewDocumentAssetMaintenance" width="80%" height="280px"></iframe>
																		</div>
																	</div>
																</div>
															</div>
															<!-- end of document view -->
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="modal-footer"></div>
									</div>
								</div>
							</div>
							<!-- modal ends here -->

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12" style="margin-top: 5px;">
								<div>
										<ul class="nav nav-tabs">
											<li class="active"><a data-toggle="tab"
												href="#ProcessdQuotation" id="processdQuotation"><span
													class="hidden-inline-mobile">Item Asset Maintenance</span></a></li>
										</ul>
									</div>
									
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="row">
												<div class="col-md-12">
												<div class="pull-right" style="margin-bottom: 5px;">
													<button title="Color Indication" data-placement="left" class="btn btn-xs btn-danger">
													Lab Equipment</button>
													
													<button title="Color Indication" data-placement="left" class="btn btn-xs btn-warning">
													Asset Item</button>
											</div>
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
																<div class="panel panel-primary">
																	<div class="panel-heading" id="divEhatContent">Item Asset Maintenance</div>
																	<div class="panel-body" id="assetItemMaintenance"
																		style="overflow: auto;">
																		<table id="ehatTable" cellpadding="0" cellspacing="0" border="0"
																			class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Barcode Id</th>
																					<th class="col-md-1 center">Asset Id</th>
																					<th class="col-md-3 center">Asset Name</th>
																					<th class="col-md-2 center">Asset Category</th>
																					<th class="col-md-1 center">Department</th>
																					<th class="col-md-3 center">Hospital Department</th>
																					<th class="col-md-2 center">Purchase Date</th>
																					<th class="col-md-3 center">Serial No</th>
																					<th class="col-md-2 center">Edit</th>
																					<th class="col-md-3 center">Print Bar Code</th>
																					<th class="col-md-2 center">Delete</th>
																				</tr>
																			</thead>
																			<tbody id="assetMaintenance">
																			
																			</tbody>
																		</table>
																	</div>
																	<!--For Draft  -->
																</div>
															</div>
														</div>
														
														<!--    Starting pagination    -->
														<div style="margin-top: -2%;">
															<div class="pull-right">
																<ul class="pagination pagination-blue margin-bottom-10"
																	id="assetMaintenanceRecordPagination">
																</ul>
															</div>
															<div class="row">
																<div class="col-md-4 col-md-offset-8">
																	<div class="pull-right">
																		<ul
																			class="pagination pagination-blue margin-bottom-10"
																			id="totalNumberOfPagesAssetMaintenance">
																		</ul>
																	</div>
																</div>
															</div>
														</div>
														<!--   Ending  pagination -->
													</div>
												</div>
											</div>
											<!--    Starting pagination    -->
											<div style="margin-top: -2%;">
												<div class="pull-right">
													<ul class="pagination pagination-blue margin-bottom-10"
														id="grnRecordPagination">
													</ul>
												</div>
												<div class="row">
													<div class="col-md-4 col-md-offset-8">
														<div class="pull-right">
															<ul
																class="pagination pagination-blue margin-bottom-10"
																id="totalNumberOfPagesGRN">
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
		<!-- Auto-Suggestion 8/1/2015-->
		<script src="auto/jquery.mockjax.js"></script>
		<script src="auto/bootstrap-typeahead.js"></script>
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
		<!-- bootstrap datepicker -->
		<script src="ehat-design/datepicker/bootstrap-datepicker.js"></script>
		<!-- bootstrap datepicker new added  js-->
		<script src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"
			type="text/javascript"></script>
		<script src="css/inventoryDatepicker/js/jsDatePick.min.1.3.js"
			type="text/javascript"></script>

		<!-- CUSTOM SCRIPT -->
		<script src="ehat-design/js/script.js"></script>
		<script type="text/javascript" src="js/validate.js"></script>
		<!-- BOOTSTRAP SWITCH -->
		<script type="text/javascript" src="ehat-design/js/bootstrap-switch/bootstrap-switch.min.js"></script>
		<script type="text/javascript" src="js/ehat_inv_pagination.js"></script>
		<script type="text/javascript" src="js/inv_item_asset_maintenance.js"></script>

		<script>
			jQuery(document).ready(function() {
				App.setPage("wizards_validations"); //Set current page 
				App.init(); //Initialise plugins and elements  
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});
			});
			onload = function() {
				getAllItemAssetMaintenance();
				//to load all patholody departments on details tab 
				getPathologyDepartments();
				getAllReagentNames();
				getAllAssetCategory();
				// this is added by Vishnu for dept and hospital dept
				getAllDepartment();
				getAllHospitalDepartment();
				new JsDatePick({
					useMode : 2,
					target : "fromDateMaintenanceSearchId",
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					dateFormat : "%Y-%m-%d",
					imgPath : "../img/",
					weekStartDay : 1,
				});
				new JsDatePick({
					useMode : 2,
					target : "toDateMaintenanceSearchId",
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					dateFormat : "%Y-%m-%d",
					imgPath : "../img/",
					weekStartDay : 1,
				});
				new JsDatePick({
					useMode : 2,
					target : "purchaseDate",
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					dateFormat : "%Y-%m-%d",
					imgPath : "../img/",
					weekStartDay : 1,
				});
				
				new JsDatePick({
					useMode : 2,
					target : "installationDateId",
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					dateFormat : "%Y-%m-%d",
					imgPath : "../img/",
					weekStartDay : 1,
				});
			};
			
		</script>
		<input type="hidden" id="hiddenAssetItemId" value="0">
		<input type="hidden" id="hiddenAssetCategoryId" value="NA">
		<input type="hidden" id="hiddenMasterId" value="0">
		<input type="hidden" id="hiddenAssetMaintenanceDocUploadId" value="0">
		<input type="hidden" id="hiddenPartyId" value="0">
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="totaltblsize" value="0">
		<input type="hidden" id="RowCount" value="0">
		<input type="hidden" id="hiddenItemIndex" value="0">
		<input type="hidden" id="hiddenVenderState" value="0">
		<input type="hidden" id="recordTypeId" value="1">
		<input type="hidden" id="hiddenAssetType" value="">
		<input type="hidden" id="hiddeAssetLocationId" value="0">
		<input type="hidden" id="hiddeAssetDetailsId" value="0">
		<input type="hidden" id="userState" value="<%=session.getAttribute("userState")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>
