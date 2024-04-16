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
<title>Correction Rate List| Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<!-- /for Developers  -->

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_shortcut.js"/>"></script> 
<%@include file="pharma_header.jsp"%>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_purchase_batch_popup.js"/>"></script>
	<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_correction_in_rate.js"/>"></script>
	<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_purchase.js"/>"></script>
<script>

<!-- Application js -->
<script>
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script> 

<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Counter_Sale.js"/>"></script>
<%@include file="pharma_header.jsp"%>
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
		url('../.././pharma-resources/images/ajax_loader_blue_64.gif')
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

jQuery(document).ready(function() {
	App.init(); //Initialise plugins and elements
});
	shortcut.add("ctrl+f",function() {
		openForm('counter');
});
	
		shortcut.add("Ctrl+l",function() {
			backToList('correctionRateList');
		});
	
	
	
</script>
<script>
function reset () {
	$("#toggleCSS").attr("href", "<c:url value="../.././pharma-resources/alertify/alertify.default.css"/>");
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
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>
<script>
function validateSearch()
{
	if($('#searchBox').val()!=null && $('#searchBox').val()!="")
	{ 
		searchCorrectionRate($("#hiddenProductId").val());
	}
	else
	{	
		alert("Enter Product Name in Search Box");
	    $('#searchBox').focus();
	}

}
</script>
<!-- <script>
function validateSearch1()
{
	if($('#searchBox1').val()!=null && $('#searchBox1').val()!="")
	{ 
		searchProductName($("#searchBox1").val());
	}
	else
	{	
		alert("Enter Product Name");
	    $('#searchBox1').focus();
	}

}
</script> -->

</head>


<body style="background: white ! important;">
	<%@include file="HelpMenu.jsp"%>
	<section id="page">
		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
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
												<li><i class="fa fa-home"></i> <a href="../../Dashboard.jsp">Home</a></li>
												<li><a href="IPD_OPD_Database.jsp">Pharmacy</a></li>
												<li>Counter Sale</li>
											<li class="pull-right">
												<div class='col-md-2-1 pull-left' style="margin-top:1px;">
													<a href="../../pharmacy/correctionRate/view"
														class="btn btn-info">New Correction Rate Entry(Ctrl+f)</a>
												</div>
											</li>
										</ul>

									</div>
								</div>
							</div>
							<!-- /Common -->

					 <div id="SearchContent" class="col-md-12-1" style="margin-bottom:32px; display: none;" ">
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1-1'>Product Name</div>
								<div class='col-md-2-1'>
									<input type="text" id='searchBox' name='searchBox'
										placeholder="Product Name Here"
									class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitCounterSaleBill($('#searchBox').val())" /> <input
										type="hidden" id="hiddenProductId" />

								</div>
								<div class='col-md-2-1' style="margin-left: 9px;margin-top:-10px;">
									<input id='' type='button' value='Search' class='edit'
										onclick='validateSearch();' style="display: none;" />

									<script type="text/javascript">
										$("#searchBox").autocomplete({
											 source : function(request, response) {
											 
													var findingName = $("#searchBox").val();
													var inputs = [];
													inputs.push('letter=' + findingName);
													var str = inputs.join('&');

													jQuery.ajax({
														async : true,
														type : "GET",
														data : str + "&reqType=AJAX",
														url : "../../pharmacy/correctionRate/autoSuggestionProduct",
														timeout : 1000 * 60 * 5,
														catche : false,
														error : function() {
															alert('error');
														},
														success : function(r) {
															var availableTags = [];
															for(var i=0;i<r.length;i++){
																availableTags[i]=r[i].productName;
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

							<!--  -->
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
                                            <th style="height: 21.5px;" class="col-md-1 center"><div>Product Name</div></th>		
											<th style="height: 21.5px;" class="col-md-2 center"><div>updatedBatch Code</div></th>	
											<th style="height: 21.5px;" class="col-md-2 center"><div>oldBatch Code</div></th>																						
											<th style="height: 21.5px;" class="col-md-1 center"><div>Updated M.R.P</div></th>	
											<th style="height: 21.5px;" class="col-md-1 center"><div>Old M.R.P</div></th>	
											<th style="height: 21.5px;" class="col-md-1 center"><div>Updated T.Rate</div></th>	
												<th style="height: 21.5px;" class="col-md-1 center"><div>Old T.Rate</div></th>		
											<th style="height: 21.5px;" class="col-md-1 center"><div>Updated Pur.Rate</div></th>
											<th style="height: 21.5px;" class="col-md-1 center"><div>Old Pur.Rate</div></th>
										<th style="height: 21.5px;" class="col-md-1 center"><div>updatdDate</div></th>											
											<!-- <th style="height: 21.5px;" class="col-md-1 center"><div>Edit</div></th> -->
										</tr>
									</thead>
								
											<tbody id="divCorrectionRateList">
												<c:forEach items="${CorrectionRateBackToList}" var="row"
													varStatus="count">
													<tr>
														<td class="col-md-1 center">${(count.index)+1} <input
															type="hidden" id="productId${row.productId}"
															value="${row.productId}">
														</td>
                                                                                                                      												
														<td class="col-md-2 center">${row.productName}
															<input type="hidden"
															id="productNameId${row.productId}"
															value="${row.productName}">
														</td>
														
														<td class="col-md-1 center">${row.batchCode}<input
															type="hidden" id="batchCodeId${row.batchCode}"
															value="${row.batchCode}"></td>
															
															<td class="col-md-1 center">${row.oldBatchCode}<input
															type="hidden" id="batchCodeIdOld${row.purCorBatchId}"
															value="${row.oldBatchCode}"></td>

														<td class="col-md-1 center">${row.mrp}<input
															type="hidden" id="mrpId${row.productId}"
															value="${row.mrp}"></td>
															
															<td class="col-md-1 center">${row.purCorMrp}<input
															type="hidden" id="mrpIdOld${row.productId}"
															value="${row.purCorMrp}"></td>
															
															<td class="col-md-1 center">${row.billRate}<input
															type="hidden" id="billRateId${row.productId}"
															value="${row.billRate}"></td>
															
															<td class="col-md-1 center">${row.purBillRate}<input
															type="hidden" id="billRateIdOld${row.productId}"
															value="${row.purBillRate}"></td>
															
															<td class="col-md-1 center">${row.purRate}<input
															type="hidden" id="purRateId${row.productId}"
															value="${row.purRate}"></td>
															
															<td class="col-md-1 center">${row.oldPurRate}<input
															type="hidden" id="purRateIdOld${row.productId}"
															value="${row.oldPurRate}"></td>
															
															<td class="col-md-1 center">${row.updateDate}<input
															type="hidden" id="updateDateId${row.productId}"
															value="${row.updateDate}"></td>															
																																																																																																	                                                       
                                                         <%--  <td class="col-md-2 center"><a
															id="CorrectionRateEdit${row.productId}" class="btn btn-xs btn-success"
															href="../../pharmacy/correctionRate/edit-view?productId=${row.productId}"><i
																class="fa fa-edit"></i></a></td>
															</td>	 --%>												
													</tr>
												</c:forEach>
											</tbody>
										</table>
									</div>
								</div>
								<!--  -->
							</div>
						</div>
					</div>
				</div>

			<script type="text/javascript">
				
			</script>
			<div class="ajaxmodal">
			<!-- Place at bottom of page -->
		</div>
			<%@include file="Pharma_Footer.jsp"%></div>
	</section>
</body>

<input type="hidden" id="productId" value="0">
</html>




