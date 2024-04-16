<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Purchase Order</title>
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
												href="inv_purchase_order_master.jsp">Purchase Order</a></li>
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
												class="typeahead form-control input-SmallText" placeholder="Order Id / Party Name"
												id="searchPurchaseOrderId" onkeyup="fetchPurchaseOrderDetails(this.id)" />
											<span class="input-group-btn">
												<button class="btn btn-primary"
													style="height: 25px; margin-bottom: 10px" type="button" onclick="getPurchaseOrderDetailsById();">
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
							<div class="modal fade" id="purchaseOrderModuleModal" tabindex="-1" data-backdrop="static" data-keyboard="false"
								role="dialog" aria-labelledby="purchaseOrderModuleModal"
								aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">Purchase Order  Master
									         <div class="pull-right" style="margin-right: 15px;">
										         <button type="button" class="btn btn-primary" onclick="savePurchaseOrder()">Save</button>
										         <button type="button" class="btn btn-primary btn-danger" data-dismiss="modal" onclick="closePOPopUp();">Close</button>
											</div>
										</h5>
										</div>
										<div class="modal-body">
										<input type="hidden" id="purchaseOrderId" value="0" />
										<input type="hidden" id="partyContactSlavePOId" value="0" />
										<input type="hidden" id="partyAddressSlavePOId" value="0" />
										<input type="hidden" id="termConditionId" value="0" />
										<input type="hidden" value="0" id="hosState" />
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Purchase Order 
																</div>
															<div class="panel-body">
																<form id="financialFormId" onsubmit="return false">
																	<div class="form-row">
																		<div class="form-group col-md-2">
																		<label for="partyId">Order No</label>
																		 <input type="text"	placeholder="Quotation No" readonly="readonly"
																			class="form-control tip-focus" id="orderNoId"
																			name="orderNo">
																	</div>
																	<div class="form-group col-md-2">
																		<label for="partyName">Party Mobile No<b
																			style="color: red;">*</b></label> 
																		<input type="text"	class="form-control tip-focus" id="supplierMobileNoId" 
																		placeholder="Enter Mobile No"
																		title="Please Enter Mobile No" name="supplierMobileNo" readonly="readonly">
																	</div>
																		<div class="form-group col-md-2">
																			<label for="partyName">Refernce  No<b
																			style="color: red;">*</b></label> 
																		<input type="text"	class="form-control tip-focus" id="referenceNoId" placeholder="Enter Reference No"
																			title="Please enter  Reference No" name="referenceNo">
																		</div>
																		

																		<div class="form-group col-md-2">
																			<label for="QuatationDate">Order Date<b
																				style="color: red;">*</b></label> 
																				<input id="orderDateId" class="form-control input-SmallText"	
																				type="text"	
																				 name="orderDate" placeholder="Date"
																			value="<%=todays_date%>">
																		</div>

																		<div class="form-group col-md-2">
																			<label for="Deleviry">Delivery Date</label>
																			 <input id="deliveryDateId" class="form-control input-SmallText"	
																			 type="text" 
																			 readonly="readonly" name="deliveryDate" placeholder="Date"
																			value="<%=todays_date%>">
																		</div>

																		<div class="form-group col-md-2">
																			<label for="sAddress">Party Address</label> 
																			<textarea type="text" class="form-control" required="true"	
																			id="supplierAddressId" placeholder="Address" readonly="readonly"></textarea>
																		</div>
																		<div class="form-group col-md-2" id="searchSupplierNameDivId">
																		<input type="hidden" id="hiddenSupplierNameId" />
																		<input type="hidden" id="hiddenPartyMasterId" />
																		<input type='hidden' value='0' id='rowCountId' /> 
																		<input type='hidden' value='0' id='totaltblsize' />
																			<label for="parent">Party Name<b	style="color: red;">*</b></label> 
																			<input type="text"	class="form-control tip-focus"	id="supplierNameId" 
																			    onkeyup="setAutoSupplierNameOnPurchaseOrder(this.id)" autocomplete="off"
																				placeholder="Enter Supplier name " title="Please enter Party name"
																				name="supplier" data-name="purchaseOrderSupplierName">
																		</div>

																		<div class="form-group col-md-2">
																			<label for="status">Order Series<b style="color: red;">*</b></label>
																			<input type="text"	class="form-control tip-focus"	id="orderSeriesId" 
																				name="supplier" value="" readonly="readonly"/> 
																		</div>
																		<div class="form-group col-md-2">
																			<label for="status">Get Quotation</label> 
																			<select class="form-control" id="getQuotationId" onchange="getPurchaseQuotationMasterOnPurchaseOrder(this.value)">
																				<option value="0">--Select Status--</option>
																			</select>
																		</div>
																		<div class="form-group col-md-2">
																			<label for="priority">Order status<b
																				style="color: red;">*</b></label>
																				<select class="form-control" id="orderStatusId">
																				<option value="0">--Select Status--</option>
																				<option value="Open">Open</option>
																				<option value="Closed">Closed</option>
																				<option value="Hold">Hold</option>
																				<option value="Cancelled">Cancelled</option>
																			</select>
																		</div>

																		<div class="form-group col-md-2">
																			<label for="type">Supplier State<b style="color: red;">*</b></label>
																			<input type="hidden" id="hiddenSupplierState"/>
																			
																			<select style="width:100%;" id="supplierStateId" onchange="getVenderStateOnPurchaseOrder();resetItemTotalAmount();">
																				<option value="0">--Select Status--</option>
																			</select>
																		</div>
																	</div>
																</form>
															</div>
														</div>
														<div class="container" style="margin-top: 2%;">
															<ul class="nav nav-tabs">
																<li class="active"><a data-toggle="tab"
																	href="#generalInfo">Item Info</a></li>
																<li><a data-toggle="tab" href="#contactInfo">Contact Info</a></li>
																<li><a data-toggle="tab" href="#addressnfo">Address Info</a></li>
																<li><a data-toggle="tab" href="#TermsAndConditionInfo" onclick="getMasterTermsAndConditionOnPO()">Term Conditions</a></li>
																<li><a data-toggle="tab" href="#uploadInfo">Upload Document</a></li>
															</ul>
															<div class="tab-content">
																<!-- general tab starts here -->
																<div id="generalInfo" class="tab-pane fade in active">
																	<div class="panel panel-primary" style="margin-top: 20px; height: 320px ">
																		<div class="panel-body">
																			<form>
																				<div class="row">
																					<div class="col-md-6">
																						<div class="form-group col-md-4">
																							<label for="itemQuantity">Total Item Quantity <b style="color: red;">*</b></label> 
																							<input type="text"	class="form-control tip-focus"	id="totalItemQuantityId"
																								placeholder="Total Item Quantity" readonly="readonly" title="Total Item Quantity" value="0"
																								name="Total Item Quantity">
																						</div>
																						<div class="form-row">
																							<div class="form-group col-md-4">
																								<label for="landLineNo">Total Item Discount	</label> 
																								<input	type="text" class="form-control tip-focus"	id="totalItemDiscountId"
																									placeholder="Total Item Discount" readonly="readonly"	title="Total Item Discount"  value="0"
																									name="Total Item Discount">
																							</div>
																						</div>	
																						<div class="form-row">
																						<div class="form-group col-md-4">
																								<label for="landLineNo">Purchase Quotation No </label> 
																								<input	type="text" class="form-control tip-focus"	id="purchaseQuotationNumberId"
																									placeholder="Purchase Quotation No " readonly="readonly" title="Purchase Quotation No "  value="0"
																									name="Purchase Quotation No ">
																							</div>
																						</div>																																									
																					</div>
																					<div class="col-md-6">
																						<div class="form-group col-md-6">																																									
																							<button onclick="addNewRowInTableByAddButton('ItemInfoTablePO','purchaseorderonplus')" class="btn btn-xs btn-success" type='button' id="btnAddNew" value="+" >+</button>
																							<button type="button"	onclick="removeRowFromTablePurchaseOrder('ItemInfoTablePO','chkMrnItem')" style="margin: 7px;" class="btn btn-xs btn-danger"	value="_">-</button>
																						
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
																									<tr>
																									<th class='col-md-1 center'><div>Select</div></th>
																									<th class='col-md-2 center'><div>Sr.No</div></th>
																									<th class='col-md-2 center'><div>Item Name</div></th>
																									<th class='col-md-2 center'><div>HSN</div></th>
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
																									<th class='col-md-2 center'><div>IGST Amt(Rs) </div></th>
																									<th class='col-md-2 center'><div>Total Amount</div></th>
																									<th class='col-md-2 center'><div>Factor 1</div></th>
																									<th class='col-md-2 center'><div>Factor 2</div></th>
																									<th class='col-md-2 center'><div>Factor 3</div></th>
																									<th class='col-md-2 center'><div>Factor 4</div></th>
																									<th class='col-md-2 center'><div>Ordered Qty</div></th>
																									<th class='col-md-2 center' style='display:none'><div>Pending Qty</div></th>
																									<th class='col-md-2 center' style="display: none"><div>Batch No</div></th>
																									<th class='col-md-2 center' style="display: none"><div>Hsn Name</div></th>
																									<th class='col-md-2 center' style="display: none"></th>
																									<th class='col-md-2 center' style="display: none"></th>
																									<th class='col-md-2 center' style="display: none"></th>
																									<th class='col-md-2 center' style="display: none"></th>
																									<th class='col-md-2 center' style="display: none"></th>
																									<th class='col-md-2 center' style="display: none"></th>
																									<th class='col-md-2 center' style="display: none"></th>
																									<th class='col-md-2 center' style="display: none"></th>
																									<th class='col-md-2 center' style="display: none"></th>
																									<th class='col-md-2 center' style="display: none"></th>
																									<th class='col-md-2 center' style="display: none"></th>
																									<th class='col-md-2 center' style="display: none"></th>
																									<th class='col-md-2 center' style="display: none"></th>
																									<th class='col-md-2 center' style="display: none"></th>
																									<th class='col-md-2 center' style="display: none"></th>
																									
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
																<!-- contact tab starts here -->
																		<div id="contactInfo" class="tab-pane fade">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<div class="container">
																				<div class="row">
																					<div class="col-md-6">
																						<form name="contactInfoDetialsForm" method="post"
																							id="contactFormId">

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
																								<button type="button" class="btn btn-primary"
																									onclick="addDynamicRowsOnPurchaseOrder('ContactInfo')"
																									id="saveContactInfo">Add</button>
																								<button type="button" class="btn btn-primary"
																									id="updateContactInfo" style="display: none;"
																									onclick="updateContactInfoPartyMasterOnPO()">Update</button>
																								<button class="btn btn-danger" type="reset"
																									onclick="resetGRNInfoFields('contactInfo')">Reset</button>
																							</div>
																							<input type="hidden" id="txtItemPurchaseInfoId"
																								value=0 />
																						</form>
																					</div>
																					<div class="col-md-6">

																						<div >
																							<div	style='width: 100%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;'>
																								<!-- <div id="ContactInfoTable"></div> -->

																								<table
																									class='table table-striped table-bordered header-fixed cf'
																									style='width: 120%; height: 100%;'
																									id="contactInfoTablePurchaseOrder">
																									<thead class='cf' style='background: white;'>
																										<tr>
																											<th style='height: 21.5px;'
																												class='col-md-1 center'><div>#</div></th>
																											<th style='height: 21.5px;'
																												class='col-md-2 center'><div>Contact
																													Person</div></th>
																											<th style='height: 21.5px;'
																												class='col-md-2 center'><div>Designation</div></th>
																											<th style='height: 21.5px;'
																												class='col-md-2 center'><div>Address
																												</div></th>
																											<th style='height: 21.5px;'
																												class='col-md-1 center'><div>Edit</div></th>
																											<th style='height: 21.5px;'
																												class='col-md-1 center'><div>Delete</div></th>
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
																							id="addressFormId">

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
																									class="form-control" id="districtFromAddress" onchange="getAllTalukaBydDistictId(this.id)" data-name="getTalukaOnGRN">
																									<option value="">--Select District--</option>

																								</select>
																							</div>
																							<div class="form-group col-md-6">
																								<label for="Taluka">Taluka</label> <input type="hidden" id="hiddenTalukaFromPartyAddress" /><select
																									class="form-control" id="talukaFromAddress" onchange="getAllCityByTalukaId(this.id)"  data-name="getCityOnGRN">
																									<option value="">--Select Taluka--</option>
																								</select>
																							</div>
																							<div class="form-group col-md-6">
																								<label for="City">City</label> <input type="hidden" id="hiddenCityFromPartyMaster" /><select
																									class="form-control" id="cityFromAddress" onchange="getSelectedCityName(this.id)" data-name="getLocalityOnGRN" >
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
																								<button type="button" class="btn btn-primary"
																									onclick="addDynamicRowsOnPurchaseOrder('AddressInfo')" id="saveAddressInfo">Add</button>
																								<button type="button" class="btn btn-primary"
																									id="updateAddressInfo" style="display: none;"
																									onclick="updateAddressInfoPartyMasterOnPO()">Update</button>
																								<button class="btn btn-danger" type="reset"
																									onclick="resetGRNInfoFields('addressInfo')">Reset</button>
																							</div>
																							<input type="hidden" id="txtItemPurchaseInfoId"
																								value=0 />
																						</form>
																					</div>
																					<div class="col-md-6">
																						<div >
																							<div
																								style='width: 100%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;'>
																								<!-- <div id="AddressInfoTable"></div> -->

																								<table
																									class='table table-striped table-bordered header-fixed cf'
																									style='width: 120%; height: 100%;'
																									id="addressInfoTablePurchaseOrder">
																									<thead class='cf' style='background: white;'>
																										<tr>
																											<th style='height: 21.5px;'
																												class='col-md-1 center'><div>#</div></th>
																											<th style='height: 21.5px;'
																												class='col-md-2 center'><div>Comapny</div></th>
																											<th style='height: 21.5px;'
																												class='col-md-2 center'><div>Country</div></th>
																											<th style='height: 21.5px;'
																												class='col-md-2 center'><div>city</div></th>
																											<th style='height: 21.5px;'
																												class='col-md-1 center'><div>Edit</div></th>
																											<th style='height: 21.5px;'
																												class='col-md-1 center'><div>Delete</div></th>
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
																<!-- Term And Condition Start Here tab starts here -->
															<div id="TermsAndConditionInfo" class="tab-pane fade">
																	<div class='panel panel-primary'>
																		<div class="panel-body">
																			<div class="container">
																				<div class="row">
																					<div class="col-md-6">
																						<form name="itemPurchasedetialsForm" method="post" id="TermsAndConditionInfoId">
																							<div class="form-group col-md-6">
																								<label for='Terms And Condition'>Terms And Condition Title</label> <select
																									style="width:100%;" id="termsAndConditionsTitle" onchange="getTermConditionMasterOnPO(this.value)">
																									<option value="0">Select</option>
																									</select> <input type="hidden" id="termsAndConditionsSelectedId" value=0 />
																							</div>
																							<div class="form-group col-md-6">
																								<label for="Branch/IFSC">Terms And Condition</label>
																								<textarea type="text" class="form-control tip-focus"
																										id="termsAndCondition"
																										placeholder="terms and condition"
																										title="Please enter the terms and condition "
																										name="termsAndCondition"></textarea>
																							</div>
																							
																							<div class="form-group col-md-6">
																								<button type="button" class="btn btn-primary" id="saveTermsAndConditionInfo" style=""  onclick="addDynamicRowsOnPurchaseOrder('TermsAndConditionInfo')">Add</button>
																								<button type="button" class="btn btn-primary" id="updateTermsAndConditionInfo" style="display: none;" onclick="updateTermsAndConditionPartyMaster()">Update</button>
																								<button class="btn btn-danger" type="reset"
																									onclick="resetInfoFields('TermsAndConditionInfo')">Reset</button>
																							</div>
																						</form>
																					</div>
																					
																					<div class="col-md-6"
																						style="height: 150px; margin-bottom: 0px; margin-top: 20px;">
																						<div>
																							<div style='height: 120px;overflow-y: scroll; border: 1px solid #436a9d;'>
																							
																								<table  border="1" class="table table-bordered table-striped table-condensed table-responsive" id="TermsAndConditionInfoTable">
																									<thead class='cf' style='background: white;'>
																									<tr><th class='col-md-1 center'><div>#</div></th>
																									<th class='col-md-2 center'><div>Title</div></th>
																									<th class='col-md-2 center'><div>Terms And Conditions</div></th>
																									<th class='col-md-1 center'><div>Edit</div></th>
																									<th class='col-md-1 center'><div>Delete</div></th> </tr></thead>
																									<tbody id="TermsAndConditionInfoTableList">
																									
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
																															
																<!-- Term And Condition tab ends here -->
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
																									<input type="file" id="uploadPoDocument" name="uploadPoDocs" />
																							</div>
																							<div class="form-group col-md-4">
																								<label for="file">Comment<b></b></label>
																								<textarea id="uploadPoComment"></textarea>
																							</div>
																							<div class="form-group col-md-4" style="display: none;" id="poDocumentUploadDivId">
																								<button type="button" value="Upload Document"  class="btn btn-primary editUserAccess"
																									onclick="uploadPurchaseOrderDocuments()">Upload Document</button>
																							</div>
																							<input type="hidden" id="poDocSlaveId"
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
																										<th class="col-md-2 center">View/Delete</th>
																									</tr>
																								</thead>
																								<tbody style="overflow-x: scroll; border: 1px solid #436a9d;"
																									id="uploadedDocumentPoBody"></tbody>
																							</table>
																						</div>
																					</div>
																				</div>
																				<div class="row">
																				<div class="modal fade bs-example-modal-lg" id="viewPoDocModal" tabindex="-1" role="dialog"  aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
																									<iframe id="viewDocumentPo" width="100%" height="300px"></iframe>
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
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<!-- new modal starts here -->
										<div id="purchaseOrderModalId" class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
										  <div class="modal-dialog" role="document">
										    <div class="modal-content">
										      <div class="modal-header">
										        <h5 class="modal-title">Item Master Details</h5>
										      </div>
										      <div class="modal-body">
										       <table id="itemMasterSlaveTableId" cellpadding="0" cellspacing="0"
												border="0"
												class="table table-striped table-bordered" >
												<thead id="ehatTHead">
													<tr>
														<th class="col-md-1 center">#</th>
														<th class="col-md-1 center">Item Name</th>
														<th class="col-md-1 center" style="display: none">Item ID</th>
														<th class="col-md-1 center">HSN Code</th>
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
										<div class="row">
										<div class="col-md-12">
										<div class="container">
										 	<div class="col-sm-2">
											   <div class="panel panel-primary">
											     <div class="panel-body">
											     <div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Remark</label>
													      <div class="col-lg-8">
													          <textarea class="form-control" name="remark" id="purchaseOrderRemarkId" rows="5"></textarea>
													      </div>
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
													<div class="row" style="display: none;">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Octroi</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="addOctroiId" onblur="calculateTotalAdd();" type="text">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Surcharge</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="addSurchargeId" onblur="calculateTotalAdd();" type="text">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Credit Amt.</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="addCreditAmountId" onblur="calculateTotalAdd();" type="text">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Freight</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="addFreightId" onblur="calculateTotalAdd();" type="text">
													      </div>
													  </div>
													</div>
											      </div>
											    </div>
											  </div>
											  <div class="col-sm-2">
											    <div class="panel panel-primary">
											     <div class="panel-heading" id="divEhatContent">Tax Info.</div>
											      <div class="panel-body">
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">GST</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name"  readonly="readonly" id="taxVatId" type="text">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">IGST</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name"  readonly="readonly" id="taxIgstId" type="text">
													      </div>
													  </div>
													</div>
													<div class="row" style="display: none;">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">LBT</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="taxLBTId" type="text" value="0">
													      </div>
													  </div>
													</div>
													<div class="row" style="display: none;">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">CST</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="taxCSTId" type="text" value="0">
													      </div>
													  </div>
													</div>
													<div class="row" style="display: none;">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Ex Vat</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="taxExVatId" type="text" value="0">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Total Tax</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" readonly="readonly" id="taxTotalTaxesId" type="text" value="0">
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
											  <div class="col-sm-2">
											    <div class="panel panel-primary">
											     <div class="panel-heading" id="divEhatContent">Total
													</div>
											      <div class="panel-body">
											      <div>
													<div class="row" style="display:none;">
														<div class="form-group" >
															<label for="name" class="col-lg-4">Total Amount</label>
															<div class="col-lg-8">
																<input class="form-control" name="txtGross"
																	id="itemTotalAmt" disabled="disabled" 
																	maxlength="10" value="0.0" type="text">
															</div>
														</div>
													</div>
												</div>
											      <div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Gross Amount</label>
													      <div class="col-lg-8">
													          <input class="form-control" disabled="disabled" name="name"  value="0"    id="grossAmountId" type="text">
													      </div>
													  </div>
													</div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Less</label>
													      <div class="col-lg-8">
													          <input class="form-control" disabled="disabled" name="name"   value="0"   id="grossLessAmountId" type="text">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Add</label>
													      <div class="col-lg-8">
													          <input class="form-control" disabled="disabled" name="name"  value="0"   id="grossAddAmountId" type="text">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Taxes</label>
													      <div class="col-lg-8">
													          <input class="form-control" disabled="disabled" name="name" id="grossTaxesId"  value="0"   type="text">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Net Amount</label>
													      <div class="col-lg-8">
													          <input class="form-control" disabled="disabled" name="name" id="grossNetAmountId"   value="0"  type="text">
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
							<!-- new modal starts here -->
										<div id="purchaseOrderContactAddressModalId" data-backdrop="static" data-keyboard="false" class="modal" tabindex="-1" role="dialog">
										  <div class="modal-dialog" role="document">
										    <div class="modal-content">
										      <div class="modal-header">
										        <h5 class="modal-title">Party Master Details</h5>
										      </div>
										      <div class="modal-body">
										      <div class="col-md-12" id="purchaseQuote" >
										      <div class="col-md-6">
										       <table id="partymasterSlaveTableId" cellpadding="0" cellspacing="0"
												border="0"
												class="datatable table table-striped table-bordered" >
												<thead id="ehatTHead">
													<tr>
														<th class="col-md-1 center">#</th>
														<th class="col-md-1 center">Select</th>
														<th class="col-md-1 center">State</th>
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
										        <button type="button" class="btn btn-primary" onclick="setPartyModalInfoToTableOnPurchaseOrder();removeDuplicateStatesPurchaseOrder();" >Save changes</button>
										        <button type="button" class="btn btn-secondary" onclick="closepartyMasterDetailsModalOnPurchaseOrder()">Close</button>
										      </div>
										      </div>
										    </div>
										  </div>
										</div>
										<!-- new modal ends here -->
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
														<th><label class="TextFont">Select Charges <b style="color: red;"></b>
														</label></th>
														<th><label class="TextFont">Add Charges<b style="color: red;">*</b>
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
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="purchaseOrderTableId" cellpadding="0" cellspacing="0"
																			border="0"
																			class="table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Created Date</th>
																					<th class="col-md-1 center">Purchase Order ID</th>
																					<th class="col-md-1 center">Party Name</th>
																					<th class="col-md-1 center">Edit</th>
																					<th class="col-md-1 center">Delete</th>
																					<th class="col-md-1 center">Print</th>
																				</tr>
																			</thead>
																			<tbody id="purchaseOrderTableBodyId">
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
			
			/* $('#orderDateId').datepicker({
				autoclose : true
			}); */
			new JsDatePick({
				useMode : 2,
				target : "orderDateId",
				yearsRange : [ 1920, 2099 ],
				limitToToday : false,
				dateFormat : "%Y-%m-%d",
				imgPath : "../img/",
				weekStartDay : 1,
			});
			
			new JsDatePick({
				useMode : 2,
				target : "deliveryDateId",
				yearsRange : [ 1920, 2099 ],
				limitToToday : false,
				dateFormat : "%Y-%m-%d",
				imgPath : "../img/",
				weekStartDay : 1,
			});
			
			$('#contactDateofbirthPOId').datepicker({
				autoclose : true
			});
			getPurchaseQuotationOnPurchaseOrder("PO");
			addNewRowInTablePurchaseOrder('ItemInfoTablePO','purchaseorder');
			getNextIdNew();
			 getAllStateMaster();
			 $("#supplierStateId").select2();
			 $("#stateName").select2();
			 $("#distictName").select2();
			 $("#talukaName").select2();
			 $("#cityName").select2();
			 $("#countryFromAddress").select2();

		});
		onload = function() {
			getAllPurchaseOrderRecordsDetails();
			getPurchaseOrderSeries();
		}
		</script>
		<input type="hidden" id="partyMasterId" value="0">
		<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="totaltblsize" value="0">
		<input type="hidden" id="partGstNo" value="0">
		<input type="hidden" id="userState" value="<%=session.getAttribute("userState")%>">	
		<input type="hidden" id="hiddenVenderStatePO" value="0">
		<input type="hidden" id="RowCount" value="0">

		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	<!-- include js for development -->
      <script type="text/javascript" src="js/ehat_inventory.js"></script>
      <!-- include js for development of po -->
      <script type="text/javascript" src="js/ehat_inv_purchase_order.js"></script>
</body>
</html>
