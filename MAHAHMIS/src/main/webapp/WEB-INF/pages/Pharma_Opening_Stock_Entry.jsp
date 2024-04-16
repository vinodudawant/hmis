<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Opening Stock | Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<%@include file="pharma_header.jsp"%>
<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_bank.js"/>"></script>
	<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_ProductByBatchPopUp.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_opening_stock_entry.js"/>"></script>
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
	src="<c:url value="/pharmacy/resources/jquery/jquery-jtemplates.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/additional-methods.min.js"/>"></script>
<!-- /for Developers  -->
<!-- Application js -->
<script
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_bank.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>
<script src="<c:url value="/pharmacy/resources/alertify.js"/>"></script>
<!-- CUSTOM SCRIPT -->
<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_ProductByBatchPopUp.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_opening_stock_entry.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_shortcut.js"/>"></script> --%>


</head>
<script>
	jQuery(document).ready(function() {
		//App.setPage("widgets_box");  //Set current page
		App.init(); //Initialise plugins and elements
	});
	
</script>
<script type="text/javascript">
	onload = function() {
		setValuesToShelfAutocomplete(null);	
		setValuesToProductAutocomplete(null);
		
	};
	
 	shortcut.add("Ctrl+s",function() {
 		validateData();
	}); 
 	
 	function invalidateSession()
	{
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
 	
	function validateData()
	{
		if ($('#txtShelfNo').val() != null && $('#txtShelfNo').val() != "")
		{
		if ($('#txtShelfId').val() != null && $('#txtShelfId').val() != "")
		{
		if ($('#txtProduct').val() != null && $('#txtProduct').val() != "")
		{
			if ($('#hiddenProductId').val() != null && $('#hiddenProductId').val() != "") 
			{
			if ($('#txtQty').val() != null && $('#txtQty').val() != "") 
			{
				if ($('#txtBatchNo').val() != null && $('#txtBatchNo').val() != "") 
				{
					if ($('#txtExpiry').val() != null && $('#txtExpiry').val() != "")
					{
							var name1 = /^(0[1-9]|1[0-2])\/\d{2}$/;
							var value1 = $('#txtExpiry').val();
							var insertedDate = value1.split("/");
							var today = new Date();
							var currentMonth = (today.getMonth() + 1);
							var currentY = today.getFullYear();
							var currentYear = currentY.toString().substring(2);
							
							if (value1 != "" && !name1.test(value1)) {
								alert("Please Enter in 'MM/YY' format!!");
								$('#txtExpiry').focus();
								return false;
							}else if(insertedDate[1] < currentYear) {
								alert("Expiry date can not be less than today!!!");
								$('#txtExpiry').focus();
								return false;
							}else if(insertedDate[1] <= currentYear) {
								if (insertedDate[0] < currentMonth) {
									alert("Expiry date can not be less than today!!!");
									$('#txtExpiry').focus();
									return false;
								}

							}

						if (($('#txtVAT').val() != null || $('#txtVAT').val() != "") || ($('#txtCess').val() != null || $('#txtCess').val() != "") || ($('#txtIgst').val() != null || $('#txtIgst').val() != ""))
						{
							
							if (!(($('#txtVAT').val()>0 && $('#txtCess').val() >0) || ($('#txtCess').val() >0 && $('#txtIgst').val() >0) || ($('#txtVAT').val() >0 && $('#txtIgst').val() >0)))
							{
							
							if ($('#txtPurRate').val() != null && $('#txtPurRate').val() != "")
							{
									/* alert("Record Saved succeesfully!");
								$('#openingStockEntry').submit(); */
								if ($('#txtMRP').val() != null && $('#txtMRP').val() != "")
								{
										/* alert("Record Saved succeesfully!");
									$('#openingStockEntry').submit(); */
									
									if ($('#txtRate').val() != null && $('#txtRate').val() != "")
									{
											alert("Record Saved successfully!");
										$('#openingStockEntry').submit();
										window
										.open("../../pharmacy/openingStockEntry/view-frm");
										
									 } 
									else {
									alert("Enter Rate");
									$('#txtRate').focus();
									}
									
								 } 
								else {
								alert("Enter MRP");
								$('#txtMRP').focus();
								}
								
							 } 
							else {
							alert("Enter Pur Rate");
							$('#txtPurRate').focus();
							}
							}
							else {
								alert("Enter Either GST or IGST or CESS");
								$('#txtVAT').focus();
								}
							
						 } 
																
						else {
						alert("Enter GST");
						$('#txtVAT').focus();
						}
						
						
						
						
					 } 
															
				else {
					alert("Enter Expiry");
					$('#txtExpiry').focus();
				}
			} 
			else {
				alert("Enter Batch Number");
				$('#txtBatchNo').focus();
			}

		}
			else {
				alert("Enter Qunatity");
			$('#txtQty').focus();
			}

		}
			else {
				alert("Record not found");
				$('#txtProduct').val('');
				$('#txtProduct').focus();

			}

		}		
			else {
			alert("Enter Product Name");
			$('#txtProduct').focus();

		}

	}	
		else {
			alert("Record Not Found");
			$('#txtShelfNo').val();
			$('#txtShelfNo').focus();

		}

	}		
		else {
			alert("Enter Shelf Name");
			$('#txtShelfNo').focus();

		}

	}
	
	
	function getProductNameByBarcode(batchId) {
		var a = batchId;

		if (parseInt(a.lastIndexOf(".")) > 0) {
			alert("Enter proper barcode");
			$('#txtBarcode').val('');
			$('#txtBarcode').focus();
			return false;
		}

		if ((a.indexOf("0") == 0)) {
			alert("barcode should not starts with 0");
			$('#txtBarcode').val('');
			$('#txtBarcode').focus();
			return false;
		}

		if ($('#txtBarcode').val() != '') {
			var BatchId = batchId;
			var inputs = [];
			inputs.push('BatchId=' + BatchId);
			var str = inputs.join('&');
			jQuery
					.ajax({
						async : true,
						type : "GET",
						data : str + "&reqType=AJAX",
						url : "../../pharmacy/purchase/fetchProductNameByBarcode",
						timeout : 1000 * 60 * 5,
						catche : false,
						global : false,
						error : function() {
							alert("error");
						},
						success : function(result) {
							var data = jQuery.parseJSON(result);
							setTableDataOfBarcode(data.result);
						}
					});
			return true;

		}
	}

	function setTableDataOfBarcode(r) {

		if (r != "" && r != null) {
			if ($('#txtBarcode').val() != '') {
				$('#txtProduct').val(r[0].productName);
				$('#txtUnit').val(r[0].unit);
				$('#txtPack').val(r[0].pack);
				$('#txtComp').val(r[0].comp);
				$('#txtBatchNo').val(r[0].batchCode);
				$('#txtExpiry').val(r[0].batchExpDate);
				//$('#txtQty').val("1");

				$('#txtPurRate').val(r[0].purchaseRate);
				//	$('#txtAmt').val(r[0].purchaseRate);
				$('#txtMRP').val(r[0].mrp);
				$('#txtRate').val(r[0].rate);
				$("#txtVAT").val(r[0].vat);
				$("#txtShelfNo").val(r[0].shelfName);
				$("#txtShelf").val(r[0].shelfName);

				$('#hiddenBatchId').val($('#txtBarcode').val());
				//	$('#hiddenStockId').val(r[0].stockId);
				$("#hiddenProductId").val(r[0].productId);
				if(r[0].purchaseSlaveId=="" || r[0].purchaseSlaveId==null){
					$("#txtPurchaseSlaveId").val(0);
				}
				else
				$("#txtPurchaseSlaveId").val(r[0].purchaseSlaveId);
				

				$("#txtQty").focus();

				var inputs = [];
				inputs.push('letter=' + r[0].shelfName);
				var str = inputs.join('&');

				jQuery
						.ajax({
							async : true,
							type : "GET",
							data : str + "&reqType=AJAX",

							url : "../../pharmacy/shelf/autoSuggestionShelfNames",
							timeout : 1000 * 60 * 15,
							cache : false,
							error : function() {
								alert('error');
							},
							success : function(result) {

								$('#txtShelfId').val(result[0].shelfId);
							}
						});

			}
		} else {
			alert("Record not found");
			$('#txtProduct').val('');
			$('#txtUnit').val('');
			$('#txtPack').val('');
			$('#txtComp').val('');
			$("#txtShelf").val('');
			$('#txtBatchNo').val('');
			$('#txtExpiry').val('');
			$('#txtQty').val('');

			$('#txtShelfId').val('');
			$('#txtPurRate').val('');
			$('#txtAmt').val('');
			$('#txtMRP').val('');
			$('#txtRate').val('');
			$("#txtVAT").val('');
			$("#txtShelfNo").val('');
			$("#txtShelf").val('');

			$('#txtPurchaseSlaveId').val('');
			//$('#hiddenStockId').val('');
			$("#hiddenProductId").val('');
			$('#hiddenBatchId').val('');
		}

	}
	
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
		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->
			<%@include file="Pharma_left_menu_transaction.jsp"%>
			<%@include file="HelpMenu.jsp"%>
			<%@include file="BatchPopUp.jsp"%>
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
											<li>Date :<%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a
												href="../../Dashboard.jsp">Home</a></li>
											<li><a
												href="../../pharmacy/pharmacy/transaction">Pharmacy</a></li>
											<li>Opening Stock Entry</li>
											
											<li><span style="background-color:red" class="badge" id='storeTitle'><i class="fa fa-hospital-o"></i>
											<%
											if(session.getAttribute("pharmacyStoreName")!=null)
											{
											%>	
												<%=session.getAttribute("pharmacyStoreName") %> Store
											<%
											}
											else
											{
												%>
												No Sub Store Selected
												<%
											}
											%> </span></li>
											
											<%
											if(session.getAttribute("pharmacyStoreName")!=null)
											{
											%>	
												<li><a onclick="invalidateSession()"><span style="background-color:red" class="badge" id='storeTitle'><i class="fa fa-hospital-o"></i>return to Main store
											<%
											}
											%>
											</span></a></li>
											
											<div class="li pull-right" style="margin-left: 9px;">
												<button class="btn btn-xs btn-success" type="button"
														id="saveBtn" onclick="validateData();">Save and Print(Ctrl+S)</button>

											</div>
											<div class="li pull-right" ><a class="btn btn-xs btn-info"
												href="../../pharmacy/openingStockEntry/view">Back
													to List</a></div>
										</ul>

									</div>
								</div>
							</div>

							<div id="openingStock" class='col-md-8-1'
								style="height: 1100px; padding-top: 0%">
								<%-- <form:form commandName="openingStockEntry"
									id="openingStockEntry"
									action="/EhatEnterprise/pharmacy/common/saleType"
									method="post">
									 --%>
									 
									 <!-- 10 June 20  -->
									 <form:form commandName="openingStockEntry"
									id="openingStockEntry"
									action="../../pharmacy/openingStockEntry/save"
									method="post">
									
									<input type="hidden" name="saleFrom" value="openingStock">
									
									<div
										style='height: 90%; border: 1px solid #436a9d; padding-left: 5%;'>
										<div class='col-md-12-1 center' style='padding-top: 2%;'>
											<h4>Opening Stock Entry</h4>
										</div>
											<div class="row">
											<div class="panel-body col-md-12-1">

												<div class="col-md-12-1">
													<div class="form-group  col-md-12-1"
														style="margin-right: 1%; margin-left: 1%;">

														<div class="form-group  col-md-12-1"
															style="margin-right: 2%; margin-left: 2%;">


															<div class="form-group col-md-4-1"
																style="margin-top: 2%;">
																<label class="TextFont">Barcode</label>
																<form:input type="text" id="txtBarcode"
																	name="txtShelfNo" autocomplete="off" path=""
																	class="form-control input-SmallText"
																	placeholder="Barcode No"
																	onblur="getProductNameByBarcode(this.value);" value=""
																	maxlength="150" />

																<form:input path="shelfNo" type="hidden" id="txtShelfId" />
																<div class='col-md-1-1 center'
																	style='margin-top: -10px; margin-left: 408px; color: red;'>
																	<b> *</b>
																</div>
															</div>


															<div class="form-group col-md-6-1"
																style="margin-top: 2%;">
																<label class="TextFont">Shelf Name</label>
																<form:input type="text" id="txtShelfNo"
																	name="txtShelfNo" autocomplete="off" path=""
																	class="form-control input-SmallText"
																	placeholder="Shelf Name"
																	onkeyup="return setValuesToShelfAutocomplete(this.id)" />

																<form:input path="shelfNo" type="hidden" id="txtShelfId" />
																<div class='col-md-1-1 center'
																	style='margin-top: -10px; margin-left: 408px; color: red;'>
																	<b> *</b>
																</div>
															</div>
														</div>
														<div class="form-group  col-md-8-1"
															style="margin-right: 2%; margin-left: 2%;">
															<div class="form-group col-md-4-1"
																style="margin-top: 2%;">
																<form:radiobutton path="openingStockType" name="rdoStk"
																	checked="true" value='0' id="rdoOpeningStk" />
																<label for="exampleInputEmail1" class="TextFont">Opening
																	Stock</label>

															</div>
															<div class="form-group col-md-4-1"
																style="margin-top: 2%; display: none;">
																<form:radiobutton path="openingStockType" name="rdoStk"
																	value='1' id="rdoTemporary" />
																<label for="exampleInputEmail1" class="TextFont">Temporary
																	Purchase </label>

															</div>
															<div class="form-group col-md-4-1"
																style="margin-top: 2%; display: none;">

																<form:radiobutton path="openingStockType" name="rdoStk"
																	value='2' id="rdoLocalPur" />
																<label for="exampleInputEmail1" class="TextFont">Local
																	Purchase </label>
															</div>
														</div>


														<div class="col-md-12-1"
															style="margin-right: 2%; margin-left: 2%; margin-top: 0px;">

															<div class="col-md-3-1" style="margin-top: 0px;">
																<div class="form-group">
																	<label for="product">Product</label>
																	<form:hidden id="hiddenProductId" path="productId" />

																	<input type="hidden" id="txtPurchaseSlaveId"
																		name="txtPurchaseSlaveId" value="0">
																	<form:hidden id="hiddenBatchId" path="batchId" value="0"/>
																	<%--  <form:hidden  id="hiddenStockId" 
														              path="productMaster.batchMaster[0].stockMaster.stockId"/> --%>
																	<form:input path="" type="text" id="txtProduct"
																		name="txtProduct" class="form-control input-SmallText"
																		placeholder="Product" autofocus="autofocus"
																		maxlength="25" autocomplete="off"
																		onkeyup="return setValuesToProductAutocomplete(this.id)" />
																</div>
															</div>

															<div class="col-md-2-1" style="margin-top: 0px;">
																<div class="form-group">
																	<label for="product">Unit</label>
																	<form:input type="text" id="txtUnit" name="txtUnit"
																		path="" tabindex="-1"
																		class="form-control input-SmallText"
																		placeholder="unit" readonly="true" />
																</div>
															</div>

															<div class="col-md-2-1" style="margin-top: 0px;">
																<div class="form-group">
																	<label for="product">Pack</label>
																	<form:input type="text" id="txtPack" name="txtPack"
																		path="" tabindex="-1"
																		class="form-control input-SmallText"
																		placeholder="pack" readonly="true" />
																</div>
															</div>

															<div class="col-md-2-1" style="margin-top: 0px;">
																<div class="form-group">
																	<label for="product">Comp</label>
																	<form:input type="text" tabindex="-1" id="txtComp"
																		name="txtComp" path=""
																		class="form-control input-SmallText"
																		placeholder="comp" readonly="true" />
																</div>
															</div>

															<div class="col-md-2-1" style="margin-top: 0px;">
																<div class="form-group">
																	<label for="product">Shelf</label>
																	<form:input path="" type="text" id="txtShelf"
																		name="txtShelf" tabindex="-1"
																		class="form-control input-SmallText "
																		placeholder="shelf" readonly="true" />
																</div>
															</div>

														</div>


														<div class="form-group  col-md-6-1"
															style="margin-right: 2%; margin-left: 2%;">
															<label class="TextFont">Qty</label>
															<form:input type="text" id="txtQty" name="txtQty"
																path="quantity" placeholder="Qty" requird="true"
																class="form-control input-SmallText"
																onblur="isNumber('txtQty'),calculateAmt();" />
															<div class='col-md-1-1 center'
																style='margin-top: -10px; margin-left: 408px; color: red;'>
																<b> *</b>
															</div>
														</div>

														<div class="col-md-12-1"
															style="margin-right: 2%; margin-left: 2%; margin-top: 0px;">

															<div class="col-md-3-1" style="margin-top: 0px;">
																<div class="form-group">
																	<label for="product">Batch No</label>



																	<%-- <form:hidden  id="StockQtyInHand"
														path="productMaster.batchMaster[0].stockMaster.stockQtyInHand"/> --%>

																	<form:input type="text" path="batchCode"
																		id="txtBatchNo" name="txtBatchNo"
																		placeholder="Batch No" requird="true"
																		class="form-control input-SmallText"
																		onblur="checkBatchAvailability(this.value)" />

																</div>
																<div class='col-md-1-1 center'
																	style='margin-top: -57px; margin-left: 47px; color: red;'>
																	<b> *</b>
																</div>
															</div>

															<div class="col-md-3-1" style="margin-top: 0px;">
																<div class="form-group">
																	<label for="product">Expiry</label>
																	<form:input path="batchExpiry" type="text"
																		id="txtExpiry" onblur="isExpiryDate('txtExpiry');"
																		placeholder="Expiry" requird="true" name="txtExpiry"
																		class="form-control input-SmallText" />
																</div>
																<div class='col-md-1-1 center'
																	style='margin-top: -57px; margin-left: 34px; color: red;'>
																	<b> *</b>
																</div>
																<div class='col-md-3-1'
																	style='margin-top: -17px; margin-left: 4px; color: red;'>
																	<b>(mm/yy)</b>
																</div>
															</div>
														</div>

														<div class="form-group  col-md-6-1"
															style="margin-right: 2%; margin-left: 2%;">

															<label class="TextFont">GST%</label>
															<form:input type="text" id="txtVAT" name="txtVAT"
																path="vat" placeholder="GST%" readonly="true"
																 class="form-control input-SmallText" />

														</div>
														
														<div class="form-group  col-md-6-1"
															style="margin-right: 2%; margin-left: 2%;">

															<label class="TextFont">IGST%</label>
															<form:input type="text" id="txtIgst" name="txtIgst"
																path="igst" placeholder="IGST%" readonly="true"
																class="form-control input-SmallText" />

														</div>
														
														<div class="form-group  col-md-6-1"
															style="margin-right: 2%; margin-left: 2%;">

															<label class="TextFont">CESS%</label>
															<form:input type="text" id="txtCess" name="txtCess"
																path="cess" placeholder="CESS%"
																class="form-control input-SmallText" />

														</div>
														
														<div class="form-group  col-md-6-1"
															style="margin-right: 2%; margin-left: 2%;">

															<label class="TextFont">Pur.Rate</label>
															<form:input type="text" id="txtPurRate" name="txtPurRate"
																placeholder="Pur.Rate" requird="true" path="purRate"
																class="form-control input-SmallText"
																onblur="calculateAmt();" />

														</div>
														<div class="form-group  col-md-6-1"
															style="margin-right: 2%; margin-left: 2%;">

															<label class="TextFont">MRP</label>
															<form:input type="text" id="txtMRP" name="txtMRP"
																path="mrp" placeholder="MRP" requird="true"
																class="form-control input-SmallText"
																onblur="checkMrp();" />

														</div>
														<div class="form-group  col-md-6-1"
															style="margin-right: 2%; margin-left: 2%;">

															<label class="TextFont">Rate</label>
															<form:input type="text" id="txtRate" name="txtRate"
																placeholder="Rate" requird="true" tabindex="-1"
																path="rate" class="form-control input-SmallText" />

														</div>
														<div class="form-group  col-md-6-1"
															style="margin-right: 2%; margin-left: 2%;">

															<label class="TextFont">Amount</label>
															<form:input type="text" id="txtAmt" tabindex="-1"
																placeholder="Amount" requird="true" name="txtAmt"
																path="amt" class="form-control input-SmallText"
																readonly="true" />

														</div>
														<div class="form-group  col-md-6-1"
															style="margin-right: 2%; margin-left: 2%;">

															<label class="TextFont">Narration</label>
															<form:input type="text" id="txtNaration"
																placeholder="Naration" requird="true" name="txtNaration"
																path="naration" class="form-control input-SmallText" />

														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</form:form>
							</div>
						</div>
					</div>
				</div>
				<input type="hidden" id="taxMastertaxtIdForval" value="0">
				<%@include file="Pharma_Footer.jsp"%>
			</div>
		</div>
	</section>
</body>
</html>