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


<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<script type="text/javascript" src="<c:url value="/js/report.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>

<!-- CUSTOM SCRIPT -->
<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/js/pharma_productList_report.js"/>"></script>

</head>
<script>
	jQuery(document).ready(function() {
		//App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
	});

	/* @author    :BILAL
	 * @Date      :06-02-2018
	 * @Code      :For getting product list report
	 * ******/
	function getproductDataNew(){

		var fromd = $("#popup_container2").val();
		var tod = $("#popup_container3").val();

		farr = fromd.split('/');
		tarr = tod.split('/');
		
		from = farr[2]+'-'+farr[1]+'-'+farr[0];
		to = tarr[2]+'-'+tarr[1]+'-'+tarr[0];

		var hiddencategoryId=$('#hiddencategoryId').val();
		var hiddencompanyId=$('#hiddencompanyId').val();
		var hiddenProductId =$('#hiddenProductId').val();

		if (hiddencategoryId == "" || hiddencategoryId == null || hiddencategoryId == undefined || isNaN(hiddencategoryId)) {
			hiddencategoryId = 0;
		}
		if (hiddencompanyId == "" || hiddencompanyId == null || hiddencompanyId == undefined || isNaN(hiddencompanyId)) {
			hiddencompanyId = 0;
		}
		if (hiddenProductId == "" || hiddenProductId == null || hiddenProductId == undefined || isNaN(hiddenProductId)) {
			hiddenProductId = 0;
		}
		if (from == "" || from == null || to == '' || to == null) {
			from ="0";
			to ="0";
		}
		
		if (from == "" || from == null || to == '' || to == null) {
			alert("Please  Select The Date First");
		} else {

			
			var inputs = [];
			inputs.push('from=' + encodeURIComponent(from));
			inputs.push('to=' + encodeURIComponent(to));
			
			inputs.push('hiddencategoryId=' + encodeURIComponent(hiddencategoryId));
			inputs.push('hiddencompanyId=' + encodeURIComponent(hiddencompanyId));
			inputs.push('hiddenProductId=' + encodeURIComponent(hiddenProductId));
			
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../pharmacyReport/getproductData",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('Network Issue!');
				},
				success : function(r) {
					
					setproductData(r);
					$('#hiddencategoryId').val(0);
					$('#hiddencompanyId').val(0);
					$('#hiddenProductId').val(0);
					
				}
			});

		} 
	}
	/*****
	 * @author    :BILAL
	 * @Date      :06-02-2018
	 * @Code      :For setting product list report
	 * ******/
	function setproductData(res){

		var result= ' ';
		
			
		for(var i=0;i<res.lstprod.length;i++){
			
			var productId=res.lstprod[i].productId;
			var strengthName=res.lstprod[i].strengthMaster.strengthName;
			
			var productName=res.lstprod[i].productName;
			var preparationName=res.lstprod[i].preparationMaster.preparationName;
			
			var hsnNo =res.lstprod[i].hsnMaster.hsnNo;
			var catName =res.lstprod[i].categoryMaster.catName;
			var compName =res.lstprod[i].companyMaster.compName;
			var location="-";
			var gst=res.lstprod[i].taxMaster.taxRate;
			var productH1 =res.lstprod[i].productH1;
			var shdH1 ="N";
			var Emergency="N";
			var HighA="N";
			
			
			var drugname=res.lstprod[i].drugMaster.drugName;
			
			if (productH1 == 1 ) {
				 shdH1 ="Y";
			}else{
				 shdH1 ="N";
			}
			result=result
			  + '<tr> '
			  + '	<td>'+(i+1)+'</td> '
			  + '	<td>'+productName+'</td> '
			  + '	<td>'+drugname+'</td> '
			  + '	<td>'+hsnNo+'</td> '
			  + '	<td>'+catName+'</td> '
			  + '	<td>'+compName+'</td> '
			  + '	<td>'+location+'</td> '
			  + '	<td>'+gst+'</td> '
			  + '	<td>'+shdH1+'</td> '
			
			  + '	<td>'+Emergency+'</td> '
			  + '	<td>'+HighA+'</td> '
			  
			  + '</tr> ';
				
		   
				
						  	
		}
			
			

		$("#prodList").html(result);

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
											<li>Product Report</li>
											
											<!-- <li class="pull-right" id="template" style="display: none;">
												<button type="submit" class="btn btn-xs btn-success"
													onclick="getReportForPharmacyCompanyList();">Get
													Vendor Report</button> 
											</li> -->
											<li class="pull-right">
											<button id="btnExport"
												class="btn btn-xs btn-info pull-right" value="Excel"
												title="" data-placement="left" data-toggle="tooltip"
												data-original-title="Excel">Export To Excel</button>

											<script type="text/javascript">
												$("[id$=btnExport]")
														.click(
																function(e) {
																	window
																			.open('data:application/vnd.ms-excel,'
																					+ encodeURIComponent($(
																							'div[id$=reportList]')
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
													onfocus="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)">
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
													onclick="displayCalendar(document.getElementById('popup_container3'),'dd/mm/yyyy',this)"
													name="popup_container3" id="popup_container3">
											</div>
										</div>
										
										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Product Name:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="searchBox1"
													class="form-control input-SmallText ui-autocomplete-input typeahead1"
													type="text" autocomplete="off" name="searchBox1"
													placeholder="Product Name"
													onkeyup="searchProductList(this.id);" >
													
													
											</div>
										</div>
										
									</div>
									
									<div class="col-md-12-1">
										
										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Mfg Name:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="searchBox2"
													class="form-control input-SmallText ui-autocomplete-input typeahead2"
													type="text" autocomplete="off" name="searchBox2"
													placeholder="Mfg Name"
													onkeyup="searchMfg(this.id);">
											</div>
										</div>

                                      <div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Generic Name:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="searchBox1"
													class="form-control input-SmallText ui-autocomplete-input"
													type="text" autocomplete="off" name="searchBox1"
													placeholder="Generic Name"
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
													placeholder="Category"
													onkeyup="searchcategory(this.id);">
											</div>
										
										
										
										
										</div>
									</div>

									<div class="col-md-12-1">
										
										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Schedule Drug Yes /No:</b>
											</div>
											<div class="col-md-2-1" style="margin-top: 9px;">
												<input id="sheduledy" type="radio" value="Y" name="sheduled" >
											</div>
											<div class="col-md-2-1" style="margin-top: 9px;">
												<input id="sheduledn" type="radio" value="N" name="sheduled">
											</div>
										</div>

                                      <div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Emergency Drug Yes /No:</b>
											</div>
											<div class="col-md-2-1" style="margin-top: 9px;">
												<input id="emergencyY" type="radio" value="Y" name="emergencyd" >
											</div>
											<div class="col-md-2-1" style="margin-top: 9px;">
												<input id="emergencyN" type="radio" value="N" name="emergencyd">
											</div>
									</div>
										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>High Altert Yes /No:</b>
											</div>
											<div class="col-md-2-1" style="margin-top: 9px;">
												<input id="hightaY" type="radio" value="Y" name="highta" >
											</div>
											<div class="col-md-2-1" style="margin-top: 9px;">
												<input id="hightaN" type="radio" value="N" name="highta">
											</div>
										
										
										
										
										<div style="margin-top: 0px; margin-bottom: 10px" class="col-md-4-1">
											<div class="col-md-4-1" style="margin-top: 9px;">
												<b></b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<button style="margin-left: 5%;" onclick="getproductDataNew()" id="getproductData" type="button" class="btn btn-xs btn-success">Get Data</button>
											</div>

										</div>
										</div>
									</div>
								</div>

								<div class="col-md-12-1 panel-body" style="border: 2px solid;margin-top: 2%;" id="reportList">
										<div class="col-md-12-1 center" style="margin-bottom: 10px;">
											<h4 id="title">Product Report List</h4>


										</div>
										
									<div class="col-md-12-1" style="width: 100%; overflow-y: scroll; height: 400px; max-height: auto;">
											
									<div class="tab-content">
										<div  class="tab-pane fade in active">
											<table  class="table  table-bordered table-striped header-fixed cf" border="1">
												<thead>
													<tr>
														<th>Sr No</th> 
														<th>Product Name</th>
														<th>Generic Name</th>
														<th>HSN Code</th>
														<th>Category</th> 
														<th>Mfg Name</th>
														
														<th>Location</th>
														<th>GST %</th>
														<th>Schedule Drug Yes /No</th>
														<th>Emergency Drug Yes /No</th>
														<th>High Alert Yes /No</th>
													</tr>
												</thead>
												<tbody id="prodList">
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
		<input type="hidden" id="hiddenProductId" value="0">
		<input type="hidden" id="hiddencompanyId" value="0">
		<input type="hidden" id="hiddencategoryId" value="0">
		<%-- </c:if>  --%>
	</section>
</body>
</html>