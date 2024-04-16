<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Credit Note Return | Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/ehat_general.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/default.css"/>"
	id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/responsive.css"/>">
<link
	href="<c:url value="../.././pharma-resources/bootstrap-dist/css/bootstrap.min.css"/>"
	rel="stylesheet" media="screen">
<link
	href="<c:url value="../.././pharma-resources/font-awesome/css/font-awesome.min.css"/>"
	rel="stylesheet">
<link
	href="<c:url value="../.././pharma-resources/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css"/>"
	rel="stylesheet" media="screen">

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />
<!-- JQUERY -->
<script
	src="<c:url value="../.././pharma-resources/jquery/jquery-2.1.1.js"/>"></script>
<!-- JQUERY UI-->
<script
	src="<c:url value="../.././pharma-resources/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"/>"></script>
<!-- BOOTSTRAP -->
<script
	src="<c:url value="../.././pharma-resources/bootstrap-dist/js/bootstrap.min.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/bootstrap-dist/js/bootstrap.js"/>"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<!-- for Developers  -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/jquery/jquery-migrate-1.2.1.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/jquery/jquery-jtemplates.js"/>"></script>


<!-- <script type="text/javascript" src="js/CommonTemplate.js"></script> -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jquery-validate/additional-methods.min.js"/>"></script>
<!-- <script type="text/javascript" src="js/validate.js"></script> -->
<!-- /for Developers  -->
<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>
<!-- CUSTOM SCRIPT -->
<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_credit_Notes.js"/>"></script>
<!-- /for Developers  -->
<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_CreditNoteProductByBatchPopUp.js"/>"></script>

<!-- CUSTOM SCRIPT -->
<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/shortcut.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/alertify.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_shortcut.js"/>"></script>

<script type="text/javascript">
	onload = function() {
		var inputs = [];

		//doc id 1 = purchase order
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
				alert("error");
			},
			success : function(r) {
				$('#txtVouNo').val(r);
			}
		});

		/* autoSuggestionForPatientNamePatientSale("txtPatientName1", "onload"); */
	},

	jQuery(document).ready(function() {

		App.init(); //Initialise plugins and elements
	});
	
	shortcut.add("delete", function() {
		deleteRowOnFocus();
	});
	
	shortcut.add("Ctrl+s", function() {
		saveCreditNote();
	});

	shortcut.add("Ctrl+l", function() {
		backToList('creditNote');
	});
	shortcut.add("Alt+i", function() {
		displayIndentPopUp();
	});
	shortcut.add("Alt+p", function() {
		displayPatientPopUp();
	});
	shortcut.add("Alt+c", function() {
		displayCounterPopUp();
	});
	
	shortcut.add("delete", function() {
		deleteRowOnFocus();
	});
	function closePopUp(type) {
		$("#" + type).hide();
	}

	function invalidateSession() {
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "../../pharmacy/mrn/invalidateSesion",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				alertify.success("Main Store Selected");
			}
		});
	}
</script>

<%
	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
	"dd/MM/yyyy");
	String date = simpleDateFormat.format(new Date());
%>
<script>
	function validateData() {
		var count = 0;
		if ($('#txtVouNo').val() != null && $('#txtVouNo').val() != "") {
			if ($('#hiddenCreditNoteId').val() != null
					&& $('#hiddenCreditNoteId').val() != "") {
				calculateVat();
				alert("Record Updated Successfully!");
				$('#creditNotesForm').submit();
				window.open("../../pharmacy/creditNote/view-frm");
			}

			else {
				var totalFillRow = 0;
				for ( var i = 1; i <= $('#RowCount').val(); i++) {
					if ($('#hiddenProductId' + i).val() != ''
							&& $('#hiddenProductId' + i).val() != null) {
						totalFillRow++;
					}

				}
				if (totalFillRow > 0) {
					calculateVat();
					for ( var i = 1; i <= $('#RowCount').val(); i++) {

						if ($('#txtQty' + i).val() != ''
								&& $('#txtQty' + i).val() != null) {
							count++;
						}

					}
					if (count > 0) {
						calculateCreditPending();
						alert("Record Saved Successfully!");
						$('#creditNotesForm').submit();
						window
								.open("../../pharmacy/creditNote/view-frm");
					} else {
						alert("Enter qty");

					}
				} else {
					showAlert();
				}
			}
		}

		else {
			alert("Enter Vou No");
			$('#txtVouNo').focus();
		}

	}

	function showAlert() {
		alert("Please Fill All the Details!");
	}
