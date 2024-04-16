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

<%-- <%@include file="pha_header.jsp"%> --%>
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
	<script
	src="<c:url value="/pharmacy/resources/jquery/jquery-2.0.3.min.js"/>"></script>
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

<%-- <script type="text/javascript" src="<c:url value="/js/report.js"/>"></script> --%>

<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>

<!-- CUSTOM SCRIPT -->
<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>
<!-- SELECT2 -->
<link
	href="<c:url value="/pharmacy/resources/js/select2/select2.min.css"/>"
	rel="stylesheet">
	<script
	src="<c:url value="/pharmacy/resources/js/select2/select2.min.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/pharma_productList_report.js"/>"></script>
	
<script
	src="<c:url value="/pharmacy/resources/js/pharma_gst_sale_report.js"/>"></script>

</head>
<script>
	jQuery(document).ready(function() {
		//App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
		$("#userData").select2();
		calculateByPurRate('1');
		
	});
	
	function getStoreList() {
		var inputs = [];
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../report/fetchStockDetails",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						var result = jQuery.parseJSON(r);

						 var divContent = "";
						divContent = divContent
								+ "<select><option value='0'>--Select--</option>";
							
						for ( var i = 0; i < result.length; i++) {
							divContent = divContent
									+ "<option value='"+result[i].storeName+"'>"
									+ result[i].storeId + " "
									+ result[i].storeName + "</option>";
						}
						divContent = divContent + "</select>";
						$("#userData").html(divContent);
						$("#userData").show('show'); 
					}
				});

	}
	
	function getCurrentStockProductList() {
		var inputs = [];
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../product/getAllProducts",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						//var result = jQuery.parseJSON(r);
					
		            
						 var divContent = "";
						divContent = divContent
								+ "<select><option value='0'>--Select--</option>";
							
						for ( var i = 0; i < r.length; i++) {
							divContent = divContent
									+ "<option value='"+r[i].productId+"'>"
									+ r[i].productId + " "
									+ r[i].productName + "</option>";
						}
						divContent = divContent + "</select>";
						$("#userData").html(divContent);
						$("#userData").show('show');
						$("#userData").select2();
					}
				});

	}
	
	function getCompanyList() {
		var inputs = [];
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../report/getCompanyWiseBatchExpiry",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						 var divContent = "";
							divContent = divContent
									+ "<select><option value='0'>--Select--</option>";
								
							for ( var i = 0; i < r.length; i++) {
								divContent = divContent
										+ "<option value='"+r[i].compId+"'>"
										+ r[i].compId + " "
										+ r[i].compName + "</option>";
							}
						divContent = divContent + "</select>";
						$("#userData").html(divContent);
						$("#userData").show('show'); 
						$("#userData").select2();
					}
				});

	}
	
	 function getShelfList() {
			var inputs = [];
			var str = inputs.join('&');
			jQuery
					.ajax({
						async : true,
						type : "POST",
						data : str + "&reqType=AJAX",
						url : "../report/getShelfWiseBatchExpiry",
						timeout : 1000 * 60 * 5,
						cache : false,
						error : function() {
							alert('error');
						},
						success : function(r) {
							 var divContent = "";
								divContent = divContent
										+ "<select><option value='0'>--Select--</option>";
									
								for ( var i = 0; i < r.length; i++) {
									divContent = divContent
											+ "<option value='"+r[i].shelfId+"'>"
											+ r[i].shelfId + " "
											+ r[i].shelfName + "</option>";
								}
							
							divContent = divContent + "</select>";
							$("#userData").html(divContent);
							$("#userData").show('show'); 
							$("#userData").select2();
						}
					});

		}
	 function getCategoryList() {
			var inputs = [];
			var str = inputs.join('&');
			jQuery
					.ajax({
						async : true,
						type : "POST",
						data : str + "&reqType=AJAX",
						url : "../report/getCategoryWiseStock",
						timeout : 1000 * 60 * 5,
						cache : false,
						error : function() {
							alert('error');
						},
						success : function(r) {
							//var result = jQuery.parseJSON(r);
						
			            
							 var divContent = "";
							divContent = divContent
									+ "<select><option value='0'>--Select--</option>";
								
							for ( var i = 0; i < r.length; i++) {
								divContent = divContent
										+ "<option value='"+r[i].categoryId+"'>"
										+ r[i].categoryId + " "
										+ r[i].categoryName + "</option>";
							}
							divContent = divContent + "</select>";
							$("#userData").html(divContent);
							$("#userData").show('show');
							$("#userData").select2();
						}
					});

		}
	 
	 function getDrugList() {
			var inputs = [];
			var str = inputs.join('&');
			jQuery
					.ajax({
						async : true,
						type : "POST",
						data : str + "&reqType=AJAX",
						url : "../drug/getAllDrugs",
						timeout : 1000 * 60 * 5,
						cache : false,
						error : function() {
							alert('error');
						},
						success : function(r) {
							//var result = jQuery.parseJSON(r);
						
			            
							 var divContent = "";
							divContent = divContent
									+ "<select><option value='0'>--Select--</option>";
								
							for ( var i = 0; i < r.length; i++) {
								divContent = divContent
										+ "<option value='"+r[i].drugId+"'>"
										+ r[i].drugId + " "
										+ r[i].drugName + "</option>";
							}
							divContent = divContent + "</select>";
							$("#userData").html(divContent);
							$("#userData").show('show');
							$("#userData").select2();
						}
					});

		}

	function loadPopUp(){
		var selectId=$("#selectid").val();
		alert("selectid"+selectid);
		if(selectId==0){
			$("#selectid").hide('hide'); 
		}
		if(selectId == "ProductWise"){
			getCurrentStockProductList();	
			
		}else if(selectId =="CompanyWise"){
			getCompanyList();
		}else if(selectId=="ShelfWise"){
			getShelfList();
		}else if(selectId=="CategoryWise"){
			getCategoryList();
		}else if(selectId=="DrugWise"){
			getDrugList();
		}else if(selectId=="BatchWise"){
			$(".userData").hide();
		}
		else if(selectId=="StoreWise"){
			getStoreList();
		}
	}
	
	function getData(){
		var userData = $("#userData").val();
		var callform= $("#selectid").val();
		alert("selectid>>>"+selectid);
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();
		alert("userData>>"+userData);
		var inputs = [];
		inputs.push('userData=' + userData);
		inputs.push('from=' + from);
		inputs.push('to=' + from);
		inputs.push('callform='+ callform);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "/EhatEnterprise/pharmacy/report/geCurrentStockReport",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				setCurrentStockResult(r);
			}
		});
	}
	
	
	
	function setCurrentStockResult(result) {
		var divContent = "";			
		for ( var i = 0; i < result.length; i++) {
	
				divContent = divContent
				+ '<tr>'
				+ '<td>'+ result[i].productName	+'</td>'
				+ '<td>'+ result[i].productShelf+'</td>'
				+ '<td>'+ result[i].productUnit+'</td>'
				+ '<td>'+ result[i].productPacking+'</td>'
				+ '<td>'+ result[i].productCompany+'</td>'
				+ '<td>'+ result[i].batchCode+'</td>'
				+ '<td>'+ result[i].batchExpDate+'</td>'
				
				+ '<td>'+ result[i].mrp+'</td>'
				+ '<td>'+ result[i].stockInHand+'</td>'
				+ '<td>'+ result[i].rate+'</td>'
				
				+ '<td>'+ result[i].amount+'</td>'
				+'</tr>';
				
					
		   
		$("#currentstockdetails").html(divContent);
		}
	}
	
	
	function calculateByPurRate(pageNumber)
	{
		var inputs=[];
		var startIndex=0;
			startIndex= (pageNumber-1)+"0";
			alert(startIndex);
			//return false;
			  var countpage=$("#countopdpage").val();
			  var countp=countpage-6;
			   for(var k=countp;k <= countpage;k++)
				  {
				  $("#liopd"+k).removeClass('active').addClass('notActive');
				  }
			$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
			var type='purRate';
			inputs.push('startIndex=' +startIndex);
			inputs.push('type='+type)
			var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			//data:{type:'purRate'},
			data : str + "&reqType=AJAX",
			url : "../report/getProductWiseStockOnPurRate",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				setPartyResult(r);

			}
		});
	}
	
	function setPartyResult(result) {
		var r = result;
		var divContent = "";
		total = 0;
		var opdcount=1;
		divContent = divContent
				+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
		for ( var i = 0; i < r.length; i++) {

			divContent = divContent + "<tr><td class='col-md-1'>" + r[i].productName + "</td><td class='col-md-1'>"
					+ r[i].productShelf + "</td><td class='col-md-1'>" + r[i].productUnit + "</td><td class='col-md-1'>"
					+ r[i].productPacking + "</td><td class='col-md-1'>" + r[i].productCompany
					+ "</td><td class='col-md-1'>" + r[i].batchCode + "</td><td class='col-md-1'>" + r[i].batchExpDate + "</td><td class='col-md-1'>" + r[i].mrp + "</td><td class='col-md-1'>" + r[i].stockInHand + "</td><td class='col-md-1'>" + r[i].purchaseRatePerUnit + "</td><td class='col-md-1'>" + r[i].amount + "</td></tr>";
					calculateTotalAmount(r[i].amount);
		}
		 var numberOfRows="";
		    var indexopd=1;
		    var countopdpage=$("#countopdpage").val();;
		    if(countopdpage == null || countopdpage == undefined || countopdpage == "")
		    	{
		    var numberOfPages=(opdcount/10);
		    var displayPagination=numberOfPages;            
		    if(numberOfPages > 5){
		        numberOfRows +="<li style='display:none' class='disabled previous '><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
		        displayPagination=5;
		    }
		    for(var j=0;j<displayPagination;j++){
		    		if(j == 0)
		    		{
		    	        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=calculateByPurRate("+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

		    		}
		    		else
		    		{
		    	        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=calculateByPurRate("+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
		    		}
		    		indexopd=indexopd+1;
		    }
		    if(numberOfPages>6){
		        numberOfRows +="<li class='next' onclick='nextPagination("+indexopd+","+Math.round(numberOfPages)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		    }
		   
		    $('#totalNumberOfPagesOpd').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages+1))+"</a></li>");
		    $('#opdpagenation').html(numberOfRows);
		    $("#countopdpage").val(indexopd);
		    	}
			
		$("#currentstockdetails").html(divContent);
		
		$("#totalAmount").val(total.toFixed(3));
		
	}
	
	function nextPagination(currentIndex, numberOfPages){
	    var displayPagination=currentIndex+5;
	    var pagecount=currentIndex;
	    var numberOfRows='';
	    numberOfRows +="<li class='previous' onclick='previousPagination("+currentIndex+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
	    if(numberOfPages<displayPagination){
	        displayPagination=numberOfPages+1;
	    }
	    for(var j=currentIndex;j<displayPagination;j++){
	        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=calculateByPurRate("+j+")><a class='page-link'>"+j+"</a></li>";
	        pagecount++;
	    }
	    if(numberOfPages>displayPagination){
	        numberOfRows +="<li class='next' id='liopdnext' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
	    }
	    	$("#countopdpage").val(pagecount);
	        $('#opdpagenation').html(numberOfRows);
	}


	function previousPagination(currentIndex,numberOfPages){
	    var displayPagination=currentIndex-5;
	    var pagecount=currentIndex-5;
	    var numberOfRows='';
	    if(currentIndex>6){
	        numberOfRows +="<li class='previous' onclick='previousPagination("+displayPagination+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
	    }
	    for(var j=displayPagination;j<currentIndex;j++){
	        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=calculateByPurRate("+j+")><a>"+j+"</a></li>";
	        pagecount++
	    }
	        numberOfRows +="<li class='next' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
	        $("#countopdpage").val(pagecount);
	        $('#opdpagenation').html(numberOfRows);
	}

	function calculateByMrp()
	{
		var type = $("input[name=calculation]:checked").val();
		var stock=$("input[name='stockName']:checked").val();
		var inputs = [];
		inputs.push('type=' + type);
		inputs.push('stock=' + stock);
		var str = inputs.join('&');
			
		jQuery.ajax({
			async : true,
			type : "POST",
			data:str + "&reqType=AJAX",
			url : "../report/getProductWiseStock",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				setPartyResult(r);

			}
		});
	}
	
	function calculateTotalAmount(amount)
	{
		
		if(parseFloat(amount)!='' && parseFloat(amount)!='null' && amount.length>0)
		{	
			total=total+parseFloat(amount);
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
											<li>Current Stock</li>

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
																							'div[id$=salereportListwithgstwhole]')
																							.html()));
																	e
																			.preventDefault();
																});
											</script>
											</li>
											
											<li class="pull-right">
												<button id="btnPdf"
													class="btn btn-xs btn-info pull-right" value="Pdf"
													title="" data-placement="left" data-toggle="tooltip"
													data-original-title="Pdf">Export To Excel</button> <script
													type="text/javascript">
												$("[id$=btnPdf]")
														.click(
																function(e) {
																	window
																			.open('data:application/vnd.ms-pdf,'
																					+ encodeURIComponent($(
																							'div[id$=salereportListwithgstwhole]')
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

										<!-- <div class="col-md-4-1"
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
 -->
										<!-- <div class="col-md-4-1 "
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
										</div> -->

										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Type:</b>
											</div>
											<div class="col-md-5-1" style="margin-top: 10px;">
												<select class="form-control form-control-sm text-center' style='width:100%;height:30px" id="selectid">
												<option value="BatchWise" onclick="loadPopUp()">Batch-Wise</option>
												<option value="ProductWise" onclick="loadPopUp()">Product-Wise</option>
												<option value="CompanyWise" onclick="loadPopUp()">Company-Wise</option>
												<option value="ShelfWise" onclick="loadPopUp()">Shelf-Wise</option>												
												<option value="CategoryWise" onclick="loadPopUp()">Category-Wise</option>
												<option value="DrugWise" onclick="loadPopUp()">Drug-Wise</option>
												<option value="StoreWise" onclick="loadPopUp()">Store-Wise</option>
												</select>


											</div> 
											
										
										</div>
										
										
										<div class="form-group col-md-5-1" style="margin-top: 9px;">
															<select class="form-control" id="userData" name="userData">
																			<option value="0">Select</option>
																		</select>
																	</div>	
																	
										

									</div>
									
									<div class="col-md-12-1"></div>

									<div class="col-md-12-1">

									<!-- 	<div class="col-md-4-1 "
											style="margin-top: 6px; margin-bottom: 10px;">


											<input type="radio" value="1" onclick="myFunction(1)"
												name="purTransType" id="rdoCashCredit"> <b>Credit</b>
											<input type="radio" value="0" style="margin-left: 2%;"
												onclick="myFunction(2)" name="purTransType" id="rdoCash">
											<b>Cash</b> <input type="radio" value="2"
												style="margin-left: 2%;" onclick="myFunction(3)"
												name="purTransType" id="rdoCard"> <b>Card </b> <input
												type="radio" value="3" checked="true"
												style="margin-left: 2%;" onclick="myFunction(3)"
												name="purTransType" id="rdoCard"> <b>All </b>


										</div>


										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Hospital Unit:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<select class="form-control input-SmallText" style=""
													id="unitId">

												</select>
											</div>
										</div>
										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Patient Name:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="searchBox5"
													class="form-control input-SmallText ui-autocomplete-input typeahead3"
													type="text" autocomplete="off" name="searchBox5"
													placeholder="Patient Name"
													onkeyup="autoSuggestionForPateintNameIndentSale1('searchBox5', 'onchange');">
											</div>




										</div> -->
									</div>

									<div class="col-md-12-1">



									 	<!-- <div class="col-md-5-1 "
											style="margin-top: 6px; margin-bottom: 10px;">

											<div class="col-md-6-1" style="margin-top: 9px;"
															id="userData"></div>


										</div>  -->
										
										<!-- <div class="col-md-5-1 "
											style="margin-top: 6px; margin-bottom: 10px; ">

											<div class="col-md-6-1" style="margin-top: 9px;"
															id="productData"></div> -->
															
															<div class="col-md-4-1">
													<!-- <div class="col-md-4-1" style="margin-top: 9px;">
												<b></b>
											</div> -->
															<!--<div class="col-md-8-1" style="margin-top: 9px;">			
																<strong>Calculation On</strong>
																				
																				<input type="radio" name="calculation" onclick="calculateByPurRate('1')" value="purRate" checked>Pur Rate&nbsp;
																				&nbsp;&nbsp;
																				<input type="radio" name="calculation" onclick="calculateByMrp()" value="mrp">MRP
																		</div>-->
																		
																									
									


										</div> 
										
										
											<div style="margin-top: 0px; margin-bottom: 10px"
											class="col-md-4-1">
											<div class="col-md-4-1" style="margin-top: 9px;">
												<b></b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<button style="margin-left: 5%;"
													onclick="getData()" id="getproductData"
													type="button" class="btn btn-xs btn-success">Get
													Data</button>
											</div>

										</div>	

 
									</div>

								</div>

								<div class="col-md-12-1 panel-body"
									style="border: 2px solid; margin-top: 2%;" id="salereportListwithgstwhole">
									<div class="col-md-12-1 center" style="margin-bottom: 10px;">
										

									<table>
										<thead>
										<tr><th colspan="7" align="center"><h4 id="titlesalewithgst" align="center">Category Wise Report</h4></th></tr>
										<tr><th  align="center"></th></tr>
										<span style="float: right"><strong>Total Amount</strong>&nbsp;&nbsp;&nbsp;&nbsp;<input
											type="text" name="totalAmount" id="totalAmount" readonly
											style="float: right" placeholder="Total Amount"></span>
										</thead>
										</table>


									</div>

									<div class="col-md-12-1"
										>

										<div class="tab-content">
											<div class="tab-pane fade in active"
											>
												<table
													class='table table-bordered table-condensed cf table-fixed'
														style='margin-bottom: 9px;'>
													<thead style="background-color: lightgray;">
														<tr>
															<th>Product Name</th>
															<th>Shelf Name</th>
															<th>Product Unit</th>
															<th>Packing</th>
															
															<th>Company Name</th>
															<th>Batch Code</th>
															<th>Batch Exp Date</th>
															<th>MRP</th>
															
															<th>Clear Stock</th>
															<th>Pur Rate Per Unit</th>
															<th>AMOUNT</th>
															
														</tr>
													</thead>
													<tbody id="currentstockdetails">
													</tbody>
												</table>
													<div class="pull-right" >
														<ul class="pagination" id="opdpagenation">
																							
																	</ul>
																					</div>
																					<div class="col-md-4 col-md-offset-8">
																						<div class="pull-right">
																							<ul
																								class="pagination pagination-blue margin-bottom-10"
																								id="totalNumberOfPagesOpd">
																							
																							</ul>
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
			</div>
		</div>
		<div><%@include file="Pharma_Footer.jsp"%></div>
		
		<input type="hidden" id="countopdpage"
			value="">	
		<%-- </c:if>  --%>
	</section>
</body>
</html>