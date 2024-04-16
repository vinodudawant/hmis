<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Purchase Invoice</title>
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
<script type="text/javascript" src="js/inv_purchase_invoice.js"></script>
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
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
							"dd-MM-yyyy");
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
												href="inv_purchase_invoice.jsp">Purchase Invoice</a></li>
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
										<div class="input-group" id="purchaseInvoiceByName">
											<input type="search"
												class="typeahead form-control input-SmallText"
												id="searchPurchaseInvoice"
												onkeyup="purchaseInvoiceAutoSuggestion(this.id)" value="" /> <span
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
											data-toggle="modal" id="purchaseInvoice" data-target="#purchaseInvoiceModal">
											<i class="fa fa-plus"></i> Add New Purchase Invoice
										</button>
										
										<!-- Added By Dayanand For  To export  data in Excel  Date(29-1-2020)-->
												<div style="font-weight: bold;" class="col-md-1-1">
														<button id="btnExport" class="btn btn-xs btn-warning" value="Excel"  title="" data-placement="left" data-toggle="tooltip" data-original-title="Excel" style="margin-left: 10px">
																			<!-- <i class="fa fa-file"></i> --> Export To Excel
																	</button>
																	<!-- following code for Excel sheet -->
																	<script type="text/javascript">
																	$("[id$=btnExport]").click(function(e) {
																	    window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$=invoiceMasterInfo]').html()));
																	    e.preventDefault();
																	});
																	
																	</script>					
												</div>
												<!-- End -->
										
										
									</div>
								</div>
							</div>

							<!-- modal starts here -->
							<div class="modal fade" id="purchaseInvoiceModal"  data-backdrop="static" data-keyboard="false"  tabindex="-1" role="dialog" aria-labelledby="itemMasterModalLabel" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h3 class="modal-title">Purchase Invoice
												<div class="pull-right" style="margin-right: 15px;">
													<button class="btn btn-primary" data-toggle="collapse" data-target="#purchaseInvoiceFormId">Open</button>
													<button type="button" class="btn btn-primary"
														onclick="savePurchaseInvoice()">Save</button>
													<button type="button" class="btn btn-warning"
														data-dismiss="modal" onclick="closePopUpAndRefreshPage();">Close</button>
												</div>
											</h3>
										</div>
										<div class="modal-body" style="padding: 0px!important;">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Purchase Invoice</div>
															<div class="panel-body">
																<form id="purchaseInvoiceFormId" onsubmit="return false" class="collapse">
																	<div class="row">
																		<div class="col-md-4">
																			<div class="row">
																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="purInvId">Invoice Id</label>
																				</div>
																				<div class="form-group col-md-8 col-sm-8 col-xs-12">
																					<input type="text" placeholder="Invoice Id"
																						class="form-control tip-focus" id="txtPurInvId"
																						readonly="true" name="txtPurInvId">
																						<input type="hidden"
																							class="form-control"
																							id="hiddenNextPurInvId" name=""
																							data-name="">
																				</div>
																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="QuatationDate">Invoice Date<b
																						style="color: red;">*</b></label>
																				</div>
																				<div class="form-group col-md-8 col-sm-8 col-xs-12">
																					<input id="purInvDate"
																						class="form-control input-SmallText" type="text"
																						readonly="readonly" name="date" placeholder="Date"
																						value="<%=todays_date%>">
																				</div>
																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="parent">Supplier Name<b
																						style="color: red;">*</b></label>
																				</div>
																				<div class="form-group col-md-8 col-sm-8 col-xs-12"
																					id="partyMasterByName">
																					<input type="hidden" id="hiddenSupplierNameId" />
																					<input type="text" class="form-control tip-focus"
																						id="purchaseInvSupplierName"
																						onkeyup="getAutoPartyMaster(this.id)"
																						placeholder="Enter Supplier name "
																						title="Please enter Supplier name" name="supplier"
																						data-name="SupplierName">
																				</div>
																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="type">Supplier State<b
																						style="color: red;">*</b></label>
																				</div>
																				<div class="form-group col-md-8 col-sm-8 col-xs-12">
																					<select class="form-control" id="purchaseInvoiceSupplierState" onchange="getVendorState();">
																						<option value="">--Select State--</option>
																					</select>
																				</div>
																				<div class="form-check col-md-5 col-sm-5 col-xs-6" id='purchaseInvoiceCheck'>
																					<label class='form-check-label' for="appendGrnId">Add to Stock<input
																						type="checkbox" class="form-control form-check-input tip-focus"
																						id="appendGrnId" name="appendGrnId" onclick="checkForPurchaseInvoiceAppend()" style="width: auto;"> </label>
																				</div>
																				<div class="form-check col-md-5 col-sm-5 col-xs-6">
																					<label class='form-check-label' for="withoughtGrnPurInvId">W/GRN Invoice <input
																						type="checkbox" class="form-control form-check-input tip-focus"
																						id="withoughtGrnPurInvId" name="withoughtGrnPurInvId" onclick="checkForPurchseInvoice()" style="width: auto;"></label>
																				</div>
																			</div>
																		</div>
																		<div class="col-md-4">
																			<div class="row">
																				<div id="checkForInvoiceGRN">
																					<div class="form-group col-md-4 col-sm-4 col-xs-12">
																						<label for="purchaseInvoice">Get GRN</label>
																					</div>
																					<div class="form-group col-md-5" id="purchaseInvoiceId">
																						<select class="form-control" id="purchaseInvoiceGrn" onchange="getGoodReceiptNoteList(this.value)">
																							<option value="0">--Select Good Receipt Note--</option>
																						</select>
																					</div>
																				
																					<div class="form-group col-md-3"
																						id="purchaseInvoiceGrnCheck" style="display: none;">
																						<input type="button"
																							class="btn btn-primary form-control"
																							id="purInvGrnAppend" value="Append" name=""
																							data-name="">
																					</div>
																				</div>
																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="status">Invoice Series<b
																						style="color: red;">*</b></label>
																				</div>
																				<div class="form-group col-md-3 col-sm-3 col-xs-6">
																					<select class="form-control" id="selectPurInvSeries" onchange="getPurchaseInvSeries(this.value)">
																						<option value="0">--Select Status--</option>
																					</select>
																				</div>
																				<div class="form-group col-md-5 col-sm-5 col-xs-6">
																					<input type="text" class="form-control tip-focus"
																						id="purInvSeries" placeholder="Purchase Invoice Series" name="">
																				</div>
																				
																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="purInvReferenceNo">Refernce No<b
																						style="color: red;">*</b></label>
																				</div>
																				<div class="form-group col-md-8 col-sm-8 col-xs-12">
																					<input type="text" class="form-control tip-focus"
																						id="purInvReferenceNo"
																						placeholder="Enter Reference No"
																						title="Please enter  Reference No"
																						name="purInvReferenceNo">
																				</div>
																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="purInvMobileNo">Mobile No<b
																						style="color: red;">*</b></label>
																				</div>
																				<div class="form-group col-md-8 col-sm-8 col-xs-12">
																					<input type="text" class="form-control tip-focus"
																						id="purInvMobileNo" placeholder="Enter Mobile No"
																						title="Please Enter Mobile No" name="mobileNumber">
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
																						required="true" id="purInvSupplierAddress"
																						placeholder="Address"></textarea>
																				</div>
																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="Deleviry">Delivery Date</label>
																				</div>
																				<div class="form-group col-md-8 col-sm-8 col-xs-12">
																					<input id="purInvDeliveryDate"
																						class="form-control input-SmallText" type="text"
																						readonly="readonly" name="date" placeholder="Date"
																						value="<%=todays_date%>">
																				</div>
																				<div class="form-group col-md-4 col-sm-4 col-xs-12">
																					<label for="priority">Invoice status<b
																						style="color: red;">*</b></label>
																				</div>
																				<div class="form-group col-md-8 col-sm-8 col-xs-12">
																					<select class="form-control" id="purInvStatus">
																						<option value="0">--Select Status--</option>
																						<option value="Open">Open</option>
																						<option value="Closed">Closed</option>
																						<option value="Hold">Hold</option>
																						<option value="Cancelled">Cancelled</option>
																					</select>
																				</div>
																				<div class="form-group col-md-2">
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
																<li class="active"><a data-toggle="tab"
																	href="#itemInfo">Item Info(F2)</a></li>
																<li><a data-toggle="tab" href="#contactInfo">Contact
																		Info(F4)</a></li>
																<li><a data-toggle="tab" href="#addressnfo">Address
																		Info(F5)</a></li>
															</ul>
															<div class="tab-content">
																<!-- general tab starts here -->
																<div id="itemInfo" class="tab-pane fade in active">
																	<div class="panel panel-primary"
																		style="margin-top: 20px; height: 320px">
																		<div class="panel-body" style="width: 100%;">
																			<form>
																				<div class="row">
																					<div class="col-md-8">
																						<div class="form-group col-md-4">
																							<label for="itemQuantity">Total Item
																								Quantity <b style="color: red;">*</b>
																							</label> <input type="text"
																								class="form-control tip-focus" id="totalItemQty"
																								placeholder="Total Item Quantity"
																								title="Total Item Quantity" name="totalItemQty" disabled>
																						</div>
																						<div class="form-group col-md-4">
																							<label for="landLineNo">Total Item
																								Discount </label> <input type="text"
																								class="form-control tip-focus"
																								id="totalItemDiscount"
																								placeholder="Total Item Discount"
																								title="Total Item Discount"
																								name="totalItemDiscount" disabled>
																						</div>
																					</div>
																					<div class="col-md-4">
																						<div class="form-group col-md-6">
																							<button onclick="addNewRowInTable('purInvItemInfoTable','PurInvOnPlus')" class="btn btn-xs btn-success" type='button' id="btnAddNew" value="+">+</button>
																							<button type="button" onclick="removeRowFromTable('purInvItemInfoTable','chkGrnItem')" style="margin: 7px;" class="btn btn-xs btn-success" value="_">-</button>
																						</div>

																					</div>
																				</div>

																				<!--------------------------table Start-------------------------->
																					<div class="row">
																						<div style="height: 100px; margin-left: 2%;">
																							<div
																								style='width: 100%; padding: 1%; font-weight: normal; height: 190px; overflow-y: scroll; border: 1px solid #436a9d;'>
																							<form name="purchaseInvoiceFormTableId"  id='purchaseInvoiceFormTableId'>
																								<table id="purInvItemInfoTable"
																									class="table table-bordered table-striped table-condensed">
																									<thead class='cf' style='background: white;'>
																										<tr>
																											<th style='height: 21.5px;'><div
																													class='col-md-6 col-xs-12 col-sm-6'>Select</div></th>
																											<th><div class='col-md-4 col-xs-12 col-sm-4'>Sr.No</div></th>
																											<th><div class='col-md-8 col-xs-12 col-sm-8 center'>Item
																													Name</div></th>
																											<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Item
																													Quantity</div></th>
																											<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Unit
																													Price</div></th>
																											<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Disc(%)
																												</div></th>
																											<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Disc(Rs)
																												</div></th>
																											<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Disc(Amt)
																												</div></th>
																											<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Base
																													Amount</div></th>
																											<th><div class='col-md-6 col-xs-12 col-sm-6 center'>GST
																												</div></th>
																											<th><div class='col-md-6 col-xs-12 col-sm-6 center'>
																													IGST</div></th>
																											<th><div class='col-md-6 col-xs-12 col-sm-6 center'>GST
																													Amt(Rs)</div></th>
																											<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Total
																													Amount</div></th>
																											<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Factor
																													1</div></th>
																											<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Factor
																													2</div></th>
																											<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Factor
																													3</div></th>
																											<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Factor
																													4</div></th>
																											<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Received
																													Qty</div></th>
																											<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Pending
																													Qty</div></th>
																											<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Batch
																													No</div></th>
																											<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Manufacture
																													Date</div></th>
																											<th><div class='col-md-6 col-xs-12 col-sm-6 center'>Expiry
																													Date</div></th>
																										</tr>
																									<tbody id="itemInfoDetails" style="width: 1663px;">

																									</tbody>
																								</table>
																								</form>
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
																						<form name="contactInfoDetialsForm" method="post" id="contactFormId">

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
																								<button type="button" class="btn btn-primary" id="saveContactInfo"
																									onclick="addGeneralInfoRows('ContactInfo')">Add</button>
																									<button type="button" class="btn btn-primary" id="updateContactInfo" style="display: none;" onclick="updateContactInfoPartyMasterPI()">Update</button>
																									
																									
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
																								<label for="country">Country</label><input type="hidden" id="hiddenCountryFromPartyMaster" /> <select
																								    class="tip-focus" style="width:100%;"
																									id="countryFromAddress"
																									placeholder="Enter country"
																									title="Please enter the country "
																									data-name="getStatePurInv"
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
																								<label for="state">State</label> <input type="hidden" id="hiddenStateFromPartyMaster" /><select
																									style="width:100%;" id="stateFromAddress" onchange="getAllDistrictByStateId(this.id)" data-name="getDistrictOnPurInv">
																									<option value="">--Select State--</option>
																								</select>
																							</div>
																							<div class="form-group col-md-6">
																								<label for="District">District</label> <input type="hidden" id="hiddenDistrictFromPartyMaster" /><select
																									style="width:100%;" id="districtFromAddress" onchange="getAllTalukaBydDistictId(this.id)" data-name="getTalukaOnPurInv">
																									<option value="">--Select District--</option>

																								</select>
																							</div>
																							<div class="form-group col-md-6">
																								<label for="Taluka">Taluka</label> <input type="hidden" id="hiddenTalukaFromPartyMaster" /><select
																									style="width:100%;" id="talukaFromAddress" onchange="getAllCityByTalukaId(this.id)"  data-name="getCityOnPurInv">
																									<option value="">--Select Taluka--</option>
																								</select>
																							</div>
																							<div class="form-group col-md-6">
																								<label for="City">City</label> <input type="hidden" id="hiddenCityFromPartyMaster" /><select
																									style="width:100%;" id="cityFromAddress" onchange="getSelectedCityName(this.id)" data-name="getLocalityOnPurInv" >
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
																									name="pincode" maxlength="6" onkeypress="return validateNumOnly(event)">
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
																									onclick="addGeneralInfoRows('AddressInfo')" id="saveAddressInfo">Add</button>
																								<button type="button" class="btn btn-primary"
																									id="updateAddressInfo" style="display: none;"
																									onclick="updateAddressInfoPartyMasterPI()">Update</button>
																								<button class="btn btn-danger" type="reset"
																									onclick="resetInfoFieldsForPurchaseInvoice('addressInfo')">Reset</button>
																							</div>
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
																
																
										<div id="batchModel" class="modal fade in"
											style="height: 500px;">
											<div class="modal-dialog" style="width:;">
												<form action="">
													<div class="modal-content start" class="col-md-12">
														<div class="modal-header">
															<div class="modal-title">
																<h4>
																	Batch Wise Item Info
																</h4>
															</div>
														</div>

														<div class="modal-body" style="margin-top: 9px;">
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-2-1" style="margin-top: 0px;"></div>
															</div>

															<div class="col-md-12-1"
																style="height: 100%; width: 100%; padding-left: 0px;">
																<table id="ItemInfoTable" border="1"
																	class="table table-bordered table-striped table-condensed"
																	style="height: 100%; width: 100%;">
																	<thead>
																		<tr>
																			<th class='col-md-1-1 center' style='height: 21.5px;'><div
																					class='TextFont'>select Product</div></th>
																			<th class='col-md-3-1 center' style='height: 21.5px;'><div
																					class='TextFont'>Item Name</div></th>
																			<th class='col-md-3-1 center' style='height: 21.5px;'><div
																					class='TextFont'>Qty</div></th>
																			<th class='col-md-3-1 center' style='height: 21.5px;'><div
																					class='TextFont'>Batch Code</div></th>
																			<th class=' col-md-3-1 center'
																				style='height: 21.5px;'><div class='TextFont'>Expiry</div></th>
																		</tr>
																	</thead>

																	<tbody id="batchData"
																		style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
																	</tbody>
																</table>
															</div>
															<!-- /BOX-->
														</div>
														<!-- /BODY-->
														<div class="modal-footer">
															<div class="form-group col-md-7-1"
																style="margin-top: 15px;">
																<button type="button" class="btn btn-primary"
																	id="btnSubContractingMaterialIssueSave"
																	name="btnSubContractingMaterialIssueSave"
																	onclick="setModalInfoToTableOnBatch()">Ok</button>
																<button type="button" class="btn btn-default"
																	onclick="closeItemBatchDetailsModal()">Cancel</button>
															</div>
														</div>
													</div>
												</form>
											</div>
										</div>

										<div id="purchaseInvoiceModalId" class="modal"
											tabindex="-1" role="dialog">
											<div class="modal-dialog" role="document">
												<div class="modal-content">
													<div class="modal-header">
														<h5 class="modal-title">Party Master Details</h5>
														<button type="button" class="close"
															data-dismiss="modal" aria-label="Close">
															<span aria-hidden="true">&times;</span>
														</button>
													</div>
													<div class="modal-body"
														style="width: 100%;height: auto;">
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
															<button type="button" class="btn btn-primary"
																onclick="setPartyModalInfoToTableOnPurchaseInvoice();removeDuplicateStatesPurchaseInvoice();">Save
																changes</button>
															<button type="button" class="btn btn-secondary"
																onclick="closepartyMasterDetailsModal()">Close</button>
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
										<div id="purchaseOrderModalId" class="modal fade in"	tabindex="-1">
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
														<table id="" cellpadding="0" cellspacing="0" border="1" style="width: 100%"
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
																		onkeyup="examunt(this.id)"/> <input type="text"
																		id="txtexGstper" name="txtexGstper"
																		placeholder="GST %"
																		class=" col-md-8-1 form-control input-SmallText"
																		style="margin-top: 2px;"  onkeyup="gstamt(this.id)"
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
																				onclick="addItemCharges()"
																				style="margin-top: 0px;"> <img width="18"
																				height="18" src="images/minus.jpg"
																				onclick="removeItemCharges()"
																				style="margin-top: 0px;">
																		</div> <select style='height: 160px; margin-top: 2px;width: 100%;'
																		class="col-md-12-1" name="selectChargesbox"
																		multiple="multiple" id='lstBoxforCharges'>
																	</select> <!-- <input type="hidden" id="hiddenCount" value="0"/> -->
																	</td>
																</tr>
															</tbody>
														</table>
														<div class="modal-footer" style="margin-left: -150px;">
															<div class="form-group col-md-9-1">
																<button type="button" class="btn btn-primary"
																	onclick="applyServiceChargesItem()">Apply</button>
																<button type="button" class="btn btn-default"
																	onclick="hideApplyChargespopaup()" id="closeBtn">Cancel</button>


															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<!-- /**** ** modal for Charges Tax on all items Author :sudhir Date:13jully2016 *******/ -->



										<!-- new modal starts here -->
										<div id="purchaseOrderModalId" class="modal fade" tabindex="-1" role="dialog">
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
														<button type="button" class="btn btn-primary">Save
															changes</button>
														<button type="button" class="btn btn-secondary"
															data-dismiss="modal">Close</button>
													</div>
												</div>
											</div>
										</div>
										
										<!-- new modal starts here -->
										<div id="selectPurchaseInvoiceModalId" class="modal" tabindex="-1" role="dialog">
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
												<tbody id="itemMasterSlavePurchaseInvoiceList">
												</tbody>
											 </table>
										      </div>
										      <div class="modal-footer">
										      	<input type="hidden" id="hiddenRadioButtonIndex"/>
										        <button type="button" class="btn btn-primary" onclick="setModalInfoToTableOnPurchaseInvoice();" >Save changes</button>
										        <button type="button" class="btn btn-secondary" onclick="closeItemPurchaseDetailsModal()">Close</button>
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
																			<textarea class="form-control" name="txtPurInvArermark" id="txtPurInvArermark"
																				type="text"></textarea>
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
																			<input class="form-control" name="txtSplDisc" id="txtSplDisc"
																				type="text" onblur="isFloatingPoint('txtSplDisc'),calculatSpeDisct();">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Debit Amt.</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtdebitAmt1" id="txtdebitAmt1" onblur="isFloatingPoint('txtdebitAmt1'),calculateTotalLess();"
																				type="text">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">CD %</label>
																		<div class="col-lg-4">
																			<input class="form-control" name="txtCD1" id="txtCD1" onblur="isFloatingPoint('txtCD1'),calculateCDAmt();" value="0"
																				type="text">
																		</div>
																		<div class="col-lg-4">
																			<input class="form-control" name="txtCDAmt" id="txtCDAmt" readonly="true" onclick="calculateTotalLess(this.value);" value="0"
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
																				<input class="form-control" name="txtOctroi" id="txtOctroi" value="0" onblur="isFloatingPoint('txtOctroi'),calculateTotalAdd();"
																					type="text">
																			</div>
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Surcharge</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtSurcharge" id="txtSurcharge" onblur="isFloatingPoint('txtSurcharge'),calculateTotalAdd();" value="0"
																				type="text">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Credit Amt.</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="name" id="txtCreditAmt" onblur="isFloatingPoint('txtCreditAmt'),calculateTotalAdd();" value="0"
																				type="text">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Freight</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtFreight" id="txtFreight" onblur="isFloatingPoint('txtFreight'),calculateTotalAdd();" value="0"
																				type="text">
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
																			<label for="name" class="col-lg-4">GST/IGST</label>
																			<div class="col-lg-8">
																				<input class="form-control" name="txtVat" id="txtVat" onblur="calculateTotalTax(this.value);" value="0"
																					type="text">
																			</div>
																		</div>
																	</div>
																</div>
																<div class="row" style="display: none;">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">LBT</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtlbt" id="txtlbt" onblur="isFloatingPoint('txtlbt'),calculateTotalTax(this.value);" value="0"
																				type="text">
																		</div>
																	</div>
																</div>
																<div class="row" style="display: none;">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">CST</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtcst" id="txtcst" onblur="isFloatingPoint('txtcst'),calculateTotalTax(this.value);" value="0"
																				type="text">
																		</div>
																	</div>
																</div>
																<div class="row" style="display: none;">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Ex Vat</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtExVat" id="txtExVat" onblur="calculateTotalTax(this.value);" value="0"
																				type="text">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Total Tax</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtTotalVat" id="txtTotalVat" readonly="true" value="0.00"
																				type="text">
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
																<div class="row">
																	<div class="form-group">
																		<div class="col-lg-10">
																			<input class="btn btn-primary form-control" name="name" id="" onclick="showServiceCharges()"
																				type="button" value="Add Charges" data-target="#purchaseOrderModalId">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<div class="col-lg-10">
																			<input class="form-control btn btn-primary" name="name" id="name" onclick="setRoundNetAmount()"
																				type="button" value="Round
																			Amount">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Taxes</label>
																		<div class="col-lg-8">
																			<select class="form-control" id="selboxChargeswithAmtList" onchange="getPurchaseOrderlist(this.value)">
																				<option value="0">-Select-</option>
																			</select>
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4"></label>
																		<div class="col-lg-8">
																			<input class="form-control" name="name" id="sumofCharges" readonly="readonly"
																				type="text" value="0">
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
																				<input class="form-control" name="txtGross" id="txtGross" disabled="disabled" required="true" maxlength="10" value="0" type="text">
																			</div>
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Less</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtLess" id="txtLess" value="0" required="required" maxlength="10" disabled="disabled" type="text" />
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Add</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtAdd" id="txtAdd"  value="0" maxlength="10" required="true" disabled="disabled" type="text" />
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Taxes</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="textVat" id="textVat" value="0" maxlength="10" required="true" disabled="disabled"
																				type="text">
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group">
																		<label for="name" class="col-lg-4">Net Amount</label>
																		<div class="col-lg-8">
																			<input class="form-control" name="txtNetAmt" id="txtNetAmt" value="0" maxlength="10" required="true" disabled="disabled" type="text">
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
																	<div class="panel-heading" id="divEhatContent">Purchase Invoice Table</div>
																	<div class="panel-body" id="invoiceMasterInfo"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Invoice Number</th>
																					<th class="col-md-1 center">Vendor Name</th>
																					<th class="col-md-1 center">Edit</th>
																					<th class="col-md-1 center">Delete</th>
																					<th class="col-md-1 center">Print</th>
																				</tr>
																			</thead>
																			<tbody id="purchaseInvoiceList">
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
		<script type="text/javascript" src="js/validate.js"></script>
		
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
				new JsDatePick({
					useMode : 2,
					target : "purInvDeliveryDate",
					/* dateFormat:"%d-%M-%Y", */
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					/* cellColorScheme:"beige", */
					dateFormat : "%d/%m/%Y",
					imgPath : "../img/",
					weekStartDay : 1,
				});

				new JsDatePick({
					useMode : 2,
					target : "purInvDate",
					/* dateFormat:"%d-%M-%Y", */
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					/* cellColorScheme:"beige", */
					dateFormat : "%d/%m/%Y",
					imgPath : "../img/",
					weekStartDay : 1,
				});
				///getGoodReceiptNoteSeries();
				$("#content").off('click', "#purchaseInvoice");
				$("#content").on('click', "#purchaseInvoice", function(){
					getNextPurchaseInvoiceId();
					resetInfoFields('PURINV');
					getPurchaseInvoiceSeries()
					getPurchaseInvSeries(($('#seriesId').val()));
					getPendingGoodsReceiptNote();
					
					
					
				});
				
			});
			onload = function() {
				getAllPurchaseInvoice();
				addNewRowInTable('purInvItemInfoTable','PurInv');
				
				getAllStateMaster();
				$("#countryFromAddress").select2();
				$("#stateFromAddress").select2();
				$("#districtFromAddress").select2();
				$("#talukaFromAddress").select2();
				$("#cityFromAddress").select2();
			}
		</script>
		<input type="hidden" id="purInvDocumentList" value="">
		<input type="hidden" id="purInvId" value="0">
		<input type="hidden" id="purInvItemId" value="0">
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="userState"
			value="<%=session.getAttribute("userState")%>">
		<input type="hidden" id="hiddenVenderState"
			value="0">
		<input type="hidden" id="totaltblsize"
			value="0">
		<input type="hidden" id="RowCount"
			value="0">
			RowCount
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>
