<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Purchase Expense</title>
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
	<script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
	<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></link>

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
<!-- include js for development of po -->
<script type="text/javascript" src="js/ehat_inv_purchase_order.js"></script>
<!-- include js for development of purchase expense -->
<script type="text/javascript" src="js/ehat_inv_purchase_expense.js"></script>

<!-- bootstrap datepicker -->
<link rel="stylesheet" href="ehat-design/datepicker/datepicker3.css">
<link rel="stylesheet" type="text/css"
	href="css/inventoryDatepicker/css/jsDatePick_ltr.css" />
<style>
/* .panel-default {
	border-color: #a8bc7b;
}

table,th {
	text-align: center;
}
label {
    float: left
}
span {
    display: block;
    overflow: hidden;
    padding: 0 4px 0 6px
}
input {
    width: 100%
} */
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
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
					"dd-MM-yyyy");
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
												href="inv_purchase_order_master.jsp">Purchase Expense</a></li>
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
										<div class="input-group" id="searchPurchaseOrderDivId">
											<input type="search"
												class="typeahead form-control input-SmallText"
												id="searchPurchaseOrderId" onkeyup="fetchPurchaseOrderDetails(this.id)" />
											<span class="input-group-btn">
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
											data-toggle="modal" data-target="#purchaseOrderModuleModal">
											<i class="fa fa-plus"></i> Add New Order
										</button>
									</div>
								</div>
							</div>

							<!-- modal starts here -->
							<div class="modal fade" id="purchaseOrderModuleModal" tabindex="-1"
								role="dialog" aria-labelledby="purchaseOrderModuleModal"
								aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">Other Expense Bill</h5>
										<div class="row">
								         <div class="pull-right" style="margin-right: 15px;">
								         <button type="button" class="btn btn-primary" onclick="savePurchaseExpense()">Save</button>
								         <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
										</div>
										</div>
										</div>
										<div class="modal-body">
										<input type="hidden" id="purchaseExpenseId" value="0" />
										<input type="hidden" id="hiddenRadioButtonIndex"/>
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Purchase Expense 
																</div>
															<div class="panel-body">
																<form id="financialFormId" onsubmit="return false">
																	<div class="form-row">
																	<div class="form-group col-md-2">
																			<label for="QuatationDate">Expense Date<b
																				style="color: red;">*</b></label> 
																				<input id="expenseDateId" class="form-control input-SmallText"	
																				type="text"	
																				 name="expenseDate" placeholder="Date"
																			value="">
																		</div>
																		<div class="form-group col-md-2">
																			<label for="QuatationDate">Bill Date<b
																				style="color: red;">*</b></label> 
																				<input id="billDateId" class="form-control input-SmallText"	
																				type="text"	
																				 name="billDate" placeholder="Date"
																			value="">
																		</div>
																		<div class="form-group col-md-2" id="searchSupplierNameExpenseDivId">
																		<input type="hidden" id="hiddenSupplierNameId" />
																		<input type="hidden" id="hiddenPartyMasterId" />
																		<input type='hidden' value='0' id='rowCountId' /> 
																		<input type='hidden' value='0' id='totaltblsize' />
																		<input type="hidden" value="0" id="hosState" />
																			<label for="parent">Party Name<b style="color: red;">*</b></label> 
																			<input type="text"	class="form-control tip-focus"	id="supplierNameId" 
																			    onkeyup="setAutoSupplierName(this.id)"
																				placeholder="Enter Supplier name " title="Please enter Party name"
																				name="supplier" data-name="purchaseExpenseSupplierName">
																		</div>
																		<div class="form-group col-md-2">
																		<label for="partyName">Mobile No<b
																			style="color: red;">*</b></label> 
																		<input type="text"	class="form-control tip-focus" id="supplierMobileNoId" 
																		placeholder="Enter Mobile No"
																		title="Please Enter Mobile No" name="supplierMobileNo">
																		</div>
																		
																		<div class="form-group col-md-2">
																			<label for="type">Party State<b style="color: red;">*</b></label>
																			<input type="hidden" id="hiddenSupplierState"/>
																			
																			<select class="form-control" id="supplierStateId" onchange="hideAndShowGstIgst()">
																				<option value="0">--Select Status--</option>
																			</select>
																			
																			<!-- <input id="supplierStateId" class="form-control input-SmallText"	
																			 type="text" 
																			 readonly="readonly" name="supplierState" placeholder="state"
																			value=""> -->
																		</div>
																		<div class="form-group col-md-2">
																			<label for="reference bill no">Reference  Bill No<b
																			style="color: red;">*</b></label> 
																		<input type="text"	class="form-control tip-focus" id="referenceNoId" placeholder="Enter Reference No"
																			title="Please enter  Reference No" name="referenceNo">
																		</div>
																		<div class="form-group col-md-2">
																			<label for="sAddress">Party Address</label> 
																			<textarea type="text" class="form-control" required="true"	
																			id="supplierAddressId" placeholder="Address"></textarea>
																		</div>
																		<div class="form-group col-md-2">
																			<label for="challan number">Challan No<b
																			style="color: red;">*</b></label> 
																		<input type="text"	class="form-control tip-focus" id="challanNoId" placeholder="Enter Challan No"
																			title="Please enter  Reference No" name="challanNo">
																		</div>
																	</div>
																</form>
															</div>
														</div>
														<div class="container" style="margin-top: 2%;">
															<ul class="nav nav-tabs">
																<li class="active"><a data-toggle="tab"
																	href="#generalInfo">Item Info(F2)</a></li>
															</ul>
															<div class="tab-content">
																<!-- general tab starts here -->
																<div id="generalInfo" class="tab-pane fade in active">
																	<div class="panel panel-primary" style="margin-top: 20px; height: 320px ">
																		<div class="panel-body">
																			<form>
																				<div class="row">
																					<div class="col-md-6">
																						<div class="form-group col-md-6">
																							<label for="itemQuantity">Total Item Quantity <b style="color: red;">*</b></label> 
																							<input type="text"	class="form-control tip-focus"	id="totalItemQuantityId"
																								placeholder="Total Item Quantity" title="Total Item Quantity" value="0"
																								name="Total Item Quantity">
																						</div>
																						<div class="form-row">
																							<div class="form-group col-md-6">
																								<label for="landLineNo">Total Item Discount	</label> 
																								<input	type="text" class="form-control tip-focus"	id="totalItemDiscountId"
																									placeholder="Total Item Discount"	title="Total Item Discount"  value="0"
																									name="Total Item Discount">
																							</div>
																						</div>	
																						<div class="form-row">
																						<div class="form-group col-md-6">
																								<label for="landLineNo">Purchase Quotation No </label> 
																								<input	type="text" class="form-control tip-focus"	id="purchaseQuotationNumberId"
																									placeholder="Purchase Quotation No "	title="Purchase Quotation No "  value="0"
																									name="Purchase Quotation No ">
																							</div>
																						</div>																																									
																					</div>
																					<div class="col-md-6">
																						<div class="form-group col-md-6">																																									
																							<button onclick="addNewRowInTablePurchaseExpense('ItemInfoTablePO','purchaseexpense')" class="btn btn-xs btn-success" type='button' id="btnAddNew" value="+" >+</button>
																							<button type="button" onclick="removeRowFromTablePurchaseExpense('ItemInfoTablePO','chkMrnItem')" style="margin: 7px;" class="btn btn-xs btn-success"	value="_">-</button>
																						
																						</div>																					

																					</div>
																				</div>
																				
																<!--------------------------table Start-------------------------->
																				<div class="row">
																							<div class="form-row">
																							<div style="height: 100px; margin-left: 2%;" >
																								<div style='width: 98%; padding: 1%; font-weight: normal; 
																								height:190px;overflow-y: scroll; border: 1px solid #436a9d;' >
																									<table  id = "ItemInfoTablePO" 
																									class="table table-bordered table-striped table-condensed">
																									<thead class='cf' style='background: white;'>
																									<tr><th style='height: 21.5px;' class='col-md-1 center'><div>Select</div></th>
																									<th class='col-md-2 center'><div>Sr.No</div></th>
																									<th class='col-md-2 center' style="display:none"><div>Item Slave Id</div></th>
																									<th class='col-md-2 center'><div>Item Name</div></th>
																									<th class='col-md-2 center'><div>Item Quantity</div></th>
																									<th class='col-md-2 center' style="display:none"><div>Item Id</div></th>
																									<th class='col-md-2 center'><div>Unit Price </div></th>
																									<th class='col-md-2 center'><div>Disc(%) </div></th>
																									<th class='col-md-2 center'><div>Disc(Rs) </div></th>
																									<th class='col-md-2 center'><div>Disc(Amt) </div></th>
																									<th class='col-md-2 center'><div>Base Amount</div></th>
																									<th class='col-md-2 center'><div>GST </div></th>
																									<th class='col-md-2 center'><div>IGST</div></th>
																									<th class='col-md-2 center'><div>GST Amt(Rs) </div></th>
																									<th class='col-md-2 center'><div>Total Amount</div></th>
																									<th class='col-md-2 center'><div>Factor 1</div></th>
																									<th class='col-md-2 center'><div>Factor 2</div></th>
																									<th class='col-md-2 center'><div>Factor 3</div></th>
																									<th class='col-md-2 center'><div>Factor 4</div></th>
																									<th class='col-md-2 center'><div>Ordered Qty</div></th>
																									<th class='col-md-2 center'><div>Pending Qty</div></th>
																									<th class='col-md-2 center'><div>Batch No</div></th>
																									</tr>
																									</thead>
																																																	
																									<tbody id="itemInfoDetails">
																									
																									</tbody>
																									</table>
																							</div>
																						</div>
																						</div>
																					</div>	
																<!--------------------------table End-------------------------->
																				
																			</form>
																		</div>
																	</div>
																</div>
																<!-- general tab ends here -->
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<!-- new modal starts here -->
										<div id="purchaseOrderModalId" class="modal" tabindex="-1" role="dialog">
										  <div class="modal-dialog" role="document">
										    <div class="modal-content">
										      <div class="modal-header">
										        <h5 class="modal-title">Item Master Details</h5>
										        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
										          <span aria-hidden="true">&times;</span>
										        </button>
										      </div>
										      <div class="modal-body">
										       <table id="itemMasterSlaveTableId" cellpadding="0" cellspacing="0"
												border="0"
												class="datatable table table-striped table-bordered" >
												<thead id="ehatTHead">
													<tr>
														<th class="col-md-1 center">#</th>
														<th class="col-md-1 center">Item Name</th>
														<th class="col-md-1 center" style="display: none">Item ID</th>
														<th class="col-md-1 center">Item Quantity</th>
														<th class="col-md-1 center">unit Price</th>
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
										        <button type="button" class="btn btn-primary" onclick="setModalInfoToTableOnPurchaseOrder()" >Save changes</button>
										        <button type="button" class="btn btn-secondary" onclick="closeItemPurchaseDetailsModal()">Close</button>
										      </div>
										    </div>
										  </div>
										</div>
										<!-- new modal ends here -->
										<!-- new modal starts here -->
										<div id="purchaseOrderContactAddressModalId" class="modal" tabindex="-1" role="dialog">
										  <div class="modal-dialog" role="document">
										    <div class="modal-content">
										      <div class="modal-header">
										        <h5 class="modal-title">Party Master Details</h5>
										        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
										          <span aria-hidden="true">&times;</span>
										        </button>
										      </div>
										      <div class="modal-body" style="width:100%; height:350px;">
										      <div class="col-md-12" id="purchaseQuote" >
										      <div class="col-md-6">
										       <table id="partymasterSlaveTableId" cellpadding="0" cellspacing="0"
												border="0"
												class="datatable table table-striped table-bordered" >
												<thead id="ehatTHead">
													<tr>
														<th class="col-md-1 center">#</th>
														<th class="col-md-1 center">Select</th>
														<th class="col-md-1 center">Address</th>																	
														</tr>
												</thead>
												<tbody id="partyMasterAddressSlaveRecordList">
												</tbody>
											 </table>
											 </div>
											 <div class="col-md-6">
										       <table id="partymasterSlaveTableId1" cellpadding="0" cellspacing="0"
											border="0"
											class="datatable table table-striped table-bordered" >
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
											 <div class="modal-body">
										      </div>
										      <div class="modal-footer">
										        <button type="button" class="btn btn-primary" onclick="setPartyModalInfoToTableOnPurchaseOrder()" >Save changes</button>
										        <button type="button" class="btn btn-secondary" onclick="closepartyMasterDetailsModalOnPurchaseOrder()">Close</button>
										      </div>
										      </div>
										    </div>
										  </div>
										</div>
										<!-- new modal ends here -->
										<div class="row">
										<div class="col-md-12">
										<div class="container">
											  <div class="col-sm-2">
											    <div class="panel panel-primary">
											     <div class="panel-heading" id="divEhatContent">Less
													</div>
											      <div class="panel-body">
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Spec. Dis</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="lessSpecialDiscountId" type="text"
													          onblur="toCheckNumberOrNo(this.id),calculateSpecialDiscount();" />
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Debit Amt.</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="lessDebitAmountId" type="text"
													          onblur="toCheckNumberOrNo(this.id),calculateSpecialDiscount();" />
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">CD %</label>
													      <div class="col-lg-4">
													          <input class="form-control" name="name" id="lessCDPercent1Id" type="text"
													          onblur="toCheckNumberOrNo(this.id),calculateCDAmt();" />
													      </div>
													       <div class="col-lg-4">
													          <input class="form-control" name="name" id="lessCDPercent2Id" type="text"
													          onblur="toCheckNumberOrNo(this.id),calculateTotalLess();" />
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
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Octroi</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="addOctroiId" onclick="calculateTotalAdd();" type="text">
													      </div>
													  </div>
													</div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Surcharge</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="addSurchargeId" onclick="calculateTotalAdd();" type="text">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Credit Amt.</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="addCreditAmountId" onclick="calculateTotalAdd();" type="text">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Freight</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="addFreightId" onclick="calculateTotalAdd();" type="text">
													      </div>
													  </div>
													</div>
											      </div>
											    </div>
											  </div>
											  <div class="col-sm-2">
											    <div class="panel panel-primary">
											     <div class="panel-heading" id="divEhatContent">Tax Info.
													</div>
											      <div class="panel-body">
											      <div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Vat</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="taxVatId" type="text">
													      </div>
													  </div>
													</div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">LBT</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="taxLBTId" type="text">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">CST</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="taxCSTId" type="text">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Ex Vat</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="taxExVatId" type="text">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Total Tax</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="taxTotalTaxesId" type="text">
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
											      <div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Gross Amount</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="grossAmountId" type="text">
													      </div>
													  </div>
													</div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Less</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="grossLessAmountId" type="text">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Add</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="grossAddAmountId" type="text">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Taxes</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="grossTaxesId" type="text">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Net Amount</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="grossNetAmountId" type="text">
													      </div>
													  </div>
													</div>
											      </div>
											    </div>
											  </div>
											  <div class="col-sm-2">
											   <div class="panel panel-primary">
											     <div class="panel-body">
											     <div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Remark</label>
													      <div class="col-lg-8">
													          <textarea class="form-control" name="remark" id="purchaseExpenseRemarkId" rows="5"></textarea>
													      </div>
													  </div>
													</div>
													</div>
											     </div>
											   </div>
											  </div>
											  <div class="col-sm-2">
											   <div class="panel panel-primary">
											     <div class="panel-body">
											     <div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Net Amount</label> 
													      <div class="col-lg-8">
													         <button type="button" class="btn btn-primary">Rount Off</button>
													      </div>
													      
													  </div>
													</div>
													<div class="row">
													   <div class="form-group">
													   <label for="name" class="col-lg-4">Charges</label> 
													  <div class="col-lg-8">
													   <button type="button" class="btn btn-info" onclick="showCharges()">Extra Charge</button>
													  </div>
													  </div>
													</div>
													<div class="row">
													<div class="form-group">
													<label for="name" class="col-lg-4">Select Charges</label>
													<div class="col-lg-8">
													<select class="form-control input-SmallText" id="selboxChargeswithAmtList" readOnly>
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
											  </div>
											</div>
											</div>
											</div>
										<div class="modal-footer">
											
										</div>
									</div>
								</div>
							</div>
							<!-- modal ends here -->
							<!--Extra Charges modal starts here-->
							<div id="applyChargesOnPurchaseOrder" class="modal fade in"
								tabindex="-1">
								<div class="modal-dialog">
									<div class="modal-content col-md-7"
										style="margin-top: 50px; margin-left: 140px;">
										<div class="modal-header">
											<div class="box-title"
												>
												<h4>
													<i class="fa fa-calendar"></i>Apply Charges
												</h4>
											</div>
										</div>
										<div class="modal-body">
											<table id="" cellpadding="0" cellspacing="0"
												border="1"
												class="table table-bordered table-striped table-condensed">
												<thead>
													<tr>
														<th><label class="TextFont">Select
																Charges <b style="color: red;"></b>
														</label></th>
														<th><label class="TextFont">Add
																Charges<b style="color: red;">*</b>
														</label></th>
													</tr>
												</thead>
												<tbody id="">
													<tr>
														<td>
															<div class="form-group  col-md-7-1" id="">
																<select class="form-control input-SmallText" id="txtChargesList">
																	<option value="0">Select</option>
																</select>
															</div> 
															<input type="text" id="chargeAmountId"
															name="txtexamunt" placeholder="Amount"
															class=" col-md-8-1 form-control input-SmallText"
															autocomplete="off"
															onkeyup="exactAmountPO(this.id)" /> 
															<input type="text" id="txtexGstper" name="txtexGstper" placeholder="GST %"
															class=" col-md-8-1 form-control input-SmallText"
															style="margin-top: 2px;"
															onkeyup="gstAmountChargePO(this.id)"
															onchange="gstAmountChargePO(this.id)" /> 
															<input type="text" id="txtexGstamt" name="txtexGstamt" placeholder="GST Amt"
															class=" col-md-8-1 form-control input-SmallText"
															value='0' />
															<input type="text" id="finalChargeAmountId" name="txtChargesAmt" placeholder="FinalAmount"
															class=" col-md-8-1 form-control input-SmallText"
															autocomplete="off" style="margin-top: 2px;" />
														</td>
														<td>
															<div class="form-group  col-md-4-1">
																<img width="18" height="18"
																	src="images/plus.jpg"
																	onclick="addItemChargesName()"
																	style="margin-top: 0px;"> <img
																	width="18" height="18" src="images/minus.jpg"
																	onclick="removeItemCharges()"
																	style="margin-top: 0px;">
															</div> 
															<select class="col-md-12-1" name="selectChargesbox" multiple="multiple" id='lstBoxforCharges' style="height: 140px;">
															</select> 
														</td>
													</tr>
												</tbody>
											</table>
											<div class="modal-footer">
												<div class="form-group col-md-9-1">
													<button type="button" class="btn btn-primary"
														onclick="applyChargesforItem()">Apply</button>
													<button type="button" class="btn btn-default"
														onclick="hideApplyChargespopaup()" id="closeBtn" data-dismiss="modal">Cancel</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						<!-- Extra Charges modal ends here -->
							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">					
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
																	<div class="panel-heading" id="divEhatContent">Purchase Order Details</div>
																	<div class="panel-body" style="overflow: auto; height: 300px">
																		<table id="purchaseOrderTableId" class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Party Name</th>
																					<th class="col-md-1 center">Edit</th>
																					<th class="col-md-1 center">Delete</th>
																					<th class="col-md-1 center">Print</th>
																				</tr>
																			</thead>
																			<tbody id="purchaseExpenseTableBodyId">
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
			<!-- bootstrap datepicker -->
		<script src="ehat-design/datepicker/bootstrap-datepicker.js"></script>	

		<!-- CUSTOM SCRIPT -->
		<script src="ehat-design/js/script.js"></script>
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
			
			$('#expenseDateId').datepicker({
				autoclose : true
			});
			$('#billDateId').datepicker({
				autoclose : true
			});
			
			getAllPurchaseExpenseRecordsDetails();
			addNewRowInTablePurchaseExpense('ItemInfoTablePO','purchaseexpense');
		});
		</script>
		<input type="hidden" id="partyMasterId" value="0">
		
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>

