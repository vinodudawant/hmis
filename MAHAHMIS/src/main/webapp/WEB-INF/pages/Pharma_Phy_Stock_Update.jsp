<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
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
<title>Physical Stock Update | Pharmacy</title>
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

<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />

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



<!-- Application js -->

<script src="<c:url value="/pharmacy/resources/alertify.js"/>"></script>
<!-- CUSTOM SCRIPT -->
<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_purchase_batch_popup.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_phy_stockUpdate.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/moments.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_stock_out_entry.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_shortcut.js"/>"></script> --%>
<%@include file="pharma_header.jsp"%>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_purchase_batch_popup.js"/>"></script>
	<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_stock_out_entry.js"/>"></script>
	<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_phy_stockUpdate.js"/>"></script>
<script>
	jQuery(document).ready(function() {
		App.init(); //Initialise plugins and elements
		fetchPhyStockUpdateDetails();//fetching physical stock update datails.
		fetchVoucherNumber();
	});
	
</script>

<script type="text/javascript">
	onload = function() { 
		return setValuesToAutocompletestockinout(null);
	};

	function validateData() {
		if ($('#txtProductName').val() != null
				&& $('#txtProductName').val() != "") {
			if ($('#txtBatchNo').val() != null && $('#txtBatchNo').val() != "") {
				if ($('#txtQty').val() != null && $('#txtQty').val() != ""
						&& $('#txtQty').val() != 0) {

					if (parseFloat($('#txtClosingStk').val()) >= parseFloat($(
							'#txtQty').val())) {
						alert("Record saved successfully!");
						$('#StockOutEntryForm').submit();
					} else {
						alert("Closing Stock Should be greater than or equal to quantity");
						$('#txtQty').focus();
					}

				} else {
					alert("Enter Quantity!");
					$('#txtQty').focus();
				}
			} else {
				alert("Enter Batch Name!");

			}
		} else {
			alert("Enter Product Name!");
			$('#txtProductName').focus();
		}
	}
	shortcut.add("Ctrl+s", function() {
		savePhyStockUpdate();
	});
</script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
	
	 HttpSession session1=request.getSession();
	Integer userId=(Integer) session1.getAttribute("userId1");
	String userName1 = (String) session1.getAttribute("userName");
    System.err.println("userId=>"+userId);			
    System.err.println("userName=>"+userName1);		

