<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>

<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Purchase Return Master</title>
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
<!-- bootstrap datepicker -->
<link rel="stylesheet" href="ehat-design/datepicker/datepicker3.css">
<link rel="stylesheet" type="text/css"
	href="css/inventoryDatepicker/css/jsDatePick_ltr.css" />


<!-- include js for development -->
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/ExtraJs/inventory_Purchase_Return.js"></script>
<script type="text/javascript" src="js/inv_purchase_return.js"></script>

<style>
.panel-default {
	border-color: #a8bc7b;
}

table,th {
	text-align: center;
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
												href="inv_purchase_return_master.jsp">Purchase Return
													Master</a></li>
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
											<input type="search"
												class="typeahead form-control input-SmallText"
												id="seachPurchaseReturn"
												onkeyup="getPurchaseReturnMaster(this.id)" /> <span
												class="input-group-btn">
												<button class="btn btn-primary"
													style="height: 25px; margin-bottom: 10px" type="button"
													onclick="getPurchaseReturnMasterById()">
													<span class="fa fa-search" aria-hidden="true"> </span>
													Search!
												</button>
											</span>
										</div>
									</div>
									<div class="col-md-4">
										<button class="btn btn-xs btn-info pull-left" type='button' 
											data-toggle="modal" data-target="#itemMasterModal" onclick="fetchPurchaseReturn()" id="purchaseReturn">
											<i class="fa fa-plus"></i> Add New Record
										</button>
										
										<!-- Added By Dayanand For  To export  data in Excel  Date(29-1-2020)-->
												<div style="font-weight: bold;" class="col-md-1-1">
														<button id="btnExport" class="btn btn-xs btn-warning" value="Excel"  title="" data-placement="left" data-toggle="tooltip" data-original-title="Excel" style="margin-left: 10px">
																			<!-- <i class="fa fa-file"></i> --> Export To Excel
																	</button>
																	<!-- following code for Excel sheet -->
																	<script type="text/javascript">
																	$("[id$=btnExport]").click(function(e) {
																	    window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$=returnMasterInfo]').html()));
																	    e.preventDefault();
																	});
																	
																	</script>					
												</div>
												<!-- End -->
										
										
									</div>
								</div>
							</div>

							<!-- modal starts here -->
							<div class="modal fade" id="itemMasterModal" tabindex="-1"
								role="dialog" aria-labelledby="itemMasterModalLabel"
								aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">Purchase
												Return Master
  											<div class="pull-right" style="margin-right: 15px;">
												<button type="button" class="btn btn-primary" onclick="savePurchaseReturnMaster()">Save</button>
												<button type="button" class="btn btn-primary btn-danger"	onclick="closeItemPurchaseDetailsModal()">Close</button>
											<!-- <button type="button" class="close" data-dismiss="modal"
												aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button> -->
											</div>
										</h5>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Purchase
																Return</div>
															<div class="panel-body">
																<form id="financialFormId" onsubmit="return false">
																	<div class="form-group col-md-2">
																		<label for="pureturnId">Return Id</label> <input
																			type="text" placeholder="Return Id"
																			class="form-control tip-focus" id="returnId"
																			readonly="true" name="Return Id">
																	</div>
																	<div class="form-group col-md-2">
																		<label for="partyName">Mobile No<b
																			style="color: red;">*</b></label> <input type="text"
																			class="form-control tip-focus" id="mbNo"
																			placeholder="Enter Mobile No"
																			title="Please Enter Mobile No" name="mobileNumber"
																			maxlength="11">
																	</div>
																	<div class="form-row">

																		<div class="form-group col-md-2">
																			<label for="partyName">Refernce No<b
																				style="color: red;">*</b></label> <input type="text"
																				class="form-control tip-focus" id="referenceNo"
																				placeholder="Enter Reference No"
																				title="Please enter  Reference No"
																				name="referenceNumber">
																		</div>

																		<div class="form-group col-md-2">
																			<label for="QuatationDate">Return Date<b
																				style="color: red;">*</b></label> <input id="returnDate"
																				class="form-control input-SmallText" type="text"
																				readonly="readonly" name="date" placeholder="Date"
																				value="<%=todays_date%>">
																		</div>

																		<div class="form-group col-md-2">
																			<label for="Deleviry">Delivery Date</label> <input
																				id="deliveryDate"
																				class="form-control input-SmallText" type="text"
																				readonly="readonly" name="date" placeholder="Date"
																				value="<%=todays_date%>">
																		</div>

																		<div class="form-group col-md-2">
																			<label for="sAddress">Supplier Address</label>
																			<textarea type="text" class="form-control"
																				required="true"
																				style="width: 180px; height: 30px; margin-left: -18px;"
																				id="supplierAddress" placeholder="Address"></textarea>
																		</div>
																		<div class="form-group col-md-2"
																			id="partyMasterByName">
																			<label for="parent">Supplier Name<b
																				style="color: red;">*</b></label> <input type="text"
																				class="form-control tip-focus" id="supplierName"
																				placeholder="Enter Supplier name "
																				title="Please enter Supplier name"
																				onkeyup="inventoryPartyMasterAutoSuggestion(this.id)"
																				name="supplier" data-name="SupplierNAme">
																		</div>

																		<div class="form-group col-md-2">
																			<label for="status">Get purchase Invoice<b
																				style="color: red;">*</b></label> <select
																				style="width:100%;" id="purchaseInvoiceId"  onchange="viewGoodReceiptNote2()"
																				><!-- onchange="viewPurchaseInvoiceMasterDetails()" -->
																				<option value="0">--Select Status--</option>

																			</select>
																		</div>


																		<div class="form-group col-md-2">
																			<label for="status">Return Series<b
																				style="color: red;">*</b></label> 
																				<input type="text"	class="form-control tip-focus"	id="returnSeriesId" 
																				name="supplier" value="" readonly="readonly"/> 
																				
																					
																				
																				<!-- <div class="col-md-8 col-sm-5 col-xs-6">
																					<input type="text"  class="form-control tip-focus"
																						id="grnSeries" placeholder="GRN Series" name="grnSeries" readonly="">
																				</div> -->
																				<!-- <select
																					class="form-control" id="returnSeries">
																				
																				<option value="0">--Select Status--</option>
																				<option value="1">Activate</option>
																				<option value="2">DeActivate</option>
																			</select> -->
																		</div>

																		<div class="form-group col-md-2">
																			<label for="priority">Return status<b
																				style="color: red;">*</b></label> <select
																				class="form-control" id="returnStatus">
																				<option value="0">--Select Status--</option>
																				<option value="1">Open</option>
																				<option value="2">Closed</option>
																				<option value="3">Hold</option>
																				<option value="4">Cancelled</option>
																			</select>
																		</div>

																		<div class="form-group col-md-2">
																			<label for="type">Supplier State<b
																				style="color: red;">*</b></label> <select
																				class="form-control" id="supplierState2">
																				<option value="0">--Select Type--</option>
																			</select>
																		</div>
																		<div class="form-group col-md-2"
																			id="partyMasterByName">
																			<label for="parent">Outward No<b
																				style="color: red;">*</b></label> <input type="text"
																				class="form-control tip-focus" id="outWardNo"
																				placeholder="Outward No " title="Outward No"
																				name="Outward No" data-name="Outward No">
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
																	href="#generalInfo">Item Info</a></li>
																<li><a data-toggle="tab" href="#contactInfo">Contact
																		Info</a></li>
																<li><a data-toggle="tab" href="#addressnfo">Address
																		Info</a></li>
																<!-- <li><a data-toggle="tab" href="#uploadDetails">Payment and Term Conditions</a></li> -->
															</ul>
															<div class="tab-content">
																<!-- general tab starts here -->
																<div id="generalInfo" class="tab-pane fade in active">
																	<div class="panel panel-primary"
																		style="margin-top: 20px; height: 320px">
																		<div class="panel-body">
																			<form>
																				<div class="row">
																					<div class="col-md-6">
																						<div class="form-group col-md-6">
																							<label for="itemQuantity">Total Item
																								Quantity <b style="color: red;">*</b>
																							</label> <input type="text"
																								class="form-control tip-focus" id="totalItemId"
																								placeholder="Total Item Quantity"
																								title="Total Item Quantity"
																								name="Total Item Quantity">
																						</div>
																						<div class="form-row">
																							<div class="form-group col-md-6">
																								<label for="landLineNo">Total Item
																									Discount </label> <input type="text"
																									class="form-control tip-focus"
																									id="totalDiscountId"
																									placeholder="Total Item Discount"
																									title="Total Item Discount"
																									name="Total Item Discount">
																							</div>




																							<!-- <div class="form-group col-md-6">
																								<button type="button" class="btn btn-primary" onclick="toCreateTr()">Add</button>
																								<button class="btn btn-danger" type="reset"	onclick="toRemoveTr('RowCount')">Reset</button>
																							</div> -->
																						</div>

																					</div>
																					<div class="col-md-6">
																						<div class="form-group col-md-6">
																							<button
																								onclick="addNewRowInTable('itemInfoTable','purchasereturn')"
																								class="btn btn-xs btn-success" type='button'
																								id="btnAddNew" value="+">+</button>
																							<button type="button"
																								onclick="removeRowFromTable('itemInfoTable','chkMrnItem')"
																								style="margin: 7px;"
																								class="btn btn-xs btn-success" value="_">-</button>

																						</div>

																					</div>
																				</div>

																				<!--------------------------table Start-------------------------->
																				<div class="row">
																					<div class="form-row">
																						<div style="height: 100px; margin-left: 2%;">
																							<div
																								style='height: 180px; overflow-y: scroll; border: 1px solid #436a9d;'>
																								<table border="1"
																									class="table table-bordered table-striped table-condensed table-responsive"
																									id="itemInfoTable">
																									<thead class='cf' style='background: white;'>
																										<tr>
																											<th><div>Select</div></th>
																											<th class='col-md-2 center'><div>Sr.No</div></th>
																											<th class='col-md-2 center'><div>Item
																													Name</div></th>
																											<th class='col-md-2 center'><div>Return
																													Quantity</div></th>
																											<th class='col-md-2 center'><div>Unit
																													Price</div></th>
																											<th class='col-md-2 center'><div>Disc(%)
																												</div></th>
																											<th class='col-md-2 center'><div>Disc(Rs)
																												</div></th>
																											<th class='col-md-2 center'><div>Disc(Amt)
																												</div></th>
																											<th class='col-md-2 center'><div>Base
																													Amount</div></th>
																											<th class='col-md-2 center'><div>GST
																												</div></th>
																											<th class='col-md-2 center'><div>IGST</div></th>
																											<th class='col-md-2 center'><div>GST
																													Amt(Rs)</div></th>
																											<th class='col-md-2 center'><div>IGST
																													Amt(Rs)</div></th>
																											<th class='col-md-2 center'><div>Total
																													Amount</div></th>
																											<th class='col-md-2 center'><div>Factor
																													1</div></th>
																											<th class='col-md-2 center'><div>Factor
																													2</div></th>
																											<th class='col-md-2 center'><div>Factor
																													3</div></th>
																											<th class='col-md-2 center'><div>Factor
																													4</div></th>
																											<th class='col-md-2 center'><div>Ordered
																													Qty</div></th>
																											<th class='col-md-2 center'><div>Receive
																													Qty</div></th>
																											<th class='col-md-2 center'><div>Pending
																													Qty</div></th>
																											<th class='col-md-2 center'><div>Batch
																													No</div></th>
																											<th class='col-md-2 center'><div>Batch
																													Details</div></th>		
																											<th class='col-md-2 center'><div>Manufacture
																													Date</div></th>
																											<th class='col-md-2 center'><div>Expiry
																													Date</div></th>
																											<th class='col-md-2 center'><div>Total
																													Amount</div></th>
																											<th class='col-md-2 center'><div>Add
																													Another Batch</div></th>				
																													
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
																									name="phoneOne" maxlength="11">
																							</div>

																							<div class="form-group col-md-6">
																								<label for="phoneSecond">Phone-2</label> <input
																									type="tel" class="form-control tip-focus"
																									id="contactPhoneSecond"
																									placeholder="Enter second phone no"
																									title="Please enter the second phone no "
																									name="phoneSecond" maxlength="11">
																							</div>

																							<div class="form-group col-md-6">
																								<label for="gender">Gender</label> <select
																									class="form-control" id="contactGender">
																									<option value="">--Select Gender--</option>
																									<option value="1">Male</option>
																									<option value="2">Female</option>
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
																									id="saveContactInfo"
																									onclick="addGeneralInfoRows('ContactInfo')">Add</button>
																								<button type="button" class="btn btn-primary"
																									id="updateContactInfo" style="display: none"
																									onclick="updatePurchaseContactInfo()">update</button>

																								<button class="btn btn-danger" type="reset"
																									onclick="resetInfoFields('contactInfo')">Reset</button>
																							</div>
																							<input type="hidden" id="txtItemPurchaseInfoId"
																								value=0 />
																						</form>
																					</div>
																					<div class="col-md-6">

																						<div style="height: 150px; margin-left: 2%;">
																							<div
																								style='width: 100%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;'>
																								<!-- <div id="ContactInfoTable"></div> -->

																								<table
																									class='table table-striped table-bordered header-fixed cf'
																									style='width: 120%; height: 100%;'
																									id="ContactInfoTable">
																									<thead class='cf' style='background: white;'>
																										<tr>
																											<th class='col-md-1 center'><div>#</div></th>
																											<th class='col-md-2 center'><div>Contact
																													Person</div></th>
																											<th class='col-md-2 center'><div>Designation</div></th>
																											<th class='col-md-2 center'><div>Address
																												</div></th>
																											<th class='col-md-2 center'><div>Edit</div></th>
																											<th class='col-md-2 center'><div>Delete</div></th>
																										</tr>
																									</thead>
																									<tbody id="purchaseQuotationContactInfo">

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
																								<label for="city">City</label> <input
																									type="text" class="form-control tip-focus"
																									id="cityFromAddress" placeholder="Enter city "
																									title="Please enter the city " name="city">
																							</div>

																							<div class="form-group col-md-6">
																								<label for="country">Country</label> <input
																									type="text" class="form-control tip-focus"
																									id="countryFromAddress"
																									placeholder="Enter country"
																									title="Please enter the country "
																									name="country">
																							</div>

																							<div class="form-group col-md-6">
																								<label for="street">Street</label> <input
																									type="text" class="form-control tip-focus"
																									id="streetFromAddress"
																									placeholder="Enter street "
																									title="Please enter the street " name="street">
																							</div>
																							<div class="form-group col-md-6">
																								<label for="state">State</label> <select
																									class="form-control" id="stateFromAddress">
																									<option value="">--Select State--</option>
																									<option value="Andra Pradesh">Andra
																										Pradesh</option>
																									<option value="Arunachal Pradesh">Arunachal
																										Pradesh</option>
																									<option value="Assam">Assam</option>
																									<option value="Bihar">Bihar</option>
																									<option value="Chhattisgarh">Chhattisgarh</option>
																									<option value="Goa">Goa</option>
																									<option value="Gujarat">Gujarat</option>
																									<option value="Haryana">Haryana</option>
																									<option value="Himachal Pradesh">Himachal
																										Pradesh</option>
																									<option value="Jammu and Kashmir">Jammu
																										and Kashmir</option>
																									<option value="Jharkhand">Jharkhand</option>
																									<option value="Karnataka">Karnataka</option>
																									<option value="Kerala">Kerala</option>
																									<option value="Madya Pradesh">Madya
																										Pradesh</option>
																									<option value="Maharashtra">Maharashtra</option>
																									<option value="Manipur">Manipur</option>
																									<option value="Meghalaya">Meghalaya</option>
																									<option value="Mizoram">Mizoram</option>
																									<option value="Nagaland">Nagaland</option>
																									<option value="Orissa">Orissa</option>
																									<option value="Punjab">Punjab</option>
																									<option value="Rajasthan">Rajasthan</option>
																									<option value="Sikkim">Sikkim</option>
																									<option value="Tamil Nadu">Tamil Nadu</option>
																									<option value="Telagana">Telagana</option>
																									<option value="Tripura">Tripura</option>
																									<option value="Uttaranchal">Uttar
																										Pradesh</option>
																									<option value="Uttar Pradesh">Arunachal
																										Pradesh</option>
																									<option value="West Bengal">West
																										Bengal</option>

																									<option value="Andaman and Nicobar Islands">Andaman
																										and Nicobar Islands</option>
																									<option value="Chandigarh">Chandigarh</option>
																									<option value="Dadar and Nagar Haveli">Dadar
																										and Nagar Haveli</option>
																									<option value="Daman and Diu">Daman
																										and Diu</option>
																									<option value="Delhi">Delhi</option>
																									<option value="Lakshadeep">Lakshadeep</option>
																									<option value="Pondicherry">Pondicherry</option>

																								</select>
																							</div>

																							<div class="form-group col-md-6">
																								<label for="pincode">Pincode</label> <input
																									type="text" class="form-control tip-focus"
																									id="pincodeFromAddress"
																									placeholder="Enter pincode "
																									title="Please enter the pincode "
																									name="pincode">
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
																									id="saveAddressInfo"
																									onclick="addGeneralInfoRows('AddressInfo')">Add</button>
																								<button type="button" class="btn btn-primary"
																									id="updateAddressInfo" style="display: none"
																									onclick="updatePurchaseAddressInfo()">update</button>
																								<button class="btn btn-danger" type="reset"
																									onclick="resetInfoFields('addressInfo')">Reset</button>
																							</div>
																							<input type="hidden" id="txtItemPurchaseInfoId"
																								value=0 />
																						</form>
																					</div>
																					<div class="col-md-6">
																						<div style="height: 150px; margin-left: 2%;">
																							<div
																								style='width: 100%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;'>
																								<!-- <div id="AddressInfoTable"></div> -->

																								<table
																									class='table table-striped table-bordered header-fixed cf'
																									style='width: 120%; height: 100%;'
																									id="AddressInfoTable">
																									<thead class='cf' style='background: white;'>
																										<tr>
																											<th style='height: 21.5px;'
																												class='col-md-1 center'><div>#</div></th>
																											<th class='col-md-2 center'><div>Comapny</div></th>
																											<th class='col-md-2 center'><div>Country</div></th>
																											<th class='col-md-2 center'><div>city</div></th>
																											<th class='col-md-1 center'><div>Edit</div></th>
																											<th class='col-md-1 center'><div>Delete</div></th>
																										</tr>
																									</thead>
																									<tbody id="purchaseQuotationAddInfoList">

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
																<!-- upload document tab starts here -->
																<!-- <div id="uploadDetails" class="tab-pane fade">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<div class="container">
																				<div class="row">
																					<div class="col-md-6">
																						<form name="itemPurchasedetialsForm" method="post" id="termConditionIdForm">

								
																							<div class="form-group col-md-6">
																								<label for="address">Term And Condition<b style="color: red;">*</b></label>
																								<textarea type="text"	class="form-control tip-focus"	id="termconditionId"
																									placeholder="Enter address " title="Please enter the address "
																									name="address"></textarea>
																							</div>
																							<div class="form-group col-md-6">
																								<button type="button" class="btn btn-primary" id="saveTermInfo" onclick="addGeneralInfoRows('termconditionInfo')">Add</button>
																								<button type="button" class="btn btn-primary" id="updateTermInfo" style="display: none" onclick="updatePurchaseTermInfo()">update</button>
																								<button class="btn btn-danger" type="reset"	onclick="resetInfoFields('termconditionInfo')">Reset</button>
																							</div>
																							<input type="hidden" id="txtItemPurchaseInfoId"
																								value=0 />
																						</form>
																					</div>
																					<div class="col-md-6">
																						<div style="height: 150px; margin-left: 2%;">
																							<div
																								style='width: 100%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;'>
																								<div id="AddressInfoTable"></div>
																								
																								<table class='table table-striped table-bordered header-fixed cf' style='width: 100%;height:100%;' id="termAndConditionInfoTable">
																								<thead class='cf' style='background: white;'>
																								<tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>																								
																								<th style='height: 21.5px;' class='col-md-1 center'><div>Terms and Condition </div></th>																							
																								<th style='height: 21.5px;' class='col-md-1 center'><div>Add</div></th>
																								<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th> </tr></thead>
																								<tbody id="termConditionDetails">
																								
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
																</div> -->
																<!--  upload document tab ends here -->
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<!-- new modal starts here -->
										<div id="purchasequotationModalId" class="modal" tabindex="-1"
											role="dialog">
											<div class="modal-dialog" role="document">
												<div class="modal-content">
													<div class="modal-header">
														<h5 class="modal-title">Party Master Details</h5>
														<button type="button" class="close" data-dismiss="modal"
															aria-label="Close">
															<span aria-hidden="true">&times;</span>
														</button>
													</div>
													<div class="modal-body" style="width: 100%; height: 350px;">
														<div class="col-md-12" id="purchaseQuote">
															<div class="col-md-6">
																<table id="partymasterSlaveTableId" cellpadding="0"
																	cellspacing="0" border="0"
																	class="datatable table table-striped table-bordered">
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

																<table id="partymasterSlaveTableId1" cellpadding="0"
																	cellspacing="0" border="0"
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
															<button type="button" class="btn btn-primary"
																onclick="setPartyModalInfoToTableOnPurchaseQuotation()">Save
																changes</button>
															<button type="button" class="btn btn-secondary"
																onclick="closepartyMasterDetailsModal()">Close</button>
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
																			<input class="form-control" name="txtSplDisc"
																				id="txtSplDisc" type="text" value="0"
																				placeholder="Spl.Disc"
																				onblur="isFloatingPoint('txtSplDisc'),calculatSpeDisct();">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Debit Amt.</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtdebitAmt1"
																				id="txtdebitAmt1" type="text"
																				placeholder="Debit Amt" maxlength="10" value="0"
																				onblur="isFloatingPoint('txtdebitAmt1'),calculateTotalLess();">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">CD %</label>
																		<div class="col-lg-4">
																			<input class="form-control" name="txtCD1" id="txtCD1"
																				type="text" value="0"
																				onblur="isFloatingPoint('txtCD1'),calculateCDAmt();">
																		</div>
																		<div class="col-lg-4">
																			<input class="form-control" name="txtCDAmt"
																				id="txtCDAmt" type="text" placeholder="C.DAmount"
																				maxlength="10" readonly="true"
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
																	<div class="row">
																		<div class="form-group">
																			<label for="name" class="col-lg-4">Octroi</label>
																			<div class="col-lg-8">
																				<input class="form-control" type="text"
																					id="txtOctroi" name="txtOctroi"
																					class="form-control input-SmallText"
																					placeholder="Octroi" maxlength="10"
																					onblur="isFloatingPoint('txtOctroi'),calculateTotalAdd();"
																					value="0">
																			</div>
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Surcharge</label>
																		<div class="col-lg-8">
																			<input class="form-control" type="text"
																				id="txtSurcharge" name="txtSurcharge"
																				class="form-control input-SmallText"
																				placeholder="Surcharge" maxlength="10"
																				onblur="isFloatingPoint('txtSurcharge'),calculateTotalAdd();"
																				value="0">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Credit Amt.</label>
																		<div class="col-lg-8">
																			<input class="form-control" type="text"
																				id="txtCreditAmt" name="txtCreditAmt"
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
																			<input class="form-control" type="text"
																				id="txtFreight" name="txtFreight"
																				class="form-control input-SmallText"
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
															<div class="panel-heading" id="divEhatContent">Tax
																Info.</div>
															<div class="panel-body">
																<div>
																	<div class="row">
																		<div class="form-group">
																			<label for="name" class="col-lg-4">Vat</label>
																			<div class="col-lg-8">
																				<input class="form-control" name="name" id="txtVat"
																					type="text" readonly="readonly" value="0.0"
																					placeholder="VAT">
																			</div>
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">LBT</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtlbt" id="txtlbt"
																				type="text" readonly="readonly" value="0.0"
																				placeholder="LBT">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">CST</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtcst" id="txtcst"
																				type="text" readonly="readonly" value="0.0"
																				placeholder="cst">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Ex Vat</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtExVat"
																				id="txtExVat" type="text" readonly="readonly"
																				value="0.0" placeholder="Ex vat">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Total Tax</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="name"
																				id="txtTotalVat" type="text" readonly="readonly"
																				value="0.0" placeholder="Total Tax">
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
																			<label for="name" class="col-lg-4">Gross
																				Amount</label>
																			<div class="col-lg-8">
																				<input class="form-control" name="txtGross"
																					id="txtGross" type="text"
																					placeholder="Gross Amount" readonly="readonly"
																					value="0.0">
																			</div>
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Less</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtLess"
																				id="txtLess" type="text" placeholder="Less"
																				readonly="readonly" value="0.0">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Add</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtAdd" id="txtAdd"
																				type="text" placeholder="add" readonly="readonly"
																				value="0.0">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Taxes</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="textVat"
																				id="textVat" type="text" placeholder="Taxses"
																				readonly="readonly" value="0.0">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Net Amount</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="name"
																				id="txtNetAmt" type="text" placeholder="Net Amount"
																				readonly="readonly" value="0.0">
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
																	<div class="panel-heading" id="divEhatContent">Party
																		Master Table</div>
																	<div class="panel-body" id="returnMasterInfo"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Return Id</th>
																					<th class="col-md-1 center">Vendor Name</th>
																					<th class="col-md-1 center">View</th>
																					<!-- <th class="col-md-1 center">Delete</th> -->
																					<th class="col-md-1 center">Print</th>
																				</tr>
																			</thead>
																			<tbody id="purchaseReturnInfoList">
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

		<!-- CUSTOM SCRIPT -->
		<script src="ehat-design/js/script.js"></script>
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
				
				$('#returnDate').datepicker({
					autoclose : true
				});
				
				$('#quotationExDate').datepicker({
					autoclose : true
				});
				
				$('#deliveryDate').datepicker({
					autoclose : true
				});

			});
		</script>
		<script>
			onload = function() {
				getAllPurchaseReturnMaster("all");
				getAllInventoryTermAndCondition();
				//getAllPurchaseInvoice2();
				
				
			}
		</script>
		<input type="hidden" id="purchaseReturnMasterId" value="0">
		<input type="hidden" id="invGRNId" value="0">
		<input type="hidden" id="contactInfoId" value="0">
		<input type="hidden" id="addressInfoId" value="0">
		<input type="hidden" id="termInfoId" value="0">
		<input type="hidden" id="hiddenpartyMasterId" value="0">
		<input type="hidden" id="RowCount" value="0">
		<input type="hidden" id="totaltblsize" value="0">
		<input type="hidden" id="callFrom" value="fromnew">
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	<script type="text/javascript" src="js/inv_purchase_return.js"></script>
</body>
</html>

