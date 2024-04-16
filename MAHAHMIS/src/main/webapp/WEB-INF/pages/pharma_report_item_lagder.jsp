<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.io.File"%>
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


<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<script type="text/javascript" src="<c:url value="/js/report.js"/>"></script>

<script src="<c:url value="/pharmacy/resources/alertify.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>

<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>

<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/js/jqx-widgets/jqx.base.css"/>">

<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/js/jqx-widgets/jqx.energyblue.css"/>"
	type="text/css" />

<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxcore.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxdata.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxbuttons.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxscrollbar.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxmenu.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.selection.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.filter.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxlistbox.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxdropdownlist.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxcheckbox.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxwindow.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/demos.js"/>"></script>


<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.sort.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.pager.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.columnsresize.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxdata.export.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.export.js"/>"></script>
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
<script>
	jQuery(document).ready(function() {
		//App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
		
		jQuery(document).ajaxStart(function() {
			//alert("hi ajax start");
			$("body").addClass("loading");
		});

		jQuery(document).ajaxStop(function() {
			$("body").removeClass("loading");
			//alert("hi ajax stop");
		});
	});

	function hidePopUp() {
		$('#itemLadgerPopUp').hide();
	}
	
	function loadPopUp() {
		
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();

		if (from != '' && to != '') {
			var inputs = [];
			
			inputs.push('from=' + from);
			inputs.push('to=' + to);
			inputs.push('productId=2');

			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "../report/getProductItemLedgerReport",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					$("#itemLadgerPopUp").show();
					setItemLadgerReport(r);

				}
			});
			return true;
		} else {
			alertify.error('Please Fill All the Details');
		}

	}
	
	function getExpiryDataByProductId(value)
	{
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();
	
		if (value != '') 
		{
			var inputs = [];
			inputs.push('ProductId=' + value);
			inputs.push('from=' + from);
			inputs.push('to=' + to);
			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "/EhatEnterprise/pharmacy/report/getDataOfPurchaseByProductId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					setPurchaseData(r);
				}
			});
			return true;
		}
	}
	 function setPurchaseData(result) {
		var r = result;
		var divContent = "";

		divContent = divContent
				+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1><thead><th class='col-sm-1' style='height: 21.5px;'>Product Name</th><th class='col-sm-1' style='height: 21.5px;'>Qty</th><th class='col-sm-1' style='height: 21.5px;'>Bill No</th><th class='col-sm-1' style='height: 21.5px;'>Date</th><th class='col-sm-1' style='height: 21.5px;'>Vendor Name</th><th class='col-sm-1' style='height: 21.5px;'>Current Stock</th><th class='col-sm-1' style='height: 21.5px;'>Batch Code</th></thead>";
		for ( var i = 0; i < r.length; i++) {

			divContent = divContent
					+ "<tr><td class='col-sm-1' style='height: 21.5px;'  id=productName"+r[i].productId+">"+ r[i].productName + "</td><td class='col-sm-1' style='height: 21.5px;'  id=qty"+r[i].productId+">"
					+ r[i].qty + "</td><td class='col-sm-1' style='height: 21.5px;'  id=receiptNo"+r[i].productId+">"
					+ r[i].receiptNo + "</td><td class='col-sm-1' style='height: 21.5px;'  id=date"+r[i].productId+">"
					+ r[i].date + "</td><td class='col-sm-1' style='height: 21.5px;'  id=vendorName"+r[i].productId+">"
					+ r[i].vendorName + "</td><td class='col-sm-1' style='height: 21.5px;'  id=Stock"+r[i].productId+">"
					+ r[i].stock + "</td><td class='col-sm-1' style='height: 21.5px;'  id=batch"+r[i].productId+">"
					+ r[i].batchCode + "</td></tr>";
		}
		divContent = divContent
				+ "</table>"
				+ "</div>";

		$("#productData").html(divContent);
	} 
	 
	 
	 function getOpeningStockDataByProductId(value)
		{
			var from = $("#popup_container2").val();
			var to = $("#popup_container3").val();
		
			if (value != '') 
			{
				var inputs = [];
				inputs.push('ProductId=' + value);
				inputs.push('from=' + from);
				inputs.push('to=' + to);
				var str = inputs.join('&');

				jQuery.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "/EhatEnterprise/pharmacy/report/getDataOfOpeningStockByProductId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						setOpeningStockData(r);
					}
				});
				return true;
			}
		}
	 
		 function setOpeningStockData(result) {
			var r = result;
			var divContent = "";

			divContent = divContent
					+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1><thead><th class='col-sm-1' style='height: 21.5px;'>Product Name</th><th class='col-sm-1' style='height: 21.5px;'>Qty</th><th class='col-sm-1' style='height: 21.5px;'>Bill No</th><th class='col-sm-1' style='height: 21.5px;'>Date</th><th class='col-sm-1' style='height: 21.5px;'>Current Stock</th><th class='col-sm-1' style='height: 21.5px;'>Batch Code</th></thead>";
			for ( var i = 0; i < r.length; i++) {

				divContent = divContent
						+ "<tr><td class='col-sm-1' style='height: 21.5px;'  id=productName"+r[i].productId+">"+ r[i].openingStockproductName + "</td><td class='col-sm-1' style='height: 21.5px;'  id=qty"+r[i].productId+">"
						+ r[i].openingStockqty + "</td><td class='col-sm-1' style='height: 21.5px;'  id=receiptNo"+r[i].productId+">"
						+ r[i].openingStockreceiptNo + "</td><td class='col-sm-1' style='height: 21.5px;'  id=date"+r[i].productId+">"
						+ r[i].openingStockdate + "</td><td class='col-sm-1' style='height: 21.5px;'  id=Stock"+r[i].productId+">"
						+ r[i].openingStock + "</td><td class='col-sm-1' style='height: 21.5px;'  id=batch"+r[i].productId+">"
						+ r[i].openingStockBatchCode + "</td></tr>";
			}
			divContent = divContent
					+ "</table>"
					+ "</div>";
			$("#productOpeningStockData").html(divContent);
		} 
	
		 function getMrnIssueByProductId(value)
			{
				var from = $("#popup_container2").val();
				var to = $("#popup_container3").val();
			
				if (value != '') 
				{
					var inputs = [];
					inputs.push('ProductId=' + value);
					inputs.push('from=' + from);
					inputs.push('to=' + to);
					var str = inputs.join('&');

					jQuery.ajax({
						async : true,
						type : "GET",
						data : str + "&reqType=AJAX",
						url : "/EhatEnterprise/pharmacy/report/getDataOfMrnByProductId",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {

						},
						success : function(r) {
							setMrnIssueData(r);
						}
					});
					return true;
				}
			}
		 
			 function setMrnIssueData(result) {
				var r = result;
				var divContent = "";

				divContent = divContent
						+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1><thead><th class='col-sm-1' style='height: 21.5px;'>Product Name</th><th class='col-sm-1' style='height: 21.5px;'>Qty</th><th class='col-sm-1' style='height: 21.5px;'>Bill No</th><th class='col-sm-1' style='height: 21.5px;'>Date</th><th class='col-sm-1' style='height: 21.5px;'>Store name</th><th class='col-sm-1' style='height: 21.5px;'>Batch Code</th></thead>";
				for ( var i = 0; i < r.length; i++) {

					divContent = divContent
							+ "<tr><td class='col-sm-1' style='height: 21.5px;'  id=productName"+r[i].productId+">"+ r[i].productNameForMrn + "</td><td class='col-sm-1' style='height: 21.5px;'  id=qty"+r[i].productId+">"
							+ r[i].qtyForMrn + "</td><td class='col-sm-1' style='height: 21.5px;'  id=receiptNo"+r[i].productId+">"
							+ r[i].receiptNoForMrn + "</td><td class='col-sm-1' style='height: 21.5px;'  id=date"+r[i].productId+">"
							+ r[i].dateForMrn + "</td><td class='col-sm-1' style='height: 21.5px;'  id=Stock"+r[i].productId+">"
							+ r[i].stockMrn + "</td><td class='col-sm-1' style='height: 21.5px;'  id=batch"+r[i].productId+">"
							+ r[i].batchCodeMrn + "</td></tr>";
				}
				divContent = divContent
						+ "</table>"
						+ "</div>";
				$("#productMrnIssueData").html(divContent);
			} 
		 
		 
		 
	 function getCounterDataByProductId(value)
		{
			var from = $("#popup_container2").val();
			var to = $("#popup_container3").val();
		
			if (value != '') 
			{
				var inputs = [];
				inputs.push('ProductId=' + value);
				inputs.push('from=' + from);
				inputs.push('to=' + to);
				var str = inputs.join('&');

				jQuery.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "/EhatEnterprise/pharmacy/report/getDataOfCounterByProductId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						setCounterData(r);
					}
				});
				return true;
			}
		}
		 function setCounterData(result) {
			var r = result;
			var divContent = "";

			divContent = divContent
					+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1><thead><th class='col-sm-1' style='height: 21.5px;'>Product Name</th><th class='col-sm-1' style='height: 21.5px;'>Bill No</th><th class='col-sm-1' style='height: 21.5px;'>Qty</th><th class='col-sm-1' style='height: 21.5px;'>Date</th><th class='col-sm-1' style='height: 21.5px;'>Patient Name</th></thead>";
			for ( var i = 0; i < r.length; i++) {

				divContent = divContent
						+ "<tr><td class='col-sm-1' style='height: 21.5px;'  id=productName"+r[i].productId+">"+ r[i].productNameForCounter + "</td><td class='col-sm-1' style='height: 21.5px;'  id=qty"+r[i].productId+">"
						+ r[i].receiptNoForCounter + "</td><td class='col-sm-1' style='height: 21.5px;'  id=receiptNo"+r[i].productId+">"
						+ r[i].qtyForCounter + "</td><td class='col-sm-1' style='height: 21.5px;'  id=date"+r[i].productId+">"
						+ r[i].dateForCounter + "</td><td class='col-sm-1' style='height: 21.5px;'  id=vendorName"+r[i].productId+">"
						+ r[i].patientNameForCounter + "</td></tr>";
			}
			divContent = divContent
					+ "</table>"
					+ "</div>";

			$("#counterSaleProductData").html(divContent);
		} 
	 
		 function getPatientDataByProductId(value)
			{
				var from = $("#popup_container2").val();
				var to = $("#popup_container3").val();
												
				if (value != '') 
				{
					var inputs = [];
					inputs.push('ProductId=' + value);
					inputs.push('from=' + from);
					inputs.push('to=' + to);
					var str = inputs.join('&');

					jQuery.ajax({
						async : true,
						type : "GET",
						data : str + "&reqType=AJAX",
						url : "/EhatEnterprise/pharmacy/report/getDataOfPatientByProductId",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {

						},
						success : function(r) {
							setPatientData(r);
						}
					});
					return true;
				}
			}
			 function setPatientData(result) {
				var r = result;
				var divContent = "";

				divContent = divContent
						+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1><thead><th class='col-sm-1' style='height: 21.5px;'>Product Name</th><th class='col-sm-1' style='height: 21.5px;'>Bill No</th><th class='col-sm-1' style='height: 21.5px;'>Qty</th><th class='col-sm-1' style='height: 21.5px;'>Date</th><th class='col-sm-1' style='height: 21.5px;'>Patient Name</th></thead>";
				for ( var i = 0; i < r.length; i++) {

					divContent = divContent
							+ "<tr><td class='col-sm-1' style='height: 21.5px;'  id=productName"+r[i].productId+">"+ r[i].productNameForPatient + "</td><td class='col-sm-1' style='height: 21.5px;'  id=qty"+r[i].productId+">"
							+ r[i].receiptNoForPatient + "</td><td class='col-sm-1' style='height: 21.5px;'  id=receiptNo"+r[i].productId+">"
							+ r[i].qtyForPatient + "</td><td class='col-sm-1' style='height: 21.5px;'  id=date"+r[i].productId+">"
							+ r[i].dateForPatient + "</td><td class='col-sm-1' style='height: 21.5px;'  id=vendorName"+r[i].productId+">"
							+ r[i].patientNameForPatient + "</td></tr>";
				}
				divContent = divContent
						+ "</table>"
						+ "</div>";

				$("#patientSaleProductData").html(divContent);
			} 
		 
			 function getIndentDataByProductId(value)
				{
					var from = $("#popup_container2").val();
					var to = $("#popup_container3").val();
													
					if (value != '') 
					{
						var inputs = [];
						inputs.push('ProductId=' + value);
						inputs.push('from=' + from);
						inputs.push('to=' + to);
						var str = inputs.join('&');

						jQuery.ajax({
							async : true,
							type : "GET",
							data : str + "&reqType=AJAX",
							url : "/EhatEnterprise/pharmacy/report/getDataOfIndentByProductId",
							timeout : 1000 * 60 * 5,
							catche : false,
							error : function() {

							},
							success : function(r) {
								setIndentData(r);
							}
						});
						return true;
					}
				}
				 function setIndentData(result) {
					var r = result;
					var divContent = "";

					divContent = divContent
							+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1><thead><th class='col-sm-1' style='height: 21.5px;'>Product Name</th><th class='col-sm-1' style='height: 21.5px;'>Bill No</th><th class='col-sm-1' style='height: 21.5px;'>Qty</th><th class='col-sm-1' style='height: 21.5px;'>Date</th><th class='col-sm-1' style='height: 21.5px;'>Patient Name</th></thead>";
					for ( var i = 0; i < r.length; i++) {

						divContent = divContent
								+ "<tr><td class='col-sm-1' style='height: 21.5px;'  id=productName"+r[i].productId+">"+ r[i].productNameForIndent + "</td><td class='col-sm-1' style='height: 21.5px;'  id=qty"+r[i].productId+">"
								+ r[i].receiptNoForIndent + "</td><td class='col-sm-1' style='height: 21.5px;'  id=receiptNo"+r[i].productId+">"
								+ r[i].qtyForIndent + "</td><td class='col-sm-1' style='height: 21.5px;'  id=date"+r[i].productId+">"
								+ r[i].dateForIndent + "</td><td class='col-sm-1' style='height: 21.5px;'  id=vendorName"+r[i].productId+">"
								+ r[i].patientNameForIndent + "</td></tr>";
					}
					divContent = divContent
							+ "</table>"
							+ "</div>";

					$("#indentSaleProductData").html(divContent);
				}  
			 
				 function getDebitDataByProductId(value)
					{
						var from = $("#popup_container2").val();
						var to = $("#popup_container3").val();
														
						if (value != '') 
						{
							var inputs = [];
							inputs.push('ProductId=' + value);
							inputs.push('from=' + from);
							inputs.push('to=' + to);
							var str = inputs.join('&');

							jQuery.ajax({
								async : true,
								type : "GET",
								data : str + "&reqType=AJAX",
								url : "/EhatEnterprise/pharmacy/report/getDataOfDebitByProductId",
								timeout : 1000 * 60 * 5,
								catche : false,
								error : function() {

								},
								success : function(r) {
									setDebitData(r);
								}
							});
							return true;
						}
					}
					 function setDebitData(result) {
						var r = result;
						var divContent = "";

						divContent = divContent
								+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1><thead><th class='col-sm-1' style='height: 21.5px;'>Product Name</th><th class='col-sm-1' style='height: 21.5px;'>Bill No</th><th class='col-sm-1' style='height: 21.5px;'>Qty</th><th class='col-sm-1' style='height: 21.5px;'>Date</th><th class='col-sm-1' style='height: 21.5px;'>Patient Name</th></thead>";
						for ( var i = 0; i < r.length; i++) {

							divContent = divContent
									+ "<tr><td class='col-sm-1' style='height: 21.5px;'  id=productName"+r[i].productId+">"+ r[i].productNameForDebit + "</td><td class='col-sm-1' style='height: 21.5px;'  id=qty"+r[i].productId+">"
									+ r[i].receiptNoForDebit + "</td><td class='col-sm-1' style='height: 21.5px;'  id=receiptNo"+r[i].productId+">"
									+ r[i].qtyForDebit + "</td><td class='col-sm-1' style='height: 21.5px;'  id=date"+r[i].productId+">"
									+ r[i].dateForDebit + "</td><td class='col-sm-1' style='height: 21.5px;'  id=vendorName"+r[i].productId+">"
									+ r[i].patientNameForDebit + "</td></tr>";
						}
						divContent = divContent
								+ "</table>"
								+ "</div>";

						$("#DebitNoteProductData").html(divContent);
					}  			 
				 
					 
					 function getCreditDataByProductId(value)
						{
							var from = $("#popup_container2").val();
							var to = $("#popup_container3").val();
															
							if (value != '') 
							{
								var inputs = [];
								inputs.push('ProductId=' + value);
								inputs.push('from=' + from);
								inputs.push('to=' + to);
								var str = inputs.join('&');

								jQuery.ajax({
									async : true,
									type : "GET",
									data : str + "&reqType=AJAX",
									url : "/EhatEnterprise/pharmacy/report/getDataOfCreditByProductId",
									timeout : 1000 * 60 * 5,
									catche : false,
									error : function() {

									},
									success : function(r) {
										setCreditData(r);
									}
								});
								return true;
							}
						}
						 function setCreditData(result) {
							var r = result;
							var divContent = "";

							divContent = divContent
									+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1><thead><th class='col-sm-1' style='height: 21.5px;'>Product Name</th><th class='col-sm-1' style='height: 21.5px;'>Bill No</th><th class='col-sm-1' style='height: 21.5px;'>Qty</th><th class='col-sm-1' style='height: 21.5px;'>Date</th><th class='col-sm-1' style='height: 21.5px;'>Patient Name</th></thead>";
							for ( var i = 0; i < r.length; i++) {

								divContent = divContent
										+ "<tr><td class='col-sm-1' style='height: 21.5px;'  id=productName"+r[i].productId+">"+ r[i].productNameForCredit + "</td><td class='col-sm-1' style='height: 21.5px;'  id=qty"+r[i].productId+">"
										+ r[i].receiptNoForCredit + "</td><td class='col-sm-1' style='height: 21.5px;'  id=receiptNo"+r[i].productId+">"
										+ r[i].qtyForCredit + "</td><td class='col-sm-1' style='height: 21.5px;'  id=date"+r[i].productId+">"
										+ r[i].dateForCredit + "</td><td class='col-sm-1' style='height: 21.5px;'  id=vendorName"+r[i].productId+">"
										+ r[i].patientNameForCredit + "</td></tr>";
							}
							divContent = divContent
									+ "</table>"
									+ "</div>";

							$("#CreditNoteProductData").html(divContent);
						}  			 
					 
	function setItemLadgerReport(result)
	{
		var data = result;
		// prepare the data
		var source = {
			datatype : "json",
			datafields : [ {
				name : 'productId',
				type : 'string'
			}, {
				name : 'productName',
				type : 'string'
			},{
				name : 'productUnit',
				type : 'Double'
			}, ],
			localdata : data
		};

		var dataAdapter = new $.jqx.dataAdapter(source, {
			downloadComplete : function(data, status, xhr) {
			},
			loadComplete : function(data) {
			},
			loadError : function(xhr, status, error) {
			}
		});
		$("#shelfWiseExpiryData")
				.jqxGrid(
						{
							width : 300,
							source : dataAdapter,
							columnsresize : true,
							pageable : true,
							showstatusbar : true,
							autoheight : true,
							sortable : true,
							altrows : true,
							enabletooltips : true,
							theme : 'energyblue',
							renderstatusbar : function(statusbar) {
								// appends buttons to the status bar.
								var container = $("<div style='overflow: hidden; position: relative; margin: 5px;'></div>");
								/* var addButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../images/add.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Add</span></div>"); */
								var deleteButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../images/close.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Delete</span></div>");
								var reloadButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../images/refresh.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Reload</span></div>");
								var searchButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../images/search.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Find</span></div>");
								/* container.append(addButton); */
								container.append(deleteButton);
								container.append(reloadButton);
								container.append(searchButton);
								statusbar.append(container);
								/* addButton.jqxButton({
									width : 60,
									height : 20
								});
								 */deleteButton.jqxButton({
									width : 65,
									height : 20
								});
								reloadButton.jqxButton({
									width : 65,
									height : 20
								});
								searchButton.jqxButton({
									width : 50,
									height : 20
								});
								// add new row.
								/* addButton.click(function(event) {
									var datarow = generatedata(1);
									$("#jqxgrid").jqxGrid('addrow', null,
											datarow[0]);
								}); */
								// delete selected row.
								deleteButton
										.click(function(event) {
											var selectedrowindex = $(
													"#shelfWiseExpiryData")
													.jqxGrid(
															'getselectedrowindex');
											var rowscount = $(
													"#shelfWiseExpiryData")
													.jqxGrid(
															'getdatainformation').rowscount;
											var id = $("#jqxgrid").jqxGrid(
													'getrowid',
													selectedrowindex);
											$("#jqxgrid").jqxGrid('deleterow',
													id);
										});
								// reload grid data.
								reloadButton.click(function(event) {
									$("#shelfWiseExpiryData").jqxGrid({
										source : dataAdapter
									});
								});
								// search for a record.
								searchButton
										.click(function(event) {
											var offset = $("#shelfWiseExpiryData")
													.offset();
											$("#jqxwindow").jqxWindow('open');
											$("#jqxwindow").jqxWindow('move',
													offset.left + 30,
													offset.top + 30);
										});
							},
							columns : [ {
								text : 'Product Id',
								datafield : 'productId',
								hidden : true
							}, {
								text : 'Product Name',
								datafield : 'productName',
								width : 150
							}, {
								text : 'Product Unit',
								datafield : 'productUnit',
								width : 150
							}, ],

						});

		$("#shelfWiseExpiryData").bind('rowselect', function(event) {
			var row = event.args.rowindex;
			var datarow = $("#shelfWiseExpiryData").jqxGrid('getrowdata', row);

			 getExpiryDataByProductId(datarow['productId']); 
			 getOpeningStockDataByProductId(datarow['productId']); 
			 
			 getCounterDataByProductId(datarow['productId']); 
			 getPatientDataByProductId(datarow['productId']); 
			 getIndentDataByProductId(datarow['productId']);
			 getCreditDataByProductId(datarow['productId']); 
			 getDebitDataByProductId(datarow['productId']); 
			 getMrnIssueByProductId(datarow['productId']); 
		});

		$("#jqxwindow").jqxWindow({
			resizable : false,
			autoOpen : false,
			width : 210,
			height : 180
		});
		// create find and clear buttons.
		$("#findButton").jqxButton({
			width : 70
		});
		$("#clearButton").jqxButton({
			width : 70
		});
		// create dropdownlist.
		$("#dropdownlist").jqxDropDownList({
			autoDropDownHeight : true,
			selectedIndex : 0,
			width : 300,
			height : 23,
			source : [ 'Product Name' ]
		});
		if (theme != "") {
			$("#inputField").addClass('jqx-input-' + theme);
		}
		// clear filters.
		$("#clearButton").click(function() {
			$("#shelfWiseExpiryData").jqxGrid('clearfilters');
		});
		// find records that match a criteria.
		$("#findButton").click(
				function() {
					$("#shelfWiseExpiryData").jqxGrid('clearfilters');
					var searchColumnIndex = $("#dropdownlist").jqxDropDownList(
							'selectedIndex');
					var datafield = "";
					switch (searchColumnIndex) {
					case 0:
						datafield = "productName";
						break;
					}
					var searchText = $("#inputField").val();
					var filtergroup = new $.jqx.filter();
					var filter_or_operator = 1;
					var filtervalue = searchText;
					var filtercondition = 'contains';
					var filter = filtergroup.createfilter('stringfilter',
							filtervalue, filtercondition);
					filtergroup.addfilter(filter_or_operator, filter);
					$("#shelfWiseExpiryData").jqxGrid('addfilter', datafield,
							filtergroup);
					// apply the filters.
					$("#shelfWiseExpiryData").jqxGrid('applyfilters');
				});
	}
	
	
