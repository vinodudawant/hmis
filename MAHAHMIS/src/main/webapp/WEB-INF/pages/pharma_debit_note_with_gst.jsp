<%@page import="java.util.Comparator"%>
<%@page import="java.util.Collections"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.io.File"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
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

<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>

<!-- CUSTOM SCRIPT -->
<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/pharma_productList_report.js"/>"></script>

</head>
<script>
	jQuery(document).ready(function() {
		//App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
		
		//getAllUnit();
	});
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
											<li>Purchase Details Report</li>

											<!-- <li class="pull-right" id="template" style="display: none;">
												<button type="submit" class="btn btn-xs btn-success"
													onclick="getReportForPharmacyCompanyList();">Get
													Vendor Report</button> 
											</li> -->
											<li class="pull-right">
												<button id="btnExport"
													class="btn btn-xs btn-info pull-right" value="Excel"
													title="" data-placement="left" data-toggle="tooltip"
													data-original-title="Excel">Export To Excel</button> <script
													type="text/javascript">
												$("[id$=btnExport]")
														.click(
																function(e) {
																	window
																			.open('data:application/vnd.ms-excel,'
																					+ encodeURIComponent($(
																							'div[id$=reportListwithgst]')
																							.html()));
																	e
																			.preventDefault();
																});
											</script>
											</li>
										</ul>

									</div>
								</div>
							</div>


							<div id="SearchContent" class="col-md-12-1"></div>
							<div class="col-md-12-1">


								<div id="companyReport" class="col-md-12-1"
									style="height: 50%; margin-top: -1%; padding-left: 20px; border: 1px solid #b8b8b8;">

									<div class="col-md-12-1" style="margin-top: 0%">

										<div class="col-md-4-1"
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>From:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">

												<input type="text" id="popup_container2" name="txtBillDate"
													class="form-control input-SmallText" readonly
													placeholder="From Date" required
													onfocus="displayCalendar(document.getElementById('popup_container2'),'yyyy-mm-dd',this)">
											</div>
										</div>

										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>To:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input type="text" class="form-control input-SmallText"
													placeholder="To Date" readonly="readonly"
													onclick="displayCalendar(document.getElementById('popup_container3'),'yyyy-mm-dd',this)"
													name="popup_container3" id="popup_container3">
											</div>
										</div>

										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;display: none">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Product Name:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="searchBox1"
													class="form-control input-SmallText ui-autocomplete-input typeahead1"
													type="text" autocomplete="off" name="searchBox1"
													placeholder="Product Name"
													onkeyup="searchProductList(this.id);">


											</div>
										</div>

									</div>

									<div class="col-md-12-1" style="display: none">

										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Mfg Name:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="searchBox2"
													class="form-control input-SmallText ui-autocomplete-input typeahead2"
													type="text" autocomplete="off" name="searchBox2"
													placeholder="Mfg Name" onkeyup="searchMfg(this.id);">
											</div>
										</div>

										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Vendor Name:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="searchBox4"
													class="form-control input-SmallText ui-autocomplete-input typeahead4"
													type="text" autocomplete="off" name="searchBox4"
													placeholder="Vendor Name"
													onkeyup="autosuggetionVendorView(this.id);">
											</div>
										</div>
										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Category:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="searchBox3"
													class="form-control input-SmallText ui-autocomplete-input typeahead3"
													type="text" autocomplete="off" name="searchBox3"
													placeholder="Category" onkeyup="searchcategory(this.id);">
											</div>




										</div>
									</div>

									<div class="col-md-12-1">

										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px; display: none;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Store Name:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="searchBox5"
													class="form-control input-SmallText ui-autocomplete-input typeahead5"
													type="text" autocomplete="off" name="searchBox5"
													placeholder="Store Name" onkeyup="searchcategory(this.id);">
											</div>




										</div>
										
										<div class="col-md-4-1 "
											style="margin-top: 6px; margin-bottom: 10px;display: none">
											
															
																<input type="radio" value="0"   onclick="myFunction(1)" name="purTransType" id="rdoCashCredit">
																<b>Credit</b>
																<input type="radio" value="1" style="margin-left:2%;" onclick="myFunction(2)" name="purTransType" id="rdoCash">
																<b>Cash</b>
																<input type="radio" value="2" style="margin-left:2%;" onclick="myFunction(3)" name="purTransType" id="rdoCard">
																<b>Card </b>
																
																<input type="radio" value="3" checked="true" style="margin-left:2%;" onclick="myFunction(3)" name="purTransType" id="rdoCard">
																<b>All </b>
															
													
										</div>

										
										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;display: none">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Hospital Unit:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												 <select class="form-control input-SmallText"
													style="" id="unitId">
													
												</select>
											</div>
										</div>
										
										<div style="margin-top: 0px; margin-bottom: 10px"
												class="col-md-4-1">
												<div class="col-md-4-1" style="margin-top: 9px;">
													<b></b>
												</div>
												<div class="col-md-4-1" style="margin-top: 9px;">
													<button style="margin-left: 5%;" onclick="getpurchaseReturnDatawithgst()"
														id="getproductData" type="button"
														class="btn btn-xs btn-success">Get Data</button>
												</div>

											</div>
									</div>
								</div>
								
								<script type="text/javascript">
								
								function getpurchaseReturnDatawithgst(){

									var from = $("#popup_container2").val();
									var to = $("#popup_container3").val();
									/* var hiddencategoryId=$('#hiddencategoryId').val();
									var hiddencompanyId=$('#hiddencompanyId').val();
									var hiddenProductId =$('#hiddenProductId').val();
									var hiddenvendorId =$('#hiddenvendorId').val();
									var unitId         =$('#unitId').val();
									var paytype        = $("input:radio[name='purTransType']:checked").val();
									
									if (hiddencategoryId == "" || hiddencategoryId == null || hiddencategoryId == undefined || isNaN(hiddencategoryId)) {
										hiddencategoryId = 0;
									}
									if (hiddencompanyId == "" || hiddencompanyId == null || hiddencompanyId == undefined || isNaN(hiddencompanyId)) {
										hiddencompanyId = 0;
									}
									if (hiddenProductId == "" || hiddenProductId == null || hiddenProductId == undefined || isNaN(hiddenProductId)) {
										hiddenProductId = 0;
									}
									
									if (hiddenvendorId == "" || hiddenvendorId == null || hiddenvendorId == undefined || isNaN(hiddenvendorId)) {
										hiddenvendorId = 0;
									}
									
									if (unitId == "" || unitId == null || unitId == undefined || isNaN(unitId)) {
										unitId = 0;
									} 
									
									if (from == "" || from == null || from == undefined ) {
										from = "0";
									}
									if (to == "" || to == null || to == undefined ) {
										to = "0";
									}*/
									
									if (from == "" || from == null || to == '' || to == null) {
										alert("Please  Select The Date First");
									} else {

										
										var inputs = [];
										inputs.push('from=' + encodeURIComponent(from));
										inputs.push('to=' + encodeURIComponent(to));
										
										/* inputs.push('hiddencategoryId=' + encodeURIComponent(hiddencategoryId));
										inputs.push('hiddencompanyId=' + encodeURIComponent(hiddencompanyId));
										inputs.push('hiddenProductId=' + encodeURIComponent(hiddenProductId));
										inputs.push('hiddenvendorId=' + encodeURIComponent(hiddenvendorId));
										inputs.push('unitId=' + encodeURIComponent(unitId));
										inputs.push('paytype=' + encodeURIComponent(paytype)); */
										
										var str = inputs.join('&');
										jQuery.ajax({
											async : true,
											type : "GET",
											data : str + "&reqType=AJAX",
											url : "../report/getpurchaseRetrunData",
											timeout : 1000 * 60 * 5,
											catche : false,
											error : function() {
												alert('Network Issue!');
											},
											success : function(r) {
												
												setpurchasDetaisDataWithGST(r);
												
												
											}
										});

									} 
								}
								/*****
								 * @author    :BILAL
								 * @Date      :06-02-2018
								 * @Code      :For setting product list report with
								 * ******/
								function setpurchasDetaisDataWithGST(res){

									var result= ' ';
									
									var tbillamt        =0 ;
									var tbillamtwithgst =0 ;
									var tdiscount       =0;
									var tnetbillamt     =0;
									var tTaxableamt     =0;
									var tcgstper        =0;
									var tcgstamt        =0;
									var tsgstper        =0;
									var tsgstamt        =0;
									var tigstper        =0;
									var tigstamt        =0;
									var tcessper        =0;
									var tcessamt        =0;
									var totalamt=0;
									var totalnetamt=0;
									for(var i=0;i<res.length;i++){
										
										var billamtmaster   =res[i].billamtmaster;
										var hsncode         =res[i].hsncode;
										var productName     =res[i].productName;
										var purBillNo       =res[i].vouNo;
										var billDate        =res[i].billDate;
										var amount          =res[i].amount;
										var vendorName      =res[i].vendorName;
										
										var igstAmtmaster      =res[i].igstAmtmaster;
										var gstAmountmaster      =res[i].gstAmountmaster;
										
										
										var free            =0;
										var gstamt          = parseFloat(res[i].gstamt);
										
										var dgstPers =  parseFloat(res[i].dgstPers);
										var disc     =  0.00;
										
										if (dgstPers == "" || dgstPers == null || dgstPers == undefined || isNaN(dgstPers)) {
											dgstPers = 0;
										}
										if (disc == "" || disc == null || disc == undefined || isNaN(disc)) {
											disc = 0;
										}
										

										
										var peramt = 0;
										var tamount = 0;
										if (disc > 0) {
											peramt = parseFloat(((amount * disc) / 100));
											tamount = parseFloat(amount - peramt);
										} else {
											tamount =  parseFloat(amount);
										}

										var pgsttotal = parseFloat(((tamount * dgstPers) / 100));
										var ftotal = parseFloat(tamount + pgsttotal);
										
									
										result=result
										  + '	<tr> '
										  + '	<td>'+(i+1)+'</td> '
										  + '	<td>'+billDate+'</td> '
										  + '	<td>'+vendorName+'</td> '
										  + '	<td>'+purBillNo+'</td> '
										  + '	<td>'+productName+'</td> '
										  + '	<td>'+hsncode+'</td> '
										  + '	<td>'+disc+'</td> '
										  + '	<td>'+(ftotal+(ftotal*gstamt/100)).toFixed(2)+'</td>'
										  + '	<td>'+(ftotal).toFixed(2)+'</td> '
										  + '	<td>'+gstamt.toFixed(2)+'</td> '
										 
										  
										  + '	<td>'+(ftotal*gstamt/100).toFixed(2)+'</td> '
										  ;
										  
										  if (gstAmountmaster > 0) {
											  result=result  + '	<td>'+parseFloat(dgstPers) / 2+'</td> '
											                 + '	<td>'+parseFloat(pgsttotal) / 2+'</td> '
											                 + '	<td>'+parseFloat(dgstPers) / 2+'</td> '
											                 + '	<td>'+parseFloat(pgsttotal) / 2+'</td> ';
										  } else {
											  result=result  + '	<td>'+free+'</td> '
											                 + '	<td>'+free+'</td> '
											                 + '	<td>'+free+'</td> '
											                 + '	<td>'+free+'</td> ';
										  }
										  
										  if (igstAmtmaster > 0) {
											  result=result  + '	<td>'+parseFloat(dgstPers) +'</td> '
											                 + '	<td>'+parseFloat(pgsttotal) +'</td> ';
											  
											  
										  } else {
											  result=result  + '	<td>'+free+'</td> '
											                 + '	<td>'+free+'</td> ';
										  }
										  
										  + '</tr> ';
											
									   
										   tbillamt        =tbillamt + billamtmaster ;
										   tbillamtwithgst =tbillamtwithgst + (ftotal+(ftotal*gstamt/100)) ;
										   tdiscount       =tdiscount + peramt;
										   tnetbillamt     =tnetbillamt + parseFloat(amount);
										   tTaxableamt     =tTaxableamt + parseFloat(ftotal*gstamt/100);
										   
										   totalamt=totalamt +parseFloat(amount) ;
										   totalnetamt=totalnetamt +parseFloat(ftotal);
										   
										   if (gstAmountmaster > 0) {
											   tcgstper        =tcgstper + (parseFloat(dgstPers) / 2);
											   tcgstamt        =tcgstamt + (parseFloat(pgsttotal) / 2);
											   tsgstper        =tsgstper + (parseFloat(dgstPers) / 2);
											   tsgstamt        =tsgstamt + (parseFloat(pgsttotal) / 2);
										   }  else{
											   tcgstper        =tcgstper + free;
											   tcgstamt        =tcgstamt + free;
											   tsgstper        =tsgstper + free;
											   tsgstamt        =tsgstamt + free;
										   }
										   if (igstAmtmaster > 0) {
											   tigstper        =tigstper + parseFloat(dgstPers);
											   tigstamt        =tigstamt + parseFloat(pgsttotal);
										   }else{
											   tigstper        =tigstper + free;
											   tigstamt        =tigstamt + free;
										   }
										   
										 
										   tcessper        =tcessper + free;
										   tcessamt        =tcessamt + free;			
												
													  	
									}	
									
									result = result
									
									 + '<tr> '
									 + '</tr> '
									 
									 + '<tr> '
									 + '<td colspan="6" align="left">Total</td>'
								     + '<td >'+tdiscount.toFixed(2)+'</td>'
									 + '<td >'+tbillamtwithgst.toFixed(2)+'</td>'
									 
									 
									
									 
									 + '<td >'+tTaxableamt.toFixed(2)+'</td>'
									 + '<td >0</td>'
									 + '<td >'+(tbillamtwithgst-tTaxableamt).toFixed(2)+'</td>'
									 + '<td >0</td>'
									 
									 + '<td >'+tsgstamt.toFixed(2)+'</td>'
									 + '<td >0</td>'
									 + '<td >'+tigstamt.toFixed(2)+'</td>'
									 + '<td >0</td>'
									 + '<td >'+tcessamt.toFixed(2)+'</td>'
									 + '</tr> '
									 ;
									
									$("#purchasedetailswithgst").html(result);
									emptydata();
								}

								function emptydata(){
									$("#searchBox1").val("");
									$("#searchBox2").val("");
									$("#searchBox3").val("");
									$("#searchBox4").val("");
									$('#hiddencategoryId').val(0);
									$('#hiddencompanyId').val(0);
									$('#hiddenProductId').val(0);
									$('#hiddenvendorId').val(0);
									$('#unitId').val(0);
								}
								
								</script>

								<div class="col-md-12-1 panel-body"
									style="border: 2px solid; margin-top: 2%;" id="reportListwithgst">
									<div class="col-md-12-1 center" style="margin-bottom: 10px;">
										

