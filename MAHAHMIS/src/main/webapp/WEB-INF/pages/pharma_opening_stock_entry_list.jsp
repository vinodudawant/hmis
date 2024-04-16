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
<title>Opening Stock | Pharmacy</title>
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

<!-- CUSTOM SCRIPT -->
<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>


<!-- Application js -->
<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Partywise_Expiry_Debit_Note.js"/>"></script>
	
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/shortcut.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/alertify.js"/>"></script>	
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_shortcut.js"/>"></script>	
<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_opening_stock_entry.js"/>"></script>


<script>
	jQuery(document).ready(function() {
		/* App.setPage("Pharma_Patient_Sales_Bill_Entry");  //Set current page */
		App.init(); //Initialise plugins and elements
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
<script type="text/javascript">	
	
	shortcut.add("ctrl+f",function() {
		openForm('debitNote');
});
	
	
	function splitOpeningStockShelfContent(content) {
		if (content != "") {
			var arr = content.split("-");
			$('#txtPartyName').val(arr[0]);
			if (arr.length > 1) {
				$('#hiddenVendorId').val(arr[1]);
			}
		} else {
			$('#hiddenVendorId').val(0);
		}
	}
	
	function splitProductName(content) 
	{
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
	
	function searchOpeningStock(id) {
		
		var inputs = [];
		inputs.push('shelfId=' + id);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/openingStockEntry/getOpeningStockByShlef",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				/* alert("error"); */
			},
			success : function(r) {
				if(r=="")
				{
				alert("Record not found!");
				$("#txtPartyName").val('');
				}
				else
				{	
				$("#hiddenVendorId").val('');
				setTableContent(r);
				}
			}
		});

		return true;
	}	
	
