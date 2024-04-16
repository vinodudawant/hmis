<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Debit Note Return | Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<%-- <link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/css/ehat_general.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/css/default.css"/>"
	id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/css/responsive.css"/>">
<link
	href="<c:url value="/pharmacy/resources/bootstrap-dist/css/bootstrap.min.css"/>"
	rel="stylesheet" media="screen">
<link
	href="<c:url value="/pharmacy/resources/font-awesome/css/font-awesome.min.css"/>"
	rel="stylesheet">

<link
	href="<c:url value="/pharmacy/resources/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css"/>"
	rel="stylesheet" media="screen">
<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />
<!-- JQUERY -->
<script
	src="<c:url value="/pharmacy/resources/jquery/jquery-2.1.1.js"/>"></script>
<!-- JQUERY UI-->
<script
	src="<c:url value="/pharmacy/resources/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"/>"></script>
<!-- BOOTSTRAP -->
<script
	src="<c:url value="/pharmacy/resources/bootstrap-dist/js/bootstrap.min.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/bootstrap-dist/js/bootstrap.js"/>"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<!-- for Developers  -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/jquery/jquery-migrate-1.2.1.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/jquery/jquery-jtemplates.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/additional-methods.min.js"/>"></script>
<!-- /for Developers  -->

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script> --%>

<!-- Application js -->
<%@include file="pharma_header.jsp"%>
<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Debit_Notes.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_ProductByBatchPopUp.js"/>"></script>
<%-- <script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/shortcut.js"/>"></script>
<script src="<c:url value="/pharmacy/resources/alertify.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_shortcut.js"/>"></script>
	<script src="<c:url value="/pharmacy/resources/js/morphext.min.js"/>"></script> --%>
</head>
<style type="text/css">
.table-fixed thead {
	width: 100%;
}

.table-fixed tbody {
	height: 400px;
	overflow-y: auto;
	width: 100%;
}

.table-fixed thead,.table-fixed tbody,.table-fixed th {
	display: block;
}

.table-fixed thead>tr>th {
	float: left;
	border-bottom-width: 0;
	height: 50px;
}

.table-fixed tbody>tr>td {
	width: 100px;
}
</style>

<style type="text/css">

/* Start by setting display:none to make this hidden.
   Then we position it in relation to the viewport window
   with position:fixed. Width, height, top and left speak
   speak for themselves. Background we set to 80% white with
   our animation centered, and no-repeating */
.ajaxmodal {
	display: none;
	position: fixed;
	z-index: 100000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('../.././pharma-resources/images/ajax_loader_blue_64.gif')
		50% 50% no-repeat;
}

/* When the body has the loading class, we turn
   the scrollbar off with overflow:hidden */
body.loading {
	overflow: hidden;
}

/* Anytime the body has the loading class, our
   ajaxmodal element will be visible */
body.loading .ajaxmodal {
	display: block;
}
</style>
<script>
	function validateData() 
	{
		if ($('#txtPartyName').val() != null && $('#txtPartyName').val() != "") 
		{
			if ($('#hiddenVendorId').val() != null && $('#hiddenVendorId').val() != "") 
			{
			if ($('#txtAddress').val() != null && $('#txtAddress').val() != "") 
			{
				
					if ($('#txtVouNo').val() != null && $('#txtVouNo').val() != "")
					{
						if ($('#txtVouDate').val() != null && $('#txtVouDate').val() != "")
						{  
							if ($('#textProductName1').val() != null && $('#textProductName1').val() != "")
							{
								if ($('#hiddenDebitNoteId').val() != null && $('#hiddenDebitNoteId').val() != "") 
									{
										alert("Record Updated successfully!");
									    $('#debitNoteMasterForm').submit();
									    window.open("../../pharmacy/debitNote/view-frm");
								    }
                                 else {
                                	 var totalFillRow=0;
										for(var i=1;i<$('#RowCount').val();i++)
										{
											if($('#hiddenProductId'+i).val()!='' && $('#hiddenProductId'+i).val()!=null)
											{
												totalFillRow++;
											}
											
										}
										if(totalFillRow>0)
										{	
									alert("Record Saved successfully!");
									$('#debitNoteMasterForm').submit();
									window.open("../../pharmacy/debitNote/view-frm");
										}
										else
										{
											showAlert();
										}
								  }
							} 
							else {
								alert("Enter Product Name");
								$('#textProductName1').focus();
							}
						} 
						else {
						alert("Enter Vou Date");
						$('#txtVouDate').focus();
					}
				} 
						
						else {
						alert("Enter Vou Number");
						$('#txtVouNo').focus();
					}
			
			}

			else {
				alert("Enter Vendor Address");
				$('#txtAddress').focus();
			}
		} else {
			alert("Data not found");
			$('#hiddenVendorId').focus();
		}

	}
			else {
			alert("Enter Vendor Name");
			$('#txtPartyName').focus();
			
		}

	}
	function showAlert()
	{
		
		alert("Please Fill All the Details!");
	}
	
