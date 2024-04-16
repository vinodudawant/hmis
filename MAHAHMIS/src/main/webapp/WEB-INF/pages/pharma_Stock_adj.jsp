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
<title>Physical Stock Adj | Pharmacy</title>
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
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_purchase.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/moments.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_physical_stock_adj.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_shortcut.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_phy_stockUpdate.js"/>"></script> --%>	
<%@include file="pharma_header.jsp"%>
<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_purchase.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_purchase_batch_popup.js"/>"></script>
	<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_phy_stockUpdate.js"/>"></script>
	<script
	src="<c:url value="../.././pharmacy/resources/js/app_js/pharma_physical_stock_adj.js"/>"></script>
<script>
	jQuery(document).ready(function() {
		//App.setPage("widgets_box");  //Set current page
		App.init(); //Initialise plugins and elements
		fetchAllProductDetails(0);
		fetchVoucherNumber();
	});

	function fetchAllProductDetails() {

		jQuery
				.ajax({
					async : false,
					type : "POST",
					url : "../../pharmacy/physicalStockOutEntry/getStockEntryDetailsForAdj",
					timeout : 1000 * 60 * 5,
					catche : false,
					success : function(r) {
						//alert(r);
						//var jsObj = $.parseJSON(r);
						setStockOutEntryAdjustDetails(r);

					}
				});
		return true;

	}

	function setRemainingQty(obj) {
		var totalQty = $('#txtPhysicalStock' + obj).val();
		var closingQty = $('#txtClosingStk' + obj).text();
		var qty = totalQty - closingQty;
		$('#txtQty' + obj).val(qty);
	}

	var stockOutEntryLength = 0;
	function setStockOutEntryAdjustDetails(result) {
		stockOutEntryLength = result.length;
		var divContent = "";

		for ( var i = 0; i < result.lstStockOutEnrty.length; i++) {
			
			divContent = divContent
					+ "<tr id='tr"+i+"'><td id='productId"+ i
			+ "' style='display:none'>"
					+ result.lstStockOutEnrty[i].product_id
					+ "</td><td id='batchId"
			+ i
			+ "' style='display:none'>"
					+ result.lstStockOutEnrty[i].batch_id
					+ "</td><td>"
					+ result.lstStockOutEnrty[i].product_name
					+ "</td><td>"
					+ result.lstStockOutEnrty[i].batch_code
					+ "</td><td id='txtClosingStk"+i+"'>"
					+ parseInt(result.lstStockOutEnrty[i].stock_out_current_stock)
					+ "</td><td><input type='text'  id='txtPhysicalStock"
					+ i
					+ "' class='form-control input-SmallText # deleteGroup"
					+ i
					+ " # textNo' onblur='setRemainingQty("
					+ i
					+ ")' value='"
					+ parseInt(result.lstStockOutEnrty[i].phy_stock)
					+ "' ></td><td><input type='text'  id='txtQty"
			        + i
			        + "' class='form-control input-SmallText # deleteGroup"
			        + i
			        + " # textNo'  readonly></td><td><input type='textarea' id='remark"
			        + "' name='textarea' ></td><td><input type='checkbox' id='selectProduct_"
					+ i
					+ "' class='selectProduct' name='selectProduct' value='"
					+ i + "' onclick=(" + i
					+ ")></td></tr>";
		}

		$("#tableStockOutDetails").html(divContent);
		
		calculateDiff(result);
	}
	
	function calculateDiff(result) 
	{
		for ( var i = 0; i < result.lstStockOutEnrty.length; i++) 
		{
			var totalQty = $('#txtPhysicalStock' + i).val();
			var closingQty = $('#txtClosingStk' + i).text();
			var qty = totalQty - closingQty;
			$('#txtQty' + i).val(qty);
			
		}
		
	}

	function fetchSelectAll() {
		$(".selectProduct").prop('checked', true);
		var count = 0;
		for ( var i = 0; i < stockOutEntryLength; i++) {
			var totalQty = $('#txtPhysicalStock' + i).val();
			if (totalQty == "" || totalQty == null || totalQty < 0) {
				count++;
				$("#selectProduct_" + i).prop("checked", false);
				$('#txtPhysicalStock' + i).val("");
				$('#txtQty' + i).val("");

				$('#tr' + i + ' td').css({
					'background-color' : 'Yellow'
				});
				$('td', this).css({
					'background-color' : 'red'
				});

			}
		}

		if (count > 0) {
			alert("Please Enter Valid Physical Stock for above " + count
					+ " product");
		}
	}

	function unselectAll() {
		$(".selectProduct").prop('checked', false);

		for ( var i = 0; i < stockOutEntryLength; i++) {
			$('#tr' + i + ' td').css({
				'background-color' : 'white'
			});
			$('td', this).css({
				'background-color' : 'red'
			});
		}
	}
	function savePhysicalStockOutEntry() {

		var obj = [];
		var count = 0;
		$("input:checkbox:checked").each(function() {
			var $this = $(this);
			var s = $this.attr("id");
			s = s.split("_")[1];

			obj.push($('#productId' + s).text());
			obj.push($('#batchId' + s).text());
			//obj.push($('#stockId' + s).text());
			obj.push($('#txtClosingStk' + s).text());
			obj.push($('#txtPhysicalStock' + s).val());
			obj.push($('#txtQty' + s).val());

			count = 1;
		});
		if (count == 1) {
			var str = obj.toString();
			jQuery
					.ajax({
						async : false,
						type : "POST",
						data : {
							"jsonString" : str
						},
						url : "../../pharmacy/physicalStockOutEntry/save",
						catche : false,
						error : function() {

							alert("oops something went wrong related to stock please save proper data or check mrp");
						},
						success : function(r) {

							alert("success...");
						}
					});
			window.location.href = "view";
		} else {
			alert("Select atleast one checkbox");
		}
	}
	
	
	
	function fetchProductNameByBarcodeInPhyStock(batchId)
	{
		var a=batchId;
		
		if( parseInt(a.lastIndexOf(".")) > 0)
		{
		alert("Enter proper barcode");
		$('#txtBarcode').val('');
		$('#txtBarcode').focus();
		return false;
		}
	if((a.indexOf("0")==0))
	{
		alert("barcode should not starts with 0");
		$('#txtBarcode').val('');
		$('#txtBarcode').focus();
		return false;
	}
		if ($('#txtBarcode').val() != '') 
		{
				var BatchId = batchId;
				var inputs = [];
				inputs.push('BatchId=' + BatchId);
				var str = inputs.join('&');
				jQuery
						.ajax({
							async : true,
							type : "POST",
							data : str + "&reqType=AJAX",
							url : "../../pharmacy/physicalStockOutEntry/fetchProductNameByBarcode",
							timeout : 1000 * 60 * 5,
							catche : false,
							global : false,
							error : function() {
								alert("error");
							},
							success : function(r)
							{
								//var jsObj = $.parseJSON(r);
								setStockOutEntryAdjustDetails(r);
							}
						});
				return true;
			
		}
	}
	
	
