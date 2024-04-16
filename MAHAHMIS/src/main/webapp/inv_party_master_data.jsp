<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Party Master</title>
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
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/ehat_inventory.js"></script>
<script type="text/javascript" src="js/ehat_inv_pagination.js"></script>
<!-- bootstrap datepicker -->
<link rel="stylesheet" href="ehat-design/datepicker/datepicker3.css">
<link rel="stylesheet" type="text/css"
	href="css/inventoryDatepicker/css/jsDatePick_ltr.css" />
<!-- <style>
.panel-default {
	border-color: #a8bc7b;
}

table,th {
	text-align: center;
}
</style> -->
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
											<li><i class="fa fa-home"></i> <a
												href="inv_item_master.jsp">Party Master</a></li>
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
										<div class="input-group" id="partyMasterByName">
											<input type="search" placeholder="Party Name"
												class="typeahead form-control input-SmallText"
												id="seachPartyMaster" onkeyup="getAutoPartyMaster(this.id)" />
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
										<button class="btn btn-xs btn-info pull-left editUserAccess" type='button'
											data-toggle="modal" data-target="#itemMasterModal" onclick="resetAllField()">
											<i class="fa fa-plus"></i> Add New Party
										</button>
										
											<!-- Added By Dayanand For  To export  data in Excel  Date(29-1-2020)-->
												<div style="font-weight: bold;" class="col-md-1-1">
														<button id="btnExport" class="btn btn-xs btn-warning" value="Excel"  title="" data-placement="left" data-toggle="tooltip" data-original-title="Excel" style="margin-left: 10px">
																			<!-- <i class="fa fa-file"></i> --> Export To Excel
																	</button>
																	<!-- following code for Excel sheet -->
																	<script type="text/javascript">
																	$("[id$=btnExport]").click(function(e) {
																	    window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$=partyMasterInfoExcel]').html()));
																	    e.preventDefault();
																	});
																	
																	</script>					
												</div>
												<!-- End -->
										
										
									</div>
								</div>
							</div>

							<!-- modal starts here -->
							<div class="modal fade" id="itemMasterModal" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="itemMasterModalLabel" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">PARTY
													MASTER
												<div class="pull-right" style="margin-right: 15px;">
													<!-- <button type="button" class="btn btn-primary">Party No. <span class="badge badge-light">0</span></button> -->
													<button type="button" class="btn btn-primary editUserAccess" onclick="savePartyMaster();">Save</button>
													<button type="button" class="btn btn-danger" onclick="onCloseBtnRefrshPage();" data-dismiss="modal">Close</button>
												</div>
											</h5>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Party
																Master Form</div>
															<div class="panel-body">
																<form id="partyMaterFormId">
																	<!-- <div class="form-group col-md-2">
																		<label for="partyId">Code</label> <input type="text"
																			placeholder="Party Master Id"
																			class="form-control tip-focus" id="partyMaster"
																			readonly="true" name="partyId">
																	</div> -->
																<div class='row'>
																	<div class="form-group col-md-2">
																		<label for="partyName">Party Name<b
																			style="color: red;">*</b></label> <input type="text"
																			class="form-control tip-focus" id="masterPartyName"
																			placeholder="Enter party name"
																			title="Please enter the party name" name="partyName">
																	</div>

																	<div class="form-group col-md-2">
																		<label for="group">Category<b
																			style="color: red;">*</b></label> <select
																			class="form-control" id="masterGroup">
																			<option value="">--Select Category--</option>
																			<option value="Liquid">Liquid</option>
																			<option value="Surgical">Surgical</option>
																			<option value="Instrumental">Instrumental</option>
																			<option value="Vaccination">Vaccination</option>
																			<option value="All">All</option>
																		</select>
																	</div>
																	<div class="form-group col-md-2">
																		<label for="parent">Parent Company<b
																			style="color: red;">*</b></label> <input type="text"
																			class="form-control tip-focus"
																			id="masterParentCompany"
																			placeholder="Enter parent compnay name "
																			title="Please enter parent compnay name"
																			name="parent" data-name="parentPartyMaster">
																	</div>

																	<div class="form-group col-md-2">
																		<label for="status">Status<b
																			style="color: red;">*</b></label> <select
																			class="form-control" id="masterStatus" onchange="onChangePartyMasterStatus()">
																			<option value="">--Select Status--</option>
																			<option value="Continue">Active</option>
																			<option value="DisContinue">Deactivate</option>
																		</select>
																	</div>
																	<div class="form-group col-md-2">
																		<label for="type">Invoice Code</label>
																		<input type="text"
																			class="form-control tip-focus"
																			id="partyMasterInvoiceCode"
																			placeholder="Enter invoice code "
																			title="Please enter invoice code"
																			name="partyMasterInvoiceCode" data-name="partyMasterInvoiceCode">
																	</div>
																	
																	<div class="form-group col-md-2">
																		<label for="type">Vendor Code</label>
																		<input type="text"
																			class="form-control tip-focus"
																			id="partyMasterVendorCode"
																			placeholder="Enter Vendor code "
																			title="Please enter vendor code"
																			name="partyMasterVendorCode" data-name="partyMasterVendorCode">
																	</div>
																</div>
																<div class='row'>
																	
																		
																	<div class="form-group col-md-2">
																		<label for="type">Type</label>
																		<select class="form-control" id="masterType">
																			<option value="">--Select Type--</option>
																			<option value="inventory">Goods Provider</option>
																			<option value="services">Service Provider</option>
																			<option value="both">Both</option>
																		</select>
																	</div>
																	
																	<div class="form-group col-md-2">
																		<label for="priority">Priority<b
																			style="color: red;">*</b></label> <select
																			class="form-control" id="masterPriority">
																			<option value="">--Select Priority--</option>
																			<option value="High">High</option>
																			<option value="Medium">Medium</option>
																			<option value="Low">Low</option>
																		</select>
																	</div>
																	<div class="form-group col-md-2" id="partyMasterDeActivateDateId" style="display: none;">
																		<label for="type">Deactivate Date</label>
																		<input type="text" class="form-control tip-focus"
																			id="partyMasterDeActivateDate"
																			name="partyMasterDeActivateDate">
																	</div>
																	<div class="form-group col-md-2" id="partyMasterNoteId" style="display: none;">
																		<label for="type">Reason</label>
																		<textarea class="form-control tip-focus"
																			id="partyMasterNote"
																			title=""
																			name="partyMasterNote"></textarea>
																	</div>
													
																</div>
																	<!-- <span class="badge badge-primary">Item No</span> -->
																</form>
															</div>
														</div>
														<div class="container" style="margin-top: 2%;">
															<ul class="nav nav-tabs">
																<li class="active"><a data-toggle="tab"
																	href="#generalInfo">General Info</a></li>
																<li><a data-toggle="tab" href="#contactInfo">Contact Info</a></li>
																<li><a data-toggle="tab" href="#addressnfo">Address Info</a></li>
																<li><a data-toggle="tab" href="#PaymentInfo">Payment Info</a></li>
																<!-- <li><a data-toggle="tab" href="#uploadDetails">Upload Pan Card/ Visiting Img</a></li> -->
																<li><a data-toggle="tab" href="#TermsAndConditionInfo" onclick="getMasterTermsAndCondition()">Terms And Conditions Info</a></li>
																		
															</ul>
															<div class="tab-content">
																<!-- general tab starts here -->
																<div id="generalInfo" class="tab-pane fade in active">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<form id="generalFormId">
																			<input type="hidden" id="geneInfoIdNew" />
																				<div class="row">
																					<div class="col-md-6">
																						<div class="form-group col-md-6">
																							<label for="mobileNo">Mobile No </label> <input type="text"
																								class="form-control tip-focus"
																								id="generalMobileNo" onkeypress="return validateNumOnly(event)"
																								placeholder="Enter mobile no"
																								title="Please enter the mobile no" maxlength="10"
																								name="mobileNo">
																						</div>
																						<div class="form-row">
																							<div class="form-group col-md-6">
																								<label for="landLineNo">LandLine No<b
																								style="color: red;">*</b></label> <input
																									type="text" class="form-control tip-focus"
																									id="generalLandLineNo"
																									placeholder="Enter landline no"
																									title="Please enter the landline no"
																									name="landLineNo" maxlength="12">
																							</div>
																							<div class="form-group col-md-6">
																								<label for="generalWebSite">Web Site</label> <input
																									type="text" class="form-control tip-focus"
																									id="generalWebSite"
																									placeholder="Enter web site"
																									title="Please enter the web site"
																									name="webSite">
																							</div>
																							<div class="form-group col-md-6">
																								<label for="panNo">Pan No</label> <input
																									type="text" class="form-control tip-focus"
																									id="generalPanNo" placeholder="Enter pan no"
																									title="Please enter the pan no" name="panNo" maxlength="10">
																							</div>

																							<div class="form-group col-md-6">
																								<label for="gstNO">GSTTx No</label> <input
																									type="text" class="form-control tip-focus"
																									id="generalGstNO" placeholder="Enter gst no"
																									title="Please enter the gst no" name="gstNO">
																							</div>
																							<div class="form-group col-md-6">
																								<label for="companyMail">Company Mail ID</label>
																								<input type="text"
																									class="form-control tip-focus"
																									id="generalCompanyMail"
																									placeholder="Enter company mail id "
																									title="Please enter the company mail id "
																									name="companyMail">
																							</div>
																							<div class="form-group col-md-6">
																								<button type="button" class="btn btn-primary editUserAccess" id="saveGeneralInfo" style=""  onclick="addGeneralInfoRows('GeneralInfo')">Add</button>
																								<button type="button" class="btn btn-primary editUserAccess" id="updateGeneralInfo" style="display: none;" onclick="updateGeneralInfoPartyMaster()">Update</button>
																								<button class="btn btn-danger" type="reset"
																									onclick="resetInfoFields('generalInfo')">Reset</button>
																							</div>
																						</div>
																					</div>
																					<div class="col-md-6">
																						<div>
																							<div style='width: 100%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;'>
																								<table class='table table-striped table-bordered header-fixed cf' style='width: 120%;height:100%;' id="GeneralInfoTable">
																								<thead class='cf' style='background: white;'>
																								<tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>
																								<th class='col-md-2 center'><div>GSTTx No</div></th>
																								<th class='col-md-2 center'><div>Mobile No</div></th>
																								<th class='col-md-2 center'><div>Company Mail </div></th>
																								<th class='col-md-1 center'><div>Edit</div></th>
																								<th class='col-md-1 center'><div>Delete</div></th> </tr></thead>
																								<tbody id="PartyGeneralTableInfoList">
																								
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
																							<input type="hidden" id="conInfoIdNew" />
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
																								<label for="phoneOne">Phone-1<b style="color: red;">*</b></label> <input
																									type="tel" class="form-control tip-focus"
																									id="contactPhoneOne"
																									placeholder="Enter first phone no "
																									title="Please enter the first phone no "
																									maxlength="10"
																									name="phoneOne" onkeypress="return validateNumOnly(event)">
																							</div>

																							<div class="form-group col-md-6">
																								<label for="phoneSecond">Phone-2<b style="color: red;">*</b></label> <input
																									type="tel" class="form-control tip-focus"
																									id="contactPhoneSecond"
																									placeholder="Enter second phone no"
																									title="Please enter the second phone no "
																									maxlength="10"
																									name="phoneSecond" onkeypress="return validateNumOnly(event)">
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
																							
																								<button type="button" class="btn btn-primary editUserAccess" id="saveContactInfo" style=""  onclick="addGeneralInfoRows('ContactInfo')">Add</button>
																								<button type="button" class="btn btn-primary editUserAccess" id="updateContactInfo" style="display: none;" onclick="updateContactInfoPartyMaster()">Update</button>
																								<button class="btn btn-danger" type="reset"
																									onclick="resetInfoFields('contactInfo')">Reset</button>
																							</div>
																							<input type="hidden" id="txtItemPurchaseInfoId"
																								value=0 />
																						</form>
																					</div>
																					<div class="col-md-6">

																						<div>
																							<div
																								style='width: 100%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;'>
																								<table class='table table-striped table-bordered header-fixed cf' style='width: 120%;height:100%;' id="ContactInfoTable">
																								<thead class='cf' style='background: white;'>
																								<tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>
																								<th class='col-md-2 center'><div>Contact Person</div></th>
																								<th class='col-md-2 center'><div>Designation</div></th>
																								<th class='col-md-2 center'><div>Address </div></th>
																								<th class='col-md-1 center'><div>Edit</div></th>
																								<th class='col-md-1 center'><div>Delete</div></th> </tr></thead>
																								<tbody id="PartyContactTableInfoList">
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
																<!-- contact tab ends here -->
																<!-- address tab starts here -->
																<div id="addressnfo" class="tab-pane fade">
																	<div class="panel panel-primary">
																		<div class="panel-body">
																			<div class="container">
																				<div class="row">
																					<div class="col-md-6">
																						<form name="itemPurchasedetialsForm" method="post" id="addressFormId">
																							<input type="hidden" id="addInfoIdNew" />
																							<div class="input-group-text col-md-6">
																								<label for="billingAddress">Billing
																									Address</label> <input type="radio" checked="checked"
																									class="radio" id="billingAddress"
																									value="BillingAddress" name="address" style="padding-top: 10px;">
																							</div>

																							<div class="input-group-text col-md-6">
																								<label for="shippingAddress">Shipping
																									Address</label> <input type="radio"
																									class="radio" id="shippingAddress"
																									value="ShippingAddress" name="address">
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
																								<label for="country">Country</label> <input type="hidden" id="hiddenCountryFromPartyMaster" /><select
																								    class="form-control"
																									id="countryFromAddress"
																									title="Please enter the country "
																									data-name="getStateOnPartyMaster"
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
																										<option value="15">Pakistan</option>
																									</select>
																							</div>
																							
																							<div class="form-group col-md-6">
																								<label for="state">State</label> <input type="hidden" id="hiddenStateFromPartyMaster" /><select
																									class="form-control" id="stateFromAddress" onchange="getAllDistrictByStateId(this.id)" data-name="getDistrictOnPartyMaster">
																									<option value="0">--Select State--</option>
																								</select>
																							</div>
																							<div class="form-group col-md-6">
																								<label for="District">District</label> <input type="hidden" id="hiddenDistrictFromPartyMaster" /><select
																									class="form-control" id="districtFromAddress" onchange="getAllTalukaBydDistictId(this.id)" data-name="getTalukaOnPartyMaster">
																									<option value="">--Select District--</option>

																								</select>
																							</div>
																							<div class="form-group col-md-6">
																								<label for="Taluka">Taluka</label> <input type="hidden" id="hiddenTalukaFromPartyMaster" /><select
																									class="form-control" id="talukaFromAddress" onchange="getAllCityByTalukaId(this.id)"  data-name="getCityOnPartyMaster">
																									<option value="">--Select Taluka--</option>
																								</select>
																							</div>
																							<div class="form-group col-md-6">
																								<label for="City">City</label> <input type="hidden" id="hiddenCityFromPartyMaster" /><select
																									class="form-control" id="cityFromAddress" onchange="getSelectedCityName(this.id)" data-name="getLocalityOnPartyMaster" >
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
																									name="pincode"  maxlength="6"  onkeypress="return validateNumOnly(event)">
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
																								
																								<button type="button" class="btn btn-primary editUserAccess" id="saveAddressInfo" style=""  onclick="addGeneralInfoRows('AddressInfo')">Add</button>
																								<button type="button" class="btn btn-primary editUserAccess" id="updateAddressInfo" style="display: none;" onclick="updateAddressInfoPartyMaster()">Update</button>
																								<button class="btn btn-danger" type="reset"
																									onclick="resetInfoFields('addressInfo')">Reset</button>
																							</div>
																							<input type="hidden" id="txtItemPurchaseInfoId"
																								value=0 />
																						</form>
																					</div>
																					<div class="col-md-6">
																						<div>
																							<div style='width: 100%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;'>
																								<table class='table table-striped table-bordered header-fixed cf' style='width: 120%;height:100%;' id="AddressInfoTable">
																								<thead class='cf' style='background: white;'>
																								<tr><th class='col-md-1 center'><div>#</div></th>
																								<th class='col-md-2 center'><div>Company</div></th>
																								<th class='col-md-2 center'><div>Country</div></th>
																								<th class='col-md-2 center'><div>city</div></th>
																								<th class='col-md-1 center'><div>Edit</div></th>
																								<th class='col-md-1 center'><div>Delete</div></th> </tr></thead>
																								<tbody id="PartyAddressTableInfoList">
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
																<!-- address tab ends here -->
																<!-- payment tab start here -->
																<div id="PaymentInfo" class="tab-pane fade">
																	<div class='panel panel-primary'>
																		<div class="panel-body">
																			<div class="container">
																				<div class="row">
																					<div class="col-md-6">
																					<form name="itemPurchasedetialsForm" method="post" id="paymentFormId">
																					<input type="hidden" id="payInfoIdNew" />
																						<div class="form-group col-md-6">
																							<label for='Bank Name'>Bank Name</label> <select
																								class="form-control" id="bankName">
																								<option value="0">select</option>
																									<option value="SBI">SBI</option>
																									<option value="Axis">AXIS</option>
																									<option value="BOM">BOM</option>
																									<option value="idbi">IDBI</option>
																									<option value="icici">ICICI</option>
																									<option value="cosmos">COSMOS</option>
																									<option value="canara">CANARA</option>
																									<option value="punjab">PUNJAB</option>
																								</select> <input type="hidden" id="paymentId" value=0 />
																						</div>
																						<div class="form-group col-md-6">
																							<label for="Branch/IFSC">Branch/IFSC</label>
																							<input type="text" class="form-control tip-focus"
																									id="bankIfscCode"
																									placeholder="Branck or IFSC"
																									title="Please enter the IFSC "
																									name="bankIfscCode">
																						</div>
																						
																						<div class="form-group col-md-6">
																							<label for="Account Name">Account Name</label>
																							<input type="text" class="form-control tip-focus"
																									id="accountHolderName"
																									placeholder="Account Name"
																									title="Please enter Account Holder Name "
																									name="accountHolderName">
																						</div>
																						
																						<div class="form-group col-md-6">
																							<label for="Account Number">Account Number</label>
																							<input type="text" class="form-control tip-focus"
																									id="accountNumber"
																									placeholder="Account Number"
																									title="Please enter Account Number "
																									name="accountNumber" onkeypress="return validateNumOnly(event)">
																						</div>
																						
																						<div class="form-group col-md-6">
																							<label for="City">City</label>
																							<input type="text" class="form-control tip-focus"
																									id="cityId"
																									placeholder="City"
																									title="Please enter City "
																									name="cityId">
																						</div>
																						
																						<div class="form-group col-md-6">
																							<label for="Account Address">Address</label>
																							<input type="text" class="form-control tip-focus"
																									id="accountAddress"
																									placeholder="Account Address"
																									title="Please enter Account Address "
																									name="accountAddress">
																						</div>
																						<div class="form-group col-md-6">
																							<label for="Payment Term">Payment Term</label>
																							<input type="text" class="form-control tip-focus"
																									id="paymentTerm"
																									placeholder="Payment Term"
																									title="Please enter Payment Term "
																									name="paymentTerm">
																						</div>
																						<div class="form-group col-md-6">
																							<label for="Credit Term">Credit Term</label>
																							<input type="text" class="form-control tip-focus"
																									id="creditTerm"
																									placeholder="Credit Term"
																									title="Please enter Credit Term "
																									name="creditTerm">
																						</div>
																						<div class="form-group col-md-6">
																							<button type="button" class="btn btn-primary editUserAccess" id="savePaymentInfo" style=""  onclick="addGeneralInfoRows('paymentInfo')">Add</button>
																							<button type="button" class="btn btn-primary editUserAccess" id="updatePaymentInfo" style="display: none;" onclick="updatePaymentInfoPartyMaster()">Update</button>
																							<button class="btn btn-danger" type="reset"
																								onclick="resetInfoFields('paymentInfo')">Reset</button>
																						</div>
																					</form>
																					</div>
																					<div class="col-md-6"
																						style="height: 150px; margin-bottom: 0px; margin-top: 20px;">
																						<div>
																							<div
																								style='width: 100%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;'>
																							
																								<table class='table table-striped table-bordered header-fixed cf' style='width: 120%;height:100%;' id="PaymentInfoTable">
																									<thead class='cf' style='background: white;'>
																									<tr><th class='col-md-1 center'><div>#</div></th>
																									<th class='col-md-2 center'><div>Account Name</div></th>
																									<th class='col-md-2 center'><div>Account Number</div></th>
																									<th class='col-md-2 center'><div>Address</div></th>
																									<th class='col-md-1 center'><div>Edit</div></th>
																									<th class='col-md-1 center'><div>Delete</div></th> </tr></thead>
																									<tbody id="PartyPaymentInfoTableList">
																									
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
																<!-- payment tab end -->
																
																<!-- terms condition tab start here -->
																<div id="TermsAndConditionInfo" class="tab-pane fade">
																	<div class='panel panel-primary'>
																		<div class="panel-body">
																			<div class="container">
																				<div class="row">
																					<div class="col-md-6">
																						<form name="itemPurchasedetialsForm" method="post" id="TermsAndConditionInfoId">
																							<div class="form-group col-md-6">
																								<label for='Terms And Condition'>Terms And Condition Title</label> <select
																									class="form-control" id="termsAndConditionsTitle" onchange="getTermConditionMaster(this.value)">
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
																								<button type="button" class="btn btn-primary editUserAccess" id="saveTermsAndConditionInfo" style=""  onclick="addGeneralInfoRows('TermsAndConditionInfo')">Add</button>
																								<button type="button" class="btn btn-primary editUserAccess" id="updateTermsAndConditionInfo" style="display: none;" onclick="updateTermsAndConditionPartyMaster()">Update</button>
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
																<!-- terms and condition  tab end  -->
																
																<!-- upload document tab starts here -->
																<div id="uploadDetails" class="tab-pane fade">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<div class="container">
																				<div class="row">
																					<div id="PartyDetails" class="col-md-12" style="overflow-x: auto;">
																						<div class="panel-body col-md-6">
																							<div style="padding-left: 12px;"
																								class="col-sm-12-1">
																								<div style="height: 180px; margin-left: 2%;">
																									<div class="input-group mb-3">
																										<div class="input-group-prepend">
																											<img src="images/upload-icon.png" width="50"
																												height="50" name="patImg" id="patImg1"
																												title="Upload The Logo Of Hospital"
																												style="margin-top: 10px; margin-bottom: 10px;" />
																										</div>
																										<div class="custom-file">
																											<input type="file" class="custom-file-input"
																												id="inputGroupFile01"
																												aria-describedby="inputGroupFileAddon01">
																										</div>
																									</div>
																								</div>
																								<input type="hidden" id="txtItemPartyInfoId" />
																							</div>
																							<div class="form-group col-md-6">
																								<button type="button" class="btn btn-primary">Add</button>
																								<button class="btn btn-danger" type="reset"
																									onclick="resetInfoFields('addressInfo')">Reset</button>
																							</div>
																						</div>
																						<div class="col-md-6"
																							style="height: 150px; margin-top: 26px">
																							<div
																								style="width: 100%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;">
																								<div id="uploddtable"></div>

																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<!--  upload document tab ends here -->
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
																<!-- <div class="col-sm-12">
																	<div class="pull-right">
																		<div id="datatable1_filter" class="dataTables_filter">
																			<label id="searchlabel"> </label>
																		</div>
																	</div>
																</div> -->
																<div class="panel panel-primary">
																	<div class="panel-heading" id="divEhatContent">Party
																		Master Table</div>
																	<div class="panel-body" id="partyMasterInfo" style="overflow: auto;height: 300px">
																		<table id="ehatTable" class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Party ID</th>
																					<th class="col-md-1 center">Party Name</th>
																					<th class="col-md-1 center">Party Group</th>
																					<th class="col-md-1 center">Party Master type</th>
																					<th class="col-md-1 center">Edit</th>
																					<th class="col-md-1 center">Delete</th>
																				</tr>
																			</thead>
																			<tbody id="partyMasterList">
																			</tbody>
																		</table>
																	</div>
																	
																	<div class="panel-body" id="partyMasterInfoExcel" style="overflow: auto;height: 300px;display: none;">
																		<table id="ehatTable" class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Party ID</th>
																					<th class="col-md-1 center">Party Name</th>
																					<th class="col-md-1 center">Party Group</th>
																					<th class="col-md-1 center">Party Master type</th>
																				</tr>
																			</thead>
																			<tbody id="partyMasterListExcelExport">
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
														id="partyMasterRecordPagination">
													</ul>
												</div>
												<div class="row">
													<div class="col-md-4 col-md-offset-8">
														<div class="pull-right">
															<ul
																class="pagination pagination-blue margin-bottom-10"
																id="totalNumberOfPagesPartyMaster">
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
		<script>
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
					target : "partyMasterDeActivateDate",
					/* dateFormat:"%d-%M-%Y", */
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					/* cellColorScheme:"beige", */
					dateFormat : "%d/%m/%Y",
					imgPath : "../img/",
					weekStartDay : 1,
				});

			});
		</script>
		<script>
			onload = function() {
				//to load all the party master records
				getAllPartyMaster();
				//to load all the states
				getAllStateMaster();
				
				$("#countryFromAddress").select2();
				$("#stateFromAddress").select2();
				$("#districtFromAddress").select2();
				$("#talukaFromAddress").select2();
				$("#cityFromAddress").select2();
			}
		</script>
		
	
		
		<input type="hidden" id="partyMasterId" value="0">
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
			<input type="hidden" id="callFrom" value="fromUI">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>