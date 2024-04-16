<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<title>Receipt Voucher</title>

<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">

<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />

<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>

<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>

<!-- for Developers  -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/ipdTreatment.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/bill.js"></script>
<script type="text/javascript" src="js/report.js"></script>
<script type="text/javascript" src="js/district_taluka_city.js"></script>

<!-- /for Developers  -->

<!-- Auto-Suggestion 6/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("receiptVoucherDatabase"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		})

	});
</script>

<script type="text/javascript">
	onload = function() {
		clearFields();
		$("#txtCharges").val(0);
		$("#txtpayMode").val("");
		$("#txtRemark").val("");
		$("#txtAmount").val(0);
		//$("#byType").val("");
		$("#queryType").val("insert");
		$("#expenceVoucher").addClass("anchorActive");
		
		//auto-suggestion for company name
		//setAutoSuggestExpenceVoucher("byType", "onload", "expenceVoucherCompanyName");
		viewReceiptVoucher("onload");
		//getReceiptVoucher();
		//getMaxExpenseID();
		fetchHospitalDetailsPrint();
		fetchVoucherList("Group");
		getAllPayments();
		
	};
	function enterChequeNo() {
		var str = $('#selAmountType :selected').text();

		if (str == '-Select-') {
			$("#chequeNo").hide();
		} else if (str == 'Cheque') {
			$("#chequeNo").show();
		} else{
			$("#chequeNo").hide();
		}
	};
	function selectVoucherGrp(str1){
		//var str1 = $('#selectVoucherGrp :selected').val();
			setLedgerHead(str1);
	};
</script>

</head>

<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>