</script>

<script type="text/javascript">
	onload = function() {
		//$("#ipdman").addClass("anchorActive");
		//defaultViewHallType();
		//return setValuesToAutocomplete(null);
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
		saveStockOutEntry();

	});

	function validateSearchByProductName() {
		if ($('#txtProductName').val() != null
				&& $('#txtProductName').val() != "") {
			searchByProductName($("#hiddenProductId").val());
		} else {
			alert("Enter product Name in Search Box");
			$('#txtProductName').focus();
		}

	}

	function searchByProductName(id) {

		var inputs = [];
		inputs.push('productId=' + id);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/physicalStockOutEntry/getStockEntryDetailsByProductId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("oops something went wrong related to stock please save proper data or check mrp");
					},
					success : function(r) {
						console.log(r);
						//var jsObj = $.parseJSON(r);
						setStockOutEntryAdjustDetails(r);
					}
				});
		return true;

	}

	function splitProductName(content) {

		if (content != "") {
			var arr = content.split("$$");
			$('#txtProductName').val(arr[0]);
			if (arr.length > 1) {
				$('#hiddenProductId').val(arr[1]);
			}
		} else {
			$('#hiddenProductId').val(0);
		}

	}
</script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>
</head>
<body style="background: white ! important;">
	<section id="page">

		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
		<div id="outer" class="container-main">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->
			<%@include file="HelpMenu.jsp"%>
			<%@include file="Pharma_left_menu_transaction.jsp"%>
			<%@ include file="pharma_purchase_batch_PopUp.jsp"%>

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
											<li>Physical Stock Adjust</li>
											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<div class="li pull-right" style="margin-left: 9px;"></div>
										</ul>

									</div>
								</div>
							</div>

							<div class="col-md-12-1">

								<div class="col-md-12-1">
									<div class="col-md-12-1">
										<div id="correctionInRatet" class="col-md-12-1"
											style="height: 100%; margin-top: 3%; padding-left: 20px;">
											<form:form commandName="physicalStockOutEntry"
												id="StockOutEntryForm"
												action="../../pharmacy/stockOutEntry/save"
												method="post">
												<div class="col-md-12-1">
													<div class='col-md-1-1'><b>Product Name</b></div>
													<div class='col-md-1-1'>
														<input type="text" id='txtProductName'
															name='txtProductName' placeholder="Product Name Here"
															class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
															onblur="splitProductName($('#txtProductName').val())" />
														<input type="hidden" id="hiddenProductId" />

													</div>
													<div class='col-md-1-1'
														style="margin-left: 9px; margin-top: -10px;">
														<input id='' type='button' value='Search' class='edit'
															onclick='validateSearchByProductName();' />

														<script type="text/javascript">
															$("#txtProductName")
																	.autocomplete(
																			{
																				source : function(
																						request,
																						response) {

																					var findingName = $(
																							"#txtProductName")
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
																								url : "../../pharmacy/product/autoSuggestionProduct",
																								timeout : 1000 * 60 * 5,
																								catche : false,
																								error : function(
																										event,
																										request,
																										settings) {
																									alert("error");
																								},
																								success : function(
																										r) {
																									var availableTags = [];
																									for ( var i = 0; i < r.length; i++) {
																										availableTags[i] = r[i].productName
																												+ "$$"
																												+ r[i].productId;

																									}

																									response(availableTags);
																								}
																							});
																				}
																			});
														</script>

													</div>

                                                    <div class='col-md-1-1'><b>Barcode</b></div>
													<div class='col-md-1-1'>
														<input type="text" id='txtBarcode'
															name='txtBarcode' placeholder="Barcode Name Here"
															class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
															onblur="fetchProductNameByBarcodeInPhyStock(this.value);" />

													</div>
													
													 <div class='col-md-2-1' style="margin-left: 9px;"><b>Voucher Number:</b></div>
													
													<div class='col-md-2-1'>
													<form:select id='txtVoucher' path="voucher_no" style="margin-left: -4px;">
																<option value="0">--Select--</option>
															</form:select>
														
                                                    <!--  <div class='col-md-2-1'
														style="margin-left: 9px; margin-top: -10px;">
														<input id='button' type='button' value='Search' class='edit'
															onclick='fetchVoucherNo();'/>
													</div> -->
													</div>
													
													<div class='col-md-2-1'>
													<%-- <form:select id='txtVoucher' path="voucher_no">
																<option value="0">--Select--</option>
															</form:select> --%>
														
                                                     <div class='col-md-1-1'
														style="margin-left: -50px; margin-top: 1px;">
														<input id='button' type='button' value='Search' class='edit'
															onclick='fetchVoucherNo();'/>
															
													<button class="btn btn-xs btn-success" type="button"
														id="saveBtn" onclick="savePhysicalStockOutEntry()"
														style="margin-left: 70px; margin-top: -40px;">Settle Bill</button>	
													</div>
													</div>
												</div>

												<div class="col-md-12-1" style="margin-top: 5px">