</script>
<script type="text/javascript">
	onload = function() {
		var inputs = [];
		inputs.push('docId=2');

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/common/getDocNo",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				$('#txtVouNo').val(r);
			}
		});
		
		/* setInterval(function() {
			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "/EhatEnterprise/pharmacy/common/getDocNo",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					
				},
				success : function(r) {
					$('#txtVouNo').val(r);
				}
			});
		}, 3000); */ //5 seconds
		
		/* $("#saveBtn").click(function(event) {

			$("#debitNoteMasterForm").submit();
			window.open("/EhatEnterprise/pharmacy/debitNote/view-frm");

			reset();
			alertify.success("Record Saved Succesfully");
		}) */; 
		
		return debitAutocomplete(null);
	};

	jQuery(document).ready(function() {

		App.init();
		
		$('#purchase_entry_data').on('shown.bs.modal', function (e) {
			
			fetchPurchaseData();
			
		});
		
	});
	
	function closePopUp(type)
	{
		$("#"+type).hide();
	}

	jQuery(document).ajaxStart(function() {
		//alert("hi ajax start");
		$("body").addClass("loading");
	});

	jQuery(document).ajaxStop(function() {
		$("body").removeClass("loading");
		//alert("hi ajax stop");
	});
	
	shortcut.add("Ctrl+s",function() {
		validateData();
	});
	
	shortcut.add("Ctrl+l",function() {
		backToList('debitNote');
	});
</script>
<%
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
							"dd/MM/yyyy");
					String todays_date = formatter.format(currentDate.getTime());
			%>
