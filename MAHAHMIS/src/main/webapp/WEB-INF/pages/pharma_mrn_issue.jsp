<%@page import="java.text.SimpleDateFormat"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Issue Mrn | Pharmacy</title>
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


<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/dist/css/Lobibox.min.css"/>">

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

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jquery-validate/additional-methods.min.js"/>"></script>
<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>

<!-- 	app_js -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_mrn_issue.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_mrn_issue_batch_pop_up.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_shortcut.js"/>"></script>

<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/js/morphext.min.js"/>"></script>


<script src="<c:url value="../.././pharma-resources/dist/js/lobibox.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/dist/js/messageboxes.min.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/dist/js/notifications.min.js"/>"></script>

<script src="<c:url value="../.././pharma-resources/alertify.js"/>"></script> 


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
	z-index: 10000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('../../pharma-resources/images/ajax_loader_blue_64.gif')
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
	jQuery(document).ready(function() {
		App.setPage("Pharma_Purchase_Order"); //Set current page
		App.init(); //Initialise plugins and elements

		$('#mrn_pending_data').on('shown.bs.modal', function(e) {

			fetchPendingMRNData();

		});
		setResult();
	});

	function setResult(result) {
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "../../pharmacy/mrn/getPendingMRNCount",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {

				if (r > 0) {
					setMRNAlert(r, 'pending');
				} else {
					setMRNAlert(r, 'fullfill');
				}
			}
		});
	}

	function setMRNAlert(result, type) {
		if (type == 'pending') {
			Lobibox.notify('warning', // Available types 'warning', 'info', 'success', 'error'
			{
				msg : 'you Have ' + result + ' Pending MRN',
				title : 'MRN Information'
			});
		} else {
			Lobibox.notify('success', // Available types 'warning', 'info', 'success', 'error'
			{
				msg : 'No pending MRN',
				title : 'MRN Information'
			});
		}

	}

	/* jQuery(document).ajaxStart(function() {
		
		$("body").addClass("loading");
	});

	jQuery(document).ajaxStop(function() {
		$("body").removeClass("loading");
		
	}); */
</script>
<script type="text/javascript">
	onload = function() {
		var inputs = [];
		/* getNextAutoIncrement(); */
		//if update request 
		if ($('#txtBillNo').val() == "") {
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
					$('#txtBillNo').val(r);
				}
			});
		}

		$('#txtPartyName').focus();

		/* $("#saveBtn").click(function(event) {

			$("#frmPurchaseOrderForm").submit();
			window.open("/EhatEnterprise/pharmacy/po/view-frm");

			reset();
			alertify.success("Record Saved Succesfully");
		}); */

		return setValuesToAutocomplete(null);
	};

	shortcut.add("Ctrl+s", function() {
		validateData();

	});

	shortcut.add("Ctrl+l", function() {
		backToList('po');
	});

	shortcut.add("Ctrl+w", function() {
		removeSlaveFocus('frmPurchaseOrderForm');
	});

	jQuery(document).ajaxStart(function() {
		//alert("hi ajax start");
		$("body").addClass("loading");
	});

	jQuery(document).ajaxStop(function() {
		$("body").removeClass("loading");
		//alert("hi ajax stop");
	});
</script>
<script>
	