<!-- 													<button class="btn btn-xs btn-success" type="button"
														id="saveBtn" onclick="savePhysicalStockOutEntry()"
														style="margin-left: 800px; margin-top: -51px;">Settle Bill</button> -->
													<div class="row">
														<div class="col-md-12">
															<!-- BOX -->
															<div class="box border purple">
																<div class="box-title">
																	<h4>
																		<i class="fa fa-table"></i>Physical Stock Adjust
																	</h4>
																	<div class="tools hidden-xs">

																		<input type="radio" name="stockEntryTypeFetch"
																			value='0' id="radioStockOut"
																			onchange="fetchSelectAll();" /> <label
																			for="exampleInputEmail1" class="TextFont">Select
																			All</label> <input type="radio" name="stockEntryTypeFetch"
																			value='1' id="radioStockOut"
																			onchange="unselectAll();" checked /> <label
																			for="exampleInputEmail1" class="TextFont">Unselect
																			All</label> <a href="#box-config" data-toggle="modal"
																			class="config"> <i class="fa fa-cog"></i>
																		</a> <a href="javascript:;" class="reload"> <i
																			class="fa fa-refresh"></i>
																		</a> <a href="javascript:;" class="collapse"> <i
																			class="fa fa-chevron-up"></i>
																		</a> <a href="javascript:;" class="remove"> <i
																			class="fa fa-times"></i>
																		</a>
																	</div>
																</div>
																<div class="box-body">
																	<table id="datatable2" cellpadding="0" cellspacing="0"
																		border="0"
																		class="datatable table table-striped table-bordered table-hover">
																		<thead>
																			<tr>
																				<th>Product Name</th>
																				<th>Batch Code</th>
																				<th>Current Stock</th>
																				<th class="hidden-xs">Physical Stock</th>
																				<th>Difference</th>
																				<th>Remark</th>
																				<th>Select
																				<th>
																			</tr>
																		</thead>
																		<tbody id="tableStockOutDetails">

																		</tbody>
																	</table>
																</div>
															</div>
															<!-- /BOX -->
														</div>
													</div>
												</div>

											</form:form>
										</div>
									</div>



									<div></div>


								</div>
							</div>

						</div>
					</div>
				</div>
				<%@include file="Pharma_Footer.jsp"%>
			</div>
		</div>
	</section>
</body>
</html>
