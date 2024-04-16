<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Indent Sale | Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="aIndent No.uthor" content="">
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
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/css/morphext.css"/>">

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
<!-- /for Developers  -->

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<!-- Alertify -->
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>

<!-- Application js -->
<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_indent_sale.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_patient_batch_popup.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_shortcut.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/js/morphext.min.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/alertify.js"/>"></script>
<script type="text/javascript">
	onload = function() {

		$("#DivBank").hide();
		$("#DivChequeNum").hide();
		$("#DivComment").hide();
		$("#showPatientDetail").hide();
		$("#sampleDiv").hide();
		$("#txtRatePerUnit").css('background', 'yellow');
		$("#js-rotating").Morphext({
			// The [in] animation type. Refer to Animate.css for a list of available animations.
			animation : "flash",
			// An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
			separator : ".",
			// The delay between the changing of each phrase in milliseconds.
			speed : 500,
			complete : function() {
				// Called after the entrance animation is executed.
			}
		});
		setAutoSuggetionToVendor(null);
		setValuesToAutocompleteForSale(null);
		setValuesToAutocomplete(null);
		//fetchIndentDetailsByPatientName('particular3');
	},

	jQuery(document).ready(function() {
		App.setPage("Pharma_Indent_Sales"); //Set current page
		setValuesToAutocomplete(null);
		App.init(); //Initialise plugins and elements
		expiryBatches();
		var inputs = [];
		inputs.push('docId=2');

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/common/getDocNo",
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				$('#txtBillNo').val(r);
			}
		});

		$("#saveBtn").click(function(event) {

			//$("#indentSales").submit();
			/* window.open("/EhatEnterprise/pharmacy/hospitalSalesBill/view-frm"); */

		});

		/* setInterval(function() {
			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "/EhatEnterprise/pharmacy/common/getDocNo",
				catche : false,
				error : function() {
					
				},
				success : function(r) {
					$('#txtBillNo').val(r);
				}
			});
		}, 10000); *///5 seconds
	});

	shortcut.add("Ctrl+s", function() {
		/* $('#indentSales').submit();
		window.open("/EhatEnterprise/pharmacy/indentSale/view-frm"); */
		//saveIndentSale();
		chkIndentReceive();
	});

	shortcut.add("Ctrl+l", function() {
		backToList('indentSale');
	});

	shortcut.add("Alt+a", function() {
		showAlternateProduct();
	});
	shortcut.add("Alt+o", function() {
		showPendingIndentPerDate();
	});
	shortcut.add("Alt+c", function() {
		showSettleBill();
	});
	shortcut.add("Up", function() {
		setUpfocus();
	});

	shortcut.add("Down", function() {
		setDownfocus();
	});

	shortcut.add("delete", function() {
		deleteRowOnFocus();
	});

	shortcut.add("Alt+p", function() {
		$("#sampleDiv").show();
		$("#OldDiv").hide();
		$("#txtPoProductName").focus();
		getNextAutoIncrement();
	});

	shortcut.add("Alt+d", function() {
		$("#sampleDiv").hide();
		$("#OldDiv").show();
		$('#sampleDiv').find('input:text').val('');
		$('#textMin').html('');
		$('#textStockQty').html('');
		$('#textVat').html('');
		$('#textPhoneNo').html('');

	});

	/* shortcut.add("f6", function() {
		window.open("/EhatEnterprise/pharmacy/counterSale/view-frm");

	});

	shortcut.add("f7", function() {
		window.open("/EhatEnterprise/pharmacy/patientSale/view-frm");

	}); */

	/* shortcut.add("f5", function() {
		window.open("/EhatEnterprise/pharmacy/patientSale/view-frm");

	});  */

	/* shortcut.add("f5", function() {
		window.open("/EhatEnterprise/pharmacy/purchase/view-frm");
	}); */
</script>
<%
	java.util.Calendar currentDate = java.util.Calendar
	.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
	"dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
	//For on off flow 
		ResourceBundle resourceBundleEhat = ResourceBundle
		.getBundle("Ehat");
		
		String hospitalName = (String) resourceBundleEhat
		.getString("hospitalName");
		
		if (!hospitalName.equals("")) {
%>
<input type='hidden' value='1' id='applyDisc' />
<%
	}
		else{
%>
<input type='hidden' value='0' id='applyDisc' />
<%
	}