<%java.util.Calendar currentDate = java.util.Calendar.getInstance();
			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
					"dd/MM/yyyy");
			String todays_date = formatter.format(currentDate.getTime());

			java.text.SimpleDateFormat dateFormat = new SimpleDateFormat(
					"HH:mm:ss");
			java.util.Calendar cal = java.util.Calendar.getInstance();
			String time = dateFormat.format(cal.getTime());%>
	function validateData() {

		if ($('#txtMrnNo').val() != null && $('#txtMrnNo').val() != "") {
			if ($('#txtPatient').val() != null && $('#txtPatient').val() != "") {
				if ($('#mrnGenerateDate').val() != null
						&& $('#mrnGenerateDate').val() != "") {
					if ($('#popup_container2').val() != null
							&& $('#popup_container2').val() != "") {
						if ($('#txtBillNo').val() != null
								&& $('#txtBillNo').val() != "") {
							if ($('#txtGrossAmt').val() != null
									&& $('#txtGrossAmt').val() != 0) {

								if ($('#txtAmtRec').val() != null
										&& $('#txtAmtRec').val().trim().length > 0) {

									if ($('#txtAmtBal').val() != null
											&& $('#txtAmtBal').val() != ''
											&& $('#txtAmtBal').val().trim().length > 0) {
										for ( var i = 1; i < $('#RowCount')
												.val(); i++) {
											if ($('#rowDeleteFlag' + i).val() == 0) {
												if ($('#hiddenProductId' + i)
														.val() == ''
														|| $(
																'#hiddenProductId'
																		+ i)
																.val() == null
														|| $(
																'#hiddenProductId'
																		+ i)
																.val() == 0) {
													alert("Please Select Product!");
													$('#textProductName' + i)
															.focus();
													return false;
												} else if ($('#textBatchNo' + i)
														.val() == ''
														|| $('#textBatchNo' + i)
																.val() == null
														|| $('#textBatchNo' + i)
																.val() == 0) {
													alert("Please Select Batch !");
													$('#textProductName' + i)
															.focus();
													return false;
												}
											}

										}
										alert("Record Saved  Successfully!");
										$('#mrnIssue').submit();
										window
												.open("../../pharmacy/indentSale/view-frm");
									} else {
										alert("Enter Amount Balance");
										$('#txtAmtBal').focus();
									}
								} else {
									alert("Enter Amount Receive");
									$('#txtAmtRec').focus();
								}
							} else {
								alert("Select product name");
								$('#txtMrnNo').focus();
							}
						} else {
							alert("Enter Vou No");
							$('#txtBillNo').focus();
						}
					} else {
						alert("Enter Indent Received Date");
						$('#popup_container2').focus();
					}
				}

				else {
					alert("Enter Indent Generated Date");
					$('#mrnGenerateDate').focus();
				}
			}

			else {
				alert("Enter Patient Name");
				$('#txtPatient').focus();
			}
		} else {
			alert("select indent Date");
			$('#selectIndentId').focus();
		}

	}

	function hidePopUp() {
		$('#Indent_Sales_pending_data').hide();
	}
</script>
</head>