function getItemLadgerReport() {
		
		var selectedrowindex = $("#shelfWiseExpiryData").jqxGrid('getselectedrowindex');
		
		var datarow = $("#shelfWiseExpiryData").jqxGrid('getrowdata', selectedrowindex);
		
		var productId = datarow['productId'];
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();
		
		var inputs = [];
		inputs.push('from=' + from);
		inputs.push('productId=' + productId);
		inputs.push('to=' + to);
		
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "/EhatEnterprise/pharmacy/report/getItemLedgerReport",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				alert("Report Generated Successfully");
				 setResult(r); 
			}
		});
		return true;

	}

	
	
	function setResult(result) {
		var splitResult = result.split('$');
var selectedrowindex = $("#shelfWiseExpiryData").jqxGrid('getselectedrowindex');
		
		var datarow = $("#shelfWiseExpiryData").jqxGrid('getrowdata', selectedrowindex);
		
		var productId = datarow['productId'];
		$('#setButtons')
				.html(
						"<button onclick='getItemLadgerReport()' class='btn btn-xs btn-success' type='button'>Get"
								+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/pharmacy/report/getItemLedgerReport?productId="+productId+"&from="+$("#popup_container2").val()+"&to="+$("#popup_container3").val()+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
								
								+ "<button style='margin-top: 1px;' type='button' class='btn btn-xs btn-danger' onclick='hidePopUp()' data-dismiss='modal'>Close</button>");
	} 
		
		
	function getDate(milliseconds) {
		var d = new Date(milliseconds);
		var dd = d.getDate();
		var mm = d.getMonth() + 1; // January is 0!

		var yyyy = d.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}

		return yyyy + '-' + mm + '-' + dd;
	}
