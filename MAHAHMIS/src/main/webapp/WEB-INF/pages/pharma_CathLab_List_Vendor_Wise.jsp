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
<title>Cathlab Product List | Pharmacy</title>
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

<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />

<link
	href="<c:url value="../.././pharma-resources/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css"/>"
	rel="stylesheet" media="screen">

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

<!-- Application js -->

<script src="<c:url value="../.././pharma-resources/alertify.js"/>"></script>
<!-- CUSTOM SCRIPT -->
<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/shortcut.js"/>"></script>


<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/moments.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_shortcut.js"/>"></script>

<script>
	jQuery(document).ready(function() {
		App.init();
	});
</script>


<script type="text/javascript">
function setVendorValuesToAutocomplete(key) {

	if (key != null) {
		var keycode = (key.which) ? key.which : key.keyCode;
		if (keycode == 9) {
			$('#txtQty').focus();
			return false;
		}
	}

	var findingName = $("#txtVendorName").val();
	var inputs = [];
	inputs.push('letter=' + findingName);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/product/autoSuggestionCathLabVendor",
				timeout : 1000 * 60 * 15,

				error : function(error) {
					alert('error' + error);
				},
				success : function(r) {
					var availableTags = [];
					var resultData = [];

					for (var i = 0; i < r.length; i++) {
						availableTags[i] = r[i].productName + '_'
								+ r[i].productId;
					}

					var template = "";
					for (var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});

						template = template + '<li data-value="'
								+ (arrValue[1]) + '" class=""><a href="#">'
								+ arrValue[0] + '</a></li>';

					}
					$("#vendorDiv .typeahead1").html(template);
					$("#vendorDiv .typeahead1").show();

					setTimeout(
							function() {
								$('#txtVendorName').typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult1,
									scrollBar : true
								});
								$("#txtVendorName").data('typeahead').source = resultData;
							}, 500);
				}
			});
}

function displayResult1(item) {
	var content = item.value.split("-");
	getProduct1(content[0]);
}


	function getProduct1(vendorId) {
		jQuery.ajax({
			type : "GET",
			url : "../../pharmacy/product/getCathLabProductByVendor/"
					+ vendorId,

			success : function(r) {
				$("#tableProductDetails").empty();
				$.each(r,function(){
					$("#tableProductDetails").append('<tr><td>'+this.productName+'</td><td>'+this.cess+'</td><td>'+this.cgst+'</td><td>'+(parseFloat(this.cess)-parseFloat(this.cgst))+'</td></tr>');
				});
				
			},
			error : function(error) {
				alert('error=' + error);
			}
		});
	}