<body style="background: white ! important;">
	<section id="page">
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

			<%@include file="Pharma_left_menu_transaction.jsp"%>
			<%@include file="Pharma_debit_note_pop_up.jsp"%>
			<%@include file="HelpMenu.jsp"%>
				<%@include file="pharma_purchase_pending_pop_up.jsp"%>
			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<form:form commandName="debitnote" id="debitNoteMasterForm"
								action="../../pharmacy/debitNote/save" method="post">
								<!-- PAGE HEADER-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">

											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date:<%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="../../Dashboard.jsp">Home</a>
												</li>
												<li><a href="../../pharmacy/pharmacy/transaction">Pharmacy</a></li>
												<li>Debit Note</li>
											<!-- 	<li><i class="fa fa-question"></i></li> -->
												<!-- <li><i class="fa fa-exclamation-circle"
													style="color: red;">12</i></li> -->
												<div class="li pull-right" style="margin-left: 9px;">
												<a
													href="../../pharmacy/debitNote/view"
													class="btn btn-xs btn-info">Back to List</a>
												<div class="li pull-right" style="margin-left: 9px;">
												<button class="btn btn-xs btn-success" type="button" id="saveBtn"
													onclick="validateData();">Save and Print(Ctrl+S)</button></div>
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->
                                    <div class="col-md-12-1">
									<!-- <h5>
										<font color="tomato">Purchase Entry</font>
									</h5> -->

									<div class="col-md-12-1">
										<div class="col-md-2-1">
											<font color="tomato" style="font-size: 19px">Debit Note</font>
										</div>
										<div id="indentNumber" class="col-md-6-1">

											<div class="">
												<button type="button" data-toggle="modal"
													data-target="#purchase_entry_data" class="btn btn-xs btn-info">GET
													<%= goodsReceiptNote.toString()%></button>
											</div>
										</div>
									</div>
								</div>
								<!-- <div class="col-md-12-1">
									<b>  </b>
								</div> -->
								<div class="row">
									<div class="panel-body col-md-12-1">
										<div class="panel-body" style="margin-top:-8px; margin-bottom:-5px; ">
											<div id="patientHistory" class="col-md-12-1"
												style="height: 100%;  width: 100%; margin-top: 0%; padding-left: 20px; border: 1px solid #b8b8b8;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-2-1" style="margin-top: 0px;">
															<b>Vendor Name </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:hidden path="vendorMaster.vendorId"
																id="hiddenVendorId" />
																<form:hidden path="debitNoteId" id="hiddenDebitNoteId" />
																
															  <form:hidden id="purId" path="purchaseEntryId" />
															  
															  <form:hidden id="hiddenVendoraddId"
																path="vendorAddress.vendorAddressId" />
																
															<form:input path="vendorMaster.vendorName" type="text"
																id="txtPartyName" name="txtPartyName"
																class="form-control input-SmallText"
																placeholder=" Vendor Name"  required="true"
																onblur="splitVendorContent($('#txtPartyName').val());" />

                                                                  <!--  ,isAlphaWithSpace('txtPartyName',0,100) -->
															<script type="text/javascript">
																$(
																		"#txtPartyName")
																		.autocomplete(
																				{
																					source : function(
																							request,
																							response) {

																						var findingName = $(
																								"#txtPartyName")
																								.val();
																						var inputs = [];
																						inputs
																								.push('letter='
																										+ findingName);
																						var str = inputs
																								.join('&');

																						jQuery
																								.ajax({
																									async : true,
																									type : "GET",
																									data : str
																											+ "&reqType=AJAX",
																								/* 	url : "/EhatEnterprise/pharmacy/vendor/autoSuggestionVendorWithDeleteVendor", */
																								url : "../../pharmacy/vendor/autoSuggestionVendor",	
																								timeout : 1000 * 60 * 5,
																									catche : false,
																									error : function() {
																										alert(error);
																									},
																									success : function(
																											r) {
																										//alert("REach");
																										var availableTags = [];
																										for ( var i = 0; i < r.length; i++) {
																											availableTags[i] = r[i].vendorName
																													+ "-"
																													+ r[i].vendorId
																													/* + "-"
																													+ r[i].vendorAddress
																													+ "-"
																													+ r[i].vendorMobileNumber */;

																										}
																										response(availableTags);
																									}

																								});
																					}
																				});
															</script>
                                                       <div class='col-md-1-1 center'
																style='margin-top: -11px; margin-left: 205px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-2-1" style="margin-top: 0px;">
															<b> Address </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:textarea path="vendorAddress.vendorAddress"
																id="txtAddress" style="width:97%;" cols="26"
																name="txtAddress" readonly="true" tabindex="-1"
																placeholder="Address" />
																<div class='col-md-1-1 center'
																style='margin-top: -11px; margin-left: 205px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div>

													<div class="col-md-12-1"
														style="margin-top: 9px; margin-bottom: 10px;">
														<div class="col-md-2-1" style="margin-top: 0px;">
															<b> Phone Number</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input id="txtPhone"
																path="vendorAddress.vendorMobileNumber"
																class="form-control input-SmallText" type="text"
																name="txtPhone" readonly="true" tabindex="-1"
																placeholder="Phone number" />
																
														</div>
													</div>
												</div>
                                                <div class="col-md-4-1" style="margin-top: 9px;">

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b>Narration </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;margin-left:-34px;">
															<form:input id="txtNaration " path="debitNoteNarration"
																class="form-control input-SmallText" type="text"
																name="txtNaration"  
																placeholder="Narration" />
																 
															<!-- 	onblur="isAlphaWithDigitSpace('txtNaration',0,100)" -->
															<br>
														</div>
													
												       
												  
													<div id='purDiv' style="margin-top: 9px;display:none" class="col-md-12-1">
															<div class="col-md-4-1" style="margin-top: 0px;">
															<b><%= goodsReceiptNote.toString()%></b>
														</div>
														<div style="margin-top: 0px;margin-left:-34px;" class="col-md-7-1">

															<input type="text" value=""
																readonly="readonly" 
																class="form-control input-SmallText" name="txtPurId"
																placeholder="Phone" id="txtPurId">
														</div>
															
													<div 
														style="margin-top: 9px; display: none" class="col-md-12-1" id="divSpecialDisc">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b><font color='red'>Total Disc Amt</font></b>
														</div>
														<div style="margin-top: 0px; margin-left:-34px;"
															class="col-md-7-1" id='indentSaleSpecialDiscDiv'>

															
														</div>
													</div>
													<div id="divSurcharge" class="col-md-12-1" style="margin-top: 9px;display:none" >
														<div style="margin-top: 0px;" class="col-md-3-1">
															<b><font color='red'>Total Add</font></b>
														</div>
														<div id="divSurchargeData" class="col-md-7-1" style="margin-top: 0px; margin-left:15px;">
														</div>
													</div>
													</div>
												  
												</div>
												</div>
												<div class="col-md-4-1" style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b> Vou No </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px; margin-left:-49px">
															<form:input id="txtVouNo" path="debitNoteDocNo"
																class="form-control input-SmallText" type="text"
																name="txtVouNo" readonly="true" tabindex="-1" />
																<div class='col-md-1-1 center'
																style='margin-top: -10px; margin-left: 205px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b> Vou Date </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;margin-left:-47px">
															<form:input id="txtVouDate" path="debitNoteDate" 
																class="form-control input-SmallText" type="text"
																readonly="true" name="txtVouDate" value="<%=todays_date%>"
																onfocus="displayCalendar(document.getElementById('txtVouDate'),'dd/mm/yyyy',this)"
																placeholder="Vou Date" onchange="setFocusToField('txtVouDate')" tabindex="-1" />
																<div class='col-md-1-1 center'
																style='margin-top: -10px; margin-left: 205px; color: red;'>
																<b> *</b>
															</div>
															<br>
														</div>
													</div>
													<div class="col-md-12-1">
														
														<div id="divNetAmt" class="col-md-12-1"
															style="margin-top: 9px; display: none">
															<div style="margin-top: 0px;" class="col-md-3-1">
																<b><font color='red'>Net Amt</font></b>
															</div>
															<div id="divNetAmtData" class="col-md-7-1"
																style="margin-top: 0px; margin-left: 4px; background-color: yellow">
															</div>
															<div id="prevCreditDiv" class="col-md-3-1"
																style="margin-top: 7px; margin-left: 73px;"></div>
														</div>
													</div>
											</div>
										</div>
									</div>
								</div>
								</div>
								<div id="HSTDiv"
									style="width: 100%; height: 200Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d;">
									<div class="col-md-12-1">
										<input type="button" value="-" class="btn btn-xs btn-success"
											style="margin: 7px; float: right" onclick="deleteRow();">
									</div>
									<table id="purchaseTable" cellpadding="0" cellspacing="0"
										border="1"
										class="table table-bordered table-striped table-condensed">
										<thead>
											<tr>
												<th class="col-md-1-1 center">Sr.</th>
												<th class='col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Barcode</div></th>
												<th class='col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Product Name</div></th>
												<th class='col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Unit</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Pack</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Comp</div></th>
												<th class='col-md-1-0 center' style="height: 21.5px;"><label
													class='TextFont'> GST% </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Batch No </label></th>
												<th class='col-md-1-1 center' style="height: 21.5px;"><label
													class='TextFont'> Expiry </label></th>
													
												<th class='col-md-1-0.5 center' style="height: 21.5px;"><label
													class='TextFont'> code. </label></th>
													
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> M.R.P </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px; display: none"><label
													class='TextFont'> Dis%</label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Dispensed Qty</label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Qty </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Schm</label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Scheme Amt</label></th>
													
												<th class='col-md-1-1 center' style="height: 21.5px;"><label
													class='TextFont'> Purchase Rate </label></th>
													
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Amount </label></th>
													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Select</div></th>
											</tr>
										</thead>
										<tbody id="DRRDiv"
											style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
											<tr id="remove1">
												<td><label class='input-SmallText'>1</label></td>
													<td><form:input
														path=""
														type="text" id="textBarcode1" name="textBarcode1"
														class='form-control input-SmallText'  onblur="fetchProductNameByBarcode(this.value,1)"/></td>
												
												<td><form:hidden id="debitSlaveId0"
														path="debitNoteSlaves[0].debitNoteSlaveId" /> <form:hidden
														id="hiddenProductId1"
														path="debitNoteSlaves[0].productMaster.productId" />
														
														<%-- <form:hidden
														id="hiddenPurchaseSlaveId1"
														path="debitNoteSlaves[0].purchaseSlave.purSlaveId" /> --%> 
														
														 <input
													type='hidden' id='hiddenCurrentRow' value='1' /> 
													<form:input
														path="debitNoteSlaves[0].productMaster.productName"
														type="text" id="textProductName1" name="textProductName1"
														class='form-control input-SmallText' data-toggle="modal"
														data-target="#debit_note_pop_up" onclick="load(1,1)" /></td>

												<td><form:input
														path="debitNoteSlaves[0].productMaster.productUnit"
														type="text" id="textUnit1" name="textUnit1"
														class='form-control input-SmallText' readonly="true" /></td>

												<td><form:input
														path="debitNoteSlaves[0].productMaster.packingMaster.packType"
														type="text" id="textPack1" name="textPack1"
														class='form-control input-SmallText' readonly="true" /></td>

												<td><form:input
														path="debitNoteSlaves[0].productMaster.companyMaster.compShortName"
														type="text" id="textComp1" name="textComp1"
														class='form-control input-SmallText' readonly="true" /></td>

												<td><form:input path="debitNoteSlaves[0].debitNoteSlaveGST" type="text" id="textVat1"
														name="textVat1" class='form-control input-SmallText'
														readonly="true" /></td>

												<td style="display: none;">
													<%-- <form:hidden path="debitNoteSlaves[0].productMaster.batchMaster[0].batchCode" id="" /> --%>
													<form:input
														path="debitNoteSlaves[0].productMaster.batchMaster[0].batchId"
														type="text" id="textBatchId1" name="textBatchId1"
														class='form-control input-SmallText' readonly="true" /> <form:input
														path="debitNoteSlaves[0].productMaster.batchMaster[0].stockMaster.stockId"
														type="text" id="textStockId1" name="textStockId1"
														class='form-control input-SmallText' readonly="true" /> <form:input
														path="debitNoteSlaves[0].productMaster.batchMaster[0].stockMaster.stockQtyInHand"
														type="text" id="textStockQtyInHand1"
														name="textStockQtyInHand1"
														class='form-control input-SmallText' readonly="true" />
												</td>

												<td><form:input path="debitNoteSlaves[0].debitNoteSlaveBatchCode" type="text" id="textBatchNo1"
														name="txtBatchNo1" class='form-control input-SmallText'
														readonly="true" /></td>

												<td><form:input path="debitNoteSlaves[0].debitNoteSlaveBatchExpiry" type="text" id="textExpiry1"
														name="textExpiry1" class='form-control input-SmallText'
														readonly="true" /></td>

												<td><form:input path="" type="text" id="textCode1" readonly="true"
														name="textCode1" class='form-control input-SmallText' /></td>

												<td><form:input path="debitNoteSlaves[0].debitNoteSlaveMrp" type="text" id="textMRP1"
														name="textMRP1" class='form-control input-SmallText'
														readonly="true" /></td>

												<td style="display: none"><form:input path="" id="textDisc1"
														name="textDisc1" class='form-control input-SmallText' /></td>
														
												<td><form:input path="" type="text" id="textDispenceQty1" readonly="true"
														name="textDispenceQty1" class='form-control input-SmallText' /></td>	

												<td><form:input
														path="debitNoteSlaves[0].debitNoteSlaveQty" type="text"
														id="textQty1" name="textQty1" onblur="calculateAmount(1),validationsOfQtyDebit()"
														class='form-control input-SmallText'  /></td>
												
												<td><form:input
														path="debitNoteSlaves[0].debitSlaveScheme" type="text"
														id="textSchm1" name="textSchm1"
														class='form-control input-SmallText'  /></td>
														
												<td><form:input
														path="debitNoteSlaves[0].debitSlaveSchemeAmt" type="text"
														id="textSchmAmt1" name="textSchmAmt1" onblur="validationsOfSchemeDebit('GRN')"
														class='form-control input-SmallText'  /></td>

												<td><form:input
														path="debitNoteSlaves[0].debitNoteSlaveRate" type="text"
														id="textPurRate1" name="textPurRate1"
														class='form-control input-SmallText' readonly="true" /></td>

												<td><form:input path="debitNoteSlaves[0].debitNoteSlaveAmt" type="text" id="textAmt1"
														name="textAmt1" value='0' class='form-control input-SmallText'
														readonly="true" /></td>
												
												 <td><input type="checkbox" name="deleteGroup"
															value="1" id="deleteGroup1"></td>	
												
												<td style="display: none;">
												    <input id="textTotalStk1"
													class="form-control input-SmallText" type="text" readonly>
													<input id="textShelf1"
													class="form-control input-SmallText" type="text" readonly>
													<input id="textClStk1"
													class="form-control input-SmallText" type="text" readonly>
													<input id="textScm1"
													class="form-control input-SmallText" type="text" readonly>
													<input id="textRate1"
													class="form-control input-SmallText" type="text" readonly>
													
												</td>		
														
														
														
											</tr>
										</tbody>
									</table>
								</div>

								<div class="col-md-12-1 " style="margin-top: 0px;">
									<div class="col-md-2-1 panel panel-default"
										style="margin-top: 9px;">
										<div class="col-md-12-1"
											style="margin-top: 9px; margin-bottom: 9px;">
											<div class="col-md-5-1" style="margin-top: 5px;">
												<b>Discount%</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 3px;">
												<form:input id="txtDic" path="" class="form-control input-SmallText" value='0' onchange="validateDis();"
													type="text" name="txtDic" placeholder="Disc%"  onblur="isFloatingPoint('txtDic'),calculateDiscount();"/>
												<br>
											</div>
										</div>
										<div class="col-md-12-1"
											style="margin-top: 9px; margin-bottom: 9px;">
											<div class="col-md-5-1" style="margin-top: -15px;">
												<b>Entered By Name</b>
											</div>
											<div class="col-md-7-1" style="margin-top: -15px;">
												<form:input id="txtEnterByName" path="debitNotEnteredBy" 
												 class="form-control input-SmallText" 
													type="text" name="txtEnterByName" placeholder="Enter By Name"/>
												<br>
												<!-- onblur="isAlphaWithSpace('txtEnterByName',0,100);"  -->
											</div>
										</div>
									</div>

									<div class="col-md-2-1 panel panel-default"
										style="margin-top: 9px; margin-left: 2%">

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 12px;">
												<b> Discount</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 12px;">
												<form:input id="txtDiscount1" path="" class="form-control input-SmallText"
													type="text"  tabindex="-1"  name="txtDiscount1" placeholder="Discount"
													readonly="true" />
												<br>
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b> Discount</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input id="txtDiscount2" path="" class="form-control input-SmallText"
													type="text"  tabindex="-1"  name="txtDiscount2" placeholder="Discount" 
													onblur="calculateDisc2();"
													/>
												<br>
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 9px;"></div>
									</div>

									<%-- <div class="col-md-2-1 panel panel-default"
										style="margin-top: 9px; margin-left: 2%">
										

										<div class="col-md-12-1"
											style="margin-top: 9px; margin-bottom: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>GST</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input id="textVat"  name="textVat" path="debitNoteVat" 
													class="form-control input-SmallText" type="text"
													placeholder="GST"  onblur="isFloatingPoint('textVat');" />
												<br>
											</div>

											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>VAT 6.00%</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input id="txtVat1" path="" readonly="true"  class="form-control input-SmallText"
													type="text" name="txtVat1"  tabindex="-1"  placeholder="VAT 5.00%" />
												<br>
											</div>

											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>VAT 13.5%</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input id="txtVat2" path="" tabindex="-1"   readonly="true"  class="form-control input-SmallText"
													type="text" name="txtVat2"  placeholder="VAT 12.00%"  />
												<br>
											</div>

											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>SurCharges</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input id="txtSurCharges" path="debitNoteSurcharges" 
													class="form-control input-SmallText" type="text" name="txtSurCharges"
													placeholder="Sur Charges" onblur="isFloatingPoint('txtSurCharges'),calculateAdd();" />
												<br>
											</div>
										</div>
									</div> --%>
									
									

									<div class="col-md-2-1 panel panel-default"
										style="margin-top: 9px; margin-left: 2%">
										<div style="margin-top: 0px;" class="col-md-12-1 center">
											<b>Tax Info.</b>
										</div>
										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>GST Total:</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">

												<input id="textVat" name="purTaxVat5" placeholder="GST"
													class="form-control input-SmallText" readonly="readonly"
													value="0" maxlength="10" type="text">


											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>IGST Total:</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">

												<input id="txtVat1" name="purTaxVat12" placeholder="IGST"
													class="form-control input-SmallText" readonly="readonly"
													value="0" maxlength="10" type="text">

											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>CESS Total:</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
													<input id="txtVat2" name="purTaxLbt" placeholder="cess"
													class="form-control input-SmallText" readonly="readonly"
													value="0" maxlength="10" type="text">
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;"
											hidden="true">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>CST</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
														<input id="txtcst" name="purTaxCst" placeholder="CST"
													class="form-control input-SmallText" value="0"
													maxlength="10" type="text">


											</div>
										</div>

										<div class="col-md-12-1"
											style="margin-top: 0px; margin-bottom: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>TAX Total:</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">

												<input id="txtTotalVat" name="purTotalVat"
													placeholder="Total Vat" value="0"
													class="form-control input-SmallText" readonly="readonly"
													type="text">

											</div>
										</div>
									</div>



									<div class="col-md-3-1 center"
										style="margin-top: 9px; margin-left: 6%;">
										<!-- <div class="col-md-1-1 center">
                                                           <b id="title">Less</b>
                                                            </div> -->
										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Gross Amount</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input id="txtGross" path="debitNoteGrossAmt"
													readonly="true" class="form-control input-SmallText" type="text"
													name="txtGross" placeholder="Gross Amount" value="0" />
												<br>
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Less</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input id="txtLess" path="debitNoteLess"
													readonly="true" class="form-control input-SmallText" type="text"
													name="txtLess" placeholder="Less" value="0" />
												<br>
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Add</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input id="txtAdd" path="debitNoteAdd" readonly="true"
													class="form-control input-SmallText" type="text" name="txtAdd"
													placeholder="Add" value="0" />
												<br>
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>GST</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">

												<input id="textgst" name="purVat" placeholder="Vat"
													value="0" class="form-control input-SmallText"
													 readonly="readonly" maxlength="10"
													type="text">


											</div>

										</div>
										<div class="col-md-12-1"
											style="margin-top: 0px; margin-bottom: 0px;">
											<div class="col-md-5-1" style="margin-top: -5px;">
												<b>Net Amount</b>
											</div>
											<div class="col-md-7-1" style="margin-top: -5px;">
												<form:input id="txtNetAmt" path="debitNoteNetAmt"
													readonly="true" class="form-control input-SmallText" type="text"
													name="txtNetAmt" placeholder="Net Amount" value="0" />
												<br>
											</div>
										</div>
									</div>
								</div>
							</form:form>
						</div>
					</div>
				</div>

			</div>
		</div>

		<div style="width: 98%; padding-top: 0%; font-weight: bold;"></div>
		<div id="div1" style="visibility: hidden"><%=request.getParameter("ajaxResponse")%></div>
		<div id="div3" style="visibility: hidden"><%=request.getParameter("myObj")%></div>
		
		<div id="prevDebitNotePopUp" class="modal fade in"
			style="height: 500px;">
			<div class="modal-dialog" style="width: 900px;">

				<div class="modal-content">
					<div class="modal-header  col-md-12"
						style="background-color: palegoldenrod">
						<div class="box-title  col-md-8 center">
							<h4>
								<i class="fa fa-mail-reply"></i>Prev Debit Note Data
							</h4>
						</div>
						<div class="col-md-4-1" style="margin-top: 0px;" id="setButtons">
							<button style="margin-top: 1px; float: right" type="button"
								class="bootbox-close-button btn-danger"
								onclick="closePopUp('prevDebitNotePopUp')" data-dismiss="modal">X</button>
						</div>
					</div>
					<div class="modal-body col-md-12 panel panel-default" >
					
							<div class="col-md-12-1" id="prevDebitNoteType"></div>
							<div class="col-md-12-1" id="prevDebitNoteData"></div>	
						<!-- /BOX-->
					</div>
					<!-- /BODY-->
					<div class="modal-footer"></div>
				</div>

			</div>
		</div>

		<%@include file="Pharma_Footer.jsp"%>
		<div id="div2" style="visibility: hidden"><%=request.getParameter("showSaveBtn")%></div>
		<div id="div4" style="visibility: hidden"><%=request.getParameter("onload")%></div>
		<input type='hidden' value='0' id='addRowCount' /> <input
			type='hidden' value='1' id='RowCount' />

	</section>
</body>
</html>