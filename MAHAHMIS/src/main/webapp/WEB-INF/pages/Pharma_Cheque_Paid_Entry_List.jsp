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
<title>E-Hat | Pharmacy</title>
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
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_purchase.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_cheque_paid_entry.js"/>"></script>
<!-- CUSTOM SCRIPT -->
<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/alertify.js"/>"></script>
<script type="text/javascript">
	
	jQuery(document).ajaxStart(function() {
		//alert("hi ajax start");
		$("body").addClass("loading");
	});

	jQuery(document).ajaxStop(function() {
		$("body").removeClass("loading");
		//alert("hi ajax stop");
	});
</script>
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
		url('../../pharmacy/resources/images/ajax_loader_blue_64.gif')
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
		/* App.setPage("Pharma_Patient_Sales_Bill_Entry");  //Set current page */
		App.init(); //Initialise plugins and elements
	});
</script>
<script>
function reset () {
	$("#toggleCSS").attr("href", "<c:url value="../../pharmacy/resources/alertify/alertify.default.css"/>");
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
	if($('#txtPartyName').val()!=null && $('#txtPartyName').val()!="")
	{ 
		searchChequePaid($("#hiddenVendorId").val());
	}
	else
	{	
		alert("Enter Vendor Name in Search Box");
	    $('#txtPartyName').focus();
	}

}
</script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>
</head>


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
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><a href="IPD_OPD_Database.jsp">Pharmacy</a></li>
											<li>Vendor payment</li>
											<li class="pull-right">
												<div class='col-md-2-1 pull-left' style="margin-top: 1px;">
													<a href="../../pharmacy/chequePaidEntry/view-frm"
														class="btn btn-info">New Cheque Paid Entry</a>
												</div>
											</li>
										</ul>

									</div>
								</div>
							</div>
							<!-- /Common -->

							<div id="SearchContent" class="col-md-12-1">
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1-1'>Vendor Name</div>
								<div class='col-md-2-1'>
									<input type="text" id='txtPartyName' name='txtPartyName'
										placeholder="Vendor Name Here"
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitChequePaidEntry($('#txtPartyName').val())" /> <input
										type="hidden" id="hiddenVendorId" />

								</div>
								<div class='col-md-2-1'
									style="margin-left: 9px; margin-top: -11px;">
									<input id='' type='button' value='Search' class='edit'
										onclick='validateSearch();' />

									<script type="text/javascript">
										$("#txtPartyName").autocomplete({
											 source : function(request, response) {
											 
													var findingName = $("#txtPartyName").val();
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
								<div class='col-md-2-1 pull-right'>
									<a href="../../pharmacy/purchase/view-frm"
										class="btn btn-info">Place new order</a>
								</div>


							</div>
							<div class="divide-20"></div>

							<div class="col-md-11-1"
								style="height: 5%; max-height: auto; margin-left: 0%;">
								<table
									class="table table-striped table-bordered header-fixed cf "
									style="margin-top: 10px; width: 100%;">
									<thead class="cf" style="background: white;">
										<tr>
											<th style="height: 21.5px;" class="col-md-1 center"><div>Sr.</div></th>

											<th style="height: 21.5px;" class="col-md-2 center"><div>Vendor
													Name</div></th>
											<th style="height: 21.5px;" class="col-md-2 center"><div>Amount</div></th>
											<th style="height: 21.5px;" class="col-md-2 center"><div>Bill
													Date</div></th>
											<th style="height: 21.5px;" class="col-md-2 center"><div>Print</div></th>
											<!-- <th style="height: 21.5px;" class="col-md-1 center"><div>Edit</div></th> -->
											<th style="height: 21.5px;" class="col-md-1 center"><div>Delete</div></th>
										</tr>
									</thead>
								</table>
								<div class="col-md-12-1"
									style="margin-top: -15px; padding-left: 0%;">
									<div class="container-main col-md-7-1"
										style="overflow-y: scroll; height: 450px; maxheight: auto; border: 1px solid #b8b8b8;">
										<table
											class="table table-striped table-bordered table condensed cf">
											<tbody id="divChequePaidList">
												<c:forEach items="${chequePaidMasters}" var="row"
													varStatus="count">
													<tr>
														<td class="col-md-1 center">${(count.index)+1} <input
															type="hidden" id="chequePaidId${row.chequePaidId }"
															value="${row.chequePaidId }">
														</td>

														<td class="col-md-2 center">${row.vendorMaster.vendorName
															}<input type="hidden" id="vendorName${row.chequePaidId }"
															value="${row.vendorMaster.vendorName }">
														</td>

														<td class="col-md-2 center">${row.chequePaidAmt }<input
															type="hidden" id="chequePaidAmt${row.chequePaidId }"
															value="${row.chequePaidAmt}">
														</td>


														<td class="col-md-2 center"><c:set var="purBillDate"
																value="${row.chequePaidDate}" /> <fmt:formatDate
																value="${purBillDate}" var="parsedBillDate"
																pattern="dd/MM/yyyy" /> <c:out
																value="${parsedBillDate}"></c:out> <input type="hidden"
															id="chequePaidDate${row.chequePaidId}"
															value="<c:out value="${parsedBillDate}"></c:out>">
														</td>

													<%-- 	<td class="col-md-2 center"><a
															id="btnPrint${row.chequePaidId}"
															class="btn btn-xs btn-success"
															href="/EhatEnterprise/pharmacy/chequePaidEntry/printView?chequePaidId=${row.chequePaidId}">
																<i class="fa fa-print"></i>
														</a></td> --%>
														
														<td class="col-md-2 center"><button
															id="btnPrint${row.chequePaidId}"
															class="btn btn-xs btn-success"
															onclick="chequePaidPrint(${row.chequePaidId});">
																<i class="fa fa-print"></i>
														</button></td>
														
														<%-- <td class="col-md-1 center"><a
															id="btnEdit${row.chequePaidId}"
															class="btn btn-xs btn-success"
															href="/EhatEnterprise/pharmacy/cashPaidEntry/edit-view?chequePaidId=${row.chequePaidId}">
																<i class="fa fa-edit"></i>
														</a></td> --%>
														<td class="col-md-1 center">
															<button id="btnDelete2" class="btn btn-xs btn-success"
																onclick="deleteChequePaidEntry(${row.chequePaidId})"
																value="DELETE">
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
			<div class="ajaxmodal">
				<!-- Place at bottom of page -->
			</div>
			<script type="text/javascript">
				
			</script>
			<%@include file="Pharma_Footer.jsp"%></div>
	</section>
</body>
</html>