%>
</head>
<body style="background: white ! important;" onload="setFocusOnLoad()">
	<section id="page">
		<div id="outer" class="container-main">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->
			<%@include file="HelpMenu.jsp"%>
			<%@include file="Pharma_left_menu_transaction.jsp"%>
			<%@ include file="pharma_purchase_batch_PopUp.jsp"%>




			<div class="modal fade" id="voucherModal">
				<div class="modal-dialog modal-sm">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal">&times;</button>
							<h4 class="modal-title">Modal Header</h4>
						</div>
						<div class="modal-body">
							Voucher No. : <input type="text" id="vouNumber" 
							onkeyup="isNumber('vouNumber');">
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default"
								data-dismiss="modal" onclick="createVoucher()">Save</button>
							<button type="button" class="btn btn-default"
								data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>


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
													href="../../Dashboard.jsp">Home</a></li>
												<li><a
													href="../../pharmacy/pharmacy/transaction">Pharmacy</a></li>
												<li>Physical Stock Update</li>
												<div class="li pull-right" style="margin-left: 9px;"></div>
											</ul>

										</div>
									</div>
								</div>

								<div class="col-md-12-1">
									<div class="col-md-12-1">
										<div class="col-md-12-1 panel-body">
											<div id="correctionInRatet" class="col-md-12-1"
												style="height: 100%; margin-top: 0%; padding-left: 20px; border: 1px solid">
												<form:form commandName="physicalStockUpdate"
													id="PhyStockOutEntryForm"
													action="../../pharmacy/physicalStockUpdate/save"
													method="post">
													<div class="form-group" style="margin-top: 5px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<div class="form-group">
																<label for="product">Product</label>
																<form:input path="" type="text" id="txtProductName"
																	name="txtProductName"
																	class="form-control input-SmallText"
																	placeholder="product" autocomplete="off"
																	onkeypress="return setValuesToAutocompletestockinout(this.id)" />
																<form:hidden id="hiddenProductId" path="productId" />
															</div>
														</div>

														<div class="col-md-2-1" style="margin-top: 0px;">
															<div class="form-group">
																<label for="product">Unit</label>
																<form:input type="text" id="txtUnit" name="txtUnit"
																	path="" class="form-control input-SmallText"
																	placeholder="unit" readonly="true" />
															</div>
														</div>

														<div class="col-md-2-1" style="margin-top: 0px;">
															<div class="form-group">
																<label for="product">Pack</label>
																<form:input type="text" id="txtPack" name="txtPack"
																	path="" class="form-control input-SmallText"
																	placeholder="pack" readonly="true" />
															</div>
														</div>

														<div class="col-md-2-1" style="margin-top: 0px;">
															<div class="form-group">
																<label for="product">Comp</label>
																<form:input type="text" id="txtComp" name="txtComp"
																	path="" class="form-control input-SmallText"
																	placeholder="comp" readonly="true" />
															</div>
														</div>

														<div class="col-md-2-1" style="margin-top: 0px;">
															<div class="form-group">
																<label for="product">Shelf</label>
																<form:input path="" type="text" id="txtShelf"
																	name="txtShelf" class="form-control input-SmallText "
																	placeholder="shelf" readonly="true" />
															</div>
														</div>

													</div>
													<div class="col-md-1-1"
														style=' margin-top: 21px'>
														<button class="btn btn-xs btn-success" id="genVoucher"
															data-toggle="modal" data-target="#voucherModal"
															style='cursor: pointer;' type='button'
															value='Genrate Voucher'>Genrate
															Voucher</button>
													</div>



													<div class="col-md-4-1">
														<div class="form-group">
															<label for="product">Barcode</label>
															<form:input type='text' id='txtBarcode' name='txtBarcode'
																class='form-control input-SmallText' maxlength='150'
																placeholder="Barcode No" requird="true" path=""
																onblur="fetchProductNameByBarcode(this.value);" />
														</div>
													</div>

													<div class="col-md-4-1">
														<div class="form-group">
															<label for="product">Physical Qty</label>
															<form:input type='text' id='txtPhyQty' name='txtPhyQty'
																onkeypress='' placeholder="Physical Qty." requird="true"
																class='form-control input-SmallText' maxlength='30'
																path="qty"
																onblur="isNumber('txtPhyQty'),setFocusToSave();" />
														</div>
													</div>

													<div class="col-md-4-1">
													
														<div class="form-group">
														
															<label for="product">Batch No</label>
														<div class="col-md-1-1 center"
															style="margin-top: 0px; margin-left: 0px; color: red;">
															<b> *</b>
														</div>
														<form:input type='text' id='txtBatchNo' name='txtBatchNo'
																class='form-control input-SmallText' maxlength='150'
																placeholder="Batch No" requird="true" path=""
																onclick="loadBatchPopUp()" />
																
														</div>
													
													<form:hidden path="stockBatchId" id="hiddenBatchId" />
														<form:hidden path="stockId" id="hiddenStockId" />
													</div>

													<div class="col-md-4-1" style="margin-left: 9px;">
														<div class="form-group">
															<label for="product">Voucher Number</label>
															<form:select id='txtVoucher' path="voucher_no">
																<option value="0">--Select--</option>
															</form:select>
														</div>
													</div>

													<div class="col-md-4-1">
														<div class="form-group">
															<label for="product">Expiry</label>
															<form:input type='text' id='txtExpiry' name='txtExpiry'
																onkeypress='' class='form-control input-SmallText'
																maxlength='30' placeholder="Expiry" requird="true"
																path="" onblur="isExpiryDate('txtExpiry');"
																readonly="true" />
														</div>
													</div>

													<div class="col-md-4-1">
														<div class="form-group">
															<label for="product">Closing Stock</label>
															<form:input type='text' id='txtClosingStk'
																name='txtClosingStk' onkeypress=''
																placeholder="Closing Stk" requird="true"
																class='form-control input-SmallText' maxlength='22'
																path="stockOutClosingStock" readonly="true" />
														</div>
													</div>

													<div class="col-md-1-1"
														style='margin-left: 950px; margin-bottom: 5px;'>
														<button class="btn btn-xs btn-success" id="saveStockOut"
															style='cursor: pointer;' type='button' value='Save Now'
															onclick="savePhyStockUpdate();">Save(Ctrl+S)</button>
													</div>

													<%-- <div class="col-md-6-1">
														<div class='form-group'
															style='margin-top: -5px;'>
															<b>Barcode</b>
														</div>
														<div class='col-md-4-1' style='margin-top: -5px;'>

															<form:input type='text' id='txtBarcode' name='txtBarcode'
																class='form-control input-SmallText' maxlength='150'
																placeholder="Barcode No" requird="true" path=""
																onblur="fetchProductNameByBarcode(this.value);" />
														</div>
													</div>


													<div class="col-md-6-1">
														<div class='col-md-3-1' style='margin-top: 25px;'>
															<b>Batch No</b>
														</div>
														<div class='col-md-4-1' style='margin-top: 25px;'>

															<form:input type='text' id='txtBatchNo' name='txtBatchNo'
																class='form-control input-SmallText' maxlength='150'
																placeholder="Batch No" requird="true" path=""
																onclick="loadBatchPopUp()" />
														</div>

														<div class='col-md-1-1 center'
															style='margin-top: -11px; margin-left: 310px; color: red;'>
															<b> *</b>
														</div>

														<div class='col-md-3-1' style='margin-top: 9px;'
															id="newBatch"></div>
														<form:hidden path="stockBatchId" id="hiddenBatchId" />
														<form:hidden path="stockId" id="hiddenStockId" />

													</div>

													<div class="col-md-6-1">
														<div class='col-md-3-1' style='margin-top: 25px;'>
															<b>Voucher Number</b>
														</div>
														<div class='col-md-4-1' style='margin-top: 25px;'>

															<form:input type='text' id='txtVoucher' name='txtVoucher'
																onkeypress='' class='form-control input-SmallText'
																maxlength='30' placeholder="Voucher" 
																path="" onblur="isExpiryDate('txtExpiry');"/>
														</div>

														<div class='col-md-3-1' style='margin-top: 25px;'>
															<b>Expiry</b>
														</div>
														<div class='col-md-4-1' style='margin-top: 25px;'>

															<form:input type='text' id='txtExpiry' name='txtExpiry'
																onkeypress='' class='form-control input-SmallText'
																maxlength='30' placeholder="Expiry" requird="true"
																path="" onblur="isExpiryDate('txtExpiry');"
																readonly="true" />

														</div>
														<div class='col-md-1-1 center'
															style='margin-top: -11px; margin-left: 310px; color: red;'>
															<b> *</b>
														</div>
														<div class='col-md-3-1'
															style='margin-top: 0px; margin-left: -236px; color: red;'>
															<b>(mm/yy)</b>
														</div>
													</div>



												<div class='col-md-12-1' style='margin-top: 9px;'>


													<div class="col-md-6-1">
														<div class='col-md-3-1' style='margin-top: 9px;'>
															<b>Physical Qty</b>

														</div>
														<div class='col-md-4-1' style='margin-top: 9px;'>

															<form:input type='text' id='txtPhyQty' name='txtPhyQty'
																onkeypress='' placeholder="txtPhyQty" requird="true"
																class='form-control input-SmallText' maxlength='30'
																path="qty"
																onblur="isNumber('txtPhyQty'),setFocusToSave();" />

														</div>
														<div class='col-md-1-1 center'
															style='margin-top: -11px; margin-left: 310px; color: red;'>
															<b> *</b>
														</div>
													</div>

													<div class="col-md-6-1">
														<div class='col-md-3-1' style='margin-top: 9px;'>
															<b> Closing Stk</b>
														</div>
														<div class='col-md-4-1' style='margin-top: 9px;'>

															<form:input type='text' id='txtClosingStk'
																name='txtClosingStk' onkeypress=''
																placeholder="Closing Stk" requird="true"
																class='form-control input-SmallText' maxlength='22'
																path="stockOutClosingStock" readonly="true" />

														</div>
													</div> --%>
											</div>

											<!-- <div class='col-md-12-1'
													style='margin-top: 9px; margin-bottom: 10px;'>
													<div class="col-md-4-1"></div>
													<div class="col-md-4-1"></div>
													<div class="col-md-4-1" style='margin-left: 950px;'>
														<button class="btn btn-xs btn-success" id="saveStockOut"
															style='cursor: pointer;' type='button' value='Save Now'
															onclick="savePhyStockUpdate();">Save(Ctrl+S)</button>
													</div>
												</div> -->

											</form:form>
										</div>
									</div>

									<div class="col-md-12-1" style="margin-top: 5px">
										<div class="row">
											<div class="col-md-12">
												<!-- BOX -->
												<div class="box border purple">
													<div class="box-title">
														<h4>
															<i class="fa fa-table"></i>Physical Stock Details
														</h4>

													</div>
													<div class="box-body">
														<table id="datatable2" cellpadding="0" cellspacing="0"
															border="0"
															class="datatable table table-striped table-bordered table-hover">

															<thead>
																<tr>
																	<th>Product Name</th>
																	<th>Batch Code</th>
																	<th>Batch Expiry</th>
																	<th class="hidden-xs">Physical Qty</th>
																	<th>Created By</th>
																	<th>Voucher Number</th>
																</tr>
															</thead>
															<tbody id="PhyStockUpdate">
															</tbody>
														</table>
													</div>

												</div>
												<!-- /BOX -->
											</div>
										</div>
									</div>
									<div></div>
								</div>
							</div>

						</div>
					</div>
				</div>

				<input type="hidden" id="hiddenUserName"
					value="<%=(String)session.getAttribute("userName")%>">
				<%@include file="Pharma_Footer.jsp"%>
			</div>
		</div>
	</section>
</body>
</html>
