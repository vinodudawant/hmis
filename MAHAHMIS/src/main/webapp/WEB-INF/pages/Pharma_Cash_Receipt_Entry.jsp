<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Cash Receceipt Entry | Pharmacy</title>
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
	src="<c:url value="../.././pharma-resources/jquery/jquery-migrate-1.2.1.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/jquery/jquery-jtemplates.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jquery-validate/additional-methods.min.js"/>"></script>
<!-- /for Developers  -->

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>

<!-- Application js -->

<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Cash_Receipt_Entry.js"/>"></script>
<!-- CUSTOM SCRIPT -->
<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/alertify.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/shortcut.js"/>"></script>
	<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_shortcut.js"/>"></script>
	<%-- <%@include file="pharma_header.jsp"%> --%>
<script>
		jQuery(document).ready(function() {		
			//App.setPage("widgets_box");  //Set current page
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
<%
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
							"dd/MM/yyyy");
					String todays_date = formatter.format(currentDate.getTime());
			%>
</head>

<script type="text/javascript">
	onload = function() {
		var inputs = [];
		inputs.push('docId=2');

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/common/getDocNo",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				$('#txtVouNo').val(r);
			}
		});
	}
	shortcut.add("Ctrl+s",function() {
		validateData(); 
	});
</script>
<%
	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
			"dd/MM/yyyy");
	String date = simpleDateFormat.format(new Date());
%>