%>
<script>
	function validateData() {

		if ($('#txtIndentNo').val() != null && $('#txtIndentNo').val() != "") {
			if ($('#txtPatient').val() != null && $('#txtPatient').val() != "") {
				if ($('#indentGenerateDate').val() != null
						&& $('#indentGenerateDate').val() != "") {
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
										calculateVat();
										alert("Record Saved  Successfully!");
										$('#indentSales').submit();
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
								$('#txtIndentNo').focus();
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
					$('#indentGenerateDate').focus();
				}
			}

			else {
				alert("Enter Patient Name");
				$('#txtPatient').focus();
			}

			/* } else {
				alert("Enter IndentNo No");
				$('#txtIndentNo').focus();
			} */

		} else {
			alert("select indent Date");
			$('#selectIndentId').focus();
		}

	}
	/* else {
		alert("select indent date");
		$('#popup_container3').focus();
	}

	}	 */

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
			<%@include file="pharma_indent_sale_pop_up.jsp"%>
			<%@include file="pharma_indent_sale_data_pop_up.jsp"%>
			<%@include file="pharma_indent_sale_pending_pop_up.jsp"%>
			<%@include file="pharma_alternative_product.jsp"%>
			<%@include file="pharma_close_indent.jsp"%>
			<%@include file="pharma_view_expiry_product.jsp"%>
			<%@include file="HelpMenu.jsp"%>

			<div id="main-content">
				<div class="container">
					<form:form commandName="indentSale" id="indentSales"
						action="../../pharmacy/indentSale/saveIndentSale"
						method="post">
						<div class="row">
							<div id="content" class="col-lg-12">
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
												<li>Indent Sales Bill Entry</li>
												<li><span style="background-color: red" class="badge"
													id='storeTitle'> <i class="fa fa-hospital-o"></i> <%
 	if (session.getAttribute("pharmacyStoreName") != null) {
 %> <%=session.getAttribute("pharmacyStoreName")%> Store <%
 	} else {
 %> No Sub Store Selected <%
 	}
 %>
												</span></li>

												<%
													if (session.getAttribute("pharmacyStoreName") != null) {
												%>
												<li><a onclick="invalidateSession()"><span
														style="background-color: red" class="badge"
														id='storeTitle'><i class="fa fa-hospital-o"></i>return
															to Main store <%
													}
												%> </span></a></li>



												<!-- <li><i class="fa fa"></i></li>
												<li><a href="IPD_OPD_Database.jsp">Document SetUp</a></li> -->
												<div class="li pull-right" style="margin-left: 9px;">
													<button class="btn btn-xs btn-success" type="button"
														id="saveBtn" onclick="chkIndentReceive()">Save
														and Print(Ctrl+S)</button>

												</div>
												<div class="li pull-right" style="margin-left: 9px;">
													<a class="btn btn-xs btn-info"
														href="../../pharmacy/indentSale/view">Back
														to List(Ctrl+l)</a>
												</div>

												<div class="li pull-right">
													<a class="btn btn-xs btn-info"
														onclick="showAlternateProduct()">Alternate
														Product(Alt+a)</a>
												</div>


											</ul>
										</div>
									</div>
								</div>
								<%-- 	<c:if test="${not empty success}">
									<div class="alert alert-success" id="msgDiv">${success}</div>
								</c:if>
								<c:if test="${not empty error}">
									<div class="alert alter-danger" id="msgDiv">${error}</div>
								</c:if> --%>
								<div class="col-md-12-1" id="indentDate">

									<div class="col-md-1-1">Select Indent Date</div>

									<div class="col-md-2-1" style="margin-left: 1%;">
										<input id="popup_container3" name="popup_container3"
											onfocus="displayCalendar(document.getElementById('popup_container3'),'dd/mm/yyyy',this)"
											placeholder="Date" class="form-control input-SmallText"
											value="<%=todays_date%>" readonly
											onkeydown="closeCalendar();"
											onchange="fetchIndentDetailsByDate(this.value)">

										<!-- <div class='col-md-1-1 center'
											style='margin-top: -11px; margin-left: 178px; color: red;'>
											<b> *</b>
										</div> -->
									</div>
									
									<div class="col-md-1-1">Select Indent Patient</div>

									<div class="col-md-2-1" style="margin-left: 1%;">
										<!-- <input id="particular3" name="particular3"
											
											placeholder="Patient Name" class="form-control input-SmallText"
											
											
											onkeyup="fetchIndentDetailsByPatientName(this.id)"> -->
										<!-- <select id="particular3"
											class="form-control input-SmallText col-md-11-1 TextFont margin-1">
											<option value="0">-Select Indent Patient-</option>
										</select> -->
										<input id="particular3"
											class="ui-autocomplete-input form-control input-SmallText col-md-11-1 margin-1"
											type="text" placeholder="Search Patient Name"
											onkeyup="fetchIndentDetailsByPatientName(this.id)"
											autocomplete="off" name="particular3">

										<div class='col-md-1-1 center'
											style='margin-top: -11px; margin-left: 178px; color: red;'>
											<b> *</b>
										</div>
									</div>

									<div class="col-md-4-1" id="indentNumber">

										<div class="">
											<button class="btn btn-xs btn-info"
												onclick='displayPendingPopUp()' type='button'>Settle
												Bill(Alt+c)</button>
										</div>
									</div>
								</div>



								<!-- <div class="col-md-12-1" style="margin-top: 1%;">
									<b>Indent Sales Bill Entry</b>
								</div> -->
								<div class="row">
									<div class="col-md-12-1 panel-body">
										<div class="panel-body">

											<div id="vendorMaster" class="col-md-12-1"
												style="height: 100%; margin-top: -2%; margin-bottom: -2%; padding-left: 20px; border: 1px solid #b8b8b8;">


												<div class="col-md-4-1" style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b>Indent No.</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="indentMaster.indentId" type="text"
																id="txtIndentNo" name="txtIndentNo"
																class="form-control input-SmallText" readonly="true"
																placeholder="Indent No" required="true"
																onblur="isNumber('txtIndentNo');" />
															<div class='col-md-1-1 center'
																style='margin-top: -11px; margin-left: 203px; color: red;'>
																<b> *</b>
															</div>
															<form:hidden path="indentSalelId"
																id="hiddenIndentSalelId" />

															<form:hidden path="" id="hiddenTreId" />
                                                       <input type="hidden" id="hiddenSponserFlag" value="0" />
                                                       <input type="hidden" id="billCategoryId" value="0" />
                                                       
															<input type="hidden" id="products"> <input
																type="hidden" id="productsQuantity">

														</div>

													</div>
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b>Patient Name</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input type="text" path="" id="txtPatient"
																class="form-control input-SmallText"
																placeholder="Patient Name" required="true"
																readonly="true" />
															<div class='col-md-1-1 center'
																style='margin-top: -11px; margin-left: 203px; color: red;'>
																<b> *</b>
															</div>
															<%-- <form:input type="hidden" path="patientMaster"
																id="hiddenPatientId" /> --%>
														</div>
													</div>

													<div class="col-md-12-1"
														style="margin-top: 9px; margin-bottom: 10px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b>Address </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:hidden id="hiddenTax5" path="indentTaxVat5" />
															<form:hidden id="hiddenTax55" path="indentTaxVat55" />
															<form:hidden id="hiddenTax12" path="indentTaxVat12" />
															<form:hidden id="hiddenTax0" path="indentTaxVat0" />
															<form:hidden id="hiddenTotalTax" path="" />
															<form:hidden id="hiddenTax6" path="indentTaxVat6" />
															<form:hidden id="hiddenTax135" path="indentTaxVat135" />
															<form:hidden id="docIdType" path=""
																value="indentSalePurchaseOrder" />

															<input type="hidden" id="hiddenPoType"
																value="indentSalePurchaseOrder" /> <input type="text"
																id="txtPatientAddress" name="txtPatientAddress"
																class="form-control input-SmallText" readonly
																placeholder="Address" required />
																
															<input type="hidden" id="txtivfFlag"value="" /> 
														</div>
													</div>
													<div class="col-md-12-1 center"
														style="margin-top: 3px; margin-bottom: 4px;">
														<form:radiobutton path="indentSaleType" id="radioMRP"
															value='0' name="radioRateMRP" checked="true" />
														Sale On MRP
														<form:radiobutton path="indentSaleType" id="radioPurRate"
															value='1' name="radioRateMRP" />
														Sale On Cost Price

													</div>
												</div>
												<div class="col-md-4-1" style="margin-top: 9px;">

													<div class="col-md-12-1" style="margin-top: 0px; ">
														<div class="col-md-4-1 center" style="margin-top: 0px;">
															<b>Phone Number</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px; ">
															<form:input path="" type="text" id="txtMobileNumber"
																class="form-control input-SmallText" readonly="true"
																placeholder="Phone Number" required="true" />
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1 center" style="margin-top: 0px;">
															<b>Indent Generated Date</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="" id="indentGenerateDate"
																name="indentGenerateDate"
																placeholder="Indent Generated Date" required="true"
																class="form-control input-SmallText" readonly="true"
																onkeydown="closeCalendar();" />
															<div class='col-md-1-1 center'
																style='margin-top: -11px; margin-left: 203px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1 center" style="margin-top: 0px;">
															<b>Indent Received Date</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="indentSaleReceivedDate"
																id="popup_container2" name="popup_container2"
																onfocus="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)"
																placeholder="Date" required="true"
																value="<%=todays_date%>"
																class="form-control input-SmallText" readonly="true"
																onkeydown="closeCalendar();" />
															<div class='col-md-1-1 center'
																style='margin-top: -11px; margin-left: 203px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div>
													<div class="col-md-12-1 center"
														style="margin-top: 9px; margin-left: -38px;">
														<form:radiobutton path="indentBillMode" id="radioCash"
															value='0' name="radioCashCredit" 
															onclick='hideDetails(),hideCardDetails();' />
														Cash
														<form:radiobutton path="indentBillMode" id="radioCredit"
															value='1' name="radioCashCredit" checked="true"
															onclick='setAmtReceived(),hideDetails(),hideCardDetails();' />
														Credit
														<form:radiobutton path="indentBillMode" id="radioCheque"
															value='2' name="radioCashCredit"
															onclick='setAmtReceived(),showDetails(),hideCardDetails();' />
														Cheque
														 <form:radiobutton path="indentBillMode" id="radioCard"
                                                                    value='3' name="radioCashCredit" onclick="showcardDetails();" />
                                                        Card
													</div>
												</div>

												<div class="col-md-4" style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-2-1" style="margin-top: 0px;">
															<b>Vou No</b>
														</div>
														<div class="col-md-5-1"
															style="margin-top:1px; margin-left:9px;">
															<form:input path="indentSaleDocNo" type="text"
																id="txtBillNo" class="form-control input-SmallText"
																name="txtBillNo" placeholder="Bill No" required="true"
																readonly="true" />
															<div class='col-md-1-1 center'
																style='margin-top: -11px; margin-left:150px; color: red;'>
																<b> *</b>
															</div>
															<div class="col-md-3-1 center" style="margin-top:-33px;margin-left:165px;">
														<p id="demo"></p>
													</div>
															
														</div>
													</div>
													
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-2-1" style="margin-top: 0px;">
															<b>Dr. Name</b>
														</div>
														<div class="col-md-5-1"
															style="margin-top:1px; margin-left:9px;">
															<form:input path="indentSaleDocNo" type="text"
																id="txtDrName" class="form-control input-SmallText"
																name="txtDrName" placeholder="Dr Name" required="true"
																readonly="true" />
															<div class='col-md-1-1 center'
																style='margin-top: -11px; margin-left:150px; color: red;'>
																<b> *</b>
															</div>
															<div class="col-md-3-1 center" style="margin-top:-33px;margin-left:165px;">
														<p id="demo"></p>
													</div>
															
														</div>
													</div>
													
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-12-1" style="margin-top: 0px;">
															<div class="col-md-2-1" style="margin-top: 0px;">
																<b> Sponsor Name </b>
															</div>
															<div class="col-md-5-1"
																style="margin-top:1px; margin-left:9px;">
																<form:input path="" id="txtSponser"
																	class="form-control input-SmallText" requird="true"
																	type="text" placeholder="Sponsor Name"
																	name="txtSponser" readonly="true" />
																<form:hidden path="" id="hiddenSponserId" />

																<input id="txtDate" type="hidden" value="<%=todays_date%>" />
																	
																<!--  onblur="isAlphaWithDigitSpace('txtNaration',0,500)" -->
															</div>
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top:3px;"
														id="DivBank">
														<div class="col-md-12-1" style="margin-top: 0px;">
															<div class="col-md-2-1"
																style="margin-top: 0px; ">
																<b> Bank Name </b>
															</div>
															<div class="col-md-5-1"
																style="margin-top: 1px; margin-left:9px;">
																<form:input path="" id="txtBankName"
																	class="form-control input-SmallText" requird="true"
																	type="text" placeholder="Bank Name" name="txtBankName" />

																<!--  onblur="isAlphaWithDigitSpace('txtNaration',0,500)" -->
															</div>
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 3px;"
														id="DivChequeNum">
														<div class="col-md-12-1" style="margin-top: 0px;">
															<div class="col-md-2-1"
																style="margin-top: 0px; ">
																<b> Cheque No </b>
															</div>
															<div class="col-md-5-1"
																style="margin-top:1px; margin-left:9px;">
																<form:input path="" id="txtChequeNo"
																	class="form-control input-SmallText" requird="true"
																	type="text" placeholder="Cheque No" name="txtChequeNo" />
															</div>
														</div>
													</div>
													
													
													<div class="col-md-12-1" style="margin-top: 3px; display: none;"
														id="DivCardNum">
														<div class="col-md-12-1" style="margin-top: 0px;">
															<div class="col-md-2-1"
																style="margin-top: 0px; ">
																<b> Card No </b>
															</div>
															<div class="col-md-5-1"
																style="margin-top:1px; margin-left:9px;">
																<form:input path="" id="txtCardNo"
																	class="form-control input-SmallText" requird="true"
																	type="text" placeholder="Card No" name="txtCardNo" />
															</div>
														</div>
													</div>
													
													<div class="col-md-12-1" style="margin-top: 1px;"
														id="DivComment">
														<div class="col-md-12-1" style="margin-top: 0px;">
															<div class="col-md-2-1"
																style="margin-top: 0px; ">
																<b> Comment </b>
															</div>
															<div class="col-md-5-1"
																style="margin-top:1px; margin-left:9px;">
																<form:input path="" id="txtComment"
																	class="form-control input-SmallText" requird="true"
																	type="text" placeholder="Comment" name="txtComment" />
															</div>
														</div>
													</div>

												</div>
											</div>
										</div>
									</div>
								</div>

								<div id="OldDiv"
									style="width: 100%; margin-top: -1%; height: 200Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d;">
									<div class="col-md-12-1">
										<input type="button" value="-" class="btn btn-xs btn-success"
											style="margin: 7px; float: right" onclick="deleteRow();">
									</div>
									<table id="purchaseTable" cellpadding="0" cellspacing="0"
										border="1"
										class="table table-bordered table-striped table-condensed">
										<thead>
											<tr>
												<th class="col-md center">Sr.</th>
												<th class='col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Barcode</div></th>
												<th class='col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Product Name</div></th>
												<th class='col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Unit</div></th>

												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Pack</div></th>
														
														<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Prep</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Comp</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>GST %</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Batch No</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Expiry</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Shelf No</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>M.R.P</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Dis %</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Stock</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Quantity</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px; display: none;'><div
														class='TextFont'>Rate</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Amount</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Select | Rec.Amt.</div></th>
											</tr>
										</thead>
										<tbody id="HSTDiv"
											style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
											<%-- <tr>
												<td><label class='input-SmallText'>1</label></td>
												<td><input type='hidden' id='hiddenCurrentRow'
													value='1' /> <form:hidden id="hospitalSlaveId0"
														path="hospitalSaleBillSlaves[0].hospitalSlaveId" /> <form:hidden
														id="hiddenProductId1"
														path="hospitalSaleBillSlaves[0].productMaster.productId" />
													<form:input
														path="hospitalSaleBillSlaves[0].productMaster.productName"
														type="text" id="textProductName1" name="textProductName1"
														class='form-control input-SmallText' data-toggle="modal"
														data-target="#Hospital_Sales_Form" onclick="load(1,1)" /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].productMaster.productUnit"
														type="text" id="textUnit1" name="textUnit1"
														readonly='true' class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].productMaster.packingMaster.packType"
														type="text" id="textPack1" name="textPack1"
														readonly='true' class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].productMaster.companyMaster.compShortName"
														type="text" id="textComp1" name="textComp1"
														readonly='true' class='form-control input-SmallText' /></td>

												<td style="display: none;">
													<form:hidden path="debitNoteSlaves[0].productMaster.batchMaster[0].batchCode" id="" />
													<form:input
														path="hospitalSaleBillSlaves[0].productMaster.batchMaster[0].batchId"
														type="text" id="textBatchId1" name="textBatchId1"
														class='form-control input-SmallText' readonly="true" /> <form:input
														path="hospitalSaleBillSlaves[0].productMaster.batchMaster[0].stockMaster.stockId"
														type="text" id="textStockId1" name="textStockId1"
														class='form-control input-SmallText' readonly="true" /> <form:input
														path="hospitalSaleBillSlaves[0].productMaster.batchMaster[0].stockMaster.stockQtyInHand"
														type="text" id="textStockQtyInHand1"
														name="textStockQtyInHand1"
														class='form-control input-SmallText' readonly="true" /> <input
													type="text" id="textClStk1" value=""><input
													type="text" id="textTotalStk1" value=""> <input
													type="text" id="textPurchaseRate1" value="">
												</td>

												<td><form:input path="" type="text" id="txtVat"
														readonly='true' name="txtVat"
														class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].hospitalSlaveBatchCode"
														type="text" id="txtBatchNo" name="txtBatchNo"
														readonly='true' class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].hospitalSlaveBatchExpiry"
														type="text" id="txtExpiry" readonly='true'
														name="txtExpiry" class='form-control input-SmallText' /></td>

												<td><form:input path="" type="text" id="txtShelfNo"
														readonly='true' name="txtShelfNo"
														class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].hospitalSlaveMrp"
														type="text" id="textMRP1" readonly='true' name="textMRP1"
														class='form-control input-SmallText' /></td>

												<td><form:input path="" type="text" id="txtDisc"
														readonly='true' name="txtDisc"
														class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].hospitalSlaveQty"
														type="text" id="textQty1" name="textQty1" readonly='true'
														class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].hospitalSlaveRate"
														type="text" id="textRate1" name="textRate1"
														readonly='true' class='form-control input-SmallText' /></td>

												<td><form:input path="" type="text" id="textAmount1"
														readonly='true' name="textAmount1"
														class='form-control input-SmallText' /></td>
											</tr> --%>

										</tbody>
									</table>
								</div>

								<%@include file="pharma_sale_purchase_order.jsp"%>

								<div class="divide-20"></div>
								<div class="col-md-12-1 panel panel-default"
									style="margin-top: -11px;">
									<div class="col-md-12-1" style="margin-top: 23px;margin-bottom: -27px;">
										<div class="form-group  col-md-10-1"
											style="margin-right: 0%; margin-left: 0%;">
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-1-1" style="margin-top: 9px;">
													<b>Narration</b>
												</div>
												<div class="col-md-7-1"
													style="margin-top: 5px; margin-right: 0%;">
													<form:input path="indentSaleNarration" type="text"
														id="txtNaration" name="txtNaration"
														class="form-control input-SmallText"
														placeholder="Naration" value='0' />
													<!--  onblur="isAlphaWithDigitSpace('txtNaration',0,500)" -->
												</div>

											</div>
										</div>

										<div class="form-group  col-md-2-1"
											style="margin-right: 1%; margin-left: 1%;">
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<b>C.N.</b>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="indentSaleCN"
														class="form-control input-SmallText" type="text"
														id="txtCN" name="txtCN" placeholder="C.N." value='0'
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
														path="indentSaleCD" type="text" id="txtCD" name="txtCD"
														placeholder="C.D.%" value='0'
														onblur="isFloatingPoint('txtCD'),calculatecdAmt(),CheckDis();" />
												</div>
												
												
												
											</div>
											
												<div class="col-md-12-1"
											style="margin-top: 9px; margin-bottom: 9px;">
											
											<div class="col-md-12-1" style="margin-top: 0px;">
												
																<form:radiobutton path="" id="radioCD"
																	value='0' name="radioDisc" checked="true" onclick="setFocusForDiscount();"/>
														Apply CD
														<form:radiobutton path="" id="radioSpeDisc"
																	value='1' name="radioDisc" onclick="setFocusForDiscount();"/>
														Apply sp. Disc
														
											</div>
										</div>

										</div>

										<div class="form-group  col-md-2-1"
											style="margin-right: 1%; margin-left: 1%;">
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<b>Special Disc</b>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="indentSaleSpecialDisc" type="text"
														id="txtSpecialDisc" class="form-control input-SmallText"
														name="txtSpecialDisc" placeholder="Special Disc"
														onchange="calculateDiscount();" readonly="true" value='0'
														onblur="isFloatingPoint('txtSpecialDisc'),validateSpeDiscount(),calculatePending();" />
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
													<form:input path="indentSaleCnAmt" type="text"
														id="txtCNAmt" class="form-control input-SmallText"
														name="txtCNAmt" placeholder="C.N.Amt" value='0'
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
													<form:input path="indentSaleCdAmt" type="text"
														readonly="true" id="txtCDAmt" value='0'
														class="form-control input-SmallText" name="txtCDAmt"
														placeholder="C.D.Amt" />
												</div>

											</div>

										</div>
										<div class="form-group  col-md-2-1"
											style="margin-right: 2%; margin-left: 2%;">
											<div class="panel panel-default">
												<div class="panel-body">
													<div class="form-group  col-md-12-1"
														style="margin-right: 2%; margin-left: 2%;">
														<div class="col-md-5-1"
															style="margin-top: 0px; padding-left: 0px;">
															<b>Surcharge</b>
														</div>
														<div class="col-md-7-1"
															style="margin-top: -15px; margin-left: 42%;">
															<form:input path="indentSaleSurcharges" type="text"
																id="txtSurcharge" name="txtSurcharge"
																class="form-control input-SmallText"
																placeholder="Surcharge" value='0'
																onblur="isFloatingPoint('txtSurcharge'),calculateSurchargeHos();"
																readonly="true" />
														</div>
													</div>
													<div class="form-group  col-md-12-1"
														style="margin-right: 2%; margin-left: 2%;">
														<div class="col-md-5-1"
															style="margin-top: 10px; padding-left: 0px;">
															<b>Total P.Rate</b>
														</div>
														<div class="col-md-7-1"
															style="margin-top: -15px; margin-left: 42%;">
															<form:input path="" type="text" id="txtTotalPurchase"
																name="txtTotalPurchase"
																class="form-control input-SmallText"
																placeholder="Total Purchase" readonly="true" />
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="form-group  col-md-2-1"
											style="margin-right: 2%; margin-left: 2%; margin-top: -5%;">

											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-bottom: 2%;">

												<label class="TextFont"></label>

											</div>
											<div class="form-group  col-md-7-1"
												style="margin-right: 2%; margin-left: 2%;">

												<label class="TextFont"><b>Amount Received</b></label>


												<form:input path="indentSaleAmountReceive" type="text"
													id="txtAmtRec" class="form-control input-SmallText"
													name="txtAmtRec" placeholder="Amount Received"
													onblur="isFloatingPoint('txtAmtRec');calculatePending()" />

											</div>

											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">

												<label class="TextFont"><b>Amount Balance</b></label>

												<form:input path="indentSaleAmountBalance" type="text"
													id="txtAmtBal" class="form-control input-SmallText"
													name="txtAmtBal" placeholder="Amount Balance"
													readonly="true" />


												<form:hidden path="indentSalePreviousBalance"
													id='indentSalePreviousBalance' />

											</div>

											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%; background: yellow">

												<label class="TextFont"><b>Previous Balance</b></label> <span
													id='mainPendingBalance'></span>

											</div>
											<div class="form-group  col-md-12-1" id="showPatientDetail"
												style="margin-right: 2%; margin-top: -5%; margin-left: 0%; background: lightblue;">
												<div class="TextFont" style="float: left; color: red;"
													id="patientBal">
													<label for="product" class="TextFont"><span
														id="js-rotating"></span></label>
												</div>
											</div>
										</div>

										<div class="form-group  col-md-2-1"
											style="margin-right: 2%; margin-left: 2%; float: right; margin-top: -4%;">
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<label class="TextFont"><b>Gross Amt</b></label>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="indentSaleGrossAmt" type="text" value='0'
														id="txtGrossAmt" class="form-control input-SmallText"
														name="txtGrossAmt" placeholder="Gross Amt" readonly="true" />
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
													<form:input path="indentSaleLess" type="text" id="txtLess"
														name="txtLess" value='0' readonly="true"
														class="form-control input-SmallText" placeholder="Less"
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
													<form:input path="indentSaleAdd" type="text" id="txtAdd"
														name="txtAdd" class="form-control input-SmallText"
														value='0' readonly="true" placeholder="Add"
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
													<form:input path="indentSaleRound" type="text" value='0'
														id="txtRount" class="form-control input-SmallText"
														name="txtRount" placeholder="Round"
														onblur="isFloatingPoint('txtRount'),setRoundForIndent()" />
												</div>

											</div>
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-top: -5%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<label class="TextFont"><b>Net Amt.</b></label>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="indentSaleNetAmt" type="text"
														readonly="true" id="txtNetAmt" value='0'
														class="form-control input-SmallText" name="txtNetAmt"
														placeholder="Net Amt." />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div id="batchScroll" class="col-md-12-1"
									style="margin-top: 2px;">
									<!-- <div class="col-md-6-1" style="margin-top: 9px;">
										<div class="col-md-2-1" style="margin-top: 9px;">
											<b></b>
										</div>
										<div class="col-md-3-1"
											style="margin-top: 9px; margin-left: 8%;">
											<marquee id='expiryBatches'>Expiring Batches</marquee>
										</div>
									</div> -->
									<div class="col-md-6-1" id="marquee"
										style="margin-top:-14px; margin-bottom: 30px; width: 88%; hight: 40%; background: sandybrown;">
										<!-- <marquee id='expiryBatchesDetails' >Expiring Batches</marquee> -->
									</div>
									<div class="col-md-4-1"
										style="margin-top: 9px; margin-left: 67%;">
										<div class="li pull-right" style="margin-top: -60px;">
											<a class="btn btn-warning" onclick="viewAllExpiryProduct()">View
												All Expiry Product</a>
										</div>
									</div>

								</div>
							</div>
						</div>
					</form:form>
				</div>
				<input type='hidden' value='1' id='RowCount' /> <input
					type="hidden" id="pharmaFetchStockOptionForIndentSale"
					value="<%=(String) session
					.getAttribute("fetchStockOptionForIndentSale")%>">
				<%@include file="Pharma_Footer.jsp"%>
			</div>
			<div id="Indent_Sales_Data_Form" class="modal fade in"
				style="height: 500px;">
				<div class="modal-dialog" style="width: 750px;">
					<form action="">
						<div class="modal-content">
							<div class="modal-header  col-md-12">
								<div class="box-title  col-md-8 center">
									<h4 id="testHead" style="margin-top: -36px;">Comment:</h4>
								</div>
							</div>
							<div class="modal-body col-md-12">
								<div class="col-md-12-1" id="ipdData"></div>
							</div>
							<div class="modal-footer"></div>
						</div>
					</form>
				</div>
			</div>
			<!-- <input type='hidden' id='hiddenCurrentRow' value=1 /> -->
			<!-- <div class="col-md-12-1"  style="display: none;">
			<table>
			<tbody id="ipdData2">
			
			</tbody>
			</table>
			</div> -->
	</section>
</body>
</html>
