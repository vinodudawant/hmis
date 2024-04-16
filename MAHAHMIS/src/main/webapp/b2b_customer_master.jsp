<%@page import="java.util.Date"%>

<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Administrator Dashboard</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<%@include file="inv_header.jsp"%>

<script type="text/javascript" src="js/b2b_customer_master.js"></script>
<!-- <script type="text/javascript" src="js/registration.js"></script> -->
	
	<!-- bootstrap datepicker -->
<link rel="stylesheet" href="ehat-design/datepicker/datepicker3.css">
<link rel="stylesheet" type="text/css"
	href="css/inventoryDatepicker/css/jsDatePick_ltr.css" />
	
	<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
	
<style>
.tdColorWarning{
	color:#e1890c;
	font-weight: bold;
}
.tdColorRed{
	color:red;
	font-weight: bold;
}
.tdColorGreen{
	color:green;
	font-weight: bold;
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
			<%@include file="left_menu_admin.jsp"%>
			<!-- /SIDEBAR -->
			<%
				java.util.Calendar currentDate = java.util.Calendar.getInstance();
				java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
				String todays_date = formatter.format(currentDate.getTime());
				
				Date date = new Date();
				java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("dd/MM/yyyy h:mm:ss a");
				String formattedDate = sdf.format(date);					
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
												href="admin_business_lab.jsp">B2B Customer Master</a></li>
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
											<input type="search" placeholder="Lab/B2B/Collection Center"
												class="typeahead form-control input-SmallText"
												id="seachPartyMaster" onkeyup="getAutoBusinessLabMaster(this.id)" />
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
											data-toggle="modal" data-target="#itemMasterModal" onclick="resetAllField()">
											<i class="fa fa-plus"></i> Add B2B Customer Details
										</button>
										
											<!-- Added By Dayanand For  To export  data in Excel  Date(29-1-2020)-->
												<div style="font-weight: bold;" class="col-md-1-1">
											<button id="btnExport" class="btn btn-xs btn-warning"
												value="Excel" title="" data-placement="left" onclick="ExcelExport()"
												data-toggle="tooltip" data-original-title="Excel"
												style="margin-left: 10px">
												<!-- <i class="fa fa-file"></i> -->
												Export To Excel
											</button>
											<input id="btnExporting" class="btn btn-xs btn-warning" value="Exporting...." title="" data-placement="left" data-toggle="tooltip" data-original-title="Excel" style="margin-left: 10px;display:none">
										</div>
									</div>
									<div class="col-md-12">&nbsp;<div>
									<div class="col-md-4">
									 <label class="radio-inline">
									 <input type="radio" id="all" name="state" value="ALL" checked onclick="getAllBusinessLabMaster()">ALL
									 </label>
									 <label class="radio-inline">
									<input type="radio" id="act" name="state" value="active" onclick="getAllBusinessLabMaster()">Active
									</label>
									 <label class="radio-inline">
									  <input type="radio" id="inact" name="state" value="inactive" onclick="getAllBusinessLabMaster()">InActive
									</label>
    
									</div>
								</div>
							</div>
								</div>
							</div>

							<!-- modal starts here -->
							
							<div class="modal fade" id="itemMasterModal" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="itemMasterModalLabel" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">B2B Customer Master
													
												<div class="pull-right" style="margin-right: 15px;">
													<!-- <button type="button" class="btn btn-primary">Party No. <span class="badge badge-light">0</span></button> -->
													<button type="button" class="btn btn-primary" onclick="savePartyMaster();">Save</button>
													<button type="button" class="btn btn-danger" onclick="onCloseBtnRefrshPage1();" data-dismiss="modal">Close</button>
												</div>
											</h5>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">B2B Customer Master </div>
															<div class="panel-body">
																<form id="partyMaterFormId">
																	<div class="form-group col-md-2">
																		<label for="partyName">Name<b
																			style="color: red;">*</b></label> <input type="text"
																			class="form-control tip-focus" id="labName"
																			placeholder="Enter Name"
																			title="Please enter the lab name" name="partyName">
																	</div>
																	<div class="form-row">
																	
																	<div class="form-group col-md-2">
																			<label for="parent">Code<b
																				style="color: red;">*</b></label> <input type="text"
																				class="form-control tip-focus"
																				id="labCode"
																				placeholder="Enter Code "
																				title="Please enter lab code"
																				name="parent" data-name="parentPartyMaster">
																		</div>
																	<div class="form-group col-md-2">
																			<label for="parent">Registration No<b
																				style="color: red;">*</b></label> <input type="text"
																				class="form-control tip-focus"
																				id="registrationNo"
																				placeholder="Enter registration no "
																				title="Please enter registration no"
																				name="parent" data-name="parentPartyMaster">
																		</div>
																		
																		<div class="form-group col-md-3">
																			<label for="status">Status<b
																				style="color: red;">*</b></label> <select
																				class="form-control" id="masterStatus">
																				<option value="0">--Select Status--</option>
																				<option value="Active">Active</option>
																				<option value="Inactive">Inactive</option>
																			</select>
																		</div>
						
																		<div class="row">
																		<div class="form-group col-md-3">
																			<label for="group">Type<b
																				style="color: red;">*</b></label> <select
																				class="form-control" id="lookupDetIdLay">
																			</select>
																		</div>
																		</div>
																		<!--  <div class="form-group col-md-3">
																			<label for="group">Processing Lab/Parent Lab
																				</label> <select
																				class="form-control" id="parentId">
																				<option value="All">All</option>
																			</select>
																		</div> -->
																		<!--manish  -->
																		
																	    <!--  added by prayag for ticket_id 615 -->
																		<div class="form-group col-md-3">
																			<label for="group">On Board Date
																			 <b style="color: red;">*</b> </label>
																			<input id="onBoardDate" class="form-control input-SmallText" type="text" onclick="displayCalendar(document.getElementById('onBoardDate'),'yyyy-mm-dd',this)" name="date" placeholder="On Board Date" value="">
																		</div>
																		
																		<div id ="Hosptype" class="form-group col-md-2 " style="display: none;">
																			<label for="group">Hospital Type<b
																				style="color: red;">*</b></label> <select
																				class="form-control" id="hospitalType">
																				<option value="NA">--Select Category--</option>
																				<option value="Primary Hospital">Primary Hospital</option>
																				<option value="Secondary Hospital">Secondary Hospital</option>
																		
																			</select>
																		</div>
																		<div id ="beds" class="form-group col-md-2 "style="display: none;">
																			<label for="group">No. Of Beds<b
																				style="color: red;">*</b></label> <select
																				class="form-control" id="hospitalBed">
																				<option value=0>--Select Category--</option>
																				<option value=0-199>0-199</option>
																				<option value=200399>200-399</option>
																				<option value=400-599>400-599</option>
																				<option value=600-799>600-799</option>
																				<option value=800-999>800-999</option>																
																			</select>
																		</div>
																		<div id ="inhouseLab" class="form-group col-md-3 " style="display: none;">
																			<label for="group">InHouse-Lab<b
																				style="color: red;">*</b></label> <select
																				class="form-control" id="unittList">
																				<option value="All">All</option>
																			</select>
																		</div>
																		<div id="unitId" class="form-group col-md-2">
																			<label for="group">Unit<b style="color: red;">*</b></label>
																			<select class="form-control" id="unitList">
											
																			</select>
																		</div>
																		<!-- <div id="parentbalance" class="form-group col-md-2">
																			<label for="group">Parent Balance Utilization<b style="color: red;">*</b></label>
																			<select class="form-control" id="pbutilization">
											
																			</select>
																		</div> -->
																		
																		<div  id="redioBtn" class="form-group col-md-2 " style="display: none;">
																		<label>Lab Available: </label>
																			<div class="input-group">
																				<div id="radioBtn" class="btn-group">
																					<a class="btn btn-primary btn-sm active"
																						data-toggle="labAvailableSwitch"
																						id="labAvailableSwitchYes" data-title="Y"
																						onclick="toggleSwitch(this.id)">YES</a> <a
																						class="btn btn-primary btn-sm notActive"
																						data-toggle="labAvailableSwitch"
																						id="labAvailableSwitchNo" data-title="N"
																						onclick="toggleSwitch(this.id)">NO</a>
																				</div>
																				<input type="hidden" name="labAvailableSwitch"
																					id="labAvailableSwitch">
																			</div>
																		</div>
																		<!--manish  end -->
																		<!-- added by Rohit on 16-02-2022 --> 
																		<div class="form-group col-md-3 hide">
																			<label for="group">Collection Center
																			<!-- <b style="color: red;">*</b> -->
																			</label> <select
																				class="form-control" id="collectionCenterList">
																			</select>
																		</div>
																		
																	</div>
																</form>
															</div>
														</div>	
														<div class="container" style="margin-top: 2%;">
															<ul class="nav nav-tabs">
																<li class="active"><a data-toggle="tab"
																	href="#generalInfo">General Info <b
																								style="color: black;">*</b> </a></li>
																<li><a data-toggle="tab" href="#contactInfo">Contact Info <b
																								style="color: black;">*</b> </a></li>
																<li><a data-toggle="tab" href="#marketingInfo">Marketing Info</a></li>
																<li><a data-toggle="tab" href="#addressnfo">Address Info <b
																								style="color: black;">*</b></a></li>
																<li><a data-toggle="tab" href="#StatsInfo">Stats Info</a></li>
																<li><a data-toggle="tab" href="#PaymentInfo">Bank Info</a></li>
																<li id="paymentInfo"><a data-toggle="tab" href="#paymentInfoo">Payment Info <b
																								style="color: black;">*</b></a></li>
																<!-- <li><a data-toggle="tab" href="#uploadDetails">Upload Pan Card/ Visiting Img</a></li> -->
																<li><a data-toggle="tab" href="#TermsAndConditionInfo" onclick="getMasterTermsAndCondition()">Terms And Conditions Info</a></li>
																
																<li><a data-toggle="tab" href="#contractTab" onclick="defaultRowForContract()">Contract/Agreement Info</a></li>
																<li><a data-toggle="tab" href="#uploadDocumentsInfo">Upload Documents</a></li>
																		
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
																							<label for="mobileNo">Mobile No </label><b
																								style="color: red;">*</b> <input type="text"
																								class="form-control tip-focus"
																								id="generalMobileNo" onkeypress="return validateNumOnly(event)"
																								placeholder="Enter mobile no"
																								title="Please enter the mobile no" maxlength="10"
																								name="mobileNo">
																						</div>
																						<div class="form-row">
																							<div class="form-group col-md-6">
																								<label for="landLineNo">LandLine No </label> <input
																									type="text" class="form-control tip-focus"
																									id="generalLandLineNo"
																									placeholder="Enter landline no"
																									title="Please enter the landline no"
																									name="landLineNo" maxlength="12"  onkeypress="return validateNumOnly(event)">
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
																								<label for="gstNO">GSTTx No / TRN No</label> <input
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
																								<button type="button" class="btn btn-primary" id="saveGeneralInfo" style=""  onclick="addGeneralInfoRows('GeneralInfo')">Add</button>
																								<button type="button" class="btn btn-primary" id="updateGeneralInfo" style="display: none;" onclick="updateGeneralInfoPartyMaster()">Update</button>
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
																								<tr><th style='height: 21.5px;' class='col-md-1 center'><div>Sr.No</div></th>
																								<th class='col-md-2 center'><div>GSTTx No</div></th>
																								<th class='col-md-2 center'><div>Mobile No</div></th>
																								<th class='col-md-2 center'><div>Company Mail </div></th>
																								<th class='col-md-2 center'><div>LandLine No. </div></th>
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
																								<label for="phoneOne">Phone-1</label> <input
																									type="tel" class="form-control tip-focus"
																									id="contactPhoneOne"
																									placeholder="Enter first phone no "
																									title="Please enter the first phone no "
																									maxlength="10"
																									name="phoneOne" onkeypress="return validateNumOnly(event)">
																							</div>

																							<div class="form-group col-md-6">
																								<label for="phoneSecond">Phone-2</label> <input
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
																								<label for="dateofbirth">Age
																								</label> <input type="text"
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
																							
																								<button type="button" class="btn btn-primary" id="saveContactInfo" style=""  onclick="addGeneralInfoRows('ContactInfo')">Add</button>
																								<button type="button" class="btn btn-primary" id="updateContactInfo" style="display: none;" onclick="updateContactInfoPartyMaster()">Update</button>
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
																								<tr><th style='height: 21.5px;' class='col-md-1 center'><div>Sr.No</div></th>
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
																<!-- marketing Info tab starts here added by prayag for ticket_id 615-->
																<div id="marketingInfo" class="tab-pane fade">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<div class="container">
																				<div class="row">
																					<div class="col-md-6">
																						<form name="marketingPersonDetailsForm" method="post" id="marketingPersonFormId">
																						<input type="hidden" id="markInfoIdNew" />
																						
																						<div class="form-group col-md-6">
																								<label for="marketingPersonType">Marketing Person Type<b style="color: red;"> * </b></label> <select
																									class="form-control" id="marketingPersonType">
																									<option value="">Select</option>
																					                <option value="Primary Marketing Person">Primary Marketing Person</option>
																					                <option value="Secondary Marketing Person">Secondary Marketing Person</option>
																					                <option value="Supporting Person">Supporting Person</option>
																								</select>
																							</div>
																							<div class="form-group col-md-6">
																								<label for="marketingPerson">Name<b style="color: red;"> * </b></label> <select
																									class="form-control" id="marketingPerson">
																								</select>
																							</div>
																							<div class="form-group col-md-6">
																								<label for="remark">Remark</label>
																								<textarea type="text"
																									class="form-control tip-focus"
																									id="marketingPersonRemark" placeholder="Enter remark"
																									title="Please enter remark" name="remark"></textarea>
																							</div>
																							<div class="form-group col-md-6">
																							 <label class="TextFont">From Date<b style="color: red;"> * </b></label>
																							 <input id="fromDate" class="form-control input-SmallText" type="text" onclick="displayCalendar(document.getElementById('fromDate'),'yyyy-mm-dd',this)" name="date" placeholder="From Date" value="">
																							</div>
																				            <div class="form-group col-md-6">
																							 <label class="TextFont">To Date<b style="color: red;"> * </b></label>
																							 <input id="toDate" class="form-control input-SmallText" type="text" onclick="displayCalendar(document.getElementById('toDate'),'yyyy-mm-dd',this)" name="date" placeholder="To Date" value="">
																							</div>
																							<div class="form-group col-md-6">
																							
																								<button type="button" class="btn btn-primary" id="savemarketingPersonInfo" style=""  onclick="addGeneralInfoRows('marketingInfo');">Add</button>
																								<button type="button" class="btn btn-primary" id="updateMarketingInfo" style="display: none;" onclick="updateMarketingPersonInfoPartyMaster()">Update</button>
																								<button class="btn btn-danger" type="reset"
																									onclick="resetInfoFields('marketingInfo')">Reset</button>
																							</div>
																						</form>
																					</div>
																					<div class="col-md-6">

																						<div>
																							<div
																								style='width: 100%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;'>
																								<table class='table table-striped table-bordered header-fixed cf' style='width: 120%;height:100%;' id="marketingInfoTable">
																								<thead class='cf' style='background: white;'>
																								<tr><th style='height: 21.5px;' class='col-md-1 center'><div>Sr.No</div></th>
																								<th class='col-md-2 center'><div>Name</div></th>
																								<th class='col-md-2 center'><div>Type</div></th>
																								<th class='col-md-2 center'><div>Remark</div></th>
																								<th class='col-md-2 center'><div>From Date </div></th>
																								<th class='col-md-2 center'><div>To Date </div></th>
																								<th class='col-md-1 center'><div>Edit</div></th>
																								<th class='col-md-1 center'><div>Delete</div></th> </tr></thead>
																								<tbody id="PartyMarketingPersonInfoList">
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
																<!-- marketing tab ends here -->
																<!-- address tab starts here -->
																<div id="addressnfo" class="tab-pane fade">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<div class="container">
																				<div class="row">	
																					<div class="col-md-6">
																						<form name="itemPurchasedetialsForm" method="post" id="addressFormId">
																							<input type="hidden" id="addInfoIdNew" />
																							<div class="form-group col-md-6">
																								<label for="country">Country</label> <input type="hidden" id="hiddenCountryFromPartyMaster" /><select
																								    class="form-control"
																									id="countryFromAddress"
																									title="Please enter the country "
																									data-name="getStateOnPartyMaster"
																									name="country">
																										    <option value="0">--Select Country--</option>
																											<option value="1">India</option>
																											<option value="2">Singapore</option>
																											<option value="3">Spain</option>
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
																									class="form-control" id="townId" data-name="getLocalityOnPartyMaster" >
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
																								
																								<button type="button" class="btn btn-primary" id="saveAddressInfo" style=""  onclick="addGeneralInfoRows('AddressInfo')">Add</button>
																								<button type="button" class="btn btn-primary" id="updateAddressInfo" style="display: none;" onclick="updateAddressInfoPartyMaster()">Update</button>
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
																								<tr><th class='col-md-1 center'><div>Sr.No</div></th>
																								<!-- <th class='col-md-2 center'><div>Company</div></th> -->
																								<th class='col-md-2 center'><div>Country</div></th>
																								<th class='col-md-2 center'><div>city</div></th>
																								<th class='col-md-2 center'><div>Address</div></th>
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
																<!-- bank tab start here -->
																<div id="PaymentInfo" class="tab-pane fade">
																	<div class='panel panel-primary'>
																		<div class="panel-body">
																			<div class="container">
																				<div class="row">
																					<div class="col-md-6">
																					<form name="itemPurchasedetialsForm" method="post" id="paymentFormId">
																					<input type="hidden" id="payInfoIdNew" />
																						<!-- <div class="form-group col-md-6">
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
																						</div> -->
																						<div id="BId" class="form-group col-md-6">
																			<label for="group">Bank Name<b style="color: red;">*</b></label>
																			<select class="form-control" id="bankList">
											
																			</select>
																		</div>
																						<div class="form-group col-md-6">
																							<label for="Branch/IFSC">IFSC Code</label>
																							<input type="text" class="form-control tip-focus"
																									id="bankIfscCode"
																									placeholder="Branck or IFSC"
																									title="Please enter the IFSC "
																									name="bankIfscCode">
																						</div>
																						
																						<div class="form-group col-md-6">
																							<label for="Branch Name">Branch Name</label>
																							<input type="text" class="form-control tip-focus"
																									id="branchname"
																									placeholder="Branch name"
																									title="Please enter the Branch Name "
																									name="branchname">
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
																							<label for="MICR Code"> MICR Code</label>
																							<input type="text" class="form-control tip-focus"
																									id="micrcode"
																									placeholder="MICR Code"
																									title="Please enter MICR Code "
																									name="micrcode" onkeypress="return validateNumOnly(event)">
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
																						<div class="form-group col-md-6" >
																							<label for="UPI ID">UPI ID</label>
																							<input type="text" class="form-control tip-focus"
																									id="upiId"
																									placeholder="UPI ID"
																									title="Please enter UPI ID "
																									name="upiId">
																						</div>
																						<div class="form-group col-md-6" style="display:none">
																							<label for="Payment Term">Payment Term</label>
																							<input type="text" class="form-control tip-focus"
																									id="paymentTerm"
																									placeholder="Payment Term"
																									title="Please enter Payment Term "
																									name="paymentTerm">
																						</div>
																						<div class="form-group col-md-6" style="display:none">
																							<label for="Credit Term">Credit Term</label>
																							<input type="text" class="form-control tip-focus"
																									id="creditTerm"
																									placeholder="Credit Term"
																									title="Please enter Credit Term "
																									name="creditTerm">
																						</div>
																						
																						<div class="form-group col-md-6">
																							<button type="button" class="btn btn-primary" id="savePaymentInfo" style=""  onclick="addGeneralInfoRows('paymentInfo')">Add</button>
																							<button type="button" class="btn btn-primary" id="updatePaymentInfo" style="display: none;" onclick="updatePaymentInfoPartyMaster()">Update</button>
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
																									<tr><th class='col-md-1 center'><div>Sr.No</div></th>
																									<th class='col-md-2 center'><div>Account Name</div></th>
																									<th class='col-md-2 center'><div>Account Number</div></th>
																									<th class='col-md-2 center'><div>MICR Code</div></th>
																									<th class='col-md-2 center'><div>Address</div></th>
																									<th class='col-md-2 center'><div>UPI ID</div></th>
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
																<!-- bank tab end -->
																<!-- payment tab Start -->
																<div id="paymentInfoo" class="tab-pane fade">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<div class="container">
																				<div class="row">
																					<div class="col-md-6">
																						<form name="itemPurchasedetialsForm" method="post" id="paymentPrepaidFormId">
																							<input type="hidden" id="addInfoIdNew" />

																							<div class="form-group col-md-6">
																								<label>Prepaid &nbsp; <input type="radio"
																									name="radSize"   onclick="getPrepaidDetails()" checked id="prepaid" value="small"
																									 /></label> &nbsp; &nbsp;
																									
																									
																								<label>PostPaid &nbsp; <input type="radio"
																									name="radSize" onclick="getPostPaidDetails()" id="postpaid" value="small"
																									 />	</label>
																									
																							</div>

																							<div id="prepaidDetails" class="form-group col-md-12">
																							<div class="form-group col-md-6">
       																 				<label for="clientField">Client Potential</label>
       																			 <input type="text" class="form-control tip-focus" id="clientFieldPre" placeholder="Enter Client" title="Please enter Client" name="clientField">
    																					</div>
    																					
																						<div class="form-group col-md-6">
																							<label for="mobileNo">Credit Amount<b style="color: red;"> * </b> </label> <input type="text"
																								class="form-control tip-focus"
																								id="creditAmount" onkeypress="return validateNumOnly(event)"
																								placeholder="Enter Credit Amount"
																								title="Please enter the Credit Amount">
																						</div>
																							
																						<div class="form-group col-md-6">
																							<label for="mobileNo">Advance Amount<b style="color: red;"> * </b> </label> <input type="text"
																								class="form-control tip-focus"
																								id="advanceAmount" onkeypress="return validateNumOnly(event)"
																								placeholder="Enter Advance Amount"
																								title="Please enter the Advance Amount" maxlength="10"
																								name="mobileNo">
																						</div>
																							
																							
																							<div class="form-group col-md-6">
																								<label for="landLineNo">PrePaid Day<b
																								style="color: red;">*</b></label> <input
																									type="text" class="form-control tip-focus"
																									id="prePaidDay"
																									placeholder="Please enter PrePaid Day"
																									title="Please enter PrePaid Day"
																									name="landLineNo" maxlength="12" onchange="testReminderOnPrepaidDay(this.id) ; testBlockOnPrepaidDay(this.id)">
																							</div>
																							
																							<div class="form-group col-md-6">
																							 <label class="TextFont">From Date<b style="color: red;"> * </b></label>
																							 <input id="preFromDate" class="form-control input-SmallText" type="text" onclick="displayCalendar(document.getElementById('preFromDate'),'yyyy-mm-dd',this)" name="date" placeholder="From Date" value="">
																							</div>
																				            <div class="form-group col-md-6">
																							 <label class="TextFont">To Date<b style="color: red;"> * </b></label>
																							 <input id="preToDate" class="form-control input-SmallText" type="text" onblur="validateDate()" onclick="displayCalendar(document.getElementById('preToDate'),'yyyy-mm-dd',this)" name="date" placeholder="To Date" value="">
																							</div>
																							
																							<div class="form-group col-md-6">
																											<label for="landLineNo">Reminder On Percentage<b
																											style="color: red;">*</b></label> <input
																												type="text" class="form-control tip-focus"
																												id="reminderOnPercentagePrepaid"
																												placeholder="Please enter Reminder On Percentage"
																												title="Please enter Reminder On Percentage"
																												name="smsOnPercentagePrepaid" maxlength="12"  onchange="testReminderOnPercentage(this.id)">
																										</div>
																										
																										
																										<div class="form-group col-md-6">
																											<label for="landLineNo">Block On Percentage<b
																											style="color: red;">*</b></label> <input
																												type="text" class="form-control tip-focus"
																												id="blockOnpercentagePrepaid"
																												placeholder="Please enter Block On Percentage"
																												title="Please enter Block On Percentage"
																												name="blockOnpercentagePrepaid" maxlength="12"  onchange="testReminderOnPercentage(this.id)">
																										</div>
																										
																										
																										
																										<div class="form-group col-md-6">
																									<label for="landLineNo">Reminder On Prepaid Day
																										<b style="color: red;">*</b>
																									</label> <input type="text"
																										class="form-control tip-focus"
																										id="reminderOnPrePaidDay"
																										placeholder="Please enter Reminder On PrePaidDay"
																										title="Please enter Reminder On PrePaidDay"
																										name="bppercentage" maxlength="12"  onchange="testReminderOnPrepaidDay(this.id) ; testBlockOnPrepaidDayCompare(this.id)"> <span class="error-span"></span>
																								</div>
																								
																								
																								<div class="form-group col-md-6">
																									<label for="landLineNo">Block On Prepaid Day
																										<b style="color: red;">*</b>
																									</label> <input type="text"
																										class="form-control tip-focus"
																										id="blockOnPrePaidDay"
																										placeholder="Please enter Block On PrePaidDay"
																										title="Please enter Block On PrePaidDay"
																										name="bppercentage" maxlength="12" onchange="testBlockOnPrepaidDay(this.id) ; testBlockOnPrepaidDayCompare(this.id)">
																								</div>

																								<div class="form-group col-md-6">
																								<label for="remark">Remark</label>
																								<textarea type="text"
																									class="form-control tip-focus"
																									id="marketingPersonRemark" placeholder="Enter remark"
																									title="Please enter remark" name="remark"></textarea>
																							      </div>		
																							
																							<div class="form-group col-md-6" id="prereasonDIV"style="display:none;">
																								<label for="reason">Reason<b style="color: red;">*</b></label>
																								<textarea type="text"
																									class="form-control tip-focus"
																									id="prereason" placeholder="Enter reason"
																									title="Please enter reason" name="reason" required></textarea>
																							      </div>		
																						
																							</div>
																							
																																							
																							<div id="postPaidDetaisls" style="display: none" class="form-group col-md-12">
																							<div class="form-group col-md-6">
        														<label for="clientField">Client Potential</label>
      													  <input type="text" class="form-control tip-focus" id="clientField" placeholder="Enter Client" title="Please enter Client" name="clientField">
    																		</div>
																							
																							

																							<div class="form-group col-md-6">
																								<label for="generalWebSite">Credit Day</label> <input
																									type="text" class="form-control tip-focus"
																									id="creditDay"
																									placeholder="Enter CreditDay"
																									title="Please enter  Credit Day"
																									name="webSite" onchange="testReminderOnCreditDay(this.id); testBlockOnCreditDay(this.id)">
																							</div>
																							
																							
																							
																							<div class="form-group col-md-6">
																								<label for="panNo">Credit Amount<b style="color: red;"> * </b></label> <input
																									type="text" class="form-control tip-focus"
																									id="creditAmt"  placeholder="Enter Credit Amount"
																									title="Please enter credit AMount" name="panNo" maxlength="10">
																							</div>
																							
																							<div class="form-group col-md-6">
																							 <label class="TextFont">From Date<b style="color: red;"> * </b></label>
																							 <input id="postFromDate" class="form-control input-SmallText" type="text" onclick="displayCalendar(document.getElementById('postFromDate'),'yyyy-mm-dd',this)" name="date" placeholder="From Date" value="">
																							</div>
																				            <div class="form-group col-md-6">
																							 <label class="TextFont">To Date<b style="color: red;"> * </b></label>
																							 <input id="postToDate" class="form-control input-SmallText" type="text" onclick="displayCalendar(document.getElementById('postToDate'),'yyyy-mm-dd',this)" name="date" placeholder="To Date" value="">
																							</div>
																							
																							<div class="form-group col-md-6">
																											<label for="landLineNo">Reminder On Percentage<b
																											style="color: red;">*</b></label> <input
																												type="text" class="form-control tip-focus"
																												id="remindernPercentagePostPaid"
																												placeholder="Please enter Reminder On Percentage"
																												title="Please enter Reminder On Percentage"
																												name="smsOnPercentagePostPaid" maxlength="12" onclick="testReminderOnPercentagePostPaid(this.id)">
																										</div>
																										
																										
																										<div class="form-group col-md-6">
																											<label for="landLineNo">Block On Percentage<b
																											style="color: red;">*</b></label> <input
																												type="text" class="form-control tip-focus"
																												id="blockOnpercentagePostPaid"
																												placeholder="Please enter Block On Percentage"
																												title="Please enter Block On Percentage"
																												name="blockOnpercentagePostPaid" maxlength="12" onclick="testReminderOnPercentagePostPaid(this.id)">
																										</div>
																										
																										
																										<div class="form-group col-md-6">
																									<label for="landLineNo">Reminder On
																										Credit Day<b style="color: red;">*</b>
																									</label> <input type="text"
																										class="form-control tip-focus"
																										id="reminderOnCreditDay"
																										placeholder="Please enter Reminder On Credit Day"
																										title="Please enter Reminder On Credit Day"
																										name="bppercentage" maxlength="12" onchange="testReminderOnCreditDay(this.id)">
																								</div>
																								
																								
																								
																								<div class="form-group col-md-6">
																									<label for="landLineNo">Block On
																										Credit Day<b style="color: red;">*</b>
																									</label> <input type="text"
																										class="form-control tip-focus"
																										id="blockOnCreditDay"
																										placeholder="Please enter Block On Credit Day"
																										title="Please enter Block On Credit Day"
																										name="bppercentage" maxlength="12" onchange="testBlockOnCreditDay(this.id)">
																								</div>
																								
																								<div class="form-group col-md-6">
																								   <label for="remark">Remark</label>
																								   <textarea type="text"
																									  class="form-control tip-focus"
																									  id="marketingPersonRemark" placeholder="Enter remark"
																									  title="Please enter remark" name="remark"></textarea>
																							    </div>

																									<div class="form-group col-md-6"  id="postreasonDIV"style="display:none;">
																								   <label for="reason">Reason<b style="color: red;">*</b></label>
																								   <textarea type="text"
																									  class="form-control tip-focus"
																									  id="postreason" placeholder="Enter reason"
																									  title="Please enter Reason" name="reason" required></textarea>
																							    </div>
																										
																							
																							</div>
																							
																							
																							<div class="form-group col-md-6" style="display:none">
																								
																								<button type="button" class="btn btn-primary" id="saveAddressInfo" style=""  onclick="addGeneralInfoRows('AddressInfo')">Add</button>
																								<button type="button" class="btn btn-primary" id="updateAddressInfo" style="display: none;" onclick="updateAddressInfoHospitalMaster()">Update</button>
																								<button class="btn btn-danger" type="reset"
																									onclick="resetInfoFields('addressInfo')">Reset</button>
																							</div>
																							
																						</form>
																					</div>
																					
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																
																<!-- payment tab End -->
																<!-- terms condition tab start here -->
																<div id="TermsAndConditionInfo" class="tab-pane fade">
																	<div class='panel panel-primary'>
																		<div class="panel-body">
																			<div class="container">
																				<div class="row">
																					<div class="col-md-6">
																						<form name="itemPurchasedetialsForm" method="post" id="TermsAndConditionInfoId">
																							<!--  <div class="form-group col-md-6" >
																								<label for='Terms And Condition'>Terms And Condition Title</label> <select
																									class="form-control" id="termsAndConditionsTitle" onchange="getTermConditionMaster(this.value)">
																									<option value="0">Select</option>
																									</select> <input type="hidden" id="termsAndConditionsSelectedId" value=0 />
																							</div>  -->
																							<div class="form-group col-md-12">
																								<label for="Branch/IFSC">Terms And Condition</label>
																								<textarea type="text" class="form-control tip-focus"
																										id="termsAndCondition"
																										placeholder="terms and condition"
																										title="Please enter the terms and condition "
																										name="termsAndCondition"></textarea>
																							</div>
																							
																							<div class="form-group col-md-6">
																								<button type="button" class="btn btn-primary" id="saveTermsAndConditionInfo" style=""  onclick="addGeneralInfoRows('TermsAndConditionInfo')">Add</button>
																								<button type="button" class="btn btn-primary" id="updateTermsAndConditionInfo" style="display: none;" onclick="updateTermsAndConditionPartyMaster()">Update</button>
																								<button class="btn btn-danger" type="reset"
																									onclick="resetInfoFields('TermsAndConditionInfo')">Reset</button>
																							</div>
																						</form>
																					</div>
																					
																					<div class="col-md-6"
																						style="height: 150px; margin-bottom: 0px; margin-top: 20px;">
																						<div>
																							<div
																								style='width: 100%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;'>
																							
																								<table class='table table-striped table-bordered header-fixed cf' style='width: 120%;height:100%;' id="TermsAndConditionInfoTable">
																									<thead class='cf' style='background: white;'>
																									<tr><th class='col-md-1 center'><div>Sr.No</div></th>
																									<!-- <th class='col-md-2 center'><div>Title</div></th> -->
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
																<!--Start Stats Info  -->
																<div id="StatsInfo" class="tab-pane fade">
																	<div class='panel panel-primary'>
																		<div class="panel-body">
																			<div class="container">
																				<div class="row">
																					<div class="col-md-6">
																						<form name="itemPurchasedetialsForm" method="post" id="statistisFormId">
																							 <!-- <div class="form-group col-md-6" >
																								<label for='Terms And Condition'>Te</label> <select
																									class="form-control" id="termsAndConditionsTitle" onchange="getTermConditionMaster(this.value)">
																									<option value="0">Select</option>
																									</select> <input type="hidden" id="termsAndConditionsSelectedId" value=0 />
																							</div>  -->
																							<div class="form-group col-md-6">
																								<label for="Branch/IFSC">Average Patient Footfall Per Day</label>
																								<input type="text" class="form-control tip-focus"
																										id="Avg_Patient_Footfall_Per_Day"
																										placeholder="average patient footfall per day"
																										title="Please enter the average patient footfall per day "
																										name="Avg_Patient_Footfall_Per_Day" />
																							</div>
																							<div class="form-group col-md-6">
																								<label for="Branch/IFSC">Average Outs No Per Day</label>
																								<input type="text" class="form-control tip-focus"
																										id="Avg_Outs_No_Per_Day"
																										placeholder="average outs no per day"
																										title="Please enter the average outs no per day "
																										name="average outs no per day" />
																							</div>
																							
																							<!-- <div class="form-group col-md-6">
																								<button type="button" class="btn btn-primary" id="saveTermsAndConditionInfo" style=""  onclick="addGeneralInfoRows('TermsAndConditionInfo')">Add</button>
																								<button type="button" class="btn btn-primary" id="updateTermsAndConditionInfo" style="display: none;" onclick="updateTermsAndConditionPartyMaster()">Update</button>
																								<button class="btn btn-danger" type="reset"
																									onclick="resetInfoFields('TermsAndConditionInfo')">Reset</button>
																							</div> -->
																						</form>
																					</div>
																					
																					<div class="col-md-6" 
																						style="height: 150px; margin-bottom: 0px; margin-top: 20px;display:none;">
																						<div>
																							<div
																								style='width: 100%; padding: 1%; font-weight: normal; height: 100%; overflow-y: scroll; border: 1px solid #436a9d;'>
																							
																								<table class='table table-striped table-bordered header-fixed cf' style='width: 120%;height:100%;' id="TermsAndConditionInfoTable">
																									<thead class='cf' style='background: white;'>
																									<tr><th class='col-md-1 center'><div>Sr.No</div></th>
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
																<!--End Stats Info  -->
																
																
																<!-- Agreement tab starts here -->
																<div id="contractTab" class="tab-pane fade">
																	<div class="panel panel-primary">
																		<div class="panel-body" style=" height:250px">
																			<form id="contractFormId">
																				<div class="row">
																					<div class="form-group col-md-3 pull-right" style="margin-bottom: -5px;text-align: right;" id="plusMinusButtonDivIdGeneratedMrn">
																						<div class="form-group col-md-8">
																							<button type="button"
																								class="btn btn-xs btn-success btn-number"
																								onclick="addNewContractRow()">
																								<span class="glyphicon glyphicon-plus"></span>
																							</button>
																							<button type="button"
																								class="btn btn-xs btn-danger btn-number"
																								onclick="removeRowFromContractTable('itemContractTableId','chkContract')">
																								<span class="glyphicon glyphicon-minus"></span>
																							</button>
																						</div>
																					</div>
																					<div style="height: 100px; margin-left: 2%;" >
																						<div style='width: 98%; padding: 1%; font-weight: normal; height:180px;overflow-y: scroll; border: 1px solid #436a9d;'>
																							<table  id = "itemContractTableId" class="table table-bordered table-striped table-condensed">
																								<thead class='cf' style='background: white;'>
																									<tr>
																										<th class='col-md-1 center'>Select</th>
																										<th class='col-md-1 center'>Sr.No</th>
																										<th class='col-md-2 center'>Agreement / Contract</th>
																										<th class='col-md-1 center'>Duration</th>
																										<th class='col-md-1 center'>Time Period</th>
																										<th class='col-md-1 center'>From Date</th>
																										<th class='col-md-1 center'>To Date</th>																										
																									</tr>
																								</thead>
																							<tbody id="itemContractTableBodyId">
																							
																							</tbody>
																							</table>
																						</div>
																					</div>
																				</div>
																			</form>
																		</div>
																	</div>
																</div>
																<!--  Agreement tab ends here -->
																
																<!-- Document upload tab starts here -->
																<div id="uploadDocumentsInfo" class="tab-pane fade">
																	<div class="panel panel-primary" style="margin-top: 20px">		
																		<div class="panel-body">															
																			<form id="dcfileUploadfrm" name="dcfileUploadfrm" enctype="multipart/form-data" method="post">																			
																				<div class="row">
																					<div class="col-md-4">
																						<div class="form-group col-md-6">
																							<label for="mobileNo">Document Name </label> 
																							<input type="text" class="form-control tip-focus"
																								id="documentName" placeholder="Enter Document Name"
																								title="Please Enter Document Name" name="documentName">
																						</div>
																						
																						<div class="form-group col-md-6">
																							<label for="mobileNo">Document Comment </label> 
																					 	    <textarea class="form-control tip-focus" id="documentComment"></textarea>
																							<!-- <input type="text" class="form-control tip-focus"
																								id="documentComment" placeholder="Enter Document Comment"
																								title="Please Enter Document Name" name="documentComment"> -->
																						</div>
																						
																						<div class="form-group col-md-12">
																							<label for="mobileNo">Browse Document </label>  <input type="file" class="form-control" name="documentFile"
																								id="documentFile" multiple="multiple"
																								style = "  border: none !important "
																								onchange="uploadCustomerContractDocuments()" ><br>
																						</div>
																						
																						<div class="form-group col-md-6" style="margin-top: 15px">
																							<button type="button" class="btn btn-primary" id="saveUploadDocs"
																								onclick="addUploadDocsRows('uploadDocumentsInfo')">Add</button>																						
																							<button class="btn btn-danger" type="reset"
																								onclick="resetUploadInfoFields('uploadDocumentsInfo')">Reset</button>
																						</div>		
																						
																						<div class="form-group col-md-6 progress progress-striped" style="margin-top: 20px">
																							<div class="progress-bar progress-bar-success" role="progressbar" id="prgBar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">
																								<span class="sr-only">0% Complete</span>
																						  	</div>
																						</div>															
																						
																					</div>
																					<div class="col-md-8">
																						<div>
																							<div style='width: 100%; padding: 1%; font-weight: normal; height: 170px; overflow-y: scroll; border: 1px solid #436a9d;'>
																								<table class='table table-striped table-bordered header-fixed cf' id="uploadDocumentTable">
																									<thead class='cf' style='background: white;'>
																										<tr>
																											<th class='col-md-1 center'><div>Sr.No</div></th>
																											<th class='col-md-2 center'><div>Document Name</div></th>
																											<th class='col-md-1 center'><div>Date</div></th>
																											<th class='col-md-1 center'><div>View</div></th>
																											<th class='col-md-1 center'><div>Delete</div></th>
																										</tr>
																									</thead>
																									<tbody id="uploadedDocumentTBody">
	
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
																<!-- Document upload tab ends here -->
																
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
							
							<!-- Document Preview Modal -->
							<div id="docPreviewModal" class="modal" data-backdrop="static">
							  <div class="modal-dialog">
							
							    <!-- Modal content -->
							    <div class="modal-content">
							      <div class="modal-header">
							        <button type="button" class="close" data-dismiss="modal">&times;</button>
							        <h4 class="modal-title" style="text-align: center;">Document Preview</h4>
							      </div>
							      <div class="modal-body">
							        <center><iframe id="preview" style="width: 300px;height: 350px;">	</iframe></center>
							      </div>
							      <div class="modal-footer">
							        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							      </div>
							    </div>
							
							  </div>
							</div>

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
																	<div class="panel-heading" id="divEhatContent">Lab/B2B/Collection Center
																		 Table</div>
																	<div class="panel-body" id="partyMasterInfo">
																		<div class="collectionCenterTableData">
																			<table id="ehatTable" class="datatable table table-striped table-bordered">
																				<thead id="ehatTHead">
																					<tr>
																						<th class="col-md-1 center">Sr.No</th>
																						<th class="col-md-1 center">ID</th>
																						<th class="col-md-1 center">Name</th>
																						<th class="col-md-1 center">Code</th>
																						<th class="col-md-1 center">Registration No</th>
																						<th class="col-md-1 center">Payment Type</th>
																						<th class="col-md-1 center">Unit Name</th>		
																						<th class="col-md-1 center">Edit</th>
																						<th class="col-md-1 center">Delete</th>
																					</tr>
																				</thead>
																				<tbody id="businessLabMasterList">
																				</tbody>
																			</table>
																		</div>
																	</div>
																	<!--    Starting pagination    --> <!-- added by prayag for ticket_id SA_039 -->
															  <div style="margin-top: -1%">
															     	<div class="pull-right">
																  	   <ul class="pagination pagination-blue margin-bottom-10"
																		id="labMasterjumpToPage">
																	   </ul>
																	   <ul class="pagination pagination-blue margin-bottom-10"
																		id="labMasterPagination">
																	   </ul>
																	   <ul class="pagination pagination-blue margin-bottom-10"
																		id="labMasterNumberOfPages">
																 	   </ul>
																   </div>
															 </div>
															<!--   Ending  pagination -->
													  </div>
													 			 <!-- Added for excel table -->
																<div id="runtimeDiv"></div>
																<!-- ended -->
																<!-- Added For Export To Excel -->
																<div class="panel panel-primary" style="display: none">
																	<div class="panel-heading" id="divEhatContent">Lab/B2B/Collection Center
																		 Table</div>
																	<div class="panel-body" id="partyMasterInfo11" style="overflow: auto;height: 300px">
																		<table id="ehatTable" class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">Sr.No</th>
																					<th class="col-md-1 center">ID</th>
																					<th class="col-md-1 center">Lab Name</th>
																					<th class="col-md-1 center">Lab Code</th>
																					<th class="col-md-1 center">Registration No</th>
																					<th class="col-md-1 center">Payment Type</th>
																					
																				</tr>
																			</thead>
																			<tbody id="businessLabMasterList1">
																			</tbody>
																		</table>
																	</div>
																</div>
																<!--------- End---- -->
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
			
			
		
			<div id="pleaseWait" style="text-align: center; display: none;">
				<img style="margin-top: 250px;" height="43px" src="images/loading_black.gif" />
				<div style="margin-top: 10px; color: white">
					<b>Please wait...</b>
				</div>
			</div>
			<%@include file="footer_nobel.jsp"%>
		</section>
		<!--/PAGE -->

		<!-- JAVASCRIPTS -->
		<%@include file="inv_footer.jsp"%>
		<!-- BOOTSTRAP SWITCH -->
		<script type="text/javascript" src="ehat-design/js/bootstrap-switch/bootstrap-switch.min.js"></script>
		<!-- /JAVASCRIPTS -->
		
		<input type="hidden" id="type" value="2" />
		<input type="hidden" id="partyMasterId" value="0">
		<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="userUnitId" value="<%=session.getAttribute("userUnitId")%>">
		<input type="hidden" id="callFrom" value="fromUI">
		<input type="hidden" id="activePage" value="0" />
		
		<script>
			/*
			 * @author: Rohit Sandbhor
			 * @date:- 23-10-2019
			 * @codeFor:- below js function to call the getAllWarehouseMasterRecords() on ready
			 */
			jQuery(document).ready(function() {

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
					target : "onBoardDate",
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
					target : "fromDate",
					/* dateFormat:"%d-%M-%Y", */
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					/* cellColorScheme:"beige", */
					dateFormat : "%d-%m-%Y",
					imgPath : "../img/",
					weekStartDay : 1,
				});
				
				new JsDatePick({
					useMode : 2,
					target : "toDate",
					/* dateFormat:"%d-%M-%Y", */
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					/* cellColorScheme:"beige", */
					dateFormat : "%d-%m-%Y",
					imgPath : "../img/",
					weekStartDay : 1,
				});
				
				new JsDatePick({
					useMode : 2,
					target : "preFromDate",
					/* dateFormat:"%d-%M-%Y", */
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					/* cellColorScheme:"beige", */
					dateFormat : "%d-%m-%Y",
					imgPath : "../img/",
					weekStartDay : 1,
				});
				
				new JsDatePick({
					useMode : 2,
					target : "preToDate",
					/* dateFormat:"%d-%M-%Y", */
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					/* cellColorScheme:"beige", */
					dateFormat : "%d-%m-%Y",
					imgPath : "../img/",
					weekStartDay : 1,
				});
				
				new JsDatePick({
					useMode : 2,
					target : "postFromDate",
					/* dateFormat:"%d-%M-%Y", */
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					/* cellColorScheme:"beige", */
					dateFormat : "%d-%m-%Y",
					imgPath : "../img/",
					weekStartDay : 1,
				});
				
				new JsDatePick({
					useMode : 2,
					target : "postToDate",
					/* dateFormat:"%d-%M-%Y", */
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					/* cellColorScheme:"beige", */
					dateFormat : "%d-%m-%Y",
					imgPath : "../img/",
					weekStartDay : 1,
				});

				 var initialCreditAmount = $("#creditAmt").val();

			    // Add event listener for change in credit amount
			    $("#creditAmt").on("input", function() {
			        checkCreditAmountUpdate(initialCreditAmount);
			    }); 
			    
			    
			    var initialpreCreditAmount = $("#creditAmount").val();
			    $("#creditAmount").on("input", function() {
			    	checkPreCreditAmountUpdate(initialpreCreditAmount);
			    }); 
			    
			    
			    var initialpreadvanceAmount = $("#advanceAmount").val();
			    $("#advanceAmount").on("input", function() {
			    	checkPreCreditAmountUpdate(initialpreadvanceAmount);
			    }); 
			    
			});
		</script>
		
		<script>
			onload = function() {
				fetchAllUnits();
				fetchAllCustomerTypes();
				fetchAllStates();
				fetchAllDistrict();
				fetchAllTaluka();
				fetchAllCity();
				getAllBusinessLabMaster();
				
				//$("#countryFromAddress").select2();
				$("#stateFromAddress").select2();
				$("#districtFromAddress").select2();
				$("#talukaFromAddress").select2();
				$("#cityFromAddress").select2();
				$("#unitList").select2();
				$("#lookupDetIdLay").select2();
				$("#townId").select2();
				$("#countryFromAddress").select2();
			
			}
		
			jQuery(document).ready(function() {		
				App.setPage("wizards_validations");  //Set current page 
				App.init(); //Initialise plugins and elements  
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});	
						
			});
		</script>
	</c:if>
	<!-- include js for development -->
	<script type="text/javascript" src="js/pathology_reporting.js"></script>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	
	<script>
		function validateDate() {
		    var fromDate = document.getElementById('preFromDate').value;
		    var toDate = document.getElementById('preToDate').value;
		
		    var fromDateObj = new Date(fromDate);
		    var toDateObj = new Date(toDate);
		
		    var dateValidationError = document.getElementById('dateValidationError');
		
		    if (fromDate && toDate && fromDateObj > toDateObj) {
		        dateValidationError.textContent = "To Date cannot be less than From Date";
		        // Optionally, you can clear the "To Date" field or take other actions
		    } else {
		        dateValidationError.textContent = "";
		    }
		}
	</script>
</body>
</html>

