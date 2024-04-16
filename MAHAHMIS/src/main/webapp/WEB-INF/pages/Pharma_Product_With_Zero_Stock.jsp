<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
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

<script src="<c:url value="/pharmacy/resources/alertify.js"/>"></script>
<!-- /for Developers  -->

<!-- Application js -->
<script
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_product_with_zero_stock.js"/>"></script>
<!-- CUSTOM SCRIPT -->
<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/shortcut.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_shortcut.js"/>"></script>
</head>

<script>
	jQuery(document).ready(function() {
		//App.setPage("widgets_box");  //Set current page
		App.init(); //Initialise plugins and elements
	});

	jQuery(document).ajaxStart(function() {
		//alert("hi ajax start");
		$("body").addClass("loading");
	});

	jQuery(document).ajaxStop(function() {
		$("body").removeClass("loading");
		//alert("hi ajax stop");
	});
	
	onload = function() {
		var inputs = [];
		getNextAutoIncrement();
		//if update request 
		if ($('#txtOrderNo').val() == "") {
			//doc id 1 = purchase order
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
					$('#txtOrderNo').val(r);
				}
			});
		}
		$('#txtPartyName').focus();
		fetchProductBelowMinLevel();
		/* return setValuesToAutocomplete(null); */
	};
	
	function fetchProductBelowMinLevel() {
		jQuery
				.ajax({
					async : true,
					type : "GET",
					url : "/EhatEnterprise/pharmacy/productWithZeroStk/getProductZeroStockList",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						setMilLevelTableContent(r);
					}
				});

	};
</script>


<script type="text/javascript">
	$("#parentOfTextbox").on('keydown', '#textbox', function(e) {
		var keyCode = e.keyCode || e.which;

		if (keyCode == 9) {
			e.preventDefault();
			// call custom function here
			alert("OK");
		}
	});
</script>
<%
	java.util.Calendar currentDate = java.util.Calendar
					.getInstance();
			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
					"dd/MM/yyyy");
			String todays_date = formatter.format(currentDate.getTime());
