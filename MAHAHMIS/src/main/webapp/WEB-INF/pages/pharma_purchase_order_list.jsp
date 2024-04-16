<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Purchase Order | Pharmacy</title>
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
	src="<c:url value="../.././pharma-resources/jquery/jquery-jtemplates.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jquery-validate/additional-methods.min.js"/>"></script>
<!-- /for Developers  -->



<!-- Application js -->
<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_po.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_shortcut.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/alertify.js"/>"></script>
<!-- CUSTOM SCRIPT -->
<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script> 
<%@include file="pharma_header.jsp"%>
<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_po.js"/>"></script>
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
		url('/pharma-resources/images/ajax_loader_blue_64.gif')
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
</head>
<script>
	jQuery(document).ready(function() {
		/* App.setPage("Pharma_Patient_Sales_Bill_Entry");  //Set current page */
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
</script>

<script type="text/javascript">	
	shortcut.add("ctrl+f",function() {
		openForm('po');
});
	
</script>
<script>
function reset () {
	$("#toggleCSS").attr("href", "<c:url value="/pharma-resources/alertify/alertify.default.css"/>");
	alertify.set({
		notifier:{
	        // auto-dismiss wait time (in seconds)  
	        delay:5,
	        // default position
	        position:'top-right'
	    },	
	labels : {
	ok     : "OK",
	cancel : "Cancel"
	
	},
	delay : 5000,
	buttonReverse : false,
	buttonFocus   : "ok"
	
	});
	
}
</script>
<script>
function validateSearch()
{
	if($('#txtPartyName1').val()!=null && $('#txtPartyName1').val()!="")
	{ 
		searchPurchaseOrder($("#hiddenVendorId1").val());
	}
	else
	{	
		alert("Enter Vendor Name in Search Box");
	    $('#txtPartyName1').focus();
	}

}
</script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>
<body style="background: white ! important;">
	<%@include file="HelpMenu.jsp"%>
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
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><a href="IPD_OPD_Database.jsp">Pharmacy</a></li>
											<li>Purchase Order</li>
											<div class="li pull-right" style="margin-left: 9px;">
												<a href="../../pharmacy/po/view-frm"
													class="btn btn-xs btn-info">Place new order</a>
												</li>
										</ul>

									</div>
								</div>
							</div>
							<!-- /Common -->

							<div id="SearchContent" class="col-md-12-1"
								style="margin-bottom: 32px;">
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1-1'>Vendor Name</div>
								<div class='col-md-2-1'>
									<input type="text" id='txtPartyName1' name='txtPartyName1'
										placeholder="Vendor Name Here"
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitVendorContentPurchaseOrder($('#txtPartyName1').val())" />
									<input type="hidden" id="hiddenVendorId1" />

								</div>
								<div class='col-md-2-1'
									style="margin-left: 9px; margin-top: -10px;">
									<input id='' type='button' value='Search' class='edit'
										onclick='validateSearch();' />

									<script type="text/javascript">
										$("#txtPartyName1").autocomplete({
											 source : function(request, response) {
											 
													var findingName = $("#txtPartyName1").val();
													var inputs = [];
													inputs.push('letter=' + findingName);
													var str = inputs.join('&');

													jQuery.ajax({
														async : true,
														type : "GET",
														data : str + "&reqType=AJAX",
														url : "../../pharmacy/vendor/autoSuggestionVendorWithDeleteVendor",
														timeout : 1000 * 60 * 5,
														catche : false,
														error : function() {
															alert('error');
														},
														success : function(r) {
															var availableTags = [];
															for(var i=0;i<r.length;i++){
																availableTags[i]=r[i].vendorName+"-"+r[i].vendorId;
															}
															response(availableTags);
														}
													});
											 }																						
										});	
										</script>

								</div>



							</div>
							<div class="divide-20"></div>

							<div class="col-md-11-1"
								style="height: 5%; max-height: auto; margin-left: 0%;">
								<div class="container-main col-md-7-1"
									style="overflow-y: scroll; height: 450px; maxheight: auto; border: 1px solid #b8b8b8;">
									<table
										class="table table-striped table-bordered header-fixed cf "
										style="margin-top: 10px; width: 100%;">
										<thead class="cf" style="background: white;">
											<tr>
												<th style="height: 21.5px;" class="col-md-1 center"><div>Sr.</div></th>
												<th style="height: 21.5px;" class="col-md-1 center"><div>PO
														No</div></th>
												<th style="height: 21.5px;" class="col-md-2 center"><div>Vou
														Number</div></th>
												<th style="height: 21.5px;" class="col-md-2 center"><div>Vendor
														Name</div></th>
												<th style="height: 21.5px;" class="col-md-2 center"><div>Date</div></th>
												<th style="height: 21.5px;" class="col-md-2 center"><div>Product
														Count</div></th>
												<th style="height: 21.5px;" class="col-md-2 center"><div>Status</div></th>
												<th style="height: 21.5px;" class="col-md-2 center"><div>Print</div></th>
												<th style="height: 21.5px;" class="col-md-1 center"><div>Edit</div></th>
												<th style="height: 21.5px;" class="col-md-1 center"><div>Delete</div></th>
											</tr>
										</thead>

										<tbody id="divProductOrderList">
											<c:forEach items="${ltPoMasters}" var="row" varStatus="count">
												<tr>
													<td class="col-md-1 center">${(count.index)+1} <input
														type="hidden" id="poId${row.poId}" value="${row.poId}">
													</td>
													 <td style="display: none" class="col-md-1 center">${row.poId} <input
														type="hidden" id="poId${row.poId}" value="${row.poId}">
													</td> 
													
													<td class="col-md-1 center">${row.poId} <input
														type="hidden" id="invoiceId${row.poId}" value="${row.poDeleteFlag}">
													</td>

													<td class="col-md-2 center">${row.podocId}<input
														type="hidden" id="poDocId${row.poId}"
														value="${row.podocId}"></td>

													<td class="col-md-2 center">${row.vendor_name
														}<input type="hidden" id="poVendorName${row.poId}"
														value="${row.vendorMaster.vendorId}">
													</td>
													<td style="display: none" id="txtCredit">${row.vendorMaster.vendorId}
														<input type="hidden" id="povendorId${row.poId}"
														value="${row.vendorMaster.vendorId}">
													</td>

													<td class="col-md-2 center"><c:set var="now1"
															value="${row.poDate}" /> <fmt:formatDate value="${now1}"
															var="parsedPoDate" pattern="dd/MM/yyyy" /> <c:out
															value="${parsedPoDate}"></c:out> <input type="hidden"
														id="poDate${row.poId}"
														value="<c:out value="${parsedEndDate}"></c:out>">
													</td>
													<td class="col-md-2 center">${row.poProductCount}<input
														type="hidden" id="ProductCount${row.poId}"
														value="${row.poProductCount}"></td>

													<td class="col-md-2 center">${row.poStatus}<input
														type="hidden" id="poStatus${row.poId}"
														value="${row.poStatus}"></td>

												<%-- 	<td class="col-md-2 center">
														<button
																id="btnPrint${row.poId}" class="btn btn-xs btn-success"
																onclick="edit(${row.poId})" value="PRINT">
																<i class="fa fa-edit"></i>
															</button> <a id="btnPrint${row.poId}"
														class="btn btn-xs btn-success"
														href="/EhatEnterprise/pharmacy/po/printView?poId=${row.poId}">
															<i class="fa fa-print"></i>
													</a>
													</td> --%>
													
													
													<td class="col-md-2 center">
													 <a id="btnPrint${row.poId}"
														class="btn btn-xs btn-success"
														onclick="purchaseOrderPrint(${row.poId});">
															<i class="fa fa-print"></i>
													</a>
													</td>
													<c:choose>
														<c:when test="${row.poStatus=='pending'}">
   															<td class="col-md-2 center"><a
															id="btnEdit${row.poId}" class="btn btn-xs btn-success"
															href="../../pharmacy/po/edit-view?poId=${row.poId}"><i
																class="fa fa-edit"></i></a></td>
  														</c:when>
														<c:otherwise>
 															<td class="col-md-2 center"><a disabled="true"
															id="btnEdit${row.poId}" class="btn btn-xs btn-success"
															href="../../pharmacy/po/edit-view?poId=${row.poId}"><i
																class="fa fa-edit" ></i></a></td>
 														</c:otherwise>
													</c:choose>

													<td class="col-md-1 center">
														<button id="btnDelete2" class="btn btn-xs btn-success"
															onclick="deletePO(${row.poId})" value="DELETE">
															<i class="fa fa-trash-o"></i>
														</button>
													</td>
												</tr>
											</c:forEach>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<%-- <input type="hidden" id="pageName"
				value="<%=request.getParameter("pagename")%>"></input>
			<div style="display: none; display: none;" id="divMyObj"></div>
			<div style="display: none;" id="divForFeesObj"></div>
			<div style="display: none;" id="divForTestObj"></div>
			<div style="display: none;" id="divForOpObj"></div>
			<div style="display: none;" id="divSpSpDisHide"></div>
			<div style="display: none;" id="SponsoredDetailsContent"></div>
			<input type='hidden' id='queryType' value='' /> --%>
		<script type="text/javascript">
				
			</script>
		<%@include file="Pharma_Footer.jsp"%></div>

	</section>
	<div class="ajaxmodal">
		<!-- Place at bottom of page -->
	</div>
</body>
</html>