<body style="background: white ! important;">
	<section id="page">

		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${sessionScope.userType != null }">

			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->

				<%@include file="left_menu_admin.jsp"%>

				<!-- <div id="top18">
				<div style="width: 100%;">
					<div style="width: 60%;">
						<img src="images/logo.jpg" />

					</div>
					<div
						style="width: 20%; float: right; padding-left: 20%; padding-top: 2%;">
						<div
							style="width: 92%; float: right; padding-top: 3%; padding-right: 8%">
							<div style="padding-right: 2%; width: 30%;">
								<input
									style="font-size: 11px; background-color: #FC0; border: none; width: 100%; height: 27px; cursor: pointer;"
									type="button" value="Save Now" onclick="saveExpenseVoucher()" />
							</div>
							<div style="padding-right: 2%; width: 30%;">
								<input
									style="font-size: 11px; background-color: #FC0; border: none; width: 100%; height: 27px; cursor: pointer;"
									type="button" value="PRINT" onclick="printExpenseVoucher()" />
							</div>
						</div>
					</div>
				</div>
			</div> -->


				<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12">
								<!-- PAGE HEADER-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="UserManagement.jsp">Administrator</a></li>
												<li>Receipt Voucher</li>
												<div class="li pull-right">
													<button class="btn btn-xs btn-success editUserAccess"
													data-toggle="tooltip" data-placement="left" title="Save Receipt Voucher"
														onclick="saveReceiptVoucher()" disabled="disabled">
														<i class="fa fa-save"></i>
														</button>
													<button class="btn btn-xs btn-warning"
													data-toggle="tooltip" data-placement="left" title="Print"
														onclick="printReceiptVoucher()">
														<i class="fa fa-print"></i>
														</button>
												</div>
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->

								<div class="panel panel-default">
									<div class="panel-body">
										<div
											style="width: 92%; height: 90%; float: right; padding-right: 8%; padding-top: 3%;">

											<div style="width: 96.80%; border: 1px solid #436a9d;"
												id="billreceipt">
												<div
													style="width: 99.80%; height: 660px; border: 1px solid;">
													<div style="width: 99%;" align="right">
														Tel:<label id="contact"></label>
													</div>
													<div style="width: 97%;" align="center" id="skhead">
														<div style="width: 20%; float: left;">
															<img src="" width="150" id="hospitalLogo" height="60"
																alt="" />
														</div>
														<div style="width: 100%; float: left;">
															<h4 id="hospName"></h4>
															<label id="hospAdd"></label>
														</div>

													</div>
													<div class="separator col-md-12-1"
														style="margin-top: 1px; margin-bottom: 5px;"></div>
													<div style="width: 100%; height: 9%; text-align: center;">
														<h4 style="margin-right: 192px;">Receipt Voucher</h4>
													</div>
													<div style="width: 97%;" align="right">
														<div
															style="width: 25%; padding-top: 10px; margin-left: 20px; margin-top: 10px;"
															align="left">

															<label style="width: 50%;">Voucher No.:</label> <label
																id="recNo" style="padding-right: 50px; width: 40%;"></label>
															<label style="width: 50%;">Date:</label> <label
																id="bdate" style="padding-left: 0px; width: 40%;"
																value="<%=todays_date%>"><%=todays_date%></label>

														</div>
													</div>
													<div style="width: 97%;">
														<div
															style="width: 90%; padding-left: 80px; padding-bottom: 10px; padding-top: 10px;"
															align="left">
															<label style="width: 20%;">Company Name: </label> <label
																id="patientname"
																style="font-size: 14px; font-family: monospace; width: 50%; padding-left: 10px"><input
																type="text" onkeyup=""
																style="width: 100%; height: 28px;" id="companyName"
																onkeypress="return " /></label>
														</div>
													</div>

													<div style="width: 97%;">
														<div
															style="width: 90%; padding-left: 80px; padding-bottom: 10px;"
															align="left">
															<label style="width: 20%;">Received From: <b style="color: red; padding-left: 3px;">*</b></label> <label
																id="patientname"
																style="font-size: 14px; font-family: monospace; width: 50%; padding-left: 10px"><input
																type="text" onkeyup=""
																style="width: 100%; height: 28px;" id="receivedFrom"
																onkeypress="return" /></label>

														</div>
													</div>

													<div style="width: 97%; height: 43px">
														<div class="col-md-6-1"
															style="padding-left: 80px; padding-bottom: 10px; padding-top: 15px;">
															<div style="padding-left: 0px; margin-top: 0px;"
																class="col-md-4-1">
																<strong>Group Name: <b style="color: red; padding-left: 3px;">*</b></strong>
															</div>
															<div align="right"
																style="padding-top: 1px; padding-left: 35px;"
																class="col-md-8-1">
																<select onchange="selectVoucherGrp(this.value)" style="width: 100%"
																	name="select" id="selectVoucherGrp">
																</select>
															</div>
														</div>
														<div class="col-md-6-1" id="ledHedNo"
															style="padding-left: 35px; padding-bottom: 10px; padding-top: 15px;">
															<div style="padding-left: 0px; margin-top: 0px;"
																class="col-md-4-1">
																<strong>Ledger Head:</strong>
															</div>
															<div align="right"
																style="padding-top: 1px; padding-left: 0px; padding-right: 100px"
																class="col-md-8-1">
																<select style="width: 100%"
																	name="select" id="selectLedgerHead">
																</select>
															</div>
														</div>
													</div>
													<div
														style="padding-left: 80px; padding-bottom: 10px; padding-top: 15px;"
														class="col-md-6-1">
														<div class="col-md-4-1"
															style="padding-left: 0px; margin-top: 0px;">
															<strong>Ref To:</strong>
														</div>
														<div align="left" class="col-md-8-1"
															style="padding-top: 1px; padding-left: 31px;">
															<select id="selRefTo" name="select" style="width: 95%">
																<!-- <option value="select">-Select-</option>
																<option value="IPD">IPD</option>
																<option value="OPD">OPD</option>
																<option value="Diagnostics">Diagnostics</option>
																<option value="Other">Other</option> -->
																<option value="0">--Select--</option>
																<option value="1">OPD</option>
																<option value="2">IPD</option>
																<option value="3">Diagnostic</option>
																
															</select>

														</div>
													</div>	
												<div class="col-md-12-1">
														<div class="col-md-6-1"
															style="padding-left: 80px; padding-bottom: 10px; padding-top: 15px;margin-top: 5px;">
															<div style="padding-left: 0px; margin-top: 0px;"
																class="col-md-4-1">
																<strong>Total Amount:<b style="color: red; padding-left: 3px;">*</b></strong>
															</div>
															<div align=""
																style="padding-top: 1px; padding-left: 30px; padding-right: 0px"
																class="col-md-8-1">
																<label
																	style="padding-top: 0px; font-size: 14px; font-family: monospace;"
																	id="amountinno"> <input type="text"
																	style="width: 111%; height: 28px;"
																	onkeypress="return validateNumbers(event)"
																	id="txtAmount" onkeyup="test_skill_voucher()">
																</label>
															</div>
														</div>
												</div>
												<div class="col-md-12-1">
												<div class="col-md-6-1"
															style="width: 90%; padding-left: 80px; padding-bottom: 10px; padding-top: 15px;"
															align="left">
															<label style="width: 19%;">Amount Paid:<b style="color: red; padding-left: 3px;">*</b> </label> <label
																id="patientname"
																style="font-size: 18px; font-family: monospace; width: 50%; padding-left: 10px"><input
																type="text" maxlength="15"
																style="width: 100%; height: 28px;" id="amountPaid"
																
																onkeyup="ConvertAmountInWords('ExpVoucher')" /></label>

												</div>	
												</div>
												<div class="col-md-12-1">
													<div class="col-md-6-1"
															style="width: 90%; padding-left: 80px; padding-bottom: 10px; padding-top: 15px;"
															align="left">
															<label style="width: 19%;">Amount In Words: </label> <label
																id="patientname"
																style="font-size: 14px; font-family: monospace; width: 78%; padding-left: 10px"><input
																type="text" onkeyup=""
																style="width: 100%; height: 28px;" id="amountInWords"
																readonly="readonly" /></label>
														</div>
												</div>
												<div style="width: 97%; height: 43px">
														<div class="col-md-6-1"
															style="padding-left: 80px; padding-bottom: 10px; padding-top: 15px;">
															<div style="padding-left: 0px; margin-top: 0px;"
																class="col-md-4-1">
																<strong>Payment Mode:<b style="color: red; padding-left: 3px;">*</b></strong>
															</div>
															<div align="right"
																style="padding-top: 1px; padding-left: 35px;"
																class="col-md-8-1">
																<select onchange="enterChequeNo()" style="width: 100%"
																	name="select" id="selAmountType">
																	<option value="select">-Select-</option>
																	<option value="Cash">Cash</option>
																	<option value="Cheque">Cheque</option>
																</select>
															</div>
														</div>
														<div class="col-md-6-1" id="chequeNo"
															style="padding-left: 35px; padding-bottom: 10px; padding-top: 15px; display: none;">
															<div style="padding-left: 0px; margin-top: 0px;"
																class="col-md-4-1">
																<strong>Cheque Number:</strong>
															</div>
															<div align="right"
																style="padding-top: 1px; padding-left: 0px; padding-right: 100px"
																class="col-md-8-1">
																<label
																	style="padding-top: 10px; font-size: 14px; font-family: monospace;"
																	id="amountinno">
																	<div id="divAmount"></div> <input type="text"
																	style="width: 100%; height: 25px;" maxlength="6"
																	onkeypress="return validateNumberByRegEx('chequeNumber')"
																	id="chequeNumber" onkeyup="test_skill_voucher()">
																</label>
															</div>
														</div>
													</div>
													
													<div class="divide-10"></div>
													<div class="col-md-12-1"
														style="padding-left: 80px; padding-bottom: 10px; padding-top: 15px;">
														<div class="col-md-12-1">
															<div style="padding-left: 0px; margin-top: 0px;"
																class="col-md-1-1">
																<strong>Remark:</strong>
															</div>
															<div align="right"
																style="padding-top: 15px; padding-left: 85px; padding-right: 0px"
																class="col-md-10-1">
																<input type="text" class="col-md-12-1" id="txtRemark"
																	onkeyup="test_skill_voucher()">
															</div>
														</div>
													</div>
													<div style="width: 100%; float: left; margin-top: 30px;">
														<div style="width: 100%; float: left;">
															<div style="width: 92%; padding-right: 30px"
																align="right">Payee's
																Sign&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Received
																By</div>
															<div style="width: 76%; padding-right: 30px"
																align="right">(On behalf of Hospital)</div>
														</div>
														<div style="width: 100%; float: left;"></div>
													</div>

													
												</div>
											</div>
											<div style="margin-top: 25px;" class="col-md-12-1">
														<div class="col-md-2-1"
															style="font-weight: bold; padding-left: 65px">Search
															By:</div>
														<div class="col-md-1-1" style="padding-left: 10px">Company
															Name</div>
														<div class="col-md-3-1 TextFont"
															style="padding-left: 20px">
															<input type="text" id="byType" name="byType"
															class="typeahead form-control input-SmallText" onkeyup="autoSuggRcptVchrCmnyNm(this.id,'auto')">
														</div>

														<div style="text-align: center;" class="col-md-1-1">
															<input type="button"
																onclick="autoSuggRcptVchrCmnyNm(this.id,'search')"
																class="btn btn-xs btn-primary" value="search">
														</div>
														
														<div class="col-md-5-1 TextFont" >
														<button class="btn btn-warning btn-xs deleteUserAccess" type="button" style="float: right;"
															value="Delete" onclick="deleteReceiptVoucher()" disabled="disabled">Delete</button>
													</div>

													</div>

													<div class="col-md-12-1"
														style="margin-top: 20px; padding-left: 0%; padding-right: 0%; width: 100%;">
														<div class="container-main col-md-12-1" style="">
															<table class="table table-bordered table condensed cf"
																style="Width: 100%; margin-top: 5px;">

																<thead class="cf" style="background: white;">
																	<tr>
																		<th style="height: 21.5px;" class="center"><div>#</div></th>
																		<th style="height: 21.5px;" class="col-md-1 center"><div>Date</div></th>
																		<th style="height: 21.5px;" class="col-md-2 center"><div>Company
																				Name</div></th>
																		<th style="height: 21.5px;" class="col-md-1 center"><div>Mode</div></th>
																		<th style="height: 21.5px;" class="col-md-1 center"><div>Group</div></th>
																		<th style="height: 21.5px;" class="col-md-2 center"><div>Ledger Head</div></th>
																		<th class="col-md-1 center" style="height: 21.5px;"><div>Ref
																				To</div></th>
																		<th style="height: 21.5px;" class="col-md-2 center"><div>Payment
																				To</div></th>
																		<th style="height: 21.5px;" class="col-md-1 center"><div
																				class="lbl lbl-success lbl-xs">Amount</div></th>
																		<th style="height: 21.5px;" class="col-md-2 center"><div>Paid
																				Amount</div></th>
																		<th style="height: 21.5px;" class="col-md-1 center"><div>Edit</div></th>
																		<!-- <th style="height: 21.5px;" class="col-md-1 center"><div>Cancel</div></th> -->
																		<th style="height: 21.5px;" class="col-md-1 center"><div>Delete</div></th>
																	</tr>
																</thead>

															</table>
														</div>

														<div class="col-md-12-1"
															style="margin-top: -13px; width: 100%;">
															<div class="container-main col-md-12-1"
																style="overflow-y: scroll; height: 200px; maxheight: auto; border: 1px solid #b8b8b8;">

																<table class="table table-striped condensed cf"
																	style="Width: 100%;">

																	<tbody id="container">
																	</tbody>
																</table>
															</div>
														</div>
														<!-- 	<div
											style="width: 99.80%; height: 36%; overflow-y: scroll; border: 1px solid #436a9d;"
											id="container"></div> -->

													</div>
										</div>
									</div>
								</div>
							</div>

							<%@include file="Footer.jsp"%>
							<input type="hidden" id="queryType" name="queryType" value="insert" /> 
							<input type="hidden" id="receiptVoucherId" name="receiptVoucherId" value=0 />
							<div style="display: none;" id="DivResponse"></div>
							<div style="display: none;" id="DivIDResponse"></div>
							<div id="hospDetails" style="display: none;"></div>
							<input type="hidden" id="page_name" value=""></input>
							<input type="hidden" id="ledgerHeadType" value="LedgerHeadGroup"></input>
							<input type="hidden" id="RowCount" name="RowCount" value="0" />
							<input type="hidden" id="vouName" value="0" />
							<input id="addRowCount" name="addRowCount" type="hidden" value="0" />
						</div>

					</div>
				</div>
		</c:if>
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
	</section>
</body>
</html>