%>
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
	z-index: 1000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('/EhatEnterprise/pharmacy/resources/images/ajax_loader_blue_64.gif')
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
<body style="background: white ! important;">
	<section id="page">
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">
			<%@include file="Pharma_Menu_Header.jsp"%>
			<%@include file="pharma_product_with_zero_level_pop_up.jsp"%>
			<%@include file="HelpMenu.jsp"%>
		</header>

		<%@include file="Pharma_left_menu_transaction.jsp"%>
		<div id="main-content">
			<div class="container">
				<div class="row">
					<div id="content" class="col-lg-12">
						<div class="row">
							<div class="col-sm-12">
								<div class="page-header">

									<ul class="breadcrumb col-md-12-1"
										style="padding: 4px 10px; margin-top: 1px;">
										<li>Date : <%=todays_date%></li>
										<li><i class="fa fa-home"></i> <a
											href="/EhatEnterprise/Dashboard.jsp">Home</a></li>
										<li><a
											href="/EhatEnterprise/pharmacy/pharmacy/transaction">Pharmacy</a></li>
										<li>Purchase Product With Zero Stock</li>
										<div class="li pull-right" style="margin-left: 9px;">
											<a class="btn btn-xs btn-info"
												href="/EhatEnterprise/pharmacy/productWithZeroStk/view">Back
												to List</a>
											<button class="btn btn-xs btn-success" type="button"
												id="saveBtn" onclick="saveProductWithZeroLevel();">Save
												and Print(Ctrl+S)</button>
											<!-- <button class="btn btn-xs btn-warning">Print</button>
									<button class="btn btn-xs btn-danger">Discard</button> -->
										</div>
										<!-- <li class="pull-right">
											<button class="btn btn-xs btn-success" type='button'
												value='Save Now'>Excel</button>
											<button class="btn btn-xs btn-warning">Print</button>
											<button class="btn btn-xs btn-danger">Exit</button>
										</li> -->
									</ul>

								</div>
							</div>
						</div>
						<div class="col-md-12-1" style="margin-top: -2%">
							<b>Purchase Product With Zero Stock</b>
						</div>
						<form:form commandName="po" id="ProductWithZeroStockForm"
							action="/EhatEnterprise/pharmacy/productWithZeroStk/save"
							method="post">

							<div class="panel-body">
								<div id="purchaseOrder" class="col-md-4-1 center"
									style="height: 100%; width: 102%;margin-left:-12px ;  border: 1px solid #b8b8b8;">

									<div class="col-md-5-1" style="margin-top: 9px;">
										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b> PO No </b>
											</div>
											<div class="col-md-5-1" style="margin-top: 0px;">
												<form:input path="" type="text" id="txtOrderNo1"
													readonly="true" name="txtOrderNo1"
													class="form-control input-SmallText" placeholder="Order No"
													required="true" />
												<div class='col-md-1-1 center'
													style='margin-top: -11px; margin-left: 183px; color: red;'>
													<b> *</b>
												</div>
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b> Vou No </b>
											</div>
											<div class="col-md-5-1" style="margin-top: 0px;">
												<form:input path="podocId" type="text" id="txtOrderNo"
													readonly="true" name="txtOrderNo"
													class="form-control input-SmallText" placeholder="Vou No"
													required="true" />
												<div class='col-md-1-1 center'
													style='margin-top: -11px; margin-left: 183px; color: red;'>
													<b> *</b>
												</div>
											</div>
										</div>
										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b> Vendor Name</b>
											</div>
											<div class="col-md-5-1" style="margin-top: 0px;">
												<form:hidden path="poId" id="hiddenPOId" />

												<form:hidden path="vendorMaster.vendorId"
													id="hiddenVendorId" value='0' />
												<form:input type="text" id='txtPartyName'
													name='txtPartyName' placeholder="Vendor Name"
													path="vendorMaster.vendorName"
													class="ui-autocomplete-input form-control input-SmallText"
													onblur="splitVendorContentPo($('#txtPartyName').val())" />

												<div class='col-md-1-1 center'
													style='margin-top: -11px; margin-left: 183px; color: red;'>
													<b> *</b>
												</div>

												<!-- ,isAlphaWithSpace('txtPartyName',0,200); -->
												<script type="text/javascript">
													$("#txtPartyName")
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
																							alert('error');
																						},
																						success : function(
																								r) {
																							var availableTags = [];
																							for ( var i = 0; i < r.length; i++) {
																								availableTags[i] = r[i].vendorName
																										+ "-"
																										+ r[i].vendorId;
																							}
																							response(availableTags);
																						}
																					});
																		}
																	});
												</script>
											</div>

										</div>
									</div>

									<div class="col-md-6-1 " style="margin-top: 9px;">
										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b> Order Date</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input path="poDate" type="text" id="txtOrdeDate"
													name="txtOrdeDate" class="form-control input-SmallText"
													readonly="true" placeholder="Order Date" required="true"
													value="<%=todays_date%>"
													onfocus="displayCalendar(document.getElementById('txtOrdeDate'),'dd/mm/yyyy',this)"
													onfucsout="closeCalendar();" />
												<div class='col-md-1-1 center'
													style='margin-top: -11px; margin-left: 304px; color: red;'>
													<b> *</b>
												</div>
											</div>

										</div>

									</div>
								</div>

							</div>

							<div id="HSTDiv1"
								style="width: 100%; height: 200Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d;">
								<table id="ItemInfoTable" cellpadding="0" cellspacing="0"
									border="1"
									class="table table-bordered table-striped table-condensed">
									<thead>
										<tr>
											<th class="col-md-1-1 center" style="width: 1%;">Sr.</th>
											<th class='col-md-1-1 center' style='height: 21.5px;'><div
													class='TextFont'>Product</div></th>
											<th class=' col-md-1-1 center' style='height: 21.5px;'><div
													class='TextFont'>Unit</div></th>
											<th class='col-md-1-1 center' style='height: 21.5px;'><div
													class='TextFont'>Pack</div></th>
											<th class='col-md-1-1 center' style='height: 21.5px;'><div
													class='TextFont'>MRP</div></th>
											<th class=' col-md-1-1 center' style='height: 21.5px;'><div
													class='TextFont'>Qty</div></th>
											<th class=' col-md-1-1 center' style='height: 21.5px;'><div
													class='TextFont'>Stock</div></th>
											<th class='col-md-1-1 center' style='height: 21.5px;'><div
													class='TextFont'>Vat</div></th>
											<th class=' col-md-1-1 center' style='height: 21.5px;'><div
													class='TextFont'>Pur.Rate</div></th>
											<th class=' col-md-1-1 center' style='height: 21.5px;'><div
													class='TextFont'>Amount</div></th>
											<th class=' col-md-1-1 center' style='height: 21.5px;'><div
													class='TextFont'>Min.Level</div></th>
											<th class=' col-md-1-1 center' style='height: 21.5px;'><div
													class='TextFont'>Max.Level</div></th>
											<th class=' col-md-1-1 center' style='width: 1%;'><div
													class='TextFont'>Select</div></th>
										</tr>
										<input type='hidden' id='hiddenCurrentRow'
															value='1' />
										
									</thead>
									<tbody id="HSTDiv"
										style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
										<tr>
											<td><label class='input-SmallText'>1</label></td>
											<td><input type='text'
												class='form-control input-SmallText'></td>

											<td><input type='text'
												class='form-control input-SmallText'></td>
											<td><input type='text'
												class='form-control input-SmallText'></td>
											<td><input type='text'
												class='form-control input-SmallText'></td>

											<td><input type='text'
												onblur="toCreateProductBelowMinLevel(1,1)"
												class='form-control input-SmallText'></td>
									</tbody>
								</table>
							</div>

							<div id="last" class="panel-body" style="margin-top: 8px;">
								<div class="panel-body col-md-11-1"
									style="height: 100%; width: 103%;margin-left:-16px ; padding-left: -10px; border: 1px solid #b8b8b8;">

									<div class="col-md-6-1 "
										style="margin-top: 17px; margin-left: 9px; width: 50%">
										<div class="col-md-12-1 " style="margin-top: 9px;">
											<div class="col-md-1-1 ">
												<b>Remark</b>
											</div>
											<div class="col-md-5-1 "
												style="margin-top: -10px; margin-left: 47px;">
												<form:textarea path="poRemark" name="textSuppliedBy"
													placeholder="Remark" class="col-md-7-1"></form:textarea>
											</div>
										</div>
										<div id="" class="col-md-12-1 " style="margin-top: 43px;">
											<div class="col-md-2-1 ">
												<b>Total Vat</b>
											</div>
											<div class="col-md-4-1 " style="margin-left: 1px;">
												<form:input type="text" id='textVatTotal'
													name='textVatTotal' placeholder="Total Vat"
													path="poTotalVat" value='0'
													class="ui-autocomplete-input form-control input-SmallText" />
											</div>
										</div>

									</div>
									<div class="col-md-6-1 panel panel-default"
										style="margin-top: -4px; width: 34%; margin-bottom: 5px;">
										<div class="col-md-12-1 panel panel-default"
											style="margin-top: 9px; margin-left: 2%; border-radius: 3%; height: 59Px; width: 78%; background-color: #d7dbdd; border-color: powderblue">
											<div class="col-md-2-1 " style="margin-top: 9px;">
												<b>Total</b>
											</div>
											<div class="col-md-3-1 " style="margin-top: 13px;">
												<form:input path="poTotalAmt" type="text" id="txtTotal"
													class="col-md-12-1" readonly="true" value="0"
													placeholder="Total" />
											</div>

											<div class="col-md-1-1 "
												style="margin-top: 9px; margin-left: 29px">
												<b>Count</b>
											</div>
											<div class="col-md-3-1 "
												style="margin-top: 13px; margin-left: 26px;">
												<form:input path="poProductCount" type="text" id="txtCount"
													class="col-md-12-1" readonly="true" value="0"
													placeholder="Count" />
											</div>
										</div>
										<div class="col-md-12-1 "
											style="margin-top: 17px; margin-left: 9px; margin-bottom: 13px;">
											<div class="col-md-2-1 ">
												<b>Net Total</b>
											</div>
											<div class="col-md-5-1 " style="">
												<form:input type="text" id='textNetTotal'
													name='textNetTotal' placeholder="Net total"
													path="poNetTotal" value='0'
													class="ui-autocomplete-input form-control input-SmallText" />
											</div>
										</div>
									</div>
								</div>
							</div>

						</form:form>
					</div>
				</div>
			</div>

			<input type='hidden' value='0' id='RowCount' />

			<%@include file="Pharma_Footer.jsp"%>

		</div>
		<div class="ajaxmodal">
			<!-- Place at bottom of page -->
		</div>
	</section>
</body>
</html>