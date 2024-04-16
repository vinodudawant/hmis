<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>

<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Sub Inventory</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<%@include file="inv_header.jsp"%>
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
			<%@include file="left_menu_IPDMain.jsp"%>
			<!-- /SIDEBAR -->
			<%
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
							"dd/MM/yyyy");
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
												href="inv_subinventory.jsp">Sub Inventory</a></li>
										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-12">
									<div class="col-sm-1">
										<label for="inlineFold" class="control-label">Search
											By</label>
									</div>
									<div class="col-md-4">
										<div class="input-group" id="generateMRNPartyNameDiv">
											<input type="hidden" id="subInventoryId" /> <input
												type="search" class="typeahead form-control input-SmallText" 
												id="generateMRNSearchId"
												onkeyup="getAutoSubInventoryNameOnGenerateMRN(this.id)" autocomplete="off" />
											<span class="input-group-btn">
												<button class="btn btn-primary editUserAccess" id="searchSubInventroyId"
													style="height: 25px; margin-bottom: 10px" type="button"
													onclick="getInProcessStatusGeneratedMRNRequest();getAllGeneratedMRNRequestOnApprovedTab();getAllGeneratedMRNRequestDataForIndentTab();getConsumptionList();getAllStockRetrunForSubInventory();">
													<span class="fa fa-search" aria-hidden="true"> </span>
													Search!
												</button>
											</span>
										</div>
									</div>
									<div class="col-md-4" id="generateMRNButtonId"
										style="display: none;">
										<button class="btn btn-xs btn-info pull-left editUserAccess" type='button'
											data-toggle="modal" data-target="#generateMRNRequestModal"
											onclick="setSubInventoryNameAndId()" data-name="generateMRN">
											<i class="fa fa-plus"></i> Generate New MRN Request
										</button>
									</div>
								</div>
							</div>

							<!-- modal starts here -->
							<div class="modal fade" data-backdrop="static" data-keyboard="false" id="generateMRNRequestModal" tabindex="-1" role="dialog" aria-labelledby="itemMasterModalLabel" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">
												Material Request Note
												<!-- <button type="button" class="close" data-dismiss="modal"
												aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button> -->
												<div class="pull-right" style="margin-right: 15px;">
													<button type="button" class="btn btn-primary editUserAccess"
														onclick="saveGenerateMRNRequest()" style="visibility: hidden;padding-left: 10px;" id="saveButtonId">Save</button>
													<button type="button" class="btn btn-primary editUserAccess"
														onclick="showUserNameAndPasswordPopUp()" style="visibility: hidden" id="approvedButtonId">Save & Approved</button>
													<button type="button" class="btn btn-primary btn-danger"
														onclick="onCloseBtnRefrshPageSubInventoryGenerateEditMrnRequest();"
														data-dismiss="modal">Close</button>
												</div>
											</h5>
										</div>
										<%-- <div class="modal-body">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="tab-content">
															<!-- general tab starts here -->
															<div id="itemInfo" class="tab-pane fade in active">
																<div class="panel panel-primary" >
																	<div class="panel-body" >
																		<form id="mrnFormID" onsubmit="return false">
																			<input type="hidden" id="subInventoryIdInsideModal" />
																			<div class="form-row">
																				<div class="form-group col-md-2">
																					<label for="QuatationDate">MRN Date<b
																						style="color: red;">*</b></label> <input id="mrnDate"
																						class="form-control input-SmallText" type="text"
																						readonly="readonly" name="date" placeholder="Date"
																						value="<%=todays_date%>" />
																				</div>
																				<div class="form-group col-md-2"
																					id="partyMasterByName">
																					<label for="parent">SubInventory Name<b
																						style="color: red;">*</b></label> <input type="text"
																						class="form-control tip-focus"
																						id="subInventoryNameId"
																						placeholder="Enter Sub-Inventory Name  "
																						title="Please enter center name"
																						name="subInventoryName" readonly="readonly"
																						data-name="subInventoryName">
																				</div>
																				<div class="form-group col-md-3 pull-right" id="plusMinusButtonDivIdGeneratedMrn">
																					<div class="form-group col-md-8">
																						<button type="button"
																							class="btn btn-success btn-number"
																							onclick="addNewRowInTableByAddButton('generateMRNRequestInfoTable','addGenerateMRNRequest')">
																							<span class="glyphicon glyphicon-plus"></span>
																						</button>
																						<button type="button"
																							class="btn btn-danger btn-number"
																							onclick="removeRowFromTableForSI('generateMRNRequestInfoTable','chkMrnItem')">
																							<span class="glyphicon glyphicon-minus"></span>
																						</button>
																					</div>
																				</div>
																			</div>
																		</form>
																		<div class="form-row">
																			<div>
																				<table class='table table-striped table-bordered' id="generateMRNRequestInfoTable">
																					<thead class='cf' style='background: white;'>
																						<tr>
																							<th>Select <input type="checkbox" id="chkAllCheck" onclick="checkUncheckAll('chkAllCheck','chkMrnItem')"></th>
																							<th>Sr.No</th>
																							<th>Item Name</th>
																							<th style="display: none;">Item Id</th>
																							<th>MRN Quantity</th>
																							<th>UOM Unit</th>
																							<th>Current SubInventory Stock</th>
																							<th>Main Inventory Stock</th>
																							<th>Sub Remark</th>
																							<th style="display: none;"></th>
																						</tr>
																					</thead>
																					<tbody id="generateMRNRequestTableBodyId">

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
										</div>  --%>
										<div class="modal-body">
											<input type="hidden" id="subInventoryIdInsideModal" />
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">MRN</div>
															<div class="panel-body">
																<div class="form-row">
																				<div class="form-group col-md-2">
																					<label for="QuatationDate">MRN Date<b
																						style="color: red;">*</b></label> <input id="mrnDate"
																						class="form-control input-SmallText" type="text"
																						readonly="readonly" name="date" placeholder="Date"
																						value="<%=todays_date%>" />
																				</div>
																				<div class="form-group col-md-2"
																					id="partyMasterByName">
																					<label for="parent">SubInventory Name<b
																						style="color: red;">*</b></label> <input type="text"
																						class="form-control tip-focus"
																						id="subInventoryNameId"
																						placeholder="Enter Sub-Inventory Name  "
																						title="Please enter center name"
																						name="subInventoryName" readonly="readonly"
																						data-name="subInventoryName">
																				</div>
																				<div class="form-group col-md-3 pull-right" id="plusMinusButtonDivIdGeneratedMrn">
																					<div class="form-group col-md-8">
																						<button type="button"
																							class="btn btn-success btn-number"
																							onclick="addNewRowInTableByAddButton('generateMRNRequestInfoTable','addGenerateMRNRequest')">
																							<span class="glyphicon glyphicon-plus"></span>
																						</button>
																						<button type="button"
																							class="btn btn-danger btn-number"
																							onclick="removeRowFromTableForSI('generateMRNRequestInfoTable','chkMrnItem')">
																							<span class="glyphicon glyphicon-minus"></span>
																						</button>
																					</div>
																				</div>
																			</div>
															</div>
														</div>
													</div>
													<!--------------------------table Start-------------------------->
													<div class="container" style="margin-top: 2%;">
														<div class="tab-content">
															<div id="itemInfo" class="tab-pane fade in active">
																<div class="panel panel-primary" style="height: 250px">
																	<div class="panel-body" style="width: 100%;">
																		<div class="form-row">
																			<div style="margin-left: 2%;overflow: auto">
																				<div
																					style='width: 98%; padding: 1%; font-weight: normal; height: 180px;'>
																					<table class='table table-striped table-bordered' id="generateMRNRequestInfoTable">
																					<thead class='cf' style='background: white;'>
																						<tr>
																							<th>Select <input type="checkbox" id="chkAllCheck" onclick="checkUncheckAll('chkAllCheck','chkMrnItem')"></th>
																							<th>Sr.No</th>
																							<th>Item Name</th>
																							<th style="display: none;">Item Id</th>
																							<th>MRN Quantity</th>
																							<th>UOM Unit</th>
																							<th>Current SubInventory Stock</th>
																							<th>Main Inventory Stock</th>
																							<th>Sub Remark</th>
																							<th style="display: none;"></th>
																						</tr>
																					</thead>
																					<tbody id="generateMRNRequestTableBodyId">

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
										<!-- new modal starts here -->

										<div class="row">
											<div class="col-md-12">
												<div class="container">
													<input type="hidden" value="OPEN" id="mrnStatusReceivedId" />
													<div class="col-sm-4">
														<div class="row">
															<div class="form-group">
																<label for="name" class="col-lg-4">Remark</label>
																<div class="col-lg-8">
																	<textarea class="form-control" required="true"
																		id="remark" placeholder="Remark"></textarea>
																</div>
															</div>
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
							<!-- consumption request modal starts here -->
							<div class="modal fade" data-backdrop="static" data-keyboard="false" id="generateConsumptionRequestModal" tabindex="-1"
								role="dialog" aria-labelledby="consumptionModalLabel"
								aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">Consumption Request</h5>
										<div class="row">
								         <div class="pull-right" style="margin-right: 15px;">
								         	<button type="button" class="btn btn-primary editUserAccess"
											onclick="saveConsumptionDetails()">Save</button>
											<button type="button" class="btn btn-primary btn-danger"
											onclick="onCloseBtnRefrshPageSubInventory();"
											data-dismiss="modal">Close</button>
								         </div>
								         </div>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Consumption Request</div>
															<div class="panel-body">
																<form id="mrnFormID" onsubmit="return false">
																<input type="hidden" id="subInventoryIdInsideModal"/>
																	<div class="form-row">
																		<div class="form-group col-md-2">
																				<label for="ConsumptionID">Consumption ID</label> 
																					<input id="consumptionIdUpdated"
																					class="form-control input-SmallText" type="text"
																					readonly="readonly" name="consumptionId" value="" />
																			</div>
																		<div class="form-group col-md-2">
																			<label for="DispensedDate">Dispensed Date</label> 
																				<input id="dispensedDateId"
																				class="form-control input-SmallText" type="text"
																				readonly="readonly" name="dispenseddate" placeholder="Date"
																				value="<%=todays_date%>" />
																		</div>
																		<div class="form-group col-md-2">
																			<label for="ConsumedBy">Consumed By</label> 
																			<select class="form-control" id="consumedById" onchange="getPatientInfo()">
																		      <option value="0">--Select--</option>
																		      <option value="Individual">Individual</option>
																		      <option value="Patient">Patient</option>
																		    </select>
																		</div>
																		<div class="form-group col-md-2" id="searchDispenserDivId">
																		<input type="hidden" id="dispenserId" />
																			<label for="DispensedTo">Dispensed To</label> 
																				<input type="text" onkeyup="getAutoDispenserName(this.id)" class="form-control tip-focus" id="dispensedToId" placeholder="Enter Dispensed To Name  "
																				title="Please enter Dispensed To name" name="dispensedTo"
																				data-name="dispenserName">
																		</div>
																		<div class="form-group col-md-2">
																		<div class="custom-control custom-checkbox">
																	        <input type="checkbox" onclick="addDispensedtoOthersName()" class="custom-control-input" id="otherId">
																	        <label class="custom-control-label" for="other">Other</label>
																	      </div>
																		</div>
																		<div class="form-group col-md-2" style="display: none;" id="dispenseToOtherDivId">
																			<label for="DispensedToOther">Dispensed To Other</label> 
																				<input type="text" class="form-control tip-focus" id="dispensedToOtherId" placeholder="Enter Dispensed To Name  "
																				title="Please enter Dispensed To name" name="dispensedToOther">
																		</div>
																		
																	<div class="form-group col-md-2" style="display: none"  id="patientDivId">
																		<input type="radio" class="custom-control custom-radio custom-control-inline" name="rdDept" value="0" id="opdId" checked> All 
																		<input type="radio" class="custom-control custom-radio custom-control-inline" name="rdDept" value="1"> OPD 
																		<input type="radio" class="custom-control custom-radio custom-control-inline" name="rdDept" value="2"> IPD
																		</div>
																		
																		<div class="form-group col-md-2" style="display: none"  id="divbyName">
																		<label>Select Patient  Name Or Id </label> 
																		<select class="form-control" id="patSearchType" onchange="setPatientSearchTypeFM()">
																		      <option value="1">Patient Id</option>
																		      <option value="2">Patient Name</option>
																		    </select>
																		
																		<label>Patient Name Or Id </label> 
																		<input type="text" id="byName" placeholder="Type Patient Id here" class="typeahead form-control input-SmallText" name="search" id="byName" onkeyup="setAutoPatientNameFM(this.id,'reg')">
																		</div>
																		
																	</div>
																</form>
															</div>
														</div>
														<div class="container" style="margin-top: 2%;">
															<ul class="nav nav-tabs">
																<li class="active"><a data-toggle="tab"	href="#itemInfo">Item Info</a></li>
															</ul>
															<div class="tab-content">
																<!-- general tab starts here -->
																<div id="itemInfo" class="tab-pane fade in active">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<form id="generalFormId">
																				<div class="row">
																					<div class="col-md-12">
																						<div>
																							<div class="form-group col-md-3 pull-right" id="plusMinusButtonDivIdConsumption">
																								<div class="form-group col-md-8">
																									<button type="button" class="btn btn-success btn-number" onclick="addNewRowInTableByAddButton('consumptionRequestTable','addConsumptionRequest')">
																			                  			<span class="glyphicon glyphicon-plus"></span>
																			                 	  	</button>
																									<button type="button" class="btn btn-danger btn-number" onclick="removeRowFromTable('consumptionRequestTable','chkMrnItem')">
																						                <span class="glyphicon glyphicon-minus"></span>
																					              	</button>																					              	
																							   </div>
																							</div>
																							<div style="overflow:auto" class="col-md-12">
																							
																								<table class='table table-striped table-bordered header-fixed cf' id="consumptionRequestTable">
																									<thead class='cf' style='background: white;'>
																										<tr>
																										<th class='col-md-2 center'>Select <input type="checkbox" id="chkAllCheck" onclick="checkUncheckAll('chkAllCheck','chkMrnItem')"></th>
																											<!-- <th class='col-md-2 center'><div>Select</div></th> -->
																											<th class='col-md-2 center'>Sr.No</th>
																											<th class='col-md-2 center'>Item Name</th>
																											<th class='col-md-2 center'>Item Batch Code</th>
																											<th class='col-md-2 center'>Item Batch Exp Date</th>
																											<th class='col-md-2 center'>UOM Unit</th>
																											<th class='col-md-2 center'>Required Quantity</th>
																											<th class='col-md-2 center' style="display: none;">Item Id</th>
																											<th class='col-md-2 center'>Available Quantity</th>
																											<th class='col-md-2 center'>Consumption Type</th>
																											<th class='col-md-2 center'>Sub Remark</th>
																											<th class='col-md-2 center' style="display: none"></th>
																											</tr>
																									</thead>																						
																									<tbody id="consumptionRequestTableBodyId" style="height: 200px">
																									
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
													</div>
												</div>
											</div>
										</div>
										<!-- new modal starts here -->
										
										<div class="row">
											<div class="col-md-12">
												<div class="container">
													<div class="col-sm-4">
														<div class="row">
															<div class="form-group">
																<label for="name" class="col-lg-4">Remark</label>
																<div class="col-lg-8">
																	<textarea class="form-control"
																		required="true" id="consumptionRemark"
																		placeholder="Remark"></textarea>
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
							<!-- consumption request modal ends here -->
							
							
							
							<!-- mrn return request modal starts here -->
							<div class="modal fade" data-backdrop="static" data-keyboard="false" id="generateMrnReturnRequestModal" tabindex="-1" role="dialog" aria-labelledby="mrnReturnModalLabel" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document" style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">Stock Return Request</h5>
										<div class="row">
								         <div class="pull-right" style="margin-right: 15px;">
								         	<button type="button"   id="saveStockReturn"    class="btn btn-primary editUserAccess"
											onclick="saveStockReturnDetails()">Save</button>
											<button type="button" class="btn btn-primary btn-danger"
											onclick="refreshStockReturnAfterSaveAndClose();"
											data-dismiss="modal">Close</button>
								         </div>
								         </div>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
													<div class="col-md-12">
																<form id="mrnFormID" onsubmit="return false">
																<input type="hidden" id="subInventoryIdInsideModal"/>
																	<div class="form-row">
																		<div class="form-group col-md-2">
																			<label for="mrnReturnDate">Stock Return Date</label> 
																				<input id="mrnReturnDateId"
																				class="form-control input-SmallText" type="text"
																				readonly="readonly" name="mrnReturnDate" placeholder="Date"
																				value="<%=todays_date%>" />
																		</div>
																		<div class="form-group col-md-6">
																					<label for="name" class="col-lg-6">Remark</label>
																					<div class="col-lg-8">
																						<textarea class="form-control"
																							required="true" id="mrnReturnRemark"
																							placeholder="Remark"></textarea>
																					</div>
																		</div>
																	</div>
																</form>
														</div>
														
														<div class="container" style="margin-top: 2%;">
															<ul class="nav nav-tabs">
																<li class="active"><a data-toggle="tab"	href="#itemInfo">Item Info</a></li>
															</ul>
															<div class="tab-content">
																<!-- general tab starts here -->
																<div id="itemInfo" class="tab-pane fade in active">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<form id="generalFormId">
																				<div class="row">
																				<div class="form-group col-md-3 pull-right">
																								<div class="form-group col-md-8">
																									<button type="button" class="btn btn-success btn-number" onclick="addNewRowInTableByAddButton('mrnReturnRequestTable','addMrnReturnRequest')">
																			                  			<span class="glyphicon glyphicon-plus"></span>
																			                 	  	</button>
																									<button type="button" class="btn btn-danger btn-number" onclick="removeRowFromTable('mrnReturnRequestTable','chkMrnItem')">
																						                <span class="glyphicon glyphicon-minus"></span>
																					              	</button>																					              	
																							   </div>
																							</div>
																					<div class="col-md-12">
																						<div>
																							<div style="overflow:auto" class="col-md-12-1">
																							
																								<table class='table table-striped table-bordered' id="mrnReturnRequestTable">
																									<thead class='cf' style='background: white;'>
																										<tr>
																										<th class='col-md-1 center'>Select <input type="checkbox" id="chkAllCheck" onclick="checkUncheckAll('chkAllCheck','chkMrnItem')"></th>
																											<!-- <th class='col-md-2 center'><div>Select</div></th> -->
																											<th class='col-md-1 center'>Sr.No</th>
																											<th class='col-md-2 center' style="display: none;">Item Id</th>
																											<th class='col-md-2 center'>Item Name</th>
																											<th class='col-md-1 center'>Item Batch Code</th>
																											<th class='col-md-1 center'>Item Batch Exp Date</th>
																											<th class='col-md-1 center'>UOM Unit</th>
																											<th class='col-md-1 center'>Return Quantity</th>
																											<th class='col-md-1 center'>Sub Inventory Quantity</th>
																											<!-- <th class='col-md-1 center'>Main Inventory Quantity</th> -->
																											<th class='col-md-2 center'>Narration</th>
																											<th class='col-md-1 center' style="width:80px;">Stock Return Reason</th>
																											</tr>
																									</thead>																						
																									<tbody id="mrnReturnRequestTableBodyId" style="height: 200px">
																									
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
													</div>
												</div>
											</div>
										</div>
										<!-- new modal starts here -->
									<div class="modal-footer">
									
									</div>
									</div>
								</div>
							</div>
							<!-- mrn return request modal ends here -->
							
							
							<!-- modal starts here after processing the goods issue for approval-->
							<div class="modal fade" data-backdrop="static" data-keyboard="false" data-backdrop="static" data-keyboard="false"
								id="generateMRNRequestModalAfterGoodsIssue" tabindex="-1"
								role="dialog" aria-labelledby="itemMasterModalLabel"
								aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">Material
												Request Note</h5>
											<button type="button" onclick="onCloseBtnRefrshPageSubInventoryIssuedMrnRequest();" class="close" data-dismiss="modal"
												aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<%-- <div class="modal-body">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Review
																MRN</div>
															<div class="panel-body">
																<form id="mrnFormID" onsubmit="return false">
																	<input type="hidden" id="subInventoryIdInsideModalOnApproval" />
																	<input type="hidden" id="totalIssueQtyIdIssueMrn" />
																	<input type="hidden" id="totalPendingQtyIdIssueMrn" />
																	<div class="form-row">
																		<div class="form-group col-md-2">
																			<label for="QuatationDate">MRN Date<b
																				style="color: red;">*</b></label> <input
																				id="mrnDateOnApproval"
																				class="form-control input-SmallText" type="text"
																				readonly="readonly" name="date" placeholder="Date"
																				value="<%=todays_date%>" />
																		</div>
																		<div class="form-group col-md-2"
																			id="partyMasterByName">
																			<label for="parent">SubInventory Name<b
																				style="color: red;">*</b></label> <input type="text"
																				class="form-control tip-focus"
																				id="subInventoryNameIdOnApproval"
																				placeholder="Enter Sub-Inventory Name  "
																				title="Please enter center name"
																				name="subInventoryName" readonly="readonly"
																				data-name="subInventoryName">
																		</div>
																		<div class="form-group col-md-6">
																			<label for="name" class="col-lg-6">Remark</label>
																			<div class="col-lg-8">
																				<textarea class="form-control"
																					required="true" id="remark"
																					placeholder="Remark"></textarea>
																			</div>
																		</div>
																	</div>
																</form>
															</div>
														</div>
														<div class="container" style="margin-top: 2%;">
															<ul class="nav nav-tabs">
																<li class="active"><a data-toggle="tab"
																	href="#itemInfo">Item Info</a></li>
															</ul>
															<div class="tab-content">
																<!-- general tab starts here -->
																<div id="itemInfo" class="tab-pane fade in active">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<form id="generalFormId">
																				<div class="row">
																					<div class="col-md-12">
																						<div>
																							<div class="form-group col-md-3 pull-right" id="plusMinusButtonDivIdIssueMrnTab">
																								<div class="form-group col-md-8">
																									<button type="button"
																										class="btn btn-success btn-number"
																										onclick="addNewRowInTable('generateMRNRequestInfoTable','addGenerateMRNRequest')">
																										<span class="glyphicon glyphicon-plus"></span>
																									</button>
																									<button type="button"
																										class="btn btn-danger btn-number"
																										onclick="removeRowFromTable('generateMRNRequestInfoTable','chkMrnItem')">
																										<span class="glyphicon glyphicon-minus"></span>
																									</button>
																								</div>
																							</div>
																							<div style="overflow: auto;margin-top: 10px;" class="col-md-12">

																								<table class='table table-striped table-bordered header-fixed cf'
																									id="generateMRNRequestInfoTableIssueTab">
																									<thead class='cf' style='background: white;'>
																										<tr>
																											<th>Select <input type="checkbox" id="chkAllCheck" onclick="checkUncheckAll('chkAllCheck','chkMrnItem')"></th>
																											<th>Sr.No</th>
																											<th>Item Name</th>
																											<th>Item Batch Code</th>
																											<th>Item Batch Exp Date</th>
																											<th style="display: none;">Item Id</th>
																											<th>MRN Requested Quantity</th>
																											<th>UOM Unit</th>
																											<!-- <th class='col-md-2 center'>Current Sub-Inventory Stock</th> -->
																											<th>Pending Quantity</th>
																											<th>Received Quantity</th>
																											<th>Goods Issue Sub Remark</th>
																											<th>Accept</th>
																										</tr>
																									</thead>
																									<tbody
																										id="generateMRNRequestTableBodyIdForApproval"
																										style="height: 200px">

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
													</div>
												</div>
											</div>
										</div> --%>
										<!-- new modal starts here -->
										
										
										<!-- new modal body added by Rohit on 19-05-2021 starts here-->
										<div class="modal-body">
											<input type="hidden" id="openingStockId" value="0" /> <input
												type="hidden" id="hiddenRadioButtonIndex" />
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Review
																MRN</div>
															<div class="panel-body">
																<form id="mrnFormID" onsubmit="return false">
																	<input type="hidden" id="subInventoryIdInsideModalOnApproval" />
																	<input type="hidden" id="totalIssueQtyIdIssueMrn" />
																	<input type="hidden" id="totalPendingQtyIdIssueMrn" />
																	<div class="form-row">
																		<div class="form-group col-md-2">
																			<label for="QuatationDate">MRN Date<b
																				style="color: red;">*</b></label> <input
																				id="mrnDateOnApproval"
																				class="form-control input-SmallText" type="text"
																				readonly="readonly" name="date" placeholder="Date"
																				value="<%=todays_date%>" />
																		</div>
																		<div class="form-group col-md-2"
																			id="partyMasterByName">
																			<label for="parent">SubInventory Name<b
																				style="color: red;">*</b></label> <input type="text"
																				class="form-control tip-focus"
																				id="subInventoryNameIdOnApproval"
																				placeholder="Enter Sub-Inventory Name  "
																				title="Please enter center name"
																				name="subInventoryName" readonly="readonly"
																				data-name="subInventoryName">
																		</div>
																		<div class="form-group col-md-6">
																			<label for="name" class="col-lg-6">Remark</label>
																			<div class="col-lg-8">
																				<textarea class="form-control"
																					required="true" id="remark"
																					placeholder="Remark"></textarea>
																			</div>
																		</div>
																	</div>
																</form>
															</div>
														</div>
													</div>
													<!--------------------------table Start-------------------------->
											<div class="container" style="margin-top: 2%;">
											<div class="tab-content">
												<div id="itemInfo" class="tab-pane fade in active">
													<div class="panel panel-primary" style="height: 250px">
														<div class="panel-body" style="width: 100%;">
															<div class="form-group col-md-3 pull-right" id="plusMinusButtonDivIdIssueMrnTab">
																					<div class="form-group col-md-8">
																						<button type="button"
																							class="btn btn-success btn-number"
																							onclick="addNewRowInTable('generateMRNRequestInfoTable','addGenerateMRNRequest')">
																							<span class="glyphicon glyphicon-plus"></span>
																						</button>
																						<button type="button"
																							class="btn btn-danger btn-number"
																							onclick="removeRowFromTable('generateMRNRequestInfoTable','chkMrnItem')">
																							<span class="glyphicon glyphicon-minus"></span>
																						</button>
																					</div>
																				</div>
																<div class="form-row">
																	<div style="margin-left: 2%;overflow: auto">
																		<div style='width: 98%; padding: 1%; font-weight: normal; height: 180px;'>
																	<table class='table table-striped table-bordered header-fixed cf' id="generateMRNRequestInfoTableIssueTab">
																					<thead class='cf' style='background: white;'>
																						<tr>
																							<th>Select <input type="checkbox" id="chkAllCheck" onclick="checkUncheckAll('chkAllCheck','chkMrnItem')"></th>
																							<th>Sr.No</th>
																							<th>Item Name</th>
																							<th>Item Batch Code</th>
																							<th>Item Batch Exp Date</th>
																							<th style="display: none;">Item Id</th>
																							<th>MRN Requested Quantity</th>
																							<th>UOM Unit</th>
																							<!-- <th class='col-md-2 center'>Current Sub-Inventory Stock</th> -->
																							<th>Pending Quantity</th>
																							<th>Received Quantity</th>
																							<th>Canceled Quantity</th>
																							<th>Goods Issue Sub Remark</th>
																							<th>Accept</th>
																						</tr>
																					</thead>
																					<tbody
																						id="generateMRNRequestTableBodyIdForApproval"
																						style="height: 200px">

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
										<!-- new modal body added by Rohit on 19-05-2021 ends here-->
								</div>
							</div>
							</div>
							<!-- modal ends here after processing the goods issue for approval-->
							<!-- modal starts here for showing received data-->
							<div class="modal fade" data-backdrop="static" data-keyboard="false"
								id="generateMRNRequestModalForReceivedData" tabindex="-1"
								role="dialog" aria-labelledby="itemMasterModalLabel"
								aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">Material
												Request Note</h5>
											<button type="button" class="close" data-dismiss="modal"
												aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Received MRN</div>
															<div class="panel-body">
																<form id="mrnFormID" onsubmit="return false">
																	<input type="hidden" id="subInventoryReceivedId" />
																	<div class="form-row">
																		<div class="form-group col-md-2">
																			<label for="QuatationDate">Issued MRN Date<b
																				style="color: red;">*</b></label> <input
																				id="mrnDateReceivedId"
																				class="form-control input-SmallText" type="text"
																				readonly="readonly" name="date" placeholder="Date"
																				value="<%=todays_date%>" />
																		</div>
																		<div class="form-group col-md-2"
																			id="partyMasterByName">
																			<label for="parent">SubInventory Name<b
																				style="color: red;">*</b></label> <input type="text"
																				class="form-control tip-focus"
																				id="subInventoryNameReceivedId"
																				placeholder="Enter Sub-Inventory Name  "
																				title="Please enter center name"
																				name="subInventoryName" readonly="readonly"
																				data-name="subInventoryName">
																		</div>
																		<!-- <div class="form-group col-md-6">
																					<label for="name" class="col-lg-6">Remark</label>
																					<div class="col-lg-8">
																						<textarea class="form-control"
																							required="true" id="remarkReceivedId"
																							placeholder="Remark"></textarea>
																					</div>
																		</div> -->
																	</div>
																</form>
															</div>
														</div>
														<div class="container" style="margin-top: 2%;">
															<ul class="nav nav-tabs">
																<li class="active"><a data-toggle="tab"
																	href="#itemInfo">Item Info</a></li>
															</ul>
															<div class="tab-content">
																<!-- general tab starts here -->
																<div id="itemInfo" class="tab-pane fade in active">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<form id="generalFormId">
																				<div class="row">
																					<div class="col-md-12">
																						<div>
																							<div style="overflow: auto" class="col-md-12">

																								<table class='table table-striped table-bordered header-fixed cf' id="generateMRNRequestInfoTable">
																									<thead class='cf' style='background: white;'>
																										<tr>
																											<th class='col-md-2 center'>Sr.No</th>
																											<th class='col-md-2 center'>Item Name</th>
																											<th class='col-md-2 center' style="display: none;">Item Id</th>
																											<th class='col-md-1 center'>MRN Requested Quantity</th>
																											<th class='col-md-2 center'>UOM Unit</th>
																											<th class='col-md-2 center'>Item Batch Code</th>
																											<th class='col-md-2 center'>Item Exp Date</th>
																											<th class='col-md-2 center'>Issued Quantity</th>
																										</tr>
																									</thead>
																									<tbody
																										id="generateMRNRequestTableBodyIdForReceived"
																										style="height: 200px">

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
													</div>
												</div>
											</div>
										</div>
										<!-- new modal starts here -->
										<input type="hidden" value="Completed"  id="mrnStatusIdOnApproval" />
										<div class="row">
											<div class="col-md-12">
												<div class="container">
													<div class="col-sm-4" style="display:none">
														<div class="row">
															<div class="form-group">
																<label for="name" class="col-lg-4">Total Item
																	Quantity</label>
																<div class="col-lg-8">
																	<input class="form-control" name="totalItemQuantity" 
																		id="totalItemQuantityremarkReceivedId" type="text"
																		readonly="readonly" value="0">
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="modal-footer"></div>
									</div>
								</div>
							</div>
							<!-- modal ends here for showing received data-->
							
							
										<!----------------------Start Modal For UserName and Password ---------------------- -->
										<div id="userNameandpasswordPopUp" class="modal fade in" data-backdrop="static" data-keyboard="false"
											tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
											aria-hidden="true">
											<div class="modal-dialog" style="width: 500px;">
												<div class="modal-content">
													<div class="modal-header">
														<div class="box-title">
															<h4>Password Verification</h4>
														</div>
													</div>
													<div class="modal-body">
														<div class="row">
															<div class="col-md-12">
																<!-- BOX -->
																<div class="box-body">

																	<!--Panel Body-->

																	<div class="col-xs-12 col-md-12">
																		<div class="col-xs-4 col-md-12">
																			<div class="divide-20"></div>
																			<label for="exampleInputEmail1" style="color: red;">Please
																				Enter User Name !!</label> <input type="text" id="userName"
																				class="form-control" placeholder="User Name">
																		</div>
																	</div>

																	<div class="col-xs-12 col-md-12">
																		<div class="col-xs-4 col-md-12">
																			<div class="divide-20"></div>
																			<label for="exampleInputEmail1" style="color: red;">Please
																				Enter Your Password !!</label> <input type="password"
																				id="userPassword" class="form-control"
																				placeholder="Password">
																		</div>
																	</div>

																	<!-- /BOX-->
																</div>
															</div>
														</div>
														<!-- /BODY-->
														<div class="modal-footer">
															<input type="button" value="Submit"
																class="btn btn-primary editUserAccess"
																onclick="checkUserNameandPassword()" />
															<button type="button" class="btn btn-default"
																onclick="closeUserNameAndPasswordPopUp()">Close</button>
														</div>
													</div>
												</div>
											</div>
										</div>
										<!----------------------End Modal For UserName and Password ---------------------- -->
										
							
							

							<!-- new modal ends here -->
							<!-- new modal starts here -->
							<div id="purchaserequestRejectionModalId" class="modal"
								tabindex="-1" role="dialog">
								<div class="modal-dialog" role="document">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title">Mrn Rejection Details</h5>
											<button type="button" class="close" data-dismiss="modal"
												aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div class="modal-body" style="width: 100%; height: 100px;">
											<div class="col-sm-4">
												<div class="row">
													<div class="form-group">
														<label>Please enter rejection remark:</label> <input
															class="form-control" name="name" id="mrnrejectremark"
															type="text" placeholder="mrn reject remark"
															style="width: 300px">

													</div>
												</div>
											</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-primary editUserAccess"
													onclick="setPartyModalInfoToTableOnPurchaseQuotation()">Save
													changes</button>
												<button type="button" class="btn btn-secondary"
													onclick="closemrnRejectionModal()">Close</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- new modal ends here -->
							<div class="row">
								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div>
										<ul class="nav nav-tabs">
											<li class="active"><a data-toggle="tab" href="#indent"
												id="indentTab"> Stock</a></li>
											<li><a data-toggle="tab" href="#mrn" id="mrnTab"> MRN</a></li>
											<li><a data-toggle="tab" href="#approved" id="approvedTab">Receive MRN</a></li>
											<!--onclick="getReceivedMrnData();"  -->
											<!-- <li><a data-toggle="tab" href="#received" id="receivedTab">Received</a></li> -->
											<li><a data-toggle="tab" href="#consumption" id="consumptionTab">Consumption</a></li>
											<li><a data-toggle="tab" href="#mrnreturn" id="mrnreturnTab">Stock Return</a></li>
										</ul>
									</div>
									<div class="tab-content">
										<div class="tab-pane fade in active" id="indent">
											<div class="panel panel-default">
												<div class="panel-body">
													<div class="row">
														<div class="col-md-12">
															<div class="tabbable header-tabs">
																<div class="row" style="margin-top: 10px">
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
																			style="margin-top: 20px;overflow: auto; ">
																			<div class="panel-heading" id="divEhatContent">Sub
																				Store Stock List</div>
																			<div class="panel-body"
																				style="height: 300px">
																				<table id="ehatTable" cellpadding="0"
																					cellspacing="0" border="0"
																					class="datatable table table-striped table-bordered">
																					<thead id="ehatTHead">
																						<tr>
																							<th>#</th>
																							<th>Item Name</th>
																							<th>Item ID</th>
																							<th>Item Batch Code</th>
																							<th>Item Expiry Date</th>
																							<th>SubInventory Available Quantity</th>
																						</tr>
																					</thead>
																					<tbody id="indentTabDataTbodyId">
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
										<!-----------------Close Request Div Start ------------------->
										<div class="tab-pane fade" id="mrn">
											<div class="panel panel-default">
												<div class="panel-body">
													<div class="row">
														<div class="col-md-12">
															<div class="tabbable header-tabs">
																<div class="row" style="margin-top: 10px">
																	<div class="col-md-12">
																		<div class="row">
																			<div class="col-sm-3">
																				<input type="search" class="form-control input-SmallText"	id="searchMRNId" autocomplete="off" />
																			</div>
																			<div class="col-sm-4">
																				<button type="button" class="btn btn-primary editUserAccess" onclick="searchMRN()">Search MRN</button>
																			</div>
																		</div>
																		<div class="panel panel-primary"
																			style="margin-top: 20px;overflow: auto;">
																			<div class="panel-heading" id="divEhatContent">MRN
																				Request Table</div>
																			<div class="panel-body"
																				style="height: 300px">
																				<table id="ehatTable" cellpadding="0"
																					cellspacing="0" border="0"
																					class="datatable table table-striped table-bordered">
																					<thead id="ehatTHead">
																						<tr>
																							<th>#</th>
																							<th>MRN ID</th>
																							<th>Date</th>
																							<th>MRN Raised By</th>
																							<th>SubInventory Name</th>
																							<th>MRN Request Status</th>
																							<th>Save & Approved</th>
																							<th>View</th>
																						</tr>
																					</thead>
																					<tbody id="mrnDataTableBodyId">
																					</tbody>
																				</table>
																			</div>
																		</div>
																		<!--    Starting pagination    -->
																		<div style="margin-top: -0%;">
																			<div class="pull-right">
																				<ul class="pagination pagination-blue margin-bottom-10"
																					id="mrnRecordPagination">
																				</ul>
																			</div>
																			<div class="row">
																				<div class="col-md-4 col-md-offset-8">
																					<div class="pull-right">
																						<ul
																							class="pagination pagination-blue margin-bottom-10"
																							id="totalNumberOfPagesMRN">
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
											</div>
										</div>
										<!-----------------Close Request Div End ------------------->

										<!-----------------Mrn Approved Status List Table Start Here------------------->
										<div class="tab-pane fade" id="approved">
											<div class="panel panel-default">
												<div class="panel-body">
													<div class="row">
														<div class="col-md-12">
															<div class="tabbable header-tabs">
																<div class="row" style="margin-top: 10px">
																	<div class="col-md-12">
																			<div class="row">
																				<div class="col-sm-3">
																					<input type="search" class=" form-control input-SmallText"	id="searchReceivedMRNId" autocomplete="off" />
																				</div>
																				<div class="col-sm-4">
																					<button type="button" class="btn btn-primary editUserAccess" onclick="searchReceivedMRN()">Search</button>
																				</div>
																			</div>
																		<div class="panel panel-primary"
																			style="margin-top: 20px;overflow: auto;">
																			<div class="panel-heading" id="divEhatContent">Issued MRN List</div>
																			<div class="panel-body"
																				style="height: 300px">
																				<table id="ehatTable" cellpadding="0"
																					cellspacing="0" border="0"
																					class="datatable table table-striped table-bordered">
																					<thead id="ehatTHead">
																						<tr>
																							<th>#</th>
																							<th>MRN ID</th>
																							<th>Date</th>
																							<th>MRN Raised By</th>
																							<th>SubInventory Name</th>
																							<th>Approved Status</th>
																							<th>Receive MRN</th>
																							<th style="display: none;">Receive Complete MRN</th>
																						</tr>
																					</thead>
																					<tbody id="mrnApprovedStatusDataTbodyId">
																					</tbody>
																				</table>
																			</div>
																		</div>
																		<!--    Starting pagination    -->
																		<div style="margin-top: -0%;">
																			<div class="pull-right">
																				<ul class="pagination pagination-blue margin-bottom-10"
																					id="goodIssueMRNRecordPagination">
																				</ul>
																			</div>
																			<div class="row">
																				<div class="col-md-4 col-md-offset-8">
																					<div class="pull-right">
																						<ul
																							class="pagination pagination-blue margin-bottom-10"
																							id="totalNumberOfPagesGoodIssueMRN">
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
											</div>
										</div>
										<!-----------------Mrn Approved Status List Table Ends Here------------------->
										<!-----------------Mrn Received Status List Table Starts Here------------------->
										<div class="tab-pane fade" id="received">
											<div class="panel panel-default">
												<div class="panel-body">
													<div class="row">
														<div class="col-md-12">
															<div class="tabbable header-tabs">
																<div class="row" style="margin-top: 10px">
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
																			<div class="panel-heading" id="divEhatContent">Received Status Table</div>
																			<div class="panel-body"
																				style="overflow: auto; height: 300px">
																				<table id="ehatTable" cellpadding="0"
																					cellspacing="0" border="0"
																					class="datatable table table-striped table-bordered">
																					<thead id="ehatTHead">
																						<tr>
																							<th class="col-md-1 center">#</th>
																							<th class="col-md-1 center">MRN ID</th>
																							<th class="col-md-1 center">MRN Date</th>
																							<th class="col-md-1 center">MRN Raised By</th>
																							<th class="col-md-1 center">SubInventory Name</th>
																							<th class="col-md-1 center">Received Status</th>
																							<th class="col-md-1 center">View</th>
																						</tr>
																					</thead>
																					<tbody id="mrnReceivedStatusDataTbodyId">
																					</tbody>
																				</table>
																			</div>
																		</div>
																		
																		<!--    Starting pagination    -->
																		<div style="margin-top: -0%;">
																			<div class="pull-right">
																				<ul class="pagination pagination-blue margin-bottom-10"
																					id="receivedMRNRecordPagination">
																				</ul>
																			</div>
																			<div class="row">
																				<div class="col-md-4 col-md-offset-8">
																					<div class="pull-right">
																						<ul
																							class="pagination pagination-blue margin-bottom-10"
																							id="totalNumberOfPagesReceivedMRN">
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
											</div>
										</div>
										<!-----------------Mrn Received Status List Table Ends Here------------------->
										<!-- Consumption tab starts here -->
										<div class="tab-pane fade" id="consumption">
											<div class="panel panel-default">
												<div class="panel-body">
													<div class="row">
														<div class="col-md-4">
															<button class="btn btn-xs btn-info pull-left editUserAccess"
																type='button' data-toggle="modal"
																data-target="#generateConsumptionRequestModal"
																onclick="setSubInventoryNameAndId()">
																<i class="fa fa-plus"></i> Consumption Request
															</button>
														</div>
														<div class="col-md-8">
															<div class="row">
																<div class="col-md-3" id="itemNameMRNDiv">
																	<input type="hidden" id="itemId">
																	Search Item Name :<input type="text" class="typeahead form-control input-SmallText" onkeyup="getAutoItemNameOnConsumption(this.id)" id="searchItemName" autocomplete="off" />
																</div>
																<div class="col-md-3">
																	From Date :<input type="text" class="form-control input-SmallText" id="searchFromDate" />
																</div>
																<div class="col-md-3">
																	To Date :<input type="text" class="form-control input-SmallText" id="searchToDate" />
																</div>
																<div class="col-md-3" style="padding-top: 3px;">
																	<button class="btn btn-primary btn-info pull-left editUserAccess"
																		type='button' data-toggle="modal"
																		onclick="searchConsumptionByDate()">
																		 Search Item
																	</button>
																</div>
															</div>
														</div>
													</div>

												</div>
											</div>
											<div class="panel panel-primary" style="margin-top: 20px;overflow: auto;">
												<div class="panel-heading" id="divEhatContent">Consumption List</div>
												<div class="panel-body"
													style="height: 300px">
													<table id="ehatTable" cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered">
														<thead id="ehatTHead">
															<tr>
																<th>#</th>
																<th>Created Date</th>
																<th>Consumption ID</th>
																<th>Dispensed To</th>
																<th>Consumed By</th>
																<th>Item Name</th>
																<th>Batch Code</th>
																<th>Batch Expiry</th>
																<th>Previously Available Qty</th>
																<th>Consumption Type</th>
																<th>Dispensed Date</th>
																<th>Edit</th>
																<th>View</th>
															</tr>
														</thead>
														<tbody id="consumptionTabDataTbodyId">
														</tbody>
													</table>
												</div>
												
										</div>
										<!--    Starting pagination    -->
												<div style="margin-top: -2%;">
													<div class="pull-right">
														<ul class="pagination pagination-blue margin-bottom-10"
															id="consumptionMRNRecordPagination">
														</ul>
													</div>
													<div class="row">
														<div class="col-md-4 col-md-offset-8">
															<div class="pull-right">
																<ul
																	class="pagination pagination-blue margin-bottom-10"
																	id="totalNumberOfPagesConsumptionMRN">
																</ul>
															</div>
														</div>
													</div>
												</div>
												<!--   Ending  pagination -->
										
										</div>
										<!-- Consumption tab ends here -->
										<!-- MRN Return tab starts here -->
										<div class="tab-pane fade" id="mrnreturn">
											<div class="panel panel-default">
												<div class="panel-body">
													<div class="row">
														<div class="col-md-12">
															<button class="btn btn-xs btn-info pull-left editUserAccess"
																type='button' data-toggle="modal"
																data-target="#generateMrnReturnRequestModal"
																onclick="setSubInventoryNameAndId()">
																<i class="fa fa-plus"></i> Stock Return Request
															</button>
														</div>
													</div>

												</div>
											</div>
											<div class="panel panel-primary" style="margin-top: 20px;overflow: auto;">
												<div class="panel-heading" id="divEhatContent">Stock Return List</div>
												<div class="panel-body">
													<table id="ehatTable" cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered">
														<thead id="ehatTHead">
															<tr>
																<th>#</th>
																<th>Return Date</th>
																<th>Status</th>
																<th>Store Name</th>
																<th>View</th>
															</tr>
														</thead>
														<tbody id="mrnReturnTabDataTbodyId">
														</tbody>
													</table>
													<!--    Starting pagination    -->
													<div style="margin-top: -0%;">
														<div class="pull-right">
															<ul class="pagination pagination-blue margin-bottom-10"
																id="stockReturnMRNRecordPagination">
															</ul>
														</div>
														<div class="row">
															<div class="col-md-4 col-md-offset-8">
																<div class="pull-right">
																	<ul
																		class="pagination pagination-blue margin-bottom-10"
																		id="totalNumberOfPagesStockReturnMRN">
																	</ul>
																</div>
															</div>
														</div>
													</div>
												<!--   Ending  pagination -->
												</div>
										</div>
										</div>
										<!-- MRN Return tab ends here -->
									</div>
									<!-- batch wise consumption modal starts here -->
									<div id="batchWiseSubInvStockModal" class="modal" tabindex="-1"
										role="dialog">
										<div class="modal-dialog" role="document">
											<div class="modal-content">
												<div class="modal-header">
													<h5 class="modal-title">Item Master Details</h5>
													<button type="button" class="close" data-dismiss="modal"
														aria-label="Close">
														<span aria-hidden="true">&times;</span>
													</button>
												</div>
												<div class="modal-body">
													<table id="batchWiseSubInvStockTableId" cellpadding="0"
														cellspacing="0" border="0"
														class="table table-striped table-bordered">
														<thead id="ehatTHead">
															<tr>
																<th class="col-md-1 center">#</th>
																<th class="col-md-1 center">Item Name</th>
																<th class="col-md-1 center" style="display: none">Item
																	ID</th>
																<th class="col-md-1 center">UOM Unit</th>
																<th class="col-md-1 center">Item Batch Code</th>
																<th class="col-md-1 center">Item Batch Exp Date</th>
																<th class="col-md-1 center">Sub Inventory Stock</th>
															</tr>
														</thead>
														<tbody id="batchWiseSubInvStockTbody">
														</tbody>
													</table>
												</div>
												<div class="modal-footer">
													<button type="button" class="btn btn-primary editUserAccess"
														onclick="setModalInfoToTableOnConsumptionRequest()">Save
														changes</button>
													<button type="button" class="btn btn-secondary"
														onclick="closeConsumptioRequestModalOnGenerateMRN()">Close</button>
												</div>
											</div>
										</div>
									</div>
									<!-- batch wise consumption modal ends here -->
									<!-- batch wise mrn return/stock return modal starts here -->
									<div id="batchWiseSubInvStockForMrnReturnModal" class="modal" tabindex="-1"
										role="dialog">
										<div class="modal-dialog" role="document">
											<div class="modal-content">
												<div class="modal-header">
													<h5 class="modal-title">Batchwise Item Details</h5>
													<button type="button" class="close" data-dismiss="modal"
														aria-label="Close">
														<span aria-hidden="true">&times;</span>
													</button>
												</div>
												<div class="modal-body">
													<table id="batchWiseSubInvStockMrnReturnTableId" cellpadding="0"
														cellspacing="0" border="0"
														class="table table-striped table-bordered">
														<thead id="ehatTHead">
															<tr>
																<th class="col-md-1 center">#</th>
																<th class="col-md-1 center">Item Name</th>
																<th class="col-md-1 center" style="display: none">Item ID</th>
																<th class="col-md-1 center">UOM Unit</th>
																<th class="col-md-1 center">Item Batch Code</th>
																<th class="col-md-1 center">Item Batch Exp Date</th>
																<th class="col-md-1 center">Sub Inventory Stock</th>
																<!-- <th class="col-md-1 center">Main Inventory Stock</th> -->
															</tr>
														</thead>
														<tbody id="batchWiseSubInvStockForMrnReturnTbody">
														</tbody>
													</table>
												</div>
												<div class="modal-footer">
													<button type="button" class="btn btn-primary editUserAccess"
														onclick="setModalInfoToTableOnMrnReturn()">Save
														changes</button>
													<button type="button" class="btn btn-secondary"
														onclick="closeConsumptioRequestModalOnGenerateMRN()">Close</button>
												</div>
											</div>
										</div>
									</div>
									<!-- batch wise mrn return/stock return modal ends here -->
									<!-- new modal starts here -->
									<div id="generateMRNModalId" class="modal" tabindex="-1" data-backdrop="static" data-keyboard="false"
										role="dialog">
										<div class="modal-dialog" role="document">
											<div class="modal-content">
												<div class="modal-header">
													<h5 class="modal-title">Item Master Details</h5>
													<input type="hidden" id="hiddenSerialNoId" />
												</div>
												<div class="modal-body">
													<table id="itemMasterSlaveTableId" cellpadding="0"
														cellspacing="0" border="0"
														class="table table-striped table-bordered">
														<thead id="ehatTHead">
															<tr>
																<th class="col-md-1 center">#</th>
																<th class="col-md-1 center">Item Name</th>
																<th class="col-md-1 center" style="display: none">Item
																	ID</th>
																<th class="col-md-1 center">Item Quantity</th>
																<th class="col-md-1 center">unit Price</th>
																<!-- <th class="col-md-1 center">GST/IGST</th> -->
																<th class="col-md-1 center">CGST Rate</th>
																<th class="col-md-1 center">SGST Rate</th>
																<th class="col-md-1 center">Tax Name</th>
																<th class="col-md-1 center">Tax Rate</th>
																<th class="col-md-1 center">Fact 1</th>
																<th class="col-md-1 center">Fact 2</th>
																<th class="col-md-1 center">Fact 3</th>
																<th class="col-md-1 center">Fact 4</th>
																<th class="col-md-1 center" style="display: none">UOM
																	Unit 1</th>
																<th class="col-md-1 center" style="display: none">UOM
																	Unit 2</th>
																<th class="col-md-1 center" style="display: none">UOM
																	Unit 3</th>
																<th class="col-md-1 center" style="display: none">UOM
																	Unit 4</th>
															</tr>
														</thead>
														<tbody id="itemMasterSlaveRecordListOnMRNGenerate">
														</tbody>
													</table>
												</div>
												<div class="modal-footer">
													<button type="button" class="btn btn-primary editUserAccess"
														onclick="setModalInfoToTableOnGenerateMRN()">Save
														changes</button>
													<button type="button" class="btn btn-secondary"
														onclick="closeItemPurchaseDetailsModalOnGenerateMRNClickClose()">Close</button>
												</div>
											</div>
										</div>
									</div>
									<!-- new modal ends here -->

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
		<%@include file="inv_footer.jsp"%>
		<!--/PAGE -->

		<script>
			/*
			 * @author: Rohit Sandbhor
			 * @date:- 23-10-2019
			 * @codeFor:- below js function to call the getAllWarehouseMasterRecords() on ready
			 */
			jQuery(document).ready(function() {
				App.setPage("wizards_validations"); //Set current page 
				App.init(); //Initialise plugins and elements  
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});


				$('#mrnDate').datepicker({
					autoclose : true
				});
				
				
				new JsDatePick({
					useMode : 2,
					target : "searchFromDate",
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					dateFormat : "%Y-%m-%d",
					imgPath : "../img/",
					weekStartDay : 1,
				});
				
				new JsDatePick({
					useMode : 2,
					target : "searchToDate",
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					dateFormat : "%Y-%m-%d",
					imgPath : "../img/",
					weekStartDay : 1,
				});

			});
		</script>
		<script>
			onload = function() {
				addNewRowInTable('generateMRNRequestInfoTable','addGenerateMRNRequest');
				addNewRowInTable('consumptionRequestTable','addConsumptionRequest');
				addNewRowInTable('mrnReturnRequestTable','addMrnReturnRequest');
				//getAllPurchaseRequestMaster("open");
			}
		</script>
		<input type="hidden" id="mrnId" value="0" />
		<input type="hidden" id="userIDD" value="0" />
		<input type="hidden" id="consumptionId" value="0" />
		<input type="hidden" id="mrnReturnId" value="0" />
		<input type="hidden" id="mrnrejectId" value="0">
		<input type="hidden" id="goodsIssueMrnId" />
		<input type="hidden" id="hiddenpartyMasterId" value="0" />
		<input type="hidden" id="subinvname" value="" />
		<input type="hidden" id="RowCount" value="0" />
		<input type="hidden" id="totaltblsize" value="0" />
		<input type="hidden" id="patientId" value="0" />
		<input type="hidden" id="patientName" value="NA" />
		<input type="hidden" id="departMent" value="NA" />
		<input type="hidden" id="callFrom" value="fromnew" />
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>" />
		<input type="hidden" id="userNameId"
			value="<%= session.getAttribute("userName")%>" />
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="hiddenRadioButtonIndex" />
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	<script type="text/javascript" src="js/ehat_inventory.js"></script>
	<script type="text/javascript" src="js/ehat_inv_purchase_order.js"></script>
	<script type="text/javascript" src="js/ehat_inv_subInventory.js"></script>
	<script type="text/javascript" src="js/ehat_inv_goods_issue.js"></script>
	<script type="text/javascript" src="js/ehat_inv_goods_issue_new.js"></script>
	<script type="text/javascript" src="js/ehat_inv_pagination.js"></script>

</body>
</html>
