<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Goods Receipt Note</title>
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
							"yyyy-MM-dd");
					String todays_date = formatter.format(currentDate.getTime());
					//	System.out.print("todays_date :::"+todays_date );

					Date date = new Date();
					java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat(
							"dd/MM/yyyy h:mm:ss a");
					String formattedDate = sdf.format(date);
					System.out.println(formattedDate); // 12/01/2011 4:48:16 PM
					//	Date dtHMS = new Date();

					//	System.out.print(datewithHMS.getHours()+":"+datewithHMS.getMinutes()+":"+datewithHMS.getSeconds());
					//	String Time = dtHMS.getHours() + ":" + dtHMS.getMinutes() + ":"	+ dtHMS.getSeconds();
					//System.out.print("aaaaaa :" + Time);
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
												href="inv_good_receipt_note.jsp">Goods Receipt Note</a></li>
										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>

							<div class="row">

								<div class="col-md-12">
									<div class="col-sm-1">
										<label for="inlineFold" class="control-label">Search
											By<b style="color: red;">*</b></label>
									</div>
									<div class="col-md-2">
										<select class="form-control" id="searchById" onchange="callSearchBy()">
											<option value="1">Search By Id</option>
											<option value="2">Search By Name</option>
											
										</select>
									</div>
									<div class="col-md-3" id="searchbyIdDiv">
										<div class="row">
											<div class="col-md-6">
												<input type="search" class="form-control input-SmallText" id="seachGoodReceiptNoteId" value="" />
											</div> 
											<div class="col-md-2">
												<input class="btn btn-primary" type="button" onclick="getGoodReceiptNoteById()" value="Search!">
											</div>
										</div>
									</div>
									<div class="col-md-4" style="display: none;" id="searchbyNameIdDiv">
										<div class="input-group" id="goodReceiptNoteByName">
											<input type="search"
												class="typeahead form-control input-SmallText"
												id="seachGoodReceiptNote"
												onkeyup="getAutoGoodReceiptNote(this.id)" value="" /> <span
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
										<button class="btn btn-xs btn-info pull-left" type='button'
											data-toggle="modal" id="goodReceiptNote"
											data-target="#goodReceiptNoteModal" onclick="showSaveDraftButton()">
											<i class="fa fa-plus"></i> Add New GRN
										</button>
										
										<!-- Added By Dayanand For  To export  data in Excel  Date(29-1-2020)-->
												<div style="font-weight: bold;" class="col-md-1-1">
														<button id="btnExport" class="btn btn-xs btn-warning editUserAccess" value="Excel"  title="" data-placement="left" data-toggle="tooltip" data-original-title="Excel" style="margin-left: 10px">
																			<!-- <i class="fa fa-file"></i> --> Export To Excel
																	</button>
																	<!-- following code for Excel sheet -->
																	<script type="text/javascript">
																	$("[id$=btnExport]").click(function(e) {
																	    window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$=grnMasterInfo]').html()));
																	    e.preventDefault();
																	});
																	
																	</script>					
												</div>
												<!-- End -->
										
										
									</div>
								</div>
							</div>

							<!-- modal starts here -->
							<div class="modal fade" id="goodReceiptNoteModal" tabindex="-1" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="itemMasterModalLabel" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h3 class="modal-title">
												Goods Receipt Note
												<div class="pull-right" style="margin-right: 15px;">
													<button class="btn btn-primary" data-toggle="collapse"
														data-target="#financialFormId">Open</button>
													<button type="button" id="saveGrn" class="btn btn-primary editUserAccess"
														onclick="saveGoodReceiptNote('NODRAFT')">Save GRN</button>
														<button type="button" id="draftGrn" class="btn btn-primary editUserAccess"
														onclick="saveGoodReceiptNote('DRAFT')">Draft GRN</button>
														
													<button type="button" class="btn btn-primary btn-danger"
														onclick="closeGRNPopUp('inv_good_receipt_note.jsp');" data-dismiss="modal">Close</button>
												</div>
											</h3>
										</div>
										<div class="modal-body" style="padding: 0px !important;">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Goods
																Receipt Note</div>
															<div class="panel-body">
																<form id="financialFormId" onsubmit="return false"
																	class="collapse" enctype="multipart/form-data">
																	<div class="row">
																		<div class="col-md-4">
																			<div class="row">
																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="grnId">GRN Id</label>
																				</div>
																				<div class="form-group col-md-8 col-sm-8 col-xs-12">
																					<input type="text" placeholder="GRN Id"
																						class="form-control tip-focus" id="txtgrnId"
																						readonly="true" name="grnId"> <input
																						type="hidden" class="form-control"
																						id="hiddenNextGrnId" name="" data-name="">
																				</div>
																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="QuatationDate">GRN Date<b
																						style="color: red;">*</b></label>
																				</div>
																				<div class="form-group col-md-8 col-sm-8 col-xs-12">
																					<input id="grnDate" disabled='disabled'
																						class="form-control input-SmallText" type="text"
																						readonly="readonly" name="date" placeholder="Date"
																						value="<%=todays_date%>">
																				</div>
																				<div id="checkForGRN">
																					<div class="form-group col-md-4 col-sm-4 col-xs-12">
																						<label for="grnPurchaseOrder">Get PO</label>
																					</div>
																					<div class="form-group col-md-5"
																						id="grnPurchaseOrderId">
																						<select class="form-control" id="grnPurchaseOrder"
																							onchange="getPurchaseOrderlist(this.value)">
																							<option value="0">--Select Purchase
																								Order--</option>
																						</select>
																					</div>

																					<div class="form-group col-md-3"
																						id="grnPurchaseOrderCheck" style="display: none;">
																						<input type="button"
																							class="btn btn-primary form-control"
																							id="grnPurchaseOrderAppend" value="Append"
																							name="" data-name="">
																					</div>
																				</div>
																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="parent">Party Name<b
																						style="color: red;">*</b></label>
																				</div>
																				<div class="form-group col-md-8 col-sm-8 col-xs-12"
																					id="partyMasterByName">
																					<input type="hidden" id="hiddenSupplierNameId" />
																					<input type="text" class="form-control tip-focus"
																						id="grnSupplierName"
																						onkeyup="getAutoPartyMaster(this.id)"
																						placeholder="Enter Party name "
																						title="Please enter Party name" name="supplier"
																						data-name="SupplierNAme" autocomplete="off">
																				</div>
																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="type">Supplier State<b
																						style="color: red;">*</b></label>
																				</div>
																				<div class="form-group col-md-8 col-sm-8 col-xs-12">
																					<select class="form-control" id="grnSupplierState" onchange="getVenderState();resetItemTotalAmount();">
																						<option value="0">--Select State--</option>
																					</select>
																				</div>
																				<div class="form-check col-md-4 col-sm-4 col-xs-6">
																					<label class='form-check-label'
																						for="withoughtPoGrnId">W/PO GRN <input
																						type="checkbox"
																						class="form-control form-check-input tip-focus"
																						id="withoughtPoGrnId" name="withoughtPoGrnId"
																						onclick="checkForGRN()" style="width: auto;"></label>
																				</div>
																				<div class="form-group col-md-4 col-sm-4 col-xs-6 custom-control custom-radio">
																				  <label class="checkbox-inline"><b>Asset Item</b></label>
																	              	<input class='custom-control-input' value="Asset" type="radio" name="searchAssetOrService" id="assetItemGrnId">
																				</div>
																				<div class="form-group col-sm-4 col-xs-6 custom-control custom-radio">
																				  <label class=""><b>Service Item</b></label> 
																	              	<input class='custom-control-input' value="Service" type= "radio" name="searchAssetOrService" id="serviceItemGrnId">
																				</div>
																			</div>
																		</div>
																		<div class="col-md-4">
																			<div class="row">
																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="mobileNumber">Mobile No<b
																						style="color: red;">*</b></label>
																				</div>
																				<div class="form-group col-md-8 col-sm-8 col-xs-12">
																					<input type="text" class="form-control tip-focus"
																						id="grnMobileNo" placeholder="Enter Mobile No"
																						title="Please Enter Mobile No" name="mobileNumber">
																				</div>

																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="status">GRN Series<b
																						style="color: red;">*</b></label>
																				</div>
																				<div class="form-group col-md-3 col-sm-3 col-xs-6">
																					<select class="form-control" id="selectGrnDoc"
																						onchange="getGRNSeries(this.value)">
																						<option value="0">--Select Status--</option>
																					</select>
																				</div>
																				<div class="form-group col-md-5 col-sm-5 col-xs-6">
																					<input type="text"  class="form-control tip-focus"
																						id="grnSeries" placeholder="GRN Series" name="grnSeries" readonly="">
																				</div>

																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="grnReferenceNo">Reference No<b
																						style="color: red;">*</b></label>
																				</div>
																				<div class="form-group col-md-8 col-sm-8 col-xs-12">
																					<input type="text" class="form-control tip-focus"
																						id="grnReferenceNo"
																						placeholder="Enter Reference No"
																						title="Please enter  Reference No"
																						name="grnReferenceNo">
																				</div>

																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="purInvNumber">Pur Inv Number<b
																						style="color: red;">*</b></label>
																				</div>
																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<input type="text" class="form-control tip-focus"
																						id="grnPurInvNumber" placeholder="Pur Inv No"
																						title="Please Enter Pur Inv Number"
																						name="purInvNumber" readonly="readonly">
																				</div>
																				<div class="form-group col-md-4 col-sm-4 col-xs-6" style="visibility: hidden">
																					<input type="text" class="form-control tip-focus"
																						id="grnPurInvNumber1" placeholder="Pur Inv No"
																						title="Please Enter Pur Inv Number"
																						name="purInvNumber">
																				</div>
																				
																			</div>
																		</div>
																		<div class="col-md-4">
																			<div class="row">
																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="Address">Supplier Address<b
																						style="color: red;">*</b></label>
																				</div>
																				<div class="form-group col-md-8 col-sm-8 col-xs-12">
																					<textarea type="text" class="form-control"
																						required="true" id="grnSupplierAddress"
																						placeholder="Address"></textarea>
																				</div>
																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="Deleviry">Delivery Date</label>
																				</div>
																				<div class="form-group col-md-8 col-sm-8 col-xs-12">
																					<input id="grnDeliveryDate"
																						class="form-control input-SmallText" type="text"
																						readonly="readonly" name="date" placeholder="Date"
																						value="<%=todays_date%>">
																				</div>
																				<div class="form-group col-md-4 col-sm-4 col-xs-12" style="display: none">
																					<label for="priority">GRN status<b
																						style="color: red;">*</b></label>
																				</div>
																				<div class="form-group col-md-8 col-sm-8 col-xs-12" style="display: none">
																					<select class="form-control" id="grnStatus">
																						<option value="0">--Select Status--</option>
																						<option value="Open">Open</option>
																						<option value="Closed">Closed</option>
																						<option value="Hold">Hold</option>
																						<option value="Cancelled">Cancelled</option>
																					</select>
																				</div>
																				<div class="form-group col-md-4 col-sm-4 col-xs-12"
																					style="display: none;">
																					<label for="partyName">Get partial GRN </label>
																				</div>
																				<div class="form-group col-md-8 col-sm-8 col-xs-12"
																					style="display: none;">
																					<select class="form-control" id="grnPartial">
																						<option value="0">--Select Status--</option>
																						<option value="Open">Open</option>
																						<option value="Closed">Closed</option>
																						<option value="Hold">Hold</option>
																						<option value="Cancelled">Cancelled</option>
																					</select>
																				</div>
																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="partyName">Delivery challan
																						Number </label>
																				</div>
																				<div class="form-group col-md-4 col-sm-4 col-xs-6">
																					<input type="text" class="form-control tip-focus"
																						id="grnDeliveryChallanNumber"
																						placeholder="Delivery challan No"
																						title="Please Enter Delivery challan Number"
																						name="deliveryChallanNumber" readonly="readonly">
																				</div>
																				<div class="form-group col-md-4 col-sm-4 col-xs-6" style="display: none;">
																					<input type="text" class="form-control tip-focus"
																						id="grnDeliveryChallanNumber1"
																						placeholder="Delivery challan No"
																						title="Please Enter Delivery challan Number"
																						name="deliveryChallanNumber">
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
																<li class="active"><a data-toggle="tab" href="#itemInfo">Item Info</a></li>
																<li><a data-toggle="tab" href="#contactInfo">Contact Info</a></li>
																<li><a data-toggle="tab" href="#addressnfo">Address Info</a></li>
																<li><a data-toggle="tab" href="#maintenanceInfo">Asset Maintenance</a></li>
																<li><a data-toggle="tab" href="#uploadInfo">Upload Document</a></li>
															</ul>
															<div class="tab-content">
																<!-- general tab starts here -->
																<div id="itemInfo" class="tab-pane fade in active">
																	<div class="panel panel-primary"
																		style="margin-top: 20px; height: 320px">
																		<div class="panel-body" style="width: 100%;">
																			<form enctype="multipart/form-data">
																				<div class="row">
																					<div class="col-md-8">
																						<div class="form-group col-md-4">
																							<label for="itemQuantity">Total Item
																								Quantity <b style="color: red;">*</b>
																							</label> <input type="text"
																								class="form-control tip-focus" id="totalItemQty"
																								placeholder="Total Item Quantity"
																								title="Total Item Quantity" name="totalItemQty"
																								readonly="true">
																						</div>
																						<div class="form-group col-md-4">
																							<label for="landLineNo">Total Item
																								Discount </label> <input type="text"
																								class="form-control tip-focus"
																								id="totalItemDiscount"
																								placeholder="Total Item Discount"
																								title="Total Item Discount"
																								name="totalItemDiscount" readonly="true">
																						</div>
																						<div class="form-group col-md-4">
																							<label for="landLineNo">Total Pending Qty
																							</label> <input type="text"
																								class="form-control tip-focus"
																								id="totalPendingQty"
																								placeholder="Total Pending Qty "
																								title="Total Pending Qty " readonly="true"
																								name="totalPendingQty" value="0">
																						</div>
																					</div>
																					<div class="col-md-4">
																						<div class="form-group col-md-6" id='hideGrnAddButton'>
																							<button
																								onclick="addNewRowInTableByAddButton('grnItemInfoTable','GRNOnPlus')"
																								class="btn btn-xs btn-success" type='button'
																								id="btnAddNew" value="+">+</button>
																							<button type="button"
																								onclick="removeRowFromTable('grnItemInfoTable','chkGrnItem')"
																								style="margin: 7px;"
																								class="btn btn-xs btn-danger" value="_">-</button>

																						</div>

																					</div>
																				</div>

																				<!--------------------------table Start-------------------------->
																				<div class="row">
																					<div style="margin-left: 2%;overflow: auto">
																						<div style='width: 100%; padding: 1%; font-weight: normal; height: 190px;'>
																							<table id="grnItemInfoTable" class="table table-bordered table-striped table-condensed">
																								<thead class='cf' style='background: white;'>
																									<tr>
																										<th><div class='col-md-6 col-xs-12 col-sm-6'>Select</div></th>
																										<th><div class='col-md-4 col-xs-12 col-sm-4'>Sr.No</div></th>
																										<th><div class='col-md-8 col-xs-12 col-sm-8 center'>Item Name</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Item Quantity</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Unit Price</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Disc(%)</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Disc(Rs)</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Disc(Amt)</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Base Amount</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>GST</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>IGST</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>GST Amt(Rs)</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>IGST Amt(Rs)</div></th>		
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Total Amount</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Factor 1</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Factor 2</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Factor 3</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Factor 4</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Expected Qty</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Receive Qty</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Pending Qty</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Batch No</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Batch Details</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Manufacture Date</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Expiry Date</div></th>
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Total Amount</div></th>	
																										<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Add Another Batch</div></th>		
																										<th style="display: none;" id="deleteItemSlave"><div class='col-md-6 col-xs-12 col-sm-6 center'></div></th>	
																										<th style="display: none;"><div class='col-md-6 col-xs-12 col-sm-6 center'></div></th>
																										<th style="display: none;"><div class='col-md-6 col-xs-12 col-sm-6 center'></div></th>
																										<th style="display: none;"><div class='col-md-6 col-xs-12 col-sm-6 center'></div></th>
																										<th style="display: none;"><div class='col-md-6 col-xs-12 col-sm-6 center'></div></th>
																										<th style="display: none;"><div class='col-md-6 col-xs-12 col-sm-6 center'></div></th>
																										<th style="display: none;"><div class='col-md-6 col-xs-12 col-sm-6 center'></div></th>
																										<th style="display: none;"><div class='col-md-6 col-xs-12 col-sm-6 center'></div></th>
																										<th style="display: none;"><div class='col-md-6 col-xs-12 col-sm-6 center'></div></th>
																										<th style="display: none;"><div class='col-md-6 col-xs-12 col-sm-6 center'></div></th>
																										<th style="display: none;"><div class='col-md-6 col-xs-12 col-sm-6 center'></div></th>
																										<th style="display: none;"><div class='col-md-6 col-xs-12 col-sm-6 center'></div></th>
																										<th style="display: none;"><div class='col-md-6 col-xs-12 col-sm-6 center'></div></th>
																										<th style="display: none;"><div class='col-md-6 col-xs-12 col-sm-6 center'></div></th>
																										<th style="display: none;"><div class='col-md-6 col-xs-12 col-sm-6 center'></div></th>
																										<th style="display: none;"><div class='col-md-6 col-xs-12 col-sm-6 center'></div></th>
																										<th style="display: none;"><div class='col-md-6 col-xs-12 col-sm-6 center'></div></th>
																										<th style="display: none;"><div class='col-md-6 col-xs-12 col-sm-6 center'></div></th>
																									</tr>
																								<tbody id="itemInfoDetails" style="width: 1663px;">

																								</tbody>
																							</table>
																						</div>
																					</div>
																				</div>
																				<!--------------------------table End-------------------------->

																			</form>
																		</div>
																	</div>
																</div>
																<!-- general tab ends here -->
																<!-- contact tab starts here -->
																<div id="contactInfo" class="tab-pane fade">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<div class="container">
																				<div class="row">
																					<div class="col-md-6">
																						<form name="contactInfoDetialsForm" method="post"
																							id="contactFormId" enctype="multipart/form-data">

																							<div class="form-group col-md-6">
																								<label for="contactPerson">Contact
																									Person<b style="color: red;">*</b>
																								</label> <input type="text"
																									class="form-control tip-focus"
																									id="contactPerson"
																									placeholder="Enter contact person"
																									title="Please enter the contact person"
																									name="contactPerson">
																							</div>
																							<div class="form-group col-md-6">
																								<label for="designation">Designation</label> <input
																									type="text" class="form-control tip-focus"
																									id="contactDesignation"
																									placeholder="Enter designation"
																									title="Please enter the designation"
																									name="designation">
																							</div>

																							<div class="form-group col-md-6">
																								<label for="phoneOne">Phone-1</label> <input
																									type="tel" class="form-control tip-focus"
																									id="contactPhoneOne"
																									placeholder="Enter first phone no "
																									title="Please enter the first phone no "
																									name="phoneOne" maxlength="10"  onkeypress="return validateNumOnly(event)">
																							</div>

																							<div class="form-group col-md-6">
																								<label for="phoneSecond">Phone-2</label> <input
																									type="tel" class="form-control tip-focus"
																									id="contactPhoneSecond"
																									placeholder="Enter second phone no"
																									title="Please enter the second phone no "
																									name="phoneSecond" maxlength="10"  onkeypress="return validateNumOnly(event)">
																							</div>

																							<div class="form-group col-md-6">
																								<label for="gender">Gender</label> <select
																									class="form-control" id="contactGender">
																									<option value="">--Select Gender--</option>
																									<option value="Male">Male</option>
																									<option value="Female">Female</option>
																								</select>
																							</div>
																							<div class="form-group col-md-6">
																								<label for="dateofbirth">Date Of Birth
																									DOB</label> <input type="text"
																									class="form-control tip-focus"
																									id="contactDateofbirth"
																									placeholder="Enter date of birth"
																									name="contactDateofbirth">
																							</div>

																							<div class="form-group col-md-6">
																								<label for="contactMail">Contact Mail</label> <input
																									type="text" class="form-control tip-focus"
																									id="contactMail"
																									placeholder="Enter contact mail id "
																									title="Please enter the contact mail id "
																									name="contactMail">
																							</div>
																							<div class="form-group col-md-6">
																								<label for="address">Address</label>
																								<textarea type="text"
																									class="form-control tip-focus"
																									id="contatcAddress" placeholder="Enter address"
																									title="Please enter the address" name="address"></textarea>
																							</div>
																							<div class="form-group col-md-6">
																								<button type="button" class="btn btn-primary editUserAccess"
																									onclick="addGeneralInfoRows('ContactInfo')"
																									id="saveContactInfo">Add</button>
																								<button type="button" class="btn btn-primary editUserAccess"
																									id="updateContactInfo" style="display: none;"
																									onclick="updateContactInfoPartyMasterOnGRN()">Update</button>
																								<button id="restContactInfo" class="btn btn-danger" type="reset"
																									onclick="resetGRNInfoFields('contactInfo')">Reset</button>
																							</div>
																							<input type="hidden" id="txtItemPurchaseInfoId"
																								value=0 />
																						</form>
																					</div>
																					<div class="col-md-6">

																						<div>
																							<div	style='width: 100%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;'>
																								<!-- <div id="ContactInfoTable"></div> -->

																								<table
																									class='table table-striped table-bordered header-fixed cf'
																									style='width: 120%; height: 100%;'
																									id="ContactInfoTable">
																									<thead class='cf'>
																										<tr>
																											<th class='col-md-1 center'><div>#</div></th>
																											<th class='col-md-2 center'><div>Contact Person</div></th>
																											<th class='col-md-2 center'><div>Designation</div></th>
																											<th class='col-md-2 center'><div>Address</div></th>
																											<th class='col-md-1 center'><div>Edit</div></th>
																											<th class='col-md-1 center'><div>Delete</div></th>
																										</tr>
																									</thead>
																									<tbody id="PartyContactTableInfoList">

																									</tbody>
																								</table>
																							</div>
																						</div>
																						<!-- <div id="PartyContactTableInfoList"
																							style="visibility: hidden;"></div> -->

																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<!-- contact tab ends here -->
																<!-- address tab starts here -->
																<div id="addressnfo" class="tab-pane fade">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<div class="container">
																				<div class="row">
																					<div class="col-md-6">
																						<form name="itemPurchasedetialsForm" method="post"
																							id="addressFormId" enctype="multipart/form-data">

																							<div class="input-group-text col-md-6">
																								<label for="billingAddress">Billing
																									Address</label> <input type="radio" checked="checked"
																									class="radio" id="billingAddress"
																									name="addressInfo" value="BillingAddress"
																									name="billingAddress"
																									style="padding-top: 10px;">
																							</div>

																							<div class="input-group-text col-md-6">
																								<label for="shippingAddress">Shipping
																									Address</label> <input type="radio" class="radio"
																									id="shippingAddress" value="ShippingAddress"
																									name="addressInfo">
																							</div>

																							<div class="form-group col-md-6">
																								<label for="companyName">Company</label> <input
																									type="text" class="form-control tip-focus"
																									id="companyNameFromAddress"
																									placeholder="Enter company name "
																									title="Please enter the company name "
																									name="companyName">
																							</div>
																							<div class="form-group col-md-6">
																								<label for="areaFromAddress">Area</label> <input
																									type="text" class="form-control tip-focus"
																									id="areaFromAddress" placeholder="Enter area"
																									title="Please enter the area" name="area">
																							</div>

																							<div class="form-group col-md-6">
																								<label for="country">Country</label><input type="hidden" id="hiddenCountryFromAddress" /> <select
																								    class="tip-focus" style="width:100%;"
																									id="countryFromAddress"
																									placeholder="Enter country"
																									title="Please enter the country "
																									data-name="getStateGRN"
																									name="country" onchange="getSelectedCountryName(this.id)">
																									<option value="0">--Select Country--</option>
																										<option value="1">China</option>
																										<option value="2">India</option>
																										<option value="3">Indonesia	</option>
																										<option value="4">Bangladesh</option>
																										<option value="5">Japan</option>
																										<option value="6">Philippines</option>
																										<option value="7">Vietnam</option>
																										<option value="8">Turkey</option>
																										<option value="9">Iran</option>
																										<option value="10">Thailand</option>
																										<option value="11">Myanmar</option>
																										<option value="12">South Korea	</option>
																										<option value="13">Iraq</option>
																										<option value="14">Afghanistan</option>
																										<option value="15">Pakistan</option></select>
																							</div>
																							
																							<div class="form-group col-md-6">
																								<label for="state">State</label> <input type="hidden" id="hiddenStateFromPartyAddress" /><select
																									 style="width:100%;" id="stateFromAddress" onchange="getAllDistrictByStateId(this.id)" data-name="getDistrictOnGRN">
																									<option value="">--Select State--</option>
																								</select>
																							</div>
																							<div class="form-group col-md-6">
																								<label for="District">District</label> <input type="hidden" id="hiddenDistrictFromPartyAddress" /><select
																									style="width:100%;" id="districtFromAddress" onchange="getAllTalukaBydDistictId(this.id)" data-name="getTalukaOnGRN">
																									<option value="">--Select District--</option>

																								</select>
																							</div>
																							<div class="form-group col-md-6">
																								<label for="Taluka">Taluka</label> <input type="hidden" id="hiddenTalukaFromPartyAddress" /><select
																									style="width:100%;" id="talukaFromAddress" onchange="getAllCityByTalukaId(this.id)"  data-name="getCityOnGRN">
																									<option value="">--Select Taluka--</option>
																								</select>
																							</div>
																							<div class="form-group col-md-6">
																								<label for="City">City</label> <input type="hidden" id="hiddenCityFromPartyMaster" /><select
																									style="width:100%;" id="cityFromAddress" onchange="getSelectedCityName(this.id)" data-name="getLocalityOnGRN" >
																									<option value="">--Select City--</option>
																								</select>
																							</div>
																							<div class="form-group col-md-6">
																								<label for="street">Street</label> <input
																									type="text" class="form-control tip-focus"
																									id="streetFromAddress"
																									placeholder="Enter street "
																									title="Please enter the street " name="street">
																							</div>
																							<div class="form-group col-md-6">
																								<label for="pincode">Pincode</label> <input
																									type="text" class="form-control tip-focus"
																									id="pincodeFromAddress"
																									placeholder="Enter pincode "
																									title="Please enter the pincode "
																									maxlength="6"
																									name="pincode" onkeypress="return validateNumOnly(event)">
																							</div>
																							<div class="form-group col-md-6">
																								<label for="address">Address<b
																									style="color: red;">*</b></label>
																								<textarea type="text"
																									class="form-control tip-focus"
																									id="addressFromAddress"
																									placeholder="Enter address "
																									title="Please enter the address "
																									name="address"></textarea>
																							</div>
																							<div class="form-group col-md-6">
																								<button type="button" class="btn btn-primary editUserAccess"
																									onclick="addGeneralInfoRows('AddressInfo')" id="saveAddressInfo">Add</button>
																								<button type="button" class="btn btn-primary editUserAccess"
																									id="updateAddressInfo" style="display: none;"
																									onclick="updateAddressInfoPartyMasterOnGRN()">Update</button>
																								<button  id="restAddressInfo" class="btn btn-danger" type="reset"
																									onclick="resetGRNInfoFields('addressInfo')">Reset</button>
																							</div>
																							<input type="hidden" id="txtItemPurchaseInfoId"
																								value=0 />
																						</form>
																					</div>
																					<div class="col-md-6">
																						<div>
																							<div
																								style='width: 100%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;'>
																								<!-- <div id="AddressInfoTable"></div> -->

																								<table
																									class='table table-striped table-bordered header-fixed cf'
																									style='width: 120%; height: 100%;'
																									id="AddressInfoTable">
																									<thead class='cf'>
																										<tr>
																											<th class='col-md-1 center'><div>#</div></th>
																											<th class='col-md-2 center'><div>Comapny</div></th>
																											<th class='col-md-2 center'><div>Country</div></th>
																											<th class='col-md-2 center'><div>city</div></th>
																											<th class='col-md-1 center'><div>Edit</div></th>
																											<th class='col-md-1 center'><div>Delete</div></th>
																										</tr>
																									</thead>
																									<tbody id="PartyAddressTableInfoList">

																									</tbody>
																								</table>


																							</div>
																						</div>
																						<!-- <div id="PartyAddressTableInfoList"
																							style="visibility: hidden;"></div> -->
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<!-- address tab ends here -->
																<!-- upload tab starts here -->
																<div id="uploadInfo" class="tab-pane fade">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<div class="container">
																				<div class="row">
																				<div class="col-md-12">
																						<form method="post" id="documentForm" name="documentForm" enctype="multipart/form-data">
																							<div class="form-group col-md-4">
																								<label for="file">Upload Document<b
																									style="color: red;">*</b></label>
																									<input type="file" id="uploadGrnDocument" name="uploadGrnDocs" />
																							</div>
																							<div class="form-group col-md-4">
																								<label for="file">Comment<b></b></label>
																								<textarea id="uploadGrnComment"></textarea>
																							</div>
																							<div class="form-group col-md-4" style="display: none;" id="grnDocumentUploadDivId">
																								<button type="button" value="Upload Document"  class="btn btn-primary editUserAccess"
																									onclick="uploadGoodReceiptNoteDocuments(0,'UPDOCBTN')">Upload Document</button>
																							</div>
																							<input type="hidden" id="grnDocSlaveId"
																								value=0 />
																						</form>
																					</div>
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
																									id="uploadedDocumentGrnBody"></tbody>
																							</table>
																						</div>
																					</div>
																				</div>
																				<div class="row">
																				<div class="modal fade bs-example-modal-lg" id="viewGrnDocModal" tabindex="-1" role="dialog"  aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
																									<iframe id="viewDocumentGrn" width="100%" height="300px"></iframe>
																								</div>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																
																<!-- upload tab ends here -->
																
																<!--  maintenance Asset tab start here -->
																<div id="maintenanceInfo" class="tab-pane fade">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<div class="container">
																				<div class="row">
																					<div class="form-group col-md-6 pull-left" id='hideAddBatchButton'>
																						<button type="button"
																							onclick="removeRowFromAssetTable('maintenanceTableInfo','chkBatchItem')"
																							style="margin: 7px;"
																							id='btnRemoveAssets'
																							class="btn btn-primary btn-danger">-</button>
																					</div>
																					<div class="col-md-12">
																						<div style="height: 150px;">
																							<div
																								style='width: 100%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;'>
																								<!-- <div id="AddressInfoTable"></div> -->

																								<table class='table table-striped table-bordered header-fixed cf' id="maintenanceTableInfo">
																									<thead class='cf' style='background: white;'>
																										<tr>
																											<th class='col-md-1 center'>#</th>
																											<th class='col-md-2 center'><div>Serial No</div></th>
																											<th class='col-md-2 center'><div>Item Name</div></th>
																											<th style='display: none;' class='col-md-2 center'><div>Purchase Date</div></th>
																											<th style='display: none;' class='col-md-2 center'><div>Purchase Date</div></th>
																											<th style='display: none;' class='col-md-2 center'><div>Purchase Date</div></th>
																											<th style='display: none;' class='col-md-2 center'><div>Purchase Date</div></th>
																											<th style='display: none;' class='col-md-2 center'><div>Purchase Date</div></th>
																											<th style='display: none;' class='col-md-2 center'><div>Purchase Date</div></th>
																											<th style='display: none;' class='col-md-2 center'><div>Purchase Date</div></th>
																											<th style='display: none;' class='col-md-2 center'><div>Purchase Date</div></th>
																											<th style='display: none;' class='col-md-2 center'><div>Purchase Date</div></th>
																											<th style='display: none;' class='col-md-2 center'><div>Purchase Date</div></th>
																											<th style='display: none;' class='col-md-2 center'><div>Purchase Date</div></th>
																											<th style='display: none;' class='col-md-2 center'><div>Purchase Date</div></th>
																										</tr>
																									</thead>
																									<tbody id="maintenanceTableInfoList">
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
																<!-- maintenance Asset tab ends here -->
																
																
																<!--  Batch Info tab start here -->
																<div id="batchInfo" class="tab-pane fade">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<div class="container">
																				<div class="row">
																					<div class="col-md-12">
																						<div style="height: 150px; margin-left: 2%;">
																							<div
																								style='width: 100%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;'>

																								<table
																									class='table table-striped table-bordered header-fixed cf'
																									style='width: 120%; height: 100%;'
																									id="DocUploadInfoTable">
																									<thead class='cf' style='background: white;'>
																										<tr>
																											<th style='height: 21.5px;'
																												class='col-md-1 center'><div>#</div></th>
																											<th style='height: 21.5px;'
																												class='col-md-2 center'><div>Document</div></th>
																											<th style='height: 21.5px;'
																												class='col-md-2 center'><div>Note</div></th>
																											<th style='height: 21.5px;'
																												class='col-md-1 center'><div>View</div></th>
																											<th style='height: 21.5px;'
																												class='col-md-1 center'><div>Delete</div></th>
																										</tr>
																									</thead>
																									<tbody id="grnDocumentUploadTableInfoList">

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
																<!-- upload tab ends here -->
																<div id="goodReceiptNoteModalId" class="modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog">
																	<div class="modal-dialog" role="document">
																		<div class="modal-content">
																			<div class="modal-header">
																				<h5 class="modal-title">Party Master Details</h5>
																			</div>
																			<div class="modal-body"
																				style="width: 100%;">
																				<div class="col-md-12" id="purchaseQuote">
																					<div class="col-md-6">
																					 <p style="color: blue;">Party Address Details</p>
																						<table id="partymasterSlaveTableId"
																							cellpadding="0" cellspacing="0" border="0"
																							class="datatable table table-striped table-bordered">
																							<thead id="ehatTHead">
																								<tr>
																									<th class="col-md-1 center">#</th>
																									<th class="col-md-1 center">Select</th>
																									<th class="col-md-1 center">State Name</th>
																									<th class="col-md-1 center">Address</th>
																								</tr>
																							</thead>
																							<tbody id="partyMasterAddressSlaveRecordList">
																							</tbody>
																						</table>
																					</div>
																					<div class="col-md-6">
																					<p style="color: blue;">Party Contact Details</p>
																						<table id="partymasterSlaveTableId1"
																							cellpadding="0" cellspacing="0" border="0"
																							class="datatable table table-striped table-bordered">
																							<thead id="ehatTHead">
																								<tr>
																									<th class="col-md-1 center">#</th>
																									<th class="col-md-1 center">Select</th>
																									<th class="col-md-1 center">Contact Number</th>
																								</tr>
																							</thead>
																							<tbody id="partyMasterContactSlaveRecordList">
																							</tbody>
																						</table>
																					</div>
																				</div>
																				<div class="modal-body"></div>
																				<div class="modal-footer">
																					<button type="button" class="btn btn-primary editUserAccess" onclick="setPartyModalInfoToTableOnGRN();removeDuplicateStatesGRN();">Save Changes</button>
																					<button type="button" class="btn btn-secondary" onclick="closepartyMasterDetailsModal()">Close</button>
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

										<!-- /**** ** modal for Charges Tax on all items Author :sudhir
										Date:13jully2016 *******/ -->
										<div id="purchaseOrderModalId" class="modal fade in"
											tabindex="-1">
											<div class="modal-dialog">
												<div class="modal-content col-md-12"
													style="margin-top: 50px; margin-left: 140px;">
													<div class="modal-header">
														<div class="box-title"
															style="margin-right: 0%; margin-left: 0%; margin-top: 0px; text-align: left;">
															<h4>
																<i class="fa fa-calendar"></i>Apply Charges
															</h4>
														</div>
													</div>
													<div class="modal-body">
														<table id="" cellpadding="0" cellspacing="0" border="1"
															style="width: 100%"
															class="table table-bordered table-striped table-condensed">
															<thead>
																<tr>
																	<th><label class="TextFont">Select Charges
																			<b style="color: red;"></b>
																	</label></th>
																	<th><label class="TextFont">Add Charges<b
																			style="color: red;">*</b></label></th>
																</tr>
															</thead>
															<tbody id="">
																<tr>

																	<td style="">
																		<div class="form-group  col-md-7-1" id=""
																			style="margin-right: 0%; margin-left: 0%; margin-top: 0px; text-align: left;">
																			<select class="form-control input-SmallText"
																				id="chargesList"
																				style="width: 160px; margin-left: 0px;">
																				<option value="0">Select</option>
																			</select>
																		</div> <input type="text" id="txtempAmt" name="txtexamunt"
																		placeholder="Amount"
																		class=" col-md-8-1 form-control input-SmallText"
																		autocomplete="off" style="margin-top: 2px;"
																		onkeyup="examunt(this.id)" /> <input type="text"
																		id="txtexGstper" name="txtexGstper"
																		placeholder="GST %"
																		class=" col-md-8-1 form-control input-SmallText"
																		style="margin-top: 2px;" onkeyup="gstamt(this.id)"
																		onchange="gstamt(this.id)" /> <input type="text"
																		id="txtexGstamt" name="txtexGstamt"
																		placeholder="GST Amt"
																		class=" col-md-8-1 form-control input-SmallText"
																		style="margin-top: 2px;" value='0' /> <input
																		type="text" id="txtChargesAmt" name="txtChargesAmt"
																		placeholder="FinalAmount"
																		class=" col-md-8-1 form-control input-SmallText"
																		autocomplete="off" style="margin-top: 2px;" />
																	</td>

																	<td>
																		<div class="form-group  col-md-4-1"
																			style="margin-right: 1%; margin-left: 5%; margin-top: 0px;">
																			<img width="18" height="18" src="images/plus.jpg"
																				onclick="addItemCharges()" style="margin-top: 0px;">
																			<img width="18" height="18" src="images/minus.jpg"
																				onclick="removeItemCharges()"
																				style="margin-top: 0px;">
																		</div> <select
																		style='height: 160px; margin-top: 2px; width: 100%;'
																		class="col-md-12-1" name="selectChargesbox"
																		multiple="multiple" id='lstBoxforCharges'>
																	</select> <!-- <input type="hidden" id="hiddenCount" value="0"/> -->
																	</td>
																</tr>
															</tbody>
														</table>
														<div class="modal-footer" style="margin-left: -150px;">
															<div class="form-group col-md-9-1">
																<button type="button" class="btn btn-primary editUserAccess"
																	onclick="applyServiceChargesItem()">Apply</button>
																<button type="button" class="btn btn-default"
																	onclick="hideApplyChargespopaup()" id="closeBtn">Cancel</button>


															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div id="batchModel" class="modal fade in" style="height: 500px;" data-backdrop="static" data-keyboard="false">
											<div class="modal-dialog">
												<form action="" enctype="multipart/form-data">
													<div class="modal-content start" class="col-md-12">
														<div class="modal-header">
															<div class="modal-title">
																<h4>
																	Batch Wise Item Info
																</h4>
															</div>
														</div>

														<div class="modal-body" style="overflow: auto;">
															<div class="col-md-12-1">
																<div class="col-md-2-1"></div>
															</div>

															<div class="col-md-12-1">
																<table id="ItemInfoTable" border="1"
																	class="table table-bordered table-striped table-condensed table-responsive">
																	<thead>
																		<tr>
																			<th class='col-md-1-1 center'><div
																					class='TextFont'>select Product</div></th>
																			<th class='col-md-3-1 center'><div
																					class='TextFont'>Item Name</div></th>
																			<th class='col-md-3-1 center'><div
																					class='TextFont'>Qty</div></th>
																			<th class='col-md-3-1 center'><div
																					class='TextFont'>Batch Code</div></th>
																			<th class=' col-md-3-1 center'><div class='TextFont'>Expiry</div></th>
																		</tr>
																	</thead>

																	<tbody id="batchData">
																	</tbody>
																</table>
																<div class="modal-footer">
															<div class="form-group col-md-7-1">
																<button type="button" class="btn btn-primary editUserAccess"
																	id="btnSubContractingMaterialIssueSave"
																	name="btnSubContractingMaterialIssueSave"
																	onclick="setModalInfoToTableOnBatch()">Ok</button>
																<button type="button" class="btn btn-default"
																	onclick="closeItemBatchDetailsModal()">Cancel</button>
															</div>
														</div>
															</div>
															<!-- /BOX-->
														</div>
														<!-- /BODY-->
														
													</div>
												</form>
											</div>
										</div>
										<div id="batchWiseGoodReceiptNoteModal" class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
				                           <div class="modal-dialog" role="document" style="width: 50%;">
				                              <div class="modal-content">
				                                 <div class="modal-header">
				                                    <h5 class="modal-title">Item Batch Wise Details 
				                                    <div class="pull-right" style="margin-right: 15px;">
				                                       <button type="button" class="btn btn-primary"
				                                          onclick="setBatchInfoModalInfoToTableOnGoodReceiptNote()">Get Details</button>
				                                       <button type="button" class="btn btn-secondary"
				                                          onclick="closeGoodReceiptNoteBatchModal()">Close</button>
				                                    </div>
				                                    </h5>
				                                   
				                                 </div>
				                                 <div class="modal-body">
				                                    <div class="form-group col-md-4">
				                                       <label for="parent">Issue Quantity<b
				                                          style="color: red;">*</b></label> <input type="text"
				                                          class="form-control tip-focus"
				                                          id="issueQuantityGRN"
				                                          onkeypress="return validateNumOnly(event)"
				                                          placeholder="Enter Issue Quantity">
				                                    </div>
				                                    <div class="form-group col-md-4">
				                                       <label for="parent">Pending Quantity<b
				                                          style="color: red;">*</b></label> <input type="text"
				                                          class="form-control tip-focus"
				                                          id="pendingQuantityGRN" readonly="readonly"
				                                          placeholder="Enter Issue Pending">
				                                    </div>
				                                    <div class="form-group col-md-4" style="display: none">
				                                       <label for="parent">Requested Quantity<b
				                                          style="color: red;">*</b></label> <input type="text"
				                                          class="form-control tip-focus"
				                                          id="requestedQuantityGRN" readonly="readonly"
				                                          placeholder="Received Quantity">
				                                    </div>
				                                    <input type="hidden" id="totalPendingQtyIdIssueGrn" />
                                                    <input type="hidden" id="finalTotalPendingQtyIdIssueGrn" />
				                                    <table id="batchWiseGoodReceiptNoteTableId" cellpadding="0"
				                                       cellspacing="0" border="0"
				                                       class="table table-striped table-bordered">
				                                       <thead id="ehatTHead">
				                                          <tr>
				                                             <th class="col-md-1 center">#</th>
				                                             <th class="col-md-1 center">Item Name</th>
				                                             <th class="col-md-1 center" style="display: none">Item ID</th>
				                                             <th class="col-md-1 center">Item Batch Code</th>
				                                             <th class="col-md-1 center">Item Batch Exp Date</th>
				                                             <th class="col-md-1 center">Main Inventory Stock</th>
				                                          </tr>
				                                       </thead>
				                                       <tbody id="batchWiseGoodReceiptNoteTbody">
				                                       </tbody>
				                                    </table>
				                                 </div>
				                              </div>
				                           </div>
				                        </div>

										<!-- new modal starts here -->
										<div id="purchaseOrderModalId" class="modal fade"
											tabindex="-1" role="dialog">
											<div class="modal-dialog" role="document">
												<div class="modal-content">
													<div class="modal-header">
														<h5 class="modal-title">Service Charges</h5>
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
																	<th class="col-md-1 center">Unit Cost</th>
																	<th class="col-md-1 center">Fact 1</th>
																	<th class="col-md-1 center">Fact 2</th>
																	<th class="col-md-1 center">Fact 3</th>
																	<th class="col-md-1 center">Fact 4</th>
																	<th class="col-md-1 center">Edit</th>
																	<th class="col-md-1 center">Delete</th>
																</tr>
															</thead>
															<tbody id="itemPurchaseMasterRecordList">
															</tbody>
														</table>
													</div>
													<div class="modal-footer">
														<button type="button" class="btn btn-primary editUserAccess">Save
															changes</button>
														<button type="button" class="btn btn-secondary"
															data-dismiss="modal">Close</button>
													</div>
												</div>
											</div>
										</div>

										<!-- new modal starts here -->
										<div id="selectPurchaseOrderModalId" class="modal"
											tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
											<div class="modal-dialog" role="document">
												<div class="modal-content">
													<div class="modal-header">
														<h5 class="modal-title">Item Master Details</h5>
													</div>
													<div class="modal-body">
														<table id="itemMasterSlaveTableId" cellpadding="0"
															cellspacing="0" border="0"
															class="datatable table table-striped table-bordered">
															<thead id="ehatTHead">
																<tr>
																	<th class="col-md-1 center">#</th>
																	<th class="col-md-3 center">Item Name</th>
																	<th class="col-md-2 center" style="display: none;">Item Quantity</th>
																	<th class="col-md-2 center">Unit Price</th>
																	<th class="col-md-2 center">CGST Rate</th>
																	<th class="col-md-2 center">SGST Rate</th>
																	<th class="col-md-3 center">Tax Name</th>
																	<th class="col-md-2 center">Tax Rate</th>
																	<th class="col-md-2 center">Fact 1</th>
																	<th class="col-md-2 center">Fact 2</th>
																	<th class="col-md-2 center">Fact 3</th>
																	<th class="col-md-2 center">Fact 4</th>


																</tr>
															</thead>
															<tbody id="itemMasterSlaveRecordList">
															</tbody>
														</table>
													</div>
													<div class="modal-footer">
														<input type="hidden" id="hiddenRadioButtonIndex" />
														<button type="button" class="btn btn-primary editUserAccess"
															onclick="setModalInfoToTableOnGoodReceiptNote()">Save
															changes</button>
														<button type="button" class="btn btn-primary btn-danger"
															onclick="closeItemPurchaseDetailsModal('Model')">Close</button>
													</div>
												</div>
											</div>
										</div>
										<!-- new modal ends here -->

										<!-- new modal ends here -->
										<div class="row" style="padding: 10px;">
											<div class="col-md-12">
												<div class="container">
													<div class="col-sm-2">
														<div class="panel panel-primary">
															<div class="panel-body">
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Remark</label>
																		<div class="col-lg-8">
																			<textarea class="form-control" name="txtGRNArermark"
																				id="txtGRNArermark" type="text" rows="5"></textarea>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="col-sm-2">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Less
															</div>
															<div class="panel-body">
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Spec. Dis</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtSplDisc"
																				id="txtSplDisc" type="text"
																				value="0"
																				onblur="isFloatingPoint('txtSplDisc'),calculatSpeDisct();">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Debit Amt.</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtdebitAmt1"
																				id="txtdebitAmt1" value="0"
																				onblur="isFloatingPoint('txtdebitAmt1'),calculateTotalLess();"
																				type="text">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">CD %</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtCD1" id="txtCD1"
																				onblur="isFloatingPoint('txtCD1'),calculateCDAmt();"
																				value="0" type="text">
																		</div>
																		<label for="name" class="col-lg-4"></label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtCDAmt"
																				id="txtCDAmt" readonly="true"
																				onclick="calculateTotalLess(this.value);" value="0"
																				type="text">
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="col-sm-2">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Add
															</div>
															<div class="panel-body">
																<div>
																	<div class="row" style="display: none;">
																		<div class="form-group">
																			<label for="name" class="col-lg-4">Octroi</label>
																			<div class="col-lg-8">
																				<input class="form-control" name="txtOctroi"
																					id="txtOctroi" value="0"
																					onblur="isFloatingPoint('txtOctroi'),calculateTotalAdd();"
																					type="text">
																			</div>
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Surcharge</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtSurcharge"
																				id="txtSurcharge"
																				onblur="isFloatingPoint('txtSurcharge'),calculateTotalAdd();"
																				value="0" type="text">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Credit Amt.</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="name"
																				id="txtCreditAmt"
																				onblur="isFloatingPoint('txtCreditAmt'),calculateTotalAdd();"
																				value="0" type="text">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Freight</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtFreight"
																				id="txtFreight"
																				onblur="isFloatingPoint('txtFreight'),calculateTotalAdd();"
																				value="0" type="text">
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="col-sm-2">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Tax
																Info.</div>
															<div class="panel-body">
																<div>
																	<div class="row">
																		<div class="form-group">
																			<label for="name" class="col-lg-4">GST</label>
																			<div class="col-lg-8">
																				<input class="form-control" name="txtVat"
																					id="txtVat" disabled="disabled" "
																					value="0" type="text">
																			</div>
																		</div>
																	</div>
																</div>
																
																	<div>
																	<div class="row">
																		<div class="form-group">
																			<label for="name" class="col-lg-4">IGST</label>
																			<div class="col-lg-8">
																				<input class="form-control" name="txtVat"
																					id="txtigstVat" disabled="disabled" "
																					value="0" type="text">
																			</div>
																		</div>
																	</div>
																</div>
																
																<div class="row" style="display: none;">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">LBT</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtlbt" id="txtlbt"
																				onblur="isFloatingPoint('txtlbt'),calculateTotalTax(this.value);"
																				value="0" type="text">
																		</div>
																	</div>
																</div>
																<div class="row" style="display: none;">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">CST</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtcst" id="txtcst"
																				onblur="isFloatingPoint('txtcst'),calculateTotalTax(this.value);"
																				value="0" type="text">
																		</div>
																	</div>
																</div>
																<div class="row" style="display: none;">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Ex Vat</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtExVat"
																				id="txtExVat"
																				onblur="calculateTotalTax(this.value);" value="0"
																				type="text">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Total Tax</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtTotalVat"
																				id="txtTotalVat" value="0.00" disabled="disabled" "
																				type="text" />
																		</div>
																	</div>
																</div>
																
																<div class="row" style="display:none">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Total GST AMount</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtTotalVat"
																				id="totalGstAmt" value="0.00" disabled="disabled" "
																				type="text" />
																		</div>
																	</div>
																</div>
																
																
																<div class="row" style="display:none">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Total IGST AMount</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtTotalVat"
																				id="totaliGstAmt" value="0.00" disabled="disabled" "
																				type="text" />
																		</div>
																	</div>
																</div>
																
																
																
															</div>
														</div>
													</div>
													
													<div class="col-sm-2">
													   <div class="panel panel-primary">
													     <div class="panel-body">
															<div class="row">
															  <div class="form-group">
															    <label for="name" class="col-lg-4">Net Amount</label> 
															      <div class="col-lg-8">
															         <button type="button" class="btn btn-primary" onclick="setRoundNetAmount()">Rount Off</button>
															      </div>
															      
															  </div>
															</div>
															<div class="row">
															   <div class="form-group">
															   		<label for="name" class="col-lg-4">Charges</label> 
															  		<div class="col-lg-8">
															   			<button type="button" class="btn btn-info" onclick="showServiceCharges()" type="button" value="Extra Charges"
																				data-target="#purchaseOrderModalId">Extra Charge</button>
															  		</div>
															 	</div>
															</div>
															<div class="row">
																<div class="form-group">
																	<label for="name" class="col-lg-4">Select Charges</label>
																	<div class="col-lg-8">
																		<select class="form-control input-SmallText" id="selboxChargeswithAmtList" onchange="getPurchaseOrderlist(this.value)">
																			<option value="0">-Select-</option>
																		</select>
																	</div>
																</div>
															</div>
															<div class="row">
																<div class="form-group">
																	<label for="name" class="col-lg-4">Input</label>
																	<div class="col-lg-8">
																		<input type="text" id="sumofCharges" class="form-control input-SmallText col-md-5" readOnly value='0' />
																	</div>
																</div>
															</div>
													     </div>
													   </div>
													 </div>
													
													<div class="col-sm-2">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Total
															</div>
															<div class="panel-body">
																<div style="display:none;">
																	<div class="row">
																	
																		<div class="form-group" >
																			<label for="name" class="col-lg-4">Total
																				Amount</label>
																			<div class="col-lg-8">
																				<input class="form-control" name="txtGross"
																					id="itemTotalAmt" disabled="disabled" 
																					maxlength="10" value="0.0" type="text">
																			</div>
																		</div>
																	</div>
																</div>
																	<div class="row">
																	
																		<div class="form-group">
																			<label for="name" class="col-lg-4">Gross
																				Amount</label>
																			<div class="col-lg-8">
																				<input class="form-control" name="txtGross"
																					id="txtGross" disabled="disabled" 
																					maxlength="10" value="0" type="text">
																			</div>
																		</div>
																	</div>
																
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Less</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtLess"
																				id="txtLess" value="0" required="true"
																				maxlength="10"  disabled="disabled" type="text">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Add</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtAdd" id="txtAdd"
																				value="0" maxlength="10" required="true"
																				disabled="disabled" type="text">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Taxes</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="textVat"
																				id="grossTaxesId" value="0" maxlength="10"
																				 disabled="disabled" readonly="true" type="text">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Net Amount</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtNetAmt"
																				id="txtNetAmt" value="0" maxlength="10"
																				 disabled="disabled" readonly="true" type="text">
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
							<!-- modal ends here -->

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
								<div>
										<ul class="nav nav-tabs">
											<li class="active"><a data-toggle="tab"
												href="#ProcessdQuotation" id="processdQuotation"
												onclick="getAllGoodReceiptNote('all');"><span
													class="hidden-inline-mobile"> Closed GRN</span></a></li>
											<li><a data-toggle="tab" href="#ProcessdQuotation"
												id="ExpiredQuotation"
												onclick="getAllGoodReceiptNote('DRAFT');"><span
													class="hidden-inline-mobile"> Draft GRN</span></a></li>
											<li><a data-toggle="tab" href="#PendingGoodReceiptNote"
												id="PendingGRN"
												onclick="getAllGoodReceiptNote('PENDING');"><span
													class="hidden-inline-mobile"> Pending GRN</span></a></li>
										</ul>
									</div>
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
																<div class="panel panel-primary" style="margin-top: 20px;overflow: auto;">
																	<div class="panel-heading" id="divEhatContent">Good
																		Receipt Note</div>
																	<div class="panel-body" id="grnMasterInfo"
																		style="height: 300px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th>Sr</th>
																					<th>GRN Id</th>
																					<th>Vendor Name</th>
																					<th>GRN Date</th>
																					<th id="goodRecepitEdit">Edit</th>
																					<th>View</th>
																					<th id="goodRecepitPrint">Print</th>
																				</tr>
																			</thead>
																			<tbody id="goodReceiptNoteList">
																			</tbody>
																		</table>
																	</div>
																	<!--For Draft  -->
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
		<%@include file="inv_footer.jsp"%>
		<!-- /JAVASCRIPTS -->

		
		

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

				$("#content").off('click', "#goodReceiptNote");
				$("#content").on('click', "#goodReceiptNote", function(){
				
					resetGRNInfoFields('GRN');
					getNextGRNId();
					getGoodReceiptNoteSeries();
					getGRNSeries(($('#seriesId').val()));
					getPendingPurchaseOrder();
					//getPandingPurchaseReOrder();
					removeDisabledAllGrnComplete();
					addNewRowInTable('grnItemInfoTable','GRN');
					//getAllStateMaster();
					$("#countryFromAddress").select2();
					$("#stateFromAddress").select2();
					$("#districtFromAddress").select2();
					$("#talukaFromAddress").select2();
					$("#cityFromAddress").select2();
				});
				
				new JsDatePick({
					useMode : 2,
					target : "contactDateofbirth",
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					dateFormat : "%Y-%m-%d",
					imgPath : "../img/",
					weekStartDay : 1,
				});
				
				new JsDatePick({
					useMode : 2,
					target : "grnDeliveryDate",
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					dateFormat : "%Y-%m-%d",
					imgPath : "../img/",
					weekStartDay : 1,
				});

				new JsDatePick({
					useMode : 2,
					target : "grnDate",
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					dateFormat : "%Y-%m-%d",
					imgPath : "../img/",
					weekStartDay : 1,
				});

			});
			onload = function() {
				//getAllStateMaster();
				getAllGoodReceiptNote("all");
				$("#countryFromAddress").select2();
				$("#stateFromAddress").select2();
				$("#districtFromAddress").select2();
				$("#talukaFromAddress").select2();
				$("#cityFromAddress").select2();
				getAllStateMaster();
			}
		</script>
		<input type="hidden" id="grnDocumentList" value="">
		<input type="hidden" id="grnId" value="0">
		<input type="hidden" id="grnItemId" value="0">
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="totaltblsize" value="0">
		<input type="hidden" id="RowCount" value="0">
		<input type="hidden" id="hiddenItemIndex" value="0">
		<input type="hidden" id="hiddenVenderState" value="0">
		<input type="hidden" id="partyGstNo" value="0">
		<input type="hidden" id="callFrom" value="all">
		<input type="hidden" id="grnCallType"/>
		<input type="hidden" id="grnItemCurrentRowIndexId" value='0'/>
		<input type="hidden" id="userState"
			value="<%=session.getAttribute("userState")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<script type="text/javascript" src="js/ehat_inventory.js"></script>
	<script type="text/javascript" src="js/ehat_inv_pagination.js"></script>
	<script type="text/javascript" src="js/inv_good_receipt_note.js"></script>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	
</body>
</html>