</script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>
</head>
<body style="background: white ! important;" onload="setFocusOnLoad()">
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
											<li>Cath Lab Product</li>
										</ul>

									</div>
								</div>
							</div>


							<div class="col-md-12-1">

								<div class="col-md-12-1">
									<div class="col-md-4-1" style="margin-top: 0px;">
										<div class="form-group" id="vendorDiv">
											<label for="product">Vendor</label> <input type="text"
												id="txtVendorName" name="txtVendorName"
												class="form-control input-SmallText" autocomplete="off"
												onkeypress="return setVendorValuesToAutocomplete(this.id)" />

										</div>
									</div>
									
									<div class="col-md-4-1" style="margin-top: 0px;">
										<div class="form-group" id="productDiv">
											<label for="product">Product</label> 
											<input type="text" onkeypress="return setValuesToAutocomplete(event)" autocomplete="off" autofocus="autofocus" tabindex="1" placeholder="Product" class="form-control input-SmallText typeahead" name="txtProductName" id="particulars"></input>
										</div>
									</div>

									<div class="col-md-12-1" style="margin-top:5px">
										<div class="row">
											<div class="col-md-12">
												<!-- BOX -->
												<div class="box border purple">
													<div class="box-title">
														<h4>
															<i class="fa fa-table"></i>Cath Lab Product Details
														</h4>
														
													</div>
													<div class="box-body">
														<table id="datatable2"
															class="datatable table table-striped table-bordered table-hover">
															<thead>
																<tr>
																	<th>Product Name</th>
																	<th>Total Stock</th>
																    <th>Current Stock</th>
																	<th>Sale Stock</th>
																</tr>
															</thead>
															<tbody id="tableProductDetails">
																
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
				<%@include file="Pharma_Footer.jsp"%>
			</div>
		</div>
	</section>
	
	<script type="text/javascript">
	
	function setValuesToAutocomplete(key) {
		if (key != null) {
			var keycode = (key.which) ? key.which : key.keyCode;
			if (keycode == 9) {
				$('#txtQty').focus();
				return false;
			}
		}

		var findingName = $("#particulars").val();
		var inputs = [];
		
			var vmi=0;
			inputs
			.push('vmi='+ vmi);
		
		inputs.push('letter=' + findingName);
		var str = inputs.join('&');


		            jQuery.ajax({
			        async : true,
			        type : "GET",
			        data : str + "&reqType=AJAX",
					url : "../../pharmacy/product/autoSuggestionProductForPurchase",
					timeout : 1000 * 60 * 15,
					cache : false,
					error : function(error) {
						/* alert('error' + error); */
					},
					success : function(r) {
						var availableTags = [];
						var resultData = [];
	
						for ( var i = 0; i < r.length; i++) {
							
							availableTags[i] = r[i].productName + '_'
									+ r[i].productId + '$$' + r[i].productUnit
									+ '$$' + r[i].packingMaster.packType + '$$'
									+ r[i].companyMaster.compName + '$$'
									+ r[i].shelfMaster.shelfName + '$$'
									+ r[i].productShortName + '$$' 
									+ r[i].productMarginRate+'$$'
									+r[i].rateEqualsMrp
									+'$$'
									+r[i].hsn
									+'$$'
									+r[i].igst
									+'$$'
									+r[i].cess
									;

						}

						var template = "";
						for ( var j = 0; j < availableTags.length; j++) {
							var arrValue = (availableTags[j]).split("_");
							var idValue = (arrValue[1]);
							resultData.push({
								ID : idValue,
								Name : arrValue[0]
							});

							template = template + '<li data-value="'
									+ (arrValue[1]) + '" class=""><a href="#">'
									+ arrValue[0] + '</a></li>';

						}
						$("#productDiv .typeahead").html(template);
						$("#productDiv .typeahead").show();

						setTimeout(function() {
							$('#particulars').typeahead({
								source : resultData,
								displayField : 'Name',
								valueField : 'ID',
								onSelect : displayResult,
								scrollBar : true,
							});
							$("#particulars").data('typeahead').source = resultData;
						}, 500);
					}
				});
	}
	
	
	function displayResult(item) {
		
		var content = item.value.split("$$");
		$('#hiddenProductId').val(content[0]);
		/* $('#txtUnit').val(content[1]);
		$('#txtComp').val(content[2]);
		$('#txtPack').val(content[3]);
		$('#txtAvailQty').val(content[4]);
		$('#txtVat').val(content[5]);
		$('#hiddenRate').val(content[6]);
		$('#hiddenRateEqualsMrp').val(content[7]);
		$('#txtHsn').val(content[8]);
		$('#txtIgst').val(content[9]);
		$('#txtCess').val(content[10]);
		calculateVatAmount();
		getLastVendorName(content[0]); */
		getPurchaseByBatch(content[0]);
		
	}
	
	function getPurchaseByBatch(productId) {

		jQuery.ajax({
			async : true,
			type : "GET",
			data : {
				productId : productId
			},
			url : "../../pharmacy/purchase/getBatchDetails",
			timeout : 1000 * 60 * 15,

			error : function(error) {
				alert('error' + error);
			},
			success : function(result) {
				var jsObj =$.parseJSON(result);
				var total
				if (jsObj.result.length > 0) {
					
					
					
				} else {
					$("#batchData").html("No Record Found");
				}
			}
		});
	}

	
	</script>
	
</body>
</html>
