<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>

<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Purchase Quotation  Master</title>
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
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
			String todays_date = formatter.format(currentDate.getTime());
			

			Date date = new Date();
			java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("dd/MM/yyyy h:mm:ss a");
			String formattedDate = sdf.format(date);
			System.out.println(formattedDate); // 12/01/2011 4:48:16 PM
			//	Date dtHMS = new Date();

			//	System.out.print(datewithHMS.getHours()+":"+datewithHMS.getMinutes()+":"+datewithHMS.getSeconds());
			//	String Time = dtHMS.getHours() + ":" + dtHMS.getMinutes() + ":"	+ dtHMS.getSeconds();
			//System.out.print("aaaaaa :" + Time);
		%>
		<%  user_name = (String) session.getAttribute("userName"); %>
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
												href="inv_purchase_quotation_master.jsp">Purchase Quotation  Master</a></li>
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
										<div class="input-group" id="quotationMasterByName">
											<input  class="form-control" placeholder="Quotation Id / Party Name" id="seachPartyMaster"  type="text" 
												 onkeyup="getQuatationMaster(this.id)" data-name="formMaster">
											<span class="input-group-btn">
												<button class="btn btn-primary"
													style="height: 25px; margin-bottom: 10px" type="button" onclick="getPUrchaseMasterById()">
													<span class="fa fa-search" aria-hidden="true" > </span>
													Search!
												</button>
											</span>
										</div>
									</div>
									<div class="col-md-4">
										<button class="btn btn-xs btn-info pull-left" type='button' id="addPurchaseQuotation"
											data-toggle="modal" data-target="#itemMasterModal">
											<i class="fa fa-plus"></i> Add New Quotation
										</button>
									</div>
								</div>
							</div>

							<!-- modal starts here -->
							<div class="modal fade" id="itemMasterModal" tabindex="-1" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="itemMasterModalLabel"
								aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">Purchase Quotation  Master
											
											<!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button> -->
											<div class="pull-right" style="margin-right: 15px;">
												<button type="button" class="btn btn-primary"
													onclick="savePurchaseQuotationMaster()">Save</button>
												<button type="button" class="btn btn-danger"
													onclick="closePurchaseQuationPopUp('inv_purchase_quotation_master.jsp');" data-dismiss="modal">Close</button>
											</div>
											</h5>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Purchase Quotation 
																</div>
															<div class="panel-body">
																<form id="financialFormId"  onsubmit="return false">
																	<div class="form-group col-md-2" >
																		<label for="partyId">Quotation No</label>
																		 <input type="text"	placeholder="Quotation No"
																			class="form-control tip-focus" id="quotationNo"
																			readonly="true" name="Quotation No">
																	</div>
																	<div class="form-group col-md-2">
																		<label for="partyName">Party Mobile No<b
																			style="color: red;">*</b></label> 
																		<input type="text"	class="form-control tip-focus" id="mbNo" placeholder="Enter Mobile No"
																			title="Please Enter Mobile No" name="mobileNumber" maxlength="11" readonly="readonly">
																	</div>
																	<div class="form-row">

																		<div class="form-group col-md-2">
																			<label for="partyName">Refernce  No<b
																			style="color: red;">*</b></label> 
																		<input type="text"	class="form-control tip-focus" id="referenceNo" placeholder="Enter Reference No"
																			title="Please enter  Reference No" name="referenceNumber">
																		</div>

																		<div class="form-group col-md-2" >
																			<label for="QuatationDate">Quotation Date<b
																				style="color: red;">*</b></label> 
																				<input id="quotationDate" class="form-control input-SmallText"	type="text"	 readonly="readonly" name="date" placeholder="Date"
																			value="<%=todays_date%>">
																		</div>

																		<div class="form-group col-md-2">
																			<label for="Deleviry">Delivery Date</label>
																			 <input id="deliveryDate" class="form-control input-SmallText"	type="text"	 readonly="readonly" name="date" placeholder="Date"
																			value="<%=todays_date%>">
																		</div>

																		<div class="form-group col-md-2">
																			<label for="sAddress">Party Address</label> 
																			<textarea type="text" class="form-control" required="true"	style="width: 180px; height: 30px; margin-left: -18px;"	id="supplierAddress" placeholder="Address" readonly="readonly"></textarea>
																		</div>
																		<div class="form-group col-md-2" id="partyMasterByName">
																			<label for="parent">Party Name<b	style="color: red;">*</b></label> 
																			<input type="text"	class="form-control tip-focus"	id="supplierName" autocomplete="off"
																				placeholder="Enter Supplier name " title="Please enter Supplier name" onkeyup="inventoryPartyMasterAutoSuggestion(this.id)"
																				name="supplier" data-name="SupplierNAme">
																		</div>

																		<div class="form-group col-md-2">
																			<label for="status">Quotation Series<b style="color: red;">*</b></label> 
																			<select
																				class="form-control" id="quotationSeries">
																				<option value="0">--Select Status--</option>
																				<option value="1">Activate</option>
																				<option value="2">DeActivate</option>
																			</select>
																		</div>

																		<div class="form-group col-md-2">
																			<label for="priority">Quotation status<b
																				style="color: red;">*</b></label>
																				<select
																				class="form-control" id="quotationStatus">
																				<option value="0">--Select Status--</option>
																				<option value="1">Open</option>
																				<option value="2">Closed</option>
																				<option value="3">Hold</option>
																				<option value="4">Cancelled</option>
																			</select>
																		</div>

																		<div class="form-group col-md-2">
																			<label for="type">Party State<b style="color: red;">*</b></label>
																			<select class="form-control" id="supplierState" onchange="getPartyState()">
																				<option value="0">--Select Type--</option>																				
																			</select>
																		</div>
																		<div class="form-group col-md-2">
																			<label for="masterServiceTaxNo">Quotation Expiry Date</label>
																			 <input id="quotationExDate" class="form-control input-SmallText"	type="text"	 readonly="readonly" name="date" placeholder="Date"
																			value="<%=todays_date%>">
																		</div>
																	</div>
																	<!-- <span class="badge badge-primary">Item No</span> -->
																	<!-- <div class="form-group col-md-2">
																		<button type="button" class="btn btn-primary"
																			style="margin-top: 9%;">
																			Quotation No. <span class="badge badge-light">0</span>
																		</button>
																	</div> -->
																</form>
															</div>
														</div>
														<div class="container" style="margin-top: 2%;">
															<ul class="nav nav-tabs">
																<li class="active"><a data-toggle="tab"
																	href="#generalInfo">Item Info(F2)</a></li>
																<li><a data-toggle="tab" href="#contactInfo">Contact Info(F4)</a></li>
																<li ><a data-toggle="tab" href="#addressnfo">Address Info(F5)</a></li>
																<li><a data-toggle="tab" href="#TermsAndConditionInfo" onclick="getMasterTermsAndConditionOnPQ()"> Term Conditions</a></li>
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
																						<div class="form-group col-md-6">
																							<label for="itemQuantity">Total Item Quantity <b style="color: red;">*</b></label> 
																							<input type="text"	class="form-control tip-focus"	id="totalItemId"
																								placeholder="Total Item Quantity" title="Total Item Quantity" readonly="readonly"
																								name="Total Item Quantity">
																						</div>
																						<div class="form-row">
																							<div class="form-group col-md-6">
																								<label for="landLineNo">Total Item Discount	</label> 
																								<input	type="text" class="form-control tip-focus"	id="totalDiscountId"
																									placeholder="Total Item Discount"	title="Total Item Discount"
																									name="Total Item Discount" readonly="readonly">
																							</div>
																							
																							
																																													
																													
																							<!-- <div class="form-group col-md-6">
																								<button type="button" class="btn btn-primary" onclick="toCreateTr()">Add</button>
																								<button class="btn btn-danger" type="reset"	onclick="toRemoveTr('RowCount')">Reset</button>
																							</div> -->
																						</div>																					
																																									
																					</div>
																					<div class="col-md-6">
																						<div class="form-group col-md-6">																																									
																							<button onclick="addNewRowInTableForQuotation('itemInfoTable','purchasequotationOnplus')" class="btn btn-xs btn-success" type='button' id="btnAddNew" value="+" >+</button>
																							<button type="button"	onclick="removeRowFromTableForQuotation('itemInfoTable','chkMrnItem')"	style="margin: 7px;" class="btn btn-xs btn-danger"	value="_">-</button>
																						
																						</div>																					

																					</div>
																				</div>
																				
																<!--------------------------table Start-------------------------->
																				<div class="row">
																							<div class="form-row">
																							<div style="height: 100px; margin-left: 2%;" >
																								<div style='height: 180px;overflow-y: scroll; border: 1px solid #436a9d;' >
																									<table border="1" class="table table-bordered table-striped table-condensed table-responsive"  id="itemInfoTable" >
																									<thead class='cf' style='background: white;'>
																									<tr><th  class='col-md-2 center'><div>Select</div></th>
																									<th class='col-md-2 center'><div>Sr.No</div></th>
																									<th class='col-md-2 center'><div>Item Name</div></th>
																									<th class='col-md-2 center'><div>Item Quantity</div></th>
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
																									<th class='col-md-2 center' style="display: none"><div>Pending Qty</div></th>
																									<th class='col-md-2 center'><div>Item Unit</div></th>
																									<th class='col-md-2 center'><div>Total Amount</div></th>
																									<th class='col-md-2 center' style="display: none"><div>Batch No</div></th>
																									<th class='col-md-2 center' style="display: none"><div>Hsn No</div></th>
																									<th class='col-md-2 center' style="display: none"><div>Item Master Id</div></th>
																									<th class='col-md-2 center' style="display: none"><div></div></th>
																									</tr>
																																																	
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
																									name="phoneOne" maxlength="10"
																									onkeypress="return validateNumOnly(event)">
																							</div>

																							<div class="form-group col-md-6">
																								<label for="phoneSecond">Phone-2</label> <input
																									type="tel" class="form-control tip-focus"
																									id="contactPhoneSecond"
																									placeholder="Enter second phone no"
																									title="Please enter the second phone no "
																									name="phoneSecond" maxlength="10"
																									onkeypress="return validateNumOnly(event)">
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
																									onclick="addDynamicRowsOnPurchaseQuotation('ContactInfo')"
																									id="saveContactInfo">Add</button>
																								<button type="button" class="btn btn-primary"
																									id="updateContactInfo" style="display: none;"
																									onclick="updateContactInfoPartyMasterOnPQ()">Update</button>
																								<button class="btn btn-danger" type="reset"
																									onclick="resetGRNInfoFields('contactInfo')">Reset</button>
																							</div>
																							<input type="hidden" id="txtItemPurchaseInfoId"
																								value=0 />
																						</form>
																					</div>
																					<div class="col-md-6">

																						<div>
																							<div
																								style='width: 100%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;'>
																								<!-- <div id="ContactInfoTable"></div> -->

																								<table
																									class='table table-striped table-bordered header-fixed cf'
																									style='width: 120%; height: 100%;'
																									id="contactInfoTablePurchaseQuotation">
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
																									onclick="addDynamicRowsOnPurchaseQuotation('AddressInfo')" id="saveAddressInfo">Add</button>
																								<button type="button" class="btn btn-primary"
																									id="updateAddressInfo" style="display: none;"
																									onclick="updateAddressInfoPartyMasterOnPQ()">Update</button>
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
																									id="addressInfoTablePurchaseQuotation">
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
																<!-- term and condition tab starts here -->
																<div id="TermsAndConditionInfo" class="tab-pane fade">
																	<div class='panel panel-primary'>
																		<div class="panel-body">
																			<div class="container">
																				<div class="row">
																					<div class="col-md-6">
																						<form name="itemPurchasedetialsForm" method="post" id="TermsAndConditionInfoId">
																							<div class="form-group col-md-6">
																								<label for='Terms And Condition'>Terms And Condition Title</label> <select
																									style="width:100%;" id="termsAndConditionsTitle" onchange="getTermConditionMasterOnPQ(this.value)">
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
																								<button type="button" class="btn btn-primary" id="saveTermsAndConditionInfo" style=""  onclick="addDynamicRowsOnPurchaseQuotation('TermsAndConditionInfo')">Add</button>
																								<button type="button" class="btn btn-primary" id="updateTermsAndConditionInfo" style="display: none;" onclick="updateTermsAndConditionPartyMasterPQ()">Update</button>
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
															<!--  term condition tab ends here -->
															
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
																									<input type="file" id="uploadPqDocument" name="uploadPqDocs" />
																							</div>
																							<div class="form-group col-md-4">
																								<label for="file">Comment<b></b></label>
																								<textarea id="uploadPqComment"></textarea>
																							</div>
																							<div class="form-group col-md-4" style="display: none;" id="pqDocumentUploadDivId">
																								<button type="button" value="Upload Document"  class="btn btn-primary editUserAccess"
																									onclick="uploadPurchaseQuotationDocuments()">Upload Document</button>
																							</div>
																							<input type="hidden" id="pqDocSlaveId"
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
																									id="uploadedDocumentPqBody"></tbody>
																							</table>
																						</div>
																					</div>
																				</div>
																				<div class="row">
																				<div class="modal fade bs-example-modal-lg" id="viewPqDocModal" tabindex="-1" role="dialog"  aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
																									<iframe id="viewDocumentPq" width="100%" height="300px"></iframe>
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
									
										<!-- new modal ends here -->
										<!-- new modal starts here -->
										<div id="purchasequotationModalId" class="modal" tabindex="-1" data-backdrop="static" data-keyboard="false" role="dialog">
										  <div class="modal-dialog" role="document">
										    <div class="modal-content">
										      <div class="modal-header">
										        <h5 class="modal-title">Party Master Details</h5>
										      </div>
										      <div class="modal-body" style="width:100%; height:350px;">
										      <div class="col-md-12" id="purchaseQuote" >
										      <div class="col-md-6">
										      <p style="color: blue;">Party Address Details</p>
											       <table id="partymasterSlaveTableId" cellpadding="0" cellspacing="0"
													border="0"
													class="datatable table table-striped table-bordered" >
													
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
										        <button type="button" class="btn btn-primary" onclick="setPartyModalInfoToTableOnPurchaseQuotation();removeDuplicateStatesPurchaseQuotation()" >Save changes</button>
										        <button type="button" class="btn btn-secondary" onclick="closepartyMasterDetailsModal()">Close</button>
										      </div>
										      </div>
										    </div>
										  </div>
										</div>
										<!-- new modal ends here -->
										<!-- Item modal Start here -->
										<div id="generateItemInfo" class="modal" tabindex="-1" role="dialog">
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
												class="table table-striped table-bordered" >
												<thead id="ehatTHead">
													<tr>
														<th class="col-md-1 center">#</th>
														<th class="col-md-1 center">Item Name</th>
														<th class="col-md-1 center">HSN Code</th>
														<th class="col-md-1 center" style="display: none">Item ID</th>
														<th class="col-md-1 center">Item Quantity</th>
														<th class="col-md-1 center">unit Price</th>
														<!-- <th class="col-md-1 center">GST/IGST</th> -->
														<th class="col-md-1 center">CGST Rate</th>
														<th class="col-md-1 center">SGST Rate</th>
														<th class="col-md-1 center">Tax Name</th>
														<th class="col-md-1 center">Gst Rate</th>
														<th class="col-md-1 center">Fact 1</th>
														<th class="col-md-1 center">Fact 2</th>
														<th class="col-md-1 center">Fact 3</th>
														<th class="col-md-1 center">Fact 4</th>
														<th class="col-md-1 center" style="display: none">UOM Unit 1</th>
														<th class="col-md-1 center" style="display: none">UOM Unit 2</th>
														<th class="col-md-1 center" style="display: none">UOM Unit 3</th>
														<th class="col-md-1 center" style="display: none">UOM Unit 4</th>
													</tr>
												</thead>
												<tbody id="itemMasterSlaveRecordListOnMRNGenerate">
												</tbody>
											 </table>
										      </div>
										      <div class="modal-footer">
										        <button type="button" class="btn btn-primary" onclick="setModalInfoToPurchaseQuotationItemSalve()" >Save changes</button>
										        <button type="button" class="btn btn-secondary" onclick="closeItemMasterPopUpModal()">Close</button>
										      </div>
										    </div>
										  </div>
										</div>
										<!-- Item modal End here -->
										
										
										
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
													          <input class="form-control" name="txtSplDisc" id="txtSplDisc" type="text"
													          value="0" placeholder="Spl.Disc"	onblur="isFloatingPoint('txtSplDisc'),calculatSpeDisct();">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Debit Amt.</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="txtdebitAmt1" id="txtdebitAmt1" type="text"
													          placeholder="Debit Amt" maxlength="10" value="0"		onblur="isFloatingPoint('txtdebitAmt1'),calculateTotalLess();">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">CD %</label>
													      <div class="col-lg-4">
													          <input class="form-control" name="txtCD1" id="txtCD1" type="text"
													          value="0"  onblur="isFloatingPoint('txtCD1'),calculateCDAmt();">
													      </div>
													       <div class="col-lg-4">
													          <input class="form-control" name="txtCDAmt" id="txtCDAmt" type="text" placeholder="C.DAmount" maxlength="10" readonly="true"
																	onclick="calculateTotalLess(this.value);" value="0">
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
													          <input class="form-control" type="text" id="txtOctroi"
																	name="txtOctroi" class="form-control input-SmallText"
																	placeholder="Octroi" maxlength="10"
																	onblur="isFloatingPoint('txtOctroi'),calculateTotalAdd();"
																	 value="0" >
													      </div>
													  </div>
													</div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Surcharge</label>
													      <div class="col-lg-8">
													          <input class="form-control" type="text" id="txtSurcharge"
																	name="txtSurcharge"
																	class="form-control input-SmallText"
																	placeholder="Surcharge" maxlength="10"
																	onblur="isFloatingPoint('txtSurcharge'),calculateTotalAdd();"
																	 value="0" >
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Credit Amt.</label>
													      <div class="col-lg-8">
													          <input class="form-control" type="text" id="txtCreditAmt"
																	name="txtCreditAmt"
																	class="form-control input-SmallText"
																	placeholder="Credit Amt" maxlength="10"
																	onblur="isFloatingPoint('txtCreditAmt'),calculateTotalAdd();"
																	 value="0">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Freight</label>
													      <div class="col-lg-8">
													          <input class="form-control" type="text" id="txtFreight"
																	name="txtFreight" class="form-control input-SmallText"
																	placeholder="Freight" maxlength="10"
																	onblur="isFloatingPoint('txtFreight'),calculateTotalAdd();"
																	 value="0">
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
													    <label for="name" class="col-lg-4">GST</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="txtVat" type="text" readonly="readonly" value="0.0" placeholder="VAT">
													      </div>
													  </div>
													</div>
													</div>
													
													 <div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">IGST</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id=txtigstVat type="text" readonly="readonly" value="0.0" placeholder="VAT">
													      </div>
													  </div>
													</div>
													</div>
													
													
													<div class="row" style="display: none;">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">LBT</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="txtlbt" id="txtlbt" type="text" readonly="readonly" value="0.0" placeholder="LBT">
													      </div>
													  </div>
													</div>
													<div class="row" style="display: none;">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">CST</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="txtcst" id="txtcst" type="text" readonly="readonly" value="0.0" placeholder="cst">
													      </div>
													  </div>
													</div>
													<div class="row" style="display: none;">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Ex Vat</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="txtExVat" id="txtExVat" type="text" readonly="readonly" value="0.0" placeholder="Ex vat">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Total Tax</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="txtTotalVat" type="text" readonly="readonly" value="0.0" placeholder="Total Tax">
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
											     <div class="panel-heading" id="divEhatContent">Total
													</div>
											      <div class="panel-body">
											      <div ">
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
											      
											      <div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Gross Amount</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="txtGross" id="txtGross" type="text"    placeholder="Gross Amount"     readonly="readonly" value="0.0">
													      </div>
													  </div>
													</div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Less</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="txtLess" id="txtLess" type="text"  placeholder="Less"    readonly="readonly" value="0.0">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Add</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="txtAdd" id="txtAdd" type="text" placeholder="add" readonly="readonly" value="0.0">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Taxes</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="textVat" id="textVat" type="text" placeholder="Taxses" readonly="readonly" value="0.0">
													      </div>
													  </div>
													</div>
													<div class="row">
													  <div class="form-group">
													    <label for="name" class="col-lg-4">Net Amount</label>
													      <div class="col-lg-8">
													          <input class="form-control" name="name" id="txtNetAmt" type="text" placeholder="Net Amount" readonly="readonly" value="0.0">
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
											<!-- <button type="button" class="btn btn-primary"
												onclick="savePurchaseQuotationMaster()">Save</button>
											<button type="button" class="btn btn-secondary"
												onclick="closePurchaseQuationPopUp('inv_purchase_quotation_master.jsp');" data-dismiss="modal">Close</button> -->
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
											<li class="active"><a data-toggle="tab"
												href="#ProcessdQuotation" id="processdQuotation"
												onclick="openProcessdQuotation('all');"><span
													class="hidden-inline-mobile"> Processed Quotation</span></a></li>
											<li><a data-toggle="tab" href="#ProcessdQuotation"
												id="ExpiredQuotation" onclick="openExpiryQuotation('expired');"><span
													class="hidden-inline-mobile"> Expired Quotation</span></a></li>
										</ul>
								</div>							
							
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
																<div class="panel panel-primary" style="margin-top: 20px">
																	<div class="panel-heading" id="divEhatContent">Purchase Quotation Table</div>
																	<div class="panel-body" style="overflow-y: scroll;height: 300px">
																		<table id="ehatTable" class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Quotation Id</th>
																					<th class="col-md-1 center">Vendor Name</th>
																					<th class="col-md-1 center">Quotation Expiry Date</th>
																					<th class="col-md-1 center">Edit</th>
																					<th class="col-md-1 center">Delete</th>
																					<th class="col-md-1 center">Print</th>
																					<th class="col-md-1 center">Approval</th>
																				</tr>
																			</thead>
																			<tbody id="purchaseQuotationInfoList">
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
							<div class="row">
							<!-- User Name and password for Approve Incharge  Date 18 jan 2016   Author:sudhir -->
									<div id="userNameandpasswordPopUp" class="modal fade in" tabindex="-1"
										role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
										<div class="modal-dialog" style="width: 500px;">
											<div class="modal-content">
												<div class="modal-header">
													<div class="box-title">
														<h4>
															Password Verification
														</h4>
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
																			Enter User Name !!</label> <input type="text"
																			id="userName" class="form-control"
																			placeholder="User Name">
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
													<input type="hidden" id="callFrom">
													<input type="button" value="Submit" class="btn btn-primary"	onclick='checkUserValid()'>
														<button type="button" class="btn btn-default"
															data-dismiss="modal">Close</button>
													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- ENd  User Name and password for Approve Incharge  Date 18 jan 2016   Author:sudhir -->
							
							</div>
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

		<%@include file="inv_footer.jsp"%>
		
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

				new JsDatePick({
					useMode : 2,
					target : "contactDateofbirth",
					/* dateFormat:"%d-%M-%Y", */
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					/* cellColorScheme:"beige", */
					dateFormat : "%d/%m/%Y",
					imgPath : "../img/",
					weekStartDay : 1,
				});
				
				$('#quotationDate').datepicker({
					autoclose : true
				});
				
				$('#quotationExDate').datepicker({
					autoclose : true
				});
				
				$('#deliveryDate').datepicker({
					autoclose : true
				});
				
				
				$("#content").off('click', "#addPurchaseQuotation");
				$("#content").on('click', "#addPurchaseQuotation", function(){
					getNextIdNew();
					
				});

			});
		</script>
		<script>
			onload = function() {
				//getAllStateMasterForPurchaseQuotation();
				getAllPurchaseQuotationMaster("all");
				//getAllInventoryTermAndCondition();
				addNewRowInTableForQuotation('itemInfoTable','purchasequotation');
				getNextIdNew();
				 getAllStateMaster();
				 $("#supplierStateId").select2();
				 $("#stateName").select2();
				 $("#distictName").select2();
				 $("#talukaName").select2();
				 $("#cityName").select2();
				 $("#countryFromAddress").select2();
				
			}
		</script>
		<input type="hidden" id="purchaseQtMasterId" value="0">
		<input type="hidden" id="contactInfoId" value="0">
		<input type="hidden" id="addressInfoId" value="0">
		<input type="hidden" id="termInfoId" value="0">
		<input type="hidden" id="hiddenpartyMasterId" value="0">
		<input type="hidden" id="RowCount" value="0">
		<input type="hidden" id="totaltblsize" value="0">
		<input type="hidden" id="hiddensupplierstate" value="0">
		<input type="hidden" id="callFrom" value="fromnew">
		<input type="hidden" id="callFromAuto" value="all">
		<input type="hidden" id="partyGstNo" value="0">
		<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="userState" value="<%=session.getAttribute("userState")%>">
		<input type="hidden" id="hiddenRadioButtonIndex" />
		<input type="hidden" id="hiddenIndex" />
		
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	<script type="text/javascript" src="js/ehat_inventory.js"></script>
	<script type="text/javascript" src="js/inv_purchase_quotation.js"></script>
	
</body>
</html>

