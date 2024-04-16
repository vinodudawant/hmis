<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Item Master</title>
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
			<%@include file="inv_left_menu.jsp"%>
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
											<li><i class="fa fa-home"></i> <a href="inv_item_master.jsp">Item Master</a></li>
										</ul>
										<!-- /BREADCRUMBS -->
										
									</div>
								</div>
							</div>
							
							<div class="row">
							
								<div class="col-md-12">
											<div class="col-sm-1">
                     							<label for="inlineFold" class="control-label">Search By</label>
               								</div>
											<div class="col-md-4">											
												<div class="input-group" id="searchItemMasterDivId">												
													<input type="search" placeholder="Item Name" class="typeahead form-control input-SmallText" id="searchItemMasterId" onkeyup='fetchItemMasterDetails(this.id,"All")' data-name="itemMaster"/> 
													<span class="input-group-btn">
														<button class="btn btn-primary" style="height: 25px;margin-bottom: 10px"  type="button">
															<span class="fa fa-search" aria-hidden="true">
															</span> Search!
														</button>
													</span>
												</div>
											</div>
											<div class="col-md-4">
											<button class="btn btn-xs btn-info pull-left editUserAccess" type='button'
											data-toggle="modal" data-target="#itemMasterModal" onclick="refreshItemMasterMaster();">
											<i class = "fa fa-plus"></i> Add New Item</button>
											
											<!-- Added By Dayanand For  To export  data in Excel  Date(29-1-2020)-->
												<div style="font-weight: bold;" class="col-md-1-1">
														<button id="btnExport" class="btn btn-xs btn-warning" value="Excel"  title="" data-placement="left" data-toggle="tooltip" data-original-title="Excel" style="margin-left: 10px">
																			<!-- <i class="fa fa-file"></i> --> Export To Excel
																	</button>
																	<!-- following code for Excel sheet -->
																	<script type="text/javascript">
																	$("[id$=btnExport]").click(function(e) {
																	    window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$=itemMasterInfoExcel]').html()));
																	    e.preventDefault();
																	});
																	
																	</script>
																	
												</div>
												<!-- End -->
										
											
											
											</div>
								</div>
							</div>
							
							<!-- modal starts here -->
								<div class="modal fade" id="itemMasterModal" role="dialog" style="overflow:auto" data-backdrop="static" data-keyboard="false" aria-labelledby="itemMasterModalLabel" aria-hidden="true">
								  <div class="modal-dialog modal-dialog-centered" role="document" style="width:90%;">
								    <div class="modal-content">
								      <div class="modal-header">
								        <h5 class="modal-title" id="exampleModalLabel">ITEM MASTER
								        <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
								          <span aria-hidden="true">&times;</span>
								        </button> -->
								         <div class="pull-right" style="margin-right: 15px;">
									         <button type="button" class="btn btn-primary editUserAccess" onclick="saveItemMaster();">Save</button>
									         <button type="button" class="btn btn-primary btn-danger" onclick="closeItemMasterPopUp();"data-dismiss="modal">Close</button>
										</div>
										</h5>
										<!-- <div class="pull-right" style="margin-right: 15px;">
										 <button type="button" class="btn btn-primary" style="margin-top: 15%;">
										   Item No.  <span class="badge badge-light" id="nextItemId">9</span>
										</button>
										</div> -->
								      </div>
								      <div class="modal-body">
								      <div class="row">
								        <div class="col-md-12">
												<div class="container">
													<div class="panel panel-primary" style="margin-top: 20px;">
														<div class="panel-heading" id="divEhatContent">Item Master
															Form</div>
														<div class="panel-body">
															<form id="financialFormId" onsubmit="return false">
															<div class="form-group col-md-2">
																	<label for="categoryName">Item Name</label> <input
																		type="text" class="form-control tip-focus" id="itemNameId"
																		placeholder="Enter item name" title="Please enter the item Name" name="itemName"> 
																</div>
																<div class="form-group col-md-2">
																		<label for="Alias Name">Item Alias Name</label> 
																		<input type="text" class="form-control" id="aliceNameId" 
																		placeholder="Enter Alias Name" name="aliceName">
																</div>
																<div class="form-row">
																	<div class="form-group col-md-2">
																		<label for="formType">Form Type</label> 
																		<input type="text" class="form-control" id="formTypeId" onkeyup="inventoryFormAutoSuggestion(this.id)" data-name="itemFormMaster"
																			placeholder="Enter Form Type" name="formType">
																	</div>
																	<div class="form-group col-md-2" id="categoryNameDivId">
																	<label for="categoryName">Category Name</label> 
																	<input type="text" class="form-control tip-focus typeahead" id="searchId11" 
																		onkeyup="inventoryCategoryAutoSuggestion(this.id)"
																		placeholder="Enter category name" 
																		title="Please enter the category Name" name="categoryName" data-name="itemCategoryMaster"> 
																    </div>
																<div class="form-group col-md-2">
																	<label for="categoryName">Status</label> 
																	<select class="form-control" id="statusId">
																      <option value="">--Select Status--</option>
																      <option value="Continue">Continue</option>
																      <option value="Dis-Continue">Dis-Continue</option>
																    </select>
																</div>
																<div class="form-group col-md-2">
																<input type="hidden" id="hiddenHsnNameValue" />
																	<label for="categoryName">HSN/SAC No</label> 
																	<select class="form-control" id="hsnNameId" onchange="getHSNDetails(this.value);">
																      <option value=''>--Select HSN No--</option>
																    </select>
																</div>
																</div>
																<div class="form-row">
																<div class="form-group col-md-2">
																		<label for="CGST Rate ">CGST Rate</label> 
																		<input type="text" class="form-control" id="cgstRateId" name="cgstRate" />
																</div>
																<div class="form-group col-md-2">
																		<label for="SGST Rate">SGST Rate</label> 
																		<input type="text" class="form-control" id="sgstRateId" name="sgstRate" />
																</div>
																<div class="form-group col-md-2">
																		<label for="Tax Code">Tax Name</label> 
																		<input type="text" class="form-control" id="taxNameId" name="taxName" />
																</div>
																<div class="form-group col-md-2">
																		<label for="Tax Rate">Tax Rate</label> 
																		<input type="text" class="form-control" id="taxRateId" name="taxRate" />
																</div>
																<div class="form-group col-md-2">
																		<label for="Company Name">Company Name</label>
																		<input type="text" class="form-control typeaheadCompanyName" id="companyNameId"
																		data-name="itemMasterCompanyName" 
																		onkeyup="inventoryCompanyAutoSuggestion(this.id)"
																		placeholder="Enter Company Name" name="companyName">
																</div>
																<div class="form-group col-md-2">
																	<label for="batchWise">Batch Wise</label> 
																	<select class="form-control" id="batchWiseId">
																      <option value="">--Select Batch--</option>
																      <option value="YES">YES</option>
																      <option value="NO">NO</option>
																    </select>
																</div>
																</div>
																
																 <!-- <span class="badge badge-primary">Item No</span> -->
																 
															</form>
														</div>
													</div>
													<div class="container" style="margin-top: 2%;">
													  <ul class="nav nav-tabs">
													    <li class="active"><a data-toggle="tab" href="#generalInfo">General Info</a></li>
													    <li><a data-toggle="tab" href="#purchaseIssueInfo">Purchase/Issue Info</a></li>
													    <li><a data-toggle="tab" href="#warehouseInfo">Warehouse Info</a></li>
													    <li><a data-toggle="tab" href="#partyDetails">Party Details</a></li>
													    <li><a data-toggle="tab" href="#contractDetails">Contract Details</a></li>
													    <li><a data-toggle="tab" href="#maintainanceDetails">Maintenance Details</a></li>
													  </ul>
													  <div class="tab-content">
													  <!-- general tab starts here -->
													    <div id="generalInfo" class="tab-pane fade in active">
													      <div class="panel panel-primary" style="margin-top: 20px">
														<div class="panel-body">
														<div class = "container">
												         <form>
												          <label class = "checkbox-inline">
												               <input type = "checkbox"  name="assetItemStatus" id="assetItemId">Asset Item
												            </label>
												            <label class = "checkbox-inline">
												               <input type = "checkbox"  name="labEquipmentStatus" id="labEquipmentId" onclick="setAssetNameCheckEnabled()">Lab Equipment
												            </label>
												             <label class = "checkbox-inline">
												               <input type = "checkbox"   name="reagentItemStatus" id="reagentItemId">Reagent Item
												            </label>
												             <label class = "checkbox-inline">
												               <input type = "checkbox"   name="consumableItemStatus" id="consumableItemId">Consumable Item
												            </label>
												            <label class = "checkbox-inline">
												               <input type="checkbox"  checked="checked" value="1" name="purchaseItemStatus" id="purchaseItemId">Purchase Item
												            </label>
												            <label class = "checkbox-inline">
												               <input type = "checkbox"   name="laundryItemStatus" id="laundryItemId">Laundry Item
												            </label>
												            <label class = "checkbox-inline">
												               <input type = "checkbox" checked="checked" value="1" name="invItemStatus" id="inventoryItemId">Inventory Item
												            </label>
												             <label class = "checkbox-inline">
												               <input type = "checkbox"  name="cssItemStatus" id="cssdItemId" onclick="setCssdOption(),checkCheckbox(this.id)">CSSD
												            </label>
												            <label class = "checkbox-inline">
												               <input type = "checkbox" checked="checked" value="1"  name="issueItemStatus" id="issueItemId">Issue Item
												            </label>
												            <label class = "checkbox-inline">
												               <input type = "checkbox" name="serviceItemStatus" id="serviceItemId">Service Item
												            </label>
												             <label class = "checkbox-inline">
												               <input type = "checkbox" name="licenseItemStatus" id="licenseItemId"> License Item
												            </label>
												         </form>
												      </div>
												       <div style="display:none" class="form-group  col-md-12-1" id="cssdOptions"
																						style="margin-right: 2%; margin-left: 5%;text-align: left;">

																							<label for="exampleInputEmail1" class="TextFont">CSSD
																							Item </label>
																						<input type="radio" id="cssd1" name="CSSDItem" style="margin-left: 9px;" value="CI" checked />
																						
																						<label for="exampleInputEmail1" class="TextFont">Machine
																						Item </label>
																						<input type="radio" id="cssd2" name="CSSDItem" style="margin-left: 9px;" value="MI" />

													  </div>
												      <div class='col-xs-12 col-md-12 col-sm-12' style="padding-top: 20px;"></div>
														<form>
														<div class="form-group col-md-2">
																	<label for="categoryName">Order Stock</label> <input
																		type="text" class="form-control tip-focus" id="orderStockId"
																		placeholder="Enter order stock" title="Please enter the order stock" name="orderStock"> 
																</div>
																<div class="form-group col-md-2">
																		<label for="formType">Min Stock</label> <input
																			type="text" class="form-control tip-focus" id="reorderStockId"
																			placeholder="Enter Reorder Stock" title="Please enter the reorder stock" name="reorderStock">
																	</div>
															<div class="form-group col-md-2">
																	<label for="maxStock">Max Stock</label> <input
																		type="text" class="form-control tip-focus" id="maxStockId"
																		placeholder="Enter max stock" title="Please enter the max stock" name="maxStock"> 
																</div>
																<div class="form-row">
																<div class="form-group col-md-2">
																	<label for="categoryName">Purchase Strategy</label> 
																	<select class="form-control" id="purchaseStrategyId" name="purchaseStrategy">
																      <option value="">--Select Purchase Strategy--</option>
																      <option value="Yearly">Yearly</option>
																      <option value="Quarterly">Quarterly</option>
																      <option value="Monthly">Monthly</option>
																      <option value="Biweekly">Biweekly</option>
																      <option value="Weekly">Weekly</option>
																      <option value="AsRequired">As Required</option>
																    </select>
																</div>
																<div class="form-group col-md-2">
																	<label for="categoryName">Priority</label> 
																	<select class="form-control" id="priorityId" name="priority">
																      <option value="">--Select Priority--</option>
																      <option value="High">High</option>
																      <option value="Medium">Medium</option>
																      <option value="Low">Low</option>
																    </select>
																</div>
																<div class="form-group col-md-2">
																	<label for="categoryName">Criticality</label> 
																	<select class="form-control" id="criticalityId" name="criticality">
																      <option value="">--Select Criticality--</option>
																      <option value="Vital">Vital</option>
																      <option value="Essential">Essential</option>
																      <option value="Desirable">Desirable</option>
																    </select>
																</div>
																<div class="form-group col-md-2">
																	<label for="categoryName">Lead Time</label> <input
																		type="text" class="form-control tip-focus" id="leadTimeId"
																		placeholder="Enter lead time" title="Please enter the lead time" name="leadTime"> 
																</div>
																<div class="form-group col-md-2">
																	<label for="Lead Time Unit">Lead Time Unit</label>
																	<!--  <input
																		type="text" class="form-control tip-focus" id="leadTimeUnitId"
																		placeholder="Enter lead time unit" title="Please enter the lead time unit" name="leadTimeUnit"> --> 
																<select class="form-control" id="leadTimeUnitId" name="leadTimeUnitId">
																      <option value="">--Select Unit--</option>
																      <option value="Hours">Hours</option>
																      <option value="Days">Days</option>
																      <option value="Months">Months</option>
																    </select>
																
																</div>
																</div>
																<div class="form-row">
																</div>
															</form>
														</div>
													</div>
											     </div>
											     <!-- general tab ends here -->
											     		<!-- purchase tab starts here -->
													    <div id="purchaseIssueInfo" class="tab-pane fade">
													    <div class="panel panel-primary" style="margin-top: 20px">
														<div class="panel-body">
														<div class="container">
														<div class="row">
														<div class="col-md-12">
														<div class="col-md-6">
													  <form name="itemPurchasedetialsForm" method="post">
													  <table border="1">
																	<thead class="thead-dark">
																	<tr style="text-align: center;background-color: #696969;color: white">
																		<th><label class="TextFont">Factors</label></th>
																		<th><label class="TextFont">Qty</label></th>
																		<th><label class="TextFont">UOM</label></th>
																		<th><label class="TextFont">Purchase Cost</label></th>
																	</tr>
																</thead> 						
																	<tr> 
																		<td><input type="text" id="F1" value="F1" class="form-control input-SmallText" readonly="readonly" width="3"></td>	
																		<td><input type="text" id="purchaseUomFactor1Id" name="purchaseUomFactor1" class="form-control input-SmallText" onkeyup="setFactorValue(this.value)"></td>	
																		<!-- <td><input type="text" id="purchaseFactorUom1Id" name="purchaseFactorUom1" class="typeaheadUnit form-control input-SmallText" onkeyup="inventoryUnitAutoSuggestion(this.id),setLastUom(this.value)" data-name="itemUnitMaster" maxlength="40" placeholder="uom"></td> -->
																		<td style="display:none"><input type="hidden" id="uomFactorOneValueId"/></td>
																			<td><select name="purchaseFactorUom1Id" id="purchaseFactorUom1Id" style="width: 100%;" onchange="setUOMFactorOneValue();">
																					<option value="0">--Select--</option>				
																			</select>
																		</td>		
																		<td><input type="text" id="purchaseUnitPrice1Id" name="purchaseUnitPrice1" onkeyup="setFactorPrice(this.value),calculateUnitPrice()" class="form-control input-SmallText"></td>
																	
																	</tr>
																	 <tr> 
																		<td><input type="text" id="F2" value="F2" class="form-control input-SmallText" readonly="readonly" width="3"></td>	
																		<td><input type="text" id="purchaseUomFactor2Id" name="purchaseUomFactor2" class="form-control input-SmallText" onkeyup="setFactorValue(this.value);calculateUnitPrice2();"></td>	
																		<!-- <td><input type="text" id="purchaseFactorUom2Id" name="purchaseFactorUom2" class="typeahead form-control input-SmallText" onkeyup="inventoryUnitAutoSuggestion(this.id),setLastUom(this.value)" data-name="itemUnitMaster" maxlength="40" placeholder="uom"></td> -->
																		<td style="display:none"><input type="hidden" id="uomFactorTwoValueId"/></td>
																		<td><select name="purchaseFactorUom2Id" id="purchaseFactorUom2Id" style="width: 100%;" onchange="setUOMFactorTwoValue();">
																					<option value="0">--Select--</option>
																					</select>
																		</td>				
																		<td><input type="text" id="purchaseUnitPrice2Id"  name="purchaseUnitPrice2" class="form-control input-SmallText" readonly="readonly"></td>	
																	</tr>
																	<tr> 
																		<td><input type="text" id="F3" value="F3" class="form-control input-SmallText" readonly="readonly" width="3"></td>	
																		<td><input type="text" id="purchaseUomFactor3Id" name="purchaseUomFactor3" class="form-control input-SmallText" onkeyup="setFactorValue(this.value);calculateUnitPrice3();"></td>	
																		<!-- <td><input type="text" id="purchaseFactorUom3Id" name="purchaseFactorUom3" class="typeahead form-control input-SmallText" onkeyup="inventoryUnitAutoSuggestion(this.id),setLastUom(this.value)" data-name="itemUnitMaster" maxlength="40" placeholder="uom"></td> -->
																		<td style="display:none"><input type="hidden" id="uomFactorThreeValueId"/></td>
																		<td><select name="purchaseFactorUom3Id" id="purchaseFactorUom3Id" style="width: 100%;" onchange="setUOMFactorThreeValue();">
																					<option value="0">--Select--</option>
																					</select>
																		</td>	
																		<td><input type="text" id="purchaseUnitPrice3Id"  name="purchaseUnitPrice3" class="form-control input-SmallText" readonly="readonly"></td>	
																	</tr>
																			<tr> 
																		<td><input type="text" id="F4" value="F4" class="form-control input-SmallText" readonly="readonly" width="3"></td>	
																		<td><input type="text" id="purchaseUomFactor4Id" name="purchaseUomFactor4" class="form-control input-SmallText" onkeyup="setFactorValue(this.value);calculateUnitPrice4();"></td>	
																		<!-- <td><input type="text" id="purchaseFactorUom4Id" name="purchaseFactorUom4" class="typeahead form-control input-SmallText" onkeyup="inventoryUnitAutoSuggestion(this.id),setLastUom(this.value)" data-name="itemUnitMaster" maxlength="40" placeholder="uom"></td> -->
																		<td style="display:none"><input type="hidden" id="uomFactorFourValueId"/></td>
																		<td><select name="purchaseFactorUom4Id" id="purchaseFactorUom4Id" style="width: 100%;" onchange="setUOMFactorFourValue();">
																					<option value="0">--Select--</option>
																					</select>
																		</td>		
																		<td><input type="text" id="purchaseUnitPrice4Id"  name="purchaseUnitPrice4" class="form-control input-SmallText" readonly="readonly"></td>	
																	</tr>
															</table>
															<input type="hidden" id="hiddenFactorValue"/> 
															<input type="hidden" id="hiddenFactorPrice"/> 
															<input type="hidden" id="hiddenLastUOM" />
															<input type="hidden" id="txtItemPurchaseInfoId" value= 0/>
															<div style="margin-top: 10px;">
															<input type="hidden" id="itemPurchaseSlaveId" value="0">
															<button class="btn btn-primary editUserAccess" type="button" id="addRowsButtonId" onclick="addRowsItemPurchase()">Add</button>
															<button class="btn btn-primary editUserAccess" type="button" id="updateRecordButtonPurchaseId" onclick="updateItemPurchaseSlave()" style="display: none;background-color:">Update</button>
															<button class="btn btn-default" type="button" onclick="refreshItemPurchaseSlaveData()">Reset</button>
															</div>
														</form>
														</div>
														<div class="col-md-6" style="display: none;">
															  <form name="" method="post">
															  <table border="1">
																			<thead>
																				<tr style="text-align: center;background-color: #696969;color: white">
																					<th style="text-align: center;"><label class="TextFont">Factors</label></th>
																					<th style="text-align: center;"><label class="TextFont">Qty</label></th>
																					<th style="text-align: center;"><label class="TextFont">UOM</label></th>
																					<th style="text-align: center;"><label class="TextFont">Sale/Issue MRP</label></th>
																					</tr>
																			</thead> 						
																				<tr> 
																					<td><input type="text" id="F1" value="F1" class="form-control input-SmallText" readonly="readonly" width="3"></td>	
																					<td><input type="text" id="salesUomFactorId" name="salesUomFactor" class="form-control input-SmallText"></td>	
																					<td><input type="text" onkeyup="inventoryUnitAutoSuggestion(this.id)" id="salesFactorUomId" class="typeahead form-control input-SmallText" maxlength="40" name="salesFactorUom" placeholder="uom"></td>	
																					<td><input type="text" id="unitPriceId" name="unitPrice" class="form-control input-SmallText"></td>	
																				</tr>
																		</table>
																		<div style="margin-top: 10px;">
																				<input type="hidden" id="itemSalesSlaveId" value="0">
																				<button class="btn btn-primary editUserAccess" type="button" id="addRowsItemSalesButtonId" onclick="addRowsItemSales()">Add</button>
																				<button class="btn btn-primary editUserAccess" type="button" id="updateRecordItemSalesButtonId" onclick="updateItemSalesSlave()" style="display: none;">Update</button>
																				<button class="btn btn-default" type="button" onclick="refreshItemSalesSlaveData()">Reset</button>
																		</div>
																	   <div class="form-group col-md-6-offset">
																	   <input type="hidden" id="txtItemSalesInfoId" value= 0/>
																	    <label for="exampleInputEmail1">Item Profit</label>
																	    <input type="text" class="form-control" id="exampleInputEmail1" 
																	    placeholder="Item Profit" readonly="readonly">
																	  </div>
																	</form>			
														</div>
														<div class="col-md-6" style="height: 100px;margin-top:5px;">
																<div style="height: 250px;">
																	<div style='width: 100%; padding: 1%; font-weight: normal; height: 44%; 
																	overflow-y: scroll; border: 1px solid #436a9d;'>
																		<div id="PurchaseInfoTable1">
																		<table id="itemPurchaseMasterTableId" cellpadding="0" cellspacing="0"
																		border="0"
																		class="datatable table table-striped table-bordered" >
																		<thead id="ehatTHead">
																			<tr>
																				<th class="col-md-1 center">#</th>
																				<th class="col-md-1 center" style="display: none">#</th>
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
																	</div>
																</div>
														</div>
														</div>
														<div class="col-md-12">
														<div class="col-md-6" style="height: 100px;margin-top:5px;display: none;">
															<div style="height: 250px;">
																<div style='width: 100%; padding: 1%; font-weight: normal; 
																height: 44%; overflow-y: scroll; border: 1px solid #436a9d;'>
																	<div id="SalesInfoTable">
																	<input type="hidden" id="itemMasterId" value="0">
																	<table id="itemSalesSlaveTableId" cellpadding="0" cellspacing="0"
																		border="0"
																		class="datatable table table-striped table-bordered" >
																		<thead id="ehatTHead">
																			<tr>
																				<th class="col-md-1 center">#</th>
																				<th class="col-md-1 center">Unit MRP</th>
																				<th class="col-md-1 center">Fact1</th>
																				<th class="col-md-1 center">Edit</th>
																				<th class="col-md-1 center">Delete</th>
																			</tr>
																		</thead>
																		<tbody id="itemSalesSlaveRecordList">
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
													    <!-- purchase tab ends here -->
													    <!-- warehouse tab starts here -->
													    <div id="warehouseInfo" class="tab-pane fade">
													     <div class="container">
													     <div class="row">
														<div class="col-md-12">
														<table id="WareHouseInfoTable" cellpadding="0"
															cellspacing="0" border="1"
															class="datatable table table-striped table-bordered table-hover">
															<thead>
																<tr>
																	<th class="col-sm-1-1 center">Name</th>
																	<th class="col-sm-1-1 center">Location</th>
																</tr>
															</thead>
															<tbody id="WareHouseInfoTableList"
																style="overflow-y: scroll;">
																<tr>
																	<td><div id="seachWarehouseId" style="text-align: left;"><input type='text' id="wareHouseNameId"
																	     onkeyup="setAutoWarehouseNameOnItemMaster(this.id)" data-name="itemWarehouseMaster"
																		 class='typeahead form-control input-SmallText' 
																		placeholder="Enter Name"></div></td>
																	<td><input type='text' id="wareHouseLocationId"
																		onkeypress="return validateOnlyName(event)" class='form-control input-SmallText'
																		 placeholder="Enter Location"></td>
																</tr>
															</tbody>
														</table>
														</div>													     
													     </div>
													     </div>
													     <div id="itemmasterpartids" style="visibility: hidden;"></div>
													    </div>
													     <div id="partyDetails" class="tab-pane fade">
													     <div class="container">
													   	 <div class="row">
													   	 <div id="PartyDetails" class="col-md-12">
													   	 <div class="panel panel-default" style="margin-top: 20px;">
														<div class="panel-heading" id="divEhatContent">Party Details Information</div>
														<div class="panel-body">
														<div class="col-md-12">
														<div class="form-group col-md-6" id="searchPartySlaveDivId">
														<label for="categoryName">Vendor Name</label>
														 <input type="text" onkeyup="setAutoPartyNameOnItemMaster(this.id)" class="form-control tip-focus typeahead" id="vendorNameId" placeholder="Enter Vendor Name" title="Please enter the vendor Name" name="itemName">
														 <input type="hidden" id="hiddenPartyIdOnItemMaster" value="0" />
														 <input type="hidden" id="hiddenItemPartySlaveId" value="0" />
														 <input type="hidden" id="hiddenItemMasterNameIdOnPartySlave" value="" />
														</div>
														<div class="col-md-6" style="margin-top: 20px">
														<button class="btn btn-primary editUserAccess" type="button" id="addRowsButtonPartyId" onclick="addRowsItemVendorNamesAndId()">Add</button>
														<button class="btn btn-primary editUserAccess" type="button" id="updateRecordButtonPartyId" onclick="updateItemPartySlave()" style="display: none;">Update</button>
														<button class="btn btn-default" type="button" onclick="refreshItemVendorSlaveData()">Reset</button>
														</div>
														</div>
														<div class="col-md-12">
													   	 <div class="col-md-6" style="height: 100px;margin-top:5px;">
																<div style="height: 250px;">
																	<div style='width: 100%; padding: 1%; font-weight: normal; height: 44%; overflow-y: scroll; border: 1px solid #436a9d;'>
																		<div id="PurchaseInfoTable1">
																		<table id="itemVendorMasterTableId" cellpadding="0" cellspacing="0"
																		border="0"
																		class="datatable table table-striped table-bordered" >
																		<thead id="ehatTHead">
																			<tr>
																				<th class="col-md-1 center">#</th>
																				<th class="col-md-1 center">Vendor Name</th>
																				<th class="col-md-1 center">Vendor ID</th>
																				<th class="col-md-1 center">Edit</th>
																				<!-- <th class="col-md-1 center">Delete</th> -->
																			</tr>
																		</thead>
																		<tbody id="itemVendorMasterRecordList">
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
													    <!-- party tab ends here -->
													    <!-- contract tab starts here -->
													    <!-- maintainance tab details starts here-->
													    <div id="maintainanceDetails" class="tab-pane fade">
													     <div class="container">
													   	 <div class="row">
													   	 <div id="ContractDetails" class="col-md-12">
													   	 <div class="panel panel-default" style="margin-top: 20px;">
														<div class="panel-heading" id="divEhatContent">Maintenance Details Information</div>
														<div class="panel-body">
														<form id="contractInfoFormId">
														<div class="col-md-12">
														<div class="col-md-12">
														<div class="form-group col-md-4">
														<div class="form-row">
														<div class="form-group col-md-8">
														<label for="Priority">Asset Warranty<b style="color: red;">*</b></label>
															 <input type="text"	placeholder="Enter Warranty Duration"
																class="form-control tip-focus" id="warrantyWithProductDurationId" onkeypress="return validateNumOnly(event)">
															
														</div>
														<div class="form-group col-md-4">
															 <!-- <select class="form-control" id="warrantyWithProductId">
																<option value="">--Select Warranty Duration--</option>
																<option value="1 Year">1 Year</option>
																<option value="2 Year">2 Year</option>
																<option value="3 Year">3 Year</option>
																<option value="4 Year">4 Year</option>
																<option value="5 Year">5 Year</option>
															</select> -->
															<label for="Priority">Duration</label>
															 <select class="form-control" id="warrantyWithProductId">
																<option value="">--Select Duration--</option>
																<option value="Days">Days</option>
																<option value="Month">Month</option>
																<option value="Year">Year</option>
															</select>
														</div>
														<div class="form-group col-md-8">
															<label for="AMC/CMC">AMC/CMC</label>
															 <input type="text"	placeholder="Enter AMC/CMC Duration"
																class="form-control tip-focus" id="amccmcFreeTextDurationId" onkeypress="return validateNumOnly(event)">
															
														</div>
														<div class="form-group col-md-4">
															<label for="Priority">Duration</label>
															 <select class="form-control" id="amccmcDurationId">
																<option value="">--Select Duration--</option>
																<option value="Days">Days</option>
																<option value="Month">Month</option>
																<option value="Year">Year</option>
															</select>
														</div>
														<div class="form-group col-md-8">
															<label for="Preventive Maintenance">Preventive Maintenance</label>
															 <input type="text"	placeholder="Enter Preventive Maintenance Duration"
																class="form-control tip-focus" id="preventiveMaintenanceFreeTextDurationId" onkeypress="return validateNumOnly(event)">
															
														</div>
														<div class="form-group col-md-4">
															<label for="Priority">Duration</label>
															 <select class="form-control" id="preventiveMaintenanceDurationId">
																<option value="">--Select Duration--</option>
																<option value="Days">Days</option>
																<option value="Month">Month</option>
																<option value="Year">Year</option>
															</select>
														</div>
														
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
													    <!-- maintainance tab details ends here -->
													    <div id="contractDetails" class="tab-pane fade">
													     <div class="container">
													   	 <div class="row">
													   	 <div id="ContractDetails" class="col-md-12">
													   	 <div class="panel panel-default" style="margin-top: 20px;">
														<div class="panel-heading" id="divEhatContent">Contract Details Information<span class="label label-warning pull-right" style="height: 13px;" id="uploadDocumentInfoId">You Can Upload The Contract Related Documents Under Item Master Edit Section..!!</span></div>
														
														 <input type="hidden" id="hiddenPartyIdOnItemMasterContractDetails" value="0" />
														  <input type="hidden" id="hiddenContractSlaveId"/>
														<div class="panel-body">
														<div class="col-md-12">
														<div class="col-md-12">
														<div class="form-group col-md-4">
														<div class="form-row">
														<div class="form-group col-md-6">
															<label for="Party Name">Party Name<b style="color: red;">*</b></label>
															 <input type="text"	placeholder="Enter Party Name"
																class="form-control tip-focus" id="partyNameContractId" onkeyup="setAutoPartyNameOnItemMasterContractDetails(this.id)"
																name="orderNo">
														</div>
														<div class="form-group col-md-6">
															<label for="Rate">Rate</label>
															 <input type="text"	placeholder="Enter Rate"
																class="form-control tip-focus" id="rateContractId" value="0"
																name="orderNo">
														</div>
														<div class="form-group col-md-6">
															<label for="Priority">Priority<b style="color: red;">*</b></label>
															 <select class="form-control" id="priorityContractId">
																<option value="">--Select Priority--</option>
																<option value="High">High</option>
																<option value="Medium">Medium</option>
																<option value="Low">Low</option>
															</select>
														</div>
														<div class="form-group col-md-6">
															<label for="MRP">MRP</label>
															 <input type="text"	placeholder="Enter MRP" value="0"
																class="form-control tip-focus" id="mrpContractId" onchange="calculateContractProfit()">
														</div>
														<div class="form-group col-md-6">
															<label for="Reference No">Reference No.</label>
															 <input type="text"	placeholder="Enter Reference No"
																class="form-control tip-focus" id="referenceNoContractId">
														</div>
														<div class="form-group col-md-6">
															<label for="Profit">Profit</label>
															 <input type="text"	placeholder="Enter MRP" value="0"
																class="form-control tip-focus" id="profitContractId" readonly="readonly">
														</div>
														<div class="form-group col-md-6">
															<label for="From Date">From Date</label>
															 <input type="text" class="form-control tip-focus" id="fromDateContractId">
														</div>
														<div class="form-group col-md-6">
															<label for="To Date">To Date</label>
															 <input type="text" class="form-control tip-focus" id="toDateContractId">
														</div>
														<div class="form-group col-md-6">
															<div class="form-check">
															   <input type="checkbox" class="form-check-input" id="withContractId">
															   <label class="form-check-label" for="With Contract">With Contract</label>
															 </div>
														</div>
														<button class="btn btn-primary editUserAccess" type="button" id="addRowsButtonContractId" onclick="addRowsItemContractDetails();">Add</button>
														<button type="button" class="btn btn-primary" id="updateContractInfo" style="display: none;" onclick="updateContractInfoItemMaster()">Update</button>
														<button class="btn btn-default" type="button" onclick="refreshItemContractDetailsData()">Reset</button>
														</div>
														</div>
														<div class="form-group col-md-8">
														<div class="form-row">
														<div class="col-md-12" style="height: 100px;margin-top:5px;">
																<div style="height: 250px;">
																	<div style='width: 100%; padding: 1%; font-weight: normal; height: 44%; 
																	overflow-y: scroll; border: 1px solid #436a9d;'>
																		<div id="PurchaseInfoTable1">
																		<form id="contractTableFormId" enctype="multipart/form-data" method="post">
																		<table id="itemContractDetailsTableId" cellpadding="0" cellspacing="0"
																		border="0"
																		class="datatable table table-striped table-bordered" >
																		<thead id="ehatTHead">
																			<tr>
																				<th class="col-md-1 center">#</th>
																				<th class="col-md-1 center">Party Name</th>
																				<th class="col-md-1 center">Rate</th>
																				<th class="col-md-1 center">MRP</th>
																				<th class="col-md-1 center">From Date</th>
																				<th class="col-md-1 center">To Date</th>
																				<th class="col-md-1 center" id="browseDocumentHeaderId" style="display: none;">Browse Document</th>
																				<th class="col-md-1 center" id="viewDocumentHeaderId" style="display: none;">View Document</th>
																				<th class="col-md-1 center" id="uploadDocumentHeaderId" style="display: none;">Upload Document</th>
																				<th class="col-md-1 center">Edit</th>
																				<th class="col-md-1 center">Delete</th>
																			</tr>
																		</thead>
																		<tbody id="itemContractDetailsRecordList">
																		</tbody>
																	</table>
																	</form>
																		</div>
																	</div>
																</div>
														</div>
														</div>
														</div>
														<div class="modal fade bs-example-modal-lg" id="viewDocModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
															<div class="modal-dialog modal-dialog modal-lg">
																<div class="modal-content">
																	<div class="modal-header">
																		<div class="row">
																			<div class="col-md-4 col-xs-11">
																				<h3 class="modal-title" id="myModalLabel">View Document</h3>
																			</div>
																			<br> <br>
																			<div class="col-md-6 col-xs-11">
																				<h5></h5>
																				<h6 id="documentComment"></h6>
																			</div>
																		</div>
																	</div>
																	<div class="modal-body">
																		<iframe id="ViewDocumemnt" width="80%" height="330px"></iframe>
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
													    <!-- contract tab ends here-->
													  </div>
													</div>
												</div>
								        </div>
								        </div>
								      </div>
								      
								    </div>
								  </div>
								</div>
							<!-- modal ends here -->

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
																<div class="panel-heading" id="divEhatContent">Item
																	Master Table</div>
																<div class="panel-body" id="itemMasterInfo">
																	<table class="datatable table table-striped table-bordered" >
																		<thead id="ehatTHead">
																			<tr>
																				<th class="col-md-1 center">Sr No.</th>
																				<th class="col-md-1 center">Created Date</th>
																				<th class="col-md-1 center">Item Name</th>
																				<th class="col-md-1 center">Category</th>
																				<th class="col-md-1 center">Lead Time</th>
																				<th class="col-md-1 center">Duration</th>
																				<th class="col-md-1 center">Edit</th>
																				<th class="col-md-1 center">Delete</th>
																			</tr>
																		</thead>
																		<tbody id="itemMasterRecordsList">
																		</tbody>
																	</table>
																	
																</div>
																
																<div class="panel-body" id="itemMasterInfoExcel" style="display: none;">
																	<table class="datatable table table-striped table-bordered" >
																		<thead id="ehatTHead">
																			<tr>
																				<th class="col-md-1 center">Sr No.</th>
																				<th class="col-md-1 center">Created Date</th>
																				<th class="col-md-1 center">Item Name</th>
																				<th class="col-md-1 center">Category</th>
																				<th class="col-md-1 center">Lead Time</th>
																				<th class="col-md-1 center">Duration</th>
																			</tr>
																		</thead>
																		<tbody id="itemMasterRecordsListExcel">
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
														id="itemMasterRecordPagination">
													</ul>
												</div>
												<div class="row">
													<div class="col-md-4 col-md-offset-8">
														<div class="pull-right">
															<ul
																class="pagination pagination-blue margin-bottom-10"
																id="totalNumberOfPagesItemMaster">
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
			App.setPage("wizards_validations");  //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});	
			getAllItemMasterRecords();
			getNextItemMasterIdNew();
			$("#purchaseFactorUom1Id").select2();
			$("#purchaseFactorUom2Id").select2();
			$("#purchaseFactorUom3Id").select2();
			$("#purchaseFactorUom4Id").select2();
			
			var date = new Date();
			date.setDate(date.getDate());
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
			
			$('#fromDateContractId').datepicker({
				autoclose : true,
				startDate: date,
				todayHighlight: true
			});
			$('#toDateContractId').datepicker({
				autoclose : true,
				startDate: date,
				todayHighlight: true
			});
		});
		</script>
		<script>
		onload = function() {
			getAllHSNList();
		}
		</script>
		<input type="hidden" id="userIdSalesSlave" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="userIdPurchaseSlave" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="userIdPartySlave" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="categoryId" value="0">
		<input type="hidden" id="hiddenWarehouseId" value="0" />
		<input type="hidden" id="hiddenMaintenanceId" value="0" />
		
	</c:if>
	<!-- include js for development -->
	<script type="text/javascript" src="js/ehat_inventory.js"></script>
	<script type="text/javascript" src="js/ehat_inv_pagination.js"></script>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>