<body style="background: white ! important;">
	<section id="page">
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->
			<%@include file="Pharma_left_menu_transaction.jsp"%>
			<%@include file="pharma_mrn_issue_pop_up.jsp"%>
			<%@include file="pharma_mrn_issue_pending_pop_up.jsp"%>
			<%@include file="pharma_mrn_issue_store_pop_up.jsp"%>
			<%@include file="HelpMenu.jsp"%>

			<div id="main-content">
				<div class="container">
					<form:form commandName="mrnIssue" id="mrnIssue" method="post">
						<div class="row">
							<div id="content" class="col-lg-12">
								<div class="row">
									<div class="col-sm-12 col-md-12" style="margin-bottom: -2%">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date :<%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a
													href="../../Dashboard.jsp">Home</a></li>
												<li><a
													href="../../pharmacy/pharmacy/transaction">Pharmacy</a></li>
												<li>MRN Issue Entry</li>


												<!-- <li><i class="fa fa"></i></li>
												<li><a href="IPD_OPD_Database.jsp">Document SetUp</a></li> -->
												<div class="li pull-right" style="margin-left: 9px;">
													<button class="btn btn-xs btn-success" type="button"
														id="saveBtn" onclick="saveMRN()">Save and
														Print(Ctrl+S)</button>

												</div>
												<!-- <div class="li pull-right">
													<a class="btn btn-xs btn-info"
														href="/EhatEnterprise/pharmacy/mrn/view.list.htm">Back
														to List</a>
												</div> -->


											</ul>
										</div>
									</div>
								</div>

								<div class="row">
									<!-- BOX -->
									<div id="tabs" class="box border red">
										<div class="box-title">
											<h4>
												<i class="fa fa-columns"></i><span
													class="hidden-inline-mobile">MRN Issue</span>
											</h4>
										</div>
										<div class="box-body">
											<div class="tabbable header-tabs">
												<ul class="nav nav-tabs">
													<!-- <li id="tab1" class=""><a onclick="setApproval();"
														href="#box_tab3" data-toggle="tab"><i
															class="fa fa-circle-o"></i> <span
															class="hidden-inline-mobile">More</span></a></li> -->
													<li id="tab2" class=""><a onclick="mrnIssueList();"
														href="#box_tab2" data-toggle="tab"><i
															class="fa fa-laptop"></i> <span
															class="hidden-inline-mobile">MRN Issue List</span></a></li>
													<li id="tab3" class="active"><a href="#box_tab1"
														data-toggle="tab"><i class="fa fa-calendar-o"></i> <span
															class="hidden-inline-mobile">MRN Issue</span></a></li>
												</ul>
												<div class="tab-content">
													<div class="tab-pane fade active in" id="box_tab1">

														<div class="row" style="margin-top: 10px">
															<!-- <h5>
										<font color="tomato">Purchase Entry</font>
									</h5> -->

															<div class="col-md-12-1">
																<div class="col-md-2">
																	<font color="tomato" style="font-size: 19px">Mrn
																		Issue Entry</font>
																</div>
																<div class="col-md-6-1" id="indentNumber">
																	<div class="">
																		<button class="btn btn-xs btn-info"
																			data-target="#mrn_pending_data" data-toggle="modal" onclick="fetchPendingMRNData()"
																			type="button">GET MRN</button>
																	</div>
																</div>

																<div style="margin-top: 1px;" class="col-md-2-1">
																	<div class="col-md-4">
																		<strong> Without MRN</strong>
																	</div>
																	<div class="col-md-6">
																		<input type="checkbox" name="withoutMRN"
																			onclick="selectWithoutMRN()" id="withoutMRN">
																	</div>
																	<div class="col-md-5" style="margin-top:-31px;margin-left:135px">
																		<strong>Receive In store</strong>
																	</div>
																	<div class="col-md-6" style="margin-top: -32px;margin-left:195px">
																		<input type="checkbox" name="withReceive" checked="checked"
																			onclick="" id="withReceive">
																	</div>
																</div>
															</div>
														</div>

														<div class="row">
															<div class="col-md-12-1 panel-body">
																<div class="panel-body">

																	<div id="vendorMaster" class="col-md-12-1"
																		style="height: 100%; margin-top: 0%; padding-left: 20px; border: 1px solid #b8b8b8;">

																		<div class="col-md-4-1" style="margin-top: 9px;">
																			<div class="col-md-12-1" style="margin-top: 0px;">
																				<div class="col-md-4-1" style="margin-top: 0px;">
																					<b>MRN No.</b>
																				</div>
																				<div class="col-md-7-1" style="margin-top: 0px;">
																					<form:input path="" type="text" id="txtMrnNo"
																						name="txtMrnNo"
																						class="form-control input-SmallText"
																						readonly="true" placeholder="MRN No"
																						required="true" onblur="isNumber('txtMrnNo');" />
																					<div class='col-md-1-1 center'
																						style='margin-top: -11px; margin-left: 203px; color: red;'>
																						<b> *</b>
																					</div>
																					<form:hidden path="" id="hiddenIndentSalelId" />

																					<input type="hidden" id="products"> <input
																						type="hidden" id="productsQuantity">
																						<input type="hidden" id="mainStore" value="0">

																				</div>

																			</div>

																			<div class="col-md-12-1"
																				style="margin-top: 9px; margin-bottom: 10px;">
																				<div class="col-md-4-1" style="margin-top: 0px;">
																					<b>Received From </b>
																				</div>
																				<div class="col-md-7-1" style="margin-top: 0px;">
																					<input type="text" id="txtRecFrom"
																						name="txtRecFrom"
																						class="form-control input-SmallText" readonly
																						placeholder="Received From" required />
																				</div>
																				<form:hidden path="storeId" id="hiddenStoreId" />

																			</div>
																		</div>
																		<div class="col-md-4-1" style="margin-top: 9px;">

																			<div class="col-md-12-1" style="margin-top: 0px;">
																				<div class="col-md-4-1 center"
																					style="margin-top: 0px;">
																					<b>MRN Generated Date</b>
																				</div>
																				<div class="col-md-7-1" style="margin-top: 0px;">
																					<form:input path="" id="mrnGenerateDate"
																						name="mrnGenerateDate"
																						placeholder="MRN Generated Date" required="true"
																						class="form-control input-SmallText"
																						readonly="true" onkeydown="closeCalendar();" />
																					<div class='col-md-1-1 center'
																						style='margin-top: -11px; margin-left: 203px; color: red;'>
																						<b> *</b>
																					</div>
																				</div>

																			</div>
																			<div class="col-md-12-1" style="margin-top: 9px;">
																				<div class="col-md-4-1 center"
																					style="margin-top: 0px;">
																					<b>MRN Received Date</b>
																				</div>
																				<div class="col-md-4-1" style="margin-top: 0px;">
																					<form:input path="" id="popup_container2"
																						name="popup_container2"
																						onfocus="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)"
																						placeholder="Date" required="true"
																						value="<%=todays_date%>"
																						class="form-control input-SmallText"
																						readonly="true" onkeydown="closeCalendar();" />
																					<div class='col-md-1-1 center'
																						style='margin-top: -11px; margin-left: 203px; color: red;'>
																						<b> *</b>
																					</div>
																				</div>

																				<div class="col-md-3-1" style="margin-top: 0px;">
																					<form:input path="" id="txtTime"
																						class="form-control input-SmallText" type="text"
																						name="txtTime" readonly="true" value="<%=time%>" />
																				</div>
																			</div>
																		</div>

																		<div class="col-md-4" style="margin-top: 9px;">
																			<div class="col-md-12-1" style="margin-top: 0px;">
																				<div class="col-md-4-1" style="margin-top: 0px;">
																					<b>Vou No</b>
																				</div>
																				<div class="col-md-8-1"
																					style="margin-top: -15px; margin-left: 49px;">
																					<form:input path="" type="text" id="txtBillNo"
																						class="form-control input-SmallText"
																						name="txtBillNo" placeholder="Bill No"
																						required="true" readonly="true" />
																					<div class='col-md-1-1 center'
																						style='margin-top: -11px; margin-left: 213px; color: red;'>
																						<b> *</b>
																					</div>
																				</div>
																			</div>

																			<div class="col-md-12-1 center"
																				style="margin-top: 9px;">
																				<form:radiobutton path="" id="radioCash" value='0'
																					name="radioCashCredit" checked="true"
																					onclick='setAmountBalance()' />
																				Cash
																				<form:radiobutton path="" id="radioCredit" value='1'
																					name="radioCashCredit" onclick='setAmountBalance()' />
																				Credit
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>

														<div id=""
															style="width: 100%; height: 200Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d;">
															<div class="col-md-12-1">
																<input type="button" value="-"
																	class="btn btn-xs btn-success"
																	style="margin: 7px; float: right"
																	onclick="deleteRow();">
															</div>
															<table id="purchaseTable" cellpadding="0" cellspacing="0"
																border="1"
																class="table table-bordered table-striped table-condensed">
																<thead>
																	<tr>
																		<th class="col-md- center">Sr.</th>
																		<th style="height: 21.5px;" class="col-md-1-1 center"><div
																				class="TextFont">Product</div></th>
																		<th style="height: 21.5px;" class="col-md-1-1 center"><div
																				class="TextFont">Unit</div></th>

																		<th style="height: 21.5px;" class=" col-md-1-1 center"><div
																				class="TextFont">Pack</div></th>
																		<th style="height: 21.5px;" class=" col-md-1-1 center"><div
																				class="TextFont">Com</div></th>

																		<th style="height: 21.5px;" class=" col-md-1-1 center"><div
																				class="TextFont">Require Qty</div></th>

																		<th style="height: 21.5px;" class=" col-md-1-1 center"><div
																				class="TextFont">Issue Qty</div></th>

																		<th style="height: 21.5px;" class=" col-md-1-1 center"><div
																				class="TextFont">Pending Quantity</div></th>

																		<th style="height: 21.5px;" class=" col-md-1-1 center"><div
																				class="TextFont">Batch</div></th>
																		<th style="height: 21.5px;" class=" col-md-1-1 center"><div
																				class="TextFont">Expiry</div></th>
																		<th style="height: 21.5px;" class=" col-md-1-0 center"><div
																				class="TextFont">Disc</div></th>
																		<th style="height: 21.5px;" class=" col-md-1-0 center"><div
																				class="TextFont">GST%</div></th>
																		<!-- <th style="height: 21.5px;" class=" col-md-1-1 center"><div
														class="TextFont">Prft%</div></th> -->
																		<th style="height: 21.5px;" class=" col-md-1-1 center"><div
																				class="TextFont">Mrp</div></th>
																		<th style="height: 21.5px;" class=" col-md-1-1 center"><div
																				class="TextFont">Rate</div></th>

																		<th style="height: 21.5px;" class=" col-md-1-1 center"><div
																				class="TextFont">Amount</div></th>

																		<th style="height: 21.5px;" class=" col-md-1-1 center"><div
																				class="TextFont">Add Another Batch</div></th>

																		<th style="height: 21.5px;" class=" col-md-1-1 center"><div
																				class="TextFont">Select</div></th>

																	</tr>
																</thead>
																<tbody id="HSTDiv"
																	style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">


																</tbody>
															</table>
														</div>
														<div class="divide-20"></div>

														<!-- Start Calculation -->
														<div class="row " style="margin-top: 0px;" id="calculationDiv">
															<div class="col-md-12-1" style="margin-top: 9px;">
																<%-- <div class="form-group  col-md-10-1"
																	style="margin-right: 0%; margin-left: 0%;">
																	<div class="form-group  col-md-12-1"
																		style="margin-right: 2%; margin-left: 2%;">
																		<div class="col-md-1-1" style="margin-top: 9px;">
																			<b>Naration</b>
																		</div>
																		<div class="col-md-7-1"
																			style="margin-top: 5px; margin-right: 0%;">
																			<form:input path="mrnIssueNarration" type="text"
																				id="txtNaration" name="txtNaration"
																				class="form-control input-SmallText"
																				placeholder="Naration" />

																		</div>

																	</div>
																</div> --%>

																<%-- <div class="form-group  col-md-2-1"
																	style="margin-right: 1%; margin-left: 1%;">
																	<div class="form-group  col-md-12-1"
																		style="margin-right: 2%; margin-left: 2%;">
																		<div class="col-md-5-1"
																			style="margin-top: 5px; margin-right: 2%;">
																			<b>C.N.</b>
																		</div>
																		<div class="col-md-6-1"
																			style="margin-top: 5px; margin-right: 2%;">
																			<form:input path="mrnIssueCN"
																				class="form-control input-SmallText" type="text"
																				id="txtCN" name="txtCN" placeholder="C.N."
																				onblur="isFloatingPoint('txtCN');" />
																		</div>
																	</div>
																	<div class="form-group col-md-12-1"
																		style="margin-right: 2%; margin-left: 2%;">
																		<div class="col-md-5-1"
																			style="margin-top: 5px; margin-right: 2%;">
																			<b> C.D.%</b>
																		</div>
																		<div class="col-md-6-1"
																			style="margin-top: 5px; margin-right: 2%;">
																			<form:input class="form-control input-SmallText"
																				path="mrnIssueCD" type="text" id="txtCD"
																				name="txtCD" placeholder="C.D.%"
																				onblur="isFloatingPoint('txtCD'),calculatecdAmt(),CheckDis();" />
																		</div>
																	</div>

																</div> --%>

																<%-- <div class="form-group  col-md-2-1"
																	style="margin-right: 1%; margin-left: 1%;">
																	<div class="form-group  col-md-12-1"
																		style="margin-right: 2%; margin-left: 2%;">
																		<div class="col-md-5-1"
																			style="margin-top: 5px; margin-right: 2%;">
																			<b>Special Disc</b>
																		</div>
																		<div class="col-md-6-1"
																			style="margin-top: 5px; margin-right: 2%;">
																			<form:input path="mrnIssueSpecialDisc" type="text"
																				id="txtSpecialDisc"
																				class="form-control input-SmallText"
																				name="txtSpecialDisc" placeholder="Special Disc"
																				onchange="calculateDiscount();"
																				onblur="isFloatingPoint('txtSpecialDisc'),validateSpeDiscount();" />
																		</div>

																	</div>
																	<div class="form-group  col-md-12-1"
																		style="margin-right: 2%; margin-left: 2%;">
																		<div class="col-md-5-1"
																			style="margin-top: 5px; margin-right: 2%;">
																			<b>C.N.Amt</b>
																		</div>
																		<div class="col-md-6-1"
																			style="margin-top: 5px; margin-right: 2%;">
																			<form:input path="mrnIssueCnAmt" type="text"
																				id="txtCNAmt" class="form-control input-SmallText"
																				name="txtCNAmt" placeholder="C.N.Amt"
																				onblur="isFloatingPoint('txtCNAmt');" />
																		</div>

																	</div>
																	<div class="form-group  col-md-12-1"
																		style="margin-right: 2%; margin-left: 2%;">
																		<div class="col-md-5-1"
																			style="margin-top: 5px; margin-right: 2%;">
																			<b>C.D.Amt</b>
																		</div>
																		<div class="col-md-6-1"
																			style="margin-top: 5px; margin-right: 2%;">
																			<form:input path="mrnIssueCdAmt" type="text"
																				readonly="true" id="txtCDAmt"
																				class="form-control input-SmallText" name="txtCDAmt"
																				placeholder="C.D.Amt" />
																		</div>

																	</div>

																</div> --%>

																<%-- <div class="form-group  col-md-2-1"
																	style="margin-right: 2%; margin-left: 2%;">
																	<div class="box border blue">
																		<div class="box-title">
																			<h4>
																				<i class="fa fa-edit"></i><b>Surcharges</b>
																			</h4>

																		</div>
																<div class="box-body">
																			<div class="box-body">
																				<div class="col-md-5-1"
																					style="margin-top: 0px; margin-right: 2%;">
																					<b>Surcharge</b>
																				</div>
																				<div class="col-md-6-1"
																					style="margin-top: 0px; margin-right: 2%;">
																					<form:input path="mrnIssueSurcharges" type="text"
																						id="txtSurcharge" name="txtSurcharge"
																						class="form-control input-SmallText"
																						placeholder="Surcharge"
																						onblur="isFloatingPoint('txtSurcharge'),calculateSurcharges();" />
																				</div>
																			</div>
																		</div> 
																	</div>
																</div> --%>

																<div class="form-group  col-md-2-1"
																	style="margin-right: 2%; margin-left: 2%; margin-top: -5%;">


																	<div class="form-group  col-md-12-1"
																		style="margin-right: 2%; margin-bottom: 2%;">

																		<label class="TextFont"></label>

																	</div>
																	<%-- <div class="form-group  col-md-7-1"
																		style="margin-right: 2%; margin-left: 2%;">

																		<label class="TextFont"><b>Amount Received</b></label>


																		<form:input path="mrnIssueAmountReceive" type="text"
																			id="txtAmtRec" class="form-control input-SmallText"
																			name="txtAmtRec" placeholder="Amount Received"
																			onblur="isFloatingPoint('txtAmtRec');calculatePending()" />

																	</div>
 --%>
																<%-- 	<div class="form-group  col-md-12-1"
																		style="margin-right: 2%; margin-left: 2%;">

																		<label class="TextFont"><b>Amount Balance</b></label>

																		<form:input path="mrnIssueAmountBalance" type="text"
																			id="txtAmtBal" class="form-control input-SmallText"
																			name="txtAmtBal" placeholder="Amount Balance"
																			readonly="true" />


																		<form:hidden path="mrnIssuePreviousBalance"
																			id='indentSalePreviousBalance' />

																	</div> --%>

																	<!-- <div class="form-group  col-md-12-1"
																		style="margin-right: 2%; margin-left: 2%; background: yellow">

																		<label class="TextFont"><b>Previous
																				Balance</b></label> <span id='mainPendingBalance'></span>

																	</div> -->
																</div>

																<div class="form-group  col-md-2-1"
																	style="margin-right: 2%; margin-left: 2%; float: right; margin-top: -4%;">
																	<div class="form-group  col-md-12-1"
																		style="margin-right: 2%; margin-left: 2%;">
																		<div class="col-md-5-1"
																			style="margin-top: 40px; margin-right: 2%;">
																			<label class="TextFont"><b>Gross Amt</b></label>
																		</div>
																		<div class="col-md-6-1"
																			style="margin-top: 40px; margin-right: 2%;">
																			<form:input path="mrnIssueGrossAmt" type="text"
																				value='0' id="txtGrossAmt"
																				class="form-control input-SmallText"
																				name="txtGrossAmt" placeholder="Gross Amt"
																				readonly="true" />
																		</div>

																	</div>
																	<div class="form-group  col-md-12-1"
																		style="margin-right: 2%; margin-left: 2%;">
																		<div class="col-md-5-1"
																			style="margin-top: 5px; margin-right: 2%;">
																			<label class="TextFont"><b>Less</b></label>
																		</div>
																		<div class="col-md-6-1"
																			style="margin-top: 5px; margin-right: 2%;">
																			<form:input path="mrnIssueLess" type="text"
																				id="txtLess" name="txtLess" value='0'
																				readonly="true" class="form-control input-SmallText"
																				placeholder="Less"
																				onblur="calculateNetAmount('less');" />
																		</div>

																	</div>

																	<div class="form-group  col-md-12-1"
																		style="margin-right: 2%; margin-left: 2%;">
																		<div class="col-md-5-1"
																			style="margin-top: 5px; margin-right: 2%;">
																			<label class="TextFont"><b>Add</b></label>
																		</div>
																		<div class="col-md-6-1"
																			style="margin-top: 5px; margin-right: 2%;">
																			<form:input path="mrnIssueAdd" type="text"
																				id="txtAdd" name="txtAdd"
																				class="form-control input-SmallText" value='0'
																				readonly="true" placeholder="Add"
																				onblur="calculateNetAmount('add')" />
																		</div>

																	</div>

																	<div class="form-group  col-md-12-1"
																		style="margin-right: 2%; margin-left: 2%;">
																		<div class="col-md-5-1"
																			style="margin-top: 5px; margin-right: 2%;">
																			<label class="TextFont"><b>Round</b></label>
																		</div>
																		<div class="col-md-6-1"
																			style="margin-top: 5px; margin-right: 2%;">
																			<form:input path="mrnIssueRound" type="text"
																				value='0' id="txtRount"
																				class="form-control input-SmallText" name="txtRount"
																				placeholder="Round" />
																		</div>

																	</div>
																	<div class="form-group  col-md-12-1"
																		style="margin-right: 2%; margin-left: 2%;">
																		<div class="col-md-5-1"
																			style="margin-top: 5px; margin-right: 2%;">
																			<label class="TextFont"><b>Net Amt.</b></label>
																		</div>
																		<div class="col-md-6-1"
																			style="margin-top: 5px; margin-right: 2%;">
																			<form:input path="mrnIssueNetAmt" type="text"
																				readonly="true" id="txtNetAmt" value="0"
																				class="form-control input-SmallText"
																				name="txtNetAmt" placeholder="Net Amt." />
																		</div>
																	</div>
																</div>
															</div>
														</div>



													</div>
													<div class="tab-pane fade" id="box_tab2">

														<!-- search code -->
														<div id="SearchContent" class="row" style="">
															<div class='col-md-1'><strong>Search By:</strong></div>
															<div class='col-md-1'><strong>MRN Issue No</strong></div>
															<div class="form-group col-md-2-1" id="divbyName">
																<input name="txtMRNIssueNo" type="text"
																	id="txtMRNIssueNo"
																	class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1 "
																	id="txtStoreName"
																	onblur="splitMRNIssueData($('#txtMRNIssueNo').val())" />
																<input type="hidden" id="hiddenMRNIssueId" />

																<script type="text/javascript">
																	$(
																			"#txtMRNIssueNo")
																			.autocomplete(
																					{
																						source : function(
																								request,
																								response) {

																							var findingName = $(
																									"#txtMRNIssueNo")
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
																										url : "../../pharmacy/mrn/autoSuggestionMRNIssueNumber",
																										timeout : 1000 * 60 * 5,
																										catche : false,
																										error : function() {
																											/* alert('error'); */
																										},
																										success : function(
																												r) {
																											var availableTags = [];

																											if (r.length > 0) {
																												for ( var i = 0; i < r.length; i++) {
																													availableTags[i] = r[i].mrnIssueId
																															+ "";
																												}
																												response(availableTags);
																											} else {
																												availableTags[0] = "No Record Found";
																												response(availableTags);
																											}

																										}
																									});
																						}
																					});
																</script>
															</div>
															<div class='col-md-1-1'
																style="margin-left: 9px; margin-top: -10px;">
																<input id='' type='button' value='Search' class='edit'
																	onclick='searchMRNIssueByMRNId($("#hiddenMRNIssueId").val());' />
																<div class='col-md-2-1'
																	style="margin-left: 9px; margin-top: -10px;"></div>
															</div>

															<div class='col-md-1-1'><strong>Search By:</strong></div>
															<div class='col-md-1-1'><strong>Store Name</strong></div>
															<div class="form-group col-md-2-1" id="divbyName">
																<input name="txtStoreName" type="text" id="txtStoreName"
																	class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1 "
																	id="txtStoreName"
																	onblur="splitSearchStoreDetail($('#txtStoreName').val())" />
																<input type="hidden" id="hiddenSearchStoreId" />

																<script type="text/javascript">
																	$(
																			"#txtStoreName")
																			.autocomplete(
																					{
																						source : function(
																								request,
																								response) {

																							var findingName = $(
																									"#txtStoreName")
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
																										url : "../../pharmacy/store/autoSuggestionStore",
																										timeout : 1000 * 60 * 5,
																										catche : false,
																										error : function() {
																											/* alert('error'); */
																										},
																										success : function(
																												r) {
																											var availableTags = [];
																											for ( var i = 0; i < r.length; i++) {
																												availableTags[i] = r[i].storeName
																														+ "-"
																														+ r[i].storeId;
																											}
																											response(availableTags);
																										}
																									});
																						}
																					});
																</script>
															</div>
															<div class='col-md-1-1'
																style="margin-left: 9px; margin-top: -10px;">
																<input id='' type='button' value='Search' class='edit'
																	onclick='searchMRNIssueByStore($("#hiddenSearchStoreId").val());' />
																<div class='col-md-2-1'
																	style="margin-left: 9px; margin-top: -10px;"></div>
															</div>
														</div>

														<!--end	-->
														<div class='row' style='margin-left: 1%'>
															<input type='checkbox' id='withoutMRNCheck'
																onclick="mrnIssueList('withouMRN')"><strong>Without
																MRN List</strong>
														</div>
														<div class="row"
															style="height: 5%; max-height: auto; margin-left: 0%;">
															<div class="row"
																style="overflow-y: scroll; height: 450px; maxheight: auto; border: 1px solid #b8b8b8; margin-left: 1%; margin-right: 1%;">
																<table
																	class="table table-striped table-bordered header-fixed cf "
																	style="margin-top: 10px; width: 100%;">
																	<thead class="cf" style="background: white;">
																		<tr>
																			<th style="height: 21.5px;" class="col-md-1 center"><div>Sr.</div></th>
																			<th style="height: 21.5px;" class="col-md-2 center"><div>MRN
																					Issue No</div></th>

																			<th style="height: 21.5px;" class="col-md-2 center"><div>MRN
																					Received No</div></th>

																			<th style="height: 21.5px;" class="col-md-2 center"><div>Status</div></th>

																			<th style="height: 21.5px;" class="col-md-2 center"><div>Store
																					Name</div></th>

																			<th style="height: 21.5px;" class="col-md-2 center"><div>Print</div></th>
																			<th style="height: 21.5px;" class="col-md-1 center"><div>Edit</div></th>
																			<th style="height: 21.5px;" class="col-md-1 center"><div>Delete</div></th>
																		</tr>
																	<tbody id="mrnIssueList">

																	</tbody>
																</table>
															</div>
														</div>

													</div>
													
													<div class="tab-pane fade " id="box_tab3">
														<!-- <div class="alert alert-info">
														<strong>Hello!</strong> I'm a cool tabbed box.
													</div> -->


													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- /BOX -->
								</div>

								<!-- End Calculation -->
							</div>
						</div>
					</form:form>
				</div>
				<input type='hidden' value='1' id='RowCount' />
				<%@include file="Pharma_Footer.jsp"%>
			</div>
		</div>
	</section>
	<div class="ajaxmodal">
		<!-- Place at bottom of page -->
	</div>
</body>
</html>