<script>
function validateData() 
{
	if($('#txtVouNo').val()!=null && $('#txtVouNo').val()!="")
		{ 	if($('#searchBox1').val()!=null && $('#searchBox1').val()!="")
		   {
			if($('#vendorId').val()!=null && $('#vendorId').val()!="")
			   {
		/* 	if($('#txtAddress1').val()!=null && $('#txtAddress1').val()!="")
		    { 
				if($('#txtPhone').val()!=null && $('#txtPhone').val()!="")
				   {  */
			if($('#txtVouDate').val()!=null && $('#txtVouDate').val()!="")
			   { 	
				if($('#txtAmount').val()!=null && $('#txtAmount').val()!="")
			     { 
				   
			  	/* if($('#txtNameMadeBY').val()!=null && $('#txtNameMadeBY').val()!="")
				   {  */
								if($('#cashReceiptId').val()!=null && $('#cashReceiptId').val()!="")
								   { 
									alert("Record Updated Successfully!");	
									$('#CashReceiptMasterForm').submit();
									window
									.open("../../pharmacy/cashReceiptEntry/view"); 
								   }
								else
								  {     alert("Record Saved Successfully!");
									   
								        $('#CashReceiptMasterForm').submit();
							  window
										.open("../../pharmacy/cashReceiptEntry/view"); 
										/*  saveCounter(); */
								 	   		 	    
								  }
												   				
					 }
				/* else
				  {
					alert("Enter entry made by");
					 $('#txtAmount').focus();
				  }	
				} */
				else
				  {
					alert("Enter Amount");
					 $('#txtAmount').focus();
				  }	
			   }
			else
			  {
				alert("Enter Vou Date");
				 $('#txtVouDate').focus();
			  }	
		   }
			/* else
				{
					alert("Enter Vendor Phone");
					 $('#txtPhone').focus();
				  }	
				
				}
			else
			  {
				alert("Enter Vendor Address");
				 $('#txtAddress1').focus();
			  }	
			
			} */
			else
			  {
				alert("Vendor name is not available");
				$('#searchBox1').val('');
				 $('#searchBox1').focus();
			  }	
			
			}
		else
		  {
			alert("Enter Vendor Name");
			 $('#searchBox1').focus();
		  }	
		
		}
	else
	  {
		alert("Enter Vou No");
		 $('#txtVouNo').focus();
	  }	
	
}
function validateSearch()
{
	
	if($('#searchBox').val()!=null && $('#searchBox').val()!="")
	{ 
		searchCash($("#vendorIdSearch").val(),$("#vendorAddIdSearch").val());
	}
	else
	{	
		alert("Enter Vendor Name in Search Box");
	    $('#searchBox').focus();
	}

}
</script>
<body style="background: white ! important;">
	<section id="page">
		<div id="outer" class="container-main" style="width: 100%;">
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

							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">

										<ul class="breadcrumb col-md-12-1"
											style="padding: 4px 10px; margin-top: 1px;">
											<li>Date :  <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="../../Dashboard.jsp">Home</a>
											</li>
											<li><a href="../../pharmacy/pharmacy/transaction">Pharmacy</a></li>
											<li>Cash Receipt Entry</li>
											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<div class="li pull-right" style="margin-left: 9px;">
												<button class="btn btn-xs btn-success" id="saveBtn"
													onclick="validateData();">Save and Print(Ctrl+S)</button>

											</div>
											
										</ul>
									</div>
								</div>
							</div>
							<!-- /Common -->
							<div class="col-md-12-1">
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1-1'>Vendor Name</div>
								<div class='col-md-2-1'>
									<input type="text" id='searchBox' name='searchBox'
										placeholder="Vendor Name Here"
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitCash($('#searchBox').val())" /> <input
										type="hidden" id="vendorIdSearch">
										<input
										type="hidden" id="vendorAddIdSearch">
								</div>

								<div class='col-md-2-1' style="margin-left: 9px;margin-top:-11px;">
									<input type="button" value="Search" class="edit"
										onclick='validateSearch();'>
									<script type="text/javascript">
																$("#searchBox")
																		.autocomplete(
																				{
																					source : function(
																							request,
																							response) {
																						var callFrom='search';
																						var id='searchBox';
																						var findingName = $(
																								"#searchBox")
																								.val();
																						var inputs = [];
																						//letter
																						inputs
																								.push('findingName='
																										+ findingName);
																						var str = inputs
																								.join('&');

																						jQuery
																								.ajax({
																									async : true,
																									type : "GET",
																									data : str
																											+ "&reqType=AJAX",
																									url : "../../pharmacy/vendor/fetchVendorListwithmultipleAdd",
																									//autoSuggestionVendorWithDeleteVendor
																									timeout : 1000 * 60 * 5,
																									catche : false,
																									error : function() {
																										alert(error);
																									},
																									success : function(
																											r) {
																										
																										setCashReceiptEntry(r,id,callFrom) ;
																										//alert("REach");
																										/* var availableTags = [];
																										for ( var i = 0; i < r.length; i++) {
																											availableTags[i] = r[i].vendorName
																													+ "-"
																													+ r[i].vendorId
																													+ "-"
																													+ r[i].vendorAddress
																													+ "-"
																													+ r[i].vendorMobileNumber;

																										}
																										response(availableTags); */
																									}

																								});
																					}
																				});
															</script>



								</div>
							</div>

							<div class="row">
								<div class="panel-body col-md-12-1">
									<div class="panel-body">
										<div id="cashReceiptEntry" class="col-md-4-1"
											style="height: 100%; width: 100%; padding-left: 20px; border: 1px solid #b8b8b8;">
											<div class='col-md-12-1 right'>
												<h4>Cash Receipt Entry</h4>
											</div>
											<form:form commandName="cashReceiptEntry"
												id="CashReceiptMasterForm"
												action="../../pharmacy/cashReceiptEntry/save"
												method="post">
												<div class="col-md-4-1" style="margin-top: 9px;">

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> Vou No </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="cashReceiptDocId" id="txtVouNo"
																class="form-control input-SmallText" type="text"
																name="txtVouNo" readonly="true" placeholder="Vou No"
																 required="true" />
															<div class='col-md-1-1 center'
																style='margin-top: -10px; margin-left: 202px; color: red;'>
																<b> *</b>
															</div>

															<br>
														</div>
													</div>


													<div class="col-md-12-1" style="margin-top: 0px;">

														<div class="col-md-3-1" style="margin-top: 0px;">
															<b>Vendor Name </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<input type="text" id='searchBox1' name='searchBox1'
																placeholder="Vendor Name" class="form-control input-SmallText"
																onblur="splitCashReceiptEntryContent($('#searchBox1').val());" 
																onkeyup="autosuggetionVendorView('searchBox1');"/>
															<form:hidden id="vendorId" path="vendorMaster.vendorId" />
															<form:hidden id="vendoraddid" path="vendorAddress.vendorAddressId" />
															<form:hidden path="cashReceiptId" id="cashReceiptId" />
															<!-- <script type="text/javascript">
																$("#searchBox1")
																		.autocomplete(
																				{
																					source : function(
																							request,
																							response) {

																						var findingName = $(
																								"#searchBox1")
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
																									url : "/EhatEnterprise/pharmacy/vendor/autoSuggestionVendor",
																									timeout : 1000 * 60 * 5,
																									catche : false,
																									error : function() {
																										alert(error);
																									},
																									success : function(
																											r) {
																										//alert("REach");
																										var availableTags = [];
																										for ( var i = 0; i < r.length; i++) {
																											availableTags[i] = r[i].vendorName
																													+ "-"
																													+ r[i].vendorId
																													+ "-"
																													+ r[i].vendorAddress
																													+ "-"
																													+ r[i].vendorMobileNumber;

																										}
																										response(availableTags);
																									}

																								});
																					}
																				});
															</script> -->
														<!-- 	,isAlphaWithSpace('searchBox1',0,100) -->
															<div class='col-md-1-1 center'
																style='margin-top: -10px; margin-left: 202px; color: red;'>
																<b> *</b>
															</div>
														</div>

													</div>

													<div class="col-md-12-1" style="margin-top: 9px;">

														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> Address </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:textarea path="" id="txtAddress1"
																style="width:97%;" name="txtAddress1" 
																requird="true" readonly="true"
																placeholder="Enter Address" class="col-md-11-1"
																tabindex="-1" />
															<!-- <div class='col-md-1-1 center'
																style='margin-top: -10px; margin-left: 202px; color: red;'>
																<b> *</b>
															</div> -->
															<!-- onblur="isAddress('txtAddress1',0,200)" -->
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b>Phone </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="" id="txtPhone"
																class="form-control input-SmallText" 
																type="text" name="txtPhone" readonly="true"
																placeholder="Phone Number" tabindex="-1" onblur="isPhonNumber('txtPhone')"/>
															<br>
															<!-- <div class='col-md-1-1 center'
																style='margin-top: -26px; margin-left: 202px; color: red;'>
																<b> *</b>
															</div> -->
														</div>

													</div>


													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> Vou Date </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="cashReceiptDate" id="txtVouDate"
																class="form-control input-SmallText" type="text"
																readonly="true" name="txtVouDate" placeholder="vou date"
																 value="<%=date%>"
																onclick="displayCalendar(document.getElementById('txtVouDate'),'dd/mm/yyyy',this)"
																tabindex="-1" />
															<div class='col-md-1-1 center'
																style='margin-top: -10px; margin-left: 202px; color: red;'>
																<b> *</b>
															</div>

														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> Amount </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="cashReceiptAmt" id="txtAmount"
																class="form-control input-SmallText" type="text"
																placeholder="Enter Amt" 
																readonly="readonly" name="txtAmount" onblur="isFloatingPoint('txtAmount',0,100);" />
															<br>
															<div class='col-md-1-1 center'
																style='margin-top: -26px; margin-left: 202px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 0px;">

														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> Narration </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="cashReceiptNarration" id="txtNarration"
																class="form-control input-SmallText" type="text"
																name="txtNarration" placeholder="Enter narration "
																/>
																<!--  onblur="isAlphaWithDigitSpace('txtNarration',0,100)"  -->
															<br>
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-3-1" style="margin-top: 5px;">
															<b> Entry Made by </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="cashReceiptMadeBy" id="txtNameMadeBY"
																class="form-control input-SmallText" type="text"
																name="txtNameMadeBY" placeholder="Entry made by" 
																/>
															<br>
															<!-- onblur="isAlphaWithSpace('txtNameMadeBY',0,100);" -->
															<!-- <div class='col-md-1-1 center'
																style='margin-top: -26px; margin-left: 202px; color: red;'>
																<b> *</b>
															</div> -->
														</div>

													</div>


												</div>

											</form:form>
											<div class="col-md-5-1"
												style="width: 60%; max-height: auto; margin-left: 0%;">

												<table
													class="table table-striped table-bordered header-fixed cf "
													style="Width: 150%; margin-top: 5px;">
													<thead class="cf" style="background: white;">
														<tr>
															<th style="height: 21.5px;" class="col-md-1 center"><div>Sr.</div></th>
															<th style="height: 21.5px;" class="col-md-2 center"><div>Vendor
																	Name</div></th>
															<th style="height: 21.5px;" class="col-md-2 center"><div>Phone
																</div></th>
															<th style="height: 21.5px;" class="col-md-2 center"><div>Vou
																	Date</div></th>
															<th style="height: 21.5px;" class="col-md-2 center"><div>Amount
																</div></th>
															<th style="height: 21.5px;" class="col-md-2 center"><div>Print</div></th>
															<th style="height: 21.5px;" class="col-md-1 center"><div>Edit</div></th>
															<th style="height: 21.5px;" class="col-md-1 center"><div>Delete</div></th>
														</tr>
													</thead>
												</table>
												<div class="col-md-12-1"
													style="margin-top: -15px; padding-left: 0%;">
													<div class="container-main col-md-7-1"
														style="height: 400px; overflow-y: scroll; maxheight: auto; border: 1px solid #b8b8b8;">
														<table
															class="table table-striped table-bordered table condensed cf">
															<tbody id="divCashList">
																<c:forEach items="${ltCashMasters}" var="row"
																	varStatus="count">
																	<tr>

																		<td class="col-md-1 center">${(count.index)+1}<input
																			type="hidden" id="cashReceiptId${row.cashReceiptId}"
																			value="${row.cashReceiptId}"></td>


																		<td class="col-md-2 center">${row.vendorMaster.vendorName}
																			<input type="hidden"
																			id="VendorName${row.cashReceiptId}"
																			value="${row.vendorMaster.vendorName}">
																		</td>

																		<td class="col-md-2 center" >${row.vendorAddress.vendorMobileNumber}
																			<input type="hidden" 
																			id="cashVendorPhon${row.cashReceiptId }"
																			value="${row.vendorAddress.vendorMobileNumber}">
																		</td>


																		<td  class='col-md-2 center'><c:set
																				var="now2" value="${row.cashReceiptDate}" /> <fmt:formatDate
																				value="${now2}" var="parsedDate"
																				pattern="dd/MM/yyyy" /> <c:out
																				value="${parsedDate}"></c:out> <input type="hidden"
																			id="cashReceiptDate${row.cashReceiptId}"
																			value="<c:out value="${parsedDate}"></c:out>">

																		</td>

																		<td class="col-md-2 center">${row.cashReceiptAmt}
																			<input type="hidden"
																			id="cashVendorAmt${row.cashReceiptId }"
																			value="${row.cashReceiptAmt}">
																		</td>

																		<td style="display: none" id="txtCredit">${row.vendorAddress.vendorAddress}
																			<input type="hidden"
																			id="vendorAddress${row.cashReceiptId}"
																			value="${row.vendorAddress.vendorAddress}">
																		</td>

																		<td style="display: none" id="txtCredit">${row.vendorMaster.vendorId}
																			<input type="hidden"
																			id="vendorId${row.cashReceiptId}"
																			value="${row.vendorMaster.vendorId}">
																		</td>
																		<td style="display: none" id="txtCredit">${row.vendorAddress.vendorAddressId}
																			<input type="hidden"
																			id="vendoraddid${row.cashReceiptId}"
																			value="${row.vendorAddress.vendorAddressId}">
																		</td>
																		<td style="display: none" id="txtCredit">${row.cashReceiptDocId}
																			<input type="hidden" id="DocId${row.cashReceiptId}"
																			value="${row.cashReceiptDocId}">
																		</td>

																		<td style="display: none" id="txtCredit">${row.cashReceiptNarration}
																			<input type="hidden"
																			id="cashReceiptNarration${row.cashReceiptId}"
																			value="${row.cashReceiptNarration}">
																		</td>

																		<td style="display: none" id="txtCredit">${row.cashReceiptMadeBy}
																			<input type="hidden"
																			id="cashReceiptMadeBy${row.cashReceiptId}"
																			value="${row.cashReceiptMadeBy}">
																		</td>

                                                                    <%--      <td class="col-md-2 center"><a
															id="btnPrint${row.cashReceiptId}" class="btn btn-xs btn-success"
															href="/EhatEnterprise/pharmacy/cashReceiptEntry/printView?cashId=${row.cashReceiptId}">
																<i class="fa fa-print"></i>
															</a></td> --%>
															
															<td class="col-md-2 center"><button
															id="btnPrint${row.cashReceiptId}" class="btn btn-xs btn-success"
															onclick="cashReceiptPrint(${row.cashReceiptId});">
																<i class="fa fa-print"></i>
															</button></td>
															
																		<td class="col-md-1 center">
																			<button id="btnEdit${row.cashReceiptId}"
																				class="btn btn-xs btn-success"
																				onclick="edit(${row.cashReceiptId})" value="EDIT">
																				<i class="fa fa-edit"></i>
																			</button>
																		</td>
																		<td class="col-md-1 center">
																			<button id="btnDeleteENtry"
																				class="btn btn-xs btn-success"
																				onclick="deleteCash(${row.cashReceiptId})"
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


						</div>
						<div style="width: 98%; padding-top: 0%; font-weight: bold;"></div>
						<div id="div1" style="visibility: hidden"><%=request.getParameter("ajaxResponse")%></div>
						<div id="div3" style="visibility: hidden"><%=request.getParameter("myObj")%></div>


					</div>
				</div>
			</div>
			<input type="hidden" value="0" id="RowCount">
			<%@include file="Pharma_Footer.jsp"%></div>

		<input type='hidden' value='0' id='addRowCount' />


		<div id="div2" style="visibility: hidden"><%=request.getParameter("showSaveBtn")%></div>
		<div id="div4" style="visibility: hidden"><%=request.getParameter("onload")%></div>
	</section>
</body>
</html>