</script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>
</head>
<body style="background: white ! important;">
	<section id="page">


		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
				<%@include file="Pharma_credit_note_pop_up.jsp"%>
				<%@include file="pharma_credit_note_indent_pop_up.jsp"%>
				<%@include file="pharma_credit_note_patient_pop_up.jsp"%>
				<%@include file="pharma_credit_note_counter_pop_up.jsp"%>

				<%@include file="HelpMenu.jsp"%>

			</header>
			<!--/HEADER -->

			<%@include file="Pharma_left_menu_transaction.jsp"%>
			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<form:form commandName="creditNote" id="creditNotesForm"
								action="../../pharmacy/common/saleType" method="post">

								<input type="hidden" name="saleFrom" value="creditNote">
								<!-- PAGE HEADER-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date :<%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a
													href="../../Dashboard.jsp">Home</a></li>
												<li><a
													href="../../pharmacy/pharmacy/transaction">Pharmacy</a></li>
												<li>Credit Note</li>
												<li><span style="background-color: red" class="badge"
													id='storeTitle'><i class="fa fa-hospital-o"></i> <%
 	if (session.getAttribute("pharmacyStoreName") != null) {
 %> <%=session.getAttribute("pharmacyStoreName")%> Store <%
 	} else {
 %> No Sub Store Selected <%
 	}
 %> </span></li>

												<%
													if (session.getAttribute("pharmacyStoreName") != null) {
												%>
												<li><a onclick="invalidateSession()"><span
														style="background-color: red" class="badge"
														id='storeTitle'><i class="fa fa-hospital-o"></i>return
															to Main store <%
													}
												%> </span></a></li>

												<div class="li pull-right" style="margin-left: 9px;">
													<a href="../../pharmacy/creditNote/view"
														class="btn btn-xs btn-info">Back to List(Ctrl+L)</a>
													<button class="btn btn-xs btn-success" type="button"
														id="saveBtn" onclick="saveCreditNote();">Save and
														Print(Ctrl+S)</button>
													<div class="li pull-right" style="margin-left: 9px;"></div>
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->
								<!-- <div class="divide-20"></div> -->


								<div class="col-md-12-1">
									<!-- <div class="col-md-3-1">
										<b> Credit Note </b>
									</div> -->
									<div class="col-md-3-1">
										<button type="button" onclick="displayIndentPopUp()"
											class="btn btn-xs btn-info" id="btnIndentReturn">
											<i class="fa fa-mail-reply"></i> <span class="menu-text">Indent Sale Return(Alt+i)
												 </span> <span class="arrow"></span>
										</button>
									</div>

									<div class="col-md-3-1"
										style="margin-left: -1px; margin-top: -9px;">
										<button type="button" onclick="displayPatientPopUp()"
											class="btn btn-xs btn-info" id="btnPatientReturn"><i class="fa fa-mail-reply"></i> <span class="menu-text">
												 </span>Patient Sale Return(Alt+p)<span class="arrow"></span></button>
									</div>
									<div class="col-md-3-1"
										style="margin-left: -1px; margin-top: -9px;">
										<button type="button" onclick="displayCounterPopUp()"
											class="btn btn-xs btn-info" id="btnCounterReturn"><i class="fa fa-mail-reply"></i> <span class="menu-text">
												 </span>Counter Sale Return(Alt+c)<span class="arrow"></span></button>
									</div>

								</div>
								<div class="row">
									<div class="panel-body col-md-12-1">
										<div class="panel-body">
											<div id="CreiditNoteAmt" class="col-md-4-1"
												style="height: 100%; width: 100%; padding-left: 20px; border: 1px solid #b8b8b8;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b>Patient Name </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:hidden path="creditNoteId" id="hiddenCreditNoteId" />

															<form:hidden path="creditNoteTreatmentId"
																id="hiddenCreditNoteTratmentId" />

															<form:hidden path="" id="hiddenSaleTypeId" />


															<form:hidden id="patientId" path="creditPatientId" />

															<form:hidden id="type" path="creditNoteType" />

															<form:input id="txtPatientName" path="patientName"
																class="form-control input-SmallText" type="text"
																requird="true" placeholder="Patient Name"
																name="txtPatientName" />

															<br>

														</div>

													</div>
													<div class="col-md-12-1"
														style="margin-top: 9px; margin-bottom: 10px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> Address </b>
														</div>
														<div class="col-md-7-1" style="margin-top: -2px;">
															<form:hidden id="patientSaleId"
																path="creditNotePatientSaleId" />
															<form:hidden id="counterSaleId"
																path="creditNoteCounterSaleId" />

															<form:hidden id="hiddenTax5" path="creditTaxVat5" />
															<form:hidden id="hiddenTax55" path="creditTaxVat55" />
															<form:hidden id="hiddenTax12" path="creditTaxVat12" />
															<form:hidden id="hiddenTax0" path="creditTaxVat0" />
															<form:hidden id="hiddenTotalTax" path="" />
															<form:hidden id="hiddenTax6" path="creditTaxVat6" />
															<form:hidden id="hiddenTax135" path="creditTaxVat135" />

															<form:textarea id="txtPatientAddress"
																path="patientAddress"
																class="form-control input-SmallText" type="text"
																requird="true" placeholder="Enter Address"
																name="txtPatientAddress" />
															<%-- <form:textarea path="patientMaster.patAddress"
																id="txtPatientAddress" class="col-md-11-1"
																 requird="true"
																placeholder="Enter Address" name="txtPatientAddress"
																style="width:97%;" readonly="true" /> --%>
															<br>
															<!-- <div class='col-md-1-1 center'
																style='margin-top: -14px; margin-left: 205px; color: red;'>
																<b> *</b>
															</div> -->
														</div>
													</div>
													<div class="col-md-12-1"
														style="margin-top: 9px; margin-bottom: 10px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> Phone Number</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input id="txtPhone" path="patientPhone"
																maxlength="10" class="form-control input-SmallText"
																type="text" name="txtPhone" tabindex="-1"
																placeholder="Phone number"
																onblur="isPhonNo('txtPhone',10,10);s" />

														</div>
													</div>
												</div>
												<div class="col-md-4-1" style="margin-top: 9px;">

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> Narration </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input id="txtNarration" path="creditNoteNarration"
																class="form-control input-SmallText" type="text"
																requird="true" placeholder="Enter Narration"
																name="txtNarration" />
															<!-- 	 onblur="isAlphaWithDigitSpace('txtNarration',0,100)" -->
															<br>
														</div>
													</div>

													<div class="col-md-9-1 center" style="margin-top: 0px;">
														<form:radiobutton name="radioCashCredit"
															path="creditNoteTransactionType" id="radioCash" value='0'
															checked="true" onclick="calculateCashData()" />
														Cash Return
														<form:radiobutton name="radioCashCredit"
															path="creditNoteTransactionType" id="radioCredit"
															value='1' onclick="calculateCreditData()" />
														Credit Return
													</div>
													<div id='patientSaleDiv'
														style="margin-top: 9px; display: none" class="col-md-12-1">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b><span id="spanSaleType"></span> <font color='red'>Sale
																	id</font></b>
														</div>
														<div style="margin-top: 0px; margin-left: 4px;"
															class="col-md-5-1">

															<input type="text" value="" readonly="readonly"
																class="form-control input-SmallText" name="txtPatientId"
																placeholder="Phone" id="txtPatientId">
														</div>
													</div>

													<div style="margin-top: 9px; display: none"
														class="col-md-12-1" id="divSpecialDisc">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b><font color='red'>Total Disc Amt (Spcl+cd)</font></b>
														</div>
														<div style="margin-top: 0px; margin-left: 4px;"
															class="col-md-7-1" id='indentSaleSpecialDiscDiv'></div>
													</div>


												</div>

												<div class="col-md-4-1" style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> Vou No </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input id="txtVouNo" path="creditNoteDocNo"
																class="form-control input-SmallText" type="text"
																readonly="true" placeholder="Vou No" required="true"
																name="txtVouNo" />
															<!-- <div class='col-md-1-1 center'
																style='margin-top: -10px; margin-left: 205px; color: red;'>
																<b> *</b>
															</div> -->
															<br>
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> Vou Date </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="creditNotDate" id="txtVouDate"
																class="form-control input-SmallText" type="text"
																readonly="true" name="txtVouDate" placeholder="Vou Date"
																value="<%=date%>"
																onclick="displayCalendar(document.getElementById('txtVouDate'),'dd/mm/yyyy',this)" />
															<br>
															<!-- <div class='col-md-1-1 center'
																style='margin-top: -27px; margin-left: 207px; color: red;'>
																<b> *</b>
															</div> -->
														</div>
													</div>

													<div class="col-md-12-1">
														<div id="divSurcharge" class="col-md-12-1"
															style="margin-top: 0px; display: none">
															<div style="margin-top: 0px;" class="col-md-3-1">
																<b><font color='red'>Surcharge</font></b>
															</div>
															<div id="divSurchargeData" class="col-md-3-1"
																style="margin-top: 0px; margin-left: 4px; background-color: yellow">


															</div>

															<div id="prevCreditDiv" class="col-md-3-1"
																style="margin-top: 0px; margin-left: 4px;"></div>
														</div>

														<div id="divNetAmt" class="col-md-12-1"
															style="margin-top: 9px; display: none">
															<div style="margin-top: 0px;" class="col-md-3-1">
																<b><font color='red'>Net Amt</font></b>
															</div>
															<div id="divNetAmtData" class="col-md-7-1"
																style="margin-top: 0px; margin-left: 4px; background-color: yellow">
															</div>
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
											style="margin-top: 7px; float: right" onclick="deleteRow();">
									</div>
									<table id="ItemInfoTable" cellpadding="0" cellspacing="0"
										border="1"
										class="table table-bordered table-striped table-condensed">
										<thead>
											<tr>
												<th class="col-md-1 center" style="height: 21.5px;"><label
													class='TextFont'>Sr.</label></th>
											<!-- <th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Barcode </label></th> -->
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Product </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Unit </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Pack</label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> GST% </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Dispensed Qty</label></th>
												<th class="col-md-1-1 center" style="height: 21.5px; display: none"><label
													class='TextFont'> Disc </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Qty </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Batch No </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Expiry </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> M.R.P </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Rate </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Code</label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'>Purchase Rate</label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Amount</label></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Select</div></th>
											</tr>
										</thead>

										<tbody id='DRRDiv'>
											<tr id="remove1">
												<td><label class='input-SmallText'>1</label>
												<td class="col-md-1 center" style="height: 21.5px;"><form:hidden
														id="creditSlaveId0"
														path="creditNoteSlaves[0].creditNoteSlaveId" /> <form:hidden
														id="hiddenProductId1"
														path="creditNoteSlaves[0].productMaster.productId" /> <%--  <form:hidden
														id="hiddenPurchaseSlaveId1"
														path="creditNoteSlaves[0].purchaseSlave.purSlaveId" />  --%>
													<form:hidden id="textCreditSlaveVatAmt1"
														path="creditNoteSlaves[0].creditSlaveVatAmt" /> <form:hidden
														id="textCreditDisc1" path="" /> <input type='hidden'
													id='hiddenCurrentRow' value='1' /> <form:input
														path="creditNoteSlaves[0].productMaster.productName"
														type='text' class='form-control input-SmallText # deleteGroup1 # textNo'
														id='textProductName1' name='textProductName1'
														data-toggle="modal" data-target="#CreditNote_PopUp_Form"
														onclick="load(1,1)" /></td>

												<td style="height: 21.5px;" class="col-md-1-1 center"><form:input
														type='text' class='form-control input-SmallText # deleteGroup1 # textNo'
														readonly="true" id='textUnit1' name='textUnit1'
														path="creditNoteSlaves[0].productMaster.productUnit" /></td>

												<td class="col-md-1-1" style="height: 21.5px;"><form:input
														type='text' class='form-control input-SmallText # deleteGroup1 # textNo'
														readonly="true"
														path="creditNoteSlaves[0].productMaster.packingMaster.packType"
														id='textPack1' name='textPack1' /></td>

												<td class="col-md-1-1" style="height: 21.5px;"><form:input
														type='text' class='form-control input-SmallText # deleteGroup1 # textNo'
														path="creditNoteSlaves[0].creditSlaveVat" id='textVat1'
														name='textVat1' maxlength='6' readonly="true" /></td>

												<td style="height: 21.5px;" class="col-md-1-1 center"><form:input
														type='text' class='form-control input-SmallText # deleteGroup1 # textNo' path=""
														readonly="true" id='txtDispenceQty1'
														name='txtDispenceQty1' /></td>

												<td style="height: 21.5px;display: none" class="col-md-1-1 center"><form:input
														type='text' class='form-control input-SmallText # deleteGroup1 # textNo'
														readonly="true"
														path="creditNoteSlaves[0].creditNoteSlaveDiscAmt"
														id='txtDisAmt1' name='txtDisAmt1' /></td>

												<td style="height: 21.5px;" class="col-md-1-1 center"><form:input
														type='text' class='form-control input-SmallText # deleteGroup1 # textNo'
														path="creditNoteSlaves[0].creditSlaveQty" readonly="true"
														id='txtQty1' name='txtQty1' /></td>



												<td style="height: 21.5px;" class="col-md-1-1 center"><form:input
														type='text' class='form-control input-SmallText # deleteGroup1 # textNo'
														path="creditNoteSlaves[0].creditNoteSlaveBatchCode"
														readonly="true" id='txtBatchNo1' name='txtBatchNo1' /></td>

												<td style="height: 21.5px;" class="col-md-1-1 center"><form:input
														type='text' class='form-control input-SmallText # deleteGroup1 # textNo'
														path="creditNoteSlaves[0].creditNoteSlaveBatchExpiry"
														id='txtExpiry1' name='txtExpiry1' readonly="true" /></td>

												<td style="height: 21.5px;" class="col-md-1-1 center"><form:input
														type='text' class='form-control input-SmallText # deleteGroup1 # textNo'
														path="creditNoteSlaves[0].creditNoteSlaveMrp"
														readonly="true" id='txtMRP1' name='txtMRP1' /></td>

												<td style="height: 21.5px;" class="col-md-1-1 center"><form:input
														type='text' class='form-control input-SmallText # deleteGroup1 # textNo'
														path="creditNoteSlaves[0].creditNoteSlaveRate"
														readonly="true" id='txtRate1' name='txtRate1' /></td>

												<td style="display: none;">
													<%-- 	<form:hidden path="creditNoteSlaves[0].productMaster.batchMaster[0].batchCode" id="" /> --%>
													<form:input
														path="creditNoteSlaves[0].productMaster.batchMaster[0].batchId"
														type="text" id="textBatchId1" name="textBatchId1"
														class='form-control input-SmallText' readonly="true" /> <form:input
														path="creditNoteSlaves[0].productMaster.batchMaster[0].stockMaster.stockId"
														type="text" id="textStockId1" name="textStockId1"
														class='form-control input-SmallText' readonly="true" /> <form:input
														path="creditNoteSlaves[0].productMaster.batchMaster[0].stockMaster.stockQtyInHand"
														type="text" id="textStockQtyInHand1"
														name="textStockQtyInHand1"
														class='form-control input-SmallText' readonly="true" /> <form:input
														path="creditNoteSlaves[0].creditNoteSlaveRatePerUnit"
														type="text" id="textRatePerUnit1" name="textRatePerUnit1"
														class='form-control input-SmallText' readonly="true" />
												</td>

												<td style="height: 21.5px;" class="col-md-1-1 center"><form:input
														type='text' class='form-control input-SmallText # deleteGroup1 # textNo'
														path="creditNoteSlaves[0].creditNoteSlaveCode"
														id='txtCode1' name='txtCode1' readonly="true" /></td>

												<td style="height: 21.5px;" class="col-md-1-1 center"><form:input
														type='text' class='form-control input-SmallText # deleteGroup1 # textNo' path=""
														id='textPurchaseRate1' name='textPurchaseRate1'
														readonly="true" /></td>

												<td style="height: 21.5px;" class="col-md-1-1 center"><form:input
														type='text' class='form-control input-SmallText # deleteGroup1 # textNo'
														path="creditNoteSlaves[0].creditNoteSlaveAmt" id='txtAmt1'
														name='txtAmt1' value='0' readonly="true" /></td>


												<td><input type="checkbox" name="deleteGroup" value="1"
													id="deleteGroup1"></td>

												<td style="display: none;"><input id="textClStk1"
													class="form-control input-SmallText" type="text" readonly>
													<input id="textTotalStk1"
													class="form-control input-SmallText" type="text" readonly>

													<!-- 	<input id="textPurchaseRate1"
													class="form-control input-SmallText" type="text" readonly>
 --></td>
											</tr>
										</tbody>
									</table>
								</div>




								<div class="divide-40"></div>
								<div class="col-md-12-1 panel panel-default"
									style="margin-top: -50px">


									<div class="col-md-2-1 panel panel-default"
										style="margin-top: 9px;display: none">
										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-4-1" style="margin-top: 0px;">
												<b> Discount%</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input path="creditNoteDiscPercent" id="txtDic"
													type="text" class='form-control input-SmallText' value='0'
													placeholder="Dic" name="txtDic" onchange="validateDis();"
													onblur="isFloatingPoint('txtDic'),calculateDiscount();" />
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-4-1" style="margin-top: 0px;">
												<b> Discount</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input path="creditNoteDiscount" id="txtDiscount"
													class="form-control input-SmallText" type="text"
													placeholder="Discount" name="txtDiscount"
													onblur="calculateDiscount()" />
												<br>
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-4-1" style="margin-top: 0px;">
												<b>SurCharge</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input path="creditNoteSurcharge" id="txtSurCharge"
													requird="true" placeholder="SurCharge"
													class='form-control input-SmallText' type="text"
													name="txtSurChatrges"
													onblur="isFloatingPoint('txtSurCharge'),calculateAdd();" />
												<br>
											</div>
										</div>
									</div>

									<div class="col-md-3-1 panel panel-default"
										style="margin-top: 9px; margin-left: 2%">

										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Adjust in Bill No</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input path="creditNoteBillNo" id="txtAdjustinBillNo"
													class="form-control input-SmallText" type="text"
													name="txtAdjustinBillNo" requird="true"
													placeholder="Adjust in Bill No" />
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b> Date </b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input path="creditNoteBillDate" id="txtAdjDate"
													class="form-control input-SmallText" type="text"
													readonly="true" name="txtAdjDate" requird="true"
													placeholder="Date"
													onclick="displayCalendar(document.getElementById('txtAdjDate'),'dd/mm/yyyy',this)" />
												<br>
											</div>
										</div>


									</div>


									<div class="col-md-3-1 panel panel-default"
										style="margin-top: 9px; margin-left: 2%">
										<div class="col-md-12-1"
											style="margin-top: 9px; margin-left: 2%">
											<div class="col-md-4-1" style="margin-top: 0px;">
												<b> Entered By OWNER on</b>
											</div>

											<div class="col-md-6-1" style="margin-top: 0px;">
												<form:input path="creditNoteEntryBy" id="txtEntrDate"
													class="form-control input-SmallText" type="text"
													readonly="true" name="txtEntrDate" requird="true"
													placeholder="Date"
													onclick="displayCalendar(document.getElementById('txtEntrDate'),'dd/mm/yyyy',this)" />
												<br>
											</div>
										</div>
									</div>

									<!-- Suraj code for amount calculation -->

									<div
										style="margin-right: 2%; margin-left: 7px; margin-top: 9px;"
										class="form-group  col-md-2-1" id="divAmtCalc">

										<div style="margin-right: 2%; margin-bottom: 2%;"
											class="form-group  col-md-12-1">

											<label class="TextFont"></label>

										</div>
										<div style="margin-right: 2%; margin-left: 2%;"
											class="form-group  col-md-7-1">

											<label class="TextFont"><b>Amount Payable</b></label> <input
												type="text" value="0"
												onblur="isFloatingPoint('txtAmtRec');calculateCreditPending()"
												class="form-control input-SmallText"
												placeholder="Amount Payable" name="creditNoteAmountPayble"
												id="txtAmtRec" readonly="true">

										</div>

										<div style="margin-right: 2%; margin-left: 2%;"
											class="form-group  col-md-12-1">

											<label class="TextFont"><b>Amount Balance</b></label> <input
												type="text" value="0" readonly="readonly"
												class="form-control input-SmallText"
												placeholder="Amount Balance" name="indentSaleAmountBalance"
												id="txtAmtBal"> <input type="hidden" value="0"
												name="indentSalePreviousBalance"
												id="indentSalePreviousBalance">

										</div>

										<div
											style="margin-right: 2%; margin-left: 2%; background: yellow"
											class="form-group  col-md-12-1">

											<label class="TextFont"><b>Previous Balance</b></label> <span
												id="mainPendingBalance"></span>

										</div>
									</div>


									<!-- end of amount calculation -->

									<div class="col-md-3-1 center pull-right"
										style="margin-top: 9px;">
										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Gross Amount</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input path="creditNoteGrossAmt" id="txtGross"
													value='0' class="form-control input-SmallText " type="text"
													readonly="true" requird="true" placeholder="Gross Amount"
													name="txtGross" onblur=" calculateNetAmount();" />
											</div>
										</div>
										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Less</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input path="creditNoteLess" id="txtLess" value='0'
													class="form-control input-SmallText" type="text"
													readonly="true" placeholder="less" name="txtLess" />
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Add</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input path="creditNoteAdd" id="txtAdd" value='0'
													class="form-control input-SmallText" type="text"
													readonly="true" requird="true" placeholder="Add"
													name="txtAdd" />
											</div>
										</div>
										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Net Amount</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input path="creditNoteNetAmt" id="txtNetAmt"
													type="text" readonly="true"
													class="form-control input-SmallText" value='0'
													requird="true" placeholder="Net Amount" name="txtNetAmt" />
											</div>
										</div>
									</div>

								</div>
								<div id="ItemManage" style="width: 98%; margin: 4% 0% 0% 1%;"></div>
							</form:form>
						</div>
					</div>
				</div>

				<div style="width: 98%; padding-top: 0%; font-weight: bold;"></div>
				<div id="div1" style="visibility: hidden"><%=request.getParameter("ajaxResponse")%></div>
				<div id="div3" style="visibility: hidden"><%=request.getParameter("myObj")%></div>


			</div>
		</div>


		<!-- suraj code for prevCreditPopUp -->

		<div id="prevCreditNotePopUp" class="modal fade in"
			style="height: 500px;">
			<div class="modal-dialog" style="width: 900px;">

				<div class="modal-content">
					<div class="modal-header  col-md-12"
						style="background-color: palegoldenrod">
						<div class="box-title  col-md-8 center">
							<h4>
								<i class="fa fa-mail-reply"></i>Prev Credit Note Data
							</h4>
						</div>
						<div class="col-md-4-1" style="margin-top: 0px;" id="setButtons">
							<button style="margin-top: 1px; float: right" type="button"
								class="bootbox-close-button btn-danger"
								onclick="closePopUp('prevCreditNotePopUp')" data-dismiss="modal">X</button>
						</div>
					</div>
					<div class="modal-body col-md-12 panel panel-default">

						<div class="col-md-12-1" id="prevCreditNoteType"></div>
						<div class="col-md-12-1" id="prevCreditNoteData"></div>
						<!-- /BOX-->
					</div>
					<!-- /BODY-->
					<div class="modal-footer"></div>
				</div>

			</div>
		</div>



		<!-- Suraj code for prevCreditPopUp -->


		<!-- <div>
						<label> Naration </label><input type="text" id="txtnaration"
							name="">
					</div> -->

		<%@include file="Pharma_Footer.jsp"%>


		<div id="div2" style="visibility: hidden"><%=request.getParameter("showSaveBtn")%></div>
		<div id="div4" style="visibility: hidden"><%=request.getParameter("onload")%></div>
		<input type="hidden" id="pharmaFetchStockOptionForCreditNote"
			value="<%=(String) session
					.getAttribute("fetchStockOptionForCreditNote")%>">
		<input type='hidden' value='0' id='addRowCount' /> <input
			type='hidden' value='1' id='RowCount' />
		<input
			type="hidden" id="hiddenIndentId" value="0">	
	</section>
</body>
</html>
<%@include file="Pharma_credit_note_pop_up.jsp"%>