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
<title>Counter Sale | Pharmacy</title>
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
<link
	href="<c:url value="/pharmacy/resources/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css"/>"
	rel="stylesheet" media="screen">
<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />


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
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script> --%>

<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Counter_Sale.js"/>"></script>
<%@include file="pharma_header.jsp"%>
<%-- <script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_shortcut.js"/>"></script>
	
<!-- CUSTOM SCRIPT -->
<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>	
<script src="<c:url value="/pharmacy/resources/alertify.js"/>"></script> --%>
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
	//App.setPage("widgets_box");  //Set current page
	App.init(); //Initialise plugins and elements
});
	shortcut.add("ctrl+f",function() {
		openForm('counter');
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
		searchCounterSale($("#hiddenPatientId").val());
	}
	else
	{	
		alert("Enter Patient Name in Search Box");
	    $('#searchBox').focus();
	}

}
</script>
<script>
function validateSearch1()
{
	if($('#searchBox1').val()!=null && $('#searchBox1').val()!="")
	{ 
		searchCounterSale($("#searchBox1").val());
	}
	else
	{	
		alert("Enter Receipt No");
	    $('#searchBox1').focus();
	}

}
</script>

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
													<a href="../../pharmacy/counterSale/view-frm"
														class="btn btn-info">New Counter Sale Entry(Ctrl+f)</a>
												</div>
											</li>
										</ul>

									</div>
								</div>
							</div>
							<!-- /Common -->

					 <div id="SearchContent" class="col-md-12-1" style="margin-bottom:32px;">
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1-1'>Patient Name</div>
								<div class='col-md-2-1'>
									<input type="text" id='searchBox' name='searchBox'
										placeholder="Patient Name Here"
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitCounterSaleBill($('#searchBox').val())" /> <input
										type="hidden" id="hiddenPatientId" />

								</div>
								<div class='col-md-2-1' style="margin-left: 9px;margin-top:-10px;">
									<input id='' type='button' value='Search' class='edit'
										onclick='validateSearch();' />

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
														url : "../../pharmacy/counterSale/autoSuggestionPatient",
														timeout : 1000 * 60 * 5,
														catche : false,
														error : function() {
															alert('error');
														},
														success : function(r) {
															var availableTags = [];
															for(var i=0;i<r.length;i++){
																availableTags[i]=r[i].counterSalePatientName+"-"+r[i].unitCount;
															}
															response(availableTags);
														}
													});
											 }																						
										});	
										</script>
										
								</div>
								
							 	<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1-1'>Invoice No</div>	
							    <div class='col-md-2-1'>
									<input type="text" id='searchBox1' name='searchBox1'
										placeholder="Invoice No Here" 
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitCounterSaleRegisterNo($('#searchBox1').val()),isNumber('searchBox1');" /> 
																			

								</div>
								
								<div class='col-md-1-1' style="margin-left: 9px;margin-top:-10px;">
									<input id='' type='button' value='Search' class='edit'
										onclick='validateSearch1();' />
                                     <div class='col-md-2-1' style="margin-left: 9px;margin-top:-10px;">
									<script type="text/javascript">
										$("#searchBox1").autocomplete({
											 source : function(request, response) {
											 
													var findingName = $("#searchBox1").val();
													var inputs = [];
													inputs.push('letter=' + findingName);
													var str = inputs.join('&');

													jQuery.ajax({
														async : true,
														type : "GET",
														data : str + "&reqType=AJAX",
														url : "../../pharmacy/counterSale/autoSuggestionRegisterNo",
														timeout : 1000 * 60 * 5,
														catche : false,
														error : function() {
															/* alert('error'); */
														},
														success : function(r) {
															var availableTags = [];
															for(var i=0;i<r.length;i++){
																availableTags[i]=r[i].unitCount+"-"+r[i].counterSalePatientName;
															}
															response(availableTags);
														}
													});
											 }																						
										});	
										</script>
										</div>
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
                                            <th style="height: 21.5px;" class="col-md-1 center"><div>Invoice
													No</div></th>		
											<th style="height: 21.5px;" class="col-md-2 center"><div>Patient
													Name</div></th>
													
											<!-- <th style="height: 21.5px;" class="col-md-2 center"><div>Enter
													By Name</div></th> -->
											<th style="height: 21.5px;" class="col-md-1 center"><div>
													Date</div></th>		
											<th style="height: 21.5px;" class="col-md-1 center"><div>Net
													Amount</div></th>
											<th style="height: 21.5px;" class="col-md-1 center"><div>Print</div></th>

											<th style="height: 21.5px;" class="col-md-1 center"><div>Delete</div></th>
										</tr>
									</thead>
								
											<tbody id="divCounterSaleList">
												<c:forEach items="${ltCounterSaleMasters}" var="row"
													varStatus="count">
													<tr>
														<td class="col-md-1 center">${(count.index)+1} <input
															type="hidden" id="counterSaleId${row.counterSaleId}"
															value="${row.counterSaleId}">
														</td>
                                                           
                                                           
														<td class="col-md-1 center">CS${row.unitCount}<input
															type="hidden" id="counterSaleId${row.counterSaleId}"
															value="${row.unitCount}"></td>


														<td class="col-md-2 center">${row.counterSalePatientName}
															<input type="hidden"
															id="patientNameId${row.counterSaleId}"
															value="${row.counterSalePatientName}">
														</td>
														<%-- <td class="col-md-2 center">${row.counterSaleEnteredBy}<input
															type="hidden" id="enterByName${row.counterSaleId}"
															value="${row.counterSaleEnteredBy}"></td> --%>
															
														<td class="col-md-1 center">${row.counterSaleAddress}<input
															type="hidden" id="date${row.counterSaleId}"
															value="${row.counterSaleAddress}"></td>

														<td class="col-md-1 center">${row.counterSaleNetAmt}<input
															type="hidden" id="netAmount${row.counterSaleId}"
															value="${row.counterSaleNetAmt}"></td>
															
													
													
														<%-- <td class="col-md-1 center"><button
																id="btnPrint${row.counterSaleId}"
																class="btn btn-xs btn-success"
																onclick="printPharmaCounter(${row.counterSaleId})" 
																value="PRINT">
																<i class="fa fa-edit"></i>
															</button>
															
															<a
															id="btnPrint${row.counterSaleId}" class="btn btn-xs btn-success"
															href="/EhatEnterprise/pharmacy/counterSale/printView?counterSaleId=${row.counterSaleId}">
																<i class="fa fa-print"></i>
															</a>
															</td> --%>
                                                          <td class="col-md-1 center">
                                                          <button
															id="btnPrint${row.counterSaleId}" class="btn btn-xs btn-success"
															onclick="counterSalePrint(${row.counterSaleId});">
																<i class="fa fa-print"></i>
															</button>
															</td>

														<td class="col-md-1 center">
															<button id="btnDelete2" class="btn btn-xs btn-success"
																onclick="deleteCounterSale(${row.counterSaleId})" value="DELETE">
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
			<div class="ajaxmodal">
			<!-- Place at bottom of page -->
		</div>
			<%@include file="Pharma_Footer.jsp"%></div>

	</section>
</body>
</html>