function searchByProductName(id) {
		
		var inputs = [];
		inputs.push('productId=' + id);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "getOpeningStockByProduct",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				/* alert("error"); */
			},
			success : function(r) {
				if(r=="")
				{
				alert("Record not found!");
				$("#txtProductName").val('');
				}
				else
				{	
				$("#hiddenProductId").val('');
				setTableContent(r);
				}
			}
		});

		return true;
	}	
	
	function setTableContent(result) {
		var r = result;
		var divContent = "";
		for ( var i = 0; i < r.length; i++) {
			var debitNoteDate = getDate(r[i].debitNoteDate);
			var openingId=r[i].openingStockId ;
			var productName=r[i].productName ;
			divContent = divContent
					+ " <tr><td class='col-md-1 center'>"
					+ (i + 1)
					+ " <input type='hidden' id='openingStockId"
					+ r[i].openingStockId
					+ "' value='"
					+ r[i].openingStockId
					+ "'></td><td class='col-md-2 center'>"
					+ r[i].shelfName
					+ "<input type='hidden' id='podocId"
					+ r[i].openingStockId
					+ "' value='"
					+ r[i].shelfName
					+ "'></td><td class='col-md-2 center'>"
					+ r[i].productName
					+ "<input type='hidden' id='debitNoteVendorName"
					+ r[i].openingStockId
					+ "' value='"
					+ r[i].productName
					+ "'></td><td class='col-md-2 center'>"
					+ r[i].addDate
					+ "<input type='hidden' id='debitNoteDate"
					+ r[i].openingStockId
					+ "' value='"
					+ r[i].addDate
					+ "'></td>"
			                     
					/*  + "<td class='col-md-2 center'><a id='btnPrint"
					+ r[i].openingStockId 
					+"' class='btn btn-xs btn-success'   href='/EhatEnterprise/pharmacy/openingStockEntry/printView?openingStockId="+r[i].openingStockId+"&productName="+r[i].productName+"'"
					+ "'> <i class='fa fa-print'></i></td>"  */
					
					+ "<td class='col-md-2 center'><a class='btn btn-xs btn-success' id='btnPrint"
					+ r[i].openingStockId +"'   onclick='openingStockPrint("+r[i].openingStockId+" ,\""+r[i].productName+"\")'>   <i class='fa fa-print'></i></td>" 
					+ "<td class='col-md-2 center'><a class='btn btn-xs btn-success' id='btnBarcode"+ r[i].openingStockId+"' onclick='readBarcode("+r[i].batchId+" ,"+r[i].qty+",\""+r[i].productName+"\",\""+r[i].batchCode+"\")'><i class='fa fa-barcode'></i></td>"

					+ "<td class='col-md-2 center'> <button id='btnDelete2"
					+ r[i].openingStockId
					+ "' class='btn btn-xs btn-success'  onclick='deleteOpeningStock("
					+ r[i].openingStockId
					+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
		}

		$('#divProductOrderList').html(divContent);
	}

	function validateSearch()
	{
	if($('#txtPartyName').val()!=null && $('#txtPartyName').val()!="")
		{
		searchOpeningStock($("#hiddenVendorId").val());
		}
	else
		{
		alert("Enter Shelf Name in Search Box");
	    $('#txtPartyName').focus();
		}
	
	}
	
	function validateSearchByProductName()
	{
	if($('#txtProductName').val()!=null && $('#txtProductName').val()!="")
		{
		searchByProductName($("#hiddenProductId").val());
		}
	else
		{
		alert("Enter product Name in Search Box");
	    $('#txtProductName').focus();
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
</head>


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
			<%@include file="Pharma_debit_note_pop_up_list.jsp" %>
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
										<!-- 	<li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<div class="li pull-right" style="margin-left: 9px;"><a
												href="../../pharmacy/openingStockEntry/view-frm"
												class="btn btn-xs btn-info">New Opening Stock</a></li>
												</div>
										</ul>

									</div>
								</div>
							</div>
							<!-- /Common -->

							<div id="SearchContent" class="col-md-12-1">
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1-1'>Shelf Name</div>
								<div class='col-md-2-1'>
									<input type="text" id='txtPartyName' name='txtPartyName'
										placeholder="Shelf Name Here"
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitOpeningStockShelfContent($('#txtPartyName').val())" /> <input
										type="hidden" id="hiddenVendorId" />

								</div>
								<div class='col-md-2-1'
									style="margin-left: 9px; margin-top: -10px;">
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
														url : "../../pharmacy/shelf/autoSuggestionShelfNames",
														timeout : 1000 * 60 * 5,
														catche : false,
														error : function() {
															alert('error');
														},
														success : function(r) {
															var availableTags = [];
															for(var i=0;i<r.length;i++){
																availableTags[i]=r[i].shelfName+"-"+r[i].shelfId;
															}
															response(availableTags);
														}
													});
											 }																						
										});	
										</script>

								</div>
								<div class='col-md-1-1'>Product Name</div>
								<div class='col-md-2-1'>
									<input type="text" id='txtProductName' name='txtProductName'
										placeholder="Product Name Here"
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitProductName($('#txtProductName').val())" /> <input
										type="hidden" id="hiddenProductId" />

								</div>
								<div class='col-md-2-1'
									style="margin-left: 9px; margin-top: -10px;">
									<input id='' type='button' value='Search' class='edit'
										onclick='validateSearchByProductName();' />

									<script type="text/javascript">
											$("#txtProductName").autocomplete({
												 source : function(request, response) {
												 
														var findingName = $("#txtProductName").val();
														var inputs = [];
														inputs.push('letter=' + findingName);
														var str = inputs.join('&');
	
														jQuery.ajax({
															async : true,
															type : "GET",
															data : str + "&reqType=AJAX",
															url : "../../pharmacy/product/autoSuggestionProduct",
															timeout : 1000 * 60 * 5,
															catche : false,
															 error : function(event, request, settings) { 
																 alert("error");
													 		}, 
															success : function(r) {
																var availableTags = [];
																for(var i=0;i<r.length;i++)
																	{
																		availableTags[i]=r[i].productName+"$$"+r[i].productId;
																	
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
											<th style="height: 21.5px;" class="col-md-2 center"><div>Shelf Name</div></th>
											<th style="height: 21.5px;" class="col-md-2 center"><div>Product
													Name</div></th>
											<th style="height: 21.5px;" class="col-md-2 center"><div>Date</div></th>
											<th style="height: 21.5px;" class="col-md-2 center"><div>Print</div></th>
											<th style="height: 21.5px;" class="col-md-2 center"><div>Barcode</div></th>
											<th style="height: 21.5px;" class="col-md-1 center"><div>Delete</div></th>
										</tr>
									</thead>
								
											<tbody id="divProductOrderList">
												<c:forEach items="${openingStock}" var="row"
													varStatus="count">
													<tr>
														<td class="col-md-1 center">${(count.index)+1} <input
															type="hidden" id="debitNoteId${row.openingStockId}"
															value="${row.openingStockId}">
														</td>
														<td class="col-md-2 center">${row.shelfName}<input
															type="hidden" id="debitNoteDocId${row.openingStockId}"
															value="${row.shelfName}"></td>

														<td class="col-md-2 center">${row.productName
															}<input type="hidden"
															id="debitNoteVendorName${row.openingStockId}"
															value="${row.productName}">
														</td>
														
														<%-- <td class="col-md-2 center"><c:set var="now1"
																value="${row.addDate}" /> <fmt:formatDate
																value="${now1}" var="parsedDebitNoteDate" pattern="dd/MM/yyyy" />
															<c:out value="${parsedDebitNoteDate}"></c:out> <input
															type="hidden" id="poDate${row.openingStockId}"
															value="<c:out value="${parsedEndDate}"></c:out>">
														</td> --%>
														
														<td class="col-md-2 center">${row.addDate
															}<input type="hidden"
															id="debitNoteVendorName${row.openingStockId}"
															value="${row.addDate}">
														</td>
														
													<%-- 	<td class="col-md-2 center"><button
																id="btnPrint${row.openingStockId}" class="btn btn-xs btn-success"
																onclick="" value="PRINT">
																<i class="fa fa-edit"></i>
															</button></td> --%>
														
                                                            
													<%-- 	<td class="col-md-2 center"><a
														id="btnPrint${row.openingStockId}" class="btn btn-xs btn-success"
														href="/EhatEnterprise/pharmacy/openingStockEntry/printView?openingStockId=${row.openingStockId}&productName=${row.productName}">
															<i class="fa fa-print"></i>
													</a></td> --%>
													
													
														<td class="col-md-2 center"><button
														id="btnPrint${row.openingStockId}" class="btn btn-xs btn-success"
														onclick='openingStockPrint("  ${row.openingStockId} ","${row.productName} ")'>
															<i class="fa fa-print"></i>
													</button></td> 
													
													<td class="col-md-1 center"><a
														id="btnBarcode${row.openingStockId}" class="btn btn-xs btn-success" onclick='readBarcode(${row.batchId},${row.qty},"${row.productName}","${row.batchCode}")'>
															<i class="fa fa-barcode" aria-hidden="true"></i>
													</a></td>
														
														<td class="col-md-1 center">
															<button id="btnDelete2" class="btn btn-xs btn-success"
																onclick="deleteOpeningStock(${row.openingStockId});" value="DELETE">
																<i class="fa fa-trash-o"></i>
															</button>
														</td>
													</tr>
												</c:forEach>
											</tbody>
										</table>
									</div>
								</div>
								
								<div class="modal fade bs-example-modal-lg" id="viewDocModal"
																	tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
																	aria-hidden="true">
																	<div class="modal-dialog modal-dialog modal-lg">
																		<div class="modal-content">
																			<div class="modal-header">
																				<button type="button" class="close" data-dismiss="modal"
																					aria-label="Close">
																					<span aria-hidden="true">&times;</span>
																				</button>
																				<div class="row">
																					<div class="col-md-4 col-xs-11">
																						<h3 class="modal-title" id="myModalLabel">View document</h3>
																					</div><br><br>
																					<div class="col-md-6 col-xs-11">
																						<h5> </h5><h6 id="documentComment"> </h6>
																					</div>
																				</div>
																			</div>
																			<div class="modal-body">
																				<iframe id="ViewDocumemnt" src="" width="100%" height="530px"></iframe>
																			</div>
																		</div>
																	</div>
																</div>
							</div>
						</div>
					</div>
				</div>
			
			<script type="text/javascript">
				
			</script>
			<%@include file="Pharma_Footer.jsp"%></div>

	</section>
</body>
</html>