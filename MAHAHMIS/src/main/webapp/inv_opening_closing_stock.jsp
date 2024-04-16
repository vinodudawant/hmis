<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Opening Stock</title>
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
			<%@include file="inv_left_menu.jsp"%>
			<!-- /SIDEBAR -->
			<%
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
							"dd/MM/yyyy");
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
												href="inv_opening_closing_stock.jsp">Opening/Closing
													Stock</a></li>
										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>

							<div class="row" style="margin-bottom: 10px;">
								<div class="col-md-12">
									<div class="col-sm-1" style="display: none;">
										<label for="inlineFold" class="control-label">Search
											By</label>
									</div>
									<div class="col-md-4" style="display: none;">
										<div class="input-group" id="searchPurchaseOrderDivId">
											<input type="search" placeholder="Item Name"
												class="typeahead form-control input-SmallText"
												id="searchPurchaseOrderId"
												onkeyup="fetchPurchaseOrderDetails(this.id)" /> <span
												class="input-group-btn">
												<button class="btn btn-primary"
													style="height: 25px; margin-bottom: 10px" type="button">
													<span class="fa fa-search" aria-hidden="true"> </span>
													Search!
												</button>
											</span>
										</div>
									</div>
									<div class="col-md-4">
										<button class="btn btn-xs btn-info" type='button'
											data-toggle="modal" data-target="#openingStockModuleModal">
											<i class="fa fa-plus"></i> Opening Stock
										</button>
										<button class="btn btn-xs btn-danger" type='button'
											data-toggle="modal" data-target="#closingStockModuleModal">
											<i class="fa fa-minus"></i> Closing Stock
										</button>
									</div>

								</div>



							</div>

							<!-- opening modal starts here -->
							<div class="modal fade" id="openingStockModuleModal"
								tabindex="-1" data-backdrop="static" data-keyboard="false"
								role="dialog" aria-labelledby="openingStockModuleModal"
								aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">
												Opening Stock
												<div class="pull-right" style="margin-right: 15px;">
													<button type="button"
														class="btn btn-primary editUserAccess"
														onclick="saveOpeningStockModule()">Save</button>
													<button type="button" class="btn btn-primary btn-danger"
														data-dismiss="modal">Close</button>
												</div>
											</h5>
										</div>
										<div class="modal-body">
											<input type="hidden" id="openingStockId" value="0" /> <input
												type="hidden" id="hiddenRadioButtonIndex" />
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Opening
																Stock</div>
															<div class="panel-body">
																<div class="row">
																	<div class="form-group col-md-2">
																		<label for="partyName">Opening Stock Series
																			Label<b style="color: red;">*</b>
																		</label> <select class="form-control" id="osSeriesId">
																			<option value="0">--Select Status--</option>
																		</select>
																	</div>
																	<div class="form-group col-md-2">
																		<label for="partyName">Opening Stock Series<b
																			style="color: red;">*</b></label> <input type="text"
																			class="form-control tip-focus"
																			id="openingStockSeriesId" name="openingStockSeries"
																			readonly="readonly">
																	</div>
																	<div class="form-group col-md-2">
																		<label for="sAddress">Stock Narration</label>
																		<textarea type="text" class="form-control"
																			required="true" id="stockNarrationId"
																			name="stocknarration" placeholder="narration"></textarea>
																	</div>
																	<div class="col-md-4">
																		<div class="form-group col-md-6">
																			<label for="itemQuantity">Total Item Quantity
																				<b style="color: red;">*</b>
																			</label> <input type="text" class="form-control tip-focus"
																				id="totalItemQuantityId"
																				placeholder="Total Item Quantity"
																				readonly="readonly" title="Total Item Quantity"
																				value="0" name="Total Item Quantity">
																		</div>
																		<div class="form-row">
																			<div class="form-group col-md-6">
																				<label for="landLineNo">Total Amount</label> <input
																					type="text" class="form-control tip-focus"
																					id="totalAmountId"
																					placeholder="Total Item Discount"
																					readonly="readonly" title="Total Item Discount"
																					value="0" name="Total Item Discount">
																			</div>
																		</div>
																	</div>
																	<div class="form-group col-md-2"></div>
																</div>
																<div class="row">
																	<div
																		class="form-group col-md-2 col-sm-2 col-xs-6 custom-control custom-radio">
																		<label class="checkbox-inline"><b>Asset
																				Item</b></label> <input class='custom-control-input'
																			type="radio" name="searchAssetOrService"
																			id="assetItemOpningId" value="Asset">
																	</div>
																	<div
																		class="form-group col-md-2 col-sm-2 col-xs-6 custom-control custom-radio">
																		<label class="checkbox-inline"><b>Service
																				Item</b></label> <input class='custom-control-input'
																			type="radio" name="searchAssetOrService"
																			id="serviceItemOpningId" value="Service">
																	</div>
																</div>
															</div>
														</div>
													</div>
													<!--------------------------table Start-------------------------->
													<div class="container" style="margin-top: 2%;">
														<ul class="nav nav-tabs">
															<li class="active"><a data-toggle="tab"
																href="#itemInfo">Item Info</a></li>
															<li><a data-toggle="tab" href="#maintenanceInfo">Asset
																	Maintenance</a></li>
														</ul>
														<div class="tab-content">
															<div id="itemInfo" class="tab-pane fade in active">
																<div class="panel panel-primary" style="height: 250px">
																	<div class="panel-body" style="width: 100%;">
																		<div class="row">
																			<div class="col-md-4 pull-left"
																				style="margin-left: 90%;">
																				<div class="form-group col-md-6">
																					<button
																						onclick="addNewRowInTableOpeningStock('ItemInfoTablePO','openingstockOnPlus')"
																						class="btn btn-xs btn-success" type='button'
																						id="btnAddNew" value="+">+</button>
																					<button type="button"
																						onclick="removeRowFromTableOpeningStock('ItemInfoTablePO','chkMrnItem')"
																						style="margin: 7px;"
																						class="btn btn-xs btn-success" value="_">-</button>

																				</div>
																			</div>
																		</div>
																		<div class="form-row">
																			<div style="margin-left: 2%;overflow: auto">
																				<div
																					style='width: 98%; padding: 1%; font-weight: normal; height: 180px;'>
																					<table id="ItemInfoTablePO" class="table table-bordered table-striped table-condensed">
																						<thead class='cf' style='background: white;'>
																							<tr>
																								<th>Select</th>
																								<th>Sr.No</th>
																								<th>Item Name</th>
																								<th>Item Quantity</th>
																								<th style="display: none">Item Id</th>
																								<th>Unit Price</th>
																								<th>Disc(%)</th>
																								<th>Disc(Rs)</th>
																								<th>Disc(Amt)</th>
																								<th>Base Amount</th>
																								<th>GST</th>
																								<th>IGST</div></th>
																								<th>GST Amt(Rs)</th>
																								<th>Total Amount</th>
																								<th>Factor 1</th>
																								<th>Factor 2</th>
																								<th>Factor 3</th>
																								<th>Factor 4</th>
																								<th>Ordered Qty</th>
																								<th>Batch No</th>
																								<th>Manufacture Date</th>
																								<th>Expiry Date</th>
																								<th style="display: none;"></th>
																								<th style="display: none;"></th>
																								<th style="display: none;"></th>
																								<th style="display: none;"></th>
																								<th style="display: none;"></th>
																								<th style="display: none;"></th>
																								<th style="display: none;"></th>
																								<th style="display: none;"></th>
																								<th style="display: none;"></th>
																								<th style="display: none;"></th>
																								<th style="display: none;"></th>
																								<th style="display: none;"></th>
																								<th style="display: none;"></th>
																							</tr>
																						</thead>

																						<tbody id="itemInfoDetails">

																						</tbody>
																					</table>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<!--  maintenance Asset tab start here -->
															<div id="maintenanceInfo" class="tab-pane fade">
																<div class="panel panel-primary">
																	<div class="panel-body">
																		<div class="container">
																			<div class="row">
																				<div class="col-md-12">
																					<div>
																						<div
																							style='width: 100%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;'>
																							<table
																								class='table table-striped table-bordered header-fixed cf'
																								id="maintenanceTableInfo">
																								<thead class='cf' style='background: white;'>
																									<tr>
																										<th class='col-md-1 center'><div>#</div></th>
																										<th class='col-md-2 center'><div>Serial
																												No</div></th>
																										<th class='col-md-2 center'><div>Item
																												Name</div></th>
																										<th style='display: none;'
																											class='col-md-2 center'><div>Purchase
																												Date</div></th>
																									</tr>
																								</thead>
																								<tbody id="maintenanceTableInfoList">
																								</tbody>
																							</table>
																						</div>
																					</div>
																					<div id="PartyAddressTableInfoList"
																						style="visibility: hidden;"></div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<!-- maintenance Asset tab ends here -->
														</div>
													</div>
												</div>
											</div>
										</div>
										<div id="purchaseOrderModalId" class="modal" tabindex="-1"
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
														<table id="itemMasterSlaveTableId" cellpadding="0"
															cellspacing="0" border="0"
															class="datatable table table-striped table-bordered">
															<thead id="ehatTHead">
																<tr>
																	<th class="col-md-1 center">#</th>
																	<th class="col-md-1 center">Item Name</th>
																	<th class="col-md-1 center" style="display: none">Item
																		Quantity</th>
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
																</tr>
															</thead>
															<tbody id="itemMasterSlaveRecordList">
															</tbody>
														</table>
													</div>
													<div class="modal-footer">
														<button type="button" class="btn btn-primary"
															onclick="setModalInfoToTableOnOpeningStock()">Save
															changes</button>
														<button type="button" class="btn btn-secondary"
															onclick="closeItemPurchaseDetailsModal('Model')">Close</button>
													</div>
												</div>
											</div>
										</div>
										<div class="modal-footer"></div>
									</div>
								</div>
							</div>
							<!-- opening modal ends here -->
							<!-- closing modal starts here -->
							<div class="modal fade" id="closingStockModuleModal"
								tabindex="-1" role="dialog"
								aria-labelledby="closingStockModuleModal" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">
												Closing Stock
												<div class="pull-right" style="margin-right: 15px;">
													<button type="button"
														class="btn btn-primary editUserAccess"
														onclick="saveClosingStockModule()">Save</button>
													<button type="button" class="btn btn-primary btn-danger"
														data-dismiss="modal">Close</button>
												</div>
											</h5>
										</div>
										<div class="modal-body">
											<input type="hidden" id="closingStockId" value="0" />
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-body">
																<form id="financialFormId" onsubmit="return false">
																	<input type="hidden" id="itemMasterIdOnClosingStock" />
																	<div class="form-row">
																		<div class="form-group col-md-2">
																			<label for="QuatationDate">Closing Stock Date<b
																				style="color: red;">*</b></label> <input
																				id="closingStockDateId"
																				class="form-control input-SmallText" type="text"
																				name="openingStockDate" placeholder="Date"
																				value="<%=todays_date%>">
																		</div>
																	</div>
																</form>
																<div class="container" style="margin-top: 2%;">
																	<ul class="nav nav-tabs">
																		<div class="form-group col-md-3 pull-right">
																			<div class="form-group col-md-8">
																				<button type="button"
																					class="btn btn-success btn-number"
																					onclick="addNewRowInTableForClosingStock('closingstockTable','closingstockOnPlus')">
																					<span class="glyphicon glyphicon-plus"></span>
																				</button>
																				<button type="button"
																					class="btn btn-danger btn-number"
																					onclick="removeRowFromTableForClosingStock('closingstockTable','chkMrnItem')">
																					<span class="glyphicon glyphicon-minus"></span>
																				</button>
																			</div>
																		</div>
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
																									<div style="height: 180px; overflow-y: scroll"
																										class="col-md-12">

																										<table
																											class='table table-striped table-bordered header-fixed cf'
																											id="closingstockTable">
																											<thead class='cf' style='background: white;'>
																												<tr>
																													<th>Select <input type="checkbox" id="chkAllCheck"
																														onclick="checkUncheckAll('chkAllCheck','chkMrnItem')"></th>
																													<!-- <th class='col-md-2 center'><div>Select</div></th> -->
																													<th>Sr.No</th>
																													<th>Item Name</th>
																													<th>Item Batch Code</th>
																													<th>Item Batch Exp Date</th>
																													<th>Current Item Stock</th>
																													<th>Deduct Item Stock</th>
																													<th>Naration</th>
																													<th style="display: none;">Item Id</th>
																												</tr>
																											</thead>
																											<tbody id="closingStockTableBodyId" style="width: 400px">

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
											</div>
										</div>

										<div class="modal-footer"></div>
									</div>
								</div>
							</div>

							<!--------------Batch Wise Info Modal  Start Added By Dayanand(30-1-2020)----------   -->
							<div id="batchModel" class="modal fade in" style="height: 500px;">
								<div class="modal-dialog">
									<div class="modal-content" class="col-md-12">
										<div class="modal-header">
											<h5 class="modal-title">
												Item Batch Details
												<div class="pull-right" style="margin-right: 15px;">
													<button type="button" class="btn btn-primary"
														id="btnSubContractingMaterialIssueSave"
														name="btnSubContractingMaterialIssueSave"
														onclick="setModalInfoToTableOnOpeningStockBatchWise()">Ok</button>
													<button type="button" class="btn btn-default"
														onclick="closeItemBatchDetailsModal()">Cancel</button>
												</div>
											</h5>
										</div>

										<div class="modal-body">
											<div class="col-md-12-1">
												<div class="col-md-2-1"></div>
											</div>
											<div class="col-md-12-1">
												<table id="ItemInfoTable" style="overflow: scroll;"
													border="1"
													class="table table-bordered table-striped table-responsive">
													<thead>
														<tr>
															<th class='col-md-1-1 center'>
																<div class='TextFont'>select</div>
															</th>
															<th class='col-md-3-1 center'>
																<div class='TextFont'>Item Name</div>
															</th>
															<th class='col-md-3-1 center'>
																<div class='TextFont'>Qty</div>
															</th>
															<th class='col-md-3-1 center'>
																<div class='TextFont'>Batch Code</div>
															</th>
															<th class=' col-md-3-1 center'>
																<div class='TextFont'>Expiry</div>
															</th>
														</tr>
													</thead>

													<tbody id="batchData">
													</tbody>
												</table>
											</div>
											<!-- /BOX-->
										</div>
										<!-- /BODY-->
										<div class="modal-footer"></div>
									</div>
								</div>
							</div>


							<!--------------Batch Wise Info Modal  End----------   -->


							<!-- batch wise closing modal starts here -->
							<div id="batchWisecloseStockModal" class="modal" tabindex="-1"
								role="dialog">
								<div class="modal-dialog" role="document">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title">
												Item Batch Details
												<div class="pull-right" style="margin-right: 15px;">
													<button type="button" class="btn btn-primary"
														onclick="setModalInfoToTableOnBatch()">Save
														changes</button>
													<button type="button" class="btn btn-secondary"
														onclick="closeItemPurchaseDetailsModalOnClose()">Close</button>
												</div>
											</h5>
										</div>
										<div class="modal-body" style="height: 100%;">
											<table id="batchWiseSubInvStockTableId" cellpadding="0"
												cellspacing="0" border="0" style="overflow: scroll;"
												class="table table-striped table-bordered">
												<thead id="ehatTHead">
													<tr>
														<th class="col-md-1 center">#</th>
														<th class="col-md-1 center">Item Name</th>
														<th class="col-md-1 center">Inventory Stock</th>
														<th class="col-md-1 center">Item Batch Code</th>
														<th class="col-md-1 center" style="display: none">Item
															ID</th>
														<th class="col-md-1 center">Item Batch Exp Date</th>

													</tr>
												</thead>
												<tbody id="batchWisecloseStockTbody"
													style="overflow: scroll;">
												</tbody>
											</table>
										</div>
										<div class="modal-footer"></div>
									</div>
								</div>
							</div>
							<!-- batch wise closing modal ends here -->

							<!-- closing modal ends here -->
							<div class="row">
								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<ul class="nav nav-tabs">
										<li class="active"><a data-toggle="tab"
											href="#openingStockTab">Opening Stock</a></li>
										<li><a data-toggle="tab" href="#closingStockTab"
											onclick="getAllClosingStockRecordsDetails()">Closing
												Stock</a></li>
									</ul>
									<div class="tab-content">
										<!-- general tab starts here -->
										<div id="openingStockTab" class="tab-pane fade in active">
											<div class="panel panel-default">
												<div class="panel-body">
													<div class="row">
														<div class="col-md-12">
															<div class="tabbable header-tabs">
																<div class="row" style="margin-top: 5px">
																	<div class="col-md-12">
																		<div class="col-sm-12">
																			<div class="pull-right">
																				<div id="datatable1_filter"
																					class="dataTables_filter">
																					<label id="searchlabel"> </label>
																				</div>
																			</div>
																		</div>
																		<div class="panel panel-primary">
																			<div class="panel-heading" id="divEhatContent">Opening
																				Stock Details</div>
																			<div class="panel-body">
																				<table id="openingStockTableId"
																					class="datatable table table-striped table-bordered">
																					<thead id="ehatTHead">
																						<tr>
																							<th>#</th>
																							<th>Created Date</th>
																							<th>Opening Stock ID</th>
																							<th>Item Name</th>
																							<th>Item Batch Code</th>
																							<th>Item Expriry Date</th>
																							<th>Stock Added</th>
																							<th>Stock Inserted By</th>
																						</tr>
																					</thead>
																					<tbody id="openingStockTableBodyId">
																					</tbody>
																				</table>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<!--    Starting pagination opening stock   -->
													<div style="margin-top: -2%;">
														<div class="pull-right">
															<ul class="pagination pagination-blue margin-bottom-10"
																id="openingStockRecordPagination">
															</ul>
														</div>
														<div class="row">
															<div class="col-md-4 col-md-offset-8">
																<div class="pull-right">
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="totalNumberOfPagesOpeningStock">
																	</ul>
																</div>
															</div>
														</div>
													</div>
													<!--   Ending  pagination opening stock-->
												</div>
											</div>
										</div>
										<div id="closingStockTab" class="tab-pane">
											<div class="panel panel-default">
												<div class="panel-body">
													<div class="row">
														<div class="col-md-12">
															<div class="tabbable header-tabs">
																<div class="row" style="margin-top: 5px">
																	<div class="col-md-12">
																		<!-- <div class="col-sm-12">
																	<div class="pull-right">
																		<div id="datatable1_filter" class="dataTables_filter">
																			<label id="searchlabel"> </label>
																		</div>
																	</div>
																</div> -->
																		<div class="panel panel-primary">
																			<div class="panel-heading" id="divEhatContent">Closing
																				Stock Details</div>
																			<div class="panel-body">
																				<table id="closingStockTableId"
																					class="datatable table table-striped table-bordered">
																					<thead id="ehatTHead">
																						<tr>
																							<th>Sr</th>
																							<th>Created Date</th>
																							<th>Closing Stock ID</th>
																							<th>Item Name</th>
																							<th>Item Batch Code</th>
																							<th>Item Expiry Date</th>
																							<th>Stock Deducted Quantity</th>
																							<th>Naration</th>
																							<th>Stock Deducted By</th>
																						</tr>
																					</thead>
																					<tbody id="closingStockTableBody">
																					</tbody>
																				</table>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<!--    Starting pagination closing stock   -->
													<div style="margin-top: -2%;">
														<div class="pull-right">
															<ul class="pagination pagination-blue margin-bottom-10"
																id="closingStockRecordPagination">
															</ul>
														</div>
														<div class="row">
															<div class="col-md-4 col-md-offset-8">
																<div class="pull-right">
																	<ul class="pagination pagination-blue margin-bottom-10"
																		id="totalNumberOfPagesClosingStock">
																	</ul>
																</div>
															</div>
														</div>
													</div>
													<!--   Ending  pagination closing stock -->
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

			var nowTemp = new Date();
			var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(),
					nowTemp.getDate(), 0, 0, 0, 0);
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

			var checkout = $('#dpd2')
					.datepicker(
							{
								onRender : function(date) {
									return date.valueOf() <= checkin.date
											.valueOf() ? 'disabled' : '';
								}
							}).on('changeDate', function(ev) {
						checkout.hide();
					}).data('datepicker');

			/* $('#openingStockDateId').datepicker({
				autoclose : true
			}); */
			$('#closingStockDateId').datepicker({
				autoclose : true
			});

			//below line to set current date on datepicker
			//$('#startDateId').datepicker('setDate', 'now');
			$('#deliveryDateId').datepicker({
				autoclose : true
			});
			$('#contactDateofbirthPOId').datepicker({
				autoclose : true
			});
		</script>
		<script>
			/*
			 * @author: Rohit Sandbhor
			 * @date:- 23-10-2019
			 * @codeFor:- below js function to call the getAllPurchaseOrderRecordsDetails() on ready
			 */
			jQuery(document).ready(
					function() {
						App.setPage("wizards_validations"); //Set current page 
						App.init(); //Initialise plugins and elements  
						$(function() {
							$('[data-toggle="tooltip"]').tooltip();
						});
						getAllOpeningStockRecordsDetails();
						addNewRowInTableOpeningStock('ItemInfoTablePO',
								'openingstock');
						addNewRowInTableForClosingStock('closingstockTable',
								'CLOSE');
						getDocNumberingForOSSeries();
						//getPurchaseQuotationOnPurchaseOrder();
					});
		</script>
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="userNameId"
			value="<%=session.getAttribute("userName")%>" />
		<input type='hidden' value='0' id='rowCountId' />
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="stockId" value="0">
		<input type="hidden" id="openingStockItemCurrentRowIndexId" value='0'/>
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>

	<!-- include js for development -->
	<script type="text/javascript" src="js/ehat_inventory.js"></script>
	<!-- include js for development of po -->
	<script type="text/javascript" src="js/ehat_inv_purchase_order.js"></script>
	<!-- include js for development of po -->
	<script type="text/javascript" src="js/ehat_inv_opening_close_stock.js"></script>
	<script type="text/javascript" src="js/ehat_inv_pagination.js"></script>

</body>
</html>