</script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
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

			<%@include file="Pharma_left_menu_reports.jsp"%>
<%-- 			<%@include file="pharma_report_mis_item_ladger_pop_up.jsp"%> --%>

			<!-- 			content -->

			<input type="hidden" id="userID" />
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
											<li><a href="IPD_OPD_Database.jsp">Pharmacy</a></li>
											<li>Item Ledger Report</li>
										</ul>

									</div>
								</div>
							</div>
							<div id="SearchContent" class="col-md-12-1"></div>

							<div id="SearchContent" class="col-md-12-1"></div>
							<div class="divide-20"></div>
							<div class="col-md-12-1">


								<div class="col-md-12-1">
									<div id="companyReport" class="col-md-5-1"
										style="height: 100%; margin-top: 2%; padding-left: 20px; border: 1px solid #b8b8b8;">

										<div class="col-md-12-1 center" style="margin-bottom: 10px;">
											<h4 id="title">Item Ledger Report</h4>
										</div>

										<div class="col-md-6-1"
											style="margin-top: 0px; margin-bottom: 10px">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>From:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<!-- <input type="text" class="form-control input-SmallText"
													placeholder="From Date" readonly="readonly"
													onclick="displayCalendar(document.getElementById('popup_container3'),'dd/mm/yyyy',this)"
													name="popup_container3" id="popup_container3"> -->
												<input type="text" id="popup_container2" name="txtBillDate"
													class="form-control input-SmallText" readonly
													placeholder="From Date" required
													onfocus="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)">
											</div>
										</div>

										<div class="col-md-6-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>To:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input type="text" class="form-control input-SmallText"
													placeholder="To Date" readonly="readonly"
													onclick="displayCalendar(document.getElementById('popup_container3'),'dd/mm/yyyy',this)"
													name="popup_container3" id="popup_container3">
											</div>
										</div>

										<div class="col-md-12-1"
											style="margin-top: 0px; margin-bottom: 10px">
											<div style="margin-top: 9px;" class="col-md-4-1">
												<B></B>
											</div>
											<div style="margin-top: 9px;" class="col-md-4-1">
												<button class="btn btn-xs btn-success" type="button"
													id="getIndentData" onclick="loadPopUp()"
													style="margin-left: 5%;">Get Data</button>
											</div>

										</div>
									</div>

									<div class="col-md-1-1"
										style="height: 100%; margin-top: 2%; padding-left: 20px;"></div>

								<%-- 	<div class="col-md-6-1"
										style="padding-left: 1%; padding-right: 0%;">
										<div class="box border purple">
											<div class="box-title" style="background-color: #a696ce">
												<h4>
													<i class="fa fa-bitbucket"></i>Item Ladger Summary List
												</h4>
												<div class="tools">
													<a href="#box-config" data-toggle="modal" class="config">
														<i class="fa fa-cog"></i>
													</a>
													<!-- <a href="javascript:;" class="reload">
												<i class="fa fa-refresh"></i>
											</a> -->
													<a href="javascript:;" class="collapse"> <i
														class="fa fa-chevron-up"></i>
													</a> <a href="javascript:;" class="remove"> <i
														class="fa fa-times"></i>
													</a>
												</div>
											</div>
											<div class="box-body " id='well'
												style="height: 350px; overflow-y: Scroll; width: 100%;">

												<div class="col-md-12-1" style="border: 2px solid;"
													id="reportList">
													<div class="col-md-12-1 center"
														style="margin-bottom: 10px;"></div>
													<div class="col-md-12-1"
														style="width: 100%; overflow-y: scroll; height: 400px; max-height: auto;">
														<table border='1'
															class="table table-striped table-bordered header-fixed cf "
															style="Width: 100%; margin-top: 5px;">
															<thead class="cf" style="background: white;">
																<tr>
																	<th>File Id</th>
																	<th>File Name</th>
																	<th>Date</th>
																</tr>
															</thead>
															<tbody>
																<%
																	File folder = new File(
																			request.getRealPath("/ehat_Reports/Pharmacy/purchase/discount/"));
																	File[] listOfFiles = folder.listFiles();

																	if (listOfFiles != null) {
																		for (int i = 0; i < listOfFiles.length; i++) {
																%>
																<tr>
																	<td><%=i + 1%></td>
																	<td>
																		<%
																			if (listOfFiles[i].isFile()) {
																		%> <a
																		href='/EhatEnterprise/ehat_Reports/Pharmacy/purchase/discount/<%=listOfFiles[i].getName()%>'><%=listOfFiles[i].getName()%></a>
																	</td>
																	<td>
																		<%
																			SimpleDateFormat sdf = new SimpleDateFormat(
																								"dd/MM/yyyy HH:mm:ss");

																						/* System.out.println("After Format : " + sdf.format(listOfFiles[i].lastModified())); */
																		%> <%=sdf.format(listOfFiles[i].lastModified())%>
																	</td>
																</tr>
																<%
																	}
																		}
																	}
																%>
															</tbody>
														</table>
													</div>
												</div>

											</div>
										</div>
									</div>
 --%>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div><%@include file="Pharma_Footer.jsp"%></div>
		<div id="userObj" style="display: none;"></div>
		<%-- </c:if> --%>
	</section>
</body>
</html>