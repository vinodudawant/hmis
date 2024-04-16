<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>E-Hat | Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<link rel="stylesheet" type="text/css"
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
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>

<!-- Application js -->

<script
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Partywise_Expiry_Debit_Note.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_ProductByBatchPopUp.js"/>"></script>
<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_shortcut.js"/>"></script>
</head>
<script type="text/javascript">
	onload = function() {
		var inputs = [];
		inputs.push('docId=2');

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "/EhatEnterprise/pharmacy/common/getDocNo",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				$('#txtVouNo').val(r);
			}
		});
		return debitAutocomplete(null);
	};

	jQuery(document).ready(function() {

		App.init(); //Initialise plugins and elements
	});
	
	shortcut.add("Ctrl+s",function() {
		$('#debitNoteMasterForm').submit();
	});
	
	shortcut.add("Ctrl+l",function() {
		backToList('debitNote');
	});
</script>
<body style="background: white ! important;">
	<section id="page">
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

			<%@include file="Pharma_left_menu_transaction.jsp"%>
			<%@include file="Pharma_partywise_debit_note_pop_up.jsp"%>
			<%@include file="HelpMenu.jsp"%>
			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<form:form commandName="partywiseExpiryDebit" id="debitNoteMasterForm"
								action="/EhatEnterprise/pharmacy/partywiseExpiryDebitNote/save" method="post">
								<!-- PAGE HEADER-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">

											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : 11 Aug 2014</li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="IPD_OPD_Database.jsp">Administrator</a></li>
												<li>Store Items</li>
												<li><i class="fa fa-question"></i></li>
												<li><i class="fa fa-exclamation-circle"
													style="color: red;">12</i></li>
												<li class="pull-right">
													<button class="btn btn-xs btn-success" id="saveBtn">Save</button>
												<li class="pull-right"><a
													href="/EhatEnterprise/pharmacy/partywiseExpiryDebitNote/view"
													class="btn btn-xs btn-info">Back to List</a></li>
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->

								<div class="col-md-12-1">
									<b>Partywise Expiry Debit Note </b>
								</div>
								<div class="row">
									<div class="panel-body col-md-12-1">
										<div class="panel-body" style="margin-top:-8px; margin-bottom:-5px; ">
											<div id="patientHistory" class="col-md-12-1"
												style="height: 100%;  width: 100%; margin-top: 0%; padding-left: 20px; border: 1px solid #b8b8b8;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-2-1" style="margin-top: 0px;">
															<b> Name </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:hidden path="vendorMaster.vendorId"
																id="hiddenVendorId" />
															<form:input path="vendorMaster.vendorName" type="text"
																id="txtPartyName" name="txtPartyName"
																class="form-control input-SmallText"
																placeholder=" Party Name" maxlength="25" required="true"
																onblur="splitVendorContent($('#txtPartyName').val())" />

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
																									url : "/EhatEnterprise/pharmacy/vendor/autoSuggestionVendor",
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
																													+ "-"
																													+ r[i].vendorAddress
																													+ "-"
																													+ r[i].vendorMobileNumber;

																										}
																										response(availableTags);
																									}

																								});
																					}
																				});
															</script>

														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-2-1" style="margin-top: 0px;">
															<b> Address </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:textarea path="vendorMaster.vendorAddress"
																id="txtAddress" style="width:97%;" cols="26"
																name="txtAddress" readonly="true" tabindex="-1"
																placeholder="Address" />
														</div>
													</div>

													<div class="col-md-12-1"
														style="margin-top: 9px; margin-bottom: 10px;">
														<div class="col-md-2-1" style="margin-top: 0px;">
															<b> Phone </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input id="txtPhone"
																path="vendorMaster.vendorMobileNumber"
																class="form-control input-SmallText" type="text"
																name="txtPhone" readonly="true" tabindex="-1"
																placeholder="Phone number" />
														</div>
													</div>
												</div>
                                                <div class="col-md-4-1" style="margin-top: 9px;">

													
												
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
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b> Vou Date </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;margin-left:-47px">
															<form:input id="txtVouDate" path="debitNoteDate"
																class="form-control input-SmallText" type="text"
																readonly="true" name="txtVouDate"
																onfocus="displayCalendar(document.getElementById('txtVouDate'),'dd/mm/yyyy',this)"
																placeholder="Vou Date" onblur="setFocusToField('txtVouDate')" />
															<br>
														</div>
													</div>
											</div>
										</div>
									</div>
								</div>
								</div>
								<div id="HSTDiv"
									style="width: 100%; height: 200Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d;">
									<table id="purchaseTable" cellpadding="0" cellspacing="0"
										border="1"
										class="table table-bordered table-striped table-condensed">
										<thead>
											<tr>
												<th class="col-md-1-1 center">Sr.</th>
												<th class='col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Product Name</div></th>
												<th class='col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Unit</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Pack</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Comp</div></th>
												
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Batch No </label></th>
												<th class='col-md-1-1 center' style="height: 21.5px;"><label
													class='TextFont'> Expiry </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Pur Rate </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> M.R.P </label></th>
												
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Qty </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Amount </label></th>
											</tr>
										</thead>
										<tbody id="DRRDiv"
											style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
											<tr>
												<td><label class='input-SmallText'>1</label></td>
												<td><form:hidden id="debitSlaveId0"
														path="debitNoteSlaves[0].debitNoteSlaveId" /> <form:hidden
														id="hiddenProductId1"
														path="debitNoteSlaves[0].productMaster.productId" />
														
														<form:hidden
														id="hiddenPurchaseSlaveId1"
														path="debitNoteSlaves[0].purchaseSlave.purSlaveId" /> 
														
														 <input
													type='hidden' id='hiddenCurrentRow' value='1' /> 
													<form:input
														path="debitNoteSlaves[0].productMaster.productName"
														type="text" id="textProductName1" name="textProductName1"
														class='form-control input-SmallText' data-toggle="modal"
														data-target="#partywise_debit_note_pop_up" onclick="load(1,1)" /></td>

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

												<td><form:input path="" type="text" id="textBatchNo1"
														name="txtBatchNo1" class='form-control input-SmallText'
														readonly="true" /></td>

												<td><form:input path="" type="text" id="textExpiry1"
														name="textExpiry1" class='form-control input-SmallText'
														readonly="true" /></td>

                                               <td><form:input
														path="" type="text"
														id="textPurRate1" name="textPurRate1"
														class='form-control input-SmallText' readonly="true" /></td>
											
												<td><form:input path="" type="text" id="textMRP1"
														name="textMRP1" class='form-control input-SmallText'
														readonly="true" /></td>

											
												<td><form:input
														path="debitNoteSlaves[0].debitNoteSlaveQty" type="text"
														id="textQty1" name="textQty1"
														class='form-control input-SmallText' readonly="true" /></td>

												
												<td><form:input path="debitNoteSlaves[0].debitNoteSlaveAmt" type="text" id="textAmt1"
														name="textAmt1" class='form-control input-SmallText'
														readonly="true" /></td>
												
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
									<div class="col-md-5-1 panel panel-default"
										style="margin-top: 16px;margin-left:10px;">
										<div class="col-md-12-1" style="margin-top: 7px;">
														<div class="col-md-4-1" style="margin-top: 7px;">
															<b>Naration </b>
														</div>
														<div class="col-md-9-1" style="margin-top: 7px;margin-left:-53px;">
															<form:input id="txtNaration " path="debitNoteNarration"
																class="form-control input-SmallText" type="text"
																name="txtNaration" 
																placeholder="Narration" />
															<br>
														</div>
										</div>
										<div class="col-md-12-1"
											style="margin-top: 9px; margin-bottom: 9px;">
											<div class="col-md-5-1" style="margin-top: -15px;">
												<b>Adjust Amount</b>
											</div>
											<div class="col-md-4-1" style="margin-top: -15px;margin-left:-94px;">
												<form:input id="txtAdjAmt" path="debitNoteAdjAmt" 
												 class="form-control input-SmallText" 
													type="text" name="txtAdjAmt" placeholder="Adjust Amount"/>
												<br>
											</div>
										</div>
									</div>

									<div class="col-md-2-1 panel panel-default"
										style="margin-top: 17px; margin-left: 2%">

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 6px;margin-right:-26px">
												<b> Vat</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 6px;">
												<form:input id="txtVat" path="debitNoteVat" class="form-control input-SmallText"
													type="text"  name="txtVat" placeholder="Vat" />
												<br>
											</div>
										</div>
									
						          </div>

									
									<div class="col-md-3-1 center"
										style="margin-top: 18px; margin-left: 6%;">
										
										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-4-1" style="margin-top: 0px;">
												<b>Gross Amount</b>
											</div>
											<div class="col-md-8-1" style="margin-top: 0px;">
												<form:input id="txtGross" path="debitNoteGrossAmt"
													readonly="true" class="form-control input-SmallText" type="text"
													name="txtGross" placeholder="Gross Amount" value="0" />
												<br>
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-4-1" style="margin-top: 0px;">
												<b>Disc</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 0px;">
												<form:input id="txtDisc" path="" readonly="true" value="0" 
													class="form-control input-SmallText" type="text" name="txtDisc"
													placeholder="Disc" onblur="calculateDisc();"/>
												<br>
											</div>
											<div class="col-md-4-1" style="margin-top: 0px;">
												<form:input id="txtDisc" path="" readonly="true" value="0"
													class="form-control input-SmallText" type="text" name="txtDisc"
													placeholder="Disc"  />
												<br>
											</div>
										</div>

										<div class="col-md-12-1"
											style="margin-top: 0px; margin-bottom: 0px;">
											<div class="col-md-4-1" style="margin-top: 0px;">
												<b>Net Amount</b>
											</div>
											<div class="col-md-8-1" style="margin-top: 0px;">
												<form:input id="txtNetAmt" path="debitNoteNetAmt" value="0"
													readonly="true" class="form-control input-SmallText" type="text"
													name="txtNetAmt" placeholder="Net Amount"  />
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

		<%@include file="Pharma_Footer.jsp"%>
		<div id="div2" style="visibility: hidden"><%=request.getParameter("showSaveBtn")%></div>
		<div id="div4" style="visibility: hidden"><%=request.getParameter("onload")%></div>
		<input type='hidden' value='0' id='addRowCount' /> <input
			type='hidden' value='1' id='RowCount' />

	</section>
</body>
</html>