<table>
										<thead>
										<tr><th colspan="7" align="center"><h4 id="titlepurchasewithgst" align="center">Purchase Report With GST</h4></th></tr>
										<tr><th  align="center"></th></tr>
										
										</thead>
										</table>
									</div>

									<div class="col-md-12-1"
										style='height: 485px; max-height: auto;  overflow-x: scroll; overflow-y: scroll;'>

										<div class="tab-content">
											<div class="tab-pane fade in active"
											>
												<table
													class='table table-bordered table-condensed cf table-fixed'
														style='margin-bottom: 9px;  overflow-x: scroll; overflow-y: scroll; max-width: 1000%;'>
													<thead style="background-color: lightgray;">
														<tr>
															<th>Sr No</th>
															<th>DATE</th>
															<th>VENDOR NAME</th>
															
															 <th>BILL NO</th>
															<th>PRODUCT NAME</th>
															<th>HSN CODE</th>
															<th>DISCOUNT AMT</th>
															
															<th>NET BILL AMOUNT</th>
															<th>TAXABLE AMOUNT</th>

															<th>CGST%</th>
															<th>CGST Amt</th>
															<th>SGST%</th>
															<th>SGST Amt</th>
															<th>IGST%</th>
															<th>IGST AMT</th>
															
															<th>CESS%</th>
															<th>CESS AMT</th>
														</tr>
													</thead>
													<tbody id="purchasedetailswithgst">
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
			</div>
		</div>
		<div><%@include file="Pharma_Footer.jsp"%></div>
		<div id="userObj" style="display: none;"></div>
		<input type="hidden" id="hiddenProductId" value="0"> <input
			type="hidden" id="hiddencompanyId" value="0"> <input
			type="hidden" id="hiddencategoryId" value="0">
			<input type="hidden" id="hiddenvendorId" value="0"> 
			
		<%-- </c:if>  --%>
	</section>
</body>
</html>