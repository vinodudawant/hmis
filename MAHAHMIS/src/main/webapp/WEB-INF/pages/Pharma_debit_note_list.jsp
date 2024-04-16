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
<title>Debit Note Return | Pharmacy</title>
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
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Debit_Notes.js"/>"></script>
	
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/shortcut.js"/>"></script>
	
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_shortcut.js"/>"></script>
		
<!-- CUSTOM SCRIPT -->
<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/alertify.js"/>"></script>
<script>
	jQuery(document).ready(function() {
		/* App.setPage("Pharma_Patient_Sales_Bill_Entry");  //Set current page */
		App.init(); //Initialise plugins and elements
	});
</script>
<script type="text/javascript">	
	shortcut.add("ctrl+f",function() {
		openForm('debitNote');
});
	
</script>
<script>
function validateSearch()
{
	if($('#txtPartyName').val()!=null && $('#txtPartyName').val()!="")
	{ 
		searchDebitNote($("#hiddenVendorId").val());
	}
	else
	{	
		alert("Enter Vendor Name in Search Box");
	    $('#txtPartyName').focus();
	}

}
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
											<li>Date:<%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="../../Dashboard.jsp">Home</a>
												</li>
												<li><a href="../../pharmacy/pharmacy/transaction">Pharmacy</a></li>
												<li>Debit Note</li>
										<!-- 	<li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<div class="li pull-right" style="margin-left: 9px;"><a
												href="../../pharmacy/debitNote/view-frm"
												class="btn btn-xs btn-info">New Debit Note</a></div>
										</ul>

									</div>
								</div>
							</div>
							<!-- /Common -->

							<div id="SearchContent" class="col-md-12-1" style="margin-bottom:32px;">
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1-1'>Vendor Name</div>
								<div class='col-md-2-1'>
									<input type="text" id='txtPartyName' name='txtPartyName'
										placeholder="Vendor Name Here"
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitDebitNoteVendorContent($('#txtPartyName').val())" /> <input
										type="hidden" id="hiddenVendorId" />

								</div>
								<div class='col-md-2-1'  style="margin-left: 9px;margin-top:-11px;">
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
											<th style="height: 21.5px;" class="col-md-2 center"><div>Receipt No</div></th>
											<th style="height: 21.5px;" class="col-md-2 center"><div>Vendor
													Name</div></th>
											<th style="height: 21.5px;" class="col-md-2 center"><div>Date</div></th>
											<th style="height: 21.5px;" class="col-md-2 center"><div>Print</div></th>
											<th style="height: 21.5px;" class="col-md-1 center"><div>View</div></th>
											<th style="height: 21.5px;" class="col-md-1 center"><div>Delete</div></th>
										</tr>
									</thead>
							
								
											<tbody id="divProductOrderList">
												<c:forEach items="${debitNoteMasters}" var="row"
													varStatus="count">
													<tr>
														<td class="col-md-1 center">${(count.index)+1} <input
															type="hidden" id="debitNoteId${row.debitNoteId}"
															value="${row.debitNoteId}">
														</td>
														<td class="col-md-2 center">${row.debitNoteId}<input
															type="hidden" id="debitNoteDocId${row.debitNoteId}"
															value="${row.debitNoteId}"></td>

														<td class="col-md-2 center">${row.vendorMaster.vendorName
															}<input type="hidden"
															id="debitNoteVendorName${row.debitNoteId}"
															value="${row.vendorMaster.vendorId}">
														</td>
														
														<td class="col-md-2 center"><c:set var="now1"
																value="${row.debitNoteDate}" /> <fmt:formatDate
																value="${now1}" var="parsedDebitNoteDate" pattern="dd/MM/yyyy" />
															<c:out value="${parsedDebitNoteDate}"></c:out> <input
															type="hidden" id="poDate${row.debitNoteId}"
															value="<c:out value="${parsedEndDate}"></c:out>">
														</td>
														
														<%-- <td class="col-md-2 center">
															<a
															id="btnPrint${row.debitNoteId}" class="btn btn-xs btn-success"
															href="/EhatEnterprise/pharmacy/debitNote/printView?debitNoteId=${row.debitNoteId}">
																<i class="fa fa-print"></i>
															</a>
															</td> --%>
															
															<td class="col-md-2 center">
															<button
															id="btnPrint${row.debitNoteId}" class="btn btn-xs btn-success"
															onclick="debitNotePrint(${row.debitNoteId});">
																<i class="fa fa-print"></i>
															</button>
															</td>
															
															
															
														<td class="col-md-1 center"><a
															id="btnEdit${row.debitNoteId}" class="btn btn-xs btn-success"
															href="#"><i
																class="fa fa-eye" data-toggle="modal"
														data-target="#debit_note_pop_up_list" onclick="load(${row.debitNoteId})" ></i></a></td>
														<td class="col-md-1 center">
															<button id="btnDelete2" class="btn btn-xs btn-success"
																onclick="deletePO(${row.debitNoteId})" value="DELETE">
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
			
			<script type="text/javascript">
				
			</script>
			<%@include file="Pharma_Footer.jsp"%></div>

	</section>
</body>
</html>